# TSM AI Agents — Product & UX Spec

| Field | Value |
|-------|-------|
| **Status** | **Accepted** (spec locked 2 Aug 2026) |
| **ADR** | [009-documents-and-ai.md](../decisions/009-documents-and-ai.md) |
| **Execution** | [008-tsm-owns-execution.md](../decisions/008-tsm-owns-execution.md) |
| **RBAC baseline** | [user-roles-rbac.md](./user-roles-rbac.md) · seats (DL-4) |
| **TODO** | Horizon 4 in [TODO-TSM-Tranzfort…](../ops/TODO-TSM-Tranzfort-app-tsm-26-july.md) |

This is the **canonical** description of what we use for AI, how agents work, what they may and may not do, feature set, and UI/UX. ADR-009 records the decision; this file is the working product design.

---

## 1. What we use (stack)

### 1.1 Providers (locked)

| Provider | Role | Keys |
|----------|------|------|
| **Google AI** (Gemini via AI Studio and/or Vertex) | Default model path; good India latency; future Places/Maps synergy | Platform default **and** org BYOK |
| **OpenRouter** | Escape hatch — many models, one API; customer can switch models/keys later | Platform default **and** org BYOK |

**Not** in v1: Fleetbase AI engine, OpenAI-only hardcode, client-side SDK with keys in the browser/desktop binary.

### 1.2 Server components

| Piece | Responsibility |
|-------|----------------|
| **`LlmClient`** | Unified `complete` / `stream` / `toolLoop`; routes to `GoogleAdapter` or `OpenRouterAdapter` |
| **Agent runtime** | Session-bound loop: user message → model → tool calls → results → reply |
| **Tool registry** | Named tools mapped to **existing BFF / domain services** (same authz as UI) |
| **Confirm gate** | UI/API step for high-risk tools before execution |
| **Audit log** | `org_id`, user, role, model, provider, prompt/run id, tools, outcome |
| **Usage meter** | Tokens / cost estimate; daily org cap |
| **Key vault** | Encrypted org BYOK keys at rest; decrypted only in BFF |

### 1.3 Where AI does **not** run

- Not inside Tauri / Flutter (no keys, no tool execution)
- Not against TranZfort with `service_role` from the model — tools call **TSM BFF**, which already scopes bridge RPCs
- Not a second database — agents **never** get raw SQL or Postgres credentials

### 1.4 Models (defaults — adjustable in settings)

| Use | Suggested default | Notes |
|-----|-------------------|--------|
| Agent chat + tools | Mid/high Gemini or OpenRouter equivalent | Tool-calling required |
| Short form assist (draft notes) | Smaller/faster model | Cheaper |
| Doc/OCR later | Multimodal capable model | Phase later |

Org Admin can set: preferred provider, model id allowlist, fallback provider.

---

## 2. How the agent works

### 2.1 Mental model

```text
User (Admin / Dispatcher / …)
    │
    ▼
TSM AI Chat (portal or desktop WebView)
    │  HTTPS session cookie (same as app)
    ▼
POST /api/ai/chat  (stream)
    │
    ▼
Agent runtime
    ├─ Load org policy: ai.enabled, caps, BYOK, allowlisted tools for role
    ├─ System prompt: India TMS ops assistant; never invent org data; cite tool results
    ├─ Conversation memory (server-side, org+user scoped, TTL)
    │
    ├─► LlmClient.toolLoop(messages, tools)
    │         │
    │         ├─ model requests tool(name, args)
    │         ├─ authz check (role + org + confirm flag)
    │         ├─ if needsConfirm → return pending_confirmation to UI (no side effect)
    │         ├─ else execute via domain service / BFF helper
    │         └─ append tool result; continue loop (max N steps)
    │
    └─► Stream assistant text + structured “action cards” to UI
```

### 2.2 Principles

1. **Same door as humans** — every mutation goes through services that already enforce `tsmOrgId` + role.  
2. **Tools, not vibes** — the model may not “pretend” a shipment was created; only tool success counts.  
3. **Confirm then commit** — destructive / commercial / marketplace writes need an explicit user confirm in the UI.  
4. **Org isolation** — tools always filter by session `tsmOrgId`; cross-org IDs rejected.  
5. **Honesty** — if bridge is mock/offline or GPS missing, agent says so (same honesty notices as desks).  
6. **Bounded loops** — max tool rounds per turn (e.g. 8); max tokens; timeout.

