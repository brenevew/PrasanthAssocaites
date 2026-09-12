# Prasanth Associates

Web application for **Prasanth Associates Construction & Architecture** — a
Next.js site with three client enquiry forms that feed directly into Google
Sheets.

## Project Architecture

```text
PrasanthAssociates/
├── frontend/                    # Next.js UI Web Application (React, Tailwind CSS, TypeScript)
├── k8s/
│   ├── dev/                     # Kubernetes manifests for Development
│   └── prod/                    # Kubernetes manifests for Production (HPA, TLS, Secrets)
├── scripts/
│   ├── google-sheets-script.js  # Google Apps Script for form ingestion
│   └── local-k8s-test.sh        # One-shot local Kubernetes deployment
├── LOCAL_DEVELOPMENT.md
├── KUBERNETES_DEPLOYMENT.md
└── README.md
```

This is a **frontend-only** application. There is no backend server or database:
form submissions are written straight to a Google Sheet through a Google Apps
Script web app, and all site content is served from static data in
`frontend/src/data/`.

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
- **Google Sheets Form Integration**: [`GOOGLE_SHEETS_DEPLOYMENT.md`](GOOGLE_SHEETS_DEPLOYMENT.md)
- **Deployment**: [`DEPLOYMENT_GUIDE.md`](DEPLOYMENT_GUIDE.md)
- **Local Kubernetes Testing**: [`LOCAL_K8S_TESTING.md`](LOCAL_K8S_TESTING.md)
- **Kubernetes Deployment (Dev & Prod)**: [`KUBERNETES_DEPLOYMENT.md`](KUBERNETES_DEPLOYMENT.md)
