# ZAFTYS Marketing Site  -  Live Copy Inventory

| Field | Value |
|-------|-------|
| **Purpose** | Carbon copy of all user-facing copy currently on `zaftys.com` (zaftys-main) |
| **Source of truth** | React pages in `src/pages/*`, shared strings in `src/lib/constants.ts`, chrome in `Navigation.tsx` / `Footer.tsx` |
| **Status** | **V2 copy implemented** in React components (Jul 2026) · Canonical drafts in `copy-v2-a` … `copy-v2-n` (see [copy-v2-index.md](./copy-v2-index.md)) |
| **Last synced** | July 2026 (post V2 + Phase 1c demo polish) |

Use this file to review, rewrite, and approve copy before pushing changes back into components.

---

## Improvement backlog (copy)  -  PARTIAL

| Area | Issue | Priority | Status |
|------|-------|----------|--------|
| **Hero headlines** | Generic transport slogans | P0 | ✅ V2 heroes shipped |
| **Stats strip (Home)** | Unverified hard numbers | P0 | ✅ Replaced with qualitative trust strip |
| **TranZfort / Network** | “AI-powered marketplace” phrasing | P1 | ✅ De-marketplaced site-wide |
| **Services programs** | Long feature lists; similar tone | P1 | ⬜ Open |
| **Industries** | Card copy dense; no detail-page depth | P1 | ⬜ Open (Phase 2 routes) |
| **About** | Mission/vision overlap with Home | P1 | 🔄 Improved; may need another pass |
| **Careers** | Unverified superlatives | P2 | ✅ Softened in V2 |
| **Contact FAQ** | Quote turnaround claims  -  verify | P2 | ⬜ Open |
| **Demo embeds** | No demo disclaimer | P1 | ✅ `DemoDisclaimer` on all embeds |
| **Legal** | Privacy/Terms dated Nov 2025 | P2 | ⬜ Open |

---

## Global chrome

### Navigation

**Primary links:** Services · Fleet · Network · Platform · Industries · Partner · Contact

**Header actions:**
- Login → `/login`
- WhatsApp → `https://wa.me/919270923581`

**Mobile menu:** Same links + Login + “Chat on WhatsApp”

### Sticky WhatsApp FAB

- Icon-only floating button (all pages)
- Links to default WhatsApp pre-fill message (see below)

### Footer

**Tagline:**  
Heavy industrial freight across India. Own fleet, TranZfort network, and ZAFTYS TSM™  -  three generations of corridor experience.

**Link  -  Explore TranZfort network** → `https://tranzfort.com`

**Newsletter**
- Heading: Stay Updated
- Sub: Get the latest industry insights and company news.
- Placeholder: Enter your email address
- Button: Subscribe / Subscribing...
- Toast success: Subscribed  -  You have been added to our newsletter list.

**Contact column**
- World Trade Center, Kharadi  -  Pune, India - 411014
- +91-927-092-3581
- WhatsApp us
- contact@zaftys.com

**Company:** About Us · Careers · Contact · Partner  
**Services:** Services · Our Fleet · Industries  
**Platform:** Platform (TSM™) · TranZfort Network · Login · tranzfort.com  
**Legal:** Privacy Policy · Terms of Service · Cookie Policy  
**Copyright:** © {year} ZAFTYS Logistics Pvt Ltd. All rights reserved.

### WhatsApp default pre-fill

```
Hi ZAFTYS, I'd like a quote for heavy load transport. From:  To:  Load type: 
```

**Phone:** +91-927-092-3581 (`919270923581`)

### External links

- TranZfort: `https://tranzfort.com`
- TSM portal: `https://app.zaftys.com`

---

## Home (`/`)

**SEO title:** Industrial Logistics & Heavy Freight Transport  
**SEO description:** Move industrial freight with company-operated transport, operational visibility through ZAFTYS TSM, and scalable capacity via TranZfort. Get a quote on WhatsApp.

### Section 1  -  Hero

- **H1:** Industrial Logistics, Built for Modern Supply Chains.
- **Sub:** ZAFTYS brings transport operations, intelligent technology, and a verified logistics network together  -  so your business moves freight with greater visibility, reliability, and control.
- **CTA primary:** Request a Quote (WhatsApp)
- **CTA secondary:** Explore Services → `/services`

### Section 2  -  Trust strip (qualitative)

| Label | Sublabel |
|-------|----------|
| Six Decades | Corridor experience |
| Own Fleet | Heavy-haul assets |
| Pan-India | Industrial corridors |
| Registered Co. | ZAFTYS Logistics Pvt Ltd |
| Live Network | TranZfort capacity |
| 24/7 Dispatch | Operations support |

