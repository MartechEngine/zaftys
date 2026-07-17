# Public Tracking Page

| Route | `/track/[token]` |
|-------|------------------|
| **Auth** | None — signed token |
| **Parent** | [ui-ux-features.md](../ui-ux-features.md) |

---

## Purpose

Branded, mobile-first shipment visibility for enterprise shippers without portal login.

---

## Layout sections

1. Header — ZAFTYS logo + "Track your shipment"
2. Hero status — large chip + plain-language sentence + ETA
3. Map — single route + one truck marker
4. Timeline — customer-safe events only
5. Documents — ePOD download when delivered
6. Footer — TSM branding, support email, zaftys.com link

---

## Security

| Rule | Detail |
|------|--------|
| Token | HMAC-signed, shipment-scoped |
| Expiry | 90 days after delivery |
| Rate limit | 60 req/min per IP |
| PII | City-level location only on map label; no driver phone |
| Fleet isolation | No other vehicles on map |

---

## Customer-safe timeline events

| Show | Hide |
|------|------|
| Booked, Dispatched, Loaded, In transit, Delivered | Internal notes, partner payout, assign failures |
| ETA updates | Driver personal phone |
| ePOD available | Internal exception codes |

---

## Branding

- Same tokens as portal — navy header optional, white body
- Orange primary for ePOD download CTA
- No sidebar, no login prompt (optional "Sign in for full portal" link P2)

---

## Document history

| Date | Change |
|------|--------|
| Jul 2026 | Initial public tracking spec |
