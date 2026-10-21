/* eslint-disable @typescript-eslint/no-require-imports -- Node test tooling uses CommonJS. */
const test = require("node:test");
const assert = require("node:assert/strict");

// The ID is read when ga4.ts loads, so set it first. node --test runs each file in its own process.
process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-NJWX2XYRQZ";
const load = require("./test-support/load-ts.cjs");
const { toGa4Event, ga4BootstrapScript, GA_MEASUREMENT_ID } = load("src/lib/ga4.ts");
const { trackLeadEvent } = load("src/lib/analytics.ts");
const { services } = load("src/data/services.ts");
const { serviceCategories } = load("src/data/serviceCategories.ts");

const PII = /private@|Example Street|9000000000|Ravi|secret|email=|f1=/;

test("GA4 event names: generate_lead only for successful submissions, no page_view forwarding", () => {
  assert.equal(GA_MEASUREMENT_ID, "G-NJWX2XYRQZ");
  assert.equal(toGa4Event("quote_submit").name, "generate_lead");
  assert.equal(toGa4Event("form_submit").name, "generate_lead");
  assert.equal(toGa4Event("whatsapp_click").name, "whatsapp_click");
  assert.equal(toGa4Event("phone_click").name, "phone_click");
  assert.equal(toGa4Event("service_view").name, "service_view");
  assert.equal(toGa4Event("page_view"), null, "GA4 counts page views itself");
  assert.equal(toGa4Event("cta_click"), null);
});

test("every one of the 22 services maps to its name and one of the 4 sectors", () => {
  assert.equal(services.length, 22);
  const sectors = new Set();
  for (const category of serviceCategories) {
    for (const slug of category.slugs) {
      const { params } = toGa4Event("service_view", { service: slug, sector: category.id, page: `/services/${slug}` });
      assert.equal(params.service_name, services.find((s) => s.slug === slug).title);
      assert.equal(params.service_sector, category.label);
      sectors.add(params.service_sector);
    }
  }
  assert.equal(sectors.size, 4);
});

test("only allowlisted parameters reach gtag, with no personal data", () => {
  const calls = [];
  global.window = {
    location: { origin: "https://prasanthassociates.com", pathname: "/request-quote", search: "?service=residential-construction&email=private@example.com&f1=secret" },
    dispatchEvent: () => {},
    gtag: (...args) => calls.push(args),
  };
  global.CustomEvent = class { constructor(name, options) { this.detail = options.detail; } };
  try {
    trackLeadEvent("quote_submit", { service: "residential-construction", location: "12 Example Street, Ooty, 9000000000", form: "quote" });
    assert.equal(calls.length, 1, "one event per submission");
    const [kind, name, params] = calls[0];
    assert.equal(kind, "event");
    assert.equal(name, "generate_lead");
    assert.deepEqual(Object.keys(params).sort(), ["form_type", "landing_page", "page_location", "service_location", "service_name", "service_sector"]);
    assert.equal(params.service_name, "Residential Construction");
    assert.equal(params.service_sector, "Civil Construction");
    assert.equal(params.service_location, "ooty");
    assert.equal(params.page_location, "https://prasanthassociates.com/request-quote");
    assert.doesNotMatch(JSON.stringify(calls), PII);

    trackLeadEvent("page_view");
    assert.equal(calls.length, 1, "page_view is not forwarded");

    window.gtag = () => { throw new Error("gtag failed"); };
    assert.doesNotThrow(() => trackLeadEvent("phone_click"));

    // Without the server-rendered gtag bootstrap (no ID configured), nothing is sent.
    delete window.gtag;
    assert.doesNotThrow(() => trackLeadEvent("quote_submit"));
    assert.equal(calls.length, 1);
    assert.doesNotThrow(() => trackLeadEvent("phone_click"));
  } finally { delete global.window; delete global.CustomEvent; }
});

test("consent defaults are set before the GA4 config, ads storage always denied", () => {
  const script = ga4BootstrapScript();
  const consent = script.indexOf("gtag('consent','default'");
  const config = script.indexOf("gtag('config'");
  assert.ok(consent > -1 && config > consent);
  assert.match(script, /region:\[[^\]]*"GB"[^\]]*\]/);
  assert.doesNotMatch(script, /ad_storage:'granted'/);
  assert.match(script, /"allow_google_signals":false/);
  assert.doesNotMatch(script, /debug_mode/);
});
