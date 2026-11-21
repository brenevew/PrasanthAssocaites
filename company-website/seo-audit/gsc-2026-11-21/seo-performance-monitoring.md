# Performance monitoring plan

Baseline: Search Console, web search, **23 October to 19 November 2026** (`seo-baseline-report.md`).
Deployment date of this work: **21 November 2026** (commit `cb48baf`, verified live the same day). All comparisons start from it.
First post-deploy comparison window: **5 December 2026 to 1 January 2027** (28 days, starting 14 days after deployment). Second check: around 16 January 2027.

## 1. Comparison windows

- Compare equal 28-day windows: the baseline window against the 28 days that begin **14 days after deployment**, which allows for recrawl. Then run a second comparison 8 weeks after deployment.
- Use Search Console → Performance → Compare, with the same search type (Web) and no other filters, then repeat with the segments below.
- Note anything else that happened in the window: Google listing changes, new reviews, directory listings, other deploys, festivals and the monsoon. Small numbers move a lot; a change of 1–2 clicks on a page means nothing.

## 2. Segments to save in Search Console

Search Console query filters accept regular expressions (Query → Custom (regex)).

| Segment | Filter |
|---|---|
| Branded | Query matches `pras|prash|prsan|பிரசா|sowma|sow ma|sasthapuri|manjushree|rex school|christus` |
| Non-branded | Query **doesn't match** the branded regex |
| Commercial, Coimbatore | Query matches `(coimbatore|kovai|gandhipuram).*(build|construct|contract|engineer|villa|house|home|renovat|warehouse|factory)|(build|construct|contract|engineer|villa|house|home|renovat|warehouse|factory).*(coimbatore|kovai|gandhipuram)` |
| Commercial, Gudalur | Query matches `gudalur` and doesn't match the branded regex |
| Commercial, Ooty and the Nilgiris district | Query matches `ooty|coonoor|kotagiri|nilgiri|udhagamandalam|o'?valley` and doesn't match the branded regex |
| Informational | Query matches `how|what|why|when|cost|price|approval|document|boq|plan for|planning` |
| Location pages | Page contains `/locations/` |
| Service pages | Page contains `/services/` |

Search Console anonymises most rare queries (79% of impressions in the baseline). The query segments therefore cover only the listed share. Page segments cover everything.

## 3. What to track

| Measure | Baseline | Where |
|---|---:|---|
| Impressions / clicks / CTR / position (all) | 2,646 / 96 / 3.6% / 9.0 | Search Console |
| Non-branded listed queries: impressions / clicks | 174 / 2 | Search Console, non-branded segment |
| `/locations/coimbatore` | 674 / 13 / 1.9% / 10.1 | Pages tab |
| `/locations/gudalur` | 349 / 8 / 2.3% / 5.4 | Pages tab (protected; it should not fall) |
| `/locations/nilgiris-ooty` | 212 / 4 / 1.9% / 15.0 | Pages tab |
| `/services/residential-construction` **plus** old `house-construction-*` URLs | 58 / 0 / 27.1, plus 42 / 7 on the old URLs | Pages tab; add old and new together |
| `/services/villa-construction` **plus** old `villa-construction-*` URLs | 40 / 3 / 29.1, plus 35 / 0 | Pages tab |
| `/services/interior-designs` **plus** old `interior-design-coimbatore` | 11 / 0 / 35.0, plus 31 / 0 | Pages tab |
| Approval article | 119 / 3 / 2.5% / 6.4 | Pages tab |
| Query positions: "villa construction company coimbatore" (31.6), "construction company in ooty" (57), "civil engineers in coimbatore" (46), "warehouse construction in coimbatore" (25), "smart home automation company in coimbatore" (29.5) | as listed | Queries tab, with the Pages tab to see which URL ranks |
| Mobile vs desktop CTR | 2.64% vs 5.17% | Devices tab |
| Old URLs still reported | 21 redirected URLs and the HTTP home page | Pages tab; they should fade |
| Leads | — | GA4 `generate_lead` by `landing_page` and `service_location`; the Google Sheet |
| Contact clicks | — | GA4 `whatsapp_click`, `phone_click`, `email_click`, `directions_click` |
| **Qualified enquiries** | — | Google Sheet: mark each lead *qualified* (real project, in a served area, a service we offer) or not. This is the success measure; GA4 cannot judge it |

To see which page ranks for a query: Queries tab → click the query → Pages tab. Do this for each query above at every comparison. It shows whether Google has moved from an old URL to the intended owner.

## 4. Mobile CTR investigation (Requires access)

The export doesn't split queries by device, so the reason for the low mobile CTR can't be proven from it. Check in Search Console:

1. Devices → Mobile, then the Queries tab. Is mobile traffic more "near me" and local-pack queries (where Google Business Profile calls and directions take the click without a website visit) or more branded queries?
2. Compare mobile vs desktop CTR for the same query at a similar position. If CTR is low only on local-intent queries, the cause is the map pack, not the page. Track it through Google Business Profile Insights (calls, directions, website clicks) instead.
3. Search the main location queries on a phone and look at the result: is the title cut off, which snippet does Google show, and does the map pack push organic results below the fold?

Page speed is investigated separately (backlog B7). It affects what happens after the click, not search CTR.

## 5. Milestones

The brief's targets (5,000 impressions and 250 clicks within 30–60 days; 10,000 and 600 within 90 days; position 3–5) are **aspirational, not forecasts**. The site is about two months old, 94% of identifiable clicks are branded, and Maps results for the main terms are decided by reviews and listings more than by page content.

| Measure | Reasonable check at 8 weeks | Revisit |
|---|---|---|
| Non-branded listed impressions | Clearly above 174 per 28 days | If flat, prioritise directory listings and reviews |
| Non-branded clicks | Above 2 per 28 days | — |
| Coimbatore location page position | Better than 10.1 | — |
| Gudalur location page position | No worse than 5.4 | If it falls, review recent changes to that page first |
| Old URLs | Mostly gone from the Pages report | If an old URL still outranks its destination after 8 weeks, see backlog B5 |
| Qualified organic enquiries | Counted for the first time | Set a target after two months of data |

Re-run this baseline export every 28 days, and save each export next to this folder with its date.
