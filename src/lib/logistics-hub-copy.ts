/**
 * Locked Logistics / Transportation page copy - /logistics
 *
 * Page shape (locked): Hero → Services index → Capacity strip → five services (Design A) → Industries → Final CTA
 * Service order (locked Option A): Container → 3PL → Industrial → Contract → Dedicated
 * Service layout: image head + equal 50/50 content cards + suitable-fleet strip.
 * No invented metrics, logos, or corridor counts.
 */

export const logisticsHubCopy = {
  hero: {
    badge: "Transportation & Logistics",
    h1: "Reliable transportation capacity for demanding freight.",
    lead:
      "ZAFTYS is a technology-enabled transportation operator for industrial and commercial freight in India. We run owned heavy vehicles, contract programs for recurring lanes, and verified partner capacity when volume spikes - managed on one desk with the TMS we dispatch on every day.",
    imageAlt: "ZAFTYS logistics and transportation services",
  },
  servicesIndex: {
    eyebrow: "Five ways we move freight",
    h2: "Transportation services built for plant reality.",
    lead:
      "Pick the service your desk needs. Each section below covers the problem, who it is for, and how we run the lane.",
  },
  capacityStrip: {
    owned: { label: "Own fleet", path: "/fleet#own-fleet" },
    contract: { label: "Contract programs", path: "#contract" },
    network: { label: "Network fleet", path: "/fleet#network-fleet" },
    note: "Capacity is never blended silently - what we own, what we reserve, and what partners fill.",
  },
  threePl: {
    id: "three-pl",
    index: "02",
    title: "3PL Transportation",
    image: "/images/services/home/transportation.jpg",
    imageAlt: "Heavy truck moving industrial freight on an Indian corridor",
    tagline: "Full-truckload execution - not a booking that vanishes after allotment.",
    lead:
      "3PL for ZAFTYS means we execute the trip. Full truckload from origin to destination, vehicle class matched to cargo, GST-compliant billing on contracted moves, and a desk that stays on the lane until delivery documentation closes.",
    body:
      "Unlike warehouse-led 3PLs that sell storage first and transport as an add-on, we sell movement. You get a named operator on FTL - owned wheels where we run the corridor, verified Tranzfort partners when volume spikes, and TMS status on contracted trips. The truck, the desk, and the paperwork stay connected until POD closes.",
    problem:
      "Spot FTL in India often fails at the same points: wrong body type at the gate, no one accountable after the truck is “allotted,” and zero visibility once the vehicle leaves the plant.",
    whoFor: [
      "Manufacturers and traders moving FTL between plants, mills, warehouses, and project sites",
      "Shippers who need a full truck - not shared LTL - with clear ownership of the trip",
      "Operations teams tired of chasing brokers for status, POD, and billing follow-up",
    ],
    points: [
      "Full truckload capacity matched to cargo: LCV through multi-axle, flatbed, tipper, trailer, and ODC where the lane requires it",
      "Owned fleet first on corridors we run every week; verified Tranzfort partners when surge exceeds what we own that day - always labeled",
      "Dispatch, trip status, and close-out on ZAFTYS TMS for contracted movements",
      "GST-compliant invoicing on trips contracted through ZAFTYS - not informal cash settlement",
      "One Amravati desk for indent, allotment follow-through, and delivery documentation",
    ],
    outcomes: [
      "A named operator on the trip, not a middleman who stops answering after booking",
      "Vehicle class decided for cargo and gate rules, not whatever truck is cheapest that hour",
      "Visibility and paperwork that survive weighbridge and plant audit questions",
    ],
    secondary: { label: "See Our Fleet", path: "/fleet" },
    fleetSuitable: {
      lead: "FTL allotment matches the cargo: LCV for regional, sealed container for protected freight, open or trailer for industrial loads.",
      types: [
        { id: "lcv", label: "LCV", detail: "4W-6W · 0.75-7T · regional" },
        { id: "open_truck", label: "Open / high-side", detail: "6W-18W · bags, steel, coal" },
        { id: "container", label: "Container 32 ft", detail: "SXL / MXL · sealed FTL" },
        { id: "trailer", label: "Trailer / flatbed", detail: "12W-22W · 20-48T line-haul" },
        { id: "container", label: "Container 20-24 ft", detail: "Lighter sealed · ~7T" },
      ],
    },
  },
  contract: {
    id: "contract",
    index: "04",
    title: "Contract Logistics",
    image: "/images/blog/planning-industrial-shipments.jpg",
    imageAlt: "Industrial plant freight planning and recurring lane dispatch",
    tagline: "Recurring lanes need reserved capacity - not a fresh hunt every Monday.",
    lead:
      "Contract logistics at ZAFTYS is a long-term transportation program: reserved trucks on the corridors you run every week, SLA tracking, plant-window awareness, and an account desk that already knows your sites.",
    body:
      "Peers in India sell contract logistics as warehouse + fleet + control tower. We keep the promise tight: capacity assurance on the road under an SLA. You stop shopping every indent. We stop treating your plant like a one-off spot load. Peak weeks get planned overflow - labeled - instead of silence.",
    problem:
      "Weekly plant and DC freight dies on spot markets: detention at the gate, no reserved capacity in peak weeks, and a new set of truckers who do not know your loading rules.",
    whoFor: [
      "Plants, mills, and DCs with fixed origin - destination patterns and weekly volume",
      "Procurement and logistics heads who need capacity assurance under an SLA, not only a rate",
      "Shippers ready to reserve trucks for a program instead of shopping every indent",
    ],
    points: [
      "Reserved capacity on recurring plant, mill, and DC corridors for the life of the program",
      "SLA and performance tracked against agreed loading and transit windows",
      "Managed dispatch from one desk: allotment, gate timing, and escalation when the plant slips",
      "Account familiarity with your weighbridge, bay rules, and detention risk",
      "Overflow through verified partners when volume spikes - never silently presented as owned fleet",
      "Shipper visibility on contracted trips through ZAFTYS TMS",
    ],
    outcomes: [
      "Predictable capacity on the lanes that keep production and distribution moving",
      "A desk that already knows your sites before Monday’s indent arrives",
      "Contract clarity on what is reserved, what is dedicated, and what is network overflow",
    ],
    secondary: { label: "Dedicated Fleet", path: "#dedicated" },
    fleetSuitable: {
      lead: "A contract locks one body class to the corridor for the SLA window - usually these industrial and plant classes.",
      types: [
        { id: "open_truck", label: "Open / high-side", detail: "Plant - market bags & solids" },
        { id: "trailer", label: "Trailer / flatbed", detail: "Steel, long product, bulk" },
        { id: "container", label: "Container 32 ft", detail: "Sealed DC / OEM lanes" },
        { id: "tipper", label: "Tipper", detail: "Aggregates, mining, sand" },
        { id: "bulker", label: "Bulker", detail: "Cement, fly ash powder" },
      ],
    },
  },
  dedicated: {
    id: "dedicated",
    index: "05",
    title: "Dedicated Fleet",
    image: "/images/blog/spot-market-vs-dedicated-fleet-india.jpg",
    imageAlt: "Dedicated fleet trucks assigned to a recurring freight program",
    tagline: "Your trucks. Your corridors. Your season or year.",
    lead:
      "Dedicated fleet is how a ZAFTYS contract looks when vehicles and drivers are assigned to you. Body type follows the lane - LCV, heavy load, container, tanker, or bulker - with plant-window dispatch and TMS on every contracted trip.",
    body:
      "Indian contract buyers often hear “dedicated” and get a rate sheet plus whoever is free that morning. We mean assigned assets: trucks and crews that learn your gate, bay, and loading rules. When surge exceeds the dedicated count, Tranzfort partners fill the gap - labeled clearly, not sold as your fleet.",
    problem:
      "Recurring volume without assigned trucks means every peak week is a scramble, every new driver relearns your plant, and detention climbs because the bay schedule was never part of the deal.",
    whoFor: [
      "Plants and DCs that need the same vehicle class on the same corridors for months at a time",
      "Shippers who want drivers who already know gate passes, loading SOPs, and site safety rules",
      "Programs where body type must stay fixed - tipper, flatbed, bulker, container - not rotated randomly",
    ],
    points: [
      "Trucks and drivers dedicated to your program for a season or a year",
      "Vehicle class chosen for the lane: LCV, multi-axle, flatbed, tipper, container, tanker, or bulker",
      "Performance measured on repeat windows and detention risk, not a one-off spot rate",
      "Plant and DC window awareness built into daily dispatch",
      "TMS visibility for shippers on every contracted dedicated trip",
      "Labeled Tranzfort overflow when volume exceeds the dedicated count",
    ],
    outcomes: [
      "Capacity that shows up knowing your site - not discovering it at the gate",
      "Stable body type and crew familiarity across the program window",
      "Clear line between dedicated assets and surge network capacity",
    ],
    secondary: { label: "See Our Fleet", path: "/fleet" },
    fleetSuitable: {
      lead: "Dedicated means the assigned body type stays fixed - including LCV feeder, sealed container, or tanker when the cargo demands it.",
      types: [
        { id: "lcv", label: "LCV", detail: "Assigned regional / feeder" },
        { id: "container", label: "Container", detail: "Sealed plant - DC program" },
        { id: "trailer", label: "Trailer / flatbed", detail: "Heavy industrial lanes" },
        { id: "bulker", label: "Bulker", detail: "Powder cement / fly ash" },
        { id: "tanker", label: "Tanker", detail: "Liquids · quoted per cargo" },
      ],
    },
  },
  industrial: {
    id: "industrial",
    index: "03",
    title: "Industrial Freight",
    image: "/images/blog/steel-coil-transport-basics.jpg",
    imageAlt: "Steel coil and industrial freight loaded for plant movement",
    tagline: "Steel, cement, mining, and project cargo - built for plant windows and axle reality.",
    lead:
      "Industrial freight is where generic FTL breaks. Coils need the right flatbed and securing. Cement and bulk need tippers and bulkers that survive the plant queue. Mining lanes need weighbridge discipline. ZAFTYS runs these movements as an operator that already lives in that world.",
    body:
      "Pan-India FTL marketing rarely mentions axle limits, GVW surprises, or mill detention. We do - because that is where industrial cost sits. Same desk across cement, steel, coal, and manufacturing: match the truck to the cargo and the gate, then stay on the trip until documentation closes.",
    problem:
      "Industrial shippers lose days to wrong vehicle class, axle and GVW surprises, plant detention, and transporters who treat a mill gate like a city warehouse.",
    whoFor: [
      "Steel and metals plants moving coils, plates, TMT, and sections",
      "Cement, construction, and bulk shippers on plant-to-market lanes",
      "Mining, aggregates, and project cargo that needs tipper, multi-axle, or ODC capability",
    ],
    points: [
      "Steel and metals: coils, plates, and long products on flatbeds and multi-axle with weighbridge awareness",
      "Cement and bulk solids: tippers and bulkers on plant-to-project and plant-to-market lanes",
      "Mining and aggregates: pit-head to plant / siding movements with loading and TAT discipline",
      "Manufacturing and project freight: inbound raw material and outbound finished goods on scheduled programs",
      "Vehicle class chosen for cargo, axle limits, and gate rules - not a one-size open truck",
      "Detention and plant-window language at the desk, because that is where industrial cost actually sits",
    ],
    outcomes: [
      "Fewer refusals at the gate because the truck matches the load and the site",
      "A desk that plans for weighbridge and plant TAT, not only origin - destination kilometres",
      "Same operating model across cement, steel, coal, and manufacturing verticals",
    ],
    secondary: { label: "Industries we serve", path: "/industries" },
    fleetSuitable: {
      lead: "Match body class to cargo: steel on flatbed, bagged solids on open/high-side, loose bulk on tipper, powder on bulker, oversize on low bed.",
      types: [
        { id: "trailer", label: "Flatbed trailer", detail: "Coils, plates, long steel" },
        { id: "open_truck", label: "Open / high-side", detail: "Bagged cement, TMT, coal" },
        { id: "tipper", label: "Tipper", detail: "Ore, sand, aggregates" },
        { id: "bulker", label: "Bulker", detail: "Cement / fly ash powder" },
        { id: "odc", label: "ODC / low bed", detail: "Machinery · permits" },
      ],
    },
  },
  container: {
    id: "container",
    index: "01",
    title: "Container Transportation",
    image: "/images/blog/container-trucking-logistics-india.jpg",
    imageAlt: "Container trailer moving sealed freight on a port corridor",
    tagline: "Port to factory, factory to port, port to market - sealed freight on corridors we run.",
    lead:
      "Container transportation for ZAFTYS is road execution between ports, warehouses, factories, and inland markets. We move containers and sealed freight on trailers suited to the corridor, with trip visibility on contracted moves and partner overflow when the yard needs more wheels than we own that day.",
    body:
      "EXIM road legs fail when ownership splits between CHA, transporter, and plant while demurrage clocks run. We take the road leg: gate-in language, factory slot timing, and trip close-out on the same desk that runs your industrial FTL - not a separate brochure service.",
    problem:
      "Port and EXIM road legs fail on empty trailer wait, missed factory windows, and unclear ownership between CHA, transporter, and plant - while cargo sits on demurrage or detention clocks.",
    whoFor: [
      "Importers and exporters moving containers between port, CFS/ICD, factory, and warehouse",
      "Manufacturers with inbound containers feeding production and outbound boxes to port",
      "Distributors running port-to-city or port-to-market FTL container / trailer programs",
    ],
    points: [
      "Port to warehouse and port to factory delivery for inbound containers",
      "Factory to port movement for export-bound boxes on plant loading windows",
      "Port to market / inland city trailer moves where the commercial lane demands it",
      "Container trailers and sealed configurations matched to the corridor",
      "Coordination language for gate-in, factory slot, and trip close-out - not only a rate quote",
      "Owned capacity where we run the lane; Tranzfort partners when overflow is required - labeled clearly",
    ],
    outcomes: [
      "Clearer trip ownership from port gate to factory bay",
      "Vehicle and timing planned around plant and port windows, not only distance",
      "Visibility on contracted container moves through the same desk and TMS stack",
    ],
    secondary: { label: "Port & Container Road", path: "/industries/container-transport" },
    fleetSuitable: {
      lead: "India container road legs run on sealed body sizes and chassis trailers - 32 ft is the domestic FTL workhorse; 40 ft for EXIM ISO.",
      types: [
        { id: "container", label: "20-24 ft", detail: "Local / regional sealed · ~7T" },
        { id: "container", label: "32 ft SXL / MXL", detail: "Domestic FTL backbone" },
        { id: "container", label: "40 / 40 HC", detail: "EXIM ISO · port - plant" },
        { id: "trailer", label: "Skeletal / trailer", detail: "ISO chassis · CFS - factory" },
        { id: "lcv", label: "LCV closed", detail: "Short sealed feeder" },
      ],
    },
  },
  industries: {
    eyebrow: "Who we serve",
    h2: "Built for heavy industrial freight.",
    lead: "Cement, steel, coal and mining, manufacturing - same desk.",
  },
  finalCta: {
    h2: "Ready to move your freight?",
    lead:
      "Request FTL capacity, discuss a contract or dedicated program, or ask for container movement on a port - plant lane. Same desk on WhatsApp or email.",
  },
} as const;

