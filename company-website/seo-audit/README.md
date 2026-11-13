# Local SEO and Google Maps audit: Prasanth Associates

Date: 2026-11-13. Offices: Coimbatore (Gandhipuram, head office) and Gudalur (Ooty Main Road, branch).

Website changes in this audit were added on top of the existing SEO; nothing already in place was removed or rewritten, and the visual design is unchanged.

## Status labels

| Label | Meaning |
|---|---|
| Verified | Checked directly on the live site, the code or a public page, with the date |
| Implemented | Changed in the code in this audit |
| Validated | Implemented and then tested (build, tests, browser) |
| Recommended | Proposed; not done |
| Requires access | Needs Search Console, GA4, Google Business Profile or another login not available here |
| Requires owner approval | A change to a Google listing or outside account that the owner must review and make |
| Not yet measured | No data exists yet; nothing is estimated in its place |

## What this audit could and couldn't see

- **Could:** the code, the live website, public Google listing pages viewed earlier today, competitor websites and public directories.
- **Couldn't:** Search Console, GA4, Google Business Profile dashboards and performance data, or a rank-tracking tool. Map rankings were not scraped (the brief rules it out), so `analytics/maps-ranking-baseline.md` is a ready-to-run specification, with earlier one-off spot checks clearly labelled.

## Files

| File | Contents |
|---|---|
| `technical-seo-audit.md` | Site-wide technical findings, each with evidence, severity, status |
| `google-business-profile/coimbatore-audit.md` | Coimbatore listing, field by field |
| `google-business-profile/gudalur-audit.md` | Gudalur listing, field by field |
| `google-business-profile/proposed-profile-updates.md` | Ready-to-paste categories, services, descriptions, website URLs, and the owner-approval checklist |
| `competitors/coimbatore-analysis.md` | Coimbatore competitor matrix and gaps |
| `competitors/gudalur-analysis.md` | Gudalur competitor matrix and gaps |
| `keywords/coimbatore-keywords.csv`, `keywords/gudalur-keywords.csv` | Keyword lists with intent, target page and evidence (no invented volumes) |
| `structured-data/schema-validation.md` | Schema on each location page, what changed, how it was checked |
| `analytics/ga4-tracking-plan.md` | Events, GBP campaign URLs, reports to set up in GA4 |
| `analytics/maps-ranking-baseline.md` | 5×5 grid specification with coordinates, keywords and record format |
| `implementation/changes-made.md` | Every code change, file by file |
| `implementation/validation-results.md` | Tests and checks run, with results |
| `implementation/owner-actions.md` | Everything only the owner can do, in priority order |
| `90-day-roadmap.md` | What to do when, and what to measure |

Earlier reports with background are in `frontend/seo-reports/`, notably `GUDALUR-VS-ANGEL-2026-11-13.md`, `COIMBATORE-BUILDERS-2026-11-13.md`, `LOCATION-KEYWORD-STRATEGY-2026-11-12.md` and `MAPS-ANALYSIS-prasanthassociates.com.md`.

## Summary

- **Website (Implemented, Validated):** sitemap dates refreshed; both office schema entries now describe the business and list all 22 services; GA4 now records "Get directions" clicks and quote-button clicks by location; three FAQs added to the Coimbatore page (structural engineers, renovation, building estimates).
- **Website (Verified correct, unchanged):** redirects, canonicals, robots, indexability, location pages, campaign-tagged GBP URLs.
- **Google listings (Requires owner approval):** category check, services list, descriptions, campaign-tagged website links, review and posting routine. Both listings already link to their location pages.
- **Rankings (Not yet measured):** grid measurement needs a rank-tracking tool; the specification is ready.
