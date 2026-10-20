@AGENTS.md

# Prasanth Associates — Architecture & Rebuild Reference

Marketing and lead-generation site for a construction, engineering and real-estate
firm in Coimbatore, Tamil Nadu. This file documents how the site is built well
enough to **rebuild an equivalent site from scratch** without access to the repo.

Companion docs, all at the repo root:

| File | Covers |
|---|---|
| `LOCAL_DEVELOPMENT.md` | Day-to-day dev setup |
| `DEPLOYMENT_GUIDE.md` | Production deploy, domain, SSL |
| `GOOGLE_SHEETS_DEPLOYMENT.md` | The form pipeline, end to end (the longest and most important) |
| `README.md` | Short orientation |

> `DEPLOYMENT_GUIDE.md` says "Next.js 15" in its ASCII diagram. That is stale —
> `package.json` is authoritative.

---

## 1. Stack

| Layer | Choice |
|---|---|
| Framework | **Next.js 16.3.4**, App Router |
| UI | **React 19.2.8**, TypeScript 5 |
| Styling | **Tailwind CSS v4** via `@tailwindcss/postcss` (no `tailwind.config.js`; config lives in CSS) |
| Icons | `lucide-react` |
| Fonts | `next/font/google` — **Inter** (body) + **Cormorant Garamond** (headings) |
| Data store | **None.** All content is TypeScript files |
| Backend | **None.** Server Actions + three API routes, forwarding to Google Apps Script |
| Hosting | Cloudflare via **OpenNext** (`x-opennext` / `server: cloudflare` response headers) |

There is no database, CMS, auth system, or paid third-party service. That is the
single most important architectural fact: **the site is a static-ish marketing
front end whose only backend is a Google Apps Script webhook.**

## 2. Repo layout

The Next.js app is **not** at the repo root:

```
company-website/
├── CLAUDE.md, AGENTS.md, README.md, *_GUIDE.md   ← docs
├── scripts/google-sheets-script.js               ← Apps Script source (paste into Google)
└── frontend/                                     ← the Next.js app; run npm here
    ├── next.config.ts
    ├── .env.example                              ← template; copy to .env.local
    ├── public/images/{hero,about,projects/*}     ← ~36 static assets, WebP
    └── src/
        ├── app/          ← routes (App Router)
        ├── components/   ← layout/, ui/, planner/
        ├── data/         ← all site content as .ts modules
        ├── lib/          ← server utilities
        └── services/     ← client-side API wrappers
```

Commands run from `frontend/`: `npm run dev`, `npm run build`, `npm start`, `npm run lint`.

## 3. Rendering model

Roughly half the modules are client components (~47 of 98 `.ts`/`.tsx` files).
The split is deliberate:

- **Every `page.tsx` is a Server Component.** Pages export `metadata`, render
  JSON-LD, and delegate interactivity to a sibling client component.
- **The pattern is `page.tsx` (server, metadata + schema) → `XxxClient.tsx`
  (`"use client"`, state).** See `services/page.tsx` → `ServicesPageClient.tsx`,
  `projects/`, `contact/`, `plan-home/`, `request-quote/`.
- Long-form SEO pages (locations, service-areas, the turnkey page) are
  **pure server components** with no client child — interactivity is limited to
  `<details>` accordions and shared UI components.

Keep new SEO pages server-rendered. Metadata and JSON-LD only work there.

## 4. Content architecture — `src/data/`

All copy, pricing and catalogue data are typed TS modules. Editing the site
means editing these, not a CMS.

| File | Exports | Notes |
|---|---|---|
| `company.ts` | `company` | Name, phone, email, **two offices** (Coimbatore HQ, Gudalur branch), hours, socials, stats. Single source of truth for NAP data |
| `services.ts` | `services: Service[]` | The service catalogue. `{ slug, title, shortDescription, description, icon, features[] }` |
| `serviceCategories.ts` | `serviceCategories`, `plannableSlugs`, `designSlugs` | Groups services into 4 categories by slug list |
| `serviceQuoteData.ts` | `serviceQuoteSpecs: Record<slug, ServiceQuoteSpec>` | Largest data file. Per-service quote page content: SLA, deliverables, steps, guarantee, and the two option pickers |
| `projects.ts` | `projects`, `projectCategories` | Portfolio; drives `/projects` and `/projects/[slug]` |
| `navigation.ts` | `mainNavItems`, `footerNavItems`, `footerServiceLinks`, `footerLocationLinks`, `footerServiceAreaLinks` | All nav link lists |
| `testimonials.ts`, `process.ts`, `quality.ts`, `designGallery.ts`, `imageBlur.ts` | — | Homepage/about section content |
| `rateCards.ts`, `rateCardsLegacy.ts` | — | Pricing for the planner/estimator |
| `db/submissions.json` | — | **Dev-only** local lead backup. Not a production store |

