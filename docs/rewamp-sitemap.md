# ZAFTYS Website — Comprehensive Page & Section Sitemap

| Field | Value |
|-------|-------|
| **Companion doc** | [`rewamp.md`](./rewamp.md) — IA, phases, positioning rules |
| **Branch** | `rewamp-20-8-26` |
| **Created** | 20 Aug 2026 |
| **Purpose** | Authoritative section-by-section spec for every public page: meta, H1, H2s, copy direction, image placeholders, CTAs, internal links |
| **Source of truth (code)** | `src/lib/site-paths.ts`, `src/lib/nav-config.ts`, `src/lib/page-seo.ts`, `src/lib/page-hero-copy.ts`, `src/lib/solution-pages.ts` |

---

## How to read this document

Each page entry uses the same fields:

| Field | Meaning |
|-------|---------|
| **Route** | Canonical URL path |
| **Status** | `Shipped` (live on branch) · `Partial` (exists, copy/links need Phase 2 pass) · `Target` (spec only) |
| **Nav** | Where the page appears: Header dropdown, flat link, footer only, or none |
| **Meta title** | `<title>` before brand suffix where applicable |
| **Meta description** | `<meta name="description">` |
| **Goal** | One-line page objective |

**Section block fields:**

| Field | Meaning |
|-------|---------|
| **H2 / H3** | Visible heading text |
| **Overview** | Paragraph direction for body copy |
| **Image** | Placeholder path or asset reference; alt text |
| **CTA** | Primary and secondary actions with labels and destinations |
| **Links** | Internal cross-links from this section |

**Image placeholder convention:**

```text
/images/marketing/{page}-{section}.jpg   — new marketing photography
/src/assets/hero-{name}.jpg              — existing bundled hero assets
[PLACEHOLDER: description]               — asset not yet created
```

**CTA types (site-wide):**

| Label | Action |
|-------|--------|
| Request Transportation | Email prefill → freight quote |
| Discuss Your Contract Requirement | Email prefill → contract inquiry |
| Request Container Capacity | Email prefill → container inquiry |
| Book a TMS Demo | Email prefill → TMS demo |
| Chat on WhatsApp | WhatsApp deep link with optional prefill |
| Join the Network | External Tranzfort app / partner flow |
| Register as Transport Partner | Email prefill → partner onboarding |
| Explore Logistics Intelligence | Email prefill → intelligence inquiry |
| Login | `app.zaftys.com` or `/login` |

**Copy rules (all pages):**

- Logistics first. Technology credible because ZAFTYS operates trucks.
- Never mix owned fleet and partner capacity without labels.
- Intelligence capabilities labeled Available / Beta / Research.
- No invented metrics, logos, or testimonials.
- H1 must not contain “ZAFTYS Logistics” as filler; badge carries brand.

---

## Global chrome (every page)

### Header

| Element | Spec |
|---------|------|
| **Logo** | Links to `/` |
| **Nav** | Logistics ▾ · Platform ▾ · Intelligence (flat) · Industries (flat) · Company ▾ · Resources ▾ |
| **Actions** | Login → `/login` · Request Transportation → email CTA |
| **Parent labels** | Clicking Logistics → `/logistics`; Platform → `/technology`; Company → `/about`; Resources → `/resources` |
| **Logistics submenu** | Transportation · Our Fleet only (service SKUs are sections on `/logistics`) |
| **No rows** | “Overview”, “All Resources”, Intelligence submenu, industry slugs in header |

### Footer (5 columns)

| Column | Links |
|--------|-------|
| Logistics | Transportation · Our Fleet · Contract · Industrial · Container |
| Platform | TMS · Tranzfort · Tracking · Fleet Management · APIs · Login |
| Intelligence | Analytics · Freight Rates · Market Intelligence · Supply Chain AI |
| Company | About · Industries · Contact · Careers · Become a Partner |
| Resources | Blog · Market Reports |

### Floating / persistent

| Element | Spec |
|---------|------|
| WhatsApp FAB | Fixed bottom-right; site-wide except legal pages optional |
| Breadcrumbs | Hub and leaf pages via JSON-LD; visible on solution/industry pages where implemented |

---

## Reusable layouts

### A. Solution leaf layout (`SolutionPageLayout`)

Used by: logistics leaves (except fleet), network leaves (except Tranzfort full page), technology leaves, intelligence leaves.

| # | Section | H2 | Overview | Image | CTA |
|---|---------|----|-----------|----|-----|
| 01 | Hero | — (H1 in hero) | Badge + H1 + lead from `solution-pages.ts` | `hero-services.jpg` default or page-specific | Primary CTA from page config + optional WhatsApp + secondary link |
| 02 | Capabilities | — (H3 per card) | 3-column feature cards: title + description | None | Cards are informational |
| 03 | What you get | **What you get** | Bulleted highlights with check icons | None | None |
| 04 | Custom | — | Optional `children` slot for page-specific blocks | Per page | Per page |
| 05 | Related | **Related** | Pill buttons to related services | None | Link buttons |
| 06 | Final CTA band | **Ready to move your freight?** | Repeat primary CTA | None | Primary + WhatsApp if quote/container |

### B. Industry detail layout (`IndustryDetail`)

| # | Section | H2 / tab | Overview | Image | CTA |
|---|---------|----------|----------|-------|-----|
| 01 | Hero | H1 = `seoH1` | Badge = industry title; lead = description | `industry.image` | Get a Quote · Talk to Our Team |
| 02 | Tabs | Overview · Operations · Corridors & assets | Tabbed content (see per-industry data) | None | — |
| 03 | FAQ | **Frequently asked questions** | 3 FAQs per industry | None | — |
| 04 | Related industries | **Related industries** | 3 sibling industry cards | None | Card links |
| 05 | Deep links | — | Logistics, Tranzfort, TMS, partner, contact, blog links | None | Text links |
| 06 | Final CTA | **Get a quote for {industry}** | WhatsApp prefill from industry data | None | WhatsApp · Explore Services |

### C. Blog post layout (`BlogPost`)

| # | Section | H2 | Overview | Image | CTA |
|---|---------|----|-----------|----|-----|
| 01 | Hero | H1 = post title | Category badge · date · read time | Featured image if set | — |
| 02 | Body | H2/H3 from markdown | Long-form research content | Inline figures as authored | — |
| 03 | Related | **Related reading** | 2–3 related posts | Thumbnails | Post links |
| 04 | CTA band | **Need capacity on this lane?** | Quote prompt | None | Request Transportation · WhatsApp |

### D. Market report layout (`ReportDetail` + `/read`)

