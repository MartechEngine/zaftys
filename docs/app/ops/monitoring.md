# Monitoring

| Phase | P2 |

---

## Health checks

| Check | Endpoint / method | Alert if |
|-------|-------------------|----------|
| Portal up | `GET /api/health` | 5xx > 1 min |
| Fleetbase up | Internal ping | Down > 2 min |
| Sync freshness | Last sync timestamp | > 5 min stale |
| WebSocket | Connection count | 0 connections during ops hours |

---

## Metrics to track

| Metric | Source |
|--------|--------|
| API latency p95 | BFF logs |
| Error rate | BFF logs |
| Active WebSocket clients | WS server |
| GPS stale count | Exception job |
| Sync queue depth | Sync worker |

---

## Logging

- Structured JSON logs from BFF
- Correlation ID per request (`x-request-id`)
- No PII in logs (mask phone, token)

---

## Tools (proposed)

| Tool | Use |
|------|-----|
| UptimeRobot / Better Stack | External uptime |
| Host metrics | VPS CPU/RAM |
| Sentry (P2) | Error tracking |

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial monitoring plan |