### 2.3 Confirmation protocol

High-risk tools return:

```json
{
  "status": "pending_confirmation",
  "tool": "publish_to_tranzfort",
  "summary": "Publish Cement Blocks Pune→Jalna as Super Load for ZAFTYS",
  "args": { "shipmentId": "…" },
  "confirmToken": "…"
}
```

UI shows an **Action card** with Confirm / Cancel. Confirm calls `POST /api/ai/confirm` with the token (short TTL, single use). Only then does the tool execute.

### 2.4 Memory & context

| Context | v1 | Later |
|---------|----|--------|
| Current page (shipment id, desk) | Pass as `clientContext` | — |
| Last N chat turns | Server transcript | — |
| Org profile (trade name, GSTIN) | Inject read-only | — |
| SOP / rate-card RAG | Optional | After docs library |
| Cross-user shared memory | **No** | Maybe admin-only playbooks |

---

## 3. Authorization — who may do what

Seat roles (product): **account_admin** · **dispatcher** · **viewer**  
(`fleet_manager` treated as **viewer** for marketplace; for LOS, follow RBAC table — agent uses same gates.)

### 3.1 Capability matrix

| Capability | Admin | Dispatcher | Viewer | Notes |
|------------|:----:|:----------:|:------:|-------|
| Open AI chat | ✅ | ✅ | ✅* | *Read-only tools only |
| Search / explain shipments, fleet, KPIs | ✅ | ✅ | ✅ | Org-scoped |
| Read marketplace desks (My Loads, bookings list) | ✅ | ✅ | ✅ | No reply-as-chat |
| Create / update draft shipment | ✅ | ✅ | ❌ | |
| Assign driver / vehicle | ✅ | ✅ | ❌ | Confirm |
| Update shipment status | ✅ | ✅ | ❌ | Confirm if cancel/deliver |
| Generate LR PDF | ✅ | ✅ | ❌ | Confirm |
| Void / regenerate LR | ✅ | ✅* | ❌ | *Admin preferred; dispatcher if policy |
| Publish to TranZfort | ✅ | ✅ | ❌ | Confirm + `canPublish` |
| Approve / reject booking | ✅ | ✅ | ❌ | Confirm |
| Cancel marketplace listing | ✅ | ✅ | ❌ | Confirm |
| Create driver / vehicle | ✅ | ✅* | ❌ | *If UI allows |
| Manage seats / org / AI keys | ✅ | ❌ | ❌ | **Never** via agent for keys paste UX — settings UI only |
| Change billing rates / void invoice | ✅ | ❌ | ❌ | Later; confirm + admin |
| Call raw SQL / export all PII | ❌ | ❌ | ❌ | Blocked for all |
| Send TranZfort chat messages | ❌ | ❌ | ❌ | Non-goal (Flutter) |
| Impersonate other orgs | ❌ | ❌ | ❌ | Blocked |
| Rotate / read decrypted API keys | ❌ | ❌ | ❌ | Blocked — settings UI write-only |

### 3.2 Always blocked (all roles)

| Blocked | Why |
|---------|-----|
| Execute arbitrary code / shell | Security |
| Direct DB / Redis / MinIO credentials | Security |
| `TRANZFORT_SERVICE_KEY` or other secrets in prompts/logs | Security |
| Cross-org reads/writes | Tenancy |
| Reply on TranZfort marketplace chat threads | Product boundary |
| KYC decisions / forge verification | Compliance |
| Disable audit logging | Compliance |
| Bypass confirm for high-risk tools | Safety |
| Bulk delete all shipments / wipe org | Too dangerous — Admin UI only if ever |
| Change Google OAuth / platform env | Ops only |

### 3.3 Confirm-required tools (even when role allows)

- `assign_shipment`
- `update_shipment_status` (especially cancel / delivered)
- `generate_lr` / `void_lr`
- `publish_to_tranzfort`
- `approve_booking` / `reject_booking`
- `cancel_listing`
- `create_invoice` / `void_invoice` (when shipped)
- Any tool marked `risk: high` in the registry

### 3.4 Auto-allowed (no confirm) when role allows

- `search_shipments`, `get_shipment`, `list_exceptions`, `get_kpis`
- `search_drivers` / `search_vehicles`
- `list_my_loads` / `list_bookings` (read)
- `places_search` / catalog lookup
- Draft text suggestions that **do not** persist until user saves

