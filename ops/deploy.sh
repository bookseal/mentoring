#!/usr/bin/env bash
# The real deploy logic, run ON the bit-habit server by the SSH forced command.
# Mirrors physical-spark/ops/deploy.sh. The server's ~/workspace/mentoring-deploy.sh
# bootstrap pulls this repo then `exec`s this file with the pre-pull commit sha.
#
#   usage: ops/deploy.sh <previous-HEAD-sha | "none">
set -euo pipefail

before="${1:-none}"
cd /home/ubuntu/workspace/mentoring

echo "mentoring updated to $(git rev-parse --short HEAD) at $(date -u +%FT%TZ)"

# Did anything under <path> change this deploy? First-ever deploy ("none") =
# "everything changed", so every component applies once.
changed() {
  [ "$before" = none ] && return 0
  git diff --name-only "$before" HEAD | grep -q "^$1"
}

# --- static page -------------------------------------------------------------
# Served from site/ via a hostPath mount, so a git pull publishes it instantly.
# Nothing to do here.

# --- api service -------------------------------------------------------------
# A real image, so it needs a build + rollout to pick up new code.
if changed api/; then
  echo "api/ changed -> rebuild image + restart"
  docker build -q -t localhost:5000/mentoring-api:latest api/ >/dev/null
  docker push -q localhost:5000/mentoring-api:latest >/dev/null 2>&1 \
    || docker push localhost:5000/mentoring-api:latest
  sudo -n k3s kubectl rollout restart deploy/mentoring
fi

# --- k8s manifests -----------------------------------------------------------
# Applied every time (idempotent + self-healing). The basic-auth Secret is NOT
# in the repo, so it's never applied here — create it once by hand (see
# k8s/basic-auth.secret.example.yaml). The Middleware only references it.
echo "applying k8s manifests"
sudo -n k3s kubectl apply -f k8s/site.yaml -f k8s/ingress.yaml -f k8s/middleware.yaml
