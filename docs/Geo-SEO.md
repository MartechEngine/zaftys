# ZAFTYS Geo-SEO & Brand Entity

| Field | Value |
|-------|-------|
| **Scope** | GBP service-area alignment on `zaftys.com`, corridor IA, bare-brand entity ("ZAFTYS" vs NIFTY), legal-name timeline |
| **HQ (unchanged)** | Old Town, Badnera, Amravati, 444701, Maharashtra |
| **Primary URL set** | `/logistics/corridors` + 7 corridor leaves |
| **Related** | `docs/SEO-improvement-22-8-26.md`, `docs/marketing/SEO&Blog.md`, `src/lib/corridors-data.ts`, `src/lib/constants.ts` |

---

## Principles

- [x] One Amravati NAP / HQ address (no fake city branch pages)
- [x] Own fleet lanes labeled separately from TranZfort network cover
- [x] Corridor pages are real operational content (not thin city doorways)
- [x] Schema `areaServed` matches GBP cities + states
- [x] GBP business description kept as single source in `gbpBusinessDescription` / `brandEntity.gbpDescription`
- [x] **Header Logistics stays lean:** Transportation + Our Fleet only (corridors discoverable via footer + hub)
- [x] **Brand vs legal split:** public brand = **ZAFTYS**; Shop Act operating name = **ZAFTYS Logistics** until Pvt Ltd is registered
- [ ] **Do not claim Pvt Ltd** on site / schema / GBP until MCA certificate is live

---

## Entity & naming model (locked until incorporation)

| Role | Current string | Notes |
|------|----------------|-------|
| **Brand** | `ZAFTYS` | Titles, GBP primary name, `schema.org` `name`, `og:site_name`, marketing H1-adjacent |
| **Operating / Shop Act** | `ZAFTYS Logistics` | Footer "operated as", Privacy/Terms party, `legalName`, invoices/GST until change |
| **Future legal** | `ZAFTYS Pvt Ltd` (confirm exact MCA spelling) | Apply 10–15 days after registration; keep brand = ZAFTYS |

**Do not:**

- Set `legalName` to bare `ZAFTYS` only while Shop Act / GST still say ZAFTYS Logistics
- Publish "ZAFTYS Private Limited" before the certificate exists
- Stuff every corridor into the header dropdown

**Bare-brand / NIFTY problem:** Searching "ZAFTYS" may suggest NIFTY because the brand is young and rare. "ZAFTYS Logistics" disambiguates. On-site title/schema help a little; **GBP name ZAFTYS + citations + branded searches** matter more over weeks.

---

## Phase 0 — GBP (ops, already done)

- [x] Primary categories: Logistics service / Transportation service
- [x] Secondary: Freight forwarding agency, Trucking company
- [x] Service areas: Surat, Hazira, Chandrapur, Nagpur, Pune, Mumbai, Kolkata, Haldia, Raipur, Bengaluru, Chennai, Hyderabad, Wardha, Mangaluru, Amravati
- [x] States: Maharashtra, Gujarat, West Bengal, Chhattisgarh
- [x] Live GBP description published (3PL / FTL / owned fleet + TranZfort)
- [x] Custom GBP services (FTL pan-India, Surat-Hazira corridors, Kolkata/Haldia, Pune round-trip, South, Contract/Dedicated, JNPT, Mundra)
- [x] Branded cover + fleet/ops photos + route update post with Call CTA
- [ ] Confirm GBP **primary business name** displays as **ZAFTYS** (not only ZAFTYS Logistics)
- [ ] Keep GBP NAP 1:1 with `brandEntity.napLine` / `COMPANY_PHONE_DISPLAY`

---

## Phase 1 — Repository audit

- [x] Confirm stack: Vite + React Router SPA (not Next.js)
- [x] Confirm SEO via `react-helmet-async` (`src/components/SEO.tsx`)
- [x] Confirm JSON-LD helpers in `src/lib/schema.ts`
- [x] Confirm nav/footer from `src/lib/nav-config.ts`
- [x] Confirm logistics leaf pattern (`LogisticsServiceLeaf` / hub)
- [x] Confirm `index.html` shell meta can disagree with React Helmet (must align for crawlers)

---

## Phase 2 — Route & corridor pages

