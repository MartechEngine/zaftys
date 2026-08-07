# Marketing Website Sitemap (New)

| Field | Value |
|-------|-------|
| **Project** | `zaftys-main`  -  Vite + React marketing site (`zaftys.com`) |
| **Reference** | `zaftys-lab/marketing` content model (industries, services, network) |
| **Status** | Phases 1-2 **shipped** (Login hard-redirect **deferred**)  -  Phase 3 polish open |
| **Version** | 1.1 |
| **Last updated** | July 2026 |

---

## 1. Purpose

This document defines the **target information architecture**, page inventory, section maps, and navigation for the ZAFTYS marketing website. It is grounded in:

1. **Existing UI/UX** in `zaftys-main` (what we can reuse without a full redesign)
2. **Locked content decisions** from product/marketing brainstorm
3. **Content patterns** from `zaftys-lab/marketing` (industries, services, network  -  not the full 25-route enterprise spec)

**Out of scope for this site:** `app.zaftys.com` portal, TranZfort mobile APK UX, blog, GCC/SEA expansion pages, Control Tower / Intelligence Cloud as separate product routes.

---

## 2. Current state audit

### 2.1 Tech stack & layout shell

| Layer | Implementation |
|-------|----------------|
| Framework | Vite + React + React Router |
| Styling | Tailwind + CSS variables (`src/index.css`)  -  navy primary, orange accent |
| UI kit | shadcn/ui (`src/components/ui/*`) |
| SEO | `src/components/SEO.tsx` + react-helmet-async |
| Forms | PHP APIs in `public/api/` (contact, partner, careers, newsletter) |
| Global chrome | Fixed `Navigation` + `Footer` on every route |

### 2.2 Reusable page patterns (keep)

Every marketing page follows the same visual rhythm:

```
┌─ Fixed Navigation (logo · links · Login · CTA) ─────────────────┐
├─ Hero  -  pt-32, full-bleed image, navy gradient overlay ────────┤
├─ Content sections  -  section-padding, alternating bg-white /     │
│  bg-muted/30 / bg-navy                                         │
├─ CTA band  -  bg-primary or bg-navy, centered headline + button  │
└─ Footer  -  newsletter, 4-column links, legal ───────────────────┘
```

### 2.3 Reusable components

| Component | Path | Use for |
|-----------|------|---------|
| `ServiceCard` | `src/components/ServiceCard.tsx` | Service/industry/feature grids |
| `FeatureCard` | `src/components/FeatureCard.tsx` | Icon + title + description rows |
| `StatCounter` | `src/components/StatCounter.tsx` | Trust strip (qualitative labels only) |
| `Card` / `CardContent` | `src/components/ui/card.tsx` | Industry tiles, partner steps, fleet cards |
| `Button` | `src/components/ui/button.tsx` | CTAs  -  accent primary, outline secondary |
| `Tabs` | `src/components/ui/tabs.tsx` | Network audience tabs, contact interest tabs |
| `SEO` | `src/components/SEO.tsx` | Per-page meta |
| `WhatsAppButton` / `WhatsAppFab` | `src/components/WhatsAppButton.tsx` | Primary CTA + sticky FAB |
| `CTAGroup` | `src/components/CTAGroup.tsx` | Consistent multi-button CTA rows |
| `ResponsiveImage` | `src/components/ResponsiveImage.tsx` | Aspect-ratio images, skeleton, contain/fill |
| `ImageContentCard` | `src/components/ImageContentCard.tsx` | Service/truck cards with image + copy |
| TranZfort demos | `src/components/tranzfort-demo/*` | `PersonaTabDemo`, `MatchFlowDemo`, `AppDemoFrame` embeds |

### 2.4 Live routes today