---

## 4. Tool catalog (phased)

### Tier 0 — Read / explain (Agent v1)

| Tool | Description |
|------|-------------|
| `search_shipments` | Filter by status, corridor, client, q |
| `get_shipment` | Detail + timeline summary |
| `get_kpis` / `list_exceptions` | Command center style |
| `search_fleet` | Drivers / vehicles availability hints |
| `list_network_loads` | My Loads read-through |
| `list_bookings` | Booking inbox read |
| `catalog_search` | Materials / places (mirrored catalog) |

### Tier 1 — Safe writes (Agent v1+)

| Tool | Confirm? |
|------|----------|
| `create_shipment` | Soft confirm (summary card) |
| `update_shipment_fields` | Soft confirm |
| `assign_shipment` | **Yes** |
| `generate_lr` | **Yes** |
| `add_shipment_note` | No |

### Tier 2 — Marketplace (after Tier 1 stable)

| Tool | Confirm? |
|------|----------|
| `publish_to_tranzfort` | **Yes** |
| `approve_booking` / `reject_booking` | **Yes** |
| `cancel_listing` | **Yes** |

### Tier 3 — Later

Invoices, e-way pack, maintenance work orders, bulk assign, OCR from uploaded LR photo, predictive ETA — each tool added with registry entry + authz + UX card.

---

## 5. AI features (product surface)

### 5.1 Feature list by phase

| ID | Feature | Phase | Description |
|----|---------|-------|-------------|
| **AI-01** | Ops Copilot chat | H4 v1 | Global assistant: ask + act via tools |
| **AI-02** | Context-aware chip | H4 v1 | “Ask about this shipment” from detail page |
| **AI-03** | Action cards | H4 v1 | Confirm/cancel pending tool runs |
| **AI-04** | BYOK settings | H4 v1 | Google + OpenRouter keys, model pick, caps |
| **AI-05** | Usage & audit | H4 v1 | Admin sees runs, tokens, tool outcomes |
| **AI-06** | Form assist | H4 v1.1 | Prefill create-shipment / post draft from natural language |
| **AI-07** | LR assist | After LR PDF | “Generate LR for SHP-…” from chat or detail |
| **AI-08** | Exception triage | H4 v2 | Summarize late/GPS-stale queue + suggested actions |
| **AI-09** | Marketplace briefing | H4 v2 | Morning digest: open bookings, loads needing action |
| **AI-10** | Doc OCR | Later | Extract fields from uploaded LR/invoice image |
| **AI-11** | Auto-dispatch suggest | Deferred | Suggest driver/vehicle — human confirms (not silent auto) |

### 5.2 Explicit non-features (v1)

- Autonomous overnight dispatch without human confirm  
- Full TranZfort chat bot for truckers  
- Training on customer data for a shared ZAFTYS foundation model (unless separately contracted)  
- Replacing Settings → Users / billing console  

---

## 6. UI / UX

### 6.1 Design principles

- **One assistant, not a dashboard of widgets** — primary AI surface is chat + cards.  
- **Matches portal chrome** — same shell, typography, honesty notices; not a purple “AI toy” skin.  
- **Show work** — when a tool runs, show a short step (“Searching shipments…”, “Awaiting confirm”).  
- **Never hide the human path** — every agent action has a normal UI equivalent.  
- **Desktop = same UX** — Tauri WebView; no separate native AI panel with secrets.

### 6.2 Entry points

| Entry | Placement | Behavior |
|-------|-----------|----------|
| **AI button** | Portal header (right) | Opens right **drawer** (desktop) / full-screen sheet (mobile width) |
| **Keyboard** | `⌘/Ctrl + J` (TBD) | Toggle drawer |
| **Page context** | Shipment detail, dispatch, My Loads | Chip: “Ask Copilot about this…” injects `clientContext` |
| **Empty states** | Optional | Soft suggestion: “Describe a load to create a draft” |
| **Settings** | `/settings/ai` (Admin) | BYOK, models, caps, enable agents — **not** in the chat |

### 6.3 Chat drawer layout

