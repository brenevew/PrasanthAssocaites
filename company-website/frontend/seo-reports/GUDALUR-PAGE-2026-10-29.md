# Gudalur Landing Page: Rebuild Record

Page: https://prasanthassociates.com/locations/gudalur. Date: 2026-10-29. Status: implemented in code, verified on a local production build, **not yet deployed**.

## 1. Existing page audit (before)

- **Stack:** Next.js App Router, statically rendered (`○` in the build), so all content is in the HTML crawlers receive. Layout `components/locations/LocationLanding.tsx` is shared with /locations/coimbatore and /locations/nilgiris-ooty; copy lives in `data/locationPages.ts`.
- **Metadata:** title "Gudalur Building Contractors, Nilgiris | Prasanth Associates" (60 chars), self-referencing canonical, Open Graph and Twitter tags, no `noindex`, listed in the sitemap.
- **Headings:** one H1 ("Building Contractors in Gudalur"), 7 H2s, sensible H3s.
- **Schema:** branch `GeneralContractor` (`#gudalur-branch`, shared with the Nilgiris page), `WebPage`, `FAQPage` (7 questions, matching the visible ones), `BreadcrumbList`. No rating markup (correct).
- **Strengths:** factual, careful copy; real projects; office card with address, phone, hours, map; quote form, call and WhatsApp.
- **Weaknesses:** no explanation of approvals (HACA, land classification), slopes, rainfall or estate logistics beyond short prompts; no process or BoQ explanation; services shown as six generic cards; project detail sat at the bottom, after the enquiry form; review count out of date (42, live 45).
- **Cannibalisation:** the Nilgiris page shares the Gudalur branch entity and covers Ooty, Coonoor and Kotagiri. The two are kept apart: Gudalur targets Gudalur queries; the Nilgiris page targets Ooty and the wider district. No duplicate Gudalur page exists.
- **Analytics:** GA4 via `lib/ga4.ts`; `LeadAnalytics` already sends `phone_click` and `whatsapp_click` for every tel/WhatsApp link, and forms send `form_submit` / `quote_submit`, all tagged with `page` and `landing_page`. Search Console verification is set in `layout.tsx`.

## 2. Keyword and intent mapping

No keyword-volume or difficulty data was available (no Search Console or keyword-tool access in this session), so none is quoted. Priority reflects relevance and intent only.

| Keyword | Type | Intent | Placement | Dedicated page better? |
|---|---|---|---|---|
| building contractors in Gudalur | **Primary** | Commercial/transactional | Title, H1, intro, URL context | No (this page) |
| construction company in Gudalur | Secondary | Commercial | Intro, FAQ, meta keywords | No |
| house construction in Gudalur | Secondary | Transactional | Meta description, case study, sector links | Service page exists (`/services/residential-construction`) |
| builders in Gudalur | Secondary | Commercial | Body, FAQ 1 | No |
| turnkey builders / turnkey house construction Gudalur | Secondary | Transactional | Meta description, sectors, FAQ 5 | Turnkey page exists |
| building contractors in Nilgiris | Secondary | Commercial | Body; mainly the Nilgiris page | Nilgiris page |
| HACA / building plan approval Gudalur | Supporting | Informational | Engineering card 1, FAQ 3 | Blog post exists (plan approval) |
| retaining wall construction Gudalur / slope stabilisation | Supporting | Informational/commercial | Engineering card 2, FAQs 4 and 9 | Possibly later, if demand shows in Search Console |
| waterproofing for houses in Nilgiris | Supporting | Informational | Engineering card 3, FAQ 18 | No |
| plantation / estate bungalow construction | Supporting | Commercial | Engineering card 4, Pricol case study, FAQ 10 | Villa page covers it |
| renovation of old bungalows | Supporting | Commercial | Manjushree case study, FAQ 11 | Renovation page + blog exist |
| construction cost per sq. ft. Gudalur / Nilgiris | Supporting | Commercial | FAQ 2 (factors, no figures) | A cost guide, once rates are confirmed |
| Tamil / Tanglish ("veedu kattum…") | Not used | | | No verified search-demand data; add only if Search Console shows these queries |

