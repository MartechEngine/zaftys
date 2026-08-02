# TSM Build Tasks — 11 July 2026+

| Field | Value |
|-------|-------|
| **Branch** | `app-dev-mode` |
| **App path** | `app-tsm/` |
| **Strategy** | [architecture/build-strategy.md](./architecture/build-strategy.md) |
| **Feature map** | [sitemap-tsm.md](./sitemap-tsm.md) |
| **Master checklist** | [Master-TODO.md](./Master-TODO.md) |

**Scope:** Full ZAFTYS TSM product — entire Fleetbase parity UI + TranZfort sync. No MVP cut.

**Strategy (Jul 17):** **Local-first** — perfect local dev experience before NextAuth, deploy, or CI.

Use `[x]` done · `[ ]` pending · `[~]` in progress · `[—]` deferred

---

## ✅ Completed (foundation — through 11 Jul)

### Documentation
- [x] Full `docs/app/` tree (~70 files)
- [x] [sitemap-tsm.md](./sitemap-tsm.md) — ~151 Fleetbase features mapped
- [x] Architecture expanded — [build-strategy.md](./architecture/build-strategy.md) + all `architecture/*.md`
- [x] [product-scope.md](./product/product-scope.md) replaces MVP cut
- [x] [bff-endpoints.md](./api/bff-endpoints.md) full API catalog

### Project setup
- [x] Branch `app-dev-mode`, Next.js 16 app in `app-tsm/`
- [x] Build passes, dev server runs

### P1 Foundation — shell & core routes
- [x] AppShell, design tokens, status chips, origin badge
- [x] Login (dev session), middleware, RBAC nav
- [x] Command Center, Shipments, Detail, Dispatch, Fleet, Map, Track (scaffold)
- [x] Assign drawer, repository pattern, FleetbaseClient
- [x] Live map component, geo mock data
- [x] TranZfort sync scaffold, sync status API
- [x] Fleetbase Docker running, API key connected

---

## ✅ Completed (12 Jul — ops sprint)

### UI / design system
- [x] Dark glass theme (zaftys-lab parity) — `globals.css`, `PortalBackground`, glass cards
- [x] Text hierarchy tokens (`text-body`, `text-label`, `text-subtle`, `text-link`)
- [x] Module sub-nav across maintenance, billing, integrations, network, reports, fleet, dispatch
- [x] ~100 route shells (maintenance, billing, settings, integrations, clients, etc.)

### Maps
- [x] Replaced Mapbox with **MapLibre GL + OpenFreeMap** (no signup / API key)
- [x] Optional `NEXT_PUBLIC_MAP_STYLE` override
- [x] Live map filters (all / own fleet / network / delayed)
- [x] Map side panel + marker selection
- [x] **30s GPS poll** via `/api/map/vehicles` + refresh on focus

### Shipments & dispatch
- [x] `POST /api/shipments` — create wizard wired end-to-end
- [x] Shipment list filters — tab counts (All/Active/Completed/Exceptions) + search (`q`)
- [x] `ShipmentsToolbar` + server-side filtering
- [x] Dispatch board — refresh, 30s poll, sort by `updatedAt`, New shipment CTA
- [x] **`PATCH /api/shipments/:id`** — status transitions with validation
- [x] **`POST /api/shipments/:id/cancel`**
- [x] Shipment detail — Mark delivered, Resolve exception, Cancel (live API)

### Fleetbase live wiring (`TSM_DEMO_UI=0`)
- [x] `listShipments`, `getShipment`, `createShipment`, `assignShipment` → Fleetbase with dev-store fallback
- [x] `listDrivers`, `listVehicles`, `getKpis`, `getExceptions`, `getAssignOptions` → async + Fleetbase
- [x] Fleetbase mappers — orders, drivers, vehicles
- [x] Server pages await async fleet/KPI data

### TranZfort network
- [x] Overflow session store + repository
- [x] `GET /api/network/overflow`, `POST .../accept|review|reject`
- [x] Accept overflow → creates shipment (`originType: network`)
- [x] `GET /api/network/assignments`
- [x] `/network/overflow` — live `OverflowQueue` component
- [x] `/network/assignments` — accepted loads linked to shipments

