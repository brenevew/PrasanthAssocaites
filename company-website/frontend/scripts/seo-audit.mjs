#!/usr/bin/env node
/**
 * SEO audit: crawls every URL in the sitemap and reports problems.
 *
 *   npm run seo:audit                                  # against https://prasanthassociates.com
 *   npm run seo:audit -- http://localhost:3000         # against a local `next start`
 *
 * Checks: HTTP status, title/description presence, length and duplicates,
 * canonical and og:url, H1 count, image alt text, JSON-LD validity, thin
 * content, noindex, broken internal links, orphan pages (in the sitemap but
 * linked from nowhere), linked pages missing from the sitemap, and dedicated
 * sitemap pages for every service in the services catalog.
 *
 * Read-only. Exits 1 when any error is found, so it can gate a deploy.
 */

const LIVE_ORIGIN = "https://prasanthassociates.com";
const base = (process.argv[2] || LIVE_ORIGIN).replace(/\/$/, "");
const UA = "Mozilla/5.0 (compatible; PrasanthSEOAudit/1.0)";
const THIN_WORDS = 300;

const issues = []; // { level: "error" | "warn", page, message }
const add = (level, page, message) => issues.push({ level, page, message });
const checked = new Map();

async function get(url) {
  // Reuse successful sitemap checks when validating inbound links. Re-fetching
  // every page doubles the crawl load and can trigger hosting throttles.
  if (checked.has(url)) return checked.get(url);
  let result;
  const transient = [];
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA }, redirect: "manual", signal: AbortSignal.timeout(15000) });
      result = { status: res.status, location: res.headers.get("location"), robots: res.headers.get("x-robots-tag"), body: res.status === 200 ? await res.text() : "" };
    } catch (e) {
      result = { status: 0, body: "", error: String(e) };
    }
    if (result.status !== 0 && result.status !== 429 && result.status < 500) break;
    transient.push(result.status || "network error");
    if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
  }
  if (result.status === 200) {
    checked.set(url, result);
    if (transient.length) add("warn", new URL(url).pathname, `transient response (${transient.join(", ")}) recovered on retry; review hosting logs`);
  }
  return result;
}

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const attr = (tag, name) => (tag.match(new RegExp(`\\s${name}="([^"]*)"`, "i")) || [])[1];
const metaContent = (html, key, val) => {
  for (const tag of html.match(/<meta\b[^>]*>/gi) || []) if (attr(tag, key) === val) return decode(attr(tag, "content") || "");
  return null;
};
/** Check the requested server even when its sitemap uses the production origin. */
const toAudit = (url) => `${base}${new URL(url).pathname}${new URL(url).search}`;
const pathOf = (url) => new URL(url).pathname.replace(/\/$/, "") || "/";
const samePage = (actual, expected) => {
  try {
    const a = new URL(actual);
    const b = new URL(expected);
    return a.origin === b.origin && pathOf(actual) === pathOf(expected) && a.search === b.search && !a.hash;
  } catch {
    return false;
  }
};

