# SEO & Blog  -  ZAFTYS Marketing Site

| Field | Value |
|-------|-------|
| **Project** | `zaftys-main`  -  marketing site (`zaftys.com`) |
| **Purpose** | Master tracker for SEO improvements, keyword strategy, and Knowledge Center / blog content |
| **Status** | Reports at `/reports`; Blog at `/blog`. Next: 5 more posts (content pending). Deploy deferred. |
| **Last updated** | 16 August 2026 |
| **Related** | `copy-v2-l.md` (approved meta), `marketing-website-sitemap-new.md` (IA), `copy-v2-i.md` (Knowledge Center copy), `project-idea.md` |

---

## How to use this file

1. **Section 1**  -  all SEO improvements (checklist). Work top-down by priority.
2. **Section 2**  -  keyword strategy (easy / high-value / defer).
3. **Section 3**  -  page ownership map (one primary intent per URL).
4. **Section 4**  -  Blog / Knowledge Center plan (articles, SEO role).
5. **Section 5**  -  product-ready messaging notes (TMS live, TranZfort live).
6. **Section 6**  -  decision log & measurement.

Mark items `[x]` when shipped. Add notes under each item if scope changes.

**Product context (Aug 2026):** ZAFTYS TMS is live at `app.zaftys.com`. TranZfort app is live at `tranzfort.com`. Marketing must stop sounding pre-launch. Blog launch set (5 posts) is live at `/blog`; expand the article backlog next.

---

# 1. SEO improvements checklist

## 1.1 Priority legend

| Priority | Meaning |
|----------|---------|
| **P0** | Blocking crawl, indexation, or social previews  -  fix first |
| **P1** | Strong ranking / CTR / conversion impact |
| **P2** | Depth, polish, long-tail, rich results |
| **P3** | Nice-to-have / later waves |

---

## 1.2 P0  -  Crawl, indexation & technical foundations

### Sitemap

- [x] **Fix live `https://zaftys.com/sitemap.xml` returning HTTP 500** (live HEAD is 200; `sitemap.php` remains the Hostinger-safe GSC URL).

- [x] **Regenerate / expand `public/sitemap.xml`**  -  core + product slugs + industries + `/blog` + posts + `/resources` hub + `/reports` + report detail URLs + legal; excludes `/login` and PDF reader `/read` pages. `/resources/reports` 301s to `/reports`.

- [x] **Refresh `<lastmod>`** from page data (`updatedAt` for reports and blog posts).
- [x] **Submit sitemap in Google Search Console** and request indexing for `/reports` + flagship report (DFM already indexed). Re-submit `sitemap.php` once after next deploy.
- [x] **Generate sitemap at build time** (`scripts/generate-sitemap.mjs` in `npm run build`).

### Rendering (SPA)

- [x] **Address client-side rendering gap** (build-time Playwright snapshots of sitemap routes into `dist/<path>/index.html`; Apache serves them without a trailing slash). Still optional later: full SSG/SSR framework migration.

### Hosting / deep links

- [x] **Document and verify SPA fallback** (all non-file routes → `index.html`).  
  - Added `public/_redirects` (Netlify/CF Pages) and `vercel.json` rewrites.  
  - Still confirm production host picks up the config on deploy.

### Open Graph / social preview

- [x] **Replace default OG image**  -  shipped `public/og-image.png` (1200×630); `SEO.tsx` default updated. Keep `og-image.svg` as fallback asset only.
- [x] **Sync `index.html` shell meta** with shortened home title/description + absolute `https://zaftys.com/og-image.png`.
- [x] **Add missing OG fields in `SEO.tsx`:** `og:site_name`, `og:locale` (`en_IN`), image width/height.

### Analytics / Search Console

