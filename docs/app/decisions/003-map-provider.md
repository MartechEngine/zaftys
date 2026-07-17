# ADR-003: Map Provider

| Status | **Proposed** |
| Date | Jul 2026 |

---

## Context

TSM requires live vehicle map, route polylines, geocoding for Indian cities, and styled markers matching ZAFTYS brand. Map is on Command Center, Live Map, Shipment detail, and public tracking.

---

## Decision (proposed)

Use **Mapbox GL JS** for portal maps.

---

## Alternatives

| Provider | Pros | Cons |
|----------|------|------|
| **Mapbox** | Style control, good SDK | Usage-based cost |
| **Google Maps** | India coverage, familiar | Less style control, cost |
| **OpenStreetMap + Leaflet** | Free tiles | Self-host tiles or usage limits |

---

## Consequences

- Budget for map API usage at scale
- Store `MAPBOX_TOKEN` server-side for geocoding; public token restricted by URL

---

## Action

Confirm during P0 spike with 50-marker load test on dispatch floor tablet.

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Proposed |
