# TODO — TranZfort merge work in `app-tsm`

**Document ID:** `TODO-TSM-Tranzfort-app-tsm-26-july`  
**Created:** 26 July 2026  
**Updated:** 2 August 2026 (S4 postgres smoked; S5 staging/WebView **deferred**)  
**Status:** **Active — S4 postgres + pilot import; FB delete BLOCKED until parity; S5 deferred**  

**Architecture ADRs (locked 2 Aug):**
- [ADR-008](../decisions/008-tsm-owns-execution.md) — **TSM Postgres owns execution; drop Fleetbase** (supersedes ADR-001)
- [ADR-009](../decisions/009-documents-and-ai.md) — LR/docs + AI agents; Google + OpenRouter BYOK · **spec:** [ai-agents.md](../product/ai-agents.md)
- [ADR-007](../decisions/007-local-docker-and-app-db.md) — Docker = **ops/dev only**; customers use web/desktop → hosted TSM

**Keys status:** Bitwarden load OK — URL + anon + **full** service_role. `TSM_TRANZFORT_BRIDGE_MODE=live`.  
**Pilot Admin login:** **Continue with Google** as Tabish (`652922ee…1008`) → Org Admin; reuses existing map `org_zaftys_local` ↔ supplier (1:1 unique).  
**Team seat (ops):** invite→accept flow live; pilot `tabish.khan9404@gmail.com` / `Tabish@2026` still works with `tsmOrgId=org_zaftys_local`. Rotate before shared demo.  
**Flutter regression (2 Aug):** Google / email / reset / Find Loads card = **ZAFTYS** — **passed on device**.

### Snapshot — completed so far (31 Jul → 2 Aug)

| Done | Evidence |
|------|----------|
| **B Live bridge** | Keys in `.env.local`; mode=`live`; link + publish RPCs wired |
| **H Live link** | TZ `tsm_org_supplier_map` verified: `org_zaftys_local` ↔ `652922ee…1008` |
| **W Live write** | Publish audit `success` · load `e595b49e-9250-4a4f-bc3a-b38ab8358525` |
| **J My Loads** | Live read-through includes TSM-posted Cement Blocks Pune→Jalna (`fromTsm=true`) |
| **D2 Catalog mirror** | 839 materials + ~133k places; create-shipment pickers |
| **I Live safety** | Stub catalog blocked; India coord gate; draft saved before RPC |
| **F Booking inbox** | List + **live Approve** — trip `727a27c9…` via `service_approve_tsm_booking` |
| **Auth + roles model** | Locked (Google Admin, TSM seats, post-as-company) — see **Decisions lockbook** |
| **Google Admin login** | Smoked — Continue with Google → Admin; map reuse `org_zaftys_local` |
| **Company on card** | `company_name=ZAFTYS`; feed COALESCE applied — card shows ZAFTYS |
| **Team seats** | Invite → accept → seat session smoked; cap 3; viewer cannot publish |
| **Admin transfer** | Promote → Admin; last-admin demote/deactivate blocked **[2 Aug]** |
| **Marketplace UI** | Nav Marketplace vs TMS; local overflow honesty; posted-by audit |
| **Flutter regression** | Device OK — Google + Find Loads **ZAFTYS** |
| **Trips desk** | `/network/trips` live — Approve trip `727a27c9…` |
| **Marketplace analytics** | `/network/analytics` live — KPIs + funnel **[2 Aug]** |
| **Chat inbox** | `/network/chat` read-only — live threads; reply stays in TranZfort |
| **Cancel listing** | My Loads Cancel live (table fallback; optional RPC file ready) |
| **Publish errors** | Marketplace hub “Last publish errors” |
| **Catalog status** | Settings → Organization catalog mirror panel |
| **Local listing TTL** | Default aligned to TZ `7_days` |

### Still pending (active) — see **Development sequence** below

Do **not** start AI agents until S5–S6. Dropping Fleetbase is a big cutover — **git push checkpoint on `app-dev-mode` before Phase B/C** so we can roll back.

### Development sequence (locked 2 Aug) — work in this order

| Step | Name | Goal | Risk to live TSM | AI? |
|------|------|------|------------------|-----|
| **S0** | **Git checkpoint** | Commit + push all completed work to `app-dev-mode` | None | — |
| **S1** | **Tenancy harden** | Horizon 1 — no cross-org leakage; Org B smoke | Low (auth/org paths) | No |
| **S2** | **ExecutionStore adapter** | Horizon 0A — wrap FB; default still FB | **Very low** (refactor only) | No |
| **S3** | **Postgres LOS behind flag** | Horizon 0B — `TSM_EXECUTION_BACKEND=postgres` opt-in | Low if flag off in pilot | No |
| **S4** | **Cutover + delete FB** | Horizon 0C–D — default postgres; remove FB | **High** — smoke hard; use S0 rollback | No |
| **S5** | **Hosted + desktop** | Horizon 2–3 — staging URL; Tauri → HTTPS | Low (packaging) | No |
| **S6** | **LR / documents** | Horizon 4 docs only — LR PDF | Medium (new module) | No |
| **S7** | **AI agents (LAST)** | Horizon 4 AI — BYOK → Copilot → tools | Medium | **Yes — last** |

```text
S0 push ──► S1 tenancy ──► S2 adapter (safe) ──► S3 postgres flag
                                                      │
                         rollback to S0 tag/commit ◄──┤ if broken
                                                      ▼
                                              S4 cutover / delete FB
                                                      ▼
                                              S5 hosted + desktop
                                                      ▼
                                              S6 LR PDF (no AI yet)
                                                      ▼
                                              S7 AI agents LAST
```

#### S0 — Checkpoint (do now)

- [x] Architecture locked (ADR-008/009, DL-9…11, ai-agents.md)
- [x] Local `git commit` on `app-dev-mode` — **`24fbdb9`** (2026-08-02) — rollback point
- [x] `git push -u origin app-dev-mode` — remote tracking set (HEAD `9e5760f`)
- [x] Rollback SHAs: `24fbdb9` (main checkpoint) · `9e5760f` (S0 note tip)  
  Remote: https://github.com/MartechEngine/zaftys/tree/app-dev-mode

#### S1 — Tenancy first (NEXT after push)

Why first: selling multi-org and safe FB migration both need `tsmOrgId` isolation.

- [x] No silent fallback to `org_zaftys_local` when session org missing — throws `ORG_REQUIRED` **[2 Aug]**  
- [~] Audit LOS repos for org scope gaps — **partial** (Postgres store is org-scoped; broader audit still open)  
- [x] Support lookup email → org / supplier — `GET /api/tsm/tenancy/lookup`  
- [x] Hide fake OrgSwitcher orgs in production — single chip  
- [ ] Org B Google login smoke (cross-org empty/forbidden)  
- [ ] Seat invites smoke Org B  

**Also:** DEV_USERS explicit pilot `tsmOrgId`; marketplace APIs return 403 on tenancy errors; tenancy status can report `unscoped`.

#### S2 — Adapter only (safe refactor — do before any Postgres cutover)

Why next: unblocks S3/S4 without changing pilot behavior (`TSM_EXECUTION_BACKEND=fleetbase` default).

- [x] `ExecutionStore` interface + `FleetbaseExecutionStore` + postgres stub **[2 Aug]** — `lib/execution/*`  
- [x] Repos/fleet APIs call store; shipment list path does not use `getFleetbaseClient` directly  
- [x] Clients + `run-tranzfort-sync` use ExecutionStore on postgres (S4)  
- [x] Smoke: pilot shipments/fleet on live backend **[S4 postgres]**  

#### S3 — Postgres LOS opt-in (flag off for pilot until green)

- [x] Migrations M1 — `tsm_shipments` / `tsm_drivers` / `tsm_vehicles` / `tsm_positions` (`drizzle/0002_tsm_execution.sql`) **[2 Aug]**  
- [x] Implement `PostgresExecutionStore` for list/get/create/assign/status/patch + fleet  
- [x] Org scope: session `tsmOrgId` or `TSM_EXECUTION_ORG_ID` (smoke)  
- [x] Run `npm run db:migrate` on local **[2 Aug — applied 0002_tsm_execution]**  
- [x] Postgres default when `DATABASE_URL` set (S4 supersedes “pilot stays on fleetbase”)  
- [x] Create / list / assign / status smoke on Postgres org **[S4]**  

#### S4 — Cutover (high risk — only after S0 push + S3 green)

- [x] Default **postgres** when `DATABASE_URL` set (override: `TSM_EXECUTION_BACKEND=fleetbase`) **[2 Aug]**  
- [x] Retarget TZ sync → ExecutionStore shipments (no FB createOrder)  
- [x] `isLiveFleetbaseMode` = fleetbase only (clients use local store on postgres)  
- [x] Health / badge report TSM Postgres; FB optional escape  
- [x] Pilot smoke on postgres: health + create/list/assign + fleet + marketplace desks **[2 Aug]**  
- [~] Keep `lib/fleetbase/*` escape hatch — **do not hard-delete until parity gate below is green**  
- [ ] Full delete of Fleetbase client (S4b) — **BLOCKED** until parity gate  

**Parity gate before S4b (FB delete):**

- [x] Root cause: Postgres cutover hid pre-cutover FB shipments (e.g. Cement Blocks Pune→Jalna)  
- [x] Pilot import `POST /api/ops/import-fleetbase` + My Loads link/mirror  
- [x] Publish writes `tranzfortId` back onto source shipment  
- [x] Shipments list shows TSM-posted live loads for pilot org (Cement Blocks Pune→Jalna linked) **[2 Aug]**  
- [x] Create / assign / status / clients / map / marketplace desks smoke after import **[2 Aug]**  
- [x] Honesty: health ok on postgres without Fleetbase reachable; map falls back to origin pin when GPS sparse  

#### S5 — Hosted platform + thin desktop — **DEFERRED (2 Aug)**

Scaffold + URL/secret gates done; **do not** pick/deploy staging or WebView Google smoke until resumed.

- [x] Desktop scaffold + `TSM_DESKTOP_URL` apply + `check-no-secrets` **[2 Aug]**  
- [ ] ~~Staging HTTPS host + `TSM_PUBLIC_URL`~~ — **DEFERRED**  
- [ ] ~~Append Google redirect for staging callback~~ — **DEFERRED**  
- [ ] ~~Tauri → staging HTTPS; Google login smoke in WebView2~~ — **DEFERRED**  
- [ ] Code signing + auto-update — **DEFERRED** (with S5 resume)  

#### S6 — Documents (LR) — before AI

- [x] LR PDF generate + store/attach + print/open from shipment detail **[2 Aug]**  
- [ ] Org letterhead / LR series templates (v1 uses org profile name + GSTIN)  
- [ ] Void / regenerate with audit  
- [ ] No Copilot yet  

#### S7 — AI agents LAST

- [ ] Follow [ai-agents.md](../product/ai-agents.md) — BYOK → drawer → Tier 0–1 tools
- [ ] Do **not** pull ahead of S6

### Architecture lock (2 Aug) — offer TSM to other orgs

```text
TZ Android (KYC + marketplace) ──► TranZfort Supabase
                                         ▲
                                         │ service_role BFF only
Desktop / PWA / Browser ──HTTPS──► Hosted TSM (Next.js + Postgres)
                                   multi-tenant orgs + seats + LOS
                                   (no Fleetbase after S4 / Horizon 0D)
```

| Decision | Lock |
|----------|------|
| Product | Multi-tenant **SaaS**; desktop = **thin client**, not a second backend |
| Packaging | **Tauri → hosted TSM URL** (PWA interim OK); never ship `TRANZFORT_SERVICE_KEY` |
| Auth | Same Google Admin + Team seats on hosted origin |
| Tenancy | 1:1 `tsm_org_id` ↔ `supplier_id`; TZ-first onboarding; no TSM signup |
| Online | Online-first; no offline TZ publish queue in v1 |
| Execution | **TSM Postgres** owns shipments/fleet/clients (ADR-008); FB transitional only |
| Docs / AI | First-party TSM (ADR-009); Google + OpenRouter BYOK |
| Customer Docker | **No** — Docker is ops/dev (or rare on-prem server), not laptop install |
| Dev order | **S0→S7** above; **AI last** |

### Deferred (do not pull ahead unless resumed)

| Item | Why deferred |
|------|----------------|
| **S5 staging deploy + WebView Google smoke** | **Deferred 2 Aug** — resume when ready to pick/host URL |
| **S5 code signing / auto-update** | With S5 resume |
| **AI Copilot / BYOK / agents** | **S7 last** — after LR + stable LOS |
| **OTP via TZ notification** | Google is primary Admin auth |
| **W11** formal local-vs-live regression | Correctness already in code |
| **K** Full QA matrix | After Org B tenancy smokes |
| Full chat **send/reply** clone | Non-goal — read-only inbox |
| Approximate-pin / Google+OSRM places | Offline pack enough for pilot |
| Full sitemap ~151 / VROOM / deep telematics | After Postgres LOS MVP (S4) |
| Another OSS TMS instead of thin LOS | Default reject (ADR-008) |
| ~~D2.8 / cancel polish / publish errors / TTL~~ | **Done** |

> Reminder: keep `service_role` server-side only. Never embed bridge keys in desktop.  
> **Pilot org** `org_zaftys_local` = legacy Tabish only; **new** Google Admins use `org_tz_<supplierId>`.  
> **Rollback:** if S3/S4 breaks pilot, reset to S0 commit on `app-dev-mode` (FB path still works until S4 delete).  

---

## Horizon 0 — Drop Fleetbase / TSM-owned LOS — **ACTIVE 2 Aug**

**Canonical ADR:** [008-tsm-owns-execution.md](../decisions/008-tsm-owns-execution.md)  
**Entity migration map:** [fleetbase-entity-map.md](../integrations/fleetbase-entity-map.md) (legacy)  
**Inspiration only:** Fleetbase Fleet-Ops concepts — **no permanent API**, **no AGPL code in product**.

### Must build (independence MVP)