- [x] **Remove GTM placeholder** `GTM-XXXXXX` from `index.html` (no invalid container loads). Re-add when real ID is ready.
- [ ] **Wire GA4** (via GTM or direct) and track WhatsApp CTA clicks as conversions.
- [ ] **Verify Google Search Console** property for `zaftys.com`; monitor coverage, sitemap, and Core Web Vitals.

---

## 1.3 P1  -  On-page SEO, index hygiene & CTR

### Meta titles & descriptions

- [x] **Shorten titles** in `src/lib/page-seo.ts` and industry `seoTitle` fields (~≤55 chars before brand suffix).
- [x] **Tighten meta descriptions** to ~≤155 chars where they were overlong.
- [x] **Audit industry routes** for unique title + description (per-vertical strings updated).

### Indexation hygiene

- [x] **`noindex` on `/login`**
- [x] **`noindex` on 404**  -  no `/404` canonical
- [x] **Fix NotFound canonical**  -  omitted when `noindex`
- [x] **Resources hub live at `/resources`**  -  Blog + Reports hub (not a redirect to `/blog`; `/blog` URLs kept for GSC). Reports catalog is `/reports`.

### Industry detail pages (highest organic inventory)

- [x] **Keyword-aligned H1s** via `seoH1` + pain line in hero description
- [x] **Expand content depth**  -  FAQ blocks on all 8 industry pages (+ Technology FAQs)
- [x] **Tabbed content crawlable**  -  `forceMount` + `data-[state=inactive]:hidden` on industry tabs
- [x] **`BreadcrumbList` JSON-LD** on industry detail (`breadcrumbSchema`)
- [x] **BreadcrumbList on industries hub** (+ Network page)
- [x] **Cross-link related industries** + Services / Network / TMS

### Product pages (TMS + TranZfort live)

- [x] **`/technology`  -  product-ready SEO pass**  -  Login primary, live-today checklist, portal CTA, FAQ schema; mock replaced with live portal card
- [x] **`/network`  -  product-ready SEO pass**  -  Download TranZfort primary; demos framed as preview; capacity WhatsApp + partner secondary

### Naming consistency (brand SEO)

- [x] **Standardize public product name to `ZAFTYS TMS`** across marketing pages, footer, forms, heroes, schema

### Brand / site voice consistency

- [x] **Align zaftys.com Network positioning**  -  verified capacity + live app download; softened AI-first highlight (“Route intelligence”); demo disclaimer says app is live.  
  - [ ] **tranzfort.com** claim alignment still open (separate site  -  document shared claim rules with that repo)
---

## 1.4 P2  -  Structured data, local SEO, content systems

### Schema.org

- [x] Keep / validate existing: `Organization`, `LogisticsService`, `SoftwareApplication`, `CollectionPage` (`src/lib/schema.ts`).
- [x] **Add `LocalBusiness`** (Amravati address + phone)  -  on Home
- [x] **Add `WebSite`** schema  -  on Home + Technology
- [x] **Add `sameAs`** on Organization (LinkedIn + product sites).
- [x] **Add `BreadcrumbList`** on industry detail, industries hub, network, blog posts
- [x] **Add `FAQPage`** on industry detail + Technology + blog posts
- [x] **Review `SoftwareApplication` offers**  -  removed misleading `price: "0"`; contact/demo description retained.
- [x] **Reduce duplicate Organization nesting**  -  schemas reference `@id` organization node; Home emits org once + website + local business + logistics service.
### Internal linking

- [x] Footer already links hubs  -  contextual links: Home → industries/services/partner/contact; Services → technology/network/blog; industry pages → partner/contact (+ vertical blog where relevant).
- [x] Every Knowledge article links to commercial pages + related articles (launch set).

### Images & accessibility

- [x] Meaningful `alt` text on page heroes (`page-heroes.ts`) and Home industry/TMS imagery  -  continue spot-checks when adding assets.
- [x] **Compress TMS screenshots** to WebP (`public/images/tms/*.webp`). Hero/industry JPG pass still optional.
- [ ] Optional: image sitemap for key visuals later.

