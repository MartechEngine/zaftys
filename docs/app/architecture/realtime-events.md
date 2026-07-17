# Realtime Events

| Field | Value |
|-------|-------|
| **Parent** | [system-design.md](./system-design.md) |
| **Schema** | [websocket-events.md](../api/websocket-events.md) |

---

## Sources

| Source | Events |
|--------|--------|
| Fleetbase SocketCluster (`:38000`) | Driver location, order status, geofence |
| BFF (derived) | Exception detected, sync completed, stale GPS |
| Sync worker | TranZfort booking created/updated |
| Connectivity extension | Telematics alerts (P4) |

---

## Browser subscription model

| Room | Subscribers | Modules |
|------|-------------|---------|
| `org:{orgId}` | Command Center, Live map | `/`, `/map` |
| `shipment:{shipmentId}` | Shipment detail, client track | `/shipments/[id]`, `/track/[token]` |
| `user:{userId}` | Notification inbox | `/notifications` |
| `sync:status` | Sync banner | `/network/sync`, dispatch |

---

## Event types (full product)

### Operations

| Event | Payload highlights |
|-------|-------------------|
| `shipment.status_changed` | `shipmentId`, `from`, `to`, `timestamp` |
| `shipment.assigned` | `shipmentId`, `driverId`, `vehicleId` |
| `shipment.exception_raised` | `shipmentId`, `type`, `message` |
| `document.uploaded` | `shipmentId`, `docType`, `url` |

### Fleet / map

| Event | Payload highlights |
|-------|-------------------|
| `vehicle.location_updated` | `vehicleId`, `lat`, `lng`, `speed`, `heading`, `stale` |
| `driver.status_changed` | `driverId`, `status` |
| `geofence.entered` | `vehicleId`, `placeId`, `shipmentId?` |

### Network & system

| Event | Payload highlights |
|-------|-------------------|
| `sync.completed` | `created`, `updated`, `errors` |
| `sync.failed` | `error`, `lastSuccess` |
| `notification.created` | `userId`, `title`, `link` |

Full schema: [websocket-events.md](../api/websocket-events.md).

---

## UI consumers

| Screen | Events subscribed |
|--------|-------------------|
| Command Center | KPI refresh, exceptions, activity |
| Dispatch Kanban | `shipment.status_changed`, `shipment.assigned` |
| Shipments list | Row updates without full refresh |
| Shipment detail | Timeline + map marker |
| Live map | `vehicle.location_updated` (throttle 5s) |
| Track page | Single shipment location + status |
| Notification bell | `notification.created` |

---

## Stale data policy

| Data | Stale threshold | UI behavior |
|------|-----------------|-------------|
| GPS | 15 min | Gray marker + exception queue |
| Shipment list | 60s | "Updated Xm ago" |
| KPI counts | 30s | Soft refresh on tab focus |
| Sync status | 5 min | Banner warning |

---

## Fallback

1. WebSocket disconnect → exponential backoff reconnect
2. On detail page: poll `GET /api/shipments/:id` every 30s
3. On map: poll `GET /api/map/vehicles` every 60s
4. Show connection indicator in top bar

---

## Implementation path

| Step | Task |
|------|------|
| 1 | BFF SocketCluster client subscribe org channel |
| 2 | Next.js Route Handler or separate WS server |
| 3 | Browser hook `useRealtime(orgId)` |
| 4 | Wire Command Center + map first |
| 5 | Dispatch + list row updates |
| 6 | Track page public channel (token-scoped) |

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial realtime spec |
| 11 Jul 2026 | Full event catalog, UI consumers, implementation path |
