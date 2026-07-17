# OSS Strategy

| Field | Value |
|-------|-------|
| **Parent** | [app-overview.md](../app-overview.md) |
| **ADR** | [001-fleetbase-as-backend.md](../decisions/001-fleetbase-as-backend.md) |
| **Build strategy** | [build-strategy.md](./build-strategy.md) |

---

## Primary: Fleetbase (full extension stack)

| Attribute | Value |
|-----------|-------|
| License | AGPL-3.0 |
| Use | Self-hosted Docker, **API-only** to customers |
| Customer UI | **100% custom Next.js** — replicate ~151 console features |
| Console `:4200` | Internal dev/ops reference only |
| Mitigation | Unmodified images + BFF boundary; commercial license if required |

### Installed extensions we consume

| Extension | API use | Custom UI module |
|-----------|---------|------------------|
| fleetops-engine | Orders, fleet, map, maintenance, connectivity, analytics | Operations + Resources + Maintenance |
| iam-engine | Users, roles, policies | `/settings/*` |
| dev-engine | API keys, webhooks, logs | `/integrations/*` |
| ledger-engine | Invoices, accounts | `/billing/*` |
| customer-portal-engine | Partial — tracking | `/track/[token]` |
| vroom + valhalla | Routing/orchestrator | `/dispatch/orchestrator` |
| ai-engine | P6 | Reports / decision support |

### Extensions we skip in product

| Extension | Reason |
|-----------|--------|
| storefront-engine | TranZfort marketplace |
| registry-bridge-engine | Internal Docker admin only |

---

## Supporting OSS

| Project | License | Role |
|---------|---------|------|
| Traccar | Apache-2.0 | Hardware GPS bridge |
| Mapbox GL | Proprietary (token) | Maps |
| shadcn/ui | MIT | Portal components |
| TanStack Query/Table | MIT | Data UI |
| open_tms | MIT | Emergency fallback backend |

---

## Skip as TMS core

LoadPartner, OpenTCS, Odoo/ERPNext — see [non-goals.md](../product/non-goals.md).

---

## Build vs buy matrix (full product)

| Fleetbase capability | TSM approach |
|---------------------|--------------|
| Orders / dispatch / map | Custom UI + FB API |
| Drivers / vehicles / fleets | Custom UI + FB API |
| Orchestrator / scheduler | Custom UI + FB + VROOM |
| Maintenance / telematics | Custom UI + FB API |
| IAM | Custom UI + FB IAM API |
| Developers / webhooks | Custom UI + FB dev API |
| Ledger / invoices | Custom UI + FB ledger API |
| Navigator mobile | **Use FB app** — not rebuilt in TSM |
| TranZfort network | **TSM-only** — custom `/network` |
| India GST / Tally | **TSM-only** — BFF adapters |

---

## Brand rule

Customer-facing: **ZAFTYS TSM™**. Internal docs may reference Fleetbase as infrastructure accelerator.

Never expose: Fleetbase logo, Ember console, `@fleetbase/*` package names to customers.

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Extracted from app-overview |
| 11 Jul 2026 | Full extension matrix, build vs buy for all modules |
