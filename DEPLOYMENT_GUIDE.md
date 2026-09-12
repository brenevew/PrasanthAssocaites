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
   - [Option A: Vercel (Recommended — Free, 1-Click & Global CDN)](#option-a-vercel-recommended--free-1-click--global-cdn)
   - [Option B: Single VPS (Hostinger, DigitalOcean, Hetzner, AWS EC2)](#option-b-single-vps-with-docker--free-ssl)
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
3. Open [`scripts/google-sheets-script.js`](file:///Users/winstonbreneve/Documents/PrasanthAssociates/scripts/google-sheets-script.js) in this project, copy all lines, and paste them into the Apps Script editor.
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

### Option A: Vercel (Recommended — Free, 1-Click & Global CDN)
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

### Option B: Single VPS with Docker & Free SSL
*If you prefer hosting on your own VPS (Hostinger, DigitalOcean Droplet, Linode, AWS EC2, Hetzner):*

#### 1. Server Setup
SSH into your VPS and install Docker & Nginx:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io git nginx certbot python3-certbot-nginx
sudo systemctl enable --now docker
```

#### 2. Clone Repository
```bash
git clone https://github.com/your-username/PrasanthAssociates.git /var/www/prasanth
cd /var/www/prasanth/frontend
```

#### 3. Build & Run Docker Container
Create `.env.production` inside `frontend/`:
```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
```

Build and run:
```bash
docker build -t prasanth-website .
docker run -d --restart always -p 127.0.0.1:3000:3000 --name prasanth-app prasanth-website
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
| **A** | `@` | `76.76.21.21` (if Vercel) or `Your VPS IP` | Primary apex domain |
| **CNAME** | `www` | `cname.vercel-dns.com` (if Vercel) or `yourdomain.com` | WWW subdomain |

---

## 5. Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL (e.g., `https://prasanthassociates.com`) |
| `GOOGLE_SHEETS_WEBHOOK_URL` | Recommended | Google Apps Script Web App URL for direct sheet synchronization |

---

## 6. Post-Deployment Verification

1. Open `https://yourdomain.com` in your browser and verify the secure padlock.
2. **Contact Us Test**: Visit `/contact`, fill out the form, and verify that the new entry appears immediately in your Google Sheet.
3. **Request a Quote Test**: Visit `/request-quote`, test calculation and submission, verify entry in Google Sheet.
4. **Building Planner Test**: Visit `/plan-home`, configure plot and floors, submit plan, verify blueprint specifications row in Google Sheet.
