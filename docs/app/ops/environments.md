# Environments

| Environment | URL | Purpose |
|-------------|-----|---------|
| **Local** | `http://localhost:3000` | Dev portal |
| **Local BFF** | `http://localhost:3000/api` | API routes |
| **Local Fleetbase** | `http://localhost:8000` | Docker API |
| **Local Fleetbase UI** | `http://localhost:4200` | Dev sandbox only |
| **Staging** | TBD | Pre-prod testing |
| **Production** | `https://app.zaftys.com` | Live portal |

---

## Related URLs

| Surface | URL |
|---------|-----|
| Marketing | `https://zaftys.com` |
| TranZfort | `https://tranzfort.com` |
| Public track | `https://app.zaftys.com/track/{token}` |

---

## Environment variables (portal)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | ZAFTYS App Postgres (Compose) |
| `REDIS_URL` | Redis |
| `S3_ENDPOINT` / `S3_*` | MinIO / S3 for documents |
| `TSM_DEMO_UI` | `1` demo seed · `0` live Fleetbase |
| `FLEETBASE_API_URL` | Internal Fleetbase base |
| `FLEETBASE_API_KEY` | Server-only |
| `TRANZFORT_SUPABASE_URL` | Sync worker |
| `TRANZFORT_SERVICE_KEY` | Server-only |
| `MAPBOX_TOKEN` | Map tiles |
| `SESSION_SECRET` | Auth signing |
| `TRACK_TOKEN_SECRET` | HMAC for public links |

See `app-tsm/.env.example` and [local-docker.md](./local-docker.md).

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial environments |
| Jul 2026 | App DB + Docker local contract (ADR-007) |
