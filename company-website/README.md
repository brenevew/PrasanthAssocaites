# Prasanth Associates

Web application for **Prasanth Associates Construction & Architecture** — a
Next.js site with three client enquiry forms that feed directly into Google
Sheets.

## Project Architecture

```text
PrasanthAssociates/
├── frontend/                    # Next.js UI Web Application (React, Tailwind CSS, TypeScript)
├── scripts/
│   └── google-sheets-script.js  # Google Apps Script for form ingestion
├── LOCAL_DEVELOPMENT.md
├── GOOGLE_SHEETS_DEPLOYMENT.md
├── DEPLOYMENT_GUIDE.md
└── README.md
```

This is a **frontend-only** application. There is no backend server or database:
form submissions are written straight to a Google Sheet through a Google Apps
Script web app, and all site content is served from static data in
`frontend/src/data/`.

**Production** runs on **Cloudflare Workers** (via the OpenNext adapter) at
[prasanthassociates.com](https://prasanthassociates.com). Environment variables
are configured in the Cloudflare dashboard — see
[`GOOGLE_SHEETS_DEPLOYMENT.md` §7](GOOGLE_SHEETS_DEPLOYMENT.md#7-hosting--deployment).

## Getting Started

```bash
cd frontend
cp .env.example .env.local    # then fill in the Google Sheets values
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

The three enquiry forms are at `/contact`, `/request-quote` and `/plan-home`.
They work without any configuration — if `GOOGLE_SHEETS_WEBHOOK_URL` is unset,
submissions succeed and each lead is printed to the terminal instead of being
written to the Sheet.

Each form also accepts up to 5 image/PDF attachments (plans, sketches, site
photos) — 2 MB per file, 5 MB per submission — stored in Google Drive with links
written into the Sheet. File uploads require `GOOGLE_SHEETS_WEBHOOK_URL` to be
set.

---

## Documentation

- **Local Machine Setup**: [`LOCAL_DEVELOPMENT.md`](LOCAL_DEVELOPMENT.md)
- **Google Sheets Form Integration & Hosting**: [`GOOGLE_SHEETS_DEPLOYMENT.md`](GOOGLE_SHEETS_DEPLOYMENT.md)
- **Deployment**: [`DEPLOYMENT_GUIDE.md`](DEPLOYMENT_GUIDE.md)
