# TSM Comprehensive Sitemap & Feature Map

| Field | Value |
|-------|-------|
| **Status** | Canonical expanded IA (Jul 2026) |
| **Portal** | `https://app.zaftys.com` |
| **App path** | `app-tsm/` |
| **Parent** | [app-overview.md](./app-overview.md) |
| **UX detail** | [ui-ux-features.md](./ui-ux-features.md) |
| **Scope** | [product/product-scope.md](./product/product-scope.md) |
| **Backlog IDs** | [product/feature-backlog.md](./product/feature-backlog.md) |

This document is the **full TSM product surface** — long-term IA inspired by classic Fleet-Ops (~151 features) plus ZAFTYS TranZfort network and India compliance. **We are not shipping a cut-down portal.** Runtime execution is **TSM-owned Postgres** ([ADR-008](./decisions/008-tsm-owns-execution.md)); Fleetbase is not a permanent backend. See [architecture/build-strategy.md](./architecture/build-strategy.md).

**Fleetbase console (`:4200`)** was internal reference only and exits the product path after Horizon 0D. Everything below ships on the **custom Next.js portal**.

---

## How to read this doc

### Phase tags

| Tag | Meaning | Target |
|-----|---------|--------|
| **P1** | Foundation — scaffold, auth, data layer | Done |
| **P2** | Operations core — shipments, dispatch, map, fleet, track | Current |
| **P3** | Network & resources — TranZfort, clients, reports, IAM | Next |
| **P4** | Enterprise — maintenance, connectivity, orchestrator, settings depth | |
| **P5** | India billing & compliance — GST, Tally, e-way | |
| **P6** | AI / analytics platform | Year 2+ |

### Build status

| Status | Meaning |
|--------|---------|
| ✅ | Implemented in `app-tsm/` |
| 🟡 | Scaffold / partial |
| ⬜ | Not started |

### Backend source

| Source | Role |
|--------|------|
| **TSM** | TSM PostgreSQL via `ExecutionStore` — **target SoT** ([ADR-008](./decisions/008-tsm-owns-execution.md)) |
| **FB** | Fleetbase API — **legacy / transitional only** (delete Phase D) |
| **TZ** | TranZfort Supabase sync / bridge |
| **BFF** | Custom Next.js logic (docs, AI, seats) |
| **UI** | Portal-only (no external API yet) |

### TSM-only vs Fleetbase

| Label | Meaning |
|-------|---------|
| **TSM+** | ZAFTYS-specific — not in Fleetbase (TranZfort, India compliance, network badge) |
| **FB** | Headless capability exists in Fleetbase API — we build custom UI |
| **SKIP** | Fleetbase has it; we deliberately do not ship to customers |

---

## Fleetbase console audit (reference — Jul 2026)

