# ZAFTYS TSM / LOS — App Overview

| Field | Value |
|-------|-------|
| **Status** | Canonical app product brief (Jul 2026) |
| **Portal URL** | `https://app.zaftys.com` |
| **Product name** | ZAFTYS TSM™ (Transport & Shipment Management) / ZAFTYS LOS (Logistics Operating System) |
| **Related surfaces** | `zaftys.com` (marketing), `tranzfort.com` (network marketplace) |
| **Sources** | Product brainstorm, `/technology` page, `docs/marketing/project-idea.md`, OSS evaluation (Fleetbase) |

---

## One-line

**ZAFTYS TSM is the operational portal where dispatch, fleet, documentation, and customer visibility come together** — built to run ZAFTYS's own fleet daily and offered to industrial shippers and fleet operators who want the same discipline.

---

## Where this app sits in the ecosystem

ZAFTYS is three capabilities under one operating model:

| Layer | What it is | Surface |
|-------|------------|---------|
| **ZAFTYS Logistics** | Own fleet + professional dispatch on industrial corridors | Operations team, contract programs |
| **ZAFTYS TSM** | Transport & fleet management platform (this app) | `app.zaftys.com` |
| **TranZfort** | Verified partner network for overflow capacity | `tranzfort.com` + mobile app |

**Critical rule:** All commercial transactions run through **ZAFTYS Logistics** with GST-compliant billing. TranZfort is capacity and coordination — not a separate vendor relationship for ZAFTYS clients.

### Messaging hierarchy (always in this order)

1. **ZAFTYS** — the logistics operator and trusted partner  
2. **TSM** — the operational platform  
3. **TranZfort** — verified network capacity when fleet scales  

---

## Problem we solve

Industrial shippers and transporters manage freight through fragmented providers, phone-based coordination, limited visibility, and capacity that does not scale when demand spikes. Generic TMS tools do not handle heavy freight reality: multi-axle assets, plant loading windows, weighbridge loops, and scaling via a verified network when own fleet is full.

---

## Primary users & roles

| Role | Who | Primary needs |
|------|-----|---------------|
| **Dispatcher / Ops** | ZAFTYS internal team | Command center, assign trips, live map, exceptions |
| **Fleet manager** | ZAFTYS internal | Vehicles, drivers, compliance docs, maintenance |
| **Shipper / Client** | Enterprise customers | Track shipments, ePOD, LR, lane reports |
| **Network partner** | TranZfort fleet owners | Assigned loads, status updates, ePOD, payment visibility |
| **Admin** | ZAFTYS leadership | Users, org settings, analytics, audit |

---

## 90-day north star

> **TranZfort booking → sync to LOS Core → dispatcher live map on `app.zaftys.com` → enterprise client tracking**

If this flow works end-to-end, **P2 Operations core** is successful. Full product continues through P3–P6 per [product-scope.md](./product/product-scope.md).

---

## Architecture

### Pattern: headless OSS backend + custom branded UI

Do **not** ship open-source vendor consoles to customers. Build a ZAFTYS-branded Next.js portal that talks to a BFF, which talks to the execution backend API.

```
Enterprise users → app.zaftys.com (Next.js + shadcn, ZAFTYS design tokens)
                        ↓
                   ZAFTYS BFF (auth, tenancy, India adapters)
                        ↓
              Fleetbase FleetOps API (Docker, headless, self-hosted)
                        ↕
              TranZfort sync bridge ↔ Supabase marketplace
```

| Component | Role | Customer-facing? |
|-----------|------|------------------|
| **Next.js portal** (`app.zaftys.com`) | All UI: dispatch, fleet, client tracking | ✅ Yes |
| **ZAFTYS BFF** | Auth, RBAC, field mapping, India adapters | Hidden |
| **Fleetbase FleetOps** | Orders, drivers, vehicles, GPS, ePOD API | ❌ API only |
| **Fleetbase console** (`:4200`) | Dev/ops sandbox during build | Internal only |
| **TranZfort** | Marketplace bookings, partner mobile, overflow | Separate product; syncs in |
| **Traccar** (optional) | Raw GPS device protocols (OBD, trackers) | Supporting layer |

### Three systems (long-term)

| System | Role | Timing |
|--------|------|--------|
| **TranZfort** | System of **Network** | Live (Supabase + Flutter) |
| **ZAFTYS LOS / TSM** | System of **Execution** | This phase |
| **ZAFTYS AI** | System of **Decision** | After data platform |

---

## Open-source strategy

### Primary backend accelerator: Fleetbase FleetOps

