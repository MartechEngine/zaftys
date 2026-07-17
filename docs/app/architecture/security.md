# Security

| Field | Value |
|-------|-------|
| **Parent** | [auth-and-tenancy.md](./auth-and-tenancy.md) |
| **Build strategy** | [build-strategy.md](./build-strategy.md) |

---

## Principles

1. RBAC enforced in BFF on **every** mutating request — no client-side-only guards
2. Least privilege API keys for Fleetbase (scoped permissions where possible)
3. No PII on public track page beyond single shipment scope
4. HTTPS everywhere — `app.zaftys.com` TLS required
5. Secrets in env only — never client bundle (`NEXT_PUBLIC_*` excludes API keys)
6. AGPL boundary — unmodified Fleetbase Docker; API-only customer access

---

## Threat mitigations

| Threat | Mitigation |
|--------|------------|
| IDOR on shipments | Scope by `org_id` + role; client role filtered by customer_id |
| Track token guessing | HMAC + long entropy; rate limit; short-lived option |
| API key leak | Server-only; rotate via `/integrations`; audit log |
| XSS | React escape; CSP headers |
| CSRF | SameSite=Lax cookies; CSRF token on mutations |
| Webhook forgery | Verify FB signature on inbound webhooks |
| File upload abuse | Type/size limits; virus scan P4 |
| Sync replay | Idempotency keys on TZ → FB create |

---

## Rate limits (BFF)

| Endpoint | Limit |
|----------|-------|
| `/api/auth/login` | 10/min per IP |
| `/api/track/*` | 60/min per IP |
| `/api/*` authenticated | 300/min per user |
| `/api/sync/run` | 5/min (admin only) |
| File upload | 10/min per user |

---

## Audit log (full product)

Log all security-relevant actions:

| Action | Fields |
|--------|--------|
| login / logout | `actor_id`, `ip`, `user_agent` |
| assign / cancel shipment | `actor_id`, `shipment_id`, `before`, `after` |
| doc upload | `actor_id`, `shipment_id`, `doc_type` |
| IAM change | `actor_id`, `target_user`, `permission` |
| API key roll | `actor_id`, `key_id` |
| settings change | `actor_id`, `setting`, `value` |

Storage: BFF table or Fleetbase audit extension. UI: `/settings/audit` (P4).

---

## Compliance (India)

| Requirement | Approach |
|-------------|----------|
| Data residency | India VPS preferred |
| GST documents | Encrypted at rest (hosting provider) |
| Driver phone | Ops-only — not on public track |
| LR / ePOD retention | Configurable retention policy |
| e-way bill data | Minimal storage; govt API P5 |

---

## Production checklist

- [ ] CSP header configured
- [ ] HSTS enabled
- [ ] No secrets in git history
- [ ] Fleetbase console not public internet
- [ ] RBAC tested per role on all routes
- [ ] Track token penetration test
- [ ] Dependency audit (`npm audit`) in CI

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial security spec |
| 11 Jul 2026 | Full product audit log, production checklist |