## 3. Final metadata

| Item | Value |
|---|---|
| Title (53 chars) | Building Contractors in Gudalur \| Prasanth Associates |
| Full-brand alternative (60 chars, previous) | Gudalur Building Contractors, Nilgiris \| Prasanth Associates |
| Meta description (147 chars) | House construction in Gudalur by turnkey builders: design, structural engineering and an itemised BoQ before work starts. Request your quote today. |
| Canonical | https://prasanthassociates.com/locations/gudalur (unchanged URL) |
| Open Graph / Twitter | Same title and description; `summary_large_image`; default OG image |
| Robots | Indexable (no robots meta, which defaults to index, follow) |
| Breadcrumb | Home › Nilgiris › Gudalur |

Trade-off: "Nilgiris" didn't fit in the title alongside the exact phrase and the brand under 60 characters. The exact phrase leads, and Nilgiris appears in the H1 area, the intro and throughout the page.

**Recommended (not done):** a 1200×630 OG image from a real Gudalur project photo (Pricol or the family house) to replace the default.

## 4. Page copy (as implemented)

All copy is in `src/data/locationPages.ts` → `gudalur`. Section order on the page:

1. **Hero:** H1 "Building Contractors in Gudalur"; 40-word intro; trust line "Engineering first, quality always. Structural drawings are ready before construction starts, and the site builds from them." (existing site wording). CTAs: "Request an Itemised Construction Quote" (→ form), call, "Discuss your hill-site project" (→ WhatsApp). Office card with address, phone, email, hours, **4.9★ from 45 Google reviews** (links to the Google listing), directions.
2. **Planning for Gudalur's slopes, rain and approvals:** five cards: land classification and approvals (Section 17, HACA, departmental NOCs, planning permission not replacing other clearances); slope stabilisation and retaining walls; high-rainfall moisture protection and structural waterproofing; estate material logistics (Pricol river crossing); climate-responsive planning. CTA after.
3. **Towns we have built in:** Gudalur, O'Valley, Ooty, Coonoor and Kotagiri, each with its own factual note.
4. **Our work in and around Gudalur:** existing project photo cards, galleries unchanged.
5. **Four Nilgiris projects in detail:** four case studies (Pricol, Sasthapuri, Gudalur family house, Manjushree), 80–110 words each, facts drawn from the project records, each linking to its project page. CTA after.
6. **Construction and design services in Gudalur:** the four existing sectors, each with an H3, two or three sentences and links to its service pages.
7. **From site assessment to final handover:** seven stages, stating that design-only, estimate-only and consultancy work cover only the stages engaged.
8. **How our itemised BoQ pricing works:** BoQ definition, why hill sites vary, twelve cost categories, how the fixed price works and what can change it. CTA "Request a Detailed Construction Estimate".
9. **FAQ:** 19 questions: the four required ones word for word, the 14 additional ones, plus "Do you also work in Ooty, Coonoor and Kotagiri?". Every answer leads with the answer, is 36–83 words, and contains no prices or guarantees.
10. **Our Gudalur office:** address, hours, map (unchanged).
11. **Tell us about your project:** existing form, unchanged.

Copy edit (same day): removed AI-typical phrasing ("not X but Y" contrasts, colon subtitles, repeated "For … owners, it shows" templates, forced keyword phrases, aphorisms). Headings suggested in the brief were replaced with plainer ones. Facts, links and the four required FAQ questions are unchanged.

Removed: the three bottom "overview" essays. Their facts and links now live in the case studies, sectors and FAQs.

Editorial copy is about 2,500 words; the full page, including form labels and navigation, measures about 3,500.

## 5. Structured data