| Attribute | Detail |
|-----------|--------|
| **License** | AGPL-3.0 |
| **Use** | Self-hosted Docker, API-only integration |
| **Why** | Mature dispatch, fleet registry, live tracking, REST + WebSocket + webhooks |
| **Customer UI** | Never — custom Next.js only |
| **AGPL mitigation** | Unmodified Fleetbase + API-only SaaS; commercial license option if needed |

### Supporting OSS

| Project | License | Role |
|---------|---------|------|
| **Traccar** | Apache-2.0 | GPS/telematics hardware when mobile app GPS is not enough |
| **open_tms** | MIT | Fallback if AGPL blocks SaaS (accept slower maturity) |
| **Spring TMS** | MIT | Alternative fallback scaffold |

### Skip as TMS core

| Project | Why skip |
|---------|----------|
| **LoadPartner TMS** | US broker focus, wrong segment |
| **OpenTCS** | AGV/warehouse robots, not road freight |
| **Odoo / ERPNext** | ERP fleet modules, not deep TMS/dispatch/map |

### What OSS gives vs what ZAFTYS builds

| From open source (Fleetbase) | ZAFTYS builds custom |
|------------------------------|----------------------|
| Order/trip lifecycle (create → assign → complete) | India trip model: LR, consignor/consignee, axle type, tonnage |
| Drivers, vehicles, fleets registry | RC, fitness, permit, insurance expiry (India fields) |
| Live map + GPS via Navigator driver app | Branded driver experience; TranZfort mobile GPS path |
| ePOD (photos, signatures) via API | LR numbering, weighbridge slip attachment |
| REST + WebSocket + webhooks | BFF, auth, multi-tenant RBAC |
| Route optimization, multi-stop | Plant loading windows, corridor SLAs |
| Service rates / quotes | GST billing, Tally export, e-way bill hooks |
| Maintenance schedules | Indian compliance calendar (PUC, national permit) |
| Customer tracking links (generic) | Branded `track.zaftys.com/{id}` pages |
| Geofence auto-status | Weighbridge / plant gate geofences |

**Brand rule:** Say "accelerated by Fleetbase infrastructure" internally — customer-facing product is **ZAFTYS TSM™**, not "built on Fleetbase."

---

## Platform capabilities (marketing promise → app reality)

From `/technology` — these are the six capability pillars:

| Capability | App modules | OSS backing |
|------------|-------------|-------------|
| **Real-Time GPS Tracking** | Live Map, Command Center, Client tracking | Fleetbase SocketCluster + optional Traccar |
| **Dispatch & Trip Management** | Dispatch board, Shipments, timeline | Fleetbase orders API |
| **Driver Mobile App** | Status + ePOD capture | Fleetbase Navigator OR TranZfort Flutter (TBD) |
| **Fleet Management** | Fleet → Vehicles, Drivers, Documents | Fleetbase fleet/driver/vehicle APIs |
| **Performance Analytics** | Reports (Phase 2+) | Fleetbase analytics + custom BFF aggregates |
| **Digital Documentation** | Shipment docs, ePOD gallery, compliance | Custom storage + Fleetbase proofs API |

### ZAFTYS differentiators (not generic TMS)

1. **Own fleet + TranZfort overflow in one dispatch view**
2. **Industrial freight fields** — axle type, commodity, plant slot, weighbridge loop
3. **GST-compliant document trail** — LR, invoice, ePOD linked per trip
4. **Single billing entity** — all transactions through ZAFTYS Logistics
5. **Corridor-native UX** — industrial lane language (Vidarbha, plant windows)
6. **Verified network handoff** — internal vs network trip, same tracking UX for shipper

---

## Feature brainstorm by role

### 1. ZAFTYS internal ops (build first)

**Command Center**
- Live KPIs: active trips, delayed, at plant, TranZfort overflow count
- Map: own fleet + network partners on one view
- Exception queue: late ETA, route deviation, missing ePOD

**Dispatch**
- Create trip manually or from TranZfort booking
- Assign own driver/vehicle OR push to TranZfort network
- Trip timeline: booked → dispatched → loaded → in transit → delivered
- Bulk dispatch for contract lanes

**Fleet registry**
- Vehicles: registration, axle config, capacity, documents with expiry alerts
- Drivers: license, contact, assigned vehicle, shift status
- Maintenance log + upcoming service

**Documents**
- LR generation / upload
- ePOD gallery per trip
- Invoice attachment, GST references

### 2. Enterprise shipper (client portal)

- Track my shipments (list + map)
- Trip detail: ETA, last location, status history
- Download ePOD, LR, invoice
- Lane performance reports (on-time %, avg transit time)
- Request new movement (creates lead → ops queue; not self-serve dispatch in MVP)

