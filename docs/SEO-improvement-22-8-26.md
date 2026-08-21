# ZAFTYS SEO Improvement Plan — 22 Aug 2026

| Field | Value |
|-------|-------|
| **Scope** | URL intent, metadata, internal links, primary-keyword alignment, content clusters, schema, new-domain acceleration |
| **Domain status** | Brand-new / low-authority domain (`zaftys.com`) — full overhaul on `rewamp-20-8-26` |
| **Inputs** | `docs/content.md`, `page-seo.ts`, leaf/industry SEO, `site-paths.ts`, sitemap, `src/lib/schema.ts`, live blog/report catalog |
| **Related** | `docs/content.md`, `docs/marketing/SEO&Blog.md` (technical crawl checklist) |
| **Cadence** | 10–20 new blogs + 10+ reports over the next 3 months (backlog in §12–13) |

---

## Principles (non-negotiable)

1. **Brand voice stays natural.** Visible H1s, leads, and section copy keep ZAFTYS desk language. Do not rewrite heroes into keyword strings.
2. **SEO work lives mostly in metadata, URLs, and linking** — not in stuffing body copy.
3. **Industry pages are commercial SEO pillars.** They own vertical purchase intent and convert to quote/WhatsApp.
4. **Blog posts are supporting topical-authority pages.** They teach, rank long-tail, and pass trust/links into industry + logistics + TMS pages. They are not a second set of sales pages.
5. **Reports build institutional authority.** Gated research, citations, and brand search — not local FTL doorways.
6. **No thin location pages.** Do not create city/corridor microsites for SEO. Mention real corridors only inside About, industry, or service pages where operations already live.
7. **No unsupported coverage or scale claims.** No invented fleet counts, pan-India guarantees, blended Own+Network tallies, or fake SLAs — in meta or body.

**Clarification on Principle 5 (reports):** “Gated research” means the **downloadable PDF** is gated. The `/reports/{slug}` HTML landing page must remain fully crawlable (see §2.A Report Crawlability). Do not hide the page body behind a form.

Technical crawl items (sitemap, prerender, OG, GA4) remain in `docs/marketing/SEO&Blog.md`. Schema directives for this rewamp live in **§15** and the §8 file map.

---

## 1. Executive verdict

**Context:** `zaftys.com` is a **new / low-authority domain** exiting a full IA and content overhaul. Early wins come from crawlable depth, clean URL signals, long-tail technical content, entity consistency (NAP + GBP), and structured data — not from broad head terms or thin geo pages.

**What already works**

- Clean commercial IA: Logistics → Fleet → Network → TMS → Intelligence → Industries.
- **Industry pillars** already carry strong `seoTitle` / `seoH1` / FAQ depth (FAQPage schema candidates).
- Logistics service leaves include India in titles without sounding robotic.
- Blog deep-research set already supports axle/GVW, plant TAT, ePOD, container trucking, TMS evaluation.
- Baseline JSON-LD helpers exist in `src/lib/schema.ts` (`Organization`, `LocalBusiness`, `LogisticsService`, `SoftwareApplication`, etc.) — expand per §15.
- Own vs Network honesty is a trust signal. Keep it.

**What to fix first (in this order)**

1. **URL intent consolidation** — stop `/services`, `/logistics`, and `/fleet` fighting each other; lock legacy `/tranzfort-network`.
2. **Report HTML crawlability** — landing pages must expose 1,000–1,500 words of indexable text; gate PDF only (§2.A / §13).
3. **Schema & structured data map** — ship consistent types on pillars, logistics leaves, TMS, blogs, reports (§15).
4. **Metadata** — clarify SERP titles/descriptions for hubs; leave visible copy alone unless a lead truly omits a needed geo fact (e.g. Home can say “in India” once, in natural prose).
5. **Internal-link cleanup** — every link points at the canonical path for that intent.
6. **Primary-keyword alignment** — one primary intent per URL; industry owns verticals; blog never duplicates industry H1s.
7. **Content-cluster linking** — every blog/report points to its pillar; every pillar points to 2–3 supporting articles.
8. **Entity & off-page foundations** — GBP, NAP, digital PR from reports, partner backlink path (§5 / §15).

**What “rank faster” means on a new domain**

- Index **specific long-tail** technical articles first (equipment, compliance, plant clocks) — they compete less and teach Google topical relevance.
- Consolidate commercial signals on industry pillars + logistics leaves.
- Make report landings **earn** rankings and citations with crawlable HTML, then use PDFs + PR for links.
- Do **not** chase head terms with thin pages or unsupported scale claims.

