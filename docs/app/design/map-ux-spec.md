# Map UX Specification

| Field | Value |
|-------|-------|
| **Decision** | [003-map-provider.md](../decisions/003-map-provider.md) |
| **Component** | `LiveMap`, `MiniMap` |

---

## Map provider

**Proposed:** Mapbox GL JS — styling control, reasonable India coverage.

Fallback: Google Maps Platform if Mapbox licensing blocks.

---

## Layers

| Layer | Default | Toggle |
|-------|---------|--------|
| Vehicle markers | On | — |
| Route polyline | On | — |
| Pickup pin (green) | On | — |
| Drop pin (red) | On | — |
| Geofences (plant, weighbridge) | P2 | Yes |
| Traffic | Off | Yes |
| Cluster markers | On (zoom < 10) | — |

---

## Markers

| Entity | Icon | Color rule |
|--------|------|------------|
| Own fleet vehicle | Truck | Orange = moving, gray = stale |
| Network partner | Truck + badge | Orange outline |
| Pickup | Pin | Green |
| Drop | Pin | Red |

**Popup on click:** reg number, driver name, speed, last update, "View shipment" link.

---

## Controls

- Zoom +/- , recenter, fullscreen
- Filter chips in toolbar (Live map page)
- Legend collapsible panel

---

## Stale GPS UX

- Gray marker + dashed route
- Tooltip: "Location stale · last seen 45m ago"
- Surfaces in Exception queue if > 15 min on active trip

---

## Client tracking map

- Single shipment route only
- No other vehicles visible
- Simplified controls (no filter chips)
- Mobile: map height ~40vh

---

## Kiosk / TV mode (P2)

Route: `/map?kiosk=1` — hide sidebar and top chrome; auto-refresh; large markers.

---

## Performance

- Max markers rendered: cluster above 50
- WebSocket throttle: 1 update / 5s per vehicle on UI
- Tile cache via provider CDN

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial map UX spec |
