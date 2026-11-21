# SEO regression test report

Date: 21 November 2026. Code: branch `seo/gsc-optimisation-2026-11-21` at `530be64`.
Baseline: the live site (`https://prasanthassociates.com`, which runs `main` at `48ddd61`), fetched the same day.

## Result: no regressions found

| # | Check | How | Result |
|---|---|---|---|
| 1 | Automated SEO, GA4 and FAQ tests | `npm run test:seo` (19 tests: 18 existing + 1 new) | **19 passed, 0 failed.** Baseline before changes: 18 passed |
| 2 | Type check | `npx tsc --noEmit` | Passed |
| 3 | Lint (changed files) | `npx eslint` on the 10 changed source and test files | Passed, no warnings |
| 4 | Production build | `npm run build` | Passed. Every page `○` or `●` (static); only the three API routes are `ƒ`, as before |
| 5 | Sitemap crawl | `node scripts/seo-audit.mjs http://127.0.0.1:3217` | 53 pages, 24 services, **0 errors, 0 warnings** (canonicals, titles, links, status) |
| 6 | Metadata, page by page | Script comparing local and live for all 53 sitemap URLs: title, description, canonical, robots, H1, schema types, FAQ count | Only intended differences (below) |
| 7 | Redirects | `curl` against the local build | New 308 works with query string; `sasthapruri`, legacy service and `/guides/` redirects unchanged; unknown slug 404 |
| 8 | Structured data | JSON-LD extraction | FAQPage questions match visible FAQs (new Nilgiris FAQ in both); `dateModified` 2026-11-21 on the article; no rating, review or offer added |
| 9 | Browser, desktop 1440 px and mobile 390 px | Playwright with Chrome on 7 pages (6 changed + Gudalur) | Each new section found and visible; horizontal overflow 0 on all; no console or page errors |
| 10 | Analytics | Click on a `mailto:` link on `/contact` in the browser | `email_click` fired with only `page` and `landing_page`; no address, no query |
| 11 | Enquiry forms and WhatsApp | `npm run test:submissions`; `git diff 48ddd61 --stat` | **10 passed, 0 failed.** No form, server action, WhatsApp or upload file is in the diff (11 files: config, tests, data, `analytics.ts`, `ga4.ts`, `LeadAnalytics.tsx`). A live submission still needs doing after deployment (below) |

### Intended differences found by check 6

| URL | Title | Description | H1 | Canonical | Robots | Schema types | FAQ questions | Words |
|---|---|---|---|---|---|---|---|---|
| `/locations/coimbatore` | same | same | same | same | same | same | 14 → 14 | 3,302 → 3,594 |
| `/locations/nilgiris-ooty` | same | same | same | same | same | same | 11 → 12 | 2,806 → 2,938 |
| `/services/residential-construction` | same | same | same | same | same | same | 4 → 4 | 1,109 → 1,481 |
| `/services/villa-construction` | same | same | same | same | same | same | 4 → 5 | 1,052 → 1,415 |
| `/services/interior-designs` | same | same | same | same | same | same | 3 → 4 | 863 → 941 |
| `/blog/building-plan-approval-coimbatore-nilgiris` | same | **changed** (entry 4.1) | same | same | same | same | — | 857 → 1,671 |

The other 47 sitemap pages: no difference in any compared field. Word counts include navigation and footer text.

## Before deploying

1. Merge the branch into `main` and deploy as usual (`DEPLOYMENT_GUIDE.md`).
2. After deploying, submit one test enquiry on the live site, check it reaches the Google Sheet, then delete the row.
3. `node scripts/seo-migration-verify.cjs https://prasanthassociates.com` and
   `curl -sI https://prasanthassociates.com/blog/building-in-the-nilgiris-lessons-from-three-projects` (expect 308).
4. `npm run indexnow`.
5. In Search Console: URL Inspection → Request indexing for `/locations/coimbatore`, `/locations/nilgiris-ooty`, `/services/residential-construction`, `/services/villa-construction` and the approval article.
6. Rich Results Test on `/locations/nilgiris-ooty` and `/services/villa-construction` (FAQ counts changed).

Record the deployment date in `seo-performance-monitoring.md`; every comparison starts from it.

## After deployment: 21 November 2026

| Step | Result |
|---|---|
| Deployed `cb48baf` to production | Done by the owner |
| New redirect live | `/blog/building-in-the-nilgiris-lessons-from-three-projects?utm_source=check` → 308 → `/blog/building-in-the-nilgiris-three-projects?utm_source=check` |
| Changed content live | All 7 new sections and FAQs found in the live HTML; article `lastmod` 2026-11-21 in the live sitemap |
| `node scripts/seo-migration-verify.cjs https://prasanthassociates.com` | **PASS:** 26 one-hop 308 redirects, query strings kept, canonical destinations, 21 FAQ schemas, server-rendered regional content, real 404s |
| `node scripts/seo-audit.mjs https://prasanthassociates.com` | 53 pages, 24 services, **0 errors, 0 warnings** |
| IndexNow (`npm run indexnow` with the 6 changed pages and the redirected URL) | **HTTP 200 for 7 URLs** |
| Test enquiry on the live site (step 2) | **Owner:** not done here, because it writes to the live Sheet and emails the team |
| Search Console: request indexing (step 5) | **Owner** (needs a login) |
| Rich Results Test (step 6) | **Owner** (needs a browser session with Google) |
