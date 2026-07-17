# Component Library — TSM Portal

| Field | Value |
|-------|-------|
| **Stack** | shadcn/ui + Tailwind |
| **Parent** | [ui-ux-features.md](../ui-ux-features.md) |

Shared components live under `@/components/app/` in the portal repo (when scaffolded).

---

## Layout

| Component | Props / behavior |
|-----------|------------------|
| `AppShell` | `children`, sidebar nav by role, top bar |
| `PageHeader` | `title`, `breadcrumbs?`, `actions?: ReactNode` |
| `SidebarNav` | `items[]`, `collapsed`, active route highlight |

---

## Data display

| Component | Notes |
|-----------|-------|
| `KpiCard` | `label`, `value`, `href?`, `variant?` (default/warning) |
| `ShipmentsTable` | Sort, tabs, row click, status column |
| `ShipmentCard` | Kanban card for dispatch board |
| `Timeline` | `events[]`, current step highlight |
| `DocumentGallery` | Thumbnails, upload, download |

---

## Status & badges

| Component | Notes |
|-----------|-------|
| `ShipmentStatusChip` | Maps [status-enumerations](../data/status-enumerations.md) |
| `OriginBadge` | `fleet` \| `network` \| `handoff` |
| `DocExpiryBadge` | green / orange / red traffic light |
| `StaleGpsWarning` | Banner when last ping > threshold |

---

## Map

| Component | Notes |
|-----------|-------|
| `LiveMap` | `markers`, `route?`, `height`, `onMarkerClick`, layers |
| `MiniMap` | Reduced controls for Command Center |

See [map-ux-spec.md](./map-ux-spec.md).

---

## Forms & actions

| Component | Notes |
|-----------|-------|
| `AssignDriverDrawer` | Driver + vehicle select, validation |
| `FilterDrawer` | Shared filter panel for lists |
| `GlobalSearch` | ⌘K command palette (P2) |
| `EmptyState` | `icon`, `title`, `description`, `action?` |

---

## Feedback

| Component | Notes |
|-----------|-------|
| `NotificationBell` | Exception count badge |
| Toasts | shadcn Sonner — success/error/warning |
| Skeletons | Table rows, KPI cards, map placeholder |

---

## States (all list/detail components)

Every component must handle: **loading**, **empty**, **error**, **success**.

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial component inventory |
