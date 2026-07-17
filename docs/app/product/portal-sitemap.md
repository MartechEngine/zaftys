# Portal Sitemap — Routes & IA

| Field | Value |
|-------|-------|
| **Parent** | [ui-ux-features.md](../ui-ux-features.md) |

Full route tree. **MVP** = P2 first ship; **P2B** = post-MVP; **P3+** = later.

---

## MVP routes (ship first)

| Route | Screen | Auth |
|-------|--------|------|
| `/login` | Login | Public |
| `/` | Command Center | Ops, Admin |
| `/shipments` | Shipments list | All authenticated |
| `/shipments/[id]` | Shipment detail | Scoped |
| `/dispatch` | Dispatch board | Ops, Admin |
| `/map` | Live map | Ops, Admin |
| `/fleet` | Fleet hub | Ops, Fleet, Admin |
| `/track/[token]` | Client tracking | Public |

---

## Phase 2 routes

| Route | Screen |
|-------|--------|
| `/shipments/new` | Create shipment wizard |
| `/network/overflow` | TranZfort overflow queue |
| `/network/assignments` | Partner assignments |
| `/clients` | Shipper accounts |
| `/documents` | Global document library |
| `/reports` | Analytics hub |
| `/reports/lanes` | Lane performance |
| `/settings` | Org settings |
| `/settings/users` | User management |
| `/settings/notifications` | Alert preferences |
| `/fleet/vehicles/[id]` | Vehicle detail |
| `/fleet/drivers/[id]` | Driver detail |
| `/notifications` | Alert inbox |
| `/forgot-password` | Password reset |
| `/profile` | User profile |

---

## Phase 3+ routes (full IA target)

| Route | Screen |
|-------|--------|
| `/billing` | Billing overview |
| `/billing/invoices/[id]` | Invoice detail |
| `/maintenance` | Maintenance schedules |
| `/maintenance/work-orders/[id]` | Work order detail |
| `/integrations` | Integration health |
| `/integrations/tranzfort` | Sync status |
| `/integrations/fleetbase` | Backend health |
| `/analytics/command` | Advanced command analytics |
| `/analytics/utilization` | Fleet utilization |
| `/help` | In-app help |
| `/legal/privacy` | Privacy |
| `/legal/terms` | Terms |

Reference mockup IA (~151 routes) lives in `zaftys-lab/mockup-ui-ux-29-june/` — trim to above for implementation order.

---

## Route naming conventions

- Plural resources: `/shipments`, `/clients`
- Detail: `/shipments/[id]`
- Nested settings: `/settings/users`
- Public: `/track/[token]` only for MVP external access

---

## Redirects

| From | To |
|------|-----|
| `zaftys.com/login` | `app.zaftys.com/login` (deferred on marketing site) |
| `/dashboard` | `/` |
| `/orders/*` | `/shipments/*` (avoid US TMS terminology in URLs) |

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial sitemap |
