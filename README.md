# mentoring

A small web app for **preparing an offline mentoring session** — one card per
topic, big type, the question you'll actually say front-and-center. Built to be
read *during* a live conversation ("glance and speak"), plus a ★ **My questions**
board you can edit, reorder, and that **syncs across your devices**.

**Live:** https://mentoring.bit-habit.com (password-gated)

## Shape

```
site/                 # the static page — the ONLY thing served to the web
  index.html          #   engine + all topic cards + the editable board
  assets/             #   images
  private-data.js     #   PERSONAL — git-ignored, never committed (see below)
api/                  # mentoring-api: FastAPI + SQLite (same shape as pr-auth)
  app.py              #   serves site/ + GET/PUT /api/questions
  Dockerfile, requirements.txt
k8s/                  # Deployment+Service, Ingress, basic-auth Middleware
ops/deploy.sh         # server-side deploy logic (SSH forced-command GitOps)
.github/workflows/    # push to main -> SSH -> server pulls + applies
```

## The two data layers

- **Public system** — everything in this repo. Open source on purpose.
- **Personal data** — never here. Two mechanisms keep it out:
  - `site/private-data.js` (git-ignored) injects personal *framing* into cards
    locally. On the deployed server it simply doesn't exist (a `git reset --hard`
    can't recreate an ignored file), so the page shows the public-safe version.
  - Your **★ questions** are stored by the backend in SQLite on the server
    (`/api/questions`), with a `localStorage` cache so the board still works
    offline or when opened as a local file. They're yours; they aren't in git.

## Auth

The whole subdomain sits behind a **Traefik basic-auth middleware**
(`k8s/middleware.yaml`), so every request is past the password before it reaches
the app. The password **hash** lives in a `mentoring-basic-auth` Secret created
once on the server — never in this repo (see `k8s/basic-auth.secret.example.yaml`).

## Run locally

- **Just the page:** open `site/index.html` in a browser. The board falls back to
  `localStorage` (no server needed). Keep a `site/private-data.js` to see the
  personal layer.
- **Page + API:** `cd api && pip install -r requirements.txt && MENTORING_STATIC=../site MENTORING_DB=./dev.db uvicorn app:app --port 8080`, then open http://localhost:8080.

## Deploy

Same SSH-forced-command GitOps as the sibling `physical-spark` box: `git push` →
GitHub Actions SSHes in → the server pulls and `ops/deploy.sh` rebuilds the api
image (only if `api/` changed) and re-applies `k8s/`. New subdomain needs no DNS
or cert work — `*.bit-habit.com` + `tls-secret` already cover it.
