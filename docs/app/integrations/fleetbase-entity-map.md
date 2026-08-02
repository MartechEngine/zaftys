# Fleetbase Entity Map (legacy / migration)

| Field | Value |
|-------|-------|
| **Status** | **Legacy** — migration reference only (2 Aug 2026) |
| **Superseded by** | [ADR-008](../decisions/008-tsm-owns-execution.md) — TSM Postgres owns execution |

Maps historical TranZfort + ZAFTYS domain → **Fleetbase API** entities for **import / dual-write** during Phases A–C. After Phase D, prefer TSM table names directly; keep this file for pilot data migration scripts only.

---

## Core mapping (historical)

| ZAFTYS (portal) | Fleetbase API (legacy) | TSM Postgres (target) | TranZfort |
|-----------------|------------------------|------------------------|-----------|
| Shipment | `order` | `tsm_shipments` | `trips` / loads |
| Trip execution | order activities | `tsm_shipment_events` | `trip_status` |
| Driver | `driver` | `tsm_drivers` | drivers / profile |
| Vehicle | `vehicle` | `tsm_vehicles` | vehicles |
| Client org | `customer` / meta | `tsm_clients` | clients |
| Pickup / drop | `place` | columns / places on shipment | origin / destination |
| ePOD | `proofs` | `app_documents` / `tsm_proofs` | `pod_uploads` |
| Live location | driver `location` | `tsm_positions` | `gps_points` |

---

## Shipment field map

| ZAFTYS field | Fleetbase (legacy) | TSM target | TranZfort |
|--------------|-------------------|------------|-----------|
| `shipment_id` | `order.public_id` | `tsm_shipments.id` | `trips.id` |
| `lr_number` | `order.meta.lr_number` | first-class column | `trips.lr_number` |
| `commodity` | `order.meta.commodity` | column | commodity / material |
| `tonnage_mt` | `order.meta.tonnage` | column | weight |
| `origin_badge` | `order.meta.origin` | column | fleet vs network |
| `client_org_id` | `order.customer_uuid` | FK / id | client_id |
| `tranzfort_booking_id` | `order.meta.tranzfort_id` | column | trip/load id |
| `status` | `order.status` | TSM status enum | mapped statuses |

---

## Status mapping

| ZAFTYS status | Fleetbase (legacy) | TranZfort |
|---------------|-------------------|-----------|
| `pending` | `created` | `booked` |
| `dispatched` | `dispatched` | `assigned` |
| `at_plant` | `pickup` / custom | `at_loading` |
| `in_transit` | `started` / `in_progress` | `in_transit` |
| `at_weighbridge` | `meta.custom` | — |
| `delivered` | `completed` | `delivered` |
| `cancelled` | `cancelled` | `cancelled` |
| `exception` | BFF derived | — |

---

## Sync direction (target after ADR-008)

| Event | Direction |
|-------|-----------|
| New marketplace booking | Stays on TranZfort; optional “Create TSM job” → **TSM shipment** |
| Dispatcher assign | TSM → `tsm_shipments` |
| Status / GPS | TSM positions + events (telematics later) |
| Legacy TZ→FB shadow sync | **Retarget or delete** (`run-tranzfort-sync`) |

---

## Open items (migration)

- [ ] Pilot import: FB orders/drivers/vehicles → TSM tables for `org_zaftys_local`
- [ ] Confirm empty FB place strings → treat as missing (already handled in mapper)
- [ ] ePOD blobs already in MinIO / `app_documents` — re-key to TSM shipment ids if needed

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Draft entity map |
| 2 Aug 2026 | Marked legacy; added TSM Postgres target columns (ADR-008) |
