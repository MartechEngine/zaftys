# Flow — User Onboarding

| Priority | P2 |

---

## Flowchart

```mermaid
flowchart TD
  A[Admin opens Settings → Users] --> B[Invite user email + role]
  B --> C[System sends invite email]
  C --> D[User clicks invite link]
  D --> E[Set password]
  E --> F[Login]
  F --> G[Role-based landing]
```

---

## Roles invited

| Role | Typical invitee |
|------|-----------------|
| `dispatcher` | ZAFTYS ops |
| `fleet_manager` | Fleet office |
| `client` | Shipper contact at enterprise account |

---

## MVP workaround

Manual user seed in database until Settings UI ships.

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial onboarding flow |