### Section 3  -  Ecosystem

- **H2:** One Logistics Ecosystem. Complete Operational Visibility.
- **Intro:** Professional transport operations, intelligent transport management, and verified transport capacity  -  one trusted organization, one connected ecosystem.

| Step | Title | Body |
|------|-------|------|
| 01 | You need capacity | Direct suppliers and large transporters reach out to ZAFTYS for heavy industrial loads. |
| 02 | We dispatch our fleet | Your load is assigned to our company-owned trucks. Every contract runs through ZAFTYS Logistics Pvt Ltd. |
| 03 | Network scales you | When demand exceeds our fleet, loads are posted on TranZfort where verified truckers book and fulfil under ZAFTYS. |
| 04 | Full visibility | ZAFTYS TSM™ tracks every trip  -  powering our operations today and available for your business. |

### Section 4  -  Core services

- **H2:** Logistics Built for Industry
- **Intro:** Heavy loads for direct suppliers and large transporters  -  cement, steel, mining, and bulk freight.

| Card | Description | Link |
|------|-------------|------|
| Full Truckload (FTL) | Dedicated heavy-haul for bulk loads  -  coal, cement, steel, and industrial freight across India. | `/services#ftl` |
| Mining Logistics | Rugged terrain specialists moving raw materials from mines to plants safely and on schedule. | `/services#mining` |
| Contract Logistics | Long-term fleet partnerships with predictable capacity for direct suppliers and transporters. | `/services#contract` |
| Route Optimization | Smart corridor planning to cut empty miles and keep your loads moving efficiently. | `/services#optimization` |
| Enterprise Programs | Dedicated account management, SLAs, and visibility for large transporter partnerships. | `/services#enterprise` |
| Network Overflow | TranZfort network capacity when demand exceeds own fleet  -  still through ZAFTYS. | `/network` |

- **CTA:** View All Services → `/services`

### Section 5  -  TranZfort strip

- **Eyebrow:** TranZfort Network
- **H2:** Expand Capacity Without Expanding Complexity.
- **Body:** When demand exceeds our fleet, ZAFTYS expands through the verified TranZfort network. You keep one logistics partner, one communication channel, and the same operational standards.
- **CTA:** Explore TranZfort (external) · Learn About the Network → `/network`
- **Embed:** PersonaTabDemo (phone frame, supplier/trucker tabs)
- **Disclaimer:** Sample data · demo UI only · all transactions through ZAFTYS Logistics

### Section 6  -  ZAFTYS TSM™

- **Eyebrow:** ZAFTYS TSM™
- **H2:** Technology That Supports Every Shipment.
- **Body:** ZAFTYS TSM connects dispatch, fleet records, documentation, and customer visibility in one operational platform  -  built for our fleet and available for shippers and operators.

| Feature | Description |
|---------|-------------|
| Live GPS Tracking | Real-time location and ETA on every active shipment. |
| Dispatch & Analytics | Trip management, lane costs, and performance reporting. |
| 24/7 Operations | Round-the-clock dispatch and exception handling. |
| Fleet & Driver Mgmt | Vehicles, drivers, documents, and compliance in one place. |
| Client Portal | Shippers track loads and access ePOD without calling dispatch. |
| Digital Docs | LR, invoices, and proof of delivery stored securely. |

- **CTA:** See the Platform → `/technology`

### Section 7  -  Industries

- **H2:** Industries We Serve
- **Intro:** Specialized heavy-haul for India's core industrial verticals.

**Cards (6 on Home):** Cement & Construction · Coal & Mining · Steel & Metals · Chemicals · Manufacturing · Industrial Logistics

- **Footnote:** Also serving FMCG and retail distribution. View all industries → `/industries`

### Section 8  -  Heritage

- **H2:** Built On Real Logistics Experience.
- **Body:** ZAFTYS was created from decades of industrial freight experience  -  from family-operated corridors to ZAFTYS Logistics Pvt Ltd, combining own fleet, TranZfort network capacity, and ZAFTYS TSM for businesses that cannot afford delays.
- **CTA:** Our Story → `/about`

### Section 9  -  CTA band

- **H2:** Ready to Move Freight With Greater Confidence?
- **Body:** Tell us your corridor, load type, and volume on WhatsApp  -  our operations team will recommend the right logistics solution.
- **CTA:** Chat on WhatsApp

---

## Services (`/services`)

**SEO title:** Industrial Logistics Services  -  FTL, Contract & Heavy Haul  
**SEO description:** FTL, mining logistics, contract fleet, project cargo, and overflow capacity on industrial corridors across India. Own fleet + TranZfort network + TSM visibility.

### Hero

