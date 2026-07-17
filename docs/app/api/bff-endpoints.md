# BFF API Endpoints (Full Product)

| Parent | [README.md](./README.md) · [bff-layer.md](../architecture/bff-layer.md) |
| **Legacy** | [mvp-endpoints.md](./mvp-endpoints.md) redirects here |

Unversioned `/api/*`. Version prefix `/api/v1/*` if breaking changes needed later.

**Legend:** ✅ implemented · 🟡 partial · ⬜ planned

---

## Health & meta

| Method | Path | Auth | Status | Description |
|--------|------|------|--------|-------------|
| GET | `/api/health` | Public | ✅ | Data source, Fleetbase reachability |

---

## Auth

| Method | Path | Auth | Status | Description |
|--------|------|------|--------|-------------|
| POST | `/api/auth/login` | Public | ✅ | Email + password → session |
| POST | `/api/auth/logout` | Session | ✅ | Clear session |
| GET | `/api/auth/me` | Session | ✅ | Current user + role |
| POST | `/api/auth/forgot-password` | Public | ⬜ | Email reset link |
| POST | `/api/auth/reset-password` | Token | ⬜ | Set new password |

---

## Shipments (Operations)

| Method | Path | Roles | Status | Description |
|--------|------|-------|--------|-------------|
| GET | `/api/shipments` | scoped | 🟡 | List with filters |
| GET | `/api/shipments/:id` | scoped | 🟡 | Detail + timeline |
| POST | `/api/shipments` | dispatcher, admin | ⬜ | Create shipment |
| PATCH | `/api/shipments/:id` | dispatcher, admin | ⬜ | Update status, meta |
| POST | `/api/shipments/:id/assign` | dispatcher, admin | ✅ | Assign driver + vehicle |
| POST | `/api/shipments/:id/cancel` | dispatcher, admin | ⬜ | Cancel + reason |
| GET | `/api/shipments/:id/assign-options` | dispatcher | ✅ | Drivers + vehicles |
| GET | `/api/shipments/:id/documents` | scoped | ⬜ | List proofs |
| POST | `/api/shipments/:id/documents` | dispatcher, fleet | ⬜ | Upload LR/ePOD |
| POST | `/api/shipments/:id/track-link` | dispatcher, admin | ✅ | Generate public token |
| POST | `/api/shipments/import` | admin | ⬜ | Bulk CSV |

### Query — `GET /api/shipments`

| Param | Values |
|-------|--------|
| `tab` | all, active, completed, exceptions |
| `status` | lifecycle status |
| `origin_type` | fleet, network |
| `client_id` | filter by shipper |
| `corridor` | lane filter |
| `page`, `limit` | pagination |
| `sort` | column sort |

---

## Dispatch

| Method | Path | Roles | Status | Description |
|--------|------|-------|--------|-------------|
| GET | `/api/dispatch/board` | dispatcher | ⬜ | Kanban columns |
| POST | `/api/dispatch/overflow` | dispatcher | ⬜ | Send to TranZfort |

---

## Dashboard (Command Center)

| Method | Path | Roles | Status | Description |
|--------|------|-------|--------|-------------|
| GET | `/api/dashboard/kpis` | dispatcher, admin | ✅ | KPI counts |
| GET | `/api/dashboard/exceptions` | dispatcher, admin | ✅ | Exception queue |
| GET | `/api/dashboard/activity` | dispatcher, admin | ✅ | Recent events |

---

## Fleet (Resources)

| Method | Path | Roles | Status | Description |
|--------|------|-------|--------|-------------|
| GET | `/api/fleet/vehicles` | ops, fleet, admin | 🟡 | Vehicle list |
| GET | `/api/fleet/vehicles/:id` | ops, fleet, admin | ⬜ | Vehicle detail |
| POST | `/api/fleet/vehicles` | fleet, admin | ⬜ | Create vehicle |
| PATCH | `/api/fleet/vehicles/:id` | fleet, admin | ⬜ | Update vehicle |
| GET | `/api/fleet/drivers` | ops, fleet, admin | 🟡 | Driver list |
| GET | `/api/fleet/drivers/:id` | ops, fleet, admin | ⬜ | Driver detail |
| POST | `/api/fleet/drivers` | fleet, admin | ⬜ | Create driver |
| GET | `/api/fleet/places` | ops, admin | ⬜ | Places list |
| GET | `/api/fleet/groups` | ops, admin | ⬜ | Fleet groups |
| GET | `/api/fleet/issues` | fleet, admin | ⬜ | Fault reports |
| GET | `/api/fleet/fuel/reports` | fleet, admin | ⬜ | Fuel summaries |
| GET | `/api/fleet/fuel/transactions` | fleet, admin | ⬜ | Fuel transactions |