### Billing & vendors (shells → detail)
- [x] `/billing/invoices/[id]` — line items + GST summary
- [x] `/vendors/[id]` — contact + linked work orders
- [x] List pages link to detail routes

---

## ✅ Completed (12 Jul — UI / shell polish)

### Brand & sidebar
- [x] Marketing logos copied to `app-tsm/public/brand/` (`header-logo-app.png`, `logo-footer.png`)
- [x] Collapsible sidebar — expanded (full logo + labels) / collapsed (icon logo + icon nav)
- [x] Collapse toggle — chevron arrow in sidebar header (not footer); state in `localStorage`
- [x] Middleware allows `/brand/*` static assets

### zaftys-lab design tokens
- [x] Text gradient for page h1 — `#e8eef7 → #7ba3d4 → #6366f1` (`text-gradient-brand`)
- [x] Button fill gradient — navy CTA `#070d18 → #0f1e3d → #1e3a5f` (`btn-fill-gradient`)
- [x] Portal eyebrow colour `#93c5fd`; primary/ring aligned to lab blues

### Bug fixes
- [x] `DataTable` — removed `"use client"` to fix RSC render-prop errors on server pages
- [x] `.text-silver` renamed to `.text-gradient-silver` (was breaking badge text visibility)

---

## ✅ Completed (12 Jul — dispatch & data layer)

### Dispatch board
- [x] Kanban drag-and-drop between columns with status transition validation
- [x] Multi-step status path engine (`pathToStatus`) — e.g. exception → delivered
- [x] Table view toggle (`?view=table`) + map link to `/map?mode=dispatch`
- [x] Optimistic board refresh after column drop
- [x] `exception` → `delivered` on detail + board

### Data persistence
- [x] Shared dev-store via `globalThis` (fixes PATCH/GET split across API routes)
- [x] Fleetbase `toFleetbaseStatus` / `mapStatus` parity for live mode
- [x] API `cache: no-store` + `force-dynamic` on shipment routes

### Command Center
- [x] Mini map 30s GPS poll via `/api/map/vehicles`

---

## ✅ Completed (12 Jul — Sprint 2: track + documents)

### Public tracking
- [x] HMAC-signed track tokens (`lib/track/tokens.ts`, 30-day TTL)
- [x] Legacy `demo-*` token backward compatibility
- [x] Rate limit on `GET /api/track/[token]` (60 req/min/IP)

### Documents
- [x] `POST /api/shipments/:id/documents` — LR / ePOD / invoice metadata
- [x] Shipment detail document upload form + live list refresh

### Shipment detail
- [x] Embedded MapLibre map on detail page (`ShipmentDetailMap`)

---

## ✅ Completed (12 Jul — Sprint 3: documents library, sync, filters)

### Global documents
- [x] `GET /api/documents` — flatten documents across all shipments
- [x] `/documents` — live library with search + type filter (replaces demo data)
- [x] `/documents/upload` — shipment picker wired to `POST /api/shipments/:id/documents`

### TranZfort two-way sync
- [x] `pushTranZfortStatus()` — status push back to TranZfort Supabase on shipment update
- [x] `tranzfortId` on shipments (dev-store + Fleetbase `meta.tranzfort_id`)
- [x] `/network/sync` — live sync panel with Run sync now + last run stats

### Shipments polish
- [x] Status filter dropdown on shipments list
- [x] Pagination (25 per page) with query param preservation

### Fleetbase QA
- [x] `npm run seed:fleetbase` — seed 3 sample orders for QA

---

## ✅ Completed (12 Jul — Sprint 4: search, notifications, realtime map)

### Global UX
- [x] Global search (⌘K) — command palette across shipments, drivers, vehicles, clients, pages
- [x] `GET /api/search?q=` — debounced search API
- [x] Notification bell with unread count from live activity feed
- [x] `/notifications` — wired to exceptions + activity (replaces demo data)
- [x] Breadcrumbs on shipment detail page
- [x] Loading skeletons — `/shipments`, `/documents`, `/dispatch`

### Live map
- [x] SSE GPS stream — `GET /api/map/stream` (5s updates)
- [x] `useMapGpsStream` hook — live map + command center use stream; poll fallback
- [x] Route polylines on shipment detail map (origin → current → destination)

---

## ✅ Completed (12 Jul — Sprint 5: filters, profile, map polish)