| Route | Page file | In main nav? | Implementation |
|-------|-----------|:------------:|----------------|
| `/` | `Home.tsx` | via logo | ✅ Shipped  -  hero, stats strip, TranZfort demo, TSM, industries |
| `/services` | `Services.tsx` | Yes | ✅ Shipped  -  trucks/materials, ops, TranZfort demo |
| `/fleet` | `Fleet.tsx` | Yes | ✅ Shipped  -  network backup band, WhatsApp CTA |
| `/network` | `Network.tsx` | Yes | ✅ Shipped  -  TranZfort demos (polish open, §10.4) |
| `/technology` | `Technology.tsx` | Yes (Platform) | ✅ Shipped  -  TSM product story |
| `/industries` | `Industries.tsx` | Yes | ✅ Shipped  -  **8** industry cards (incl. Retail) |
| `/partner` | `Partner.tsx` | Yes | ✅ Shipped  -  dual TranZfort + WhatsApp CTA |
| `/about` | `About.tsx` | Footer only | ✅ Shipped  -  timeline, heritage |
| `/contact` | `Contact.tsx` | Yes | ✅ Shipped  -  WhatsApp-first |
| `/careers` | `Careers.tsx` | Footer only | ✅ Existing  -  unchanged structure |
| `/login` | `Login.tsx` | header only | 🔄 UI only  -  external app URL not wired |
| `/privacy` | `Privacy.tsx` | footer | ✅ Existing |
| `/terms` | `Terms.tsx` | footer | ✅ Existing |
| `*` | `NotFound.tsx` |  -  | ✅ Updated CTAs |

### 2.5 Gaps vs business & content goals

| Gap | Status | Notes |
|-----|--------|-------|
| No TranZfort / Network page | ✅ Done | `/network` live |
| Partner not in nav | ✅ Done | Primary nav |
| Technology label vs TSM story | ✅ Done | Nav **Platform** → `/technology` |
| Primary CTA generic "Get a Quote" | ✅ Done | WhatsApp header, heroes, FAB, CTA bands |
| Hard stats on Home | ✅ Done | Numeric stats strip restored (60+, 500+, 98%, etc.)  -  audit before launch |
| Fake testimonials | ✅ Done | Removed; do not re-add until verified |
| 6 industries vs lab's 7 | ✅ Done | Hub expanded to **8** cards (adds Retail Distribution) |
| No industry detail pages | ✅ Done | `/industries/:slug` × 8 |
| Services truck × material explorer | 🔄 Partial | Truck + material card grids live; full tabbed explorer optional |
| TranZfort interactives quality | ✅ P0/P1 done | Phase 1c  -  dedupe, phone frame, disclaimers, mobile, a11y (§10.4); P2 open |
| Login → app.zaftys.com | ⏸ Deferred | Phase 2  -  hard-redirect intentionally skipped |
| Real client logos / reviews | ⬜ Open | Phase 3 |
| SEO schema (LogisticsService, etc.) | ✅ Done | `src/lib/schema.ts` on Home, Services, Technology, Resources |
| `docs/project-idea.md` | ✅ Done | Product vision doc |

---

## 3. Locked messaging rules

| Topic | Rule |
|-------|------|
| **Positioning** | Transport company first  -  own heavy fleet for suppliers & transporters. TranZfort + TSM are strengths. |
| **Numbers** | Home stats strip uses marketing figures (60+ years, 500+ clients, 98% OTIF, etc.)  -  **audit/verify before launch**. No fake testimonials or trucker/user counts on TranZfort sections. |
| **Heritage** | 60 years / 3 generations = true. Recently registered as ZAFTYS Logistics Pvt Ltd; earlier small truck-owner category. |
| **Transactions** | All business runs through ZAFTYS (registered company). |
| **TranZfort** | Dedicated `/network` page + sections on Home & Services. Link to `https://tranzfort.com`. No published trucker counts. |
| **TSM** | Full product  -  we use it internally and sell to shippers/fleet operators. |
| **Primary CTA** | WhatsApp (`+91-927-092-3581`  -  confirm before launch) |
| **Secondary CTA** | Contact form, Login → `https://app.zaftys.com` |
| **Reviews** | None until verified client quotes exist |

### Qualitative trust strip (original plan  -  superseded on Home)

*Original plan:* static text tiles instead of animated numbers.

*As built:* Home uses **numeric `StatCounter` strip** (restored per product decision). Other pages use qualitative copy where counts are unverified.

| Tile | Label | Sub-label |
|------|-------|-----------|
| 1 | Six Decades | Corridor experience |
| 2 | Own Fleet | Heavy-haul assets |
| 3 | Pan-India | Industrial corridors |
| 4 | Registered Co. | All transactions through ZAFTYS |
| 5 | Live Network | TranZfort marketplace |
| 6 | 24/7 Dispatch | Round-the-clock ops |

---

## 4. Target sitemap overview

### 4.1 Route count