### The three-file service contract

A service is defined across three parallel files **keyed by the same slug**.
Adding a service requires all three, or it renders half-broken:

1. `services.ts` — the card (title, description, features, icon name)
2. `serviceCategories.ts` — add the slug to a category's `slugs[]` (and
   `designSlugs`/`plannableSlugs` if it should offer the Building Planner)
3. `serviceQuoteData.ts` — the quote spec, or the card renders without SLA
   badges and the quote flow has no options

**Icon names are whitelists, not free text.** `service.icon` is a string looked
up in an `iconMap` defined separately in `ServicesPageClient.tsx`,
`RequestQuoteClient.tsx` and `ServiceDetailModal.tsx`. A name missing from those
maps renders `undefined` and can crash the page. Add the icon to every map.

## 5. Routes

| Route | Type | Purpose |
|---|---|---|
| `/` | Server + client sections | Homepage |
| `/services` | Server → `ServicesPageClient` | All services, category filter, cards open the detail card |
| `/services/turnkey-design-build-coimbatore` | Server | Long-form SEO service+city landing page |
| `/projects`, `/projects/[slug]` | Server → client | Portfolio and detail |
| `/locations/coimbatore`, `/locations/nilgiris-ooty`, `/locations/gudalur` | Server | Real office locations. Full `LocalBusiness` schema with address |
| `/service-areas/tiruppur` | Server | Area served **without** an office. Deliberately no address and no `LocalBusiness` schema — see §9 |
| `/plan-home` | Server → `PlanHomeClient` | Building Planner (two variants) |
| `/request-quote` | Server → `RequestQuoteClient` | Per-service quote form; reads `?service=&f1=&f2=` |
| `/contact`, `/about`, `/property-investment` | Server → client | Standard pages |
| `/how-it-works`, `/request-design` | Server | `permanentRedirect()` (308) to `/about#how-it-works` and `/plan-home` |
| `/sitemap.xml`, `/robots.txt` | `sitemap.ts`, `robots.ts` | Generated. **New pages must be added to `sitemap.ts` by hand** |
| `/api/upload`, `/api/sync-sheets`, `/api/projects` | Route handlers | See §7 |

## 6. Design system — "Neu-Glassmorphism"

Defined entirely in `src/app/globals.css` (Tailwind v4 CSS-first config). No JS
theme file.

**Palette** (CSS custom properties on `:root`):

```
--canvas-bg: #f7f5f0     page background (warm off-white)
--color-charcoal: #1a1714    primary text / dark surfaces
--color-gold: #b88a44        accent   (+ -light #d1a55c, -dark #9a6f2c)
--color-concrete: #66615b    secondary text (+ -light, -lighter)
--color-linen: #efece6       alternating section background
--color-border: #eae5dd
--color-terracotta: #c86828  rare accent
```

**Fluid type scale**: `--text-display`, `--text-h1` … `--text-h4`, all
`clamp()`-based. Headings use `style={{ fontSize: "var(--text-h1)" }}`.