### Shipments
- [x] Filter drawer — client, origin, destination, source, status
- [x] Page size 25 / 50 / 100
- [x] Export CSV — `GET /api/shipments/export`

### Profile & auth
- [x] `PATCH /api/profile` — name + phone, session refresh
- [x] Editable `/profile` page
- [x] Role-safe login redirect (client → `/shipments`, etc.)

### Map
- [x] Route polylines on live map panel
- [x] Vehicle marker clustering at zoom &lt; 10

### UX
- [x] Breadcrumbs — clients, fleet drivers, billing invoices
- [x] Portal `error.tsx` retry UI

---

## 🔲 Wave 1 — Operations core (P2) — FRONTEND FIRST

### Module 1 — Auth & account
- [—] NextAuth production auth (deferred — dev session OK for local)
- [—] Forgot / reset password pages (deferred)
- [x] `/profile` page — name, phone (password change deferred)
- [x] Role-based redirect polish (client → shipments-only)
- [—] Login audit log (deferred)

### Module 2 — App shell & global UX
- [x] Collapsible sidebar + width preference (`localStorage`)
- [x] Sidebar brand logos (header + collapsed icon)
- [x] Breadcrumbs on shipment detail (pattern for other detail pages)
- [x] Global search (⌘K) — shipments, drivers, vehicles, clients
- [x] Notification bell + `/notifications` inbox (live activity)
- [~] Loading skeletons all lists (shipments, documents, dispatch done)
- [~] Empty states + microcopy per screen (`EmptyState` component)
- [x] Error boundaries + retry UI (portal error.tsx)
- [ ] Org switcher placeholder (multi-tenant P3)
- [ ] View mode toggle: Kanban / table / map on orders — dispatch done; **shipments Table/Kanban/Map ✅**

### Module 3 — Command Center (`/`)
- [~] Wire KPIs to live Fleetbase (async when `TSM_DEMO_UI=0`)
- [x] Mini map GPS poll every 30s + SSE stream (5s when connected)
- [x] Click KPI → filtered shipments (href links)
- [ ] WebSocket auto-refresh exceptions + activity
- [~] TranZfort sync banner live status
- [ ] Customizable widget layout (P4)

### Module 4 — Shipments (`/shipments`)
- [~] Live Fleetbase orders on list (fallback to dev-store)
- [x] Filter drawer — client, origin, destination, source, status
- [x] Pagination 25/50/100
- [x] Full-text search (public_id, client, route) via `q`
- [ ] Saved views per user
- [ ] Bulk actions — assign, export, cancel
- [x] Export CSV
- [ ] Mobile card list view
- [ ] Real-time row updates (WS)
- [x] `/shipments/new` — create wizard (4 steps)
- [ ] Quick create from dispatch
- [~] Edit / duplicate / cancel shipment (cancel done)
- [ ] Import CSV bulk create
- [ ] Timeline full FB activity feed
- [x] Document upload (LR, attachments) — metadata BFF; blob P3
- [~] ePOD gallery from proofs API (metadata on track page)
- [x] Embedded live map on detail
- [ ] Live ETA + delay reason
- [ ] Internal + client-visible notes
- [ ] Audit trail tab
- [ ] Print trip sheet / LR PDF
- [ ] India fields — weighbridge, plant window, e-way (P5)

### Module 5 — Dispatch (`/dispatch`)
- [x] Live data on board (poll 30s)
- [x] Drag-and-drop cards between columns
- [x] Column counts
- [x] Table view mode (in-page toggle; `/dispatch?view=table`)
- [x] Map view mode (link to `/map?mode=dispatch`)
- [ ] Send to TranZfort overflow action
- [ ] Real-time column WS updates
- [ ] Filter by corridor / client
- [ ] `/dispatch/calendar` — scheduler (shell exists)
- [ ] `/dispatch/orchestrator` — workbench (shell exists)

### Module 6 — Live map (`/map`)
- [x] Map provider configured (MapLibre / OpenFreeMap — no token)
- [~] GPS markers with 30s poll (WebSocket production pending)
- [x] Route polylines on shipment detail + live map panel
- [x] Marker clustering when zoom &lt; 10
- [x] Marker click → shipment summary panel
- [ ] Geofence layer toggle (P3)
- [ ] Kiosk / TV mode `?kiosk=1`
- [ ] `/map/replay` journey playback (shell exists)
- [x] Vehicle listing side panel
- [ ] Fleet hierarchy tree panel