| # | Deliverable | Notes |
|---|-------------|--------|
| M1 | Org-scoped schema | `tsm_shipments`, `tsm_drivers`, `tsm_vehicles`, `tsm_clients`, events/notes, `tsm_positions`, proofs/doc links |
| M2 | `ExecutionStore` interface | Wrap current FB client as `FleetbaseExecutionStore` |
| M3 | `PostgresExecutionStore` | list/get/create/assign/status/patch shipments + fleet + clients |
| M4 | Status machine + KPIs | Reuse existing TSM transitions / exceptions |
| M5 | Map + track without FB | Track token; positions from TSM (honesty if sparse) |
| M6 | TZ sync retarget | TZ → TSM shipment **or** delete `run-tranzfort-sync` FB path |
| M7 | Pilot import | FB → TSM for `org_zaftys_local` if needed |
| M8 | Delete FB | Remove `lib/fleetbase/*`, health pings, FB Docker from product runbooks |

### Build later (not required to drop FB)

Deep telematics · GST/Tally/e-way · orchestrator/VROOM · full sitemap parity · AI agents (Horizon 4 after LR) · own driver mobile beyond TZ trucker.

### Do **not** build to drop FB

Ember clone · storefront in TSM · offline full-stack desktop with embedded DB · vendoring Fleetbase source · hopping to immature OSS TMS by default.

### Phases checklist

#### Phase A — Contract (no UX change)

- [x] Define `ExecutionStore` (shipments, drivers, vehicles, positions) **[S2]**  
- [x] Move LOS usage behind `FleetbaseExecutionStore` **[S2]**  
- [x] Repositories call interface; env `TSM_EXECUTION_BACKEND=fleetbase | postgres`  
- [x] Clients off FB when backend ≠ fleetbase (`isLiveFleetbaseMode`) **[S4]**  

**Exit:** Behavior identical; adapter boundary exists. **[met]**

#### Phase B — Postgres store

- [x] Migrations for M1 tables (`org_id` on every row) **[S3]**  
- [x] Implement `PostgresExecutionStore` for methods already used by repos **[S3]**  
- [x] Smoke: create / list / assign on pilot org with postgres default **[S4]**  

**Exit:** One org can run ops on Postgres with FB ignored for those calls.

#### Phase C — Default postgres

- [x] Default postgres when `DATABASE_URL` set (override: `TSM_EXECUTION_BACKEND=fleetbase`) **[S4]**  
- [x] Clients use local store when not fleetbase (`isLiveFleetbaseMode` = FB only)  
- [x] Retarget TZ→ExecutionStore shipment sync (no FB createOrder)  
- [x] Retarget or remove TZ→FB shadow sync  
- [x] Pilot import script (optional) — `POST /api/ops/import-fleetbase` / `npm run db:import-fleetbase` **[2 Aug]**  

**Exit:** App usable with Fleetbase process **stopped** (escape hatch only if needed) — **not yet**; keep FB until S4b parity gate.

#### Phase D — Delete Fleetbase

- [~] Soft: FB not required for health/default path **[S4]**  
- [ ] Hard delete `lib/fleetbase/*` after postgres pilot smoke (S4b)  
- [ ] Strip `FLEETBASE_*` from product `.env.example` / runbooks  
- [ ] ADR-001 remains **Superseded**; mark compose FB optional removed  

**Exit:** `FLEETBASE_API_KEY` unset → `/api/health` healthy; marketplace + LOS work.

#### Phase E — Docs foundation (start after B; full AI = Horizon 4)

- [x] LR PDF generate + store + print from TSM shipment (ADR-009 v1) **[2 Aug]**  
- [ ] Invoice PDF later; Tally/e-way later

---

## Horizon 4 — Documents + AI (ADR-009) — after Postgres LOS

**Canonical AI spec:** [ai-agents.md](../product/ai-agents.md) (stack, agent loop, authz matrix, tools, features AI-01…, UI/UX).  
**ADR:** [009-documents-and-ai.md](../decisions/009-documents-and-ai.md).

### Documents

- [ ] Document templates per org (letterhead, GSTIN, LR series) — v1 uses org profile  
- [x] LR PDF generator → MinIO (when configured) + shipment documents **[2 Aug]**  
- [x] Print / download from shipment detail (**Generate LR PDF**) **[2 Aug]**  
- [ ] Void / regenerate with audit

### AI foundation

- [ ] `lib/ai/llm-client` + Google + OpenRouter adapters
- [ ] Encrypted org BYOK storage; `/settings/ai` Admin UI (enable, keys, models, caps)
- [ ] Feature flags: `ai.enabled`, `ai.agents`, `ai.formAssist`
- [ ] Usage meter + daily org token cap + platform kill switch
- [ ] Audit table for every tool execution

### Agent runtime + tools

- [ ] `POST /api/ai/chat` (stream) + `POST /api/ai/confirm`
- [ ] Tool registry Tier 0 (read) + Tier 1 (create/assign/LR/note)
- [ ] Confirm tokens for high-risk tools (assign, LR, later publish/approve)
- [ ] Role gates: Viewer = read tools only; Dispatcher/Admin per [ai-agents.md §3](../product/ai-agents.md)
- [ ] Blocked list enforced (no SQL, no secrets, no TZ chat send, no cross-org)

### UI / UX

- [ ] Header **Copilot** → right drawer (desktop) / sheet (narrow)
- [ ] Action cards Confirm/Cancel; tool progress steps; honesty banners
- [ ] Context chip on shipment detail (“Ask about this shipment”)
- [ ] Role-aware empty copy; quota banner → Settings
- [ ] Works in Tauri WebView (same hosted UI; zero local keys)

### Later (Tier 2+ / AI-08…)

- [ ] Marketplace tools with confirm (publish, approve/reject, cancel listing)
- [ ] Form assist (NL → create-shipment draft)
- [ ] Exception triage + morning marketplace briefing
- [ ] Doc OCR; suggest-assign (human confirm only)

**Exit:** Admin generates LR without FB; BYOK chat completes a Tier 0–1 path with confirm + audit; Viewer cannot mutate via agent.

---

## Enterprise scale roadmap (Horizons 1–3) — **ACTIVE 2 Aug**

### Horizon 1 — Multi-tenant SaaS (sell Org B on same deployment)

**Goal:** Two verified suppliers on one TSM host cannot see or post as each other.

- [x] **No silent fallback** to `org_zaftys_local` when session org missing / wrong supplier **[S1 — throws ORG_REQUIRED]**  
- [x] Tenancy helpers module + status BFF **[scaffold 2 Aug]** — `lib/tsm/tenancy.ts`, `GET /api/tsm/tenancy/status`  
- [x] Support lookup `GET /api/tsm/tenancy/lookup` **[S1]**  
- [x] OrgSwitcher: no fake multi-org dropdown in live builds **[S1]**  
- [~] Audit LOS repositories (shipments, fleet, billing) for `tsmOrgId` scope gaps — Postgres store org-scoped; broader audit open  
- [ ] Seat invites smoke Org B  
- [ ] Company A + Company B Google login smoke; cross-org API empty/forbidden  

**Exit:** Company A + Company B Google login smoke; cross-org API returns empty/forbidden.

### Horizon 2 — Hosted platform — **DEFERRED (2 Aug)**

- [ ] Staging + prod HTTPS (`TSM_PUBLIC_URL`) — **DEFERRED**  
- [ ] Supabase Google redirect allowlist for staging/prod callbacks (**append only**) — **DEFERRED**  
- [ ] Session secrets rotation; health / logs / backups  
- [ ] Entitlements: seat cap + `daily_post_limit` / plan hooks  

**Exit:** External pilot can open `https://tsm…/login` and Google-sign-in without local `.env`.

### Horizon 3 — Installable desktop (industry standard)

- [x] Packaging decision locked: **Tauri thin shell → hosted HTTPS** (not embedded Next/DB)  
- [x] Scaffold `app-tsm/desktop/` (Tauri config + README) **[2 Aug]**  
- [x] `TSM_DESKTOP_URL` apply + `check-no-secrets` before build **[S5]**  
- [ ] Point shell at staging URL; Google OAuth smoke in WebView2 — **DEFERRED** (with S5)  
- [ ] Windows code signing + auto-update (stable/beta) — **DEFERRED**  
- [ ] Deep links optional; “Open TranZfort” for KYC/chat  

**Exit:** Signed Windows installer; security review confirms zero secrets in binary; same feature set as web.

---

## TZ prod migration safety review (2 Aug 2026)

**Rule:** TranZfort Flutter is **live prod**. Prefer **no schema change**. When required: **additive, reversible, service_role-only or display-only**, lab-smoked first. Never change Flutter APK for TSM unless product explicitly approves.

### Inventory — what touches TZ DB?

| Item | Status on prod | Type | Flutter impact if applied cold |
|------|----------------|------|--------------------------------|
| `20260726120000_tsm_org_supplier_super_journey.sql` | **Already applied** | New tables + `service_*` publish/link | None (Flutter never calls these) |
| Google Admin on TSM | **Not a migration** | Supabase Auth URL allowlist + TSM BFF | None if Web client **not rotated**; only append redirect URLs |
| Phase F — company on Find Loads | **Applied 2 Aug** | COALESCE + join; Tabish card = ZAFTYS | Low; display-only |
| ~~`20260731120000_tsm_service_booking_actions.sql`~~ | **DROPPED (2 Aug)** — removed from `migrations/` | Was JWT `set_config` impersonation draft | **Never applied to prod.** Do not recreate without safer design |
| `20260802140000_tsm_service_cancel_load_safe.sql` | **Ready / not required** | Additive `service_cancel_tsm_load` | None; TSM Cancel already works via table fallback |

### A — Already on prod (keep; do not re-run carelessly)

`tsm_org_supplier_map`, `tsm_publish_idempotency`, `service_upsert_tsm_org_supplier_link`, `service_publish_tsm_load_as_super`, …  

| Safe because | Watch |
|--------------|--------|
| Additive tables; Flutter does not call `service_*` | Don’t alter existing `create_load` / `approve_booking_request` bodies when “fixing” |
| EXECUTE revoked from anon/authenticated | Never GRANT these to authenticated |

### B — Google login (Phase A+B) — **no SQL migration**

| Do | Don’t |
|----|--------|
| Append Additional Redirect URLs for TSM callback | Rotate Google Web client ID/secret |
| Keep Flutter `GOOGLE_WEB_CLIENT_ID` + Android SHA-1 | Change Site URL / marketing `tranzfort.com` / `tranzfort://` redirects |
| Gate Admin in TSM BFF (supplier+verified) | Call `ensure_role_extension` from TSM to invent suppliers |

**Flutter regression after ops change:** Google sign-in, email/password, password-reset deep link, new-user onboarding.

### C — Phase F company name on card — **lowest-risk TZ SQL (when ready)**

**Intent:** `'supplier_name', p.full_name` → `COALESCE(NULLIF(BTRIM(s.company_name), ''), p.full_name)` with `LEFT JOIN suppliers s ON s.id = l.supplier_id`.

| Risk | Level | Mitigation |
|------|-------|------------|
| Break Find Loads RPC signature / overload | Medium if DROP wrong overload | `CREATE OR REPLACE` **same** arg list as live overload only; list overloads first |
| Feed returns null / empty name | Low | COALESCE to `full_name`; LEFT JOIN suppliers |
| Company string ugly / person-like | Data | Fix `suppliers.company_name` for Tabish via KYC/link **before** relying on UI |
| Flutter parse break | Very low | Same JSON key `supplier_name`; string still string |
| Performance | Low | PK join on `suppliers.id` |
| Rollback | Easy | Redeploy previous function body |

**Prod gate checklist before apply:**

1. [x] `SELECT` Tabish `full_name`, `company_name` — **done 2 Aug:** both `"Tabish Khan"` (set trade name before COALESCE)  
2. [ ] Set desired trade name on `suppliers.company_name` + map (e.g. ZAFTYS) via KYC or TSM link upsert  
3. [ ] Lab: replace feed → Find Loads + Super Load filter + nearby mode smoke  
4. [ ] Confirm **one** live overload of `get_marketplace_feed` (or replace all overloads consistently)  
5. [ ] Apply in maintenance window; smoke APK Find Loads immediately  
6. [ ] Keep previous function SQL in git for instant rollback  

**Verdict:** Safe enough for prod **after** trade-name data fix + lab smoke. Prefer this over booking migration for early TZ touch.

### D — Booking `service_approve/reject` — **APPLIED safe redesign (2 Aug)**

**Was dropped:** JWT `set_config` draft.  
**Now on prod:** `20260802130000_tsm_service_booking_actions_safe.sql`

| Piece | Role |
|-------|------|
| `approve/reject_booking_request_as_supplier` | Core logic with explicit `supplier_id` |
| Flutter wrappers | Still `auth.uid()` + ban check → as_supplier |
| `service_approve/reject_tsm_booking` | Map org → supplier; `assert_service_role_or_super_admin` |

**Smoke:** Approve booking `a946369a…` → trip `727a27c9-9272-4676-9d01-d60e17fdf7fa`.

### E — What we will **not** migrate for TSM

| Idea | Why skip |
|------|----------|
| TZ org/team/seat tables | Seats stay TSM-only (DL-3) |
| OTP challenge tables | Deferred; Google is primary |
| Changing `approve_booking_request` signature for Flutter | Breaks APK |
| Broad RLS changes on `loads` / `booking_requests` | High blast radius |
| Second Google Web client for TSM | Can break Flutter id-token audience |

### Recommended TZ touch order (prod-safe)

```text
1. No SQL — Phase A+B Google (redirect URLs + TSM BFF)     ← safest
2. Phase F — feed company_name COALESCE                      ← small display SQL
3. Booking service_* — redesign later (draft deleted)        ← not next
```

### Rollback posture

| Change | Rollback |
|--------|----------|
| Redirect URL | Remove URL from Supabase allowlist |
| Feed REPLACE | Re-apply previous function body from git |
| Booking service_* (if ever applied) | `DROP FUNCTION` the three new functions (Flutter unaffected) |

---

## Multi-supplier readiness (before scaffolding Google) — **2 Aug**

**Question:** Tabish is only **one** TZ supplier. Will other verified suppliers each get their own TSM Admin + seats + posts?

### Product / TZ plan — **YES (already designed)**

