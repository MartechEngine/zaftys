# Non-Goals — ZAFTYS TSM

Explicit exclusions. Prevents scope creep and wrong OSS adoption.

---

## Product non-goals

| Non-goal | Why |
|----------|-----|
| US freight brokerage TMS | Wrong market (LoadPartner-style) |
| Warehouse / AGV control | OpenTCS category — not road freight |
| Full ERP replacement | Not billing, HR, inventory for non-logistics |
| Separate vendor billing to shippers for network trips | All transactions through ZAFTYS Logistics |
| Public load board for anonymous brokers | TranZfort is verified network under ZAFTYS |
| Guaranteed load promises in UI | Brand rule — no unverified claims |
| AI-first positioning in MVP | Execution platform first; AI after data platform |
| Customer-facing Fleetbase Ember console | Vendor UI never shipped |
| Pvt Ltd / Shop Act claims in product copy | GST-compliant operations language only |

---

## Technical non-goals (MVP)

| Non-goal | When reconsidered |
|----------|-------------------|
| Forking Fleetbase core | Never unless AGPL blocker |
| Direct browser → Fleetbase API | Always via BFF |
| Building custom GPS protocol stack | Use Fleetbase/Traccar/mobile |
| Multi-region deployment | India-first single region |
| Real-time chat in portal | WhatsApp for external comms |

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial non-goals |