### Module 11 — Public tracking (`/track/[token]`)
- [x] HMAC token + expiry enforcement
- [x] Live map single shipment
- [x] Customer-safe timeline (hide internal events)
- [~] ePOD download when delivered (listed on track page)
- [x] Rate limit / abuse protection
- [x] Email track link from detail (generate track link API)
- [ ] White-label per client (P4)

### Wave 1 — BFF wiring (after UI)
- [~] All list endpoints → live Fleetbase when key set
- [x] `POST /api/shipments` create order
- [x] `PATCH /api/shipments/:id` status update
- [x] `POST /api/shipments/:id/cancel`
- [x] `POST /api/shipments/:id/documents` metadata upload
- [x] HMAC track token generation + verification
- [ ] WebSocket gateway prototype
- [ ] Stale GPS detection job
- [ ] Create test orders in Fleetbase for QA

---

## 🔲 Wave 2 — Resources (P2–P3) — FRONTEND FIRST

### Module 7 — Fleet (`/fleet`)
- [~] Live drivers/vehicles from Fleetbase (async reads)
- [x] `/fleet/vehicles/[id]` detail page
- [x] `/fleet/drivers/[id]` detail page
- [ ] Create / edit vehicle + driver forms
- [ ] Document upload RC, insurance, fitness, license
- [ ] Assign default driver to vehicle
- [ ] `/fleet/places` — plants, weighbridges (shell exists)
- [ ] `/fleet/places/[id]` + map picker (shell exists)
- [ ] `/fleet/groups` — fleet groups (shell exists)
- [ ] `/fleet/compliance` — doc expiry calendar (shell exists)
- [ ] Block dispatch on expired docs rule
- [ ] `/fleet/equipment` (shell exists)
- [ ] `/fleet/fuel/reports` + `/fleet/fuel/transactions` (shells exist)
- [ ] `/fleet/issues` fault reports (shell exists)
- [ ] Driver scorecard link → reports
- [ ] Navigator invite flow (shell exists)

### Module 9 — Clients (`/clients`)
- [ ] `/clients` list — FB customers (shell exists)
- [ ] `/clients/[id]` detail — GSTIN, lanes, contracts (shell exists)
- [ ] `/clients/[id]/contacts` (shell exists)
- [ ] `/clients/[id]/users` — client portal invites (shell exists)
- [ ] Client shipment history filtered view
- [ ] Client-facing reports (P3)

### Module 10 — Documents (`/documents`)
- [x] Global proofs library page — live API + filters
- [x] Filter by type / shipment / search
- [x] Upload page wired to shipment document API
- [ ] Bulk download ZIP
- [ ] Full-text search (P3)

### Module 8 — Network / TranZfort (`/network`)
- [x] `/network/overflow` — unassigned TZ bookings UI (live API)
- [x] Accept / reject / review partner load
- [x] `/network/assignments` partner active trips
- [ ] `/network/partners` verified fleet registry (shell + demo)
- [x] `/network/sync` — sync health dashboard UI + manual run
- [~] Two-way status sync TZ ↔ FB (push on status update; inbound via shadow sync)
- [ ] Partner performance scorecards
- [~] TranZfort env vars + live sync (script + API; needs production env)

---

## 🔲 Wave 3 — Enterprise (P3–P4) — FRONTEND FIRST

### Module 14 — Reports (`/reports`)
- [x] `/reports` hub landing (shell)
- [ ] `/reports/operations` — trips, SLA, exceptions (shell exists)
- [ ] `/reports/lanes` — corridor performance (shell exists)
- [x] `/reports/fleet-utilization` (shell + live vehicle counts)
- [ ] `/reports/network` — partner scorecards
- [ ] `/reports/clients` — shipper scorecards
- [ ] Export PDF / CSV all reports
- [ ] Scheduled email reports (P4)

### Module 16 — Settings (`/settings`)
- [ ] All settings sub-routes — shells exist (~20 pages); wire to BFF
- [ ] `/settings/users` — CRUD + invite (IAM)
- [ ] `/settings/roles` — roles + permission picker
- [ ] `/settings/order-types` + flow designer (P4)