| Layer | Supports N suppliers? | How |
|-------|----------------------|-----|
| TZ Auth | Yes | Any Google/email user → one `profiles` / one supplier |
| `tsm_org_supplier_map` | Yes | **1:1** `tsm_org_id` ↔ `supplier_id` (both UNIQUE) — company A and B cannot share a supplier |
| Publish RPC | Yes | `service_publish_*` takes `p_tsm_org_id` → resolves that org’s supplier |
| Seats model | Yes | Seats belong to **one** `tsm_org_id`; never create TZ Auth per seat |
| Find Loads company card | Yes | Per-supplier `suppliers.company_name` |
| Google Admin login | Yes | Gates are role/verification — **not** Tabish-specific |

Tabish / `652922ee…` / seat `Tabish@2026` are **pilot fixtures only**, not product limits.

### Current `app-tsm` code — **scaffolding multi-org (2 Aug)**

| Gap | Status | Notes |
|-----|--------|-------|
| Org store | **Partial** | In-memory Map + Postgres hydrate; `org_tz_<supplierId>` on TZ Admin login |
| `getOrgAccountForSession()` | **Scaffolded** | Loads / bookings / publish / org / link use session org |
| Auth users / seats | **Not done** | Seats still pilot/global until Phase C |
| Shipments / listings | Deferred | LOS tenancy after marketplace identity |
| Mock L1 | Pilot Tabish only | Live Google = any verified supplier |
| Org switcher | Decorative | Show company name; real multi-org switch rare |

**Failure mode if ignored (fixed for Admin path):** Supplier B Google-login must not mutate `org_zaftys_local` — bootstrap uses `orgIdForSupplier()`.

### Scaffolding gate (must-do in Phase B — minimal tenancy)

When building Google login, ship **at least**:

1. [x] On Admin Google success: create/load org id **unique to that `supplier_id`** (do not reuse `org_zaftys_local` for **new** customers)  
2. [x] Upsert `tsm_org_supplier_map` for **that** pair only (via existing `service_upsert` on login bootstrap)  
   - If supplier already mapped (pilot `org_zaftys_local`), **reuse** that org id — never 409 on unique `supplier_id`  
3. [x] Session carries `tsmOrgId` + `supplierId`; TZ BFF routes use `getOrgAccountForSession`  
4. [ ] Seat invites (Phase C) attach to session `tsmOrgId`  
5. [~] Keep `org_zaftys_local` as **dev/pilot only** (Team seat / legacy; Tabish Google reuses existing map until explicit migrate)  
6. [ ] Two-supplier smoke (lab or staging): Supplier A and B each login → different map rows → publish does not cross  

**Can defer (section O):** full shipment/Fleetbase isolation UI, org switcher for multi-org admins, sales-assisted onboarding — but **identity + map + session scoping cannot wait**.

### Verdict

| Ask | Answer |
|-----|--------|
| Does the **plan** support many suppliers + roles/sub-users? | **Yes** |
| Does **today’s code**? | **Scaffolding** — per-supplier org on TZ Admin login; seats / LOS still pilot |
| Can we scaffold Google safely for scale? | **Yes** — Phase B includes per-supplier org bootstrap + session-scoped BFF |

---

## Decisions lockbook (all locked so far — 26 Jul → 2 Aug)

Single source for product + engineering. Implementation phases below / Implementation plan section.  
**Also locked:** DL-9 (drop FB), DL-10 (docs+AI), DL-11 (desktop/Docker) — ADRs 008 / 009 / 007.

### DL-1 — Product north star

**One identity. Two clients. Same marketplace data. TSM adds office/TMS.**

| Client | Job |
|--------|-----|
| **TranZfort Android** | Signup + Google/email + KYC; mobile marketplace (post, chat, trips, approve on phone) |
| **TSM marketplace zone** | Desktop TZ supplier desk — **UI/UX TZ-similar** (My Loads, bookings, post) |
| **TSM TMS zone** | Separate modules (shipments, fleet, dispatch, billing) — **not** a second marketplace |

| Say | Don’t say |
|-----|-----------|
| TSM is the supplier’s web/desktop console + LOS | TSM syncs foreign users into TZ |
| Same supplier / same loads | Separate TSM identity that “matches email” |
| Bridge/map is implementation | Bridge is the product story |

### DL-2 — Auth (no TSM signup)

| Rule | Detail |
|------|--------|
| **No TSM signup** | Ever. Create + verify on TranZfort app first |
| **Org Admin** | **Continue with Google** (primary) on same TZ Supabase; TZ email/password secondary |
| **Admin eligibility** | `user_role_type = supplier` **and** `verification_status = verified` |
| **Reject** | trucker, unverified/pending/rejected, banned/trust-restricted, `supplier@zaftys.com` |
| **Team seats** | TSM-only email/password; Settings → Users; **never** create TZ Auth users for seats |
| **OTP via TZ notif** | Optional later — **not** required (Google covers Google-only suppliers) |
| **UUID paste (H)** | Ops/interim only — not end-user product |

```text
TZ Android: signup → Google/email → KYC verified supplier
                │
                ▼
TSM login (no signup)
  [ Continue with Google ]  ──► Org Admin
  [ TZ email/password ]     ──► Org Admin (secondary)
  [ Team seat ]             ──► dispatcher / viewer
```

### DL-3 — TZ Auth facts (must not break Flutter)

| Fact | Implication |
|------|-------------|
| Flutter Google = `signInWithIdToken` + Web client as `serverClientId` | Reuse **same** Web client; append TSM redirect URLs only; **do not rotate** without Flutter + Bitwarden |
| One Auth user → one `profiles` → one role (`supplier` \| `trucker`) | No dual role on one Google account |
| `profiles.id` = `auth.uid()` | Admin identity = that UUID |
| **No TZ org/team tables** | Multi-seat is **TSM-only**; map is 1:1 `tsm_org_id` ↔ `supplier_id` |
| User RPCs need `auth.uid()` = supplier | Seats **cannot** call `approve_booking_request` / `create_load` with seat JWT |

### DL-4 — Roles & who may post / approve

| Role | Login | Post to TZ | Approve bookings | Manage seats / org |
|------|--------|------------|------------------|--------------------|
| **Org Admin** | Google / TZ password | Yes | Yes | Yes |
| **Dispatcher** | Team seat | Yes | Yes *(or Admin-only until bridge proven)* | No |
| **Viewer** | Team seat | No | No | No |

- Portal map today: `admin` → `account_admin`, `dispatcher` → `dispatcher`, else viewer (`org.ts`).  
- Treat `fleet_manager` as **viewer** for marketplace unless explicitly granted later.  
- Cap seats (e.g. **3**) for pilot.

### DL-5 — How post-load works (all roles → same TZ card identity)

```text
Any canPublish seat clicks Publish
        │
        ▼
BFF: canPublish + liveLinked + catalog gates
        │
        ▼
service_publish_tsm_load_as_super(p_tsm_org_id, …)
        │
        ▼
loads.supplier_id = linked supplier (e.g. Tabish UUID)
audit: postedByUserId / name = seat who clicked
```

| Rule | Detail |
|------|--------|
| **Ownership** | Always linked `supplier_id` — never the seat |
| **UI copy** | *Posts as {Company}. Your name is recorded for audit only.* |
| **Paths** | (1) Shipment → Post wizard (v1 LOS) (2) Blank post like mobile (later parity) |
| **Rejected** | TZ Auth per seat; seat JWT as `create_load` caller |

### DL-6 — Company name on Find Loads card (locked intent — 2 Aug)

**Problem:** Card shows **“Tabish Khan”** (`profiles.full_name`) even when company exists.

| Surface | Today | Target |
|---------|-------|--------|
| **Find Loads card** | `get_marketplace_feed` → `supplier_name` = `p.full_name` | Prefer **`suppliers.company_name`** |
| **Load detail** | Already prefers `company_name` via `displayName` | Keep |
| **Chat summaries** | Separate `supplier_name` + `supplier_company_name` | Keep / align later |

**Data sources (already exist):**

| Store | Field | Filled by |
|-------|--------|-----------|
| `suppliers.company_name` | Org / trade name | TZ KYC business step; also TSM link RPC |
| `profiles.full_name` | Person / main contact | Signup / link contact |
| `tsm_org_supplier_map.company_name` | TSM trade name | `service_upsert_tsm_org_supplier_link` |

**Locked display rule (D4 / D9):**

```text
Marketplace card primary label =
  COALESCE(NULLIF(BTRIM(suppliers.company_name), ''), profiles.full_name)

Examples: "ZAFTYS", "ABC Logistics"
Not: seat email, not dispatcher personal name
All TSM roles posting as this supplier → same company label
```

**Work (Phase F — TZ additive SQL):**

- [x] Verify / set Tabish `company_name` → **ZAFTYS**  
- [x] Migration applied from live `pg_get_functiondef` (COALESCE + `supplier_company_name`) **[2 Aug]**  
- [x] Smoke: Find Loads Super Load card `supplier_name=ZAFTYS`  
- [x] TSM link/bootstrap pulls `suppliers.company_name` when present  

**Do not:** invent per-seat display on TZ; fix Flutter Find Loads alone without feed SQL.

### DL-7 — Booking Approve under seats

| Actor | Path |
|-------|------|
| Org Admin (TZ Google session) | Prefer one BFF path; may use user JWT **or** `service_*` |
| Team seat | **Only** `service_approve/reject_tsm_booking` (org map → supplier); never seat JWT |
| Draft migration ~~`20260731120000_…`~~ | **Dropped 2 Aug** (never on prod). Redesign later without JWT `set_config` |
| Flutter Approve | Remains valid always |

### DL-8 — Explicitly rejected

- TSM supplier signup / inventing `user_role_type` from desktop  
- TZ Auth user per seat  
- Team seat as long-term **Admin** identity (interim pilot only)  
- Full Flutter UI clone; desktop KYC camera/FCM as v1  
- `TRANZFORT_SERVICE_KEY` in browser  
- Rotating Google Web client without Flutter coordination  
- Treating local `NetworkOffer` desk as live TZ bookings  

### DL-9 — Drop Fleetbase; TSM owns execution (2 Aug)

| Rule | Detail |
|------|--------|
| **SoT** | Org-scoped **TSM Postgres** for shipments, drivers, vehicles, clients, positions, proofs |
| **FB** | Transitional `ExecutionStore` adapter only → **delete** Phase D |
| **Inspiration** | Fleet-Ops concepts OK; **no** permanent API; **no** AGPL code in SaaS |
| **Default replace** | **Build** thin LOS — do not hop to another immature OSS TMS |
| **TZ sync** | Retarget TZ→TSM shipment or remove FB shadow sync |
| **ADR** | [008](../decisions/008-tsm-owns-execution.md) supersedes [001](../decisions/001-fleetbase-as-backend.md) |

### DL-10 — Documents + AI owned by TSM (2 Aug)

| Rule | Detail |
|------|--------|
| **Docs** | LR / trip sheet / invoice / ePOD PDFs generated in TSM; MinIO + metadata |
| **v1 docs** | **LR PDF** generate + store + print |
| **AI stack** | Server `LlmClient`: **Google** + **OpenRouter**; org **BYOK**; no keys in desktop |
| **How agents work** | Tool-calling loop over **same BFF** as UI; Action card **confirm** for high-risk |
| **Allowed** | Role-gated — Admin/Dispatcher mutate; Viewer **read-only** tools |
| **Blocked** | SQL/secrets/cross-org/TZ chat send/silent auto-dispatch/key readback |
| **UX** | Copilot **drawer** + `/settings/ai`; not marketplace chat clone |
| **Canonical spec** | [ai-agents.md](../product/ai-agents.md) |
| **ADR** | [009](../decisions/009-documents-and-ai.md) |

### DL-11 — Desktop thin client; Docker is not for end users (2 Aug)

| Audience | How they run TSM | Docker? |
|----------|------------------|---------|
| Customer | Browser or **Tauri → hosted HTTPS** | **No** |
| ZAFTYS ops / staging | Next + Postgres (+ Redis/MinIO) | Ops yes |
| Rare on-prem | Customer **server** stack; users hit their URL | IT yes |

- Never embed Next.js, Postgres, Fleetbase, or `TRANZFORT_SERVICE_KEY` in the desktop binary.  
- See `app-tsm/desktop/README.md`, Horizon 3, ADR-007 / ADR-008.

---

## Implementation plan — make TSM best (reviewed 2 Aug 2026)

**Goal:** Desktop TZ supplier (marketplace feels like TZ) + separate TMS, with **real identity** and safe seats — without breaking prod Flutter.

### Review findings (short)

| Area | Finding |
|------|---------|
| Flutter Google | Native `signInWithIdToken` + existing **Web client ID** as `serverClientId` — **not** browser OAuth |
| Marketing `/auth/callback` | Email verify/reset bridge only — **do not** reuse for TSM Google |
| TSM today | Password L1 + Team seat; Google UI copy says “use Team seat” |
| L1 gates | Weaker than lock: unverified can login; ban/trust not checked |
| Seats | Settings invite creates pending row only — **does not** create login credentials (`auth_users`) |
| Booking Approve | Seats need `service_*`; draft SQL **not** on prod; don’t rush JWT `set_config` |
| Find Loads card | Feed uses `full_name`; detail already prefers `company_name` |

### North-star quality bar

1. **Identity is real** — Admin = verified TZ supplier (Google); seats never fake Admin.  
2. **Marketplace is honest** — live TZ data; no dual “offers” pretending to be bookings.  
3. **TMS is additive** — clear nav separation; don’t dilute TZ language in marketplace.  
4. **Prod Flutter untouched** — same Google Web client; append redirect URLs only.  
5. **One mutation path for seats** — BFF `service_*` scoped by org map; audit who clicked.  
6. **Company on card** — truckers see org name from `suppliers.company_name`, not personal name alone.

### Phase A — Ops prep (before code) — ~30–60 min

- [ ] Confirm Bitwarden / `.env.local`: `TRANZFORT_SUPABASE_URL`, `ANON_KEY`, `SERVICE_KEY` = prod project `tjpmkxgveuxvbtsqynwn`  
- [ ] Confirm Supabase Google provider = same Web client as Flutter `GOOGLE_WEB_CLIENT_ID` (**do not rotate**)  
- [x] Append **Additional Redirect URLs** only:
  - `http://localhost:3000/api/auth/tranzfort/callback` **[done 2 Aug]**
  - staging/prod TSM callback when known
