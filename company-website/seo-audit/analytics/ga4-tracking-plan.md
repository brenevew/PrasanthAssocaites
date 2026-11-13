# GA4 tracking plan

Property: `G-NJWX2XYRQZ` (tag verified on live pages, 2026-11-13). GA4 reports and key-event settings **require access**.

## Events sent to GA4

| GA4 event | Fires when | Status | Parameters |
|---|---|---|---|
| `page_view` | Every page load (GA4's own, with the full URL including `utm_` tags) | Existing | GA4 defaults |
| `phone_click` | Any `tel:` link | Existing | `page_location`, `landing_page`, `service_location`, service when on a service page |
| `whatsapp_click` | Any WhatsApp link | Existing | Same |
| `generate_lead` | Only after the server confirms a form or quote submission | Existing | Same, plus `form_type` |
| `service_view` | A service page is viewed | Existing | Service name and sector |
| `directions_click` | A link to Google Maps (each office's "Get directions" button) | **New**, Validated | `page_location`, `landing_page`, `service_location` |
| `quote_cta_click` | A button that jumps to the quote form on the same page, or a link to `/request-quote` | **New**, Validated | Same |

No names, phone numbers, emails, messages or query strings are sent in events (enforced by an allowlist in `src/lib/ga4.ts` and tested in `scripts/ga4.test.cjs`). `service_location` is `coimbatore`, `gudalur` or `nilgiris` from the page, or the location the visitor typed into a form.

## Telling Coimbatore and Gudalur listing traffic apart

Set each listing's website to its campaign-tagged URL (see `../google-business-profile/proposed-profile-updates.md`):

- Coimbatore: `…/locations/coimbatore?utm_source=google&utm_medium=organic&utm_campaign=gbp_coimbatore`
- Gudalur: `…/locations/gudalur?utm_source=google&utm_medium=organic&utm_campaign=gbp_gudalur`

Validated: both load, keep the tags, and keep a clean canonical. GA4 records the first page view with the full URL, so the session gets source `google`, medium `organic`, campaign `gbp_coimbatore` or `gbp_gudalur`. With medium `organic`, these visits still count under Organic Search; the campaign tells them apart.

## Set up in GA4 (requires access)

1. **Key events:** mark `generate_lead` as a key event. Optionally also `phone_click` and `whatsapp_click`.
2. **Custom dimension:** register `service_location` (event scope) so reports can split by office.
3. **Exploration "Listing traffic":** rows = Session campaign; filter campaign contains `gbp_`; values = Sessions, Key events, `phone_click`, `whatsapp_click`, `directions_click`.
4. **Exploration "Leads by office":** rows = `service_location`; values = `generate_lead`, `phone_click`, `whatsapp_click`, `directions_click`, `quote_cta_click`.
5. **Search Console link:** link the Search Console property to GA4 (Admin → Product links) to see queries next to landing pages.

## Lead quality (outside GA4)

The enquiry Google Sheet already receives every form submission with a reference code. Add two columns, "Qualified (Y/N)" and "Became a project (Y/N)", and fill them in weekly. That gives qualified enquiries and conversions by office without sending personal data to GA4.

## Attribution limits

- Calls placed straight from the Google listing don't touch the website; see them in the listing's Performance report (requires access).
- A listing visit that leaves and returns later through a search may show a different source.
- Don't credit leads to Maps without the campaign tag or listing Performance data showing it.