### Performance / CWV (affects rankings)

- [x] **Home LCP** uses capped hero WebP preload; Network/Services use screenshot carousels (interactives removed).
- [x] **Lazy-load** TMS/TranZfort carousels near viewport.
- [ ] Review unused JS on marketing routes after next deploy (Playwright prerender is local-only).

---

## 1.5 P3  -  Expansion & advanced SEO

- [ ] Corridor / city landing pages (e.g. cement Vidarbha, steel Maharashtra belt, mining pit-to-plant).
- [ ] Asset-specific pages only if capability is real (tipper programs, low-bed / ODC  -  do not invent).
- [ ] XML news/blog sitemap when article volume grows.
- [ ] hreflang only if multi-language sites launch (Hindi microsite  -  not current scope).
- [ ] Comparison / alternative pages only with legal-safe factual framing (never unverified “better than X”).

---

## 1.6 Quick-win batch (same week)

1. [x] Expand sitemap (+ `/network` + industries + legal)  -  **deploy to clear live 500**
2. [x] `noindex` login + 404; fix 404 canonical
3. [x] Ship PNG OG image; sync `index.html` meta
4. [x] Shorten longest titles/descriptions
5. [x] Standardize **ZAFTYS TMS** naming on key public pages
6. [x] Industry H1 keyword pass (8 pages)

---

# 1.7 Wave 3  -  Full on-page copy audit (6 Aug 2026)

Re-read of **all live marketing routes** for SEO strength: H1 ↔ meta alignment, primary keywords in body, product-ready voice, banned hype, thin/empty content, and geo modifiers.

### Strengths (keep)

| Area | Strength |
|------|----------|
| Meta titles/descriptions | Lengths now SERP-safe (~50-57 full title chars); unique per page |
| Industry detail pages | Keyword `seoH1`, FAQs, breadcrumbs, related links |
| `/technology` | Live product framing, Login primary, FAQ schema |
| `/network` | Download primary, verified-capacity positioning (not marketplace hype) |
| Naming | Public copy uses **ZAFTYS TMS** (no remaining `TSM` in `src/`) |
| Hierarchy | Transport-first → TMS → TranZfort still clear |
| CTAs | WhatsApp-first freight conversion intact |

### Gaps found (text / on-page)

| Priority | Page | Gap | Why it hurts SEO | Fix |
|----------|------|-----|------------------|-----|
| P0 | `/` Home | H1 is brand-poetic; weak “India / heavy freight” | Title says industrial/heavy freight; H1 doesn’t reinforce | Align H1 + subhead with India industrial freight |
| P0 | `/fleet` | H1 “Built To Deliver / Ready To Scale” | Zero fleet/heavy-haul keywords in H1 | Keyword H1: company fleet / heavy-haul |
| P0 | `/about` | Vision uses **world-class** (banned in copy-v2-a) | Credibility + brand rule break | Rewrite vision without hype |
| P0 | `/about` | H1 is future-of-supply-chains poetry | Weak entity/About ranking signal | H1 ≈ industrial logistics heritage |
| P1 | `/industries` | H1 “Built For Industrial Supply Chains” | Misses cement/steel/mining cues present in title | Add vertical keywords to H1 |
| P1 | `/services` | TMS band still “built for… available for…” | Sounds pre-product | Live product language + India FTL cues in hero |
| P1 | `/contact` | H1 soft consulting; meta slightly short | Weak “freight quote India / Amravati” | Quote-first H1; enrich meta |
| P1 | `/partner` | H1 OK but light on “industrial loads India” | Partner SEO cluster underserved in H1 | Tighten H1/description |
| P1 | Home hero `alt` | “ZAFTYS Logistics Trucks” | Missed image search / a11y keywords | Descriptive industrial freight alt |
| P2 | `/careers` | H1 fine; no Amravati/HQ in hero | Local employer queries | Mention Amravati HQ lightly |
| P2 | `/blog` | ✅ 5 published posts (indexable) | Long-tail in progress | Maintain + expand backlog |
| P2 | Body geo | Maharashtra / Amravati sparse outside Contact + cement corridors | Easy local keywords unused on hubs | Add natural geo on Home/Services/Fleet/About |
| P2 | `/network` H1 | Strong brand line; light on “verified capacity” in H1 itself | Badge carries keyword, H1 doesn’t | Optional: lead with verified capacity |
| P3 | Variable names | `tsmFeatures`, `tsmCapabilities` in code | Not user-facing | Rename when touching files |