- **Eyebrow:** Industrial Trucking
- **H1:** Industrial Logistics Services Built Around Your Business.
- **Sub:** ZAFTYS develops transport solutions around your cargo, schedules, and compliance needs  -  supported by experienced professionals and intelligent technology.
- **CTA:** Get a Freight Quote (WhatsApp) · Explore Truck Types → `#trucks`

### Truck types (`#trucks`)

- **H2:** Truck Types We Deploy
- **Intro:** Body type, payload, and material must align before dispatch  -  the same discipline on every industrial lane.

| Truck | Tagline | Description |
|-------|---------|-------------|
| Open Body | 7-35T · bulk solids | High-side and flat-deck trucks for coal, aggregates, bagged cement, and steel lengths on industrial corridors. |
| Tipper / Dumper | 16-35T · loose bulk | Hydraulic discharge for sand, ore, overburden, and mine outbound  -  pit-to-plant specialists. |
| Flatbed / Low-bed | 20-40T · heavy haul | Open deck and multi-axle trailers for steel coils, machinery, pipes, and project cargo. |
| Bulk Tanker | Liquids & powders | Tankers for diesel, fly ash, cement powder, and industrial liquids with compartment tracking. |
| Container / Box | Sealed freight | Box-body and container configurations for palletized, weather-sensitive, and high-value cargo. |
| Contract Fleet | Dedicated lanes | Long-term assigned assets and drivers on recurring plant, mill, and dealer programs. |

### Materials (`#materials`)

- **H2:** Materials We Move
- **Intro:** Industrial commodities across mining, construction, metals, energy, FMCG, and agriculture.

| Material | Description |
|----------|-------------|
| Mining & Bulk | Coal, iron ore, limestone, and aggregates  -  pit-to-plant haulage on rugged corridors. |
| Construction | Cement, clinker, sand, and ready-mix inputs for plants, projects, and dealer networks. |
| Metals & Steel | Coils, plates, billets, and structural sections with weighbridge and axle discipline. |
| Energy & Chemicals | Petroleum products, industrial chemicals, and lubricants with haz-route awareness. |
| FMCG & Retail | Regional distribution with OTIF focus and lane-level cost control. |
| Agriculture | Seasonal grain and agri bulk with scalable capacity during harvest windows. |

### Curated service programs (`#transportation`)

- **H2:** Curated Service Programs
- **Intro:** How ZAFTYS packages capacity for direct suppliers and transporters.

**Every program includes:** Registered ZAFTYS contracts · Own fleet + TranZfort overflow · TSM™ tracking on active lanes

| Program | Description | Features | Highlight |
|---------|-------------|----------|-----------|
| Full Truckload (FTL) Transport | Dedicated trucks for large-volume heavy shipments with nationwide corridor coverage and TSM™ tracking. | Heavy-haul multi-axle vehicles; Pan-India industrial corridors; Real-time TSM™ tracking; Dedicated fleet assignment | Dispatch discipline built over decades |
| Mining & Raw Material Logistics | Heavy-haul expertise for ores, aggregates, and raw materials with certified safety protocols. | Reinforced heavy-duty tippers; DGMS safety compliance; Rugged terrain expertise; 24/7 site operations | Built for mines, plants, and industrial sites |
| Industrial Contract Logistics | Long-term dedicated support for direct suppliers and transporters with customized fleet programs. | Customized fleet solutions; Predictive scheduling; Performance SLAs; Dedicated account management | Reliable capacity on repeat corridors |
| Smart Route & Load Optimization | Intelligent route planning and load balancing to cut empty miles on your active lanes. | Corridor-based routing; Return-load optimization; Fuel efficiency monitoring; Dynamic load balancing | Cut empty miles on industrial lanes |
| Enterprise Client Services | Holistic partnerships for large transporters with visibility, SLAs, and scalable capacity. | Client tracking portal; Dedicated support; TranZfort overflow capacity; Structured documentation | Trusted by leading industrial shippers |
| TranZfort Network Overflow | When our fleet is at capacity, verified truckers on TranZfort fulfil loads  -  all through ZAFTYS. | Verified operator network; AI load matching; Same ZAFTYS accountability; TSM™ visibility on every trip | Scale without losing control |

### TSM operations (`#operations`)

- **H2:** ZAFTYS TSM™ Operations
- **Body:** The dispatch and visibility layer behind every move  -  built for our fleet, available for shippers and operators.

(Capabilities grid  -  same six items as Home TSM section, title “Digital Documentation” vs “Digital Docs”)

- **CTA:** See Full Platform → `/technology`

### TranZfort (`#tranzfort`)

