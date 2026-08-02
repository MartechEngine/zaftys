# TSM ↔ TranZfort — Pilot cleanup & live smoke runbook

**Document ID:** `TSM-TZ-pilot-cleanup-and-smoke-runbook`  
**Created:** 29 July 2026  
**Scope:** `zaftys-main/app-tsm` local/dev DB only + **read-mostly** checks on live TranZfort  
**Parent TODO:** [`TODO-TSM-Tranzfort-app-tsm-26-july.md`](./TODO-TSM-Tranzfort-app-tsm-26-july.md)

**Hard rule:** Cleanup and resets happen on **TSM**. Do **not** delete TranZfort loads, profiles, or KYC data.

---

## 0 — Goals

1. Strip TSM of demo/mock noise so Live badges and Network desks are trustworthy.  
2. Keep minimal **dev** logins for QA.  
3. Link **one** verified TZ supplier and run **one** live Super Load smoke — without harming other producers on prod.

---

## 1 — TSM cleanup checklist

### 1.1 Env (before / after wipe)

| Check | Expected for pilot |
|-------|-------------------|
| `TSM_DEMO_UI` | unset or `0` |
| `TSM_TRANZFORT_BRIDGE_MODE` | `mock` until §3 smoke |
| `TRANZFORT_SUPABASE_URL` / `TRANZFORT_SERVICE_KEY` | present for live (server only) — `npm run secrets:tranzfort` |
| Service key | **never** in browser, desktop, or git |

Restart `npm run dev` after env changes.

### 1.2 Keep vs remove (users)

**Keep (dev/test allowlist):**

- `admin@zaftys.com`
- `dispatcher@zaftys.com`
- Optionally `fleet@zaftys.com` if you still need fleet QA

**Remove from TSM auth-lite** (unless you explicitly need them for the pilot):

- Extra `auth:create-user` accounts (e.g. one-off emails)  
- Any user that is **not** on the allowlist  

**Do not delete on TranZfort:** supplier accounts, loads, KYC, Google users.

> Pilot supplier (e.g. Tabish) stays on **TZ**. For TSM, either keep a matching auth-lite seat **or** wait for L1 and use TZ password only.

### 1.3 Automated cleanup (TSM Postgres)

From `app-tsm` with Docker DB up and `DATABASE_URL` set:

```bash
# 1) Legacy demo document IDs (safe, known list)
npm run db:wipe-demo

# 2) Pilot cleanup: network listings/offers, publish audit, optional auth prune, reset tsm_org
npm run db:pilot-cleanup -- --dry-run
npm run db:pilot-cleanup
# Optional: also prune auth_users not in allowlist
npm run db:pilot-cleanup -- --prune-auth
```

What `db:pilot-cleanup` does (TSM only):

| Target | Action |
|--------|--------|
| `network_listings` / `network_offers` | Truncate (clears mock Live rows) |
| `app_documents` where `collection = tsm_publish_audit` | Delete |
| `app_documents` where `collection = tsm_org` | Reset to clean default (no `tranzfortSupplierId`) |
| `auth_users` / `user_passwords` | Only if `--prune-auth` — keep allowlist emails |
| `.data/auth-seed.json` | Rewrite to allowlist only when `--prune-auth` |

Then restart the Next server so in-memory stores rehydrate.

### 1.4 Manual verify after cleanup

```bash
# Login should work for dispatcher / admin (password `dev` unless you changed hashes)
# GET /api/tsm/org → linked: false, mode: mock (or liveConfigured without link)
```

| UI check | Expect |
|----------|--------|
| Network hub | No fake Live / Super from `tz-mock-*` |
| Outbound desk | Empty or only real rows you re-create |
| `TSM_DEMO_UI` | No demo banner / demo offer seeds |

### 1.5 Org identity for pilot

Before link (§3):

- Prefer dedicated `tsm_org_id` for the pilot company (Option B in TODO **H**), **or**  
- Accept temporary use of `org_zaftys_local` **only** if no other live customers share this instance  

`PATCH /api/tsm/org` with real `legalName`, `tradeName`, `mainContactName` — **never** leave “ZAFTYS” if linking a real supplier (link RPC copies names onto TZ).

---

## 2 — What never to do on live TranZfort

| Forbidden | Why |
|-----------|-----|
| `DELETE` loads / profiles / auth users | Destroys marketplace |
| Re-run KYC “reset” to test link | Breaks verified suppliers |
| Link `supplier@zaftys.com` (platform) | Rejected / wrong identity |
| Broad `UPDATE profiles SET verification_status` | Bypasses KYC product |
| Put `TRANZFORT_SERVICE_KEY` in desktop/APK | Full bypass of RLS |
| Enable L2 OTP on prod without flag soak | Notification spam / new surface |
| Map two TSM orgs to one supplier (or vice versa casually) | UNIQUE map conflicts |

**Allowed prod writes for this pilot (minimal):**

1. One `service_upsert_tsm_org_supplier_link` for the pilot UUID (after checklist).  
2. One (or few) `service_publish_tsm_load_as_super` smoke posts.  
3. Later: read `get_supplier_loads_list` (prefer user JWT after L1).

---

