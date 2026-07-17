# Flow — Manual Dispatch

| Priority | P0 |

---

## Flowchart

```mermaid
flowchart TD
  A[Dispatcher opens Dispatch board] --> B{Unassigned cards?}
  B -->|No| C[Empty state]
  B -->|Yes| D[Select shipment card]
  D --> E[Click Assign]
  E --> F[Assign drawer opens]
  F --> G[Select driver]
  G --> H[Select vehicle]
  H --> I{Valid docs?}
  I -->|No| J[Warning — override or pick other]
  I -->|Yes| K[Confirm assign]
  K --> L[BFF PATCH Fleetbase]
  L --> M{Success?}
  M -->|Yes| N[Card moves to Assigned / In progress]
  M -->|No| O[Error toast]
  N --> P[Driver notified via app]
```

---

## Screens touched

1. `/dispatch` — Kanban board
2. Assign drawer (overlay)
3. `/shipments/[id]` — optional verify

---

## Business rules

- Vehicle capacity ≥ shipment tonnage
- Driver license not expired
- Vehicle docs green or orange (red blocks unless admin override P2)

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial manual dispatch flow |