| Category | Routes | Phase |
|----------|-------:|-------|
| Core marketing | 9 | 1 |
| Industry detail | 7 | 2 |
| Legal / system | 4 | 1 |
| **Total** | **20** | |

### 4.2 Site map (visual)

```
zaftys.com
├── /                          Home
├── /services                  Services (freight + TSM + TranZfort blocks)
├── /fleet                     Our fleet
├── /network                   TranZfort marketplace  [NEW]
├── /technology                Platform / ZAFTYS TSM™  [CONTENT EXPAND]
├── /industries                Industries hub
│   ├── /industries/cement                    [Phase 2]
│   ├── /industries/steel-metals              [Phase 2]
│   ├── /industries/coal-mining               [Phase 2]
│   ├── /industries/chemicals                 [Phase 2]
│   ├── /industries/manufacturing             [Phase 2]
│   ├── /industries/fmcg                      [Phase 2]
│   └── /industries/industrial-logistics      [Phase 2]
├── /partner                   Fleet owners & truckers
├── /about                     Company story
├── /contact                   WhatsApp-first contact
├── /careers                   Jobs
├── /login                     Portal entry → app.zaftys.com
├── /privacy
├── /terms
└── 404

External (not routes)
├── https://tranzfort.com      TranZfort app & marketplace
├── https://app.zaftys.com     TSM / client & team login
└── WhatsApp                   Primary conversion
```

### 4.3 URL decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Keep `/technology` URL | **Yes** | Existing links & SEO; nav label becomes **Platform** |
| Add `/platform` alias | Optional Phase 2 | 301 redirect `/platform` → `/technology` if needed |
| Flat company URLs | **Yes** | Keep `/about`, `/careers` (not `/company/about`)  -  matches current codebase |
| Industry slugs | kebab-case | Align with `zaftys-lab/marketing` (`steel-metals`, `industrial-logistics`) |

---

## 5. Navigation & CTAs

### 5.1 Primary navigation (desktop & mobile)

**Problem:** Current nav has 8 items + crowded on `lg`. Partner missing. About competes with conversion pages.

**New primary nav (7 links + logo + 2 actions):** ✅ **Implemented**

| Order | Label | Route | Notes |
|------:|-------|-------|-------|
|  -  | *(logo → Home)* | `/` | |
| 1 | Services | `/services` | Freight offerings |
| 2 | Fleet | `/fleet` | Own trucks |
| 3 | Network | `/network` | **New**  -  TranZfort |
| 4 | Platform | `/technology` | TSM product |
| 5 | Industries | `/industries` | Verticals hub |
| 6 | Partner | `/partner` | **Promoted to nav** |
| 7 | Contact | `/contact` | |

**Moved to footer only:** About Us, Careers, Technology deep links.

**Header actions (right side):**

| Control | Behavior |
|---------|----------|
| Login | → `/login` (or external `app.zaftys.com` when ready) |
| WhatsApp | Primary  -  green button, `wa.me/919270923581?text=...` |

Remove generic **Get a Quote** as primary; WhatsApp replaces it.

### 5.2 Mobile additions

| Element | Behavior |
|---------|----------|
| Hamburger menu | Same 7 links + Login + WhatsApp full-width |
| Sticky WhatsApp FAB | Bottom-right, all pages | ✅ `WhatsAppFab` in `App.tsx` |

### 5.3 Footer columns (updated)

| Column | Links |
|--------|-------|
| **Company** | About, Careers, Contact, Partner |
| **Services** | Services, Fleet, Industries |
| **Platform** | Platform (TSM), Network (TranZfort), Login |
| **Legal** | Privacy, Terms |
| **Contact** | Address, phone, email, WhatsApp, social |

Add footer line: *TranZfort  -  our freight marketplace* → `tranzfort.com`

---

## 6. Page specifications

**Legend:** ✅ Shipped · 🔄 Partial · ⬜ Not started

### Page completion summary

