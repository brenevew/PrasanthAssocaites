/* eslint-disable @typescript-eslint/no-require-imports -- Node audit tooling uses CommonJS. */
const test = require("node:test");
const assert = require("node:assert/strict");
const load = require("./test-support/load-ts.cjs");
const { services } = load("src/data/services.ts");
const { serviceCategories } = load("src/data/serviceCategories.ts");
const { serviceSeo, serviceMetadata, serviceSchema } = load("src/lib/serviceSeo.ts");
const { getServicePath } = load("src/data/serviceRoutes.ts");
const { SITE_URL, ORG_ID } = load("src/lib/seo.ts");
const { coarseLocation, safePagePath, trackLeadEvent } = load("src/lib/analytics.ts");
const baseline = require("../seo-reports/baseline.json");

test("all 22 services and four sectors preserve the approved visible content", () => {
  assert.equal(services.length, 22);
  assert.deepEqual(services, baseline.services);
  assert.deepEqual(serviceCategories, baseline.sectors);
  assert.deepEqual(serviceCategories.map((c) => c.slugs.length), [8, 6, 4, 4]);
  const slugs = serviceCategories.flatMap((c) => c.slugs);
  assert.equal(new Set(slugs).size, 22);
  assert.deepEqual([...slugs].sort(), services.map((s) => s.slug).sort());
});

test("service metadata, canonical routes and schema agree with no shared landing pages", () => {
  for (const key of ["slug", "path", "title", "description"]) assert.equal(new Set(serviceSeo.map((s) => s[key])).size, 22);
  assert.equal(getServicePath("turnkey-construction"), "/services/turnkey-design-build-coimbatore");
  for (const service of services) {
    const seo = serviceMetadata(service.slug);
    const schema = serviceSchema(service);
    assert.equal(seo.alternates.canonical, SITE_URL + getServicePath(service.slug));
    assert.equal(seo.openGraph.url, seo.alternates.canonical);
    assert.equal(seo.twitter.title, seo.title.absolute);
    assert.equal(seo.twitter.description, seo.description);
    assert.deepEqual(seo.robots, { index: true, follow: true });
    assert.equal(seo.keywords, undefined);
    assert.equal(schema.url, seo.alternates.canonical);
    assert.equal(schema.provider["@id"], ORG_ID);
    assert.equal(schema.name, service.title);
    assert.equal(schema.description, service.shortDescription);
    assert.ok(schema.category);
    assert.equal(schema.aggregateRating, undefined);
    assert.equal(schema.offers, undefined);
  }
});

test("sitemap includes every service once, retains public pages and omits redirect aliases", () => {
  const sitemap = load("src/app/sitemap.ts").default();
  const urls = sitemap.map((entry) => entry.url);
  assert.equal(new Set(urls).size, urls.length);
  for (const service of services) assert.ok(urls.includes(SITE_URL + getServicePath(service.slug)));
  for (const path of ["/", "/locations/coimbatore", "/locations/nilgiris-ooty", "/locations/gudalur", "/projects"]) assert.ok(urls.includes(SITE_URL + path));
  assert.ok(urls.every((url) => !/[?#]/.test(url) && !url.includes("/api/") && !url.includes("/request-design")));
  assert.ok(sitemap.every((entry) => entry.lastModified === undefined));
});

test("enquiry analytics discard addresses, free text, arbitrary slugs and URL query data", () => {
  assert.equal(coarseLocation("12 Example Street, Ooty, phone 9000000000"), "ooty");
  assert.equal(coarseLocation("private@example.com"), undefined);
  assert.equal(safePagePath("/private@example.com"), "/other");
  const events = [];
  global.window = {
    location: { pathname: "/request-quote", search: "?service=residential-construction&email=private@example.com&f1=secret" },
    dispatchEvent: (event) => events.push(event.detail),
  };
  global.CustomEvent = class { constructor(name, options) { this.detail = options.detail; } };
  try {
    trackLeadEvent("quote_submit", { service: "residential-construction", location: "12 Example Street, Ooty", form: "quote" });
    trackLeadEvent("whatsapp_click", { service: "private@example.com", location: "secret" });
    assert.equal(events.length, 2);
    assert.equal(events[0].properties.service, "residential-construction");
    assert.equal(events[0].properties.location, "ooty");
    assert.equal(events[1].properties.service, undefined);
    assert.equal(events[1].properties.location, undefined);
    assert.doesNotMatch(JSON.stringify(events), /private@|Example Street|secret|f1=|email=/);
    window.dispatchEvent = () => { throw new Error("analytics listener failed"); };
    assert.doesNotThrow(() => trackLeadEvent("quote_submit"));
  } finally { delete global.window; delete global.CustomEvent; }
});
