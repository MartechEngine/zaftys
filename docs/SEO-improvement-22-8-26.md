# ZAFTYS SEO & Marketing Copy Improvement Plan — 22 Aug 2026

| Field | Value |
|-------|-------|
| **Scope** | URL intent, metadata, internal links, primary-keyword alignment, content clusters, schema, marketing copy sweep, report expansion, brand entity ownership ("ZAFTYS"), new-domain acceleration |
| **Domain status** | Brand-new / low-authority domain (`zaftys.com`) — full overhaul on `rewamp-20-8-26` |
| **Inputs** | `docs/content.md` (content audit inventory), `page-seo.ts`, leaf/industry SEO, `site-paths.ts`, sitemap, `src/lib/schema.ts`, live blog/report catalog |
| **Related** | `docs/content.md`, `docs/marketing/SEO&Blog.md` (technical crawl checklist) |
| **Cadence** | 10–20 new blogs + 10+ reports over the next 3 months (backlog in §12–13) |

---

## Principles (non-negotiable)

1. **Brand voice stays natural.** Visible H1s, leads, and section copy keep ZAFTYS desk language. Do not rewrite heroes into keyword strings.
2. **SEO work lives mostly in metadata, URLs, linking, and structural data** — not in stuffing body copy.
3. **Industry pages are commercial SEO pillars.** They own vertical purchase intent and convert to quote/WhatsApp.
4. **Blog posts are supporting topical-authority pages.** They teach, rank long-tail, and pass trust/links into industry + logistics + TMS pages. They are not a second set of sales pages.
5. **Reports build institutional authority.** Gated research, citations, and brand search — not local FTL doorways.
6. **No thin location pages.** Do not create city/corridor microsites for SEO. Mention real corridors only inside About, industry, or service pages where operations already live.
7. **No unsupported coverage or scale claims.** No invented fleet counts, pan-India guarantees, blended Own+Network tallies, or fake SLAs — in meta or body.

**Clarification on Principle 5 (reports):** “Gated research” means the **downloadable PDF** is gated. The `/reports/{slug}` HTML landing page must remain fully crawlable (see §2.A & §13 Report Crawlability). Do not hide the page body behind a form.

Technical crawl items (sitemap, prerender, OG, GA4) remain in `docs/marketing/SEO&Blog.md`. Schema directives, brand keyword strategy, and marketing copy sweep targets live in **§5.1, §15** and the §8 file map.

---

## 1. Executive verdict

**Context:** `zaftys.com` is a **new / low-authority domain** exiting a full IA and content overhaul. Early wins come from crawlable depth, clean URL signals, long-tail technical content, entity consistency (NAP + GBP + brand name schema), schema, and eliminating legacy link noise.

**What already works**

- Clean commercial IA: Logistics → Fleet → Network → TMS → Intelligence → Industries.
- **Industry pillars** already carry strong `seoTitle` / `seoH1` / FAQ depth (FAQPage schema candidates).
- Logistics service leaves include India in titles without sounding robotic.
- Blog deep-research set already supports axle/GVW, plant TAT, ePOD, container trucking, TMS evaluation.
- Baseline JSON-LD helpers exist in `src/lib/schema.ts` (`Organization`, `LocalBusiness`, `LogisticsService`, `SoftwareApplication`, etc.).
- Own vs Network honesty is a trust signal. Keep it.

**What to fix first (in this order)**

1. **URL intent consolidation & link sweep** — 301 `/services` → `/logistics`; 301 `/tranzfort-network` → `/network/tranzfort`; purge `/services` links from footer, 404 page, and blog CTAs (§2.A / §2.C).
2. **Brand Entity & "ZAFTYS" Keyword Ownership** — configure schema `Organization` (`name: "ZAFTYS"`, `legalName: "ZAFTYS Logistics"`), enforce `| ZAFTYS` title suffix rule, and establish bare-brand backlinks (§5.1 / §15.1).
3. **Report HTML copy expansion** — expand live report landing pages (`/reports/digital-freight-matching-market-2027-2036` & `/reports/global-logistics-market-2027-2036`) from ~100 words to 1,000–1,500 words of indexable text; gate PDF only (§2.A / §13).
4. **Metadata upgrades in `page-seo.ts`** — inject geographical intent ("India") and primary commercial phrases into `<title>` and `<meta name="description">` across hubs while keeping visible heroes clean (§2.B).
5. **Schema & structured data map** — ship consistent JSON-LD types on pillars, logistics leaves, TMS, blogs, reports, and Organization `sameAs` (§15.1).
6. **Primary-keyword & cluster alignment** — one primary intent per URL; every blog points to one commercial pillar (§2.D / §2.E).
7. **Entity & off-page foundations** — GBP, NAP consistency, digital PR from reports, partner backlink path (§5 / §15.2).

