# ZAFTYS TSM Portal (`app-tsm`)

Next.js app for **app.zaftys.com** — Transport & Shipment Management portal + TranZfort supplier console.

**Architecture (locked 2 Aug 2026):** TSM Postgres owns execution ([ADR-008](../docs/app/decisions/008-tsm-owns-execution.md)); Fleetbase is **transitional** and being dropped. Marketplace = TranZfort. **Documents/AI** = first-party ([ADR-009](../docs/app/decisions/009-documents-and-ai.md), [ai-agents.md](../docs/app/product/ai-agents.md)). Desktop = thin Tauri → hosted HTTPS (customers do **not** need Docker).

## Docs

See [`../docs/app/`](../docs/app/) for product, UX, architecture, and API specs.

**Canonical merge TODO:** [`docs/app/ops/TODO-TSM-Tranzfort-app-tsm-26-july.md`](../docs/app/ops/TODO-TSM-Tranzfort-app-tsm-26-july.md) — marketplace complete; next = **Horizon 1 tenancy** + **Horizon 0 drop Fleetbase** + hosted/desktop.

**Local QA:** [`docs/app/ops/local-qa-runbook.md`](../docs/app/ops/local-qa-runbook.md) — boot, smoke, seed, sync (FB live checks are legacy until Horizon 0D).

**Desktop shell (scaffold):** [`desktop/README.md`](./desktop/README.md) — Tauri thin client → hosted TSM (no secrets in installer).

## Quick start (local Docker — recommended)

```powershell
cd app-tsm
copy .env.example .env.local
npm install
npm run docker:up          # postgres + redis + minio
npm run db:migrate
npm run dev
```

See [`docs/app/ops/local-docker.md`](../docs/app/ops/local-docker.md) and [ADR-007](../docs/app/decisions/007-local-docker-and-app-db.md).

Host-only (no Docker — memory stores, data lost on restart):

```bash
cd app-tsm
# leave DATABASE_URL unset in .env.local
npm install
npm run dev
```

### Data modes

| Mode | Env | Behavior |
|------|-----|----------|
| **Live (default)** | `TSM_DEMO_UI=0` or unset | Today: Fleetbase + Postgres (transitional). Target: **TSM Postgres only** (`TSM_EXECUTION_BACKEND=postgres`, ADR-008) |
| **Demo (opt-in)** | `TSM_DEMO_UI=1` | Rich seeds for demos only — not the build target |

Live-first plan: [`docs/app/ops/tsm-live-first-plan.md`](../docs/app/ops/tsm-live-first-plan.md).

Demo login accounts (dev session, not NextAuth):

| Email | Password | Role |
|-------|----------|------|
| `dispatcher@zaftys.com` | `dev` | Dispatcher |
| `admin@zaftys.com` | `dev` | Admin |
| `fleet@zaftys.com` | `dev` | Fleet manager |

