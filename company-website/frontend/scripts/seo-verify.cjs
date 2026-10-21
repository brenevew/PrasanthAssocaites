/* eslint-disable @typescript-eslint/no-require-imports -- Node audit tooling uses CommonJS. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const load = require("./test-support/load-ts.cjs");
const { serviceSeo } = load("src/lib/serviceSeo.ts");
const { services } = load("src/data/services.ts");
const { SITE_URL, ORG_ID } = load("src/lib/seo.ts");
const base = (process.argv[2] || "http://127.0.0.1:3100").replace(/\/$/, "");
const decode = (s) => (s || "").replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'").replaceAll("&#39;", "'");
const attr = (tag, name) => decode(tag?.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1]);
const meta = (html, key, value) => attr((html.match(/<meta\b[^>]*>/g) || []).find((tag) => attr(tag, key) === value), "content");
async function get(path) {
  return fetch(base + path, { redirect: "manual", signal: AbortSignal.timeout(20000) });
}
(async () => {
  const sitemapResponse = await get("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  const xml = await sitemapResponse.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => decode(m[1]));
  assert.equal(new Set(urls).size, urls.length);
  const robotsResponse = await get("/robots.txt");
  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.ok(robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`));
  assert.doesNotMatch(robots, /Disallow:\s*\/(?:services|\s*$)/m);
  const hub = await (await get("/services")).text();
  const rows = [];
  for (const seo of serviceSeo) {
    const response = await get(seo.path);
    assert.equal(response.status, 200, seo.path);
    assert.doesNotMatch(response.headers.get("x-robots-tag") || "", /noindex/i);
    const html = await response.text();
    const head = html.split("</head>")[0];
    const canonicalTags = (head.match(/<link\b[^>]*>/g) || []).filter((tag) => attr(tag, "rel") === "canonical");
    assert.equal(canonicalTags.length, 1, seo.path);
    assert.equal(attr(canonicalTags[0], "href"), SITE_URL + seo.path);
    assert.equal(decode(head.match(/<title>(.*?)<\/title>/)?.[1]), seo.title);
    assert.equal(meta(head, "name", "description"), seo.description);
    assert.equal(meta(head, "property", "og:url"), SITE_URL + seo.path);
    assert.equal(meta(head, "property", "og:title"), seo.title);
    assert.equal(meta(head, "property", "og:description"), seo.description);
    assert.equal(meta(head, "name", "twitter:title"), seo.title);
    assert.equal(meta(head, "name", "twitter:description"), seo.description);
    assert.equal(meta(head, "name", "twitter:card"), "summary_large_image");
    assert.ok(meta(head, "property", "og:image"));
    assert.equal(meta(head, "name", "keywords"), "");
    assert.match(meta(head, "name", "robots"), /index, follow/);
    assert.doesNotMatch(meta(head, "name", "robots"), /noindex/);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    const schemas = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/g)].flatMap((m) => { const data = JSON.parse(m[1]); return data["@graph"] || [data]; });
    const service = schemas.find((s) => s["@type"] === "Service");
    assert.equal(service?.url, SITE_URL + seo.path);
    assert.equal(service?.provider?.["@id"], ORG_ID);
    assert.equal(service?.category, seo.sector);
    assert.equal(service?.["@id"], `${SITE_URL}/services#${seo.slug}`);
    assert.ok(schemas.some((s) => s["@type"] === "BreadcrumbList"));
    const text = decode(html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, "")).replace(/\s+/g, " ");
    const source = services.find((s) => s.slug === seo.slug);
    if (seo.slug !== "turnkey-construction") {
      assert.ok(text.includes(source.description), `Missing server-rendered description: ${seo.slug}`);
      for (const feature of source.features) assert.ok(text.includes(feature), `Missing feature: ${feature}`);
    }
    assert.ok(urls.includes(SITE_URL + seo.path));
    assert.ok(hub.includes(`href="${seo.path}"`), `No crawlable hub link: ${seo.path}`);
    assert.ok(html.includes(`/request-quote?service=${seo.slug}`) || seo.slug === "turnkey-construction");
    const queryResponse = await get(seo.path + "?utm_source=seo-check");
    assert.equal(queryResponse.status, 200);
    const queryHtml = await queryResponse.text();
    assert.ok(queryHtml.includes(`rel="canonical" href="${SITE_URL}${seo.path}"`));
    rows.push({ ...seo, canonical: SITE_URL + seo.path, status: 200, indexability: "index, follow", validation: "PASS: HTTP, SSR, metadata, schema, hub link, sitemap, query canonical" });
  }
  for (const path of ["/services/seo-check-missing", "/projects/seo-check-missing", "/seo-check-missing"]) assert.equal((await get(path)).status, 404, path);
  const matrix = [
    "# Service SEO matrix — 21 October 2026", "", `Verified against ${base}. Canonicals use ${SITE_URL}. Live deployment is a separate check.`, "",
    "| Sector | Service | Existing URL | Landing URL | SEO Title | Meta Description | Canonical | Indexability | Validation |",
    "|---|---|---|---|---|---|---|---|---|",
    ...rows.map((row) => "| " + [row.sector, row.name, row.slug === "turnkey-construction" ? row.path : `/services#${row.slug}`, row.path, row.title, row.description, row.canonical, row.indexability, row.validation].map((value) => value.replaceAll("|", "\\|")).join(" | ") + " |"),
  ];
  fs.mkdirSync("seo-reports", { recursive: true });
  fs.writeFileSync("seo-reports/SERVICES.md", matrix.join("\n") + "\n");
  fs.writeFileSync("seo-reports/validation.json", JSON.stringify({ base, sitemapPages: urls.length, services: rows, unknownRoutesReturn404: true }, null, 2));
  console.log(`PASS: ${rows.length} service pages, ${urls.length} sitemap URLs, robots.txt, query canonicals and genuine 404s.`);
})().catch((error) => { console.error(error); process.exitCode = 1; });