- [x] Add path helpers: `paths.logistics.corridors`, `corridorPath(slug)`
- [x] Create data source: `src/lib/corridors-data.ts` (cities, states, 7 corridors, hub copy)
- [x] Hub page: `/logistics/corridors` → `CorridorsHub.tsx`
- [x] Leaf: Surat & Hazira → Nagpur & Chandrapur
- [x] Leaf: Pune → Nagpur & Chandrapur round-trip
- [x] Leaf: Mumbai → Kolkata & Raipur long-haul
- [x] Leaf: Haldia → Surat & Mumbai
- [x] Leaf: JNPT / Nhava Sheva container haulage
- [x] Leaf: Mundra Port EXIM / dedicated trailer
- [x] Leaf: South India (Hyderabad, Bengaluru, Chennai)
- [x] Each leaf: transit bands, dispatch, cargo, fleet, tracking, quote CTA
- [x] Wire routes in `src/App.tsx`

---

## Phase 3 — JSON-LD

- [x] Expand Organization `areaServed` (India + GBP states + cities)
- [x] Expand LocalBusiness `areaServed` + `knowsAbout` (GBP categories/services)
- [x] Expand LogisticsService / trucking Service `areaServed`
- [x] Align descriptions with live GBP copy
- [x] Corridor leaf `Service` + `DeliveryService` schema (`corridorServiceSchema`)
- [x] Corridors hub `CollectionPage` schema
- [x] Organization `name: "ZAFTYS"`, `legalName: "ZAFTYS Logistics"`, `alternateName` includes trade/product names
- [ ] After Pvt Ltd: flip `legalName` (+ Privacy/Terms/footer operated-as) to exact registered name; keep `ZAFTYS Logistics` in `alternateName` if still used

---

## Phase 4 — Navigation, sitemap, page discovery

### 4.A First ship (superseded)

- [x] ~~Logistics header dropdown: Routes & Corridors + all lane links~~ → replaced by Option B

### 4.B Nav Option B (current lock)

- [x] **Header Logistics:** Transportation + Our Fleet **only**
- [x] **No** corridor lane list in header
- [x] **No** "Routes & Corridors" row in header (footer + body links only)
- [x] Footer column: Routes & Corridors (hub + Surat-Nagpur, Pune round-trip, JNPT, Mundra)
- [x] Unique meta for hub (`pageSeo.corridors`) and each leaf
- [x] Canonical + Open Graph via existing `SEO` component
- [x] Add URLs to `scripts/generate-sitemap.mjs` and regenerate `public/sitemap.xml`
- [x] Contact page corridors band + enriched hero/meta
- [x] About desk point + CTA to corridors
- [x] Logistics hub link to Routes & Corridors

---

## Phase 5 — Bare-brand meta (ZAFTYS vs NIFTY)

Problem: Google may treat bare "ZAFTYS" as a typo for NIFTY; "ZAFTYS Logistics" ranks/disambiguates.

On-site checklist:

- [x] Homepage `<title>` leads with brand: `ZAFTYS | 3PL & Contract Logistics India`
- [x] Homepage meta description opens with "ZAFTYS is…"
- [x] Homepage `<h1>` includes brand: `ZAFTYS.` as first hero line
- [x] `SEO.tsx` `brandedTitle` accepts brand-leading / brand-in-title pipes (no double suffix)
- [x] `index.html` shell title / description / `og:site_name` / OG / Twitter aligned to **ZAFTYS**
- [x] Footer: `© YEAR ZAFTYS. Operated as ZAFTYS Logistics. …`
- [x] Organization `sameAs`: LinkedIn, YouTube `@ZAFTYS`, X `@zaftyslogistics`, TranZfort (live only)
- [x] Organization `alternateName`: `["ZAFTYS Logistics", "Zaftys"]`
- [x] `/about` entity band: brand, Shop Act name, Badnera HQ, corridor scope
- [x] About meta: `About ZAFTYS | Contract Logistics & Fleet Operations`
- [x] Ops: YouTube live as **ZAFTYS Logistics** / `@ZAFTYS` → `https://www.youtube.com/@ZAFTYS`
- [ ] Ops: create Crunchbase org, then add `externalLinks.crunchbase` into `organizationSameAs`
- [ ] Ops: use `brandDemandCopy` in email / WhatsApp / LinkedIn (bare brand + link)
- [ ] Ops: directories and citations use brand **ZAFTYS** + same NAP
- [ ] After deploy: Search Console → Performance for query `zaftys`; Rich Results on home + `/about`

