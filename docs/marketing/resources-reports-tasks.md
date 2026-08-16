# Resources & Market Reports  -  Task Tracker

| Field | Value |
|-------|-------|
| **Status** | Shipped (Hostinger); catalog lives at `/reports` |
| **Last updated** | 16 Aug 2026 |
| **Segment** | Logistics & Supply Chain |
| **SEO rule** | Keep `/blog` URLs (already in GSC). Do **not** move Blog to `/resources/blogs`. |

---

## Decisions locked

1. **Nav:** Resources dropdown → Blog (`/blog`) | Market Reports (`/reports`) | All resources (`/resources`). No Overview item.
2. **Hub:** `/resources` is a real page (Blog + Reports lanes).
3. **Reports catalog:** `/reports` (not `/resources/reports`).
4. **Report detail:** `/reports/:slug` sneak peek + PDF CTAs.
5. **PDF reader:** `/reports/:slug/read` is `noindex, follow`.
6. **Blog:** stays at `/blog` and `/blog/:slug`.
7. **Legacy:** `/resources/reports` and `/resources/reports/:slug` 301 to `/reports` equivalents. `/resources/:slug` (non-reserved) still redirects to `/blog/:slug`.
8. **Voice:** ZAFTYS ops intelligence; cite public sources; never copy paid research proprietary figures.

---

## URL map

| URL | Role |
|-----|------|
| `/resources` | Hub: Blog + Reports |
| `/blog`, `/blog/:slug` | Blog (GSC-safe) |
| `/reports` | Catalog |
| `/reports/:slug` | Sneak peek + download |
| `/reports/:slug/read` | In-page PDF reader (noindex) |
| `/resources/reports*` | 301 → `/reports*` |

---

## Live reports (slugs)

1. `global-logistics-market-2027-2036` (flagship)
2. `digital-freight-matching-market-2027-2036`

Industrial sneak-peek PDFs from the Aug 10 draft catalog are **not** in the live data file. Re-add only with designed PDFs.

---

## Remaining

- [x] GSC: `/reports` and flagship slug submitted; DFM already indexed. Do not unindex `/blog`. Re-submit `sitemap.php` after next deploy.
- [x] SPA prerender/SSG for marketing routes (Playwright snapshots at build)
- [ ] Optional: more designed reports
