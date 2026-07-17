# Microcopy — TSM Portal

| Parent | [glossary.md](../product/glossary.md) |

---

## Buttons

| Context | Label |
|---------|-------|
| Login submit | Sign in to TSM |
| Assign confirm | Assign driver |
| Track link | Send track link |
| Doc upload | Upload document |
| Filter apply | Apply filters |
| Create (P2) | Create shipment |

---

## Empty states

| Screen | Title | Body |
|--------|-------|------|
| Unassigned dispatch | All caught up | No shipments waiting for assignment. |
| Shipments (client) | No active shipments | When ZAFTYS moves your freight, it will appear here. |
| Exceptions | No exceptions | Operations running smoothly. |
| Fleet docs | All documents valid | No expiring documents in the next 30 days. |
| Search no results | No matches | Try shipment ID, LR number, or vehicle registration. |

---

## Errors

| Case | Message |
|------|---------|
| Login failed | Email or password is incorrect. |
| Assign failed | Could not assign driver. Check vehicle availability and try again. |
| Sync delayed | Network data is catching up. Last sync 3 min ago. |
| GPS stale | Location unavailable. Driver may be offline. |
| Track token invalid | This tracking link has expired or is invalid. Contact info@zaftys.com. |
| Upload failed | Upload failed. Check file size (max 10MB) and try again. |

---

## Toasts

| Event | Message |
|-------|---------|
| Assigned | Driver assigned to ZFT-{id}. |
| ePOD uploaded | Proof of delivery saved. |
| Track link copied | Tracking link copied to clipboard. |

---

## Status (customer-facing track page)

| Internal status | Plain language |
|-----------------|----------------|
| in_transit | Your shipment is on the way to {destination}. |
| at_plant | Your shipment is loading at the plant. |
| delivered | Your shipment was delivered. |

---

## Footer (track page)

Powered by ZAFTYS TSM™ · Questions? info@zaftys.com

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial microcopy |