---

## 2. Priority workstreams

### A. URL intent consolidation & report crawlability

**Winners (keep and reinforce)**

| Intent | Canonical URL |
|--------|----------------|
| Transportation / 3PL / contract / dedicated / industrial / container **services** | `/logistics` (+ leaves under `/logistics/*`) |
| Own vs Network **truck types / body classes** | `/fleet` |
| Capacity model + verified partners + TranZfort entry | `/network` |
| Marketplace product | `/network/tranzfort` |
| TMS product | `/zaftys-tms` |
| Vertical **buy** intent | `/industries/{slug}` |
| Topical education | `/blog/{slug}` |
| Institutional research (crawlable HTML + gated PDF) | `/reports/{slug}` |

**Resolve**

| Conflict | Decision |
|----------|----------|
| `/services` vs `/logistics` / `/fleet` | Prefer `/logistics` for service intent and `/fleet` for body-class intent. **301 `/services` → `/logistics`**. Remove `/services` from sitemap, footer, 404, and blog CTAs. |
| `/tranzfort-network` | **301 → `/network/tranzfort`**. Replace all internal hrefs. |
| `/technology*` → `/zaftys-tms*` | Keep permanent redirects; confirm GSC shows equity on new paths. |
| `/logistics/container-transportation` vs `/industries/container-transport` | Keep both. **Service** = how we run container FTL. **Industry** = port–city / EXIM desk for that vertical. Distinct titles; reciprocal links with clear labels. |
| `/network/truck-capacity` vs `/fleet` | Keep both. Capacity = sourcing story; Fleet = catalog. Meta should not use the same primary phrase. |

#### Report crawlability & indexing rules

Applies to every `/reports/{slug}` landing page (live + §13 backlog).

| Rule | Requirement |
|------|-------------|
| **Gate boundary** | **Only the downloadable PDF file is gated behind the lead form; the HTML page itself must be 100% crawlable by Googlebot.** |
| **No soft-wall** | Do **not** hide Executive Summary, Key Findings, Methodology, Data Highlights, or FAQ behind login, email modal, or empty “sneak peek” stubs. |
| **Indexable depth** | Each report landing page must include **1,000–1,500 words** of crawlable HTML covering at minimum: Executive Summary, Key Findings, Methodology, Data Highlights, and FAQ. |
| **Robots & Sitemap** | Landings stay `index,follow`. Include HTML URLs in `sitemap.xml`; exclude gated PDF asset URLs. |
| **Schema** | `Article` or `TechArticle` + `FAQPage` on all report landings (§15). |

---

### B. Metadata & SERP copy upgrades (implement in `page-seo.ts`)

Keep visible hero copy natural in brand voice; optimize SERP metadata for high CTR and explicit geo/service intent. **Enforce the suffix rule: every title ends strictly with `| ZAFTYS` to build entity strength for the bare keyword "ZAFTYS".**

