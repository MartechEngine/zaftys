# Responsive Breakpoints

| Breakpoint | Width | Primary users |
|------------|-------|---------------|
| Mobile | < 768px | Client tracking, shippers |
| Tablet | 768–1023px | Dispatch floor tablets |
| Desktop | ≥ 1024px | Ops, dispatch, fleet managers |
| Wide | ≥ 1440px | Command center monitors |

---

## Per-screen behavior

| Screen | Mobile | Tablet | Desktop |
|--------|--------|--------|---------|
| Login | Stack vertical | Split | Split |
| Command Center | KPI stack only | 2-col KPI, stacked map | Full grid |
| Shipments | Card list | Table (fewer cols) | Full table |
| Shipment detail | Tabs | Stacked | 2-column |
| Dispatch | Banner: use desktop | Horizontal scroll Kanban | 4 columns |
| Fleet | Card list | Table | Table |
| Live map | N/A ops | Full + bottom sheet | Full + side panel |
| Client tracking | Primary target | Centered column | Centered max-w-lg |

---

## Ops minimum device

Dispatch board and Live map: **recommend tablet landscape minimum**. Show non-blocking banner on mobile for `dispatcher` role:

> "For dispatch operations, use a tablet or desktop for the best experience."

---

## Sidebar

| Breakpoint | Behavior |
|------------|----------|
| Desktop | Fixed sidebar, collapsible |
| Tablet | Hamburger overlay |
| Mobile | Hidden (client uses bottom tabs P2) |

---

## Touch targets

Minimum 44×44px for assign buttons, map popups, filter chips on tablet.

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial breakpoints |