Source: [Fleet-Ops docs](https://fleetbase.io/docs/fleet-ops), [platform navigation](https://fleetbase.io/docs/platform/console-features/navigation), local console `:4200` (engine bundle v0.6.57), IAM/dev engine routes, `extensions.json`.

Fleetbase is **modular**: a platform shell + installable **extensions**. Customer-facing ZAFTYS portal replaces the entire Ember console but consumes the same APIs.

### Installed extensions (local Docker — Jul 2026)

| Extension | Route slug | TSM decision |
|-----------|------------|--------------|
| `@fleetbase/fleetops-engine` v0.6.57 | `fleet-ops` | **Build custom UI** — headless API |
| `@fleetbase/iam-engine` v0.1.10 | `iam` | **Build custom UI** — `/settings/users|roles|policies` |
| `@fleetbase/dev-engine` v0.2.14 | `developers` | **Build custom UI** — `/integrations/*` |
| `@fleetbase/ledger-engine` v0.0.7 | `ledger` | **Build custom UI** — `/billing` P4 |
| `@fleetbase/customer-portal-engine` v0.0.12 | `customer-portal` | **Partial** — client tracking via `/track/[token]` |
| `@fleetbase/storefront-engine` v0.4.16 | `storefront` | **SKIP** — TranZfort marketplace |
| `@fleetbase/registry-bridge-engine` v0.1.9 | `extensions` | **SKIP** — internal Docker only |
| `@fleetbase/ai-engine` v0.0.2 | `ai` | **P5** — decision support layer |
| `@fleetbase/valhalla-engine` v0.0.4 | `valhalla` | **Internal** — routing backend (OSRM alt) |
| `@fleetbase/vroom-engine` v0.0.4 | `vroom` | **Internal** — orchestrator optimization |

### Fleet-Ops sidebar IA (authoritative — from engine bundle)

Six collapsible branches + contextual map panels:

| Branch | Fleetbase routes | TSM target |
|--------|------------------|------------|
| **Operations** | orders · orchestrator · scheduler · order-config · service-rates | `/dispatch`, `/shipments`, `/settings/order-types`, `/billing/rates` |
| **Resources** | customers · drivers · vehicles · fleets · vendors · contacts · places · fuel-reports · fuel-transactions · issues | `/clients`, `/fleet`, `/vendors`, `/fleet/places`, `/fleet/fuel`, `/fleet/issues` |
| **Maintenance** | hub · schedules · work-orders · maintenances · equipment · parts | `/maintenance/*` |
| **Connectivity** | telematics · fuel-providers · devices · sensors · events | `/integrations/telematics`, `/integrations/devices`, `/integrations/events` |
| **Analytics** | hub · reports | `/reports/*` |
| **Settings** | hub · navigator-app · map · payments · notifications · routing · orchestrator · scheduling · custom-fields · avatars | `/settings/*` |

**Orders tri-view:** Kanban / table / map (`layout` query param) — TSM maps to `/dispatch`, `/shipments`, `/map`.

**Live map sidebar panels:** Driver listing, vehicle/fleet hierarchy tree, device detail — TSM `/map` side panel P2B.

### Platform shell (all extensions)

| Fleetbase UI area | What it does | TSM equivalent | Phase | Build? |
|-------------------|--------------|------------------|-------|--------|
| Onboard / Install wizard | First org + admin setup | Fleetbase `:4200` internal only | — | SKIP UI |
| Auth: login | Email/password | `/login` | P2 | ✅ |
| Auth: forgot / reset password | Email recovery | `/forgot-password`, `/reset-password` | P3 | ⬜ |
| Auth: 2FA / verification | TOTP, SMS | `/settings/security` | P4 | ⬜ |
| Auth: portal login | Customer portal entry | Client role `/login` | P3 | ⬜ |
| Invite: join org / fleet | Driver/user invite links | `/settings/users` invite | P3 | ⬜ |
| Home dashboard | Widget-based dashboards | `/` Command Center | P2 | 🟡 |
| Custom dashboards | Create/edit widget boards | `/` customizable widgets | P4 | ⬜ |
| Dashboard widgets | KPI tiles per extension | Command Center KPIs | P3 | ⬜ |
| Top bar: locale (i18n) | 15+ languages | Hindi P5; English P2 | P5 | ⬜ |
| Top bar: notification tray | In-app alerts | `/notifications` | P3 | ⬜ |
| Top bar: chat tray | Internal messaging | P4 or SKIP | P4 | SKIP |
| Top bar: org switcher | Multi-org tenants | Single org P2; multi P3 | P3 | ⬜ |
| Top bar: user menu | Profile, auth, orgs, sign out | UserMenu + `/profile` | P2 | 🟡 |
| Sidebar: collapsible + resizable | Layout prefs | Collapsible sidebar | P3 | ⬜ |
| Extension nav (header tabs) | FleetOps, IAM, Storefront… | TSM unified sidebar | — | Custom IA |
| Admin: system config | DB, cache, mail, queue, socket | DevOps only (Docker) | — | SKIP |
| Admin: branding | Console white-label | `/settings/organization` | P3 | ⬜ |
| Admin: schedule monitor | Cron job logs | `/integrations/fleetbase` | P3 | ⬜ |
| Admin: organizations | Multi-tenant admin | `/settings/organization` | P3 | ⬜ |
| Extensions marketplace | Install/uninstall extensions | Internal only | — | SKIP |

### Extension: Fleet-Ops — Module 01 Operations (Dispatch & Configuration)

| Fleetbase UI / feature | Description | TSM route / module | Phase | Status |
|------------------------|-------------|-------------------|-------|--------|
| **Orders — Kanban view** | Phase-based columns, drag cards | `/dispatch` | P2 | 🟡 |
| **Orders — Table view** | Dense filterable grid | `/shipments` | P2 | 🟡 |
| **Orders — Map view** | Orders on live map | `/map` + dispatch map mode | P3 | ⬜ |
| **Orders — Create** | Full order form | `/shipments/new` | P3 | ⬜ |
| **Orders — Detail** | Timeline, assignment, proofs | `/shipments/[id]` | P2 | 🟡 |
| **Orders — Assign driver/vehicle** | Manual assignment | Assign drawer | P2 | ✅ |
| **Orders — Dispatch to Navigator** | Push to driver app | Auto on assign | P3 | ⬜ |
| **Orders — Status transitions** | Lifecycle buttons | Timeline + actions | P3 | ⬜ |
| **Orders — Cancel / complete** | Terminal states | Detail actions | P3 | ⬜ |
| **Orders — Custom fields** | Per order-config fields | Shipment detail meta | P3 | ⬜ |
| **Orders — Entities / items** | Payload line items | Load details card | P3 | ⬜ |
| **Orders — Scheduled at** | Future dispatch | Scheduler integration | P3 | ⬜ |
| **Orders — Proofs / ePOD** | Photo, signature capture | Documents + gallery | P3 | ⬜ |
| **Orders — Customer tracking link** | Branded public URL | `/track/[token]` | P2 | 🟡 |
| **Orchestrator Workbench** | Multi-phase optimization pipeline | `/dispatch/orchestrator` | P3 | ⬜ |
| Orchestrator: vehicle allocation | Match vehicle to payload | Orchestrator phase | P3 | ⬜ |
| Orchestrator: driver allocation | Skills, shifts, proximity | Orchestrator phase | P3 | ⬜ |
| Orchestrator: route optimization | VROOM / OSRM integration | Orchestrator phase | P3 | ⬜ |
| Orchestrator: hands-free mode | Auto-run on new order | `/settings/dispatch` | P4 | ⬜ |
| Orchestrator: review plan UI | Approve before dispatch | Orchestrator workbench | P3 | ⬜ |
| **Scheduler** | Calendar / timeline planning | `/dispatch/calendar` | P3 | ⬜ |
| Scheduler: time windows | Customer delivery slots | Shipment detail | P3 | ⬜ |
| Scheduler: capacity by zone | Zone planning | `/dispatch/calendar` | P3 | ⬜ |
| **Order configurations** | Custom order types | `/settings/order-types` | P3 | ⬜ |
| Order config: activity flow designer | Drag-drop status flow | `/settings/order-types/[id]/flow` | P4 | ⬜ |
| Order config: custom fields | Text, file, signature… | `/settings/order-types/[id]/fields` | P3 | ⬜ |
| Order config: validation rules | Business rules | Settings | P4 | ⬜ |
| Order config: automation triggers | On status change | `/settings/automation` | P4 | ⬜ |
| **Service rates** | Pricing rules | `/billing/rates` | P4 | ⬜ |
| Service rates: distance/weight/zone | Rate calculators | `/billing/rates/[id]` | P4 | ⬜ |
| **Quotes** | On-demand quotation | `/shipments/quotes` | P4 | ⬜ |

### Extension: Fleet-Ops — Module 02 Resources (People, Vehicles, Places)

| Fleetbase UI / feature | Description | TSM route / module | Phase | Status |
|------------------------|-------------|-------------------|-------|--------|
| **Drivers — list** | All drivers, status | `/fleet` drivers tab | P2 | 🟡 |
| **Drivers — detail** | Profile, docs, schedule | `/fleet/drivers/[id]` | P3 | ⬜ |
| **Drivers — create/edit** | CRUD | Fleet drawer / detail | P3 | ⬜ |
| **Drivers — invite (Navigator)** | Mobile app onboarding | `/fleet/drivers/[id]/invite` | P3 | ⬜ |
| **Drivers — live location** | Real-time GPS | Map + detail | P3 | ⬜ |
| **Drivers — shift schedule** | Availability | `/fleet/drivers/[id]/schedule` | P3 | ⬜ |
| **Drivers — scorecard** | Performance metrics | `/reports/drivers` | P3 | ⬜ |
| **Vehicles — list** | Fleet registry | `/fleet` vehicles tab | P2 | 🟡 |
| **Vehicles — detail** | Specs, docs, history | `/fleet/vehicles/[id]` | P3 | ⬜ |
| **Vehicles — create/edit** | CRUD | Fleet detail | P3 | ⬜ |
| **Vehicles — telematics link** | Device assignment | `/fleet/vehicles/[id]/devices` | P4 | ⬜ |
| **Fleets — groups** | Logical driver+vehicle groups | `/fleet/groups` | P3 | ⬜ |
| **Fleets — by zone/route** | Regional scoping | `/fleet/groups/[id]` | P3 | ⬜ |
| **Places — list** | Locations, geofences | `/fleet/places` | P3 | ⬜ |
| **Places — detail** | Coords, geofence radius | `/fleet/places/[id]` | P3 | ⬜ |
| **Places — map picker** | Set lat/lng | Place form | P3 | ⬜ |
| **Customers** | Shipper accounts | `/clients` | P3 | ⬜ |
| **Contacts** | People at customers | `/clients/[id]/contacts` | P3 | ⬜ |
| **Vendors** | Supplier records | `/vendors` | P4 | ⬜ |
| **Fuel reports** | Consumption summaries | `/fleet/fuel/reports` | P4 | ⬜ |
| **Fuel transactions** | Per-fill logs | `/fleet/fuel/transactions` | P4 | ⬜ |
| **Issues / faults** | Driver-reported defects | `/fleet/issues` | P4 | ⬜ |
| **Equipment** | Non-vehicle assets | `/fleet/equipment` | P4 | ⬜ |

### Extension: Fleet-Ops — Module 03 Maintenance

| Fleetbase UI / feature | Description | TSM route / module | Phase | Status |
|------------------------|-------------|-------------------|-------|--------|
| **Preventive schedules** | Mileage / hours / calendar | `/maintenance/schedules` | P4 | ⬜ |
| **Work orders — list** | Open → resolved jobs | `/maintenance/work-orders` | P4 | ⬜ |
| **Work orders — detail** | Parts, labor, costs | `/maintenance/work-orders/[id]` | P4 | ⬜ |
| **Parts inventory** | Stock levels | `/maintenance/parts` | P4 | ⬜ |
| **Driver fault reporting** | Via Navigator app | `/maintenance/faults` | P4 | ⬜ |
| **Block dispatch on overdue** | Compliance gate | BFF rule | P4 | ⬜ |
| **Maintenance alerts** | Dashboard + notifications | Command Center | P4 | ⬜ |

### Extension: Fleet-Ops — Module 04 Connectivity (Telematics)

| Fleetbase UI / feature | Description | TSM route / module | Phase | Status |
|------------------------|-------------|-------------------|-------|--------|
| **Telematics providers** | Samsara, Geotab, Flespi | `/integrations/telematics` | P4 | ⬜ |
| **Fuel provider integrations** | Fuel card / pump APIs | `/integrations/fuel-providers` | P4 | ⬜ |
| **Device registry** | Modems, sensors | `/integrations/devices` | P4 | ⬜ |
| **Sensors** | Per-device sensor readings | `/integrations/sensors` | P4 | ⬜ |
| **Connectivity events** | Telematics event inbox | `/integrations/events` | P4 | ⬜ |
| **Live vehicle data stream** | Speed, fuel, engine | Map overlay | P4 | ⬜ |
| **Traccar bridge** | Hardware GPS | `/integrations/traccar` | P4 | ⬜ |
| **Geofence automation** | Auto status on enter/exit | `/settings/geofences` | P3 | ⬜ |
| **Journey replay** | Historical route playback | `/map/replay` | P4 | ⬜ |

### Extension: Fleet-Ops — Module 05 Analytics

| Fleetbase UI / feature | Description | TSM route / module | Phase | Status |
|------------------------|-------------|-------------------|-------|--------|
| **Operations dashboard** | On-time, volume, SLA | `/reports/operations` | P3 | ⬜ |
| **Custom reports** | Report builder | `/reports/custom` | P5 | ⬜ |
| **Driver scorecards** | Performance ranking | `/reports/drivers` | P3 | ⬜ |
| **Route efficiency** | Cost per km, empty miles | `/reports/lanes` | P3 | ⬜ |
| **Delivery performance** | OTP, failed deliveries | `/reports/operations` | P3 | ⬜ |
| **Scheduled report email** | Cron delivery | `/settings/reports` | P4 | ⬜ |
| **Export PDF / CSV** | All reports | Reports module | P3 | ⬜ |

### Extension: Fleet-Ops — Settings (Fleet-Ops config branch)

| Fleetbase UI / feature | Description | TSM route / module | Phase | Status |
|------------------------|-------------|-------------------|-------|--------|
| Fleet-Ops settings hub | Extension config landing | `/settings` | P3 | ⬜ |
| Navigator app config | Driver mobile branding + onboarding | `/settings/navigator` | P3 | ⬜ |
| Map provider defaults | Google/Mapbox, map ID | `/settings/map` | P3 | ⬜ |
| Payments config | Stripe / payment gateways | `/settings/payments` | P4 | SKIP initial |
| Notification channels | Push, email templates | `/settings/notifications` | P3 | ⬜ |
| Routing engine defaults | Valhalla/OSRM/VROOM | `/settings/routing` | P3 | ⬜ |
| Orchestrator defaults | Hands-free, phase config | `/settings/dispatch` | P3 | ⬜ |
| Scheduling defaults | Shift rules, constraints | `/settings/scheduling` | P3 | ⬜ |
| Custom entity fields | Order-type field editor | `/settings/order-types/[id]/fields` | P3 | ⬜ |
| Avatar / branding assets | Console white-label images | `/settings/organization` | P3 | ⬜ |
| Driver onboard settings | Self-serve driver signup | `/settings/navigator` | P3 | ⬜ |
| Entity field editing rules | Which fields editable when | `/settings/order-types` | P4 | ⬜ |

### Extension: IAM (Identity & Access)

| Fleetbase UI / feature | Description | TSM route / module | Phase | Status |
|------------------------|-------------|-------------------|-------|--------|
| **Users — staff** | Console users | `/settings/users` | P3 | ⬜ |
| **Users — customers** | Client portal users | `/clients/[id]/users` | P3 | ⬜ |
| **Users — drivers** | Navigator identities | `/fleet/drivers` (linked) | P3 | ⬜ |
| IAM dashboard KPIs | Active/dormant/inactive users | `/settings` (admin widgets) | P3 | ⬜ |
| User invite / pending / active | Lifecycle | User management | P3 | ⬜ |
| **Roles** | Permission collections | `/settings/roles` | P3 | ⬜ |
| **Policies** | Reusable permission bundles | `/settings/policies` | P3 | ⬜ |
| **Groups** | Bulk policy assignment | `/settings/groups` | P3 | ⬜ |
| **Organizations** | Multi-tenant | `/settings/organization` | P3 | ⬜ |
| Permission picker (per extension) | Granular FLB permissions | RBAC matrix | P3 | ⬜ |
| View resolved permissions | Debug user access | User detail | P3 | ⬜ |
| Export users / roles / policies | CSV/XLSX | Settings bulk export | P4 | ⬜ |

### Extension: Developers

| Fleetbase UI / feature | Description | TSM route / module | Phase | Status |
|------------------------|-------------|-------------------|-------|--------|
| **API keys** | Bearer tokens | `/integrations/fleetbase` (admin) | P2 | 🟡 |
| Developers dashboard | API health KPIs | `/integrations` | P3 | ⬜ |
| **Webhooks** | Outbound event subscriptions | `/integrations/webhooks` | P3 | ⬜ |
| Webhook delivery log | Success/failure per endpoint | Webhook detail | P3 | ⬜ |
| Webhook test console | Live test payloads | Webhook detail | P3 | ⬜ |
| **WebSockets / Sockets** | SocketCluster channel viewer | `/integrations/sockets` | P3 | ⬜ |
| **API logs** | Request history | `/integrations/logs` | P3 | ⬜ |
| **Event log** | Platform events | `/integrations/events` | P3 | ⬜ |
| API key roll / rename / export | Credential lifecycle | Integrations admin | P3 | ⬜ |
| JavaScript SDK | `@fleetbase/sdk` | BFF uses REST directly | — | FB |

### Extension: Storefront (e-commerce)

| Fleetbase UI / feature | TSM decision | Notes |
|------------------------|--------------|-------|
| Products, categories | **SKIP** | Not ZAFTYS model — industrial B2B |
| Online store checkout | **SKIP** | TranZfort = marketplace |
| Auto-dispatch on checkout | **TSM+** | TranZfort → sync → dispatch |
| Customer mobile app (store) | **SKIP** | Client tracking page instead |

### Extension: Ledger (billing)

| Fleetbase UI / feature | Description | TSM route / module | Phase | Status |
|------------------------|-------------|-------------------|-------|--------|
| Invoices | Billing documents | `/billing/invoices` | P4 | ⬜ |
| Ledger accounts | Chart of accounts | `/billing/accounts` | P4 | ⬜ |
| Invoice on order detail | Tab on shipment | `/shipments/[id]/billing` | P4 | ⬜ |
| Invoice templates | Branded PDF | `/settings/billing` | P4 | ⬜ |
| Payment tracking | Paid / pending | Invoice detail | P4 | ⬜ |

### Extension: Navigator (driver mobile app)

| Fleetbase UI / feature | Description | TSM portal role | Phase | Status |
|------------------------|-------------|-----------------|-------|--------|
| Turn-by-turn navigation | Driver app | Not in TSM — separate app | — | FB app |
| Status updates from field | Driver taps | Drives shipment timeline | P3 | ⬜ |
| GPS streaming | Sub-minute location | Powers `/map` | P3 | ⬜ |
| ePOD capture (photo/sign) | Proof upload | `/shipments/[id]` docs | P3 | ⬜ |
| Fault report from cab | Maintenance | `/maintenance/faults` | P4 | ⬜ |
| Driver invite flow | Join fleet link | Fleet driver detail | P3 | ⬜ |

### ZAFTYS-only modules (not in Fleetbase)

| Module | Route | Purpose | Phase |
|--------|-------|---------|-------|
| **TranZfort network** | `/network/*` | Overflow marketplace, partner loads | P3 |
| **India compliance** | Shipment meta + `/billing/gst` | LR, tonnage, e-way, GSTIN | P3–P4 |
| **Origin badge** | All shipment views | Own fleet vs network vs handoff | P2 ✅ |
| **Command Center** | `/` | ZAFTYS-specific ops dashboard | P2 🟡 |
| **TranZfort sync** | `/network/sync` | Shadow + two-way sync | P2 🟡 |
| **Tally export** | `/integrations/tally` | India accounting | P4 |
| **WhatsApp client updates** | Notification channel | India comms preference | P4 |

---

## Route tree (full target)

```
app.zaftys.com
├── /login                          P2  ✅
├── /forgot-password                P3  ⬜
├── /reset-password/[token]         P3  ⬜
├── /                                P2  🟡  Command Center
├── /notifications                   P3  ⬜
├── /profile                         P3  ⬜
│
├── /shipments                       P2  🟡  List
│   ├── /new                         P3  ⬜  Create wizard
│   ├── /quotes                      P4   ⬜  Service quotes
│   ├── /import                      P3   ⬜  Bulk CSV import
│   └── /[id]                        P2  🟡  Detail
│       ├── /edit                    P3  ⬜
│       ├── /documents               P3  ⬜  Proofs, LR, ePOD
│       ├── /timeline                P2  🟡  Activity flow
│       ├── /map                     P3  ⬜  Embedded live map
│       ├── /entities                P3  ⬜  Payload line items
│       ├── /billing                 P4   ⬜  Ledger invoice tab
│       └── /audit                   P3   ⬜
│
├── /dispatch                        P2  🟡  Kanban board
│   ├── /table                       P3  ⬜  Table view (alias /shipments)
│   ├── /calendar                    P3  ⬜  Scheduler / timeline
│   ├── /orchestrator                P3   ⬜  Optimization workbench
│   └── /routes                      P3   ⬜  Route planning / OSRM
│
├── /map                             P2  🟡  Live map
│   ├── /replay                      P4   ⬜  Journey playback
│   └── ?kiosk=1                     P3  ⬜  TV / wall mode
│
├── /fleet                           P2  🟡  Hub
│   ├── /vehicles                    P2  🟡  (tab on /fleet)
│   │   └── /[id]                    P3  ⬜  Vehicle detail
│   │       ├── /documents           P3  ⬜
│   │       ├── /maintenance         P4   ⬜
│   │       ├── /fuel                P4   ⬜
│   │       └── /devices             P4   ⬜  Telematics
│   ├── /drivers                     P2  🟡  (tab on /fleet)
│   │   └── /[id]                    P3  ⬜  Driver detail
│   │       ├── /schedule            P3   ⬜  Shifts
│   │       └── /invite              P3  ⬜  Navigator invite
│   ├── /groups                      P3   ⬜  Fleet groups (FB fleets)
│   │   └── /[id]                    P3   ⬜
│   ├── /places                      P3  ⬜  Plants, weighbridges, yards
│   │   └── /[id]                    P3  ⬜
│   ├── /equipment                   P4   ⬜  Non-vehicle assets
│   ├── /fuel                        P4   ⬜  Fuel hub
│   │   ├── /reports                 P4   ⬜  Consumption summaries
│   │   └── /transactions            P4   ⬜  Per-fill logs
│   ├── /issues                      P4   ⬜  Driver-reported faults
│   │   └── /[id]                    P4   ⬜
│   └── /compliance                  P3  ⬜  Doc expiry dashboard
│
├── /vendors                         P4   ⬜  Supplier registry (FB vendors)
│   └── /[id]                        P4   ⬜
├── /network                         P3  ⬜  TranZfort integration hub
│   ├── /overflow                    P3  ⬜  Unassigned marketplace loads
│   ├── /assignments                 P3   ⬜  Partner active trips
│   ├── /partners                    P3   ⬜  Verified fleet registry
│   │   └── /[id]                    P3   ⬜
│   └── /sync                        P3  ⬜  Sync health + manual retry
│
├── /clients                         P3  ⬜  Shipper accounts (FB customers)
│   └── /[id]                        P3  ⬜  Contracts, lanes
│       ├── /contacts                P3   ⬜  Contact persons
│       └── /users                   P3   ⬜  Client portal users
│
├── /documents                       P3  ⬜  Global proofs library
│   └── /[id]                        P3  ⬜
│
├── /maintenance                     P4   ⬜  FB maintenance module
│   ├── /schedules                   P4   ⬜  Preventive
│   ├── /work-orders                 P4   ⬜
│   │   └── /[id]                    P4   ⬜
│   ├── /parts                       P4   ⬜  Inventory
│   └── /faults                      P4   ⬜  Driver-reported
│
├── /billing                         P4   ⬜
│   ├── /charges                     P4   ⬜  Trip charges
│   ├── /accounts                    P4   ⬜  Ledger chart of accounts
│   ├── /invoices                    P4   ⬜
│   │   └── /[id]                    P4   ⬜
│   ├── /rates                       P4   ⬜  Service rates / lanes
│   └── /gst                         P4   ⬜  GST reports export
│
├── /reports                         P3  ⬜  Analytics hub
│   ├── /operations                  P3  ⬜  Trips, SLA, exceptions
│   ├── /lanes                       P3  ⬜  Corridor performance
│   ├── /fleet-utilization           P3   ⬜
│   ├── /network                     P3   ⬜  Partner performance
│   ├── /clients                     P3   ⬜  Shipper scorecards
│   └── /custom                      P5   ⬜  Report builder
│
├── /integrations                    P3   ⬜  Integration health
│   ├── /fleetbase                   P3   ⬜  API status (admin)
│   ├── /tranzfort                   P3   ⬜  Sync logs, webhook config
│   ├── /webhooks                    P3  ⬜  Outbound subscriptions
│   ├── /events                      P3   ⬜  Platform + telematics events
│   ├── /logs                        P3   ⬜  API request logs
│   ├── /sockets                     P3   ⬜  SocketCluster channel viewer
│   ├── /telematics                  P4   ⬜  Samsara, Geotab, Flespi
│   ├── /fuel-providers              P4   ⬜  Fuel card integrations
│   ├── /devices                     P4   ⬜  IoT device registry
│   ├── /sensors                     P4   ⬜  Sensor readings
│   ├── /traccar                     P4   ⬜  GPS hardware
│   ├── /whatsapp                    P4   ⬜  Notification channel
│   └── /tally                       P4   ⬜  Accounting export
│
├── /settings                        P3  ⬜  Org settings
│   ├── /organization                P3  ⬜  Profile, GSTIN, logo, branding
│   ├── /navigator                   P3   ⬜  Driver app config (FB navigator-app)
│   ├── /routing                     P3   ⬜  Valhalla/OSRM/VROOM defaults
│   ├── /scheduling                  P3   ⬜  Shift + constraint defaults
│   ├── /payments                    P4   ⬜  Payment gateway (SKIP initial)
│   ├── /users                       P3  ⬜  User CRUD + invite (IAM)
│   ├── /roles                       P3  ⬜  Roles (IAM)
│   ├── /policies                    P3   ⬜  Policies (IAM)
│   ├── /groups                      P3   ⬜  Groups (IAM)
│   ├── /notifications               P3  ⬜  Alert rules
│   ├── /security                    P4   ⬜  2FA org settings
│   ├── /map                         P3  ⬜  Map provider, geofences
│   ├── /geofences                   P3   ⬜  Plant / weighbridge zones
│   ├── /dispatch                    P3  ⬜  Board columns, orchestrator
│   ├── /order-types                 P3   ⬜  Order configurations
│   │   └── /[id]                    P3   ⬜  Flow + custom fields
│   ├── /automation                  P4   ⬜  Status triggers
│   ├── /tracking                    P3  ⬜  Public track page branding
│   ├── /billing                     P4   ⬜  Invoice templates
│   ├── /compliance                  P4   ⬜  LR templates, e-way defaults
│   └── /reports                     P4   ⬜  Scheduled report delivery
│
├── /help                            P3   ⬜  In-app help center
├── /legal/privacy                   P3  ⬜
├── /legal/terms                     P3  ⬜
│
└── /track/[token]                   P2  🟡  Public client tracking (no auth)
```

**Redirects:** `/dashboard` → `/` · `/orders/*` → `/shipments/*`

---

## Module 1 — Authentication & account

| Feature | Phase | Status | Source | Notes |
|---------|-------|--------|--------|-------|
| Email + password login | P2 | ✅ | BFF | Dev session today; NextAuth/SSO P2B |
| Role-based redirect after login | P2 | ✅ | BFF | dispatcher → `/`, client → `/shipments` |
| Session cookie + middleware | P2 | ✅ | BFF | |
| Forgot password flow | P3 | ⬜ | BFF | Email via SMTP |
| Password reset token page | P3 | ⬜ | BFF | |
| User profile (`/profile`) | P3 | ⬜ | BFF | Name, phone, password change |
| SSO (Google / Microsoft) | P3 | ⬜ | BFF | Enterprise shippers |
| MFA / TOTP | P4 | ⬜ | BFF | Admin + finance roles |
| Partner mobile auth bridge | P3 | ⬜ | TZ | TranZfort app token exchange |
| Audit log: login events | P3 | ⬜ | BFF | |

---

## Module 2 — App shell & global UX

| Feature | Phase | Status | Source | Notes |
|---------|-------|--------|--------|-------|
| Navy sidebar + top bar | P2 | ✅ | UI | |
| Role-based nav visibility | P2 | ✅ | BFF | See [navigation-by-role.md](./product/navigation-by-role.md) |
| Page header + breadcrumbs | P2 | 🟡 | UI | Breadcrumbs P2B |
| KPI card component | P2 | ✅ | UI | |
| Data source badge (Fleetbase/dev) | P2 | ✅ | BFF | |
| Global search (⌘K) | P3 | ⬜ | BFF | Shipments, drivers, vehicles, clients |
| Notification bell + dropdown | P3 | ⬜ | BFF | Real-time via WS |
| Notification inbox page | P3 | ⬜ | BFF | `/notifications` |
| User menu + sign out | P2 | ✅ | BFF | |
| Collapsible sidebar | P3 | ⬜ | UI | |
| Mobile bottom nav (client role) | P3 | ⬜ | UI | Track · Documents · Account |
| Tablet-optimized dispatch | P3 | ⬜ | UI | Touch-friendly Kanban |
| Dark mode | P4 | ⬜ | UI | Deferred unless demand |
| Hindi UI strings | P4 | ⬜ | UI | Driver-facing first |
| Loading skeletons (all lists) | P3 | ⬜ | UI | |
| Empty states + microcopy | P3 | ⬜ | UI | [microcopy.md](./design/microcopy.md) |
| Error boundaries + retry | P3 | ⬜ | UI | |
| Toast notifications | P2 | ✅ | UI | Sonner |
| Org switcher (multi-tenant) | P3 | ⬜ | BFF | FB org badge |
| Locale / language selector | P4 | ⬜ | UI | FB has 15+ locales |
| Chat / internal messaging | — | SKIP | — | FB chat tray — use WhatsApp |
| Customizable dashboard widgets | P4 | ⬜ | UI | FB home dashboard |
| Navigation pin/reorder prefs | P3 | ⬜ | UI | FB extension nav customizer |
| View modes: Kanban / table / map | P3 | ⬜ | UI | FB orders tri-view |

---

## Module 3 — Command Center (`/`)

| Feature | Phase | Status | Source | Notes |
|---------|-------|--------|--------|-------|
| KPI: active trips | P2 | ✅ | FB/BFF | |
| KPI: exceptions | P2 | ✅ | BFF | Derived rules |
| KPI: at plant | P2 | ✅ | BFF | |
| KPI: network overflow | P2 | ✅ | TZ/BFF | |
| Exception queue (actionable list) | P2 | ✅ | BFF | Late ETA, stale GPS, unassigned |
| Activity feed | P2 | ✅ | BFF | Audit-style events |
| Mini live map | P2 | 🟡 | FB/BFF | Mapbox token required |
| TranZfort sync status banner | P2 | 🟡 | TZ/BFF | |
| Click KPI → filtered shipments | P3 | ⬜ | UI | |
| WebSocket auto-refresh | P3 | ⬜ | FB | KPIs + exceptions live |
| Customizable widget layout | P4 | ⬜ | UI | Admin drag widgets |
| Shift handoff summary | P3 | ⬜ | BFF | Export PDF for ops |
| Weather / corridor alerts | P5 | ⬜ | External | Monsoon, fog corridors |

---

## Module 4 — Shipments (`/shipments`)

### List

| Feature | Phase | Status | Source | Notes |
|---------|-------|--------|--------|-------|
| Shipments table | P2 | 🟡 | FB | Live when key set |
| Tabs: All / Active / Completed / Exceptions | P2 | ✅ | BFF | |
| Status chips + origin badge (fleet/network) | P2 | ✅ | UI | |
| Filter drawer (date, corridor, client, status) | P3 | ⬜ | BFF | |
| Full-text search | P3 | ⬜ | BFF | public_id, LR, client |
| Pagination (25/50/100) | P3 | ⬜ | BFF | |
| Column sort | P3 | ⬜ | UI | |
| Saved views / filters | P3 | ⬜ | BFF | Per-user |
| Bulk actions (assign, export, cancel) | P3 | ⬜ | FB/BFF | |
| Export CSV / Excel | P3 | ⬜ | BFF | |
| Mobile card list view | P3 | ⬜ | UI | |
| Real-time row updates | P3 | ⬜ | FB WS | |

### Create & edit

| Feature | Phase | Status | Source | Notes |
|---------|-------|--------|--------|-------|
| Create shipment wizard (`/shipments/new`) | P3 | ⬜ | FB | 4-step: client, route, load, review |
| Quick create from dispatch column | P3 | ⬜ | FB | Minimal fields |
| Edit shipment (pre-dispatch) | P3 | ⬜ | FB | |
| Duplicate shipment | P3 | ⬜ | BFF | |
| Cancel shipment + reason | P3 | ⬜ | FB | |
| Import CSV bulk create | P3 | ⬜ | BFF | |
| Template: recurring lane | P3 | ⬜ | BFF | Cement corridor presets |
| TranZfort booking auto-create | P2 | 🟡 | TZ→FB | Shadow sync worker |

### Detail (`/shipments/[id]`)

| Feature | Phase | Status | Source | Notes |
|---------|-------|--------|--------|-------|
| Header: public ID, status, client | P2 | ✅ | FB | |
| Trip facts card (route, commodity, tonnage) | P2 | ✅ | FB | |
| Assignment card (driver, vehicle) | P2 | ✅ | FB | |
| Timeline (status history) | P2 | 🟡 | FB | Full FB activity feed P2B |
| Assign driver drawer | P2 | ✅ | FB | |
| Copy / generate track link | P2 | ✅ | BFF | |
| Documents list | P2 | 🟡 | FB | proofs API |
| Document upload (LR, attachments) | P3 | ⬜ | FB | |
| ePOD gallery (images) | P3 | ⬜ | FB | proofs |
| Embedded live map | P3 | ⬜ | FB | Single shipment route |
| Live ETA + delay reason | P3 | ⬜ | FB/BFF | |
| Weighbridge events | P3 | ⬜ | BFF | India-specific meta |
| Plant window / slot | P3 | ⬜ | BFF | meta.plant_window |
| LR number field | P2 | 🟡 | FB meta | |
| GST / invoice link | P4 | ⬜ | BFF | |
| Internal notes (ops only) | P3 | ⬜ | BFF | |
| Client-visible notes | P3 | ⬜ | BFF | |
| Audit trail tab | P3 | ⬜ | BFF | Who changed what |
| Shipper read-only view | P3 | ⬜ | RBAC | Scoped to client org |
| Print trip sheet / LR | P3 | ⬜ | UI | PDF |

### India compliance fields

See [india-compliance-fields.md](./product/india-compliance-fields.md).

| Field | Phase | Source |
|-------|-------|--------|
| LR number | P2 | FB meta |
| Tonnage (MT) | P2 | FB meta |
| Commodity | P2 | FB meta |
| e-way bill number | P4 | BFF meta |
| GSTIN (client) | P4 | FB customer |
| Weighbridge slip | P3 | FB proofs |
| Plant entry/exit timestamps | P3 | BFF meta |

---

## Module 5 — Dispatch (`/dispatch`)

| Feature | Phase | Status | Source | Notes |
|---------|-------|--------|--------|-------|
| Kanban: Unassigned / Assigned / In progress / Completed | P2 | 🟡 | FB | |
| Card: shipment ID, route, client, tonnage | P2 | ✅ | FB | |
| Assign from card (drawer) | P2 | ✅ | FB | |
| TranZfort sync banner | P2 | 🟡 | TZ | |
| Column counts | P3 | ⬜ | UI | |
| Drag-and-drop cards | P3 | ⬜ | UI | |
| Send to TranZfort (overflow) | P3 | ⬜ | TZ | When own fleet full |
| Auto-assign suggestions | P5 | ⬜ | AI | Nearest available driver |
| Calendar scheduled view | P3 | ⬜ | FB | |
| Route optimization preview | P3 | ⬜ | FB/OSRM | |
| Multi-stop / milk run | P4 | ⬜ | FB | |
| Ad-hoc dispatch | P3 | ⬜ | FB | fleetops:dispatch-adhoc |
| Real-time column updates | P3 | ⬜ | FB WS | |
| Filter by corridor / client | P3 | ⬜ | BFF | |
| Dispatcher workload view | P3 | ⬜ | BFF | Trips per dispatcher |

---

## Module 6 — Live map (`/map`)

| Feature | Phase | Status | Source | Notes |
|---------|-------|--------|--------|-------|
| Fullscreen map (Mapbox) | P2 | 🟡 | UI | Token required |
| Vehicle markers (orange / gray stale) | P2 | 🟡 | FB WS | |
| Pickup / drop pins | P2 | 🟡 | FB/BFF | |
| Route polyline per shipment | P3 | ⬜ | FB/OSRM | |
| Filter: all / own fleet / network / delayed | P2 | 🟡 | BFF | |
| Side panel: active vehicles | P2 | ✅ | BFF | |
| Marker click → shipment summary | P3 | ⬜ | UI | |
| Cluster markers (zoom < 10) | P3 | ⬜ | UI | |
| Geofences (plant, weighbridge) | P3 | ⬜ | FB | Toggle layer |
| Traffic layer | P4 | ⬜ | Mapbox | Off by default |
| Kiosk / TV mode (`?kiosk=1`) | P3 | ⬜ | UI | Hide chrome, auto-refresh |
| Share map snapshot link | P4 | ⬜ | BFF | Time-limited |
| Historical route playback | P4 | ⬜ | FB | |
| `GET /api/map/vehicles` | P2 | ✅ | BFF | Marker API |

---

## Module 7 — Fleet (`/fleet`)

### Vehicles

| Feature | Phase | Status | Source | Notes |
|---------|-------|--------|--------|-------|
| Vehicles table | P2 | 🟡 | FB | Mock fallback |
| Registration, type, capacity | P2 | ✅ | FB | |
| Status: available / on trip / maintenance | P2 | ✅ | FB | |
| Doc expiry traffic-light badges | P2 | ✅ | BFF | valid / expiring / expired |
| Expiring docs banner | P2 | ✅ | BFF | |
| Vehicle detail page | P3 | ⬜ | FB | `/fleet/vehicles/[id]` |
| Create / edit vehicle | P3 | ⬜ | FB | |
| Document upload (RC, insurance, fitness) | P3 | ⬜ | FB | |
| Assign default driver | P3 | ⬜ | FB | |
| Telematics device link (Traccar) | P4 | ⬜ | Traccar | |
| Fuel / odometer log | P4 | ⬜ | FB | Per vehicle detail |
| Fuel reports (fleet-wide) | P4 | ⬜ | FB | `/fleet/fuel/reports` |
| Fuel transactions | P4 | ⬜ | FB | `/fleet/fuel/transactions` |
| Issues / fault reports | P4 | ⬜ | FB | `/fleet/issues` |
| Vehicle utilization chart | P3 | ⬜ | BFF | |

### Drivers

| Feature | Phase | Status | Source | Notes |
|---------|-------|--------|--------|-------|
| Drivers table | P2 | 🟡 | FB | |
| Name, phone, license, expiry | P2 | ✅ | FB | |
| Status: on duty / off / on trip | P2 | ✅ | FB | |
| Driver detail page | P3 | ⬜ | FB | |
| Create / edit driver | P3 | ⬜ | FB | |
| License document upload | P3 | ⬜ | FB | |
| Assign vehicle | P3 | ⬜ | FB | |
| Driver scorecard (safety, on-time) | P3 | ⬜ | BFF | |
| Navigator app deep link | P3 | ⬜ | FB | Fleetbase Navigator |

### Places & yards

| Feature | Phase | Status | Source | Notes |
|---------|-------|--------|--------|-------|
| Places list (plants, weighbridges, depots) | P3 | ⬜ | FB | |
| Place detail + geofence radius | P3 | ⬜ | FB | |
| Map picker for coordinates | P3 | ⬜ | UI | |

### Compliance dashboard

| Feature | Phase | Status | Source | Notes |
|---------|-------|--------|--------|-------|
| Fleet-wide doc expiry calendar | P3 | ⬜ | BFF | |
| Block dispatch on expired docs | P3 | ⬜ | BFF | Hard rule |
| Compliance export for audits | P4 | ⬜ | BFF | |

---

## Module 8 — Network / TranZfort (`/network`)

| Feature | Phase | Status | Source | Notes |
|---------|-------|--------|--------|-------|
| Overflow queue (unassigned TZ bookings) | P3 | ⬜ | TZ | Core differentiator |
| Accept / reject partner load | P3 | ⬜ | TZ | |
| Partner assignments list | P3 | ⬜ | TZ | |
| Partner registry (verified fleets) | P3 | ⬜ | TZ | |
| Partner performance score | P3 | ⬜ | BFF | On-time, ePOD rate |
| Sync health dashboard | P3 | ⬜ | TZ/BFF | `/network/sync` |
| Manual sync trigger | P2 | ✅ | BFF | `POST /api/sync/run` |
| Two-way status sync | P3 | ⬜ | TZ↔FB | |
| Partner payment visibility | P4 | ⬜ | TZ | Read-only for partners |
| Network vs own-fleet visual badge | P2 | ✅ | UI | Origin badge everywhere |

---

## Module 9 — Clients / shippers (`/clients`)

| Feature | Phase | Status | Source | Notes |
|---------|-------|--------|--------|-------|
| Client org list | P3 | ⬜ | FB customers | |
| Client detail (contacts, GSTIN, lanes) | P3 | ⬜ | FB | |
| Contract programs | P3 | ⬜ | BFF | SLAs per client |
| Client portal invite | P3 | ⬜ | BFF | client@ role |
| Lane preferences | P3 | ⬜ | BFF | Amravati–Nagpur cement |
| Client shipment history | P3 | ⬜ | FB | Filtered list |
| Client-facing reports | P3 | ⬜ | BFF | |

---

## Module 10 — Documents (`/documents`)

| Feature | Phase | Status | Source | Notes |
|---------|-------|--------|--------|-------|
| Global document library | P3 | ⬜ | FB | LR, ePOD, invoices |
| Filter by type / shipment / date | P3 | ⬜ | FB | |
| Full-text search on doc name | P3 | ⬜ | BFF | |
| Bulk download ZIP | P3 | ⬜ | BFF | |
| OCR extract LR fields | P5 | ⬜ | AI | |
| Document retention policy | P4 | ⬜ | BFF | |

---

## Module 11 — Public tracking (`/track/[token]`)

| Feature | Phase | Status | Source | Notes |
|---------|-------|--------|--------|-------|
| Mobile-first layout | P2 | ✅ | UI | |
| Status + ETA | P2 | ✅ | FB/BFF | |
| Route summary | P2 | ✅ | FB | |
| Branded header (ZAFTYS logo) | P2 | ✅ | UI | |
| Live map (single shipment) | P2 | 🟡 | FB | |
| Customer-safe timeline | P3 | ⬜ | BFF | Hide internal events |
| ePOD download when delivered | P3 | ⬜ | FB | |
| HMAC token + expiry | P3 | ⬜ | BFF | Security |
| Rate limit / abuse protection | P3 | ⬜ | BFF | |
| WhatsApp share track link | P4 | ⬜ | WhatsApp | |
| Email track link from detail | P3 | ⬜ | BFF | |
| White-label track page per client | P4 | ⬜ | BFF | Settings |

---

## Module 12 — Maintenance (`/maintenance`)

| Feature | Phase | Status | Source | Notes |
|---------|-------|--------|--------|-------|
| Maintenance schedules | P4 | ⬜ | FB | |
| Work orders list + detail | P4 | ⬜ | FB | |
| Parts inventory | P4 | ⬜ | FB | |
| Block vehicle on open WO | P4 | ⬜ | BFF | Dispatch integration |
| Maintenance cost reports | P4 | ⬜ | FB | |

---

## Module 13 — Billing & finance (`/billing`)

| Feature | Phase | Status | Source | Notes |
|---------|-------|--------|--------|-------|
| Trip charges (rate × tonnage × lane) | P4 | ⬜ | BFF | |
| Invoice generation | P4 | ⬜ | BFF | GST-compliant |
| Invoice PDF | P4 | ⬜ | BFF | |
| Tally export | P4 | ⬜ | Tally | |
| e-way bill integration | P4 | ⬜ | Govt API | |
| Service rate cards | P4 | ⬜ | FB | |
| Credit notes / adjustments | P4 | ⬜ | BFF | |
| Payment status (received / pending) | P4 | ⬜ | BFF | |
| Partner settlement (network) | P4 | ⬜ | TZ/BFF | Internal only |

---

## Module 14 — Reports & analytics (`/reports`)

| Feature | Phase | Status | Source | Notes |
|---------|-------|--------|--------|-------|
| Operations dashboard | P3 | ⬜ | BFF | Trips, SLA |
| Lane performance | P3 | ⬜ | BFF | Amravati–Nagpur etc. |
| Exception trends | P3 | ⬜ | BFF | |
| Fleet utilization | P3 | ⬜ | FB/BFF | |
| Network partner scorecards | P3 | ⬜ | TZ | |
| Client scorecards | P3 | ⬜ | BFF | |
| Custom report builder | P5 | ⬜ | BFF | |
| Scheduled email reports | P4 | ⬜ | BFF | |
| Export PDF / CSV | P3 | ⬜ | BFF | |
| Embedded charts (command center) | P3 | ⬜ | UI | |

---

## Module 15 — Integrations (`/integrations`)

| Feature | Phase | Status | Source | Notes |
|---------|-------|--------|--------|-------|
| Integration health overview | P3 | ⬜ | BFF | |
| Fleetbase: API status, latency | P2 | 🟡 | BFF | `/api/health` |
| TranZfort: sync logs, last run | P2 | 🟡 | BFF | `/api/sync/status` |
| API keys admin UI | P3 | ⬜ | FB | Roll, rename, export |
| Webhook subscriptions + delivery log | P3 | ⬜ | FB | |
| SocketCluster channel viewer | P3 | ⬜ | FB | Debug GPS streams |
| Telematics providers | P4 | ⬜ | FB | Samsara, Geotab, Flespi |
| Fuel provider integrations | P4 | ⬜ | FB | Fuel cards |
| Device + sensor registry | P4 | ⬜ | FB | Attach to vehicles |
| Connectivity events inbox | P4 | ⬜ | FB | Unprocessed alerts |
| Traccar GPS bridge | P4 | ⬜ | Traccar | |
| WhatsApp notifications | P4 | ⬜ | WhatsApp | |
| Tally accounting | P4 | ⬜ | Tally | |
| Webhook inbound (FB → BFF) | P3 | ⬜ | FB | Status changes |
| Webhook outbound (BFF → client ERP) | P4 | ⬜ | BFF | |

---

## Module 16 — Settings & admin (`/settings`)

| Feature | Phase | Status | Source | Notes |
|---------|-------|--------|--------|-------|
| Organization profile | P3 | ⬜ | BFF | Name, logo, GSTIN |
| User management (invite, deactivate) | P3 | ⬜ | BFF | |
| Role & permission editor | P3 | ⬜ | BFF | See RBAC doc |
| Notification rules | P3 | ⬜ | BFF | Email, in-app |
| Map settings (provider, style) | P3 | ⬜ | BFF | |
| Dispatch board configuration | P3 | ⬜ | BFF | Column names |
| Orchestrator phase defaults | P3 | ⬜ | FB | `/settings/dispatch` |
| Routing engine config | P3 | ⬜ | FB | Valhalla/OSRM/VROOM |
| Navigator app branding | P3 | ⬜ | FB | `/settings/navigator` |
| Map provider defaults | P3 | ⬜ | BFF | Mapbox for TSM |
| Public tracking branding | P3 | ⬜ | BFF | |
| API keys for external integrations | P3 | ⬜ | BFF | |
| Audit log (admin) | P3 | ⬜ | BFF | |
| Data export / GDPR | P4 | ⬜ | BFF | |

---

## Module 17 — Realtime & background jobs

| Feature | Phase | Status | Source | Notes |
|---------|-------|--------|--------|-------|
| WebSocket: shipment status changed | P3 | ⬜ | FB SC | |
| WebSocket: vehicle location | P3 | ⬜ | FB SC | Throttle 5s |
| Stale GPS detection (>15 min) | P3 | ⬜ | BFF | → exception queue |
| TranZfort poll / webhook worker | P2 | 🟡 | TZ | `npm run sync:tranzfort` |
| Scheduled sync (cron) | P3 | ⬜ | BFF | Every 60s |
| Dead letter queue for failed sync | P3 | ⬜ | BFF | |
| Push notifications (browser) | P3 | ⬜ | BFF | |

---

## Module 18 — Notifications & alerts

| Feature | Phase | Status | Source | Notes |
|---------|-------|--------|--------|-------|
| In-app notification inbox | P3 | ⬜ | BFF | |
| Exception alerts (late, stale GPS) | P3 | ⬜ | BFF | |
| Doc expiry alerts | P3 | ⬜ | BFF | |
| New TranZfort booking alert | P3 | ⬜ | TZ | |
| Email to dispatcher | P3 | ⬜ | SMTP | |
| WhatsApp to client (status) | P4 | ⬜ | WhatsApp | |
| SMS to driver | P4 | ⬜ | Twilio | |
| Alert preferences per user | P3 | ⬜ | BFF | |

---

## Module 19 — AI & decision support (P5+)

| Feature | Phase | Source | Notes |
|---------|-------|--------|-------|
| Predictive delay alerts | P5 | AI | Historical lane data |
| Smart ETA | P5 | AI | Traffic + plant windows |
| Auto-dispatch suggestions | P5 | AI | Capacity + proximity |
| Document OCR (LR, weighbridge) | P5 | AI | |
| Demand forecast by lane | P5 | AI | |
| Natural language ops query | P5 | AI | "Show late cement trips today" |

---

## Module 20 — Orchestrator & route optimization

| Feature | Phase | Status | Source | FB reference |
|---------|-------|--------|--------|--------------|
| Orchestrator workbench UI | P3 | ⬜ | FB | Multi-phase pipeline review |
| Phase: vehicle allocation | P3 | ⬜ | FB | Payload/capacity matching |
| Phase: driver allocation | P3 | ⬜ | FB | Skills, shift, proximity |
| Phase: route optimization | P3 | ⬜ | FB/vroom | VROOM extension |
| Hands-free auto-orchestrate | P4 | ⬜ | FB | `/settings/dispatch` |
| Manual override + re-run | P3 | ⬜ | FB | Workbench actions |
| Optimization audit log | P3 | ⬜ | BFF | Which plan was applied |

---

## Module 21 — Order configuration & automation

| Feature | Phase | Status | Source | FB reference |
|---------|-------|--------|--------|--------------|
| Order types list | P3 | ⬜ | FB | Cement, steel, FMCG templates |
| Activity flow designer | P4 | ⬜ | FB | Drag-drop status lifecycle |
| Custom fields per type | P3 | ⬜ | FB | LR, tonnage, commodity |
| Validation rules | P4 | ⬜ | FB | Required before dispatch |
| Automation on status change | P4 | ⬜ | FB | Triggers + webhooks |
| Industry templates (India) | P3 | TSM+ | Pre-built for corridors |

---

## Module 22 — IAM & access control

| Feature | Phase | Status | Source | FB reference |
|---------|-------|--------|--------|--------------|
| Users CRUD + invite | P3 | ⬜ | FB IAM | Pending/active/inactive |
| Roles (org-managed) | P3 | ⬜ | FB IAM | Dispatcher, fleet, client |
| FLB managed roles (read-only) | P3 | ⬜ | FB IAM | Map to our RBAC |
| Policies | P3 | ⬜ | FB IAM | Reusable bundles |
| Groups | P3 | ⬜ | FB IAM | Bulk assignment |
| Permission picker (granular) | P3 | ⬜ | FB IAM | Per-resource |
| View resolved permissions | P3 | ⬜ | FB IAM | Debug access |
| Customer users (client portal) | P3 | ⬜ | FB IAM | Shipper logins |
| Driver users (Navigator link) | P3 | ⬜ | FB IAM | Field identity |
| IAM dashboard KPIs | P3 | ⬜ | FB IAM | Active/dormant users |

---

## Module 23 — Developers & integrations

| Feature | Phase | Status | Source | FB reference |
|---------|-------|--------|--------|--------------|
| API key management (admin) | P2 | 🟡 | FB | `flb_live_…` in env today |
| Webhook subscriptions | P3 | ⬜ | FB | order.*, driver.* events |
| Webhook signing + retry | P3 | ⬜ | FB | |
| Webhook test console | P3 | ⬜ | FB | |
| SocketCluster consumer (BFF) | P3 | ⬜ | FB | GPS + status streams |
| API request logs | P3 | ⬜ | FB | |
| Platform event log | P3 | ⬜ | FB | |
| Socket channel debugger | P3 | ⬜ | FB | `/integrations/sockets` |

---

## Module 24 — Service rates & quotes

| Feature | Phase | Status | Source | FB reference |
|---------|-------|--------|--------|--------------|
| Service rate cards | P4 | ⬜ | FB | Distance, weight, zone |
| Rate attached to order type | P4 | ⬜ | FB | Auto-calc on dispatch |
| On-demand quote | P4 | ⬜ | FB | Pre-booking pricing |
| Quote → shipment conversion | P4 | ⬜ | FB | |
| India-specific rate rules | P4 | TSM+ | Per MT, corridor, GST |

---

## Coverage summary (Jul 2026 audit)

| Category | Fleetbase features audited | TSM P1–P2 done | TSM planned |
|----------|---------------------------|--------------|-------------|
| Platform shell | 18 | 4 | 14 |
| Fleet-Ops Operations | 28 | 3 | 25 |
| Fleet-Ops Resources | 28 | 4 | 24 |
| Fleet-Ops Maintenance | 7 | 0 | 7 |
| Fleet-Ops Connectivity | 9 | 0 | 9 |
| Fleet-Ops Analytics | 7 | 0 | 7 |
| Fleet-Ops Settings | 12 | 0 | 12 |
| IAM | 12 | 1 | 11 |
| Developers | 10 | 1 | 9 |
| Ledger / billing | 5 | 0 | 5 |
| Customer portal | 3 | 1 | 2 |
| Navigator (mobile) | 6 | 0 | 6 (via FB app) |
| Storefront | 4 | — | SKIP |
| AI engine | 2 | 0 | P5 |
| **TSM-only (TranZfort, India)** | — | 3 | 12+ |
| **Total unique features** | **~151** | **~17** | **~130+** |

**Reality:** Fleetbase console exposes ~150 distinct UI capabilities. TSM P1 foundation + P2 in progress (~17 features). Full build targets ~130+ remaining — see [build-strategy.md](./architecture/build-strategy.md).

---

## Fleetbase → TSM crosswalk (quick lookup)

| Fleetbase console section | TSM primary route | Priority |
|---------------------------|-------------------|----------|
| Home dashboard | `/` | P0 |
| Orders (kanban/table/map) | `/dispatch`, `/shipments`, `/map` | P0 |
| Scheduler | `/dispatch/calendar` | P1 |
| Orchestrator | `/dispatch/orchestrator` | P2 |
| Order configurations | `/settings/order-types` | P2 |
| Service rates | `/billing/rates` | P3 |
| Customers | `/clients` | P1 |
| Drivers | `/fleet` → drivers | P0 |
| Vehicles | `/fleet` → vehicles | P0 |
| Fleets (groups) | `/fleet/groups` | P2 |
| Places | `/fleet/places` | P1 |
| Vendors / contacts | `/vendors`, `/clients/[id]/contacts` | P3–P4 |
| Fuel reports / transactions | `/fleet/fuel/*` | P4 |
| Issues / faults | `/fleet/issues` | P4 |
| Live map + sidebar panels | `/map` | P0 |
| Customer tracking | `/track/[token]` | P0 |
| Maintenance | `/maintenance/*` | P3 |
| Telematics / devices / sensors | `/integrations/*` | P3–P4 |
| Connectivity events | `/integrations/events` | P4 |
| Reports | `/reports/*` | P1 |
| Fleet-Ops settings | `/settings/*` | P2 |
| IAM → Users / Roles / Policies | `/settings/users|roles|policies` | P1 |
| Developers → API keys | env + `/integrations/fleetbase` | P0 |
| Developers → Webhooks / logs / sockets | `/integrations/*` | P1–P3 |
| Ledger → Invoices / accounts | `/billing/*` | P3 |
| Navigator app | Fleetbase mobile (not TSM) | — |
| Customer portal engine | `/track/[token]` + client role | P1 |
| Storefront | SKIP | — |
| Extensions marketplace | SKIP | — |
| AI engine | P5 decision support | P5 |
| TranZfort overflow | `/network/overflow` | P1 **TSM+** |

**Settings sub-nav (mirrors Fleetbase IAM + Fleet-Ops config):** Users · Roles · Policies · Groups · Order types · Geofences · Dispatch/orchestrator · Routing · Navigator · Tracking branding

---

## Sidebar navigation (full target)

| Nav item | Route | Roles | Phase |
|----------|-------|-------|-------|
| Command Center | `/` | admin, dispatcher | P2 |
| Shipments | `/shipments` | all authenticated | P2 |
| Dispatch | `/dispatch` | admin, dispatcher | P2 |
| Live Map | `/map` | admin, dispatcher | P2 |
| Fleet | `/fleet` | admin, dispatcher, fleet_manager | P2 |
| Network | `/network` | admin, dispatcher, partner | P3 |
| Clients | `/clients` | admin, dispatcher | P3 |
| Documents | `/documents` | admin, dispatcher, fleet_manager, client | P3 |
| Maintenance | `/maintenance` | admin, fleet_manager | P4 |
| Billing | `/billing` | admin, finance | P4 |
| Reports | `/reports` | admin, dispatcher, client | P3 |
| Integrations | `/integrations` | admin | P3 |
| Settings | `/settings` | admin | P3 |

Detail: [navigation-by-role.md](./product/navigation-by-role.md)

---

## Fleetbase parity map (legacy summary)

See **Fleetbase console audit** and **crosswalk** sections above for the full mapping. High-level:

| Fleetbase area | TSM module | Build? |
|----------------|------------|--------|
| Fleet-Ops Operations (orders, scheduler, orchestrator) | Shipments + Dispatch + Settings | ✅ Custom UI |
| Fleet-Ops Resources | Fleet + Clients + Places | ✅ Custom UI |
| Fleet-Ops Maintenance | `/maintenance` | P4 |
| Fleet-Ops Connectivity | `/integrations/telematics` | P4 |
| Fleet-Ops Analytics | `/reports` | P3 |
| IAM | `/settings/users|roles|policies` | P3 |
| Developers | `/integrations/*` | P3 |
| Ledger | `/billing` | P4 |
| Navigator mobile | Fleetbase app (headless) | Use FB app |
| Storefront e-commerce | **SKIP** | TranZfort instead |
| Extensions marketplace | **SKIP** | Internal Docker only |
| Admin system config | **SKIP** | DevOps / Docker |
| **TranZfort network** | `/network` | **TSM+ only** |

---

## Recommended build order (full product)

Priority queue to close the “empty vs Fleetbase” gap:

### Sprint A — Live data richness (1–2 weeks)
1. Fleetbase drivers/vehicles/orders on all screens (no mock fallback when connected)
2. Create test orders + assign flow end-to-end
3. Mapbox live tiles + WebSocket GPS markers
4. ePOD + document list from FB proofs API
5. Loading skeletons + empty states

### Sprint B — Operational depth (2–3 weeks)
6. Create shipment wizard
7. Filter drawer + pagination on shipments
8. Vehicle + driver detail pages
9. Global search (⌘K)
10. Notification inbox

### Sprint C — Network & clients (3–4 weeks)
11. TranZfort overflow queue UI
12. Clients module
13. Two-way sync
14. Reports hub (operations + lanes)

### Sprint D — Enterprise (2–3 months)
15. Settings + user management
16. Billing + GST
17. Maintenance module
18. WhatsApp + Tally integrations

---

## Related documents

| Doc | Use |
|-----|-----|
| [Master-TODO.md](./Master-TODO.md) | Task checklist |
| [feature-backlog.md](./product/feature-backlog.md) | Feature IDs |
| [portal-sitemap.md](./product/portal-sitemap.md) | Short route list (legacy) |
| [ui-ux-features.md](./ui-ux-features.md) | Per-screen UX detail |
| [user-roles-rbac.md](./product/user-roles-rbac.md) | Permissions matrix |
| [fleetbase-entity-map.md](./integrations/fleetbase-entity-map.md) | API field mapping |

---

## Document history

| Date | Change |
|------|--------|
| 11 Jul 2026 | Initial comprehensive sitemap — P1 through P6 |
| 11 Jul 2026 | Full product phases; frontend-first build strategy |
| 2 Aug 2026 | Backend source: TSM Postgres target; FB legacy (ADR-008) |