| # | Section | H2 | Overview | Image | CTA |
|---|---------|----|-----------|----|-----|
| 01 | Hero | H1 = report title | Subtitle · report ID · page count | Cover preview PNG | Unlock full PDF |
| 02 | KPI strip | — | 3–4 headline numbers from report data | None | — |
| 03 | Overview | **Overview** | Summary paragraphs | None | — |
| 04 | TOC | **Table of contents** | Chapter list | None | — |
| 05 | Takeaways | **Key takeaways** | Bullets | None | — |
| 06 | Trust | **Methodology & sources** | Methodology + sources | None | — |
| 07 | Related | **Related research** | Related report + blog links | None | Link buttons |
| 08 | Gate | Email capture modal | Company email to unlock PDF | None | Submit → `/reports/{slug}/read` |

---

## Page index

| Route | Page name | Status | Nav |
|-------|-----------|--------|-----|
| `/` | Home | Shipped | — |
| `/logistics` | Transportation (Logistics hub) | Shipped | Header Logistics ▾ |
| `/logistics/3pl-transportation` | 3PL Transportation | Shipped | Header |
| `/logistics/contract-logistics` | Contract Logistics | Shipped | Footer |
| `/logistics/dedicated-fleet` | Dedicated Fleet | Shipped | Footer |
| `/logistics/industrial-freight` | Industrial Freight | Shipped | Header |
| `/logistics/container-transportation` | Container Transportation | Shipped | Header |
| `/fleet` | Our Fleet | Shipped | Header (as Our Fleet) |
| `/network` | Network hub | Shipped | — (Platform parent → `/technology`) |
| `/network/tranzfort` | Tranzfort | Shipped | Header Platform ▾ |
| `/network/transporter-network` | Transporter Network | Shipped | — |
| `/network/truck-capacity` | Truck Capacity | Shipped | — |
| `/technology` | Technology hub | Shipped | Header Platform ▾ |
| `/technology/zaftys-tms` | ZAFTYS TMS | Shipped | Header |
| `/technology/fleet-management` | Fleet Management | Shipped | Header |
| `/technology/tracking` | Tracking & Visibility | Shipped | Header |
| `/technology/apis` | Logistics APIs | Shipped | Footer |
| `/intelligence` | Intelligence hub | Shipped | Header flat |
| `/intelligence/analytics` | ZAFTYS Analytics | Shipped | Footer |
| `/intelligence/freight-rates` | Freight Rate Intelligence | Shipped | Footer |
| `/intelligence/market-intelligence` | Market Intelligence | Shipped | Footer |
| `/intelligence/ai` | Supply Chain AI | Shipped | Footer |
| `/industries` | Industries hub | Shipped | Header flat |
| `/industries/{slug}` | Industry detail (×8) | Partial | Footer via hub |
| `/about` | About | Partial | Header Company ▾ |
| `/contact` | Contact | Shipped | Header |
| `/careers` | Careers | Shipped | Header |
| `/partner` | Become a Partner | Shipped | Header Company ▾ |
| `/blog` | Blog index | Shipped | Header Resources ▾ |
| `/blog/{slug}` | Blog post (×11) | Shipped | — |
| `/resources` | Resources hub | Shipped | Header Resources ▾ |
| `/reports` | Market reports index | Shipped | Header |
| `/reports/{slug}` | Report detail (×2) | Shipped | — |
| `/reports/{slug}/read` | PDF reader | Shipped | — |
| `/login` | Login | Shipped | Header action |
| `/privacy` | Privacy Policy | Shipped | Footer legal |
| `/terms` | Terms of Use | Shipped | Footer legal |
| `/cookies` | Cookie Policy | Shipped | Footer legal |
| `/legal-notice` | Legal Notice | Shipped | Footer legal |
| `*` | 404 Not Found | Shipped | — |

**Redirects (301):** `/services` → `/logistics` · `/tranzfort-network` → `/network/tranzfort` · `/zaftys-tms` → `/technology/zaftys-tms` · `/platform` → `/technology/zaftys-tms`

---

# PAGE SPECIFICATIONS

---

## 1. Home (`/`)

| | |
|---|---|
| **Status** | Shipped (6 sections — revised 20 Aug 2026) |
| **Nav** | Logo destination |
| **Meta title** | ZAFTYS \| 3PL Transportation and Contract Logistics |
| **Meta description** | Technology-enabled transportation and logistics. Owned heavy-vehicle capacity, contract logistics, verified partner network, and ZAFTYS TMS. Request transportation across India. |
| **Goal** | Within first screen: ZAFTYS hauls freight, serves industrial shippers, technology is operational not generic SaaS |
| **Section count** | **6 logical sections** (Platform = 1 section, 3 visual bands) |

---

### Home positioning review (Aug 2026)

#### What ZAFTYS is (one sentence)

**A technology-enabled transportation and logistics operator** — we execute freight with owned fleet and contract programs, extend capacity through a verified network, and run trips on software we built from our own dispatch desk.

Not: three equal products · pure TMS SaaS · marketplace-first brand.

#### Brand pillars → home role

| Pillar | Priority | What it is | Home job | Where depth lives |
|--------|----------|------------|----------|-------------------|
| **Logistics** | Primary | Moving freight (3PL, contract, industrial, container) | Hero promise + §2 operating model | `/logistics`, `/fleet`, service leaf pages |
| **Platform** | Secondary | Tools that run operations (TMS, Tranzfort) | §3 — credible because we operate | `/technology`, `/network/tranzfort` |
| **Industries** | Context | Who we serve | §4 — 4 vertical tiles | `/industries`, `/industries/{slug}` |
| **Intelligence** | Tertiary | Analytics, rates, research, AI | §5 — compact, labeled | `/intelligence`, `/reports`, `/blog` |
| **Company** | Trust | Heritage, team, partner program | Not on home (by design) | `/about`, `/partner`, `/contact` |

#### Services vs products on home

| Type | Examples | How home treats them |
|------|----------|----------------------|
| **Services** (execution) | 3PL, contract logistics, industrial freight, container, dedicated fleet | **Not listed as SKUs.** Summarized in §2 as operating pillars: owned fleet, contract programs, network overflow. Full catalog only on `/logistics`. |
| **Products** (platform) | ZAFTYS TMS, Tranzfort | **One section (§3), two bands.** Framed as infrastructure behind freight, not equal headline products. |
| **Intelligence** (emerging) | Analytics, freight rates, reports, AI | **Teaser only (§5).** Status labels (Available / Beta / Research) on hub; home links out. |

#### Messaging hierarchy (visitor scroll) — locked sequence

