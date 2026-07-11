# ZAFTYS Marketing Content Blueprint

Canonical map of pages, sections, card grids, and imagery for zaftys.com. Aligns with locked messaging rules and grid layout discipline.

---

## Messaging Rules (locked)

| Rule | Implementation |
|------|----------------|
| Positioning | Transport company first  -  own heavy fleet for suppliers & transporters |
| Numbers | No exact fleet/client/trucker counts; qualitative language only |
| Heritage | 60 years / 3 generations; recently registered as **ZAFTYS Logistics Pvt Ltd** |
| Transactions | All business through ZAFTYS (registered company) |
| TranZfort | Dedicated `/network` page; link to tranzfort.com; no user counts |
| TSM | Full product  -  internal ops + sold to shippers/fleet operators |
| Primary CTA | **WhatsApp** (+91-927-092-3581) |
| Reviews | None until real verified quotes |
| Login | `https://app.zaftys.com` |

---

## Grid Layout Rule

Card grids must fill rows evenly for their column count:

| Columns | Valid card counts |
|---------|-------------------|
| 3-col | 3, 6, 9 |
| 4-col | 4, 8 |
| 2-col | 2, 4, 6, 8 |

**Avoid:** 5, 7, or any count that leaves a lone card on the last row.

---

## Image Inventory (from zaftys-lab)

Copied to `public/images/`:

### Services  -  Trucks (`/images/services/trucks/`)
- `open-body.png`, `tipper.png`, `trailer.png` (flatbed), `bulker.png` (tanker), `container.png`, `contract.jpg`, `all-trucks.png`

### Services  -  Materials (`/images/services/materials/`)
- `mining.png`, `construction.png`, `metals.png`, `energy.png`, `fmcg.png`, `agriculture.png`, `all-materials.png`

### Services  -  Home pillars (`/images/services/home/`)
- `transportation.png`, `operations-app.png`, `tranzfort.png`

### Marketing  -  Industries (`/images/marketing/`)
- `industry-cement.png`, `industry-steel-metals.png`, `industry-chemicals.png`, `industry-manufacturing.png`, `industry-fmcg.png`, `industry-retail.png`, `industry-industrial-logistics.png`, `legacy-heritage.png`

### Hero assets (bundled in `src/assets/`)
- `hero-home.jpg`, `hero-fleet.jpg`, `hero-industries.jpg`, `hero-about.jpg`, `hero-technology.jpg`

---

## Site Map & Page Blueprints

### Home (`/`)

| # | Section | Layout | Cards / Content |
|---|---------|--------|-----------------|
| 1 | Hero | Full-bleed image + headline | CTA: WhatsApp primary, secondary links to Services / Fleet |
| 2 | **Why ZAFTYS** band | 3 pillars (replaces old TrustStrip) | Corridor Heritage · Registered Operator · Network & Platform |
| 3 | How it works | **4-col** (4 steps) | Need capacity → Dispatch fleet → Network scales → Full visibility |
| 4 | Core services | **3-col × 2 rows** (6 cards) | FTL, Mining, Contract, Route Opt, Enterprise, Network Overflow |
| 5 | Industries preview | **3-col × 2 rows** (6 cards + images) | Cement, Coal, Steel, Chemicals, Manufacturing, Industrial Logistics; FMCG/Retail as text link |
| 6 | TranZfort teaser | Split: image + copy | `tranzfort.png`; link to `/network` |
| 7 | TSM teaser | Split: copy + image | `operations-app.png`; link to `/technology` |
| 8 | Heritage | Split: `legacy-heritage.png` + story | 60 years, registered company narrative |
| 9 | CTA | Centered | WhatsApp quote |

---

### Services (`/services`)

| # | Section | Layout | Cards / Content |
|---|---------|--------|-----------------|
| 1 | Hero | Image: `transportation.png` background | Heavy-haul positioning |
| 2 | Truck types | **3-col × 2** (6 `ImageContentCard`) | Open body, Tipper, Flatbed, Tanker, Container, Contract  -  truck images |
| 3 | Materials | **3-col × 2** (6 cards) | Mining, Construction, Metals, Energy, FMCG, Agriculture  -  material images |
| 4 | Service programs | **6 alternating rows** (not a broken grid) | Curated programs with icons |
| 5 | TSM capabilities | **3-col × 2** (6 cards) | GPS, Dispatch, 24/7, Fleet mgmt, Client portal, ePOD |
| 6 | TranZfort | **3 steps** (3-col OK) + pillar image | Post → Book → Deliver |
| 7 | CTA | WhatsApp |

---

### Fleet (`/fleet`)

