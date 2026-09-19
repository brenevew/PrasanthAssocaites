# Google Sheets Form Integration — Setup & Deployment Guide

How client submissions from the website's three forms reach a Google Sheet, and
how to configure, deploy, verify and troubleshoot that pipeline.

Scope: the `frontend/` Next.js application only. No backend, database or paid
third-party service (Zapier, Make) is involved. Uploaded files are stored in
Google Drive under the same Google account.

---

## Table of Contents

1. [What is connected](#1-what-is-connected)
2. [Architecture & how it works](#2-architecture--how-it-works)
3. [One-time Google setup](#3-one-time-google-setup)
4. [File uploads (plans, sketches, site photos)](#4-file-uploads-plans-sketches-site-photos)
5. [Rate limiting](#5-rate-limiting)
6. [Secrets & environment variables](#6-secrets--environment-variables)
7. [Hosting & deployment](#7-hosting--deployment)
   - [Cloudflare Workers (the live path)](#cloudflare-workers-the-live-path)
   - [VPS / EC2 / DigitalOcean (plain Node)](#vps--ec2--digitalocean-plain-node)
   - [Vercel](#vercel)
   - [Netlify](#netlify)
8. [Verifying a deployment](#8-verifying-a-deployment)
9. [Troubleshooting](#9-troubleshooting)
10. [Operational notes](#10-operational-notes)

### Setup at a glance

If you are starting from nothing, the order is:

| # | Task | Where | Section |
|---|------|-------|---------|
| 1 | Create the Google Sheet | sheets.google.com | [3](#step-1--create-the-sheet) |
| 2 | Generate a shared secret | your terminal | [3](#step-2--generate-a-shared-secret) |
| 3 | Paste in the Apps Script | Sheet → Extensions | [3](#step-3--install-the-apps-script) |
| 4 | Store the secret script-side | Apps Script settings | [3](#step-4--store-the-secret-in-the-script) |
| 5 | Publish the web app, copy the `/exec` URL | Apps Script → Deploy | [3](#step-5--deploy-the-web-app) |
| 6 | Put the URL + secret into your host's env vars | Cloudflare dashboard | [6](#6-secrets--environment-variables), [7](#7-hosting--deployment) |
| 7 | Submit a test lead and confirm the row | the live site | [8](#8-verifying-a-deployment) |

Steps 1–5 are done once, by hand, in Google. Step 6 is repeated per environment
(production, staging, local).

---

## 1. What is connected

| # | Form | Page | Sheet tab |
|---|------|------|-----------|
| 1 | Contact | `/contact` | `Contact Us` |
| 2 | Request Quote | `/request-quote`, service pages, cost calculator | `Request Quote` |
| 3 | Building Planner | `/plan-home` (both Express and Detailed modes) | `Building Planner` |

Every submission is written **twice**: once to the combined `All Inquiries` tab
(the full chronological lead log) and once to its own per-form tab.

### Columns

| Column | Contents |
|--------|----------|
| Date & Time | Submission time, IST |
| Form Type | Which of the three forms |
| Reference ID | Code shown to the client on the success screen (`REF-2026-1234`, `PRJ-2026-1234`) |
| Client Name | |
| Phone Number | Stored as text, so leading zeros survive |
| Email Address | |
| Project Type | Residential / Commercial, plus commercial sub-type |
| Location | |
| Estimated Cost / Budget | Indian formatting, e.g. `₹ 45,00,000` |
| Details & Specifications | Form-specific fields: built-up area, floors, basement (Parking / Custom Rooms / both, with bay counts), package, features, message, timeline |
| Attachments | One clickable filename per uploaded file, newline-separated. The file name carries the Drive link — clicking it opens the file in a new tab |

---

## 2. Architecture & how it works

The browser never talks to Google directly and never holds the shared secret.
Every write is made server-side, by the Next.js server, to a single Apps Script
endpoint that is the only thing with permission to touch the Sheet:

```
┌──────────────┐   HTTPS POST (form JSON)   ┌──────────────────────────┐
│    Browser   │ ─────────────────────────► │   Next.js server         │
│ (no secrets) │                            │  • validates the payload │
└──────────────┘                            │  • rate-limits by IP     │
                                            │  • adds SHARED_SECRET    │
                                            └────────────┬─────────────┘
                                                         │ HTTPS POST + token
                                                         ▼
                                            ┌──────────────────────────┐
                                            │  Apps Script Web App     │
                                            │  (doPost, runs as you)   │
                                            └────────────┬─────────────┘
                                                         │
                                          ┌──────────────┴──────────────┐
                                          ▼                             ▼
                                  ┌───────────────┐            ┌────────────────┐
                                  │ Google Sheet  │            │  Google Drive  │
                                  │  (lead rows)  │            │ (uploaded files)│
                                  └───────────────┘            └────────────────┘
```

**Why it is built this way.** The Apps Script runs as the Google account that
owns it, so no service-account key, Google Cloud project or API enablement is
required, and file uploads inherit that account's Drive storage. The cost is
that the web app must be published as "Anyone" — which is why the shared secret
and the per-IP rate limiting in [section 5](#5-rate-limiting) exist.

Which code path each form uses:

```
Contact form ─────────┐
Request Quote form ───┤→ submitContactForm()   [Server Action]
                      │         │
Building Planner ─────┘→ POST /api/sync-sheets [Route Handler]
                                │
                                ▼
                      sendToGoogleSheet()  (src/lib/googleSheets.ts)
                                │  HTTPS POST + shared-secret token
                                ▼
                      Google Apps Script Web App  (doPost)
                                │
                                ▼
                          Google Sheet


File uploads take a separate path, so image bytes never pass through a
Server Action (which Next.js caps at a 1MB request body):

  <ImageUpload> ──► resize in browser ──► POST /api/upload  [Route Handler]
                                                  │  multipart/form-data
                                                  ▼
                                    Apps Script (action: "upload")
                                                  │
                                                  ▼
                                          Google Drive folder
                                                  │
                                      returns a shareable file URL
                                                  │
                            held in form state, submitted as "attachments"
```

Relevant files:

| File | Role |
|------|------|
| `frontend/src/lib/googleSheets.ts` | Builds the payload, posts it, retries once, reports failures |
| `frontend/src/app/actions/contactActions.ts` | Server Action for Contact and Request Quote |
| `frontend/src/app/api/sync-sheets/route.ts` | Route Handler used by the Building Planner (client-side) |
| `frontend/src/services/projectPlanApi.ts` | Builds the Building Planner payload |
| `frontend/src/app/api/upload/route.ts` | Receives one file, forwards it to Drive via the Apps Script |
| `frontend/src/components/ui/ImageUpload.tsx` | Shared drag-and-drop uploader used by all three forms |
| `frontend/src/lib/compressImage.ts` | Downscales photos in the browser before upload |
| `frontend/src/lib/attachments.ts` | Shared upload limits and the `Attachment` type |
| `frontend/src/lib/rateLimit.ts` | Per-IP request limiter shared by the sync, upload and Server Action endpoints |
| `scripts/google-sheets-script.js` | The Apps Script to paste into the Sheet |

**Design note.** Google Sheets is the system of record. The local JSON store at
`frontend/src/data/db/submissions.json` is a development convenience only — it
is not writable in the production container and is skipped there without
affecting submissions.

---

## 3. One-time Google setup

**Before you start you need:**

| Requirement | Notes |
|-------------|-------|
| A Google account | Consumer (`@gmail.com`) is fine. **This account owns the Sheet, the script and every uploaded file** — use a company account, not a personal one belonging to an individual employee. |
| Free Drive space | Uploads consume this account's 15 GB. See [quota notes](#quota-notes). |
| A terminal | For `openssl`, to generate the secret. |
| `scripts/google-sheets-script.js` | From this repo. |

No Google Cloud project, billing account, service account or API enablement is
required — the Apps Script authenticates as the account that owns it.

> **Do these five steps once.** They produce two values — a `/exec` URL and a
> secret — which are then fed into every environment you deploy
> ([section 6](#6-secrets--environment-variables)).

### Step 1 — Create the Sheet

Create a spreadsheet at <https://sheets.google.com>, e.g.
*Prasanth Associates — Inquiries & Leads*. The tabs and headers are created
automatically on the first submission; do not create them by hand.

### Step 2 — Generate a shared secret

The web app must be published as "Anyone", so this token is what stops
strangers from writing rows into the Sheet.

```bash
openssl rand -hex 24
```

Keep the value — it is used in Step 4 and Step 5.

### Step 3 — Install the Apps Script

1. In the Sheet: **Extensions → Apps Script**.
2. Delete everything in `Code.gs`.
3. Paste the entire contents of `scripts/google-sheets-script.js`.
4. Save (⌘S).

### Step 4 — Store the secret in the script

**Project Settings** (gear icon) → **Script Properties** → **Add script property**:

| Property | Value |
|----------|-------|
| `SHARED_SECRET` | the token from Step 2 |

If this property is absent the script accepts unauthenticated writes. Set it.

### Step 5 — Deploy the web app

**Deploy → New deployment → Web app** (pick the type via the gear icon):

| Setting | Value |
|---------|-------|
| Description | `Form Submissions Webhook` |
| Execute as | **Me** (your Google account) |
| Who has access | **Anyone** |

Click **Deploy** and authorise when prompted. Google warns that the script is
unverified — choose **Advanced → Go to \<project\> (unsafe)**; this is expected
for your own script.

Copy the **Web app URL**. It ends in `/exec`:

```
https://script.google.com/macros/s/AKfycb.../exec
```

> **"Who has access: Anyone" is required.** The website server posts to this URL
> without a Google session. The `SHARED_SECRET` is the access control.

### Step 6 — Verify the deployment

Open the `/exec` URL in a browser. You should see:

```json
{"status":"ready","service":"Prasanth Associates Form Ingestion Webhook","secretConfigured":true}
```

`secretConfigured: false` means Step 4 was missed.

---

## 4. File uploads (plans, sketches, site photos)

All three forms accept JPG, PNG, WebP, HEIC and PDF files, within these limits:

| Limit | Value | Where it is enforced |
|-------|-------|----------------------|
| Per file | **2 MB** | Browser, `/api/upload`, and the Apps Script |
| Per submission (all files) | **5 MB** | Browser, and `/api/upload` |
| Number of files | **5** | Browser |

### The limits apply to the compressed file, not the original

Photos are **downscaled in the browser** before upload — to a 1600px longest
edge, with JPEG quality stepping down until the result fits under 2 MB. A 6 MB
phone photo typically becomes ~300 KB, so a visitor can attach an ordinary
camera photo and it simply works.

This is why the 2 MB limit is measured *after* compression. Measuring the file
as picked would reject almost every phone photo, which are routinely 4-8 MB
before downscaling, even though the stored file is a fraction of that.

PDF and HEIC files cannot be re-encoded in the browser and so must already be
under 2 MB. A file larger than 25 MB is refused before compression is attempted,
to avoid the browser trying to decode something enormous.

The uploader shows the running total ("2 of 5 files · 2.1 MB of 5.0 MB used")
and disables itself once either ceiling is reached.

### How it works

1. The visitor picks a file, which is compressed in the browser if it is a
   JPG, PNG or WebP.
2. The file is uploaded immediately — before the form is submitted — to
   `/api/upload`, which re-checks both limits and forwards it to the Apps Script.
3. The Apps Script re-checks the 2 MB ceiling, writes the file to Google Drive
   and returns a link.
4. On submit, only the **links** go into the Sheet's `Attachments` column.

The cell is written as **rich text**: each line shows the file name, and the
name itself is the hyperlink. Clicking one opens that file in a new browser tab.
The raw Drive URLs are never displayed, which keeps the column narrow and
readable when a submission carries several files.

> Rows written before this behaviour existed still hold plain
> `filename: url` text. To convert them, open the Apps Script editor, choose
> **`relinkExistingAttachments`** from the function dropdown and press **Run**.
> It walks every tab, is safe to run more than once, and reports how many cells
> it changed. No deployment is needed — it operates on the Sheet directly.

Uploading separately is deliberate: Next.js caps Server Action request bodies at
1MB, and the Contact and Request Quote forms are Server Actions. Routing file
bytes through a Route Handler instead keeps those submissions small.

The submit button stays disabled while an upload is in flight, so a visitor
cannot submit a form whose attachments have not finished uploading.

### Where files are stored

By default the script creates this folder tree in the **My Drive of the account
that owns the Apps Script**:

```text
Prasanth Associates — Form Uploads/
├── Contact Us/
├── Request Quote/
└── Building Planner/
```

Filenames are prefixed with a timestamp (`20260912-143022_site-plan.png`) so
same-named uploads never overwrite each other, and are stripped of any character
outside `a-z A-Z 0-9 . _ -`.

### Optional script properties

Set these in **Project Settings → Script Properties**, alongside `SHARED_SECRET`:

| Property | Effect |
|----------|--------|
| `UPLOAD_FOLDER_ID` | Store uploads in an existing Drive folder instead of creating one. Use the ID from the folder's URL. |
| `PUBLIC_FILE_LINKS` | `true` makes every uploaded file viewable by **anyone with the link**. |

> **On `PUBLIC_FILE_LINKS`.** It is deliberately **off** by default. These files
> are client property — site plans, survey documents, photos of their land — and
> turning it on makes each one reachable by anyone who obtains the URL, which
> includes anyone you later forward the Sheet to. Leave it unset and instead
> share the *Drive folder* with your team: they will then be able to open the
> links in the Sheet while the files stay private to your organisation.
>
> Turn it on only if you need the links to work for people outside your Google
> Workspace, and understand you are making those documents publicly reachable.

### Quota notes

Uploads consume the Google account's **Drive storage** (15 GB free on a consumer
account). At a few hundred KB per image this lasts a long time, but it is not
unlimited — archive old folders periodically.

---

## 5. Rate limiting

Every endpoint that can reach the Sheet or Drive is rate-limited by client IP,
in addition to the Apps Script's own `SHARED_SECRET` check. This protects the
Apps Script's daily execution quota (see the troubleshooting table) and Drive
storage from a spam burst or a misbehaving script, independent of the Sheet
itself.

| Endpoint | Limit | Window | Applies to |
|----------|-------|--------|------------|
| `submitContactForm` (Server Action) | 5 requests | 10 minutes | Contact form |
| `submitCalculatedEstimate` (Server Action) | 5 requests | 10 minutes | Request Quote / cost calculator |
| `POST /api/sync-sheets` | 15 requests | 10 minutes | Building Planner submissions |
| `POST /api/upload` | 10 requests | 10 minutes | File attachments on all three forms |

A blocked request gets `HTTP 429` with a `Retry-After` header (Route Handlers)
or a friendly "please try again in N minutes" message (Server Actions); the
visitor's own in-progress submission is never silently dropped — they just
see that message instead of success.

### How it works

`frontend/src/lib/rateLimit.ts` implements a fixed-window counter, keyed by
`X-Forwarded-For` (falling back to `X-Real-IP`), entirely **in memory** — there
is no Redis/Upstash dependency. This is a deliberate trade-off, not an
oversight:

- It requires no additional infrastructure or environment variables.
- It is enough to blunt casual abuse (a bot hammering the form, a broken retry
  loop) without adding an external dependency for a lead-volume site.

**The limitation:** counters are per-process, not shared, so a visitor's
effective limit is `limit × the number of server processes`. That is acceptable
when the goal is deterring abuse rather than enforcing an exact global cap.

> [!WARNING]
> **On Cloudflare Workers — the current production host — this limiter is
> effectively inert.** Requests are spread across many short-lived isolates,
> each starting with empty counters, so per-IP limits rarely accumulate.
> `getClientIp()` also reads `X-Forwarded-For` then `X-Real-IP`, while
> Cloudflare supplies the true client IP in `CF-Connecting-IP` — so even within
> one isolate the key may not identify the visitor. If rate limiting matters,
> use Cloudflare's own WAF rate-limiting rules in front of `/api/*`, or back
> the counter with Workers KV or a Durable Object. The call sites
> (`rateLimit(key, limit, windowMs)`) would not need to change.

### Adjusting the limits

Each limit is a pair of constants at the top of the file that defines the
endpoint:

| File | Constants |
|------|-----------|
| `frontend/src/app/actions/contactActions.ts` | `LEAD_FORM_LIMIT`, `LEAD_FORM_WINDOW_MS` |
| `frontend/src/app/api/sync-sheets/route.ts` | `SYNC_LIMIT`, `SYNC_WINDOW_MS` |
| `frontend/src/app/api/upload/route.ts` | `UPLOAD_LIMIT`, `UPLOAD_WINDOW_MS` |

---

## 6. Secrets & environment variables

All three are **server-side only** — they are never sent to the browser. None of
them may be prefixed `NEXT_PUBLIC_`; that would inline the secret into the
browser bundle.

The two Google values are read **at runtime**, so changing them needs only a
restart. The Server Actions key is different — see the note below the table.

| Variable | Required | Read at | Example value | Purpose |
|----------|----------|---------|---------------|---------|
| `GOOGLE_SHEETS_WEBHOOK_URL` | Yes | Runtime | `https://script.google.com/macros/s/AKfycbx.../exec` | The `/exec` URL from [Step 5](#step-5--deploy-the-web-app) |
| `GOOGLE_SHEETS_SHARED_SECRET` | Strongly recommended | Runtime | `9f2c1a7e4b8d...` (48 hex chars) | Must match `SHARED_SECRET` in the Apps Script |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | Yes, when more than one server process serves traffic | **Build** | `Ux3k9...=` (base64, 32 bytes) | Stable key shared by every server process |

Generate the two you create yourself:

```bash
openssl rand -hex 24      # GOOGLE_SHEETS_SHARED_SECRET
openssl rand -base64 32   # NEXT_SERVER_ACTIONS_ENCRYPTION_KEY
```

### Getting the values right

Most failed deployments are one of these four mistakes, not a code problem:

> [!IMPORTANT]
> - **The URL must end in `/exec`**, not `/dev`. The `/dev` URL only works while
>   you are signed in to the Apps Script editor, so it will appear to work in
>   your browser and fail from the server.
> - **The secret must match byte for byte.** Copy-paste introduces trailing
>   spaces and newlines — a mismatch shows up as
>   `{"status":"unauthorized"}`. Most dashboards do not trim for you.
> - **Do not wrap values in quotes** in a hosting dashboard's env-var field.
>   Quotes are shell/`.env` file syntax; pasted into a web form they become part
>   of the value.
> - **Changing an env var does not affect a running deployment.** Every platform
>   below needs a restart or redeploy afterwards.

### About `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`

The Contact and Request Quote forms are Server Actions. Next.js encrypts the
variables an action closes over, using a key generated at build time. If two
server instances hold different keys, one cannot decrypt what the other
encrypted and submissions fail intermittently with "Failed to find Server
Action" — typically after a scale-out or during a rolling deploy.

> [!IMPORTANT]
> **This is a build-time variable, not a runtime one.** Next.js embeds the key
> into the build output, so it must be present when `next build` runs:
>
> ```bash
> NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=your-generated-key npm run build
> ```
>
> Setting it only in the container's runtime environment does not reliably
> replace the key already baked into the bundle. (See
> `node_modules/next/dist/docs/01-app/02-guides/self-hosting.md`.)

Generate it once and store it with your other long-lived secrets:

```bash
openssl rand -base64 32
```

Keep the **same value across rebuilds**, and make sure every server process is
running the same build.

> **On Cloudflare Workers this is lower-risk than on a self-hosted cluster.**
> Every isolate runs the same deployed build, so they share whatever key that
> build baked in, and a deploy swaps them over together. Setting the variable
> explicitly still helps if you ever need two deployments live at once (a
> gradual rollout, or preview traffic against production data) — on Workers it
> must be set as a **build**-time variable in the project's build configuration,
> not as a runtime secret.

### Local development

```bash
cd frontend
cp .env.example .env.local
```

Then fill in:

```bash
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
GOOGLE_SHEETS_SHARED_SECRET=your-token-from-step-2
```

```bash
npm run dev
```

`.env.local` is gitignored. Point local development at a **throwaway Sheet**,
not the production one.

Leaving `GOOGLE_SHEETS_WEBHOOK_URL` blank is safe: forms still succeed and each
lead is printed to the terminal instead of being written to the Sheet.

---

## 7. Hosting & deployment

Wherever the site runs, the job is the same: get the three variables from
[section 6](#6-secrets--environment-variables) into the **server's runtime
environment**, then restart. Only the mechanism differs.

| Platform | Secrets go in | Status |
|----------|---------------|--------|
| [Cloudflare Workers](#cloudflare-workers-the-live-path) | Settings → Variables and Secrets | **This is what production runs** |
| [VPS / EC2 / DigitalOcean](#vps--ec2--digitalocean-plain-node) | `.env` + process manager | Alternative |
| [Vercel](#vercel) | Project → Settings → Environment Variables | Alternative |
| [Netlify](#netlify) | Site configuration → Environment variables | Alternative |

None of these are build-time values, so none of them belong in a build
argument or a committed file — they go into the host's runtime environment or
secret store.

### Cloudflare Workers (the live path)

`prasanthassociates.com` is served by **Cloudflare Workers** through the
[`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) adapter — the
live responses carry `x-opennext: 1` and `server: cloudflare`. The deployment is
wired up in the Cloudflare dashboard against the GitHub repository; there is no
`wrangler.toml` or `open-next.config.ts` in this repo, so **the settings below
are changed in the dashboard, not in version control.**

> [!IMPORTANT]
> **Deploying the code does not configure it.** `.env*` files are gitignored, so
> local values never travel with a push. A site can be running the newest commit
> and still write nothing to the Sheet. The variables below are the only thing
> that makes lead capture work, and they are set in the dashboard.

#### Making lead capture work in production

**Step 1 — Rotate the shared secret if it has ever been committed.**

Check before you start; a token that reached a public repository must be
replaced, not reused:

```bash
git log -S'your-current-token' --oneline
```

If that prints anything, generate a replacement and update the
`SHARED_SECRET` **script property** in Apps Script (Project Settings → Script
Properties) to the new value:

```bash
openssl rand -hex 24
```

**Step 2 — Set the variables in Cloudflare.**

**Workers & Pages → your project → Settings → Variables and Secrets**, under the
**Production** environment:

| Variable | Value | Type |
|----------|-------|------|
| `GOOGLE_SHEETS_WEBHOOK_URL` | your `/exec` URL | Secret |
| `GOOGLE_SHEETS_SHARED_SECRET` | the token from Step 1 | **Secret** |
| `NEXT_PUBLIC_SITE_URL` | `https://prasanthassociates.com` | Plaintext |

**Step 3 — Redeploy.**

Workers reads these at deploy time, not live, so adding a variable to an
existing deployment changes nothing until it rebuilds. Trigger a deployment from
the dashboard, or push a commit.

**Step 4 — Verify.** Run the checks in
[section 8](#8-verifying-a-deployment). The fastest signal:

```bash
curl -s -o /dev/null -w '%{http_code}\n' -X POST https://prasanthassociates.com/api/upload \
  -H 'Content-Type: application/json' -d '{}'
```

`503` means `GOOGLE_SHEETS_WEBHOOK_URL` is still unset. Anything else means the
variable arrived.

**Step 5 — Update every other copy of the secret.** If you rotated in Step 1,
the old value is now dead everywhere else: `frontend/.env.development` on each
developer's machine, and the **Preview** environment if you use branch
deployments. Point Preview at a throwaway Sheet so test submissions never reach
the real lead log.

> [!WARNING]
> A missing or mismatched secret is **invisible from the front end**. Pages
> serve, forms show the client a success screen, reference codes are still
> issued — and every lead is dropped. Never assume it works because the site
> loads; run Step 4 after each deploy.

Two behavioural differences to keep in mind on Workers:

- **The in-process rate limiter is effectively inert** — see the warning in
  [section 5](#5-rate-limiting). Use Cloudflare WAF rate-limiting rules in front
  of `/api/*` if you need real limits.
- **Client IPs arrive in `CF-Connecting-IP`**, which `getClientIp()` in
  `frontend/src/lib/rateLimit.ts` does not currently read.

### VPS / EC2 / DigitalOcean (plain Node)

Build once, then run the standalone server with the variables in the
environment:

```bash
cd frontend
npm ci && npm run build

GOOGLE_SHEETS_WEBHOOK_URL='https://script.google.com/macros/s/YOUR_ID/exec' \
GOOGLE_SHEETS_SHARED_SECRET='your-token' \
NEXT_SERVER_ACTIONS_ENCRYPTION_KEY='your-base64-key' \
node .next/standalone/server.js
```

For anything long-lived use a process manager and an env file rather than
inline variables, so the secrets are not visible in `ps` output:

```bash
# /etc/prasanth-frontend.env  — chmod 600, owned by the service user
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_ID/exec
GOOGLE_SHEETS_SHARED_SECRET=your-token
NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=your-base64-key
```

```ini
# systemd unit
[Service]
EnvironmentFile=/etc/prasanth-frontend.env
ExecStart=/usr/bin/node /srv/prasanth/frontend/.next/standalone/server.js
Restart=always
```

`next.config.ts` sets `output: "standalone"`, so the build produces a
self-contained server at `.next/standalone/server.js`. That bundle does **not**
include static assets — copy them alongside it yourself, or the site serves
HTML with no CSS, JS or images:

```bash
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
```

### Vercel

1. Open the project on the [Vercel dashboard](https://vercel.com/).
2. **Settings → Environment Variables**.
3. Add all three from [section 6](#6-secrets--environment-variables). For each,
   tick **Production** and **Preview** (and **Development** if you use
   `vercel dev`).
4. Mark `GOOGLE_SHEETS_SHARED_SECRET` and
   `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` as **Sensitive** so they cannot be read
   back from the dashboard afterwards.
5. **Deployments → ⋯ → Redeploy.** Existing deployments keep their old
   environment; adding a variable alone changes nothing.

Point Preview at a **throwaway Sheet** — otherwise every pull-request deployment
writes test rows into the production lead log.

> `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` addresses a **self-hosting** problem —
> multiple independently-built server instances — which a managed platform does
> not expose you to. You can leave it unset on Vercel. If you do set it, note
> that Vercel injects environment variables into the build, so it takes effect
> the same way as the build-time usage described in
> [section 6](#about-next_server_actions_encryption_key).

### Netlify

1. **Site configuration → Environment variables → Add a variable.**
2. Add all three, scoped to the deploy contexts you need (**Production**,
   **Deploy previews**).
3. Choose **Contains secret values** for the secret and the encryption key —
   Netlify then withholds them from the build log.
4. **Deploys → Trigger deploy → Clear cache and deploy site.**

Netlify runs Next.js through `@netlify/plugin-nextjs`. Server Actions and Route
Handlers both work, so all three forms behave as they do on Node.

---

## 8. Verifying a deployment

1. Open the live site and submit the **Contact** form with obvious test data.
2. Confirm the success screen shows a reference code (`REF-2026-….`).
3. Open the Sheet — a row should appear in both `All Inquiries` and `Contact Us`
   within a few seconds.
4. Repeat for **Request Quote** (`/request-quote`) and **Building Planner**
   (`/plan-home`, both Express and Detailed modes; the planner writes its row at
   the final *Review → Generate Report* step).
5. Check that the reference code in the Sheet matches the one shown on screen.
6. **Test an upload:** attach a photo to any form before submitting. Confirm it
   shows a green tick in the form, that the `Attachments` column holds a link,
   and that the link opens the file in Drive.
7. Delete the test rows, and the test files from the Drive folder.

You can also exercise the planner endpoint directly:

```bash
curl -X POST https://prasanthassociates.com/api/sync-sheets \
  -H "Content-Type: application/json" \
  -d '{"formType":"Building Planner","refCode":"TEST-001","name":"Test",
       "phone":"9876543210","location":"Coimbatore","estimatedBudget":4500000}'
```

Expected: `{"success":true}`.

And the upload endpoint:

```bash
curl -X POST https://prasanthassociates.com/api/upload \
  -F "file=@/path/to/photo.jpg;type=image/jpeg" \
  -F "formType=Contact Us"
```

Expected: `{"success":true,"attachment":{...,"url":"https://drive.google.com/..."}}`.

> Re-running these `curl` commands more than a handful of times in a row will
> trip the rate limiter in section 5 (`HTTP 429`) — that's expected, not a
> deployment problem. Wait for the window to elapse, or point the command at a
> different endpoint to keep testing.

---

## 9. Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `{"success":false,"skipped":true}` | `GOOGLE_SHEETS_WEBHOOK_URL` not set in the running environment | Set it in the host's environment, then **redeploy**. Env changes are read at deploy/start time, never live |
| Works locally, silently does nothing once deployed | Variables added in the hosting dashboard but the deployment was never rebuilt | Redeploy. Every platform in [section 7](#7-hosting--deployment) reads env vars at deploy/start time, not live |
| `Apps Script error: {"status":"unauthorized"}` | `GOOGLE_SHEETS_SHARED_SECRET` ≠ `SHARED_SECRET` script property | Make the two identical; re-check for trailing whitespace |
| Webhook works in your browser but never from the server | The `/dev` URL was copied instead of `/exec` | `/dev` only authorises the signed-in editor. Use the `/exec` URL from **Deploy → Manage deployments** |
| Opening the `/exec` URL in a browser shows Drive's "Sorry, unable to open the file at present" page | Usually not a deployment fault: the browser resolved the link against the wrong signed-in Google account | Retry in an Incognito window. If the JSON from [Step 6](#step-6--verify-the-deployment) appears there, the deployment is healthy and server-side posts are unaffected. Confirm from outside any session with `curl -sL '<exec URL>'`. If Incognito fails too, the deployment is archived or was not created as a **Web app** — re-copy the URL from **Deploy → Manage deployments**, or check whether a Workspace admin blocks "Anyone" access |
| `unauthorized`, and the secret looks correct | The value was pasted into a dashboard field wrapped in `"` quotes | Quotes are `.env`/shell syntax only — in a web form they become part of the value. Re-enter without them |
| Test rows from staging appear in the production Sheet | Preview/branch environment shares the production `GOOGLE_SHEETS_WEBHOOK_URL` | Point the preview environment at a throwaway Sheet's `/exec` URL |
| `HTTP 401` / `HTTP 403` | Web app not published as "Anyone", or authorisation never completed | Redeploy with **Who has access: Anyone** and finish the consent screen |
| Form succeeds but no row appears | Script edited without publishing a new version | **Deploy → Manage deployments → edit → Version: New version.** Saving alone does not publish |
| Rows land in the wrong tab | Unrecognised `formType` falls back to `Inquiry` | Check the `formType` sent; must be one of the four in `FORM_TYPES` |
| Contact/Quote fail intermittently ("Failed to find Server Action"), planner is fine | Two builds with different Server Actions keys serving traffic at once — a gradual rollout, or preview traffic hitting production | Rebuild with a fixed `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` at **build** time; see [section 6](#about-next_server_actions_encryption_key). Setting it only at runtime is not sufficient |
| Upload returns `HTTP 503`, "uploads are not configured" | `GOOGLE_SHEETS_WEBHOOK_URL` is unset | Same fix as above — uploads use the same webhook as form rows |
| Upload returns `HTTP 502`, "rejected by the storage service" | Apps Script threw while writing to Drive | Check **Executions** in the Apps Script editor. Usually Drive is out of storage, or `UPLOAD_FOLDER_ID` names a folder the script owner cannot write to |
| "still N MB after compression" | A detailed image did not come under 2 MB even at reduced quality, or a PDF/HEIC was already over | HEIC and PDF are not compressed in the browser — ask the client to send a JPG. To change the ceiling, edit `MAX_FILE_BYTES` in `frontend/src/lib/attachments.ts` (and `MAX_UPLOAD_BYTES` in the Apps Script to match) |
| "would exceed the 5.0 MB total limit" | The submission's files already add up to nearly 5 MB | Expected behaviour. Adjust `MAX_TOTAL_BYTES` in `frontend/src/lib/attachments.ts` if the business needs more |
| Drive links in the Sheet say "You need access" | Files are private to the script owner (the default) | Share the Drive upload folder with whoever needs it, or set `PUBLIC_FILE_LINKS` — read the warning in section 4 first |
| Attachment cells show raw `filename: url` text instead of clickable names | The row predates the rich-text linking, or the script was updated without publishing a new version | Run `relinkExistingAttachments` from the Apps Script editor for old rows; for new ones, publish a **new version** of the deployment |
| `Attachments` column missing on an existing Sheet | Sheet predates the upload feature | The script adds the column automatically on the next submission. Publish a **new version** of the deployment first |
| `HTTP 429` with `{"success":false,"error":"Too many ..."}` and a `Retry-After` header | The site's own per-IP rate limiter (see section 5) tripped — a real visitor rarely hits this | Wait for the window to elapse, or raise the limit constant for that endpoint if legitimate traffic is being blocked |
| `HTTP 429` / sustained timeouts with no `Retry-After` header, or an HTML response instead of JSON | Apps Script daily quota exceeded (consumer Google accounts have lower limits than Workspace ones) | Check **Executions** in the Apps Script editor for quota errors; unlikely at this lead volume |

### Reading the logs

Every failure is logged server-side with the complete lead payload, so no
enquiry is ever lost even when the Sheet is unreachable:

On Cloudflare, open **Workers & Pages → your project → Logs**, or stream them:

```bash
npx wrangler tail --format pretty
```

On a VPS running the systemd unit, read the service journal instead:

```bash
journalctl -u prasanth -n 200 --no-pager | grep -i "GoogleSheets\|sync failed"
```

Look for `Google Sheets sync failed for REF-…` followed by the JSON payload —
those leads can be re-entered into the Sheet by hand.

Apps Script side: **Apps Script editor → Executions** shows every `doPost` call,
its status and any thrown error.

---

## 10. Operational notes

- **Rotating the secret.** Update the `SHARED_SECRET` script property and every
  copy of `GOOGLE_SHEETS_SHARED_SECRET` together; briefly mismatched values cause
  rejected writes, so do it during a quiet period. The copies are: the Cloudflare
  **Production** environment, the **Preview** environment if used, and each
  developer's `frontend/.env.development`. Rotate immediately if the token has
  ever been committed — `git log -S'<token>' --oneline` will tell you. Deleting
  it from the file is not enough, because it remains in history; only changing
  the value in Apps Script actually revokes it.
- **Re-deploying the script.** Any change to `scripts/google-sheets-script.js`
  requires publishing a **new version** of the deployment. The `/exec` URL stays
  the same when you edit the existing deployment; creating a *new* deployment
  issues a new URL that must be propagated to the secret.
- **Sheet access.** Anyone with edit access to the Sheet can read every lead —
  share it deliberately. The Apps Script runs as its owner, so submissions keep
  working regardless of who else has access.
- **On the 5 MB total.** Uploads are stateless, one request per file, so the
  running total is reported by the browser and re-checked server-side. A client
  that tampers with that value is still bounded by the hard per-file limit and
  the 5-file cap, so the worst case one submission can store is 10 MB.
- **Uploaded files are not in the Sheet.** The Sheet holds only links; the files
  live in Drive. Deleting a row does not delete its files, and emptying the Drive
  folder turns every link in that column into a dead end.
- **Backups.** File → Version history covers accidental deletion. For a durable
  archive, **File → Download → CSV** periodically, or duplicate the Sheet monthly.
- **Failure behaviour is deliberate.** A Sheets outage never shows the client an
  error: the form reports success, the reference code is still issued, and the
  lead is written to the server log for manual reconciliation.
