# ZAFTYS Website Rewrap — Implementation Plan

| Field | Value |
|-------|-------|
| **Branch** | `rewamp-20-8-26` |
| **Started** | 20 Aug 2026 |
| **Status** | Phase 1 in progress · **Header nav locked** (20 Aug 2026) |
| **Deploy** | Do not deploy until Phase 1 QA complete |
| **Strategy source** | `ZAFTYS-Marketing-Website-Copy-Improvement.md` (Aug 2026) |

---

## 1. Purpose

Reposition the ZAFTYS marketing website from **“three equal products”** (transport + TMS + marketplace) to a **technology-enabled transportation and logistics company** with a clear brand architecture:

```text
ZAFTYS
├── LOGISTICS      — we move freight (primary)
├── PLATFORM       — TMS, Tranzfort, operational tools (header label)
├── INTELLIGENCE   — analytics and AI (secondary; flat header link)
└── INDUSTRIES     — who we serve (flat header link)
```

**Site URLs** still use `/network/*` and `/technology/*` paths. **Header nav** groups these under **Platform** and keeps **Intelligence** separate (not under Platform).

**Core message:** Real trucks. Real logistics. Real technology.

**Primary CTA:** Request Transportation  
**Secondary CTAs:** Book a TMS Demo · Join TranZfort · Explore Intelligence

---

## 2. Positioning rules (non-negotiable)

| Rule | Detail |
|------|--------|
| Logistics first | Homepage and nav lead with transportation execution, not software |
| Technology is credible because we operate | TMS copy references real dispatch, not generic SaaS |
| Tranzfort is a network, not the brand | “Digital freight network” before “marketplace” |
| Intelligence is separate from Platform | Execution software (TMS, Tranzfort) ≠ data/AI; do not bury Intelligence under Platform |
| Intelligence is flat in header | No Intelligence dropdown; modules live as sections on `/intelligence` |
| No “Overview” submenu rows | Parent dropdown label links to hub page instead |
| Partner under Company | Become a Partner lives in Company menu, not Platform |
| Verified proof only | No invented metrics, partner logos, or AI claims without labels |
| Separate owned fleet vs partner network | Never present third-party capacity as owned fleet |
| Copy governance | Every claim must pass: true, specific, useful, differentiated, measurable |

---

## 3. Target information architecture

### 3.1 Locked header navigation ✅

**Status:** Locked 20 Aug 2026. Source of truth: `src/lib/nav-config.ts` → `headerNav`.

```text
[Logo]  Logistics ▾  Platform ▾  Intelligence  Industries  Company ▾  Resources ▾  [Login]  [Request Transportation]
```

**Counts:** 6 top-level labels · 4 dropdowns · 2 flat links · **12 submenu items** · 2 header actions

#### Dropdown menus

| Menu | Hub (parent label click) | Sub-items |
|------|--------------------------|-----------|
| **Logistics** | `/logistics` | **Transportation** · **Our Fleet** |
| **Platform** | `/technology` | ZAFTYS TMS · Tranzfort · Tracking & Visibility · Fleet Management |
| **Company** | `/about` | About · Contact · Careers · Become a Partner |
| **Resources** | `/resources` | Blog · Market Reports |

#### Flat links (no dropdown)

| Label | Route | Notes |
|-------|-------|-------|
| **Intelligence** | `/intelligence` | Hub page with four on-page sections (not header submenu) |
| **Industries** | `/industries` | Hub lists all verticals; no industry slugs in header |

#### Header nav rules (do not change without review)

1. **No “Overview”** (or “All …”) rows in any dropdown.
2. **No Intelligence submenu** — modules are sections on `/intelligence`; deep links in footer and SEO only.
3. **No “All Resources”** in Resources dropdown.
4. **No industry verticals** in header — Industries is one link.
5. **Partner** only under Company, not Platform.
6. **Platform** includes Tranzfort (`/network/tranzfort`) even though URL lives under `/network/`.
7. **Logistics submenu is Transportation + Our Fleet only** — 3PL, contract, dedicated, industrial, and container are **sections on `/logistics`**. Leaf URLs remain for SEO and footer.
8. **Logistics APIs** is not in header — footer Platform column only.

#### Why Intelligence stays top-level (not under Platform)

| Platform | Intelligence |
|----------|----------------|
| Run operations (TMS, dispatch, Tranzfort) | Understand data (analytics, rates, research, AI) |
| Buyer: ops / IT / fleet manager | Buyer: analyst / leadership / enterprise |
| Product-led | Secondary / emerging |

