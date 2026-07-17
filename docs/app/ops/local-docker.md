# Local Docker — Enterprise foundation

| Field | Value |
|-------|-------|
| **Status** | Canonical (Jul 2026) |
| **ADR** | [ADR-007](../decisions/007-local-docker-and-app-db.md) |
| **Compose** | `app-tsm/infra/docker-compose.yml` |

---

## Goal

Run ZAFTYS TSM **locally with Docker** so data survives restarts, matches a production-shaped topology, and only then promote to staging/prod.

```
┌─────────────────────────────────────────────────────────┐
│  Docker Compose (app-tsm/infra)                         │
│  ┌──────────┐  ┌───────┐  ┌───────┐  ┌──────────────┐ │
│  │ postgres │  │ redis │  │ minio │  │ app (optional)│ │
│  │ :5432    │  │ :6379 │  │ :9000 │  │ :3000         │ │
│  └──────────┘  └───────┘  └───────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
         ▲ optional live mode
┌────────┴────────┐
│ Fleetbase stack │  zaftys-lab / separate compose
│ API :8000       │
└─────────────────┘
```

---

## Phased delivery

| Phase | What | Done when |
|-------|------|-----------|
| **A — Infra** | Compose, Dockerfile, `.env.example`, health checks DB | ✅ `docker compose up` healthy |
| **B — Persist core** | Drizzle + notes + network listings/offers | ✅ Restart keeps notes/listings |
| **C — Persist more** | Clients, billing, settings, vendors, quotes, WO + MinIO docs | ✅ Domains + multipart → MinIO |
| **D — Live execution** | Optional Fleetbase profile / lab stack + `TSM_DEMO_UI=0` | Orders from FB API |
| **E — Prod path** | Staging, NextAuth, CI migrate+smoke, managed DB/S3 | Ready to push prod |

**Do not skip to E.** Prod uses the same env contract proven in A–D.

---

## Quick start (recommended day-to-day)

Infra in Docker; Next.js on the host (fast HMR):

```powershell
cd app-tsm\infra
docker compose up -d postgres redis minio
cd ..
copy .env.example .env.local   # first time only — edit secrets
npm install
npm run db:migrate
npm run dev
```

Open http://localhost:3000 — login `dispatcher@zaftys.com` / `dev`.

Health: http://localhost:3000/api/health — expect `database: "up"`.

### Full stack (app in Docker)

```powershell
cd app-tsm\infra
docker compose --profile full up -d --build
```

Portal: http://localhost:3000

---

## Services

| Service | Ports | Credentials (local only) |
|---------|-------|--------------------------|
| Postgres | 5432 | `tsm` / `tsm` · DB `zaftys_tsm` |
| Redis | 6379 | none |
| MinIO API | 9000 | `minio` / `minioadmin` |
| MinIO console | 9001 | same |
| App | 3000 | profile `full` |

S3 bucket (created by `minio-init`): `zaftys-tsm-docs`.

---

## Environment contract

See `app-tsm/.env.example`. Critical:

| Variable | Local Docker |
|----------|----------------|
| `DATABASE_URL` | `postgresql://tsm:tsm@localhost:5432/zaftys_tsm` |
| `REDIS_URL` | `redis://localhost:6379` |
| `S3_ENDPOINT` | `http://localhost:9000` |
| `S3_BUCKET` | `zaftys-tsm-docs` |
| `TSM_DEMO_UI` | `1` until Fleetbase live |
| `SESSION_SECRET` | long random string |

Inside the `app` container, hostnames are service names (`postgres`, `redis`, `minio`).

---

## Database commands

```bash
cd app-tsm
npm run db:generate   # after schema change
npm run db:migrate    # apply SQL migrations
npm run db:studio     # optional Drizzle Studio
```

---

## Verification

```bash
docker compose -f infra/docker-compose.yml ps
curl http://localhost:3000/api/health
# add a shipment note → restart next → note still present when DATABASE_URL set
npm run smoke
```

---

## What stays out of this compose (for now)

| Concern | Where |
|---------|--------|
| Fleetbase MySQL / API | `zaftys-lab` / [fleetbase-docker-spike.md](./fleetbase-docker-spike.md) |
| TranZfort Supabase | External — demo adapter until keys set |
| Prod TLS / CDN / secrets | Staging/prod only |

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial enterprise local Docker runbook |
