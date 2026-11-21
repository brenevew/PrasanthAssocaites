# Technical SEO audit

Date: 21 November 2026. Live site checked with `curl` and a production build checked locally (Next.js 16.3.4, `next start`).
Earlier audit: `../technical-seo-audit.md` (13 November). Everything verified there was re-checked where Search Console raised a question.

## 1. HTTP, HTTPS and host (Verified, no change needed)

Search Console lists `http://prasanthassociates.com/` with 163 impressions, 4 clicks and position 7.18.

| Request | Result |
|---|---|
| `http://prasanthassociates.com/` | 301 → `https://prasanthassociates.com/` |
| `http://www.prasanthassociates.com/` | 301 → `https://prasanthassociates.com/` (one hop) |
| `https://www.prasanthassociates.com/` | 301 → `https://prasanthassociates.com/` |
| `http://prasanthassociates.com/locations/coimbatore` | 301 → same path on HTTPS (path preserved) |
| `https://www.prasanthassociates.com/blog` | 301 → `https://prasanthassociates.com/blog` |
| HSTS | `max-age=63072000; includeSubDomains; preload` (`next.config.ts`) |
| Canonicals | All 53 sitemap pages self-canonical on `https://prasanthassociates.com` |
| Sitemap | All `<loc>` values are `https://` apex |
| Internal `http://` links | None (crawl of 53 pages) |

Conclusion: redirects are correct, single-hop and path-preserving (Cloudflare settings). The HTTP impressions are Google still showing a URL it indexed earlier. **No new redirect rule was added**, as the brief requires.
**Requires access:** in Search Console, URL Inspection on `http://prasanthassociates.com/` should report "Page with redirect" with Google's selected canonical as the HTTPS URL. If it instead shows the HTTP URL as canonical, request indexing of the HTTPS home page.

## 2. Duplicate URL pairs

### `/projects/sasthapuri` and `/projects/sasthapruri` (Verified, already fixed)

| | `/projects/sasthapuri` | `/projects/sasthapruri` |
|---|---|---|
| Live status | 200, self-canonical, in sitemap | 308 → `/projects/sasthapuri` |
| GSC | 17 / 0 / 11.8 | 9 / 0 / 14.6 |
| Content | Case study | None (redirect) |
| Internal links | Location pages, articles | None |

The second URL is a misspelling that was live before the redirect in `next.config.ts` existed. No action is needed beyond waiting; a regression test was added in Batch 1.

### `/blog/building-in-the-nilgiris-three-projects` and `/blog/building-in-the-nilgiris-lessons-from-three-projects` (Verified defect, **fixed**)

| | `…-three-projects` | `…-lessons-from-three-projects` |
|---|---|---|
| Live status | 200, self-canonical, in sitemap | **404** |
| GSC | 16 / 1 / 7.75 | 10 / 1 / 7.3 |
| History | Current slug since `5bfba55` (23 Oct) | Published in `6623f40` (19 Oct), linked from the Nilgiris page and `llms.txt`, renamed on 23 Oct **without a redirect** |
| Content | The same article, renamed | — |

They are one article under two names, not two articles. The old URL earned a click and was still shown by Google while returning 404. **Implemented:** 308 to the current slug (`next.config.ts`), test added. Query strings are preserved.

## 3. Legacy service URLs (Verified, no change needed)

20 of the 76 Search Console landing URLs are 308 redirects from the 23 October migration. All resolve in one hop to a 200, self-canonical page in the sitemap, and the test `every retired d24468b URL…` enforces this. They will drop out of reports as Google consolidates them. See `seo-baseline-report.md` §5 for the content consequence.

## 4. Indexing and crawlability (Verified)

| Check | Result |
|---|---|
| `robots.txt` | Allows all except `/api/*` (for all agents and Googlebot); declares `https://prasanthassociates.com/sitemap.xml` |
| Sitemap | 53 URLs, all 200, all self-canonical, none redirecting |
| `noindex` | Only `/projects/residential-building-ooty` and `/projects/oxford-school`, placeholder project pages with no case study yet, by design. Both are out of the sitemap. This is the source of any "Excluded by noindex tag" report in Search Console; it is intended. Remove `noindex` only once a real case study is written (backlog B2) |
| Pages returning 200 outside the sitemap | Only the noindex placeholder above |
| Broken internal links | 0 (`npm run seo:audit` on the production build: 53 pages, 0 errors, 0 warnings) |
| Internal links to redirects | 0 |
| Redirect chains or loops | None; test asserts no redirect destination is itself a redirect source |
| Rendering | Every page static (`○`/`●`); all content in the initial HTML; no `ƒ` pages except the three API routes |
| Soft 404 | Unknown slugs return a real 404 (`/blog/does-not-exist` → 404) |
| Titles over 62 characters | None |
| Descriptions over 160 characters | None |