### Scorecard (qualitative)

| Dimension | Score | Notes |
|-----------|------:|-------|
| Technical meta hygiene | 8/10 | Titles/canonicals/noindex largely done; prerender still open |
| H1 ↔ intent alignment | 5/10 | Industries detail strong; Home/Fleet/About weak |
| Product-ready voice | 7/10 | Tech/Network good; Services/Home TMS still soft in places |
| Vertical keyword coverage | 7/10 | Detail pages good; hub/home underplay verticals |
| Local / corridor modifiers | 4/10 | Amravati/MH barely on commercial hubs |
| Content depth / blog | 7/10 | 5 launch posts live on `/blog`; expand backlog |
| Brand consistency | 8/10 | TMS naming fixed; tranzfort.com still separate risk |

### Wave 3 fix checklist

- [x] Home H1 + subhead + hero image alt (+ light India / Amravati geo)
- [x] Fleet H1 + hero description keywords
- [x] About H1 + remove world-class vision
- [x] Industries hub H1
- [x] Services hero + TMS band live language
- [x] Contact H1 + meta enrich
- [x] Partner H1/description tighten
- [x] Careers hero Amravati mention
- [x] Soft “available for” lines on Home constants / Services
- [x] Hero image alts enriched across `page-heroes.ts`
- [x] Publish first Knowledge Center / Blog articles (5 launch posts on `/blog`)
- [ ] Corridor landing pages for MH / Vidarbha (P3)
---

# 2. Keyword strategy

> Difficulty is **qualitative** from competitive SERP structure (Aug 2026), not a paid volume tool export. Validate volumes in GSC / Ahrefs / Semrush before large content spend.

## 2.1 Easy to rank (win first)

| Keyword / cluster | Intent | Best URL | Content play |
|-------------------|--------|----------|--------------|
| ZAFTYS Logistics / ZAFTYS TMS / TranZfort | Brand | `/`, `/technology`, `/network` | Clean titles, consistent naming, GSC |
| cement transport Maharashtra / Vidarbha / Amravati | Local freight | `/industries/cement` + corridor page | Plant windows, tippers, WhatsApp CTA |
| steel coil transport Maharashtra | Vertical | `/industries/steel-metals` | Axle / weighbridge FAQ |
| mining tipper / pit-to-plant logistics | Vertical | `/industries/coal-mining` | Site ops + DGMS-aware copy |
| how to reduce empty return trips FTL | Informational | `/blog/reduce-empty-return-trips` | Launch post |
| TMS for heavy haul / industrial freight India | Software niche | `/technology` | Differentiate vs generic TMS |
| fleet partner industrial loads India | Partner | `/partner` | Onboarding + payments via ZAFTYS |
| contract fleet logistics cement/steel | B2B program | `/services` | Dedicated program subsection |

## 2.2 High value (commercial  -  invest deliberately)

