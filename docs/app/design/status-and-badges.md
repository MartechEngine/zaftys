# Status & Badges

| Field | Value |
|-------|-------|
| **Data source** | [status-enumerations.md](../data/status-enumerations.md) |

Visual system for shipment status and asset origin.

---

## Shipment status chips

| Status | Background | Text | Icon |
|--------|------------|------|------|
| Pending | Gray muted | Pending | Clock |
| Dispatched | Cyan light | Dispatched | Send |
| At plant | Yellow light | At plant | Building |
| In transit | Navy light | In transit | Truck |
| At weighbridge | Yellow light | Weighbridge | Scale |
| Delivered | Green light | Delivered | Check |
| Exception | Orange light | Exception | AlertTriangle |
| Cancelled | Red muted | Cancelled | X |

Do not rely on color alone — always include text label.

---

## Origin badges

| Type | Style | Label |
|------|-------|-------|
| Own fleet | Navy filled pill | ZAFTYS Fleet |
| Network | Orange outline pill | Network |
| Handoff | Split icon | Handoff |

---

## Document expiry (fleet)

| State | Color | Label |
|-------|-------|-------|
| Valid | Green dot | Valid |
| Expiring ≤30d | Orange dot | Expiring |
| Expired | Red dot | Expired |
| Missing | Gray dash | Missing |

---

## Driver / vehicle availability

| State | Dot color |
|-------|-----------|
| Available | Green |
| On trip | Orange |
| Off duty | Gray |
| Maintenance | Yellow |

---

## GPS freshness (map)

| State | Marker | Tooltip |
|-------|--------|-----------|
| Live (<5 min) | Orange truck | Moving |
| Idle (<15 min) | Navy truck | Idle |
| Stale (>15 min) | Gray truck | Last seen Xm ago |

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial status spec |
