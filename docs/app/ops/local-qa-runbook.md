# Local QA runbook — Sprint 6

| Field | Value |
|-------|-------|
| **Status** | Canonical (Jul 2026) |
| **App** | `app-tsm/` |
| **Goal** | Boot locally, verify demo + optional live Fleetbase, run smoke/sync |

---

## 0. Prerequisites

- Docker Desktop running
- Node 20+ / npm
- Repo on branch `app-dev-mode` (or current app worktree)

```powershell
cd app-tsm
copy .env.example .env.local   # first time only
# Edit .env.local: SESSION_SECRET, DATABASE_URL, optional FLEETBASE_* / TRANZFORT_*
```

---

## 1. Boot (demo — day-to-day)

```powershell
cd app-tsm
npm install
npm run docker:up          # postgres + redis + minio
npm run db:migrate
npm run dev                # http://localhost:3000
```

| Check | Expect |
|-------|--------|
| Login | `dispatcher@zaftys.com` / `dev` |
| Health | http://localhost:3000/api/health → `database: "up"`, `demoUi: true`, `dataSource: "dev-store"` |
| Command Center | Rich demo KPIs (no fake `+12%` delta) |

More Docker detail: [local-docker.md](./local-docker.md).

---

## 2. API + UI smoke

With `npm run dev` running and `TSM_DEMO_UI≠0`:

```powershell
npm run smoke              # API routes + write paths
npm run test:e2e:smoke     # Playwright login → portal routes (optional)
```

| Result | Action |
|--------|--------|
| `All checks passed` | Demo BFF OK |
| Failures | Fix before live mode / commit |

---

## 3. Fleetbase (optional live)

Fleetbase is **not** in this compose — use `zaftys-lab` (see [fleetbase-docker-spike.md](./fleetbase-docker-spike.md)).

```powershell
# After API key in .env.local:
npm run test:fleetbase
npm run seed:fleetbase     # optional sample orders
```

Switch TSM to live honesty (no silent demo fallback):

```env
TSM_DEMO_UI=0
FLEETBASE_API_KEY=flb_...
FLEETBASE_API_URL=http://localhost:8000/v1
```

Restart `npm run dev`, then:

| Check | Expect |
|-------|--------|
| Health | `demoUi: false`, `dataSource: "fleetbase"` |
| Shipments / CC | Live orders **or** fail-loud if API down (not demo seeds) |
| Seed modules | Billing/vendors/settings catalogs empty unless Postgres-hydrated |

```powershell
# Optional: force live gate inside smoke
$env:TSM_DEMO_UI="0"; npm run smoke
```

---

## 4. TranZfort sync (Bitwarden keys)

TranZfort is hosted on **Supabase**. All prod keys live in **Bitwarden Secrets Manager** (same vault as TranZfort-lab — machine account **`dispatch`**). Never commit keys or paste them into chat.

```powershell
# One-time: install Bitwarden Secrets Manager CLI
iwr https://bws.bitwarden.com/install | iex

# Session only — token from Bitwarden → Machine accounts → dispatch
$env:BWS_ACCESS_TOKEN = "<access-token>"

cd app-tsm
. .\scripts\load-bitwarden-tranzfort-secrets.ps1 -WriteEnvLocal
# or: npm run secrets:tranzfort

npm run sync:tranzfort
# or POST /api/sync/run while logged in (after restarting npm run dev)
```

| Bitwarden secret | TSM env |
|------------------|---------|
| `SUPABASE_URL` | `TRANZFORT_SUPABASE_URL` |
| `SUPABASE_SERVICE_ROLE_KEY` | `TRANZFORT_SERVICE_KEY` |

Sync failure triage: [runbook-sync-failure.md](./runbook-sync-failure.md).

Load Exchange live adapter still needs listing schema work; sync/inbound trips use these keys today.
---

## 5. Persistence spot-check (Phase B)

With `DATABASE_URL` set:

1. Create a fuel fill-up (Fleet → Fuel) or `POST /api/fleet/fuel/transactions`
2. Create a fleet issue or `POST /api/fleet/issues`
3. Restart `npm run dev`
4. Confirm rows still present (also in `app_documents` collections `fleet_fuel` / `fleet_issues`)

---

## 6. Quick checklist

- [ ] `docker:up` + `db:migrate` + `dev`
- [ ] Login + health demo mode
- [ ] `npm run smoke` green
- [ ] (Optional) `test:fleetbase` + `TSM_DEMO_UI=0` fail-loud / live lists
- [ ] (Optional) `seed:fleetbase` + `sync:tranzfort`
- [ ] (Optional) fuel/issue survive restart
- [ ] (Optional) `npm run test:e2e:smoke`

---

## Scripts index

| Command | Purpose |
|---------|---------|
| `npm run docker:up` | Infra |
| `npm run db:migrate` | Schema |
| `npm run dev` | Portal :3000 |
| `npm run smoke` | API smoke |
| `npm run test:e2e:smoke` | UI smoke |
| `npm run test:fleetbase` | FB key/reachability |
| `npm run seed:fleetbase` | Sample FB orders |
| `npm run secrets:tranzfort` | Bitwarden → `TRANZFORT_*` in `.env.local` |
| `npm run sync:tranzfort` | TZ → FB shadow sync |

---

## Document history

| Date | Change |
|------|--------|
| 19 Jul 2026 | Initial Sprint 6 local QA runbook |
