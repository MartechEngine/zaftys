# ADR-005: Auth Provider

| Status | **Proposed** |
| Date | Jul 2026 |

---

## Context

Portal needs session auth for ops, fleet, and client roles. Public track page uses signed tokens. TranZfort has its own Supabase auth — TSM auth is separate for MVP.

---

## Options

| Option | Pros | Cons |
|--------|------|------|
| **NextAuth.js** | Next.js native, flexible | Self-managed users |
| **Clerk** | Fast setup, UI components | Cost, vendor lock |
| **Supabase Auth** | Same family as TranZfort | Couples TSM to Supabase |
| **Custom JWT** | Full control | More security burden |

---

## Decision (proposed)

**NextAuth.js** with credentials provider for MVP.

- User table in portal DB or Fleetbase-adjacent store
- Session cookie for BFF
- Migrate to SSO (Google Workspace) in P2 if needed

---

## Public tracking

Separate HMAC token — not part of NextAuth session.

---

## Action

Finalize when portal repo is scaffolded.

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Proposed |
