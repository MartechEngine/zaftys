# Tech Stack — TSM Portal (Full Product)

| Field | Value |
|-------|-------|
| **Status** | Active (Jul 2026) |
| **App path** | `app-tsm/` |
| **Build strategy** | [build-strategy.md](./build-strategy.md) |

---

## Frontend (portal)

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | **Next.js 16** (App Router) | SSR for `/track/[token]` |
| React | **React 19** | |
| UI | **shadcn/ui + Tailwind v4** | Match marketing site |
| Icons | Lucide | Same as zaftys.com |
| Maps | **Mapbox GL JS** | ADR 003; Google optional for India |
| Server state | **TanStack React Query** | Per-module query keys |
| Client state | Zustand | UI prefs, map filters, drawer state |
| Forms | React Hook Form + Zod | Shared schemas with BFF |
| Realtime | Native WebSocket + SocketCluster via BFF | Throttled GPS |
| Tables | TanStack Table | Sort, filter, pagination all lists |
| Drag-drop | `@dnd-kit` | Dispatch Kanban |
| Charts | Recharts | Reports, Command Center widgets |
| Toasts | Sonner | |
| i18n | next-intl (P5) | Hindi driver-facing strings first |

---

## Backend (BFF)

| Layer | Choice | Notes |
|-------|--------|-------|
| Runtime | Node.js 20 LTS | |
| API | Next.js Route Handlers | Co-located with portal |
| Auth | HMAC session (dev) → **NextAuth** (prod) | ADR 005 |
| ORM / App DB | **Drizzle + PostgreSQL** | ADR-007 — portal-owned durable data |
| Validation | Zod | Shared with frontend |
| Fleetbase client | Custom `FleetbaseClient` | REST + file upload |
| File storage | MinIO (local) → S3 (prod); Fleetbase proofs API | LR, ePOD, RC scans |

---

## Execution backend (Fleetbase Docker)

| Component | Version (local) | Role |
|-----------|-----------------|------|
| fleetops-engine | 0.6.57 | Orders, fleet, map, maintenance, connectivity |
| iam-engine | 0.1.10 | Users, roles, policies |
| dev-engine | 0.2.14 | API keys, webhooks, logs |
| ledger-engine | 0.0.7 | Invoices |
| customer-portal-engine | 0.0.12 | Client portal (partial — we use custom track) |
| vroom-engine | 0.0.4 | Route optimization |
| valhalla-engine | 0.0.4 | Routing |
| ai-engine | 0.0.2 | P6 decision support |

| Layer | Choice | Notes |
|-------|--------|-------|
| TMS engine | Fleetbase FleetOps | Headless API only |
| DB | Fleetbase-managed MySQL | Never bypass for reads/writes |
| Console | `:4200` | Internal reference only |
| API | `:8000/v1` | BFF target |

---

## Network (TranZfort)

| Layer | Choice |
|-------|--------|
| Marketplace DB | Supabase (existing) |
| Sync | Node worker + webhooks |
| Mobile | Flutter (TranZfort app) |

---

## Infrastructure

| Layer | Choice |
|-------|--------|
| Hosting | VPS India region → Compose/K8s later |
| Local stack | Docker Compose: Postgres + Redis + MinIO (+ optional app) — [ADR-007](../decisions/007-local-docker-and-app-db.md) |
| App DB | PostgreSQL (ZAFTYS-owned durable data) |
| CI/CD | GitHub Actions — lint, build, migrate, deploy |
| Secrets | `.env.local` / host env — never client |
| CDN | Cloudflare for static |
| Monitoring | Uptime + sync lag + FB health |

---

## Repository layout (current)

```
zaftys-main/
├── app-tsm/                 # Next.js portal (all routes)
│   ├── src/app/             # App Router pages
│   ├── src/components/      # Feature + UI components
│   ├── src/lib/             # fleetbase, sync, data, auth
│   └── infra/               # Docker placeholder
├── docs/app/                # This documentation tree
└── src/                     # Marketing site (zaftys.com)

zaftys-lab/infra/fleetbase/  # Fleetbase Docker (separate repo path)
```

Future optional monorepo: `packages/ui`, `packages/api-client`.

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial stack proposal |
| 11 Jul 2026 | Next.js 16, full product modules, extension versions |