```text
#  Section ID         Narrative   Pillar        Why this order
──  ─────────────────  ─────────   ───────────   ─────────────────────────────────────────────
01  hero               WHAT+PROOF  Logistics     First screen: we haul heavy freight
02  operating-model    HOW         Logistics     Define operator (fleet + contract + network)
03  platform           TOOLS       Platform      Prove TMS + Tranzfort right after the desk model
04  industries         WHO         Industries    Vertical fit — where that model + platform apply
05  insights           KNOW        Intelligence  Tertiary
06  final-cta          ACT         Logistics     Convert on transportation
```

**Industries below Platform** — operating model mentions TMS/network; Platform proves it with product bands; Industries shows application across verticals.  
**Do not move Platform before Operating model** — tools before operator definition reads SaaS-first.

#### Locked home sections (canonical)

| # | Section ID | H2 (current) | Single job | Must include | Must NOT include |
|---|------------|--------------|------------|--------------|------------------|
| **01** | `hero` | *(H1)* Heavy Freight. Reliable Capacity. Managed by Technology. | Promise + primary conversion | Badge, H1, tagline, Request Transportation, WhatsApp, proof strip | Service grid · “Three products” · “Post a load free” in H1 |
| **02** | `operating-model` | We move freight. We run the desk. | **Define the company** | 3 pillars (fleet, contract, network), operator copy, link to `/logistics` | 3PL/Industrial/Container SKU cards · full service catalog |
| **03** | `platform` | The platform behind the freight | **Why technology is credible** | TMS band + Tranzfort band, product screenshots, demo/network CTAs | Intelligence · APIs · fleet management modules · two-column card grid |
| **04** | `industries` | Industries we haul for | **Who we serve** | 4 industrial verticals, link to `/industries` | All 8 tiles · industry copy blocks |
| **05** | `insights` | Insights from operations | **Secondary pillar teaser** | Intelligence + Reports links; optional light report/blog scroll | Full AI claims · unlabeled Beta as “live” |
| **06** | `final-cta` | Ready to move your freight? | **Convert** | Request Transportation, WhatsApp, secondary TMS/Tranzfort paths | New positioning copy |

**Section count rule:** Stay at **6 logical sections**. Platform may use multiple visual bands inside one `<section>`; do not add new top-level sections without dropping one.

#### Code scaffold (branch `rewamp-20-8-26`)

| Section ID | Component | Copy source |
|------------|-----------|-------------|
| `hero` | `src/components/home/HomeHeroSection.tsx` | `src/lib/home-copy.ts` → `hero` |
| `operating-model` | `HomeOperatingModelSection.tsx` | `home-copy` + `homeOperatingModel` in constants |
| `platform` | `HomePlatformSection.tsx` | `home-copy` → `platform` |
| `industries` | `HomeIndustriesSection.tsx` | `home-copy` + `homeFeaturedIndustries` |
| `insights` | `HomeInsightsSection.tsx` | `home-copy` → `insights` |
| `final-cta` | `HomeFinalCtaSection.tsx` | `home-copy` → `finalCta` |

Page shell: `src/pages/Home.tsx` — SEO + six sections only.  
Sequence source of truth: `src/lib/home-sections.ts`.

#### What deliberately lives OFF the home page

| Content | Reason | Page |
|---------|--------|------|
| Full logistics service menu | Avoid catalog homepage; §2 + `/logistics` | `/logistics` |
| Dedicated fleet as its own story | Footer + contract path | `/logistics/dedicated-fleet` |
| Heritage / Amravati / 3 generations | Company trust, not conversion | `/about` |
| Partner onboarding detail | Audience = fleet owners, not shippers | `/partner` |
| Intelligence modules (4) | Early-stage; flat nav link enough | `/intelligence` |
| Legal, careers, contact forms | Footer / Company nav | respective pages |

#### Current gaps to watch (optional Phase 2)

| Item | Issue | Suggestion |
|------|-------|------------|
| Hero tertiary CTA | ~~“Explore ZAFTYS TMS”~~ → **How we operate** `#operating-model` | Done |
| Trust strip row 4 | “ZAFTYS TMS” alongside fleet proof | OK if labeled as operational proof, not a product pitch |
| §5 carousels | Report + blog scroll adds scroll weight | OK for now; drop carousels if home feels long |
| §2 third pillar | Links to Tranzfort (product) under “operating model” | Correct — network capacity is part of execution model |
| FMCG / retail / chemicals | Not on home industry grid | Intentional — home shows heavy industrial core |

---

### Design principle

Home is a **scroll summary**, not a sitemap. Detail lives on hub pages.

| Removed from home | Moved to |
|-------------------|----------|
| Dedicated Fleet / service cards on home | `/logistics` hub (full catalog) |
| 4 secondary industry tiles (8→4) | `/industries` |
| Separate TMS + Tranzfort sections | Single **Platform** section |
| Full Intelligence section | Compact cards in **Insights** |
| Heritage block | `/about` only |
| Separate reports + blog sections | Combined **Insights** section |

### Section 01 — Hero + proof strip

| Field | Content |
|-------|---------|
| **Badge** | Technology-enabled Transportation & Logistics |
| **H1** | Heavy Freight. Reliable Capacity. Managed by Technology. |
| **Tagline** | Real Trucks. Real Logistics. Real Technology. |
| **Image** | `/images/lcp/hero-home-960.jpg` (LCP set) |
| **CTA** | Request Transportation · WhatsApp · How we operate → `#operating-model` |
| **Proof strip** | 6 items from `homeTrustStrip` — card overlapping hero (same scroll section) |

### Section 02 — How ZAFTYS works (operating model)

**Job:** Define the company — not a service catalog. Service SKUs live on `/logistics`.

**Layout:** No hero image. Centered header + 3 pillar cards (01→02→03) with desktop flow connector + tagline band + CTAs.

| Field | Content |
|-------|---------|
| **Eyebrow** | One operational desk |
| **H2** | We move freight. We run the desk. |
| **Lead** | Transportation operator: owned capacity, contract programs, verified partners, one desk, TMS on trips we run. |
| **Flow label** | How capacity comes together on your lane |
| **Pillars (3 cards)** | 01 Owned fleet · 02 Contract logistics · 03 Network capacity |
| **Tagline band** | Supporting + Real trucks / Real logistics / Real technology |
| **CTA** | Request Transportation · How we operate → `/logistics` |

### Section 03 — Platform (TMS + Tranzfort)

**Job:** Prove the desk runs on real software — immediately after operating model.

**Layout:** Stacked full-width bands — not two columns. One shared H2, then two alternating rows.

