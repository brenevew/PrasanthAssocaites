# Search Console optimisation, 21 November 2026

Incremental SEO work driven by the Search Console export
`prasanthassociates.com-Performance-on-Search-2026-11-21.xlsx`
(web search, 23 October to 19 November 2026). It builds on the
13 November local SEO audit in `../` and the reports in `frontend/seo-reports/`.
Nothing already in place was removed, no URL was renamed, and the design is unchanged.

Branch: `seo/gsc-optimisation-2026-11-21` (not merged, not deployed).

| File | Contents |
|---|---|
| `seo-baseline-report.md` | The Search Console baseline, what the data can and cannot show, existing SEO already in place, pages to protect |
| `seo-page-inventory-2026-11-21.csv` | Every sitemap page and every Search Console landing URL: status, redirect, title, description, H1, H2s, canonical, robots, schema types, word count, GSC metrics (live site, before deployment) |
| `seo-keyword-page-mapping.md` | Which page owns which keyword cluster, the 12 underperforming queries, cannibalisation findings |
| `seo-technical-audit.md` | HTTP/HTTPS, duplicates, indexing, canonicals, sitemap, structured data, mobile, analytics |
| `seo-competitor-analysis.md` | Who appears for the target searches, and what would beat them |
| `seo-implementation-change-log.md` | Every change, with evidence, before/after, risk, verification and rollback |
| `seo-regression-test-report.md` | Tests run before handing over, with results |
| `seo-performance-monitoring.md` | How to measure the effect: segments, windows, filters, milestones |
| `seo-backlog.md` | Prioritised work that could not be done or verified here, including owner actions |

## Commits

| Commit | Batch |
|---|---|
| `3323002` | 1. Technical: redirect the renamed Nilgiris projects article |
| `79382f8` | 2. Coimbatore: location page process and terms; house and villa service pages |
| `6dc79cb` | 3. Ooty and the Nilgiris district: intro, access card, hospitality FAQ |
| `f42e7de` | 4. Plan approval guide, interior design FAQ, `email_click` tracking |
| `530be64` | Sitemap `lastmod` refresh |

## Status labels

Same as the 13 November audit: **Verified** (checked directly, dated), **Implemented** (changed in code),
**Validated** (implemented and tested), **Recommended**, **Requires access**, **Requires owner approval**,
**Not yet measured**.