### Module 15 — Integrations (`/integrations`)
- [ ] All integration sub-routes — shells exist; wire to BFF
- [ ] `/integrations/webhooks` — CRUD + test console
- [ ] `/integrations/sockets` — SocketCluster debugger

### Module 12 — Maintenance (`/maintenance`)
- [ ] All maintenance sub-routes — shells exist
- [ ] Block vehicle on open WO — dispatch integration

### Module 20–24 — Orchestrator, order config, IAM UI, developers, rates
- [ ] Orchestrator workbench UI (shell exists)
- [ ] Order types + custom fields UI (shells exist)
- [ ] IAM full parity
- [ ] Service rates + quotes UI (shell exists)

---

## 🔲 Wave 4 — India & billing (P5)

### Module 13 — Billing (`/billing`)
- [ ] `/billing/charges` trip charges
- [x] `/billing/invoices` list + `/billing/invoices/[id]` detail
- [x] `/billing/rates` + `/billing/rates/[id]` (shell)
- [ ] `/billing/gst` GST reports export (shell exists)
- [ ] `/billing/accounts` ledger (shell exists)
- [ ] Tally export integration
- [ ] e-way bill integration

### Module 19 — AI (P6)
- [ ] Predictive delay alerts
- [ ] Smart ETA
- [ ] Auto-dispatch suggestions
- [ ] Document OCR (LR, weighbridge)

---

## 🔲 Cross-cutting

### Realtime (Module 17)
- [x] Map GPS SSE stream every 5s (`/api/map/stream`) + 30s poll fallback
- [ ] WebSocket: shipment status changed
- [ ] WebSocket: vehicle location (replace SSE in production)
- [ ] TranZfort poll / webhook worker production cron
- [ ] Dead letter queue failed sync
- [ ] Browser push notifications

### Notifications (Module 18)
- [x] In-app notification inbox — live activity + exceptions
- [ ] Exception alerts automation
- [ ] Doc expiry alerts
- [ ] New TranZfort booking alert
- [ ] Email to dispatcher
- [ ] WhatsApp to client (P5)
- [ ] Alert preferences per user

### Design system & polish
- [x] Dark glass portal theme applied
- [x] zaftys-lab bluish gradients (h1 text + primary button fill)
- [x] Obsidian-glass inspired components — KPI cards, SectionCard, UI primitives
- [ ] shadcn Sheet, Dialog, Select, Table on all forms
- [ ] Figma frames for all P2–P3 screens
- [ ] WCAG AA accessibility audit
- [ ] Tablet dispatch optimization
- [ ] Hindi UI strings (P5)

### DevOps & production
- [x] Commit `app-dev-mode` — app-tsm + docs/app (Jul 17)
- [—] Push `app-dev-mode` to remote (after local stable)
- [—] CI lint + build on PR (after local stable)
- [—] Staging deploy (deferred)
- [—] `app.zaftys.com` DNS + TLS (deferred)
- [ ] Production Fleetbase on VPS (local Docker OK first)
- [ ] Monitoring + sync runbook drill
- [ ] Playwright E2E north star flow (local smoke first)
- [ ] API route tests (Vitest)

### Legal / OSS
- [ ] AGPL review documented
- [ ] Commercial Fleetbase license quote (fallback)

---

## Document history

| Date | Change |
|------|--------|
| 11 Jul 2026 | Completed foundation log |
| 11 Jul 2026 | Full product pending tasks — Waves 1–4, all modules |
| 12 Jul 2026 | UI polish: brand logos, collapsible sidebar, zaftys-lab gradients, DataTable RSC fix |
| 12 Jul 2026 | Dispatch DnD/table, globalThis dev-store, CC map poll, status path engine |
| 12 Jul 2026 | Sprint 2: HMAC track tokens, document upload API, shipment detail map, rate limits |
| 12 Jul 2026 | Sprints 3–5: documents library, TZ sync, ⌘K search, SSE map, filter drawer, profile, CSV export |
| 17 Jul 2026 | Initial commit: `app-tsm/` portal (106 routes) + `docs/app/` on `app-dev-mode` |
| 17 Jul 2026 | Local-first strategy: defer auth, push, CI until app runs perfectly locally |
