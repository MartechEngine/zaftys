# Wireframes — MVP Screens

| Field | Value |
|-------|-------|
| **Parent** | [ui-ux-features.md](../ui-ux-features.md) |
| **Figma** | [figma-links.md](./figma-links.md) |

ASCII wireframes for MVP. Replace with Figma when design starts.

---

## 1. Login

```
┌─────────────────────┬─────────────────────┐
│  NAVY PANEL         │  FORM               │
│  [Logo]             │  Sign in to TSM     │
│  Tagline            │  Email [________]   │
│  Industrial image   │  Password [_____]   │
│                     │  [ ] Remember me    │
│                     │  [ Sign in ] orange │
│                     │  info@zaftys.com    │
└─────────────────────┴─────────────────────┘
```

---

## 2. Command Center

```
┌──Sidebar──┬────────────────────────────────────────────┐
│ Command ● │  Command Center          [Search] [Bell]   │
│ Shipments │  ┌────┐ ┌────┐ ┌────┐ ┌────┐               │
│ Dispatch  │  │ 12 │ │  2 │ │  3 │ │  5 │  KPI cards    │
│ Map       │  └────┘ └────┘ └────┘ └────┘               │
│ Fleet     │  ┌──────────────────┬───────────────┐      │
│           │  │                  │ Exceptions    │      │
│           │  │    MINI MAP      │ · ZFT-0142    │      │
│           │  │                  │ · ZFT-0098    │      │
│           │  └──────────────────┴───────────────┘      │
│           │  Recent activity feed...                     │
└───────────┴────────────────────────────────────────────┘
```

---

## 3. Shipments list

```
┌──Sidebar──┬────────────────────────────────────────────┐
│           │  Shipments    [Filter] [Search] [+ Create]   │
│           │  All | Active | Completed | Exceptions       │
│           │  ┌──────────────────────────────────────────┐│
│           │  │ ID    Client  Route      Status  ETA     ││
│           │  │ ZFT-.. Acme   A→N       In transit 2pm  ││
│           │  │ ZFT-.. XYZ    B→P       Pending   —      ││
│           │  └──────────────────────────────────────────┘│
└───────────┴────────────────────────────────────────────┘
```

---

## 4. Shipment detail

```
┌──Sidebar──┬────────────────────────────────────────────┐
│           │  ZFT-2026-0142  [In transit] [Fleet]       │
│           │  [Assign driver]  [Send track link]          │
│           │  ┌─────────────────┬─────────────────────┐  │
│           │  │ Timeline        │ Map + live marker   │  │
│           │  │ Trip facts      │ Driver / Vehicle    │  │
│           │  │ Parties         │ Documents / ePOD    │  │
│           │  └─────────────────┴─────────────────────┘  │
└───────────┴────────────────────────────────────────────┘
```

---

## 5. Dispatch board

```
┌──Sidebar──┬────────────────────────────────────────────┐
│           │  Dispatch board                             │
│           │  ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│           │  │Unassigned│ │ Assigned │ │In progress│   │
│           │  │ [card]   │ │ [card]   │ │ [card]    │   │
│           │  │ [card]   │ │          │ │           │   │
│           │  └──────────┘ └──────────┘ └──────────┘    │
└───────────┴────────────────────────────────────────────┘
```

---

## 6. Fleet

```
┌──Sidebar──┬────────────────────────────────────────────┐
│           │  Fleet   Vehicles | Drivers | Documents     │
│           │  ⚠ 3 vehicles expiring within 30 days       │
│           │  ┌──────────────────────────────────────────┐│
│           │  │ Reg      Type    Capacity  Docs  Status  ││
│           │  └──────────────────────────────────────────┘│
└───────────┴────────────────────────────────────────────┘
```

---

## 7. Live map

```
┌─────────────────────────────────────────────────────────┐
│ [All] [Own fleet] [Network] [Delayed]     [Search] [⛶]  │
├───────────────────────────────────────┬─────────────────┤
│                                       │ Side panel      │
│           FULL MAP                    │ (on marker      │
│           + markers                   │  click)         │
│                                       │                 │
└───────────────────────────────────────┴─────────────────┘
```

---

## 8. Client tracking (public)

```
┌─────────────────────────┐
│ [Logo]  Track shipment  │
│ ┌─────────────────────┐ │
│ │   IN TRANSIT        │ │
│ │   ETA today 2:00 PM │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │      MAP            │ │
│ └─────────────────────┘ │
│ Timeline (customer)     │
│ Powered by ZAFTYS TSM™  │
└─────────────────────────┘
```

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial ASCII wireframes |
