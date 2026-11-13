# Technical SEO audit

Date: 2026-11-13. Site: https://prasanthassociates.com (Next.js 16 on Cloudflare via OpenNext; pages are statically generated).

## Already correct (Verified)

| Check | Evidence |
|---|---|
| HTTPS and host | `http://` apex and `www` both 301 to `https://prasanthassociates.com/`; `https://www…/locations/gudalur` 301s to the apex URL |
| Trailing slashes | `/locations/gudalur/` 308 to `/locations/gudalur` |
| Canonicals | Every sitemap page has a self-referencing canonical (`npm run seo:audit`, 50 pages, 0 errors) |
| GBP campaign URLs | `/locations/coimbatore?utm_source=google&utm_medium=organic&utm_campaign=gbp_coimbatore` and the Gudalur equivalent return 200; canonical stays the clean URL; query string kept in the browser |
| robots.txt | Allows everything except `/api/*`; points to the sitemap |
| Sitemap | 50 URLs, all 200 and indexable |
| Indexability | No `noindex` on public pages; only two placeholder project pages (`/projects/oxford-school`, `/projects/residential-building-ooty`) are `noindex` by design until their case studies exist |
| Server rendering | All page content is in the initial HTML |
| Internal links | All internal links on sitemap pages return 200; none point to redirects (checked 2026-11-12) |
| Old URLs | 30 permanent redirects for retired URLs (`next.config.ts`, `src/data/legacyRedirects.ts`), tested in `scripts/seo.test.cjs` |
| GA4 tag | `G-NJWX2XYRQZ` present on live pages, with consent defaults |
| Location pages | Coimbatore and Gudalur each have their own office details, map, schema entity and content; 80–88% unique against each other (checked 2026-11-12) |
| GBP website links | Coimbatore listing → `/locations/coimbatore`; Gudalur listing → `/locations/gudalur` (public listing pages, 2026-11-13) |

## Issues

| # | Problem | Where | Evidence | Severity | SEO impact | Fix | Status |
|---|---|---|---|---|---|---|---|
| 1 | Sitemap `lastmod` dates stuck at 2026-10-29 although pages changed on 12–13 November | `src/data/lastModified.json`, `/sitemap.xml` | Live sitemap max `lastmod` 2026-10-29 | High | Google uses `lastmod` as a recrawl hint; stale dates slow pickup of changes | Regenerated with `scripts/lastmod.mjs`. Root cause: the Cloudflare build clones without full history, so it keeps the committed file. Refresh and commit it after content changes | Implemented, Validated |
| 2 | Coimbatore office schema had no description and no list of services | `src/lib/officeSchema.ts` | Built JSON-LD for `#coimbatore-office` | Medium | Less information for Google to match the office to service searches | Added a description and an `OfferCatalog` of the 22 services shown on the page | Implemented, Validated |
| 3 | Gudalur branch schema listed 6 of the 22 services the page shows | `src/lib/officeSchema.ts` | Built JSON-LD for `#gudalur-branch` | Low | Same as above | Catalog now built from the page's service list (22) | Implemented, Validated |
| 4 | "Get directions" clicks and quote-button clicks were not measured | `src/components/analytics/LeadAnalytics.tsx`, `src/lib/ga4.ts` | No event in `EVENT_MAP` | Medium | Can't see map-intent leads by location | Added `directions_click` and `quote_cta_click` | Implemented, Validated |
| 5 | Coimbatore page had no answer for structural engineers, renovation or building estimates | `src/data/locationPages.ts` | Page FAQ list | Medium | Three priority keyword groups had no matching content on the location page | Three FAQs added in the existing accordion | Implemented, Validated |
| 6 | No Search Console verification tag on pages | Live HTML | No `google-site-verification` meta | Info | None if verified by DNS | Confirm the property is verified (DNS via Cloudflare is fine) | Requires access |
| 7 | Bing shows no pages from the site | Bing `site:` search, 2026-11-13 | No results | Medium | Bing feeds Copilot and ChatGPT local answers | Verify in Bing Webmaster Tools, submit sitemap; run `npm run indexnow` after deploys | Requires access |
| 8 | Core Web Vitals | — | PageSpeed API over its shared quota on 2026-11-13 | — | — | Check Search Console's Core Web Vitals report, or re-run PageSpeed | Not yet measured |
| 9 | Footer "Regional Offices" label is an `h5` directly after `h2` content | `src/components/layout/Footer.tsx` | Heading outline of every page | Low | Minor heading-order issue | Change the element to a non-heading with the same classes (no visual change) | Recommended |
| 10 | 2 px horizontal overflow at 390 px width | Floating WhatsApp button pulse and hero glow | Browser measurement | Low | None for SEO; small mobile polish | Clip overflow on those decorative elements | Recommended |
| 11 | Thin project pages (Perur, Manjushree, Gudalur house; under 250 words) | `src/data/projects.ts` | Word counts (2026-10-29) | Medium | Weaker proof for "house construction" searches | Add scope, method and outcome from project records | Requires owner approval (facts needed) |
| 12 | Search Console "Page with redirect" (24) and "Not found" (1) | Search Console | Screenshot provided 2026-11-12 | Info | None; redirects and a removed page (`/privacy` or `/terms`) | No action; optionally publish a real privacy policy at `/privacy` | Recommended |
