# Google Sheets Form Integration — Setup & Deployment Guide

How client submissions from the website's three forms reach a Google Sheet, and
how to configure, deploy, verify and troubleshoot that pipeline.

Scope: the `frontend/` Next.js application only. No backend, database or paid
third-party service (Zapier, Make) is involved. Uploaded files are stored in
Google Drive under the same Google account.

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
| Details & Specifications | Form-specific fields: built-up area, floors, package, features, message, timeline |
| Attachments | One `filename: Drive link` per uploaded file, newline-separated |

---

## 2. How it works

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
| `scripts/google-sheets-script.js` | The Apps Script to paste into the Sheet |

**Design note.** Google Sheets is the system of record. The local JSON store at
`frontend/src/data/db/submissions.json` is a development convenience only — it
is not writable in the production container and is skipped there without
affecting submissions.

---

## 3. One-time Google setup

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

## 5. Environment variables

All three are **server-side only** and read at runtime — they are never sent to
the browser and are not needed at build time.

| Variable | Required | Purpose |
|----------|----------|---------|
| `GOOGLE_SHEETS_WEBHOOK_URL` | Yes | The `/exec` URL from Step 5 |
| `GOOGLE_SHEETS_SHARED_SECRET` | Strongly recommended | Must match `SHARED_SECRET` in the Apps Script |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | Yes, when running more than one replica | Stable key shared by every pod |

### About `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`

The Contact and Request Quote forms are Server Actions. Next.js encrypts action
payloads with a key generated at build time; when several pods each hold a
different key, submissions fail intermittently after a scale-out or rolling
deploy. Production runs `replicas: 2` with an HPA up to 8, so this must be set.

```bash
openssl rand -base64 32
```

Use the **same value across every replica**, and keep it stable across
deployments.

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

## 6. Deployment

### Kubernetes (the configured path)

Secrets are delivered through `frontend-prod-secret`, defined at the top of
`k8s/prod/03-frontend.yaml` and mounted via `envFrom`.

**Do not commit real secrets.** Either edit the manifest locally without
committing it, or replace the placeholders imperatively:

```bash
kubectl create secret generic frontend-prod-secret \
  --namespace prasanth-prod \
  --from-literal=GOOGLE_SHEETS_WEBHOOK_URL='https://script.google.com/macros/s/YOUR_ID/exec' \
  --from-literal=GOOGLE_SHEETS_SHARED_SECRET='your-token' \
  --from-literal=NEXT_SERVER_ACTIONS_ENCRYPTION_KEY="$(openssl rand -base64 32)" \
  --dry-run=client -o yaml | kubectl apply -f -
```

Apply and roll out:

```bash
kubectl apply -f k8s/prod/03-frontend.yaml
kubectl rollout restart deployment/frontend-prod -n prasanth-prod
kubectl rollout status  deployment/frontend-prod -n prasanth-prod
```

Confirm the variables reached the pods:

```bash
kubectl exec -n prasanth-prod deploy/frontend-prod -- \
  sh -c 'echo "URL set: ${GOOGLE_SHEETS_WEBHOOK_URL:+yes}; secret set: ${GOOGLE_SHEETS_SHARED_SECRET:+yes}"'
```

The dev overlay uses `frontend-dev-secret` in `k8s/dev/03-frontend.yaml`, blank
by default so dev never writes to the production Sheet.

### Docker / Docker Compose

Pass the variables at **run** time, not build time:

```bash
docker run -p 3000:3000 \
  -e GOOGLE_SHEETS_WEBHOOK_URL='https://script.google.com/macros/s/YOUR_ID/exec' \
  -e GOOGLE_SHEETS_SHARED_SECRET='your-token' \
  -e NEXT_SERVER_ACTIONS_ENCRYPTION_KEY='your-base64-key' \
  prasanth-frontend:latest
```

The `frontend/Dockerfile` needs no change — build args are only for
`NEXT_PUBLIC_*` values, which these are deliberately not.

### Vercel / Netlify / other Node hosts

Add the three variables under the project's environment settings (Production
and Preview), then redeploy. A redeploy is required: runtime env changes are
not picked up by a running deployment.

---

## 7. Verifying a deployment

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

---

## 8. Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `{"success":false,"skipped":true}` | `GOOGLE_SHEETS_WEBHOOK_URL` not set in the running environment | Set it and redeploy/restart. Env changes need a pod restart |
| `Apps Script error: {"status":"unauthorized"}` | `GOOGLE_SHEETS_SHARED_SECRET` ≠ `SHARED_SECRET` script property | Make the two identical; re-check for trailing whitespace |
| `HTTP 401` / `HTTP 403` | Web app not published as "Anyone", or authorisation never completed | Redeploy with **Who has access: Anyone** and finish the consent screen |
| Form succeeds but no row appears | Script edited without publishing a new version | **Deploy → Manage deployments → edit → Version: New version.** Saving alone does not publish |
| Rows land in the wrong tab | Unrecognised `formType` falls back to `Inquiry` | Check the `formType` sent; must be one of the four in `FORM_TYPES` |
| Contact/Quote fail intermittently, planner is fine | Multiple replicas without a shared Server Actions key | Set `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` identically on every pod |
| Upload returns `HTTP 503`, "uploads are not configured" | `GOOGLE_SHEETS_WEBHOOK_URL` is unset | Same fix as above — uploads use the same webhook as form rows |
| Upload returns `HTTP 502`, "rejected by the storage service" | Apps Script threw while writing to Drive | Check **Executions** in the Apps Script editor. Usually Drive is out of storage, or `UPLOAD_FOLDER_ID` names a folder the script owner cannot write to |
| "still N MB after compression" | A detailed image did not come under 2 MB even at reduced quality, or a PDF/HEIC was already over | HEIC and PDF are not compressed in the browser — ask the client to send a JPG. To change the ceiling, edit `MAX_FILE_BYTES` in `frontend/src/lib/attachments.ts` (and `MAX_UPLOAD_BYTES` in the Apps Script to match) |
| "would exceed the 5.0 MB total limit" | The submission's files already add up to nearly 5 MB | Expected behaviour. Adjust `MAX_TOTAL_BYTES` in `frontend/src/lib/attachments.ts` if the business needs more |
| Drive links in the Sheet say "You need access" | Files are private to the script owner (the default) | Share the Drive upload folder with whoever needs it, or set `PUBLIC_FILE_LINKS` — read the warning in section 4 first |
| `Attachments` column missing on an existing Sheet | Sheet predates the upload feature | The script adds the column automatically on the next submission. Publish a **new version** of the deployment first |
| `HTTP 429` / sustained timeouts | Apps Script daily quota exceeded (consumer Google accounts have lower limits than Workspace ones) | Check **Executions** in the Apps Script editor for quota errors; unlikely at this lead volume |

### Reading the logs

Every failure is logged server-side with the complete lead payload, so no
enquiry is ever lost even when the Sheet is unreachable:

```bash
kubectl logs -n prasanth-prod deploy/frontend-prod --tail=200 | grep -i "GoogleSheets\|sync failed"
```

Look for `Google Sheets sync failed for REF-…` followed by the JSON payload —
those leads can be re-entered into the Sheet by hand.

Apps Script side: **Apps Script editor → Executions** shows every `doPost` call,
its status and any thrown error.

---

## 9. Operational notes

- **Rotating the secret.** Update the `SHARED_SECRET` script property and
  `GOOGLE_SHEETS_SHARED_SECRET` together; briefly mismatched values cause
  rejected writes, so do it during a quiet period.
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
