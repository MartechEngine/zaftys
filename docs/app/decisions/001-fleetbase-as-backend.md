# ADR-001: Fleetbase as Execution Backend

| Status | **Accepted** |
| Date | Jul 2026 |

---

## Context

ZAFTYS TSM needs dispatch, fleet registry, live GPS, ePOD, and API-first integration. Building from scratch is 12+ months. Several open-source TMS options exist with varying maturity and licenses.

---

## Decision

Use **Fleetbase FleetOps** as the headless execution backend:

- Self-hosted Docker on VPS
- API-only integration via BFF
- Customer never sees Fleetbase Ember console
- TranZfort remains separate; sync bridge into Fleetbase orders

---

## Alternatives considered

| Option | Rejected because |
|--------|------------------|
| open_tms (MIT) | Too immature for production GPS/dispatch |
| Build on Supabase only | 6+ months to replicate execution layer |
| Odoo Fleet | ERP module, not deep TMS |
| Full SaaS TMS vendor | No control, per-seat cost, wrong India fit |

---

## Consequences

**Positive**
- Faster time to MVP dispatch + map
- Mature REST + WebSocket
- Docker self-host in India

**Negative**
- AGPL-3.0 requires legal review and API boundary discipline
- Vendor schema mapping overhead
- Dependency on Fleetbase project health

**Mitigation**
- Unmodified Docker image + BFF only
- Commercial license option if AGPL blocks SaaS
- MIT fallback (open_tms) documented if needed

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Accepted |