- **H2:** TranZfort Marketplace
- **Body:** When our fleet is full, TranZfort connects verified truckers to industrial loads  -  all fulfilled through ZAFTYS.

| Step | Title | Description |
|------|-------|-------------|
| 1 | Post the load | Capacity published on TranZfort when needed. |
| 2 | Truckers book | Verified operators on matched corridors. |
| 3 | ZAFTYS delivers | Every trip through ZAFTYS accountability. |

- **Demo panel title:** Booking flow
- **CTA:** Explore TranZfort (external) · Network Page → `/network`

### CTA band

- **H2:** Ready to Move Your Freight?
- **Body:** Get a quote on WhatsApp  -  tell us your corridor, load type, and volume.
- **CTA:** Get a Quote on WhatsApp

---

## Fleet (`/fleet`)

**SEO title:** Our Fleet - Heavy-Haul Trucks & Industrial Assets  
**SEO description:** Company-owned open body, tipper, flatbed, tanker, container, and contract fleet  -  maintained to industrial standards across India.

### Hero

- **Eyebrow:** Our Assets
- **H1:** Engineered for Reliability.
- **Sub:** A modern, company-owned heavy-haul fleet  -  maintained to industrial standards and integrated with smart technology.

### Truck types

- **H2:** The Right Truck for the Job
- **Intro:** Six core configurations  -  from pit-to-plant tippers to dedicated contract lanes.
- *(Same six truck cards as Services)*

### Smart fleet capabilities

- **H2:** Smart Fleet Capabilities
- **CTA:** View Our Tech Stack → `/technology`

| Title | Description |
|-------|-------------|
| Live Tracking | Dual GPS systems for redundancy on every active trip. |
| Telematics | Real-time fuel and driving behavior monitoring. |
| Proactive Maintenance | Predictive alerts to prevent breakdowns before they happen. |
| Safety First | ABS, speed limiters, and driver fatigue alarms. |
| Eco-Friendly | Route optimization to minimize empty miles and fuel use. |
| TSM™ Connected | Every vehicle integrated with ZAFTYS dispatch and client visibility. |

### TranZfort overflow

- **H2:** Surge Capacity via TranZfort
- **Body:** When demand exceeds our own fleet, ZAFTYS scales through the TranZfort network  -  verified truckers, same company accountability, full TSM™ visibility.
- **CTA:** About the Network → `/network`

### CTA band

- **H2:** Need Reliable Transport?
- **Body:** Our fleet is ready to roll. Get in touch for immediate availability.
- **CTA:** Request Vehicles on WhatsApp

---

## Network (`/network`)

**SEO title:** TranZfort Network  -  Verified Capacity Through ZAFTYS  
**SEO description:** Scale transport capacity without managing extra vendors. Verified partners, centralized coordination, and shipment visibility through ZAFTYS TSM. All transactions through ZAFTYS.

### Hero

- **Eyebrow:** TranZfort Network
- **H1:** Scale Your Logistics. / Not Your Complexity.
- **Sub:** TranZfort extends ZAFTYS with verified transport capacity  -  centralized coordination, operational visibility, and the same professional standards. Every transaction runs through ZAFTYS Logistics.
- **CTA:** Request Additional Capacity (WhatsApp) · Become a Transport Partner → `/partner`
- **Embed:** PersonaTabDemo (phone frame, supplier/trucker tabs)
- **Disclaimer:** Sample data · demo UI only · all transactions through ZAFTYS Logistics

### Trust pulse

| Label | Sublabel |
|-------|----------|
| Verified partners | Structured onboarding |
| Industrial corridors | Pan-India reach |
| Central coordination | Through ZAFTYS |
| Registered company | All transactions |

### How TranZfort works

- **H2:** How TranZfort Works
- **Intro:** Own fleet first. Verified network when demand exceeds owned capacity. Tap simulate to see a load go live and a booking request arrive.

7-step flow: Customer requirement → Operational planning → Capacity assessment → Verified allocation → Centralized coordination → Shipment visibility → Delivery & documentation

- **Demo panel:** Booking flow  -  MatchFlowDemo + disclaimer

### Audience (static  -  no duplicate demo)

- **H2:** Built for Every Side of Freight
- **Intro:** Switch between supplier and trucker views  -  the same capacity layer ZAFTYS uses to scale operations.

**For suppliers** · **For transport partners** (static bullet cards) · **For ZAFTYS clients** (contract/payment bullets)

### Why TranZfort

- **H2:** Why TranZfort
- **Intro:** Operational tools built for Indian highways  -  not just city connectivity.

*(Six cards from `networkHighlights` in constants.ts)*

### Comparison

- **H2:** Traditional Logistics vs ZAFTYS Ecosystem

