# Coimbatore SEO: Audit, Keyword Map and Location Page Changes

Date: 2026-10-29. Changes were applied to **/locations/coimbatore only**, as instructed. Everything about other pages (home, services, 22 service pages) is a recommendation. Status: implemented and verified locally, **not committed or deployed**.

**Data limits.** No Search Console, Keyword Planner, Ahrefs, Semrush or DataForSEO access was available in this session, and Google's own results pages returned a captcha. Every search volume, difficulty and ranking below is therefore **Not verified**. Keyword lists are research hypotheses built from the site's services, competitor pages and how people describe these jobs. Check them against Search Console before investing in new pages.

## 1. Audit (Coimbatore-relevant)

| # | Finding | Status | Pages | Priority | Action |
|---|---|---|---|---|---|
| 1 | Home H1 "Construction Company in Coimbatore & the Nilgiris" and the Coimbatore page's H1 and title "Construction Company in Coimbatore" target the same phrase | Confirmed | Home, /locations/coimbatore | High | **Fixed**: location page now targets "building contractors in Coimbatore"; the home page keeps "construction company" |
| 2 | Coimbatore page linked to 6 of 22 services | Confirmed | /locations/coimbatore | High | **Fixed**: all 22, grouped by the four sectors, each with a one-line description |
| 3 | Service-page H1s are bare service names ("Residential Construction", "Architectural Designs") with no place name or search wording | Confirmed | All 22 service pages | High | Recommended (§6). H1s come from `services.ts`, which `seo.test` freezes, so a separate `h1` field is needed |
| 4 | Coimbatore review count out of date (23; listing shows 26) | Confirmed | /locations/coimbatore | Medium | **Fixed** (26, linked to the Google listing) |
| 5 | Home page counter "65 Google reviews" is out of date (live total 71) | Confirmed | Home | Medium | Recommended |
| 6 | Only one documented Coimbatore project (Perur) | Confirmed content gap | Coimbatore page, projects | High | Needs your project records (§15) |
| 7 | Competitors publish per-sq.-ft. rates (an IndiaMART listing shows ₹1,950–2,200); the site gives none outside the calculator | Confirmed | Coimbatore page, residential page | Medium | Needs rates you confirm (§15) |
| 8 | Coimbatore page had no explanation of approval route, soil, RCC and extensions, narrow plots, heat or rainwater rules | Confirmed | /locations/coimbatore | Medium | **Fixed**: six engineering cards |
| 9 | Sitewide footer label "Regional Offices" is an `h5` straight after `h2` content | Confirmed | All pages | Low | Recommended (change to a non-heading element) |
| 10 | Core Web Vitals | Not measured | — | — | Needs PageSpeed or Search Console field data |
| 11 | Indexing, canonicals, sitemap, robots, broken links | Checked earlier today | All 50 sitemap URLs | — | No issues (`npm run seo:audit`: 0 errors) |
| 12 | Content is server-rendered | Confirmed | All | — | No action |

## 2. The 22 services and their URLs

| Sector | Service | URL |
|---|---|---|
| Civil construction | Residential Construction | /services/residential-construction |
| | Villa Construction | /services/villa-construction |
| | Commercial Building & Retail Construction | /services/commercial-construction |
| | Turnkey Design and Construction | /services/turnkey-design-build-coimbatore |
| | Industrial & Factory Construction | /services/industrial-factory-construction |
| | Smart Home Automation | /services/smart-homes |
| | Renovation & Structural Retrofitting | /services/renovation |
| | Construction Consulting & Project Management | /services/construction-work-consulting |
| Design & architecture | Architectural Designs | /services/architectural-designs |
| | Interior Designs | /services/interior-designs |
| | Structural Drawings | /services/structural-drawings |
| | Electrical Drawings | /services/electrical-drawings |
| | Plumbing Drawings | /services/plumbing-drawings |
| | Landscaping Designs | /services/landscaping-designs |
| Estimate & valuation | Bank Valuation Report | /services/bank-valuation-report |
| | Structural Stability Certificate | /services/structural-stability-certificate |
| | Detailed Estimation & Costing (BoQ) | /services/detailed-estimation-costing |
| | Chartered Engineer & Technical Valuation | /services/chartered-engineer-valuation |
| Property & investments | Property Acquisition Advisory | /services/property-acquisition-advisory |
| | Land & Plot Transactions | /services/land-plot-transactions |
| | Real Estate Investment Consulting | /services/real-estate-investment-consulting |
| | Property Portfolio Management | /services/property-portfolio-management |

