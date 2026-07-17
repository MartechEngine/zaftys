# Fleetbase Overview

| Field | Value |
|-------|-------|
| **Project** | [fleetbase/fleetbase](https://github.com/fleetbase/fleetbase) |
| **License** | AGPL-3.0 |
| **ADR** | [001-fleetbase-as-backend.md](../decisions/001-fleetbase-as-backend.md) |

---

## What we use

| Capability | Use in TSM |
|------------|------------|
| Orders API | Shipment lifecycle |
| Drivers API | Driver registry + assignment |
| Vehicles API | Fleet registry |
| Fleets API | Grouping own fleet |
| Proofs API | ePOD |
| SocketCluster | Live GPS + status |
| Webhooks | Sync triggers (P2) |
| Navigator app | Driver mobile (TBD — ADR 004) |

---

## What we do NOT use (customer-facing)

| Component | Use |
|-----------|-----|
| Ember console (:4200) | Internal dev/ops sandbox only |
| Storefront extension | N/A |
| Generic customer tracking UI | Replaced by ZAFTYS `/track/[token]` |

---

## Integration pattern

```
Portal → BFF → Fleetbase REST/WS
```

Unmodified Docker image. No fork of core for MVP.

---

## Docs

- Vendor API: https://fleetbase.io/docs
- Spike: [fleetbase-docker-spike.md](../ops/fleetbase-docker-spike.md)
- Entity map: [fleetbase-entity-map.md](./fleetbase-entity-map.md)

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial Fleetbase overview |
