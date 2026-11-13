# Validation results

Run on 2026-11-13 against the `local-maps-seo` branch (local production build) and the live site.

| Check | Result |
|---|---|
| TypeScript (`tsc --noEmit`) | Pass |
| ESLint (`src`, `scripts`) | Pass: 0 errors (18 existing warnings, unchanged) |
| SEO, AEO and GA4 tests (`npm run test:seo`, 18 tests, including new GA4 assertions) | Pass |
| Submission tests (`npm run test:submissions`, 8) | Pass |
| Production build (`next build`) | Pass; all pages remain static |
| `npm run seo:audit` on the local build | 50 pages, 0 errors, 0 warnings |
| Every built page compared with the build before the changes | Visible text changed only on `/locations/coimbatore` (3 FAQs). Structured data changed only on the three location pages. No new CSS classes anywhere (Coimbatore: 220 class combinations before and after) |
| FAQ structured data matches visible questions | Pass: Coimbatore 14, Gudalur 23, Ooty/Nilgiris 11 |
| Office catalogs | Coimbatore 22 offers, Gudalur 22 offers; both offices have a description |
| GBP campaign URLs (local and live) | 200; tags kept in the address bar; canonical stays clean |
| New events in a real browser (Chromium, desktop 1440 px and mobile 390 px) | Clicking "Get directions" sends `directions_click`, "Request…Quote" sends `quote_cta_click`, the phone link sends `phone_click`; each with `service_location` = `gudalur` or `coimbatore`; no personal data; no page errors |
| Live redirects | http → https, www → apex (301); trailing slash 308; canonical clean |
| Live robots.txt and sitemap | Correct; sitemap dates were stale before this change |
| Google Rich Results Test, Schema.org Validator | Not yet run (needs deployment) |
| Core Web Vitals | Not yet measured (PageSpeed quota exceeded) |
| Search Console indexing | Requires access |