- [ ] Optional: Google Cloud JS origins for TSM hosts on **same** Web client
- [ ] Do **not** change Site URL / marketing `tranzfort.com` / `tranzfort://` redirects

### Phase B — Google Admin login (build next) — core

- [x] Env: `TSM_PUBLIC_URL` (or `NEXT_PUBLIC_APP_URL`) for `redirect_to` (documented in `.env.example`)  
- [x] `GET /api/auth/tranzfort/google` — PKCE start; httpOnly `code_verifier` cookie; 302 to Supabase authorize `provider=google`  
- [x] `GET /api/auth/tranzfort/callback` — exchange code → user JWT (anon); load `profiles`; **strict gates**; mint `tsm_session`; discard TZ tokens from browser  
- [x] Shared gate helper (harden L1 password too):  
  - supplier + **verified** (hard refuse for Admin Google; password path: soft login + publish disabled)  
  - not banned / trust-restricted  
  - not platform email  
  - never invent role via `upsert_current_user_profile`  
- [x] Bootstrap org + live link — prefer existing map by `supplier_id` (pilot `org_zaftys_local`); else `org_tz_<supplierId>`  
- [x] Login UI: **Continue with Google** primary → TZ password secondary → Team seat; **no Sign up**  
- [x] **Ops:** localhost redirect allowlist for callback **[done 2 Aug]**  
- [x] End-to-end smoke: Tabish Google → Admin → linked org **[done 2 Aug]** (My Loads via existing map)  
- [ ] Flutter regression smoke after ops URL change: Google, email/password, reset deep link  

**Acceptance:** Tabish Google → TSM Admin → linked org → My Loads shows his loads. No TSM signup path. **[met 2 Aug]**  
**Code status (2 Aug):** **DONE / smoked** — next Phase C seats.

### Phase C — Team seats product (after B)

- [x] Invite accept: set password → `auth_users` + hash + `tsmOrgId` + role map (`dispatcher` / `viewer`)  
- [x] Cap 3 seats; Settings → Users UX copy: posts as company supplier  
- [x] Session for seats: `authSource=seat`, inherit org `supplierId` / `tsmOrgId`  
- [x] Permissions: publish gate by role; manage seats = admin; approve still deferred  
- [x] Smoke: invite → accept → seat session + live My Loads; viewer cannot publish; cap blocks 4th **[2 Aug]**  
- [x] Promote seat → Admin; block demote/deactivate of last admin **[2 Aug]**  

**Acceptance:** Admin invites ops@…; they Team-seat login; publish audit records seat; TZ load owned by Admin supplier; Find Loads shows **company** name. **[met for core path]**

### Phase D — Booking Approve/Reject (after B; seats need this)

- [x] Additive `service_approve/reject_tsm_booking` via map + `*_as_supplier` (no JWT `set_config`) **[applied 2 Aug]**  
- [x] Wire desk actions (existing BFF); live Approve smoked → trip `727a27c9…`  
- [x] Flutter Approve wrappers retained (`approve_booking_request` → as_supplier)  
- [~] v1: Admin + Dispatcher can approve (role gate); Viewer cannot  

### Phase E — Product polish (parallel / after C–D)

- [x] Marketplace UI pass (labels, empty/honesty states for My Loads / Bookings / hub) **[2 Aug]**  
- [x] Separate nav language: **Marketplace** vs Operations (TMS) — sidebar group + Network→Marketplace  
- [x] Withdraw/cancel honesty; local NetworkOffer / overflow clearly labeled **local**  
- [x] Recent Super Load posts show **who clicked** (`postedByName`) on Marketplace hub  
- [x] Trips read-through desk (`/network/trips`, service_role table read) **[2 Aug]** — trip `727a27c9…` visible  
- [x] Marketplace analytics desk (`/network/analytics` — KPIs + `load_analytics_daily` funnel) **[2 Aug]**  
- [x] Chat inbox read-only (`/network/chat` — conversations list; no send clone) **[2 Aug]**  
- [x] My Loads **Cancel** (live) + hub last-publish-error surface **[2 Aug]**  

### Phase F — Find Loads company display (TZ-BE; can parallel early)

- [x] Data check / set Tabish `suppliers.company_name` → **ZAFTYS** (+ map upsert)  
- [x] Additive migration applied on prod: `get_marketplace_feed` COALESCE + `supplier_company_name` **[2 Aug]**  
- [x] Smoke: Super Load `e595b49e…` feed `supplier_name=ZAFTYS`  
- [x] TSM link/bootstrap pulls trade name when set  

### Explicit non-goals this quarter

OTP-via-notification · full chat clone · KYC on desktop · TZ Auth per seat · rotating Google Web client · applying unproven booking SQL to prod cold · per-seat marketplace identity.

### Recommended next action

| Now (open) | Deferred | Later | Last |
|------------|----------|-------|------|
| **S1** Org B smokes · **S6** LR | **S5** staging · **S4b** FB delete (parity gate green — still keep FB until you confirm) | S5 resume | **S7** AI |

1. ~~**S0–S4** cutover + pilot import + post-import API smoke~~ **done**  
2. **S4b:** Hard-delete Fleetbase only when you explicitly confirm (parity gate checked; escape still available)  
3. **S1** Org B Google + seat invite smokes  
4. **S6** LR PDF  
5. **S5 (deferred)** staging/WebView  
6. **S7 LAST:** AI  

Do **not** embed Next.js/service_role/FB in the desktop binary. Do **not** start AI before S6.

---

## Locked — Auth, roles & UI (1–2 Aug 2026) — **PROD-SAFE**

> **Canonical detail:** see **Decisions lockbook** above (DL-1 … DL-11). This section kept as a short pointer for older links.

Deep-reviewed against live TZ Auth/profiles (`tranzfort-lab` Flutter + Supabase).  
**Do not invent TZ teams.** Multi-seat lives only on TSM.

### Product shape

| Surface | Role |
|---------|------|
| **TranZfort Android** | Signup + Google/email + KYC; mobile marketplace (post, chat, trips, approve on phone) |
| **TSM marketplace zone** | Desktop TZ supplier desk — **UI/UX should feel TZ-similar** (My Loads, bookings, post) |
| **TSM TMS zone** | Separate additional modules (shipments, fleet, dispatch, billing) — not a second marketplace |

### Auth (locked)

| Rule | Detail |
|------|--------|
| **No TSM signup** | Ever. New suppliers must create + verify on TranZfort app first |
| **Org Admin login** | **Continue with Google** (primary) on same TZ Supabase project; optional TZ email/password secondary |
| **Who may become Admin** | Existing `auth.users` → `profiles` with `user_role_type = supplier` **and** `verification_status = verified` |
| **Reject** | trucker profiles, unverified/pending/rejected, banned/trust-restricted, `supplier@zaftys.com` |
| **On success** | TSM session `role=admin` / `account_admin`; auto bootstrap org + `service_upsert_tsm_org_supplier_link` |
| **Team seats** | Admin invites in TSM Users; **TSM-only** email/password; login via **Team seat** tab — **never** create TZ Auth users for seats |
| **Ownership** | All marketplace writes as linked `supplier_id`; seats only gate clicks + audit “who clicked” |
| **Marketplace card** | Show **`suppliers.company_name`** (ZAFTYS / ABC Logistics), not personal name alone |

```text
TZ Android: signup → Google/email → KYC verified supplier
                │
                ▼
TSM login (no signup)
  [ Continue with Google ]  ──► verified supplier → Org Admin
  [ TZ email/password ]     ──► same (secondary)
  [ Team seat ]             ──► invited dispatcher/viewer (TSM credentials)
                │
                ▼
Org Admin creates seats in Settings → Users
  posts/approves (if allowed) still as company supplier_id
  Find Loads card shows company_name for that supplier
```

### What TZ Auth actually is (must not break)

| Fact | Implication for TSM |
|------|---------------------|
| Flutter Google = `GoogleSignIn` → `signInWithIdToken` (not browser OAuth) | Prefer **same** Supabase Google **Web client ID** Flutter already uses as `serverClientId`; add TSM JS origins/redirects carefully — **do not rotate** client without Flutter + Bitwarden coordination |
| One Auth user → one `profiles` row → one `user_role` (`supplier` \| `trucker`) | Cannot be supplier+trucker on one Google account |
| `profiles.email` UNIQUE; `profiles.id` = `auth.uid()` | Admin identity = that UUID; map 1:1 via `tsm_org_supplier_map` |
| No TZ org/team/seat tables | Seats are **TSM-only**; scalable without TZ schema for membership |
| User RPCs (`approve_booking_request`, `create_load`, …) require `auth.uid()` = supplier | **Seat JWTs cannot call them.** Bridge mutations for seats = `service_*` + org map. Admin with real TZ Google session **may** call user RPCs as self; prefer one consistent BFF path for publish/approve |
| Platform `supplier@zaftys.com` | Blocklisted for customer orgs (already in `tranzfort-auth.ts`) |

### Safe Google web wiring (checklist)

1. Reuse **existing** Supabase Google provider + Web client (Flutter id-token audience) — avoid a second conflicting Web client unless ops proves needed.  
2. Add TSM authorized JS origins + redirect URIs only; keep Supabase callback + Flutter Android SHA-1 unchanged.  
3. TSM OAuth callback (PKCE) → BFF loads profile → **gate** supplier+verified → session; **never** call `upsert_current_user_profile` / `ensure_role_extension` to invent roles.  
4. Unknown / wrong-role Google user → clear error: *Sign up and verify as a supplier in the TranZfort app.*  
5. Regression smoke Flutter: Google sign-in, email/password, password-reset deep link, new-user onboarding.  
6. Cap seats (e.g. 3) until multi-org product exists.

### Booking / publish under this model

| Actor | How TZ mutations run |
|-------|----------------------|
| Org Admin (TZ Google session) | Preferred: BFF with supplier JWT for user RPCs **or** same `service_*` as seats (pick one path and stick to it) |
| Team seat | **Only** `service_publish_*` / future `service_approve/reject_*` scoped by `tsm_org_id` → map → supplier; never seat JWT as `auth.uid()` |
| Draft migration ~~`20260731120000_tsm_service_booking_actions.sql`~~ | **Dropped 2 Aug** from `migrations/` (never applied). Flutter Approve remains valid. Redesign later without JWT `set_config`. |

### Explicitly rejected

- TSM supplier signup / inventing `user_role_type` from desktop  
- Creating TZ Auth users for every seat  
- Treating Team seat login as the long-term Admin identity (interim pilot only)  
- Full Flutter UI clone; KYC camera/FCM on desktop as v1 requirement  
- Putting `TRANZFORT_SERVICE_KEY` in the browser  

---

## W — Live write spine / org-map truth — **DONE for pilot (31 Jul)**

### Failure observed (then fixed)

`service_publish_tsm_load_as_super` initially returned `P0001: tsm_org_not_linked` because TSM stored a local
`tranzfortSupplierId` while TranZfort `tsm_org_supplier_map` had **0 rows**.

### Verified live publish (31 Jul)

| Field | Value |
|-------|-------|
| Audit | `status=success` at `2026-07-30T18:51:30Z` |
| Load id | `e595b49e-9250-4a4f-bc3a-b38ab8358525` |
| Lane | Cement Blocks · Pune, Maharashtra → Jalna, Maharashtra |
| My Loads | Appears live with `postedFromTsm=true` |
| Map | `org_zaftys_local` ↔ `652922ee-5780-4af2-9297-085da0fa1008` (`linkStatus=verified`) |

### W task list

- [x] **W1** Diagnose and query authoritative TZ map (confirmed 0 rows)
- [x] **W2** Add `getRemoteTsmOrgSupplierLink` (service-role read)
- [x] **W3** Add idempotent `ensureRemoteTsmOrgSupplierLink` (read → upsert → verify)
- [x] **W4** `GET /api/tsm/org`: `liveLinked` means remote row exists **and supplier matches**
- [x] **W5** Publish preflight repairs/verifies the map before calling publish
- [x] **W6** Live link endpoint verifies the map after upsert
- [x] **W7** L1 bootstrap no longer swallows live-link failures
- [x] **W8** Upsert Tabish live map and verify exactly one matching row
- [x] **W9** User republished after repair (original auto-retry impossible — draft not saved pre-fix)
- [x] **W10** Verified returned load in My Loads + audit `status=success`
- [ ] **W11** Regression test: local-only link must report `linkStatus=local_only`, not live-linked **[deferred]**
- [x] **W12** Save validated draft **before** remote publish so future failures retain the idempotency key and exact payload
- [x] **W13** Normalize/reject reversed/out-of-India coordinates in the offline mirror and live publish gate
- [x] **W14** Persist origin/destination city in Fleetbase `meta`; treat empty Fleetbase place strings as missing
- [x] **W15** Repair failed shipment `order_oyI7OkjJ7y`: Pune → Jalna, corrected Jalna to `19.84,75.89`
- [x] **W16** Fix Fleetbase order updates to use `PUT` (this deployment rejects `PATCH` with 405)

### Additional failures found while repairing W8

- The first places index preferred an arbitrary district alias over an exact city row. Jalna became reversed
  `76.69985,19.30985`; catalog sync now prefers exact city names, swaps obvious lng/lat inversions, and enforces
  the India envelope (`lat 5–40`, `lng 65–100`).
- Fleetbase accepted coordinates but returned `city/name/address` as empty strings. Mapper `??` stopped at `""`,
  hiding the valid `meta.origin`/`meta.destination` fallback.
- Publish saved `draftSnapshot` only **after** TZ success. The failed payload therefore could not be reconstructed
  exactly. The wizard now persists the validated draft before the RPC.

### Product rule (locked)

`linked` = local intent. `liveLinked` = authoritative TZ map verified. UI/publish readiness must never collapse
those two states again.

---

## D2 — Catalog mirror (locked product decision — 30 Jul)

**Decision:** TSM must hold a **local mirror** of TranZfort’s full materials catalog and offline places pack
(`indian_cities.json`), not only live RPC typeahead. Shipment create and Post to TZ both pick from that mirror
so LOS fields match marketplace codes/coords.

