# Fleetbase API Notes

| Field | Value |
|-------|-------|
| **Status** | P0 spike — fill after Docker boot |

Working notes from Fleetbase integration spike. Official docs: https://fleetbase.io/docs

---

## Connection

| Item | Value |
|------|-------|
| Base URL (local) | `http://localhost:8000/v1` |
| Base URL (prod) | TBD — internal only |
| Auth | `Authorization: Bearer flb_...` |
| Console (dev) | `http://localhost:4200` |

---

## Key endpoints (MVP)

| Operation | Method | Endpoint |
|-----------|--------|----------|
| List orders | GET | `/v1/orders` |
| Get order | GET | `/v1/orders/:id` |
| Create order | POST | `/v1/orders` |
| Update order | PATCH | `/v1/orders/:id` |
| List drivers | GET | `/v1/drivers` |
| List vehicles | GET | `/v1/vehicles` |
| Assign driver | PATCH | `/v1/orders/:id` (payload TBD spike) |
| Get proofs | GET | `/v1/orders/:id/proofs` |
| Upload proof | POST | `/v1/orders/:id/proofs` |

---

## WebSocket (SocketCluster)

| Channel | Events |
|---------|--------|
| `driver.{id}` | location updates |
| Order channels | status changes |

Client: `socketcluster-client` npm package.

---

## Spike checklist

- [x] Docker compose up (local Docker Desktop, port 8000)
- [ ] Create API key (manual — Fleetbase console)
- [ ] POST test order Amravati → Nagpur
- [ ] Create driver + vehicle
- [ ] Assign and transition status
- [ ] Subscribe to live location
- [ ] Upload test ePOD image
- [ ] Document response schemas below

---

## Spike findings

**11 Jul 2026 — initial probe**

| Check | Result |
|-------|--------|
| `GET /v1/orders` without token | `401` — endpoint live, auth required |
| `GET /v1/orders` with invalid token | `401` |
| TSM BFF client | `FleetbaseClient` in `app-tsm/src/lib/fleetbase/client.ts` |
| Data fallback | Missing/invalid key → dev-store mock data |
| Env vars | `FLEETBASE_API_URL`, `FLEETBASE_API_KEY` in `.env.local` |

**Auth header:** `Authorization: Bearer flb_...`

**Next steps:** Create API key in Fleetbase console → paste into `app-tsm/.env.local` → `npm run test:fleetbase` → restart dev server.

### Console blank page fix (pre-built image)

The production console image calls `http://localhost/int/v1` (port **80**), not `:8000`. The override maps httpd to both ports:

```yaml
httpd:
  ports:
    - "8000:80"
    - "80:80"
```

Also set full `fleetbase.config.json` with SocketCluster keys (for dev-built console).

### Create order sample

```json
{
  "pickup": {},
  "dropoff": {},
  "meta": {
    "lr_number": "",
    "commodity": "cement",
    "tonnage": 32
  }
}
```

### Gotchas

- _TBD_

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Template for spike notes |
| 11 Jul 2026 | Initial Docker probe + BFF client notes |
