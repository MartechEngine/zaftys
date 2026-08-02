# Architecture Decision Records (ADR)

---

## Template

```markdown
# ADR-NNN: Title

| Status | Proposed | Accepted | Deprecated | Superseded |
| Date | YYYY-MM-DD |

## Context
What is the issue?

## Decision
What did we decide?

## Consequences
Positive and negative outcomes.
```

---

## Index

| ADR | Title | Status |
|-----|-------|--------|
| [001](./001-fleetbase-as-backend.md) | Fleetbase as execution backend | **Superseded** by 008 |
| [002](./002-custom-ui-not-vendor-console.md) | Custom UI, not vendor console | Accepted |
| [003](./003-map-provider.md) | Map provider selection | Proposed |
| [004](./004-driver-app-strategy.md) | Driver app strategy | Proposed |
| [005](./005-auth-provider.md) | Auth provider | Proposed |
| [006](./006-zaftys-tranzfort-commercial-model.md) | ZAFTYS–TranZfort commercial & load exchange | Accepted |
| [007](./007-local-docker-and-app-db.md) | Local Docker (ops) + App Postgres | Accepted (amended) |
| [008](./008-tsm-owns-execution.md) | **TSM owns execution — drop Fleetbase** | **Accepted** |
| [009](./009-documents-and-ai.md) | Documents (LR+) + AI BYOK agents | **Accepted** — spec: [ai-agents.md](../product/ai-agents.md) |

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | ADR index created |
| Jul 2026 | ADR-007 added |
| 2 Aug 2026 | ADR-001 superseded; ADR-008, ADR-009 accepted; 007 amended |
| 2 Aug 2026 | ADR-009 → canonical AI spec [ai-agents.md](../product/ai-agents.md) |