| Keyword / cluster | Value | Competition | ZAFTYS angle | Required asset |
|-------------------|-------|-------------|--------------|----------------|
| industrial logistics / heavy freight transport India | Shipper quotes | Medium-high | Fleet + TMS + network, one company | Home/Services depth + proof |
| cement logistics / cement transportation company India | Volume lanes | Specialist transporters | Plant discipline + tippers + visibility | Cement lander + corridors |
| steel logistics / coil & plate transport India | Heavy haul | Regional specialists | Flatbed/low-bed + mill windows | Steel lander + FAQ |
| FTL industrial / bulk freight FTL India | Core service | Crowded | Industrial FTL (not ecom Ace) | Services + materials |
| transport management system for transporters India | TMS demos | High (Panther, HashTMS, Fleetable…) | Built from own heavy-haul ops | `/technology` product depth |
| fleet management software India (SMB) | TMS adoption | High | Same platform ZAFTYS runs | Operator feature path |
| mining / coal transport India | Contracts | Medium | Tipper programs | Expand coal-mining page |
| project cargo / multi-axle heavy haul | Project bids | Medium | Only if true capability | Optional new subsection |

## 2.3 Defer / hard head terms (not primary landers)

| Keyword | Why defer | Adjacent play instead |
|---------|-----------|------------------------|
| freight marketplace / truck load board India | BlackBuck-scale SERP | “Verified industrial capacity through ZAFTYS” |
| transport management system India (bare) | Generic SaaS + roundups | “TMS for industrial / heavy-haul freight” |
| GPS truck tracking India | Telematics commodity | Feature inside TMS story |
| logistics company India / transporters near me | Directories + local pack | Vertical + corridor modifiers |
| AI logistics / AI trucking app | Hype SERP; conflicts with zaftys.com rules | Offline + voice as features on product site |
| packers & movers / ecom last mile | Wrong ICP | Ignore |

---

# 3. Page ownership map

One primary SEO job per URL  -  avoid making Home compete for every cluster.

| URL | Primary keyword job | Secondary | Primary CTA |
|-----|---------------------|-----------|-------------|
| `/` | Industrial logistics ecosystem (brand + category) | Heavy freight India | WhatsApp quote |
| `/services` | FTL / contract / mining logistics programs | Truck × material | WhatsApp |
| `/fleet` | Company fleet / heavy-haul capacity | Tipper / flatbed / tanker | WhatsApp |
| `/network` | TranZfort verified capacity | Partner overflow | Download app |
| `/technology` | ZAFTYS TMS product | Fleet ops software | Login / Demo |
| `/industries` | Industries hub | Vertical discovery | WhatsApp |
| `/industries/:slug` | Vertical freight keyword | Corridors & equipment | Industry WhatsApp |
| `/partner` | Join as fleet partner | Industrial loads for truckers | Apply + app |
| `/blog` | Knowledge hub | Topic discovery | Browse / Subscribe |
| `/blog/:slug` | Informational long-tail | Buyer education | WhatsApp / Services / Industry / TMS |
| `/contact` | Freight quote / consultation | Demo request | WhatsApp + form |
| `/about` | Brand / heritage / trust | Company entity | Contact |
| `/careers` | Hiring | Employer brand | Apply |
| `/login` | **noindex** | Portal entry | app.zaftys.com |

---

# 4. Blog / Knowledge Center plan

## 4.1 Role of the blog

| Goal | How |
|------|-----|
| Rank easy informational keywords | Practical guides from real corridor ops |
| Support commercial pages | Every article links to Services / Industry / TMS / Partner |
| Build E-E-A-T | Operator experience, not generic AI filler |
| Feed WhatsApp / demo leads | Soft CTA  -  not hard sell |

**Public label:** Blog (header + footer).  
**Routes:** `/blog` (index), `/blog/:slug` (posts). `/resources` is the hub. Reports catalog is `/reports`.  
**Data:** `src/lib/blog-data.ts`  -  typed TS modules (no CMS/MDX for v1).  
**Copy rules:** `copy-v2-a` + this file.

## 4.2 Publishing rules