---

## 2. Priority workstreams

### A. URL intent consolidation

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
| `/services` vs `/logistics` / `/fleet` | Prefer `/logistics` for service intent and `/fleet` for body-class intent. **301 `/services` → `/logistics`** after internal links are updated (hash links to truck classes → `/fleet#…` if needed). Remove `/services` from sitemap. |
| `/tranzfort-network` | **301 → `/network/tranzfort`**. Replace all internal hrefs. |
| `/technology*` → `/zaftys-tms*` | Keep permanent redirects; confirm GSC shows equity on new paths. |
| `/logistics/container-transportation` vs `/industries/container-transport` | Keep both. **Service** = how we run container FTL. **Industry** = port–city / EXIM desk for that vertical. Distinct titles already; add reciprocal links with clear labels (not duplicate H1s). |
| `/network/truck-capacity` vs `/fleet` | Keep both. Capacity = sourcing story; Fleet = catalog. Meta should not use the same primary phrase. |
| Mining slug `coal-mining` | Keep URL for equity. Title/H1 already say mining products — no new thin alias required. |

**Do not create**

- City, port, or corridor landing pages whose only job is SEO.
- Extra “tipper program” / “coil program” URLs unless a real product page is planned with full copy depth.

#### Report crawlability & indexing rules

Applies to every `/reports/{slug}` landing page (live + §13 backlog).

| Rule | Requirement |
|------|-------------|
| **Gate boundary** | **Only the downloadable PDF file is gated behind the lead form; the HTML page itself must be 100% crawlable by Googlebot.** |
| **No soft-wall** | Do **not** hide Executive Summary, Key Findings, Methodology, Data Highlights, or FAQ behind login, email modal, or empty “sneak peek” stubs. |
| **Indexable depth** | Each report landing page must include **1,000–1,500 words** of crawlable HTML covering at minimum: Executive Summary, Key Findings, Methodology, Data Highlights, and FAQ. |
| **Robots** | Report landings stay `index,follow`. PDF unlock endpoints / thank-you states may be `noindex` if they add no unique content. |
| **Sitemap** | Include `/reports` and `/reports/{slug}` HTML URLs. Exclude gated PDF asset URLs and `/reports/{slug}/read` (or equivalent reader) if thin/app-like. |
| **Schema** | `Article` or `TechArticle` + `FAQPage` when FAQ exists (§15). |
| **CTA** | Form unlocks PDF download / email delivery — not the right to read the HTML. |

Audit live global logistics + DFM report pages against this bar before launch PR. Remodel if copy is currently form-gated or under ~1,000 words of HTML.

### B. Metadata (SERP only)

**Rules**

- Optimize `<title>` and meta description for clarity and CTR.
- Visible H1/lead stay brand-voice; do **not** force the same string into the hero.
- ~50–60 characters for the distinctive part of the title; ~140–155 for description.
- Prefer natural Indian B2B English. India belongs in meta where it helps geography — not five times in one description.
- `SEO.tsx` already skips double-branding when `ZAFTYS` is in the title. Don’t write `ZAFTYS | … | ZAFTYS Logistics`.

**Proposed meta upgrades** (implement in `page-seo.ts` / leaf SEO — not in heroes)

| URL | Proposed title | Proposed description direction |
|-----|----------------|--------------------------------|
| `/` | `3PL & Contract Logistics India \| ZAFTYS` | Industrial and commercial FTL. Owned fleet first, labeled network when needed, TMS on trips we run. Request transportation. |
| `/logistics` | `FTL Logistics Services India \| 3PL & Contract` | 3PL, contract and dedicated fleet, industrial freight, container road legs. One desk. Get a freight quote. |
| `/fleet` | `Own & Network Fleet \| Commercial Truck Types India` | Company trucks we operate, plus labeled network classes via TranZfort. Same desk confirms which is which. |
| `/network` | `Transportation Network India \| Own Fleet & Partners` | Owned fleet first. Verified partner overflow. TranZfort for digital matching. Labels stay honest. |
| `/network/tranzfort` | `TranZfort \| Freight Marketplace India` | Post or find a load for free. AI matching. Broker fee to truckers on booked loads. Download the app. |
| `/zaftys-tms` | `ZAFTYS TMS \| Transport Management System India` | Live dispatch, GPS, ePOD, fleet records, shipper portal. Demo or login at app.zaftys.com. |
| `/intelligence` | `Logistics Intelligence \| Analytics & Market Reports` | Operations analytics, rate context, and institutional reports on freight we actually run. |
| `/industries` | `Industries We Serve \| Cement, Steel, Mining & More` | Vertical desks for plant windows and the right body class. Quote by industry. |
| `/partner` | `Become a Partner \| Register Fleet on ZAFTYS Network` | Verified network capacity. TranZfort loads. Search free; broker fee on booked loads. |
| `/contact` | `Contact ZAFTYS \| Freight Quote, TMS Demo, Partner` | WhatsApp or form. Amravati desk. Phone in description. |
| `/about` | `About ZAFTYS \| Industrial Freight Desk, Fleet & TMS` | Own trucks, TMS, labeled TranZfort overflow. Company profile on request. |

