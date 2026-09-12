# Local Development Guide

This workspace contains a single application:

- `frontend/` — the Next.js web UI.

There is no backend server or database. Form submissions are sent directly to a
Google Sheet; see [`GOOGLE_SHEETS_DEPLOYMENT.md`](GOOGLE_SHEETS_DEPLOYMENT.md).

---

## 1. Prerequisites

**Node.js 20 or higher.**

---

## 2. First-time setup

```bash
cd frontend
npm install
cp .env.example .env.local
```

Edit `.env.local` if you want submissions to reach a Google Sheet. Point it at a
**throwaway Sheet**, never the production one:

```bash
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_ID/exec
GOOGLE_SHEETS_SHARED_SECRET=your-token
```

Leaving these blank is fine — forms still work, and each submission is logged to
your terminal instead of being written to the Sheet.

---

## 3. Running the development server

```bash
cd frontend
source ~/.nvm/nvm.sh && nvm use 20 && npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 4. Building & linting

```bash
cd frontend
source ~/.nvm/nvm.sh && nvm use 20 && npm run build
npm run lint
```

---

## 5. Testing the forms

| Form | Route |
|------|-------|
| Contact | [http://localhost:3000/contact](http://localhost:3000/contact) |
| Request Quote | [http://localhost:3000/request-quote](http://localhost:3000/request-quote) |
| Building Planner | [http://localhost:3000/plan-home](http://localhost:3000/plan-home) |

Each form also has a file uploader: up to 5 files, **2 MB per file** and **5 MB
per submission**, in JPG, PNG, WebP, HEIC or PDF. Photos are downscaled in the
browser first, so the limits apply to the compressed result — an ordinary 6 MB
phone photo becomes ~300 KB and fits comfortably. Uploads need
`GOOGLE_SHEETS_WEBHOOK_URL` to be set — without it `/api/upload` returns a 503
and the form shows a message asking the client to email their files instead.

In development, submissions are also mirrored to
`frontend/src/data/db/submissions.json` for quick inspection. That file is a
local convenience only and is not used in production.