| Page | Route | Status | Notes |
|------|-------|--------|-------|
| Home | `/` | ✅ | Stats strip, TranZfort `PersonaTabDemo`, WhatsApp hero CTA |
| Services | `/services` | ✅ | Truck/material grids, `#tranzfort` `MatchFlowDemo` |
| Fleet | `/fleet` | ✅ | TranZfort overflow link |
| Network | `/network` | 🔄 | Demos live  -  **interactive polish open** (§10.4) |
| Platform | `/technology` | ✅ | TSM sell story |
| Industries | `/industries` | ✅ | 8-card hub |
| Partner | `/partner` | ✅ | Nav + dual CTA |
| About | `/about` | ✅ | Timeline rewrite |
| Contact | `/contact` | ✅ | WhatsApp-first |
| Careers | `/careers` | ✅ | Unchanged |
| Login | `/login` | 🔄 | UI shell; external redirect pending |
| Legal / 404 |  -  | ✅ | CTAs updated on 404 |

---

### 6.1 Home (`/`)  -  ✅

**Goal:** Convert shippers/transporters via WhatsApp; explain own fleet + TranZfort + TSM in one scroll.

**Archetype:** Existing Home  -  hero image + stacked sections.

| # | Section | Background | Component pattern | Content focus |
|---|---------|------------|-------------------|---------------|
| 1 | Hero | Image + navy overlay | Existing hero layout | Heavy loads across India · own fleet · TranZfort network · TSM visibility |
| 2 | Trust strip | White card, `-mt-10` overlap | `StatCounter` × 6 | **Numeric** stats  -  60+, 500+, 98%, 10M+, 20+, 24/7 (audit before launch) |
| 3 | How ZAFTYS works | `bg-muted/30` | 4-step horizontal cards | Request → Own fleet dispatch → TranZfort overflow → TSM tracking |
| 4 | Core services | `bg-muted/30` | `ServiceCard` grid × 4 | FTL, Mining, Contract, Route  -  link to `/services` |
| 5 | TranZfort strip | `bg-navy` | Split text + **`PersonaTabDemo`** | Interactive supplier/trucker flow → `/network`, `tranzfort.com` |
| 6 | Platform / TSM strip | White | Split + `ResponsiveImage` | Dispatch, GPS, ePOD, fleet mgmt → `/technology` |
| 7 | Industries grid | White | `Card` grid | Links to `/industries` hub |
| 8 | Heritage band | `bg-muted/30` | Text + 2 pillars | 3 generations · registered company |
| 9 | CTA | `bg-primary` | WhatsApp `CTAGroup` | *Need heavy load capacity?* |

**Remove / do not re-add:** Client testimonial section.

**Hero CTA:** ✅ "Get a Free Quote" via WhatsApp restored.

**SEO title:** *Industrial Trucking & Heavy Load Transport | ZAFTYS Logistics*

---

### 6.2 Services (`/services`)  -  ✅

**Goal:** Show what we move and how we operate; bridge freight → TSM → TranZfort.

**Archetype:** Hero + multi-section scroll (extend current page).

| # | Section | id anchor | Pattern | Content |
|---|---------|-----------|---------|---------|
| 1 | Hero |  -  | Hero | Industrial trucking for steel, cement, mining, bulk |
| 2 | Service cards | `#ftl` etc. | Existing 5-card grid | FTL, Mining, Industrial contract, Route opt, Enterprise  -  soften unverified stats |
| 3 | Transportation explorer | `#transportation-explorer` | Truck × material tabbed matrix | ✅ `TransportationExplorer` |
| 4 | Operations / TSM | `#operations` | Feature grid | GPS, dispatch, ePOD, analytics → `/technology` |
| 5 | TranZfort overflow | `#tranzfort` | **`MatchFlowDemo`** + steps + CTA | ✅ Interactive booking simulation |
| 6 | CTA |  -  | Navy band | WhatsApp freight quote |

**Phase 1 UI note:** Full tabbed transportation explorer deferred; current truck/material grids use `ImageContentCard` + lab image mappings.

---

### 6.3 Fleet (`/fleet`)  -  ✅

**Goal:** Prove owned capacity and safety; support transport-first positioning.

| # | Section | Pattern | Content |
|---|---------|---------|---------|
| 1 | Hero | Image hero | Engineered for reliability · company-owned heavy assets |
| 2 | Truck types | Card grid × 3 | Multi-axle, container, mining tippers  -  keep current |
| 3 | Fleet features | Icon grid × 5 | GPS, telematics, maintenance, safety, eco  -  keep current |
| 4 | Network backup | Single band | *Surge capacity via TranZfort network* → `/network` |
| 5 | CTA | Primary band | WhatsApp |

