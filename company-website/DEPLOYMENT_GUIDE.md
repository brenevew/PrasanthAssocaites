# Prasanth Associates — Complete Production Deployment Guide

This guide covers everything needed to deploy the **Prasanth Associates** website into production with automatic **Google Sheets** lead ingestion.

> [!TIP]
> **No backend server or database is required.**
> The entire platform runs as a modern, high-speed **Next.js 15 Serverless application** connected directly to your **Google Sheet**. Every submission from **Contact Us**, **Request a Quote**, and the **Building Planner** is automatically populated into your Google Sheet in real time.

---

## Table of Contents
1. [Architecture Overview](#1-architecture-overview)
2. [Google Sheets 2-Minute Setup](#2-google-sheets-2-minute-setup)
3. [Deployment Options](#3-deployment-options)
   - [Option A: Cloudflare Workers (what production runs today)](#option-a-cloudflare-workers-what-production-runs-today)
   - [Option B: Vercel (Free, 1-Click & Global CDN)](#option-b-vercel-free-1-click--global-cdn)
   - [Option C: Single VPS (Hostinger, DigitalOcean, Hetzner, AWS EC2)](#option-c-single-vps-with-nginx--free-ssl)
4. [Custom Domain & SSL Setup](#4-custom-domain--ssl-setup)
5. [Environment Variables Reference](#5-environment-variables-reference)
6. [Post-Deployment Verification](#6-post-deployment-verification)

---

## 1. Architecture Overview

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT BROWSER                                  │
│             (Desktop, Mobile, Tablet - https://prasanthassociates.com)       │
└──────────────────────────────────────┬───────────────────────────────────────┘
                                       │
                                       ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                            NEXT.JS 15 FRONTEND                               │
│  - Ultra-fast Server-Side Rendering (SSR) & Static Edge Generation           │
│  - Architectural Editorial Design System (Linen, Obsidian, Bronze)           │
│  - Interactive Forms: Contact Us, Request a Quote, Building Planner          │
│  - Local Backup Store (src/data/db/submissions.json)                         │
└──────────────────────────────────────┬───────────────────────────────────────┘
                                       │
                                       ▼ (Real-Time Webhook)
┌──────────────────────────────────────────────────────────────────────────────┐
│                         GOOGLE SHEETS ACCOUNT                                │
│  - Automatically creates "All Inquiries" sheet                               │
│  - Appends Timestamp (IST), Form Type, Client Name, Phone, Email, Location,   │
│    Project Type, Estimated Cost, and Full Specifications                     │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Google Sheets 2-Minute Setup

### Step 1: Create Your Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a **Blank spreadsheet**.
2. Name it: **`Prasanth Associates — Inquiries & Leads`**.

### Step 2: Add the Apps Script Code
1. In the top menu, click: **Extensions > Apps Script**.
2. Delete any default code in the editor.
3. Open [`scripts/google-sheets-script.js`](scripts/google-sheets-script.js) in this project, copy all lines, and paste them into the Apps Script editor.
4. Click **Save** (disk icon or `Cmd+S` / `Ctrl+S`).

### Step 3: Deploy as Web App
1. In the top-right corner, click **Deploy > New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in:
   - **Description**: `Prasanth Associates Form Webhook`
   - **Execute as**: `Me (your google account)`
   - **Who has access**: `Anyone` *(Important: permits your website form to submit lead data)*
4. Click **Deploy**.
5. When prompted, click **Authorize access**, select your Google account, click **Advanced**, and proceed.
6. Copy your **Web app URL** (looks like: `https://script.google.com/macros/s/.../exec`).

### Step 4: Configure Your Website Environment
In your production dashboard (or `frontend/.env.local`):
```env
GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
```
Done! Any time a client fills out any form on your website, a new row appears instantly in your spreadsheet.

---

## 3. Deployment Options

### Option A: Cloudflare Workers (what production runs today)

*`prasanthassociates.com` is already deployed this way, via the
[`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) adapter. The
project is connected to the GitHub repository from the Cloudflare dashboard, so
a push to `main` triggers a build — there is no deployment config in this repo.*

> [!IMPORTANT]
> **Pushing code does not configure it.** `.env*` files are gitignored, so your
> local values never travel with a deploy. The site can be running the newest
> commit and still write nothing to the Sheet.

1. **Rotate the shared secret** if it has ever been committed to the repository —
   `git log -S'your-token' --oneline` will tell you. Generate a replacement with
   `openssl rand -hex 24` and update the `SHARED_SECRET` script property in Apps
   Script. A token that reached a public repo must be replaced, not reused.
2. **Workers & Pages → your project → Settings → Variables and Secrets.**
3. Under the **Production** environment, add:

   | Variable | Value | Type |
   |---|---|---|
   | `GOOGLE_SHEETS_WEBHOOK_URL` | `https://script.google.com/macros/s/.../exec` | Secret |
   | `GOOGLE_SHEETS_SHARED_SECRET` | the token from step 1 | Secret |
   | `NEXT_PUBLIC_SITE_URL` | `https://prasanthassociates.com` | Plaintext |

4. **Redeploy.** Variables are read at deploy time, so an existing deployment
   will not pick them up on its own.
5. **Verify** — the fastest check that the variables actually arrived:

   ```bash
   curl -s -o /dev/null -w '%{http_code}\n' -X POST https://prasanthassociates.com/api/upload \
     -H 'Content-Type: application/json' -d '{}'
   ```

   `503` means `GOOGLE_SHEETS_WEBHOOK_URL` is still unset.
6. **Update the other copies of the secret** if you rotated: your local
   `frontend/.env.development`, and the Preview environment if you use one.

> [!WARNING]
> Without `GOOGLE_SHEETS_WEBHOOK_URL` the site looks completely healthy — pages
> serve, forms show a success screen, reference codes are issued — while every
> lead is silently dropped. Always run the verification in
> [section 6](#6-post-deployment-verification) after a deploy.

Full detail, including the Preview environment and rotation caveats, is in
[`GOOGLE_SHEETS_DEPLOYMENT.md` §7](GOOGLE_SHEETS_DEPLOYMENT.md#cloudflare-workers-the-live-path).

---

### Option B: Vercel (Free, 1-Click & Global CDN)
*Vercel was created by the creators of Next.js and provides automatic SSL, global CDN, and zero maintenance.*

1. Push your project code to **GitHub**, **GitLab**, or **Bitbucket**.
2. Go to [Vercel.com](https://vercel.com) and sign in.
3. Click **Add New > Project**, then import your repository.
4. In the Project Configuration:
   - **Root Directory**: Click "Edit" and choose `frontend`.
   - **Framework Preset**: Next.js (detected automatically).
5. In **Environment Variables**, add:
   ```env
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
   ```
6. Click **Deploy**. Within 60 seconds, your website will be live worldwide with free SSL!

---

### Option C: Single VPS with Nginx & Free SSL
*If you prefer hosting on your own VPS (Hostinger, DigitalOcean Droplet, Linode, AWS EC2, Hetzner):*

#### 1. Server Setup
SSH into your VPS and install Node.js 20, Nginx and Certbot:
```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git nginx certbot python3-certbot-nginx
```

#### 2. Clone Repository
```bash
git clone https://github.com/your-username/PrasanthAssociates.git /var/www/prasanth
cd /var/www/prasanth/frontend
```

#### 3. Build & Run the App
Create `/etc/prasanth-frontend.env` (`chmod 600`, owned by the service user) —
keep secrets out of the repo and out of `ps` output:
```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
GOOGLE_SHEETS_SHARED_SECRET=your-token
```

Build, then copy the static assets next to the standalone server (the bundle
does not include them):
```bash
npm ci && npm run build
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
```

Run it under systemd so it survives reboots — `/etc/systemd/system/prasanth.service`:
```ini
[Service]
EnvironmentFile=/etc/prasanth-frontend.env
Environment=PORT=3000 HOSTNAME=127.0.0.1
ExecStart=/usr/bin/node /var/www/prasanth/frontend/.next/standalone/server.js
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable --now prasanth
```

#### 4. Configure Host Nginx & Free SSL
Create `/etc/nginx/sites-available/prasanth`:
```nginx
server {
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable site and activate free Let's Encrypt SSL:
```bash
sudo ln -s /etc/nginx/sites-available/prasanth /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 4. Custom Domain & SSL Setup

In your domain registrar (GoDaddy, Namecheap, Google Domains, Cloudflare):

| Type | Name / Host | Value / Destination | Purpose |
|---|---|---|---|
| **A / CNAME** | `@` | Managed by Cloudflare (current setup), `76.76.21.21` for Vercel, or your VPS IP | Primary apex domain |
| **CNAME** | `www` | `yourdomain.com` (or `cname.vercel-dns.com` for Vercel) | WWW subdomain |

> `www.prasanthassociates.com` currently has **no DNS record** — only the apex
> resolves. Add the `www` record above if you want both to work.

---

## 5. Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL (e.g., `https://prasanthassociates.com`) |
| `GOOGLE_SHEETS_WEBHOOK_URL` | Yes | Google Apps Script Web App URL. Without it, leads are silently dropped and file uploads return `HTTP 503` |
| `GOOGLE_SHEETS_SHARED_SECRET` | Yes | Must match the `SHARED_SECRET` script property in Apps Script. A mismatch makes the script reject every write as `unauthorized` |

> Both Google values are **server-side secrets**. Never prefix them with
> `NEXT_PUBLIC_`, and never commit them — store them in your host's secret
> manager. Full detail in
> [`GOOGLE_SHEETS_DEPLOYMENT.md` §6](GOOGLE_SHEETS_DEPLOYMENT.md#6-secrets--environment-variables).

---

## 6. Post-Deployment Verification

1. Open `https://yourdomain.com` in your browser and verify the secure padlock.
2. **Contact Us Test**: Visit `/contact`, fill out the form, and verify that the new entry appears immediately in your Google Sheet.
3. **Request a Quote Test**: Visit `/request-quote`, test calculation and submission, verify entry in Google Sheet.
4. **Building Planner Test**: Visit `/plan-home`, configure plot and floors, submit plan, verify blueprint specifications row in Google Sheet.
