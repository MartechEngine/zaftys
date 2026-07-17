# User Roles & RBAC

| Field | Value |
|-------|-------|
| **Parent** | [app-overview.md](../app-overview.md) |

---

## Roles

| Role | Code | Description |
|------|------|-------------|
| **Admin** | `admin` | Full access, user management, settings |
| **Dispatcher / Ops** | `dispatcher` | Command center, dispatch, all shipments |
| **Fleet manager** | `fleet_manager` | Fleet registry, compliance docs |
| **Shipper / Client** | `client` | Own org shipments only, read + track |
| **Network partner** | `partner` | TranZfort-assigned loads only (Phase 2+) |

---

## Permission matrix (MVP)

| Permission | Admin | Dispatcher | Fleet mgr | Client | Partner |
|------------|:-----:|:----------:|:---------:|:------:|:-------:|
| View Command Center | ✅ | ✅ | ❌ | ❌ | ❌ |
| View all shipments | ✅ | ✅ | 👁️ read | ❌ | ❌ |
| View own org shipments | ✅ | ✅ | 👁️ | ✅ | ❌ |
| View assigned partner loads | ✅ | ✅ | ❌ | ❌ | ✅ |
| Create shipment | ✅ | ✅ | ❌ | ❌ | ❌ |
| Assign driver/vehicle | ✅ | ✅ | ❌ | ❌ | ❌ |
| Cancel shipment | ✅ | ✅ | ❌ | ❌ | ❌ |
| View Live map (all fleet) | ✅ | ✅ | 👁️ | ❌ | ❌ |
| Manage vehicles/drivers | ✅ | 👁️ | ✅ | ❌ | ❌ |
| Upload documents | ✅ | ✅ | ✅ | ❌ | 👁️ ePOD |
| Download ePOD / LR | ✅ | ✅ | ✅ | ✅ | ✅ |
| Generate track link | ✅ | ✅ | ❌ | ✅ | ❌ |
| Manage users | ✅ | ❌ | ❌ | ❌ | ❌ |
| Org settings | ✅ | ❌ | ❌ | ❌ | ❌ |
| Send to TranZfort | ✅ | ✅ | ❌ | ❌ | ❌ |

👁️ = read-only where noted.

---

## Data scoping

| Role | Scope rule |
|------|------------|
| `client` | `shipment.client_org_id === user.org_id` |
| `partner` | `shipment.assigned_partner_id === user.partner_id` |
| `dispatcher` | All shipments in ZAFTYS org |
| `fleet_manager` | All fleet assets in ZAFTYS org |

---

## Default landing routes

| Role | Route after login |
|------|-------------------|
| `admin` | `/` |
| `dispatcher` | `/` |
| `fleet_manager` | `/fleet` |
| `client` | `/shipments` |
| `partner` | `/network/assignments` (P2; MVP: `/shipments` filtered) |

See [navigation-by-role.md](./navigation-by-role.md).

---

## Public access

| Resource | Auth |
|----------|------|
| `/login` | None |
| `/track/[token]` | Signed token, no session |
| All other routes | Session required |

Track tokens: scoped to single shipment; expire 90 days post-delivery.

---

## Implementation notes

- Enforce RBAC in **BFF**, not only UI
- JWT/session claims: `role`, `org_id`, `partner_id?`
- Audit log for assign, cancel, doc upload (P2)

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial RBAC matrix |
