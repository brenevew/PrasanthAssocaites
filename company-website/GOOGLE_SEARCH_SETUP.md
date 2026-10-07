# Getting Prasanth Associates to Show Correctly in Google Search

Goal: when someone searches **"Prasanth Associates"**, Google shows the website
together with the Instagram and LinkedIn profiles as one recognised business.

This is a checklist you work through once, then monitor. Most of it is **not**
code — the website side is already done.

---

## Before you start: what can and cannot be configured

Being clear about this saves money and disappointment.

| Thing | Can you control it? |
|---|---|
| Telling Google your social profiles belong to you | **Yes** — `sameAs` schema. Already live |
| Your business details in the right-hand panel | **Yes** — via Google Business Profile |
| Whether a **knowledge panel** appears at all | **No.** Google decides, based on confidence that you are a distinct real entity |
| **Sitelinks** (indented sub-links under your result) | **No.** Purely algorithmic |
| How quickly any of it appears | **No.** Weeks to months |

There is no setting, no form and no paid service that switches on a knowledge
panel. Anyone who claims otherwise is selling something that does not exist.
What you *can* do is remove every reason for Google to be uncertain about you.
That is what the steps below do.

---

## Phase 0 — Deploy the website changes  *(5 minutes)*

The site already publishes a `sameAs` block, which is the exact mechanism that
links your website to your social accounts. One correction is pending deploy:
the LinkedIn URL was missing `www`.

1. From `frontend/`, commit and deploy as usual.
2. Confirm it is live — open `https://prasanthassociates.com`, view source, and
   search for `sameAs`. You should see:

```json
"sameAs": [
  "https://www.instagram.com/prasanthassociates.in/",
  "https://www.linkedin.com/company/prasanthassociates-in/"
]
```

3. Validate the markup at **https://search.google.com/test/rich-results** —
   paste the homepage URL. It should report no errors for the
   `GeneralContractor` / `WebSite` items.

> **Open question:** the Facebook URL in `company.ts`
> (`facebook.com/prasanthconstruction`) did not resolve when checked and uses a
> different brand name. Open it in a browser. **If it is not your page, remove
> it** — a wrong `sameAs` entry weakens entity matching instead of helping.

---

## Phase 1 — Fix your business details in one place  *(15 minutes)*

The most common reason Google refuses to consolidate a business entity is
**inconsistent details across the web**. Before touching any platform, agree the
exact wording. Copy this block and use it *character for character* everywhere —
same spelling, same abbreviations, same phone format.

```
Business name:  Prasanth Associates

Head office:    2nd St, 243, Second Floor, Sowma Complex,
                Gandhipuram, Sathy Road,
                Coimbatore, Tamil Nadu 641012
                India

Branch office:  No: 6, Thiruvalluvar Commercial Complex,
                Near SBI ATM, Ooty Main Road,
                Gudalur, The Nilgiris, Tamil Nadu 643212
                India

Phone:          +91 94860 38761
Email:          info@prasanthassociates.com
Website:        https://prasanthassociates.com
Hours:          Monday–Saturday, 9:00 AM – 6:00 PM (Sunday closed)

Instagram:      https://www.instagram.com/prasanthassociates.in/
LinkedIn:       https://www.linkedin.com/company/prasanthassociates-in/
```

Rules that matter more than they look:

- **"Prasanth Associates"** everywhere. Not "Prasanth Associates Pvt Ltd", not
  "Prasanth Construction", not "Prasanth Associates - Builders".
- One phone number as the public number, in one format.
- `https://prasanthassociates.com` with no `www` — that subdomain has no DNS
  record and will not load.

---

## Phase 2 — Google Business Profile  *(highest impact)*

This is the biggest single lever, and the one still outstanding. For a local
firm it often produces a right-hand panel with your website, phone, hours and
photos well before an organic knowledge panel would appear.

### 2.1 Claim the listing

1. Go to **https://business.google.com** and sign in with the Google account
   that should own this long-term — ideally `info@prasanthassociates.com`, not a
   personal Gmail.
2. Search for **Prasanth Associates, Gandhipuram**. A listing likely already
   exists (the office appears on Google Maps).
   - **If it exists** → click it and choose **Claim this business**.
   - **If not** → **Add your business** and create it.
3. Category: **General Contractor**. Add secondary categories that genuinely
   apply, such as *Construction Company*, *Civil Engineer*, *Architect*.
4. Enter the address and phone exactly as in Phase 1.
5. Verify. Google will offer postcard, phone, email or video. **Video
   verification is now the most common for construction firms** — you record a
   continuous clip showing signage, the premises, and evidence you operate there
   (tools, office, documents). Read the prompts carefully; a failed attempt
   costs days.