| Source (TZ) | TSM target | Notes |
|-------------|------------|-------|
| `public.materials` (~839 rows) via service_role | `.data/tz-materials.json` + in-memory search | Sync script / admin refresh |
| `assets/data/indian_cities.json` (~66MB pincode pack) | `.data/tz-places.json` (deduped city/district+state index) | Path via `TRANZFORT_INDIAN_CITIES_PATH`; **do not commit 66MB** |
| `get_vehicle_catalog` | Keep live RPC (+ optional cache later) | Already healthy |

### D2 task list

- [x] **D2.1** Sync script `scripts/sync-tz-catalogs.mjs` — materials from TZ REST + places index from cities JSON  
- [x] **D2.2** Local catalog store + search (`lib/tsm/catalog-mirror.ts`)  
- [x] **D2.3** Materials / places BFF **local-first** (live RPC only as refresh fallback)  
- [x] **D2.4** Admin/status: catalog age, counts (`GET /api/tsm/catalog/status`)  
- [x] **D2.5** Create shipment: place + material pickers (required overlapping TZ fields)  
- [x] **D2.6** Persist structured place/material on shipment (Fleetbase `meta` + types)  
- [x] **D2.7** Post-to-TZ prefill uses structured fields (no stub material_code injection)  
- [x] **D2.8** Settings honesty: show catalog source / last sync **[2 Aug]** — Organization → CatalogStatusPanel  
- [x] **D2.9** Live Super Load smoke — load `e595b49e-9250-4a4f-bc3a-b38ab8358525` (Cement Blocks Pune→Jalna) 

**Synced locally (30 Jul):** 839 materials · **134,540** places (from TZ `indian_cities.json`; file gitignored under `.data/`).  
Run: `npm run catalog:sync` (needs keys + cities path).

**Client/server split (required):** the mirror reads the filesystem, so it must stay off the client bundle.

| Module | Runtime | Rule |
|--------|---------|------|
| `catalog-mirror.ts` | server | `fs` reads of `.data/tz-*.json` |
| `places-server.ts` | server | mirror first, centroid fallback — used by `/api/tsm/places/*` |
| `places-search.ts` | client-safe | centroids + haversine only; **never** import the mirror here |

`form-draft.ts` (client) imports `places-search`, which is why importing the mirror into it broke the build with
`Module not found: Can't resolve 'fs'`. Prefill now trusts structured shipment coords; unknown towns come from the
server typeahead instead.

### Planned flow (after D2)

```text
Create shipment
  → pick origin/destination from tz-places
  → pick material_code from tz-materials
  → store city, state, lat, lng, material_code on shipment
Post to TranZfort
  → prefill from structured fields
  → user adds vehicle / price / listing only
  → publish
```

**Canonical backlog:** `tranzfort-lab/docs/TODO-TSM-Tranzfort-Merge-26-july.md`  
**Portal slice:** `zaftys-lab/docs/TODO-TSM-Tranzfort-portal-26-july.md`  
**RPC contract:** `tranzfort-lab/docs/tsm-bridge-rpc-contract.md`

This is the **execution checklist for `zaftys-main/app-tsm`**.  
**Prod rule:** TranZfort is **live**. Prefer consume existing Auth/RPCs; any new TZ objects must be **additive, flagged, and reversible**.  
**Pilot ops:** [`TSM-TZ-pilot-cleanup-and-smoke-runbook.md`](./TSM-TZ-pilot-cleanup-and-smoke-runbook.md) — TSM cleanup + live smoke (do not touch TZ data).

---

## Product north star (locked — 29 Jul reframe)

**One identity. Two clients. Same marketplace data. TSM adds office/LOS features.**

```text
┌──────────────────────────────────────────────┐
│     One identity: verified TZ supplier       │
│     (signup + KYC on TranZfort Android)      │
└────────────────────┬─────────────────────────┘
                     │
         ┌───────────┴───────────┐
         ▼                       ▼
 TranZfort Android            TSM Web / Desktop
 full marketplace             same supplier + extended features
 • Post / Find / chat         • My Loads (live from TZ)
 • My Loads / trips           • Bookings approve/reject
 • KYC / docs                 • Post Super Load (+ from shipment)
                              • Shipments, fleet, billing, dispatch
                              • Optional team seats under same supplier
```

| Do say | Don’t say |
|--------|-----------|
| TSM is the supplier’s **web/desktop console** | TSM is a foreign app that “syncs users” |
| Same account / same loads | Separate TSM identity that happens to match email |
| Bridge/map is **implementation** | Bridge is the product story |
| My Loads in TSM = read-through TZ | Only show loads TSM itself posted |

**Implication:** Historical loads (10–20 posted in TZ over a month) must appear in TSM via `get_supplier_loads_list` (or service twin) — **core**, not optional “supplement.”

---

## Completed audit (honest — 29 Jul)

### Done and keep (`[x]`)

| Area | What’s done |
|------|-------------|
| **A Auth-lite** | Org types, seat publish gate, persisted users (`auth:create-user`), publish audit, “Posts as {Company}” copy |
| **B Bridge code** | `bridge-rpc.ts`, `POST link-supplier`, `POST publish`, `mock\|live` env |
| **C Publish form** | Full shipment-backed wizard (route/cargo/vehicle/price/listing/review), CTAs, draft save, no hardcoded hub mock publish |
| **D Catalog FE** | Catalog + materials BFF, TZ type·W·ton stub alignment, wheel/ton UI, places/route BFF (city + haversine) |
| **E Partial** | Client validation, `draftSnapshot`, `tranzfortLoadId` fields, audit rows |
| **P Arch** | Share TZ Supabase; no full TZ web clone; TSM BFF required; seats TSM-only preferred |

### Partial / incomplete (`[~]`) — do not treat as done

| Area | Gap |
|------|-----|
| **B Live ops** | Keys + Tabish linked; My Loads live; **publish smoke still pending** |
| **D Places** | City centroids + haversine only — **not** TZ Places JSON / Google (Wada etc. miss) |
| **I Live safety** | **Code done** — stub block, badges, idempotency, live gate. Remaining: live publish QA |
| **FE-5 badges** | Mock vs Live distinguished |
| **H Link UI** | Settings paste-UUID panel — **pilot ops**; product path is L1/L2 |

### Auth reminder (do not divert)

| Path | Who pastes UUID? | When |
|------|------------------|------|
| **L1** email/password | Nobody — BFF resolves `auth.uid` → auto-link | **Product default (next build after secrets)** |
| **L2** OTP to TZ app | Nobody — same session bootstrap as L1 | After L1; flag off by default |
| **H** Settings paste UUID | Ops / pilot | **Optional shortcut** for one live smoke **before** L1 ships |

**Locked:** OTP-first is **rejected**. End users never need a supplier UUID. Manual link is scaffolding, not the north star.

### I checklist (updated)

- [x] Live mode refuses stub vehicle catalog substitution (`catalog-client`)  
- [x] Live mode refuses stub materials fallback for publish path  
- [x] Prefill does not inject stub `material_code`  
- [x] `liveOnTranzfort` only for non-mock ids + live mode (`live-honesty.ts`)  
- [x] Hub/wizard: mock-linked labeled local-only  
- [x] Reuse `draftSnapshot.idempotencyKey` on publish/save  
- [x] Server `publishGateForMode` stricter in live  
- [x] `api.linkTranzfortSupplier` / `patchTsmOrg`  
- [ ] Approximate pin ack / hard block (product choice)  
- [ ] Manual QA: live catalog + linked smoke  

### Not started / next value (`[ ]`)

| Area | Why it matters |
|------|----------------|
| **L1** Same TZ password login | **Partial** — live grant wired; Google-only → Team seat (**L2 deferred**) |
| **J** My Loads read-through | **Done (live)** — 65 Tabish loads |
| **F** Booking inbox | Manage marketplace on desktop |
| **L2** OTP via TZ notif | Confirm-on-phone **after** L1 (not instead of) |
| **H** Live link write (ops) | **Done** for Tabish — optional for other pilots |
| **M/N/O** Seats, desktop, multi-tenant | Scale after L1 |

### Explicitly not done (avoid false confidence)

- No Tabish (or any) live `link-supplier` on prod map yet  
- No L1 / L2 **live** Auth yet — mock login works; UUID paste is **not** the product login  
- My Loads mock desk exists; **live** list needs keys  
- No TZ booking Approve/Reject from TSM  
- Withdraw is local-only  
- Org switcher is decorative  
- Auth-lite ≠ TZ Auth  
- `.env.local` may lack TranZfort secrets until Bitwarden load  

---

## Sequencing (do in order)

| Step | Task | Status |
|------|------|--------|
| A | Auth-lite (pilot seats) | `[x]` keep for mock + invited seats until L1/M |
| B | Bridge BFF link + publish | `[~]` code ready; live E2E open (needs secrets) |
| C | Shipment-backed publish form | `[x]` |
| D | Catalog / materials / places | `[~]` live stub blocked in live mode; Google/OSRM later |
| E / I | Validation / badges / live honesty | `[~]` code done; live QA pending secrets |
| H | Manual UUID link (ops UI) | `[~]` UI done; **optional** live write — not product login |
| **L1** | Sign in as TZ supplier (email/password) + auto-link | `[~]` **mock login shipped**; live Auth needs keys |
| J | **My Loads in TSM** (read-through TZ) | `[~]` **mock desk shipped**; live needs keys |
| F | Booking inbox on those loads | `[ ]` |
| L2 | OTP via TZ notification (+ L1 fallback) | `[ ]` after L1 — not OTP-first |
| M | Team seats under same supplier | `[ ]` |
| N | Desktop shell | `[ ]` after L1 |
| O | Multi-tenant workspaces | `[ ]` after L1/M |
| K | QA / smoke | `[ ]` ongoing |
| P | Architecture locks | `[x]` |
| G | Full TZ web clone / generic NextAuth | `[—]` rejected |

**Identity gate (product):** L1 before claiming “same supplier web user.” End users never paste UUID.  
**OTP gate:** L2 only after L1; flag off by default on prod.  
**Desk gate:** J before claiming TSM shows existing TZ loads.  
**Optional pilot smoke:** H live write + I QA **only if** we want one Super Load on prod **before** L1 ships (needs Bitwarden secrets). Prefer L1 → auto-link → J when possible.

---

## After login — target experience

```text
Supplier signs into TSM (L1 / later L2)
        │
        ▼
Home / Network as THIS supplier
        ├─ My Loads ← live TZ list (active / expired / …)     [J]
        ├─ Bookings ← pending requests on those loads         [F]
        ├─ Post from shipment → Super Load (same supplier)    [C+B]
        ├─ Shipments / Fleet / Billing                        [LOS]
        └─ Team (optional seats)                              [M]
```

Chat + KYC remain on TranZfort mobile. Loads and bookings are shared marketplace state.

---

## Target journeys

### Journey 1 — Existing supplier (Tabish) — preferred vs shortcut

**Pilot identity (known):**

| Field | Value |
|-------|--------|
| Name | Tabish Khan |
| Email | `tabish.khan9404@gmail.com` |
| `profiles.id` | `652922ee-5780-4af2-9297-085da0fa1008` |

**Preferred (product path — no UUID for the user):**

```text
Verified TZ supplier with existing loads
  → Load Bitwarden TranZfort secrets into TSM BFF
  → L1: login with same TZ email/password
  → Auto workspace + auto-link (supplier_id from auth.uid)
  → J: My Loads shows historical + new loads
  → F: approve bookings in TSM
  → L2 later: OTP to TZ app (+ password fallback)
```

**Optional shortcut (ops only — before L1 exists):**

```text
  → H: paste UUID once in Settings (ops)
  → I QA + one live Super Load smoke
  → Then still build L1 so Tabish never pastes UUID again
```

### Journey 2 — New company (scale)

```text
1. Signup + verify on TranZfort Android
2. Open TSM web/desktop → L1 (then L2 OTP)
3. Auto workspace = this supplier (map + org)
4. My Loads + post + LOS extensions
5. Invite dispatchers (M) — posts still as this supplier
```

### Journey 3 — Mental model

| Job | Where |
|-----|--------|
| KYC / docs | TranZfort mobile |
| Day-to-day marketplace on phone | TranZfort mobile |
| Same My Loads / bookings on desk | **TSM** |
| Shipments, fleet, billing, dispatch | **TSM** (extended) |
| Post Super from plant shipment | **TSM** |
| Trucker Find Loads / chat | TranZfort |

---

## Still pending — priority order

> **Superseded by Development sequence S0–S7** at top of this file (2 Aug). Historical marketplace order kept for archaeology.

**Current:** S0–S4 **done** (postgres default smoked). **S5 staging/WebView deferred.** Open: S1 Org B smokes · S4b FB delete · S6 LR → **S7 AI last**.

0. ~~Pilot prep~~ / L1 / J / keys / Google / seats / marketplace desks — **mostly done** (see Snapshot)  
8. ~~M seats / N desktop scaffold / O LOS cutover~~ — seats done; desktop scaffold done; LOS = S4 done  
9. **D** places — deferred  
10. **K** QA matrix — after Org B smokes  
11. **S5 staging** — **deferred 2 Aug**  

**Optional:** H live UUID paste only if needed (ops).

---

## Locked product decisions

> Full detail: **Decisions lockbook (DL-1 … DL-11)** at top of this file.

- **TSM = desktop TZ supplier console + separate TMS/LOS** — marketplace UX TZ-similar; TMS modules additional.  
- **One identity:** verified TZ supplier = TSM Org Admin (Google primary; password secondary).  
- **No TSM signup** — TranZfort-first signup + KYC only.  
- Marketplace loads always owned by linked **`supplier_id`**; seats only audit “who clicked.”  
- **Roles:** Admin + Dispatcher may post; Viewer read-only; seats TSM-only (never TZ Auth per seat).  
- **Find Loads card** shows **`suppliers.company_name`** (ZAFTYS / ABC Logistics), not personal name alone — feed SQL fix (Phase F).  
- **My Loads / bookings** = live TZ read-through (not a second load DB).  
- Shipment-backed Super post = v1 LOS power path; blank “post like mobile” = later parity.  
- **No full TZ web clone**; share TZ Supabase; BFF holds `service_role`.  
- **No end-user UUID paste** — auto-link from TZ Auth after Google/password login.  
- **OTP-via-notification** optional later — **not** required now that Google desktop is primary.  
- H UUID paste = ops-only / interim.

