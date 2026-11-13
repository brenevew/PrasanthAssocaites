# Changes made in this audit

All changes are additive: nothing in the existing SEO was removed or rewritten, and no design, layout, colour, font or navigation changed. Branch: `local-maps-seo`.

| # | Change | File(s) | Status |
|---|---|---|---|
| 1 | Coimbatore office schema: added `description` and an `OfferCatalog` of the 22 services the page shows | `frontend/src/lib/officeSchema.ts` | Implemented, Validated |
| 2 | Gudalur branch schema: `OfferCatalog` now lists the 22 services the page shows (was 6). A shared helper builds both catalogs from each page's own service list | `frontend/src/lib/officeSchema.ts` | Implemented, Validated |
| 3 | New GA4 events `directions_click` (links to Google Maps) and `quote_cta_click` (buttons to the quote form) | `frontend/src/lib/analytics.ts`, `frontend/src/lib/ga4.ts`, `frontend/src/components/analytics/LeadAnalytics.tsx` | Implemented, Validated |
| 4 | Test assertions for the two new events and their parameters | `frontend/scripts/ga4.test.cjs` | Implemented, Validated |
| 5 | Three FAQs on the Coimbatore page: structural engineers in Coimbatore; house renovation in Coimbatore; building estimates before choosing a contractor. They appear in the existing accordion and the FAQ structured data | `frontend/src/data/locationPages.ts` | Implemented, Validated |
| 6 | Sitemap dates refreshed from git history (location pages and home now 2026-11-13) | `frontend/src/data/lastModified.json` | Implemented, Validated |
| 7 | This `seo-audit/` folder | `company-website/seo-audit/` | Implemented |

## Not changed (verified correct)

Titles, descriptions, headings and copy on every page; canonicals; redirects; robots.txt; Gudalur and Ooty page text; service pages; footer; existing GA4 events.

## Rollback

All changes are in a single commit on `local-maps-seo`; reverting it restores the previous state exactly.