- Unchanged: `GeneralContractor` `#gudalur-branch` (address, geo, phone, hours, `hasMap`, `parentOrganization`, `areaServed`), `WebPage`, `BreadcrumbList`.
- `FAQPage` now carries the 19 visible questions, generated from the same array, so it always matches the page. FAQ rich results were retired in May 2026; it's kept for machine readability only.
- **New:** `Service` "Building construction in Gudalur", `provider` → `#gudalur-branch`, `areaServed` Gudalur and The Nilgiris.
- No `aggregateRating`, prices, offers or unverified services.
- Validation: both JSON-LD blocks parse; question lists match the visible FAQ exactly. **Not yet run:** Google's Rich Results Test and the Schema.org validator need the live URL; run both after deploy.

## 6. Technical implementation

| File | Change |
|---|---|
| `src/data/locationPages.ts` | Seven new optional fields on `LocationPage` (`heroNote`, `quoteLabel`, `whatsappLabel`, `reviewsLink`, `conditionsCta`, `caseStudies`, `serviceSectors`, `process`, `pricing`); Gudalur entry rewritten; review count 42 → 45 |
| `src/components/locations/LocationLanding.tsx` | Renders each new field only when present, using existing classes (`badge-gold`, `nm-raised-sm`, `neu-glass`, `Button`, `ScrollReveal`, `AnswerText`); case-study facts (location, type, area, dates) read from `data/projects.ts` |
| `src/app/locations/gudalur/page.tsx` | New title, description and keywords; `Service` schema node |
| `scripts/aeo.test.cjs` | Copy-rules test now covers every new section, and checks that case-study and sector links resolve |

Header, footer, design tokens, project galleries, forms, WhatsApp, analytics and routes are untouched.

## 7. Internal linking plan

**From the Gudalur page (implemented):** 26 internal links. These cover all four sectors' service pages, the four project pages, three blog guides (hill plots, BoQ, bungalow renovation), the Nilgiris page and the quote form.

**Back to the Gudalur page (recommended, not changed):**

| Source | Anchor | Why |
|---|---|---|
| /blog/building-on-sloping-plot-ooty-gudalur | "building contractors in Gudalur" | Same audience; strongest topical match |
| /blog/building-plan-approval-coimbatore-nilgiris (Nilgiris section) | "HACA and land checks in Gudalur" | Points readers to the approvals card |
| /services/villa-construction | "estate bungalows in Gudalur" | Pricol is the villa page's best local proof |
| /services/residential-construction | "house construction in Gudalur" | Links the money page to its local version |

Project pages for Pricol, Sasthapuri and the Gudalur house already link to /locations/gudalur.

## 8. QA results (executed)

| Check | Result |
|---|---|
| Type check, lint | Pass (0 errors; 18 existing warnings, unchanged) |
| SEO and AEO tests (17), submissions tests (8) | All pass |
| Production build | Pass; page still static |
| Coimbatore and Nilgiris pages unchanged | Pass: identical visible text, headings, JSON-LD, links and metadata before and after |
| One H1, logical H2s | Pass |
| Title 53 / description 147 chars, canonical, indexable | Pass |
| FAQ schema matches visible questions (19/19) | Pass |
| All 26 internal links return 200; CTA anchors, call and WhatsApp links resolve | Pass |
| Script errors in browser, desktop 1440 and mobile 390 | None |
| Visual check, desktop and mobile screenshots | Matches the existing design; long CTA label fits at mobile width |
| Mobile horizontal overflow | 2 px, caused by the existing hero glow and floating WhatsApp button (sitewide, also on other pages); not from new content |
| Sitewide footer "Regional Offices" is an `h5` straight after `h2` content | Existing sitewide issue, not changed |
| Rich Results Test, real-device form submit, Core Web Vitals | **Not run**: need the deployed URL |

## 9. Items to verify before or soon after publishing

