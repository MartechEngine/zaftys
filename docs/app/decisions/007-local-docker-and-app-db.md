# ADR-007: Local Docker First + ZAFTYS App Database

| Status | **Accepted** |
| Date | Jul 2026 |

---

## Context

The TSM portal UI is largely complete in demo mode (`globalThis` / `dev-store`). That path is fine for UI iteration but **not** enterprise-local or production:

- Process restarts wipe mutations (notes, listings, billing, settings).
- Multi-container / multi-worker Next.js cannot share memory.
- Documents, sessions, and queues need durable services.
- Prod push without a proven local Docker stack is high risk.

We need a **local Docker stack first**, then the same topology (scaled) for staging/prod.

---

## Decision

### 1. Two data planes (keep ADR-001)

| Plane | Store | Owns |
|-------|--------|------|
| **Execution** | Fleetbase (MySQL, separate compose / `zaftys-lab`) | Orders, drivers, vehicles, GPS, ePOD API |
| **ZAFTYS App DB** | **PostgreSQL** in `app-tsm/infra` | Portal-owned durable data: network listings/offers, notes, billing extensions, settings, document metadata, future sessions |

Never bypass Fleetbase MySQL for execution entities. Never put Fleetbase tables in the ZAFTYS Postgres.

### 2. Local stack (Compose in this repo)

Default local services:

| Service | Role |
|---------|------|
| `postgres` | ZAFTYS App DB |
| `redis` | Cache / future jobs / sessions |
| `minio` | Local S3 for LR / ePOD blobs |
| `app` (profile `full`) | Next.js portal container |

Fleetbase remains **optional** (`TSM_DEMO_UI=0` + external/`zaftys-lab` compose). Do not block local enterprise work on full Fleetbase boot.

### 3. Persistence migration

| Mode | When | Behavior |
|------|------|----------|
| **Memory** | No `DATABASE_URL` | Current `globalThis` stores (UI-only / CI without Docker) |
| **Postgres** | `DATABASE_URL` set (Compose default) | Write-through + hydrate; survives restart |

Migrate domains in order: **notes → network listings/offers → clients/billing → settings → documents**.

### 4. Prod later (not now)

After local Docker is green:

1. Staging compose / K8s with managed Postgres + object storage
2. NextAuth (ADR-005), TLS, secrets manager
3. CI: lint, build, migrate, smoke against Compose
4. Prod cutover — same env contract as local

---

## Consequences

- `.env.example` and [local-docker.md](../ops/local-docker.md) are the source of truth for boot.
- Demo banner / `TSM_DEMO_UI` stays for seed data; durability no longer depends on process memory when DB is up.
- AGPL Fleetbase stays unmodified and API-only (ADR-001 / ADR-002).

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Accepted — Docker-first + App Postgres |
