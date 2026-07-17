# Auth & Tenancy

| Field | Value |
|-------|-------|
| **Decision** | [005-auth-provider.md](../decisions/005-auth-provider.md) |
| **RBAC** | [user-roles-rbac.md](../product/user-roles-rbac.md) |
| **IAM UI** | `/settings/users`, `/settings/roles`, `/settings/policies` |

---

## Auth models

| Model | Use |
|-------|-----|
| Session cookie (`tsm_session`) | Portal login — all authenticated routes |
| Signed HMAC token | Public `/track/[token]` |
| Service API key | BFF → Fleetbase, Sync → TranZfort |
| Fleetbase IAM | Source of truth for staff users (P3+) |

---

## Roles (portal)

| Role | Scope |
|------|-------|
| `admin` | Full org + settings + IAM |
| `dispatcher` | Operations modules |
| `fleet_manager` | Fleet, maintenance, documents |
| `finance` | Billing, reports (read) |
| `client` | Own shipments only |
| `partner` | Network assignments (P3) |

Nav matrix: [navigation-by-role.md](../product/navigation-by-role.md).

---

## Session claims

```json
{
  "sub": "user-uuid",
  "email": "dispatcher@zaftys.com",
  "name": "Ops User",
  "role": "dispatcher",
  "org_id": "zaftys-org-uuid",
  "partner_id": null,
  "exp": 1735689600
}
```

Edge middleware uses `session-edge.ts` (Web Crypto) — no Node `crypto` in middleware.

---

## Tenancy

| Phase | Model |
|-------|-------|
| P1–P2 | Single org (ZAFTYS + invited client users) |
| P3 | Multi-tenant — `org_id` on all BFF queries |
| P4 | Client orgs isolated; white-label track pages |

Client users scoped to `org_id` = shipper account. BFF must never return cross-org data.

---

## IAM integration (Fleetbase)

Full product ships IAM UI mirroring Fleetbase console:

| Feature | Route |
|---------|-------|
| Users (staff, drivers, customers) | `/settings/users` |
| Roles + permission picker | `/settings/roles` |
| Policies | `/settings/policies` |
| Groups | `/settings/groups` |
| Invite flow | Modal + email |
| FLB managed roles | Read-only display |

Dev mode today: hardcoded users in BFF. Prod: sync with Fleetbase IAM or mirror table.

---

## Public track tokens

| Property | Value |
|----------|-------|
| Algorithm | HMAC-SHA256 |
| Payload | `shipment_id`, `exp`, `scope: track` |
| Expiry | 90 days post-delivery |
| Rate limit | 60 req/min per IP |
| Rotation | New token invalidates old |

---

## Password & security

| Policy | Value |
|--------|-------|
| Min length | 8 characters |
| Reset | Email link (P3) |
| MFA / TOTP | Admin + finance (P5) |
| SSO | Google/Microsoft enterprise (P4) |

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial auth spec |
| 11 Jul 2026 | Full IAM routes, edge session, role matrix |
