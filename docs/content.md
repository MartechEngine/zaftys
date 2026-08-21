# ZAFTYS Website Content Copy

Locked marketing copy inventory for the ZAFTYS website. Captures every user-visible string from page heroes, hub/leaf copy modules, page components, navigation, and SEO meta as of **22 Aug 2026** on branch **rewamp-20-8-26**.

**Sources:** `page-hero-copy.ts`, `*-hub-copy.ts`, leaf copy modules (`network-leaf-copy`, `technology-leaf-copy`, `intelligence-leaf-copy`, `solution-pages`, `supply-chain-ai-article`), page components (Partner, Contact, Careers, Services, Network/TranZfort, Blog, Reports, Login, NotFound, etc.), `nav-config.ts`, `page-seo.ts`, `about-page-copy.ts`, `fleet-page-copy.ts`, `industries-data.ts`, `industries-hub-copy.ts`, `constants.ts`, `hero-ctas.ts`, legal chrome.

---

## Table of contents

- Global chrome (nav + footer)
- / — Home
- /logistics — Logistics hub
- /logistics/container-transportation — Container Transportation
- /logistics/3pl-transportation — 3PL Transportation
- /logistics/industrial-freight — Industrial Freight
- /logistics/contract-logistics — Contract Logistics
- /logistics/dedicated-fleet — Dedicated Fleet
- /fleet — Fleet
- /network — Network hub
- /network/tranzfort — TranZfort
- /network/transporter-network — Transporter Network
- /network/truck-capacity — Truck Capacity
- /zaftys-tms — ZAFTYS TMS
- /zaftys-tms/tracking — Tracking & Visibility
- /zaftys-tms/fleet-management — Fleet Management
- /zaftys-tms/apis — Logistics APIs
- /intelligence — Intelligence hub
- /intelligence/analytics — ZAFTYS Analytics
- /intelligence/freight-rates — Freight Rate Intelligence
- /intelligence/market-intelligence — Market Intelligence
- /intelligence/ai — Supply Chain AI
- /industries — Industries hub
- 8 industry detail pages
- /about — About
- /partner — Partner
- /contact — Contact
- /careers — Careers
- /resources — Resources
- /blog — Blog listing
- /reports — Market Reports listing
- /services — Services
- NotFound (404)
- /login — Login
- Legal pages (Privacy, Terms, Cookies, Legal Notice) — short chrome
- Shared CTA strings

---

## Global chrome — Navigation & Footer

### Section: Header logo
- **Alt:** ZAFTYS

### Section: Header navigation (headerNav)
- **Logistics** (hub → /logistics)
  - Transportation → /logistics
  - Our Fleet → /fleet
- **Platform** (hub → /zaftys-tms)
  - ZAFTYS TMS → /zaftys-tms
  - TranZfort → /network/tranzfort
  - Tracking & Visibility → /zaftys-tms/tracking
  - Fleet Management → /zaftys-tms/fleet-management
- **Network** → /network
- **Intelligence** → /intelligence
- **Industries** → /industries
- **Company** (hub → /about)
  - About → /about
  - Contact → /contact
  - Careers → /careers
  - Become a Partner → /partner
- **Resources** (hub → /resources)
  - Blog → /blog
  - Market Reports → /reports

### Section: Header actions
- Login
- Request Transportation
- Aria: Toggle menu
- Aria pattern: `{Label} menu` for dropdown chevrons

### Section: Footer brand
- **Logo alt:** ZAFTYS Logistics
- **Blurb:** Technology-enabled transportation and logistics. Owned fleet, contract logistics, verified partner network, and ZAFTYS TMS from Amravati, Maharashtra.
- **TranZfort link:** Explore TranZfort marketplace

### Section: Footer newsletter
- **H3:** Stay updated
- **Lead:** Occasional operational notes and company updates. No spam.
- **Placeholder:** Enter your email address
- **Submit:** Subscribe / Subscribing...
- **Unsubscribe note:** Unsubscribe anytime at subscribers@zaftys.com.
- **Toast success title:** Subscribed
- **Toast success description:** You have been added to our newsletter list.
- **Toast error title:** Error
- **Toast error description:** Could not subscribe you right now. Please try again later.

### Section: Footer contact column
- **Heading:** Contact
- **Address:** Old Town, Badnera; Amravati, 444701; Maharashtra, India
- **Phone:** +91-927-092-3581
- **WhatsApp:** WhatsApp us
- **Email:** info@zaftys.com

### Section: Footer link columns
- **Logistics**
  - Transportation → /logistics
  - Our Fleet → /fleet
  - Contract Logistics → /logistics/contract-logistics
  - Industrial Freight → /logistics/industrial-freight
  - Container Transportation → /logistics/container-transportation
- **Platform**
  - ZAFTYS TMS → /zaftys-tms
  - Tracking & Visibility → /zaftys-tms/tracking
  - Fleet Management → /zaftys-tms/fleet-management
  - Logistics APIs → /zaftys-tms/apis
  - Login → /login
- **Network**
  - Network → /network
  - TranZfort → /network/tranzfort
  - Transporter Network → /network/transporter-network
  - Truck Capacity → /network/truck-capacity
  - tranzfort.com → https://tranzfort.com
- **Intelligence**
  - ZAFTYS Analytics → /intelligence/analytics
  - Freight Rate Intelligence → /intelligence/freight-rates
  - Market Intelligence → /intelligence/market-intelligence
  - Supply Chain AI → /intelligence/ai
- **Company**
  - About → /about
  - Industries → /industries
  - Contact → /contact
  - Careers → /careers
  - Become a Partner → /partner
- **Resources**
  - Blog → /blog
  - Market Reports → /reports

### Section: Footer legal bar
- **Copyright pattern:** © {year} ZAFTYS Logistics. GST compliant operations. All rights reserved.
- Terms of Use → /terms
- Privacy Policy → /privacy
- Cookie Policy → /cookies
- Legal Notice → /legal-notice
- **LinkedIn aria-label:** ZAFTYS on LinkedIn

### Section: WhatsApp FAB
- **Aria-label:** Chat on WhatsApp

## / — Home

**Meta:** ZAFTYS | 3PL Transportation and Contract Logistics | Technology-enabled transportation and logistics. Owned heavy-vehicle capacity, contract logistics, verified partner network, and ZAFTYS TMS. Request transportation across India.

### Section: Hero
- **Badge:** Technology-enabled Transportation & Logistics
- **H1 line 1:** Heavy Freight.
- **H1 line 2:** Reliable Capacity.
- **H1 line 3:** Managed by Technology.
- **Lead:** ZAFTYS provides 3PL transportation and contract logistics for industrial and commercial freight. Owned heavy-vehicle capacity first. Verified network overflow when the lane needs more. ZAFTYS TMS on trips we run.
- **Tagline:** Real Trucks. Real Logistics. Real Technology.
- **Hero image alt:** ZAFTYS commercial trucks for heavy freight transport across India
- **Primary CTA:** Request Transportation
- **Secondary CTA:** Chat on WhatsApp

### Section: Trust strip (proof points)
- **Own Fleet:** Company-operated trucks
- **Network:** Labeled partner capacity
- **Contract Logistics:** Recurring freight
- **ZAFTYS TMS:** Live dispatch system
- **Pan-India:** Freight corridors
- **60+ Years:** Trucking heritage

### Section: Operating model
- **Eyebrow:** One operational desk
- **H2:** We move freight. We run the desk.
- **Lead:** ZAFTYS is a transportation operator: owned fleet, contract logistics programs, and labeled network capacity. One commercial relationship. Own vs Network never blended.
- **Supporting:** Not a broker that vanishes after booking. Not software without trucks.
- **Tagline:** Real trucks on the road. Real logistics at the desk. Real technology on contracted trips.
- **Flow label:** How capacity comes together on your lane
- **01 Owned fleet:** Company trucks from LCV through ODC on corridors we run every week. → /fleet
- **02 Contract logistics:** Dedicated programs for recurring plant, mill, and DC freight with SLA management. → /logistics/contract-logistics
- **03 Network capacity:** Verified partners and TranZfort when surge exceeds owned fleet. Always labeled clearly. → /network
- **CTA:** Request Transportation

### Section: Industries preview
- **Eyebrow:** Who we serve
- **H2:** Industries we haul for
- **Lead:** That operating model runs across heavy industrial verticals. Different cargo and truck class, same desk.
- **Cement & Construction** (slug: cement)
- **Port & Container Road** (slug: container-transport)
- **Mining Products** (slug: coal-mining)
- **Steel & Metals** (slug: steel-metals)
- **Manufacturing** (slug: manufacturing)
- **FMCG** (slug: fmcg)
- **Chemicals** (slug: chemicals)
- **Industrial Logistics** (slug: industrial-logistics)

### Section: Platform / TMS teaser
- **Eyebrow:** Platform
- **H2:** The TMS we dispatch on every day
- **Lead:** ZAFTYS TMS plans, dispatches, tracks, and closes out transportation. Platform is how the desk runs contracted trips. Network capacity lives next door.
- **TMS badge:** ZAFTYS TMS · live
- **TMS H3:** Run transportation from one system.
- **TMS lead:** Plan, dispatch, track, and close out trips. The system we use at app.zaftys.com on our own freight every day.
- CTA: See ZAFTYS TMS
- CTA: Book a Demo

### Section: Network / TranZfort teaser
- **Eyebrow:** Network
- **H2:** ZAFTYS operates. TranZfort connects.
- **Lead:** Owned fleet when we have the truck. Verified partners and TranZfort when the lane needs more. Labels stay honest.
- **TranZfort badge:** TranZfort · marketplace
- **TranZfort H3:** Post or find a load for free.
- **TranZfort lead:** Digital freight matching on verified corridors. Free to post and find. Broker fee to truckers on booked loads. Trips contracted through ZAFTYS stay on GST billing.
- CTA: Open TranZfort
- CTA: Explore Network

### Section: Insights
- **Eyebrow:** Intelligence
- **H2:** Insights from operations
- **Lead:** Analytics and research built on freight we move. Capabilities labeled Available, Beta, or Research.
- **Intelligence card:** Logistics Intelligence — Analytics, freight rates, market intelligence, and supply chain AI
- **Reports card:** Market Reports — Institutional research from ZAFTYS Analytics

### Section: Final CTA
- **H2:** Ready to move your freight?
- **Lead:** Request transportation capacity first. Explore the Network or ZAFTYS TMS when you need the next layer.
- **Email CTA:** Request Transportation
- **WhatsApp CTA:** Chat on WhatsApp
- Explore Network
- Explore ZAFTYS TMS

### Section: Home quote email template
- **Label:** Request Transportation
- **Subject:** Freight quote request
- **Body:** Hi ZAFTYS,\n\nI'd like to request transportation capacity.\n\nFrom:\nTo:\nLoad type:\nTimeline:\n\n
- **Body short:** Hi ZAFTYS,\n\nI'd like to request transportation capacity.\n\n

### Section: Home logistics service cards (constants)
- **3PL Transportation:** Transportation execution with owned fleet and verified partner capacity. → /logistics/3pl-transportation
- **Contract Logistics:** Dedicated programs for recurring freight with SLA management. → /logistics/contract-logistics
- **Dedicated Fleet:** Assigned trucks and drivers on plant, mill, or DC programs. → /logistics/dedicated-fleet
- **Industrial Freight:** Heavy freight for steel, cement, mining, and project cargo. → /logistics/industrial-freight
- **Container Transportation:** Port-to-market, factory-to-port, and city movements. → /logistics/container-transportation
- **Our Fleet:** Owned heavy-vehicle capacity from LCV through ODC. → /fleet

## /logistics — Logistics hub

**Meta:** Logistics Services | 3PL and Contract Transportation | FTL 3PL, contract and dedicated fleet, industrial freight, and container road legs. Owned trucks first, labeled partner overflow, plant-window desk, TMS on trips we run.

### Section: Hero
- **Badge:** Transportation & Logistics
- **H1:** Reliable transportation capacity for demanding freight.
- **Lead:** ZAFTYS is a technology-enabled transportation operator for industrial and commercial freight in India. We run owned heavy vehicles, contract programs for recurring lanes, and verified partner capacity when volume spikes — managed on one desk with the TMS we dispatch on every day.
- **Image alt:** ZAFTYS logistics and transportation services
- **pageHeroCopy badge:** Transportation & Logistics
- **pageHeroCopy H1:** Reliable transportation capacity for demanding freight.
- **pageHeroCopy lead:** ZAFTYS executes 3PL and contract transportation for industrial and commercial freight. Owned heavy vehicles, contract programs, verified partner overflow, and the TMS we dispatch on — one desk.
- CTA: Chat on WhatsApp