| Band | Background | Layout |
|------|------------|--------|
| Intro | White | Centered eyebrow + H2 + lead only |
| TMS | `muted/30` | Carousel left · copy + CTAs right |
| Tranzfort | Navy | Copy + CTAs left · carousel right |

| Field | Content |
|-------|---------|
| **Eyebrow** | Platform behind the freight |
| **H2** | The platform behind the freight |
| **Lead** | TMS and Tranzfort are how we dispatch owned fleet, manage contract programs, and extend partner capacity on the desk above. |
| **TMS badge** | ZAFTYS TMS |
| **TMS H3** | Run transportation from one platform. |
| **TMS carousel** | Horizontal auto-scroll (`surface="muted"`) |
| **Tranzfort badge** | Digital Freight Network |
| **Tranzfort H3** | ZAFTYS operates. Tranzfort connects. |
| **Tranzfort carousel** | Phone scroll (`surface="navy"`) |
| **CTA** | See TMS · Book Demo · Join Network · How Tranzfort works |

### Section 04 — Industries (4 verticals)

**Job:** Show where the operating model and platform apply — after tools are proven.

| Field | Content |
|-------|---------|
| **Background** | White (follows navy Tranzfort band) |
| **Eyebrow** | Who we serve |
| **H2** | Industries we haul for |
| **Lead** | That operating model and platform run across heavy industrial verticals. Different cargo and truck class, same desk. |
| **Cards (4)** | Cement · Coal & Mining · Steel & Metals · Manufacturing |
| **CTA** | View all industries → `/industries` |

### Section 05 — Insights (intelligence + resources)

| Field | Content |
|-------|---------|
| **H2** | Insights from operations |
| **Link cards** | Logistics Intelligence · Market Reports |
| **H3 sub** | Market reports carousel · From the blog carousel (embedded, 4 items each) |

### Section 06 — Final CTA

| Field | Content |
|-------|---------|
| **H2** | Ready to move your freight? |
| **Lead** | Request transportation capacity, book a TMS demo, or join the Tranzfort network. |
| **CTA** | Request Transportation · WhatsApp · Explore ZAFTYS TMS (secondary) → `/technology/zaftys-tms` |

---

## 2. Logistics hub (`/logistics`) — Transportation page

| | |
|---|---|
| **Status** | Shipped (thick Transportation page — revised 20 Aug 2026) |
| **Nav** | Header Logistics ▾ → **Transportation** (parent click = same route) |
| **Meta title** | Logistics Services \| 3PL and Contract Transportation |
| **Meta description** | ZAFTYS logistics: 3PL transportation, contract logistics, dedicated fleet, industrial freight, and container movements. Owned fleet plus verified network. |
| **Goal** | Primary shipper page for how ZAFTYS moves freight; sections replace old Logistics submenu SKUs |
| **Copy source** | `src/lib/logistics-hub-copy.ts` · Page: `src/pages/logistics/LogisticsHub.tsx` |

### Locked section sequence

```text
01  hero               WHAT + ACT     Promise + Request Transportation + Our Fleet
02  how-we-move        HOW            Operator pillars (fleet / contract / network)
03  three-pl           3PL            Full-truckload execution depth
04  contract           CONTRACT       Contract + dedicated programs (merged)
05  industrial         INDUSTRIAL     Heavy plant / mill freight
06  container          CONTAINER      Port / market / city
07  industries         WHO            4 vertical teasers → /industries
08  capacity-clarity   PROOF          Owned vs partner labeled
09  final-cta          ACT            Request Transportation + WhatsApp + Fleet
```

### Header IA note

Logistics ▾ submenu is **Transportation** + **Our Fleet** only. Leaf routes (`/logistics/3pl-transportation`, contract, dedicated, industrial, container) remain for SEO and footer deep links; they are not header items.

### Section 01 — Hero

| Field | Content |
|-------|---------|
| **Badge** | Transportation & Logistics |
| **H1** | Reliable transportation capacity for demanding freight. |
| **Lead** | 3PL and contract execution; owned capacity, contract programs, verified overflow, TMS on trips we run. |
| **Image** | `hero-services.jpg` |
| **CTA** | Request Transportation · WhatsApp · Our Fleet → `/fleet` |
| **Jump links** | how-we-move · three-pl · contract · industrial · container · industries |

### Sections 03–06 — Service depth

Each block: eyebrow · H2 · lead · 4 bullets · primary mailto CTA · secondary link. Surfaces alternate white / muted.

| ID | Primary CTA | Secondary |
|----|-------------|-----------|
| `three-pl` | Request Transportation | Our Fleet |
| `contract` | Discuss Your Contract Requirement | Dedicated fleet leaf |
| `industrial` | Request Transportation | Industries hub |
| `container` | Request Container Capacity | Network hub |

### Section 07 — Industries · 08 Capacity · 09 Final CTA

Industries: 4 featured tiles. Capacity: fleet vs network CTAs. Final CTA: quote + WhatsApp + Fleet.

---

## 3. Logistics leaf pages

All use **Solution layout A** unless noted.

### 3.1 `/logistics/3pl-transportation`

| | |
|---|---|
| **Nav** | Header Logistics ▾ |
| **Meta title** | 3PL Transportation Services India |
| **H1** | Reliable transportation capacity for demanding freight. |
| **Lead** | ZAFTYS provides transportation execution for industrial, commercial, and infrastructure-related freight. We combine owned vehicles, contracted capacity, and a verified transportation network. |
| **Feature H3s** | Full truckload · Heavy freight · Third-party capacity |
| **H2 What you get** | Owned fleet LCV–ODC · GST billing · TMS visibility · Pan-India corridors |
| **Related** | Contract Logistics · Our Fleet · Tranzfort Network |
| **Primary CTA** | Request Transportation + WhatsApp |

### 3.2 `/logistics/contract-logistics`

| | |
|---|---|
| **Nav** | Footer |
| **Meta title** | Contract Logistics and Dedicated Transportation |
| **H1** | Dedicated transportation for recurring freight. |
| **Lead** | ZAFTYS provides contract logistics and dedicated transportation capacity for businesses with recurring freight requirements. |
| **Feature H3s** | Dedicated capacity · Dedicated routes · Managed dispatch |
| **H2 What you get** | SLA tracking · TMS visibility · Assigned trucks · Account desk |
| **Related** | Dedicated Fleet · 3PL · ZAFTYS TMS |
| **Primary CTA** | Discuss Your Contract Requirement |
| **Secondary** | Discuss on WhatsApp → `/contact` |

### 3.3 `/logistics/dedicated-fleet`