### Identity model

```text
INTERIM (pilot until Google web ships):
  Team seat shortcut for Google-only suppliers (e.g. Tabish)
  Do not sell this as “login = identity”

TARGET (locked 1–2 Aug):
  Verified TZ supplier Google (or password) → TSM Org Admin + auto-link
  Admin invites TSM-only seats (dispatcher / viewer)
  My Loads / bookings = same TZ data
  Publish / approve as linked supplier_id (service bridge for seats)
  Find Loads card = company_name (same for all seats who post)
  User never pastes profiles.id
```

### Auth architecture (summary)

| Topic | Decision |
|-------|----------|
| Full TZ web for KYC | Not required — Flutter KYC |
| Share TZ Supabase Auth | Yes + TSM BFF |
| **Google on TSM** | **Primary** Admin login (login only; no signup) |
| TZ email/password on TSM | Secondary Admin login |
| Team seat login | Invited staff only |
| Post ownership | Linked supplier; seat in audit only |
| Marketplace card label | `suppliers.company_name` then `full_name` |
| OTP-first / OTP via TZ notif | Not required for v1 Admin auth |
| Create supplier from TSM | **Rejected** |
| TZ org/team tables | **Do not add** — seats stay TSM-side |

```text
Phase 0  Publish + bridge + honesty + My Loads + bookings list     [done]
Phase 1  Google web login (verified supplier → Admin)              ← NEXT
Phase 1b Find Loads company_name feed fix (Phase F)                ← can parallel
Phase 2  Seats UX + safe booking Approve/Reject
Phase 3  Marketplace UI polish (TZ-similar) + trips/analytics
Phase 4  Chat / OTP polish / desktop shell / multi-org             later
```

### OTP delivery (optional later — not blocking Google)

`INSERT notifications` → in-app + FCM. Flag off by default. Prefer Google desktop login first.

---

## Frontend-first evaluation

### Constraint

| Do | Do not |
|----|--------|
| Build supplier desk + LOS in `app-tsm` | Change Flutter Post Load for TSM features |
| Call existing TZ RPCs from BFF | New TZ RPCs for **publish** |
| My Loads via `get_supplier_loads_list` | Copy all TZ loads into TSM NetworkListing as source of truth |
| L2: additive OTP RPC only | Edit booking/KYC notify paths |
| Keep shipment as LOS source of truth | Clone full TranZfort web |

### Catalog contract (type · W · ton) — locked

| Concept | TZ field | Example |
|---------|----------|---------|
| Type | `category_code` | `open_truck` |
| Wheels | `wheels_w` | `10` → **10W** |
| Capacity | `loading_ton_min/max` | **12–19 T** |
| Label | `label_en` | `Open Truck • 10W • 12-19T` |
| Post | envelopes + `required_configuration_codes[]` | `open_10w_12_19t` |

### FE phases

| Phase | Scope | Status |
|-------|-------|--------|
| FE-1 Form shell | `[x]` |
| FE-2 Draft → NetworkListing | `[x]` |
| FE-3 Catalog BFF | `[x]` code; live safety incomplete |
| FE-3b type·W·ton | `[x]` |
| FE-4 Places | `[~]` city estimate |
| FE-5 Publish + badges | `[~]` mock over-claims Live |
| FE-6 Booking inbox | `[x]` desk; live actions need TZ migration |
| FE-7 My Loads desk | `[x]` |

#### Wiring

```text
[TZ My Loads] ◄── read-through ── GET /api/tsm/tranzfort/loads ──► get_supplier_loads_list
[Shipment] ──► Post form ──► publish RPC ──► same supplier loads
[Bookings] ◄── F ── existing approve/reject RPCs
```

---


## A — Auth-lite

- [x] `lib/tsm/org.ts` — types + `canPublishToTranzfort` / role map from session
- [x] Persist org account (`tsm_org` collection) — company, main contact, supplier id, policy
- [x] API gate: publish/link require admin|dispatcher session
- [x] Persisted login users (`auth_users` + password hashes + `.data/auth-seed.json`)
- [x] `npm run auth:create-user` / `npm run test:auth`
- [x] Publish audit collection (in-memory + Postgres write-through)
- [x] Surface org publish identity in UI
  - [x] Show company name on Network hub / wizard header
  - [x] Show “Posts as {Company}. Your name is recorded for audit only.”
  - [x] Show role gate copy for viewer users
- [ ] Seat UX / policy polish *(optional)*
  - [ ] Cap invite / create-seat UX at 3 seats
  - [ ] Clarify admin vs dispatcher vs viewer capabilities in settings/help text
  - [x] Prevent viewer from seeing publish as enabled *(form disables + API 403)*
- [ ] Auth users bind to org id *(deferred with multi-tenant — today single global org)*
- [ ] Auth-lite QA
  - [ ] Verify persisted org survives restart / hydrate
  - [ ] Verify `dispatcher` and `admin` can publish
  - [ ] Verify `viewer` / non-publish roles get 403 from publish endpoints

### A detail — auth-lite acceptance

- Publish authority is determined by durable org + seat role, not temporary demo-only memory.
- Company identity shown in the publish form matches the org record that is linked to TranZfort.
- Auth-lite remains valid for mock QA and invited seats; **production admin = TZ supplier via L1 (then L2).**

---

## B — Live bridge

- [x] Server RPC client using `TRANZFORT_SUPABASE_URL` + `TRANZFORT_SERVICE_KEY`
- [x] `POST /api/tsm/tranzfort/link-supplier`
- [x] `POST /api/tsm/tranzfort/publish`
- [x] `TSM_TRANZFORT_BRIDGE_MODE=mock|live` in `.env.example`
- [~] Harden BFF request/response contracts
  - [x] Validate / normalize draft shape before RPC (`asDraft` + `draftReadyForPublish`)
  - [x] Normalize enums (`priceType`, `listingDuration`) server-side
  - [~] Normalize dates / numbers and reject NaN or empty strings *(partial)*
  - [ ] Require `materialCode`, non-zero coords, route distance, pickup date on **live** publish *(server today weaker than form)*
  - [~] Return stable error codes/messages for UI mapping *(codes exist; expand mapping)*
- [~] Publish idempotency handling
  - [x] Generate idempotency key (`tsm-{shipmentId}-…`)
  - [x] Pass key through to TZ + store in audit / draftSnapshot
  - [x] Disable Publish button while submitting (double-click guard)
  - [ ] **Reuse** `draftSnapshot.idempotencyKey` (or stable `tsm-{shipmentId}-vN`) on retry / re-open — **today `draftGate` always mints a new key → duplicate Super Loads risk**
- [ ] Link-supplier ops checklist *(see also H)*
  - [ ] Resolve real TZ `profiles.id` for pilot supplier (e.g. Tabish)
  - [ ] Confirm role=`supplier`, not platform `supplier@zaftys.com`
  - [ ] Run **live** `link-supplier` (not mock)
  - [ ] Confirm map row + `verification_status=verified`
  - [ ] Confirm auto-policy (`paid_tsm_auto_activate` vs `manual`)
- [ ] Bridge smoke / live acceptance
  - [ ] Mock publish still works without secrets *(manual QA)*
  - [ ] Live publish returns real `load_id` (not `tz-mock-…`)
  - [ ] Published load appears in APK Find Loads as **Super Load**
  - [ ] Final status is `active` when policy auto-activates
  - [ ] Retry with same idempotency key does not create a second load

### B detail — bridge acceptance

- Browser never receives service key.
- RPC errors are visible enough for the form to show actionable failures.
- Live bridge path is safe to call repeatedly because of idempotency *(currently incomplete — fix I/B before claiming)*.

---

## C — Full TSM publish form (shipment-backed)

- [x] Hub CTA **Publish to TranZfort** / deep-link to shipment form
- [x] Honesty notice: bridge mode aware
- [x] Helper: *Posts as {Company}. Your name is recorded for audit only.*
- [x] Replace the split UX with one real publish form
  - [x] Shipment-detail **Post to TranZfort** primary entrypoint
  - [x] Upgrade `post-to-tranzfort-wizard.tsx` (full sections)
  - [x] Network hub CTA opens shipment-backed path (no hardcoded payload)
  - [x] Remove hardcoded mock publish from hub
- [x] Section 1 — Route & timing (city search, exact labels, pickup, listing duration, route preview)
- [x] Section 2 — Cargo & vehicle (material typeahead, weight, **type·W·ton catalog**, trucks)
- [x] Section 3 — Price & payment (fixed/per ton, advance 0–100%, advance/balance)
- [x] Section 4 — Listing window + plant notes (TSM-only — not sent to TZ RPC)
- [x] Section 5 — Review + **Save draft** / **Publish as Super Load**
- [x] Shipment prefill (cities, commodity→material search, tonnage, rate heuristic, pickup)
- [ ] Prefill must not inject **stub-only** `material_code` when bridge is live *(today `suggestMaterialFromCommodity` uses stub)*
- [ ] Wire unused design fields if still desired (`approximatePinAcknowledged` in `publish-types.ts`) or delete dead types

### C detail — UI/UX acceptance

- One clear form flow; user can complete all required TranZfort fields in TSM.
- Same form works for mock QA and live publish, with live-only blockers where data is missing *(blockers incomplete — see I)*.

---

## D — Catalog + materials + places + route services

- [x] Catalog BFF endpoints
  - [x] `GET /api/tsm/tranzfort/catalog`
  - [x] `GET /api/tsm/tranzfort/materials?q=`
  - [ ] Cache strategy and TTL for catalog/material responses
  - [x] Failure mode when catalog upstream unavailable → stub *(OK for mock; **unsafe for live** — see I)*
- [x] Vehicle catalog integration (TZ-aligned)
  - [x] Categories use TZ codes (`open_truck`, `trailer`, …)
  - [x] Post envelopes + `post_selectable` filtering
  - [x] Wheel filter chips + **W** / **ton** badges
  - [x] Labels match TZ `label_en` format (`Open Truck • 10W • 12-19T`)
  - [x] Slot/capacity band summary (`12–19 T`)
  - [x] Store category / body / configuration code arrays on draft
  - [ ] Multi-category post selection UX *(single category is enough for v1)*
- [x] Material integration (`material_code` required on form; commodity only seeds search)
- [x] Place + route BFF endpoints
  - [x] `GET /api/tsm/places/search?q=`
  - [x] `POST /api/tsm/places/resolve`
  - [x] `POST /api/tsm/routes/preview`
  - [~] Provider quality: **city centroids + haversine estimate** now; **Google/OSRM later**
- [~] Saved place support in TSM
  - [ ] Durable place records with exact lat/lng (not city-only)
  - [x] Prefer fleet/saved places in search when resolvable
  - [x] Shipment cities are prefill only; user must pick resolved suggestion
- [ ] Live-mode guardrails that **refuse** stub catalog / stub materials / estimate-only pins *(claimed earlier; not enforced)*

### D detail — data contract acceptance

- TSM gathers every field required by the live `create_load`-shaped contract without changing TranZfort.
- Free-text body/tyre fields are no longer the source of truth for live publish.
- City centroids are OK for mock/FE; upgrade places for production-quality live pins.

---

## E — Validation, persistence, badges, live mirror

- [x] Form validation parity (cities, labels, material, configs, weight vs band, trucks, price, pickup, listing)
- [~] Server-side publish validation (`draftReadyForPublish`, org linked in live)
  - [ ] Align server live validation with form (materialCode, coords, route, pickup)
- [~] Reject weak coordinates/route more strictly in **live** mode (centroids warning / block)
- [x] Draft persistence (`draftSnapshot` on NetworkListing; reopen/edit)
- [~] Live mirror fields (`tranzfortLoadId`, `liveOnTranzfort`, `superLoad`)
  - [x] Written after publish
  - [ ] **Do not** set `liveOnTranzfort` / Super badges for mock `tz-mock-*` ids
  - [ ] Badges distinguish Mock vs Live vs Super clearly on wizard + Offers + Outbound
- [x] Audit row on publish (success/mock/error)
- [ ] Store fuller normalized payload snapshot for support
- [ ] Surface last publish error on Network desk / shipment
- [ ] Align local listing TTL with draft `listingDuration` (48h / 7d / 30d) — **today local expiry can diverge from TZ**

### E detail — persistence acceptance

- Successful **live** publish leaves a durable TSM record pointing at real `load_id`.
- Draft can be saved and resumed before publishing.
- UI shows draft vs **mock** vs **live** / Super Load state without lying.

---

## H — Identity & live link (ops + UI) — **optional pilot shortcut (not product login)**

Goal: one real company supplier linked so TSM can smoke-publish **before L1**.  
**Product replacement:** L1 (then L2) auto-links from TZ Auth — users do **not** paste UUID.

- [ ] Product choice for pilot org
  - [ ] **Option A:** Link pilot supplier onto current `org_zaftys_local` (throwaway smoke only)
  - [ ] **Option B:** Dedicated `tsm_org_id` + company fields for customer (preferred for Tabish)
- [x] Set org company fields to match TZ (`legalName`, `tradeName`, `mainContactName`)
  - [ ] Prefer **pull** from TZ `suppliers.company_name` / profile after lookup (or paste from SQL)
  - [x] Avoid link overwriting TZ with default “ZAFTYS” by accident *(Settings panel blocks link while tradeName is ZAFTYS)*
- [~] Align naming surfaces (or document hierarchy)
  - [x] Bridge `TsmOrgAccount.tradeName` = publish identity (source of truth for posts)
  - [x] Settings org profile — separate card; TranZfort identity panel below *(not auto-synced)*
  - [ ] Header `OrgSwitcher` — decorative today; either wire to bridge org name or hide until multi-tenant
- [x] Link UX / client *(ops scaffolding — keep until L1)*
  - [x] Settings → Organization: paste / confirm `supplierId` (UUID) (`TranzfortOrgLinkPanel`)
  - [x] `api-client.linkTranzfortSupplier` / `patchTsmOrg`
  - [x] Show `GET /api/tsm/org` bridge: mode, liveConfigured, linked, liveLinked, supplierIdMasked
  - [x] Distinguish mock-linked vs live-linked (`bridgeStatusLabel` + panel copy)