### 3. Fleet operator / TranZfort partner

- Assigned loads from ZAFTYS
- Accept / update status / upload ePOD
- Payment status (via ZAFTYS billing)
- Vehicle and driver compliance upload

### 4. Admin / management

- User & role management (RBAC)
- Org settings, corridors, SLA rules
- Analytics: utilization, lane cost, delay reasons
- Audit log

---

## App navigation (target IA)

```
├── Command Center
├── Shipments
│   ├── All / Active / Completed / Exceptions
│   └── [Detail] Timeline · Map · Docs · ePOD
├── Dispatch
├── Live Map
├── Fleet
│   ├── Vehicles
│   ├── Drivers
│   └── Documents & Compliance
├── Network (TranZfort)
│   ├── Overflow queue
│   └── Partner assignments
├── Clients (shipper accounts)
├── Documents
├── Reports (Phase 2)
└── Settings
```

Full IA defines ~151 routes — see [sitemap-tsm.md](./sitemap-tsm.md). **Build entire frontend first** per [architecture/build-strategy.md](./architecture/build-strategy.md).

---

## P1 foundation screens (complete)

Scaffold shipped; Wave 1 expands to full Fleetbase parity:

| # | Screen | Route | Status |
|---|--------|-------|--------|
| 1 | Login | `/login` | ✅ scaffold |
| 2 | Command Center | `/` | 🟡 |
| 3 | Shipments | `/shipments` | 🟡 |
| 4 | Shipment detail | `/shipments/[id]` | 🟡 |
| 5 | Dispatch | `/dispatch` | 🟡 |
| 6 | Fleet | `/fleet` | 🟡 |
| 7 | Live map | `/map` | 🟡 |
| 8 | Client tracking | `/track/[token]` | 🟡 |

All additional routes in [sitemap-tsm.md](./sitemap-tsm.md) — build frontend first, wire BFF per module.

---

## Feature roadmap matrix

| Feature | P2 Ops | P3 Network | P4 Enterprise | P5 India | P6 AI |
|---------|--------|------------|---------------|----------|-------|
| Login + roles | ✅ | SSO | GSTIN on org profile | — |
| Command Center | ✅ KPI + map | Exception rules | TranZfort overflow widget | Predict delays |
| Shipments list/detail | ✅ | Filters, export | LR fields, tonnage | Smart ETA |
| Dispatch board | ✅ manual assign | Auto-suggest | Plant window constraints | Auto-dispatch |
| Live map | ✅ | Geofences | Weighbridge markers | Route deviation AI |
| Client tracking | ✅ public link | Branded subdomain | WhatsApp status share | — |
| Driver app | Navigator OR TranZfort | Unified | Hindi UI | Voice updates |
| ePOD | ✅ via API | Custom forms | Weighbridge slip | OCR on docs |
| Fleet docs expiry | Basic alerts | Calendar | RC/permit/insurance | — |
| TranZfort sync | Shadow mirror | Two-way | Partner assignment | — |
| Billing | — | Trip charges | GST invoice, Tally | — |
| e-way bill | — | — | Integration | — |
| Maintenance | — | ✅ from Fleetbase | Indian compliance | Predictive |
| Analytics | Basic counts | Lane reports | Corridor benchmarks | Demand forecast |
| WhatsApp alerts | — | Status to client | India-first | — |

---

## Phased delivery plan

| Phase | Weeks | Deliverable |
|-------|-------|-------------|
| **P0 — Spike** | 1–2 | Fleetbase Docker up; API entity map; AGPL decision |
| **P1 — Shadow sync** | 3–5 | TranZfort trip → Fleetbase mirror (no user-facing change) |
| **P2 — Portal (Operations core)** | 6–10 | Full ops UI: Command Center, Shipments, Dispatch, Map, Track |
| **P3 — Network & resources** | 11–16 | TranZfort, clients, reports, IAM |
| **P4 — Enterprise fleet** | 17–24 | Maintenance, connectivity, orchestrator |
| **P5 — India billing** | 25+ | GST, Tally, e-way |
| **P6+** | Year 2+ | AI / analytics platform |

### P0 immediate actions

1. **Legal** — AGPL review: API-only + unmodified Fleetbase OK for `app.zaftys.com` SaaS?
2. **DevOps** — Fleetbase Docker spike (boot, API key, create order/driver/vehicle)
3. **Product** — Full scope in [product-scope.md](./product/product-scope.md); frontend-first per [build-strategy.md](./architecture/build-strategy.md)
4. **Engineering** — Scaffold Next.js app from UI mockup
5. **Engineering** — BFF endpoint: `GET /api/shipments` → Fleetbase orders
6. **Engineering** — Entity map: TranZfort `trips` ↔ Fleetbase order fields

