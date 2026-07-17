# Flow — Client Self-Serve Tracking

| Priority | P0 |

---

## Flowchart

```mermaid
flowchart LR
  A[Dispatcher generates track link] --> B[Link copied / emailed P2]
  B --> C[Client opens /track/token on phone]
  C --> D{Token valid?}
  D -->|No| E[Error page]
  D -->|Yes| F[Show status + ETA]
  F --> G[Map with single truck]
  G --> H[Timeline updates via WS]
  H --> I{Delivered?}
  I -->|Yes| J[ePOD download button]
  I -->|No| H
```

---

## Actor

**Shipper** — no login required for MVP.

---

## Screens

- `/track/[token]` only
- See [public-tracking-page.md](../design/public-tracking-page.md)

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial client tracking flow |
