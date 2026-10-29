# Local SEO Analysis: prasanthassociates.com

Date: 2026-10-29. Pages checked: home, /contact, /locations/coimbatore, /locations/nilgiris-ooty, /locations/gudalur. Business Profile details come from the links on the site and from facts you confirmed; the profiles themselves (categories, posts, photos, insights) could not be inspected.

## 1. Local SEO Score: 64/100

| Dimension | Weight | Score | Summary |
|---|---|---|---|
| Google Business Profile signals | 25 | 16 | Two profiles, each linked and embedded on its location page, hours shown. Gudalur profile still named "Prasanth Construction". Categories unverified. |
| Reviews and reputation | 20 | 13 | 4.9★ from 65 Google reviews (42 Gudalur, 23 Coimbatore), shown per office. Google is the only review platform; no review link for customers. |
| Local on-page | 20 | 18 | City in every location title and H1, visible address and click-to-call, map embeds, 22 service pages, distinct location pages. |
| NAP consistency and citations | 15 | 6 | Site and schema agree everywhere. Name differs on the Gudalur profile; one phone for both offices; no directory listings found. |
| Local schema | 10 | 9 | Correct business type, one entry per office linked to the company, coordinates, hours. |
| Local links and authority | 10 | 2 | No chamber, trade body, press or "best builders" list mentions found. |

## 2. Business type

**Brick-and-mortar with a service area (hybrid).** Two staffed offices with street addresses (Gandhipuram, Coimbatore; Ooty Main Road, Gudalur), and site visits across Coimbatore district and the Nilgiris.

## 3. Industry

Construction and home services (house construction, design, approvals, valuation). `GeneralContractor` is the right schema type. Home-services checks apply: service area stated, quote form and click-to-call on every location page.

## 4. Google Business Profile checklist

| Signal | Status |
|---|---|
| Profile per office | ✅ Coimbatore and Gudalur |
| Map embed and directions on each location page | ✅ Coimbatore, Gudalur, Nilgiris pages and /contact |
| Opening hours on the site | ✅ Mon–Sat 9 am–6 pm, Sunday closed (page text and schema) |
| Profile name matches the site | ❌ Gudalur profile is "Prasanth Construction" (rename in progress, per your notes) |
| Primary category | ❓ Not visible from outside. Recommend **Construction company** as primary on both, with secondaries such as General contractor, Home builder, Architect (only if a registered architect is on staff), Civil engineer, Interior designer |
| Profile website link | ❓ Check that each profile links to its location page (Coimbatore → /locations/coimbatore, Gudalur → /locations/gudalur) rather than both to the home page |
| Posts and photos | ❓ Not visible from outside. Upload the same project photos the site uses, tagged to the right office |
| Q&A | Google is phasing out public Q&A; the location-page FAQs already cover the common questions |

## 5. Review health

- **Count and rating:** 4.9★ from 42 (Gudalur) and 4.9★ from 23 (Coimbatore), 65 in total. Both are above the 4.5★ that a third of customers filter by, and above the ~10-review threshold where profiles start to compete.
- **On the site:** shown correctly per office ("4.9 ★ from 23 Google reviews" on Coimbatore, "from 42" on Gudalur, "65 Google reviews" on home). These numbers are hard-coded, so update them as reviews come in.
- **Recency:** not measurable from outside. Customers weigh reviews from the last 3 months most, and a gap of several weeks can cost ranking. Coimbatore, the newer office with fewer reviews, needs a steady flow most.
- **No review request link anywhere.** Customers can't leave a review from the site or a follow-up message in one tap.
- **Single platform:** Google only. No Justdial, Facebook recommendations or Houzz reviews found.
- **Review gating:** none found (good). Keep it that way: send every customer the same review link, never only the happy ones.
- **Don't add `aggregateRating` schema** for your own business. Google ignores self-serving review markup.

## 6. NAP consistency

| Source | Name | Address | Phone |
|---|---|---|---|
| Site text and schema, Coimbatore | Prasanth Associates | 2nd St, 243, Second Floor, Sowma Complex, Gandhipuram, Sathy Road, Coimbatore 641012 | +91 94860 38761 |
| Google profile, Coimbatore | Prasanth Associates | Pin at 11.017756, 76.9688517 (matches schema) | ❓ not checked |
| Site text and schema, Gudalur | Prasanth Associates | No: 6, Thiruvalluvar Commercial Complex, Near SBI ATM, Ooty Main Road, Gudalur 643212 | +91 94860 38761 |
| Google profile, Gudalur | **Prasanth Construction** ❌ | Pin at 11.5001001, 76.4937999 (matches schema) | ❓ not checked |

Findings:
- The site and schema are fully consistent with each other on every page.
- The Gudalur profile name is the one real mismatch. It splits the brand into two entities for Google, ChatGPT and directories.
- Both offices use the same mobile number. Google's guidelines ask for a number that reaches the individual location as directly as possible. If the Gudalur office has its own number, use it on the Gudalur profile, the Gudalur page and the Gudalur schema entry. If one number genuinely serves both, it's acceptable, but check that both profiles show that same number.
- `src/data/company.ts:61-62` marks the main phone and email as `[PLACEHOLDER]`. They are the live details, so the comments look out of date. Confirm and remove them.

## 7. Citations