## 3. Keyword candidates per service

Volume, difficulty and current ranking: **Not verified** for every row. **Bold** = proposed primary for that page. "Problem" = searches by people who don't yet know the service name.

| Service | Candidates (commercial · specific · long-tail · problem) |
|---|---|
| Residential construction | **house construction in coimbatore**; individual house contractors coimbatore; duplex house construction coimbatore; house builders kovai; cost to build a 2000 sq ft house in coimbatore; contractor for G+1 house; *problem:* house construction budget planning |
| Villa construction | **villa construction coimbatore**; villa builders coimbatore; independent villa contractor; courtyard house design and build; villa construction cost per sq ft; *problem:* building a villa on my own plot |
| Commercial construction | **commercial building contractors coimbatore**; shop and office building construction; showroom construction coimbatore; school building contractors; commercial construction cost per sq ft; *problem:* building shops on my land for rent |
| Turnkey | **turnkey construction coimbatore**; turnkey house builders; design and build contractors coimbatore; what does turnkey construction include; turnkey vs labour contract; *problem:* one contractor for plan, approval and building |
| Industrial / factory | **factory construction contractors coimbatore**; PEB shed construction coimbatore; industrial shed contractors; pre-engineered building coimbatore; machine foundation design; *problem:* building a shed for my workshop |
| Smart homes | **home automation coimbatore**; smart home installation coimbatore; smart lighting and curtain automation; video door phone installation; *problem:* wiring a new house for automation |
| Renovation | **house renovation coimbatore**; building renovation contractors; structural retrofitting coimbatore; column strengthening; *problem:* can I construct another floor on my house; *problem:* cracks in house columns |
| Construction consulting | **construction consultant coimbatore**; site inspection engineer coimbatore; construction quality check; contractor bill verification; *problem:* checking my contractor's work |
| Architectural designs | **house plan coimbatore**; architects in coimbatore; building plan drawing coimbatore; 2D floor plan and 3D elevation; building plan approval drawings; *problem:* how to get building plan approval for an individual house |
| Interior designs | **interior designers in coimbatore**; modular kitchen coimbatore; wardrobe and false ceiling design; home interior cost coimbatore; office interior design coimbatore |
| Structural drawings | **structural engineer coimbatore**; RCC structural drawing services; structural design for house; bar bending schedule preparation; structural drawings for building approval; *problem:* do I need structural drawings for a house |
| Electrical drawings | **electrical drawing for house coimbatore**; house electrical layout plan; electrical load calculation for house; earthing layout; *problem:* where to place switches and sockets |
| Plumbing drawings | **plumbing drawing for house**; plumbing layout coimbatore; rainwater harvesting design; sump and overhead tank size; drainage layout |
| Landscaping | **landscape design coimbatore**; garden design coimbatore; drip irrigation for garden; villa landscaping |
| Bank valuation | **property valuation coimbatore**; bank valuation report coimbatore; home loan property valuation; valuer for loan against property; who prepares bank valuation reports in coimbatore; *problem:* documents needed for property valuation |
| Stability certificate | **structural stability certificate coimbatore**; building stability certificate engineer; stability certificate for school; stability certificate for factory; structural audit services coimbatore; *problem:* structural safety certificate required for school |
| Estimation / BoQ | **construction estimate coimbatore**; BOQ preparation services; house construction estimate; quantity surveyor coimbatore; how is a BOQ calculated; *problem:* how to calculate construction materials |
| Chartered engineer valuation | **chartered engineer valuation coimbatore**; plant and machinery valuation coimbatore; machinery valuation for bank loan; industrial building valuation; asset valuation for insurance |
| Property acquisition | **property buying advice coimbatore**; property document verification coimbatore; *problem:* how to verify land before buying; what is an encumbrance certificate; NRI property purchase checks |
| Land & plot transactions | **land for sale verification coimbatore**; DTCP approved plot check; FMB sketch boundary survey; patta and EC verification |
| Investment consulting | **real estate investment advice coimbatore**; rental yield coimbatore; where to buy property in coimbatore; NRI property investment coimbatore |
| Portfolio management | **property management services coimbatore**; rental property management; tenant management for NRIs; *problem:* how does rental property management work |