**Copy change:** Replace *200+ vehicles* with *modern company-owned fleet* unless verified.

---

### 6.4 Network (`/network`)  -  🔄 (demos v1 shipped; polish open)

**Goal:** Explain TranZfort on zaftys.com; drive app download and partner signups.

**Archetype:** Hero + interactive app demos + comparison + CTA. Demos ported from `tranzfort-lab/marketing` (light `theme="app"` only).

| # | Section | Pattern | Content | Interactive embed |
|---|---------|---------|---------|-------------------|
| 1 | Hero | Navy hero, 2-col | TranZfort  -  ZAFTYS freight marketplace | `PersonaTabDemo` (supplier / trucker tabs) |
| 2 | Trust pulse | Qualitative tiles × 4 | Growing network · corridors · verified onboarding · ZAFTYS transactions |  -  |
| 3 | How it works | Demo + copy | Post load → truckers book → ZAFTYS fulfils & pays | `MatchFlowDemo` in `AppDemoFrame` panel |
| 4 | Audience | Demo + client note | Shippers · truckers · ZAFTYS clients | `PersonaTabDemo` + static card for ZAFTYS clients |
| 5 | Product highlights | Feature grid × 6 | AI routes, offline voice, load match, KYC, LR scan  -  no user counts |  -  |
| 6 | vs traditional | 2-column comparison | Standalone load board vs ZAFTYS-integrated network |  -  |
| 7 | CTA | Split | Primary → `tranzfort.com` · Secondary → `/partner` · Tertiary → WhatsApp |  -  |

**Demo bundle:** `src/components/tranzfort-demo/` + `src/styles/tranzfort-demo.css`  
**Source inventory (lab):** `AppDemoFrame`, `DemoTabBar`, `PersonaTabDemo`, `MatchFlowDemo`, `PostLoadDemo`, `FindLoadsDemo`, `app-ui/*`, `fixtures/*`  
**Also embedded:** Home TranZfort band → `PersonaTabDemo`; Services `#tranzfort` → `MatchFlowDemo`  
**Guardrails:** No fake user/review counts; all transactions through ZAFTYS; link out to tranzfort.com for app download.  
**Open (§10.4):** Improve layout, dedupe demos, phone chrome, motion, mobile UX.

**Files:** `src/pages/Network.tsx`, route in `App.tsx`

---

### 6.5 Platform / Technology (`/technology`)  -  ✅

**Goal:** Sell ZAFTYS TSM™ as complete TMS + fleet software.

**Nav label:** Platform → **route stays `/technology`**

| # | Section | Pattern | Content |
|---|---------|---------|---------|
| 1 | Hero | Image hero | ZAFTYS TSM™  -  transport & fleet management |
| 2 | Product story | Split layout | Built for our ops · available for shippers & fleet owners |
| 3 | Capabilities | 3-col card grid | GPS, trips, driver app, ePOD, fleet docs, analytics, client portal |
| 4 | Buyer paths | 2 cards | For shippers/transporters · For fleet operators |
| 5 | Dashboard preview | Mock panel | Keep abstract preview  -  label as product UI |
| 6 | CTA | Navy band | Request demo (contact form) · Login → `app.zaftys.com` |

**Remove:** Unverified benefit stats (15%, 30%) unless audited.

---

### 6.6 Industries hub (`/industries`)  -  ✅

**Goal:** Vertical SEO + corridor credibility.

**Phase 1:** Hub ships **8** cards (Cement, Coal & Mining, Steel, Chemicals, Manufacturing, FMCG, Retail Distribution, Industrial Logistics).

| # | Section | Pattern | Content |
|---|---------|---------|---------|
| 1 | Hero | Image hero | Built for industrial supply chains |
| 2 | Industry grid | `Card` × **8** | See list above |
| 3 | Trust band | 3 columns | Compliance · scalable capacity · tech-integrated (drop API claim if not live) |
| 4 | CTA | Primary band | WhatsApp  -  *Get a quote for your industry* |

**Phase 2:** Individual routes (see §7).

**Lab content source:** `zaftys-lab/marketing/content/industries/playbooks.ts`  -  use corridor/asset/compliance copy, strip Control Tower jargon.

---

### 6.7 Partner (`/partner`)  -  ✅

**Goal:** Onboard fleet owners / truckers into TranZfort + ZAFTYS network.

