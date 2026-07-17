# Flow — Fleet Compliance Alerts

| Priority | P1 |

---

## Flowchart

```mermaid
flowchart TD
  A[Fleet manager opens /fleet] --> B[System checks doc expiry dates]
  B --> C{Expiring ≤30 days?}
  C -->|No| D[Green banner hidden]
  C -->|Yes| E[Orange banner with count]
  E --> F[Click banner]
  F --> G[Filter table to expiring]
  G --> H[Open vehicle row]
  H --> I[Upload renewed document]
  I --> J[Expiry date updated]
  J --> K[Banner count decreases]
```

---

## Alert surfaces

- Fleet page banner
- Vehicle row doc traffic light
- Command Center KPI (P2): "Compliance issues"

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial compliance flow |
