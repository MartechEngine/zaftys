# BFF Layer

| Field | Value |
|-------|-------|
| **Parent** | [system-design.md](./system-design.md) |
| **Endpoints** | [bff-endpoints.md](../api/bff-endpoints.md) |
| **Entity map** | [fleetbase-entity-map.md](../integrations/fleetbase-entity-map.md) |

---

## Why BFF exists

1. **Hide Fleetbase** — API keys, AGPL boundary, vendor schema
2. **RBAC** — Enforce [user-roles-rbac.md](../product/user-roles-rbac.md) on every route
3. **Field mapping** — `order` → `shipment` + India meta (LR, tonnage, corridor)
4. **Aggregate** — Fleetbase + TranZfort + client org in one response
5. **Stable contract** — Portal decoupled from Fleetbase API churn
6. **Origin badge** — `fleet` | `network` | `handoff` computed in BFF

---

## Rules

| Rule | Detail |
|------|--------|
| Browser → BFF only | Never expose Fleetbase URL or API key |
| Service account | `FLEETBASE_API_KEY` server-side only |
| Errors | Stable `{ code, message, details? }` |
| Idempotency | Create, assign, sync support idempotency keys |
| Pagination | Cursor or offset — consistent across list endpoints |
| File upload | Multipart → Fleetbase proofs API |

---

## Middleware chain

```
Request
  → Auth session (cookie / track token)
  → RBAC check (role + org scope)
  → Validate input (Zod)
  → Idempotency check (if POST/PATCH)
  → Fleetbase / TranZfort call(s)
  → Map + enrich response
  → JSON
```

---

## Endpoint map (full product)

### Auth & session

| BFF | Notes |
|-----|-------|
| `POST /api/auth/login` | Session cookie |
| `POST /api/auth/logout` | Clear session |
| `GET /api/auth/me` | Current user + role |
| `POST /api/auth/forgot-password` | P3 |

### Operations

| BFF | Fleetbase |
|-----|-----------|
| `GET/POST /api/shipments` | `/v1/orders` |
| `GET/PATCH /api/shipments/[id]` | order detail + meta |
| `POST /api/shipments/[id]/assign` | assign driver/vehicle |
| `POST /api/shipments/[id]/cancel` | cancel |
| `GET/POST /api/shipments/[id]/documents` | proofs |
| `POST /api/shipments/[id]/track-link` | tracking URL |
| `GET /api/dashboard/kpis\|exceptions\|activity` | aggregates |
| `GET /api/map/vehicles` | live markers |
| `GET /api/dispatch/board` | kanban columns |

### Resources

| BFF | Fleetbase |
|-----|-----------|
| `GET/POST /api/fleet/vehicles` | vehicles |
| `GET/POST /api/fleet/drivers` | drivers |
| `GET/POST /api/fleet/places` | places |
| `GET/POST /api/fleet/groups` | fleets |
| `GET /api/fleet/issues` | issues |
| `GET /api/fleet/fuel/*` | fuel reports/transactions |
| `GET/POST /api/clients` | customers |
| `GET/POST /api/vendors` | vendors |

### Network (TranZfort)

| BFF | Source |
|-----|--------|
| `GET /api/sync/status` | sync state |
| `POST /api/sync/run` | manual sync |
| `GET /api/network/overflow` | TZ unassigned |
| `GET /api/network/assignments` | partner trips |

### Settings & IAM

| BFF | Fleetbase |
|-----|-----------|
| `GET/POST /api/settings/users` | IAM users |
| `GET/POST /api/settings/roles` | roles |
| `GET/POST /api/settings/policies` | policies |
| `GET/PATCH /api/settings/organization` | org profile |

### Integrations

| BFF | Fleetbase |
|-----|-----------|
| `GET /api/health` | reachability |
| `GET/POST /api/integrations/webhooks` | webhooks |
| `GET /api/integrations/logs` | API logs |
| `GET /api/integrations/events` | platform events |

### Public

| BFF | Scope |
|-----|-------|
| `GET /api/track/[token]` | HMAC-scoped shipment read |

Full list: [bff-endpoints.md](../api/bff-endpoints.md).

---

## Repository pattern

`shipment-repository.ts` (and future repos) abstract data source:

```typescript
// Pseudocode
async listShipments(filters) {
  if (fleetbaseConfigured) return fleetbaseClient.listOrders(mappedFilters);
  return devStore.listShipments(filters);
}
```

Apply same pattern for drivers, vehicles, clients as modules ship.

---

## Caching

| Resource | TTL | Notes |
|----------|-----|-------|
| Shipment list | 30s | Invalidate on WS event |
| Fleet registry | 5 min | |
| Settings / IAM | 10 min | Invalidate on mutation |
| Live GPS | **No cache** | WebSocket only |
| Track page | 15s | Public; rate limited |

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial BFF spec |
| 11 Jul 2026 | Full product endpoint map, repository pattern |
