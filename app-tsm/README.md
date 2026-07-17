# ZAFTYS TSM Portal (`app-tsm`)

Next.js app for **app.zaftys.com** — Transport & Shipment Management portal.

Built on branch `app-dev-mode` with mock data for UI development. Connects to Fleetbase + TranZfort in later phases.

## Docs

See [`../docs/app/`](../docs/app/) for product, UX, architecture, and API specs.

## Quick start

```bash
cd app-tsm
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — Command Center (mock data).

- Login: [http://localhost:3000/login](http://localhost:3000/login) (any credentials in dev)
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
| `npm run dev` | Dev server :3000 |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run test:fleetbase` | Verify Fleetbase API key |
| `npm run sync:tranzfort` | TranZfort → Fleetbase sync |

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
