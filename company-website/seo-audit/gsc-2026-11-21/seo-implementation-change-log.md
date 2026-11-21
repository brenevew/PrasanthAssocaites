# Implementation change log

Implementation date: 21 November 2026. Branch `seo/gsc-optimisation-2026-11-21`. **Not deployed.**
Verification for every entry is in `seo-regression-test-report.md`.

**Rollback.** Each batch is one commit. To undo a batch: `git revert <commit>`, then redeploy. To undo everything: `git revert 530be64 f42e7de 6dc79cb 79382f8 3323002`. No database, environment variable or Cloudflare setting was changed, so code is the only thing to roll back.

**Unchanged on every page:** URL, `<title>`, H1, canonical, robots, Open Graph, schema `@id`s and types. The only description change is on the approval article (entry 4.1). Checked page by page for all 53 sitemap URLs against the live site.

---

## Batch 1: technical (`3323002`)

### 1.1 Redirect the renamed Nilgiris projects article

| | |
|---|---|
| URL | `/blog/building-in-the-nilgiris-lessons-from-three-projects` |
| Original configuration | No route, no redirect: **404** |
| Issue | The article was published at this URL on 19 Oct (`6623f40`), linked from the Nilgiris page and `llms.txt`, then renamed to `/blog/building-in-the-nilgiris-three-projects` on 23 Oct with no redirect |
| Evidence | Search Console: 10 impressions, 1 click, position 7.3 for the 404 URL; `curl` 404 on 21 Nov; git history |
| Change | 308 to `/blog/building-in-the-nilgiris-three-projects` in `next.config.ts`; test in `scripts/seo.test.cjs` covering this and `/projects/sasthapruri` |
| Keyword cluster | building in the Nilgiris district (informational) |
| Expected benefit | The old URL's signals pass to the live article; searchers who click the old result reach the article |
| Risk | None identified; the destination is the same article |
| Verification | Local build: 308 → 200, query string kept; test passes |
| Rollback | `git revert 3323002` |

No change for HTTP/HTTPS, www, or `/projects/sasthapruri`: verified correct (`seo-technical-audit.md` §1–2).

---

## Batch 2: Coimbatore commercial (`79382f8`)

### 2.1 `/locations/coimbatore`

| | |
|---|---|
| Original configuration | Title "Builders & Contractors in Coimbatore \| Prasanth Associates"; H1 "Builders and Building Contractors in Coimbatore"; 14 FAQs; no process section. **Title, description and H1 unchanged** (set 13 Nov; too recent to judge) |
| Issue | 674 impressions at position 10.1, 1.9% CTR. Queries "civil construction companies in coimbatore" (21), "structural engineer in coimbatore" (25), "warehouse construction in coimbatore" (25), "civil engineers in coimbatore" (46): those words were absent or used only in a narrower sense. The brief's "construction process" was present on the Gudalur page but not here |
| Changes | (a) New section "How a construction project runs in Coimbatore": 7 steps written for Coimbatore plots (patta/FMB/layout → CCMC, DTCP or self-certification route; road width and setbacks; coordinated drawings; BoQ; approval filing; stage checks; handover). Rendered by the existing `process` slot, so no new component. (b) Civil construction sector text now opens "As civil contractors in Coimbatore, we build … factories and warehouses". (c) FAQ "Do you have structural engineers in Coimbatore?" → "Do you have civil and structural engineers in Coimbatore?", and the answer adds site visits and supervision. (d) FAQ "Do you build factories and industrial sheds…" → "…factories, warehouses and industrial sheds…" (warehouses are already a quote-form option for this service). (e) "For a villa" now links to `/services/villa-construction` |
| Keyword cluster | builders / building contractors / civil contractors in Coimbatore |
| Expected benefit | Relevance for the civil and engineer variants Google already tests the page for; clearer route to the villa page for villa intent |
| Risk | Low. FAQ count unchanged (14). Changing two question wordings changes the FAQ schema text, which is normal. Every claim uses facts already on the site |
| Verification | Visible at 1440 and 390 px; 0 overflow; tests pass; page metadata identical to live |
| Rollback | `git revert 79382f8` (also reverts 2.2 and 2.3) |

### 2.2 `/services/residential-construction`