Logistics leaves and industry `seoTitle`s are already strong — **light polish only** (length, duplicate fluff). Do not “optimize” industry visible `seoH1`s into denser keyword strings.

### C. Internal-link cleanup

**Sweep targets**

- `/tranzfort-network` → `/network/tranzfort` (Blog layouts, NotFound, Services, Network, Blog listing, any CTA helpers).
- `/services` → `/logistics` (or `/fleet` when the sentence is about body class).
- Prefer `/zaftys-tms` over any leftover `/technology` copy in prose links.

**Linking rules after cleanup**

| From | Should link to |
|------|----------------|
| Industry pillar | Matching logistics service + 2–3 related blogs + Contact/quote |
| Logistics service leaf | Matching industry pillar(s) + Fleet + TMS when trip visibility is mentioned |
| Blog post | **One primary commercial pillar** (industry or logistics or TMS) in the main CTA — not only footer noise |
| Report detail | Intelligence / Market Intelligence + one relevant industry or logistics hub; HTML summary sections stay public |
| Home teasers | Hub URLs only (Logistics, Network, TMS, Industries) — not legacy paths |

### D. Primary-keyword alignment

**One primary intent per URL.** Siblings must not share the same primary.

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
| `/logistics/3pl-transportation` | 3PL transportation India | |
| `/logistics/contract-logistics` | Contract logistics India | |
| `/logistics/dedicated-fleet` | Dedicated fleet India | |
| `/logistics/industrial-freight` | Industrial freight transportation India | Feeds multiple industries |
| `/logistics/container-transportation` | Container transportation (service) | Distinct from industry pillar |
| `/fleet` | Own vs network fleet / truck types | |
| `/zaftys-tms` | Transport management system India | |
| `/network/tranzfort` | Freight marketplace India | |

#### Blog / reports

| Type | Intent | Rule |
|------|--------|------|
| Blog | Informational / how-to / research | Must **not** reuse industry primary as the article H1. Link up to the pillar. On a new domain, prefer **hyper-specific long-tail** first (§12 Wave 1). |
| Report | Market size, forecast, segment research | Brand + backlink authority; crawlable HTML summary; soft CTA into Intelligence or a pillar. |

### E. Content-cluster linking

Treat each **industry pillar** as the center of a cluster. Blogs and reports are spokes.

```
                    [Industry pillar]
                   /        |        \
          [Blog A]      [Blog B]    [Service leaf]
               \            |         /
                \           |        /
                 [Report / Intelligence] → CTA → Quote
```

**Minimum cluster links (when content exists)**

1. Pillar → related logistics leaf  
2. Pillar → 2 supporting blogs (related reading)  
3. Each new blog → pillar + one adjacent blog  
4. Each new report → `/intelligence/market-intelligence` or `/reports` hub + one relevant pillar  

**Existing cluster seeds (already live)**

| Pillar | Supporting blogs already on site |
|--------|----------------------------------|
| Cement | Plant loading windows & detention |
| Steel | Steel coil transport basics; axle/GVW |
| Container | Container trucking India |
| Manufacturing / TMS | TMS evaluation; TMS beyond GPS; ePOD & e-Way Bill |
| Cross-vertical ops | Spot vs dedicated; empty returns; plant TAT; shipment planning |

Fill gaps with the §12 backlog — Month 1 prioritizes long-tail technical spokes (equipment, compliance, plant clocks) before broader commercial explainers.

---

## 3. On-page guidance (without stuffing)

**Protect**

