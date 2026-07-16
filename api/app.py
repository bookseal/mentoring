"""mentoring-api — the tiny backend for the mentoring-prep page.

Two jobs:
  1. Serve the static page from  site/  (mounted read-only at /srv).
  2. Store ONE ordered list of "my questions" in SQLite, so the ★ board
     syncs across devices (laptop <-> phone) instead of living in one browser.

Auth: NONE here on purpose. The whole subdomain sits behind a Traefik basic-auth
middleware (see k8s/middleware.yaml), so every request that reaches this service
is already past the password. Single user for now — no per-user rows yet; that's
the natural next step (add a user_id column keyed off the auth identity).

Same shape as the sibling `pr-auth` service: FastAPI + a single SQLite file on a
hostPath, one writer (Recreate strategy).
"""

import json
import os
import sqlite3
import time

from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

DB_PATH = os.environ.get("MENTORING_DB", "/data/mentoring.db")
STATIC_DIR = os.environ.get("MENTORING_STATIC", "/srv")
MAX_QUESTIONS = 100
MAX_LEN = 500

app = FastAPI(title="mentoring-api")


def db():
    con = sqlite3.connect(DB_PATH)
    con.execute("PRAGMA journal_mode=WAL")
    return con


def init_db():
    con = db()
    con.executescript(
        """
        CREATE TABLE IF NOT EXISTS kv(
            k TEXT PRIMARY KEY,
            v TEXT NOT NULL,
            updated_at INTEGER NOT NULL
        );
        """
    )
    con.commit()
    con.close()


init_db()


def now():
    return int(time.time())


class QuestionsReq(BaseModel):
    questions: list[str]


@app.get("/api/health")
def health():
    return {"ok": True}


@app.get("/api/questions")
def get_questions():
    con = db()
    row = con.execute("SELECT v FROM kv WHERE k='myQuestions'").fetchone()
    con.close()
    return {"questions": json.loads(row[0]) if row else []}


@app.put("/api/questions")
def put_questions(req: QuestionsReq):
    # Keep it sane: cap count and length, drop blanks. The board sends the whole
    # ordered array on every change, so a full replace is the simplest correct save.
    cleaned = []
    for q in req.questions:
        s = str(q).strip()[:MAX_LEN]
        if s:
            cleaned.append(s)
        if len(cleaned) >= MAX_QUESTIONS:
            break
    con = db()
    con.execute(
        "INSERT INTO kv(k, v, updated_at) VALUES('myQuestions', ?, ?) "
        "ON CONFLICT(k) DO UPDATE SET v=excluded.v, updated_at=excluded.updated_at",
        (json.dumps(cleaned, ensure_ascii=False), now()),
    )
    con.commit()
    con.close()
    return {"ok": True, "count": len(cleaned)}


# Static page LAST, so /api/* routes above win. Scoped to site/ ONLY — the
# container never sees .git, api/, k8s/, so source can't leak even behind auth.
if os.path.isdir(STATIC_DIR):
    app.mount("/", StaticFiles(directory=STATIC_DIR, html=True), name="static")
else:
    @app.get("/")
    def _no_static():
        return JSONResponse({"error": "static dir missing", "dir": STATIC_DIR}, status_code=500)
