# ADR-001: Fleetbase as Execution Backend

| Status | **Superseded** by [ADR-008](./008-tsm-owns-execution.md) |
| Date | Jul 2026 |
| Superseded | 2 August 2026 |

---

## Context

ZAFTYS TSM needed dispatch, fleet registry, live GPS, ePOD, and API-first integration. Building from scratch looked like 12+ months. Several open-source TMS options existed with varying maturity and licenses.

---

## Decision (historical — Jul 2026)

Use **Fleetbase FleetOps** as the headless execution backend:

- Self-hosted Docker on VPS
- API-only integration via BFF
- Customer never sees Fleetbase Ember console
- TranZfort remains separate; sync bridge into Fleetbase orders

---

## Alternatives considered (Jul 2026)

| Option | Rejected because |
|--------|------------------|
| open_tms (MIT) | Too immature for production GPS/dispatch |
| Build on Supabase only | 6+ months to replicate execution layer |
| Odoo Fleet | ERP module, not deep TMS |
| Full SaaS TMS vendor | No control, per-seat cost, wrong India fit |

---

## Why superseded (2 Aug 2026)

| Pressure | Detail |
|----------|--------|
| Product independence | TSM must be a sellable multi-tenant SaaS, not an AGPL API façade |
| Tenancy | Single shared Fleetbase API key ≠ Org A/B isolation |
| India docs + AI | LR / invoices / agents belong in TSM Postgres + BFF, not Fleetbase `meta` |
| Desktop | Thin Tauri → hosted TSM; FB Docker is ops-only friction |
| License | AGPL-3.0 remains a SaaS counsel risk |

**Replacement:** [ADR-008](./008-tsm-owns-execution.md) — TSM Postgres owns execution; Fleetbase is transitional only until Phase D delete.

Fleetbase may remain temporarily behind an `ExecutionStore` adapter during migration. Inspiration (orders, drivers, assign, track) is allowed; **no permanent API dependency** and **no AGPL code in the TSM product**.

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Accepted |
| 2 Aug 2026 | **Superseded** by ADR-008 |