| URL | Proposed SERP Title | Proposed Meta Description Direction |
|-----|--------------------|------------------------------------|
| `/` | `3PL & Contract Logistics India \| ZAFTYS` | Industrial and commercial FTL in India. Owned fleet first, labeled network overflow, TMS on trips we run. Request transportation. |
| `/logistics` | `FTL Logistics Services India \| 3PL & Contract \| ZAFTYS` | 3PL, contract and dedicated fleet, industrial freight, container road legs in India. One desk. Get a freight quote. |
| `/fleet` | `Own & Network Fleet \| Commercial Truck Types India \| ZAFTYS` | Company trucks we operate, plus labeled network classes via TranZfort. Side wall, 32ft container, 40ft flatbed, open body. |
| `/network` | `Transportation Network India \| Own Fleet & Partners \| ZAFTYS` | Owned fleet first. Verified partner overflow. TranZfort for digital matching. Labels stay honest across Indian freight corridors. |
| `/network/tranzfort` | `TranZfort \| Freight Marketplace India \| ZAFTYS` | Post or find a load in India for free. AI matching. Broker fee to truckers on booked loads. Download the app. |
| `/zaftys-tms` | `ZAFTYS TMS \| Transport Management System India \| ZAFTYS` | Live dispatch, GPS, ePOD, fleet records, shipper portal. Demo or login at app.zaftys.com. |
| `/intelligence` | `Logistics Intelligence \| Analytics & Market Reports \| ZAFTYS` | Operations analytics, rate context, and institutional reports on Indian freight we actually run. |
| `/industries` | `Industries We Serve \| Cement, Steel, Mining & More \| ZAFTYS` | Vertical desks for plant windows, axle reality, and body classes in India. Quote by industry. |
| `/partner` | `Become a Partner \| Register Fleet on ZAFTYS Network \| ZAFTYS` | Verified network capacity in India. TranZfort loads. Search free; broker fee on booked loads. |
| `/contact` | `Contact ZAFTYS \| Freight Quote, TMS Demo, Partner \| ZAFTYS` | WhatsApp or form. Amravati desk, Maharashtra. Phone: +91-927-092-3581. |
| `/about` | `About ZAFTYS \| Industrial Freight Desk, Fleet & TMS \| ZAFTYS` | Own trucks, TMS, labeled TranZfort overflow. Company profile on request. |

---

### C. Internal link & legacy `/services` elimination sweep

Execute this sweep across components and content files to purge dead internal link signals:

1. **Footer Navigation (`nav-config.ts` / `Footer.tsx`)**:
   - Change `Logistics -> Transportation -> /services` to `/logistics`.
   - Ensure all secondary links point to canonical paths (`/fleet`, `/network/tranzfort`, `/zaftys-tms`).
2. **Blog Post CTAs (`src/lib/blog-data.ts`)**:
   - Post *"Planning Commercial Shipments"*: Update CTA link from `/services` to `/logistics`.
3. **404 Page (`NotFound.tsx`)**:
   - Replace `Services` CTA button with `Logistics Services` (`/logistics`).
4. **Network & Legacy Links**:
   - Sweep all instances of `/tranzfort-network` → `/network/tranzfort`.
   - Sweep all instances of `/technology*` → `/zaftys-tms*`.

---

### D. Primary-keyword alignment

**One primary intent per URL.**

#### Commercial pillars (industry first)

| URL | Primary intent (for meta + internal anchors) | Role |
|-----|-----------------------------------------------|------|
| `/industries/cement` | Cement logistics India | Pillar |
| `/industries/steel-metals` | Steel coil / metals transport India | Pillar |
| `/industries/coal-mining` | Mining product transport India | Pillar |
| `/industries/container-transport` | Port–city container road transport | Pillar |
| `/industries/chemicals` | Chemical / tanker logistics India | Pillar |
| `/industries/manufacturing` | Manufacturing plant-window FTL | Pillar |
| `/industries/fmcg` | FMCG factory-to-DC logistics | Pillar |
| `/industries/industrial-logistics` | Multi-plant industrial freight programs | Pillar |

#### Service & product URLs

| URL | Primary intent | Notes |
|-----|----------------|-------|
| `/logistics` | FTL logistics services India | Hub |
| `/logistics/3pl-transportation` | 3PL transportation India | Service leaf |
| `/logistics/contract-logistics` | Contract logistics India | Service leaf |
| `/logistics/dedicated-fleet` | Dedicated fleet India | Service leaf |
| `/logistics/industrial-freight` | Industrial freight transportation India | Feeds multiple industries |
| `/logistics/container-transportation` | Container transportation (service) | Distinct from industry pillar |
| `/fleet` | Own vs network fleet / truck types | Catalog |
| `/zaftys-tms` | Transport management system India | SaaS Product |
| `/network/tranzfort` | Freight marketplace India | Marketplace |

---

### E. Content-cluster linking

Treat each **industry pillar** as the center of a cluster:

```
                    [Industry pillar]
                   /        |        \
          [Blog A]      [Blog B]    [Service leaf]
               \            |         /
                \           |        /
                 [Report / Intelligence] → CTA → Quote
```

**Minimum cluster links**