**Custom utility classes** (the visual signature — reuse, don't reinvent):

- `.neu-glass` — frosted panel, the primary card surface
- `.nm-raised`, `.nm-raised-sm/-lg`, `.nm-inset`, `.nm-inset-sm/-deep`,
  `.nm-sunken`, `.nm-interactive`, `.nm-gold-raised`, and `.nm-dark-*` variants
- `.liquid-glow` — soft ambient orb, positioned inline with width/height/top/left
- `.blueprint-grid` — faint technical grid overlay on hero sections
- `.badge-gold` — small gold pill label
- `.section` — standard vertical rhythm, `clamp(5rem, 10vw, 8.5rem)` top and bottom
- `.container` — max-width wrapper

**Page composition idiom**: alternate `bg-[var(--canvas-bg)]` and `bg-linen`
sections with `border-y border-border`; wrap content in
`<ScrollReveal>`; end with `<CTABanner />`.

## 7. The form pipeline — the only backend

Three forms feed one destination. This is documented exhaustively in
`GOOGLE_SHEETS_DEPLOYMENT.md`; the summary:

```
Contact form ─┐
Quote form   ─┼─► Server Action  submitContactForm()   ─┐
Planner form ─┘   (app/actions/contactActions.ts)       │
                                                        ├─► lib/googleSheets.ts
Planner/alt  ───► POST /api/sync-sheets ────────────────┘        │
                                                                 ▼
File uploads ───► POST /api/upload ──► Apps Script ──► Google Drive
                                                                 │
                                          Google Apps Script Web App (/exec)
                                                                 │
                                                                 ▼
                                             Google Sheet "All Inquiries"
```

Key design decisions:

- **Uploads go first, separately.** `/api/upload` stores files in Google Drive
  and returns URLs. The form then submits only those URLs, keeping the Server
  Action body under Next's 1MB limit.
- **Limits**: 5 files, 2MB per file, 5MB per submission (`lib/attachments.ts`).
  Browsers downscale images client-side first (`lib/compressImage.ts`); limits
  apply to the uploaded bytes, not the original.
- **Rate limiting** (`lib/rateLimit.ts`) is in-memory and per-replica — lead
  forms 5/10min, uploads 10/10min, sync 15/10min, projects 60/min. Not a global
  cap; deliberately so, as there's no Redis.
- **Graceful degradation**: if `GOOGLE_SHEETS_WEBHOOK_URL` is unset, forms still
  succeed and the lead is written to the server log instead of the Sheet.
- **Ref codes**: every submission gets a generated reference code shown to the user.
- The Apps Script itself lives at `scripts/google-sheets-script.js` and is pasted
  into the Google Apps Script editor — it is not deployed by this repo.

## 8. Environment variables

Names only. Real values live in `.env.local` (gitignored) and in the host's
secret store — **never commit them**. Template: `frontend/.env.example`.

| Variable | Scope | Required | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | public | yes | Canonical origin. Feeds `metadataBase`, `sitemap.ts`, `robots.ts` |
| `NEXT_PUBLIC_APP_ENV` | public | no | `development` / `production` |
| `GOOGLE_SHEETS_WEBHOOK_URL` | server | for forms | Apps Script `/exec` URL |
| `GOOGLE_SHEETS_SHARED_SECRET` | server | recommended | Must match the `SHARED_SECRET` script property in Apps Script. `openssl rand -hex 24` |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | server | multi-replica only | Stable key across replicas or Server Actions break on rolling deploys. `openssl rand -base64 32` |

If credentials are lost: create a new Google Sheet, redeploy
`scripts/google-sheets-script.js` as a web app, generate a fresh shared secret,
and set the two `GOOGLE_SHEETS_*` variables. Nothing else depends on secrets.

## 9. SEO architecture

Deliberate and load-bearing — preserve it when making changes.

- **`layout.tsx`** sets `metadataBase`, a title template `%s | Prasanth Associates`,
  default OpenGraph, and a site-wide JSON-LD graph (`GeneralContractor` +
  `WebSite`) built from `company.ts`, listing all 13 service cities in `areaServed`.
- **Titles** are kept ≤ ~60 characters so Google doesn't truncate the brand.
  The root `page.tsx` must include the brand explicitly — Next does **not** apply
  a layout's title template to a page in the same segment.
- **Every page sets its own canonical** via `alternates.canonical`.
- **OpenGraph images**: a page defining its own `openGraph` block *replaces* the
  parent's rather than merging, so each such page must repeat `images`.
- **Per-page JSON-LD**: `Service`, `FAQPage`, `BreadcrumbList`, and
  `HomeAndConstructionBusiness` for real offices. Serialize with
  `JSON.stringify(x).replace(/</g, "\\u003c")`.
- **Offices vs service areas is an honesty rule, not a style choice.** Pages
  under `/locations/` are real staffed offices and carry a postal address.
  Pages under `/service-areas/` are areas served from elsewhere: they state that
  plainly, carry **no fabricated address and no `LocalBusiness` schema**, and rely
  on the site-wide org `areaServed`. Inventing an address would be a Google
  policy violation.
- Shared office identity: both the Gudalur page and the Nilgiris page describe the
  same branch, so both use the schema `@id` `https://prasanthassociates.com#gudalur-branch`
  to avoid Google reading two businesses.
- **Internal links matter.** Pages reachable only via the sitemap tend to sit at
  "Discovered – currently not indexed". Every page should be linked from the
  footer or a related page.

## 10. Notable components

- `layout/Header.tsx` — sticky nav with a services mega-dropdown. Owns
  `selectedServiceModal` state; dropdown items and `MobileNav` (via an
  `onServiceSelect` callback) open the shared service card.
- `ui/ServiceDetailModal.tsx` — **the single service card**, opened from three
  places: header dropdown, mobile nav, and Services-page cards. Shows the
  service, its option pickers, and Request Quote / Building Planner. Selections
  travel to the quote form as `?f1=&f2=` (comma-separated).
- `ui/OptionCards.tsx` — shared option picker. `multi` renders **checkboxes**
  (options combine, e.g. scope) and the default renders **radios** (options
  exclude, e.g. built-up area). Driven per field by `field1Multi` / `field2Multi`
  in `serviceQuoteData.ts`.
- `ui/ContactForm.tsx` — the reusable lead form; `isEstimate` switches to the
  compact quote variant, `serviceSlug` pre-fills from `serviceQuoteSpecs`.
- `planner/ApplePlannerApp.tsx` — multi-step wizard (`planner/steps/*`, ~15 steps,
  state in `planner/types.ts`).
- `planner/SimplePlannerForm.tsx` — single-page planner with floor config and
  grouped "Preferred Room Features" chips.
- `ui/ScrollReveal.tsx`, `ui/CTABanner.tsx`, `ui/Button.tsx` — used on nearly
  every page; `Button` is polymorphic (renders `<a>` when given `href`).

## 11. Rebuilding from scratch

1. `npx create-next-app@16.3.4` with TypeScript, Tailwind, App Router, `src/`,
   placed in a `frontend/` subdirectory.
2. `npm i lucide-react`.
3. Copy `globals.css` — the design system is the site's identity, and everything
   else references its tokens and `.nm-*` utilities.
4. Recreate `src/data/` first. Content drives the components, not the reverse.
   Start with `company.ts`, `services.ts`, `serviceCategories.ts`, `navigation.ts`.
5. Build `layout.tsx` (fonts, metadataBase, org schema, Header/Footer), then
   `Header`, `Footer`, `Button`, `ScrollReveal`, `CTABanner`.
6. Add pages, each as a server `page.tsx` with metadata + JSON-LD.
7. Add `sitemap.ts` and `robots.ts`.
8. Wire forms last: `lib/attachments.ts` → `lib/googleSheets.ts` →
   `actions/contactActions.ts` → `/api/upload`. Deploy
   `scripts/google-sheets-script.js` as a Google Apps Script web app and set the
   env vars.
9. `next.config.ts`: `output: "standalone"`, `images.formats: ["image/webp"]`,
   `minimumCacheTTL: 31536000`, long cache headers for `/images/:path*`, and the
   security headers (HSTS, X-Frame-Options, X-Content-Type-Options,
   Referrer-Policy, Permissions-Policy).

## 12. Conventions and gotchas

- **Work in `frontend/`.** `npm` commands fail at the repo root.
- **Verify with the real browser.** UI work should be checked by running
  `npm run dev` and loading the page, not by reading the diff.
- **`AGENTS.md` is regenerated by `next dev`.** If it reappears as an uncommitted
  change, commit it with your work rather than reverting.
- Check `npx tsc --noEmit` and `npx eslint` before considering a change done.
- Some pre-existing lint warnings (unused imports, `<img>` usage) are expected;
  don't treat them as regressions.
- **Known dead code**: `components/ui/RequestDesignForm.tsx` is imported nowhere
  (`/request-design` is now a redirect). `nilgirisHubs` in
  `locations/nilgiris-ooty/page.tsx` is defined but never rendered.
- **Known gaps**: `/privacy` and `/terms` are linked in the footer but return
  404. `http://` does not redirect to `https://` (fix in Cloudflare →
  SSL/TLS → Always Use HTTPS, not in code).