| | |
|---|---|
| **Nav** | Footer only (not header) |
| **Meta title** | Dedicated Fleet Services India |
| **H1** | Assigned capacity on corridors you run every week. |
| **Lead** | Reserve dedicated trucks and drivers for plant, mill, or DC programs. Vehicle class follows the lane. |
| **Feature H3s** | Assigned vehicles · Any vehicle class · Performance on the lane |
| **H2 What you get** | Plant window awareness · TMS visibility · TranZfort overflow · GST billing |
| **Related** | Contract Logistics · Our Fleet |
| **Primary CTA** | Discuss Your Contract Requirement |

### 3.4 `/logistics/industrial-freight`

| | |
|---|---|
| **Nav** | Header |
| **Meta title** | Industrial Freight Transportation India |
| **H1** | Heavy freight built around plant windows and weighbridge reality. |
| **Lead** | Transportation for manufacturing, construction, steel, cement, mining, and project cargo. |
| **Feature H3s** | Steel and metals · Cement and bulk · Mining and aggregates |
| **H2 What you get** | Multi-axle/flatbed/tipper/ODC · Plant detention awareness · Corridor experience · Technology layer |
| **Related** | Industries · Container Transportation |
| **Primary CTA** | Request Transportation + WhatsApp |

### 3.5 `/logistics/container-transportation`

| | |
|---|---|
| **Nav** | Header |
| **Meta title** | Container Transportation Port to Market India |
| **H1** | Connecting ports, markets, and cities. |
| **Lead** | Container and heavy-vehicle transportation between ports, warehouses, factories, markets, and cities. |
| **Feature H3s** | Port to warehouse · Port to factory · Factory to port |
| **H2 What you get** | Container trailers · Port corridors · TMS visibility · Tranzfort overflow |
| **Related** | 3PL · Industrial Freight |
| **Primary CTA** | Request Container Capacity + WhatsApp |

---

## 4. Our Fleet (`/fleet`)

| | |
|---|---|
| **Status** | Shipped (Partial: secondary CTA still links `/services` — target `/logistics`) |
| **Nav** | Header Logistics ▾ as “Our Fleet” |
| **Meta title** | Company Fleet and Commercial Truck Types |
| **Meta description** | ZAFTYS fleet: LCV, open truck, trailer, container, bulker, tanker, tipper, reefer, parcel, ODC. |
| **Goal** | Proof page: owned capacity, vehicle catalog, operational discipline |

### Hero

| Field | Content |
|-------|---------|
| **Badge** | Company fleet |
| **H1** | We operate the trucks. You hire the class. |
| **Lead** | Maintenance, drivers, and dispatch sit with us. Catalog matches TranZfort vehicle picker. |
| **Image** | `hero-fleet.jpg` |
| **CTA** | Check Fleet Availability (email) · Explore Services → `/logistics` (target) |

### Section — More than a body type

| Field | Content |
|-------|---------|
| **H2** | More than a body type |
| **Overview** | Owning trucks ≠ running a lane. Planning, loading, papers, close-out sit with ZAFTYS. |
| **Highlight cards (H3)** | Company operated fleet · Verified marketplace · Classes we run |
| **Image** | None |

### Section — Fleet features grid

| Field | Content |
|-------|---------|
| **H2** | — (6-icon grid) |
| **H3s** | Operational visibility · Fleet readiness · Preventive maintenance · Safety discipline · Efficient planning · TMS connected |
| **Overview** | One paragraph per feature card |

### Section — Vehicle catalog

| Field | Content |
|-------|---------|
| **H2** | Commercial vehicle classes |
| **Overview** | Grid from `marketplaceVehicleCatalog`: LCV through ODC with body styles and typical size bands |
| **Image** | Per-class truck photos from `truckImageForId` |
| **CTA** | Request Transportation |

### Section — Final CTA

| Field | Content |
|-------|---------|
| **H2** | Need a specific vehicle class? |
| **CTA** | Check Fleet Availability · WhatsApp |

---

## 5. Network hub (`/network`)

| | |
|---|---|
| **Status** | Shipped |
| **Nav** | Footer / deep links (header Platform parent → `/technology`) |
| **Meta title** | Transportation Network \| Tranzfort and Partners |
| **H1** | ZAFTYS operates. Tranzfort connects. |
| **Lead** | Owned fleet when we have the truck. Verified partner capacity when the lane needs more. Tranzfort extends the network digitally. |

### Hero

| Field | Content |
|-------|---------|
| **Image** | `hero-network.jpg` |
| **CTA** | Explore Tranzfort · Become a Partner |

### Section — Network cards

| Field | Content |
|-------|---------|
| **H2** | ZAFTYS operates. Tranzfort connects. |
| **Cards** | Tranzfort · Transporter Network · Truck Capacity |
| **CTA** | Card links |

### Section — Final CTA

| Field | Content |
|-------|---------|
| **H2** | Extend capacity without losing control |
| **CTA** | Explore Tranzfort · Register as Transport Partner |

---

## 6. `/network/tranzfort` (full Network page)

| | |
|---|---|
| **Status** | Shipped (migrated `Network.tsx`) |
| **Nav** | Header Platform ▾ |
| **Meta title** | TranZfort \| AI-Powered Freight Marketplace |
| **H1** | TranZfort. Post or find a load for free. |
| **Lead** | Digital freight network. Shippers post loads; truckers book. AI matching on corridor, vehicle type, timing. |

### Sections (existing page structure)

| # | H2 | Overview | Image | CTA |
|---|----|-----------|----|-----|
| 01 | Hero | Badge “Marketplace · live” | `hero-network.jpg` | Download app · Join network |
| 02 | How it works | Post → Match → Book → Move → Settle | App screenshots carousel | — |
| 03 | For shippers | Post loads free; ZAFTYS billing on contracted trips | `[PLACEHOLDER: tranzfort-shipper-flow.jpg]` | Post a load |
| 04 | For truckers | Search free; broker fee on booked loads | `[PLACEHOLDER: tranzfort-trucker-app.jpg]` | Download app |
| 05 | Verification | RC, insurance, operating pattern checks | Icon grid | Become a Partner |
| 06 | FAQ | Marketplace, fees, GST, matching | — | — |
| 07 | Final CTA | Join TranZfort | — | External app · Partner form |

---

## 7. Network leaf pages (Solution layout A)

### 7.1 `/network/transporter-network`

| **H1** | Verified carriers when your lane needs more trucks. |
| **Features** | Verified onboarding · Corridor matching · ZAFTYS coordination |
| **CTA** | Register as Transport Partner |

### 7.2 `/network/truck-capacity`

| **H1** | Source capacity from fleet and network in one relationship. |
| **Features** | Owned fleet first · Network overflow · One desk |
| **CTA** | Request Transportation + WhatsApp |