- [x] Ops runbook — see `TSM-TZ-pilot-cleanup-and-smoke-runbook.md`
  - [ ] Call live link → verify `bridge.liveLinked` *(only if doing optional pre-L1 smoke)*
- [~] Pilot: Tabish (`tabish.khan9404@gmail.com`)
  - [ ] TSM seat exists with publish role (`admin`|`dispatcher`) — optional; L1 supersedes
  - [x] TZ supplier UUID known: `652922ee-5780-4af2-9297-085da0fa1008` (for ops / docs only)
  - [ ] Live link completed *(optional)*
  - [ ] One live smoke post *(optional)*

### H detail — acceptance

- Email match alone never implies linked *(until L1/L2 automates link after successful TZ auth + verified check)*.
- Live hub never shows “linked” unless live mode wrote/confirmed the map (or TSM stores supplier id **and** mode=live with successful link response).
- One TZ `supplier_id` maps to exactly one `tsm_org_id` (DB UNIQUE).
- **H is optional pilot glue.** **L1 replaces UUID paste** for onboarding. **L2** is confirm-on-phone UX after L1.

---

## I — Live safety & honesty — **pilot blocker** *(code done 29 Jul; QA pending)*

Goal: cannot accidentally post stub data to prod or claim Live when mock.

- [x] Catalog / materials
  - [x] When `TSM_TRANZFORT_BRIDGE_MODE=live`, refuse publish if catalog `source !== "live"`
  - [x] When live, refuse materials selection that came from stub fallback
  - [x] Surface hard error (not toast-only) if `get_vehicle_catalog` / `search_materials` fail
  - [x] Optional: allow stub only when mode=mock
- [x] Prefill
  - [x] Disable stub `suggestMaterialFromCommodity` injection in live mode (force typeahead hit)
- [x] Badges / listing flags
  - [x] `liveOnTranzfort = mode===live && loadId && !loadId.startsWith("tz-mock")`
  - [x] Hub “Live bridge · linked” only when liveConfigured && linked && mode=live
- [x] Idempotency
  - [x] Pass existing `draftSnapshot.idempotencyKey` into `draftGate` / `buildDraftFromForm`
  - [ ] Document repost policy: new key only after explicit “Post again” / new version
- [x] Server validation parity with form for live (`publishGateForMode`)
- [x] Honesty copy
  - [x] Fix stale `demo-mode.ts` comment (“TranZfort linking is deferred”)
  - [ ] Network Offers / Withdraw labeled **local demo** until F/J wired — or hide in live honesty
- [ ] Approximate pins
  - [ ] Require ack or block live publish on `routeSnapshotSource === "tsm-estimate"` / city-centroid only *(product choice)*

### I detail — acceptance

- Live publish with missing TZ catalog cannot succeed using stub codes.
- Mock publish never shows “Live on TranZfort”.
- Retry after transient failure does not double-create Super Loads.

---

## F — Booking inbox + post-publish ops loop — **desk shipped 31 Jul (mock + live list)**

**Goal:** Manage marketplace bookings for **this supplier’s loads** (including historical TZ posts) from TSM — same actions as TZ, desk UX.

- [x] Booking inbox list in TSM (`/network/bookings`)
  - [x] Show load lane, Super / From TSM badges, trucks booked/needed
  - [x] Show trucker + truck summary
  - [x] Link to My Loads + Dispatch board
- [~] Booking actions via BFF
  - [x] List pending/decided/all for linked `supplier_id` (`GET /api/tsm/tranzfort/bookings`)
  - [x] Approve booking — **live** via `service_approve_tsm_booking` (smoked 2 Aug)
  - [x] Reject booking — **live** via `service_reject_tsm_booking` (wired; smoke optional)
  - [x] Open chat / deep-link into TranZfort — **read-only inbox** at `/network/chat` (send stays mobile) **[2 Aug]**
  - [x] Refresh after list load (Approve refresh deferred with actions)
- [x] Separate from local `NetworkOffer` demo (Outbound desk) — honesty copy + distinct route
- [~] Dispatch handoff
  - [x] CTA to dispatch board after approve path
  - [ ] Reflect accepted truck/partner in shipment/network context *(later)*
- [~] Post-publish monitoring *(My Loads covers open listings; booking tabs cover requests)*

### F — TZ bridge for live Approve/Reject

| Path | Status |
|------|--------|
| List pending bookings | **Live** via PostgREST |
| Approve/Reject from TSM | **Live** — `service_*` + `*_as_supplier` (no `set_config`) |
| Flutter Approve | **Valid** — thin wrapper over as_supplier |

### F detail — acceptance

- Bookings on TSM-posted **and** TZ-app-posted loads appear when they belong to the linked supplier. **[list live]**
- Approve/Reject in TSM updates TZ; TZ app Approve remains valid. **[Approve smoked 2 Aug]**

---
## J — My Loads desk (read-through TZ) — **core — mock desk shipped 30 Jul**

**Goal:** After the supplier is linked (and ideally logged in as that supplier), TSM shows the **same loads as TranZfort My Loads** — including 10–20 historical posts — without inventing a second load database.

### J1 — BFF list

- [x] `GET /api/tsm/tranzfort/loads`
  - [x] Query: status filter, search, limit, offset
  - [x] Scope **only** to session org’s `tranzfortSupplierId` (never trust client-supplied supplier UUID)
  - [~] Pilot: mock samples + publish audit; live: service_role `loads` table read (not naive `get_supplier_loads_list` — needs `auth.uid`)
  - [ ] After L1 live: prefer user JWT `get_supplier_loads_list` when available
- [x] Map response fields for UI
- [x] Pagination + empty/error states *(basic)*
- [ ] Optional short TTL cache (30–60s)

### J2 — UI

- [x] Network **My Loads** view (`/network/my-loads`)
- [x] Tabs: Active / Expired / Cancelled / All
- [x] Badges: Super Load; **Posted from TSM**; Mock
- [x] Row actions v1: copy load id
- [x] CTA: Post from shipment
- [x] Honesty: mock vs live / not linked copy

### J3 — Lifecycle honesty

- [ ] Withdraw / cancel wired to TZ **or** disabled for live rows
- [x] Do **not** bulk-import TZ loads into `NetworkListing` / shipments
- [ ] Optional later: link load ↔ shipment

### J detail — acceptance

- Linked supplier with 10–20 TZ loads sees them in TSM after login/link.
- New TSM publish appears in the same list (and on Find Loads).
- No duplicate source of truth; refresh shows current TZ status.
- Withdraw cannot orphan marketplace loads via local-only state.

---

## K — QA / test matrix

- [ ] Unit / integration
  - [ ] Draft field mapping (`shipment` → `TsmPostDraft`)
  - [ ] Catalog helpers (band / wheel / post-selectable)
  - [ ] Publish route validation (live vs mock)
  - [ ] Idempotency key reuse
  - [ ] Live badge flagging (`tz-mock` vs real)
  - [ ] My Loads BFF scopes to linked supplier only
- [ ] E2E / smoke
  - [ ] Login publish-capable user
  - [ ] Open shipment → publish form → save draft → reopen
  - [ ] Mock publish + **Mock** badge (not Live)
  - [ ] Live publish behind env + linked supplier
  - [ ] Viewer publish forbidden
  - [ ] Live publish blocked when catalog source=stub
  - [ ] My Loads lists historical TZ loads for linked supplier
- [ ] Auth / seats / desktop (after L1/L2/M/N)
  - [ ] Unverified cannot publish
  - [ ] L1 bootstraps admin + link
  - [ ] L2 OTP + password fallback + flag off
  - [ ] Seat publish → same supplier_id; audit shows seat
  - [ ] Desktop has no service key; session revoke works
- [ ] Manual ops
  - [ ] Live post visible in APK Find Loads as Super `active`
  - [ ] Trace `load_id` TSM audit → TZ
  - [ ] Tabish (or pilot): My Loads parity mobile vs TSM

---


## L1 — Auth v1: TranZfort email/password — **secondary Admin path (keep)**

**Role (1 Aug):** Password grant remains for suppliers who have TZ email/password. **Google is primary** for Admin (esp. Google-only accounts like Tabish).

**Now (30 Jul):** mock path works without Supabase keys. Live password grant is coded but returns `KEYS_MISSING` until anon URL/key are set.

- [x] Product rules (enforced in mock + live path)
  - [x] Hard gate: `user_role_type = supplier` required *(live)*
  - [x] Hard gate: `verification_status = verified` required for Publish
  - [x] Unverified: allow login with banner + Publish disabled *(live password)*
  - [x] Reject platform / internal accounts (e.g. `supplier@zaftys.com`)
  - [x] Reject banned / trust-restricted accounts *(live)*
- [~] BFF auth (server-only; never put service_role in desktop/web client)
  - [x] `POST /api/auth/tranzfort/login` — mock + live password grant
  - [x] Resolve `profiles.id`, role, verification, company *(live)*; mock pilot Tabish
  - [x] Upsert TSM org + map — **per `org_tz_<supplierId>`** on login; live RPC when keys+live mode
  - [x] Create TSM session: `tzUserId`, `supplierId`, `tsmOrgId`, `authSource=tranzfort`
  - [x] Pull company fields into `TsmOrgAccount` on login
- [~] Login UI
  - [x] Primary CTA: **Continue with Google** (when live Auth configured)
  - [x] Secondary: TZ email + password
  - [x] Team seat path for invited seats / local mock QA
  - [x] Copy: no TSM signup; verification help
- [ ] Session lifecycle (refresh / revoke polish)
- [x] Compatibility with auth-lite / H (both remain)
- [ ] Security checklist (rate-limit live login)
- [x] Live keys path coded (`TRANZFORT_ANON_KEY` + URL; service key for bridge)

### L1 detail — acceptance

- Verified supplier opens TSM with TZ email/password; becomes admin of a linked org without pasting UUID.
- Unverified supplier cannot publish Super Loads.
- Bridge still posts as linked `supplier_id`.

---

## L2 — Google desktop login (PRIMARY) + optional OTP later

**Status (1 Aug):** **Google web login is the locked Admin path** (replaces “OTP first / Google deferred”).  
OTP-via-TZ-notification remains an **optional** later UX, not required for Google-only suppliers like Tabish.

### Google on TSM (build next)

- [~] Ops: confirm Supabase Google provider uses existing Web client (Flutter `GOOGLE_WEB_CLIENT_ID`); redirect URL added for localhost **[2 Aug]**; confirm Web client ID not rotated
- [x] BFF: OAuth start + callback (PKCE); exchange → load `profiles`
- [x] Gates: `user_role_type=supplier`, `verification_status=verified` (Google hard), not banned, not platform email
- [x] Bootstrap: reuse existing map by supplier **or** create `org_tz_<supplierId>`; session `admin` + `authSource=tranzfort`
- [x] Login UI: **Continue with Google** primary; TZ password secondary; **Team seat** for invites; **no Sign up**
- [x] Errors: trucker / unverified / unknown → clear refuse messages (use TranZfort app)
- [x] E2E smoke: Tabish Google → Admin **[done 2 Aug]**
- [ ] Flutter regression after redirect URL change

### Optional OTP (deferred)

- [ ] Table `tsm_desktop_login_challenges` + service RPCs — only if product still wants confirm-on-phone
- [ ] Flag `TSM_DESKTOP_OTP_ENABLED` default **off**
- [ ] Do not block Google Admin login on OTP

### L2 — Flutter (optional polish)

- [ ] Map desktop-login notification types if OTP ever ships
- [ ] No APK change required for Google-on-TSM if Web client / SHA stay stable

### L2 detail — acceptance

- Verified TZ supplier signs into TSM with Google (no TSM signup) and becomes Org Admin with auto-link.
- Trucker / unverified / platform emails are refused with clear “use TranZfort app” messaging.
- Flutter Google sign-in still works after TSM origins are added (same Web client).
- Team seats remain TSM-only; optional OTP (if ever enabled) must not block Google Admin login.

---

## M — Seats & roles (admin creates team; post as main supplier) — **ACTIVE — scaffolded 2 Aug**


**Goal:** Supplier (TSM admin) invites office seats. They use extended TSM features; marketplace identity stays the **same verified supplier**.

- [~] Data model
  - [x] Seats belong to `tsm_org_id` (multi-seat, single supplier link)
  - [x] Roles: `account_admin` | `dispatcher` | `viewer` (viewer ≈ `fleet_manager` portal role)
  - [x] Permissions: `canPublish`, `canManageSeats` (approve deferred)
  - [~] `postedByUserId` / name always written to publish audit *(audit already has seat name on publish path — verify smoke)*
- [~] Admin UX (Settings → Team / Users)
  - [x] List seats (name, email, role, status)
  - [x] Invite / create seat (email + invite link → set password)
  - [x] Change role / deactivate seat
  - [x] Cap seats by policy (3)
  - [x] Clarify copy: posts as company, not teammate
- [x] Invited seat auth (**locked**)
  - [x] **Preferred / locked:** TSM-only seat credentials (no separate TZ supplier account)
  - [—] Alternative: every seat must also have a TZ login — **rejected for v1**
  - [x] Do **not** create a new TZ supplier per seat
- [~] Publish behavior
  - [x] Any `canPublish` seat may submit the Post form (role gate)
  - [x] RPC always uses org’s linked main `supplier_id`
  - [x] UI helper / Settings copy: posts as company
  - [ ] Optional TSM activity line: “Posted by {seat name}”
- [x] Admin transfer / recovery
  - [x] Promote another seat to account_admin **[2 Aug]**
  - [ ] If main TZ credentials change, re-bind without creating a second org
  - [x] Block deleting last admin **[2 Aug]**

### M detail — acceptance

- Dispatcher Priya posts a load; Find Loads shows Acme’s verified supplier/company; TSM audit shows Priya. **[smoke pending]**
- Viewer cannot publish (UI + API).
- Admin can add/remove seats without ops SQL. **[invite/accept scaffolded]**

---

## N — TSM Desktop application

**Goal:** Package TSM as the supplier’s **desktop console** (same web app + BFF) — not a second product or offline fork.  
**Status (2 Aug):** Packaging **locked** — Tauri thin shell → **hosted HTTPS**. Scaffold under `app-tsm/desktop/`.