const sitemap = await get(`${base}/sitemap.xml`);
if (sitemap.status !== 200) {
  console.error(`Could not fetch ${base}/sitemap.xml (HTTP ${sitemap.status})${sitemap.error ? `: ${sitemap.error}` : ""}`);
  process.exit(1);
}
const sitemapUrls = [...sitemap.body.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
const sitemapPaths = new Set(sitemapUrls.map(pathOf));
if (sitemapPaths.size !== sitemapUrls.length) add("error", "/sitemap.xml", "duplicate sitemap URLs");
if (!sitemapUrls.length) {
  console.error("The sitemap contains no page URLs.");
  process.exit(1);
}

const robots = await get(`${base}/robots.txt`);
if (robots.status !== 200) add("error", "/robots.txt", `robots.txt returned HTTP ${robots.status}`);
else if (!/Sitemap:/i.test(robots.body)) add("warn", "/robots.txt", "robots.txt does not reference the sitemap");

const titles = new Map();
const descriptions = new Map();
const inbound = new Map(); // path -> Set of pages linking to it
const linked = new Set();
let catalogServiceCount = 0;

for (const url of sitemapUrls) {
  const page = pathOf(url);
  const res = await get(toAudit(url));
  if (res.status !== 200) {
    add("error", page, `in sitemap but returns HTTP ${res.status}${res.location ? ` -> ${res.location}` : ""}`);
    continue;
  }
  const html = res.body;
  const head = html.split(/<\/head>/i)[0];

  const title = decode((head.match(/<title>([^<]*)<\/title>/i) || [])[1] || "").trim();
  if (!title) add("error", page, "missing <title>");
  else {
    if (title.length > 65) add("warn", page, `title is ${title.length} chars (Google shows ~60): "${title}"`);
    titles.set(title, [...(titles.get(title) || []), page]);
  }

  const desc = metaContent(head, "name", "description");
  if (!desc) add("error", page, "missing meta description");
  else {
    if (desc.length > 160) add("warn", page, `meta description is ${desc.length} chars (keep under ~160)`);
    if (desc.length < 70) add("warn", page, `meta description is only ${desc.length} chars`);
    descriptions.set(desc, [...(descriptions.get(desc) || []), page]);
    if (/placeholder|to be added|lorem/i.test(desc)) add("warn", page, "meta description contains placeholder text");
  }

  const canonicalCount = (head.match(/<link\b[^>]*rel="canonical"[^>]*>/gi) || []).length;
  if (canonicalCount > 1) add("error", page, "multiple canonical tags");
  if (/noindex/i.test(res.robots || "")) add("error", page, "X-Robots-Tag blocks indexing");

  const canonicalTag = (head.match(/<link\b[^>]*rel="canonical"[^>]*>/i) || [])[0];
  const canonical = canonicalTag && attr(canonicalTag, "href");
  if (!canonical) add("error", page, "missing canonical tag");
  else if (!samePage(canonical, url)) add("error", page, `canonical does not match sitemap URL: ${canonical}`);

  const ogUrl = metaContent(head, "property", "og:url");
  if (!ogUrl) add("warn", page, "missing og:url");
  else if (!samePage(ogUrl, url)) add("error", page, `og:url does not match sitemap URL: ${ogUrl}`);
  if (!metaContent(head, "property", "og:image")) add("warn", page, "missing og:image");

  const robotsMeta = metaContent(head, "name", "robots");
  if (robotsMeta && /noindex/i.test(robotsMeta)) add("error", page, "page is in the sitemap but marked noindex");

  const h1s = html.match(/<h1\b/gi) || [];
  if (h1s.length === 0) add("error", page, "no <h1> in server HTML (missing, or rendered client-side only)");
  if (h1s.length > 1) add("warn", page, `${h1s.length} <h1> tags`);

  for (const img of html.match(/<img\b[^>]*>/gi) || []) {
    const alt = attr(img, "alt");
    if (alt === undefined) {
      const src = attr(img, "src") || "";
      if (!/aria-hidden="true"/.test(img)) add("warn", page, `image without alt text: ${src.slice(0, 80)}`);
    }
  }

  const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  if (ldBlocks.length === 0) add("warn", page, "no JSON-LD structured data");
  for (const [, json] of ldBlocks) {
    try {
      const data = JSON.parse(json);
      if (page === "/services") {
        const catalog = (data["@graph"] || [data]).find((item) => item["@type"] === "ItemList");
        if (catalog) {
          const targets = new Set();
          for (const entry of catalog.itemListElement || []) {
            const service = entry.item;
            if (service?.["@type"] !== "Service") continue;
            catalogServiceCount++;
            let target;
            try { target = new URL(service.url); } catch {
              add("error", page, `${service.name}: missing or invalid service URL`);
              continue;
            }
            // Every service must have a unique, indexable landing page.
            if (target.hash || target.search || pathOf(target.href) === "/services") {
              add("error", page, `${service.name}: has no dedicated service page, got ${service.url}`);
            }
            if (!sitemapUrls.some((url) => samePage(target.href, url))) {
              add("error", page, `${service.name}: service URL is missing from the sitemap`);
            }
            if (targets.has(target.href)) add("error", page, `services share a landing page: ${target.href}`);
            targets.add(target.href);
          }
        }
      }
    } catch {
      add("error", page, "invalid JSON-LD block");
    }
  }

  const visible = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ");
  const words = visible.split(/\s+/).filter((w) => /[a-z]/i.test(w)).length;
  if (words < THIN_WORDS) add("warn", page, `short page: ~${words} words; review usefulness (not a minimum word requirement)`);
  if (/to be added|to be confirmed|\[PLACEHOLDER\]/i.test(visible)) add("warn", page, "visible placeholder text on page");

  for (const [, href] of html.matchAll(/<a\b[^>]*href="([^"#?]*)/gi)) {
    let target;
    if (href.startsWith("/") && !href.startsWith("//")) target = href;
    else if (href.startsWith(LIVE_ORIGIN) || href.startsWith(base)) target = href.replace(LIVE_ORIGIN, "").replace(base, "") || "/";
    else continue;
    target = target.replace(/\/$/, "") || "/";
    if (target.startsWith("/api") || /\.(pdf|jpg|jpeg|png|webp|svg)$/i.test(target)) continue;
    linked.add(target);
    if (target !== page) inbound.set(target, (inbound.get(target) || new Set()).add(page));
  }
}

if (sitemapPaths.has("/services") && catalogServiceCount !== 22) {
  add("error", "/services", `expected 22 services in the structured-data catalog, found ${catalogServiceCount}`);
}

for (const [title, pages] of titles) if (pages.length > 1) add("error", pages.join(", "), `duplicate title: "${title}"`);
for (const [desc, pages] of descriptions) if (pages.length > 1) add("warn", pages.join(", "), `duplicate meta description: "${desc.slice(0, 70)}..."`);

for (const target of linked) {
  const res = await get(`${base}${target}`);
  if (res.status >= 400 || res.status === 0) add("error", target, `broken internal link (HTTP ${res.status}), linked from ${[...(inbound.get(target) || [])].join(", ")}`);
  else if (res.status === 200 && !sitemapPaths.has(target)) add("warn", target, "linked internally but missing from the sitemap");
}
for (const page of sitemapPaths) if (page !== "/" && !inbound.has(page)) add("warn", page, "orphan page: in the sitemap but no other page links to it");

const notFound = await get(`${base}/seo-audit-check-${Date.now()}`);
if (notFound.status !== 404) add("error", "/<random>", `unknown URLs return HTTP ${notFound.status} instead of 404`);

const errors = issues.filter((i) => i.level === "error");
const warnings = issues.filter((i) => i.level === "warn");
console.log(`# SEO audit: ${base}\n`);
console.log(`Pages in sitemap: ${sitemapUrls.length} | Errors: ${errors.length} | Warnings: ${warnings.length}\n`);
console.log(`Services checked for dedicated sitemap pages: ${catalogServiceCount}\n`);
for (const [label, list] of [["Errors", errors], ["Warnings", warnings]]) {
  if (!list.length) continue;
  console.log(`## ${label}\n`);
  for (const i of list.sort((a, b) => a.page.localeCompare(b.page))) console.log(`- \`${i.page}\` ${i.message}`);
  console.log("");
}
if (!issues.length) console.log("No issues found.");
process.exit(errors.length ? 1 : 0);
