# Product Scope — ZAFTYS TSM (Full Product)

| Field | Value |
|-------|-------|
| **Status** | Canonical scope (Jul 2026) |
| **Parent** | [app-overview.md](../app-overview.md) |
| **Feature map** | [sitemap-tsm.md](../sitemap-tsm.md) |
| **Build strategy** | [architecture/build-strategy.md](../architecture/build-strategy.md) |
| **UX spec** | [ui-ux-features.md](../ui-ux-features.md) |

---

## North star

> **TranZfort booking → sync to TSM → dispatcher assigns on full portal → shipper opens branded track link → live map + ePOD — all through ZAFTYS Logistics billing.**

---

## What we are building

The **complete ZAFTYS TSM portal** — not a subset:

| Area | Scope |
|------|-------|
| **Fleetbase parity** | ~151 console features as custom Next.js UI (Operations, Resources, Maintenance, Connectivity, Analytics, Settings, IAM, Developers, Ledger) |
| **TranZfort** | Sync bridge, overflow queue, partner assignments, network badges |
| **India / ZAFTYS** | LR, tonnage, corridors, GST path, origin badges, Command Center |
| **Excluded** | Fleetbase Ember console, Storefront extension, extensions marketplace |

---

## Route inventory (all in scope)

Full tree: [sitemap-tsm.md](../sitemap-tsm.md#route-tree-full-target).

| Module | Routes | Phase |
|--------|--------|-------|
| Auth | `/login`, `/forgot-password`, `/profile` | P1–P3 |
| Command Center | `/` | P2 |
| Shipments | `/shipments/*` | P2 |
| Dispatch | `/dispatch/*` (kanban, calendar, orchestrator) | P2–P4 |
| Live map | `/map/*` | P2 |
| Fleet | `/fleet/*` (vehicles, drivers, places, groups, fuel, issues) | P2–P4 |
| Network | `/network/*` | P3 |
| Clients | `/clients/*` | P3 |
| Documents | `/documents/*` | P3 |
| Vendors | `/vendors/*` | P4 |
| Maintenance | `/maintenance/*` | P4 |
| Billing | `/billing/*` | P5 |
| Reports | `/reports/*` | P3–P4 |
| Integrations | `/integrations/*` | P3–P5 |
| Settings | `/settings/*` (IAM, order types, dispatch, map, etc.) | P3–P5 |
| Public tracking | `/track/[token]` | P2 |

**P1 Foundation** (done): scaffold, shell, auth dev mode, repository pattern, Fleetbase Docker.

---

## Build approach

**Frontend first** — see [build-strategy.md](../architecture/build-strategy.md):

1. Ship route + UI for each module
2. Wire BFF → Fleetbase per module
3. Add WebSocket + sync
4. Harden for production

---

## Acceptance criteria (by module)

### P2 — Operations core

- [ ] All shipment lifecycle states visible in timeline
- [ ] Dispatch tri-view: Kanban, table, map mode
- [ ] Assign driver/vehicle from dispatch and detail
- [ ] Live map with real GPS (Mapbox + Fleetbase WS)
- [ ] Public track page with HMAC token
- [ ] Command Center KPIs from live data
- [ ] Exception queue auto-populated

### P3 — Network & resources

- [ ] TranZfort booking appears in dispatch Unassigned
- [ ] Overflow queue UI with accept/reject
- [ ] Client (shipper) accounts CRUD
- [ ] Places / geofences for plants
- [ ] Global documents library
- [ ] Reports hub (operations + lanes)
- [ ] IAM: users, roles invite flow

### P4 — Enterprise fleet

- [ ] Vehicle + driver detail pages with doc upload
- [ ] Maintenance schedules + work orders
- [ ] Telematics / devices / sensors UI
- [ ] Scheduler calendar view
- [ ] Orchestrator workbench
- [ ] Order type configuration
- [ ] Webhooks admin UI

### P5 — India & billing

- [ ] Service rates + trip charges
- [ ] GST invoices + Tally export
- [ ] e-way bill hooks
- [ ] WhatsApp client notifications

---

## Permanent exclusions

See [non-goals.md](./non-goals.md).

---

## Dependencies

| Dependency | Status |
|------------|--------|
| Fleetbase Docker (8 containers) | ✅ Running locally |
| Fleetbase API key | ✅ Connected |
| Mapbox token | ⬜ Pending |
| TranZfort Supabase credentials | ⬜ Pending |
| NextAuth production auth | ⬜ Pending |
| Production VPS + TLS | ⬜ Pending |

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial scope (was mvp-scope.md) |
| 11 Jul 2026 | Full product scope; frontend-first; replaces MVP cut |
