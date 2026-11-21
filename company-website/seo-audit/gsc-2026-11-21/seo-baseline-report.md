# SEO baseline report

Source: `prasanthassociates.com-Performance-on-Search-2026-11-21.xlsx`, web search, 23 October to 19 November 2026 (28 days).
Live-site checks: 21 November 2026.

## 1. Headline figures (Verified)

| Metric | Value |
|---|---:|
| Impressions | 2,646 |
| Clicks | 96 |
| CTR | 3.6% |
| Average position | 9.0 |
| Queries listed | 129 |
| Landing URLs listed | 76 |

| Period | Impressions | Clicks | CTR |
|---|---:|---:|---:|
| 23 Oct to 5 Nov (14 days) | 1,288 | 60 | 4.66% |
| 6 Nov to 19 Nov (14 days) | 1,358 | 36 | 2.65% |

Context for the drop in clicks:

- 23 October alone had 13 clicks, the most of any day, and coincides with the URL migration deployed that day. Without that day, the first period has 47 clicks.
- Position worsened on 9 November (21.9) and 15 November (14.0): days on which Google tested pages for broader queries. Impressions without clicks on those days pull CTR down.
- 24 service and guide URLs were redirected on 23 October. Their impressions and clicks are split between old and new URLs for the whole period (section 5).

| Device | Impressions | Clicks | CTR | Position |
|---|---:|---:|---:|---:|
| Mobile | 1,589 | 42 | 2.64% | 7.22 |
| Desktop | 1,044 | 54 | 5.17% | 11.89 |
| Tablet | 13 | 0 | 0% | 3.62 |

Countries: India 2,417 impressions and 94 clicks. The United States (72), UAE (21), UK (7) and Australia (7) together have 107 impressions and no clicks. That is relevant to the NRI work added on 17 November, but too small to judge yet.

## 2. Branded and non-branded (Verified, with limits)

Only 567 of 2,646 impressions (21%) and 33 of 96 clicks belong to queries Search Console lists. The rest are anonymised, mostly rare queries, and **cannot be classified as branded or non-branded**.

Of the listed queries, classified with the regex in `seo-performance-monitoring.md` (name variants such as Prasanth and Prashanth, the Tamil spelling, the office building Sowma Complex, and the project names Sasthapuri, Manjushree and Rex school):

| Segment | Impressions | Clicks |
|---|---:|---:|
| Branded or navigational | 393 | 31 (94% of listed clicks) |
| Non-branded | 174 | 2 |
| Not listed (anonymised) | 2,079 | 63 |

The two non-branded clicks were "engineer near me" and "near by company", both at position 1. Every commercial query with a place name ranked between 20 and 181 (`seo-keyword-page-mapping.md` §3).

## 3. Top landing pages (Verified)

| URL | Clicks | Impr. | CTR | Pos. | Note |
|---|---:|---:|---:|---:|---|
| `/` | 24 | 568 | 4.2% | 5.0 | Branded traffic; Google Business Profile traffic lands on location pages instead |
| `/locations/coimbatore` | 13 | 674 | 1.9% | 10.1 | Most impressions on the site; Coimbatore GBP links here |
| `/locations/gudalur` | 8 | 349 | 2.3% | 5.4 | Best-ranking commercial page; Gudalur GBP links here |
| `/services/house-construction-nilgiris` | 6 | 34 | 17.6% | 10.4 | **Redirected on 23 Oct** to `/services/residential-construction` |
| `/property-investment` | 5 | 104 | 4.8% | 5.9 | |
| `/locations/nilgiris-ooty` | 4 | 212 | 1.9% | 15.0 | |
| `http://prasanthassociates.com/` | 4 | 163 | 2.5% | 7.2 | Old protocol; redirects correctly (see technical audit) |
| `/blog/building-plan-approval-coimbatore-nilgiris` | 3 | 119 | 2.5% | 6.4 | Best-performing article |
| `/services/villa-construction` | 3 | 40 | 7.5% | 29.1 | |
| `/projects/manjushree` | 3 | 17 | 17.6% | 7.2 | |