---

## 8. Technology hub (`/technology`)

| | |
|---|---|
| **Nav** | Header Platform ▾ (parent click) |
| **Meta title** | Transportation Technology \| ZAFTYS TMS |
| **H1** | Run your transportation operation from one platform. |

### Hero

| Field | Content |
|-------|---------|
| **Image** | `hero-technology.jpg` |
| **CTA** | Book a TMS Demo · Login → `/login` |

### Section — Platform cards

| Field | Content |
|-------|---------|
| **H2** | Transportation technology we dispatch on |
| **Cards** | ZAFTYS TMS · Fleet Management · Tracking · Logistics APIs |

### Section — Workflow

| Field | Content |
|-------|---------|
| **H2** | From order to analytics |
| **Overview** | 10-step workflow strip: Order → Load planning → … → Analytics |
| **Image** | `[PLACEHOLDER: tms-workflow-diagram.svg]` |

### Section — Final CTA

| **H2** | See the TMS we use every day |
| **CTA** | Book a TMS Demo · ZAFTYS TMS → leaf |

---

## 9. `/technology/zaftys-tms` (full Technology page)

| | |
|---|---|
| **Nav** | Header Platform ▾ |
| **Meta title** | ZAFTYS TMS \| Transport Management System |
| **H1** | The TMS we dispatch on every day. |
| **Lead** | Shippers: portal for tracking and e-POD. Fleet operators: vehicles, drivers, trip close-out. Login at app.zaftys.com. |

### Sections

| # | H2 | Overview | Image | CTA |
|---|----|-----------|----|-----|
| 01 | Hero | Badge “TMS · live” | `hero-technology.jpg` | Book demo · Login |
| 02 | Live today | 4 proof bullets on production use | — | — |
| 03 | Features grid | GPS · Dispatch · Driver app · Fleet · Analytics · Docs | Icons | — |
| 04 | Buyer paths | For shippers · For fleet operators | TMS carousel | Demo |
| 05 | Screens | Product screenshots | Carousel slides | — |
| 06 | FAQ | Live product? · Who uses it? · vs generic TMS? | — | — |
| 07 | Final CTA | Book a TMS Demo | — | Email · Login |

---

## 10. Technology leaf pages (Solution layout A)

### 10.1 `/technology/fleet-management`

| **H1** | Fleet records that survive the weighbridge and the audit. |
| **CTA** | Book a TMS Demo |

### 10.2 `/technology/tracking`

| **H1** | Visibility after the truck leaves the origin. |
| **CTA** | Book a TMS Demo |

### 10.3 `/technology/apis`

| **H1** | Connect transportation data to your systems. |
| **Overview** | Only advertise implemented endpoints |
| **CTA** | Book a TMS Demo (enterprise onboarding) |

---

## 11. Intelligence hub (`/intelligence`)

| | |
|---|---|
| **Nav** | Header flat link |
| **Meta title** | Logistics Intelligence \| Analytics and AI |
| **H1** | Turn transportation data into decisions. |
| **Lead** | Analytics, freight intelligence, market research, and AI built around real logistics operations. Capabilities labeled by availability. |

### Hero

| Field | Content |
|-------|---------|
| **Image** | `hero-resources.jpg` (intelligence visual) |
| **CTA** | Explore Logistics Intelligence (email) |

### Module sections (on-page, alternating layout)

Each module = one **H2-level block** (not separate nav items):

#### Module 1 — ZAFTYS Analytics

| Field | Content |
|-------|---------|
| **Status badge** | Available |
| **H2** | ZAFTYS Analytics |
| **Overview** | Transportation, freight, carrier, and market data in one analytics layer |
| **Bullets** | Lane performance · Carrier SLAs · Cost analysis · TMS data linkage |
| **Image** | `[PLACEHOLDER: analytics-dashboard.jpg]` |
| **CTA** | Explore analytics → `/intelligence/analytics` |

#### Module 2 — Freight Rate Intelligence

| Field | Content |
|-------|---------|
| **Status badge** | Beta |
| **H2** | Freight Rate Intelligence |
| **Overview** | Lane-level rate context, not generic averages |
| **Image** | `[PLACEHOLDER: freight-rates-chart.jpg]` |
| **CTA** | Learn about rate intelligence → `/intelligence/freight-rates` |

#### Module 3 — Market Intelligence

| Field | Content |
|-------|---------|
| **Status badge** | Available |
| **H2** | Market Intelligence |
| **Overview** | Institutional research; gated PDFs |
| **Image** | Report cover montage |
| **CTA** | Browse market reports → `/reports` |

#### Module 4 — Supply Chain AI

| Field | Content |
|-------|---------|
| **Status badge** | Research |
| **H2** | Supply Chain AI |
| **Overview** | Exception analysis, desk workflows, forecasting in development |
| **Image** | `[PLACEHOLDER: ai-assistant-mock.jpg]` |
| **CTA** | Supply chain AI roadmap → `/intelligence/ai` |

### Final CTA

| **H2** | Talk to us about logistics intelligence |
| **CTA** | Explore Logistics Intelligence (email) |

---

## 12. Intelligence leaf pages (Solution layout A)

| Route | H1 | Status badge | Primary CTA |
|-------|-----|--------------|-------------|
| `/intelligence/analytics` | Turn transportation data into decisions. | Available | Explore Logistics Intelligence |
| `/intelligence/freight-rates` | Lane-level freight rate context. | Beta | Explore Logistics Intelligence |
| `/intelligence/market-intelligence` | Research on how freight markets move. | Available | Explore Logistics Intelligence + Browse reports |
| `/intelligence/ai` | AI built around real logistics operations. | Research | Explore Logistics Intelligence |

---

## 13. Industries hub (`/industries`)

| | |
|---|---|
| **Status** | Partial (hero lead still references “three products” — Phase 2 rewrite) |
| **Nav** | Header flat |
| **Meta title** | Industries We Serve \| Commercial Freight |
| **H1** | From cement plants to retail DCs. |
| **Target lead** | Industrial and commercial freight across cement, steel, mining, chemicals, manufacturing, FMCG, and retail distribution. One operational desk: owned fleet, contract logistics, verified network, TMS visibility. |

### Hero

| Field | Content |
|-------|---------|
| **Image** | `[PLACEHOLDER: industries-hub-collage.jpg]` |
| **CTA** | Get a Quote · View logistics → `/logistics` |

### Section — Industry grid

| Field | Content |
|-------|---------|
| **H2** | Industries we serve |
| **Overview** | Card per vertical: photo, title, highlight, link to detail |
| **Image** | Per-industry hero images |

