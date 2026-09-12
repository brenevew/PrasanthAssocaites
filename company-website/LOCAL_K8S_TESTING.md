# Local Kubernetes Testing & Verification Guide

How to test the **Prasanth Associates** Next.js application inside a local
Kubernetes cluster (Docker Desktop Kubernetes, Minikube, or Kind).

The application is frontend-only — a single deployment plus an Ingress. There is
no API server or database to run locally. Form submissions go to Google Sheets;
see [`GOOGLE_SHEETS_DEPLOYMENT.md`](GOOGLE_SHEETS_DEPLOYMENT.md).

---

## 1. Which Files Need Changes (Quick Reference)

| File Path | When to Change | What to Change / Check | Default Setting |
| :--- | :--- | :--- | :--- |
| [`k8s/dev/03-frontend.yaml`](k8s/dev/03-frontend.yaml) | To sync submissions to a test Sheet | `GOOGLE_SHEETS_WEBHOOK_URL` and `GOOGLE_SHEETS_SHARED_SECRET` in `frontend-dev-secret` | Blank — sync disabled |
| [`k8s/dev/04-ingress.yaml`](k8s/dev/04-ingress.yaml) | Only if changing the local hostname | `host: dev.prasanthassociates.local` | Preconfigured |
| `/etc/hosts` *(Local Machine)* | **Only if using Ingress** instead of port-forwarding | Add entry:<br>`127.0.0.1 dev.prasanthassociates.local` | Optional (port-forwarding works without this) |

> [!NOTE]
> All manifests in `k8s/dev/` are preconfigured with `imagePullPolicy: IfNotPresent`
> and local service networking so they run out of the box.

> [!IMPORTANT]
> Leave `GOOGLE_SHEETS_WEBHOOK_URL` blank, or point it at a **throwaway Sheet**.
> Never aim local testing at the production Sheet — you will write test rows into
> the live lead log.

---

## 2. Automated 1-Click Testing Script

[`scripts/local-k8s-test.sh`](scripts/local-k8s-test.sh) builds the Docker image,
deploys everything, waits for pod readiness, and reports access URLs.

### Run the automated test:
```bash
./scripts/local-k8s-test.sh
```

### Clean up / Teardown when finished:
```bash
./scripts/local-k8s-test.sh --clean
```

---

## 3. Step-by-Step Manual Execution Guide

### Step 1: Enable Local Kubernetes
- **Docker Desktop**: Settings → Kubernetes → Check *Enable Kubernetes* → Apply & Restart.
- **Minikube**: `minikube start`
- **Kind**: `kind create cluster`

### Step 2: Build the Docker Image Locally
```bash
docker build \
  --build-arg NEXT_PUBLIC_APP_ENV=development \
  -t prasanth-frontend:dev \
  -f frontend/Dockerfile frontend/
```

*(If using Minikube or Kind, load the image into the cluster):*
```bash
# For Minikube:
minikube image load prasanth-frontend:dev

# For Kind:
kind load docker-image prasanth-frontend:dev
```

### Step 3: Apply Development Manifests
```bash
kubectl apply -f k8s/dev/00-namespace.yaml
kubectl apply -f k8s/dev/03-frontend.yaml
kubectl apply -f k8s/dev/04-ingress.yaml
```

### Step 4: Verify Pods & Services
```bash
kubectl get pods -n prasanth-dev
kubectl get services -n prasanth-dev
```

You should see 1 running pod:
```text
NAME                            READY   STATUS    RESTARTS   AGE
frontend-dev-xxxxxxxxxx-xxxxx   1/1     Running   0          30s
```

---

## 4. Accessing the Application

### Option A: Via `kubectl port-forward` (Simplest, Recommended)

```bash
kubectl port-forward -n prasanth-dev svc/frontend-service 3000:3000
```
👉 Open [http://localhost:3000](http://localhost:3000)
👉 Or test the Building Planner: [http://localhost:3000/plan-home](http://localhost:3000/plan-home)

### Option B: Via NGINX Ingress Controller

1. Add the local domain alias to `/etc/hosts`:
   ```bash
   sudo sh -c 'echo "127.0.0.1 dev.prasanthassociates.local" >> /etc/hosts'
   ```
2. Access directly in the browser: `http://dev.prasanthassociates.local`

---

## 5. End-to-End Verification Checklist

1. **Verify the site responds**:
   ```bash
   curl -I http://localhost:3000
   ```
   *Expected:* `HTTP/1.1 200 OK`.

2. **Verify the Building Planner submits**:
   - Go to [http://localhost:3000/plan-home](http://localhost:3000/plan-home).
   - Fill in plot details and click **"Submit Your Project Plan"**.
   - Confirm a reference code (e.g. `PRJ-2026-1234`) is displayed.

3. **Verify the Contact and Request Quote forms**:
   - [http://localhost:3000/contact](http://localhost:3000/contact)
   - [http://localhost:3000/request-quote](http://localhost:3000/request-quote)
   - Each should return a `REF-YYYY-XXXX` reference code.

4. **Verify the Google Sheets sync path**:
   ```bash
   kubectl logs -n prasanth-dev -l app=frontend --tail=50 | grep -i "GoogleSheets"
   ```
   - With the webhook unset, expect `GOOGLE_SHEETS_WEBHOOK_URL is not set` —
     the form still succeeds. This is the correct default for local testing.
   - With a test webhook configured, expect no warnings and a new row in the
     test Sheet.

5. **Exercise the planner endpoint directly**:
   ```bash
   curl -X POST http://localhost:3000/api/sync-sheets \
     -H "Content-Type: application/json" \
     -d '{"formType":"Building Planner","refCode":"TEST-001","name":"Test",
          "phone":"9876543210","location":"Coimbatore","estimatedBudget":4500000}'
   ```
   *Expected:* `{"success":true}` when configured, or
   `{"success":false,"skipped":true}` when the webhook is intentionally unset.

---

## 6. Teardown & Reset

```bash
kubectl delete namespace prasanth-dev
```
Or with the script:
```bash
./scripts/local-k8s-test.sh --clean
```
