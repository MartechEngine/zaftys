# ADR-002: Custom UI — Not Vendor Console

| Status | **Accepted** |
| Date | Jul 2026 |

---

## Context

Fleetbase ships an Ember.js operations console. ZAFTYS has a defined brand (navy/orange), industrial terminology, and TranZfort integration requirements generic TMS UIs do not support.

---

## Decision

Build **100% customer-facing UI** as Next.js portal on `app.zaftys.com`.

Fleetbase console (`:4200`) is **internal dev/ops sandbox only** — never linked from marketing or shown to clients/shippers.

---

## Consequences

**Positive**
- Full brand control
- Role-based UX (shipper vs dispatcher)
- India-specific fields (LR, weighbridge, GST)
- Single portal for own fleet + network trips

**Negative**
- All UI engineering is ZAFTYS-owned
- Must build map, dispatch board, timelines

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Accepted |