### 2.2 Fill it in completely

A sparse profile ranks worse than a complete one. Do all of it:

- **Description** (750 characters). Lead with what you do and where.
- **Services** — add them individually: Turnkey Design & Build, Residential
  Construction, Luxury Villa Construction, Commercial Building Contracting,
  Industrial & Factory Construction, Structural Stability Certificates, Bank
  Valuation Reports, Architectural Design, Interior Design, Landscaping.
- **Service areas** — Coimbatore, Tiruppur, Erode, Salem, Palakkad, Pollachi,
  Mettupalayam, Anaikatti, The Nilgiris, Ooty, Coonoor, Gudalur, Kothagiri.
- **Photos — 20 or more.** Real project photos, the office exterior with
  signage, the team. This is one of the strongest engagement signals you control.
- **Hours**, including holiday hours.
- **Website**: `https://prasanthassociates.com`
- **Appointment link**: `https://prasanthassociates.com/request-quote`

### 2.3 Add the second office

Create a **separate** profile for the Gudalur branch using its own address. Only
do this for a genuinely staffed location — Google penalises fake listings, and
you do have a real branch there.

### 2.4 Reviews

The strongest ranking factor you influence for local results.

- Ask every completed client. Target 20+, added steadily rather than in a burst.
- Reply to all of them, positive and negative.
- **Never buy reviews.** Google detects this and it can suspend the listing.

---

## Phase 3 — Make the social profiles point back  *(10 minutes)*

`sameAs` points from your site outward. Google trusts the connection far more
when it is confirmed from the other side too.

**Instagram** → Edit profile:
- Website: `https://prasanthassociates.com`
- Name field: `Prasanth Associates`
- Bio should mention Coimbatore and what you do.

**LinkedIn** → Company page → Edit:
- Website: `https://prasanthassociates.com`
- Name: `Prasanth Associates`
- Location: the Phase 1 head-office address.
- Industry: *Construction*.

Both must be **public** — a private Instagram account cannot be read by Google.

---

## Phase 4 — Consistent listings elsewhere  *(ongoing)*

Each of these is another independent source confirming the same facts. Use the
Phase 1 block verbatim.

Priority order for a Coimbatore construction firm:

1. **JustDial** — heavily used locally
2. **Sulekha**
3. **IndiaMART**
4. **99acres** / **MagicBricks** / **Housing.com** (property side)
5. **CREDAI** or local builder-association membership pages
6. **Bing Places** (https://www.bingplaces.com) — can import from Google
7. Supplier and partner websites, if they list contractors

A mismatch here is actively harmful, so check each entry rather than rushing.

---

## Phase 5 — Verify and monitor

### Immediately after Phase 0

- **Rich Results Test** — https://search.google.com/test/rich-results —
  paste the homepage. Confirm no errors.
- **Schema Markup Validator** — https://validator.schema.org — confirm
  `sameAs` lists both profiles.

### Weekly for the first month

- Search `site:prasanthassociates.com` in your own browser to see what is
  indexed. *(This cannot be automated — Google blocks scripted queries.)*
- **Search Console → Indexing → Pages** for pages not yet indexed.
- **Search Console → Performance** for which queries you actually appear on.
- Search `Prasanth Associates` in an incognito window and note what shows.

### When a knowledge panel appears

Google may let you **claim** it. On the panel, look for "Own this business?" or
"Claim this knowledge panel", then verify through one of your linked profiles.
Once claimed you can suggest corrections — but only after it exists.

---

## Realistic timeline

| When | What to expect |
|---|---|
| Days 1–3 | Deployed schema crawled; Rich Results Test passes |
| Week 1–2 | Brand search shows the site as the first result |
| Week 2–4 | Business Profile verified and appearing in map results |
| Month 2–3 | Social profiles start appearing alongside the brand result |
| Month 3–6+ | Knowledge panel *may* appear, given steady reviews and citations |

Phases 2 and 4 are the ones that move it. The website side is already done.

---

## Troubleshooting

**Google shows the wrong social account, or none.**
Check `sameAs` is live and the profiles are public. Confirm the profiles name
the business identically and link back to the site. Then wait — this is
recognition, not configuration.

**Google shows an old address or phone.**
Almost always a stale directory listing. Search the old detail in quotes
(`"old phone number"`) to find which site still carries it, and correct it there.

**A different business outranks you for your own name.**
Usually a name-similarity problem. Reviews, citations and a complete Business
Profile are what separate you. It resolves with consistency over time.

**Business Profile verification keeps failing.**
Use video verification and show clear exterior signage with the business name,
then walk inside continuously without cutting. If it fails repeatedly, use the
Business Profile support chat — a human can review it.