1. Industry Pillar → related logistics service leaf + 2 supporting blogs.
2. Each Blog → **One primary commercial pillar** in the main CTA block.
3. Each Report → `/intelligence/market-intelligence` or `/reports` + one matching industry pillar.

---

## 3. On-page guidance (without stuffing)

**Protect**

- Brand H1s and dense logistics/industry body copy.
- FAQ blocks on industry pages and report landings.

**Allowed, light body edits**

- Home lead may include “in India” once if missing.
- Reciprocal “Also see” lines between container **service** (`/logistics/container-transportation`) and container **industry** (`/industries/container-transport`).
- Report landings: expand public HTML to 1,000–1,500 words (§13).

**Not allowed**

- Rewriting H1s into “Best Cement Logistics Company India 2026”.
- Thin location/city doorway pages (“Mundra logistics”).
- Gating report HTML behind lead forms.

---

## 4. Cannibalization watchlist

| Pair | Resolution |
|------|------------|
| `/logistics` vs `/services` | Consolidate on `/logistics`; 301 redirect `/services` |
| `/fleet` vs `/services` body classes | Fleet owns body-class catalog |
| Container service vs container industry | Both stay; cluster-link; distinct titles |
| Industry steel vs blog steel coil | Industry sells; blog teaches; cross-link |
| TMS page vs TMS evaluation blog | Product vs buyer guide |
| `/network` vs TranZfort | Network hub vs TranZfort app |
| Report HTML vs PDF | HTML ranks/cites; PDF is the gated asset |

---

## 5. Action plan & brand entity strategy

### 5.1 Brand Keyword Ownership Strategy (Owning "ZAFTYS")

To rank #1, generate Google Sitelinks, and claim a Knowledge Panel for the bare keyword **"ZAFTYS"** (without needing to append "Logistics"), execute these 5 directives:

1. **Schema Name Declaration**: Set `"name": "ZAFTYS"` as the primary token in `Organization` schema (`src/lib/schema.ts`), with `"legalName": "ZAFTYS Logistics"` and `"alternateName": ["ZAFTYS Logistics", "ZAFTYS TMS", "TranZfort"]`.
2. **Title Suffix Standardization**: Ensure every `<title>` tag ends with `| ZAFTYS` (e.g., `3PL & Contract Logistics India | ZAFTYS`).
3. **Exact-Match Bare Brand Anchor Text**: Ensure external links, PR mentions, directory profiles, and partner links use the exact anchor text **`ZAFTYS`** pointing to `https://zaftys.com`.
4. **Google Business Profile Alignment**: Set GBP primary name to **ZAFTYS** (or **ZAFTYS - Industrial Logistics & Fleet**), pointing directly to `https://zaftys.com`.
5. **Navigational Demand Generation**: Include *"Search 'ZAFTYS' on Google"* in email footers, press releases, and WhatsApp templates to build user-search association.

---

### P0 — Hygiene, Brand & Legacy Cleanup (Do First)

1. **Internal link sweep** — eliminate all `/services` and `/tranzfort-network` links across components, footers, 404, and blogs.
2. **301 Redirects & Sitemap** — redirect `/services` → `/logistics` and `/tranzfort-network` → `/network/tranzfort`. Purge 301 paths from `sitemap.xml`.
3. **Meta Pass & Title Suffixes in `page-seo.ts`** — update hub titles and descriptions per §2.B, enforcing `| ZAFTYS`.
4. **Schema Update for Brand Ownership** — update `src/lib/schema.ts` with `name: "ZAFTYS"` and `alternateName` array (§15.1).
5. **Report Landing HTML Expansion** — update `src/lib/market-reports-data.ts` to expand live report landing HTML to 1,000+ words (§13).
6. **GSC URL Inspection** — submit money URLs after deployment.

### P1 — Alignment, Schema & Clusters _(shipped 2026-08-22; rollback tag `seo-p1-rollback-2026-08-22`)_

7. ~~Industry ↔ service reciprocal links on all 8 pillars.~~ (`serviceLinks` + solution `relatedLinks`)
8. ~~Blog CTA map: each live post → one primary pillar.~~
9. ~~Implement/extend schema per §15~~ (`logisticsServiceLeafSchema`, TechArticle on reports/deep-research, SoftwareApplication `featureList`). Validate with Google Rich Results Test after deploy.
10. Wire GA4 + keep Search Console monitoring (see `SEO&Blog.md`) — helpers in `src/lib/analytics.ts`; set `VITE_GA_MEASUREMENT_ID` in deploy env (documented in `.env.example`). Confirm live hits after deploy.