### CTA band

- **H2:** Need More Transport Capacity?
- **Body:** Whether production is increasing or projects are expanding, ZAFTYS and TranZfort provide flexibility without adding vendor complexity.
- **CTA:** Get a Freight Quote (WhatsApp) · Visit TranZfort.com (external)

---

## Platform / Technology (`/technology`)

**SEO title:** ZAFTYS TSM™  -  Transport & Fleet Management Platform  
**SEO description:** ZAFTYS TSM™ powers our operations and is available for shippers and fleet operators. GPS tracking, dispatch, ePOD, fleet management, and client portal.

### Hero

- **Eyebrow:** ZAFTYS TSM™
- **H1:** Transport & Fleet Management
- **Sub:** The platform we run our fleet on  -  and the software we offer to shippers and fleet operators who want the same control.
- **CTA:** Request a Demo → `/contact` · Login to Portal → `app.zaftys.com`

### Built for real operations

- **H2:** Built for Real Operations
- **P1:** ZAFTYS TSM™ isn't a slide-deck product  -  it runs our dispatch floor, fleet records, and client visibility every day on active industrial corridors.
- **P2:** We built it because generic tools couldn't handle heavy freight reality: multi-axle assets, plant windows, weighbridge loops, and the need to scale via TranZfort when our fleet is full.

**Pills:** Full visibility · 24/7 dispatch · Digital ePOD · Lane analytics  
**Mock label:** TSM™ DASHBOARD

### Platform capabilities

- **H2:** Platform Capabilities
- **Intro:** Everything you need to manage heavy freight operations, in one place.

| Feature | Description |
|---------|-------------|
| Real-Time GPS Tracking | Live location updates, dynamic ETAs, and route deviation alerts on an interactive map. |
| Dispatch & Trip Management | Create, assign, and monitor trips with automated status updates across your operation. |
| Driver Mobile App | Drivers receive routes, load details, and upload digital proof of delivery (ePOD) instantly. |
| Fleet Management | Vehicle registry, driver records, document expiry alerts, and maintenance scheduling. |
| Performance Analytics | Lane costs, utilization, delay analysis, and operational reporting for smarter decisions. |
| Digital Documentation | Secure storage for compliance docs, invoices, LR copies, and bills of lading. |

### Who it's for

- **H2:** Who It's For

**For Shippers & Transporters**  -  Outsource freight with full visibility  -  track every shipment through the client portal in real time.  
Bullets: Live shipment tracking · ePOD and document access · Lane performance reports

**For Fleet Operators**  -  Run dispatch, fleet, and billing on one platform  -  the same tools ZAFTYS uses internally.  
Bullets: Dispatch dashboard · Driver & vehicle management · Trip lifecycle & billing

### CTA band

- **H2:** See TSM in Action
- **Body:** Request a demo or log in to the client and team portal.
- **CTA:** Book a Demo → `/contact` · Login to app.zaftys.com

---

## Industries (`/industries`)

**SEO title:** Industries We Serve - Cement, Steel, Mining & Bulk Freight  
**SEO description:** Heavy-haul logistics for cement, steel, coal, chemicals, manufacturing, FMCG, retail, and industrial supply chains across India.

### Hero

- **Eyebrow:** Industries
- **H1:** Built for Industrial Supply Chains
- **Sub:** Steel, cement, chemicals, and bulk freight  -  corridor discipline, compliance, and reliable capacity on every lane.

### Industry grid

- **H2:** Specialized by Vertical
- **Intro:** Each industry runs on the same ZAFTYS stack  -  own fleet, TranZfort network, and TSM™ visibility.

| Industry | Description | Features | Highlight |
|----------|-------------|----------|-----------|
| Cement & Construction | High-volume tipper lanes with plant dispatch discipline  -  bulk cement, aggregates, and project delivery. | Tipper & bulk carriers; Plant window coordination; Multi-site dispatch | Bulk volume & detention control |
| Coal & Mining | Rugged transport for raw materials from mines to plants  -  built for tough terrain and site operations. | Heavy-duty tippers; DGMS-aware operations; 24/7 site coverage | Mining corridor expertise |
| Steel & Metals | Secure heavy-haul for coils, plates, and structural loads with weighbridge and axle discipline. | Flatbed & low-bed assets; Weighbridge coordination; Corridor predictability | Heavy haul & mill timing |
| Chemicals | Compliance-focused transport for industrial chemicals and bulk liquids with documentation discipline. | Tanker programs; Haz-route awareness; Structured LR & POD | Compliance & reliability |
| Manufacturing | Multi-plant inbound and outbound flows with tight production windows and gate coordination. | Plant-to-plant lanes; SLA-driven dispatch; Overflow via TranZfort | Production window discipline |
| FMCG | Regional distribution with OTIF focus and lane-level cost control on repeat corridors. | Regional FTL; Fast turnaround; Live visibility | OTIF & cost per lane |
| Retail Distribution | DC-to-store and hub distribution with traceability and schedule discipline. | Multi-drop routing; Schedule adherence; ePOD confirmation | OTIF to DC and store |
| Industrial Logistics | Complex multi-plant freight for industrial shippers managing nationwide supply chains. | Contract + spot mix; Multi-stop routing; Enterprise account management | Multi-plant complexity |

