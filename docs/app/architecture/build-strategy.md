# Build Strategy — Full Product, Frontend First

| Field | Value |
|-------|-------|
| **Status** | Canonical (Jul 2026) |
| **Parent** | [app-overview.md](../app-overview.md) |
| **Feature map** | [sitemap-tsm.md](../sitemap-tsm.md) |
| **Tasks** | [TODO-11-july.md](../TODO-11-july.md) · [Master-TODO.md](../Master-TODO.md) |

---

## Decision (11 Jul 2026)

We are **not** shipping a cut-down portal. We are building the **final ZAFTYS TSM product**:

1. **Entire custom frontend** — Fleetbase console parity (~151 features) as branded Next.js UI
2. **TranZfort sync** — shadow + two-way, overflow queue, partner visibility
3. **India + ZAFTYS differentiators** — LR, tonnage, corridors, origin badges, GST path
4. **Headless Fleetbase** — execution API only; never ship Ember console to customers

**Build order:** Frontend surfaces first (UI + routes + components + mock/live toggle), then wire BFF to Fleetbase module-by-module, then realtime + sync hardening, then billing/compliance.

---

## Why frontend first

| Reason | Detail |
|--------|--------|
| Product clarity | Ops team sees full IA early; no “empty portal” confusion |
| Parallel work | Design + FE proceed while BFF maps Fleetbase endpoints per module |
| Contract stability | BFF built against known UI data shapes from day one |
| Demo-ready | Each module shippable with dev-store fallback until FB wired |

Pattern per module:

```
1. Route + layout + nav entry
2. List / detail / forms (React Query + Zod)
3. Shared components (tables, drawers, map layers)
4. BFF routes → Fleetbase API
5. WebSocket / sync hooks
6. QA against acceptance criteria
```

---

## Delivery phases (no MVP cut)

| Phase | Focus | Outcome |
|-------|-------|---------|
| **P1 — Foundation** | Shell, auth, design system, data layer | Login, RBAC nav, repository pattern, Fleetbase connected |
| **P2 — Operations core** | Shipments, dispatch, map, fleet, tracking | Full ops daily driver (assign, monitor, track) |
| **P3 — Network & resources** | TranZfort, clients, places, documents, reports | Overflow + shippers + analytics hub |
| **P4 — Enterprise** | IAM, settings, integrations, maintenance, connectivity | Admin-grade portal |
| **P5 — India & billing** | GST, Tally, e-way, rates, invoices | Compliance + finance |
| **P6 — Intelligence** | AI engine, predictive ETA, OCR | Decision layer |

Phases are **sequencing**, not scope cuts. Every Fleetbase capability in [sitemap-tsm.md](../sitemap-tsm.md) is in scope; phases order the build.

---

## Module build order (frontend → BFF)

Aligned with Fleetbase sidebar IA and [sitemap-tsm.md](../sitemap-tsm.md):

### Wave 1 — Operations (P2)

| Module | Routes | Fleetbase source |
|--------|--------|------------------|
| Command Center | `/` | Dashboard widgets, KPIs |
| Shipments | `/shipments/*` | `operations.orders` |
| Dispatch | `/dispatch/*` | Kanban / table / map views |
| Live map | `/map/*` | Live map + sidebar panels |
| Public tracking | `/track/[token]` | Customer tracking |

### Wave 2 — Resources (P2–P3)

| Module | Routes | Fleetbase source |
|--------|--------|------------------|
| Fleet | `/fleet/*` | drivers, vehicles, fleets, places |
| Clients | `/clients/*` | customers, contacts |
| Documents | `/documents/*` | proofs library |
| Vendors | `/vendors/*` | vendors |

### Wave 3 — Network (P3)

| Module | Routes | Source |
|--------|--------|--------|
| TranZfort hub | `/network/*` | TZ Supabase + BFF |
| Sync status | `/network/sync` | Sync worker |
| Overflow queue | `/network/overflow` | TZ bookings |

### Wave 4 — Configuration & IAM (P3–P4)

| Module | Routes | Fleetbase source |
|--------|--------|------------------|
| Settings | `/settings/*` | IAM + Fleet-Ops settings |
| Order types | `/settings/order-types/*` | order-config |
| Integrations | `/integrations/*` | dev-engine |

### Wave 5 — Advanced Fleet-Ops (P4)

| Module | Routes | Fleetbase source |
|--------|--------|------------------|
| Scheduler | `/dispatch/calendar` | operations.scheduler |
| Orchestrator | `/dispatch/orchestrator` | operations.orchestrator + vroom |
| Maintenance | `/maintenance/*` | maintenance branch |
| Connectivity | `/integrations/telematics` etc. | connectivity branch |
| Reports | `/reports/*` | analytics branch |
| Billing | `/billing/*` | ledger-engine |

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
│   ├── fleetbase/          # Client, mapper, types
│   ├── sync/               # TranZfort bridge
│   ├── data/               # Repositories (FB → fallback)
│   └── api/                # api-client, response helpers
└── hooks/                  # React Query, WebSocket, RBAC
```

Each feature module owns its pages; shared shell and data layer are cross-cutting.

---

## BFF wiring strategy

Wire **after** UI exists for each module:

| Priority | BFF routes | Fleetbase API |
|----------|------------|---------------|
| 1 | `/api/shipments`, assign, track | `/v1/orders`, proofs |
| 2 | `/api/fleet/*`, `/api/map/vehicles` | drivers, vehicles, places |
| 3 | `/api/dashboard/*` | aggregates + WS |
| 4 | `/api/sync/*` | meta + order create |
| 5 | `/api/clients/*` | customers |
| 6 | `/api/settings/*` | IAM APIs |
| 7 | `/api/integrations/*` | webhooks, devices |
| 8 | `/api/reports/*`, `/api/billing/*` | analytics, ledger |

See [bff-layer.md](./bff-layer.md) and [api/bff-endpoints.md](../api/bff-endpoints.md).

---

## What we skip (unchanged)

| Item | Reason |
|------|--------|
| Fleetbase Ember console | ADR-002 — internal `:4200` only |
| Storefront extension | TranZfort is our marketplace |
| Extensions marketplace | Internal Docker only |

See [non-goals.md](../product/non-goals.md).

---

## Success criteria (full product)

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
