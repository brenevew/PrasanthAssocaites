# Keyword-to-page mapping

Date: 21 November 2026. Extends `frontend/seo-reports/LOCATION-KEYWORD-STRATEGY-2026-11-12.md` (which set location ownership) and `../keywords/*.csv` (keyword lists with evidence).

**No search volumes are given anywhere in this file.** None were available. Priorities come from Search Console impressions, the queries Google already tests the site for, Google autocomplete evidence in the earlier reports, and the business's confirmed services. Keywords with one or two impressions are directional only.

## 1. Ownership rules

| Intent | Owner | Must not compete |
|---|---|---|
| Brand and company-level ("construction company in Coimbatore", "Prasanth Associates") | `/` | Location pages link up to it; they don't repeat its title |
| "Builders / building contractors / civil contractors in Coimbatore" | `/locations/coimbatore` | Service pages target the *service*, not "builders in Coimbatore" |
| "Builders / construction company in Gudalur" | `/locations/gudalur` | `/locations/nilgiris-ooty` names Gudalur only as the branch location |
| "Builders / construction company in Ooty, Coonoor, Kotagiri"; "hill station construction" | `/locations/nilgiris-ooty` | No separate Coonoor or Kotagiri page (no documented projects there; decided 22 Oct) |
| A specific service in either region ("house construction", "villa construction", "interior designers") | `/services/<slug>` | Location pages link to it with descriptive anchors |
| How-to and cost questions ("how long does approval take", "how to read a BoQ") | `/blog/<slug>` | Articles link to the service that does the work |
| Proof ("Sasthapuri hotel", "Pricol bungalow") | `/projects/<slug>` | — |

## 2. Page-by-page mapping

GSC figures are 23 Oct to 19 Nov. "Gap" means a gap confirmed against the live page, and whether it was closed in this exercise.

### Location pages

| Page | Primary cluster | Secondary clusters | Intent | GSC (impr. / clicks / pos.) | Supporting pages | Gap and action |
|---|---|---|---|---|---|---|
| `/locations/coimbatore` | builders in Coimbatore; building contractors in Coimbatore | civil contractors, civil and structural engineers in Coimbatore; house construction in Coimbatore; renovation; warehouse and factory construction; kovai builders | Commercial, local | 674 / 13 / 10.1 | residential, villa, turnkey, commercial, industrial services; Perur and Sasthapuri projects; approval, BoQ and contractor-selection articles | No process section (Gudalur had one); "civil contractors" and "civil engineers" absent; warehouses absent. **Closed (Batch 2)** |
| `/locations/gudalur` | builders in Gudalur; construction company in Gudalur | house construction, building contractors, civil engineers, estate bungalows, interior design in Gudalur; construction cost in the Nilgiris district | Commercial, local | 349 / 8 / 5.4 | Pricol, Sasthapuri, Gudalur house, Manjushree; sloping-plot, BoQ, renovation articles | No content gap that justifies editing a page at position 5.4. Testimonials not added (see technical audit §9). **Protected, unchanged** |
| `/locations/nilgiris-ooty` | builders in Ooty, Coonoor and Kotagiri | construction company in Ooty; building contractors in Coonoor; house and villa construction in Ooty; hill station construction; resorts and homestays | Commercial, local | 212 / 4 / 15.0 | Rex school, Pricol, Manjushree; resort service; sloping-plot and NRI homestay articles | "Construction company" absent from the page copy; access and logistics covered only on the Gudalur page; no hospitality evidence in the FAQs. **Closed (Batch 3)** |

### Service pages with Search Console evidence

| Page | Primary cluster | Secondary | GSC (incl. redirected old URLs) | Gap and action |
|---|---|---|---|---|
| `/services/residential-construction` | house construction in Coimbatore and Ooty | home construction company; house builders; building a house in Gudalur, Coonoor, Kotagiri | 58 / 0 / 27.1; old `house-construction-nilgiris` 34 / 6 / 10.4; old `house-construction-coimbatore` 8 / 1 / 5.8 | One Coimbatore FAQ and one Nilgiris FAQ; regional detail lost in the merge. **Closed (Batch 2):** four regional cards |
| `/services/villa-construction` | villa construction in Coimbatore and Ooty | villa builders Coimbatore; estate bungalow; holiday home Ooty | 40 / 3 / 29.1; old `villa-construction-coimbatore` 31 / 0 / 18.7; old `-nilgiris` 4 / 0 / 44.5. Query "villa construction company coimbatore" 15 impressions at 31.6 | Page described only hill villas. **Closed (Batch 2):** regional cards and a Coimbatore villa FAQ |
| `/services/interior-designs` | interior designers in Coimbatore and Ooty | modular kitchen; interiors in Ooty; office interiors | 11 / 0 / 35.0; old `interior-design-coimbatore` 31 / 0 / 5.7 | No regional answer. **Partly closed (Batch 4):** one FAQ. No interior project case study exists (backlog B3) |
| `/services/architectural-designs` | architecture and house plans in Coimbatore and Ooty | building plan approval Nilgiris; architects near me | 28 / 0 / 8.2; old `building-plan-approval-nilgiris` 36 / 2 / 6.0 | Supported by the expanded approval article, which links to it. Page unchanged |
| `/services/smart-homes` | smart home automation in Coimbatore | home automation company Coimbatore | 51 / 0 / 28.8; queries "home automation in coimbatore" 9 impressions at 31.9, "smart home automation company in coimbatore" 8 at 29.5 | Largest non-branded query group on the site, ranked 29–50. No completed smart-home project to cite. **Backlog B4** |
| `/services/turnkey-design-build-coimbatore` | turnkey construction in Coimbatore | turnkey design and build | 30 / 1 / 19.1 | Long-form page already; unchanged |
| `/services/renovation` | house renovation in Coimbatore and Ooty | building renovation Coimbatore | 9 / 0 / 6.9; query "building renovation in coimbatore" 2 at 23 | Coimbatore location FAQ already answers it. Unchanged |
| `/services/industrial-factory-construction` | factory and PEB construction Coimbatore | warehouse construction Coimbatore | 17 / 1 / 14.4; query "warehouse construction in coimbatore" 1 at 25 | Warehouse is a quote-form option; now named on the Coimbatore page. Service page unchanged (its text is frozen by tests) |