---

## Clients & vendors

| Method | Path | Roles | Status | Description |
|--------|------|-------|--------|-------------|
| GET | `/api/clients` | dispatcher, admin | ⬜ | Shipper list |
| GET | `/api/clients/:id` | dispatcher, admin | ⬜ | Client detail |
| POST | `/api/clients` | admin | ⬜ | Create client |
| GET | `/api/vendors` | admin | ⬜ | Vendor list |

---

## Network (TranZfort)

| Method | Path | Roles | Status | Description |
|--------|------|-------|--------|-------------|
| GET | `/api/sync/status` | dispatcher, admin | ✅ | Sync health |
| POST | `/api/sync/run` | admin | ✅ | Manual sync trigger |
| GET | `/api/network/overflow` | dispatcher | ⬜ | Unassigned TZ loads |
| GET | `/api/network/assignments` | dispatcher, partner | ⬜ | Partner trips |

---

## Map

| Method | Path | Roles | Status | Description |
|--------|------|-------|--------|-------------|
| GET | `/api/map/vehicles` | dispatcher, admin | ✅ | Active markers |

---

## Documents

| Method | Path | Roles | Status | Description |
|--------|------|-------|--------|-------------|
| GET | `/api/documents` | scoped | ⬜ | Global proofs library |
| GET | `/api/documents/:id` | scoped | ⬜ | Document detail |

---

## Reports

| Method | Path | Roles | Status | Description |
|--------|------|-------|--------|-------------|
| GET | `/api/reports/operations` | dispatcher, admin | ⬜ | Ops dashboard data |
| GET | `/api/reports/lanes` | dispatcher, admin | ⬜ | Lane performance |
| GET | `/api/reports/export` | admin | ⬜ | CSV/PDF export |

---

## Settings & IAM

| Method | Path | Roles | Status | Description |
|--------|------|-------|--------|-------------|
| GET | `/api/settings/organization` | admin | ⬜ | Org profile |
| PATCH | `/api/settings/organization` | admin | ⬜ | Update org |
| GET | `/api/settings/users` | admin | ⬜ | User list |
| POST | `/api/settings/users/invite` | admin | ⬜ | Invite user |
| GET | `/api/settings/roles` | admin | ⬜ | Roles |
| GET | `/api/settings/policies` | admin | ⬜ | Policies |

---

## Integrations

| Method | Path | Roles | Status | Description |
|--------|------|-------|--------|-------------|
| GET | `/api/integrations/webhooks` | admin | ⬜ | Webhook list |
| POST | `/api/integrations/webhooks` | admin | ⬜ | Create webhook |
| GET | `/api/integrations/logs` | admin | ⬜ | API request logs |
| GET | `/api/integrations/events` | admin | ⬜ | Platform events |

---

## Billing (P5)

| Method | Path | Roles | Status | Description |
|--------|------|-------|--------|-------------|
| GET | `/api/billing/invoices` | finance, admin | ⬜ | Invoice list |
| GET | `/api/billing/rates` | admin | ⬜ | Service rates |

---

## Public tracking

| Method | Path | Auth | Status | Description |
|--------|------|------|--------|-------------|
| GET | `/api/track/:token` | HMAC token | 🟡 | Status + map data |

---

## WebSocket

Connect: `wss://app.zaftys.com/api/ws` (session cookie or track token scope)

See [websocket-events.md](./websocket-events.md).

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial endpoints (was mvp-endpoints.md) |
| 11 Jul 2026 | Full product endpoint catalog with status |