Intelligence remains a **strategic pillar** in brand architecture but a **flat link** in nav because modules are early-stage (Beta / Research labels on hub).

#### Mobile header

Same structure. Dropdown sections accordion open; flat links (Intelligence, Industries) are single taps. Parent label on mobile links to hub; chevron expands submenu.

---

### 3.2 Footer navigation

Footer is deeper than header. Source: `footerColumns` in `src/lib/nav-config.ts`.

| Column | Links |
|--------|-------|
| **Logistics** | Transportation · Our Fleet · Contract · Industrial · Container |
| **Platform** | TMS · Tranzfort · Tracking · Fleet Management · APIs · Login |
| **Intelligence** | Analytics · Freight Rate Intelligence · Market Intelligence · Supply Chain AI |
| **Company** | About · Industries · Contact · Careers · Become a Partner |
| **Resources** | Blog · Market Reports |

---

### 3.3 Full sitemap

```text
zaftys.com
├── /                                    Home (rewritten)
│
├── LOGISTICS
│   ├── /logistics                       Logistics hub
│   ├── /logistics/3pl-transportation    3PL Transportation
│   ├── /logistics/contract-logistics    Contract Logistics
│   ├── /logistics/dedicated-fleet       Dedicated Fleet
│   ├── /logistics/industrial-freight    Industrial Freight
│   ├── /logistics/container-transportation   Container & Port
│   └── /fleet                           Own fleet (proof page, linked from Logistics)
│
├── NETWORK
│   ├── /network                         Network hub
│   ├── /network/tranzfort               Tranzfort (digital freight network)
│   ├── /network/transporter-network     Transporter / partner network
│   └── /network/truck-capacity          Truck capacity sourcing
│
├── TECHNOLOGY
│   ├── /technology                      Technology hub
│   ├── /technology/zaftys-tms           ZAFTYS TMS (primary product page)
│   ├── /technology/fleet-management     Fleet management module
│   ├── /technology/tracking             Tracking & visibility
│   └── /technology/apis                 Logistics APIs
│
├── INTELLIGENCE
│   ├── /intelligence                    Intelligence hub
│   ├── /intelligence/analytics          ZAFTYS Analytics
│   ├── /intelligence/freight-rates       Freight rate intelligence
│   ├── /intelligence/market-intelligence Market intelligence
│   └── /intelligence/ai                 Supply chain AI
│
├── INDUSTRIES
│   ├── /industries                      Industries hub
│   ├── /industries/steel
│   ├── /industries/cement
│   ├── /industries/coal-mining          (mining)
│   ├── /industries/manufacturing
│   ├── /industries/chemicals            (construction-adjacent)
│   └── /industries/:slug                (existing detail pages retained)
│
├── COMPANY
│   ├── /about
│   ├── /contact
│   ├── /careers
│   └── /partner                         (Company menu → Become a Partner)
│
├── RESOURCES
│   ├── /blog
│   ├── /reports
│   └── /resources
│
├── SYSTEM
│   ├── /login
│   ├── /privacy, /terms, /cookies, /legal-notice
│   └── 404
│
└── REDIRECTS (301)
    ├── /services              → /logistics
    ├── /tranzfort-network     → /network/tranzfort
    ├── /zaftys-tms            → /technology/zaftys-tms
    ├── /platform              → /technology/zaftys-tms
    └── /technology            → /technology (hub, not TMS leaf)
```

---

## 4. Page specifications

### 4.1 Homepage (`/`)

**Goal:** Answer within first screen: What is ZAFTYS? Who is it for? Do you actually haul?

**Section count:** 6 (revised 20 Aug 2026 — home is a scroll summary, not a full sitemap)

**Sequence source of truth:** `src/lib/home-sections.ts` · Copy: `src/lib/home-copy.ts` · Components: `src/components/home/*`

| # | Section ID | Content direction |
|---|------------|-------------------|
| 01 | `hero` | WHAT + PROOF — H1 + tagline + trust strip |
| 02 | `operating-model` | HOW — operator identity (fleet + contract + network) |
| 03 | `platform` | TOOLS — TMS + Tranzfort immediately after operating model |
| 04 | `industries` | WHO — verticals where model + platform apply |
| 05 | `insights` | KNOW — Intelligence links + embedded report/blog carousels |
| 06 | `final-cta` | ACT — Request Transportation |