- Brand H1s and dense logistics/industry body copy.
- FAQ blocks on industry pages (and report landings).
- Available / Beta / Research labels on Intelligence.

**Allowed, light body edits**

- Home lead may include “in India” once if missing — same sentence rhythm as today.
- Reciprocal “Also see” lines between container **service** and container **industry** (plain language).
- Blog CTA block: one clear link to the pillar.
- Report landings: expand public HTML to the 1,000–1,500 word crawlability bar (§2.A).

**Not allowed**

- Rewriting H1s into “Best Cement Logistics Company India 2026”.
- Sprinkling the same keyword into every H2.
- Thin “Mundra logistics” / “Nagpur freight” pages.
- Inflating coverage language for rankings.
- Gating report HTML behind email capture.

---

## 4. Cannibalization watchlist

| Pair | Resolution |
|------|------------|
| `/logistics` vs `/services` | Consolidate on `/logistics`; redirect `/services` |
| `/fleet` vs `/services` body classes | Fleet owns types |
| Container service vs container industry | Both stay; cluster-link; different primaries |
| Industry steel vs blog steel coil | Industry sells; blog teaches; cross-link |
| TMS page vs TMS evaluation blog | Product vs buyer guide |
| `/network` vs TranZfort | Hub vs app |
| Truck capacity vs Fleet | Sourcing vs catalog |
| Report HTML vs PDF | HTML ranks/cites; PDF is the gated asset |

---

## 5. Action plan

### P0 — Hygiene (do first)

1. Internal link sweep (`/tranzfort-network`, `/services`, leftover `/technology`).
2. Decide and implement `/services` → `/logistics` (301 + sitemap; **exclude** legacy paths from XML).
3. Meta pass for hubs in §2B (`page-seo.ts` and any matching leaf SEO).
4. **Report crawlability audit** — expand live `/reports/{slug}` HTML to §2.A bar; gate PDF only.
5. Confirm TranZfort + TMS redirects in production; GSC inspect money URLs after deploy (§15 checklist).

### P1 — Alignment, schema & clusters

6. Industry ↔ service reciprocal links on the eight pillars.
7. Blog CTA map: each live post → one primary pillar.
8. Implement / extend schema per §15; validate with Google Rich Results Test.
9. Expand thin logistics leaves only with **unique** FAQ / desk detail — not keyword blocks. Optional.
10. Wire GA4 + keep Search Console monitoring (see `SEO&Blog.md`).

### P2 — Authority cadence (next 3 months)

11. Publish **10–20 blogs** from §12 — **Wave 1 = long-tail technical first** (new-domain sandbox).
12. Publish **10+ reports** from §13 (crawlable HTML + gated PDF; methodology honesty; no invented India “official” stats).
13. After each publish: sitemap `lastmod`, internal links to pillar, GSC URL Inspection (and Indexing API where available) for flagship pieces.
14. Run **entity & off-page** workstream below in parallel with content.

### Entity & off-page authority foundations (new domain)

These support indexing confidence and brand entity clarity. They do **not** replace on-page principles and must not invent scale.

| Workstream | Guidance |
|------------|----------|
| **Google Business Profile (GBP)** | Claim/verify GBP for **Amravati HQ** (Old Town, Badnera). Categories: Logistics service / Transportation. Website → `https://zaftys.com`, phone and address matching site NAP. Optional: separate profiles only for **real operational desks** with distinct public addresses — never fake “city offices.” |
| **NAP consistency** | Exact same **Name, Address, Phone** as Contact / schema / footer across Indian B2B directories (Justdial, IndiaMART, Sulekha, etc. — only listings you will maintain). Legal name: ZAFTYS Logistics. |
| **Digital PR** | Use §13 research reports (public HTML summary + gated PDF) for press kits and outreach to Indian supply-chain / logistics / manufacturing trade media. Pitch findings and methodology — not “we are the largest.” |
| **Verified Partner Badging** | `/partner` onboarding for verified fleet owners: after verification, offer a simple badge/link back to `zaftys.com/partner` or Network (voluntary, accurate wording). Track as a **referral + backlink** path, not a paid link scheme. |
| **sameAs entity graph** | Keep Organization `sameAs` in sync with real profiles: LinkedIn, ZaubaCorp, Crunchbase, GBP URL, `tranzfort.com`, `app.zaftys.com` (§15). Add profiles only when they exist. |

### Explicitly out of scope

