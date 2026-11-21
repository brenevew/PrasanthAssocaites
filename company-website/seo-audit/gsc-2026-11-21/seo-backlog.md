# Prioritised backlog

Items that could not be implemented or verified in this exercise. **A** = owner action or decision (needs a login or facts only the business has). **B** = website work waiting on facts or evidence.
Earlier owner actions still open are in `../implementation/owner-actions.md`; this list adds to it and does not repeat everything there.

## A. Owner actions and decisions

| # | Priority | Action | Why | Access |
|---|---|---|---|---|
| A1 | **Critical** | Confirm whether each home-page testimonial in `frontend/src/data/testimonials.ts` is real. The file says "placeholder content", while an earlier note says the owner confirmed them as real. If any is invented, remove or replace it before anything else | Invented testimonials breach Google's spam policies and consumer-protection law, and undermine the site's trust signals | Owner |
| A2 | High | Google Business Profiles: ask every recent client for a review naming the town and the work; reply to every review; post every 1–2 weeks (detail in `../implementation/owner-actions.md`) | Maps rankings for "builders in Gudalur" and "builders in Coimbatore" depend on reviews; content is already stronger than competitors' | GBP |
| A3 | High | Create listings on IndiaMART, Justdial, Sulekha and Houzz for both offices, with the exact name, address and phone on the website | These directories fill the organic results for every non-branded search tested (`seo-competitor-analysis.md`) | Owner |
| A4 | Medium | Ask for links from organisations you've built for or work with: Christus Rex school, Sasthapuri Hotels, Pricol, Manjushree, suppliers, local associations | The domain is two months old; links build its standing | Owner |
| A5 | Medium | Decide whether indicative per-sq-ft rates may be published (the calculator uses ₹1,950 / ₹2,650 / ₹3,800, unconfirmed) | Competitors and directory sellers publish rates; cost queries need figures to compete | Owner decision |
| A6 | Medium | GA4: mark `generate_lead` as a key event (and `whatsapp_click`, `phone_click`, `email_click` if wanted); register `service_location` and `landing_page` as custom dimensions; link Search Console | Lets enquiries be reported by landing page and region | GA4 |
| A7 | Medium | After deployment: run the "Before deploying / After deploying" steps in `seo-regression-test-report.md`, including URL Inspection of `http://prasanthassociates.com/` | Confirms Google's chosen canonical for the old HTTP URL | Search Console |
| A8 | Low | Add a "qualified" column to the enquiries Sheet and fill it in for each lead | The success measure is qualified enquiries, which GA4 can't judge | Sheet |
| A9 | Low | Bing Places and Bing Webmaster Tools (still open from 13 Nov) | Bing feeds Copilot and ChatGPT local answers | Bing |

## B. Website work waiting on facts or evidence

| # | Priority | Work | Waiting on |
|---|---|---|---|
| B1 | High | A second Coimbatore case study (area, year, scope, photos), and fuller details for Perur (scope, client type) | Facts from the owner. Coimbatore has one documented house; the location page's case studies borrow Sasthapuri from Gudalur |
| B2 | High | Case studies for the Ooty house and Oxford Continental School (both `noindex` placeholders), and any Coonoor or Kotagiri project | Facts and photos. Each would become indexable proof for the Ooty page |
| B3 | Medium | An interior design case study or gallery captions with location (the interior page has no project evidence) | Which design-gallery items are completed work, and where |
| B4 | Medium | Smart home page: the largest non-branded query group (37 impressions across nine home-automation queries, mostly at positions 29–51, no clicks). Needs a completed installation to cite, or brand-neutral detail on what is wired and when | A completed smart-home project, or confirmation of typical scope |
| B5 | Medium | **Decision trigger, not a task:** if eight weeks after deployment an old URL (for example `house-construction-nilgiris`) still outranks its destination for the same queries, consider whether a distinct regional page is justified. Don't recreate the old pages before then: the 23 October migration is still settling, and duplicates would split signals again | Search Console data at 8 weeks |
| B6 | Low | Fix the footer "Regional Offices" `h5` that follows `h2` content (same classes on a non-heading element; no visual change). Open since 13 Nov | Nothing; small, unrelated to this data |
| B7 | Low | Core Web Vitals: check the Search Console CWV report (mobile) and PageSpeed for `/`, `/locations/coimbatore` and `/locations/gudalur`; act only on a failing metric | Field data (Requires access) |
| B8 | Low | Review the approval article every 6 months against onlineppa.tn.gov.in and TNCDBR amendments. Self-certification limits were reported to be rising, and permission validity is stated differently in the rules and on the portal | Time |
| B9 | Low | Tamil-language search terms: add only if non-branded Tamil or Tanglish queries appear in a future export | Search Console evidence |
| B10 | Low | Sweep the remaining bare "Nilgiris" mentions in copy to "the Nilgiris district" or town names (about 200, noted 13 Nov) | Owner approval for a site-wide copy change |