**Hero tertiary CTA:** How we operate → `#operating-model` (not TMS-first).

**Removed from home (lives on hub pages):** Heritage block → `/about` · Dedicated Fleet card → `/logistics` · 4 secondary industries → `/industries` · Full-width separate TMS/Tranzfort/Intelligence sections

**Remove:** “Three products. One GST-compliant company.” as hero story.  
**Remove:** “Post a load for free” from H1.

---

### 4.2 Logistics hub (`/logistics`)

**Layout locked (20 Aug 2026):** Design A — full-width image head + equal 50/50 content cards per service.

**Page shape:**
1. Hero  
2. Services index (jump to 01–05)  
3. Compact capacity strip (Owned · Contract · Network)  
4. Five service sections (locked) — order: Container → 3PL → Industrial → Contract → Dedicated  
5. Short industries strip  
6. Final CTA  

**Removed:** full “How we move” pillars · full “Capacity clarity” section · layout-lab prototype.  
**CTA:** Request Transportation

---

### 4.3 Logistics leaf pages

| Route | Hero | Primary CTA |
|-------|------|-------------|
| `/logistics/3pl-transportation` | Reliable transportation capacity for demanding freight | Request Transportation |
| `/logistics/contract-logistics` | Dedicated transportation for recurring freight | Discuss Your Contract Requirement |
| `/logistics/dedicated-fleet` | Assigned capacity on corridors you run every week | Discuss Your Contract Requirement |
| `/logistics/industrial-freight` | Heavy freight for plants, mills, and project cargo | Request Transportation |
| `/logistics/container-transportation` | Connecting ports, markets, and cities | Request Container Capacity |

Each leaf page follows messaging hierarchy:
1. What we do → 2. Who we serve → 3. Problem → 4. How we solve → 5. Proof → 6. Technology → 7. CTA

---

### 4.4 Network hub and pages

| Route | Positioning | CTA |
|-------|-------------|-----|
| `/network` | ZAFTYS operates transportation. Tranzfort connects the broader network. | Explore network |
| `/network/tranzfort` | Digital freight network (migrate current Network page) | Join the Network |
| `/network/transporter-network` | Verified carriers and partner capacity | Register as Transport Partner |
| `/network/truck-capacity` | Source owned or third-party capacity | Request Transportation |

**Copy rule:** Lead with “digital freight network”, not “marketplace”.

---

### 4.5 Technology hub and pages

| Route | Content | CTA |
|-------|---------|-----|
| `/technology` | Overview of TMS stack and workflow graphic | Book a TMS Demo |
| `/technology/zaftys-tms` | Full TMS page (migrate current Technology.tsx) | Book a TMS Demo |
| `/technology/fleet-management` | Fleet registry, maintenance, documents | Book a TMS Demo |
| `/technology/tracking` | GPS, ETAs, shipper portal | Book a TMS Demo |
| `/technology/apis` | Integrations (only advertise implemented APIs) | Talk to ZAFTYS |

**Workflow graphic:**
```text
ORDER → LOAD PLANNING → CAPACITY SOURCING → VEHICLE ALLOCATION → DISPATCH → TRACKING → DELIVERY → POD → BILLING → ANALYTICS
```

---

### 4.6 Intelligence hub (`/intelligence`) — locked pattern

**Header:** flat link only — no submenu.

**Hub page:** four on-page sections (not nav dropdown items):

| Section | Status badge | Deep link (footer / in-page CTA) |
|---------|--------------|----------------------------------|
| ZAFTYS Analytics | Available | `/intelligence/analytics` |
| Freight Rate Intelligence | Beta | `/intelligence/freight-rates` |
| Market Intelligence | Available | `/reports` (primary CTA) · `/intelligence/market-intelligence` |
| Supply Chain AI | Research | `/intelligence/ai` |

Each section includes: lead copy, bullet points, status badge, CTA button.

**Rule:** Do not add Intelligence submenu to header unless two+ modules have live product UI and distinct enterprise buyers.

Leaf pages remain for SEO. Footer Intelligence column lists all four modules.

---

### 4.7 Industries

**Header:** flat link → `/industries` only.

**Hub page:** industry tiles for all verticals. No industry slugs in header nav.

**Existing slugs:** `cement`, `container-transport`, `steel-metals`, `coal-mining`, `manufacturing`, `chemicals`, `fmcg`, `industrial-logistics` (retail distribution removed — not in scope; old URLs redirect to FMCG)

