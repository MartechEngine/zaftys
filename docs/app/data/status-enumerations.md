# Status Enumerations

| Parent | [shipment-lifecycle.md](./shipment-lifecycle.md) |

---

## Shipment status

| Value | Label | Terminal |
|-------|-------|----------|
| `pending` | Pending | No |
| `dispatched` | Dispatched | No |
| `at_plant` | At plant | No |
| `in_transit` | In transit | No |
| `at_weighbridge` | Weighbridge | No |
| `delivered` | Delivered | Yes |
| `cancelled` | Cancelled | Yes |
| `exception` | Exception | No |

---

## Origin type

| Value | Label |
|-------|-------|
| `fleet` | ZAFTYS Fleet |
| `network` | Network |
| `handoff` | Handoff |

---

## Driver status

| Value | Label |
|-------|-------|
| `on_duty` | On duty |
| `off_duty` | Off duty |
| `on_trip` | On trip |

---

## Vehicle status

| Value | Label |
|-------|-------|
| `available` | Available |
| `on_trip` | On trip |
| `maintenance` | Maintenance |

---

## Exception types

| Value | Label |
|-------|-------|
| `late_eta` | Late ETA |
| `stale_gps` | Stale GPS |
| `missing_epod` | Missing ePOD |
| `route_deviation` | Route deviation (P3) |

---

## Document type

| Value | Label |
|-------|-------|
| `lr` | LR |
| `epod` | ePOD |
| `invoice` | Invoice |
| `rc` | RC |
| `insurance` | Insurance |
| `permit` | Permit |
| `fitness` | Fitness |
| `weighbridge_slip` | Weighbridge slip |
| `other` | Other |

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial enumerations |