- Thin location / corridor doorway pages.
- Hindi microsite (unless a real product decision later).
- Comparison pages that claim superiority without evidence.
- Changing Own vs Network rules for SEO theatrics.
- Hiding report body copy behind lead forms.

---

## 6. Primary-intent checklist

Mark when **meta title** carries the intent and **internal links** reinforce it. Visible H1 need not match the meta string.

| Intent | URL | Meta | Links |
|--------|-----|------|-------|
| Cement logistics | `/industries/cement` | Strong | Reinforce cluster |
| Steel coil / metals | `/industries/steel-metals` | Strong | Reinforce cluster |
| Mining products | `/industries/coal-mining` | Strong | Add mining blogs |
| Port–city container | `/industries/container-transport` | Strong | Link service leaf |
| 3PL / FTL services | `/logistics` + leaves | Mostly strong | Fix `/services` |
| Fleet types | `/fleet` | Improve meta | Own body-class links |
| TMS India | `/zaftys-tms` | Add India in meta | Blog → TMS CTAs |
| Freight marketplace | `/network/tranzfort` | Add India in meta | Fix legacy path |
| Home commercial | `/` | Improve meta | Keep brand H1 |
| Report topics | `/reports/{slug}` | Unique title/desc | Crawlable HTML + PDF gate only |

---

## 7. Measurement

| Signal | Tool | Success look |
|--------|------|----------------|
| Impressions / CTR on pillars & hubs | GSC | CTR lift after meta; fewer duplicate-intent collisions |
| Long-tail blog indexing | GSC | Wave 1 technical posts indexed within days–weeks of publish |
| Report landings | GSC | `/reports/{slug}` indexed; queries on findings/methodology phrases |
| Query mix | GSC | Vertical + service queries landing on pillars/services, not random blog-only |
| Index hygiene | GSC | Legacy URLs 301; `/services` & `/tranzfort-network` absent from sitemap |
| Engagement | GA4 | Quote / WhatsApp / report unlock events by landing page |
| Authority | GSC + referrals | Report unlocks; PR/partner referral links; brand queries for ZAFTYS / TranZfort / TMS |
| Rich results | Rich Results Test | Valid FAQ / Article / SoftwareApplication where implemented |

Baseline GSC export for `/industries*`, `/logistics*`, `/zaftys-tms`, `/network/tranzfort`, `/blog*`, `/reports*` before the meta + redirect ship.

---

## 8. Implementation file map

| Work | Files / location |
|------|------------------|
| Hub meta | `src/lib/page-seo.ts` |
| Logistics leaf meta | `src/lib/solution-pages.ts` |
| Network / TMS / Intelligence meta | `*-leaf-copy.ts` |
| Industry meta (only if needed) | `src/lib/industries-data.ts` |
| Link sweep | Blog layouts, `NotFound.tsx`, `Services.tsx`, `Network.tsx`, `Blog.tsx`, constants/CTAs |
| `/services` + legacy redirects | Hosting redirects + `scripts/generate-sitemap.mjs` (**exclude** 301 sources from XML) |
| New blogs | `src/lib/blog-data.ts` (+ layouts as needed) |
| New reports + crawlable HTML | `src/lib/market-reports-data.ts`, report page components, PDF pipeline |
| **Schema helpers (source of truth)** | `src/lib/schema.ts` — extend builders here |
| **Schema injection** | `src/components/SEO.tsx` (`schema` prop) and/or `src/components/seo/Schema.tsx` if extracted; page-level calls from hubs/leaves |
| Organization / LocalBusiness `sameAs` | `src/lib/schema.ts` + constants for profile URLs |
| LogisticsService per leaf | Emit from `/logistics/*` pages using leaf title/description |
| SoftwareApplication | `/zaftys-tms` (+ module leaves if feature-specific) |
| FAQPage | `/industries/*`, report landings with FAQ, TMS FAQ where present |
| Article / TechArticle | `/blog/*`, `/reports/*` |
| Copy inventory | Refresh Meta lines in `docs/content.md` after SEO ship |
| Launch checklist | §15 |

---

## 9. Stakeholder summary

**We will**

1. Consolidate URL intent (`/services` out; TranZfort path clean).  
2. Improve **metadata** and **schema** while keeping natural on-page voice.  
3. Keep report **HTML crawlable** (PDF gated only) and build industry-centered clusters.  
4. Use **long-tail blogs first**, then broader posts + **10+ reports**, plus GBP/NAP/PR/partner links for a new domain.  
5. Measure in Search Console and iterate from real queries.

