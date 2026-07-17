# Glossary — ZAFTYS TSM

| Term | Definition |
|------|------------|
| **Shipment** | A customer-facing freight movement from booking to delivery. Primary object in the portal UI. |
| **Trip** | Execution instance of a shipment — may include legs, driver assignment, GPS track. |
| **LR (Lorry Receipt)** | Indian consignment note; legal transport document. |
| **ePOD** | Electronic proof of delivery — photos, signature, timestamp. |
| **Plant window** | Scheduled loading/unloading slot at factory or plant. |
| **Weighbridge** | Weight verification stop; common loop on industrial routes. |
| **Own fleet** | ZAFTYS company-operated vehicles and drivers. |
| **Network trip** | Capacity fulfilled via TranZfort verified partner. |
| **Overflow** | Demand exceeding own fleet → routed to TranZfort network. |
| **Command Center** | Ops landing dashboard — KPIs, map, exceptions. |
| **Dispatch board** | Kanban-style assignment workspace. |
| **BFF** | Backend-for-frontend — API layer between portal and Fleetbase. |
| **LOS** | Logistics Operating System — internal name for execution layer. |
| **TSM** | Transport & Shipment Management — customer-facing product name. |
| **TranZfort** | Verified transport network marketplace (separate product). |
| **Consignor** | Party sending goods. |
| **Consignee** | Party receiving goods. |
| **Corridor** | Recurring origin–destination lane (e.g. Amravati → Nagpur). |
| **Exception** | Operational issue requiring attention (delay, stale GPS, missing ePOD). |
| **Track token** | Signed URL token for public client tracking without login. |

---

## Terminology — use vs avoid

| Use | Avoid |
|-----|-------|
| Shipment | Order |
| Trip | Delivery job |
| LR | BOL, Bill of lading |
| Own fleet | Internal order |
| Network | External vendor |
| Client | Customer (in UI — "Client org" in admin) |

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial glossary |