Searches for "Prasanth Associates" (Coimbatore, Gandhipuram), "Prasanth Construction" Gudalur and the phone number found **no directory listings** on Justdial, Sulekha, IndiaMART or elsewhere. The search tool covers Indian directories poorly, so check each directly. What it does show is that no listing ranks for the brand name.

| Directory | Why it matters | Status |
|---|---|---|
| Google Business Profile | Local pack and Maps | ✅ both offices |
| Bing Places | Feeds Bing, Copilot and ChatGPT's local answers | ❓ claim both offices (can import from Google) |
| Apple Business Connect | Apple Maps, Siri | ❓ claim both offices |
| Justdial | Biggest Indian local directory, ranks for "builders in [town]" | Not found |
| Sulekha | Home-services leads in Coimbatore | Not found |
| IndiaMART | Commercial and industrial buyers | Not found |
| Houzz / Architizer | Design-led projects, portfolio | Not found |
| Facebook page | Linked from the site | ✅ |
| LinkedIn company page | Linked from the site | ✅ |

Use exactly the name, address and phone in section 6 on every listing.

## 8. Local schema

Present and correct; nothing urgent.

- Company entry (`#organization`, `GeneralContractor`) on every page; office entries `#coimbatore-office` and `#gudalur-branch` on their location pages, each linked back with `parentOrganization`.
- Each office has a full postal address, coordinates (6+ decimals), opening hours, phone, image and `hasMap`.
- The Nilgiris and Gudalur pages share the `#gudalur-branch` entry, so Google sees one branch, not two businesses.
- Optional: add `priceRange` (for example `"₹₹"`) to each office entry. When the Gudalur profile is renamed, nothing in the schema needs to change: it already uses "Prasanth Associates".

## 9. Location pages

| Page | Words | Unique vs the other two | Doorway risk |
|---|---|---|---|
| /locations/coimbatore | 1,374 | 81% | Low: Perur project, Gandhipuram office, CCMC/DTCP approval detail |
| /locations/gudalur | 1,543 | 75% | Low: Gudalur projects, slope and access detail |
| /locations/nilgiris-ooty | 991 | 61% | Low, but closest to the line. Most shared text is with the Gudalur page (same office card, same project cards) |

All pass the swap test: replacing the town name would leave content that no longer makes sense (hill drainage, cold and damp, hill-area rules, named projects). Three pages is well under the 30-page warning level. To widen the Nilgiris page's margin, add Ooty- and Coonoor-specific detail rather than more shared project cards.

## 10. Top 10 actions

| # | Priority | Action | Fails if… / watch |
|---|---|---|---|
| 1 | Critical | Finish renaming the Gudalur profile to "Prasanth Associates". Keep the same listing (don't create a new one) so its 42 reviews stay | Profile still shows the old name after Google's review; watch for a suspension notice, and have shop-front signage or a utility bill showing the new name ready in case Google asks for proof |
| 2 | High | Set primary categories on both profiles (Construction company) and link each profile to its own location page | Location pages get no visits from Google Maps in GA4 after 4 weeks |
| 3 | High | Create a Google review link for each office and send it to every client at handover and after major milestones. Aim for at least 2 new reviews a month on the Coimbatore profile | Coimbatore count still near 23 in 3 months |
| 4 | High | Claim Bing Places and Apple Business Connect for both offices | Searching the brand in Bing Maps and Apple Maps shows no listing |
| 5 | High | List both offices on Justdial, Sulekha and IndiaMART with identical name, address and phone | A brand search shows no directory result after 2 months |
| 6 | Medium | Decide on one phone per office, or confirm both profiles show the shared number | Profiles and site disagree on the number |
| 7 | Medium | Reply to every Google review, including older ones | Unanswered reviews in either profile |
| 8 | Medium | Post project photos and short updates on both profiles, monthly | Photo count unchanged for a month |
| 9 | Medium | Seek local authority mentions: Coimbatore and Nilgiris builders' or engineers' associations, chamber of commerce, regional home-design press. A Gudalur hill home was covered by Onmanorama in 2024, so that press is reachable | No new local referring sites in 6 months |
| 10 | Low | Keep the review counts on the site current; remove the stale `[PLACEHOLDER]` comments in `company.ts`; optionally add `priceRange` to office schema | Site count differs from the profile by more than a few reviews |

Actions 1 and 6 come before 4 and 5, so that new listings copy the final name and phone.

## 11. What this analysis could not assess

- Real local pack positions and geo-grid rankings across Coimbatore and the Nilgiris (needs a tool such as Local Falcon, BrightLocal, or `/seo maps` with DataForSEO).
- Business Profile categories, posts, photos, review dates and response rate, and Insights (calls, direction requests). These are visible to you in the profile dashboard.
- Directory listings on Indian sites; the search tool is US-based. Check Justdial, Sulekha and IndiaMART directly.
- Backlinks and domain authority (`/seo backlinks`).

## Sources

- Searches checked: https://village.ai/company/prashanth-associates (unrelated firm), https://trustseal.indiamart.com/members/sasti-engineering (unrelated firm), https://www.onmanorama.com/lifestyle/decor/2024/09/10/cradled-by-nilgiri-hills-contemporary-gudalur-house-exudes-gem-like-exuberance.amp.html
- Google Business Profile guidelines: https://support.google.com/business/answer/3038177