| # | Section | Pattern | Content |
|---|---------|---------|---------|
| 1 | Hero | Navy grid hero | Grow with ZAFTYS |
| 2 | Benefits | Icon cards × 4 | Loads, payments via ZAFTYS, verification, TSM access at scale |
| 3 | Steps | 4-step cards | Register → Verify → Onboard → Earn  -  **keep current** |
| 4 | Application form | Existing PHP form | **keep current** |
| 5 | CTA | WhatsApp + TranZfort | Talk to fleet team · Download app |

---

### 6.8 About (`/about`)  -  ✅

**Goal:** Heritage + registered company story.

| # | Section | Pattern | Content |
|---|---------|---------|---------|
| 1 | Hero | Image hero | Legacy on wheels · innovation in motion |
| 2 | Story | 2-col text + stats | 3 generations · small operator era → Pvt Ltd registration |
| 3 | Timeline | Vertical timeline | 1960 foundation → 1990s expansion → 2010s modern fleet → 2020s TranZfort + TSM |
| 4 | Values | Card grid × 4 | Integrity, Precision, Client focus, Sustainability  -  keep |
| 5 | Today | 3 pillars | Own fleet · TranZfort · TSM |
| 6 | CTA | WhatsApp + Careers | |

---

### 6.9 Contact (`/contact`)  -  ✅

**Goal:** WhatsApp-first lead capture.

| # | Section | Pattern | Content |
|---|---------|---------|---------|
| 1 | Hero | Simple band | Get in touch |
| 2 | WhatsApp hero CTA | **New**  -  large green button above fold | Pre-filled quote message |
| 3 | Contact cards | Existing 4-card grid | HQ, phone, email, hours |
| 4 | Form | Existing PHP form | Interest select: Freight · Platform demo · Partner · Careers |
| 5 | Map / address | Optional embed | Pune WTC Kharadi |

---

### 6.10 Careers (`/careers`)  -  ✅

**Goal:** Hiring  -  unchanged structure.

| # | Section | Notes |
|---|---------|-------|
| Hero + listings + apply form | Keep current PHP careers API |

**Nav:** Footer + About cross-link only (drop from primary nav).

---

### 6.11 Login (`/login`)  -  🔄

**Goal:** Portal entry point.

| Item | Value |
|------|-------|
| Tabs | Client · Team  -  keep current UI |
| Submit | Phase 1: link to `https://app.zaftys.com` |
| Copy | *Access ZAFTYS TSM™ client portal and team dashboard* |

---

### 6.12 Legal & 404  -  ✅

| Route | Action |
|-------|--------|
| `/privacy` | Keep; add TranZfort data processing note if needed |
| `/terms` | Keep |
| `404` | Keep; add links to Services, Network, Contact |

---

## 7. Phase 2  -  Industry detail pages

Add when hub is live and content is ready. Each page reuses **Industries hero + card sections** pattern (no new layout system).

| Route | Slug | Priority | Lab spec |
|-------|------|----------|----------|
| `/industries/cement` | cement | P0 | `industry-cement.md` |
| `/industries/steel-metals` | steel-metals | P0 | `industry-steel-metals.md` |
| `/industries/coal-mining` | coal-mining | P1 | New slug (lab uses mining in services) |
| `/industries/chemicals` | chemicals | P1 | `industry-chemicals.md` |
| `/industries/manufacturing` | manufacturing | P2 | `industry-manufacturing.md` |
| `/industries/fmcg` | fmcg | P2 | `industry-fmcg.md` |
| `/industries/industrial-logistics` | industrial-logistics | P2 | `industry-industrial-logistics.md` |

**Detail page section stack (per industry):**

1. Hero  -  vertical name + pain headline  
2. Challenge  -  3 pain bullets (corridor, asset, compliance)  
3. How ZAFTYS helps  -  own fleet + TranZfort + TSM  
4. Typical corridors & equipment  -  playbook content from lab  
5. CTA  -  WhatsApp with industry pre-fill  

**Implementation:** `src/pages/industries/[slug].tsx` or static routes per slug  -  match existing flat routing style in `App.tsx`.

---

## 8. External integrations

