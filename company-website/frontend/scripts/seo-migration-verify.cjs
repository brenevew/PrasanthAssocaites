/* eslint-disable @typescript-eslint/no-require-imports -- Read-only Node verification. */
const assert = require("node:assert/strict");
const load = require("./test-support/load-ts.cjs");
const historical = require("../seo-reports/legacy-urls-d24468b.json");
const { legacyRedirects } = load("src/data/legacyRedirects.ts");
const { serviceFaqs } = load("src/data/serviceFaqs.ts");
const { SITE_URL } = load("src/lib/seo.ts");
const base = (process.argv[2] || "http://127.0.0.1:3113").replace(/\/$/, "");
const get = (path) => fetch(base + path, { redirect: "manual", signal: AbortSignal.timeout(20000) });
const plain = (s) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

(async () => {
  const sitemap = await (await get("/sitemap.xml")).text();
  for (const source of historical.urls) {
    const mapping = legacyRedirects.find((entry) => entry.source === source);
    assert.ok(mapping, source);
    const response = await get(source + "?utm_source=legacy-check&ref=old-link");
    assert.equal(response.status, 308, source);
    const location = new URL(response.headers.get("location"), base);
    assert.equal(location.origin, new URL(base).origin, source);
    assert.equal(location.pathname, mapping.destination, source);
    assert.equal(location.searchParams.get("utm_source"), "legacy-check", source);
    assert.equal(location.searchParams.get("ref"), "old-link", source);
    const target = await get(location.pathname + location.search);
    assert.equal(target.status, 200, source);
    const html = await target.text();
    assert.ok(html.includes(`rel="canonical" href="${SITE_URL}${mapping.destination}"`), source);
    assert.ok(!sitemap.includes(`<loc>${SITE_URL}${source}</loc>`), source);
  }
  // Compare all shared FAQ structured answers with their content source.
  for (const [slug, faqs] of Object.entries(serviceFaqs)) {
    const html = await (await get(`/services/${slug}`)).text();
    const schemas = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/g)]
      .flatMap((match) => { const data = JSON.parse(match[1]); return data["@graph"] || [data]; });
    const faq = schemas.find((schema) => schema["@type"] === "FAQPage");
    assert.deepEqual(faq?.mainEntity.map((entry) => ({ q: entry.name, a: entry.acceptedAnswer.text })),
      faqs.map(({ q, a }) => ({ q, a: plain(a) })), slug);
  }
  const article = await (await get("/blog/questions-to-ask-building-contractor-coimbatore-nilgiris")).text();
  for (const heading of ["What should I check when choosing a construction company in Coimbatore?", "What should I check when choosing a builder in Ooty or the Nilgiris?"]) {
    assert.ok(article.includes(heading), `Missing server-rendered regional heading: ${heading}`);
  }
  for (const path of ["/guides/migration-check-missing", "/services/migration-check-missing"]) {
    assert.equal((await get(path)).status, 404, path);
  }
  console.log("PASS: 26 one-hop HTTP 308 redirects, preserved query parameters, canonical destinations, 21 FAQ schemas, regional SSR content and genuine 404s.");
})().catch((error) => { console.error(error); process.exitCode = 1; });
