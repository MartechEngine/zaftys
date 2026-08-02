# TSM Desktop (Horizon 3) — thin Tauri shell

**Status:** Scaffold only (2 Aug 2026).  
**Rule:** This binary loads a **hosted** TSM HTTPS URL. It must **never** embed `TRANZFORT_SERVICE_KEY`, Postgres URLs, Fleetbase, or run Next.js locally for production customers.

**Locked with:** [ADR-008](../../../docs/app/decisions/008-tsm-owns-execution.md) (TSM-owned execution; drop FB), [ADR-007](../../../docs/app/decisions/007-local-docker-and-app-db.md) (Docker = ops only), TODO DL-11.

## Architecture

```text
Tauri WebView  →  https://tsm.example.com  →  Next.js BFF + TSM Postgres  →  TranZfort
     ↑
  no secrets · no Docker on the laptop · no Fleetbase
```

Google Admin + Team seat auth run on the hosted origin (same as browser). Append that origin’s `/api/auth/tranzfort/callback` to Supabase Google redirect allowlist — **do not rotate** the Google Web client.

End customers **do not install Docker**. Docker is for ZAFTYS developers/ops (or rare on-prem servers).

## Prerequisites (when building the installer)

1. Hosted TSM staging/prod with `TSM_PUBLIC_URL` set  
2. [Rust](https://rustup.rs/) + [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/) (Windows: WebView2)  
3. Set `TSM_DESKTOP_URL` (see `.env.example`)

## Commands (from this folder)

```bash
# Install JS deps for the Tauri CLI wrapper
npm install

# Dev: open shell against local or staging URL
npm run desktop:dev

# Release build (unsigned until code signing is configured)
npm run desktop:build
```

From `app-tsm/` root you can also use:

```bash
npm run desktop:dev
npm run desktop:build
```

## Security checklist

- [ ] `TSM_DESKTOP_URL` is `https://…` in customer builds (not `http://localhost` except local smoke)
- [ ] No `.env` with TranZfort keys copied into `src-tauri`
- [ ] Windows Authenticode signing before external pilot MSI
- [ ] Auto-update endpoint uses HTTPS + signed artifacts

## Next implementation steps

1. Point `TSM_DESKTOP_URL` at staging and smoke Google login in the WebView  
2. Add updater + signing  
3. CI job for Windows artifacts  