| Destination | Used from | Purpose |
|-------------|-----------|---------|
| `https://tranzfort.com` | Network page, Home strip, Footer, Partner | App download, marketplace |
| `https://app.zaftys.com` | Login, Platform CTAs | TSM portal |
| `https://wa.me/919270923581` | All primary CTAs | Freight quotes, partner enquiries |
| `/api/contact.php` | Contact | Form backup |
| `/api/partner.php` | Partner | Fleet applications |
| `/api/careers.php` | Careers | Job applications |
| `/api/newsletter.php` | Footer | Newsletter |

**WhatsApp pre-fill template:**

```
Hi ZAFTYS, I'd like a quote for heavy load transport.
From: 
To: 
Load type: 
```

---

## 9. What we are NOT building (defer)

These exist in `zaftys-lab/marketing` but **do not fit** current `zaftys-main` UI scope or business priority:

| Lab route | Reason to defer |
|-----------|-----------------|
| `/platform/los-core`, `/visibility`, `/control-tower`, etc. | Sub-product pages  -  consolidate into single `/technology` until nav supports dropdown |
| `/solutions/*` (enterprise, broker, 3pl) | Enterprise SaaS segmentation  -  overkill for transport-first site |
| `/blog` | ✅ Index + 5 posts; `/resources` redirects here |
| GCC / SEA emerging markets | Not current market focus |
| Ask ZAFTYS / Intelligence Cloud marketing | Tool-level detail  -  ignore per content brief |
| Ferrofluid / glass marketing shell | Different design system  -  keep zaftys-main industrial navy/orange UX |

---

## 10. Implementation roadmap & task tracker

**Legend:** ✅ Done · 🔄 Partial · ⬜ Open

### Phase 1  -  IA & content  -  ✅ Complete

| Task | Status | Files |
|------|:------:|-------|
| Add `/network` route + page | ✅ | `Network.tsx`, `App.tsx` |
| Update navigation (7 links, Platform, Network, Partner) | ✅ | `Navigation.tsx` |
| Update footer (Network, Partner, tranzfort.com) | ✅ | `Footer.tsx` |
| WhatsApp CTA helper + sticky FAB | ✅ | `WhatsAppButton.tsx`, `App.tsx` |
| Home content restructure | ✅ | `Home.tsx` |
| Home stats strip (numeric) + hero WhatsApp CTA | ✅ | `Home.tsx`, `StatCounter.tsx` |
| Platform page copy pass | ✅ | `Technology.tsx` |
| Services  -  trucks, materials, ops, TranZfort | ✅ | `Services.tsx` |
| Industries hub (8 cards) | ✅ | `Industries.tsx` |
| About timeline rewrite | ✅ | `About.tsx` |
| Contact WhatsApp-first | ✅ | `Contact.tsx` |
| Partner nav + dual CTA | ✅ | `Partner.tsx` |
| Fleet network backup band | ✅ | `Fleet.tsx` |
| CTA readability fixes site-wide | ✅ | `button.tsx`, `CTAGroup.tsx`, pages |
| Service / truck image fixes | ✅ | `ResponsiveImage.tsx`, `services-images.ts`, `public/images/` |
| Shared constants + WhatsApp URL | ✅ | `src/lib/constants.ts` |
| Marketing content blueprint doc | ✅ | `docs/marketing-content-blueprint.md` |
| Remove fake testimonials / Why ZAFTYS band | ✅ | `Home.tsx` |

### Phase 1b  -  TranZfort interactive demos (v1)  -  ✅ Complete

| Task | Status | Files |
|------|:------:|-------|
| Port demo bundle from `tranzfort-lab` | ✅ | `src/components/tranzfort-demo/**` |
| Scoped app UI styles | ✅ | `src/styles/tranzfort-demo.css`, `main.tsx` |
| Network  -  hero `PersonaTabDemo` | ✅ | `Network.tsx` |
| Network  -  how-it-works `MatchFlowDemo` | ✅ | `Network.tsx` |
| Network  -  audience `PersonaTabDemo` + clients card | ✅ | `Network.tsx` |
| Home TranZfort band → `PersonaTabDemo` | ✅ | `Home.tsx` |
| Services `#tranzfort` → `MatchFlowDemo` | ✅ | `Services.tsx` |

**Deferred from 1b:** dark marketing theme, `HeroRoleStage`, assistant chat demos, `framer-motion`  -  see Phase 1c.

### Phase 1c  -  Improve TranZfort interactives  -  ✅ **SHIPPED**