**Out of scope for meta alone:** Instant removal of "Did you mean: NIFTY". Expect gradual improvement with branded demand + GBP.

---

## Phase 6 — Legal rename (defer ~10–15 days)

When MCA / GST show **ZAFTYS Pvt Ltd** (exact string TBD):

- [ ] Update `legalEntity.name` / comments in `constants.ts` (remove "not a Pvt Ltd" when true)
- [ ] Update schema `legalName`
- [ ] Update Privacy, Terms, Legal Notice party strings
- [ ] Update footer "Operated as …" / © line
- [ ] Update About incorporation timeline copy if needed
- [ ] Align GBP registered-business fields if Google asks for legal name
- [ ] Keep marketing brand = **ZAFTYS**

Until then: Shop Act **ZAFTYS Logistics** remains the honest operating/legal string.

---

## Phase 7 — Verification

- [x] Expand this checklist (`docs/Geo-SEO.md`)
- [x] Run `npx tsc --noEmit` after nav/brand pass
- [x] Predeploy script: `node scripts/predeploy-check.mjs` (nav B, schema, sitemap, encoding)
- [x] Full `npm run build` including Playwright prerender of 72 routes (corridors included)
- [x] Sync `scripts/prerender.mjs` HOME_TITLE with brand-first homepage title
- [x] Spot-check header: Logistics = Transportation + Our Fleet only
- [x] Spot-check footer: Routes & Corridors column present
- [ ] Validate JSON-LD in [Google Rich Results Test](https://search.google.com/test/rich-results) for `/` and `/logistics/corridors` (post-deploy)
- [ ] Submit updated sitemap in Google Search Console (post-deploy)
- [ ] Manual Google search: `ZAFTYS` and `ZAFTYS Logistics` (note NIFTY suggestion over time)

---

## URL map

| URL | Role |
|-----|------|
| `/logistics/corridors` | Geo hub + service-area index |
| `/logistics/corridors/surat-hazira-nagpur-chandrapur` | Gujarat → Vidarbha |
| `/logistics/corridors/pune-nagpur-chandrapur` | Pune round-trip |
| `/logistics/corridors/mumbai-kolkata-raipur` | East-West long-haul |
| `/logistics/corridors/haldia-surat-mumbai` | Haldia westbound |
| `/logistics/corridors/jnpt-nhava-sheva-container` | JNPT / Nhava Sheva |
| `/logistics/corridors/mundra-port-exim` | Mundra EXIM |
| `/logistics/corridors/south-india-hyderabad-bengaluru-chennai` | South corridors |

---

## Files touched

| Path | Change |
|------|--------|
| `docs/Geo-SEO.md` | Full geo + brand + legal timeline checklist |
| `src/lib/corridors-data.ts` | Corridor + GBP geo source of truth |
| `src/pages/logistics/CorridorsHub.tsx` | Hub page |
| `src/pages/logistics/CorridorLeaf.tsx` | Dynamic leaf page |
| `src/lib/site-paths.ts` | `corridors` path + `corridorPath` |
| `src/lib/schema.ts` | `areaServed`, corridor schemas, brand/legal fields |
| `src/lib/page-seo.ts` | Hub + contact + brand-first home meta |
| `src/lib/constants.ts` | GBP categories + description; Shop Act legal entity |
| `src/lib/nav-config.ts` | Header Option B; footer corridor links |
| `src/components/SEO.tsx` | Brand-leading title helper |
| `src/components/Footer.tsx` | Brand-first © + operated-as |
| `index.html` | Shell meta aligned to ZAFTYS |
| `src/lib/page-hero-copy.ts` | Contact lead geo |
| `src/lib/about-page-copy.ts` | Desk corridors point |
| `src/App.tsx` | Corridor routes |
| `src/pages/Contact.tsx` | Corridors band |
| `src/pages/About.tsx` | Desk grid + corridors CTA |
| `src/pages/logistics/LogisticsHub.tsx` | Link to corridors |
| `scripts/generate-sitemap.mjs` | Corridor URLs |
| `public/sitemap.xml` | Regenerated |

---

## Do not

- [x] Avoid thin `/mumbai-logistics` doorway pages
- [x] Avoid fake Mumbai/Pune office NAP in schema address
- [x] Avoid blending Own + Network fleet counts
- [x] Avoid corridor spam in header Logistics dropdown
- [x] Avoid publishing Pvt Ltd before registration