### Trust band

| Title | Description |
|-------|-------------|
| Compliance Ready | Structured documentation, ePOD, and regulatory awareness on active lanes. |
| Scalable Capacity | Own fleet for core lanes; TranZfort network for surge and spot overflow. |
| Full Visibility | ZAFTYS TSM™ tracking for shippers who need real-time shipment status. |

### CTA band

- **H2:** Get a Quote for Your Industry
- **Body:** Tell us your corridor, load type, and volume on WhatsApp.
- **CTA:** Chat on WhatsApp

### Industry detail pages (`/industries/:slug`)

8 routes  -  data in `src/lib/industries-data.ts`. Each page: hero, operational challenges, how ZAFTYS helps, corridors & equipment, WhatsApp CTA with industry pre-fill.

| Slug | Title |
|------|-------|
| `cement` | Cement & Construction |
| `coal-mining` | Coal & Mining |
| `steel-metals` | Steel & Metals |
| `chemicals` | Chemicals |
| `manufacturing` | Manufacturing |
| `fmcg` | FMCG |
| `retail-distribution` | Retail Distribution |
| `industrial-logistics` | Industrial Logistics |

Alias: `/industries/mining` → `/industries/coal-mining`

---

## Partner (`/partner`)

**SEO title:** Fleet Partner Program  -  Join TranZfort Through ZAFTYS  
**SEO description:** Register your fleet for verified industrial loads, payments through ZAFTYS Logistics, and operational tools as you scale. Professional onboarding required.

### Hero

- **Eyebrow:** Fleet Owners
- **H1:** Grow Your Fleet Through A Professional Logistics Network.
- **Sub:** TranZfort connects verified transport partners to industrial freight coordinated through ZAFTYS Logistics  -  structured opportunities, transparent payments, and professional support.

### Benefits

| Title | Description |
|-------|-------------|
| Verified Network | Industrial freight opportunities on corridors where ZAFTYS operates. |
| Better Utilization | Reduce empty return trips with backhaul-friendly matching. |
| Payments via ZAFTYS | Transparent billing through our registered company. |
| TSM™ Access | Operational tools as your volume scales with ZAFTYS. |

### Onboarding

- **H2:** Simple Onboarding. Clear Standards.

| Step | Title | Description |
|------|-------|-------------|
| 01 | Register | Submit company details, contact information, fleet size, and primary corridors. |
| 02 | Verify | Our fleet team reviews registration, documentation, insurance, and operational readiness. |
| 03 | Onboard | Orientation on communication standards, TranZfort app usage, and ZAFTYS workflows. |
| 04 | Operate & Earn | Begin accepting loads matched to your routes  -  with ongoing operations support. |

### Registration form

- **H2:** Register Your Fleet
- **Sub:** Start your journey with ZAFTYS today.
- **Fields:** Company Name · Contact Person · Mobile Number · Fleet Size (1-5 / 6-20 / 20+)
- **Submit:** Submit Application / Processing...
- **Toast success:** Application Received!  -  Our fleet manager will contact you within 24 hours for verification.

### CTA band

- **H2:** Prefer to Talk First?
- **Body:** Reach our fleet team on WhatsApp or download the TranZfort app.
- **CTA:** WhatsApp Our Fleet Team · Download TranZfort App (external)

---

## About (`/about`)

**SEO title:** About ZAFTYS - 60 Years of Transport Excellence  
**SEO description:** Three generations of trust. Learn about our journey from a local trucking firm to a tech-enabled logistics powerhouse.

### Hero

- **Eyebrow:** Our Story
- **H1:** Legacy on Wheels. / **Innovation in Motion.**
- **Sub:** Three generations on the road. Recently registered as a company. Built for India's industrial freight at scale.

### Decades of trust

- **H2:** Decades of Trust
- **P1:** ZAFTYS embodies six decades of family-operated freight experience  -  moving steel, cement, coal, and bulk cargo across India's industrial corridors.
- **P2:** For most of our history we operated in the traditional truck-owner category: hands-on dispatch, corridor relationships, and a reputation for showing up when it mattered. That operational DNA still defines how we work.
- **P3:** We recently registered as **ZAFTYS Logistics Pvt Ltd** to serve direct suppliers and large transporters formally  -  with own fleet, TranZfort marketplace capacity, and ZAFTYS TSM™ powering every trip.

