# Master TODO — ZAFTYS TSM (Full Product)

| Field | Value |
|-------|-------|
| **Branch** | `app-dev-mode` |
| **App path** | `app-tsm/` |
| **Portal target** | `https://app.zaftys.com` |
| **Strategy** | [architecture/build-strategy.md](./architecture/build-strategy.md) |
| **Feature map** | [sitemap-tsm.md](./sitemap-tsm.md) |
| **Scope** | [product/product-scope.md](./product/product-scope.md) |
| **Detailed tasks** | [TODO-11-july.md](./TODO-11-july.md) |

**We are building the final product** — full Fleetbase parity UI + TranZfort sync. **Frontend first**, then BFF wiring per module.

**Strategy (Jul 17):** **Local-first** — app must run perfectly on dev machine before auth, deploy, or CI. NextAuth / prod push deferred.

Use `[x]` done · `[ ]` pending · `[~]` in progress · `[—]` deferred

---

## 0. Project setup & repo

- [x] Branch `app-dev-mode`, Next.js 16 scaffold
- [x] Build passes locally (106 routes, Jul 17)
- [x] Commit `app-tsm/` + `docs/app/` (Jul 17)
- [—] Push branch to remote (after local app stable)
- [—] CI: lint + build on PR (after local app stable) → **now:** `app-tsm` CI workflow added
- [ ] Monorepo vs split repo decision

---

## 1. Documentation