| # | Task | Priority | Status |
|---|------|----------|--------|
| 5 | **Motion & step reveals** | P1 | ✅ `framer-motion` on `MatchFlowDemo` |
| 6 | **Hero role stage** | P2 | ✅ `HeroRoleStage` on Network hero |
| 7 | **Assistant / voice demo** | P2 | ⏸ Optional  -  not ported |
| 11 | **Feature highlight tie-in** | P2 | ✅ Network cards link to demo anchors |

### Phase 2  -  Depth  -  ✅ **SHIPPED** (except Login redirect)

| Task | Status | Notes |
|------|:------:|-------|
| Industry detail routes × 8 | ✅ | `/industries/:slug` |
| Services transportation explorer | ✅ | `#transportation-explorer` |
| `/blog` Blog | ✅ | Header + footer; 5 launch posts; `/resources` → `/blog` |
| `/platform` → `/technology` redirect | ✅ | |
| Login → `app.zaftys.com` | ⏸ | **Deferred**  -  UI login page retained |

### Phase 3  -  Polish  -  ⬜ Open

| Task | Status | Notes |
|------|:------:|-------|
| Real client logos / reviews | ⬜ | When available |
| Industry playbook tabs on detail pages | ✅ | Overview / Operations / Equipment tabs |
| SEO schema updates | ✅ | Shipped in Phase 2 closeout |
| Publish Knowledge Center articles | ✅ | 5 posts live on `/blog` |
| `docs/marketing-copy-deck.md` | ⬜ | Optional final copy deck |

---

## 11. Content source matrix

| Page | Primary copy source | Lab reference file |
|------|---------------------|-------------------|
| Home | New + existing Home | `homepage.ts` (threeSystems, industries  -  simplified) |
| Services | Existing + lab | `services.ts`, `services-transportation.ts` |
| Network | New | `network.ts`, `network/hub.ts` |
| Platform | Existing Technology | `services.ts` → operationsApp, `platform/overview.ts` |
| Industries hub | Existing + lab | `industries/hub.ts` |
| Industry detail | Lab playbooks | `industries/playbooks.ts` |
| About | Existing + lab | `company/about.ts` + heritage nuance |
| Partner | Existing | `network.ts` → audience carriers |

---

## 12. Decision log

| Date | Decision |
|------|----------|
| Jul 2026 | Transport-first positioning; numeric Home stats restored (audit before launch) |
| Jul 2026 | WhatsApp primary CTA site-wide |
| Jul 2026 | Add `/network`; promote `/partner` to nav |
| Jul 2026 | Keep `/technology` URL; nav label **Platform** |
| Jul 2026 | Drop Careers + About from primary nav → footer |
| Jul 2026 | No testimonials until verified |
| Jul 2026 | TSM presented as full sellable product |
| Jul 2026 | Reuse zaftys-main UI patterns  -  no lab design system migration |
| Jul 2026 | Phase 1b: embed TranZfort light app demos (v1 shipped from tranzfort-lab) |
| Jul 2026 | Phase 1c P0/P1: TranZfort demo polish shipped (dedupe, phone frame, disclaimers, mobile, a11y) |
| Jul 2026 | Phase 2: `/industries/:slug` detail pages (8 verticals); `/platform` redirect; demo lazy-load |

---

## 13. Related documents

| Document | Status |
|----------|--------|
| `docs/copy.md` | ✅ Live site copy snapshot |
| `docs/copy-v2-index.md` | ✅ V2 library map (`copy-v2-a` … `copy-v2-n`) |
| `docs/copy-v2-a.md` … `copy-v2-n.md` | ✅ Page copy drafts complete (`k` = UI stub only) |
| `docs/marketing-content-blueprint.md` | ✅ Created  -  page/section/card map |
| `docs/marketing-website-sitemap-new.md` | ✅ This file  -  canonical IA + task tracker |
| `docs/project-idea.md` | ✅ Product vision |
| `/blog` | ✅ Blog hub + `/blog/:slug` posts (`/resources` redirects) |
| `docs/marketing-copy-deck.md` | ⬜ Optional  -  page-by-page final copy |
| `zaftys-lab/docs/marketing/` | Reference  -  industry/playbook deep specs |

---

*This sitemap is the canonical IA reference for `zaftys-main` marketing site updates.*
