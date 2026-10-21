# SEO implementation and verification — 21 October 2026

## Outcome and scope

Implemented in the existing Next.js 16.3.4 App Router application. All 22 services now have distinct landing URLs: 21 new statically generated pages and the retained `/services/turnkey-design-build-coimbatore` page. Existing service names, descriptions, features and sector definitions are unchanged. No new packages, framework changes, font changes, image replacements or deployment configuration changes were made.

The implementation is local and ready for deployment. It has **not** been deployed or submitted to a search engine. Before implementation, read-only production checks confirmed that the 21 proposed service routes returned 404; the existing turnkey page, services hub and three regional pages returned 200. The new routes return 200 in the tested local production build.

Existing uncommitted work was present when this task started. Source comparisons and content tests use the working tree captured at the start of this task, rather than assuming all Git changes belong to this implementation.

## Audit evidence

- [Baseline audit matrix](BASELINE.md): existing page and service routes, sectors, HTTP/indexing state, titles, descriptions, canonicals, H1s, schema, internal links, issues and proposed corrections.
- [Baseline evidence](baseline.json): complete existing service copy and taxonomy, inspected local routes, metadata and live HTTP checks.
- [Complete 22-service SEO matrix](SERVICES.md): every service exactly once, its original URL, landing URL, sector, SEO title, description, canonical, indexability and verification result.
- [Final HTTP validation](validation.json), [browser checks](browser-validation.json), [visual comparisons](visual-validation.json), [crawler output](final-crawl.txt), [build](build.txt) and [lint](lint.txt).

The baseline crawler found 22 errors, all caused by catalog service URLs pointing to hub fragments absent from the sitemap. These hash links themselves were valid navigation; the independently addressable service pages were missing. It also reported 99 warnings, including repeated false positives for intentionally decorative images with empty alt attributes. The final crawler reports **0 errors and 15 advisory warnings** across **41 sitemap pages**. The warning reduction includes correcting that decorative-image check; it is not a claim that 84 separate content problems were fixed.

## Implementation

### Service pages and metadata

`src/lib/serviceSeo.ts` is the central configuration for all 22 services. It supplies distinct titles and descriptions, absolute canonicals, Open Graph and Twitter metadata, explicit `index, follow` directives, sector classification and Service schema. Metadata targets Coimbatore and the Nilgiris naturally without repeating every town. The retained turnkey landing page keeps its existing Coimbatore focus. No keyword meta tags were added; pre-existing keyword tags on other pages were not expanded.

`src/data/serviceRoutes.ts` preserves the turnkey URL and maps the other service identifiers to `/services/<existing-slug>`. Existing identifiers and `/services#<slug>` navigation remain valid.

`src/app/services/[slug]/page.tsx` generates 21 pages at build time, using the exact existing short descriptions, full descriptions and capability lists. It reuses existing Button, ScrollReveal, ContactForm and CTABanner components and the established design classes. Each page includes one H1, visible breadcrumbs, a service-specific quote link and the existing enquiry form configured for that service. Unknown service paths return genuine 404 responses.

### Crawlability and internal relationships

The services hub's existing title text is now an actual anchor to the corresponding landing URL. Normal title/card activation continues to open the existing modal, including option selection and quote handoff; native new-tab actions can open the dedicated page. There are no additional visible menu items, buttons or sections on existing pages. Existing footer, regional and project navigation remains in place.

The hub ItemList, site-wide OfferCatalog and `/llms.txt` now reference the canonical landing pages. Existing Service entity IDs (`/services#<slug>`) are retained so these graphs continue to describe the same entities. The services hub links to every landing page in server HTML, rather than relying only on sitemap discovery. This follows Google's [crawlable-link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).

### Sitemap, robots and canonical host

The existing sitemap generator now includes all 22 service pages exactly once, the homepage and services hub, all three location pages, eight existing project pages and the other existing indexable public pages: **41 URLs total**. Redirect aliases and API endpoints remain excluded. No unreliable modification timestamps were added.

The existing robots generator already allows public content and references the correct HTTPS sitemap, so it required no source change. API paths remain disallowed. Every service page has exactly one self-referencing HTTPS canonical; query strings do not alter that canonical.

