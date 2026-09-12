# Kubernetes Deployment Guide (Dev & Production)

Deploying the **Prasanth Associates** web application (`frontend/`) on
Kubernetes, with separate configuration for **Development** and **Production**.

This is a frontend-only application — there is no API server or database to
deploy. Form submissions are written directly to Google Sheets; see
[`GOOGLE_SHEETS_DEPLOYMENT.md`](GOOGLE_SHEETS_DEPLOYMENT.md).

---

## 1. Architecture Overview

```text
                    [ Internet / Client ]
                              │
                              ▼
                [ NGINX Ingress Controller ]
                  └── (SSL / TLS Termination)
                              │
                              ▼
                   [ frontend-service ]
                        (Port 3000)
                              │
                 [ Frontend Pods (Next.js) ]
                 (Horizontal Pod Autoscaler)
                              │
                              ▼
              [ Google Apps Script → Google Sheet ]
                     (outbound HTTPS only)
```

---

## 2. Environment Configuration

### 2.1 Public variables (ConfigMap)

Inlined into the browser bundle — never put secrets here.

| Variable | Development | Production |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_ENV` | `development` | `production` |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | `https://prasanthassociates.com` |

### 2.2 Secret variables (Secret)

Read at runtime on the server only.

| Variable | Purpose |
| :--- | :--- |
| `GOOGLE_SHEETS_WEBHOOK_URL` | Deployed Apps Script `/exec` URL |
| `GOOGLE_SHEETS_SHARED_SECRET` | Must match the `SHARED_SECRET` script property |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | Stable key shared by every replica |

> **`NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` is mandatory in production.** The
> Contact and Request Quote forms are Server Actions. Production runs
> `replicas: 2` behind an HPA scaling to 8; without one shared key, pods
> generate different keys at build time and submissions fail intermittently
> after a scale-out or rolling deploy. Generate with `openssl rand -base64 32`.

#### Files
- Dev: [`frontend/.env.development`](frontend/.env.development)
- Prod: [`frontend/.env.production`](frontend/.env.production)
- Template: [`frontend/.env.example`](frontend/.env.example)

---

## 3. Container Image (Docker Build)

```bash
docker build \
  --build-arg NEXT_PUBLIC_APP_ENV=production \
  -t prasanth-frontend:latest \
  -f frontend/Dockerfile frontend/

# Push to registry:
docker tag prasanth-frontend:latest your-registry/prasanth-frontend:1.0.0
docker push your-registry/prasanth-frontend:1.0.0
```

Only `NEXT_PUBLIC_*` values are build args. The Google Sheets variables are
runtime secrets and must **not** be baked into the image.

---

## 4. Deploying to Development (`prasanth-dev`)

### Step 1: Apply Development Manifests
```bash
kubectl apply -f k8s/dev/00-namespace.yaml
kubectl apply -f k8s/dev/03-frontend.yaml
kubectl apply -f k8s/dev/04-ingress.yaml
```

`k8s/dev/03-frontend.yaml` contains the `frontend-dev-secret`, blank by default
so development never writes into the production Sheet.

### Step 2: Verify Pod Status
```bash
kubectl get pods -n prasanth-dev
kubectl get services -n prasanth-dev
kubectl get ingress -n prasanth-dev
```

### Step 3: Local Testing (via /etc/hosts or Port Forward)
To test via browser with ingress, add the following to `/etc/hosts`:
```text
127.0.0.1 dev.prasanthassociates.local
```
Or forward the port directly:
```bash
kubectl port-forward -n prasanth-dev svc/frontend-service 3000:3000
```

A scripted equivalent of all of the above is available:
```bash
./scripts/local-k8s-test.sh
```

---

## 5. Deploying to Production (`prasanth-prod`)

Production includes rolling updates, readiness/liveness probes, a Horizontal
Pod Autoscaler, and automated SSL/TLS via Let's Encrypt / cert-manager.

### Step 1: Create Production Namespace
```bash
kubectl apply -f k8s/prod/00-namespace.yaml
```

### Step 2: Configure Production Secrets

`k8s/prod/03-frontend.yaml` ships with `CHANGE_ME` placeholders. Rather than
committing real values, create the Secret imperatively:

```bash
kubectl create secret generic frontend-prod-secret \
  --namespace=prasanth-prod \
  --from-literal=GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_ID/exec" \
  --from-literal=GOOGLE_SHEETS_SHARED_SECRET="your-token" \
  --from-literal=NEXT_SERVER_ACTIONS_ENCRYPTION_KEY="$(openssl rand -base64 32)" \
  --dry-run=client -o yaml | kubectl apply -f -
```

Keep `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` **stable across deployments** —
regenerating it on every deploy reintroduces the intermittent failures it exists
to prevent.

### Step 3: Deploy the Application
```bash
kubectl apply -f k8s/prod/03-frontend.yaml
kubectl apply -f k8s/prod/04-ingress-tls.yaml
```

### Step 4: Verify Production Rollout
```bash
# Check rollout status
kubectl rollout status deployment/frontend-prod -n prasanth-prod

# Check Horizontal Pod Autoscaler
kubectl get hpa -n prasanth-prod

# Check SSL certificate status (if using cert-manager)
kubectl get certificate -n prasanth-prod

# Confirm the Sheets secrets reached the pods
kubectl exec -n prasanth-prod deploy/frontend-prod -- \
  sh -c 'echo "URL set: ${GOOGLE_SHEETS_WEBHOOK_URL:+yes}; secret set: ${GOOGLE_SHEETS_SHARED_SECRET:+yes}"'
```

### Step 5: Smoke-test the forms
Submit one test enquiry on `/contact`, `/request-quote` and `/plan-home`, check
that the rows appear in the Sheet, then delete the test rows.

---

## 6. Operational & Troubleshooting Commands

### 6.1 View Real-time Application Logs
```bash
kubectl logs -f -l app=frontend -n prasanth-prod --tail=100

# Google Sheets sync failures (each includes the full lead payload)
kubectl logs -n prasanth-prod deploy/frontend-prod --tail=200 | grep -i "GoogleSheets\|sync failed"
```

### 6.2 Zero-Downtime Restart / Rollout
```bash
kubectl rollout restart deployment/frontend-prod -n prasanth-prod
```

Restart after any Secret or ConfigMap change — environment variables are
injected at pod start and are not picked up by running pods.

### 6.3 Rollback to Previous Version
```bash
kubectl rollout undo deployment/frontend-prod -n prasanth-prod
```

### 6.4 Common Issues

1. **Form submissions succeed but no rows appear in the Sheet**
   - Check the logs for `[GoogleSheets]`. A `skipped: true` result means
     `GOOGLE_SHEETS_WEBHOOK_URL` is unset in the running pods.
   - `unauthorized` means `GOOGLE_SHEETS_SHARED_SECRET` does not match the
     `SHARED_SECRET` script property.
2. **Contact / Request Quote fail intermittently, Building Planner works**
   - Classic missing or non-stable `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`. The
     planner posts to a Route Handler and is unaffected, which is the tell.
3. **`CrashLoopBackOff` on the frontend**
   - Check logs: `kubectl logs <pod-name> -n prasanth-prod`
   - Usually a bad image build or a missing `NEXT_PUBLIC_*` build arg.
4. **TLS certificate not issued**
   - `kubectl describe certificate -n prasanth-prod`. Confirm DNS for
     `prasanthassociates.com` and `www.` resolves to the ingress load balancer.

For full detail on the Google Sheets pipeline, see
[`GOOGLE_SHEETS_DEPLOYMENT.md`](GOOGLE_SHEETS_DEPLOYMENT.md).