export const logisticsServiceIndex = [
  { id: logisticsHubCopy.container.id, index: logisticsHubCopy.container.index, title: logisticsHubCopy.container.title, blurb: "Port - factory - market road legs" },
  { id: logisticsHubCopy.threePl.id, index: logisticsHubCopy.threePl.index, title: logisticsHubCopy.threePl.title, blurb: "FTL execution with trip ownership" },
  { id: logisticsHubCopy.industrial.id, index: logisticsHubCopy.industrial.index, title: logisticsHubCopy.industrial.title, blurb: "Plant windows and axle reality" },
  { id: logisticsHubCopy.contract.id, index: logisticsHubCopy.contract.index, title: logisticsHubCopy.contract.title, blurb: "Reserved capacity under SLA" },
  { id: logisticsHubCopy.dedicated.id, index: logisticsHubCopy.dedicated.index, title: logisticsHubCopy.dedicated.title, blurb: "Assigned trucks on your program" },
] as const;

export const logisticsHubQuote = {
  label: "Request Transportation",
  subject: "Freight quote request",
  body: "Hi ZAFTYS,\n\nI'd like to request transportation capacity.\n\nFrom:\nTo:\nLoad type:\nTimeline:\n\n",
  bodyShort: "Hi ZAFTYS,\n\nI'd like to request transportation capacity.\n\n",
} as const;

export const logisticsContractInquiry = {
  label: "Discuss Your Contract Requirement",
  subject: "Contract logistics inquiry",
  body: "Hi ZAFTYS,\n\nI'd like to discuss a contract logistics requirement.\n\nCompany:\nCorridor / lanes:\nVolume:\nTimeline:\n\n",
} as const;

export const logisticsContainerInquiry = {
  label: "Request Container Capacity",
  subject: "Container transportation inquiry",
  body: "Hi ZAFTYS,\n\nI'd like to request container transportation capacity.\n\nOrigin:\nDestination:\nContainer type:\nTimeline:\n\n",
} as const;