**Location page group** (owned by /locations/coimbatore): **building contractors in coimbatore**; house construction contractors in coimbatore; construction services in coimbatore; civil contractors coimbatore; building contractors gandhipuram; building plan approval coimbatore (supporting).

**Neighbourhood variants** (Saravanampatti, Peelamedu, Kalapatti, Ganapathy, Singanallur, Saibaba Colony, Vadavalli, Thudiyalur, Kovaipudur): **not targeted.** Your confirmed facts cover building in Gandhipuram and Perur and taking projects across Coimbatore. Naming other areas would imply local work that isn't documented, and separate area pages would risk being treated as doorway pages. Revisit if Search Console shows area queries and you have projects there.

**Tamil and Tanglish** (all Not verified; none added to the page):

| Query | Tamil script | Likely page |
|---|---|---|
| veedu kattum contractor coimbatore | வீடு கட்டும் கான்ட்ராக்டர் கோவை | /locations/coimbatore |
| kovai veedu construction | கோவை வீடு கட்டுமானம் | /services/residential-construction |
| veedu plan drawing coimbatore | வீட்டு வரைபடம் கோவை | /services/architectural-designs |
| veedu katta selavu coimbatore | வீடு கட்ட செலவு கோவை | Cost guide (once rates are confirmed) |
| house plan approval kovai | கட்டட அனுமதி கோவை | Plan-approval blog post |

Add these only if they appear in Search Console queries; then use them once, naturally, in an FAQ.

## 4. Master keyword-to-page map

| Page | Owns | Must not compete for |
|---|---|---|
| Home | construction company in coimbatore; builders in coimbatore; engineering and construction company | Any single service |
| /locations/coimbatore | building contractors in coimbatore; house construction contractors in coimbatore; construction services in coimbatore | Specific services (links to them instead) |
| /services/residential-construction | house construction in coimbatore; individual house contractors | "building contractors in coimbatore" |
| /services/turnkey-design-build-coimbatore | turnkey construction coimbatore | house construction in coimbatore |
| Each other service page | Its bold primary in §3 | Other services' primaries |
| Blog posts | Informational and problem queries (approval process, BoQ reading, contractor questions) | Commercial primaries |

## 5. Priority opportunities (by intent and fit, not volume)

1. **building contractors in coimbatore**: location page (done today).
2. **house construction in coimbatore**: residential page; needs a location-worded H1 and, ideally, published rates.
3. **structural stability certificate coimbatore** (schools, factories): specialist, high-intent, few strong local pages seen.
4. **factory / PEB shed construction coimbatore**: Coimbatore's industrial base makes this commercially valuable.
5. **plant and machinery valuation / chartered engineer valuation coimbatore**: niche, with bank and insurance demand.
6. **bank valuation report coimbatore**.
7. **structural engineer / structural drawings coimbatore**.
8. **house plan / building plan approval coimbatore**.
9. **construction cost per sq ft coimbatore**: blocked until you confirm rates.
10. **house renovation / adding a floor**: renovation page already answers "Can I add a floor?".

Before acting on any of these, check Search Console for queries ranking in positions 4–20 with impressions; those are the quickest gains.

## 6. Metadata recommendations for the 22 service pages

Current titles are unique and 54–60 characters; descriptions are unique and 142–155 characters. No changes are needed to titles or descriptions. **The gap is the H1**, which shows only the service name. Recommended H1s (to be added through a new `h1` field in `lib/serviceSeo.ts`, leaving the tested `services.ts` titles alone):

