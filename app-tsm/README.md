# ZAFTYS TSM Portal (`app-tsm`)

Next.js app for **app.zaftys.com** — Transport & Shipment Management portal.

Built on branch `app-dev-mode` with mock data for UI development. Connects to Fleetbase + TranZfort in later phases.

## Docs

See [`../docs/app/`](../docs/app/) for product, UX, architecture, and API specs.

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
| **Demo + Postgres** (recommended) | `TSM_DEMO_UI=1` + `DATABASE_URL` | Seed UI + durable notes/listings |
| **Demo memory only** | `TSM_DEMO_UI=1`, no `DATABASE_URL` | In-memory — fine for UI, not durable |
| **Live Fleetbase** | `TSM_DEMO_UI=0` + `FLEETBASE_API_KEY` | Orders/drivers/vehicles from Fleetbase API |

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

## Fleetbase (Docker)

Fleetbase runs from **`zaftys-lab/infra/fleetbase`** (not this repo):

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

## TranZfort sync (P1)

With Fleetbase + TranZfort env vars set, run shadow sync:

```bash
npm run sync:tranzfort
```

Or `POST /api/sync/run` while the dev server is running.

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
| `npm run test:fleetbase` | Verify Fleetbase API key |
| `npm run sync:tranzfort` | TranZfort → Fleetbase sync |
| `npm run smoke` | API smoke (dev server on :3000) |
| `npm run test:e2e:smoke` | Playwright UI smoke (dev server on :3000) |

### Smoke tests (local)

With `npm run dev` running (`TSM_DEMO_UI=1`):

```bash
npm run smoke              # API route smoke
npm run test:e2e:smoke     # Playwright UI smoke (login → portal routes)
```

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
