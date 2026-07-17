# Navigation by Role

| Field | Value |
|-------|-------|
| **Parent** | [user-roles-rbac.md](./user-roles-rbac.md) |

Sidebar items per role. ✅ = visible; — = hidden.

---

## Sidebar matrix

| Nav item | Admin | Dispatcher | Fleet mgr | Client | Partner |
|----------|:-----:|:----------:|:---------:|:------:|:-------:|
| Command Center | ✅ | ✅ | — | — | — |
| Shipments | ✅ | ✅ | 👁️ | ✅ | ✅ |
| Dispatch | ✅ | ✅ | — | — | — |
| Live Map | ✅ | ✅ | — | — | — |
| Fleet | ✅ | 👁️ | ✅ | — | — |
| Network | ✅ | ✅ | — | — | ✅ |
| Clients | ✅ | ✅ | — | — | — |
| Documents | ✅ | ✅ | ✅ | ✅ | 👁️ |
| Reports | ✅ | ✅ | — | ✅ | — |
| Settings | ✅ | — | — | — | — |

👁️ = limited read access.

---

## Client mobile (Phase 2)

Bottom tabs for `client` role on mobile:

| Tab | Route |
|-----|-------|
| Track | `/shipments` |
| Documents | `/documents` |
| Account | `/profile` |

---

## MVP sidebar (minimal)

Only these items ship in MVP:

| Item | Roles |
|------|-------|
| Command Center | admin, dispatcher |
| Shipments | all authenticated |
| Dispatch | admin, dispatcher |
| Live Map | admin, dispatcher |
| Fleet | admin, dispatcher, fleet_manager |

Network, Clients, Reports, Settings → Phase 2.

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial nav matrix |
