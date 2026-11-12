# Live website vs local SEO strategy — 12 November 2026

The live site passes the existing technical SEO crawler, but the keyword changes in local commit `1e3f4d3` are not reflected in the current public pages. Publishing and checking that release is the first priority. This review changes no application code and performs no deployment.

**Method:** Direct HTTP requests to the public site, a crawl of all 50 sitemap URLs using `scripts/seo-audit.mjs`, and comparison with local source and generated production HTML. All 22 service headings were fetched separately. Findings use these fresh responses; search-tool snapshots sometimes showed older content.

## Live vs local

| Area | Live response | Local implementation | Recommended action |
|---|---|---|---|
| Home title and H1 | Coimbatore & the Nilgiris | Coimbatore & Ooty | Publish the town-focused wording; retain Nilgiris for district references. |
| Home content | No new service-sector or five-town sections | Four service sectors and five town cards, with relevant links | Publish the prepared sections to make services and local coverage easier to discover. |
| Home description | Names Coimbatore, Ooty, Coonoor and Gudalur | Also names Kotagiri | Publish the revised description. |
| Shared service pages | All 21 retain their previous headings | Updated service/location headings | Publish the mapped headings. The independent turnkey heading already matches. |
| Structural drawings example | H1: “Structural Drawings” | H1: “Structural Drawings and Design in Coimbatore and Ooty” | Concrete example of the deployment gap. |
| Ooty location page | H1: “Builders in Ooty and the Nilgiris”; 5 FAQs | H1: “Builders in Ooty, Coonoor and Kotagiri”; 11 FAQs; four service sectors | Publish the expanded town, service, cost-factor and approval content. |
| Review counts | Home: 65; Coimbatore page: 26; Ooty page: 42; Gudalur page: 45 | Home: 77; Coimbatore: 32; Ooty: 45; Gudalur: 45 | Reconfirm counts against the listings before publishing. The revised numbers were supplied by the earlier research and were not independently reverified here. |

Examples: [home](https://prasanthassociates.com/), [structural drawings](https://prasanthassociates.com/services/structural-drawings), [house construction](https://prasanthassociates.com/services/residential-construction), [Ooty](https://prasanthassociates.com/locations/nilgiris-ooty), [Coimbatore](https://prasanthassociates.com/locations/coimbatore), [Gudalur](https://prasanthassociates.com/locations/gudalur).

## Technical checks

- Live crawler: **50 sitemap pages, 22 dedicated service pages, 0 errors, 0 warnings**. Its checks include responses, metadata, canonicals, H1 presence/count, image alt attributes, JSON-LD parsing, sitemap consistency, internal links and unknown-route responses. This is a defined automated check, not a ranking score or full structured-data eligibility assessment.
- [robots.txt](https://prasanthassociates.com/robots.txt) allows public pages, disallows `/api/*` and references the [sitemap](https://prasanthassociates.com/sitemap.xml).
- HTTP and HTTPS-www homepage variants return 301 to the HTTPS non-www homepage when requested with the audit user agent.
- Two legacy service spot checks return 308 to their current canonical paths: `/services/house-construction-coimbatore` and `/services/turnkey-construction`. This does not verify every historical URL.
- [Oxford School](https://prasanthassociates.com/projects/oxford-school) and [Residential Building in Ooty](https://prasanthassociates.com/projects/residential-building-ooty) both return 200 with `noindex, follow`. Local source intentionally excludes incomplete case studies. Add documented project detail before allowing indexing; simply removing `noindex` would leave the content gap.

## Further improvements, in priority order

1. **Publish the prepared keyword release, then verify the public HTML.** All 21 shared service headings differ from the local implementation. The main gap is delivery of existing work, rather than another round of title edits. Descriptive internal links help discovery and explain the linked pages: [Google's link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).
2. **Add useful construction-cost guidance for Coimbatore and Ooty.** Confirm current rates, inclusions, exclusions and hill-site extras first. [Juan's Ooty cost page](https://juanconstructions.com/house-construction-cost-in-ooty/) already presents packages and specifications. Its existence establishes a content comparison, not evidence that it outranks this site. CG Infra's packages page could not be rechecked because it returned 403 through the browsing tool.
3. **Expand first-hand local evidence.** Complete the two project pages above and obtain a documented Coonoor and Kotagiri project before considering separate town pages. Include actual scope, area/year where known, photographs and site constraints. This follows [Google's guidance on original, useful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).
4. **Measure results after publication.** Compare equivalent Search Console periods by landing page and town/service query; track clicks, impressions, CTR, position and enquiries. The previous Coverage spreadsheet contains no query-level ranking history and no affected URL examples for its 404 or crawled-not-indexed entries. Those two entries still require their URL details. [Google's Search Console guidance](https://developers.google.com/search/docs/monitor-debug/search-console-start).
5. **Measure mobile performance before making performance changes.** This review did not run Lighthouse, PageSpeed or obtain field Core Web Vitals. A successful crawl does not assess those metrics. [Google's page-experience guidance](https://developers.google.com/search/docs/appearance/page-experience).

**Limits:** No Search Console account data, current Maps ranking verification, backlink audit, independent review-count verification, browser rendering test or ranking improvement measurement. A better targeted page is an opportunity; its ranking or traffic benefit has not been demonstrated here.