- [x] Packaging decision (primary)
  - [x] **Tauri** shell loading hosted TSM web UI (industry-standard thin client)
  - [—] Electron — acceptable alternative; not primary
  - [~] PWA installable — interim OK before signed MSI
  - [x] Document: desktop is online-first (publish/bookings need network)
- [x] Scaffold `app-tsm/desktop/` (config + README; no secrets) **[2 Aug]**
- [ ] Shell requirements
  - [ ] Open app → Google / Team seat → portal (against staging/prod URL)
  - [ ] Deep links optional (shipment id, booking id)
  - [ ] Auto-update channel (stable / beta)
  - [ ] Windows focus first; macOS later if needed
- [ ] Security
  - [x] **Never** ship `TRANZFORT_SERVICE_KEY` or DB URLs in the installer (documented)
  - [x] All TZ calls via remote TSM BFF (architecture lock)
  - [ ] Secure storage for refresh token (Credential Manager / Keychain) — later
  - [ ] Certificate / code signing for releases
- [ ] UX
  - [ ] Window title / about: company name + bridge Live/Mock
  - [ ] “Open TranZfort app” link for KYC / chat
  - [ ] Offline: clear banner; no offline TZ publish
- [ ] CI / release
  - [ ] Build pipeline for desktop artifacts
  - [ ] Smoke: Google Admin → portal on staging URL inside shell

### N detail — acceptance

- User installs TSM Desktop, signs in via Google (Admin) or Team seat, posts as main supplier.
- Security review confirms no service_role in client bundle.
- Same feature set as web portal for v1 (no offline-only fork).
- Session survives restart until logout/uninstall; revoke works.

---

## O — Scalable multi-tenant onboarding

**Goal:** Many companies, each with one verified TZ supplier and one TSM org — no shared `org_zaftys_local` for customers.  
**Status (2 Aug):** Horizon 1 **active** — helpers scaffolded; isolation harden next.

- [~] Tenancy
  - [x] Every SSO bootstrap uses dedicated `org_tz_<supplierId>` (reuse map if supplier already linked)
  - [~] Shipments, listings, audit, seats scoped by org *(marketplace BFFs session-scoped; LOS audit pending)*
  - [x] Enforce 1:1 `tsm_org_id` ↔ `supplier_id` (UNIQUE on TZ map)
  - [x] `lib/tsm/tenancy.ts` + `GET /api/tsm/tenancy/status` **[scaffold 2 Aug]**
  - [ ] Forbid resolving “active singleton” when session has a different org/supplier
- [ ] Onboarding variants
  - [x] **TZ-first (locked default):** verify on TranZfort → Google → Admin
  - [~] **Claim path:** existing verified supplier connects TSM
  - [ ] **Sales-assisted:** ops creates shell; user activates via Google
  - [x] Do **not** create TZ supplier from TSM signup
- [ ] Org switcher
  - [ ] Real only for multi-org admins; else show company name from bridge org
  - [ ] Remove decorative fake orgs from production builds
- [ ] Plan / policy hooks
  - [ ] Map `super_load_auto_policy` + `daily_post_limit` to plan
  - [ ] Sandbox vs live entitlement (optional)
- [ ] Support tooling
  - [ ] Lookup by email → org_id, supplier_id, last load_id, verification_status

### O detail — acceptance

- Two companies can use the same TSM deployment without seeing each other’s shipments or posting as each other.
- New company completes Journey 2 without manual UUID paste.

---

## Open product / implementation decisions

- [x] North star: same TZ supplier; TSM = web/desktop extended client + LOS  
- [x] My Loads in TSM = live read-through (not bulk import to shipments)  
- [x] Weight semantics; shipment-backed Super post for v1 LOS path  
- [x] Marketplace owner = linked main supplier (not seat)  
- [x] TranZfort-first KYC; L1 then L2; share Supabase; no full TZ web  
- [x] Invited seats: TSM-only credentials  
- [ ] Blank “post load” without shipment (mobile parity) — when?  
- [ ] J before F vs F only for TSM-originated loads first *(recommend J then F for all supplier loads)*  
- [ ] L2 primary vs optional on login UI  
- [x] Desktop: Tauri vs Electron vs PWA-first → **Tauri → hosted HTTPS**  
- [ ] Places: city estimate vs Google+OSRM  
- [ ] Live publish with centroid pins: ack vs hard block  
- [ ] Repost/edit idempotency versioning  
- [~] Pilot tenancy: `org_zaftys_local` legacy only; new Admins = `org_tz_<supplierId>`  
- [x] Desktop Google Sign-In — same hosted OAuth (not a separate desktop Google SDK)

---

## Deferred / rejected

- [—] Generic NextAuth without TZ  
- [—] Full TranZfort web marketplace / KYC clone  
- [—] Fully offline desktop publish queue  
- [—] Sync Bridge outbox (W5)  
- [—] Daily post quota UI / discard-guard (polish)  
- [—] Creating TZ suppliers from TSM  
- [—] One TZ supplier per seat  
- [—] OTP-only login with no password fallback  
- [—] service_role or Google secret in desktop  
- [—] Treating email match alone as linked  

---

## Env

```env
TSM_TRANZFORT_BRIDGE_MODE=mock
# TSM_TRANZFORT_BRIDGE_MODE=live
# TRANZFORT_SUPABASE_URL=https://tjpmkxgveuxvbtsqynwn.supabase.co
# TRANZFORT_SERVICE_KEY=…   # SERVER ONLY
# TSM_DESKTOP_OTP_ENABLED=0
```

`npm run secrets:tranzfort`  
`npm run auth:create-user` — pilot / invited seats  
Target admin: **L1** TZ email/password → **L2** OTP to TZ app  

---

## Definition of done

### v1 — Safe outbound publish (pilot)

1. Shipment → full form → live Super Load (`load_id`, Find Loads active when policy auto).  
2. Role gates + no service key in client.  
3. Live catalog codes required; stub cannot satisfy live.  
4. Mock never labeled Live; idempotent retry safe.  
5. Linked supplier owns the load.

### v1.1 — Same supplier desk

6. **L1:** login as verified TZ supplier; auto workspace link.  
7. **J:** My Loads shows historical + new TZ loads (read-through).  
8. **F:** Approve/Reject bookings for those loads.  
9. Withdraw does not orphan TZ loads.

### v1.2 — Confirm-on-phone + team + desktop

10. **L2:** OTP via TZ notification; L1 fallback; flagged.  
11. **M:** seats post as main supplier.  
12. **N:** desktop shell without secrets.  
13. **O:** multi-tenant isolation per supplier.

---

## Progress scorecard (2 Aug)

| Area | Done? | Notes |
|------|-------|-------|
| A Auth-lite | Yes | Pilot seats; Tabish seat interim |
| B Bridge code | Yes | Live keys; mode=`live` |
| C Publish form | Yes | Wizard + draft-before-publish |
| D Catalog (vehicle + materials) | **Yes (mirror)** | 839 materials local-first; vehicle catalog live RPC |
| D Places | **Yes (mirror)** | ~133k places from TZ offline pack; India coord gate |
| E / I Honesty | **Partial** | Stub/badges OK; Settings/hub can still over-claim live link |
| H UUID / live link | **Yes** | Authoritative TZ map verified (pilot) |
| **W** Live Super Load publish | **Yes** | `e595b49e…8525` Cement Blocks Pune→Jalna |
| **L1** Password login | Partial | Soft unverified; ban/trust gates on; publish respects `canPublishToTranzfort` |
| J My Loads desk | **Yes (live)** | Includes TSM-posted loads (`fromTsm`) |
| F Bookings | **Yes (list + Approve)** | `service_approve_tsm_booking` smoked; reject wired |
| **Google Admin login** | **Yes (smoked)** | Tabish Google → Admin; map reuse `org_zaftys_local` |
| **Roles / post-as-company** | **Locked** | Admin+Dispatcher post; ownership = supplier_id; seat audit only |
| **Per-supplier org** | **Partial** | New suppliers → `org_tz_*`; existing map reused (1:1) |
| **Company on Find Loads card** | **Yes** | Feed `supplier_name=ZAFTYS` verified on Super Load |
| OTP via TZ notif | Deferred | Optional; Google is primary |
| M Seats | **Yes (core)** | Invite→accept→seat session smoked; cap 3; viewer blocked |
| N Desktop | Deferred | Web client for TSM browser; Desktop Google client = later shell |
| O Multi-tenant | **Partial** | Map 1:1; Admin path multi-org; seats need org bind |
| K QA | Deferred | After seats |
| P Arch locks | Yes | Decisions lockbook DL-1…DL-11 + ADR-008/009 |

**Completed:** live bridge + catalog + Super publish + My Loads + booking Approve + Google Admin + seats + company card + **Marketplace nav/honesty polish**.  
**Next:** Flutter regression (Google + Find Loads ZAFTYS); optional admin-transfer polish.  
**Ops:** [`TSM-TZ-pilot-cleanup-and-smoke-runbook.md`](./TSM-TZ-pilot-cleanup-and-smoke-runbook.md)  
**Catalog sync:** `npm run catalog:sync`

---

## J My Loads — live read-through fixes (30 Jul)

First live run against Tabish's supplier returned almost nothing useful. Three schema mismatches, all fixed in
`src/lib/tsm/loads-client.ts`:

1. **`is_on_marketplace` does not exist** on `loads`. The mapper read it and always got `false`. Marketplace visibility
   is time-based via `marketplace_visible_until`, which was not even in the `select` list.
2. **There is no `expired` status.** TZ statuses are `active | cancelled | completed | assigned_full`; a listing is
   expired when `marketplace_visible_until` has passed while still `active`. The Expired tab filtered on
   `status=eq.expired` and was therefore permanently empty (20 loads hidden).
3. **`completed` / `assigned_full` had no tab**, so those loads only appeared under All.
4. **`total` was the page length**, not the match count — now taken from PostgREST `Prefer: count=exact` / `Content-Range`,
   and the desk paginates (25/page) instead of silently truncating at 50.

Verified live: All 65 · Active 41 · Expired 20 · Completed 1 · Cancelled 3 (65 = 66 rows minus one child load, since the
query keeps `parent_load_id is null`).

**Local dummy data — two separate sources.** `TSM_DEMO_UI=0` fixes neither, because that flag only gates `demo-data.ts`
seeds, not records already written by smoke runs.

1. **Postgres `app_documents`** — 751 docs ("Smoke Client …", "Live Vendor …", "PhaseB Client …").
   `npm run db:purge-smoke -- --all` removed 743; auth users, passwords, `tsm_org` and `org_profile` are protected.
2. **Local Fleetbase** (`localhost:8000`) — the clients/shipments lists read from here, so 27 contacts and 30 orders
   with `contact_*` / `order_*` ids survived step 1. `npm run db:purge-fleetbase` removed 26 contacts + 30 orders,
   keeping "CJ Darcl". Orders carry no name, only a generated `ZA######` `internal_id`, so they are matched on that
   prefix; the script refuses to run against a non-localhost `FLEETBASE_API_URL`.

After both: 8 local docs, 1 client, 0 shipments, and My Loads still shows all 65 live TZ loads.
Inventory anytime with `npm run db:inspect` (optionally `npm run db:inspect clients vendors` to sample payloads).

**Dev-server hang:** `/api/ops/stream` called `controller.enqueue` after the client disconnected, throwing
`ERR_INVALID_STATE` as an unhandled rejection and wedging Next dev until restart. Enqueue is now guarded and tears the
stream down instead.

---

## D — Catalog / materials / places readiness for live publish (30 Jul)

**Question:** Does TSM ship its own location JSON + materials list like TZ, and will missing them break a live post?

### Short answer

| Data | TSM has local file? | Live mode source | Blocks live publish? |
|------|---------------------|------------------|----------------------|
| Vehicle catalog | Stub only (`catalog-stub.ts`) for mock | TZ RPC `get_vehicle_catalog` | **Yes if live RPC fails** — wizard refuses stub codes |
| Materials | Stub search for mock | TZ RPC `search_materials` | **Yes if you can't pick a `material_code`** — live gate requires it |
| Places / locations | **Hardcoded ~20 city centroids** in `places-search.ts` | **Not TZ** — no Places JSON / no Google Places call | **Only for towns not in the list** (e.g. Wada = 0 hits) |
| Route | Haversine ×1.25 estimate | Not OSRM/Google | Soft — TZ accepts `route_snapshot_source=tsm-estimate` |

TSM does **not** need (and should not ship) a copy of TZ's materials / vehicle JSON as the live source of truth.
In live mode it **reads TZ**. The stub exists only so the wizard works without keys.

### Verified live (Tabish session, 30 Jul)

```
CATALOG   source=live  cats=10  styles=27  configs=81
MATERIALS source=live  e.g. plastic_granules_dana, plastic_products
PLACES    Nagpur=1  Chandrapur=1  Wada=0   ← gap vs TZ Google Places
```

### What live publish actually requires (`draftReadyForLivePublish`)

- `materialCode` from materials search (TZ code, not free text)
- Origin + destination **lat/lng** (not 0,0)
- Route distance > 0
- Pickup date `YYYY-MM-DD`
- Live vehicle catalog with configurations (wizard sets `liveCatalogBlocked` otherwise)
- Org linked to a real supplier UUID

### Will lack of a TSM location JSON break the post?

**Not for major cities in the hardcoded list** (Mumbai, Nagpur, Pune, Chandrapur, Indore, Delhi, …) — typeahead resolves coords and publish can proceed.

**Yes for uncommon towns** that Tabish posts from TZ (Wada, Pritampur, Ballari, …) unless the user supplies lat/lng via resolve, or we add Google Places / Mapbox. Saved Fleetbase places only help if their city is already in the centroid list (otherwise lat/lng stays 0 and live gate rejects).

### Recommendation before first live smoke

1. **Complete D2 catalog mirror** (materials + places local), then upgrade create-shipment pickers.
2. Post a lane using mirrored places + material_code so Post to TZ is confirm + marketplace fields.
3. Keep reading TZ as source of truth for **refresh**; do not invent TSM-only material/place codes.
