/* eslint-disable @typescript-eslint/no-require-imports -- Node regression tests. */
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const load = require("./test-support/load-ts.cjs");
const { services } = load("src/data/services.ts");
const root = path.resolve(__dirname, "..");
const quiet = { info() {}, warn() {}, error() {} };
const limiter = { rateLimit: () => ({ success: true }), getClientIp: () => "test", getClientIpFromHeaders: async () => "test" };

// Execute the real modules with isolated I/O: no live Sheet writes or local leads.
function isolated(file, mocks = {}, globals = {}) {
  const source = ts.transpileModule(fs.readFileSync(path.join(root, file), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const exports = {};
  const resolve = (id) => {
    if (id in mocks) return mocks[id];
    if (id.startsWith("@/")) return load(`src/${id.slice(2)}.ts`);
    return require(id);
  };
  vm.runInThisContext(`(function(require, exports, fetch, window, localStorage, console, process) {${source}\n})`, { filename: file })(
    resolve, exports, globals.fetch, globals.window, globals.localStorage, quiet,
    { env: { GOOGLE_SHEETS_WEBHOOK_URL: "https://example.invalid/webhook", ...globals.env } }
  );
  return exports;
}

function contactHarness(result) {
  const writes = [];
  const mirrors = [];
  const actions = isolated("src/app/actions/contactActions.ts", {
    "@/lib/googleSheets": { sendToGoogleSheet: async (data) => { writes.push(data); return result; } },
    "@/lib/rateLimit": limiter,
    "@/lib/db": { generateRefCode: () => "REF-TEST", saveSubmission: (data) => { mirrors.push(data); return data; } },
  });
  return { actions, writes, mirrors };
}

function contactForm(extra = {}) {
  const form = new FormData();
  for (const [key, value] of Object.entries({ name: "Test Client", phone: "9000000000", location: "Coimbatore", projectType: "design", ...extra })) form.set(key, value);
  return form;
}

const estimate = { name: "Test Client", phone: "9000000000", location: "Coimbatore", projectType: "Residential", builtUpAreaSqFt: 1200, packageType: "Standard", addons: [], estimatedTotal: 2_640_000 };

test("contact and calculated estimates do not confirm failed or unconfigured delivery", async () => {
  for (const failure of [{ success: false }, { success: false, skipped: true }]) {
    const { actions, mirrors } = contactHarness(failure);
    for (const result of [await actions.submitContactForm(contactForm()), await actions.submitCalculatedEstimate(estimate)]) {
      assert.equal(result.success, false);
      assert.match(result.message, /try again/i);
      assert.equal(result.refCode, undefined);
    }
    assert.equal(mirrors.length, 0);
  }
});

test("successful enquiries preserve each of the 22 canonical services in the Sheet and local mirror", async () => {
  const { actions, writes, mirrors } = contactHarness({ success: true });
  for (const service of services) {
    const result = await actions.submitContactForm(contactForm({ isEstimate: "true", serviceSlug: service.slug, serviceTitle: "Untrusted client title" }));
    assert.equal(result.success, true);
    assert.equal(result.refCode, "REF-TEST");
    const write = writes.at(-1);
    assert.equal(write.formType, "Request Quote");
    assert.ok(write.details.includes(service.title));
    assert.ok(write.details.includes(service.slug));
    assert.ok(!write.details.includes("Untrusted client title"));
    assert.equal(mirrors.at(-1).serviceSlug, service.slug);
    assert.equal(mirrors.at(-1).serviceTitle, service.title);
  }
});

test("ordinary contact and calculator enquiries still succeed; unknown services are rejected", async () => {
  const { actions, writes } = contactHarness({ success: true });
  assert.equal((await actions.submitContactForm(contactForm())).success, true);
  assert.equal((await actions.submitCalculatedEstimate(estimate)).success, true);
  assert.equal((await actions.submitContactForm(contactForm({ serviceSlug: "unknown" }))).success, false);
  assert.equal(writes.length, 2);
});

test("Google Sheets requires an explicit success acknowledgement, including with whitespace in JSON", async () => {
  for (const body of ['{ "status": "error" }', '{ "status": "unauthorized" }', '{}', 'null', '<html>Sign in</html>']) {
    const sheets = isolated("src/lib/googleSheets.ts", {}, { fetch: async () => new Response(body) });
    assert.equal((await sheets.sendToGoogleSheet({ formType: "Contact Us", name: "Test", phone: "9000000000" })).success, false);
  }
  for (const body of [{ status: "success" }, { status: "success", emailed: false }]) {
    const sheets = isolated("src/lib/googleSheets.ts", {}, { fetch: async () => Response.json(body) });
    assert.equal((await sheets.sendToGoogleSheet({ formType: "Contact Us", name: "Test", phone: "9000000000" })).success, true);
  }
});

function syncRoute(sendToGoogleSheet) {
  return isolated("src/app/api/sync-sheets/route.ts", {
    "next/server": { NextResponse: { json: (body, init) => Response.json(body, init) } },
    "@/lib/googleSheets": { FORM_TYPES: ["Building Planner"], sendToGoogleSheet },
    "@/lib/rateLimit": limiter,
  });
}

function request(body) {
  return new Request("http://localhost/api/sync-sheets", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
}

function plannerHarness(fetch) {
  const cached = [];
  const events = [];
  const planner = isolated("src/services/projectPlanApi.ts", {
    "@/lib/analytics": { trackLeadEvent: (...args) => events.push(args) },
  }, {
    fetch, window: {}, localStorage: { getItem: () => null, setItem: (_key, value) => cached.push(JSON.parse(value)) },
  });
  return { planner, cached, events };
}

const plan = { name: "Test Client", phone: "9000000000", email: "test@example.invalid", projectType: "Residential", location: "Ooty" };

test("planner rejects HTTP, application, malformed and network failures without caching or conversions", async () => {
  for (const fetch of [
    async () => Response.json({ success: false }, { status: 502 }),
    async () => Response.json({ success: false }),
    async () => new Response("not JSON"),
    async () => { throw new Error("offline"); },
  ]) {
    const { planner, cached, events } = plannerHarness(fetch);
    await assert.rejects(planner.saveProjectPlan(plan), /couldn't save/i);
    assert.equal(cached.length, 0);
    assert.equal(events.length, 0);
  }
});

test("planner waits for confirmed storage before caching and recording a conversion", async () => {
  let acknowledge;
  const { planner, cached, events } = plannerHarness(() => new Promise((resolve) => { acknowledge = resolve; }));
  const pending = planner.saveProjectPlan(plan);
  assert.equal(cached.length, 0);
  assert.equal(events.length, 0);
  acknowledge(Response.json({ success: true }));
  const saved = await pending;
  assert.ok(saved.refCode);
  assert.equal(cached.length, 1);
  assert.equal(events.length, 1);
  assert.equal(events[0][0], "form_submit");
});

test("complete planner requirements survive the client, API and Sheet webhook without truncation", async () => {
  let received;
  const sheets = isolated("src/lib/googleSheets.ts", {}, { fetch: async (_url, options) => { received = JSON.parse(options.body); return Response.json({ status: "success" }); } });
  const route = syncRoute(sheets.sendToGoogleSheet);
  const { planner } = plannerHarness((_url, options) => route.POST(request(JSON.parse(options.body))));
  const requirements = {
    projectName: "Family Home", plotLength: 30, plotWidth: 40, plotUnit: "ft", plotAreaSft: 1200,
    footprintLength: 25, footprintWidth: 35, numFloors: 2, totalBuiltUpSft: 1750,
    floorDetails: JSON.stringify([{ bedrooms: 3, baths: 2 }, { bedrooms: 2, baths: 1 }]),
    selectedServices: JSON.stringify([{ title: "Structural Drawings", qty: 2 }]),
    roadSide: "East", roadWidth: 20, roadLevel: "Same as Road Level",
    frontSetback: 0, rearSetback: 4, leftSetback: 3, rightSetback: 3,
    hasBasement: false, parkingCarsCount: 0, parkingTwoWheelersCount: 2,
    commercialDetails: { units: 2, kitchens: 1, restrooms: 2, facilities: ["Customer Parking"] },
    specialNotes: "Detailed requirement. ".repeat(200),
  };
  await planner.saveProjectPlan({ ...plan, ...requirements, attachments: [{ name: "Plan.pdf", url: "https://drive.google.com/test", size: "1 KB" }] });
  assert.ok(received.details.length > 2000);
  assert.deepEqual(JSON.parse(received.details), requirements);
  assert.match(received.attachments, /Plan.pdf/);
  assert.equal(received.location, "Ooty");
});

test("sync endpoint returns failure status and rejects oversized details instead of truncating", async () => {
  let writes = 0;
  const route = syncRoute(async () => { writes++; return { success: false }; });
  const failed = await route.POST(request(plan));
  assert.equal(failed.status, 502);
  assert.equal((await failed.json()).success, false);
  const oversized = await route.POST(request({ ...plan, details: "x".repeat(45_001) }));
  assert.equal(oversized.status, 413);
  assert.equal(writes, 1);
});
