# ADR-009: Documents (LR+) and AI Agents Owned by TSM

| Status | **Accepted** |
| Date | 2 August 2026 |
| Related | [ADR-008](./008-tsm-owns-execution.md), [ADR-007](./007-local-docker-and-app-db.md) |
| **AI product spec** | [../product/ai-agents.md](../product/ai-agents.md) — **canonical** stack, authz, features, UI/UX |

---

## Context

ZAFTYS product copy and portal IA promise digital **LR**, invoices, ePOD, and later intelligence. Metadata upload exists; real PDF generation and AI ops do not. These must not depend on Fleetbase. Enterprise TSM needs **AI agents** that complete tasks via chat, with Google + OpenRouter and customer BYOK.

---

## Decision

### 1. Documents are a first-party TSM module

- Canonical trip/shipment data lives in **TSM** (ADR-008).
- **Generators** produce: LR, trip sheet, invoice, ePOD packet, later e-way pack.
- Blobs in **MinIO / S3**; metadata keyed by `org_id` + `shipment_id`.
- Per-org templates: letterhead, GSTIN, branches, **LR numbering series**, audit.

**v1 must-ship for docs:** generate + store + print **LR PDF** from a TSM shipment.

### 2. AI is TSM-owned tool-calling agents (not a second brain)

Full design: **[ai-agents.md](../product/ai-agents.md)**.

Summary locks:

| Topic | Lock |
|-------|------|
| Runtime | Server agent loop over **same BFF/domain services** as the UI |
| Providers | **Google (Gemini)** + **OpenRouter**; platform trial keys + **org BYOK** |
| Client | No keys in browser/desktop; Tauri only hosts the same web UI |
| Authz | Seat/RBAC parity — viewer = read tools only |
| High-risk | Publish, assign, LR, approve/reject, cancel → **Action card confirm** |
| Blocked | Raw SQL, secrets, cross-org, TranZfort chat send, key exfiltration, silent auto-dispatch |
| UX | Header **Copilot drawer** + `/settings/ai` (Admin); not a clone of marketplace chat |
| Features | Phased AI-01…AI-11 (chat, context chip, cards, BYOK, audit, form assist, LR, triage, …) |

```text
User → Copilot drawer → POST /api/ai/chat
         → Agent runtime + LlmClient (Google | OpenRouter)
         → tool registry → confirm gate → domain services
         → audit + usage meter
```

### 3. Sequencing

| Order | Work |
|-------|------|
| After ADR-008 Phase B | LR PDF v1 |
| After LR + stable BFF | `LlmClient` + `/settings/ai` BYOK |
| After BYOK | Agent v1 (Tier 0–1 tools + Action cards) |
| Later | Tier 2 marketplace tools, OCR, digest, suggest-assign |

---

## Consequences

**Positive** — India docs and AI on one product; clear authz/UX; BYOK flexibility; no FB AI dependency.  
**Negative** — Confirm UX and audit ops cost; token spend; prompt-injection vigilance.  
**Mitigation** — Start read + soft writes; confirm high-risk; caps + kill switch; spec in `ai-agents.md`.

---

## Document history

| Date | Change |
|------|--------|
| 2 Aug 2026 | Accepted |
| 2 Aug 2026 | Expanded; canonical AI spec → `product/ai-agents.md` |
