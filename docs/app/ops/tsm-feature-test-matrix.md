# TSM Feature Test Matrix (live)

| Field | Value |
|-------|-------|
| **Status** | Active — automation in `npm run test:live` + `npm run test:e2e:smoke` |
| **Mode** | `TSM_DEMO_UI≠1` + Fleetbase + Postgres |
| **Not covered** | TranZfort (deferred) |

Run: `npm run test:live` with `npm run dev` up.  
UI smoke: `PLAYWRIGHT_SKIP_WEBSERVER=1 npm run test:e2e:smoke` (reuse existing dev).

---

## Areas

| # | Area | Critical paths | Automate |
|---|------|----------------|----------|
| 1 | Auth | login, logout, session cookie | smoke-live + e2e |
| 2 | Health | demoUi false, source fleetbase, db up, FB reachable | smoke-live + e2e |
| 3 | Shipments | list, create, assign, detail | smoke-live |
| 4 | Dispatch | calendar API | smoke-live (read) |
| 5 | Map | `/api/map/vehicles` (no invented tick) | smoke-live (read) |
| 6 | Fleet drivers/vehicles | list (FB only) | smoke-live |
| 7 | Fleet places/equipment/fuel/issues | create + list | smoke-live |
| 8 | Clients | list, create vs FB | smoke-live |
| 9 | Billing | invoices create + rates list | smoke-live |
| 10 | Maintenance | WO, faults, parts, schedules | smoke-live |
| 11 | Vendors | list, create | smoke-live |
| 12 | Settings | users, roles list | smoke-live |
| 13 | Reports / analytics | KPIs from real counts | smoke-live (kpis) |
| 14 | Documents | upload MinIO | expand |
| 15 | Network | listings/overflow/partners + deferred UI | smoke-live + e2e |
| 16 | Integrations | overview + fleet/session-only UI | smoke-live + e2e |
| 17 | Track | public token for live shipment | e2e north-star |
| 18 | Demo honesty | no demo catalog IDs in list payloads | smoke-live |
| 19 | Demo banner | hidden when live | e2e |

---

## Pass criteria

- Every Critical path has an automated check OR a tracked gap below
- `npm run test:live` exit 0
- No list response contains demo catalog IDs (`vnd1`, `wo1`, `u1`, …) unless created by the test itself
- Playwright smoke: no “Demo UI mode” banner; Network/Integrations honesty copy visible

### Still expand later
- Document upload (MinIO)
- SSE `/api/ops/stream`
- Shipment notes/docs/bulk status transitions
- Driver/vehicle create via API in smoke (rate-limit sensitive)

---

## Document history

| Date | Change |
|------|--------|
| 19 Jul 2026 | Initial matrix for live-first |
| 19 Jul 2026 | Phase 5: expanded smoke-live + e2e honesty checks |
| 19 Jul 2026 | e2e: API login + map RSC soft-degrade; local `test:live` + Playwright 5/5 green |