- Write for people first (`copy-v2-a` SEO philosophy)  -  no keyword stuffing.
- No banned hype words (best, world-class, revolutionary, guaranteed…) unless evidenced.
- No fake stats or fake testimonials.
- Prefer operational specificity (plant windows, weighbridge, tipper payload, LR/ePOD).
- Standardize product name: **ZAFTYS TMS**; TranZfort as capacity network / app.
- Each article: unique title (~50-60 chars), meta description (~140-155), H1, FAQ optional, internal links, OG image.

## 4.3 Article backlog

### Published (launch set)

| Slug | Title | Cluster | CTA |
|------|-------|---------|-----|
| `reduce-empty-return-trips` | How To Reduce Empty Return Trips on Industrial FTL Lanes | empty miles / backhaul | WhatsApp |
| `planning-industrial-shipments` | Planning Industrial Shipments: Body Type, Payload & Plant Windows | industrial shipment planning | `/services` |
| `cement-plant-loading-windows` | Cement Plant Loading Windows & Detention | cement logistics | `/industries/cement` |
| `steel-coil-transport-basics` | Steel Coil Transport Basics | steel coil transport | `/industries/steel-metals` |
| `tms-for-heavy-haul` | TMS for Heavy-Haul Freight Beyond GPS | TMS for industrial freight | `/technology` |
| `tms-evaluation-guide-indian-manufacturers` | TMS Evaluation Guide for Indian Manufacturers | choose TMS India / manufacturing TMS | `/zaftys-tms` |
| `india-axle-load-gvw-limits-heavy-freight` | India Axle Load Norms and GVW Limits Guide | MoRTH axle / GVW / Section 194 | `/zaftys-tms` |
| `spot-market-vs-dedicated-fleet-india` | Spot Market vs Dedicated Contract Fleets in India | spot vs dedicated / hybrid FTL sourcing / spot freight rates India | `/tranzfort-network` |
| `plant-detention-tat-yard-gate-india` | Plant Detention and Turnaround Time (TAT) India | plant detention / truck TAT / in-plant logistics / yard management | `/zaftys-tms` |
| `epod-fastag-eway-bill-billing-india` | ePOD and e-Way Bill Freight Billing India | ePOD / electronic proof of delivery / GST e-Way Bill / three-way freight invoice match | `/zaftys-tms` |

### Still to write

| Priority | Working title | Target cluster | Status |
|----------|---------------|----------------|--------|
| P1 | Reducing Dispatch Delays | dispatch operations | Backlog |
| P1 | Improving Fleet Utilization | fleet productivity | Backlog |
| P1 | Choosing The Right Logistics Partner | shipper evaluation | Backlog |
| P2 | Vehicle Dispatch Checklist | checklist / featured snippet | Backlog |
| P2 | Pit-to-plant tipper operations overview | mining logistics | Backlog |
| P2 | Corridor playbook: Maharashtra industrial lanes | geo long-tail | Backlog |

## 4.4 Blog technical SEO

- [x] Article routes under `/blog/[slug]` (IA: public **Blog** kept; `/resources` is hub; reports at `/reports`).
- [x] Add each URL to sitemap on publish.
- [x] `BlogPosting` JSON-LD (headline, datePublished, author/publisher, image).
- [x] Canonical per article; OG type `article`.
- [x] Author attribution (`ZAFTYS Operations`).
- [x] “Last updated” when guides change (`updatedAt` + UI + `dateModified`).
- [x] Related posts + CTA band (WhatsApp / Services / Industry / TMS).
- [x] FAQ → `FAQPage` schema on posts.
- [x] Remove noindex from hub (indexable).

## 4.5 Blog implementation status

| Item | Status |
|------|--------|
| Hub page `/blog` | ✅ Live |
| `/resources` hub + `/reports` catalog | ✅ Live |
| Categories UI | ✅ Live |
| Article pages | ✅ Live |
| Published articles | ✅ 10 posts (launch set + TMS + axle + spot + plant TAT + ePOD billing) |
| Blog sitemap entries | ✅ Hub + posts from `blog-data.ts` |
| Header / footer / home teaser | ✅ Live |
| RSS (optional) | ⬜ Later |
| CMS / MDX | ⬜ Out of scope v1 |

