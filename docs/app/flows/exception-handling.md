# Flow — Exception Handling

| Priority | P0 |

---

## Exception types (MVP)

| Type | Trigger | Detection |
|------|---------|-----------|
| `late_eta` | ETA slip > 30 min | BFF scheduler |
| `stale_gps` | No ping > 15 min on active trip | Realtime monitor |
| `missing_epod` | Delivered > 2h, no ePOD | Batch job |

---

## Flowchart

```mermaid
flowchart TD
  A[System detects exception] --> B[Add to Exception queue]
  B --> C[Command Center badge + count]
  C --> D[Dispatcher opens exception]
  D --> E[Shipment detail]
  E --> F{Resolution}
  F --> G[Contact driver]
  F --> H[Reassign vehicle]
  F --> I[Notify client P2]
  F --> J[Mark acknowledged P2]
  G --> K[Driver updates status]
  K --> L[Exception clears auto]
```

---

## UI surfaces

- Command Center exception queue (right panel)
- Shipments tab "Exceptions"
- Orange left border on shipment rows
- Notification bell count

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial exception flow |
