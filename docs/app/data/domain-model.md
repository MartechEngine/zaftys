# Domain Model

| Parent | [app-overview.md](../app-overview.md) |

---

## Core entities

### Shipment

Customer-facing freight movement. Primary aggregate root in portal.

| Attribute | Type | Notes |
|-----------|------|-------|
| id | UUID | Internal |
| public_id | string | ZFT-2026-0142 |
| client_org_id | UUID | FK |
| status | enum | See lifecycle |
| origin | Place | |
| destination | Place | |
| commodity | string | |
| tonnage_mt | number | |
| lr_number | string | |
| origin_type | enum | fleet, network, handoff |
| tranzfort_booking_id | UUID? | If from network |
| assigned_driver_id | UUID? | |
| assigned_vehicle_id | UUID? | |
| pickup_window | datetime range | |
| eta | datetime? | |
| created_at | datetime | |

### Place

| Attribute | Type |
|-----------|------|
| id | UUID |
| name | string |
| city | string |
| state | string |
| pin_code | string |
| lat | number |
| lng | number |
| type | enum: plant, warehouse, weighbridge, other |

### Driver

| Attribute | Type |
|-----------|------|
| id | UUID |
| name | string |
| phone | string |
| license_number | string |
| license_expiry | date |
| status | enum: on_duty, off_duty, on_trip |
| current_vehicle_id | UUID? |

### Vehicle

| Attribute | Type |
|-----------|------|
| id | UUID |
| registration | string |
| type | string |
| capacity_mt | number |
| status | enum: available, on_trip, maintenance |
| documents | Document[] |

### ClientOrg

| Attribute | Type |
|-----------|------|
| id | UUID |
| name | string |
| gstin | string? |
| contacts | Contact[] |

### Document

| Attribute | Type |
|-----------|------|
| id | UUID |
| type | enum: lr, epod, invoice, rc, insurance, permit, other |
| shipment_id / vehicle_id | UUID |
| url | string |
| expiry_date | date? |
| uploaded_at | datetime |

### ActivityEvent

| Attribute | Type |
|-----------|------|
| id | UUID |
| shipment_id | UUID |
| type | string |
| actor_id | UUID? |
| payload | JSON |
| timestamp | datetime |

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial domain model |