```text
┌─────────────────────────────────────────┐
│ Copilot                          [—][x] │
│ Org: ZAFTYS · Model: gemini-… · ● Live │
├─────────────────────────────────────────┤
│                                         │
│  [Assistant] 3 shipments in transit…    │
│                                         │
│  ┌─ Action card ─────────────────────┐  │
│  │ Assign Ravi → MH12AB1234 to SHP-9 │  │
│  │ [Confirm]  [Cancel]               │  │
│  └───────────────────────────────────┘  │
│                                         │
├─────────────────────────────────────────┤
│ Suggested: Create shipment · Exceptions │
│ ┌─────────────────────────────────────┐ │
│ │ Message…                      [Send]│ │
│ └─────────────────────────────────────┘ │
│ Viewer: read-only · Admin: full tools   │
└─────────────────────────────────────────┘
```

### 6.4 Message & card types

| Type | UX |
|------|-----|
| User text | Right-aligned bubble |
| Assistant text | Left; markdown lite (lists, bold); no raw HTML |
| Tool progress | Muted inline steps |
| Action card | Border + summary + Confirm/Cancel; disabled after resolve |
| Result card | Link to entity (“Open shipment”) |
| Error / honesty | Same `HonestyNotice` pattern as marketplace desks |
| Quota | Banner when daily token cap hit → link to Settings |

### 6.5 Settings → AI (`/settings/ai`) — Admin only

| Section | Controls |
|---------|----------|
| **Enable** | `AI enabled` · `Agents (tool use) enabled` |
| **Google** | Paste API key (write-only; show last4); test connection |
| **OpenRouter** | Paste key; test connection |
| **Routing** | Preferred provider; fallback; default model; allowlist |
| **Limits** | Daily token cap; max tool rounds; who may use chat (all seats vs Admin+Dispatcher) |
| **Audit** | Link to recent runs table |

Never display full key again after save. Desktop does not store keys locally.

### 6.6 Role-aware empty / disabled copy

| Role | Copy |
|------|------|
| Viewer | “You can ask questions. Creating shipments, publishing, and approvals need a dispatcher or admin.” |
| Dispatcher | “I can create drafts, assign, generate LR, and publish — I’ll ask you to confirm first.” |
| Admin | Full + settings hint |
| AI disabled | “AI is turned off for this org. Ask an admin in Settings → AI.” |
| No keys | “Add a Google or OpenRouter key in Settings → AI, or ask ZAFTYS to enable platform trial keys.” |

### 6.7 Accessibility & safety UX

- Confirm buttons are real `<button>`s; not “type yes” only  
- Streaming can be stopped (Cancel generation)  
- Don’t auto-focus send in a way that steals form focus on shipment pages — drawer focus trap when open  
- Clear “AI can make mistakes — confirm before publish” footer in drawer  

### 6.8 What AI UI is **not**

- Not a clone of `/network/chat` (marketplace threads)  
- Not floating emoji badges / neon purple agent avatar clusters  
- Not a separate “AI product” login  

---

## 7. Safety, privacy, ops

| Topic | Rule |
|-------|------|
| PII | Minimize in prompts; don’t dump full phone lists unless tool needs one id |
| Logs | Redact keys; store tool args needed for audit; retention policy TBD |
| Prompt injection | Tools ignore “ignore previous instructions” for authz; confirm still required |
| Multi-tenant | Session org only; reject foreign ids |
| Rate limit | Per user + per org |
| Kill switch | Platform flag disables all AI without deploy |

---

## 8. Implementation sketch (for eng)

```text
app-tsm/src/lib/ai/
  llm-client.ts          # interface
  adapters/google.ts
  adapters/openrouter.ts
  agent-runtime.ts
  tool-registry.ts
  confirm-tokens.ts
  usage.ts
  prompts/ops-copilot.ts

app-tsm/src/app/api/ai/
  chat/route.ts          # SSE/stream
  confirm/route.ts
  usage/route.ts

app-tsm/src/app/(portal)/settings/ai/page.tsx
app-tsm/src/components/app/ai-copilot-drawer.tsx
```

Feature flags: `ai.enabled`, `ai.agents`, `ai.formAssist`.

---

## 9. Success criteria

- [ ] Admin with BYOK Google **or** OpenRouter can chat and search org shipments  
- [ ] Viewer cannot publish / assign via agent  
- [ ] Publish / assign / LR require Action card confirm  
- [ ] Zero secrets in desktop binary / browser `localStorage`  
- [ ] Audit row exists for every executed tool  
- [ ] Same flows work in Tauri WebView against hosted TSM  

---

## Document history

| Date | Change |
|------|--------|
| 2 Aug 2026 | Initial locked spec (stack, loop, authz, features, UX) |
