# OSS Strategy

| Field | Value |
|-------|-------|
| **Parent** | [app-overview.md](../app-overview.md) |
| **ADR** | [008-tsm-owns-execution.md](../decisions/008-tsm-owns-execution.md) (supersedes [001](../decisions/001-fleetbase-as-backend.md)) |
| **Build strategy** | [build-strategy.md](./build-strategy.md) |

---

## Primary: ZAFTYS TSM (first-party)

| Attribute | Value |
|-----------|-------|
| Product | Multi-tenant SaaS TMS/LOS + TranZfort supplier console |
| Execution SoT | **TSM PostgreSQL** (org-scoped) |
| Customer UI | **100% custom Next.js** (+ thin Tauri desktop) |
| Marketplace | **TranZfort** (not an in-TSM storefront) |
| Docs / AI | First-party ([ADR-009](../decisions/009-documents-and-ai.md)) |

Fleetbase was a **transitional accelerator** (ADR-001). It is **being dropped** (Phases A–D in ADR-008). Do not expand new features on the Fleetbase API.

### Historical Fleetbase extensions (reference only)

Use as **IA inspiration** for sitemap modules — not as runtime dependencies after Phase D.

| Extension | Historical use | TSM target |
|-----------|----------------|------------|
| fleetops-engine | Orders, fleet, map | `PostgresExecutionStore` |
| iam-engine | Users, roles | TSM seats / settings |
| dev-engine | API keys, webhooks | `/integrations/*` |
| ledger-engine | Invoices | `/billing/*` + India docs |
| customer-portal-engine | Tracking | `/track/[token]` |
| vroom + valhalla | Routing | Optional later |
| ai-engine | — | **ADR-009** (Google + OpenRouter), not FB AI |
| storefront-engine | — | **SKIP** — TranZfort |

---

## Supporting OSS

| Project | License | Role |
|---------|---------|------|
| PostgreSQL | PostgreSQL | App + execution DB |
| MinIO | AGPL (ops) / S3 API | Document blobs (or managed S3) |
| Tauri | MIT/Apache | Thin desktop shell |
| Traccar | Apache-2.0 | Optional hardware GPS bridge later |
| Mapbox GL / alternatives | Token / OSS | Maps ([ADR-003](../decisions/003-map-provider.md)) |
| shadcn/ui | MIT | Portal components |
| TanStack Query/Table | MIT | Data UI |
| open_tms | MIT | **Not default** — only if cheaper than thin LOS (ADR-008 rejects by default) |

---

## Skip as TMS core

LoadPartner, OpenTCS, Odoo/ERPNext as core — see [non-goals.md](../product/non-goals.md).  
**Do not** vendor AGPL Fleetbase source into the SaaS codebase.

---

## Build vs buy matrix (full product)

| Capability | TSM approach |
|------------|--------------|
| Orders / dispatch / map | Custom UI + **TSM Postgres** |
| Drivers / vehicles | Custom UI + TSM Postgres |
| Orchestrator / scheduler | Custom UI; route engine optional later |
| Maintenance / telematics | Custom UI + TSM stores; telematics depth later |
| IAM / seats | TSM-only (TZ Admin + team seats) |
| Developers / webhooks | TSM `/integrations/*` |
| Ledger / invoices / LR | TSM billing + document generators |
| Driver mobile | TranZfort trucker for network; own driver app later ([ADR-004](../decisions/004-driver-app-strategy.md)) |
| TranZfort network | **TSM-only desks** — `/network` |
| India GST / Tally / e-way | **TSM-only** — later P5 |
| AI agents | **TSM** BYOK Google + OpenRouter — [ai-agents.md](../product/ai-agents.md) |

---

## Brand rule

Customer-facing: **ZAFTYS TSM™**. Internal docs may mention Fleetbase only as **legacy / migration**.

Never expose: Fleetbase logo, Ember console, `@fleetbase/*` package names to customers.

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Extracted from app-overview |
| 11 Jul 2026 | Full extension matrix, build vs buy for all modules |
| 2 Aug 2026 | Primary SoT = TSM Postgres; Fleetbase transitional/drop (ADR-008) |