### Section — How we work across verticals

| Field | Content |
|-------|---------|
| **H2** | Same desk, different cargo |
| **Overview** | Owned fleet first · Tranzfort overflow · TMS on contracted trips |
| **CTA** | Contact · Partner |

---

## 14. Industry detail pages (`/industries/{slug}`)

Shared structure: **Industry layout B**. Below: per-slug hero and tab content.

### 14.1 `/industries/cement`

| **Title** | Cement & Construction |
| **H1** | Cement and clinker that hit the plant window. |
| **Lead** | Bulker and tipper work for cement, clinker, aggregates. Plant windows, detention, payload discipline. |
| **Image** | `/images/marketing/industry-cement.jpg` |
| **Tab: Operational challenges** | Loading queues · Bulk payload · Multi-site dispatch |
| **Tab: How ZAFTYS helps** | Company tipper fleet · TranZfort surge · TMS visibility |
| **Tab: Corridors & assets** | Maharashtra/Gujarat/central lanes · 16–35T tippers |
| **FAQs** | 3 cement-specific (see `industries-data.ts`) |
| **CTA** | WhatsApp prefill: cement corridor quote |

### 14.2 `/industries/coal-mining`

| **Title** | Coal & Mining |
| **H1** | Pit-to-plant freight that respects site gates. |
| **Image** | `/images/services/materials/mining.jpg` |
| **Highlight** | Mining corridor expertise |
| **CTA** | WhatsApp prefill: mining freight |

### 14.3 `/industries/steel-metals`

| **Title** | Steel & Metals |
| **H1** | Coils and sections that survive the weighbridge. |
| **Image** | `/images/marketing/industry-steel.jpg` (or equivalent) |
| **Highlight** | Weighbridge and axle discipline |
| **Blog links** | Coil transport · Axle/GVW · Spot vs dedicated · Detention · ePOD |

### 14.4 `/industries/chemicals`

| **Title** | Chemicals |
| **H1** | Tanker and industrial cargo with paperwork discipline. |
| **Highlight** | Compliance-aware dispatch |

### 14.5 `/industries/manufacturing`

| **Title** | Manufacturing |
| **H1** | Plant-to-DC freight with window awareness. |
| **Highlight** | Multi-modal FTL programs |

### 14.6 `/industries/fmcg`

| **Title** | FMCG |
| **H1** | Distribution freight that hits the DC window. |
| **Highlight** | Backhaul and utilization |

### 14.7 `/industries/retail-distribution`

| **Title** | Retail Distribution |
| **H1** | DC-to-store and hub freight at retail pace. |
| **Highlight** | Multi-drop and FTL mix |

### 14.8 `/industries/industrial-logistics`

| **Title** | Industrial Logistics |
| **H1** | Project and plant freight across heavy corridors. |
| **Highlight** | ODC and project cargo |

**Phase 2 note:** Update footer deep links on all industry pages from legacy `/services`, `/tranzfort-network`, `/zaftys-tms` to new paths (redirects work today).

---

## 15. Company pages

### 15.1 About (`/about`)

| | |
|---|---|
| **Nav** | Header Company ▾ (parent) |
| **Meta title** | About ZAFTYS \| Transport, TMS and Marketplace |
| **H1** | Trucks first. Then TMS. Then the marketplace. |
| **Lead** | Three generations on Indian corridors, Amravati. GST-compliant billing. |

| # | H2 | Overview | Image | CTA |
|---|----|-----------|----|-----|
| 01 | Hero | Heritage story | `[PLACEHOLDER: about-heritage-yard.jpg]` | Contact |
| 02 | From family lanes to a GST desk | Origin story | Historical photo optional | — |
| 03 | What we do today | Logistics + platform + intelligence pillars (target rewrite) | — | Logistics · TMS · Tranzfort |
| 04 | Our values | Safety · Reliability · Transparency · Technology from operations | — | — |
| 05 | Final CTA | Work with ZAFTYS | — | Contact · Careers |

### 15.2 Contact (`/contact`)

| | |
|---|---|
| **Nav** | Header Company ▾ |
| **H1** | Quote, demo, or marketplace. Same team. |
| **Lead** | Freight quotes on WhatsApp. TMS walkthrough by email or form. Fleet owners: partner form or TranZfort download. |

| # | H2 | Overview | CTA |
|---|----|-----------|-----|
| 01 | Hero | Multi-intent entry | WhatsApp · Email |
| 02 | Contact cards | Quote · TMS demo · Partner · General | Card CTAs |
| 03 | Find Us | Amravati address, map embed | — |
| 04 | Send a Message | Web form (name, company, message) | Submit |

### 15.3 Careers (`/careers`)

| | |
|---|---|
| **Nav** | Header Company ▾ |
| **H1** | Work on the yard, the desk, or the product. |
| **Lead** | Drivers, dispatch, software in Amravati and on the network. |

| # | H2 | Overview | CTA |
|---|----|-----------|-----|
| 01 | Hero | Not a brochure job board | Email careers |
| 02 | Open roles / areas | Operations · Dispatch · Fleet · Product (as listed) | Apply via email |
| 03 | Life at ZAFTYS | Yard + desk culture | — |
| 04 | Final CTA | Send your CV | Email |

### 15.4 Partner (`/partner`)

| | |
|---|---|
| **Nav** | Header Company ▾ as “Become a Partner” |
| **H1** | Put your trucks on TranZfort. |
| **Lead** | Find loads on corridors you run. Verification required. |

| # | H2 | Overview | Image | CTA |
|---|----|-----------|----|-----|
| 01 | Hero | Fleet owner entry | `[PLACEHOLDER: partner-trucks-highway.jpg]` | Register · Download app |
| 02 | Why partner | Free search · Broker fee on bookings · ZAFTYS billing on contracted trips | — | — |
| 03 | Verification | RC · Insurance · Operating pattern | — | Start registration |
| 04 | FAQ | Fees · Payments · Verification timeline | — | — |
| 05 | Final CTA | Join the network | — | Partner form · Tranzfort app |

---

## 16. Resources pages

### 16.1 Resources hub (`/resources`)

| | |
|---|---|
| **Nav** | Header Resources ▾ (parent) |
| **H1** | Guides from the desk. Reports from research. |
| **Lead** | Operations writing on the blog. Institutional PDFs from ZAFTYS Analytics. |

| # | H2 | Overview | CTA |
|---|----|-----------|-----|
| 01 | Hero | Two pillars: blog + reports | Blog · Reports |
| 02 | Blog teaser block | Latest 3 posts | Read blog |
| 03 | Reports teaser block | Flagship reports | View reports |

