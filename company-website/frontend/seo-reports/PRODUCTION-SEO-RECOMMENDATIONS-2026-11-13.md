# Production SEO recommendations — 13 November 2026

The recent keyword work is now live. The next priorities are stronger local business signals, pricing guidance, first-hand project evidence and a clear explanation of who supplies the engineering expertise. Another broad rewrite of titles is not the first priority. These recommendations do not establish a guaranteed Google position.

## What was verified

- Ran the existing read-only crawler against production: **50 sitemap pages, all 22 dedicated service pages, 0 errors and 0 warnings**. The script checks responses, metadata, canonical consistency, H1 presence/count, JSON-LD parsing, image alt attributes, internal links and sitemap coverage. Passing it is not a ranking score or proof of structured-data rich-result eligibility.
- Retrieved fresh HTTP snapshots of the homepage, all three location pages, three service pages, About, Contact, the blog listing, robots.txt, sitemap.xml and two incomplete project pages. Fresh responses were used because browsing/search snapshots sometimes showed older versions.
- The homepage title and H1 now name **Coimbatore, Ooty and Gudalur**. The four service sectors and five town cards are present. The Ooty page has **11 FAQs**, and the sampled services use their new location headings. The Coimbatore and Gudalur page titles also reflect today's edits. The deployment gap in the 12 November comparison is resolved for these checks.
- Public pages are permitted by robots.txt, with `/api/*` excluded.
- The two incomplete Ooty project pages still return 200 with `noindex, follow` and display repeated “Project narrative to be added.” text.
- The homepage, location pages and sampled service entries in the live sitemap still use **29 October 2026** modification dates despite subsequent substantive edits.
- The public mobile PageSpeed API returned **429: quota exceeded**. No current Lighthouse score or field Core Web Vitals result was obtained.

## Recommended work, in order

### 1. Strengthen both Google Business Profiles

Maps visibility and ordinary website search results need separate measurement. Review the legitimate Coimbatore and Gudalur profiles: verification, appropriate primary/additional categories, construction/design services, correct address and hours, project photographs and links to the corresponding location page. Add tracking parameters to profile website links so profile traffic and enquiries can be distinguished in analytics.

Make requesting honest customer reviews part of handover and follow-up, and reply helpfully to reviews. Use each branch's own review link. Do not treat a fixed posting frequency or review quota as a ranking formula. Current profile settings and live review totals were not independently inspected in this review.

