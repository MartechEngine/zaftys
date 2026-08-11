# Resources & Market Reports  -  Task Tracker

| Field | Value |
|-------|-------|
| **Status** | In progress |
| **Last updated** | 10 Aug 2026 |
| **Segment** | Logistics & Supply Chain only |
| **SEO rule** | Keep `/blog` URLs (already in GSC). Do **not** move Blog to `/resources/blogs`. |

---

## Decisions locked

1. **Nav:** top-level **Resources** dropdown → Blog (`/blog`) | Reports (`/resources/reports`) only (no Overview item)
2. **Hub:** `/resources` is a real page (no longer redirect-only to Blog)
3. **Reports catalog:** `/resources/reports`  -  tile grid + CTA to open each report
4. **Report detail:** `/resources/reports/:slug`  -  sneak peek (stats, ToC, coverage, methodology, takeaways)
5. **PDF:** Download + Read online (`public/reports/*.pdf`)
6. **Blog:** stays at `/blog` and `/blog/:slug` (GSC-safe)
7. **Legacy:** `/resources/:slug` (non-reserved) continues to redirect to `/blog/:slug`
8. **Scope:** logistics / supply chain / transportation / industrial freight only
9. **Launch:** 10 reports this month
10. **Voice:** ZAFTYS ops intelligence; cite public sources; never copy paid research proprietary figures

---

## URL map

| URL | Role |
|-----|------|
| `/resources` | Hub: Blog + Reports lanes |
| `/blog`, `/blog/:slug` | Existing blog (unchanged) |
| `/resources/reports` | All report tiles |
| `/resources/reports/:slug` | Sneak-peek + PDF CTAs |
| `/resources/reports/:slug/read` | In-page PDF reader |
| `/resources/:slug` | Legacy → `/blog/:slug` (except `reports`) |

---

## Build checklist

### A. Information architecture & chrome
- [x] `docs/marketing/resources-reports-tasks.md` (this file)
- [x] Restore `/resources` page (replace Navigate-to-blog)
- [x] Nav Resources dropdown (desktop + mobile)
- [x] Footer: Resources / Blog / Reports links
- [x] App routes for resources + reports + PDF reader

### B. Data & PDFs
- [x] `src/lib/market-reports-data.ts` (10 reports, sneak-peek fields, `pdfPath`)
- [x] `public/reports/*.pdf` (placeholders  -  replace with designed PDFs)

### C. UI
- [x] Reports listing page (tiles + View report CTA)
- [x] Report detail sneak-peek layout
- [x] PDF download + read-online viewer
- [x] Resources hub layout

### D. SEO
- [x] `page-seo` entries for resources + reports
- [x] Schema (CollectionPage / Report + breadcrumbs)
- [x] Sitemap: `/resources`, `/resources/reports`, 10 detail URLs
- [ ] After deploy: GSC submit new URLs when quota allows (do not unindex `/blog`)

---

## 10 reports (slugs)

0. `global-logistics-market-2027-2036` (flagship PDF  -  MnM-style product page)
1. `india-industrial-road-freight-2026`
2. `cement-logistics-india-corridors`
3. `steel-coil-transport-market-india`
4. `coal-mining-tipper-logistics-india`
5. `ftl-vs-ltl-industrial-india`
6. `empty-miles-and-backhaul-india`
7. `maharashtra-industrial-freight-corridors`
8. `tms-adoption-heavy-haul-india`
9. `warehouse-to-plant-supply-chain-india`
10. `organized-fleet-vs-brokered-capacity`

---

## Out of scope (v1)

- Moving Blog to `/resources/blogs`
- Multi-industry report marketplace
- Email/paywall before PDF
- CMS / admin UI
- Interactive chart library

---

## GSC note

`/blog` is already indexed. New pages (`/resources`, `/resources/reports`, report slugs) are **additive**. No need to unindex Blog.