| Page | Current H1 | Recommended H1 |
|---|---|---|
| residential-construction | Residential Construction | House Construction in Coimbatore and the Nilgiris |
| villa-construction | Villa Construction | Villa Construction in Coimbatore and the Nilgiris |
| commercial-construction | Commercial Building & Retail Construction | Commercial Building Contractors in Coimbatore |
| turnkey-design-build-coimbatore | Turnkey Design and Build in Coimbatore | (keep) |
| industrial-factory-construction | Industrial & Factory Construction | Factory and PEB Shed Construction in Coimbatore |
| smart-homes | Smart Home Automation | Smart Home Automation in Coimbatore |
| renovation | Renovation & Structural Retrofitting | House Renovation and Structural Retrofitting |
| construction-work-consulting | Construction Consulting & Project Management | Construction Consultant and Site Inspection in Coimbatore |
| architectural-designs | Architectural Designs | House Plans and Architectural Design in Coimbatore |
| interior-designs | Interior Designs | Interior Design in Coimbatore and the Nilgiris |
| structural-drawings | Structural Drawings | Structural Drawings and RCC Design in Coimbatore |
| electrical-drawings | Electrical Drawings | Electrical Drawings for Houses in Coimbatore |
| plumbing-drawings | Plumbing Drawings | Plumbing and Rainwater Harvesting Drawings |
| landscaping-designs | Landscaping Designs | Landscape and Garden Design in Coimbatore |
| bank-valuation-report | Bank Valuation Report | Bank Valuation Reports in Coimbatore |
| structural-stability-certificate | Structural Stability Certificate | Structural Stability Certificates in Coimbatore |
| detailed-estimation-costing | Detailed Estimation & Costing (BOQ) | Construction Estimates and BoQ in Coimbatore |
| chartered-engineer-valuation | Chartered Engineer & Technical Valuation | Plant, Machinery and Technical Valuation in Coimbatore |
| property-acquisition-advisory | Property Acquisition Advisory | Property Buying Advice in Coimbatore |
| land-plot-transactions | Land & Plot Transactions | Land and Plot Checks and Transactions in Coimbatore |
| real-estate-investment-consulting | Real Estate Investment Consulting | Real Estate Investment Advice in Coimbatore |
| property-portfolio-management | Property Portfolio Management | Property Management Services in Coimbatore |

Pages that cover both regions keep "and the Nilgiris" where their titles already say so. No URL changes are recommended.

**Context-specific CTAs** (recommended for service pages): "Request a House Construction Estimate" (residential), "Discuss Your House Plan" (architectural), "Request a Structural Design Consultation" (structural), "Enquire About a Valuation Report" (valuation), "Discuss Your Commercial Building Project" (commercial). All use the existing quote form.

## 7. Coimbatore page content (as implemented)

Copy lives in `src/data/locationPages.ts` → `coimbatore`.

| Element | Value |
|---|---|
| Title (56) | Building Contractors in Coimbatore \| Prasanth Associates |
| Description (152) | House construction contractors in Coimbatore: plans, structural drawings, construction and an itemised BoQ from our Gandhipuram office. Request a quote. |
| H1 | Building Contractors in Coimbatore |
| Intro | Building contractors, Gandhipuram head office, what we design and build, itemised BoQ |
| Trust line | "Engineering first, quality always. Structural drawings are ready before construction starts, and the site builds from them." |
| Hero CTAs | Request a House Construction Estimate (form), Call, Discuss your project on WhatsApp |
| Office card | Address, phone, email, hours, 4.9★ from 26 Google reviews (links to the listing), directions |

Sections, in order:
1. **Planning your construction project in Coimbatore:** six cards: which authority approves your plan (CCMC, DTCP or local planning authority, the self-certification route); soil investigation before foundation design; RCC structure and adding floors; narrow city plots; heat, ventilation and rainwater (Tamil Nadu rule); electrical and plumbing coordination. CTA "Discuss your plot with an engineer".
2. **Our work in Coimbatore:** existing project photo card (Perur).
3. **Projects in detail:** the Perur house, and Sasthapuri Hotels, clearly labelled as Gudalur.
4. **Construction, design, valuation and property services in Coimbatore:** all 22 services in the four sectors, each with its own link and one-line description.
5. **FAQs (10):** the six existing ones (the approval answer now names CCMC, DTCP and self-certification), plus rainwater harvesting, factories and sheds, drawings or valuation without a construction contract, and cracks in walls or columns.
6. Office and map, enquiry form, and the three existing guidance sections, all unchanged.