Open [http://localhost:3000](http://localhost:3000) — Command Center (rich demo data by default).

- Login: [http://localhost:3000/login](http://localhost:3000/login) — `dispatcher@zaftys.com` / `dev`
- Public track demo: [http://localhost:3000/track/demo-1](http://localhost:3000/track/demo-1)
- Health: [http://localhost:3000/api/health](http://localhost:3000/api/health)

## MVP routes

| Route | Screen |
|-------|--------|
| `/` | Command Center |
| `/shipments` | Shipments list |
| `/shipments/[id]` | Shipment detail |
| `/dispatch` | Dispatch board |
| `/fleet` | Fleet registry |
| `/map` | Live map |
| `/login` | Login |
| `/track/[token]` | Client tracking (public) |

## Stack

- Next.js 16 · React 19 · Tailwind CSS v4
- shadcn-style components (Button, Card)
- Lucide icons
- ZAFTYS design tokens (navy / orange)

## Fleetbase (Docker) — **legacy / transitional**

> **Locked (ADR-008):** Drop Fleetbase via Horizon 0. Do not add new product features that only write to Fleetbase. Prefer TSM Postgres execution.

Fleetbase (if still used in Phases A–C) runs from **`zaftys-lab/infra/fleetbase`** (not this repo):

```powershell
cd "C:\Users\Public\project\zaftys-lab\infra\fleetbase\upstream"
docker compose -f docker-compose.yml -f ../docker-compose.override.yml up -d
```

| Service | URL |
|---------|-----|
| Console (get API key) | http://localhost:4200 |
| API (TSM app) | http://localhost:8000/v1 |

After onboarding, create an API key and add to `.env.local`:

```env
FLEETBASE_API_KEY=flb_...
```

Test connection:

```bash
npm run test:fleetbase
```

See [`docs/app/ops/fleetbase-docker-spike.md`](../docs/app/ops/fleetbase-docker-spike.md).

## TranZfort Super Load bridge (auth-lite)

Overflow publish uses company org + seat roles (not NextAuth yet).

```env
TSM_TRANZFORT_BRIDGE_MODE=mock   # or live
# TRANZFORT_SUPABASE_URL=…
# TRANZFORT_SERVICE_KEY=…        # npm run secrets:tranzfort
```

| Endpoint | Purpose |
|----------|---------|
| `GET/PATCH /api/tsm/org` | Org account + bridge status |
| `POST /api/tsm/tranzfort/link-supplier` | Map org → TZ supplier |
| `POST /api/tsm/tranzfort/publish` | Super Load orchestrator |

Checklist: [`docs/app/ops/TODO-TSM-Tranzfort-app-tsm-26-july.md`](../docs/app/ops/TODO-TSM-Tranzfort-app-tsm-26-july.md)  
Pilot cleanup + live smoke (TSM-only wipe; care with live TZ): [`docs/app/ops/TSM-TZ-pilot-cleanup-and-smoke-runbook.md`](../docs/app/ops/TSM-TZ-pilot-cleanup-and-smoke-runbook.md)

```bash
# Create a persisted login user (hash only — never commit plaintext)
npm run auth:create-user -- --email you@example.com --password '***' --role admin --name "Name"
npm run test:auth   # set TSM_AUTH_EMAIL / TSM_AUTH_PASSWORD

# Strip demo docs + pilot network/audit noise (does NOT touch TranZfort)
npm run db:wipe-demo
npm run db:pilot-cleanup -- --dry-run
npm run db:pilot-cleanup
# npm run db:pilot-cleanup -- --prune-auth   # keep only admin/dispatcher/fleet
```

## TranZfort trip sync (P1)

TranZfort Supabase keys are stored in **Bitwarden** (Secrets Manager, machine account `dispatch`) — same vault as TranZfort-lab. Do not hardcode keys.

**REMINDER:** Until keys are loaded, keep `TSM_TRANZFORT_BRIDGE_MODE=mock`. Mock L1: login page → **Sign in with TranZfort** → `tabish.khan9404@gmail.com` / `mock-dev`.

With `TSM_TRANZFORT_BRIDGE_MODE=live`, the mock login is rejected. Sign in via **Team seat** — pilot seat `tabish.khan9404@gmail.com` / `Tabish@2026`. The org's linked supplier UUID (not the seat) decides who posts to TranZfort.

**Catalog mirror (materials + places):** run `npm run catalog:sync` after keys are present. Places come from TZ Flutter’s `indian_cities.json` (set `TRANZFORT_INDIAN_CITIES_PATH` or use the sibling `tranzfort-lab` path). Outputs land in gitignored `.data/tz-materials.json` and `.data/tz-places.json`. Create shipment then requires catalog pickers so Post to TranZfort can reuse codes/coords.

```powershell
$env:BWS_ACCESS_TOKEN = "<dispatch access token>"   # never commit
npm run secrets:tranzfort   # writes TRANZFORT_* into .env.local
npm run sync:tranzfort
```

Or `POST /api/sync/run` while the dev server is running (restart `dev` after loading secrets).

See [`docs/app/ops/local-qa-runbook.md`](../docs/app/ops/local-qa-runbook.md) §4.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run docker:up` | Start Postgres + Redis + MinIO |
| `npm run docker:down` | Stop Compose stack |
| `npm run docker:full` | Full stack including app container |
| `npm run db:migrate` | Apply Drizzle migrations |
| `npm run db:generate` | Generate migrations from schema |
| `npm run db:studio` | Drizzle Studio |
| `npm run dev` | Dev server :3000 |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run test:fleetbase` | Verify Fleetbase API key (**legacy** — remove after Horizon 0D) |
| `npm run sync:tranzfort` | Legacy TZ → Fleetbase sync — **retarget or delete** (ADR-008 Phase C) |
| `npm run db:wipe-demo` | Remove known demo `app_documents` ids |
| `npm run db:pilot-cleanup` | Truncate network listings/offers, reset tsm_org, clear publish audit (TSM only) |
| `npm run secrets:tranzfort` | Load TranZfort Supabase keys from Bitwarden → `.env.local` |
| `npm run auth:create-user` | Create auth-lite user (Postgres + `.data/auth-seed.json`) |
| `npm run test:auth` | Login + org + publish gate smoke |
| `npm run smoke` | API smoke |
| `npm run qa` | Alias for `smoke` (runbook) |
| `npm run test:e2e:smoke` | Playwright UI smoke (dev server on :3000) |

### Smoke tests (local)

With `npm run dev` running (`TSM_DEMO_UI=1`):

```bash
npm run smoke              # API route smoke
npm run qa                 # alias → smoke (runbook step 2)
npm run test:e2e:smoke     # Playwright UI smoke (login → portal routes)
```

Full checklist (Fleetbase, seed, sync, persistence): [`docs/app/ops/local-qa-runbook.md`](../docs/app/ops/local-qa-runbook.md).
## Project structure

```
app-tsm/
├── src/
│   ├── app/
│   │   ├── (portal)/     # App shell + ops screens
│   │   ├── (auth)/       # Login
│   │   ├── track/        # Public tracking
│   │   └── api/          # BFF routes
│   ├── components/
│   │   ├── app/          # AppShell, status chips
│   │   └── ui/           # Button, Card
│   └── lib/              # constants, mock data, utils
└── infra/                # Docker compose
```