### P2 — Authority Cadence _(new blogs & new reports DEFERRED — author one-at-a-time later)_

11. **Deferred:** §12 Waves 1–3 blogs — backlog kept below; not live until each is authored individually.
12. **Deferred:** §13 India report slate — backlog kept; only the **2 existing** global/DFM reports remain live.
13. Entity & off-page (GBP / directory NAP / PR) — ops; on-site NAP unified in `constants.ts` (Footer / Contact / About / schema).

**Focus now:** Remaining open work is **ops / post-deploy** — GBP claim, directory NAP match, GSC URL Inspection, Rich Results Test, GA4 measurement ID in production, Digital PR (anchor **ZAFTYS**), and final `sameAs` URLs when profiles exist.

---

### Entity & Off-Page Authority Foundations (New Domain)

| Workstream | Guidance |
|------------|----------|
| **Google Business Profile (GBP)** | Claim/verify GBP for **Amravati HQ** (Old Town, Badnera). Primary Name: **ZAFTYS**. Categories: Logistics service / Transportation. Website → `https://zaftys.com`. |
| **NAP consistency** | Exact same **Name, Address, Phone** as Contact / schema / footer across Indian B2B directories (Justdial, IndiaMART, Tofler, ZaubaCorp). Legal name: ZAFTYS Logistics. |
| **Digital PR** | Use §13 research reports (public HTML summary + gated PDF) for press kits and outreach to Indian supply-chain / logistics trade media. Anchor text: **ZAFTYS**. |
| **Verified Partner Badging** | Offer verified fleet owners a "Verified ZAFTYS Partner" badge linking back to `zaftys.com/partner`. |
| **`sameAs` Entity Graph** | Keep Organization `sameAs` array in `schema.ts` synced with LinkedIn (`/company/zaftys`), ZaubaCorp, Crunchbase, GBP, `tranzfort.com`, `app.zaftys.com`. |

---

## 6. Primary-intent checklist

| Intent | URL | Meta Title | Target Link Target |
|--------|-----|------------|-------------------|
| Cement logistics | `/industries/cement` | Cement Logistics India \| Bulker & Tipper \| ZAFTYS | Reinforce cluster |
| Steel coil / metals | `/industries/steel-metals` | Steel Coil Transport India \| Flatbed \| ZAFTYS | Reinforce cluster |
| Mining products | `/industries/coal-mining` | Mining Product Transport India \| Tipper \| ZAFTYS | Add mining blogs |
| Port–city container | `/industries/container-transport` | Container Transport India \| Port to City \| ZAFTYS | Link service leaf |
| 3PL / FTL services | `/logistics` + leaves | FTL Logistics Services India \| 3PL & Contract \| ZAFTYS | Purge `/services` |
| Fleet types | `/fleet` | Own & Network Fleet \| Commercial Truck Types India \| ZAFTYS | Catalog links |
| TMS India | `/zaftys-tms` | ZAFTYS TMS \| Transport Management System India \| ZAFTYS | Blog → TMS CTAs |
| Freight marketplace | `/network/tranzfort` | TranZfort \| Freight Marketplace India \| ZAFTYS | Fix legacy path |
| Home commercial | `/` | 3PL & Contract Logistics India \| ZAFTYS | Keep brand H1 |
| Report topics | `/reports/{slug}` | Unique report title \| ZAFTYS | Crawlable HTML + PDF gate only |

---

## 7. Measurement

| Signal | Tool | Success Look |
|--------|------|-------------|
| **Bare Brand Ranking** | GSC / Google | `zaftys.com` ranks #1 for query `"ZAFTYS"` with sitelinks within 2-4 weeks post-launch |
| Impressions / CTR on pillars & hubs | GSC | CTR lift after meta pass; fewer duplicate-intent collisions |
| Long-tail blog indexing | GSC | Wave 1 technical posts indexed within days–weeks of publish |
| Report landings | GSC | `/reports/{slug}` indexed; queries on findings/methodology phrases |
| Index hygiene | GSC | Legacy URLs 301; `/services` & `/tranzfort-network` absent from sitemap |
| Engagement | GA4 | Quote / WhatsApp / report unlock events by landing page |
| Rich results | Rich Results Test | Valid FAQ / Article / SoftwareApplication / LogisticsService schema |