**We will not**

keyword-stuff visible copy, publish thin location pages, invent coverage/scale claims, or hide report bodies behind forms.

---

## 10. Already published (do not duplicate)

**Blogs live today**

- TMS Beyond GPS; TMS Evaluation Guide (manufacturers 2026)  
- Steel coil transport basics; Cement plant loading windows  
- Planning industrial shipments; Reduce empty return trips  
- India axle load & GVW; Spot vs dedicated fleet  
- Plant detention & TAT; ePOD / FASTag / e-Way Bill  
- Container trucking India (ports, chassis, backhaul)

**Reports live today**

- Global Logistics Market Size, Share & Forecast 2027–2036  
- Digital Freight Matching Market Size & Forecast 2027–2036  

*(Both must pass §2.A crawlability before heavy PR push.)*

---

## 12. Future blog topics (next 3 months) — target 15–20

Publish for a **new-domain sandbox**: Wave 1 = hyper-specific long-tail (equipment, compliance, plant clocks) so pages can index and rank with low authority. Broader commercial explainers move to Waves 2–3. Each row names the **pillar** it supports. Titles are working titles — keep ZAFTYS desk voice in the final draft; put sharper phrases in `seoTitle` only.

### Wave 1 — Long-tail technical (Month 1, ~7) — new domain priority

| # | Working title | Pillar / cluster | Why first |
|---|---------------|------------------|-----------|
| 1 | Mill gate papers for coil dispatch: what delays allotment | Steel | Niche mill-ops query; low competition |
| 2 | Chemical tanker freight: wash, MSDS, and why class comes before rate | Chemicals | Compliance long-tail; opens chemicals cluster |
| 3 | 32 ft vs 40 ft on Indian roads: choosing sealed container capacity | Container (industry + service) | Equipment-spec query |
| 4 | Bulk cement and fly ash: when you need a pneumatic bulker | Cement | Body-class / equipment specificity |
| 5 | Document expiry and the weighbridge: fleet records that matter | TMS / Fleet management | Compliance + product adjacency |
| 6 | Port free time vs plant free time: two clocks on one container trip | Container | Niche dual-clock TAT query |
| 7 | Open body vs tipper for bagged cement and aggregates | Cement | Equipment comparison long-tail |

### Wave 2 — Cluster expansion & product literacy (Month 2, ~6–7)

| # | Working title | Pillar / cluster | Intent |
|---|---------------|------------------|--------|
| 8 | Tipper programs for coal, ore, and limestone — one desk, many minerals | Mining | Multi-mineral spoke (broader than Wave 1 specs) |
| 9 | Factory-to-DC OTIF: what FMCG shippers should ask a transporter | FMCG | Commercial spoke for FMCG pillar |
| 10 | Contract logistics vs spot FTL: how plant teams should decide | Contract / Dedicated + Manufacturing | Mid-intent bridge |
| 11 | What “labeled network capacity” means on a live trip | Network / Fleet | Trust + Own vs Network education |
| 12 | How TranZfort matching works — free to post, fee on booking | TranZfort | Marketplace literacy → `/network/tranzfort` |
| 13 | ePOD that closes billing: from gate-out to settlement | TMS | Complements ePOD post → `/zaftys-tms` |
| 14 | Reading a live map without calling the control room | TMS / Tracking | Visibility education |

### Wave 3 — Depth, trust & differentiation (Month 3, ~5–6)

| # | Working title | Pillar / cluster | Intent |
|---|---------------|------------------|--------|
| 15 | Inter-plant WIP moves: FTL that follows the shift gate | Manufacturing | Deepens manufacturing pillar |
| 16 | Shutdown and turnaround freight: reserving capacity before the outage week | Industrial logistics | Pillar spoke |
| 17 | How Amravati desks run pan-corridor trips without fake “fleet size” claims | About / Trust | E-E-A-T; brand |
| 18 | GST billing on contracted trips: what shippers should see on the invoice | Cross-vertical / TMS | Commercial trust |
| 19 | Partner onboarding: RC, insurance, and corridor fit before the first load | Partner / Network | Supply-side SEO + badge narrative |
| 20 | When analytics help — and when WhatsApp still lies about the lane | Intelligence / Analytics | Honest product education |

**Editorial rules for all new blogs**

