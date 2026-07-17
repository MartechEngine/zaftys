# Scaling & Performance

| Field | Value |
|-------|-------|
| **Target** | Full product at production load |
| **Build strategy** | [build-strategy.md](./build-strategy.md) |

---

## Expected load (production target)

| Metric | Year 1 estimate |
|--------|-----------------|
| Concurrent dispatchers | 10–25 |
| Active vehicles tracked | 200–500 |
| Shipments / day | 500–2000 |
| Client track page views | 2000/day |
| Concurrent map viewers | 15–30 |
| WebSocket connections | 50–100 |

---

## Performance targets

| Metric | Target |
|--------|--------|
| Command Center LCP | < 2.5s |
| Shipments list TTFB | < 500ms |
| Shipment detail TTFB | < 400ms |
| Map first paint | < 3s |
| WebSocket GPS latency | < 2s p95 |
| BFF API p95 | < 300ms |
| Kanban board interaction | < 100ms (optimistic UI) |
| Report export (CSV) | < 5s for 10k rows |

---

## Frontend performance

| Technique | Application |
|-----------|-------------|
| React Query staleTime | Lists 30s; detail 15s |
| Virtualized tables | Shipments, fleet lists >100 rows |
| Map marker clustering | Zoom < 10 on `/map` |
| Code splitting | Heavy modules (orchestrator, reports) lazy loaded |
| Image optimization | Next.js Image for ePOD thumbnails |
| Skeleton loaders | All list/detail pages |

---

## Scaling levers

| Bottleneck | Scale approach |
|------------|----------------|
| Fleetbase API | Vertical VPS → dedicated FB host |
| MySQL | Fleetbase-managed; read replica P4 |
| WebSocket connections | Dedicated WS service / horizontal BFF |
| Map tile costs | Cache geocode; limit refresh to 5s |
| Sync worker | Queue-based workers; dead letter queue |
| File storage (ePOD) | S3-compatible if proofs volume grows |

---

## Caching strategy

See [bff-layer.md](./bff-layer.md). **Live GPS never cached.**

| Layer | Strategy |
|-------|----------|
| CDN | Static assets, public track SSR |
| BFF | Short TTL on lists; invalidate via WS |
| Browser | React Query + service worker (P4) |

---

## Load testing plan

| Scenario | Tool | When |
|----------|------|------|
| 50 concurrent map markers | k6 / Playwright | P2 |
| 500 shipments list pagination | k6 | P3 |
| WS 100 connections | Artillery | P3 |
| Sync burst 50 TZ bookings | Integration test | P3 |

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial performance notes |
| 11 Jul 2026 | Production targets, frontend perf, load test plan |