The other 16 service pages had 0–13 impressions each: no evidence to act on. Unchanged.

### Articles

| Article | Cluster | GSC | Action |
|---|---|---|---|
| `building-plan-approval-coimbatore-nilgiris` | building plan approval Coimbatore and Nilgiris; how long does approval take; documents; fees; HACA | 119 / 3 / 6.4 | **Expanded (Batch 4)**, same URL |
| `how-to-read-a-construction-boq` | BoQ in construction; boq in real estate | 26 / 0 / 6.5 | Unchanged; linked from the new villa card |
| `before-you-draw-a-house-plan` | planning for a house | 25 / 0 / 6.5 | Unchanged |
| `building-homestay-ooty-nri` | homestay in Ooty, NRI | 24 / 1 / 2.6 | Unchanged (published 17 Nov); now linked from the approval article |
| `building-on-sloping-plot-ooty-gudalur` | sloping plot Ooty and Gudalur | 23 / 1 / 6.3 | Unchanged; now linked from the house service page |
| `building-in-the-nilgiris-three-projects` | building in the Nilgiris district | 16 / 1 / 7.8, plus 10 / 1 / 7.3 on its broken old URL | Old URL redirected (Batch 1) |
| `questions-to-ask-building-contractor-coimbatore-nilgiris` | how to choose a builder | 18 / 0 / 18.8 | Unchanged |

## 3. The 12 underperforming queries

All had zero clicks. "Likely page" is inferred from the page mapping (Search Console's export does not join query and page; check it in the Search Console UI with a query filter, see `seo-performance-monitoring.md`).

| Query | Impr. | Pos. | Likely page Google tested | Intended owner | Diagnosis | Action |
|---|---:|---:|---|---|---|---|
| house construction in coimbatore | 1 | 20 | location or residential page | `/locations/coimbatore` (builders), `/services/residential-construction` (service) | Two legitimate owners with different intents; the service page lacked Coimbatore depth | Coimbatore card on the house service page |
| civil construction companies in coimbatore | 1 | 21 | `/locations/coimbatore` | same | "Civil" wording absent | One "civil contractors" mention |
| building renovation in coimbatore | 2 | 23 | Coimbatore FAQ or `/services/renovation` | `/services/renovation` | Answered already | None (directional only) |
| structural engineer in coimbatore | 1 | 25 | Coimbatore FAQ | `/locations/coimbatore` FAQ, `/services/structural-drawings` | Answered already | FAQ now says "civil and structural engineers" |
| warehouse construction in coimbatore | 1 | 25 | `/services/industrial-factory-construction` | same | "Warehouse" absent from visible copy | Named on the Coimbatore page (sector text and FAQ) |
| best construction company in coimbatore | 1 | 26 | `/` | `/` | A "best" query, ranked on reviews and directories | Off-page: reviews (backlog) |
| villa construction company coimbatore | 15 | 31.6 | old `villa-construction-coimbatore` or `/services/villa-construction` | `/services/villa-construction` | Page described hill villas only | Coimbatore card and FAQ; location page now links "villa or bungalow" to it |
| civil engineers in coimbatore | 1 | 46 | `/locations/coimbatore` | same | Engineers named only as "structural" | FAQ now names civil engineers |
| construction company in ooty | 2 | 57 | `/locations/nilgiris-ooty` | same | Phrase absent; no Ooty office (honesty limits how far this can go) | Intro says "construction company serving Ooty…" |
| building construction in coimbatore | 1 | 61 | `/locations/coimbatore` | same | Broad; directories dominate | None beyond Batch 2 |
| home construction company in coimbatore | 1 | 81 | `/` or residential | `/` | Broad | None beyond Batch 2 |
| villa builders in coimbatore | 1 | 100 | villa page | `/services/villa-construction` | As above | As above |

**Cannibalisation check.** No two indexable pages share a title, H1 or primary cluster (tested by `npm run test:seo`). The only overlap is intended: a location page and a service page both mention "house construction in Coimbatore". The location page owns "builders", the service page owns the service, and they link to each other. The confusion visible in Search Console comes from old URLs that redirect, not from duplicate live pages.

## 4. Tamil and Tanglish searches

Search Console shows one Tamil-script query ("பிரசாந்த்", branded) and one Hindi query (home automation). There is no evidence of non-branded Tamil-script or Tanglish demand yet, so none was added. The existing copy keeps "kovai builders" in the Coimbatore page's `keywords` meta. Revisit if Tamil queries appear in the next export (backlog B9).