- [x] Full docs tree + sitemap (~151 FB features)
- [x] Architecture expanded (build-strategy + all architecture/*.md)
- [x] product-scope.md, bff-endpoints.md
- [x] TODO-11-july expanded with all module tasks
- [ ] feature-backlog.md statuses synced with app-tsm
- [ ] ui-ux-features.md updated for full product (drop MVP sections)
- [ ] Figma links when design starts

---

## 2. P1 Foundation — DONE

- [x] App shell, design tokens, 8 core route scaffolds
- [x] Dev auth + RBAC nav + middleware
- [x] Repository pattern + FleetbaseClient
- [x] Live map component (MapLibre + OpenFreeMap — no API key)
- [x] TranZfort sync scaffold
- [x] Fleetbase Docker + API key connected
- [x] Dark glass UI theme (zaftys-lab parity)

---

## 3. Wave 1 — Operations core (P2) — **CURRENT**

**Frontend first** — see [TODO-11-july.md § Wave 1](./TODO-11-july.md)

### UI (build all screens before full BFF wire)

- [~] Command Center — live KPIs, mini map (SSE 5s + poll fallback), exceptions
- [~] Shipments — filter drawer, CSV export, pagination 25/50/100, detail map + docs
- [x] Dispatch — Kanban DnD, table view, status path validation, shared dev-store
- [~] Live map — SSE GPS, route polylines, marker clustering, side panel
- [~] Public track — HMAC tokens + rate limit; live map on track page
- [x] App shell — collapsible sidebar, brand logos, ⌘K search, notification bell
- [~] Auth — **deferred**; dev session + profile PATCH sufficient for local QA

### BFF + backend (wire after UI exists)

- [~] Live Fleetbase on Wave 1 read endpoints (orders, drivers, vehicles, KPIs, exceptions, assign)
- [x] POST create shipment
- [x] PATCH shipment status + POST cancel
- [x] Document upload → proofs API (BFF metadata upload; blob storage P3)
- [x] HMAC track tokens + rate limits
- [~] WebSocket GPS + status (SSE stream prototype; full WS pending)
- [x] Test data script — `npm run seed:fleetbase` for QA
- [x] Map provider — MapLibre/OpenFreeMap (Mapbox token no longer required)

---

## 4. Wave 2 — Resources & network (P3)

- [~] Fleet — detail pages, places, groups, compliance (shells exist)
- [~] Clients — list/detail/contacts/users live; **POST create client** (local store)
- [x] Documents — global proofs library + upload wired
- [~] Network — overflow queue, assignments, partners, sync UI
- [~] TranZfort live sync (env + two-way status push)
- [~] BFF: network overflow accept/reject; fleet lists live

---

## 5. Wave 3 — Enterprise (P3–P4)

- [~] Reports hub — operations, lanes, fleet, custom catalog live
- [~] Settings — org/IAM/config hub + automation **toggle PATCH** live
- [~] Integrations — Fleetbase, telematics, devices, Tally status live
- [~] Maintenance — schedules, work orders, parts, faults live
- [x] Dispatch calendar + orchestrator workbench (local BFF)
- [x] Order type configuration UI (list/detail/fields/flow live)
- [~] Vendors registry — list + detail

---

## 6. Wave 4 — Connectivity & telematics (P4)

- [x] Telematics providers UI (live BFF)
- [x] Devices + sensors registry (live BFF)
- [~] Connectivity events inbox (events API live)
- [x] Fuel providers + fuel reports/transactions (live BFF)
- [x] Traccar bridge (live BFF)
- [x] Journey replay on map (dev-store GPS track)

---

## 7. Wave 5 — India & billing (P5)

- [~] Billing — invoices, rates, accounts, GST live; quotes **POST create**
- [~] GST reports + Tally export status (configure live later)
- [ ] e-way bill integration
- [ ] WhatsApp notifications
- [ ] Hindi UI

---

## 8. Wave 6 — Intelligence (P6)

- [ ] AI engine integration
- [ ] Predictive delay, smart ETA, OCR

---

## 9. Cross-cutting (all waves)

### Realtime & jobs
- [~] Map GPS SSE stream every 5s (WebSocket production pending)
- [x] Stale GPS + exception automation (`/api/jobs/gps-stale-check`)
- [x] Sync dead letter queue (`/api/sync/dlq`) + cron Bearer auth
- [~] Notification inbox + email alerts (in-app + email stub)

### Design & QA
- [x] Dark glass design system applied portal-wide
- [x] zaftys-lab bluish gradients — h1 `text-gradient-brand`, button `btn-fill-gradient` (CTA navy)
- [x] Collapsible sidebar — icon mode, brand logos, chevron toggle in header
- [~] Skeletons (shipments, documents, dispatch); portal error boundary
- [x] Global search ⌘K
- [ ] WCAG AA audit
- [x] Playwright E2E north star flow
- [ ] Vitest API route tests

### DevOps
- [x] CI: lint/typecheck/build/smoke/Playwright for `app-tsm` (`.github/workflows/app-tsm-ci.yml`)
- [ ] Staging + production deploy
- [ ] TLS, monitoring, backups
- [ ] AGPL decision documented

---

## 10. Progress snapshot (17 Jul 2026 — Sprints 1–5 committed)

| Area | Done | Notes |
|------|------|-------|
| Docs | ~98% | Full product scope locked |
| P1 Foundation | ~99% | Theme, MapLibre, FB, shell + dispatch polish |
| Wave 1 UI | ~84% | Filters, ⌘K, notifications, profile, breadcrumbs |
| Wave 1 BFF | ~68% | Export, profile, search, SSE map, TZ status push |
| Wave 2 | ~45% | Documents library; network sync panel |
| Wave 3–5 | ~25% | Module shells + sub-nav; demo data |
| Realtime | ~32% | SSE GPS + polylines + clustering |
| Production deploy | 0% | Deferred — local-first until Wave 1 stable |

---

## 11. Suggested sprint order

### Sprint 1 — Operations depth ✅ complete
1. ~~Live FB data Wave 1 lists~~ ✅
2. ~~Map provider (MapLibre) + GPS poll~~ ✅ (WS next)
3. ~~Shipment filters + create wizard~~ ✅
4. ~~Status PATCH + cancel~~ ✅
5. ~~App shell UX — logos, collapsible sidebar, zaftys-lab gradients~~ ✅
6. ~~Dispatch DnD + Kanban/table view + dev-store persistence~~ ✅

### Sprint 2 — Track + documents ✅ complete
7. ~~Document metadata upload API + shipment detail UI~~ ✅
8. ~~HMAC track tokens + rate limits~~ ✅
9. ~~Shipment detail embedded map~~ ✅

### Sprint 3 — Documents library + TranZfort sync ✅ complete
10. ~~Global documents library + upload~~ ✅
11. ~~TranZfort two-way status push + sync panel~~ ✅
12. ~~Shipments status filter + pagination~~ ✅
13. ~~Fleetbase seed script~~ ✅

### Sprint 4 — Search + notifications + SSE map ✅ complete
14. ~~Global ⌘K search~~ ✅
15. ~~Notifications inbox + bell~~ ✅
16. ~~SSE GPS stream + loading skeletons~~ ✅

### Sprint 5 — Filters + profile + map polish ✅ complete
17. ~~Shipment filter drawer + CSV export~~ ✅
18. ~~Profile PATCH + role-safe login~~ ✅
19. ~~Map polylines + marker clustering~~ ✅

### Sprint 6 (current) — Local perfection (no auth / no deploy)
20. Live Fleetbase end-to-end when `TSM_DEMO_UI=0` (lists, KPIs, create, assign)
21. WebSocket or hardened SSE — map + dispatch refresh without manual reload
22. Shipment timeline, notes, bulk export polish
23. Clients module BFF (read-only first)
24. Local QA script + README runbook (`npm run dev`, FB, seed, sync)
25. Playwright smoke test (optional, local only)

### Deferred until local app is stable
- NextAuth, forgot password, login audit
- Push branch, CI, staging, `app.zaftys.com` TLS

---

## Related

| Resource | Path |
|----------|------|
| All module tasks | [TODO-11-july.md](./TODO-11-july.md) |
| App code | `../../app-tsm/` |
| Completed log | [TODO-11-july.md § Completed](./TODO-11-july.md) |

---

## Document history

| Date | Change |
|------|--------|
| 11 Jul 2026 | Initial master TODO |
| 11 Jul 2026 | Full product waves; frontend-first; references TODO-11-july |
| 12 Jul 2026 | Progress update: MapLibre, create shipment, overflow, live FB, status PATCH, map poll, billing/vendor detail |
| 12 Jul 2026 | UI polish: brand logos, collapsible sidebar, zaftys-lab gradient tokens (h1 + buttons), DataTable RSC fix |
| 12 Jul 2026 | Dispatch DnD/table, status path engine, globalThis dev-store, CC map poll, Fleetbase status map |
| 12 Jul 2026 | Sprint 2: HMAC track tokens, rate limit, document upload API, shipment detail live map |
| 12 Jul 2026 | Sprints 3–5: documents, TZ sync, search, SSE map, filters, profile, CSV export |
| 17 Jul 2026 | Initial commit: `app-tsm/` (106 routes) + `docs/app/` on `app-dev-mode` |
| 17 Jul 2026 | Strategy: local-first — defer auth, push, CI until app runs perfectly locally |