Update hub copy: remove “same three products” language.

---

## 5. Implementation phases

### Phase 0 — Foundation ✅ (this branch)

- [x] Create `docs/rewamp.md`
- [x] Create branch `rewamp-20-8-26`
- [x] `src/lib/site-paths.ts` — canonical paths
- [x] `src/lib/nav-config.ts` — nav tree for header + footer
- [x] `src/lib/page-seo.ts` — SEO for hub routes
- [x] `src/lib/page-hero-copy.ts` — hero copy for hub routes
- [x] `src/lib/constants.ts` — home sections, trust strip
- [x] `src/lib/solution-pages.ts` — leaf page content

### Phase 1 — Structure + homepage ✅ (initial pass)

- [x] `src/App.tsx` — routes + redirects
- [x] `src/components/Navigation.tsx` — locked header nav from `headerNav`
- [x] Header nav locked: Logistics · Platform · Intelligence (flat) · Industries (flat) · Company · Resources
- [x] Intelligence hub — section-based layout (no header submenu)
- [x] Removed “All Resources” from Resources dropdown
- [x] `src/components/Footer.tsx` — new column structure
- [x] `src/pages/Home.tsx` — full rewrite
- [x] `src/pages/logistics/LogisticsHub.tsx` — logistics hub
- [x] `src/pages/logistics/LogisticsSolutions.tsx` — 5 leaf pages
- [x] `src/pages/network/NetworkHub.tsx` — network hub
- [x] `src/pages/network/NetworkSolutions.tsx` — 2 leaf pages (+ Tranzfort via Network.tsx)
- [x] `src/pages/technology/TechnologyHub.tsx` — technology hub
- [x] `src/pages/technology/TechnologySolutions.tsx` — 3 leaf pages (+ TMS via Technology.tsx)
- [x] `src/pages/intelligence/IntelligenceHub.tsx` — intelligence hub
- [x] `src/pages/intelligence/IntelligenceSolutions.tsx` — 4 leaf pages
- [x] `src/components/SolutionPageLayout.tsx` — shared leaf page shell
- [x] Redirects: `/services`, `/tranzfort-network`, `/zaftys-tms`
- [x] `scripts/generate-sitemap.mjs` — new URL inventory

### Phase 2 — Content depth

- [ ] Rewrite `/about` — “Built from transportation. Built for what’s next.”
- [ ] Rewrite `/fleet` — owned fleet proof with photos
- [ ] Rewrite `/industries` hub — remove three-product framing
- [ ] Update industry detail pages — logistics-first copy pass
- [ ] `/partner` — align with transporter network page
- [ ] Customer/partner logos (with permission)
- [ ] Case study template + first case study
- [ ] Verified proof bar numbers (internal sign-off)

### Phase 3 — SEO + polish

- [ ] JSON-LD schema for new routes
- [ ] `public/sitemap.xml` — all new URLs
- [ ] `vercel.json` / redirects for production
- [ ] Prerender or SSG for marketing routes (CSR SEO gap)
- [ ] Internal linking audit
- [ ] Mobile nav QA (mega-menu on small screens)
- [ ] Analytics event names for new CTAs
- [ ] Refresh `docs/copy.md` snapshot after approval

### Phase 4 — Deferred

- [ ] `/resources` knowledge center expansion
- [ ] Dedicated `/company/fleet` if split from `/fleet`
- [ ] Hindi/regional landing pages
- [ ] Login hard-redirect to app.zaftys.com

---

## 6. File change map

| File | Action |
|------|--------|
| `docs/rewamp.md` | Created — this document |
| `src/lib/site-paths.ts` | Expand with all canonical paths |
| `src/lib/nav-config.ts` | **`headerNav`** (locked header) + **`footerColumns`** |
| `src/lib/page-seo.ts` | Add entries for all new routes |
| `src/lib/page-hero-copy.ts` | Add hero copy for all new routes |
| `src/lib/constants.ts` | Rewrite homeProducts, homeTrustStrip |
| `src/lib/hero-ctas.ts` | Add section-specific mail subjects/bodies |
| `src/App.tsx` | New routes + legacy redirects |
| `src/components/Navigation.tsx` | Renders `headerNav` — dropdowns + flat links |
| `src/components/Footer.tsx` | Five-column footer from `footerColumns` |
| `src/components/SolutionPageLayout.tsx` | **New** — reusable leaf page |
| `src/pages/Home.tsx` | Full rewrite |
| `src/pages/logistics/*.tsx` | **New** — hub + 5 leaves |
| `src/pages/network/*.tsx` | **New** — hub + leaves; migrate Network.tsx |
| `src/pages/technology/*.tsx` | **New** — hub + leaves; migrate Technology.tsx |
| `src/pages/intelligence/IntelligenceHub.tsx` | Hub with four on-page sections (locked pattern) |
| `src/pages/intelligence/IntelligenceSolutions.tsx` | Leaf pages (footer / SEO deep links) |
| `src/pages/Services.tsx` | Keep temporarily; redirect to /logistics |
| `public/sitemap.xml` | Update in Phase 3 |