| | |
|---|---|
| Original configuration | Title "House Construction, Coimbatore & Ooty"; H1 "House Construction in Coimbatore and Ooty"; 4 steps, 3 projects, 4 FAQs. Unchanged |
| Issue | The former `/services/house-construction-nilgiris` (redirected here on 23 Oct) had 6 clicks at position 10.4 and 17.6% CTR; this page had 58 impressions at position 27 and no clicks. It carried one Nilgiris FAQ and one Coimbatore FAQ, so the regional depth of the two old pages was lost |
| Change | New "Where we build" section (existing `towns` slot, as on the resort page): "Building a house in Coimbatore, Ooty and Gudalur", with cards for Coimbatore (CCMC/DTCP, narrow plots, expansive soils, Perur house), Ooty (altitude, slope, curing in the cold, HACA), Coonoor and Kotagiri (north-east monsoon, estate and farm land), Gudalur (rainfall, Section 17, the 2025 house). The note links to the sloping-plot article |
| Keyword cluster | house construction in Coimbatore / Ooty / Gudalur / Coonoor / Kotagiri |
| Expected benefit | The page answers the regional intent the old URLs served, which supports Google consolidating them here |
| Risk | Low; no new URL. All facts were already on the location pages or in `projects.ts` |
| Verification | As 2.1 |

### 2.3 `/services/villa-construction`

| | |
|---|---|
| Original configuration | Title "Villa Construction, Coimbatore & Ooty"; H1 "Villa and Bungalow Construction in Coimbatore and Ooty"; 4 FAQs, all about hill villas. Unchanged |
| Issue | "villa construction company coimbatore": 15 impressions at 31.6; old `villa-construction-coimbatore` URL 31 impressions at 18.7; this page 40 impressions at 29.1. Nothing on the page described a Coimbatore villa |
| Change | Regional cards (Coimbatore heat and courtyards, layouts and rainwater harvesting; Ooty slopes and climate; Coonoor and Kotagiri land and monsoon; Gudalur estate bungalows with the Pricol example). New FAQ "Do you build villas in Coimbatore?" citing the Gandhipuram office and the Perur house (described as a house, not a villa). The note links to the BoQ article |
| Keyword cluster | villa construction / villa builders in Coimbatore; villas in Ooty |
| Risk | Low. Doesn't claim a completed Coimbatore villa (none is documented) |
| Verification | As 2.1; FAQ schema count 4 → 5 |

---

## Batch 3: Ooty and the Nilgiris district (`6dc79cb`)

### 3.1 `/locations/nilgiris-ooty`

| | |
|---|---|
| Original configuration | Title "Builders in Ooty, Coonoor & Kotagiri \| Prasanth Associates"; H1 "Builders in Ooty, Coonoor and Kotagiri"; 5 condition cards; 11 FAQs. Title, H1 and description unchanged |
| Issue | 212 impressions at position 15.0; "construction company in ooty" at 57; the phrase did not appear on the page. The brief's site access and logistics, and hospitality experience, were on other pages only |
| Changes | (a) Intro now opens "Prasanth Associates is a construction company serving Ooty, Coonoor and Kotagiri, and the rest of the Nilgiris district, from its branch office in Gudalur". It says *serving*, because there is no Ooty office. The intro also feeds the page's `Service` schema description. (b) Sixth card "Access roads and materials". (c) FAQ "Do you build hotels, resorts and homestays in Ooty and Coonoor?" citing Sasthapuri Hotels and the Pricol bungalow, and linking the resort service |
| Keyword cluster | construction company / builders in Ooty, Coonoor; hill station construction |
| Risk | Low. The office location is stated honestly |
| Verification | FAQ schema 11 → 12, matching the visible text; 0 overflow; metadata identical to live |
| Rollback | `git revert 6dc79cb` |

### 3.2 `/locations/gudalur`: deliberately unchanged

Position 5.4; content rebuilt on 13 Nov against Angel Constructions. No verified content gap justified editing it. Testimonials were not added because their status is unresolved (technical audit §9). Note: its sitemap `lastmod` moved to 21 Nov because all three location pages share `src/data/locationPages.ts`.

---

## Batch 4: supporting (`f42e7de`)

### 4.1 `/blog/building-plan-approval-coimbatore-nilgiris`