Read-only checks on 21 October 2026 verified that both `http://prasanthassociates.com/` and `https://www.prasanthassociates.com/` return **301 to `https://prasanthassociates.com/`**. Earlier repository documentation claiming otherwise is stale. No hostname/DNS/Cloudflare change is necessary based on these checks.

### Structured data and local facts

Service pages use `Service` and `BreadcrumbList`; provider references resolve to the existing business entity. Organization/GeneralContractor, WebSite, Coimbatore headquarters and Gudalur branch identities are reused. Existing visible FAQ markup is retained without creating new FAQs. Service properties were checked against the [Schema.org Service vocabulary](https://schema.org/Service); automated checks parse every JSON-LD block and verify required relationships, URLs and classifications.

Removed the unsupported `priceRange: "₹₹₹"` assertion from the global and regional business schemas. No ratings, licences, professional credentials, prices, new addresses or opening hours were invented. Existing office addresses, map coordinates, phones and hours agree across the current company data and regional schemas. Their real-world accuracy remains based on the supplied repository data, not a new independent business verification.

The existing telephone number is +91 94860 38761. WhatsApp is +91 9360337733, as separately requested earlier. These are distinct contact channels, not a schema conflict.

Coimbatore and Nilgiris regional pages and their visible content are preserved. Ooty, Coonoor, Kotagiri and Gudalur remain service areas where supported by existing regional content/schema; no additional physical offices or service-location page combinations were created.

### Images and performance

Audited 66 image assets totalling 12,856,795 bytes. The largest is 529,304 bytes; project photography is already WebP and existing Next Image components provide responsive variants. Existing image compositions, fonts, animation code and image bytes remain unchanged. The primary homepage image remains eagerly prioritized. The offscreen Nilgiris project photograph now uses native lazy loading and asynchronous decoding. Decorative alt attributes remain empty; no loaded broken images were found in the captured pages.

One local Chromium sample at 390×844, without network/CPU throttling:

| Page | Before LCP | After LCP | Before/after CLS |
|---|---:|---:|---:|
| Home | 268 ms | 408 ms | 0 / 0 |
| Services | 68 ms | 136 ms | 0 / 0 |
| Nilgiris | 88 ms | 92 ms | 0 / 0 |
| Contact | 84 ms | 84 ms | 0 / 0 |

These single local samples are diagnostic only. They are not production Core Web Vitals, a statistically controlled performance comparison or evidence of a speed improvement. INP and production field metrics were not measured. Raw samples are in `performance-before.json` and `performance-after.json`.

### Enquiry tracking

There is no connected analytics vendor in the existing project. The existing development-only abstraction now exposes local `prasanth:analytics` browser events; it does not send network requests, set cookies or install a tracking provider.

Instrumentation covers service-page visits, service selection in the modal, successful contact/quote responses, WhatsApp actions and telephone-link clicks. The safe event helper includes known service/sector IDs, a coarse recognized town when supplied, current route and the initial route of the current document session. It deliberately drops query strings, fragments, arbitrary URLs, names, phone numbers, email addresses, messages, exact addresses and file details. Landing context is in memory and resets on a full reload; it persists through client navigation. It does not implement cross-session attribution.

Conversions fire once after the application's successful response. They do not independently confirm production Google Sheet delivery. No external analytics reporting is available until an approved consumer is connected. Existing server actions and Google Sheets integration were preserved.

## Verification results

| Check | Result |
|---|---|
| Production build | PASS using Node 22.23.2 and `npm run build -- --webpack`; 21 new static service pages |
| TypeScript | PASS: `npx tsc --noEmit` |
| Full ESLint | 0 errors; the same 39 pre-existing warnings as baseline |
| Automated SEO tests | 4 passing tests: content/taxonomy preservation, metadata/schema relationships, sitemap coverage and tracking privacy/failure isolation |
| Service HTTP validation | All 22 URLs return 200, one canonical and H1, unique metadata, correct robots/social tags and parsed JSON-LD |
| Query canonical checks | All 22 retain their clean canonical with tracking query parameters |
| Missing routes | Unknown root, project and service paths return 404 |
| Sitemap/robots | 41 unique valid sitemap URLs; public content allowed; correct sitemap declaration |
| Full internal-link crawler | 0 errors; no broken internal links or unexpected redirects found |
| Sector filters | 8/6/4/4 counts preserved, including return to All Services |
| Enquiry flows | All 22 service quote pages render; card/modal options arrive preselected in the quote form |
| Form submissions | Existing quote form, new service-page form and existing contact form successfully submitted to a **local mock webhook**; no production lead/email was sent |
| WhatsApp/phone | Correct WhatsApp recipient and single click events; tests intercepted opening instead of contacting anyone |
| Browser errors | 0 page errors in the tested routes and interactions |
| Visual text | Identical on all 28 before/after desktop/mobile captures |
| Screenshot pixels | 26/28 exactly identical; the two Nilgiris captures have only 92/99 differing pixels, all within 8/255 per channel; zero changed pixels above that threshold |
| Layout | Identical screenshot dimensions; no new horizontal overflow in existing pages; new representative pages fit desktop/mobile |

The initial screenshot harness scrolled too quickly for the newly lazy-loaded image to paint. The Nilgiris image was explicitly scrolled into view and decoded before comparison. No source styles or snapshots were changed to hide a visual regression. External map iframe requests were blocked consistently in before/after screenshot runs. Screenshots use reduced motion and disable animations during capture, so pixel comparisons do not establish every animation timing; the existing animation implementation was unchanged.

Full captures are in `/private/tmp/prasanth-seo-20261021/before` and `/private/tmp/prasanth-seo-20261021/after`; new-page examples are in `/private/tmp/prasanth-seo-new-pages`. These are temporary local artifacts. The reusable optional scripts are `scripts/seo-visual.cjs`, `scripts/seo-visual-compare.cjs` and `scripts/seo-browser-check.cjs`. Playwright was already cached on this machine and was not added as an application dependency.

The default Node 18 shell is too old for this project's Next.js version. The default Turbopack build also encountered an environment worker-port restriction. The supported webpack production build completed successfully. This does not require changing the deployed framework or default compiler configuration.

## Remaining limitations and optional recommendations

1. **Deployment is pending.** Production checks above describe the pre-change site. The 22 landing URLs have been verified in the local production build only.
2. **Existing project content:** Oxford School and Residential Building Ooty detail routes contain placeholder wording and lack incoming links from the current portfolio UI. Existing project-name/title and meta-description length warnings also remain. Completing case studies or changing portfolio navigation needs a separate content/UI decision; no placeholder was replaced with invented facts.
3. **Existing copy and business claims:** All 22 service descriptions and specifications were preserved as requested. Claims already in that copy, such as bank acceptance, certifications or approval details, were not independently authenticated or amplified in new metadata/schema.
4. **Schema checks:** JSON syntax and service relationships passed local validation. Google's live Rich Results Test and Search Console were not run. Schema.org validity does not imply Google feature eligibility, rich results or indexing.
5. **Production conversion delivery and uploads:** Local mocked form submissions passed. Actual Google Sheets delivery, notification emails and file-upload storage were not exercised; production credentials/data were not used for tests.
6. **Tracking:** Local events are ready for an approved integration but are not a production analytics dashboard. Selected service attribution is in the local event payload; the unchanged Google Sheets action currently records its existing broader project category/details.
7. **Field performance:** Obtain production Core Web Vitals and representative INP data after deployment. The small local samples cannot establish production performance.
8. **Existing warnings:** The final crawler's 15 warnings and ESLint's 39 warnings are documented rather than resolved through prohibited visible-content changes or unrelated refactors.

## Files changed by this task

| Files | Purpose |
|---|---|
| `src/lib/serviceSeo.ts`, `src/data/serviceRoutes.ts` | Central 22-service metadata/schema configuration and stable landing routes |
| `src/app/services/[slug]/page.tsx` | 21 new static landing pages using existing content/components |
| `src/app/services/turnkey-design-build-coimbatore/page.tsx` | Central metadata and sector classification, existing visible page retained |
| `src/app/services/page.tsx`, `src/app/services/ServicesPageClient.tsx` | Canonical catalog URLs and crawlable existing service titles with modal behavior preserved |
| `src/app/layout.tsx`, `src/app/sitemap.ts`, `src/app/llms.txt/route.ts` | Updated discovery/catalog references, sitemap coverage and invisible analytics mounting |
| `src/app/locations/coimbatore/page.tsx`, `src/app/locations/gudalur/page.tsx`, `src/app/locations/nilgiris-ooty/page.tsx` | Remove unsupported schema price range; lazy-load offscreen Nilgiris photo |
| `src/lib/analytics.ts`, `src/components/analytics/LeadAnalytics.tsx` | Local events, sanitized attribution and delegated link tracking |
| `src/components/ui/ContactForm.tsx`, `src/app/request-quote/RequestQuoteClient.tsx` | Successful-response conversion hooks |
| `src/components/ui/WhatsAppWidget.tsx`, `src/components/planner/SimplePlannerForm.tsx`, `src/components/planner/steps/StepBuildingReport.tsx` | WhatsApp click hooks preserving URLs and messages |
| `src/components/ui/ServiceDetailModal.tsx` | Deduplicated service-selection event |
| `scripts/seo-audit.mjs` | Stronger catalog/canonical/header checks and valid decorative-alt handling |
| `scripts/seo.test.cjs`, `scripts/test-support/load-ts.cjs`, `scripts/seo-verify.cjs` | Automated configuration/privacy tests and deployed-HTML validation/matrix generation |
| `scripts/seo-browser-check.cjs`, `scripts/seo-visual.cjs`, `scripts/seo-visual-compare.cjs` | Optional reusable browser regression tooling |
| `package.json` | Add `test:seo` and `seo:verify` commands; no dependency changes |
| `seo-reports/*` | Baseline, complete service matrix, evidence and completion report |

No source-data copy or sector definitions were changed by this task. Three synthetic records written by the existing local development mirror during form tests were removed, restoring the original local records.

## Build, validate and deploy

From `company-website/frontend`, use the installed supported Node version:

```sh
source ~/.nvm/nvm.sh
nvm use 22
npm run test:seo
npm run lint
npx tsc --noEmit
npm run build -- --webpack
```

For a standalone local preview of that build:

```sh
cp -R public .next/standalone/public
cp -R .next/static .next/standalone/.next/static
PORT=3100 HOSTNAME=127.0.0.1 node .next/standalone/server.js
```

In another terminal:

```sh
npm run seo:verify -- http://127.0.0.1:3100
npm run seo:audit -- http://127.0.0.1:3100
```

Deploy through the existing Cloudflare/GitHub-connected production pipeline, using the existing adapter, secrets and production variables. This repository does not contain the dashboard deployment configuration; no new deployment command or infrastructure setting was introduced. Keep `NEXT_PUBLIC_SITE_URL=https://prasanthassociates.com`. This work does not require DNS, SSL, email or Cloudflare rule changes.

After deployment:

```sh
npm run seo:verify -- https://prasanthassociates.com
npm run seo:audit -- https://prasanthassociates.com
```

The verifier regenerates `SERVICES.md` and `validation.json` for the requested target. Keep a copy of the local evidence if you want both records.

For optional browser checks, set `PLAYWRIGHT_MODULE` to an existing Playwright installation. `SEO_MOCK_SUBMISSIONS=1` must be used only with a local server explicitly configured to use a local test webhook. Without it, the script performs read-only/UI checks and does not submit forms.

## Google Search Console follow-up

After the deployed checks pass, use the authorized Search Console property to inspect representative service URLs from each sector, confirm Google's selected canonical and rendered content, and confirm the sitemap is read successfully. Submit or refresh `https://prasanthassociates.com/sitemap.xml` only from that authorized account. Review Page Indexing and Core Web Vitals over time; compare service and regional query performance without assuming a ranking or indexing guarantee. Check the local business and breadcrumb markup in Google's live testing tools where supported. No sitemap submission or IndexNow notification was sent during this implementation.
