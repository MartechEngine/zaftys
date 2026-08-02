# Build Strategy — Full Product, Frontend First

| Field | Value |
|-------|-------|
| **Status** | Canonical (Jul 2026) |
| **Parent** | [app-overview.md](../app-overview.md) |
| **Feature map** | [sitemap-tsm.md](../sitemap-tsm.md) |
| **Tasks** | [TODO-11-july.md](../TODO-11-july.md) · [Master-TODO.md](../Master-TODO.md) |

---

## Decision (11 Jul 2026 · amended 2 Aug 2026)

We are **not** shipping a cut-down portal. We are building the **final ZAFTYS TSM product**:

1. **Entire custom frontend** — full TMS/LOS IA as branded Next.js UI (sitemap remains the long-term map; Fleetbase console was **inspiration**, not a forever API)
2. **TranZfort marketplace** — live bridge desks + overflow honesty ([TODO merge](../ops/TODO-TSM-Tranzfort-app-tsm-26-july.md))
3. **India + ZAFTYS differentiators** — LR PDF, tonnage, corridors, GST path ([ADR-009](../decisions/009-documents-and-ai.md))
4. **TSM-owned execution** — org-scoped Postgres LOS ([ADR-008](../decisions/008-tsm-owns-execution.md)); **drop Fleetbase** via Phases A–D (ADR-001 superseded)
5. **AI agents** — tool-calling over BFF; Google + OpenRouter BYOK (ADR-009)
6. **Thin desktop** — Tauri → hosted HTTPS; Docker is ops/dev only (not customer install)

**Build order (current):** Marketplace + multi-tenant harden → **ExecutionStore + Postgres LOS** → delete FB → LR docs → AI BYOK → hosted + desktop installer.

**Local before prod:** Prove durability on Compose (Postgres / Redis / MinIO) for **developers**. Customers never need Docker. See [local-docker.md](../ops/local-docker.md), [ADR-007](../decisions/007-local-docker-and-app-db.md).

---

## Why frontend first

| Reason | Detail |
|--------|--------|
| Product clarity | Ops team sees full IA early; no “empty portal” confusion |
| Parallel work | Design + FE proceed while BFF maps `ExecutionStore` / TZ bridge |
| Contract stability | BFF built against known UI data shapes (`ShipmentRecord`, etc.) |
| Demo-ready | Memory/dev-store OK for UI; durable path = TSM Postgres |

Pattern per module:

```
1. Route + layout + nav entry
2. List / detail / forms
3. Shared components (tables, drawers, map layers)
4. BFF routes → ExecutionStore / TZ / document generators
5. Realtime / ops stream hooks
6. QA against acceptance criteria
```

---

## Delivery phases (no MVP cut)

| Phase | Focus | Outcome |
|-------|-------|---------|
| **P1 — Foundation** | Shell, auth, design system, data layer | Login, seats, repository pattern |
| **P2 — Operations core** | Shipments, dispatch, map, fleet, tracking | Daily driver on **TSM Postgres** (ADR-008) |
| **P3 — Network & resources** | TranZfort desks, clients, places, documents, reports | Marketplace + shippers |
| **P4 — Enterprise** | IAM, settings, integrations, maintenance, connectivity | Admin-grade portal |
| **P5 — India & billing** | LR PDF, GST, Tally, e-way, rates, invoices | Compliance + finance (ADR-009) |
| **P6 — Intelligence** | AI agents, BYOK, predictive ETA, OCR | See [ai-agents.md](../product/ai-agents.md) (ADR-009) |

Phases are **sequencing**. Sitemap remains the long-term IA; **dropping Fleetbase does not require day-one parity with every historical FB extension**.

---

## Module build order (frontend → BFF)

IA still mirrors classic Fleet-Ops branches ([sitemap-tsm.md](../sitemap-tsm.md)); **data source = TSM** after ADR-008.

### Wave 1 — Operations (P2)

| Module | Routes | Source |
|--------|--------|--------|
| Command Center | `/` | TSM KPIs / ops stream |
| Shipments | `/shipments/*` | `PostgresExecutionStore` |
| Dispatch | `/dispatch/*` | Kanban / table / map |
| Live map | `/map/*` | `tsm_positions` + honesty |
| Public tracking | `/track/[token]` | TSM track token |

### Wave 2 — Resources (P2–P3)

| Module | Routes | Source |
|--------|--------|--------|
| Fleet | `/fleet/*` | TSM drivers/vehicles/places |
| Clients | `/clients/*` | TSM clients |
| Documents | `/documents/*` | TSM docs + MinIO |
| Vendors | `/vendors/*` | TSM vendors store |

### Wave 3 — Network (P3)