---

## UI & branding

Reuse the marketing site design system on `app.zaftys.com` so the portal feels like one product family.

### Design tokens (from `src/index.css`)

| Token | HSL | Portal usage |
|-------|-----|--------------|
| **Primary / Navy** | `220 60% 15%` | Sidebar, headers, map chrome |
| **Accent (orange)** | `25 100% 55%` | Primary actions, alerts, CTAs |
| **Secondary (steel)** | `215 25% 40%` | Secondary nav, labels |
| **Success (green)** | `145 80% 40%` | Delivered, on-time status |
| **Cyan** | `190 95% 40%` | Map highlights (sparingly) |

### Branding checklist

- [ ] Shared design tokens (navy, orange, typography) with `zaftys.com`
- [ ] ZAFTYS header logo on login, sidebar, public tracking pages
- [ ] Terminology: **Shipment** not Order, **Trip** not Delivery, **LR** not BOL
- [ ] Status chips: Dispatched / In Transit / At Weighbridge / Delivered
- [ ] Map styling: navy overlay, orange vehicle markers
- [ ] Footer: "Powered by ZAFTYS TSM™"
- [ ] Mobile-responsive dispatch board (tablets on dispatch floor)

### What to customize (100% ZAFTYS)

- Layout, nav, command center KPI cards
- Role-based views (Dispatcher vs Shipper vs Fleet Manager)
- Empty states, onboarding, help copy in ZAFTYS voice
- Public tracking page with ZAFTYS logo

### What not to fork for customers

- Fleetbase Ember console (internal sandbox only)
- Vendor driver app UI long-term — white-label or TranZfort path

---

## TranZfort integration

| TranZfort owns | Syncs into TSM |
|----------------|----------------|
| Marketplace bookings | Trip creation in LOS |
| Partner verification | External fleet assignment |
| Mobile GPS from partners | Live map on portal |
| Load search / accept flow | Dispatch overflow queue |

TranZfort stays the **System of Network**. TSM stays the **System of Execution**. Sync bridge is bidirectional in Phase 2+; shadow mirror in P1.

---

## Open decisions

| Question | Options | Notes |
|----------|---------|-------|
| Driver app | Fleetbase Navigator vs TranZfort Flutter vs both | Decide in P0 spike |
| GPS source | Mobile app vs Traccar hardware vs both | Traccar if hardware trackers needed |
| Shipper self-serve booking | Portal form → ops queue vs TranZfort only | MVP: ops queue |
| Billing in v1 | Manual outside app vs basic trip charges | Defer to Phase 2 |
| Multi-tenant SaaS | Internal only first vs sell TSM externally | Internal first; external shippers on client portal |

---

## Related repositories & assets

| Asset | Location | Status |
|-------|----------|--------|
| Marketing site | `MartechEngine/zaftys` (`zaftys-main`) | ✅ Deployed `zaftys.com` |
| Portal app scaffold | `zaftys-app` / `app/` | ⬜ Not built |
| Lab docs + Fleetbase infra | `zaftys-lab` | Docs + Docker spike started |
| TranZfort mobile | `tranzfort-lab` (Flutter + Supabase) | Production marketplace |
| UI mockup (~151 routes) | `mockup-ui-ux-29-june/` (lab) | Reference for scaffold |

---

## Success metrics (directional)

- TranZfort booking visible in TSM within minutes (sync SLA)
- Dispatcher can assign and track on live map without phone calls
- Shipper can self-serve track + download ePOD
- Document expiry alerts prevent compliance gaps
- TSM demo requests convert to active portal users
- Repeat contract programs run on core lanes through the platform

---

## Related docs

| Doc | Path |
|-----|------|
| **Documentation index** | [README.md](./README.md) |
| **UI/UX features spec** | [ui-ux-features.md](./ui-ux-features.md) |
| Product vision (ecosystem) | [../marketing/project-idea.md](../marketing/project-idea.md) |
| Marketing `/technology` copy | [../marketing/copy.md](../marketing/copy.md) |
| Site IA & phases | [../marketing/marketing-website-sitemap-new.md](../marketing/marketing-website-sitemap-new.md) |
| Live technology page | `src/pages/Technology.tsx` |
| Design tokens | `src/index.css` |
| External URLs | `src/lib/constants.ts` → `externalLinks.app` |

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial app overview from Phase 2 brainstorm + OSS evaluation |
| 11 Jul 2026 | Full product scope; frontend-first; MVP terminology removed |
