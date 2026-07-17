# Audit & Activity Events

| Parent | [domain-model.md](./domain-model.md) |

---

## Activity feed (Command Center)

| Event type | Description | Visible to client |
|------------|-------------|-------------------|
| `shipment.created` | New shipment | No |
| `shipment.assigned` | Driver + vehicle assigned | Yes (simplified) |
| `shipment.status_changed` | Lifecycle transition | Yes |
| `document.uploaded` | LR, ePOD, etc. | ePOD only when delivered |
| `exception.raised` | System exception | No |
| `exception.resolved` | Exception cleared | No |
| `track_link.generated` | Public link created | No |

---

## Audit log (admin P2)

| Event type | Retention |
|------------|-----------|
| `user.login` | 90 days |
| `user.invited` | 1 year |
| `shipment.cancelled` | 1 year |
| `settings.updated` | 1 year |

---

## Event payload schema

```json
{
  "id": "uuid",
  "shipment_id": "uuid",
  "type": "shipment.status_changed",
  "actor": { "id": "uuid", "name": "Dispatcher", "role": "dispatcher" },
  "payload": {
    "from": "dispatched",
    "to": "in_transit"
  },
  "timestamp": "2026-07-11T10:00:00Z"
}
```

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial event schema |