| Module | Routes | Source |
|--------|--------|--------|
| TranZfort hub | `/network/*` | TZ Supabase + BFF |
| Sync status | `/network/sync` | Sync worker |
| Overflow queue | `/network/overflow` | TZ bookings |

### Wave 4 — Configuration & IAM (P3–P4)

| Module | Routes | Source |
|--------|--------|--------|
| Settings | `/settings/*` | TSM seats/org + AI BYOK |
| Order types | `/settings/order-types/*` | TSM config |
| Integrations | `/integrations/*` | TSM webhooks / devices |

### Wave 5 — Advanced ops (P4+)

| Module | Routes | Source |
|--------|--------|--------|
| Scheduler | `/dispatch/calendar` | TSM |
| Orchestrator | `/dispatch/orchestrator` | Later (optional OSS route engine) |
| Maintenance | `/maintenance/*` | TSM stores |
| Connectivity | `/integrations/telematics` etc. | Later telematics |
| Reports | `/reports/*` | BFF aggregates |
| Billing | `/billing/*` | TSM + India compliance |

---

## Frontend architecture

```
app-tsm/src/
├── app/                    # App Router — all routes from sitemap
├── components/
│   ├── shell/              # AppShell, nav, header, KPI
│   ├── shipments/          # List, detail, timeline, assign
│   ├── dispatch/           # Kanban, calendar, orchestrator
│   ├── fleet/              # Vehicles, drivers, places, fuel, issues
│   ├── map/                # LiveMap, layers, panels
│   ├── network/            # TranZfort UI
│   ├── clients/            # Shipper accounts
│   ├── documents/          # Proofs library
│   ├── reports/            # Analytics
│   ├── billing/            # Invoices, rates
│   ├── maintenance/        # Work orders, schedules
│   ├── settings/           # IAM, org, dispatch config
│   ├── integrations/       # Webhooks, API keys, telematics
│   └── ui/                 # shadcn primitives
├── lib/
│   ├── fleetbase/          # TRANSITIONAL — delete Phase D (ADR-008)
│   ├── tsm/                # TranZfort bridge, tenancy, catalogs
│   ├── execution/          # ExecutionStore (target home)
│   ├── sync/               # Legacy sync — retarget off FB
│   ├── data/               # Repositories → ExecutionStore
│   └── api/                # api-client, response helpers
└── hooks/                  # React Query, ops stream, RBAC
```

Each feature module owns its pages; shared shell and data layer are cross-cutting.

---

## BFF wiring strategy

Wire **after** UI exists for each module — target backend is TSM Postgres:

| Priority | BFF routes | Backend |
|----------|------------|---------|
| 1 | `/api/shipments`, assign, track | `PostgresExecutionStore` |
| 2 | `/api/fleet/*`, `/api/map/vehicles` | drivers, vehicles, positions |
| 3 | `/api/dashboard/*`, `/api/ops/stream` | aggregates + SSE |
| 4 | `/api/tsm/tranzfort/*` | TranZfort bridge |
| 5 | `/api/clients/*` | TSM clients |
| 6 | `/api/settings/*` | seats, org, AI BYOK |
| 7 | `/api/documents/*`, LR generate | ADR-009 |
| 8 | `/api/reports/*`, `/api/billing/*` | aggregates + India |

See [bff-layer.md](./bff-layer.md), [ADR-008](../decisions/008-tsm-owns-execution.md).

---

## What we skip

| Item | Reason |
|------|--------|
| Fleetbase Ember console | ADR-002 — never customer-facing |
| Permanent Fleetbase API | ADR-008 — drop after Phase D |
| Storefront extension | TranZfort is our marketplace |
| Embedded Next+DB in desktop | Horizon 3 thin shell only |
| AGPL code in SaaS tree | License + independence |

See [non-goals.md](../product/non-goals.md).

---

## Success criteria (full product)

- [ ] Local Docker stack healthy (Postgres + Redis + MinIO); notes/listings survive restart
- [ ] All routes in [sitemap-tsm.md](../sitemap-tsm.md) route tree exist (UI)
- [ ] Fleetbase headless API wired for Operations + Resources modules
- [ ] TranZfort booking → portal → assign → client track (north star)
- [ ] IAM: users, roles, policies manageable from `/settings`
- [ ] No customer-facing Fleetbase branding
- [ ] `app.zaftys.com` production deploy with monitoring

---

## Document history

| Date | Change |
|------|--------|
| 11 Jul 2026 | Full product, frontend-first strategy (replaces MVP cut) |
| Jul 2026 | Docker-first + App DB before prod (ADR-007) |
| 2 Aug 2026 | Execution → TSM Postgres (ADR-008); docs/AI ADR-009; drop FB path |
