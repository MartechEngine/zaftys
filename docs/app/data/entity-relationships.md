# Entity Relationships

| Parent | [domain-model.md](./domain-model.md) |

---

## ER diagram

```mermaid
erDiagram
  ClientOrg ||--o{ Shipment : places
  Shipment ||--o{ Document : has
  Shipment ||--o{ ActivityEvent : logs
  Shipment }o--|| Driver : assigned
  Shipment }o--|| Vehicle : assigned
  Shipment }o--|| Place : origin
  Shipment }o--|| Place : destination
  Driver }o--o| Vehicle : drives
  Vehicle ||--o{ Document : compliance
  ClientOrg ||--o{ User : members
  Shipment |o--o| TranZfortBooking : synced_from
```

---

## Cardinality notes

| Relationship | Rule |
|--------------|------|
| Shipment → Driver | 0..1 active assignment |
| Shipment → Vehicle | 0..1 active assignment |
| Driver → Vehicle | 0..1 current |
| Shipment → TranZfort booking | 0..1 |

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial ER diagram |
