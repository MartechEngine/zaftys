# ADR-006: ZAFTYS–TranZfort Commercial & Load Exchange Model

| Status | **Accepted** |
| Date | Jul 2026 |

---

## Context

Dispatchers need to post overflow loads to TranZfort from ZAFTYS TSM. Open questions included supplier identity, marketplace visibility, settlement, shipment status modeling, API boundary, and multi-truck / partial fills. Without locked product decisions, engineering would invent a public board-style integration that conflicts with ZAFTYS positioning.

---

## Decision

1. **ZAFTYS is always the TranZfort “supplier.”** Shippers never post from TSM.
2. **Phase 1 visibility = verified-open** (KYC’d partners only). Preferred / invite-only in Phase 2. Not an anonymous public board.
3. **ZAFTYS always settles the partner.** Shipper pays ZAFTYS; partner is paid by ZAFTYS.
4. **Do not add `network_posted` to `ShipmentStatus`.** Use `networkListing.state` substate; keep `originType` as capacity source (`fleet` until partner accept → `network`).
5. **Product API = Load Exchange + webhooks.** Supabase service role only behind an adapter.
6. **Phase 1 includes `trucksNeeded` and partial fill** (accept k of N).

Canonical detail: [zaftys-tranzfort-load-exchange.md](../integrations/zaftys-tranzfort-load-exchange.md).

---

## Consequences

**Positive**
- Clear commercial triangle and brand boundary
- Execution lifecycle stays clean for Fleetbase + client track
- Multi-truck matches industrial reality from day one
- Integration can evolve off Supabase without rewriting product contracts

**Negative**
- Overflow IA must distinguish outbound desk vs inbound sync queue
- Partial fill needs slot model (slightly more complex than 1:1 shipment↔trip)
- Webhooks deferred to Phase 2 means short-term polling

**Mitigation**
- Tabbed `/network/overflow` (outbound primary)
- `tranzfortTripIds[]` with back-compat on single `tranzfortId`
- Poll with &lt; 2 min SLA until webhooks ship

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Accepted (CPO) |