### Section: Services index
- **Eyebrow:** Five ways we move freight
- **H2:** Transportation services built for plant reality.
- **Lead:** Pick the service your desk needs. Each section below covers the problem, who it is for, and how we run the lane.
- **01 Container Transportation:** Port–factory–market road legs (#container)
- **02 3PL Transportation:** FTL execution with trip ownership (#three-pl)
- **03 Industrial Freight:** Plant windows and axle reality (#industrial)
- **04 Contract Logistics:** Reserved capacity under SLA (#contract)
- **05 Dedicated Fleet:** Assigned trucks on your program (#dedicated)

### Section: Capacity strip
- **Owned:** Own fleet
- **Contract:** Contract programs
- **Network:** Network fleet
- **Note:** Capacity is never blended silently — what we own, what we reserve, and what partners fill.

### Section: Service — Container Transportation (01)
- **ID:** container
- **Tagline:** Port to factory, factory to port, port to market — sealed freight on corridors we run.
- **Lead:** Container transportation for ZAFTYS is road execution between ports, warehouses, factories, and inland markets. We move containers and sealed freight on trailers suited to the corridor, with trip visibility on contracted moves and partner overflow when the yard needs more wheels than we own that day.
- **Body:** EXIM road legs fail when ownership splits between CHA, transporter, and plant while demurrage clocks run. We take the road leg: gate-in language, factory slot timing, and trip close-out on the same desk that runs your industrial FTL — not a separate brochure service.
- **Problem:** Port and EXIM road legs fail on empty trailer wait, missed factory windows, and unclear ownership between CHA, transporter, and plant — while cargo sits on demurrage or detention clocks.
- **Image alt:** Container trailer moving sealed freight on a port corridor
- **Who for:**
  - Importers and exporters moving containers between port, CFS/ICD, factory, and warehouse
  - Manufacturers with inbound containers feeding production and outbound boxes to port
  - Distributors running port-to-city or port-to-market FTL container / trailer programs
- **Points:**
  - Port to warehouse and port to factory delivery for inbound containers
  - Factory to port movement for export-bound boxes on plant loading windows
  - Port to market / inland city trailer moves where the commercial lane demands it
  - Container trailers and sealed configurations matched to the corridor
  - Coordination language for gate-in, factory slot, and trip close-out — not only a rate quote
  - Owned capacity where we run the lane; Tranzfort partners when overflow is required — labeled clearly
- **Outcomes:**
  - Clearer trip ownership from port gate to factory bay
  - Vehicle and timing planned around plant and port windows, not only distance
  - Visibility on contracted container moves through the same desk and TMS stack
- **Secondary CTA:** Explore Network → /network
- **Leaf path:** /logistics/container-transportation
- **Fleet suitable lead:** India container road legs run on sealed body sizes and chassis trailers — 32 ft is the domestic FTL workhorse; 40 ft for EXIM ISO.
- **Fleet type 20–24 ft:** Local / regional sealed · ~7T
- **Fleet type 32 ft SXL / MXL:** Domestic FTL backbone
- **Fleet type 40 / 40 HC:** EXIM ISO · port–plant
- **Fleet type Skeletal / trailer:** ISO chassis · CFS–factory
- **Fleet type LCV closed:** Short sealed feeder

### Section: Service — 3PL Transportation (02)
- **ID:** three-pl
- **Tagline:** Full-truckload execution — not a booking that vanishes after allotment.
- **Lead:** 3PL for ZAFTYS means we execute the trip. Full truckload from origin to destination, vehicle class matched to cargo, GST-compliant billing on contracted moves, and a desk that stays on the lane until delivery documentation closes.
- **Body:** Unlike warehouse-led 3PLs that sell storage first and transport as an add-on, we sell movement. You get a named operator on FTL — owned wheels where we run the corridor, verified Tranzfort partners when volume spikes, and TMS status on contracted trips. The truck, the desk, and the paperwork stay connected until POD closes.
- **Problem:** Spot FTL in India often fails at the same points: wrong body type at the gate, no one accountable after the truck is “allotted,” and zero visibility once the vehicle leaves the plant.
- **Image alt:** Heavy truck moving industrial freight on an Indian corridor
- **Who for:**
  - Manufacturers and traders moving FTL between plants, mills, warehouses, and project sites
  - Shippers who need a full truck — not shared LTL — with clear ownership of the trip
  - Operations teams tired of chasing brokers for status, POD, and billing follow-up
- **Points:**
  - Full truckload capacity matched to cargo: LCV through multi-axle, flatbed, tipper, trailer, and ODC where the lane requires it
  - Owned fleet first on corridors we run every week; verified Tranzfort partners when surge exceeds what we own that day — always labeled
  - Dispatch, trip status, and close-out on ZAFTYS TMS for contracted movements
  - GST-compliant invoicing on trips contracted through ZAFTYS — not informal cash settlement
  - One Amravati desk for indent, allotment follow-through, and delivery documentation
- **Outcomes:**
  - A named operator on the trip, not a middleman who stops answering after booking
  - Vehicle class decided for cargo and gate rules, not whatever truck is cheapest that hour
  - Visibility and paperwork that survive weighbridge and plant audit questions
- **Secondary CTA:** See Our Fleet → /fleet
- **Leaf path:** /logistics/3pl-transportation
- **Fleet suitable lead:** FTL allotment matches the cargo: LCV for regional, sealed container for protected freight, open or trailer for industrial loads.
- **Fleet type LCV:** 4W–6W · 0.75–7T · regional
- **Fleet type Open / high-side:** 6W–18W · bags, steel, coal
- **Fleet type Container 32 ft:** SXL / MXL · sealed FTL
- **Fleet type Trailer / flatbed:** 12W–22W · 20–48T line-haul
- **Fleet type Container 20–24 ft:** Lighter sealed · ~7T

### Section: Service — Industrial Freight (03)
- **ID:** industrial
- **Tagline:** Steel, cement, mining, and project cargo — built for plant windows and axle reality.
- **Lead:** Industrial freight is where generic FTL breaks. Coils need the right flatbed and securing. Cement and bulk need tippers and bulkers that survive the plant queue. Mining lanes need weighbridge discipline. ZAFTYS runs these movements as an operator that already lives in that world.
- **Body:** Pan-India FTL marketing rarely mentions axle limits, GVW surprises, or mill detention. We do — because that is where industrial cost sits. Same desk across cement, steel, coal, and manufacturing: match the truck to the cargo and the gate, then stay on the trip until documentation closes.
- **Problem:** Industrial shippers lose days to wrong vehicle class, axle and GVW surprises, plant detention, and transporters who treat a mill gate like a city warehouse.
- **Image alt:** Steel coil and industrial freight loaded for plant movement
- **Who for:**
  - Steel and metals plants moving coils, plates, TMT, and sections
  - Cement, construction, and bulk shippers on plant-to-market lanes
  - Mining, aggregates, and project cargo that needs tipper, multi-axle, or ODC capability
- **Points:**
  - Steel and metals: coils, plates, and long products on flatbeds and multi-axle with weighbridge awareness
  - Cement and bulk solids: tippers and bulkers on plant-to-project and plant-to-market lanes
  - Mining and aggregates: pit-head to plant / siding movements with loading and TAT discipline
  - Manufacturing and project freight: inbound raw material and outbound finished goods on scheduled programs
  - Vehicle class chosen for cargo, axle limits, and gate rules — not a one-size open truck
  - Detention and plant-window language at the desk, because that is where industrial cost actually sits
- **Outcomes:**
  - Fewer refusals at the gate because the truck matches the load and the site
  - A desk that plans for weighbridge and plant TAT, not only origin–destination kilometres
  - Same operating model across cement, steel, coal, and manufacturing verticals
- **Secondary CTA:** Industries we serve → /industries
- **Leaf path:** /logistics/industrial-freight
- **Fleet suitable lead:** Match body class to cargo: steel on flatbed, bagged solids on open/high-side, loose bulk on tipper, powder on bulker, oversize on low bed.
- **Fleet type Flatbed trailer:** Coils, plates, long steel
- **Fleet type Open / high-side:** Bagged cement, TMT, coal
- **Fleet type Tipper:** Ore, sand, aggregates
- **Fleet type Bulker:** Cement / fly ash powder
- **Fleet type ODC / low bed:** Machinery · permits

### Section: Service — Contract Logistics (04)
- **ID:** contract
- **Tagline:** Recurring lanes need reserved capacity — not a fresh hunt every Monday.
- **Lead:** Contract logistics at ZAFTYS is a long-term transportation program: reserved trucks on the corridors you run every week, SLA tracking, plant-window awareness, and an account desk that already knows your sites.
- **Body:** Peers in India sell contract logistics as warehouse + fleet + control tower. We keep the promise tight: capacity assurance on the road under an SLA. You stop shopping every indent. We stop treating your plant like a one-off spot load. Peak weeks get planned overflow — labeled — instead of silence.
- **Problem:** Weekly plant and DC freight dies on spot markets: detention at the gate, no reserved capacity in peak weeks, and a new set of truckers who do not know your loading rules.
- **Image alt:** Industrial plant freight planning and recurring lane dispatch
- **Who for:**
  - Plants, mills, and DCs with fixed origin–destination patterns and weekly volume
  - Procurement and logistics heads who need capacity assurance under an SLA, not only a rate
  - Shippers ready to reserve trucks for a program instead of shopping every indent
- **Points:**
  - Reserved capacity on recurring plant, mill, and DC corridors for the life of the program
  - SLA and performance tracked against agreed loading and transit windows
  - Managed dispatch from one desk: allotment, gate timing, and escalation when the plant slips
  - Account familiarity with your weighbridge, bay rules, and detention risk
  - Overflow through verified partners when volume spikes — never silently presented as owned fleet
  - Shipper visibility on contracted trips through ZAFTYS TMS
- **Outcomes:**
  - Predictable capacity on the lanes that keep production and distribution moving
  - A desk that already knows your sites before Monday’s indent arrives
  - Contract clarity on what is reserved, what is dedicated, and what is network overflow
- **Secondary CTA:** Dedicated Fleet → #dedicated
- **Leaf path:** /logistics/contract-logistics
- **Fleet suitable lead:** A contract locks one body class to the corridor for the SLA window — usually these industrial and plant classes.
- **Fleet type Open / high-side:** Plant–market bags & solids
- **Fleet type Trailer / flatbed:** Steel, long product, bulk
- **Fleet type Container 32 ft:** Sealed DC / OEM lanes
- **Fleet type Tipper:** Aggregates, mining, sand
- **Fleet type Bulker:** Cement, fly ash powder

### Section: Service — Dedicated Fleet (05)
- **ID:** dedicated
- **Tagline:** Your trucks. Your corridors. Your season or year.
- **Lead:** Dedicated fleet is how a ZAFTYS contract looks when vehicles and drivers are assigned to you. Body type follows the lane — LCV, heavy load, container, tanker, or bulker — with plant-window dispatch and TMS on every contracted trip.
- **Body:** Indian contract buyers often hear “dedicated” and get a rate sheet plus whoever is free that morning. We mean assigned assets: trucks and crews that learn your gate, bay, and loading rules. When surge exceeds the dedicated count, Tranzfort partners fill the gap — labeled clearly, not sold as your fleet.
- **Problem:** Recurring volume without assigned trucks means every peak week is a scramble, every new driver relearns your plant, and detention climbs because the bay schedule was never part of the deal.
- **Image alt:** Dedicated fleet trucks assigned to a recurring freight program
- **Who for:**
  - Plants and DCs that need the same vehicle class on the same corridors for months at a time
  - Shippers who want drivers who already know gate passes, loading SOPs, and site safety rules
  - Programs where body type must stay fixed — tipper, flatbed, bulker, container — not rotated randomly
- **Points:**
  - Trucks and drivers dedicated to your program for a season or a year
  - Vehicle class chosen for the lane: LCV, multi-axle, flatbed, tipper, container, tanker, or bulker
  - Performance measured on repeat windows and detention risk, not a one-off spot rate
  - Plant and DC window awareness built into daily dispatch
  - TMS visibility for shippers on every contracted dedicated trip
  - Labeled Tranzfort overflow when volume exceeds the dedicated count
- **Outcomes:**
  - Capacity that shows up knowing your site — not discovering it at the gate
  - Stable body type and crew familiarity across the program window
  - Clear line between dedicated assets and surge network capacity
- **Secondary CTA:** See Our Fleet → /fleet
- **Leaf path:** /logistics/dedicated-fleet
- **Fleet suitable lead:** Dedicated means the assigned body type stays fixed — including LCV feeder, sealed container, or tanker when the cargo demands it.
- **Fleet type LCV:** Assigned regional / feeder
- **Fleet type Container:** Sealed plant–DC program
- **Fleet type Trailer / flatbed:** Heavy industrial lanes
- **Fleet type Bulker:** Powder cement / fly ash
- **Fleet type Tanker:** Liquids · quoted per cargo

### Section: Industries band
- **Eyebrow:** Who we serve
- **H2:** Built for heavy industrial freight.
- **Lead:** Cement, steel, coal and mining, manufacturing — same desk.

### Section: Final CTA
- **H2:** Ready to move your freight?
- **Lead:** Request FTL capacity, discuss a contract or dedicated program, or ask for container movement on a port–plant lane. Same desk on WhatsApp or email.
- CTA: Chat on WhatsApp

### Section: Inquiry mail templates
- **Quote label:** Request Transportation
- **Quote subject:** Freight quote request
- **Quote body:** Hi ZAFTYS,\n\nI'd like to request transportation capacity.\n\nFrom:\nTo:\nLoad type:\nTimeline:\n\n
- **Contract label:** Discuss Your Contract Requirement
- **Contract subject:** Contract logistics inquiry
- **Container label:** Request Container Capacity
- **Container subject:** Container transportation inquiry

## /logistics/container-transportation — Container Transportation

**Meta:** Container Transportation Port to Market India | Container road legs port–factory–market. Trailers for sealed freight, plant and port window coordination, TMS on contracted moves.

### Section: Breadcrumbs
- Home → /
- Logistics → /logistics
- Container Transportation → /logistics/container-transportation

### Section: Hero
- **Badge:** Container Transportation
- **H1:** Port to factory, factory to port, port to market — sealed freight on corridors we run.
- **Lead:** Container transportation for ZAFTYS is road execution between ports, warehouses, factories, and inland markets. We move containers and sealed freight on trailers suited to the corridor, with trip visibility on contracted moves and partner overflow when the yard needs more wheels than we own that day.

### Section: Features
- **Port to warehouse / factory:** Inbound containers delivered to distribution or production with factory-slot awareness — not only a port pickup quote.
- **Factory to port:** Export-bound boxes timed to plant loading windows so demurrage and detention clocks do not own the day.
- **Port to market:** Inland city and market trailer programs where the commercial lane demands sealed FTL on the road.

### Section: Highlights
- Container trailers and sealed configurations matched to the corridor
- Coordination for gate-in, factory slot, and trip close-out
- Visibility on contracted container moves through the same desk and TMS
- Owned capacity where we run the lane; Tranzfort partners when overflow is required — labeled

### Section: Related links
- 3PL Transportation → /logistics/3pl-transportation
- Industrial Freight → /logistics/industrial-freight

- **Primary CTA type:** container

## /logistics/3pl-transportation — 3PL Transportation

**Meta:** 3PL Transportation Services India | FTL 3PL transportation from ZAFTYS — owned fleet first, labeled partner overflow, GST billing, and TMS on trips we run. Industrial and commercial corridors.

### Section: Breadcrumbs
- Home → /
- Logistics → /logistics
- 3PL Transportation → /logistics/3pl-transportation

### Section: Hero
- **Badge:** 3PL Transportation
- **H1:** Full-truckload execution — not a booking that vanishes after allotment.
- **Lead:** 3PL for ZAFTYS means we execute the trip. Full truckload from origin to destination, vehicle class matched to cargo, GST-compliant billing on contracted moves, and a desk that stays on the lane until delivery documentation closes.

### Section: Features
- **Full truckload ownership:** One operator accountable from indent to POD — not a broker who stops answering after the truck is allotted.
- **Right body for the gate:** LCV through multi-axle, flatbed, tipper, trailer, and ODC matched to cargo and plant rules — not whatever truck is cheapest that hour.
- **Owned + labeled overflow:** Company fleet first on corridors we run every week; verified Tranzfort partners when volume spikes — always labeled, never silent brokerage.

### Section: Highlights
- Dispatch and close-out on ZAFTYS TMS for contracted movements
- GST-compliant invoicing — not informal cash settlement
- One Amravati desk for indent, allotment follow-through, and documentation
- Built for manufacturers and traders moving FTL between plants, mills, and sites

### Section: Related links
- Contract Logistics → /logistics/contract-logistics
- Our Fleet → /fleet
- Tranzfort Network → /network/tranzfort

- **Primary CTA type:** quote
- **Secondary link:** View all logistics → /logistics

## /logistics/industrial-freight — Industrial Freight

**Meta:** Industrial Freight Transportation India | Industrial freight for steel, cement, mining, and project cargo. Flatbed, tipper, multi-axle, and ODC with plant-window and weighbridge discipline.

### Section: Breadcrumbs
- Home → /
- Logistics → /logistics
- Industrial Freight → /logistics/industrial-freight

### Section: Hero
- **Badge:** Industrial Freight
- **H1:** Steel, cement, mining, and project cargo — built for plant windows and axle reality.
- **Lead:** Industrial freight is where generic FTL breaks. Coils need the right flatbed and securing. Cement and bulk need tippers and bulkers that survive the plant queue. Mining lanes need weighbridge discipline. ZAFTYS runs these movements as an operator that already lives in that world.

### Section: Features
- **Steel and metals:** Coils, plates, TMT, and sections on flatbeds and multi-axle with weighbridge and axle discipline.
- **Cement and bulk solids:** Tippers and bulkers on plant-to-project and plant-to-market lanes with loading-window awareness.
- **Mining and project cargo:** Pit-head to plant / siding movements, plus manufacturing inbound and outbound on scheduled programs.

### Section: Highlights
- Vehicle class chosen for cargo, axle limits, and gate rules
- Detention and plant-window language at the desk — where industrial cost sits
- Same operating model across cement, steel, coal, and manufacturing
- Fewer refusals at the gate because the truck matches the load and the site

### Section: Related links
- Industries → /industries
- Container Transportation → /logistics/container-transportation

- **Primary CTA type:** quote

## /logistics/contract-logistics — Contract Logistics

**Meta:** Contract Logistics and Dedicated Transportation | Contract logistics with dedicated or reserved trucks, SLA tracking, plant-window dispatch, and TMS visibility. Capacity assurance — not only a rate.

### Section: Breadcrumbs
- Home → /
- Logistics → /logistics
- Contract Logistics → /logistics/contract-logistics

### Section: Hero
- **Badge:** Contract Logistics
- **H1:** Recurring lanes need assigned capacity — not a fresh hunt every Monday.
- **Lead:** Contract logistics at ZAFTYS is a long-term transportation program: dedicated or reserved trucks on the corridors you run every week, SLA tracking, plant-window awareness, and an account desk that already knows your sites.

### Section: Features
- **Reserved capacity:** Dedicated or reserved trucks on plant, mill, and DC corridors so peak weeks are not a spot-market scramble.
- **SLA on the window:** Performance tracked against agreed loading and transit windows — not only a one-off transit promise.
- **Managed dispatch desk:** Allotment, gate timing, and escalation when the plant slips — from one Amravati desk that knows your sites.

### Section: Highlights
- Assigned trucks and drivers for seasonal or annual programs
- Shipper visibility on contracted trips through ZAFTYS TMS
- Overflow through verified partners — never silently presented as owned fleet
- Built for procurement and logistics heads who need capacity assurance under an SLA

### Section: Related links
- Dedicated Fleet → /logistics/dedicated-fleet
- 3PL Transportation → /logistics/3pl-transportation
- ZAFTYS TMS → /zaftys-tms

- **Primary CTA type:** contract
- **Secondary link:** Discuss on WhatsApp → /contact

## /logistics/dedicated-fleet — Dedicated Fleet

**Meta:** Dedicated Fleet Services India | Dedicated fleet: trucks and drivers assigned to your plant or DC program. Body type follows the lane. SLA, TMS, and labeled surge overflow from ZAFTYS.

### Section: Breadcrumbs
- Home → /
- Logistics → /logistics
- Dedicated Fleet → /logistics/dedicated-fleet

### Section: Hero
- **Badge:** Dedicated Fleet
- **H1:** Your trucks. Your corridors. Your season or year.
- **Lead:** Dedicated fleet is how a ZAFTYS contract looks when vehicles and drivers are assigned to you. Body type follows the lane — LCV, heavy load, container, tanker, or bulker — with plant-window dispatch and TMS on every contracted trip.

### Section: Features
- **Assigned vehicles and drivers:** Trucks and crews dedicated to your program for a season or a year — they learn your gate, bay, and loading rules.
- **Vehicle class follows the lane:** LCV, multi-axle, flatbed, tipper, container, tanker, or bulker on the same contract framework — chosen for cargo, not convenience.
- **Performance on the corridor:** Measured on repeat windows and detention risk, not a one-off spot rate that looks cheap until the plant queue.

### Section: Highlights
- Plant and DC window awareness built into dispatch
- TMS visibility for shippers on contracted trips
- Tranzfort overflow when surge exceeds dedicated count — labeled clearly
- GST-compliant billing through ZAFTYS

### Section: Related links
- Contract Logistics → /logistics/contract-logistics
- Our Fleet → /fleet

- **Primary CTA type:** contract

## /fleet — Fleet

**Meta:** Own Fleet and Network Fleet | Commercial Truck Types | ZAFTYS own fleet: side wall trailer, 32 ft SXL/MXL, 40 ft flat bed, 30T/35T open body (14W/16W). Network fleet via Tranzfort covers LCV through ODC — labeled, never blended.

### Section: Hero
- **Badge:** Fleet capacity
- **H1:** Own fleet. Network fleet. Same desk.
- **Lead:** Hire a body class for the corridor. We tell you whether the truck is company-operated or verified network capacity — never silently mixed.
- **Hero alt:** ZAFTYS company-operated commercial trucks on an Indian corridor

### Section: Own fleet
- **Eyebrow:** Own Fleet
- **H2:** Company trucks we operate
- **Lead:** Side wall trailer, 32 ft SXL / MXL, 40 ft flat bed, and 30T / 35T open body (14W / 16W) — drivers, readiness, and dispatch sit with ZAFTYS. Contracted trips can report through ZAFTYS TMS.
- **Side wall trailer:** Side-wall trailer body for corridor haulage [Trailer, Side wall]
- **32 ft container:** Single axle (SXL) and multi axle (MXL) sealed bodies [32 ft SXL, 32 ft MXL]
- **40 ft flat bed trailer:** 40 ft flat bed trailer for long product and plant loads [40 ft, Flat bed]
- **30T / 35T open body:** 14-wheeler and 16-wheeler open body trucks — 30T and 35T class [14W, 16W, 30T, 35T, Open body]

### Section: Cargo match
- **Sealed FTL / plant boxes:** 32 ft SXL · 32 ft MXL
- **Long product / plant loads:** 40 ft flat bed · side wall trailer
- **Bagged / bulk solids:** 30T / 35T · 14W / 16W open body

### Section: Ops
- **H2:** How we run own fleet
- **Lead:** Ownership means more than a body type — readiness, papers, and close-out sit with us.
- **Dispatch readiness:** Inspection and allotment before the gate.
- **Maintenance discipline:** Planned upkeep so the class stays available.
- **Site safety:** Loading, papers, and close-out on one desk.
- **TMS on contracted trips:** Same stack we dispatch on every day.

### Section: Network fleet
- **Eyebrow:** Network Fleet
- **H2:** All commercial types via verified partners
- **Lead:** When own capacity is short, Tranzfort supplies the body class you need — LCV through ODC. Network trucks are labeled on the trip, never sold as company fleet.
- **Full type coverage:** Every TranZfort catalog class available as overflow
- **Labeled on the trip:** Shipper sees network capacity, not fake owned count
- **Same commercial desk:** GST path when the trip is contracted through ZAFTYS
- **Catalog lead:** Same picker language as TranZfort. Use when the indent needs a class beyond the four own-fleet assets.

### Section: Truck types catalog (constants.truckTypes — used in network/services contexts)
- **LCV** (Distribution · regional FTL): Open and closed LCV: Ace, Dost, and 14ft to 24ft, including 6W container. Not house shifting. Not two-wheeler last mile.
- **Open Body** (7-35T · bulk solids): High-side and flat-deck trucks for coal, aggregates, bagged cement, and steel lengths.
- **Tipper / Dumper** (16-35T · loose bulk): Hydraulic discharge for sand, ore, overburden, and mine outbound on pit-to-plant lanes.
- **Flatbed / Low-bed** (20-40T · heavy load): Open deck and multi-axle trailers for steel coils, machinery, pipes, and project cargo.
- **Bulk Tanker** (Liquids): Water, chemical, acid, petroleum, and edible oil, quoted per cargo and corridor.
- **Container / Box** (Sealed freight): Box-body and container configurations for palletized, weather-sensitive, and high-value cargo.

### Section: Final CTA
- **H2:** Need capacity on a lane?
- **Lead:** Tell us corridor, cargo, and class — we’ll confirm own fleet or labeled network.

## /network — Network hub

**Meta:** Transportation Network | Own Fleet, TranZfort, Partners | ZAFTYS transportation network: owned fleet first, labeled partner overflow, TranZfort marketplace, and truck capacity sourcing. Own vs Network never blended.

### Section: Hero
- **Badge:** Transportation Network
- **H1:** ZAFTYS operates. Tranzfort connects.
- **Lead:** Owned fleet when we have the truck. Verified partner capacity when the lane needs more. TranZfort extends the network digitally. Same desk. Labels stay honest.
- **pageHeroCopy H1:** ZAFTYS operates. Tranzfort connects.

### Section: Intro
- **Eyebrow:** How capacity works here
- **H2:** One commercial relationship. Two labeled sources.
- **Lead:** Industrial shippers do not need a marketplace story and a fleet story that contradict each other. ZAFTYS runs company trucks first, then labeled network overflow. TranZfort is how demand and trucks find each other digitally.
- **Own fleet:** Company-operated trucks on corridors we run every week. Body class matched to cargo and gate rules.
- **Network overflow:** Verified partners when volume or corridor demand exceeds owned capacity. Always labeled, never silent brokerage.
- **TranZfort marketplace:** Post or find a load for free. AI matching on corridor and vehicle. Broker fee to truckers on booked loads.
- **TMS when we contract:** Trips contracted through ZAFTYS can sit in ZAFTYS TMS for status, ePOD, and GST billing.

### Section: Modules
#### TranZfort (Live)
- **Lead:** Digital freight marketplace for shippers and truckers. Free to post and find. AI-powered matching on corridor, vehicle class, and timing. Built for Indian highway conditions.
- **Points:**
  - Free listing and search. Broker fee to truckers on booked loads
  - Verified onboarding for partners before they show as available
  - Hindi and English on the road. Core features when signal drops
  - Contracted ZAFTYS trips can continue into TMS visibility
- **Caption:** TranZfort · marketplace browse
- **Image alt:** TranZfort app browse marketplace screen
- **CTA:** Explore TranZfort → /network/tranzfort
- **Secondary CTA:** Become a Partner → /partner

#### Transporter network (Available)
- **Lead:** Verified carriers and third-party truck capacity with RC, insurance, and onboarding checks before partners move freight on ZAFTYS-contracted trips.
- **Points:**
  - KYC and document checks before allotment
  - Corridor and body-class matching to what partners actually run
  - Distinct from owned fleet in reporting and desk language
  - GST and documentation when ZAFTYS is on the contract
- **Caption:** Network · partner capacity context
- **Image alt:** ZAFTYS network view for partner capacity context
- **CTA:** Transporter network → /network/transporter-network
- **Secondary CTA:** Partner registration → /partner

#### Truck capacity (Available)
- **Lead:** Source owned or partner capacity through one ZAFTYS relationship. Own fleet first. Labeled network overflow when the lane needs more trucks.
- **Points:**
  - Company trucks across the body classes we operate
  - Verified overflow without anonymous last-minute vendor chaos
  - One desk for indent, allotment, and documentation
  - TranZfort when you need digital discovery for overflow loads
- **Caption:** Own fleet · body class for the corridor
- **Image alt:** ZAFTYS company side wall trailer used on industrial corridors
- **CTA:** Source truck capacity → /network/truck-capacity
- **Secondary CTA:** Our Fleet → /fleet

### Section: Honesty
- **Eyebrow:** Own vs Network
- **H2:** We never silently mix the two
- **Lead:** If the truck is company-operated, we say so. If it is verified network capacity, we say so. Marketing pages do not invent blended fleet counts.
- **Own fleet:** ZAFTYS-operated vehicles on corridors and programs we run with our desk.
- **Network fleet:** Verified partner trucks coordinated for overflow, surge, or corridor coverage.
- **TranZfort listing:** Marketplace discovery is free. Contracted trips through ZAFTYS keep GST and TMS options on our side.

### Section: Buyers
- **Eyebrow:** Who it is for
- **H2:** Shippers who need trucks. Partners who need loads.
- **Shippers and manufacturers:** Capacity with clear Own vs Network labeling and one commercial path when ZAFTYS contracts the trip.
- **Fleet owners and transporters:** Join as partners, find loads on TranZfort, and run ZAFTYS-contracted work with structured paperwork.
- **Procurement and logistics heads:** Overflow without losing desk accountability or inventing a second broker relationship.

### Section: Related
- **Eyebrow:** Connected
- **H2:** Network sits next to Logistics and TMS
- **Our Fleet** (/fleet): Own vs Network body classes
- **ZAFTYS TMS** (/zaftys-tms): Dispatch on contracted trips
- **Logistics services** (/logistics): 3PL and contract transportation
- **Become a Partner** (/partner): Register as a transport partner

### Section: Final CTA
- **H2:** Need more capacity on your lane?
- **Lead:** Explore TranZfort, source truck capacity through ZAFTYS, or register as a partner.
- **Primary:** Explore TranZfort → /network/tranzfort
- **Secondary:** Become a Partner → /partner

## /network/tranzfort — TranZfort

**Meta:** TranZfort | AI-Powered Freight Marketplace | Post or find a load for free. AI-powered matching. Broker fee to truckers on booked loads. Verified partners. Download the app.

### Section: Hero
- **Badge:** Marketplace · live
- **H1:** TranZfort. Post or find a load for free.
- **Lead:** Shippers post loads. Truckers book them. Matching is AI-powered on corridor, vehicle type, and timing. Listing and search are free. We charge a broker fee to truckers on booked loads. If the trip is contracted through ZAFTYS, billing stays GST-compliant on our side.
- **Hero alt:** TranZfort freight marketplace: post a load or find a truck
- CTA: Download TranZfort
- CTA: Post a load

### Section: Pulse strip
- **Free to post:** No listing fee
- **Free to find:** No search fee
- **AI-powered matching:** Corridor and vehicle
- **Broker fee:** On trucker bookings

### Section: Inside the app
- **H2:** Inside the TranZfort app
- **Lead:** Join, search, browse, and book. Download the live app when you are ready to post or find a load.

### Section: How it works
- **H2:** How TranZfort works
- **Lead:** Post a load or find a truck. Matching is AI-powered. You still confirm the booking.
- **Share the load or the empty truck:** Post origin, destination, and vehicle class, or publish an available truck.
- **Matching suggests a fit:** AI-powered matching on corridor, body type, timing, and papers.
- **You confirm:** ZAFTYS coordinates trips that run through us. GST billing stays on our side.
- **Status can follow in TMS:** Contracted work can sit in ZAFTYS TMS so you are not chasing WhatsApp photos.

### Section: Marketplace benefits
- **H2:** What you get in the marketplace
- **Lead:** Listing and search are free. AI-powered matching. We charge a broker fee to truckers on booked loads. GST billing when the trip runs through ZAFTYS.
- **Free to post and find:** No listing fee. No search fee. We charge a broker fee to truckers on booked loads.
- **AI-powered matching:** Suggestions use corridor, vehicle class, timing, and papers. You still confirm the booking.
- **Verified truckers:** RC, insurance, and onboarding before a partner shows as available.
- **GST when we contract:** Trips that run through ZAFTYS stay on our GST billing. The app listing itself is free.
- **TMS on ZAFTYS trips:** Contracted work can sit in ZAFTYS TMS so status is not only a WhatsApp thread.
- **Built for the highway:** Hindi and English on the road. Core features keep working when the signal drops.

### Section: Audience
- **H2:** Built for both sides of the load
- **Lead:** Shippers post. Truckers book. See the app screens. Existing ZAFTYS transport customers use the same app when they need a truck we do not have today.
- Link: See the app screens
- **For shippers:**
  - Post a load once. See suggested trucks.
  - Keep one commercial relationship when ZAFTYS is on the contract.
  - Visibility through ZAFTYS TMS on trips we run.
- **For truck owners:**
  - Find commercial loads on corridors you already run.
  - Onboarding checks RC and papers.
  - Payments for ZAFTYS trips come through ZAFTYS.

### Section: Why TranZfort (networkHighlights)
- **H2:** Why TranZfort
- **Lead:** Hindi and English on the road. Built for highway work, not city-only apps.
- **Route intelligence:** Smarter routing suggestions to cut empty miles on repeat corridors.
- **Hindi & English voice:** Speak naturally on the road. Built for Indian logistics.
- **Works offline:** Core features keep working on highways with limited signal.
- **Verified truckers:** KYC, RC, and vehicle docs before partners move your freight.
- **Load matching:** AI-powered matching of loads and trucks. Listing and search are free. Broker fee on trucker bookings.
- **GST on ZAFTYS trips:** Trips contracted through ZAFTYS stay on GST billing.
- Card link labels: Learn more → / See demo →

### Section: Comparison
- **H2:** Calling five brokers vs TranZfort
- **Lead:** Separate rates and WhatsApp groups, or one marketplace next to our fleet and TMS.
- **Calling five brokers:**
  - Separate rates and separate WhatsApp groups
  - You manage multiple transporters yourself
  - No shared tracking or one GST invoice
- **TranZfort plus ZAFTYS:**
  - Post or find with no listing or search fee. Broker fee to truckers on booked loads
  - Own fleet if we have the truck
  - TMS on the trip we run

### Section: Final CTA
- **H2:** Post a load or find a truck
- **Lead:** Download TranZfort, or WhatsApp a load. Fleet owners can also become a partner.
- CTA: Download TranZfort
- CTA: Post a load
- Footer links: logistics services, ZAFTYS TMS, contact ZAFTYS Logistics

### Section: Locked TranZfort claim strings (constants.tranzfortCopy)
- **Matching:** AI-powered matching
- **Listing free:** Listing and search are free.
- **Broker fee:** We charge a broker fee to truckers on booked loads.
- **Combined:** Listing and search are free. We charge a broker fee to truckers on booked loads.

## /network/transporter-network — Transporter Network

**Meta:** Transporter Network and Verified Carriers | ZAFTYS | ZAFTYS verified transporter network. Third-party truck capacity with RC, insurance, and onboarding checks. Labeled network overflow, never blended with owned fleet.

### Section: Breadcrumbs
- Home → /
- Network → /network
- Transporter Network → /network/transporter-network

### Section: Hero
- **Badge:** Transporter Network · Available
- **H1:** Verified carriers when your lane needs more trucks.
- **Lead:** ZAFTYS coordinates a network of verified transportation partners. Onboarding checks RC, insurance, and operating patterns before a partner shows as available. Network capacity stays labeled. Own fleet stays separate.
- **Image alt:** ZAFTYS verified partner network capacity
- **Primary CTA:** Register as a partner
- **Primary CTA path:** /partner
- **Secondary CTA:** Explore TranZfort → /network/tranzfort

### Section: Mail template
- **Subject:** Transporter network / partner inquiry
- **Body:** Hi ZAFTYS,\n\nI want to discuss the transporter network.\n\nCompany:\nRole:\nFleet size / corridors:\nShipper or partner:\n\n

### Section: Problem — Surge capacity without anonymous vendor chaos
- **Eyebrow:** The overflow problem
- **Lead:** When owned fleet is full, shippers still need trucks that clear the gate. Last-minute unknown vendors create paperwork and accountability gaps.
- **Unverified allotment:** A truck shows up without RC, insurance, or corridor fit the plant can defend.
- **Blended storytelling:** Partner trucks get described as company fleet, so Own vs Network accountability disappears.
- **No desk after allotment:** Broker-style handoffs that stop answering once the vehicle is assigned.

### Section: Capabilities — Verified partners coordinated by ZAFTYS
- **Eyebrow:** What you get
- **Lead:** Network capacity for ZAFTYS-contracted trips and TranZfort discovery. Labels stay honest.
- **Verified onboarding:** KYC, RC, fitness, permit, and insurance checks before partners move freight.
- **Corridor matching:** Partners matched to corridors and vehicle classes they actually run.
- **ZAFTYS coordination:** Trips contracted through ZAFTYS stay on GST billing with structured documentation.
- **Labeled network capacity:** Distinct from owned fleet in desk language, TMS views, and commercial conversations.
- **TranZfort access:** Digital load posting and discovery for partners and shippers on the marketplace.
- **TMS on contracted trips:** Visibility and ePOD when the movement runs through ZAFTYS TMS.

### Section: Visual — Network capacity next to the operational spine
- **Eyebrow:** Product
- **Lead:** Partner context sits with the same platform language as dispatch and TranZfort.
- **Primary caption:** Network · partner and capacity context
- **Primary alt:** ZAFTYS TMS network view for partner capacity
- **Secondary caption:** TranZfort · partner join and register
- **Secondary alt:** TranZfort app join and register screen for partners

### Section: Who for — Shippers needing overflow. Partners needing loads.
- **Eyebrow:** Who it is for
- **Shippers and manufacturers:** Overflow trucks with verification and desk follow-through when ZAFTYS contracts the trip.
- **Fleet owners:** Join the network, clear onboarding, and access loads via TranZfort and ZAFTYS coordination.
- **Logistics heads:** Surge coverage without inventing a second silent broker layer.

### Section: Data notes — Network partners feed TranZfort and contracted TMS trips
- **Eyebrow:** How it connects
- **Lead:** Discovery can start on TranZfort. Contracted execution can sit in ZAFTYS TMS. Own fleet pages stay separate.
- **Points:**
  - Partner registration at /partner
  - Marketplace at TranZfort
  - Own vs Network never blended in marketing or ops language
  - No invented public partner headcounts on this page
- **CTA:** Become a Partner → /partner

### Section: Honesty — Available as labeled network capacity
- **Eyebrow:** Availability
- **Body:** Partners are onboarded and corridor-matched. This is not a promise that every body class is available on every lane every day. Coverage is confirmed for your program during onboarding.

### Section: Related — Continue in the Network
- **Eyebrow:** Related
- **TranZfort** (/network/tranzfort): Marketplace · live
- **Truck capacity** (/network/truck-capacity): Own plus network sourcing
- **Our Fleet** (/fleet): Company body classes
- **Network hub** (/network): How capacity is organized

### Section: Final CTA
- **H2:** Join as a partner, or source verified overflow
- **Lead:** Register your fleet, or ask the desk how network capacity works on your corridors.
- **Primary:** Register as a partner
- **Primary path:** /partner
- **Secondary:** Back to Network → /network

**Status label:** Available

## /network/truck-capacity — Truck Capacity

**Meta:** Truck Capacity Sourcing | Own Fleet and Network | Source owned or verified partner truck capacity through ZAFTYS. Own fleet first, labeled network overflow, one desk, GST on contracted trips.

### Section: Breadcrumbs
- Home → /
- Network → /network
- Truck Capacity → /network/truck-capacity

### Section: Hero
- **Badge:** Truck Capacity · Available
- **H1:** Source capacity from fleet and network in one relationship.
- **Lead:** When demand exceeds owned fleet on a lane, ZAFTYS sources verified third-party capacity through partner coordination and TranZfort, without losing commercial or operational control. Own and Network stay labeled.
- **Image alt:** ZAFTYS truck capacity from owned fleet and network partners
- **Primary CTA:** Request transportation
- **Secondary CTA:** Explore TranZfort → /network/tranzfort

### Section: Mail template
- **Subject:** Truck capacity sourcing inquiry
- **Body:** Hi ZAFTYS,\n\nI need truck capacity.\n\nCompany:\nFrom:\nTo:\nVehicle class:\nVolume / timeline:\n\n

### Section: Problem — Plant windows do not wait for a perfect owned-fleet day
- **Eyebrow:** The capacity problem
- **Lead:** Corridors spike. Body classes run short. You still need a truck that fits the gate, with a desk that stays on the trip.
- **Owned fleet alone is not enough:** Seasonal and corridor peaks exceed company trucks without a labeled overflow path.
- **Marketplace without an operator:** Finding a truck is not the same as contracted execution, GST billing, and TMS close-out.
- **Mixed messaging:** Shippers hear company fleet while receiving anonymous network trucks.

### Section: Capabilities — Capacity sourcing with Own vs Network clarity
- **Eyebrow:** What you get
- **Lead:** One ZAFTYS relationship whether the truck is owned or partner-sourced.
- **Owned fleet first:** Company trucks across LCV, heavy load, container, tanker, and bulker classes we operate.
- **Network overflow:** Verified partners when surge or corridor demand exceeds owned capacity.
- **One desk:** Same commercial relationship for indent, allotment follow-through, and documentation.
- **TranZfort for discovery:** Free listing and search when overflow loads need digital matching.
- **TMS on contracted trips:** Dispatch and visibility when the movement runs through ZAFTYS TMS.
- **GST when we contract:** Trips contracted through ZAFTYS stay on structured billing, not informal settlement.

### Section: Visual — Fleet assets and marketplace discovery
- **Eyebrow:** Product
- **Lead:** Capacity is physical trucks plus a desk. TranZfort extends discovery. TMS holds contracted execution.
- **Primary caption:** Own fleet · company-operated capacity
- **Primary alt:** ZAFTYS owned side wall trailer for industrial freight
- **Secondary caption:** TranZfort · search loads for overflow
- **Secondary alt:** TranZfort app search loads screen

### Section: Who for — Teams that book trucks, not slides
- **Eyebrow:** Who it is for
- **Shippers and plant logistics:** Need a body class on a corridor with clear labeling of who operates the truck.
- **Procurement:** Want one relationship for owned and overflow capacity without silent blending.
- **Operations managers:** Peak weeks that still require gate-ready trucks and desk follow-through.

### Section: Data notes — Fleet page for body class. Network for overflow. TMS for contracted trips.
- **Eyebrow:** How sourcing works
- **Lead:** Start from the vehicle class you need. We tell you whether the truck is company-operated or verified network capacity.
- **Points:**
  - See Our Fleet for owned body classes
  - Use TranZfort when you want marketplace discovery
  - Contracted trips can sit in ZAFTYS TMS
  - No invented public truck counts on this page
- **CTA:** Our Fleet → /fleet

### Section: Honesty — Available through ZAFTYS logistics and TranZfort
- **Eyebrow:** Availability
- **Body:** Capacity depends on corridor, body class, and timing. We confirm Own vs Network at allotment. Marketplace listings are free to post and find; broker fees apply to truckers on booked loads as stated on TranZfort.

### Section: Related — Continue in the Network
- **Eyebrow:** Related
- **Our Fleet** (/fleet): Own vs Network body classes
- **TranZfort** (/network/tranzfort): Marketplace · live
- **Transporter network** (/network/transporter-network): Verified partners
- **Logistics services** (/logistics): 3PL and contract transportation

### Section: Final CTA
- **H2:** Tell us the corridor and the body class
- **Lead:** Request transportation capacity, or open TranZfort if you want to post or find a load digitally.
- **Primary:** Request transportation
- **Secondary:** Explore TranZfort → /network/tranzfort

**Status label:** Available

## /zaftys-tms — ZAFTYS TMS

**Meta:** ZAFTYS TMS | Transport Management System | ZAFTYS TMS is live TMS software for dispatch, GPS tracking, e-POD, fleet records and shipper visibility. Request a demo or log in at app.zaftys.com.

### Section: Hero
- **Badge:** ZAFTYS TMS · live
- **H1:** The TMS we dispatch on every day.
- **Lead:** Plan, dispatch, track, and close out transportation in one system. Shippers use the portal for tracking and ePOD. Fleet operators use the same stack for vehicles, drivers, and trip close-out. Login at app.zaftys.com.
- **Hero alt:** ZAFTYS TMS dispatch and tracking for shippers and fleet operators

### Section: Intro
- **Eyebrow:** What it is
- **H2:** Platform technology shaped by the Amravati desk
- **Lead:** Peers sell generic TMS suites. We ship the stack that already runs plant windows, weighbridge loops, Own vs Network labeling, and ePOD close-out on corridors ZAFTYS executes.
- **One trip lifecycle:** Order to billing on the same record. No second spreadsheet for status.
- **Live at app.zaftys.com:** Dispatch, shipments, map, and portal in production for ZAFTYS operations and customer programs.
- **Own vs Network labeled:** Company trucks and TranZfort overflow stay distinct in the system of record.
- **Built for Indian gates:** Plant windows, multi-axle, LCV drops, and document checks treated as first-class events.

### Section: Workflow
- **Eyebrow:** Connected workflow
- **H2:** From indent to analytics without leaving the trip
- **Lead:** Every step writes back to the same movement. That is what makes Analytics and desk AI research possible later.
- **Steps:**
  - Order
  - Load planning
  - Capacity sourcing
  - Vehicle allocation
  - Dispatch
  - Tracking
  - Delivery
  - ePOD
  - Billing
  - Analytics

### Section: Modules
#### Command Center and dispatch (Available)
- **Lead:** Plan, dispatch, track, and close out transportation from one operational system. Command Center, Dispatch, Shipments, and Live Map are the screens the desk already trusts.
- **Points:**
  - Trip lifecycle from indent through billing
  - Exception queues instead of scattered WhatsApp threads
  - Same platform ZAFTYS dispatches on daily
  - Shipper and operator views from one operational truth
- **Caption:** Command Center · live at app.zaftys.com
- **Image alt:** ZAFTYS TMS Command Center with operational KPIs
- **CTA:** Login at app.zaftys.com → /login
- **Secondary CTA:** Book a demo → /contact

#### Tracking and visibility (Available)
- **Lead:** Live GPS, shipment status, and digital ePOD on contracted trips. Shippers see the load without calling the control room for every update.
- **Points:**
  - Live map for active contracted moves
  - Shipper portal for tracking and documents
  - Digital ePOD linked to the trip record
  - Exception visibility for desk and customer teams
- **Caption:** Live Map · GPS on contracted trips
- **Image alt:** ZAFTYS TMS Live Map with real-time GPS tracking
- **CTA:** Tracking and visibility → /zaftys-tms/tracking

#### Fleet management (Available)
- **Lead:** Vehicle registry, drivers, documents, and maintenance inside the same TMS stack. Built so trucks are not stopped at the gate for expired paperwork.
- **Points:**
  - Vehicle and driver records in one place
  - Document expiry and maintenance alerts
  - Assignment history tied to dispatch
  - Used on ZAFTYS own fleet every day
- **Caption:** Dispatch · fleet and trip assignment
- **Image alt:** ZAFTYS TMS Dispatch board used with fleet assignment
- **CTA:** Fleet management → /zaftys-tms/fleet-management

#### Logistics APIs (Available)
- **Lead:** Connect trip, fleet, and visibility data with ERP and commercial systems. We only discuss endpoints that are implemented. Scope is confirmed in enterprise onboarding.
- **Points:**
  - Trip data for downstream systems
  - Status events where supported
  - Integration planning for shippers and operators
  - Built around real dispatch workflows, not generic middleware
- **Caption:** Network · capacity and partner context
- **Image alt:** ZAFTYS TMS network view for capacity and integrations context
- **CTA:** Logistics APIs → /zaftys-tms/apis

### Section: Buyers
- **Eyebrow:** Who it is for
- **H2:** Shippers and operators on the same stack
- **Shippers and manufacturers:** Portal tracking and ePOD without chasing driver photos. Lane performance when Analytics is in play.
- **Fleet and 3PL operators:** Dispatch, fleet records, and trip close-out on the system ZAFTYS runs internally.
- **Technology and IT leads:** One operational spine to connect ERP later, with API scope stated during onboarding.

### Section: Live
- **Eyebrow:** Production
- **H2:** Live today at app.zaftys.com
- **Lead:** Not a slideware TMS. The Amravati desk runs contracted trips on this stack.
- **Points:**
  - Dispatch and trip lifecycle in production
  - Client portal for shipment visibility and ePOD
  - Fleet, driver, and document records on one system
  - Plant windows, weighbridge, multi-axle, and LCV drops as first-class events
- **Primary:** Login at app.zaftys.com → /login
- **Secondary:** Book a demo → /contact

### Section: FAQs
- **Q:** Is ZAFTYS TMS a live product?
  - **A:** Yes. ZAFTYS TMS powers ZAFTYS dispatch operations daily and is available to shippers and fleet operators via app.zaftys.com. Request a demo if you want a guided walkthrough.
- **Q:** Who should use ZAFTYS TMS?
  - **A:** Shippers who need shipment visibility, and fleet operators who want dispatch, fleet records, documentation, and trip reporting in one platform. It is not limited to heavy-haul work.
- **Q:** How is this different from generic TMS tools?
  - **A:** ZAFTYS TMS is shaped by our own transport desk: plant loading windows, weighbridge loops, LCV drops, multi-axle work, and TranZfort when a trip needs a partner truck.

### Section: Related
- **Eyebrow:** Connected products
- **H2:** TMS feeds Logistics Intelligence
- **ZAFTYS Analytics** (/intelligence/analytics): Operations KPIs on the same trip spine
- **Logistics Intelligence** (/intelligence): Rates, reports, and desk AI research
- **Logistics services** (/logistics): Capacity and contract transportation
- **TranZfort** (/network/tranzfort): Marketplace when the lane needs network capacity

### Section: Final CTA
- **H2:** Start with the live portal
- **Lead:** Log in at app.zaftys.com, or request a guided demo for your operations team.
- **Primary:** Book a TMS demo
- **Secondary:** Login at app.zaftys.com → /login

### Section: Demo mail
- **Subject:** ZAFTYS TMS demo request
- **Body:** Hi ZAFTYS,\n\nI want to book a demo of ZAFTYS TMS.\n\nCompany:\nRole:\nUse case:\n\n

## /zaftys-tms/tracking — Tracking & Visibility

**Meta:** Shipment Tracking and Visibility | ZAFTYS TMS | Live GPS, shipper portal, and digital ePOD in ZAFTYS TMS. Track contracted trips after the truck leaves origin without chasing WhatsApp status.

### Section: Breadcrumbs
- Home → /
- ZAFTYS TMS → /zaftys-tms
- Tracking & Visibility → /zaftys-tms/tracking

### Section: Hero
- **Badge:** Tracking & Visibility · Available
- **H1:** Visibility after the truck leaves the origin.
- **Lead:** Live map, shipment status, and digital ePOD on contracted trips. Shippers see the load without calling the control room for every update. Desk and customer share one trip record.
- **Image alt:** ZAFTYS TMS live map and shipments tracking
- **Primary CTA:** Book a TMS demo
- **Secondary CTA:** Open ZAFTYS TMS → /zaftys-tms

### Section: Mail template
- **Subject:** ZAFTYS TMS tracking and visibility demo
- **Body:** Hi ZAFTYS,\n\nI want a demo of tracking and visibility in ZAFTYS TMS.\n\nCompany:\nRole:\nCorridors / shipper portal needs:\n\n

### Section: Problem — WhatsApp photos are not a control tower
- **Eyebrow:** The visibility problem
- **Lead:** Once the truck leaves the gate, plant and procurement still need ETA, detention, and proof. Scattered driver messages invent three versions of the truth.
- **Status by chat thread:** Delay, gate wait, and delivery confirmation arrive as images instead of events on the trip.
- **Shipper blind after allotment:** Customers call the desk because they cannot see the contracted movement themselves.
- **POD that never closes billing:** Paper or photo POD that is not linked to the trip slows settlement and dispute handling.

### Section: Capabilities — Tracking built into the trip lifecycle
- **Eyebrow:** What you get
- **Lead:** Visibility is a ZAFTYS TMS module, not a pin on a disconnected map product.
- **Live GPS on contracted trips:** Location, route context, and desk alerts on movements running in ZAFTYS TMS.
- **Shipments list and status:** Trip stages aligned to dispatch, gate, delivery, and close-out, not a single vague in transit label.
- **Shipper portal:** Customer visibility for tracking and documents without chasing the driver for every update.
- **Digital ePOD:** Proof of delivery captured digitally and linked to the same trip record used for billing.
- **Exception visibility:** Delay and deviation surfaced for dispatch and customer teams from the operational spine.
- **Driver mobile updates:** Status and delivery capture on the road so the desk is not rebuilding the story from memory.

### Section: Visual — Live Map and Shipments
- **Eyebrow:** Product
- **Lead:** The same screens the Amravati desk uses on contracted moves at app.zaftys.com.
- **Primary caption:** Live Map · GPS on contracted trips
- **Primary alt:** ZAFTYS TMS Live Map with real-time GPS tracking
- **Secondary caption:** Shipments · status aligned to the trip lifecycle
- **Secondary alt:** ZAFTYS TMS Shipments screen listing live loads and trip status

### Section: Who for — Desks and shippers who share one trip truth
- **Eyebrow:** Who it is for
- **Shippers and manufacturers:** Portal tracking and ePOD without a daily control-room phone tree.
- **Dispatch and control towers:** Map and exception queues on the trips you already run in ZAFTYS TMS.
- **Billing and documentation teams:** ePOD linked to the movement so close-out is not a scavenger hunt.

### Section: Data notes — Tracking only holds on trips in the TMS
- **Eyebrow:** Data foundation
- **Lead:** Visibility assumes indent, dispatch, and close-out land in ZAFTYS TMS. Spot folklore outside the system is not the product promise.
- **Points:**
  - Live at app.zaftys.com for contracted programs
  - Integrated with billing and trip close-out
  - Own vs Network labeling preserved on the movement
  - Ask during demo how your corridors and portal users are onboarded
- **CTA:** Open ZAFTYS TMS → /zaftys-tms

### Section: Honesty — Available on contracted trips in ZAFTYS TMS
- **Eyebrow:** Availability
- **Body:** Tracking and portal depth depend on how the trip is run in the TMS. We do not claim universal visibility on every marketplace truck outside contracted workflows.

### Section: Related — Continue in the Platform
- **Eyebrow:** Related
- **ZAFTYS TMS** (/zaftys-tms): Full platform landing
- **Fleet management** (/zaftys-tms/fleet-management): Vehicles, drivers, documents
- **ZAFTYS Analytics** (/intelligence/analytics): Corridor KPIs on the same spine
- **Logistics APIs** (/zaftys-tms/apis): Push status into your systems

### Section: Final CTA
- **H2:** Give the shipper a portal, not another WhatsApp group
- **Lead:** Book a tracking walkthrough, or start from the ZAFTYS TMS platform page.
- **Primary:** Book a TMS demo
- **Secondary:** Back to ZAFTYS TMS → /zaftys-tms

**Status label:** Available

## /zaftys-tms/fleet-management — Fleet Management

**Meta:** Fleet Management in ZAFTYS TMS | Vehicles and Drivers | Fleet management inside ZAFTYS TMS: vehicle registry, driver records, document expiry, and maintenance alerts tied to dispatch. Used on ZAFTYS own fleet daily.

### Section: Breadcrumbs
- Home → /
- ZAFTYS TMS → /zaftys-tms
- Fleet Management → /zaftys-tms/fleet-management

### Section: Hero
- **Badge:** Fleet Management · Available
- **H1:** Fleet records that survive the weighbridge and the audit.
- **Lead:** Vehicle registry, drivers, documents, and maintenance inside the same TMS ZAFTYS dispatches on every day. Built so a truck is not stopped at the gate for expired paperwork.
- **Image alt:** ZAFTYS TMS fleet and dispatch assignment screens
- **Primary CTA:** Book a TMS demo
- **Secondary CTA:** Open ZAFTYS TMS → /zaftys-tms

### Section: Mail template
- **Subject:** ZAFTYS TMS fleet management demo
- **Body:** Hi ZAFTYS,\n\nI want a demo of fleet management in ZAFTYS TMS.\n\nCompany:\nRole:\nFleet size / body classes:\n\n

### Section: Problem — Dispatch cannot run on scattered vehicle files
- **Eyebrow:** The fleet problem
- **Lead:** When registry, licences, and maintenance live outside the trip system, allotment guesses and gate stops follow. Fleet management belongs on the same spine as dispatch.
- **Papers separate from trips:** RC, insurance, and permit status sit in folders while dispatch assigns a truck that should not leave the yard.
- **Driver history without the movement:** Licence and assignment history are hard to defend when they are not tied to the trip record.
- **Maintenance after the breakdown:** Service and document expiry alerts arrive too late if they are not visible next to allotment.

### Section: Capabilities — Fleet management inside ZAFTYS TMS
- **Eyebrow:** What you get
- **Lead:** Not a standalone fleet app. Records that feed dispatch, Own vs Network labeling, and trip close-out.
- **Vehicle registry:** Body type, capacity, registration, and document status for company trucks you operate.
- **Driver records:** Licence tracking, assignment history, and desk-ready profiles linked to trips.
- **Document expiry alerts:** Insurance, fitness, and permit windows surfaced before the gate rejects the truck.
- **Maintenance scheduling:** Service reminders tied to the fleet you actually run, not a generic calendar silo.
- **Dispatch linkage:** Allotment draws from fleet truth so the wrong body class is harder to push onto a plant bay.
- **Own fleet first:** Company trucks stay labeled. Network overflow via TranZfort does not silently rewrite fleet records.

### Section: Visual — Dispatch and fleet on the same stack
- **Eyebrow:** Product
- **Lead:** The Amravati desk assigns from records that live next to the trip lifecycle at app.zaftys.com.
- **Primary caption:** Dispatch · fleet and trip assignment
- **Primary alt:** ZAFTYS TMS Dispatch board with backlog and vehicle assignment
- **Secondary caption:** Command Center · operations on the same spine
- **Secondary alt:** ZAFTYS TMS Command Center with operational KPIs

### Section: Who for — Operators who own the truck and the paperwork
- **Eyebrow:** Who it is for
- **Fleet and 3PL operators:** Keep vehicle and driver truth next to dispatch instead of in a parallel spreadsheet.
- **Transport managers:** See expiry and maintenance risk before allotment, not after a plant refusal.
- **Compliance and audit leads:** Document status tied to the commercial fleet you run on Indian corridors.

### Section: Data notes — Fleet only helps if dispatch reads the same record
- **Eyebrow:** Data foundation
- **Lead:** ZAFTYS TMS keeps registry, drivers, and trips on one platform. That is why fleet management is a module of the TMS, not a separate product brand.
- **Points:**
  - Used on ZAFTYS own fleet daily
  - Integrated with trip lifecycle and billing close-out
  - Available to fleet operators under normal TMS onboarding
  - Start from ZAFTYS TMS for the full platform story
- **CTA:** Open ZAFTYS TMS → /zaftys-tms

### Section: Honesty — Available inside ZAFTYS TMS
- **Eyebrow:** Availability
- **Body:** Fleet management ships as part of the live TMS at app.zaftys.com. Module depth is confirmed during onboarding. This page does not invent public fleet headcounts.

### Section: Related — Continue in the Platform
- **Eyebrow:** Related
- **ZAFTYS TMS** (/zaftys-tms): Full platform landing
- **Tracking and visibility** (/zaftys-tms/tracking): Live map and ePOD
- **Logistics APIs** (/zaftys-tms/apis): Connect ERP and commercial systems
- **Our Fleet** (/fleet): Own vs Network body classes

### Section: Final CTA
- **H2:** Put fleet records where dispatch already works
- **Lead:** Book a walkthrough of fleet management in ZAFTYS TMS, or start from the live platform page.
- **Primary:** Book a TMS demo
- **Secondary:** Back to ZAFTYS TMS → /zaftys-tms

**Status label:** Available

## /zaftys-tms/apis — Logistics APIs

**Meta:** Logistics API Integrations | ZAFTYS TMS | Connect ZAFTYS TMS trip, fleet, and visibility data with ERP and commercial systems. Scope confirmed in enterprise onboarding. Only implemented endpoints are discussed.

### Section: Breadcrumbs
- Home → /
- ZAFTYS TMS → /zaftys-tms
- Logistics APIs → /zaftys-tms/apis

### Section: Hero
- **Badge:** Logistics APIs · Available
- **H1:** Connect transportation data to your systems.
- **Lead:** Integrate trip, fleet, and visibility data from ZAFTYS TMS with ERP, warehouse, and commercial workflows. We only discuss endpoints that are implemented. Scope is confirmed in enterprise onboarding.
- **Image alt:** ZAFTYS TMS network and integrations context
- **Primary CTA:** Discuss API onboarding
- **Secondary CTA:** Open ZAFTYS TMS → /zaftys-tms

### Section: Mail template
- **Subject:** ZAFTYS TMS API integration inquiry
- **Body:** Hi ZAFTYS,\n\nI want to discuss logistics API integration with ZAFTYS TMS.\n\nCompany:\nRole:\nSystems to connect (ERP / WMS / other):\nUse cases:\n\n

### Section: Problem — ERP cannot invent a trip the TMS never held
- **Eyebrow:** The integration problem
- **Lead:** Finance and planning systems need clean movement data. Middleware promises fail when the operational record is incomplete or undocumented.
- **Generic API brochures:** Endpoint lists that do not match what the dispatch desk actually writes on a live trip.
- **Manual rekey into ERP:** Billing and status copied by hand because trip truth never left the TMS.
- **Unscoped onboarding:** Integration projects that start without stating which modules and events are live.

### Section: Capabilities — APIs around real dispatch workflows
- **Eyebrow:** What you get
- **Lead:** Built for shippers and operators already on ZAFTYS TMS, not a standalone middleware brand.
- **Trip data for downstream systems:** Operational records available for integration where your commercial stack needs the movement.
- **Status events where supported:** Event-driven updates for dispatch and delivery milestones that exist in the product today.
- **Fleet and document context:** Connect registry and compliance fields when the onboarding scope includes fleet modules.
- **Enterprise onboarding:** Structured planning for which systems, corridors, and users come online first.
- **Honest endpoint boundaries:** We do not advertise APIs that are not implemented. Scope is written before build work starts.
- **Same internal platform:** Integrations sit on the stack ZAFTYS uses for its own contracted trips.

### Section: Visual — Operational data from the TMS spine
- **Eyebrow:** Product
- **Lead:** APIs only matter when Command Center, Shipments, and close-out already hold the trip.
- **Primary caption:** Network · capacity and partner context
- **Primary alt:** ZAFTYS TMS network view for capacity and partner context
- **Secondary caption:** Shipments · trip records for downstream systems
- **Secondary alt:** ZAFTYS TMS Shipments screen as source for trip data integrations

### Section: Who for — IT and ops leads connecting commercial systems
- **Eyebrow:** Who it is for
- **IT and integration leads:** Need scoped endpoints and onboarding, not a PDF of aspirational APIs.
- **Shipper technology teams:** Want trip and ePOD data into ERP or planning tools after TMS is live.
- **Fleet operator systems owners:** Connecting dispatch truth to billing and internal reporting stacks.

### Section: Data notes — Scope first. Then endpoints.
- **Eyebrow:** How we onboard
- **Lead:** API work starts with which trip events and systems matter. We do not start from a generic swagger dump.
- **Points:**
  - Discuss specific endpoints during enterprise onboarding
  - Built around dispatch workflows, not generic middleware
  - Availability varies by module and customer program
  - TMS login and desk process come before integration theatre
- **CTA:** Open ZAFTYS TMS → /zaftys-tms

### Section: Honesty — Available under scoped enterprise onboarding
- **Eyebrow:** Availability
- **Body:** Logistics APIs are offered where implemented for your program. This page does not publish a fake universal endpoint catalog. Ask for the live scope before you plan an ERP project.

### Section: Related — Continue in the Platform
- **Eyebrow:** Related
- **ZAFTYS TMS** (/zaftys-tms): Full platform landing
- **Tracking and visibility** (/zaftys-tms/tracking): Live map and ePOD
- **Fleet management** (/zaftys-tms/fleet-management): Vehicles and documents
- **ZAFTYS Analytics** (/intelligence/analytics): KPIs on the same trip spine

### Section: Final CTA
- **H2:** Scope the integration against trips you actually run
- **Lead:** Tell us which systems must receive trip and ePOD data. We will confirm what is live before anyone writes middleware.
- **Primary:** Discuss API onboarding
- **Secondary:** Back to ZAFTYS TMS → /zaftys-tms

**Status label:** Available

## /intelligence — Intelligence hub

**Meta:** Logistics Intelligence | Analytics, Rates, Reports, AI | ZAFTYS Logistics Intelligence: operations analytics, exception views, freight rate context, market reports, and supply chain AI research on trips we actually run. Labeled Available, Beta, or Research.

### Section: Hero
- **Badge:** Logistics Intelligence
- **H1:** Decisions from the trips you actually run.
- **Lead:** ZAFTYS Intelligence sits on top of transportation we execute: dispatch, exceptions, lane cost, carrier score, and market research. Not a generic visibility SaaS. Capabilities are labeled Available, Beta, or Research.
- **Hero alt:** ZAFTYS logistics intelligence on TMS operational data

### Section: Intro
- **Eyebrow:** What it is
- **H2:** A decision layer for industrial freight desks
- **Lead:** Peers sell control towers, lane benchmarking, and predictive ETAs. We build the same class of tools around data from ZAFTYS TMS and the Amravati desk, so analytics match plant windows, GST trips, and Own vs Network labeling.
- **Operations analytics:** OTIF shape, exception queues, utilization, and ePOD cycle time from trips in ZAFTYS TMS.
- **Lane and rate context:** Corridor cost and movement for lanes you run. Beta for rate intelligence. Not a published spot index.
- **Market research:** Institutional reports on logistics and digital freight matching, gated for company email.
- **Desk AI (research):** Exception summaries and operational queries under research. Labeled before anything ships as product.

### Section: Buyers
- **Eyebrow:** Who it is for
- **H2:** Built for people who own the lane, not a slide deck
- **Shippers and manufacturers:** See corridor reliability, detention pressure, and carrier score without calling the control room for every status.
- **Fleet and 3PL operators:** Dispatch KPIs, empty-km pressure, and partner performance on the same stack ZAFTYS runs internally.
- **Procurement and logistics heads:** Lane cost context and market reports to support contract vs spot decisions. Not a substitute for your negotiated rate.

### Section: Modules
#### Operations Analytics (Available)
- **Lead:** KPI dashboards and drill-downs on transportation ZAFTYS executes. Lane reliability, cost against trip records, owned fleet vs labeled network, and delivery close-out.
- **Points:**
  - Corridor transit and exception patterns from live trip history
  - Owned fleet and partner performance measured separately
  - Cost views tied to dispatch and billing records where TMS is live
  - Shipper and operator views from the same operational truth
- **Image alt:** ZAFTYS TMS Command Center with operational KPIs
- **CTA:** Explore ZAFTYS Analytics → /intelligence/analytics

#### Exception and control views (Available)
- **Lead:** Visibility only helps if the desk can act. Intelligence surfaces delay, deviation, and gate pressure from ZAFTYS TMS shipments and live map, then hands the trip back to dispatch.
- **Points:**
  - Shipment list and status aligned to the trip lifecycle
  - Live map for active contracted moves
  - Exception queues instead of scattered WhatsApp threads
  - Same system the Amravati desk uses on company trips
- **Image alt:** ZAFTYS TMS Shipments screen with live load status
- **CTA:** See tracking and TMS → /zaftys-tms/tracking
- **Secondary CTA:** Open ZAFTYS TMS → /zaftys-tms

#### Freight Rate Intelligence (Beta)
- **Lead:** Lane-level rate context for corridors you operate. Built from operational and commercial records, not a scraped national average you cannot defend in a plant meeting.
- **Points:**
  - Corridor rate movement over time for lanes in your program
  - Context for contract renewals and spot overflow decisions
  - Linked to trip data where ZAFTYS TMS is deployed
  - Explicitly Beta: early access, phased corridors, labeled limits
- **Image alt:** ZAFTYS Freight Rate Intelligence dashboard with lane rates, trends, and alerts
- **CTA:** Freight rate intelligence → /intelligence/freight-rates

#### Market Intelligence (Available)
- **Lead:** Institutional research on logistics markets and digital freight matching. Open a preview, unlock the full PDF with a company email.
- **Points:**
  - Global logistics market outlook reports
  - Digital freight matching research
  - Ops-informed framing, not generic SEO summaries
  - Also linked from blog deep research on plant TAT, ePOD, and FTL
- **Image alt:** ZAFTYS Analytics market report cover preview
- **CTA:** Browse market reports → /reports
- **Secondary CTA:** Market intelligence page → /intelligence/market-intelligence

#### Supply Chain AI (Research)
- **Lead:** AI for desk workflows: exception narrative, lane answers, guardrails on trip truth, and TranZfort matching. We are not pitching a generic AI company.
- **Points:**
  - Research on exception and corridor answers from trip events
  - Guardrails that refuse invented rates or truck status
  - Orchestration into ZAFTYS TMS and desk queues
  - TranZfort already uses AI for corridor and vehicle fit
- **Image alt:** ZAFTYS Supply Chain AI processing: exception narrative, lane questions, vehicle fit, and risk
- **CTA:** Read the Supply Chain AI article → /intelligence/ai

### Section: Data foundation
- **Eyebrow:** Data foundation
- **H2:** Intelligence is only as good as the trip record
- **Lead:** Industry platforms promise predictive ETAs and lane benchmarks. Those only hold if indent, gate, weigh, GPS, ePOD, and billing land in one system. ZAFTYS Intelligence assumes ZAFTYS TMS on contracted trips.
- **Points:**
  - Dispatch and trip lifecycle from app.zaftys.com
  - Own fleet and labeled TranZfort overflow kept distinct in reporting
  - Plant and port windows treated as first-class events, not a single map pin
  - No invented corridor counts or blended owned fleet tallies on marketing pages
- **CTA TMS:** See ZAFTYS TMS → /zaftys-tms
- **CTA Logistics:** Logistics services → /logistics

### Section: Honesty labels
- **Eyebrow:** How we label capability
- **H2:** Available. Beta. Research. Say it on the page.
- **Available:** In production for ZAFTYS operations and offered to customers under normal onboarding.
- **Beta:** Early access with limited corridors or features. Limits are stated before you buy.
- **Research:** Active development. Not sold as a finished module. Status updates before launch.

### Section: Final CTA
- **H2:** Put your corridors on a decision layer that matches the desk
- **Lead:** Ask for an intelligence walkthrough, open market reports, or start from the TMS we already run.
- **Primary:** Explore logistics intelligence
- **Secondary:** Browse market reports

### Section: Inquiry mail
- **Subject:** Logistics intelligence inquiry
- **Body:** Hi ZAFTYS,\n\nI want to explore Logistics Intelligence.\n\nCompany:\nRole:\nCorridors / use case:\nModules of interest (Analytics / Rates / Reports / AI):\n\n

## /intelligence/analytics — ZAFTYS Analytics

**Meta:** ZAFTYS Analytics | Operations Transportation Data | Operations analytics from trips ZAFTYS runs: lane reliability, owned vs network performance, cost against trip records, and ePOD close-out. Built on ZAFTYS TMS.

### Section: Breadcrumbs
- Home → /
- Intelligence → /intelligence
- Analytics → /intelligence/analytics

### Section: Hero
- **Badge:** ZAFTYS Analytics · Available
- **H1:** Operations analytics from trips you can defend.
- **Lead:** Corridor reliability, Own vs Network score, cost against trip records, and exception close-out from the same Command Center stack the Amravati desk uses.
- **Image alt:** ZAFTYS Analytics on TMS operational data
- **Primary CTA:** Explore ZAFTYS Analytics
- **Secondary CTA:** See ZAFTYS TMS → /zaftys-tms

### Section: Mail template
- **Subject:** ZAFTYS Analytics inquiry
- **Body:** Hi ZAFTYS,\n\nI want to explore ZAFTYS Analytics.\n\nCompany:\nRole:\nCorridors / use case:\n\n

### Section: Problem — Status lives in chats. Decisions need trip truth.
- **Eyebrow:** The desk problem
- **Lead:** Plant and procurement meetings ask for corridor reliability and carrier score. WhatsApp threads and spreadsheet exports cannot answer without the dispatch record.
- **Scattered exception signal:** Delay, gate, and ePOD pressure arrive as messages instead of a queue tied to the trip.
- **Blended fleet storytelling:** Owned trucks and network overflow get mixed into one KPI, so accountability disappears.
- **Cost without the trip:** Commercial conversations happen without dispatch and billing linkage on the same movement.

### Section: Capabilities — Analytics built on trips ZAFTYS executes
- **Eyebrow:** What you get
- **Lead:** Not a generic visibility demo. Views from ZAFTYS TMS history on corridors and programs you run.
- **Lane and corridor performance:** Transit shape, exception patterns, and reliability by corridor from live trip history.
- **Owned fleet vs network score:** Company trucks and TranZfort overflow measured separately. Never silently blended.
- **Cost against trip records:** Commercial cost visibility tied to dispatch and billing where TMS is live.
- **Exception and close-out views:** Delay, gate, and ePOD cycle pressure so the desk can act, not only watch a map.
- **Shipper and operator lenses:** Same operational truth, framed for the plant desk or the fleet desk that needs it.
- **Command Center continuity:** Screens match app.zaftys.com so training is the product, not a separate BI project.

### Section: Visual — Command Center and Shipments as the source
- **Eyebrow:** Product
- **Lead:** Intelligence reads the same trip lifecycle ZAFTYS dispatches and closes every day.
- **Primary caption:** Command Center · operational KPIs from live trips
- **Primary alt:** ZAFTYS TMS Command Center with operational KPIs
- **Secondary caption:** Shipments · status aligned to the trip lifecycle
- **Secondary alt:** ZAFTYS TMS Shipments screen with live load status

### Section: Who for — People who own the lane outcome
- **Eyebrow:** Who it is for
- **Shippers and manufacturers:** Corridor reliability and detention pressure without calling the control room for every status.
- **Fleet and 3PL operators:** Dispatch KPIs and partner performance on the stack ZAFTYS runs internally.
- **Logistics and plant leads:** OTIF shape and exception queues framed for weekly ops reviews.

### Section: Data notes — Analytics only holds if the trip record is complete
- **Eyebrow:** Data foundation
- **Lead:** Indent, gate, GPS, ePOD, and billing need to land in ZAFTYS TMS. That is the contract for trustworthy corridor views.
- **Points:**
  - Dispatch and trip lifecycle from app.zaftys.com
  - Own fleet and labeled TranZfort overflow kept distinct
  - Plant and port windows treated as first-class events
  - Market reports sit under Market Intelligence, not inside these KPIs
- **CTA:** Open ZAFTYS TMS → /zaftys-tms

### Section: Honesty — Available for operations ZAFTYS runs and customer TMS programs
- **Eyebrow:** Availability
- **Body:** Module scope is confirmed during onboarding. This page does not invent public fleet or corridor counts. Institutional research lives on Market Intelligence and /reports.

### Section: Related — Continue in Logistics Intelligence
- **Eyebrow:** Related modules
- **Freight Rate Intelligence** (/intelligence/freight-rates): Lane rate context · Beta
- **Market Intelligence** (/intelligence/market-intelligence): Institutional reports · Available
- **Supply Chain AI** (/intelligence/ai): Desk AI roadmap · Research
- **Intelligence hub** (/intelligence): All modules overview

### Section: Final CTA
- **H2:** Put your corridors on analytics the desk already trusts
- **Lead:** Ask for an Analytics walkthrough, or start from the TMS we dispatch on every day.
- **Primary:** Explore ZAFTYS Analytics
- **Secondary:** Back to Intelligence → /intelligence

**Status label:** Available

## /intelligence/freight-rates — Freight Rate Intelligence

**Meta:** Freight Rate Intelligence India | Lane Context | Lane-level freight rate context from ZAFTYS for corridors you run. Beta product linked to trip and desk records. Not a published national spot index.

### Section: Breadcrumbs
- Home → /
- Intelligence → /intelligence
- Freight Rates → /intelligence/freight-rates

### Section: Hero
- **Badge:** Freight Rate Intelligence · Beta
- **H1:** Lane rate context you can take to a plant meeting.
- **Lead:** Corridor movement for lanes you operate, linked to trip and commercial records. Explicitly Beta. Not a scraped national average, and not a substitute for your contracted rate.
- **Image alt:** ZAFTYS Freight Rate Intelligence dashboard
- **Primary CTA:** Request rate intelligence access
- **Secondary CTA:** See Analytics → /intelligence/analytics

### Section: Mail template
- **Subject:** Freight Rate Intelligence early access
- **Body:** Hi ZAFTYS,\n\nI want early access to Freight Rate Intelligence.\n\nCompany:\nRole:\nCorridors of interest:\nVehicle classes:\n\n

### Section: Problem — Generic indexes do not survive a plant negotiation
- **Eyebrow:** The procurement problem
- **Lead:** Peers publish lane benchmarks and spot indexes. Your desk needs corridor context for the lanes you run, with limits you can state out loud.
- **National averages without your lane:** A countrywide number that cannot be defended against your origin, body class, and plant window.
- **Contract renewals on gut feel:** Overflow and renewal decisions without a defined window of corridor movement.
- **Silent product limits:** Tools that look complete in a demo but hide which corridors and commodities are actually live.

### Section: Capabilities — Beta corridor context, labeled limits
- **Eyebrow:** What you get
- **Lead:** Built for logistics and procurement heads who need corridor language, not a marketing chart.
- **Corridor movement over time:** Rate context on program lanes across a defined window, not a scraped national average.
- **Contract vs spot framing:** Support renewals and overflow choices where ZAFTYS TMS is deployed on the lane.
- **Filters the desk actually uses:** Origin, destination, commodity, and vehicle class as working dimensions in the Beta product.
- **Alerts on thresholds you set:** Early access rate alerts for lanes you care about, with stated Beta coverage.
- **Operational linkage:** Tied to trip and desk records where available, so context stays near the movement.
- **Honest Beta boundary:** Phased corridors, early access, limits stated before you buy. Marketing does not invent live rates.

### Section: Visual — Freight Rate Intelligence dashboard
- **Eyebrow:** Product
- **Lead:** The Beta product surface for lane trends, vehicle and commodity cuts, and desk alerts. Coverage is confirmed during onboarding.
- **Primary caption:** Freight Rate Intelligence · Beta product view
- **Primary alt:** ZAFTYS Freight Rate Intelligence dashboard with lane rates, trends, and alerts

### Section: Who for — Procurement and ops leads on active corridors
- **Eyebrow:** Who it is for
- **Procurement and logistics heads:** Corridor context for renewals and spot overflow, without treating the screen as your contracted rate.
- **Shipper control towers:** Lane movement language for weekly freight reviews on programs ZAFTYS runs or TMS-connects.
- **Fleet commercial teams:** Context alongside Analytics when Own vs Network mix and lane cost both matter.

### Section: Data notes — Rate context follows the trip and the desk
- **Eyebrow:** Data foundation
- **Lead:** Beta quality depends on trip records, commercial history, and the corridors you enroll. It is not a public spot exchange.
- **Points:**
  - Linked to trip data where ZAFTYS TMS is live
  - Corridors and commodities confirmed in early access
  - Not a substitute for a contracted rate on your lane
  - Ask for corridor list before treating any chart as decision-ready
- **CTA:** See ZAFTYS TMS → /zaftys-tms

### Section: Honesty — Labeled Beta until full product release
- **Eyebrow:** Availability
- **Body:** Early access with limited corridors or features. Limits are stated before you buy. Dashboard figures on marketing pages are product UI, not a published national rate commitment.

### Section: Related — Continue in Logistics Intelligence
- **Eyebrow:** Related modules
- **ZAFTYS Analytics** (/intelligence/analytics): Operations KPIs · Available
- **Market Intelligence** (/intelligence/market-intelligence): Institutional reports · Available
- **Supply Chain AI** (/intelligence/ai): Desk AI roadmap · Research
- **Intelligence hub** (/intelligence): All modules overview

### Section: Final CTA
- **H2:** Get early access on the corridors you actually run
- **Lead:** Tell us your lanes and vehicle classes. We will confirm Beta coverage before anything is treated as live.
- **Primary:** Request rate intelligence access
- **Secondary:** Back to Intelligence → /intelligence

**Status label:** Beta

## /intelligence/market-intelligence — Market Intelligence

**Meta:** Logistics Market Intelligence Reports | ZAFTYS | Institutional logistics market reports and digital freight matching research from ZAFTYS Analytics. Preview online, unlock PDFs with company email.

### Section: Breadcrumbs
- Home → /
- Intelligence → /intelligence
- Market Intelligence → /intelligence/market-intelligence

### Section: Hero
- **Badge:** Market Intelligence · Available
- **H1:** Research on how freight markets move.
- **Lead:** Institutional PDFs on logistics outlook and digital freight matching, framed for industrial freight desks. Preview online, unlock the full report with a company email.
- **Image alt:** ZAFTYS market intelligence report preview
- **Primary CTA:** Browse market reports
- **Primary CTA path:** /reports
- **Secondary CTA:** Intelligence hub → /intelligence

### Section: Mail template
- **Subject:** Market intelligence inquiry
- **Body:** Hi ZAFTYS,\n\nI want to discuss market intelligence and reports.\n\nCompany:\nRole:\nTopics of interest:\n\n

### Section: Problem — Ops teams need market framing, not SEO summaries
- **Eyebrow:** The research problem
- **Lead:** Generic logistics blogs do not help a plant or procurement lead prepare for corridor and mode conversations. Research has to speak plant windows, FTL, and digital matching honestly.
- **Thin market content:** Recycled headlines without operational framing or a full PDF you can circulate.
- **Reports disconnected from the desk:** Institutional PDFs that never link back to Analytics, TMS, or how ZAFTYS runs trips.
- **No clear unlock path:** Paywalls without a preview, or previews that never become a usable company PDF.

### Section: Capabilities — Institutional reports plus ops-informed framing
- **Eyebrow:** What you get
- **Lead:** Available now at /reports. Separate from live Operations Analytics KPIs.
- **Institutional market reports:** Global logistics outlook and digital freight matching research hosted on ZAFTYS Analytics reports.
- **Ops-informed language:** Written for industrial freight desks: plant windows, FTL, ePOD, and corridor decisions.
- **Gated full PDF:** Preview the cover and summary, then unlock the full PDF with a company email.
- **Blog deep research:** Complementary pieces on plant TAT, ePOD billing, spot vs dedicated, and TMS evaluation.
- **Clear product boundary:** Market research does not pretend to be live lane KPIs. Those live in Analytics.
- **Desk follow-up:** After reading, ask for a corridor walkthrough if you want operational next steps.

### Section: Visual — Market report preview and gated PDF
- **Eyebrow:** Product
- **Lead:** Open the report surface, review the preview, unlock the full PDF with a company email.
- **Primary caption:** Market report cover · unlock full PDF with company email
- **Primary alt:** ZAFTYS Analytics market report cover preview

### Section: Who for — Leaders preparing market and corridor conversations
- **Eyebrow:** Who it is for
- **Logistics and supply chain heads:** Market framing for board or plant reviews without confusing research with live TMS KPIs.
- **Strategy and commercial teams:** Digital freight matching and logistics outlook material with a clear PDF unlock path.
- **Operators evaluating ZAFTYS:** Research that sits next to Analytics and TMS so the product story stays coherent.

### Section: Data notes — Research sits beside operations, not inside them
- **Eyebrow:** How it connects
- **Lead:** Use Market Intelligence for outlook and matching research. Use Analytics and TMS for trip truth on corridors you run.
- **Points:**
  - Full library at /reports
  - Company email gate for PDF download
  - Blog deep research for operational topics
  - No invented live rate tables on this page
- **CTA:** Browse market reports → /reports

### Section: Honesty — Available now through reports and this module page
- **Eyebrow:** Availability
- **Body:** Preview and gated PDF flows are live. This module does not replace Operations Analytics or Freight Rate Intelligence Beta coverage statements.

### Section: Related — Continue in Logistics Intelligence
- **Eyebrow:** Related modules
- **View reports** (/reports): Full report library
- **ZAFTYS Analytics** (/intelligence/analytics): Operations KPIs · Available
- **Freight Rate Intelligence** (/intelligence/freight-rates): Lane rate context · Beta
- **Intelligence hub** (/intelligence): All modules overview

### Section: Final CTA
- **H2:** Open the reports, then talk corridors if you need to
- **Lead:** Browse the library, unlock a PDF with your company email, or ask the desk for a walkthrough.
- **Primary:** Browse market reports
- **Primary path:** /reports
- **Secondary:** Back to Intelligence → /intelligence

**Status label:** Available

## /intelligence/ai — Supply Chain AI

**Meta:** Supply Chain AI for Logistics Desks | ZAFTYS Research | How ZAFTYS designs Supply Chain AI for freight desks: trip data, exception answers, guardrails, TMS handoff, and desk outcomes. Research. Analytics is Available separately.

### Section: Breadcrumbs
- Home → /
- Intelligence → /intelligence
- Supply Chain AI → /intelligence/ai

### Section: Hero
- **Badge:** Supply Chain AI · Research
- **H1:** From trip data to desk decisions.
- **Lead:** Research on AI that explains exceptions, answers corridor questions, and hands work back into ZAFTYS TMS. TranZfort matching AI is live. Broader desk AI stays Research until labeled otherwise.

### Section: Mail
- **Subject:** Supply Chain AI research inquiry
- **Body:** Hi ZAFTYS,\n\nI want to discuss Supply Chain AI research.\n\nCompany:\nRole:\nUse cases of interest:\n\n

### Section: Intro
- **Eyebrow:** Why this architecture
- **H2:** AI only matters if it sits on the trip spine
- **Lead:** A logistics desk does not need a generic copilot. It needs answers that cite indent, gate, GPS, ePOD, and labeled Own vs Network capacity. This article walks five stages designed around ZAFTYS TMS and the Amravati desk.
- **Points:**
  - Built for dispatch and control-tower workflows, not a generic AI brand
  - Own fleet and labeled network data stay distinct
  - Guardrails force answers back to the trip record
  - Status is Research: product claims only when labeled Available or Beta

### Section: vs Analytics
- **Eyebrow:** Boundary
- **H2:** Analytics is Available. Desk AI is Research.
- **Lead:** Do not confuse the two. They share the same trip spine. They are not the same product.
- **ZAFTYS Analytics · Available:** KPI dashboards and drill-downs: corridor reliability, Own vs Network score, cost against trip records, exception queues you can see today in Command Center and Shipments.
  - Link: Open Analytics
- **Supply Chain AI · Research:** Natural-language exception narrative, corridor Q&A, and automated handoff into desk tasks. Designed on top of that same TMS truth. Not sold as finished until status moves.

### Section: Scenario
- **Eyebrow:** Desk scenario
- **H2:** What Research is aiming to do on a live trip
- **Lead:** Illustrative flow. Not a live chat product today. Shows how input, processing, guardrails, and orchestration should connect.
- **Situation:** A contracted FTL is late at a plant gate. The shipper asks why. WhatsApp has three conflicting updates.
- **From the trip record:** ZAFTYS TMS shows dispatch time, last GPS ping, gate check-in attempt, and an open detention note. Own fleet labeled, not mixed with network overflow.
- **What AI should return:** A short narrative: arrived after the plant window, gate queue open, detention clock started, next action for the desk. No invented ETA that the record cannot support.
- **Handoff:** Create or update an exception task in TMS, notify the assigned desk owner, keep the shipper portal status aligned. Analytics still holds the corridor KPI view for the weekly review.

### Section: Who for
- **Eyebrow:** Who this is for
- **H2:** People who will use the answer, not the slide
- **Dispatch and control towers:** Need exception narrative and next action without rebuilding the trip story from chat threads.
- **Shipper logistics leads:** Want corridor answers grounded in contracted trip events, with Own vs Network still labeled.
- **Technology reviewers:** Evaluating how desk AI would sit on ZAFTYS TMS, with guardrails and Research status stated upfront.

### Section: Five stages
#### Stage 01: Data input
- **Subtitle:** Trip truth into one intake layer.
- **Lead:** Accurate desk answers start with the same sources operations already trust. Intake is designed around trip records, not anonymous public averages.
- **Image alt:** ZAFTYS Supply Chain AI stage 1: data sources from TMS, history, desk prompts, ERP, and TranZfort
- **Body:**
  - ZAFTYS TMS trip records carry dispatch, live map, gate events, and ePOD close-out for contracted moves.
  - Historical corridor data teaches patterns on lanes ZAFTYS actually runs.
  - Desk prompts and exception notes capture what the control room is asking in the moment.
  - ERP and plant windows, plus partner and TranZfort feeds, extend context without blending Own vs Network labels.
- **Takeaway:** Multi-source inputs only help when they stay grounded in trips ZAFTYS actually runs.

#### Stage 02: AI processing
- **Subtitle:** From trip events to desk answers.
- **Lead:** The engine turns trip events into answers: what blocked the move, what the corridor history says, what truck fits next, and what risk to flag before the plant call.
- **Image alt:** ZAFTYS Supply Chain AI stage 2: processing exception narrative, lane questions, vehicle fit, and risk signals
- **Body:**
  - Timeline synthesis: order dispatch, GPS, gate, and detention into one readable story for the open trip.
  - Corridor Q&A: history and live status for lanes in your program, not a national average chart.
  - Capacity and vehicle fit: the same matching logic already used on TranZfort for corridor and body class.
  - Risk flags: patterns the desk should see early, such as repeated gate misses on a plant window.
- **Takeaway:** Processing is logistics Q&A on the trip spine, not a generic chatbot with a freight skin.

#### Stage 03: Guardrails
- **Subtitle:** Safe answers on commercial trip data.
- **Lead:** AI that touches commercial freight data must fail closed when the trip record cannot support the answer. Guardrails are product design, not decoration.
- **Image alt:** ZAFTYS Supply Chain AI stage 3: guardrail layers that ground answers in the trip record
- **Body:**
  - Input validation checks prompts and feeds before they reach the model.
  - Answers must ground in the trip record. Invented rates, trucks, or statuses are blocked.
  - Role-based access limits who can see which corridors and commercial fields.
  - Sensitive fields stay encrypted, and desk queries are auditable for later review.
- **Takeaway:** Guardrails keep Supply Chain AI honest to ZAFTYS TMS truth.

#### Stage 04: Orchestration
- **Subtitle:** Connect. Assign. Act.
- **Lead:** Intelligence only helps if suggestions become desk work inside tools you already run.
- **Image alt:** ZAFTYS Supply Chain AI stage 4: orchestration engine connected to TMS, TranZfort, portal, APIs, and billing
- **Body:**
  - The orchestration engine covers task planning, exception queues, decision handoff, and desk follow-up.
  - Connected systems include ZAFTYS TMS, TranZfort, shipper portal, partner APIs, and billing close-out.
  - app.zaftys.com remains the operational spine: dispatch, shipments, map, and ePOD already exist there.
  - Broader automation into ERP and full desk assistants stays Research until labeled Beta or Available.
- **Takeaway:** Orchestration turns AI into assignable work, not another unread dashboard.

#### Stage 05: Desk outcomes
- **Subtitle:** What good looks like when Research becomes product.
- **Lead:** Success is measured in how the desk works a lane, not in invented global scale counters.
- **Image alt:** ZAFTYS Supply Chain AI stage 5: desk outcomes such as clearer corridor answers and fewer status chases
- **Body:**
  - Fewer conflicting status threads: one trip-backed explanation instead of three WhatsApp versions.
  - Clearer plant and procurement conversations: corridor answers that cite events, not folklore.
  - Better allotment on TranZfort: vehicle fit that is already live in matching.
  - Cleaner weekly reviews: AI narrative for the open exception, Analytics KPIs for the corridor trend.
- **Takeaway:** Impact only counts when it attaches to trips you can defend.

### Section: Live today
- **Eyebrow:** What is live today
- **H2:** Matching AI on TranZfort. Trip truth on TMS.
- **TranZfort matching:** AI already supports corridor and vehicle fit on the marketplace. That is product, not a research slide.
- **ZAFTYS TMS and Analytics:** Dispatch, shipments, map, and operations analytics are Available. They are the spine this research assumes.
- **Desk AI roadmap:** Exception narrative, corridor Q&A, and broader orchestration stay Research until we label them Beta or Available.

### Section: Related
- **Eyebrow:** Related
- **H2:** Continue in Logistics Intelligence
- **ZAFTYS Analytics** (/intelligence/analytics): Operations KPIs · Available
- **Freight Rate Intelligence** (/intelligence/freight-rates): Lane rate context · Beta
- **Market Intelligence** (/intelligence/market-intelligence): Institutional reports · Available
- **Intelligence hub** (/intelligence): All modules overview

### Section: Final CTA
- **H2:** Talk Research with the team that runs the lanes
- **Lead:** Ask about Supply Chain AI for your desk, or start from Analytics and TMS where product is already Available.
- **Primary:** Discuss Supply Chain AI
- **Secondary:** Back to Intelligence → /intelligence

## /industries — Industries hub

**Meta:** Industries We Serve | Cement Containers Mining Steel & More | Cement, port-to-city containers, mining products, steel coils, chemicals, manufacturing, and FMCG. Plant windows, body class, own fleet first with labeled network overflow.

### Section: Hero
- **Badge:** Built for industrial freight
- **H1:** Plant windows. Axle reality. Industry desks.
- **Lead:** Cement, port–city containers, mining products, steel coils, manufacturing, and FMCG — body class and gate timing first. Transportation desk, not a three-product brochure per vertical.
- **pageHeroCopy lead (alt):** We haul for verticals where the wrong body class or a missed gate costs more than the rate. Transportation first — not a three-product brochure per industry.
- **Hero alt:** Industrial freight desks — cement, port–city containers, mining, steel, and plant distribution

### Section: All industries index
- **H2:** All industries
- **Lead:** Eight vertical desks. Port & container road sits under cement — port↔city and city↔port by road.
- **Cement & Construction** (/cement)
- **  Highlight:** Plant windows · bulker & tipper
- **  Description:** Bagged cement, bulk cement on pneumatic bulkers, clinker, fly ash, and aggregates — planned around plant loading windows and silo / project TAT, not a spot rate alone.
- **  Features:**
  - Bulker for loose cement & fly ash
  - Tipper / open body for bagged & aggregates
  - Plant-window & detention language
- **Port & Container Road** (/container-transport)
- **  Highlight:** Port ↔ city · sealed road legs
- **  Description:** Container movement by road — port to city, city to port, port to factory, and ICD / CFS legs — sealed trailers timed to plant and port windows, not demurrage roulette.
- **  Features:**
  - Port ↔ city / factory road legs
  - 32 ft & 40 ft container trailers
  - Plant & port window dispatch
- **Mining Products** (/coal-mining)
- **  Highlight:** All mining products · tipper programs
- **  Description:** Tipper and open-body programs for mining products — coal, iron ore, limestone, bauxite, manganese, chrome, concentrates, overburden, and quarry aggregates — from pit and stockyard to plant, mill, or siding.
- **  Features:**
  - Multi-mineral tipper haul
  - Pit-to-plant & quarry cycles
  - Weighbridge & site papers
- **Steel & Metals** (/steel-metals)
- **  Highlight:** Coil-ready trailers · mill timing
- **  Description:** Steel coil transportation on flatbed and side-wall trailers with proper securing, plus plates, TMT, billets, and structurals — mill windows, weighbridge, and axle reality.
- **  Features:**
  - Steel coil on flatbed / side wall
  - Plates, TMT & structurals
  - Mill window & weighbridge
- **Chemicals** (/chemicals)
- **  Highlight:** Tanker discipline · papers first
- **  Description:** Industrial chemicals and bulk liquids with the right tanker or closed body, wash and document discipline, and an accountable desk — not informal spot tankers at the gate.
- **  Features:**
  - Tanker & packaged programs
  - Wash / docs before allotment
  - Structured LR & ePOD
- **Manufacturing** (/manufacturing)
- **  Highlight:** Shift gates · line-linked FTL
- **  Description:** Production-linked inbound and outbound FTL — raw materials in, finished goods out, inter-plant WIP — timed to shift gates and line schedules, not a generic truck hunt.
- **  Features:**
  - Production-window dispatch
  - Inbound + outbound + WIP
  - TMS on contracted trips
- **FMCG** (/fmcg)
- **  Highlight:** OTIF · factory-to-DC lanes
- **  Description:** Factory-to-DC and hub replenishment with OTIF discipline, fast turnaround, and lane-level trip records — commercial FTL and LCV, not two-wheeler last mile.
- **  Features:**
  - Factory-to-DC FTL
  - OTIF & ePOD
  - Seasonal surge cover
- **Industrial Logistics** (/industrial-logistics)
- **  Highlight:** One desk · mixed plant freight
- **  Description:** One account across plants for mixed industrial freight — contract lanes on our fleet, spot overflow on Tranzfort, shutdown and project windows, TMS on the trips we run.
- **  Features:**
  - Multi-plant account desk
  - Contract + spot mix
  - Shutdown & project windows

### Section: Final CTA
- **H2:** Get a quote for your vertical
- **Lead:** Product, corridor, and trips per week — same desk as Transportation.
- CTA: Chat on WhatsApp

## /industries/cement — Cement & Construction

**Meta:** Cement Logistics India | Bulker Tipper Plant Windows | Bagged and bulk cement, clinker, fly ash, and aggregates. Plant-window dispatch, tipper and bulker classes, own fleet first with labeled network overflow.

### Section: Hero
- **H1 (seoH1):** Cement logistics: bulker, tipper, and plant windows.
- **Lead / description:** Bagged cement, bulk cement on pneumatic bulkers, clinker, fly ash, and aggregates — planned around plant loading windows and silo / project TAT, not a spot rate alone.
- **Highlight:** Plant windows · bulker & tipper
- **Features:**
  - Bulker for loose cement & fly ash
  - Tipper / open body for bagged & aggregates
  - Plant-window & detention language
- CTA: WhatsApp quote
- CTA: Transportation

### Section: Products we haul
- **Bagged cement:** Open body / tipper timed to plant free-time
- **Bulk cement:** Pneumatic bulker to RMC and dealer silos
- **Clinker:** Works-to-grinding and inter-unit feed
- **Fly ash:** Thermal plant to cement / brick / RMC consumers
- **Aggregates:** Quarry and crusher to project sites

### Section: What goes wrong
- Bulk cement and fly ash need pneumatic bulkers — not a generic open truck — and silo-ready unloading at RMC or dealer sites.
- Plant free-time is short. Queues, weighbridge slips, and full silos turn into detention that eats the freight margin.
- Bagged cement, clinker, and aggregates need tipper or open-body capacity timed to the same desk that runs bulk lanes.
- Multi-site projects fail when every indent is a new broker hunt instead of reserved corridor capacity.

### Section: How we run it
- Own open-body and tipper capacity for bagged cement and aggregates; bulker / sealed classes via labeled network when the cargo demands it.
- Dispatch planned around plant and project windows — gate-in language, loading bay timing, and trip close-out on one desk.
- Contract or dedicated programs on repeat plant-to-dealer and plant-to-project corridors so Monday’s indent is not a spot scramble.
- When a window needs more wheels than we own, Tranzfort overflow is labeled clearly — never sold as company fleet.
- Contracted trips can report through ZAFTYS TMS so the plant is not chasing WhatsApp for POD.

### Section: Corridors
- Plant-to-RMC, plant-to-dealer, and plant-to-project lanes for bagged and bulk cement.
- Clinker and grinding-unit feed between works and consumption hubs.
- Fly ash from thermal plants to cement works and brick / RMC consumers where the program fits.
- Aggregates and construction solids to infrastructure and building sites.

### Section: Equipment
- Pneumatic bulker for loose cement and dry fly ash
- 30T / 35T open body and tipper for bagged cement and aggregates
- Side wall / flatbed trailer where the corridor and load demand it
- Labeled network capacity for surge windows and specialized bulker demand

### Section: FAQ
- **Q:** Do you move bulk cement as well as bagged?
  - **A:** Yes. Bagged cement and aggregates typically run on open body or tipper. Loose cement and dry fly ash need pneumatic bulker — we match the body class to the cargo and confirm own fleet or labeled network before allotment.
- **Q:** How do you handle plant detention and loading windows?
  - **A:** We plan allotment around the plant’s free-time and bay reality, not only origin–destination kilometres. Detention risk sits in the desk conversation before the truck is sent.
- **Q:** Can you cover plant-to-RMC and multi-site project lanes?
  - **A:** Repeat plant-to-dealer, plant-to-RMC, and plant-to-project corridors are a core fit for contract or dedicated programs so capacity is reserved instead of shopped every indent.
- **Q:** What if one plant window needs more trucks than you own?
  - **A:** Verified Tranzfort partners fill the gap. Overflow is labeled on the trip — never presented as owned fleet — and contracted trips can still close through ZAFTYS.

### Section: Related blog links
- Plant loading windows → /blog/cement-plant-loading-windows
- Axle load and GVW limits → /blog/india-axle-load-gvw-limits-heavy-freight
- Plant detention and TAT → /blog/plant-detention-tat-yard-gate-india
- ePOD and e-Way Bill billing → /blog/epod-fastag-eway-bill-billing-india

### Section: Related industries
- Mining Products → /industries/coal-mining
- Steel & Metals → /industries/steel-metals
- Industrial Logistics → /industries/industrial-logistics
- Manufacturing → /industries/manufacturing

### Section: WhatsApp prefill
- **Message:** Hi ZAFTYS, I need a quote for cement / construction freight.\n\nPlant / origin:\nDestination:\nCargo (bagged / bulk / clinker / fly ash / aggregates):\nVolume / trips per week:\n

### Section: Aside chrome (IndustryDetail shared)
- Sticky quote lead: Product, origin, destination, trips/week — same desk as Transportation.
- CTA: WhatsApp quote
- CTA: Email the desk
- Label: At a glance (features list)
- Label: Also see (related industries + All industries)

### Section: Equipment strip links
- Link: Container transportation (when slug = container-transport) else Industrial freight
- Link: Fleet

### Section: Final CTA band
- H2 pattern: Quote {industry.title}
- Lead: Corridor + product + volume. We reply with class and capacity.
- CTA: Request Transportation
- CTA: Chat on WhatsApp
- CTA: Fleet

## /industries/coal-mining — Mining Products

**Meta:** Mining Product Transport India | Coal Ore Limestone Tipper | Mining product transport for coal, iron ore, limestone, bauxite, manganese, chrome, overburden, and aggregates. Pit-to-plant tippers, weighbridge discipline, own capacity first.

### Section: Hero
- **H1 (seoH1):** Mining product transportation — tippers for every mineral lane.
- **Lead / description:** Tipper and open-body programs for mining products — coal, iron ore, limestone, bauxite, manganese, chrome, concentrates, overburden, and quarry aggregates — from pit and stockyard to plant, mill, or siding.
- **Highlight:** All mining products · tipper programs
- **Features:**
  - Multi-mineral tipper haul
  - Pit-to-plant & quarry cycles
  - Weighbridge & site papers
- CTA: WhatsApp quote
- CTA: Transportation

### Section: Products we haul
- **Coal:** Pit / siding to power, cement, and industrial boilers
- **Iron ore:** Mine or stockyard to crusher, beneficiation, steel mill
- **Limestone & dolomite:** Quarry to cement works and steel flux lanes
- **Bauxite:** Mine to alumina / refining feed where road tipper fits
- **Manganese & chrome ore:** Abrasive mineral tipper on site-ready bodies
- **Copper / zinc concentrate:** Stockyard-to-plant when packaging and class match
- **Overburden & quarry rock:** Short-cycle dump on active mine and quarry roads
- **Aggregates & crushed stone:** Crusher to plant, project, and rail staging

### Section: What goes wrong
- Mining products are abrasive and dense — tipper class, body wear, and payload must match the mineral, not a city FTL truck.
- Coal, iron ore, limestone, and ore concentrates share pit roads and plant gates, but each has different weighbridge, moisture, and paper rules.
- Power plants, cement works, steel mills, and alumina units depend on continuous feed; a missing tipper cascade stops production.
- Ad-hoc mining brokers often lose accountability after allotment — no clear POD, no weighbridge trail, no escalation desk across product types.

### Section: How we run it
- One mining desk for the product mix — coal, ore, limestone, bauxite, overburden, and aggregates — not a separate story for each mineral.
- Own 30T / 35T open-body and tipper capacity where we run the lane; labeled network tippers when the site needs more wheels that shift.
- Weighbridge, gate pass, and shift-handover language on the same Amravati desk — structured LR and trip close-out per product.
- Contract capacity for recurring mine-to-plant, quarry-to-works, or stockyard-to-mill lanes so peak weeks are planned, not scrambled.
- TMS visibility on contracted trips so the plant or mill sees status without chasing drivers.

### Section: Corridors
- Pit / quarry to stockyard short cycles on active mining leases.
- Mine or stockyard to power plant, cement works, steel mill, and alumina feed.
- Crusher and beneficiation links for ore and limestone programs.
- Stockyard-to-rail or road dispatch where the program is road-led.

### Section: Equipment
- Heavy-duty tippers for coal, iron ore, and abrasive minerals
- 30T / 35T open body where the load and site allow
- Reinforced bodies for overburden and quarry solids
- Labeled network tippers for surge shifts and continuous feed windows

### Section: FAQ
- **Q:** Is this only coal, or all mining products?
  - **A:** All mining products we can run on tipper or open body — coal, iron ore, limestone, dolomite, bauxite, manganese, chrome, concentrates where class fits, overburden, and quarry aggregates. Body class follows the mineral and site rules.
- **Q:** How do you keep continuous mine-to-plant feed moving?
  - **A:** Recurring programs reserve tipper capacity for the corridor. Surge beyond what we own that shift is filled through verified partners and labeled clearly — not silently mixed into “owned” counts.
- **Q:** What about weighbridge and site documentation?
  - **A:** Gate passes, weighbridge trails, and trip close-out sit with the ZAFTYS desk on contracted moves so the plant or mill has one accountable party per trip — across product types.
- **Q:** Do you cover quarry limestone as well as pit coal?
  - **A:** Yes. Quarry-to-cement limestone / dolomite and pit-to-plant coal or ore sit on the same mining desk with tipper programs matched to each site.

### Section: Related blog links
- Planning industrial shipments → /blog/planning-industrial-shipments
- Plant detention and TAT → /blog/plant-detention-tat-yard-gate-india
- Axle load and GVW limits → /blog/india-axle-load-gvw-limits-heavy-freight

### Section: Related industries
- Cement & Construction → /industries/cement
- Steel & Metals → /industries/steel-metals
- Industrial Logistics → /industries/industrial-logistics
- Chemicals → /industries/chemicals

### Section: WhatsApp prefill
- **Message:** Hi ZAFTYS, I need a quote for mining product transport.\n\nOrigin (mine / quarry / stockyard):\nDestination (plant / mill / siding):\nProduct (coal / iron ore / limestone / bauxite / other):\nTrips per day / week:\n

### Section: Aside chrome (IndustryDetail shared)
- Sticky quote lead: Product, origin, destination, trips/week — same desk as Transportation.
- CTA: WhatsApp quote
- CTA: Email the desk
- Label: At a glance (features list)
- Label: Also see (related industries + All industries)

### Section: Equipment strip links
- Link: Container transportation (when slug = container-transport) else Industrial freight
- Link: Fleet

### Section: Final CTA band
- H2 pattern: Quote {industry.title}
- Lead: Corridor + product + volume. We reply with class and capacity.
- CTA: Request Transportation
- CTA: Chat on WhatsApp
- CTA: Fleet

## /industries/steel-metals — Steel & Metals

**Meta:** Steel Coil Transport India | Flatbed Trailer Logistics | Steel coil, plate, TMT, and structural transport on flatbed and side-wall trailers. Mill windows, weighbridge and axle discipline, own fleet first.

### Section: Hero
- **H1 (seoH1):** Steel coil transportation with flatbed discipline.
- **Lead / description:** Steel coil transportation on flatbed and side-wall trailers with proper securing, plus plates, TMT, billets, and structurals — mill windows, weighbridge, and axle reality.
- **Highlight:** Coil-ready trailers · mill timing
- **Features:**
  - Steel coil on flatbed / side wall
  - Plates, TMT & structurals
  - Mill window & weighbridge
- CTA: WhatsApp quote
- CTA: Transportation

### Section: Products we haul
- **Steel coils:** Flatbed / side wall with cradles and chain securing
- **Plates & sheets:** Mill-to-fabricator and stockyard legs
- **TMT & bars:** Open body where lengths and site rules fit
- **Billets & blooms:** Heavy open / trailer with axle-aware payload
- **Structurals & sections:** Project and dealer destinations

### Section: What goes wrong
- Steel coils need the right flatbed or side-wall trailer, coil chocks / cradles, and securing — a wrong bed damages cargo and fails the weighbridge.
- Mill and stockyard dispatch windows leave little room for late vehicles or incomplete papers at the gate.
- Axle limits and GVW surprises turn a cheap spot truck into a refused load or a fine on the corridor.
- Plates, TMT, billets, and long structurals need different loading patterns than coils — one “steel truck” story does not fit all.

### Section: How we run it
- Own side-wall and 40 ft flatbed trailers for coil and long-product programs; open body where lengths and site rules fit.
- Coil moves planned with securing and weighbridge language before the truck is allotted — not after it arrives at the mill.
- Repeat mill-to-fabricator, mill-to-warehouse, and stockyard lanes under contract or dedicated capacity so the class stays locked.
- Labeled network trailers when a mill program needs more coil capacity than we own that day.
- TMS on contracted trips for status and e-POD so procurement is not chasing WhatsApp after dispatch.

### Section: Corridors
- Mill-to-fabricator and mill-to-stockyard / warehouse for coils and plates.
- TMT, billets, and structural steel to project and dealer destinations.
- Port / ICD inbound coils and finished steel on road legs we execute.
- Plant construction and project steel delivery with axle-aware routing.

### Section: Equipment
- Side wall trailer and 40 ft flat bed for steel coils and plates
- Multi-axle trailer combinations for heavy coil payloads
- Open body for TMT, billets, and long structurals where appropriate
- Labeled network flatbed / trailer overflow for mill surge

### Section: FAQ
- **Q:** Do you specialize in steel coil transportation?
  - **A:** Yes. Coils are a primary steel load type for us — flatbed or side-wall trailer, proper securing, and weighbridge / axle checks before the truck leaves the mill or stockyard.
- **Q:** What other steel products do you move?
  - **A:** Plates, TMT, billets, sections, and project structurals. Body class follows the cargo — coil bed vs open lengths — not a one-size steel truck.
- **Q:** How do you handle mill dispatch windows?
  - **A:** Allotment is timed to mill and stockyard windows. Papers and vehicle class are confirmed before gate-in so the bay is not waiting on the wrong trailer.
- **Q:** Can you support port or ICD coil inbound?
  - **A:** Road legs for inbound coils and finished steel from port / ICD to plant or warehouse are in scope when the corridor and trailer class fit.

### Section: Related blog links
- Coil transport basics → /blog/steel-coil-transport-basics
- Axle load and GVW limits → /blog/india-axle-load-gvw-limits-heavy-freight
- Spot vs dedicated fleets → /blog/spot-market-vs-dedicated-fleet-india
- Plant detention and TAT → /blog/plant-detention-tat-yard-gate-india

### Section: Related industries
- Mining Products → /industries/coal-mining
- Cement & Construction → /industries/cement
- Port & Container Road → /industries/container-transport
- Industrial Logistics → /industries/industrial-logistics

### Section: WhatsApp prefill
- **Message:** Hi ZAFTYS, I need a quote for steel / coil freight.\n\nOrigin (mill / stockyard / port):\nDestination:\nCargo (coils / plates / TMT / billets / structurals):\nWeight / pieces:\n

### Section: Aside chrome (IndustryDetail shared)
- Sticky quote lead: Product, origin, destination, trips/week — same desk as Transportation.
- CTA: WhatsApp quote
- CTA: Email the desk
- Label: At a glance (features list)
- Label: Also see (related industries + All industries)

### Section: Equipment strip links
- Link: Container transportation (when slug = container-transport) else Industrial freight
- Link: Fleet

### Section: Final CTA band
- H2 pattern: Quote {industry.title}
- Lead: Corridor + product + volume. We reply with class and capacity.
- CTA: Request Transportation
- CTA: Chat on WhatsApp
- CTA: Fleet

## /industries/container-transport — Port & Container Road

**Meta:** Container Transport India | Port to City Road Haulage | Container transportation by road: port to city, city to port, port to factory, and ICD/CFS legs. 32 ft and 40 ft trailers, plant and port windows, own fleet first.

### Section: Hero
- **H1 (seoH1):** Port to city and city to port — container road transport.
- **Lead / description:** Container movement by road — port to city, city to port, port to factory, and ICD / CFS legs — sealed trailers timed to plant and port windows, not demurrage roulette.
- **Highlight:** Port ↔ city · sealed road legs
- **Features:**
  - Port ↔ city / factory road legs
  - 32 ft & 40 ft container trailers
  - Plant & port window dispatch
- CTA: WhatsApp quote
- CTA: Transportation

### Section: Products we haul
- **Port to factory / warehouse:** Inbound containers off the berth to the bay
- **Factory / city to port:** Export boxes timed to cut-off and plant load
- **Port to city / market:** Sealed FTL into inland consumption hubs
- **ICD / CFS road legs:** Inland container depot and CFS transfers
- **Empty / loaded trailer moves:** Where the corridor and chassis program fit

### Section: What goes wrong
- Port–city and city–port road legs fail when CHA, transporter, and plant each own a slice of the trip while demurrage clocks run.
- Wrong trailer class (32 ft domestic vs 40 ft EXIM) or late gate-in burns free time at port and plant.
- Factory loading windows and port cut-offs do not wait for a broker who is still hunting a chassis.
- Empty trailer wait and unclear POD leave importers and exporters without one accountable road desk.

### Section: How we run it
- Road execution between port, CFS/ICD, factory, warehouse, and city markets on one Amravati desk.
- Own 32 ft container SXL / MXL where we run the lane; 40 ft and surge chassis via labeled network when needed.
- Dispatch planned around plant slots and port / CFS windows — gate-in language before the trailer is sent.
- Contract or dedicated container programs on repeat port–plant corridors so Monday is not a spot scramble.
- TMS on contracted container moves so status is not a WhatsApp chase between port and factory.

### Section: Corridors
- Port to factory and port to warehouse for inbound containers.
- Factory and city to port for export-bound boxes.
- Port to city / inland market sealed FTL.
- ICD and CFS road transfers on programs we scope.

### Section: Equipment
- 32 ft container SXL / MXL — domestic FTL workhorse
- 20–24 ft sealed for lighter regional legs
- 40 ft / 40 HC chassis for EXIM ISO where available
- Labeled network trailer overflow for yard surge days

### Section: FAQ
- **Q:** Do you move containers port to city and city to port?
  - **A:** Yes. That is the core of this desk — inbound port-to-factory / warehouse / city and outbound factory / city-to-port road legs, plus ICD and CFS transfers where scoped.
- **Q:** Which container sizes do you run?
  - **A:** 32 ft SXL / MXL is our domestic FTL backbone. 20–24 ft for lighter regional sealed legs. 40 ft / 40 HC for EXIM ISO where we have the chassis — own fleet first, labeled network when the yard needs more.
- **Q:** How do you handle port free time and plant windows?
  - **A:** Allotment is planned around port / CFS gate rules and factory slots before the trailer is sent. Demurrage risk is a desk conversation, not a surprise at the gate.
- **Q:** Is this the same as your Container Transportation service?
  - **A:** Same road execution. This industry page is the port–city / EXIM vertical desk; the full service detail lives under Transportation → Container Transportation.

### Section: Related blog links
- Container trucking deep research → /blog/container-trucking-logistics-india
- Plant detention and TAT → /blog/plant-detention-tat-yard-gate-india
- Spot vs dedicated fleets → /blog/spot-market-vs-dedicated-fleet-india
- Empty return trips → /blog/reduce-empty-return-trips

### Section: Related industries
- Manufacturing → /industries/manufacturing
- FMCG → /industries/fmcg
- Industrial Logistics → /industries/industrial-logistics
- Steel & Metals → /industries/steel-metals

### Section: WhatsApp prefill
- **Message:** Hi ZAFTYS, I need a quote for container road transport.\n\nPort / ICD / origin:\nFactory / city / destination:\nDirection (port→city / city→port):\nContainer size (20 / 32 / 40):\nTrips per week:\n

### Section: Aside chrome (IndustryDetail shared)
- Sticky quote lead: Product, origin, destination, trips/week — same desk as Transportation.
- CTA: WhatsApp quote
- CTA: Email the desk
- Label: At a glance (features list)
- Label: Also see (related industries + All industries)

### Section: Equipment strip links
- Link: Container transportation (when slug = container-transport) else Industrial freight
- Link: Fleet

### Section: Final CTA band
- H2 pattern: Quote {industry.title}
- Lead: Corridor + product + volume. We reply with class and capacity.
- CTA: Request Transportation
- CTA: Chat on WhatsApp
- CTA: Fleet

## /industries/chemicals — Chemicals

**Meta:** Chemical Logistics India | Tanker & Packaged Transport | Industrial chemical and bulk liquid transport with tanker or closed-body class, wash and document discipline, own fleet first and labeled network overflow.

### Section: Hero
- **H1 (seoH1):** Chemical freight with tanker class and papers in order.
- **Lead / description:** Industrial chemicals and bulk liquids with the right tanker or closed body, wash and document discipline, and an accountable desk — not informal spot tankers at the gate.
- **Highlight:** Tanker discipline · papers first
- **Features:**
  - Tanker & packaged programs
  - Wash / docs before allotment
  - Structured LR & ePOD
- CTA: WhatsApp quote
- CTA: Transportation

### Section: Products we haul
- **Bulk liquids:** Tanker class matched to product and wash rules
- **Packaged chemicals:** Closed / covered body with sealed handover
- **Solvents & intermediates:** Plant-to-plant on industrial belts
- **Process chemicals:** Repeat FTL to manufacturing and processing sites
- **Lubricants & oils:** Where tanker or drum programs fit scope

### Section: What goes wrong
- Wrong tanker or dirty tank turns a cheap rate into a rejected load, a wash claim, or a compliance incident.
- MSDS, permits, and gate papers vary by cargo class — informal brokers often arrive without them.
- Plant free-time on chemical bays is short; late or undocumented tankers create detention and line stoppage.
- Consignors need one accountable party for LR, POD, and escalation — not a rotating WhatsApp chain.

### Section: How we run it
- Tanker and packaged programs scoped honestly during consultation — we confirm class, wash, and corridor before allotment.
- Own fleet where the body fits; labeled network tankers when the program needs more capacity that week.
- Structured LR, proof of delivery, and desk communication through ZAFTYS operations — not informal spot-only coordination.
- Contract lanes on repeat plant-to-plant chemical belts so the vehicle class stays locked.
- TMS visibility on contracted trips so plant teams are not chasing drivers for status.

### Section: Corridors
- Plant-to-plant chemical movement on industrial belts.
- Bulk liquid delivery to manufacturing and processing sites.
- Packaged chemical distribution on repeat FTL lanes.
- Inbound intermediates to formulation and blending units where scoped.

### Section: Equipment
- Tanker assets where program scope and product allow
- Closed and covered body for packaged chemical cargo
- Wash / cleanliness confirmation before loading where required
- Labeled network tanker overflow for surge indents

### Section: FAQ
- **Q:** What chemical freight can ZAFTYS support?
  - **A:** Industrial chemicals and bulk liquids where tanker or packaged handling fits the program. We scope product, wash, and corridor honestly before allotment — we do not claim every haz class by default.
- **Q:** How is compliance and documentation handled?
  - **A:** Papers, LR, and POD sit with the ZAFTYS desk on contracted moves. Route and documentation expectations are confirmed with the cargo class, not after the tanker reaches the gate.
- **Q:** Do you own chemical tankers?
  - **A:** Where we have the class, we run company assets. Specialized or surge tanker demand uses verified partners and is labeled as network capacity — never silently sold as owned fleet.
- **Q:** Can we see shipment status without calling dispatch?
  - **A:** Active contracted shipments can be monitored through ZAFTYS TMS so operations teams spend less time on status follow-ups.

### Section: Related blog links
- Planning industrial shipments → /blog/planning-industrial-shipments
- Plant detention and TAT → /blog/plant-detention-tat-yard-gate-india
- ePOD and e-Way Bill billing → /blog/epod-fastag-eway-bill-billing-india

### Section: Related industries
- Manufacturing → /industries/manufacturing
- Industrial Logistics → /industries/industrial-logistics
- Cement & Construction → /industries/cement
- FMCG → /industries/fmcg

### Section: WhatsApp prefill
- **Message:** Hi ZAFTYS, I need a quote for chemical freight.\n\nOrigin (plant):\nDestination:\nProduct / packaging (bulk tanker / drums / packaged):\nTrips per week:\n

### Section: Aside chrome (IndustryDetail shared)
- Sticky quote lead: Product, origin, destination, trips/week — same desk as Transportation.
- CTA: WhatsApp quote
- CTA: Email the desk
- Label: At a glance (features list)
- Label: Also see (related industries + All industries)

### Section: Equipment strip links
- Link: Container transportation (when slug = container-transport) else Industrial freight
- Link: Fleet

### Section: Final CTA band
- H2 pattern: Quote {industry.title}
- Lead: Corridor + product + volume. We reply with class and capacity.
- CTA: Request Transportation
- CTA: Chat on WhatsApp
- CTA: Fleet

## /industries/manufacturing — Manufacturing

**Meta:** Manufacturing Logistics India | Plant Window FTL | Inbound, outbound, and inter-plant manufacturing freight timed to shift gates and line schedules. Own fleet first, labeled network overflow, ZAFTYS TMS visibility.

### Section: Hero
- **H1 (seoH1):** Manufacturing FTL timed to production windows.
- **Lead / description:** Production-linked inbound and outbound FTL — raw materials in, finished goods out, inter-plant WIP — timed to shift gates and line schedules, not a generic truck hunt.
- **Highlight:** Shift gates · line-linked FTL
- **Features:**
  - Production-window dispatch
  - Inbound + outbound + WIP
  - TMS on contracted trips
- CTA: WhatsApp quote
- CTA: Transportation

### Section: Products we haul
- **Inbound raw materials:** Supplier-to-plant timed to shift and bay
- **Finished goods outbound:** Plant-to-warehouse and plant-to-customer
- **Inter-plant WIP:** Transfers across multi-plant networks
- **Packaging & components:** Closed or open body by SKU profile
- **Peak / model-change surge:** Labeled network when own fleet is short

### Section: What goes wrong
- Inbound misses a shift gate and the line waits — freight cost is secondary to lost production hours.
- Outbound finished goods and dealer pushes pile up when vehicles are shopped the morning of indent.
- Multi-plant networks create different gate rules, body preferences, and SLA clocks on every site.
- Peak weeks and model changes blow past internal fleet; ad-hoc carriers lose ePOD and escalation discipline.

### Section: How we run it
- Dedicated and contract FTL on repeat supplier-to-plant and plant-to-DC corridors with shift-window language.
- Own open and closed body where the SKU fits; labeled Tranzfort overflow for peak and model-change weeks.
- One Amravati desk across plants so indents are not a new broker hunt per site.
- TMS trip status, documentation, and ePOD so production and logistics share one record.
- Honest split: manufacturing pages sell production windows — heavy tipper / coil / bulker verticals stay on their own desks.

### Section: Corridors
- Supplier-to-plant inbound on industrial corridors.
- Plant-to-warehouse and plant-to-customer outbound lanes.
- Inter-plant transfers for WIP and finished goods.
- Regional dealer and DC push weeks with planned surge cover.

### Section: Equipment
- Open-body and closed body for varied SKU profiles
- FTL assignment for production-linked lanes
- Commercial LCV where DC and dealer drops fit
- Labeled network capacity for peak production windows

### Section: FAQ
- **Q:** Do you support multi-plant manufacturing networks?
  - **A:** Yes. Inbound supplier-to-plant and outbound plant-to-warehouse or customer lanes can run under one ZAFTYS account with site-specific gate language.
- **Q:** How is this different from industrial logistics?
  - **A:** Manufacturing focuses on production-linked SKU flows and shift windows. Industrial logistics is the multi-plant account layer for mixed body classes, shutdown cargo, and contract-plus-spot programs across sites.
- **Q:** How do you handle production peaks?
  - **A:** Core lanes stay on owned or dedicated trucks. Extra volume goes on Tranzfort and is labeled clearly. Listing and search are free; broker fee applies on trucker bookings.
- **Q:** What visibility do plant teams get?
  - **A:** ZAFTYS TMS provides trip status, documentation, and ePOD so production and logistics teams share the same information.

### Section: Related blog links
- TMS evaluation for manufacturers → /blog/tms-evaluation-guide-indian-manufacturers
- Spot vs dedicated fleets → /blog/spot-market-vs-dedicated-fleet-india
- Plant detention and TAT → /blog/plant-detention-tat-yard-gate-india
- ePOD and e-Way Bill billing → /blog/epod-fastag-eway-bill-billing-india

### Section: Related industries
- Industrial Logistics → /industries/industrial-logistics
- FMCG → /industries/fmcg
- Port & Container Road → /industries/container-transport
- Steel & Metals → /industries/steel-metals

### Section: WhatsApp prefill
- **Message:** Hi ZAFTYS, I need a quote for manufacturing logistics.\n\nPlant / origin:\nDestination:\nFlow (inbound / outbound / inter-plant):\nFrequency / shift window:\n

### Section: Aside chrome (IndustryDetail shared)
- Sticky quote lead: Product, origin, destination, trips/week — same desk as Transportation.
- CTA: WhatsApp quote
- CTA: Email the desk
- Label: At a glance (features list)
- Label: Also see (related industries + All industries)

### Section: Equipment strip links
- Link: Container transportation (when slug = container-transport) else Industrial freight
- Link: Fleet

### Section: Final CTA band
- H2 pattern: Quote {industry.title}
- Lead: Corridor + product + volume. We reply with class and capacity.
- CTA: Request Transportation
- CTA: Chat on WhatsApp
- CTA: Fleet

## /industries/fmcg — FMCG

**Meta:** FMCG Logistics India | Factory-to-DC FTL & LCV | Regional FMCG distribution with OTIF focus, ePOD, and lane discipline. Own fleet and commercial LCV first, labeled network for seasonal peaks.

### Section: Hero
- **H1 (seoH1):** FMCG factory-to-DC freight that makes OTIF.
- **Lead / description:** Factory-to-DC and hub replenishment with OTIF discipline, fast turnaround, and lane-level trip records — commercial FTL and LCV, not two-wheeler last mile.
- **Highlight:** OTIF · factory-to-DC lanes
- **Features:**
  - Factory-to-DC FTL
  - OTIF & ePOD
  - Seasonal surge cover
- CTA: WhatsApp quote
- CTA: Transportation

### Section: Products we haul
- **Factory-to-DC FTL:** Closed or open body by SKU and weather risk
- **Hub replenishment:** Scheduled hub-to-hub on fixed windows
- **Dealer / stockist push:** Regional FTL and commercial LCV
- **Festive / seasonal surge:** Labeled network when own fleet is short
- **Return / reverse where scoped:** Planned reverse legs — not empty promises

### Section: What goes wrong
- Trade and dealer channels penalize late or undocumented deliveries — OTIF is the product, not the truck.
- Festive and promo peaks blow past standing capacity; last-minute brokers break ePOD and SLA trails.
- Lane cost is invisible without centralized trip, detention, and utilization records.
- Wrong body class (open vs closed) damages weather-sensitive SKUs and creates claim noise.

### Section: How we run it
- Regional FTL and commercial LCV on repeat factory-to-DC corridors with schedule-aligned dispatch.
- ePOD and trip records through ZAFTYS TMS for OTIF confirmation — not WhatsApp photo chains.
- Core lanes on own or dedicated capacity; seasonal peaks on labeled Tranzfort overflow.
- Honest scope: commercial distribution lanes — not two-wheeler last mile or household shifting.
- One desk for indent, allotment, and exception so trade teams are not chasing multiple transporters.

### Section: Corridors
- Factory-to-DC regional movement.
- Hub-to-hub replenishment on scheduled lanes.
- Bulk SKU FTL where palletized FTL fits the network design.
- Dealer and stockist push weeks with planned surge cover.

### Section: Equipment
- Closed body for weather-sensitive and high-value SKUs
- Open body where product and corridor allow
- Commercial LCV for DC transfers and dealer drops
- Labeled network capacity for festive and promo peaks

### Section: FAQ
- **Q:** Do you run commercial LCV, or only last-mile vans?
  - **A:** We run commercial LCV for DC transfers, dealer drops, and packaged cargo on planned lanes. We do not do two-wheeler last mile or household shifting.
- **Q:** How do you support OTIF goals?
  - **A:** Schedule-aligned dispatch, ePOD confirmation, and lane-level trip records through ZAFTYS TMS help confirm on-time, in-full performance.
- **Q:** Can seasonal peaks be covered?
  - **A:** Yes. Core lanes stay reserved. Extra festive or promo volume posts on Tranzfort and is labeled as network capacity. Matching is AI-powered; trips we contract stay on GST billing.
- **Q:** Do you run DC-to-store or store multi-drop programs?
  - **A:** No. We do not run DC-to-store or store multi-drop programs. FMCG here means factory-to-DC and hub replenishment on commercial FTL and LCV.

### Section: Related blog links
- Empty return trips on FTL → /blog/reduce-empty-return-trips
- Spot vs dedicated fleets → /blog/spot-market-vs-dedicated-fleet-india
- ePOD and e-Way Bill billing → /blog/epod-fastag-eway-bill-billing-india

### Section: Related industries
- Manufacturing → /industries/manufacturing
- Port & Container Road → /industries/container-transport
- Industrial Logistics → /industries/industrial-logistics
- Chemicals → /industries/chemicals

### Section: WhatsApp prefill
- **Message:** Hi ZAFTYS, I need a quote for FMCG distribution.\n\nFactory / origin:\nDC / destination:\nSKU profile (closed / open):\nTrips per week / peak months:\n

### Section: Aside chrome (IndustryDetail shared)
- Sticky quote lead: Product, origin, destination, trips/week — same desk as Transportation.
- CTA: WhatsApp quote
- CTA: Email the desk
- Label: At a glance (features list)
- Label: Also see (related industries + All industries)

### Section: Equipment strip links
- Link: Container transportation (when slug = container-transport) else Industrial freight
- Link: Fleet

### Section: Final CTA band
- H2 pattern: Quote {industry.title}
- Lead: Corridor + product + volume. We reply with class and capacity.
- CTA: Request Transportation
- CTA: Chat on WhatsApp
- CTA: Fleet

## /industries/industrial-logistics — Industrial Logistics

**Meta:** Industrial Logistics India | Multi-Plant Freight Programs | Multi-plant industrial freight with contract lanes, labeled spot overflow, shutdown windows, and ZAFTYS TMS. Own fleet first across mixed body classes.

### Section: Hero
- **H1 (seoH1):** Industrial logistics — one desk across plants.
- **Lead / description:** One account across plants for mixed industrial freight — contract lanes on our fleet, spot overflow on Tranzfort, shutdown and project windows, TMS on the trips we run.
- **Highlight:** One desk · mixed plant freight
- **Features:**
  - Multi-plant account desk
  - Contract + spot mix
  - Shutdown & project windows
- CTA: WhatsApp quote
- CTA: Transportation

### Section: Products we haul
- **Multi-plant contract lanes:** Standing FTL across industrial belts
- **Spot & surge overflow:** Labeled Tranzfort when plants need extra wheels
- **Shutdown / turnaround cargo:** Windowed heavy and packaged moves
- **Project & construction feeds:** Site deliveries with axle-aware routing
- **Mixed body programs:** Tipper, open, flatbed, tanker, LCV under one desk

### Section: What goes wrong
- Nationwide industrial shippers juggle contract lanes, spot demand, and multiple plants with different gate rules.
- Fragmented transporters multiply admin, GST noise, and blind spots when something fails on the road.
- Shutdown and project windows need reserved capacity — not a broker scramble the week of outage.
- Manufacturing SKU pages and heavy vertical pages do not replace an account layer that mixes body classes across sites.

### Section: How we run it
- Enterprise-style account coordination: one commercial relationship, many plants, mixed body classes.
- Contracted core lanes on company trucks; spot and extra capacity on Tranzfort — labeled, never blended into owned counts.
- Shutdown, turnaround, and project windows planned with the desk before the outage week.
- TMS as the operational layer for dispatch, documentation, and client visibility across plants.
- Clear split from Manufacturing: this page is the multi-plant mixed-freight account; manufacturing is production-window SKU FTL.

### Section: Corridors
- Multi-plant inbound and outbound across industrial belts.
- Project and shutdown cargo on scheduled windows.
- Nationwide spot and contract mix on repeat and ad-hoc lanes.
- Cross-vertical feeds (e.g. plant materials + packaged outbound) under one account.

### Section: Equipment
- Asset mix aligned during program design: LCV, tipper, open, flatbed, tanker
- Dedicated fleet where contracts warrant
- Tranzfort for extra trucks on the day
- TMS close-out on every contracted trip

### Section: FAQ
- **Q:** How is this different from manufacturing logistics?
  - **A:** Manufacturing focuses on production-linked inbound/outbound SKU flows and shift windows. Industrial logistics is the multi-plant account for mixed body classes, contract-plus-spot mix, and shutdown / project cargo.
- **Q:** Can ZAFTYS manage contract and spot together?
  - **A:** Yes. Contracted lanes on company trucks. Spot and extra capacity on Tranzfort. GST billing on trips we run. Overflow is always labeled.
- **Q:** What visibility do multi-plant teams get?
  - **A:** ZAFTYS TMS is the operational layer for dispatch, documentation, and client visibility across plants and lanes.
- **Q:** How do you reduce transporter fragmentation?
  - **A:** One commercial relationship with ZAFTYS replaces juggling multiple informal carriers for core and surge volume across sites.

### Section: Related blog links
- Planning industrial shipments → /blog/planning-industrial-shipments
- Spot vs dedicated fleets → /blog/spot-market-vs-dedicated-fleet-india
- TMS evaluation guide → /blog/tms-evaluation-guide-indian-manufacturers
- Container trucking research → /blog/container-trucking-logistics-india

### Section: Related industries
- Manufacturing → /industries/manufacturing
- Cement & Construction → /industries/cement
- Steel & Metals → /industries/steel-metals
- Port & Container Road → /industries/container-transport

### Section: WhatsApp prefill
- **Message:** Hi ZAFTYS, I need a quote for industrial logistics.\n\nPlants involved:\nCorridor / lanes:\nCargo mix / body classes:\nContract vs spot split:\n

### Section: Aside chrome (IndustryDetail shared)
- Sticky quote lead: Product, origin, destination, trips/week — same desk as Transportation.
- CTA: WhatsApp quote
- CTA: Email the desk
- Label: At a glance (features list)
- Label: Also see (related industries + All industries)

### Section: Equipment strip links
- Link: Container transportation (when slug = container-transport) else Industrial freight
- Link: Fleet

### Section: Final CTA band
- H2 pattern: Quote {industry.title}
- Lead: Corridor + product + volume. We reply with class and capacity.
- CTA: Request Transportation
- CTA: Chat on WhatsApp
- CTA: Fleet

## /about — About

**Meta:** About ZAFTYS | Industrial freight desk, fleet & TMS | ZAFTYS: one Amravati desk for industrial freight. Own trucks, ZAFTYS TMS, and labeled TranZfort overflow. Company profile on request.

### Section: Hero
- **Badge:** About ZAFTYS
- **H1:** One desk for industrial freight across India.
- **Lead:** Family corridor experience, a formal company since 2024. Own trucks when we have the right vehicle, ZAFTYS TMS on every trip we run, and TranZfort when you need more capacity — always labeled, never blended.
- **Hero alt:** ZAFTYS operations in Amravati: company fleet, TMS, and TranZfort marketplace

### Section: Story
- **Eyebrow:** Who we are
- **H2:** A transportation company that built the tools it runs on
- **Lead:** We move industrial freight. The software exists because the yard needed it — not the other way around.
- **Corridor know-how, digital dispatch:** Cement, steel, bulk, plant, and port lanes sit next to a TMS we use every day and a marketplace for verified overflow capacity.
- **Accountable at the plant window:** Showing up at the gate still matters. Trips contracted through us come with GST-compliant billing and structured documents — not a chat thread as the system of record.
- **Own fleet and network, clearly labeled:** Company trucks when we have the right body type. Verified TranZfort capacity when volume spikes. We never sell partner trucks as our own.

### Section: Heritage
- **Eyebrow:** Our journey
- **H2:** Three generations on the corridor — formal company, modern stack
- **Lead:** Trucking experience came first. ZAFTYS Logistics was incorporated in 2024; owned heavy assets, TranZfort, and TMS scaled from there.

### Section: Milestones
- **1960s–2010s — Corridor roots:** Three generations moving industrial freight on heartland and national corridors — cement, steel, bulk, and plant lanes.
- **2024 — Company formed:** ZAFTYS Logistics formally established. TranZfort product work begins.
- **2025 — Owned heavy fleet:** Expanded multi-axle heavy trucks for bulk industrial cargo and plant programs.
- **2026 — TMS & marketplace live:** TranZfort live with verified truckers. ZAFTYS TMS on contracted trips. Shared desk for enterprise programs.

### Section: Operate
- **Eyebrow:** How we operate
- **H2:** Trucks first. Software we actually use. Overflow when you need it.
- **Lead:** Not three equal brochure products — one transportation desk with tools built around real trips.
- **Physical fleet:** Owned heavy commercial vehicles for critical industrial cargo — capacity you can count on, and a real yard that shapes how the software works. [Our Fleet → /fleet]
- **ZAFTYS TMS:** Cloud TMS for dispatch, live visibility, digital docs, and ePOD. Built for plant windows and the trips we run — available to shippers and fleet operators. [ZAFTYS TMS → /zaftys-tms]
- **TranZfort marketplace:** Verified transporters and bulk loads. Listing and search free; broker fee only on booked loads. Overflow that stays labeled as network, not company fleet. [TranZfort → /network/tranzfort]

### Section: Challenges
- **Eyebrow:** What we solve
- **H2:** The gaps that still cost plants and shippers money
- **Problem:** Empty returns and deadhead on familiar lanes
  - **How:** We plan corridors we run often and use TranZfort for return or peak legs — without pretending every truck is ours.
- **Problem:** Slow matching when plant or port windows are tight
  - **How:** Own fleet for committed windows; marketplace matching when the lane needs more wheels the same day.
- **Problem:** WhatsApp-only coordination and weak visibility
  - **How:** ZAFTYS TMS carries dispatch, status, and ePOD so the trip isn’t trapped in a chat.
- **Problem:** Too many transporters, no single accountable desk
  - **How:** One Amravati team for quote, trip, and exception — own capacity or labeled network.

### Section: Coverage
- **Eyebrow:** Corridors & hubs
- **H2:** Industrial belt presence — West to East, North to South
- **West / Gujarat:** Hazira, Vapi, Dahej, Surat, Ahmedabad, Kandla, Mundra
- **Maharashtra:** Mumbai, Pune, Nagpur, Chandrapur, Nashik, Aurangabad
- **Central & East:** Indore, Raipur, Bhilai, Haldia, Kolkata, Jamshedpur, Rourkela
- **South:** Hyderabad, Bengaluru, Chennai, Hosur, Krishnapatnam
- **Corridors:**
  - Hazira → Pune / Nagpur / Hyderabad
  - Mumbai → Bengaluru · Pune → Chennai
  - Chandrapur → Mumbai · Gujarat → South India
  - Haldia → Bihar / Jharkhand · Maharashtra → Karnataka

### Section: Clients / partners
- **Eyebrow:** Enterprise logistics
- **H2:** Capacity programs with operators we work alongside
- **Lead:** We run industrial corridor programs with enterprise logistics companies. Names below are partners we’ve worked with on capacity — not a claim of exclusive endorsement.
- **CJ Darcl Logistics** → https://cjdarcl.com/
- **RITCO** → https://ritcologistics.com/
- **SLS Shrinivas** → https://shriniwaslogistics.com/
- **DP World** → https://www.dpworld.com/

### Section: Company profile CTA
- **Eyebrow:** Company profile
- **H2:** Want the full company profile?
- **Lead:** Ask for the PDF — how we run own fleet, TMS, TranZfort, and corridors with enterprise partners. We’ll send it from the desk.
- **Button:** Request company profile
- **Note:** Opens a short email to our team.

### Section: Mission / Vision
- **Mission title:** Mission
- **Mission body:** Move commercial freight in India with our own trucks, a TMS people actually use, and a marketplace that does not charge truckers just to look for work.
- **Vision title:** Vision
- **Vision body:** Be the desk a shipper can hire for the truck, the software, or the overflow load — without three disconnected vendors.

### Section: Values
- **H2:** What we hold to
- **Lead:** We do what we say. We match the truck to the loading window. We cut empty kilometres where we can.
- **Integrity:** Honest dealings on every contracted trip. Own fleet and network capacity are never blurred.
- **Precision:** Gates, papers, and timing. The TMS exists so those details are not lost in a chat.
- **Client focus:** Your plant or port window is the schedule. Vehicle type follows the cargo.
- **Fuel-sensible routing:** Fewer empty kilometres on lanes we run often — better for cost and for fuel.

### Section: Final CTA
- **H2:** Ready to work with the same desk?
- **Lead:** Start with a freight quote on WhatsApp. Ask for the company profile, or open transportation.
- **Primary:** Get a freight quote
- **Secondary:** Request company profile
- **Tertiary:** Transportation

### Section: Profile mail
- **Subject:** Request ZAFTYS company profile
- **Body:** Hi ZAFTYS,\n\nPlease send the company profile PDF.\n\nName:\nCompany:\nEmail:\nWhat you need it for:\n\n

## /partner — Partner

**Meta:** Become a Partner | ZAFTYS Network and TranZfort | Register your trucks as verified ZAFTYS network capacity. Find loads on TranZfort. Search is free. Broker fee on booked loads. Paid through ZAFTYS on contracted trips.

### Section: Hero
- **Badge:** Fleet partners
- **H1:** Put your trucks on the ZAFTYS Network.
- **Lead:** Join as labeled network capacity. Find loads on corridors you already run via TranZfort. Search is free. Broker fee on booked loads. Verification is not optional: papers, insurance, and a real operating pattern.
- **Hero alt:** Fleet owners joining TranZfort to find loads
- CTA: Register Your Fleet
- CTA: Partner Inquiry

### Section: Benefits
- **Loads on your corridors:** Commercial freight matched to lanes you already run. Search is free. Broker fee on booked loads.
- **Fewer empty returns:** Find a load for the way back instead of deadheading the corridor.
- **Payments via ZAFTYS:** GST-compliant billing through ZAFTYS on trips we contract.
- **TMS on ZAFTYS trips:** Contracted work can sit in ZAFTYS TMS for status and close-out.

### Section: Onboarding steps
- **H2:** Simple onboarding. Clear standards.
- **01 Register:** Submit company details, contact information, fleet size, and primary corridors.
- **02 Verify:** Our fleet team reviews registration, documentation, insurance, and operational readiness.
- **03 Onboard:** Orientation on communication standards, TranZfort app usage, and ZAFTYS workflows.
- **04 Take loads:** Accept matched loads on your routes. Payments for ZAFTYS trips come through ZAFTYS.

### Section: Registration form
- **H2:** Register your fleet
- **Lead:** Papers, insurance, and corridors. Then the app.
- Label: Company Name / Placeholder: Transporter Name
- Label: Contact Person / Placeholder: Full Name
- Label: Mobile Number / Placeholder: +91
- Label: Fleet Size / Placeholder: Select size
- Options: 1-5 Vehicles; 6-20 Vehicles; 20+ Vehicles
- Submit: Submit Application / Processing...
- **Toast success title:** Application received
- **Toast success description:** Our fleet team will contact you for verification and next steps.
- **Toast error:** Something went wrong. Please try again later.

### Section: Final CTA
- **H2:** Prefer to talk first?
- **Lead:** Reach our fleet team on WhatsApp, open TranZfort, or read how Network capacity works.
- CTA: WhatsApp Our Fleet Team
- CTA: Open TranZfort
- Links: Network, TranZfort, ZAFTYS TMS, contact the desk

## /contact — Contact

**Meta:** Contact ZAFTYS | Quote, TMS Demo, Network Partner | WhatsApp ZAFTYS for a freight quote, TMS demo, or Network partner onboarding. Amravati, Maharashtra. +91-927-092-3581.

### Section: Hero
- **Badge:** Contact
- **H1:** Freight quote, TMS demo, or Network partner.
- **Lead:** Shippers: WhatsApp or the form for capacity. TMS walkthrough by email or form. Fleet owners: partner registration or TranZfort. Desk in Amravati, Maharashtra.
- **Hero alt:** Contact ZAFTYS for a freight quote, TMS demo, or TranZfort
- CTA: Get a freight quote
- CTA: Send a message

### Section: Contact info cards
- **Headquarters:** Old Town, Badnera; Amravati, 444701, Maharashtra, India
- **Phone Support:** +91-927-092-3581; +91-989-092-3581
- **Email Us:** contact@zaftys.com

### Section: Find Us map
- **H2:** Find Us
- **Address line:** Old Town, Badnera, Amravati, 444701, Maharashtra, India
- **Iframe title:** ZAFTYS Logistics Amravati office location
- CTA: Get Directions

### Section: Contact form
- **H2:** Send a Message
- **Lead:** Tell us what you need. The desk will follow up.
- Label: Full Name / Placeholder: John Doe
- Label: Phone Number / Placeholder: +91 XXXXX XXXXX
- Label: Email Address / Placeholder: john@company.com
- Label: City (optional) / Placeholder: Pune
- Label: PIN code (optional) / Placeholder: 411001
- Label: I'm interested in... / Placeholder: Select a topic
- Options: Freight quote (any truck class); ZAFTYS TMS demo; Network partner / fleet registration; TranZfort (post loads); TranZfort (find loads); Careers; Support
- Label: Message / Placeholder: Tell us about your load requirements...
- Submit: Send Message / Sending...
- **Toast success title:** Message Sent!
- **Toast success description:** We've received your inquiry and will get back to you shortly.
- **Toast error:** Something went wrong. Please try again or call us directly.

### Section: FAQ
- **H3:** Frequently Asked Questions
- **What are your operating hours?** Our office is open Mon-Sat, 9 AM to 6 PM. However, our operations and dispatch teams work 24/7 to ensure your shipments keep moving.
- **How quickly can I get a quote?** For standard FTL corridors, we typically respond during business hours. Specialized or project cargo may need more time for a proper assessment.

### Section: Priority support
- **H3:** Need Urgent Support?
- **Lead:** Existing clients can reach our priority dispatch desk directly.
- CTA: WhatsApp Priority Line

### Section: Explore links
- **H3:** Explore ZAFTYS
- Logistics and transportation
- Network and TranZfort
- ZAFTYS TMS
- Become a partner
- Industries we serve
- About ZAFTYS

## /careers — Careers

**Meta:** Careers at ZAFTYS | Fleet, Dispatch, TMS | Join ZAFTYS in operations, dispatch, fleet, and TMS roles. Commercial freight, marketplace matching, and a desk in Amravati.

### Section: Hero
- **Badge:** Join the team
- **H1:** Work on the yard, the desk, or the product.
- **Lead:** Drivers, dispatch, and software in Amravati and on the network. The work is commercial freight, TMS, and TranZfort. Not a brochure job board.
- **Hero alt:** ZAFTYS logistics and TMS careers in Amravati
- CTA: View Open Positions
- CTA: Email HR Team

### Section: Why join
- **H2:** More than a job title.
- **Lead:** Whether you are behind the wheel, on the dispatch floor, or building ZAFTYS TMS, the work is real trips: commercial freight, marketplace matching, and a desk in Amravati.
- **Wellness:** Health and safety support appropriate to role. Details during hiring.
- **Growth:** Clear paths to develop skills in operations, coordination, and technology.
- **Rewards:** Performance and safety recognition where applicable, structured through HR policy.
- **Culture:** A supportive environment rooted in operational discipline and family values.

### Section: Open positions
- **H2:** Current openings
- **Senior Fleet Driver** (Full-time) — Multiple Locations
  - Requirements: Valid commercial license, 5+ years experience, GPS proficiency.
  - Perks: Performance bonuses; Health insurance; Paid leave
  - CTA: Apply Now
- **Logistics Coordinator** (Full-time) — Amravati (HQ)
  - Requirements: Experience with TMS/ERP systems, strong communication skills.
  - Perks: Career progression; Tech training; Competitive salary
  - CTA: Apply Now
- **Backend Developer (TMS)** (Remote / Hybrid) — Remote / Amravati
  - Requirements: Node.js, React, PostgreSQL experience. Logistics domain knowledge is a plus.
  - Perks: Flexible hours; Innovation budget; Latest tech stack
  - CTA: Apply Now

### Section: General application form
- **H2:** Don't see your role?
- **Lead:** We're always looking for talent. Send us your details and we'll keep you on file.
- Label: Full Name / Placeholder: Jane Doe
- Label: Email / Placeholder: jane@example.com
- Label: Upload Resume / CV
- Submit: Submit General Application / Submitting...
- **Toast success title:** Application Submitted
- **Toast success description:** Our HR team will review your profile and get in touch.

## /resources — Resources

**Meta:** Resources | Blog and Market Reports | ZAFTYS resources: freight blog guides plus institutional market reports on global logistics and digital freight matching with gated PDF downloads.

### Section: Hero
- **Badge:** Resources
- **H1:** Guides from the desk. Reports from research.
- **Lead:** Operations writing on the blog. Institutional PDFs from ZAFTYS Analytics on logistics and digital freight matching.
- **Hero alt:** ZAFTYS blog guides and market reports
- CTA: Market Reports
- CTA: Read the Blog

### Section: Hub cards
- **Market Reports H2:** Market Reports
- **Market Reports lead pattern:** Institutional market reports on global logistics and digital freight matching: size, forecast, ToC, methodology, and gated PDF downloads (company email required). {N} reports available.
- CTA: Browse reports
- **Blog H2:** Blog
- **Blog lead pattern:** Practical guides on plant windows, FTL, empty kilometres, TMS, and the marketplace. {N} articles published.
- CTA: Open blog

## /blog — Blog listing

**Meta:** Blog | Container Trucking, TMS, FTL and Plant Ops | ZAFTYS deep research and guides: container trucking India, TMS evaluation, axle and GVW, spot vs dedicated fleets, plant detention and TAT, ePOD and e-Way Bill, cement and steel freight.

### Section: Hero
- **Badge:** Blog
- **H1:** What we learned moving freight.
- **Lead:** Deep research and operations notes from ZAFTYS: container trucking, TMS, plant TAT, axle and GVW, and how backhaul and capacity networks cut empty kilometres.
- CTA: Browse posts
- CTA: Ask on WhatsApp

### Section: Filters
- All
- Deep research
- Operations
- Industries
- Technology

### Section: Category labels (blogCategoryLabels)
- **operations:** Operations
- **industries:** Industries
- **technology:** Technology

### Section: Listing chrome
- Featured badge pattern: Featured · {category}
- Deep research badge: Deep research
- Chapters label pattern: {N} chapters
- Read more
- Empty: No deep research posts yet. / No posts in this category yet.

### Section: Posts (listing cards — title, summary, SEO)
#### Container Trucking in India: Ports, Chassis, and Backhaul
- **Slug:** /blog/container-trucking-logistics-india
- **SEO title:** Container Trucking India | JNPT Mundra Backhaul
- **SEO description:** Container trucking India: JNPT and Mundra hinterlands, chassis and GVW, trailer surge, return loads, brokers vs marketplaces. Clear TEU, USD, and INR units.
- **Category:** Operations
- **Template:** deep-research
- **Summary:** Ocean shocks hit Indian inland depots before they show at the plant gate. This deep guide maps TEU pressure at JNPA and Mundra, separates ocean-box scarcity from trailer scarcity, and covers return-load economics, chassis selection, and hybrid base-plus-overflow capacity with clear units: TEUs, USD, and ₹.
- **Post CTA:** Request a freight quote → /contact

#### TMS Evaluation Guide for Indian Manufacturers: How to Choose the Right Transportation System in 2026
- **Slug:** /blog/tms-evaluation-guide-indian-manufacturers
- **SEO title:** TMS Evaluation Guide India | Manufacturers 2026
- **SEO description:** How to choose a TMS for Indian manufacturers in 2026: FTL yards, weighbridges, e-Way Bill, e-POD, hybrid fleet, and a 25-point demo checklist.
- **Category:** Technology
- **Template:** standard
- **Summary:** Most global transportation management systems are built for Western parcel or LTL networks. Indian manufacturers run heavy FTL, multi-axle trailers, spot brokers, weighbridges, and gate queues. This TMS evaluation guide covers the landscape, five pillars, a 25-point demo scorecard, and a six-week rollout. Score vendors on those jobs, not on a map with moving dots.
- **Post CTA:** Request a freight quote → /contact

#### Spot Market vs Dedicated Contract Fleets in India: Hybrid Industrial Freight Strategy
- **Slug:** /blog/spot-market-vs-dedicated-fleet-india
- **SEO title:** Spot vs Dedicated Fleet India | FTL Sourcing
- **SEO description:** Spot market vs dedicated contract fleets for industrial FTL in India: hybrid sourcing, backhaul, overflow rules, and a 25-point freight checklist.
- **Category:** Operations
- **Template:** standard
- **Summary:** Spot market vs dedicated contract fleets for industrial full truckload (FTL) in India: when contract capacity wins, when spot freight rates help, how to size a hybrid freight strategy, cut empty returns, and audit sourcing with a 25-point checklist.
- **Post CTA:** Request a freight quote → /contact

#### Plant Detention and Turnaround Time (TAT) in India: Yard and Gate Operations Guide
- **Slug:** /blog/plant-detention-tat-yard-gate-india
- **SEO title:** Plant Detention and TAT India | Yard Gate
- **SEO description:** Reduce plant detention and truck turnaround time (TAT) at Indian yards: five-stage gate-to-exit, weighbridge, loading slots, and a 25-point audit.
- **Category:** Operations
- **Template:** standard
- **Summary:** Plant detention and long truck turnaround time (TAT) often cost more than highway transit on industrial full truckload (FTL). This in-plant logistics and yard management guide covers five-stage TAT, free-time clocks, loading slots, weighbridge lock, and a 25-point plant audit for Indian manufacturers.
- **Post CTA:** Request a freight quote → /contact

#### ePOD, FASTag, and e-Way Bill Compliance in India: Cut Freight Billing Delays
- **Slug:** /blog/epod-fastag-eway-bill-billing-india
- **SEO title:** ePOD and e-Way Bill Compliance India
- **SEO description:** ePOD, FASTag, and GST e-Way Bill compliance for Indian freight billing: three-way invoice match, exception queues, and a 25-point finance checklist.
- **Category:** Operations
- **Template:** standard
- **Summary:** Automate electronic proof of delivery (ePOD), GST e-Way Bill compliance, and freight invoice matching in India. This guide covers paper LR delays, FASTag corridor proof where available, three-way billing match, exception queues, IRN hygiene, and a 25-point finance audit for manufacturers.
- **Post CTA:** Request a freight quote → /contact

#### Understanding India's Axle Load Norms and GVW Limits: How Heavy Freight Shippers Avoid Penalties and Plant Delays
- **Slug:** /blog/india-axle-load-gvw-limits-heavy-freight
- **SEO title:** India Axle Load Norms and GVW Limits
- **SEO description:** India axle load norms and GVW limits for heavy freight: MoRTH bands, Section 194 overloading fines, plant weighbridge control, and a compliance checklist.
- **Category:** Operations
- **Template:** standard
- **Summary:** Heavy FTL in India fails when total gross vehicle weight (GVW) looks legal but one axle group is already over MoRTH axle load limits. This guide covers axle load norms, GVW bands, Section 194 overloading fines, industry traps, and a plant weighbridge loop you can audit before the truck hits the highway.
- **Post CTA:** Request a freight quote → /contact

#### TMS Beyond GPS: Dispatch, Documents, and Plant Windows
- **Slug:** /blog/tms-for-heavy-haul
- **SEO title:** TMS Beyond GPS India | Dispatch and e-POD
- **SEO description:** TMS beyond GPS for Indian FTL: dispatch, e-POD, plant windows, documents, and trip visibility shippers and fleet operators should evaluate before buying.
- **Category:** Technology
- **Template:** standard
- **Summary:** GPS alone is not a transport management system. The platform must support dispatch, documentation, plant windows, and commercial LCV work, not only a map pin.
- **Post CTA:** Explore ZAFTYS TMS → /zaftys-tms

#### Steel Coil Transport Basics: Axle Discipline and Weighbridge Reality
- **Slug:** /blog/steel-coil-transport-basics
- **SEO title:** Steel Coil Transport India | Axle Weighbridge
- **SEO description:** Steel coil and plate transport in India: bed type, securement, axle limits, mill windows, and weighbridge discipline for heavy FTL lanes.
- **Category:** Industries
- **Template:** standard
- **Summary:** Coils and plates fail quietly when bed type, strapping, or axle planning is wrong. This guide covers the basics shippers and mill teams should align before dispatch.
- **Post CTA:** Steel & metals logistics → /industries/steel-metals

#### Cement Plant Loading Windows & Detention: What Shippers Should Expect
- **Slug:** /blog/cement-plant-loading-windows
- **SEO title:** Cement Plant Loading Windows and Detention India
- **SEO description:** Cement plant loading windows, tipper fit, weighbridge queues, and detention in India: what shippers should expect and how disciplined dispatch helps.
- **Category:** Industries
- **Template:** standard
- **Summary:** Detention and queue time can erase corridor planning. Align tipper capacity, plant windows, and documentation before the vehicle reaches the gate.
- **Post CTA:** Cement & construction logistics → /industries/cement

#### Planning Commercial Shipments: Body Type, Payload, and Plant Windows
- **Slug:** /blog/planning-industrial-shipments
- **SEO title:** FTL Shipment Planning India | Body and Payload
- **SEO description:** Plan industrial FTL shipments in India: body type, payload, plant windows, documents, weighbridge steps, and when to add overflow capacity.
- **Category:** Operations
- **Template:** standard
- **Summary:** Most freight failures start before the vehicle moves. Align cargo, asset, plant timing, and paperwork in one plan. Include LCV when a trailer is the wrong tool.
- **Post CTA:** Explore transport services → /services

#### How To Reduce Empty Return Trips on FTL Lanes
- **Slug:** /blog/reduce-empty-return-trips
- **SEO title:** Reduce Empty Return Trips India | FTL Backhaul
- **SEO description:** Cut empty return kilometres on Indian FTL corridors: corridor planning, backhaul matching, KPIs, and when to use a network for return loads.
- **Category:** Operations
- **Template:** standard
- **Summary:** Empty returns waste fuel, time, and margin. Programs improve when corridors, schedules, and marketplace cover are planned together.
- **Post CTA:** Get a freight quote (WhatsApp)

### Section: Newsletter band
- **H2:** Stay updated
- **Lead:** Occasional operational notes and company updates. No spam.
- **Placeholder:** Enter your email address
- Subscribe / Subscribing...
- **Unsubscribe:** Unsubscribe anytime at subscribers@zaftys.com.
- CTA: Talk to our team
- Explore links: market reports, services, ZAFTYS TMS, TranZfort, industries, contact ZAFTYS Logistics

## /reports — Market Reports listing

**Meta:** Market Reports | Global Logistics and Digital Freight | ZAFTYS Analytics market reports: global logistics market size and forecast 2027-2036, plus digital freight matching platform revenue. Unlock PDFs with a company email.

### Section: Hero
- **Badge:** Market reports
- **H1:** Research on logistics and digital freight.
- **Lead:** Open a report for the sneak peek, then unlock the full PDF with your company email. Institutional research from ZAFTYS Analytics.
- **Hero alt:** ZAFTYS Analytics market reports on logistics and digital freight matching
- **Segment badge:** Logistics & Supply Chain

### Section: Listing header
- **H2:** All reports
- **Count pattern:** {N} published in logistics & supply chain
- Link: Back to Resources

### Section: Report cards
#### Digital Freight Matching Market Size & Forecast 2027-2036
- **Slug:** /reports/digital-freight-matching-market-2027-2036
- **SEO title:** Digital Freight Matching Market Size and Forecast 2027-2036
- **SEO description:** Digital freight matching (DFM) market report: US$ 81.2 BN (2026) to US$ 1,314.0 BN (2036), 32.1% CAGR. Platform revenue, spot/contract matching, TMS APIs, 22 countries — unlock PDF with company email.
- **Subtitle:** Institutional research on digital freight matching platforms and marketplaces — platform / matching-service revenue (not matched freight GMV). Historical 2021-2026; forecast 2027-2036. Bank dfm-institutional-220.
- **Summary:** ZAFTYS Analytics models digital freight matching platform revenue at US$ 81.2 BN in 2026, expanding to US$ 1,314.0 BN by 2036 (32.1% CAGR). Coverage spans spot and contract lane matching, multimodal orchestration, dynamic pricing, eBOL/docs, payments & factoring, analytics, mobile/web/API access, modes, verticals, 22 country deep-dives, and 15 operator profiles.
- **Segment:** Logistics & Supply Chain
- **Pages:** 214
- **Published:** 2026-08-14
- **KPI Platform revenue 2026:** US$ 81.2 BN
- **KPI Forecast 2036:** US$ 1,314.0 BN
- **KPI CAGR 2027-2036:** 32.1%
- CTA: View report
- **Detail CTA:** Discuss freight matching on WhatsApp

#### Global Logistics Market Size, Share & Forecast 2027-2036
- **Slug:** /reports/global-logistics-market-2027-2036
- **SEO title:** Global Logistics Market Size and Forecast 2027-2036
- **SEO description:** Global logistics market research report: US$ 4,334.3 BN (2026) to US$ 11,344.7 BN (2036), 10.1% CAGR. Road freight, ocean, air, warehousing, TMS, regions & vendors — unlock PDF with company email.
- **Subtitle:** Institutional market intelligence on transportation, warehousing, and related logistics services — by mode, application, technology, end user, and geography. Historical 2017-2026; forecast 2027-2036.
- **Summary:** ZAFTYS Analytics models the global logistics market from US$ 4,334.3 BN in 2026 to US$ 11,344.7 BN by 2036 (10.1% CAGR), with segment cuts across road freight (FTL/LTL/express), ocean, air, rail & intermodal, warehousing, cold chain, TMS/WMS, end users, and regional deep-dives.
- **Segment:** Logistics & Supply Chain
- **Pages:** 238
- **Published:** 2026-08-13
- **KPI Market size 2026:** US$ 4,334.3 BN
- **KPI Forecast 2036:** US$ 11,344.7 BN
- **KPI CAGR 2026-2036:** 10.1%
- CTA: View report
- **Detail CTA:** Discuss logistics planning on WhatsApp

## /services — Services

**Meta:** LCV, Heavy Load, Container, Tanker and Bulker Transport | FTL and contract transport across LCV, heavy load, container, tanker and bulker trucks. Own fleet, TranZfort marketplace, and ZAFTYS TMS. Get a quote.

### Section: Hero
- **Badge:** Commercial transport
- **H1:** LCV to bulker. The class that fits the cargo.
- **Lead:** Pick the vehicle class that matches the cargo. We run company trucks on those lanes and use TranZfort when you need more capacity. Contracted trips can sit in ZAFTYS TMS.
- **Hero alt:** Commercial truck transport from LCV to bulker across India
- CTA: Get a Freight Quote
- CTA: Match Truck & Material

### Section: Transportation explorer
- **H2:** Match the right asset to the cargo
- **Lead:** Pick a body type or material. LCV pairs with FMCG factory-to-DC. Tippers and open body pair with bulk. Tankers pair with energy and chemicals.

### Section: Truck classes
- **H2:** Truck classes we run
- **Lead:** LCV, heavy load, container, tanker, and bulker, plus contract fleet. The full TranZfort type list is on Fleet.
- **LCV** (Distribution and regional FTL): Open and closed LCV: Ace, Dost, and 14ft to 24ft, including 6W container. Not house shifting. Not two-wheeler last mile.
- **Heavy load** (Multi-axle, flatbed, project cargo): Open truck, trailer, tipper, and ODC: coils, machinery, low bed, and oversize-aware work. Plant windows, weighbridge, and axle limits.
- **Container** (Sealed and box-body freight): Container trailers and closed body for palletised, weather-sensitive, and high-value cargo, including plant-to-warehouse moves.
- **Tanker** (Liquids): Tankers quoted per cargo: water, chemical, acid, petroleum, and edible oil.
- **Bulker** (Loose and bagged bulk): Cement, fly ash, lime, and powder bulkers on plant-to-project lanes.
- **Contract fleet** (Dedicated lanes (program)): Assigned trucks and drivers on a plant, mill, or DC program. Any class, on a longer ticket.

### Section: Materials
- **H2:** Materials we move
- **Lead:** Bulk, metals, chemicals, packaged cargo, and harvest freight. The truck class follows the material.
- **Mining & Bulk:** Coal, iron ore, limestone, bauxite, and quarry aggregates on tipper programs.
- **Construction:** Cement, clinker, sand, and ready-mix inputs for plants, projects, and dealer networks.
- **Metals & Steel:** Coils, plates, billets, and structural sections with weighbridge and axle discipline.
- **Energy & Chemicals:** Petroleum products, industrial chemicals, and lubricants with haz-route awareness.
- **FMCG:** Regional FTL and commercial LCV with OTIF focus on factory-to-DC and hub lanes.
- **Agriculture:** Seasonal grain and agri bulk with scalable capacity during harvest windows.

### Section: How we package the work
- **H2:** How we package the work
- **Lead:** FTL, contract fleet, return-load planning, and TranZfort when you need more trucks.
#### Full truckload (FTL)
- **Description:** One dedicated truck, one cargo, one corridor. Any class: LCV, heavy load, container, tanker, or bulker.
- **Features:**
  - Any of the five vehicle classes
  - Pan-India commercial corridors
  - TMS tracking on contracted trips
  - GST-compliant billing
- **Highlight:** The truck matches the cargo, not the other way around

#### Contract fleet
- **Description:** Assigned trucks and drivers on a plant, mill, or DC program. A season or a year. The class follows the lane.
- **Features:**
  - Dedicated vehicles on repeat windows
  - Account desk that knows the gate
  - Performance on the lane, not a one-off rate
  - TMS visibility for the shipper
- **Highlight:** Assigned capacity on corridors you run every week

#### Route and return-load planning
- **Description:** Fewer empty kilometres on lanes we already run. Corridor planning, not a generic routing slogan.
- **Features:**
  - Return-load thinking on repeat lanes
  - Plant and DC window awareness
  - Fuel-sensible routing
  - TranZfort when the return needs a posted load
- **Highlight:** Cut empty returns on corridors we know

#### TranZfort marketplace cover
- **Description:** Post the load on TranZfort when you need a truck we do not have that day. Listing and search are free. We charge a broker fee to truckers on booked loads. Trips contracted through ZAFTYS stay on GST billing.
- **Features:**
  - Free to post and find
  - AI-powered matching
  - Broker fee on trucker bookings
  - TMS visibility on ZAFTYS trips
- **Highlight:** Extra trucks on the same ZAFTYS contract

- Aside label: Every program includes
  - Registered ZAFTYS contracts
  - Own fleet plus TranZfort marketplace
  - TMS tracking on active lanes

### Section: TMS teaser
- **H2:** See the trip in ZAFTYS TMS
- **Lead:** Dispatch, GPS, and e-POD on contracted work. Full product detail lives on the TMS page.
- CTA: See ZAFTYS TMS

### Section: TranZfort teaser
- **H2:** Need a truck we do not have today?
- **Lead:** Post on TranZfort. Listing and search are free. We charge a broker fee to truckers on booked loads. Matching is AI-powered.
- CTA: Download TranZfort
- CTA: How matching works

### Section: Final CTA
- **H2:** Need a truck for this corridor?
- **Lead:** WhatsApp the origin, destination, and vehicle class. We quote company fleet first.
- CTA: Get a Quote on WhatsApp
- CTA: Open TranZfort

## NotFound — 404

**Meta:** Page Not Found | This page does not exist. Return to ZAFTYS Logistics Services, TranZfort Network, or Contact for freight quotes and logistics support.

### Section: Body
- **Display:** 404
- **H2:** This page is not here.
- **Lead:** Try home, services, or contact. ZAFTYS TMS and TranZfort are also a click away.
- CTA: Return Home
- CTA: Services
- CTA: Contact
- Links: ZAFTYS TMS · TranZfort

## /login — Login

**Meta:** Login | ZAFTYS TMS | Sign in to ZAFTYS TMS for dispatch, fleet, and customer visibility. Access is by invitation. No public signup.

### Section: Auth chrome
- **Brand:** ZAFTYS
- **Subtitle:** Sign in to TMS
- **Tagline:** Same trip data for dispatch, fleet, and the customer.
- **Note:** ZAFTYS TMS. Invitation only. No public signup.

### Section: Mode tabs
- Aria: Login type
- Tab: Company admin
- Tab: Team seat
- **Company admin help:** Sign in as your company admin account. There is no public TMS signup. Access is provisioned for verified organisations.
- **Team seat help:** Team seats for your workspace. Invited operators sign in here with the credentials your admin shared.

### Section: Form
- Label: Email / Placeholder: name@company.com
- Label: Password
- Link (team mode): Forgot password?
- Submit (admin): Sign in with email
- Submit (team): Sign in to TMS

### Section: Footer links
- **Access note:** No public signup. Access is by invitation. Contact your administrator · Open app.zaftys.com
- Back to zaftys.com
- **Email:** info@zaftys.com

## Legal pages — short chrome

### Shared LegalDocument chrome
- Nav aria: Legal documents
- Nav links: Terms → /terms; Privacy → /privacy; Cookies → /cookies; Legal notice → /legal-notice
- **Last updated line pattern:** Last Updated: 13 August 2026 · Document version 1.3
- **Entity line:** ZAFTYS Logistics · Old Town, Badnera, Amravati, 444701, Maharashtra, India

### /privacy — Privacy Policy
**Meta:** Privacy Policy | How ZAFTYS Logistics collects, uses, and shares personal data for website forms, capacity matching, Transporter and Fleet Partner Trips, and platform services.
- **H1:** Privacy Policy
- **Intro:** This Privacy Policy explains how ZAFTYS Logistics may collect, use, disclose, retain and protect personal data in connection with zaftys.com, logistics and capacity-facilitation services, Transporter and Fleet Partner interactions, Trip management and related technology. It is intended to operate consistently with applicable Indian data-protection law, including the Digital Personal Data Protection Act, 2023 and applicable rules as they apply.
- Full section bodies live in `src/lib/legal/privacy-sections.ts` (not duplicated here).

### /terms — Terms of Use & Service
**Meta:** Terms of Use & Service | ZAFTYS Logistics terms for website use, capacity facilitation, Vehicle Approval, Transporter verification, detention, and Mode A/B liability.
- **H1:** Terms of Use & Service
- **Intro:** These Website Terms of Use & Service ("Terms") govern access to zaftys.com and ZAFTYS logistics, capacity-facilitation, transporter/fleet-partner and technology services. They operate together with Trip Documentation. Where a specific written commercial agreement applies, that agreement prevails to the extent of any inconsistency. Review by an Indian advocate is recommended before treating this as definitive for disputes.
- Full section bodies live in `src/lib/legal/terms-sections.ts` (not duplicated here).

### /cookies — Cookie Policy
**Meta:** Cookie Policy | How ZAFTYS Logistics uses cookies and similar technologies on zaftys.com, including necessary, preference, analytics, and marketing cookies.
- **H1:** Cookie Policy
- **Intro:** This Cookie Policy explains how ZAFTYS may use cookies and similar technologies on https://zaftys.com/. Read it together with the Privacy Policy.
- Full section bodies live in `src/lib/legal/cookie-sections.ts` (not duplicated here).

### /legal-notice — Legal Notice
**Meta:** Legal Notice | Website legal notice for ZAFTYS Logistics: informational content, vehicle availability, rates, and electronic transactions.
- **H1:** Legal Notice
- **Intro:** This Legal Notice applies to information on the ZAFTYS website about logistics, transportation and technology-related services.
- Full section bodies live in `src/lib/legal/notice-sections.ts` (not duplicated here).

## Shared CTA strings

### WhatsApp
- **Default button label:** Chat on WhatsApp
- **FAB aria-label:** Chat on WhatsApp
- **Default message:** Hi ZAFTYS, I need a freight quote. From:  To:  Load type (LCV / heavy / container / tanker / bulker):  Weight: 
- **Post load message:** Hi ZAFTYS, I want to post a load on TranZfort. From:  To:  Truck type:
- **Phone:** +91-927-092-3581 (wa.me/919270923581)

### Common button labels across site
- Request Transportation
- Chat on WhatsApp
- Get a freight quote
- Get a Quote on WhatsApp
- WhatsApp quote
- Ask on WhatsApp
- Talk to our team
- Discuss on WhatsApp
- Book a Demo
- Book a TMS demo
- See ZAFTYS TMS
- Login at app.zaftys.com
- Open TranZfort
- Download TranZfort
- Explore Network
- Explore TranZfort
- Become a Partner
- Register as a partner
- Post a load
- Browse posts
- Browse reports
- View report
- Read more
- Subscribe
- Send Message
- Get Directions

### Hero mailto subjects (heroMailSubjects)
- **demo:** ZAFTYS TMS demo request
- **quote:** Freight quote request
- **fleet:** Fleet availability inquiry
- **network:** TranZfort capacity inquiry
- **industryHub:** Industry logistics inquiry
- **industryQuote:** (fn) `{vertical} logistics quote`
- **about:** Partnership inquiry
- **contact:** General inquiry
- **partner:** TranZfort partner inquiry
- **careers:** Careers inquiry
- **resources:** Logistics question

### Hero mailto bodies (heroMailBodies)
- **demo:** Hi ZAFTYS,\n\nI'd like to request a demo of ZAFTYS TMS.\n\nCompany:\nRole:\nBest time to connect:\n\n
- **quote:** Hi ZAFTYS,\n\nI'd like a freight quote.\n\nFrom:\nTo:\nLoad type:\nTimeline:\n\n
- **fleet:** Hi ZAFTYS,\n\nI'd like to check fleet availability.\n\nRoute / corridor:\nLoad type:\nDates:\n\n
- **network:** Hi ZAFTYS,\n\nI need additional transport capacity through TranZfort.\n\nShipment details:\nTimeline:\n\n
- **industryHub:** Hi ZAFTYS,\n\nI'd like to discuss logistics for our industry vertical.\n\nIndustry:\nCorridor / volume:\n\n
- **about:** Hi ZAFTYS,\n\nI'd like to explore working together.\n\nCompany:\nWhat we ship:\n\n
- **partner:** Hi ZAFTYS,\n\nI have a question about joining TranZfort as a transport partner.\n\nCompany:\nFleet size:\nCorridors:\n\n
- **careers:** Hi ZAFTYS,\n\nI have a question about careers at ZAFTYS.\n\n
- **resources:** Hi ZAFTYS,\n\nI have a logistics question for your team.\n\n

### External URLs
- **TranZfort:** https://tranzfort.com
- **App:** https://app.zaftys.com
- **LinkedIn:** https://www.linkedin.com/company/zaftys

### Legal entity strings
- **Name:** ZAFTYS Logistics
- **Credentials short:** GST compliant
- **Credentials long:** GST compliant operations
- **Billing note:** Formal billing through ZAFTYS Logistics
- **Transactions note:** Trips contracted through ZAFTYS are billed with GST-compliant invoicing.

---

*End of ZAFTYS Website Content Copy inventory — generated from locked source modules.*