## 3 — Live smoke runbook (one supplier)

Do **not** start until TODO **I** (live safety) is done or explicitly waived in writing.

### 3.1 Preconditions

- [ ] TSM cleaned (§1); `TSM_DEMO_UI=0`  
- [ ] Bridge secrets loaded; mode still `mock` until step 3.4  
- [ ] Publish form blocks stub catalog in live (I) **or** you confirmed catalog `source=live`  
- [ ] Idempotency reuse fixed **or** you will publish **once** only  
- [ ] Pilot supplier verified on TZ  

### 3.2 Resolve supplier UUID (read-only SQL on TZ)

**Pilot (Tabish) — confirmed from TZ app:**

| Field | Value |
|-------|--------|
| Name | Tabish Khan |
| Email | `tabish.khan9404@gmail.com` |
| `profiles.id` / User UID | `652922ee-5780-4af2-9297-085da0fa1008` |

Still verify before live link (read-only):

```sql
select id, email, full_name, verification_status, user_role_type
from profiles
where id = '652922ee-5780-4af2-9297-085da0fa1008';

-- Must be empty or already this org:
select * from tsm_org_supplier_map
where supplier_id = '652922ee-5780-4af2-9297-085da0fa1008';
```

Abort if: not `supplier`, not `verified`, or mapped to another `tsm_org_id`.

Suggested TSM company fields before link:

```json
{
  "legalName": "Tabish Khan",
  "tradeName": "Tabish Khan",
  "mainContactName": "Tabish Khan"
}
```

(Prefer TZ `suppliers.company_name` if it differs — paste that as `tradeName`.)

### 3.3 Set TSM company fields

**UI:** Settings → Organization → **TranZfort publish identity** panel (save trade/legal/contact first; link is blocked while trade name is still `ZAFTYS`).

Or API:

```http
PATCH /api/tsm/org
{ "legalName": "…", "tradeName": "…", "mainContactName": "…",
  "superLoadAutoPolicy": "paid_tsm_auto_activate" }
```

### 3.4 Live link (one write)

1. Set `TSM_TRANZFORT_BRIDGE_MODE=live`, restart app.  
2. Sign in as publish-capable TSM user.  
3. Paste UUID in Settings → Organization (or `POST /api/tsm/tranzfort/link-supplier`) with company/contact matching §3.3.  
4. `GET /api/tsm/org` → `bridge.linked: true`, `bridge.liveLinked: true`, `mode: live`.  

Confirm on TZ (read-only):

```sql
select tsm_org_id, supplier_id, company_name, main_contact_name, super_load_auto_policy
from tsm_org_supplier_map
where tsm_org_id = '<your-org-id>';
```

### 3.5 One Super Load publish

1. Create a **test** pending shipment in TSM (clearly named, e.g. `SMOKE-TZ-…`).  
2. Post to TranZfort → real catalog codes → **Publish as Super Load** **once**.  
3. Record `load_id` from response + publish audit.  

Expect:

- `load_id` is **not** `tz-mock-…`  
- APK Find Loads / My Loads: Super, ideally `active`  
- TSM badge: Live (only if mode live + real id)  

### 3.6 Abort / rollback (TSM-side)

| Issue | Action |
|-------|--------|
| Bad catalog / failed RPC | Stay on mock; fix I; do not retry-spam |
| Wrong company name on TZ | Re-link with correct names (updates map + supplier row) — avoid thrashing |
| Need to stop live posts | Set `TSM_TRANZFORT_BRIDGE_MODE=mock`, restart |
| Accidental duplicate loads | Stop; cancel in **TZ app** if product allows; do not mass-delete SQL |

Unlinking: prefer leave map row; switch TSM to mock. Deleting map rows in prod SQL only with explicit ops approval.

### 3.7 After smoke success

- [ ] Keep `load_id` in notes / Bitwarden ops — not in git  
- [ ] Decide: stay live for pilot desk work, or mock until L1/J  
- [ ] Next TODO: **L1** then **J** (My Loads read-through)  

---

## 4 — Readiness gate (go / no-go)

| Gate | Go if |
|------|--------|
| Cleanup | Demo listings gone; allowlist users only; DEMO_UI=0 |
| Safety (I) | No stub→live publish; no mock Live badges; idempotency OK **or** single-shot discipline |
| Link (H) | Verified UUID; company names real; map 1:1 |
| Smoke | One real Super Load visible in TZ APK |
| Scale claim | **No-go** until L1 + J (same supplier + My Loads) |

---

## 5 — Related commands

| Command | Purpose |
|---------|---------|
| `npm run db:wipe-demo` | Remove known demo `app_documents` ids |
| `npm run db:pilot-cleanup` | Pilot truncate listings/audit/reset org |
| `npm run db:pilot-cleanup -- --prune-auth` | Also prune auth-lite to allowlist |
| `npm run secrets:tranzfort` | Load TZ keys into `.env.local` |
| `npm run auth:create-user` | Add seat (prefer allowlist only) |
| `npm run test:auth` | Login + org smoke |

---

## 6 — Document history

| Date | Note |
|------|------|
| 29 Jul 2026 | Initial cleanup + live smoke runbook for same-supplier pilot |
