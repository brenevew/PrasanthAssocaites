/* eslint-disable @typescript-eslint/no-require-imports -- Node audit tooling uses CommonJS. */
const test = require("node:test");
const assert = require("node:assert/strict");
const load = require("./test-support/load-ts.cjs");
const { services } = load("src/data/services.ts");
const { serviceCategories } = load("src/data/serviceCategories.ts");
const { serviceSeo, serviceMetadata, serviceSchema } = load("src/lib/serviceSeo.ts");
const { getServicePath } = load("src/data/serviceRoutes.ts");
const { SITE_URL, ORG_ID } = load("src/lib/seo.ts");
const { footerServiceLinks } = load("src/data/navigation.ts");
const { homeFaqQuestions } = load("src/data/homeFaqs.ts");
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
  assert.ok(!urls.includes(`${SITE_URL}/services/turnkey-construction`));
  for (const project of load("src/data/projects.ts").projects) {
    const included = urls.includes(`${SITE_URL}/projects/${project.slug}`);
    assert.equal(included, load("src/data/projects.ts").hasDetailsPage(project), project.slug);
  }
  // Articles carry their real revision (or publish) date. Other pages carry the
  // git date of their source files from lastModified.json, or none — never the build time.
  const { blogPosts } = load("src/data/blog.ts");
  const sourceDates = new Set(Object.values(require("../src/data/lastModified.json")));
  for (const entry of sitemap) {
    const post = blogPosts.find((p) => entry.url === `${SITE_URL}/blog/${p.slug}`);
    const date = entry.lastModified?.toISOString().slice(0, 10);
    if (post) assert.equal(date, post.dateModified ?? post.datePublished, post.slug);
    else if (entry.url !== `${SITE_URL}/blog`) assert.ok(date === undefined || sourceDates.has(date), entry.url);
  }
  assert.ok(urls.includes(`${SITE_URL}/blog`));
});

test("the footer links every service page once", () => {
  const hrefs = footerServiceLinks.map((link) => link.href);
  assert.equal(new Set(hrefs).size, hrefs.length);
  assert.deepEqual(
    [...hrefs].sort(),
    services.map((s) => getServicePath(s.slug)).sort()
  );
});

test("footer and FAQ service links reach canonical, indexable landing pages", () => {
  const urls = new Set(load("src/app/sitemap.ts").default().map((entry) => entry.url));
  const links = [...footerServiceLinks, ...homeFaqQuestions.flatMap((faq) => faq.links)]
    .filter((link) => link.href.startsWith("/services"));
  for (const link of links) {
    const target = new URL(link.href, SITE_URL);
    assert.ok(!link.href.startsWith("/services#"), link.href);
    assert.ok(urls.has(SITE_URL + target.pathname), link.href);
  }
});

test("turnkey short URL permanently redirects to the canonical page", async () => {
  const config = load("next.config.ts").default;
  const redirect = (await config.redirects()).find((entry) => entry.source === "/services/turnkey-construction");
  assert.equal(redirect?.destination, getServicePath("turnkey-construction"));
  assert.equal(redirect?.permanent, true);
});

test("the old Gudalur project URL permanently redirects to its renamed page", async () => {
  const redirects = await load("next.config.ts").default.redirects();
  const redirect = redirects.find((entry) => entry.source === "/projects/residential-construction-project");
  assert.equal(redirect?.destination, "/projects/residential-building-gudalur");
  assert.equal(redirect?.permanent, true);
  const urls = new Set(load("src/app/sitemap.ts").default().map((entry) => entry.url));
  assert.ok(urls.has(`${SITE_URL}/projects/residential-building-gudalur`));
  assert.ok(!urls.has(`${SITE_URL}${redirect.source}`));
});

test("every retired d24468b URL permanently reaches an indexable replacement without a redirect chain", async () => {
  const historical = require("../seo-reports/legacy-urls-d24468b.json");
  const redirects = await load("next.config.ts").default.redirects();
  const urls = new Set(load("src/app/sitemap.ts").default().map((entry) => entry.url));
  assert.equal(historical.urls.length, 26);
  assert.equal(new Set(redirects.map((entry) => entry.source)).size, redirects.length);
  for (const source of historical.urls) {
    const redirect = redirects.find((entry) => entry.source === source);
    assert.ok(redirect, `Missing historical URL: ${source}`);
    assert.equal(redirect.permanent, true, source);
    assert.ok(urls.has(SITE_URL + redirect.destination), source);
    assert.ok(!urls.has(SITE_URL + source), source);
    assert.ok(!redirects.some((entry) => entry.source === redirect.destination), source);
    assert.ok(redirect.destination.startsWith(source.startsWith("/guides/") ? "/blog/" : "/services/"), source);
  }
});

test("blog metadata and links reference indexable pages and documented completed projects", () => {
  const { blogPosts, blockText } = load("src/data/blog.ts");
  const { projects, hasDetailsPage } = load("src/data/projects.ts");
  const urls = new Set(load("src/app/sitemap.ts").default().map((entry) => entry.url));
  assert.equal(new Set(blogPosts.map((post) => post.slug)).size, blogPosts.length);
  assert.equal(new Set(blogPosts.map((post) => post.seoTitle)).size, blogPosts.length);
  assert.equal(new Set(blogPosts.map((post) => post.description)).size, blogPosts.length);
  for (const post of blogPosts) {
    assert.ok(urls.has(`${SITE_URL}/blog/${post.slug}`), post.slug);
    assert.ok(post.description && post.imageAlt, post.slug);
    for (const slug of post.relatedServices) assert.ok(services.some((service) => service.slug === slug), slug);
    for (const slug of post.relatedProjects || []) {
      const project = projects.find((entry) => entry.slug === slug);
      assert.ok(project && project.status === "completed" && hasDetailsPage(project), `${post.slug}: ${slug}`);
    }
    for (const reference of post.references || []) assert.equal(new URL(reference.href).protocol, "https:");
    const text = post.body.flatMap(blockText).join(" ");
    for (const [, href] of text.matchAll(/\[[^\]]+\]\((\/[^)]+)\)/g)) {
      assert.ok(urls.has(SITE_URL + new URL(href, SITE_URL).pathname), `${post.slug}: ${href}`);
    }
  }
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
