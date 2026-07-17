# ADR-004: Driver App Strategy

| Status | **Proposed** |
| Date | Jul 2026 |

---

## Context

Drivers need route info, status updates, and ePOD capture. Options: Fleetbase Navigator app, TranZfort Flutter app, or both for different driver types.

---

## Options

| Option | Own fleet drivers | Network partners |
|--------|-------------------|------------------|
| A. Navigator only | ✅ | ❌ partners on TranZfort |
| B. TranZfort only | ⚠️ limited Fleetbase sync | ✅ |
| C. Both | Navigator | TranZfort Flutter |

---

## Decision (proposed)

**Option C** — Dual path:

- **ZAFTYS own fleet** → Fleetbase Navigator (or white-label later)
- **TranZfort partners** → existing TranZfort Flutter app; GPS syncs to TSM via bridge

Portal UI does not replace driver app in MVP.

---

## Action

Validate Navigator APK availability + ePOD API during P0 Fleetbase spike.

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Proposed |