1. **"One team" for architecture and structural design** (hero, FAQ 6): based on the Pricol and Sasthapuri project records. Confirm this describes how you work today.
2. **Approvals wording:** reviewed against the TNCDBR 2019 rule that permission doesn't replace other clearances, and the TNSWP/DTCP checklist (HACA sites need forest and agricultural engineering NOCs). The consultant-quoted "300 sq m" HACA threshold was not published. Ask whoever handles your Nilgiris applications to read the approvals card and FAQ 3.
3. **Section 17 statement:** based on the Gudalur Janmam Estates Act and recent reporting; no current official rule on building permission was found. Confirm the wording matches your experience.
4. **Process claims:** "materials checked on delivery", "progress updates as each stage is completed", "handed over with the documents agreed in the contract". Confirm these describe your practice.
5. **Towns:** Coonoor and Kotagiri are stated as built in (your confirmation, 2026-10-07) with no named project; "school work at Bandi Shola" is The Oxford Continental School (no case study yet).
6. **Pricing:** no figures published. The calculator's ₹1,950 / ₹2,650 / ₹3,800 per sq. ft. could be added to FAQ 2 once you confirm they're current and apply to hill sites.
7. **Manjushree:** dates, scope and outcome are still missing; the case study says only what is documented.
8. **Review count:** 45 on 2026-10-29. Update as it grows. The **Nilgiris page still shows 42** for the same Gudalur office (left alone, as asked).
9. **Address wording:** Google lists the road as "Nagapattinam – Coimbatore – Gundlupet Hwy"; the site says "Ooty Main Road". Same place, but the shared address data affects other pages, so it wasn't changed.
10. **Sitemap dates:** `scripts/lastmod.mjs` groups the shared layout and data file with the Coimbatore and Nilgiris pages, so their `lastmod` will move to this commit's date even though their content didn't change. Harmless, but not strictly accurate.

## 10. Monitoring plan

Set the baseline in the week of deployment, then review at 30, 60 and 90 days. These are targets to watch, not guarantees.

**Search Console** (Performance → Page = `/locations/gudalur`):
- Impressions, clicks, CTR and average position for the page.
- Query groups (filter by regex):
  - Gudalur construction: `gudalur.*(contractor|builder|construction|company)`
  - Nilgiris construction: `nilgiri.*(contractor|builder|construction)`
  - Residential: `(house|home|villa|bungalow).*gudalur`
  - Turnkey: `turnkey`
  - Approvals: `haca|approval|plan.*gudalur`
  - Hill-site: `retaining|slope|sloping|waterproof`
- Non-branded share: exclude `prasanth`.
- URL Inspection after deploy: indexed, canonical as declared.

**GA4** (existing events; no new tracking added):
- `phone_click`, `whatsapp_click`, `form_submit`, `quote_submit` with `page` = `/locations/gudalur`; landing page = `/locations/gudalur` for leads that started here.
- Organic landing-page conversion rate = those events ÷ organic sessions landing on the page.

**Checkpoints:**
- **30 days:** indexed with the new title; impressions on approvals and hill-site queries appearing; no drop in existing Gudalur queries.
- **60 days:** average position and CTR trend for the Gudalur group; first enquiries attributed to the page.
- **90 days:** compare leads and non-branded clicks against the baseline; decide whether hill-site or cost topics deserve their own pages.

Changes that only reflect better tracking (for example, new query groups appearing) are noted separately from ranking changes.

## Sources

- TNCDBR 2019 (Rule 4): https://www.legitquest.com/act/tamil-nadu-combined-development-and-building-rules-2019/A077
- TNSWP / DTCP planning permission checklist: https://tnswp.com/DIGIGOV/StaticAttachment?AttachmentFileName=%2Fprocedure%2Fpre_est%2FPE_6.pdf
- HACA overview (consultant source, not relied on for thresholds): https://propdoc.in/haca-approval-guide/
- Gudalur Janmam Estates Act, 1969: https://en.wikipedia.org/wiki/Gudalur_Janmam_Estates_(Abolition_and_Conversion_into_Ryotwari)_Act,_1969
- Gudalur Janmam land status, 2026: https://www.onmanorama.com/news/kerala/2026/09/04/gudalur-janmam-bhoomi-story.html
- Gudalur rainfall: https://www.dtnext.in/news/tamilnadu/heavy-rains-batter-gudalur-pandalur-taluks-in-nilgiris and https://tamilnaduweatherman.blogspot.com/2010/07/rainfall-characteristics-of-nilgris.html
