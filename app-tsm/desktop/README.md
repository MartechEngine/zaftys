# TSM Desktop (S5 / Horizon 3) — thin Tauri shell

**Status:** URL wiring + secret scan (2 Aug 2026). Staging host still pending.  
**Rule:** This binary loads a **hosted** TSM HTTPS URL. It must **never** embed `TRANZFORT_SERVICE_KEY`, Postgres URLs, Fleetbase, or run Next.js locally for production customers.

**Locked with:** [ADR-008](../../../docs/app/decisions/008-tsm-owns-execution.md), [ADR-007](../../../docs/app/decisions/007-local-docker-and-app-db.md), TODO S5 / DL-11.

## Architecture

```text
Tauri WebView  →  https://tsm.example.com  →  Next.js BFF + TSM Postgres  →  TranZfort
     ↑
  no secrets · no Docker on the laptop · no Fleetbase
```

Google Admin + Team seat auth run on the hosted origin (same as browser). Append that origin’s `/api/auth/tranzfort/callback` to Supabase Google redirect allowlist — **do not rotate** the Google Web client.

## Prerequisites

1. Hosted TSM staging/prod with `TSM_PUBLIC_URL` set (same origin the shell opens)  
2. [Rust](https://rustup.rs/) + [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/) (Windows: WebView2)  
3. Copy `.env.example` → `.env` and set `TSM_DESKTOP_URL`

## Commands (from this folder)

```bash
npm install
npm run apply:url          # patch tauri.conf + splash from TSM_DESKTOP_URL
npm run check:secrets      # refuse service_role / DB / Fleetbase keys in tree
npm run desktop:dev        # WebView → TSM_DESKTOP_URL (default localhost:3000)
npm run desktop:build      # NSIS installer (unsigned until signing configured)
```

From `app-tsm/` root:

```bash
npm run desktop:dev
npm run desktop:build
```

## Staging checklist (S5)

1. Deploy Next.js + Postgres; set `TSM_PUBLIC_URL=https://…`  
2. Append `https://…/api/auth/tranzfort/callback` on Supabase Google redirects (**append only**)  
3. Set `TSM_DESKTOP_URL` to that HTTPS origin; `npm run desktop:dev`  
4. Smoke: Google Admin login inside WebView2 → portal  
5. Confirm `npm run check:secrets` stays green before shipping an MSI  

## Security checklist

- [x] `apply-desktop-url` + `check-no-secrets` gate before build  
- [ ] `TSM_DESKTOP_URL` is `https://…` in customer builds  
- [ ] Windows Authenticode signing before external pilot MSI  
- [ ] Auto-update endpoint uses HTTPS + signed artifacts  

## Next

1. Real staging host + Google allowlist append  
2. WebView Google login smoke  
3. Updater + signing + CI Windows artifacts  
