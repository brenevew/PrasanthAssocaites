#!/usr/bin/env bash

# ==============================================================================
# PRASANTH ASSOCIATES - LOCAL KUBERNETES TEST & DEPLOYMENT SCRIPT
# ==============================================================================
# Builds the Next.js frontend image and deploys it to a local Kubernetes
# cluster (Docker Desktop, Minikube or Kind) in the prasanth-dev namespace.
# ==============================================================================

set -e

# Colors for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NAMESPACE="prasanth-dev"

echo -e "${CYAN}================================================================${NC}"
echo -e "${CYAN}   PRASANTH ASSOCIATES - LOCAL KUBERNETES AUTOMATED TEST SUITE   ${NC}"
echo -e "${CYAN}================================================================${NC}"

# ── 1. Check Arguments ────────────────────────────────────────────────────────
if [ "$1" == "--clean" ] || [ "$1" == "clean" ] || [ "$1" == "down" ]; then
    echo -e "${YELLOW}Cleaning up local Kubernetes environment (${NAMESPACE})...${NC}"
    kubectl delete namespace ${NAMESPACE} --ignore-not-found=true
    echo -e "${GREEN}✓ Cleaned up namespace ${NAMESPACE}.${NC}"
    exit 0
fi

# ── 2. Check Prerequisites ───────────────────────────────────────────────────
echo -e "\n${BLUE}[Step 1/5] Checking Prerequisites...${NC}"

if ! command -v docker &> /dev/null; then
    echo -e "${RED}Error: 'docker' command is not found. Please install Docker.${NC}"
    exit 1
fi

if ! command -v kubectl &> /dev/null; then
    echo -e "${RED}Error: 'kubectl' command is not found. Please install kubectl.${NC}"
    exit 1
fi

# Check if Kubernetes cluster is accessible
if ! kubectl cluster-info &> /dev/null; then
    echo -e "${RED}Error: Kubernetes cluster is not accessible.${NC}"
    echo -e "${YELLOW}Please ensure Docker Desktop Kubernetes, Minikube, or Kind is running.${NC}"
    exit 1
fi

CURRENT_CONTEXT=$(kubectl config current-context)
echo -e "${GREEN}✓ Connected to Kubernetes cluster (Context: ${CURRENT_CONTEXT})${NC}"

# ── 3. Build Docker Image Locally ────────────────────────────────────────────
echo -e "\n${BLUE}[Step 2/5] Building Frontend Docker Image...${NC}"

echo -e "  Building Frontend image (prasanth-frontend:dev)..."
docker build \
  --build-arg NEXT_PUBLIC_APP_ENV=development \
  -t prasanth-frontend:dev \
  -f "${ROOT_DIR}/frontend/Dockerfile" "${ROOT_DIR}/frontend"

echo -e "${GREEN}✓ Docker image built successfully.${NC}"

# Load image into cluster nodes if running on multi-node Kind / Docker Desktop
NODES=$(kubectl get nodes -o jsonpath='{.items[*].metadata.name}' 2>/dev/null || true)
for NODE in $NODES; do
    if docker inspect "$NODE" &>/dev/null; then
        echo -e "  Loading image into containerized node: ${YELLOW}${NODE}${NC}..."
        docker save prasanth-frontend:dev | docker exec -i "$NODE" ctr -n k8s.io images import - >/dev/null 2>&1 || true
    fi
done

if [[ "$CURRENT_CONTEXT" == *"minikube"* ]]; then
    echo -e "${YELLOW}Loading image into Minikube cluster...${NC}"
    minikube image load prasanth-frontend:dev
elif command -v kind &>/dev/null && [[ "$CURRENT_CONTEXT" == *"kind"* ]]; then
    echo -e "${YELLOW}Loading image into Kind cluster...${NC}"
    kind load docker-image prasanth-frontend:dev
fi

# ── 4. Apply Kubernetes Manifests ─────────────────────────────────────────────
echo -e "\n${BLUE}[Step 3/5] Applying Kubernetes Manifests (k8s/dev)...${NC}"

kubectl apply -f "${ROOT_DIR}/k8s/dev/00-namespace.yaml"
kubectl apply -f "${ROOT_DIR}/k8s/dev/03-frontend.yaml"

if [ -f "${ROOT_DIR}/k8s/dev/04-ingress.yaml" ]; then
    kubectl apply -f "${ROOT_DIR}/k8s/dev/04-ingress.yaml"
fi

echo -e "${GREEN}✓ Manifests applied.${NC}"

# ── 5. Wait for Pods to be Ready ──────────────────────────────────────────────
echo -e "\n${BLUE}[Step 4/5] Waiting for Pods to be Ready in namespace '${NAMESPACE}'...${NC}"

echo "  Waiting for Next.js Frontend..."
kubectl wait --namespace=${NAMESPACE} --for=condition=ready pod -l app=frontend --timeout=90s

echo -e "${GREEN}✓ All pods are running and ready!${NC}"
kubectl get pods -n ${NAMESPACE} -o wide

# ── 6. Verification & Access Instructions ─────────────────────────────────────
echo -e "\n${BLUE}[Step 5/5] Local Kubernetes Environment Ready!${NC}"
echo -e "${CYAN}================================================================${NC}"
echo -e "${GREEN}The frontend is successfully running inside your local cluster.${NC}"
echo -e "${CYAN}================================================================${NC}"
echo -e ""
echo -e "To access the application from your browser via port-forwarding:"
echo -e ""
echo -e "  ${YELLOW}Frontend Web App (Next.js):${NC}"
echo -e "     Run: ${CYAN}kubectl port-forward -n ${NAMESPACE} svc/frontend-service 3000:3000${NC}"
echo -e "     URL: ${BLUE}http://localhost:3000${NC}"
echo -e ""
echo -e "${YELLOW}Note:${NC} form submissions sync to Google Sheets. Configure"
echo -e "      GOOGLE_SHEETS_WEBHOOK_URL in the frontend-dev-secret to enable it."
echo -e "      See ${CYAN}GOOGLE_SHEETS_DEPLOYMENT.md${NC}"
echo -e ""
echo -e "To tear down and remove the local test environment at any time:"
echo -e "  Run: ${RED}./scripts/local-k8s-test.sh --clean${NC}"
echo -e "${CYAN}================================================================${NC}"