---

## 8. Implementation file map

| Work | Files / Location |
|------|------------------|
| Hub meta & Title Suffixes | `src/lib/page-seo.ts` |
| Logistics leaf meta | `src/lib/solution-pages.ts` |
| Network / TMS / Intelligence meta | `*-leaf-copy.ts` |
| Link sweep (eliminate `/services`) | `nav-config.ts`, `Footer.tsx`, `NotFound.tsx`, `src/lib/blog-data.ts`, `constants.ts`, `hero-ctas.ts` |
| Redirects & Sitemap | Hosting redirects + `scripts/generate-sitemap.mjs` (**exclude** `/services` and 301s) |
| New blogs | `src/lib/blog-data.ts` (+ layouts as needed) |
| Live & new reports + HTML expansion | `src/lib/market-reports-data.ts`, report page components |
| **Schema builders & Brand Entity** | `src/lib/schema.ts` — extend Organization (`name: "ZAFTYS"`), LocalBusiness, LogisticsService, SoftwareApplication, FAQPage, Article/TechArticle |
| **Schema injection** | `src/components/SEO.tsx` (`schema` prop) / `src/components/seo/Schema.tsx` |
| WhatsApp Prefill Standardization | `src/lib/constants.ts` / `hero-ctas.ts` |
| Launch checklist | §15 |

---

## 10. Already published (do not duplicate)

**Blogs live today** (existing only — Wave backlog deferred)

- TMS Beyond GPS; TMS Evaluation Guide (manufacturers 2026)
- Steel coil transport basics; Cement plant loading windows
- Planning industrial shipments; Reduce empty return trips
- India axle load & GVW; Spot vs dedicated fleet
- Plant detention & TAT; ePOD / FASTag / e-Way Bill
- Container trucking India (ports, chassis, backhaul)

**Reports live today** (existing only — India slate deferred)

- Global Logistics Market Size, Share & Forecast 2027–2036 (`/reports/global-logistics-market-2027-2036`)
- Digital Freight Matching Market Size & Forecast 2027–2036 (`/reports/digital-freight-matching-market-2027-2036`)

---

## 12. Future blog topics (next 3 months) — target 15–20

Publish for a **new-domain sandbox**: Wave 1 = hyper-specific long-tail (equipment, compliance, plant clocks) so pages index quickly with low domain authority.

### Wave 1 — Long-tail technical (Month 1, ~7) — New Domain Priority _(deferred)_

| # | Working title | Slug | Pillar / cluster |
|---|---------------|------|------------------|
| 1 | Mill gate papers for coil dispatch | `mill-gate-papers-coil-dispatch` | Steel |
| 2 | Chemical tanker freight: wash, MSDS | `chemical-tanker-freight-wash-msds` | Chemicals |
| 3 | 32 ft vs 40 ft sealed container capacity | `32ft-vs-40ft-sealed-container-india` | Container |
| 4 | Bulk cement / fly ash pneumatic bulker | `pneumatic-bulker-bulk-cement-fly-ash` | Cement |
| 5 | Document expiry and the weighbridge | `document-expiry-weighbridge-fleet-records` | TMS / Fleet |
| 6 | Port free time vs plant free time | `port-free-time-vs-plant-free-time-containers` | Container |
| 7 | Open body vs tipper bagged cement | `open-body-vs-tipper-bagged-cement-aggregates` | Cement |

### Wave 2 — Cluster expansion & product literacy (Month 2, ~6–7) _(deferred)_

| # | Working title | Slug | Pillar |
|---|---------------|------|--------|
| 8 | Tipper programs coal / ore / limestone | `tipper-programs-coal-ore-limestone` | Mining |
| 9 | Factory-to-DC OTIF for FMCG | `factory-to-dc-otif-fmcg-shippers` | FMCG |
| 10 | Contract vs spot for plant teams | `contract-logistics-vs-spot-ftl-plant-teams` | Contract / Mfg |
| 11 | Labeled network capacity on a live trip | `labeled-network-capacity-live-trip` | Network / Fleet |
| 12 | TranZfort matching — free to post | `tranzfort-matching-free-to-post` | TranZfort |
| 13 | ePOD that closes billing | `epod-that-closes-billing` | TMS |
| 14 | Reading a live map | `reading-live-map-without-calling-control-room` | TMS / Tracking |