## 5. Orphan and discoverability check (Verified)

Every sitemap page is linked from the header, footer, a location page, a service page or an article (seo-audit crawl). Project pages link back to their location page and service. New internal links added in this exercise are listed in `seo-implementation-change-log.md`.

## 6. Structured data (Verified, no change needed)

| Page type | Types (besides the site-wide `GeneralContractor` / `WebSite` graph) |
|---|---|
| Home | `FAQPage` from `data/homeFaqs.ts` |
| Location pages (3) | Office entity (`GeneralContractor`, a subtype of `HomeAndConstructionBusiness`, `@id` `#coimbatore-office` or `#gudalur-branch`, with `PostalAddress`, `GeoCoordinates`, opening hours and an `OfferCatalog`), `WebPage`, `Service`, `BreadcrumbList`, `FAQPage` |
| Service pages (24) | `Service` (`@id` `/services#<slug>`), `BreadcrumbList`, `FAQPage` |
| Articles (11) | `BlogPosting` with `datePublished` / `dateModified`, `BreadcrumbList` |
| Projects | `WebPage`, `Place`, `ImageObject` and `BreadcrumbList` on detail pages |
| Blog index | `Blog` with `BlogPosting` entries, `BreadcrumbList` |

- The Nilgiris and Gudalur pages share `#gudalur-branch`, as documented, so Google sees one branch.
- No `aggregateRating`, `review` or `offers` anywhere (test enforced).
- FAQPage questions are built from the same arrays as the visible FAQs. Verified for the new Nilgiris FAQ: 12 questions in the schema, and the new question is present in the visible HTML.
- The approval article's `dateModified` is now `2026-11-21` in both JSON-LD and the sitemap.

No schema changes were needed. Adding types for their own sake would add risk without evidence.

## 7. Mobile (Verified for layout; Core Web Vitals not yet measured)

- At 390 px and 1440 px, every changed page: no horizontal overflow (`scrollWidth - innerWidth = 0`), no console or page errors, and new sections visible. The 2 px overflow noted on 13 Nov is no longer reproducible on these pages.
- The approval article's tables scroll sideways inside an `overflow-x: auto` wrapper on mobile, the same as the existing table on the live page.
- The floating WhatsApp button, `tel:` links and the enquiry form are unchanged.
- **Core Web Vitals: not yet measured.** No field data was available in this session. Check Search Console → Core Web Vitals (mobile) and PageSpeed Insights for `/`, `/locations/coimbatore` and `/locations/gudalur` (backlog B7).

## 8. Analytics (Verified)

| Action | Tracked | Event |
|---|---|---|
| WhatsApp link | Yes | `whatsapp_click` |
| Phone link | Yes | `phone_click` |
| Email link | **Added** | `email_click` (event name and allowlisted page path only) |
| Quote buttons | Yes | `quote_cta_click` |
| Successful enquiry, quote or planner submission | Yes | `generate_lead` with `form_type`, `service_name`, `service_sector`, `service_location` (coarse) |
| Get directions | Yes | `directions_click` |
| "Site visit request" | Not a separate action on the site; covered by `generate_lead` | — |

Each lead also records `landing_page`; traffic source and campaign come from GA4's own session attribution. Nothing personal is sent (test enforced). Qualified enquiries are judged in the Google Sheet, not in GA4 (see `seo-performance-monitoring.md`).

## 9. Trust finding that needs the owner

`src/data/testimonials.ts` is shown on the home page (verified live 21 Nov). Its header says "All names and quotes below are placeholder content", and names carry `// [PLACEHOLDER]` (for example "Vijay Raghavan", "Dinesh Mani", and one testimonial located in Kanniyakumari). An earlier note recorded the owner saying the testimonials are real. **These two statements conflict.** Displaying invented testimonials would breach Google's spam policies and consumer-protection law. They are not in structured data. **Requires owner approval:** confirm each one is real (and remove the placeholder markers), or replace them with real client quotes. They were deliberately **not** added to the location pages (backlog A1).