Google describes local ranking in terms of relevance, distance and prominence, including reviews and links. Consequently, a Gudalur office cannot be assumed to rank equally across Ooty, Coonoor and Kotagiri. Keep the real business name and actual office locations. Sources: [local ranking](https://support.google.com/business/answer/7091?hl=en), [review practices](https://support.google.com/business/answer/3474122?hl=en), [business representation](https://support.google.com/business/answer/3038177?hl=en).

### 2. Publish useful Coimbatore and Ooty construction-cost guides

The Ooty FAQ explains cost factors but supplies no example budget. The existing blog topics cover contracts, approvals and BoQs rather than dedicated town-specific cost guides. Confirm the calculator rates with the business before reusing them as public pricing.

Each guide should explain the specification behind a rate/range, what built-up area includes, included and excluded work, taxes/fees where applicable, and one genuinely calculated example. The Ooty version should explain site-specific retaining structures, access, transport and drainage costs without applying an invented universal hill premium. Link the guides to the relevant residential service, location page and estimate form.

[Juan's Ooty cost page](https://juanconstructions.com/house-construction-cost-in-ooty/) publishes packages and specifications; this is a concrete content comparison, not evidence of a verified ranking advantage. CG Infra's packages page could not be rechecked through the browsing tool because it returned 403.

### 3. Complete project evidence before expanding the location-page count

Start with [Oxford School](https://prasanthassociates.com/projects/oxford-school) and [Residential Building in Ooty](https://prasanthassociates.com/projects/residential-building-ooty). Replace the visible placeholders with supplied facts: scope, project year, area where known, site constraints, work performed, photographs and results. Then review `noindex` and sitemap eligibility. Removing `noindex` alone would leave the content problem.

The Coonoor and Kotagiri sections currently state that the firm has built there but provide no named case study. Obtain a documented project in each town; also add more Coimbatore evidence beyond the Perur example. Standalone Coonoor/Kotagiri pages should follow when there is enough distinct information to serve visitors, rather than reproducing the same page with another town name.

### 4. Show who is responsible for the engineering advice

The [About page](https://prasanthassociates.com/about) explains the team and process but does not identify individual engineers or architects with biographies. Publish genuine names, roles, photographs and applicable qualifications or verifiable registrations. Explain who carries out structural work, valuation and certificate services. Add actual author/reviewer attribution to technical articles and cite current official material for approval guidance.

This is evidence for readers, not a numerical expertise score. [Google's helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) specifically asks whether expertise and authorship are clear.

### 5. Correct sitemap modification dates

The [live sitemap](https://prasanthassociates.com/sitemap.xml) still dates the homepage, all three location pages and the sampled structural-drawings service to `2026-10-29`. These pages have subsequently changed. Local `src/data/lastModified.json` also retains the October dates; `scripts/lastmod.mjs` is intended to derive dates from git and preserves the existing file when history is unavailable/shallow.

Ensure the actual production build generates accurate dates after substantive content changes, with suitable history or an explicit maintained content date. Inspect the generated XML after deployment. Do not stamp every URL with each build's date. The exact reason the deployed dates stayed old was not established. [Google uses lastmod when consistently accurate](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

### 6. Build genuine local references and links

Check relevant established business directories for consistent name, address and phone. Seek editorial references from actual project clients, suppliers, professional associations and local publications where there is a real relationship or useful project story. This is a recommendation to develop verifiable prominence, not evidence that a backlink audit has found a particular numerical deficit. Avoid buying links intended to manipulate rankings: [Google's link-spam policy](https://developers.google.com/search/docs/essentials/spam-policies#link-spam).

### 7. Use Search Console to choose the next pages to improve

Request recrawling for the most important newly updated URLs and confirm sitemap processing. Then establish a baseline by page and query, distinguishing brand searches from service/town searches. Review impressions, clicks, CTR, position and actual enquiries using comparable periods. A practical starting point is pages with meaningful impressions that appear near the first page, where the snippet or content may not answer the query well.

Candidate query groups to examine include house construction/building contractors in Coimbatore; builders/construction company in Gudalur; house construction in Ooty; and service-specific approval, structural-drawing and certificate enquiries. These are proposed groups, not measured volumes or promises that any will rank sooner. [Search Console guidance](https://developers.google.com/search/docs/monitor-debug/search-console-start).

### 8. Measure mobile page experience before further optimisation

Run PageSpeed Insights and review Search Console Core Web Vitals for the homepage, a service page and a location page. Fix the measured largest-contentful-paint resource, layout movement or slow interactions where found. Image compression, JavaScript reduction or form changes should respond to those findings, rather than an invented speed score. [Google's page-experience guidance](https://developers.google.com/search/docs/appearance/page-experience).

## Suggested delivery order

| Period | Work | Evidence of completion |
|---|---|---|
| First week | Profile audit, accurate sitemap dates, Search Console baseline and priority recrawl requests | Correct live XML; verified profile fields; baseline report |
| Following two weeks | Confirm pricing and publish cost guides; complete two Ooty case studies; add real team biographies | Reviewed published facts, useful examples and complete project pages |
| Following month | Obtain Coonoor/Kotagiri and further Coimbatore project evidence; develop genuine local references; address measured performance issues | Original case studies, relevant references and measured page-experience changes |
| Ongoing | Customer review requests/replies and query/enquiry monitoring | Real customer feedback and comparable performance data |

These periods organise work; they are not ranking deadlines. Exact Google/Maps positions, Search Console queries, backlink counts, live profile settings and Core Web Vitals were not measured. Historical internal reports contain earlier ranking observations; they were not treated as a fresh rank check or proof that domain registration age explains ranking. No website code, profile, commit or deployment was changed by this review.
