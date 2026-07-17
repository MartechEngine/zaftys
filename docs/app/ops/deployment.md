# Deployment

| Phase | P1 — after MVP scaffold |
|-------|-------------------------|

---

## Production topology (initial)

| Component | Host |
|-----------|------|
| Next.js portal + BFF | VPS (India) |
| Fleetbase Docker | Same VPS or dedicated |
| Sync worker | Cron on VPS or GitHub Action |
| Static assets | CDN via host |
| TLS | Let's Encrypt / host SSL |

---

## CI/CD (proposed)

```yaml
# GitHub Actions — on push to main
- npm ci
- npm run build
- npm run test
- deploy to VPS (FTP/SSH — match marketing pattern)
```

Marketing site uses FTP to Hostinger — evaluate same vs Docker VPS for app.

---

## Domains

| Domain | Points to |
|--------|-----------|
| `app.zaftys.com` | Portal |
| Fleetbase API | Internal only — not public DNS |

---

## Pre-deploy checklist

- [ ] Env vars set on host
- [ ] Fleetbase healthy
- [ ] TLS valid
- [ ] Smoke test login + shipments list
- [ ] Track token page loads

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial deployment notes |