---

## 7. CTA matrix

| Audience | Page type | Primary CTA | Channel |
|----------|-----------|-------------|---------|
| Shippers | Logistics | Request Transportation | WhatsApp / mailto |
| Contract buyers | Contract / Dedicated | Discuss Your Contract Requirement | mailto |
| Container shippers | Container | Request Container Capacity | WhatsApp |
| LSPs / transporters | Company → Become a Partner | Partner form |
| Transporters | Tranzfort | Join the Network | tranzfort.com |
| Enterprises | Technology / TMS | Book a TMS Demo | mailto / contact |
| Analysts | Intelligence | Explore Logistics Intelligence | reports / mailto |

---

## 8. Copy snippets (locked for Phase 1)

### Homepage hero
- **H1:** Heavy Freight. Reliable Capacity. Managed by Technology.
- **Lead:** ZAFTYS provides 3PL transportation and contract logistics for industrial and commercial freight, combining owned heavy-vehicle capacity with a verified transportation network and modern logistics technology.
- **Tagline:** Real Trucks. Real Logistics. Real Technology.

### Brand one-liner
> ZAFTYS provides technology-enabled 3PL transportation and contract logistics, combining owned heavy-vehicle capacity, a verified transportation network, and intelligent technology to help businesses move freight with greater reliability, visibility, and control.

### Tranzfort relationship line
> ZAFTYS operates transportation. Tranzfort connects the broader transportation network.

---

## 9. Proof checklist (before publish)

Internal team must verify and sign off:

- [ ] Owned vehicle count and vehicle classes
- [ ] States / freight corridors actually served
- [ ] Verified partner / carrier count
- [ ] CJ DARCL / DP World — permission to name and exact relationship term
- [ ] TMS features marked live vs coming soon
- [ ] AI capabilities labeled Available / Beta / Research / Coming Soon
- [ ] Fleet photographs are ZAFTYS assets
- [ ] No competitor metrics copied

---

## 10. QA checklist (before merge to main)

- [ ] All legacy URLs redirect correctly
- [ ] No broken internal links in nav/footer
- [ ] Mobile hamburger shows all sections
- [ ] Each page has unique title + meta description
- [ ] Each page has one H1 matching hero
- [ ] WhatsApp + mailto CTAs fire analytics events
- [ ] Login link still works
- [ ] Blog and reports unaffected
- [ ] Legal pages unaffected
- [ ] `npm run build` passes
- [ ] Lighthouse spot-check on Home + Logistics hub
- [ ] **Do not deploy** until stakeholder copy review

---

## 11. Related documents

| Document | Purpose |
|----------|---------|
| `ZAFTYS-Marketing-Website-Copy-Improvement.md` | Strategy and positioning blueprint |
| `docs/marketing-website-sitemap-new.md` | Previous sitemap (superseded by this doc) |
| `docs/copy-v2-index.md` | Old copy drafts — **do not use as source** |
| `docs/copy.md` | Live site snapshot — refresh after Phase 1 |

---

## 12. Progress log

| Date | Branch | Done |
|------|--------|------|
| 20 Aug 2026 | `rewamp-20-8-26` | Plan doc, branch, nav IA, 4 hubs, 16 leaf pages, Home rewrite, redirects, sitemap |
| 20 Aug 2026 | `rewamp-20-8-26` | **Header nav locked** — Logistics / Platform / Intelligence (flat) / Industries (flat) / Company / Resources |
| 20 Aug 2026 | `rewamp-20-8-26` | **Logistics IA** — submenu Transportation + Our Fleet; `/logistics` thick Transportation page with service sections |
| 20 Aug 2026 | `rewamp-20-8-26` | **Logistics layout locked** — Design A service sections; slim page to Hero → Index → Capacity strip → Services → Industries → CTA |
