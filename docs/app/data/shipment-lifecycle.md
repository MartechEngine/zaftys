# Shipment Lifecycle

| Parent | [status-enumerations.md](./status-enumerations.md) |

---

## State diagram

```mermaid
stateDiagram-v2
  [*] --> pending: Booking created
  pending --> dispatched: Driver assigned
  dispatched --> at_plant: Arrived pickup
  at_plant --> in_transit: Loaded / departed
  in_transit --> at_weighbridge: Optional stop
  at_weighbridge --> in_transit: Resume
  in_transit --> delivered: ePOD captured
  pending --> cancelled: Cancel
  dispatched --> cancelled: Cancel
  in_transit --> exception: Delay / GPS issue
  exception --> in_transit: Resolved
  delivered --> [*]
  cancelled --> [*]
```

---

## Transitions (who triggers)

| From | To | Trigger |
|------|-----|---------|
| pending | dispatched | Dispatcher assign |
| dispatched | at_plant | Driver app / geofence |
| at_plant | in_transit | Driver status update |
| in_transit | delivered | Driver ePOD upload |
| * | cancelled | Dispatcher / admin |
| * | exception | System rule |

---

## Customer-visible subset

pending → dispatched → in_transit → delivered (simplified on track page)

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial lifecycle |