| | |
|---|---|
| Original configuration | Title "Building plan approval in Coimbatore and the Nilgiris: how it works"; SEO title "Plan Approval in Coimbatore & Nilgiris"; about 600 words; sections: who approves, documents, setbacks, Nilgiris, how long it takes, how we help; no references |
| Original description | "Which authority approves your building plan, the documents you need, and why plots in the Nilgiris hill areas need extra checks. A plain guide for owners." |
| Updated description | "Who approves your building plan, the documents and fees, how long approval takes, and the extra hill-area checks for Ooty and Gudalur plots. A plain guide." |
| Issue | 119 impressions at position 6.4 with 2.5% CTR, below what that position usually earns. The query "how long will it take to get approval" (position 4) was answered by one vague paragraph. No fees, no self-certification, no delay factors, no comparison of the two regions, no sources |
| Changes | Kept every existing section. Added: single window portal and self-certification (conditions from the portal; **no size limits**, because sources conflict); fuller document list; HACA, departmental NOCs, Section 17 and guest-use approval; a Coimbatore vs Nilgiris comparison table; "How long does approval take?" (TNCDBR 2019: further particulars within 15 days; permission within 45 days once complete; hill clearances add separate steps; no promised dates); "What delays an approval"; "The fees you should expect" (fee *names* from the portal, no amounts); the roles of the architect and engineer; three owner questions; `references` to TNCDBR 2019 (CCMC copy) and two portal pages; `dateModified: 2026-11-21` |
| Evidence for regulatory text | onlineppa.tn.gov.in/faq (Q11: up to 45 days; Q19: fee names), onlineppa.tn.gov.in/document-needed (self-certification documents), TNCDBR 2019 (15 and 45 days). Read 21 Nov. **Not stated, because the sources conflict:** permission validity (the FAQ says 3 + 3 years, the rules say 5 + 3) and self-certification area limits |
| Keyword cluster | building plan approval Coimbatore / Nilgiris; how long does approval take; approval fees and documents |
| Expected benefit | Better match for question searches; higher CTR from a description that names timing and fees |
| Risk | Regulatory text can go out of date. The article says to confirm current lists and limits on the portal; review it every 6 months (backlog B8) |
| Verification | 857 → 1,671 words; tables scroll on mobile like the existing one; links resolve (test); sitemap `lastmod` and JSON-LD `dateModified` both 2026-11-21 |

### 4.2 `/services/interior-designs`

| | |
|---|---|
| Original | 3 FAQs, none regional; title, H1 and description unchanged |
| Issue | 11 impressions at 35.0; the old `interior-design-coimbatore` URL 31 impressions at 5.7; "interiors in ooty" at 8 |
| Change | FAQ "Do you design interiors for homes in Coimbatore and Ooty?": which office handles which area; heat and ventilation in Coimbatore, moisture in the hills |
| Risk | Low. No interior case study was invented |

### 4.3 GA4 `email_click`

| | |
|---|---|
| Original | `mailto:` links (footer, contact page, location pages, planner share) were not measured |
| Change | `LeadAnalytics.tsx` sends `email_click` from the existing delegated listener; `ga4.ts` maps it with the same parameter allowlist (page path only); test added |
| Risk | None to SEO. No personal data (verified: the event carries only `page` and `landing_page`) |
| Owner follow-up | Mark `email_click` as a key event in GA4 if wanted (backlog A6) |

---

## New internal links

| From | To | Anchor |
|---|---|---|
| `/locations/coimbatore` (overview) | `/services/villa-construction` | villa or bungalow |
| `/services/residential-construction` (towns note) | `/blog/building-on-sloping-plot-ooty-gudalur` | building on a sloping plot in Ooty or Gudalur |
| `/services/villa-construction` (towns note) | `/blog/how-to-read-a-construction-boq` | guide to reading a construction BoQ |
| `/services/villa-construction` (FAQ) | `/projects/residential-building-perur-coimbatore` | 3,500 sq. ft. house in Perur |
| `/locations/nilgiris-ooty` (FAQ) | `/projects/sasthapuri`, `/projects/pricol`, `/services/resort-homestay-construction` | Sasthapuri Hotels; Pricol Limited tea bungalow; resort and homestay construction |
| Approval article | `/blog/building-homestay-ooty-nri`, `/services/structural-drawings`, `/services/renovation` | building a homestay in Ooty as an NRI; structural drawings; renovation service |

No footer links were added.