**Stats:** 60+ Years · 3rd Generation

### Timeline

| Era | Title | Description |
|-----|-------|-------------|
| 1960s | The Foundation | Started as a family trucking operation moving freight in India's industrial heartlands. |
| 1990s | National Corridors | Expanded across cross-country routes as India's infrastructure and industry grew. |
| 2010s | Modern Heavy-Haul Fleet | Upgraded to multi-axle and tipper assets built for cement, steel, and mining loads. |
| 2020s | Company & Platform | Registered as ZAFTYS Logistics Pvt Ltd; launched TranZfort marketplace and ZAFTYS TSM™. |

### What we do today

- **H2:** What We Do Today
- **Intro:** Transport operator and technology company  -  under one registered entity.

| Pillar | Description |
|--------|-------------|
| Own Fleet | Company-owned heavy-haul trucks for direct suppliers and transporters. |
| TranZfort | AI-powered freight marketplace scaling capacity across India. |
| ZAFTYS TSM™ | Transport & fleet management platform  -  internal ops and client product. |

### Mission & vision

**Mission:** To move India's industrial freight with reliability, transparency, and scale  -  through own fleet, TranZfort network, and TSM™ technology. Every transaction runs through ZAFTYS.

**Vision:** To be India's most trusted heavy-transport operator  -  combining decades of corridor experience with a national digital freight network and world-class operations software.

### Core values

- **H2:** Our Core Values
- **Intro:** Principles that guide every mile we travel.

| Value | Description |
|-------|-------------|
| Integrity | We do what we say. Honest dealings and ethical practices are the bedrock of our 60-year legacy. |
| Precision | Logistics is about details. We leverage technology to ensure every shipment is tracked and timely. |
| Client Focus | Your business goals are ours. We tailor our fleet and schedules to match your production cycles. |
| Sustainability | Optimizing routes to reduce fuel consumption and building a greener supply chain for India. |

### CTA band

- **H2:** Ready to Move With Us?
- **Body:** Partner with a team that has moved freight for three generations.
- **CTA:** Chat on WhatsApp · Careers → `/careers`

---

## Contact (`/contact`)

**SEO title:** Contact Us - Get a Freight Quote  
**SEO description:** Speak to our dispatch team. 24/7 support for your supply chain needs. Located in Pune. Call +91-927-092-3581.

### Hero

- **H1:** Let's Move Forward Together
- **Sub:** Have a question or need a freight quote? Reach us fastest on WhatsApp.
- **CTA:** Chat on WhatsApp  -  Get a Quote

### Contact cards

| Title | Details |
|-------|---------|
| Headquarters | World Trade Center, Kharadi  -  Pune, India - 411014 |
| Phone Support | +91-927-092-3581 · +91-989-092-3581 |
| Email Us | contact@zaftys.com |

### Find us

- **H2:** Find Us
- **Map placeholder:** World Trade Center, Kharadi  -  Pune, India
- **Button:** Get Directions

### Form

- **H2:** Send a Message
- **Sub:** Fill out the form below and we'll get back to you within 24 hours.
- **Fields:** Full Name · Phone Number · Email Address · I'm interested in… (Getting a Freight Quote / TSM Platform Demo / Partner / Fleet Owner / Careers / Support) · Message
- **Submit:** Send Message / Sending...
- **Toast success:** Message Sent!  -  We've received your inquiry and will get back to you shortly.

### FAQ

**What are your operating hours?**  
Our office is open Mon-Sat, 9 AM to 6 PM. However, our operations and dispatch teams work 24/7 to ensure your shipments keep moving.

**How quickly can I get a quote?**  
For standard FTL routes, we usually provide a quote within 2 hours. For specialized or project cargo, please allow up to 24 hours for a detailed assessment.

### Urgent support

- **H3:** Need Urgent Support?
- **Body:** Existing clients can reach our priority dispatch desk directly.
- **CTA:** WhatsApp Priority Line

---

## Careers (`/careers`)

**SEO title:** Careers at ZAFTYS - Join Our Logistics Team  
**SEO description:** Build your career with India's leading logistics company. Openings for Senior Drivers, Logistics Coordinators, and TSM Developers.

### Hero

- **Eyebrow:** Join Our Team
- **H1:** Drive With Purpose.
- **Sub:** Build your career with India's most forward-thinking logistics company. We value talent, integrity, and ambition.

### Why join

