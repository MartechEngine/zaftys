# Fleetbase Entity Map

| Field | Value |
|-------|-------|
| **Status** | Draft — validate in P0 spike |

Maps TranZfort + ZAFTYS domain → Fleetbase API entities.

---

## Core mapping

| ZAFTYS (portal) | Fleetbase API | TranZfort (Supabase) |
|-----------------|---------------|----------------------|
| Shipment | `order` | `trips` |
| Trip execution | order activities | `trip_status` |
| Driver | `driver` | `drivers` / profile |
| Vehicle | `vehicle` | `vehicles` |
| Client org | `customer` / meta | `clients` |
| Pickup place | `place` (pickup) | `origin` |
| Drop place | `place` (dropoff) | `destination` |
| ePOD | `proofs` | `pod_uploads` |
| Live location | driver `location` | `gps_points` |

---

## Shipment field map

| ZAFTYS field | Fleetbase field | TranZfort field |
|--------------|-----------------|-----------------|
| `shipment_id` | `order.public_id` | `trips.id` |
| `lr_number` | `order.meta.lr_number` | `trips.lr_number` |
| `commodity` | `order.meta.commodity` | `trips.commodity` |
| `tonnage_mt` | `order.meta.tonnage` | `trips.weight` |
| `origin_badge` | `order.meta.origin` | `trips.fleet_type` |
| `client_org_id` | `order.customer_uuid` | `trips.client_id` |
| `tranzfort_booking_id` | `order.meta.tranzfort_id` | `trips.id` |
| `status` | `order.status` | mapped via [status-enumerations](../data/status-enumerations.md) |

---

## Status mapping

| ZAFTYS status | Fleetbase status | TranZfort status |
|---------------|------------------|------------------|
| `pending` | `created` | `booked` |
| `dispatched` | `dispatched` | `assigned` |
| `at_plant` | `pickup` / custom | `at_loading` |
| `in_transit` | `started` / `in_progress` | `in_transit` |
| `at_weighbridge` | `meta.custom` | — |
| `delivered` | `completed` | `delivered` |
| `cancelled` | `cancelled` | `cancelled` |
| `exception` | — (BFF derived) | — |

---

## Sync direction (P1)

| Event | Direction |
|-------|-----------|
| New TranZfort booking | TZ → FB (create order) |
| Dispatcher assign | TSM → FB |
| Status from driver app | FB → TSM (WS) |
| Partner accept (P3) | TZ → FB → TSM |

---

## Open items (spike)

- [ ] Confirm custom `meta` fields supported on orders
- [ ] Confirm webhook payloads for status change
- [ ] Validate proof upload API for ePOD photos
- [ ] Map Indian place geocoding accuracy

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Draft entity map |
