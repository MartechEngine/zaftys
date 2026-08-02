# ADR-007: Local Docker First + ZAFTYS App Database

| Status | **Accepted** (amended 2 Aug 2026) |
| Date | Jul 2026 |
| Related | [ADR-008](./008-tsm-owns-execution.md), [ADR-009](./009-documents-and-ai.md) |

---

## Context

The TSM portal UI is largely complete in demo mode (`globalThis` / `dev-store`). That path is fine for UI iteration but **not** enterprise-local or production:

- Process restarts wipe mutations (notes, listings, billing, settings).
- Multi-container / multi-worker Next.js cannot share memory.
- Documents, sessions, and queues need durable services.
- Prod push without a proven local Docker stack is high risk.

We need a **local Docker stack first** (for **ops / developers**), then the same topology (scaled) for staging/prod. End customers do **not** install Docker — they use browser or thin desktop ([ADR-008](./008-tsm-owns-execution.md)).

---

## Decision

### 1. Data planes (amended — ADR-008)

| Plane | Store | Owns |
|-------|--------|------|
| **Marketplace / KYC** | TranZfort Supabase | Loads, bookings, trips, Auth |
| **Portal / seats / audit** | **PostgreSQL** in `app-tsm/infra` | Orgs, seats, listings, settings, document metadata |
| **Execution / LOS** | **Same TSM PostgreSQL** (org-scoped) | Shipments, drivers, vehicles, clients, positions, proofs — **not** Fleetbase after cutover |
| **Blobs** | MinIO / S3 | LR / ePOD / invoice PDFs |

**Historical (Jul 2026):** Execution lived in Fleetbase MySQL (ADR-001). That is **superseded**. During ADR-008 Phases A–C, Fleetbase may remain a transitional `ExecutionStore` adapter only.

Never put TranZfort tables in TSM Postgres. Never require customers to run Fleetbase Docker.

### 2. Local stack (Compose in this repo) — ops/dev only

Default local services:

| Service | Role |
|---------|------|
| `postgres` | ZAFTYS App DB **including** execution tables (ADR-008) |
| `redis` | Cache / future jobs / sessions |
| `minio` | Local S3 for LR / ePOD blobs |
| `app` (profile `full`) | Next.js portal container |

Fleetbase compose is **deprecated for product**; optional only until Phase D delete.

### 3. Persistence migration

| Mode | When | Behavior |
|------|------|----------|
| **Memory** | No `DATABASE_URL` | Current `globalThis` stores (UI-only / CI without Docker) |
| **Postgres** | `DATABASE_URL` set (Compose default) | Write-through + hydrate; survives restart |

Migrate domains: seats/listings/settings (done/ongoing) → **execution tables (ADR-008)** → documents blobs (ADR-009).

### 4. Prod / desktop later

1. Staging/prod: managed Postgres + object storage + Next (Horizon 2)
2. Customers: HTTPS web or **Tauri thin shell** (Horizon 3) — no Docker on laptops
3. CI: lint, build, migrate, smoke against Compose
4. Rare on-prem: customer **server** runs compose/K8s; users hit their URL

---

## Consequences

- `.env.example` and [local-docker.md](../ops/local-docker.md) remain boot docs for **developers**.
- Demo banner / `TSM_DEMO_UI` stays for seed data when needed.
- AGPL Fleetbase exits the product path per ADR-008; do not expand FB coupling.

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Accepted — Docker-first + App Postgres |
| 2 Aug 2026 | Amended — execution moves to TSM Postgres (ADR-008); Docker = ops not customers |