- **H2:** More Than Just a Job
- **Intro:** At ZAFTYS, we invest in our people. Whether you're behind the wheel or behind a screen, you're a vital part of our journey.

| Title | Description |
|-------|-------------|
| Wellness | Comprehensive health coverage for you and your family. |
| Growth | Clear career paths and regular skill development workshops. |
| Rewards | Performance-based bonuses and safety incentives. |
| Culture | A supportive, inclusive environment rooted in family values. |

### Openings

- **H2:** Current Openings

| Role | Type | Location | Requirements | Perks |
|------|------|----------|--------------|-------|
| Senior Fleet Driver | Full-time | Multiple Locations | Valid commercial license, 5+ years experience, GPS proficiency. | Performance bonuses; Health insurance; Paid leave |
| Logistics Coordinator | Full-time | Pune (HQ) | Experience with TSM/ERP systems, strong communication skills. | Career progression; Tech training; Competitive salary |
| Backend Developer (TSM) | Remote / Hybrid | Remote / Pune | Node.js, React, PostgreSQL experience. Logistics domain knowledge is a plus. | Flexible hours; Innovation budget; Latest tech stack |

- **Card CTA:** Apply Now

### General application

- **H2:** Don't See Your Role?
- **Sub:** We're always looking for talent. Send us your details and we'll keep you on file.
- **Fields:** Full Name · Email · Upload Resume / CV
- **Submit:** Submit General Application / Submitting...

---

## Login (`/login`)

**SEO title:** Login - ZAFTYS TSM™ Portal  
**SEO description:** Secure login for ZAFTYS Clients and Team members. Access real-time tracking and fleet management tools.

- **H1 card:** Welcome Back
- **Sub:** Access ZAFTYS TSM™  -  client portal and team dashboard
- **Tabs:** Client Portal · Team / Driver
- **Fields:** Business Email OR Employee ID / Email · Password
- **Link:** Forgot password?
- **Submit:** Continue to Portal → `app.zaftys.com`
- **Footer:** Don't have an account? Contact Sales (client) / Apply Now (team)

---

## 404 (`*`)

- **H1:** 404
- **H2:** Page Not Found
- **Body:** The route you are looking for doesn't exist. It might have been moved or deleted.
- **CTA:** Return Home · Services · Contact

---

## TranZfort demo UI copy (embedded widgets)

*Sample data  -  Pune ↔ Mumbai corridor. Marketing disclaimer on all embeds:* **Sample data · demo UI only · all transactions through ZAFTYS Logistics**

### DemoDisclaimer (site-wide)

Shown under PersonaTabDemo and MatchFlowDemo on Home, Network, and Services.

### PersonaTabDemo

- Variants: **phone** (hero) · **panel** (sections)
- Tabs: **Supplier flow** · **Trucker flow** (hero surface styling on navy bands)
- Frame titles: **Post Load** · **Find Loads**

### MatchFlowDemo

- Labels: Supplier  -  Post load · Trucker  -  Book load
- Button: **Simulate booking flow**
- States: Publishing load… · Posted → Live on Find Loads · Trucker sends booking request
- Reset: Run again

### PostLoadDemo (sample)

- Route: Pune (MH) → Mumbai (MH)  -  148 km · ~3h drive
- Load: Steel coils · 16T · Open · 2 trucks
- Price: ₹28,000 · Advance slider · Post load
- Footer hint: Truckers request  -  you approve verified drivers

### FindLoadsDemo

- Route inputs: From / To
- Filter chips: Open · Container · 10 tyres
- Button: Find loads / Searching…
- Empty: Tap Find loads  -  matches appear in under a second.

### Sample marketplace load (fixture)

- ABC Steels · Pune → Mumbai · Steel coils · ₹28K · Super Load
- Sample trucker: Rajesh K. · MH-12 AB 4521 · Approve / Reject

### AppDemoFrame chrome

- Default title: TranZfort · Badge: **Demo**

---

## Legal (summaries  -  full text in page components)

### Privacy (`/privacy`)

- **Title:** Privacy Policy  -  Last Updated: November 29, 2025
- Covers: information collected via forms, partner registration, careers, newsletter; use of data; cookies; contact for privacy requests.

### Terms (`/terms`)

- **Title:** Terms of Service  -  Last Updated: November 29, 2025
- Covers: acceptance, services under contract, website use, liability limitations, governing law.

---

## Related docs

- `docs/marketing-website-sitemap-new.md`  -  IA, page specs, implementation tracker
- `docs/marketing-content-blueprint.md`  -  section/card map for content planning

*When copy is approved here, update the matching `src/pages/*.tsx` or `src/lib/constants.ts` entries.*
