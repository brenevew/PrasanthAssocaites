# Recommended SEO direction implemented — 23 October 2026

The current project-based content remains the foundation. Useful regional buyer guidance now lives in the existing contractor article, and the 26 retired service/guide URLs from `d24468b` permanently redirect to relevant current pages. These are local source changes, verified against a production build; they have not been deployed.

## Content and URL changes

- Added separate Coimbatore and Ooty/Nilgiris sections to the contractor article. They cover scope, estimates, supervision, approval responsibilities, site conditions, weather, access, payments and handover questions. Perur, Pricol and Sasthapuri provide the documented project examples.
- Expanded the residential, villa and architectural FAQs with regional questions and links to the relevant guides or completed projects. There are now 66 shared FAQ answers across 21 service pages, plus the existing independent turnkey page.
- Installed 24 service redirects and two guide redirects in `src/data/legacyRedirects.ts`, consumed by `next.config.ts`. All return HTTP 308 directly to an HTTP 200 canonical page. Query parameters survive; sitemap entries contain final destinations only. Unknown guide/service paths still return HTTP 404.
- Retained nine blog articles, 22 canonical service pages and 49 sitemap URLs. No duplicate regional articles were introduced.

## Claim review

Removed fixed design/approval and house-construction durations from the shared FAQ because project year ranges do not establish a standard delivery promise. Replaced the unsupported Sasthapuri delivery-frequency claim with documented phased work, limited working space and material coordination.

Also revised shared answers that implied automatic approvals, fixed pricing for every appointment, universal investigation/test methods, prevention of every leak or boundary dispute, and suitability of asset reports for regulated purposes without checking recipient requirements. Guidance now identifies site-specific decisions and the scope that must be agreed.

This is an editorial review against the repository's service and project records. It is not an independent verification of professional qualifications, engineering designs, legal title or business delivery practices. Existing pricing/specification copy elsewhere on the site was not comprehensively audited by this change.

## Validation

- Production Webpack build and TypeScript: passed.
- Automated SEO, FAQ, analytics and submission checks: 22 passed.
- ESLint on changed code/test files and `git diff --check`: passed.
- `node scripts/seo-migration-verify.cjs http://127.0.0.1:3113`: all 26 redirects, query preservation, canonical destinations, all 21 shared FAQ schemas, regional server-rendered headings and missing-route responses passed.
- `node scripts/seo-audit.mjs http://127.0.0.1:3113`: 49 sitemap URLs and 22 services, zero errors. Three existing advisory warnings remain: homepage title length (67 characters), contact-page length (about 298 words) and Perur case-study length (about 289 words). These heuristics do not establish indexing failures.
- Desktop (1440px) and mobile (390px): actual FAQ text checked against its source on five changed service pages; regional article headings visible; no horizontal overflow or uncaught browser errors. Regional article content also visible with JavaScript disabled. Evidence: `seo-migration-browser-2026-10-23.json`.

The frozen historical URL fixture was extracted from `d24468b`, so the migration test checks coverage independently of the redirect list. The earlier TXT comparison and exports remain snapshots from before implementation; `exports/seo-content-recommended-direction.txt` contains the revised content and mapping.

## After deployment

1. Run the read-only migration verifier against `https://prasanthassociates.com` to check the hosting platform's actual HTTP behavior. Deploy source changes before expecting search engines to see them.
2. In Search Console URL Inspection, check the contractor article, representative old service/guide URLs and their destinations. Confirm the selected canonical and that redirects are recognised. Inspect sitemap processing if discovery fails; a successful existing sitemap submission does not need daily resubmission.
3. Record the deployment date. Compare equal reporting windows before/after publication, allowing for crawl/indexing lag. Review clicks, impressions, queries and indexing for both old paths and destinations; include old and new URLs when assessing a migrated service. Separate Coimbatore and Nilgiris queries where useful.
4. Review enquiry conversions alongside search metrics. Record seasonality or other releases that could explain changes. No ranking, traffic or conversion improvement has been measured here because Search Console/account data was not available.

The redirect approach follows [Google's URL migration guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes); keeping substantive regional guidance alongside completed-project evidence follows [Google's helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content). Neither content changes nor structured data establish a ranking guarantee.