- One primary commercial link (industry or logistics or TMS).  
- No duplicate of an industry `seoH1`.  
- No city doorway framing (“Best transporter in Surat”). Corridors may appear as **examples inside** the article when they are real.  
- Prefer operations truth over listicle filler.  
- Ship `Article` / `TechArticle` schema on publish (§15).

---

## 13. Future report topics (next 3 months) — target 10+

Institutional tone. **PDF unlock with company email; HTML landing fully public.** Each report must satisfy §2.A (1,000–1,500 words crawlable: Executive Summary, Key Findings, Methodology, Data Highlights, FAQ). Soft-CTA into Market Intelligence + one operational pillar. **Do not** invent India market sizes; use stated methodology, ranges, and sources.

> **Only the downloadable PDF file is gated behind the lead form; the HTML page itself must be 100% crawlable by Googlebot.**

### Core slate (10)

| # | Working title | Cluster support | Notes |
|---|---------------|-----------------|-------|
| 1 | India Road Freight & FTL Outlook 2027–2036 | Logistics hub, Manufacturing | India-first companion to global logistics report |
| 2 | India Cement Logistics & Bulk Movement Outlook | Cement pillar | Bulker/tipper, plant TAT themes |
| 3 | India Steel & Coil Road Transport Outlook | Steel pillar | Flatbed/side-wall, mill windows |
| 4 | India Port–Inland Container Road Haulage Outlook | Container pillar | Port–city / ICD road legs — not ocean freight redo |
| 5 | India Mining & Bulk Tipper Logistics Outlook | Mining pillar | Multi-mineral tipper programs |
| 6 | Transport Management Systems in India: Adoption & Buyer Criteria | TMS | Complements evaluation blog; vendor-neutral framing where possible |
| 7 | Digital Freight Matching in India: Corridor Reality Check | TranZfort / DFM | India cut of DFM; honest limits |
| 8 | Contract vs Spot Capacity in Indian Industrial Freight | Contract / Dedicated | Procurement decision support |
| 9 | Plant Detention, Yard TAT & Cost-to-Serve in Indian FTL | Cross-industry ops | Ties blogs on detention/TAT into a research PDF |
| 10 | ePOD, e-Way Bill & Digitized Trip Close-Out in India | TMS / Compliance | Regulatory + ops research |

### Stretch (+2–4 if capacity allows)

| # | Working title | Cluster support |
|---|---------------|-----------------|
| 11 | India Chemical Road Logistics: Tanker Class & Compliance | Chemicals |
| 12 | FMCG Factory-to-DC Freight Networks in India | FMCG |
| 13 | Empty Kilometres & Backhaul Economics on Indian Highways | Network / empty-returns blog |
| 14 | Industrial Corridor Freight: West–East / North–South Road Patterns | Industrial logistics (patterns you already name — not thin city pages) |

**Report rules**

- Same quality bar as the two live global reports (ToC, methodology, unlock flow) **plus** §2.A HTML depth.  
- India reports must state data limits clearly.  
- KPI strips on the HTML page only with defensible figures (same figures may appear in PDF).  
- Cluster link to the matching industry or product pillar — reports do not replace pillars.  
- Emit `Article`/`TechArticle` + `FAQPage` on the landing (§15).  
- First two PR-ready reports must pass crawlability + Rich Results checks before media outreach.

---

## 14. 3-month content calendar sketch

| Month | Blogs | Reports | SEO hygiene |
|-------|-------|---------|-------------|
| Month 1 | **Wave 1 long-tail technical** (mill papers, tanker MSDS, 32/40 ft, bulker, doc expiry, port vs plant free time, open vs tipper) | Remodel live report HTML to §2.A; start #1 India FTL + #2 Cement or #3 Steel | P0 redirects + meta + schema pass + GBP/NAP |
| Month 2 | Wave 2 (mining, FMCG, contract/spot, network, TranZfort, TMS visibility) | #4 Container, #5 Mining, #6 TMS adoption — crawlable HTML each | Cluster links; partner badge pilot; PR on first remodelled reports |
| Month 3 | Wave 3 (manufacturing WIP, industrial shutdown, trust, GST, partner, analytics) | #7–#10 (+ stretch if ready) | GSC query review → adjust next quarter topics |

Rough throughput: **~5–7 blogs/month** and **~3–4 reports/month** hits the 15–20 / 10+ targets without thin filler. New-domain bias: **specificity before breadth**.

---

## 15. Schema map, entity foundations & new-domain launch checklist

### 15.1 Schema & structured data map

