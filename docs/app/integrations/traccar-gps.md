# Traccar GPS Integration

| Priority | P2 — optional |
|----------|---------------|
| **License** | Apache-2.0 |

---

## When to use

| Scenario | Solution |
|----------|----------|
| Driver smartphone GPS | Fleetbase Navigator or TranZfort mobile |
| Dedicated OBD / tracker hardware | Traccar |

---

## Architecture (if adopted)

```
GPS Device → Traccar Server → Forwarder → Fleetbase telematics API
                                      → BFF (fallback)
```

---

## Scope

Not in MVP. Evaluate when own fleet uses hardware trackers without smartphone.

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Placeholder |