---

# 5. Product-ready messaging notes (SEO-adjacent)

These are not classic “meta tag” tasks but they affect how pages rank and convert once products are live.

| Area | Current | Target |
|------|---------|--------|
| `/technology` | ✅ Live product proof + Login primary | Maintain; add real screenshots later |
| `/network` | ✅ Download TranZfort primary; demos secondary | Maintain |
| Home TMS band | ✅ Live portal language (Wave 3) | Maintain |
| Blog | ✅ 10 posts on `/blog` (indexable) | Expand backlog |
| Naming | ✅ **ZAFTYS TMS** on public copy | Maintain |
| zaftys ↔ TranZfort sites | zaftys.com aligned; tranzfort.com open | Shared claim rules on TZ site |

**Messaging hierarchy (unchanged):** ZAFTYS (operator) → TMS (platform) → TranZfort (capacity/app).

---

# 6. Measurement & decision log

## 6.1 KPIs to track (after GSC + analytics)

| KPI | Why |
|-----|-----|
| Indexed page count (GSC) | Interior URL discovery |
| Clicks/impressions by landing page | Industry + article traction |
| WhatsApp CTA events | Freight conversion |
| Demo / login clicks from `/technology` | TMS conversion |
| TranZfort download clicks from `/network` + `/partner` | App conversion |
| Brand query impressions | Naming consistency |

## 6.2 Decision log

| Date | Decision |
|------|----------|
| Aug 2026 | Catalogue all SEO improvements in this file before implementation waves |
| Aug 2026 | Treat TMS + TranZfort as **live products** in marketing; Knowledge articles are the remaining content gap |
| Aug 2026 | Public **Blog** at `/blog` + `/blog/:slug`; `/resources` hub; Market Reports at `/reports` |
| Aug 2026 | Prefer `/resources/` for educational content (not a separate `/blog` brand) unless IA changes → **superseded** by Blog IA |
| Aug 2026 | Do not chase bare “freight marketplace India” or bare “TMS India” as primary landers |
| Jul 2026 | Meta defaults and per-page titles defined in `copy-v2-l.md`  -  shorten further for SERP CTR |
| 6 Aug 2026 | Branch `seo-improvements` from `main`; shipped quick-win SEO wave (sitemap, OG PNG, noindex, meta, industry H1s, SPA rewrites) |
| 6 Aug 2026 | Wave 2: product-ready Technology/Network CTAs, FAQs + FAQPage, WebSite/LocalBusiness, TMS naming sweep, removed GTM placeholder |
| 6 Aug 2026 | SEO polish: Organization `sameAs`, blog `updatedAt`, hub internal links, stale checklist sync |

---

## Related files

| File | Role |
|------|------|
| `docs/marketing/copy-v2-l.md` | Approved titles, descriptions, OG, legal outlines |
| `docs/marketing/copy-v2-i.md` | Knowledge Center copy drafts |
| `docs/marketing/copy-v2-a.md` | Brand voice + SEO philosophy + words to avoid |
| `docs/marketing/marketing-website-sitemap-new.md` | IA + route tracker |
| `src/components/SEO.tsx` | Helmet implementation |
| `src/lib/page-seo.ts` | Live page meta |
| `src/lib/schema.ts` | JSON-LD helpers |
| `src/lib/blog-data.ts` | Blog posts + helpers |
| `src/pages/Blog.tsx` / `BlogPost.tsx` | Blog index + post pages |
| `src/lib/resources-data.ts` | Legacy Knowledge placeholders (superseded by blog-data) |
| `public/sitemap.xml` | Static sitemap (expanded; deploy to clear live 500) |
| `public/robots.txt` | Crawl rules + sitemap pointer |

---

*This document is the working checklist for SEO and blog work on the ZAFTYS marketing site. Update checkboxes as items ship.*
