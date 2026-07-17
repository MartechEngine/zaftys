# Fleetbase Docker Spike

| Phase | P0 |
|-------|-----|
| **Status** | Template — complete after spike |

---

## Goal

Boot Fleetbase locally, create order/driver/vehicle, verify API + WebSocket for TSM integration.

---

## Prerequisites

- Docker Desktop
- 8GB+ RAM available
- Git clone `fleetbase/fleetbase` or use compose from `zaftys-lab/infra/fleetbase/`

---

## Steps

```bash
# 1. Clone / navigate to infra
cd infra/fleetbase

# 2. Start stack
docker compose up -d

# 3. Wait for health
curl http://localhost:8000/health

# 4. Open dev console (optional)
# http://localhost:4200

# 5. Create API key via console or CLI

# 6. Test order create
curl -X POST http://localhost:8000/v1/orders \
  -H "Authorization: Bearer $FLEETBASE_API_KEY" \
  -H "Content-Type: application/json" \
  -d @./fixtures/test-order.json
```

---

## Ports

| Service | Port |
|---------|------|
| API | 8000 |
| Console | 4200 |
| PostgreSQL | 5432 (internal) |

---

## Spike checklist

- [ ] Stack boots without errors
- [ ] API key created
- [ ] Test order Amravati → Nagpur
- [ ] Driver + vehicle registered
- [ ] Assignment works
- [ ] Status transition to completed
- [ ] ePOD upload works
- [ ] WebSocket location event received
- [ ] Notes captured in [fleetbase-api-notes.md](../integrations/fleetbase-api-notes.md)

---

## Troubleshooting

| Issue | Action |
|-------|--------|
| Port conflict | Change compose port mapping |
| DB migration fail | `docker compose down -v` and retry |
| API 401 | Regenerate API key |

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Spike runbook template |