## 8. Service-page FAQ recommendations

These questions aren't on the service pages yet (checked against `serviceFaqs.ts`). Answers must avoid prices, fees and authority claims unless confirmed.

| Page | Add |
|---|---|
| residential-construction | What is included in turnkey house construction? (link to turnkey) · How much does it cost to build a house in Coimbatore? (once rates are confirmed) |
| architectural-designs | Can I get a 2D floor plan and 3D elevation? · Who prepares building plan approval drawings? |
| structural-drawings | Do I need structural drawings for an individual house? · Can a structural engineer assess an existing house? |
| structural-stability-certificate | Do schools and factories need a stability certificate? (only with the confirmed regulatory basis) |
| bank-valuation-report | How do I get a bank valuation report? · How long does a valuation take? (no fixed times) |
| detailed-estimation-costing | How is a building BoQ calculated? |
| property-acquisition-advisory | What is an encumbrance certificate? · What documents should an NRI check before buying property? |
| property-portfolio-management | How does rental property management work? |

## 9. Internal linking plan

**Implemented (Coimbatore page):** 31 internal links, covering all 22 service pages, the Perur and Sasthapuri project pages, the turnkey page, the plan-approval and BoQ blog posts, the Nilgiris page and the enquiry form.

**Recommended (not changed):**

| From | To | Anchor |
|---|---|---|
| Home (projects or services section) | /locations/coimbatore | "building contractors in Coimbatore" |
| /services/residential-construction | /locations/coimbatore | "our Gandhipuram office" |
| /services/commercial-construction, /industrial-factory-construction | /locations/coimbatore | "building in Coimbatore" |
| /projects/residential-building-perur-coimbatore | /services/residential-construction | "house construction" (check it exists) |
| /blog/building-plan-approval-coimbatore-nilgiris | /locations/coimbatore | "building contractors in Coimbatore" |
| /blog/how-to-read-a-construction-boq | /services/detailed-estimation-costing | "detailed estimate and BoQ" |

Vary the anchors. The footer already links all 22 services.

## 10. Structured data

- Unchanged: `GeneralContractor` `#coimbatore-office` (address, geo, hours, phone, `parentOrganization`), `WebPage`, `BreadcrumbList`.
- `FAQPage`: 10 questions, generated from the visible list (verified identical).
- **New:** `Service` "Building construction in Coimbatore", `provider` → `#coimbatore-office`, `areaServed` Coimbatore.
- No `aggregateRating`, prices or credentials. Run Google's Rich Results Test on the live URL after deploy.

## 11. Technical fixes made

- `serviceSectors` links accept an optional one-line `note`. When notes are present, the list sits directly under the sector text instead of being pushed to the bottom of the card. Gudalur (no notes) renders exactly as before.
- Copy-rules test (`scripts/aeo.test.cjs`) now also checks the service notes.

## 12. Files modified

| File | Change |
|---|---|
| `src/data/locationPages.ts` | `coimbatore` entry: H1, intro, hero fields, rating 26, six engineering cards, case studies, 22-service sectors, four new FAQs, updated approval answer; optional `note` on sector links |
| `src/components/locations/LocationLanding.tsx` | Renders sector-link notes; list spacing when notes are present |
| `src/app/locations/coimbatore/page.tsx` | Title, description, keywords; `Service` schema |
| `scripts/aeo.test.cjs` | Covers sector-link notes |

## 13. QA results (executed)

| Check | Result |
|---|---|
| Type check / lint | Pass (0 errors; 18 existing warnings) |
| SEO and AEO tests (17), submissions tests (8) | All pass |
| Production build | Pass; page still static |
| Gudalur and Nilgiris pages unchanged | Pass: identical text, JSON-LD and CSS classes before and after |
| One H1; title 56 / description 152; canonical; indexable | Pass |
| FAQ schema matches visible FAQs (10/10) | Pass |
| All 31 internal links on localhost:3000 return 200; all 22 service pages linked once | Pass |
| Browser errors, desktop 1440 and mobile 390 | None |
| Screenshots | Matches the existing design. Fixed during QA: list spacing in service cards, and a CTA label too long for mobile |
| Rich Results Test, real form submission, Core Web Vitals | Not run (need the deployed URL) |