Full list with live metadata: `seo-page-inventory-2026-11-21.csv`.

## 4. Existing SEO already in place (Verified, from code and earlier reports)

Earlier work, which this exercise left intact:

- **Site-wide:** `metadataBase`, title template, self-referencing canonical on every page, `pageOpenGraph()`, site-wide `GeneralContractor` + `WebSite` graph with an `OfferCatalog` of all 24 services, two office entities (`#coimbatore-office`, `#gudalur-branch`) as `subOrganization`, `/llms.txt`, IndexNow key, generated `sitemap.xml` and `robots.txt`.
- **URL migration (23 Oct):** 24 location-suffixed service URLs and two `/guides/` URLs 308 to the consolidated pages (`src/data/legacyRedirects.ts`). Fixed by test against `seo-reports/legacy-urls-d24468b.json`.
- **Location pages (12–13 Nov):** keyword ownership set in `frontend/seo-reports/LOCATION-KEYWORD-STRATEGY-2026-11-12.md`. Coimbatore targets "builders / building contractors in Coimbatore", Gudalur targets "builders / construction company in Gudalur" (against Angel Constructions), and the Nilgiris page targets "builders in Ooty, Coonoor and Kotagiri". Each has 11–22 visible FAQs mirrored in FAQPage schema, case studies, local conditions and service sectors.
- **Service pages:** H1s "… in Coimbatore and Ooty", titles of 60 characters or fewer, `Service` + `BreadcrumbList` + `FAQPage` schema, 3–5 FAQs each. Text frozen against `seo-reports/baseline.json` by `npm run test:seo`.
- **Resort page (17 Nov):** NRI guide and town cards for UK, US and AU searchers.
- **GA4:** `whatsapp_click`, `phone_click`, `directions_click`, `quote_cta_click`, `generate_lead` (successful submissions only), with a parameter allowlist that never sends personal data.

## 5. Legacy URLs still collecting impressions

The 23 October migration is still settling in Google. These old URLs, all of which now 308 to a live page, appeared in the report:

| Old URL | Impr. | Clicks | Pos. | Now redirects to | Destination impr. / pos. |
|---|---:|---:|---:|---|---|
| `house-construction-nilgiris` | 34 | 6 | 10.4 | `residential-construction` | 58 / 27.1, 0 clicks |
| `building-plan-approval-nilgiris` | 36 | 2 | 6.0 | `architectural-designs` | 28 / 8.2 |
| `property-investment-consulting-coimbatore` | 32 | 1 | 5.6 | `real-estate-investment-consulting` | 88 / 10.0 |
| `villa-construction-coimbatore` | 31 | 0 | 18.7 | `villa-construction` | 40 / 29.1 |
| `interior-design-coimbatore` | 31 | 0 | 5.7 | `interior-designs` | 11 / 35.0 |
| 15 more, 3–15 impressions each | | | | | |

Reading this correctly: an old URL keeps its old position in reports until Google processes the redirect, so these positions describe the old pages, not a ranking the new pages can be expected to inherit straight away. But in several cases the consolidated page ranks noticeably worse for the regional intent the old page carried. That is the main content gap this exercise addresses (Batch 2), without reversing the migration (see `seo-backlog.md`, item B5).

## 6. Pages to protect

Change only with clear evidence; do not rewrite titles, H1s or URLs:

| Page | Why |
|---|---|
| `/` | Position 5.0, most clicks; owns "construction company in Coimbatore" |
| `/locations/gudalur` | Position 5.4; contested with Angel Constructions; content set on 13 Nov. **Not changed in this exercise.** |
| `/property-investment` | Position 5.9, 4.8% CTR |
| `/blog/building-plan-approval-coimbatore-nilgiris` | Position 6.4: improved in place, same URL, title and SEO title |
| `/projects/manjushree`, `/projects/sasthapuri`, `/projects/pricol`, `/projects/rex-school` | Branded and project-name traffic |
| Titles and descriptions of all three location pages | Changed on 12–13 Nov; most of this report's window predates them, so they cannot be judged yet |