### Wave 3 — Depth, trust & differentiation (Month 3, ~5–6) _(deferred)_

| # | Working title | Slug | Pillar |
|---|---------------|------|--------|
| 15 | Inter-plant WIP / shift gate | `inter-plant-wip-moves-shift-gate` | Manufacturing |
| 16 | Shutdown / turnaround freight | `shutdown-turnaround-freight-capacity` | Industrial |
| 17 | Amravati desk without fake fleet counts | `amravati-desk-pan-corridor-without-fake-fleet-counts` | About / Trust |
| 18 | GST billing on contracted trips | `gst-billing-contracted-trips-invoice` | TMS / Trust |
| 19 | Partner onboarding RC / insurance | `partner-onboarding-rc-insurance-corridor` | Partner |
| 20 | Analytics vs WhatsApp lane truth | `when-analytics-help-when-whatsapp-lies` | Intelligence |

---

## 13. Future & live report topics — open HTML copy expansion specifications

### HTML Landing Page Content Structure (Mandatory for ALL Reports)

Every report landing page (`/reports/{slug}`) in `src/lib/market-reports-data.ts` (and wave modules) MUST include the following 1,000–1,500 word open HTML structure:

1. **Executive Summary (300–400 words)**: Market definition, macro growth drivers, scope parameters, and total addressable market figures **or explicit refusal to invent TAM**.
2. **Key Analytical Takeaways (300–400 words)**: 4–5 bulleted research findings with concrete statistics **or defensible operational findings**, growth CAGRs where banked, regional shifts, and mode breakdowns.
3. **Research Methodology & Data Boundaries (200–300 words)**: Explanation of primary data sources, bottom-up modeling, corridor sampling, and explicit data limits.
4. **Frequently Asked Questions (200–300 words)**: 3–4 Q&As covering report coverage, update frequency, and licensing (Candidate for `FAQPage` schema).
5. **PDF Gate Constraint**: **ONLY the downloadable PDF file is gated behind the lead form.** The full HTML landing text must remain 100% crawlable by Googlebot.

### Live reports (existing)

1. ~~Digital Freight Matching Market Size & Forecast 2027–2036~~ — HTML expanded (P0)
2. ~~Global Logistics Market Size, Share & Forecast 2027–2036~~ — HTML expanded (P0)

### Core India slate (#1–#10) — all deferred (author individually later)

| # | Working title | Cluster | Status |
|---|---------------|---------|--------|
| 1 | India Road Freight & FTL Outlook 2027–2036 | Logistics / Manufacturing | Deferred |
| 2 | India Cement Logistics & Bulk Movement Outlook | Cement | Deferred |
| 3 | India Steel & Coil Road Transport Outlook | Steel | Deferred |
| 4 | India Port–Inland Container Road Haulage Outlook | Container | Deferred |
| 5 | India Mining & Bulk Tipper Logistics Outlook | Mining | Deferred |
| 6 | Transport Management Systems in India: Adoption & Buyer Criteria | TMS | Deferred |
| 7 | Digital Freight Matching in India: Corridor Reality Check | TranZfort / DFM | Deferred |
| 8 | Contract vs Spot Capacity in Indian Industrial Freight | Contract / Dedicated | Deferred |
| 9 | Plant Detention, Yard TAT & Cost-to-Serve in Indian FTL | Cross-ops | Deferred |
| 10 | ePOD, e-Way Bill & Digitized Trip Close-Out in India | TMS / Compliance | Deferred |

**India report rule:** do not invent national TAM figures; disclose limits; HTML brief is the crawlable authority when each ships.

---

## 14. 3-month content calendar sketch

| Month | Blogs | Reports | SEO & Marketing Hygiene |
|-------|-------|---------|-------------------------|
| Month 1 | **Wave 1 long-tail technical** (mill papers, tanker MSDS, 32/40 ft, bulker, doc expiry, port vs plant free time, open vs tipper) | Expand HTML on 2 live reports to 1,000+ words; start #1 India FTL + #2 Cement Outlook | Purge `/services` internal links; update hub meta in `page-seo.ts`; deploy brand schema (`name: "ZAFTYS"`); verify GBP/NAP |
| Month 2 | Wave 2 (mining, FMCG, contract/spot, network, TranZfort, TMS visibility) | Publish #4 Container, #5 Mining, #6 TMS adoption (crawlable HTML each) | Cluster links; partner badge pilot; Digital PR push on expanded reports using anchor text **`ZAFTYS`** |
| Month 3 | Wave 3 (manufacturing WIP, industrial shutdown, trust, GST, partner, analytics) | Publish #7–#10 | GSC query review → monitor brand query `"ZAFTYS"` ranking position |