| # | Section | Layout | Cards / Content |
|---|---------|--------|-----------------|
| 1 | Hero | `hero-fleet.jpg` | Own fleet positioning |
| 2 | Truck configurations | **3-col × 2** (6 cards with images) | Same 6 truck types as Services |
| 3 | Smart capabilities | **3-col × 2** (6 features) | Tracking, Telematics, Maintenance, Safety, Eco, TSM connected |
| 4 | TranZfort backup | Text + link | Surge capacity story |
| 5 | CTA | WhatsApp |

---

### Network / TranZfort (`/network`)

| # | Section | Layout | Cards / Content |
|---|---------|--------|-----------------|
| 1 | Hero | Navy + network visual | Link to tranzfort.com |
| 2 | Pulse strip | **4-col** (2×2 mobile) | Growing network, Corridors, Verified onboarding, ZAFTYS transactions |
| 3 | How it works | **3 steps** | Post load → Truckers book → ZAFTYS delivers |
| 4 | Audience tabs | **3 tabs** (shippers / truckers / clients) | Bullet lists per audience |
| 5 | Why TranZfort | **3-col × 2** (6 highlights from `constants.ts`) | Route AI, Voice, Offline, Verified, Matching, ZAFTYS transactions |
| 6 | Comparison | **2-col** | Load board vs ZAFTYS network |
| 7 | CTA | TranZfort.com + WhatsApp |

---

### Technology / TSM (`/technology`)

| # | Section | Layout | Cards / Content |
|---|---------|--------|-----------------|
| 1 | Hero | `hero-technology.jpg` | TSM platform |
| 2 | Platform features | **3-col × 2** (6 capabilities) | Same as Services TSM section |
| 3 | Who uses it | Split narrative | Internal ops + sold to shippers |
| 4 | Login CTA | Button → app.zaftys.com | |

---

### Industries (`/industries`)

| # | Section | Layout | Cards / Content |
|---|---------|--------|-----------------|
| 1 | Hero | `hero-industries.jpg` | Industrial supply chains |
| 2 | Vertical cards | **4-col × 2** (8 industries) | Cement, Coal, Steel, Chemicals, Manufacturing, FMCG, Retail, Industrial Logistics  -  each with image, features, highlight |
| 3 | Cross-cutting value | **3-col** | Compliance, Scalable capacity, Full visibility |
| 4 | CTA | WhatsApp |

---

### About (`/about`)

| # | Section | Content |
|---|---------|---------|
| 1 | Hero | Heritage + registered company |
| 2 | Story | 3 generations, corridor experience |
| 3 | Values / pillars | 3–4 items (even count) |
| 4 | CTA | WhatsApp or Contact |

---

### Partner (`/partner`)

| # | Section | Content |
|---|---------|---------|
| 1 | Hero | For transporters & fleet partners |
| 2 | Partnership models | **4 or 6 cards** (even grid) |
| 3 | Why partner | Bullet benefits |
| 4 | CTA | WhatsApp |

---

### Contact (`/contact`)

| # | Section | Content |
|---|---------|---------|
| 1 | Hero | Get in touch |
| 2 | WhatsApp primary | Large CTA |
| 3 | Form / details | Secondary |
| 4 | Office / corridor info | Optional |

---

### Login (`/login`)

Redirect narrative + button to `app.zaftys.com`.

---

## Shared Components

| Component | Purpose |
|-----------|---------|
| `WhyZaftysBand` | Replaces TrustStrip  -  3-pillar heritage/registered/network band |
| `WhatsAppButton` + `WhatsAppFab` | Primary conversion |
| `ImageContentCard` | Image + title + description for truck/material grids |
| `constants.ts` | Single source for card arrays (even counts) |
| `services-images.ts` | Image path helpers |

---

## Content Arrays (`src/lib/constants.ts`)

| Export | Count | Used on |
|--------|-------|---------|
| `homeHowItWorks` | 4 | Home |
| `homeIndustries` | 6 | Home |
| `coreServices` | 6 | Home |
| `truckTypes` | 6 | Services, Fleet |
| `materialTypes` | 6 | Services |
| `tsmCapabilities` | 6 | Services, Technology |
| `networkHighlights` | 6 | Network |

---

## Phase 2 Ideas (not implemented)

- Individual industry detail pages (`/industries/cement`, etc.) from lab playbooks
- Real client logos / case studies when available
- Hindi/regional language toggle
- Corridor map interactive section
- Blog / insights for SEO
- Careers page refresh with open roles

---

## What We Replaced

**Old TrustStrip (removed):**
> Six Decades · Own Fleet · Pan-India · Registered Co. · Live Network · 24/7 Dispatch

**New WhyZaftysBand:**
> Heritage on the road. A registered company built for scale.
> - **Corridor Heritage**  -  60 years moving industrial freight
> - **Registered Operator**  -  ZAFTYS Logistics Pvt Ltd; every transaction through us
> - **Network & Platform**  -  Own fleet + TranZfort + TSM™ visibility

This tells a story instead of listing disconnected stats.
