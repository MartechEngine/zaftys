# TSM Live-First Plan

| Field | Value |
|-------|-------|
| **Status** | Active (Jul 2026) |
| **Decision** | Drop demo data for now; ship TSM fully live; TranZfort deferred |
| **Constraint** | No TranZfort prod writes |

---

## Goal

**One TSM:** all features live against real backends (Fleetbase + Postgres), automated tests green, no silent fake data.

---

## Architecture (live)

```
Portal UI  →  BFF (/api/*)  →  Fleetbase (orders, drivers, vehicles, contacts)
                           →  Postgres app_documents (billing, fleet aux, settings, …)
                           →  MinIO (documents)
```

| Concern | Live source | Notes |
|---------|-------------|-------|
| Shipments / dispatch / map | Fleetbase | Fail-loud if unreachable |
| Clients | Fleetbase customers/contacts | Local patches in Postgres |
| Places / equipment / fuel / issues | Postgres | User-created only |
| Billing / vendors / maintenance / settings | Postgres | No demo catalogs |
| Network / Load Exchange | Empty / disabled | TranZfort deferred |
| Demo catalogs (`demo-data.ts`) | **Off** | File kept; `allowDemoSeeds()` false unless `TSM_DEMO_UI=1` |

---

## Phases

### Phase 1 — Kill demo (NOW)
- [x] Plan locked
- [x] Invert gate: live by default; demo only if `TSM_DEMO_UI=1`
- [x] `.env.example` / `.env.local` → `TSM_DEMO_UI=0`
- [x] `npm run test:live` (no demo seed IDs)
- [x] Document: Fleetbase must be up for shipments
- [x] Fleetbase stack up + `test:live` green on this machine

### Phase 2 — Fleetbase live completeness
- [x] Orders list/create/assign (PUT assign; mapper reads payload + driver_assigned)
- [x] Drivers / vehicles create fail-loud + list from Fleetbase only
- [x] Clients list/create (contacts; phone+email required by FB)
- [x] Map: no invented corridor pins; reject (0,0); endpoints-only until real GPS
- [x] Command Center: real KPI counts; activity seed gated; exception copy honest

### Phase 3 — Domain backends (Postgres)
- [x] Fail-hard domain `persistItem` when DB configured (no silent success)
- [x] Persist faults / parts / overflow / role permissions (+ hydrate)
- [x] `npm run db:wipe-demo` for legacy demo IDs in `app_documents`
- [x] Empty states for key modules (DataTable emptyMessage + fleet EmptyState)
- [x] Integrations webhooks/devices marked session-only (not durable)

### Phase 4 — UX / empty states
- [x] Intentional empty copy on core list modules (clients, vendors, fleet, billing, maintenance, …)
- [x] Network desk: “TranZfort deferred” copy (`HonestyNotice`)
- [x] Demo banner only when `TSM_DEMO_UI=1`
- [x] Integrations devices/webhooks marked session-only (ephemeral)

### Phase 5 — Test matrix + automation
- [x] Feature inventory → test cases (`tsm-feature-test-matrix.md`)
- [x] Expand `npm run test:live` (reads + Postgres/FB creates + demo-ID ban)
- [x] Expand Playwright smoke (live health, no demo banner, Network/Integrations honesty)
- [x] Local green: `test:live` + `PLAYWRIGHT_SKIP_WEBSERVER=1` e2e smoke (API login; map soft-degrade)
- [ ] CI-ready script; fail on any gap (documents/SSE still expand)

### Phase 6 — Gap fix loop
- [ ] Run suite → fix → re-run until green (partial: live + e2e smoke green locally)
- [ ] Master-TODO: TSM live-complete checklist

### Deferred
- NextAuth / prod deploy (after auth-lite + bridge)
- Full Sync Bridge outbox (W5)

### Phase 7 — TranZfort Super Load publish (re-opened 26 Jul)
- [~] Auth-lite org + seats + bridge BFF (`docs/app/ops/TODO-TSM-Tranzfort-app-tsm-26-july.md`)
- [ ] Catalog picker + first live supplier link
- [ ] Booking inbox

See: `tranzfort-lab/docs/TODO-TSM-Tranzfort-Merge-26-july.md`
---

## Env contract (live)

```env
TSM_DEMO_UI=0
FLEETBASE_API_URL=http://localhost:8000/v1
FLEETBASE_API_KEY=flb_...
DATABASE_URL=postgresql://tsm:tsm@localhost:5432/zaftys_tsm
```

Optional later: `TSM_DEMO_UI=1` to re-enable seeds for marketing demos only.

---

## Success criteria

1. With FB + Postgres up, dispatcher can run full ops loop without any `demo-*` seed IDs.
2. With FB down, APIs fail loud — no fake shipments.
3. Automated suite covers all portal feature areas and exits non-zero on failure.
4. TranZfort remains untouched.

---

## Document history

| Date | Change |
|------|--------|
| 19 Jul 2026 | Initial live-first plan (drop demo, defer TZ) |
