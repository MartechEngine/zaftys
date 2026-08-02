# ADR-008: TSM Owns Execution (Drop Fleetbase)

| Status | **Accepted** |
| Date | 2 August 2026 |
| Supersedes | [ADR-001](./001-fleetbase-as-backend.md) |
| Related | [ADR-002](./002-custom-ui-not-vendor-console.md), [ADR-007](./007-local-docker-and-app-db.md), [ADR-009](./009-documents-and-ai.md) |

---

## Context

TSM (`app-tsm`) already ships a custom portal (ADR-002) and a TranZfort marketplace bridge. Execution (shipments, drivers, vehicles, clients, GPS/ePOD) still defaults to Fleetbase when `TSM_DEMO_UI≠1`. That blocks:

1. Clean multi-tenant SaaS (one FB key ≠ org isolation)
2. India-first documents and AI agents on a single domain model
3. Simple hosted + thin-desktop packaging (no FB Docker for customers)
4. AGPL-safe product story

“Inspired by Fleetbase” means **product concepts** (order lifecycle, fleet registry, assign, track). It does **not** mean forever calling Fleetbase APIs or vendoring AGPL code.

---

## Decision

1. **TSM Postgres is the system of record** for own-fleet execution (org-scoped).
2. **Drop Fleetbase** via phased cutover (A→D). After Phase D: no `FLEETBASE_*`, no FB Docker in product runbooks.
3. **TranZfort remains** the marketplace / KYC plane (unchanged north star).
4. **Do not replace FB with another OSS TMS** unless it is permissive-licensed, API-first, and multi-tenant-friendly *and* cheaper than building a thin LOS — default is **build thin Postgres LOS**.
5. UI, agents, and LR generators talk only to TSM BFF / domain types — never `@/lib/fleetbase/*` outside a transitional adapter.

### Architecture planes (locked)

```text
Marketplace / KYC     → TranZfort Supabase
Portal / seats / audit → TSM Postgres (orgs, seats, listings, settings)
Execution / LOS        → TSM Postgres (shipments, fleet, positions, proofs)
Documents / AI         → TSM (templates, MinIO, LLM BYOK) — see ADR-009
Desktop                → Tauri thin shell → hosted TSM HTTPS (no embedded DB)
```

### Adapter rule (Phase A–C)

```text
UI / agents → repositories → ExecutionStore
                               ├─ FleetbaseExecutionStore  (transitional)
                               └─ PostgresExecutionStore   (target; then only)
```

Env (migration): `TSM_EXECUTION_BACKEND=fleetbase | postgres`  
Target: postgres only; delete fleetbase adapter.

### Must build (independence MVP)

| Build | Notes |
|-------|--------|
| Org-scoped schema | `tsm_shipments`, drivers, vehicles, clients, events/notes, positions, proofs/docs links |
| `PostgresExecutionStore` | list/get/create/assign/status/patch for shipments + fleet + clients |
| Status machine | Keep existing TSM transitions / KPIs / exceptions |
| Map + track | Track token + positions from TSM (honesty if GPS sparse) |
| TZ sync retarget | TZ trip → TSM shipment **or** remove FB shadow sync (`run-tranzfort-sync`) |
| Pilot import | One-time FB → TSM for `org_zaftys_local` if needed |
| Delete FB | Remove `lib/fleetbase/*`, health pings, compose docs |

### Build later (not required to drop FB)

Full sitemap parity (~151), deep telematics, GST/Tally/e-way, orchestrator/VROOM, AI agents (after BFF stable — ADR-009), driver mobile beyond TranZfort.

### Explicitly do **not** build to drop FB

- Ember console clone  
- Storefront inside TSM (TranZfort owns marketplace)  
- Offline full-stack desktop with embedded Next+Postgres  
- Copying Fleetbase source into the SaaS  

### Phases

| Phase | Work | Exit |
|-------|------|------|
| **A** | `ExecutionStore` interface; wrap current FB client | No UX change; tests on interface |
| **B** | Migrations + `PostgresExecutionStore` | Flag can create/list/assign on one org |
| **C** | Default `postgres`; map/track/clients; TZ sync retarget; pilot import | App usable with FB down |
| **D** | Delete FB client, env, Docker runbooks; supersede health | `FLEETBASE_*` unset → healthy |
| **E** | Docs v1 + AI foundation (ADR-009) | Parallel after B |

### Desktop / Docker (locked)

| Audience | Runtime | Docker? |
|----------|---------|---------|
| End customer | Browser or Tauri → **hosted** TSM | **No** |
| ZAFTYS ops / staging | Compose or cloud: Next + Postgres (+ Redis/MinIO) | Ops yes |
| Rare on-prem | Customer **server** runs stack; users use browser/desktop to their URL | IT yes |

Docker is **not** the customer install story. Thin desktop never embeds Fleetbase or `TRANZFORT_SERVICE_KEY`.

---

## Consequences

**Positive**

- Independent sellable TSM product; one tenancy model for seats + LOS  
- AGPL out of the critical path  
- Simpler host topology for Horizon 2–3  
- Documents + AI share the same shipment IDs  

**Negative / cost**

- Must implement thin LOS (dispatch/GPS/ePOD depth over time)  
- Pilot data migration from local FB  
- Temporary dual-backend complexity in Phases A–C  

**Mitigation**

- Reuse existing `ShipmentRecord` / `Driver` / `Vehicle` shapes  
- Ship sparse GPS with honesty banners before telematics depth  
- Keep FB adapter only until Phase D  

---

## Document history

| Date | Change |
|------|--------|
| 2 Aug 2026 | Accepted — supersedes ADR-001 |