### 16.2 Blog index (`/blog`)

| | |
|---|---|
| **Nav** | Header Resources ▾ |
| **H1** | What we learned moving freight. |
| **Lead** | Deep research: container trucking, TMS, plant TAT, axle/GVW, backhaul. |

| # | H2 | Overview | CTA |
|---|----|-----------|-----|
| 01 | Hero | — | — |
| 02 | Post grid | All posts with category, date, excerpt | Card → post |
| 03 | Categories filter | Optional filter chips | — |

**Blog posts (11 routes):**

| Slug | Topic area |
|------|------------|
| `tms-for-heavy-haul` | TMS for heavy haul |
| `steel-coil-transport-basics` | Steel coil transport |
| `cement-plant-loading-windows` | Cement plant windows |
| `planning-industrial-shipments` | Industrial shipment planning |
| `reduce-empty-return-trips` | Empty return / backhaul |
| `tms-evaluation-guide-indian-manufacturers` | TMS evaluation |
| `india-axle-load-gvw-limits-heavy-freight` | Axle load & GVW |
| `spot-market-vs-dedicated-fleet-india` | Spot vs dedicated |
| `plant-detention-tat-yard-gate-india` | Plant detention & TAT |
| `epod-fastag-eway-bill-billing-india` | ePOD, FASTag, e-Way Bill |
| `container-trucking-logistics-india` | Container trucking India |

Each post: **Blog layout C** with H1 from post title, body H2s from authored markdown, related posts, quote CTA band.

### 16.3 Market reports index (`/reports`)

| | |
|---|---|
| **Nav** | Header Resources ▾ |
| **H1** | Research on logistics and digital freight. |
| **Lead** | Sneak peek free; unlock full PDF with company email. |

| # | H2 | Overview | CTA |
|---|----|-----------|-----|
| 01 | Hero | Institutional research positioning | — |
| 02 | Report cards | Cover · title · KPI snapshot · page count | Open report |

### 16.4 Report: `/reports/global-logistics-market-2027-2036`

| | |
|---|---|
| **H1** | Global Logistics Market Size, Share & Forecast 2027-2036 |
| **Subtitle** | By mode, application, technology, end user, geography |
| **Image** | `/images/reports/global-logistics-market-2027-2036-preview.png` |
| **KPIs** | US$ 4,334.3 BN (2026) → US$ 11,344.7 BN (2036); 10.1% CAGR |
| **Sections** | Overview · TOC · Takeaways · Methodology · Related |
| **CTA** | Unlock PDF (email gate) → `/reports/global-logistics-market-2027-2036/read` |

### 16.5 Report: `/reports/digital-freight-matching-market-2027-2036`

| | |
|---|---|
| **H1** | Digital Freight Matching Platform Market (title from data) |
| **Image** | Cover preview PNG |
| **CTA** | Unlock PDF → `/read` route |

### 16.6 PDF reader (`/reports/{slug}/read`)

| | |
|---|---|
| **Nav** | None (focused reader) |
| **H1** | — (embedded PDF viewer) |
| **Overview** | Full PDF after email verification |
| **CTA** | Download PDF · Back to report page |

---

## 17. System pages

### 17.1 Login (`/login`)

| | |
|---|---|
| **Nav** | Header action |
| **Meta title** | Login \| ZAFTYS TMS |
| **H1** | Sign in to ZAFTYS TMS |
| **Overview** | Access by invitation. No public signup. Redirect or link to app.zaftys.com. |
| **Image** | TMS login screen mock |
| **CTA** | Continue to app.zaftys.com · Request access (contact) |

### 17.2 Privacy (`/privacy`)

| **H1** | Privacy Policy |
| **Sections (H2)** | Introduction · Data we collect · How we use data · Sharing · Retention · Your rights · Contact |
| **CTA** | Contact for privacy requests |

### 17.3 Terms (`/terms`)

| **H1** | Terms of Use & Service |
| **Sections (H2)** | Website use · Capacity facilitation · Verification · Liability modes · Detention · Governing law |
| **CTA** | Contact |

### 17.4 Cookies (`/cookies`)

| **H1** | Cookie Policy |
| **Sections (H2)** | What are cookies · Types we use · Managing preferences |
| **CTA** | — |

### 17.5 Legal notice (`/legal-notice`)

| **H1** | Legal Notice |
| **Sections (H2)** | Informational content · Availability · Rates · Electronic transactions |
| **CTA** | — |

### 17.6 404 Not Found

| **H1** | Page not found |
| **Overview** | This page does not exist. |
| **CTA** | Home · Logistics · Contact |

---

## 18. Redirect routes (no standalone content)

| From | To | Notes |
|------|-----|-------|
| `/services` | `/logistics` | Legacy commercial transport URL |
| `/tranzfort-network` | `/network/tranzfort` | Legacy marketplace URL |
| `/zaftys-tms` | `/technology/zaftys-tms` | Legacy TMS URL |
| `/platform` | `/technology/zaftys-tms` | Old platform entry |

---

## 19. SEO & schema checklist (all content pages)

| Element | Spec |
|---------|------|
| Canonical URL | Match `site-paths.ts` |
| JSON-LD | Organization on hubs; BreadcrumbList on hubs/leaves; FAQPage on industry + TMS FAQ |
| Open Graph | Title, description, hero image |
| Internal links | Minimum 3 contextual links per leaf page (related services, hub, contact) |
| Image alt | Descriptive; include freight context where relevant |

---

## 20. Phase 2 content gaps (tracked)

| Page / area | Gap |
|-------------|-----|
| `/industries` hero | Rewrite lead away from “three products” |
| `/fleet` secondary CTA | Change `/services` → `/logistics` |
| Industry detail deep links | Update legacy paths to new URLs |
| `/about` | Align “What we do today” with logistics-first pillars |
| Blog posts | Internal links still reference legacy URLs in body copy |
| Proof strip | Audit numbers against verified data only |
| New marketing images | Placeholders marked `[PLACEHOLDER]` throughout |

---

## 21. Page count summary

| Category | Count |
|----------|-------|
| Core marketing | 1 home + 4 hubs + 18 solution leaves + 1 fleet |
| Industries | 1 hub + 8 details |
| Company | 4 |
| Resources | 1 hub + 1 blog index + 11 posts + 1 reports index + 2 reports + 2 readers |
| System | 1 login + 4 legal + 1 404 |
| **Total indexable** | **~55 URLs** (per sitemap generator) |

---

*This document is the section-level companion to [`rewamp.md`](./rewamp.md). Update both when IA, nav, or page structure changes.*