---

## 15. Schema map, entity foundations, marketing copy sweep & new-domain launch checklist

### 15.1 Schema & structured data map

Implement via builders in `src/lib/schema.ts` and inject through `SEO.tsx` or `src/components/seo/Schema.tsx`. Validate with **Google Rich Results Test**.

| Schema type | Where | Spec notes |
|-------------|-------|------------|
| **Organization** | Site-wide (shared layout) | `@id`: `https://zaftys.com/#organization`. **`name`: `"ZAFTYS"`**. **`legalName`: `"ZAFTYS Logistics"`**. **`alternateName`: `["ZAFTYS Logistics", "ZAFTYS TMS", "TranZfort"]`**. `sameAs`: LinkedIn (`/company/zaftys`), ZaubaCorp, Crunchbase, GBP URL, `https://tranzfort.com`, `https://app.zaftys.com`. |
| **LocalBusiness** | Home + **Contact** | `@id`: `https://zaftys.com/#localbusiness`. Amravati NAP exact string match with footer/GBP. `parentOrganization` → Organization `@id`. |
| **LogisticsService** | All `/logistics/*` leaves | Unique `name`, `description`, `url`, `serviceType` per leaf; `provider` → Organization; `areaServed`: India. |
| **SoftwareApplication** | `/zaftys-tms` | `applicationCategory`: `BusinessApplication`. `operatingSystem`: `Web, Android, iOS`. Feature list from live modules (dispatch, GPS, ePOD, fleet records, portal). `url`: `https://app.zaftys.com`. |
| **FAQPage** | All `/industries/*` pillars; report landings; TMS page | Inject valid FAQ arrays matching visible page text. |
| **Article** or **TechArticle** | All `/blog/*` and `/reports/*` | `headline`, `datePublished`, `dateModified`, `author`/`publisher` → Organization, `description`. Prefer **TechArticle** for research pieces. |

### 15.2 Marketing copy & code modification directives

Execute these explicit code edits across the repository:

- [x] **Configure Schema for Bare-Brand Ownership** — done in P0 (`schema.ts`).
- [x] **Standardize SERP Title Suffixes** — `page-seo.ts` + `SEO.tsx` `brandedTitle`; leaf meta polished 2026-08-22.
- [x] **Purge `/services` Internal Links** — done in P0 (page still redirects).
- [x] **Expand Live Report Landing HTML Copy** — done in P0; related blogs refreshed 2026-08-22.
- [x] **Standardize WhatsApp Prefill Strings** — `constants.ts` + `hero-ctas.ts` re-exports; industry desks keep vertical prefills.
- [x] **On-site NAP single source** — `COMPANY_PHONE_*` + `companyAddress` drive Footer, Contact, About strip, Organization + LocalBusiness schema. Directory/GBP match still ops.
- [ ] **Verify NAP String Uniformity** — confirm 1:1 with live GBP/directories (ops).

### 15.3 New domain acceleration & launch checklist

- [x] **Brand entity schema configured**
- [x] **Title suffix rule enforced**
- [x] **Gated report HTML crawlability** — 2 live reports have open HTML + gated PDF
- [ ] **Schema markup validated** via Google Rich Results Test (post-deploy)
- [ ] **Google Business Profile & NAP citations aligned** (ops)
- [x] **Clean XML sitemap generated** — existing hubs/pillars/blogs/reports only
- [ ] **Manual GSC URL Inspection** (post-deploy)
- [ ] **Digital PR distribution** for 2 live reports (ops)
- [x] **Internal link sweep completed** for `/services` & `/tranzfort-network`
- [ ] **Organization `sameAs` array** — add ZaubaCorp / Crunchbase / GBP when URLs are final (ops)

---

*Updated 22 Aug 2026 — complete SEO, brand ownership ("ZAFTYS"), and marketing copy improvement plan.*