## 14. Search Console and GA4 monitoring

**Baseline (record before deploying):** Search Console → Performance → Page = `/locations/coimbatore`, last 3 months: clicks, impressions, CTR, average position; export queries. Do the same for the home page and the residential, architectural, structural and valuation pages.

**Query groups (regex filters):**
- Location: `(building|civil) contractor|construction (company|services)` with `coimbatore|kovai`
- House: `(house|home|veedu|duplex).*(coimbatore|kovai)`
- Design: `(plan|architect|elevation|structural|drawing)`
- Valuation and certificates: `valuation|valuer|stability|structural audit`
- Industrial: `factory|shed|peb|industrial`
- Property: `plot|land|property|patta|encumbrance`
- Non-branded: exclude `prasanth`

**GA4** (existing events, no new tracking): `phone_click`, `whatsapp_click`, `form_submit`, `quote_submit` filtered by `page` = `/locations/coimbatore`, and by `landing_page` for leads that started there.

**Watch for:**
- High impressions with CTR under about 2% → rewrite that page's title or description.
- Positions 4–20 → strengthen that page's content and internal links.
- Queries with no matching page → candidates for a new FAQ or blog post.

**Checkpoints:**
- **30 days:** new title indexed; "building contractors in coimbatore" impressions appearing; home page still ranking for "construction company".
- **60 days:** Coimbatore query-group positions and CTR.
- **90 days:** leads from the page compared with the baseline; decide on the service-page H1 changes and a cost guide.

## 15. Claims to verify

1. **Self-certification route:** stated without limits. Sources disagree on plot size, built-up area and height (the 2024 scheme, extended in 2025). Confirm it applies to the plots you work on.
2. **Rainwater harvesting:** based on TNCDBR 2019 Rules 55 and 63 (secondary sources). Confirm the current requirement with CCMC or DTCP.
3. **"Houses here are usually RCC frames"** and **"Coimbatore summers are hot"**: general statements, not company claims. Edit if you prefer.
4. **Soil:** the page says only that some soils swell and shrink. No Coimbatore soil map was found, so no areas are named.
5. **"We prepare the approval drawings, file the application and follow it up"**: from your confirmed facts (end-to-end approval service).
6. **Factories and PEB sheds:** offered per the service page, but there's no documented Coimbatore industrial project. Supply one if you have it.
7. **More Coimbatore projects:** Gandhipuram work is confirmed, but no project record exists. Any project with area, year and scope would strengthen the page.
8. **Pricing:** no figures published. Confirm the calculator rates (₹1,950 / ₹2,650 / ₹3,800 per sq. ft.) if you want cost answers with numbers.
9. **Review count:** 26 on 2026-10-29; update as it grows. The home page still shows 65 in total (live: 71).

## Sources

- TNCDBR 2019 Rule 4: https://www.legitquest.com/act/tamil-nadu-combined-development-and-building-rules-2019/A077
- Self-certification scheme: https://www.lexology.com/library/detail.aspx?g=7a53657d-94f0-478a-95e2-bdc5a38e71f5 · https://community.verified.realestate/article/tamil-nadu-expands-self-certification-approval-to-g2-and-stilt3-homes/ · https://www.chennairealties.in/tamil-nadu-building-plan-approval-rules-2026/
- Rainwater harvesting (TNCDBR Rules 55, 63): https://future.indiankanoon.org/doc/163875008/ · https://www.cseindia.org/laws-and-policy--1161
- Expansive soils: https://www.nbmcw.com/product-technology/construction-chemicals-waterproofing/waterproofing-repair-chemicals/foundation-practices-a-rehabilitation-of-structures-on-expansive-soils.html
- Competitor listings: https://m.indiamart.com/arconstructions · https://www.houzz.in/professionals/civil-engineers-and-contractors/vinayaga-buildings-pfvwin-pf~508284680 · https://www.builderonline.com/firms/sri-vijayadharani-associates · https://sites.google.com/view/saisaikumarconstruction/home
