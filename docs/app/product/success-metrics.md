# Success Metrics — ZAFTYS TSM

| Field | Value |
|-------|-------|
| **Phase** | Directional KPIs — refine with baseline after MVP |

---

## North star metric

**Time from TranZfort booking to client-visible tracking** — target < 15 minutes (sync + assign + track link).

---

## Operational metrics

| Metric | Target (directional) | How measured |
|--------|----------------------|--------------|
| Sync SLA (TranZfort → TSM) | < 2 min p95 | Integration monitor |
| Dispatch assign time | < 10 min median from booking | Event timestamps |
| GPS freshness | < 5 min stale on active trips | Map health job |
| ePOD upload within 1h of delivery | > 80% | Shipment events |
| Exception resolution time | < 4h median | Exception queue |

---

## Adoption metrics

| Metric | Target |
|--------|--------|
| Active dispatcher DAU | All ops team on portal daily |
| Client track link opens | > 50% of delivered shipments |
| TSM demo → pilot conversion | Track via CRM |
| Repeat contract lanes on platform | Core corridors digitized |

---

## Quality metrics

| Metric | Target |
|--------|--------|
| Portal uptime | 99.5% |
| BFF error rate | < 1% |
| Page load (LCP) | < 2.5s on Command Center |
| Failed assign actions | < 0.5% |

---

## Business metrics (Phase 2+)

| Metric | Notes |
|--------|-------|
| Trips managed in TSM vs phone-only | % digitized |
| Network overflow % | TranZfort handoff rate |
| Document expiry incidents | Zero expired RC on active trips |
| Shipper NPS on visibility | Qualitative surveys |

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial metrics |
