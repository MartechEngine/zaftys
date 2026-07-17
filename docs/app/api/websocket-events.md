# WebSocket Events

| Parent | [realtime-events.md](../architecture/realtime-events.md) |

---

## Connection

```
wss://app.zaftys.com/api/ws
```

Auth: session cookie on handshake.

---

## Subscribe (client → server)

```json
{
  "action": "subscribe",
  "room": "org:zaftys-org-uuid"
}
```

```json
{
  "action": "subscribe",
  "room": "shipment:shipment-uuid"
}
```

---

## Events (server → client)

### shipment.status_changed

```json
{
  "event": "shipment.status_changed",
  "data": {
    "shipment_id": "uuid",
    "from": "dispatched",
    "to": "in_transit",
    "timestamp": "2026-07-11T10:00:00Z"
  }
}
```

### vehicle.location_updated

```json
{
  "event": "vehicle.location_updated",
  "data": {
    "vehicle_id": "uuid",
    "shipment_id": "uuid",
    "lat": 20.9333,
    "lng": 77.7500,
    "speed_kmh": 45,
    "heading": 180,
    "timestamp": "2026-07-11T10:00:00Z"
  }
}
```

### shipment.exception_raised

```json
{
  "event": "shipment.exception_raised",
  "data": {
    "shipment_id": "uuid",
    "type": "stale_gps",
    "message": "No GPS update for 18 minutes"
  }
}
```

### document.uploaded

```json
{
  "event": "document.uploaded",
  "data": {
    "shipment_id": "uuid",
    "document_id": "uuid",
    "type": "epod"
  }
}
```

---

## Reconnection

Client: exponential backoff 1s → 30s max. On reconnect, refetch shipment detail + resubscribe rooms.

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial WebSocket event schema |