Implement via builders in `src/lib/schema.ts` and inject through `SEO` / optional `src/components/seo/Schema.tsx`. Validate with **Google Rich Results Test** before launch communications.

| Schema type | Where | Spec notes |
|-------------|-------|------------|
| **Organization** | Site-wide (Home minimum; prefer shared layout) | `@id` stable (`https://zaftys.com/#organization`). `sameAs`: LinkedIn, ZaubaCorp, Crunchbase, Google Business Profile URL, `https://tranzfort.com`, `https://app.zaftys.com` — **only URLs that exist**. |
| **LocalBusiness** | Home + **Contact** | Amravati NAP must match footer/GBP. `@id` `https://zaftys.com/#localbusiness`. `parentOrganization` → Organization `@id`. |
| **WebSite** | Home | `inLanguage`: `en-IN`. Publisher → Organization. |
| **LogisticsService** | Each `/logistics/*` **leaf** (and hub if useful) | Unique `name`, `description`, `url`, `serviceType` per leaf; `provider` → Organization; `areaServed` India. No fake aggregate ratings. |
| **SoftwareApplication** | `/zaftys-tms` | `applicationCategory`: `BusinessApplication` (or `https://schema.org/BusinessApplication`). `operatingSystem`: e.g. `Web, Android, iOS` as honestly supported. Feature list from live modules (dispatch, GPS, ePOD, fleet records, portal). `offers` = contact/demo — **no** fake `price: 0` as “free TMS.” `url` + `installUrl` → app.zaftys.com. |
| **FAQPage** | All `/industries/*` pillars with FAQ; report landings with FAQ; TMS FAQ if present | Questions/answers must match visible HTML. |
| **Article** or **TechArticle** | All `/blog/*` and `/reports/*` | `headline`, `datePublished`, `dateModified`, `author`/`publisher` → Organization, `mainEntityOfPage` / `url`, `description`. Prefer **TechArticle** for deep-research / methodology-heavy pieces. |
| **BreadcrumbList** | Pillars, leaves, blogs, reports | Already partially shipped — keep consistent. |

**Do not**

- Add `AggregateRating` without real reviews.
- Mark Available/Beta/Research modules as separate products with invented offers.
- Duplicate conflicting Organization nodes on one page.

### 15.2 Entity & off-page (quick reference)

See §5 “Entity & off-page authority foundations.” Launch-critical items are checked below.

### 15.3 New domain acceleration & launch checklist

Dev + marketing joint list for rewamp go-live and first authority push:

- [ ] **Gated report HTML crawlability verified** — each `/reports/{slug}` exposes 1,000–1,500 words (Summary, Findings, Methodology, Highlights, FAQ); **only PDF** behind the lead form; Googlebot can fetch full HTML without submitting the form.
- [ ] **Schema markup validated** via Google Rich Results Test (Organization, LocalBusiness, LogisticsService on a sample leaf, SoftwareApplication on TMS, FAQPage on an industry pillar, Article/TechArticle on a blog + a report).
- [ ] **Google Business Profile & NAP citations aligned** — Amravati HQ GBP live/verified; Name / Address / Phone match Contact, footer, and schema; directory citations use the same NAP.
- [ ] **Clean XML sitemap generated** — includes canonical hubs, pillars, blogs, report **HTML** URLs; **strictly excludes** 301 sources (`/services`, `/tranzfort-network`, legacy `/technology*` if redirected) and `noindex` routes (`/login`, thin readers).
- [ ] **Manual GSC URL Inspection & Indexing API requests** on launch day for core pillars: `/`, `/logistics`, key `/logistics/*`, `/industries` + priority verticals, `/zaftys-tms`, `/network/tranzfort`, top blogs, remodeled report landings.
- [ ] **Digital PR distribution ready** for the first **2** research reports (crawlability + schema passed; press one-pager; target Indian supply-chain / logistics media list).
- [ ] Internal links swept (no `/services` or `/tranzfort-network` left in UI).
- [ ] Partner badge / referral link path documented for verified fleet owners (`/partner`).
- [ ] Organization `sameAs` updated only with real profile URLs (LinkedIn, ZaubaCorp, Crunchbase, GBP).

---

*Updated 22 Aug 2026 — brand-safe SEO priorities, report crawlability, schema map, new-domain acceleration, and 3-month blog/report backlog (Wave 1 long-tail first). Revise §12–13 when topics ship or GSC queries suggest a better cluster order.*
