export type IndustryProduct = {
  name: string;
  note: string;
};

export type IndustryRecord = {
  slug: string;
  title: string;
  description: string;
  features: readonly string[];
  highlight: string;
  image: string;
  /** Cargo / product types this vertical covers */
  products: readonly IndustryProduct[];
  challenges: readonly string[];
  howZaftysHelps: readonly string[];
  corridors: readonly string[];
  equipment: readonly string[];
  whatsappPrefill: string;
  /** Keyword-aligned H1 (visible) */
  seoH1: string;
  seoTitle: string;
  seoDescription: string;
  faqs: readonly { question: string; answer: string }[];
  blogLinks?: readonly { label: string; path: string }[];
  /** Matching logistics service leaves for cluster linking */
  serviceLinks: readonly { label: string; path: string }[];
  /** Curated adjacent verticals (slugs) */
  relatedSlugs: readonly string[];
};

export const industries: readonly IndustryRecord[] = [
  {
    slug: "cement",
    title: "Cement & Construction",
    description:
      "Bagged cement, bulk cement on pneumatic bulkers, clinker, fly ash, and aggregates — planned around plant loading windows and silo / project TAT, not a spot rate alone.",
    features: ["Bulker for loose cement & fly ash", "Tipper / open body for bagged & aggregates", "Plant-window & detention language"],
    highlight: "Plant windows · bulker & tipper",
    image: "/images/marketing/industry-cement.jpg",
    products: [
      { name: "Bagged cement", note: "Open body / tipper timed to plant free-time" },
      { name: "Bulk cement", note: "Pneumatic bulker to RMC and dealer silos" },
      { name: "Clinker", note: "Works-to-grinding and inter-unit feed" },
      { name: "Fly ash", note: "Thermal plant to cement / brick / RMC consumers" },
      { name: "Aggregates", note: "Quarry and crusher to project sites" },
    ],
    challenges: [
      "Bulk cement and fly ash need pneumatic bulkers — not a generic open truck — and silo-ready unloading at RMC or dealer sites.",
      "Plant free-time is short. Queues, weighbridge slips, and full silos turn into detention that eats the freight margin.",
      "Bagged cement, clinker, and aggregates need tipper or open-body capacity timed to the same desk that runs bulk lanes.",
      "Multi-site projects fail when every indent is a new broker hunt instead of reserved corridor capacity.",
    ],
    howZaftysHelps: [
      "Own open-body and tipper capacity for bagged cement and aggregates; bulker / sealed classes via labeled network when the cargo demands it.",
      "Dispatch planned around plant and project windows — gate-in language, loading bay timing, and trip close-out on one desk.",
      "Contract or dedicated programs on repeat plant-to-dealer and plant-to-project corridors so Monday’s indent is not a spot scramble.",
      "When a window needs more wheels than we own, Tranzfort overflow is labeled clearly — never sold as company fleet.",
      "Contracted trips can report through ZAFTYS TMS so the plant is not chasing WhatsApp for POD.",
    ],
    corridors: [
      "Plant-to-RMC, plant-to-dealer, and plant-to-project lanes for bagged and bulk cement.",
      "Clinker and grinding-unit feed between works and consumption hubs.",
      "Fly ash from thermal plants to cement works and brick / RMC consumers where the program fits.",
      "Aggregates and construction solids to infrastructure and building sites.",
    ],
    equipment: [
      "Pneumatic bulker for loose cement and dry fly ash",
      "30T / 35T open body and tipper for bagged cement and aggregates",
      "Side wall / flatbed trailer where the corridor and load demand it",
      "Labeled network capacity for surge windows and specialized bulker demand",
    ],
    whatsappPrefill:
      "Hi ZAFTYS, I need a quote for cement / construction freight.\n\nPlant / origin:\nDestination:\nCargo (bagged / bulk / clinker / fly ash / aggregates):\nVolume / trips per week:\n",
    seoH1: "Cement logistics: bulker, tipper, and plant windows.",
    seoTitle: "Cement Logistics India | Bulker Tipper Plant Windows",
    seoDescription:
      "Bagged and bulk cement, clinker, fly ash, and aggregates. Plant-window dispatch, tipper and bulker classes, own fleet first with labeled network overflow.",
    faqs: [
      {
        question: "Do you move bulk cement as well as bagged?",
        answer:
          "Yes. Bagged cement and aggregates typically run on open body or tipper. Loose cement and dry fly ash need pneumatic bulker — we match the body class to the cargo and confirm own fleet or labeled network before allotment.",
      },
      {
        question: "How do you handle plant detention and loading windows?",
        answer:
          "We plan allotment around the plant’s free-time and bay reality, not only origin–destination kilometres. Detention risk sits in the desk conversation before the truck is sent.",
      },
      {
        question: "Can you cover plant-to-RMC and multi-site project lanes?",
        answer:
          "Repeat plant-to-dealer, plant-to-RMC, and plant-to-project corridors are a core fit for contract or dedicated programs so capacity is reserved instead of shopped every indent.",
      },
      {
        question: "What if one plant window needs more trucks than you own?",
        answer:
          "Verified Tranzfort partners fill the gap. Overflow is labeled on the trip — never presented as owned fleet — and contracted trips can still close through ZAFTYS.",
      },
    ],
    blogLinks: [
      { label: "Plant loading windows", path: "/blog/cement-plant-loading-windows" },
      { label: "Pneumatic bulker for bulk cement", path: "/blog/pneumatic-bulker-bulk-cement-fly-ash" },
      { label: "Open body vs tipper", path: "/blog/open-body-vs-tipper-bagged-cement-aggregates" },
      { label: "Plant detention and TAT", path: "/blog/plant-detention-tat-yard-gate-india" },
    ],
    serviceLinks: [
      { label: "Industrial Freight", path: "/logistics/industrial-freight" },
      { label: "Contract Logistics", path: "/logistics/contract-logistics" },
    ],
    relatedSlugs: ["coal-mining", "steel-metals", "industrial-logistics", "manufacturing"],
  },
  {
    slug: "coal-mining",
    title: "Mining Products",
    description:
      "Tipper and open-body programs for mining products — coal, iron ore, limestone, bauxite, manganese, chrome, concentrates, overburden, and quarry aggregates — from pit and stockyard to plant, mill, or siding.",
    features: ["Multi-mineral tipper haul", "Pit-to-plant & quarry cycles", "Weighbridge & site papers"],
    highlight: "All mining products · tipper programs",
    image: "/images/marketing/industry-coal-mining.jpg",
    products: [
      { name: "Coal", note: "Pit / siding to power, cement, and industrial boilers" },
      { name: "Iron ore", note: "Mine or stockyard to crusher, beneficiation, steel mill" },
      { name: "Limestone & dolomite", note: "Quarry to cement works and steel flux lanes" },
      { name: "Bauxite", note: "Mine to alumina / refining feed where road tipper fits" },
      { name: "Manganese & chrome ore", note: "Abrasive mineral tipper on site-ready bodies" },
      { name: "Copper / zinc concentrate", note: "Stockyard-to-plant when packaging and class match" },
      { name: "Overburden & quarry rock", note: "Short-cycle dump on active mine and quarry roads" },
      { name: "Aggregates & crushed stone", note: "Crusher to plant, project, and rail staging" },
    ],
    challenges: [
      "Mining products are abrasive and dense — tipper class, body wear, and payload must match the mineral, not a city FTL truck.",
      "Coal, iron ore, limestone, and ore concentrates share pit roads and plant gates, but each has different weighbridge, moisture, and paper rules.",
      "Power plants, cement works, steel mills, and alumina units depend on continuous feed; a missing tipper cascade stops production.",
      "Ad-hoc mining brokers often lose accountability after allotment — no clear POD, no weighbridge trail, no escalation desk across product types.",
    ],
    howZaftysHelps: [
      "One mining desk for the product mix — coal, ore, limestone, bauxite, overburden, and aggregates — not a separate story for each mineral.",
      "Own 30T / 35T open-body and tipper capacity where we run the lane; labeled network tippers when the site needs more wheels that shift.",
      "Weighbridge, gate pass, and shift-handover language on the same Amravati desk — structured LR and trip close-out per product.",
      "Contract capacity for recurring mine-to-plant, quarry-to-works, or stockyard-to-mill lanes so peak weeks are planned, not scrambled.",
      "TMS visibility on contracted trips so the plant or mill sees status without chasing drivers.",
    ],
    corridors: [
      "Pit / quarry to stockyard short cycles on active mining leases.",
      "Mine or stockyard to power plant, cement works, steel mill, and alumina feed.",
      "Crusher and beneficiation links for ore and limestone programs.",
      "Stockyard-to-rail or road dispatch where the program is road-led.",
    ],
    equipment: [
      "Heavy-duty tippers for coal, iron ore, and abrasive minerals",
      "30T / 35T open body where the load and site allow",
      "Reinforced bodies for overburden and quarry solids",
      "Labeled network tippers for surge shifts and continuous feed windows",
    ],
    whatsappPrefill:
      "Hi ZAFTYS, I need a quote for mining product transport.\n\nOrigin (mine / quarry / stockyard):\nDestination (plant / mill / siding):\nProduct (coal / iron ore / limestone / bauxite / other):\nTrips per day / week:\n",
    seoH1: "Mining product transportation — tippers for every mineral lane.",
    seoTitle: "Mining Product Transport India | Coal Ore Limestone Tipper",
    seoDescription:
      "Mining product transport for coal, iron ore, limestone, bauxite, manganese, chrome, overburden, and aggregates. Pit-to-plant tippers, weighbridge discipline, own capacity first.",
    faqs: [
      {
        question: "Is this only coal, or all mining products?",
        answer:
          "All mining products we can run on tipper or open body — coal, iron ore, limestone, dolomite, bauxite, manganese, chrome, concentrates where class fits, overburden, and quarry aggregates. Body class follows the mineral and site rules.",
      },
      {
        question: "How do you keep continuous mine-to-plant feed moving?",
        answer:
          "Recurring programs reserve tipper capacity for the corridor. Surge beyond what we own that shift is filled through verified partners and labeled clearly — not silently mixed into “owned” counts.",
      },
      {
        question: "What about weighbridge and site documentation?",
        answer:
          "Gate passes, weighbridge trails, and trip close-out sit with the ZAFTYS desk on contracted moves so the plant or mill has one accountable party per trip — across product types.",
      },
      {
        question: "Do you cover quarry limestone as well as pit coal?",
        answer:
          "Yes. Quarry-to-cement limestone / dolomite and pit-to-plant coal or ore sit on the same mining desk with tipper programs matched to each site.",
      },
    ],
    blogLinks: [
      { label: "Tipper programs for coal and ore", path: "/blog/tipper-programs-coal-ore-limestone" },
      { label: "Planning industrial shipments", path: "/blog/planning-industrial-shipments" },
      { label: "Plant detention and TAT", path: "/blog/plant-detention-tat-yard-gate-india" },
      { label: "Axle load and GVW limits", path: "/blog/india-axle-load-gvw-limits-heavy-freight" },
    ],
    serviceLinks: [
      { label: "Industrial Freight", path: "/logistics/industrial-freight" },
      { label: "Dedicated Fleet", path: "/logistics/dedicated-fleet" },
    ],
    relatedSlugs: ["cement", "steel-metals", "industrial-logistics", "chemicals"],
  },
  {
    slug: "steel-metals",
    title: "Steel & Metals",
    description:
      "Steel coil transportation on flatbed and side-wall trailers with proper securing, plus plates, TMT, billets, and structurals — mill windows, weighbridge, and axle reality.",
    features: ["Steel coil on flatbed / side wall", "Plates, TMT & structurals", "Mill window & weighbridge"],
    highlight: "Coil-ready trailers · mill timing",
    image: "/images/marketing/industry-steel-metals.jpg",
    products: [
      { name: "Steel coils", note: "Flatbed / side wall with cradles and chain securing" },
      { name: "Plates & sheets", note: "Mill-to-fabricator and stockyard legs" },
      { name: "TMT & bars", note: "Open body where lengths and site rules fit" },
      { name: "Billets & blooms", note: "Heavy open / trailer with axle-aware payload" },
      { name: "Structurals & sections", note: "Project and dealer destinations" },
    ],
    challenges: [
      "Steel coils need the right flatbed or side-wall trailer, coil chocks / cradles, and securing — a wrong bed damages cargo and fails the weighbridge.",
      "Mill and stockyard dispatch windows leave little room for late vehicles or incomplete papers at the gate.",
      "Axle limits and GVW surprises turn a cheap spot truck into a refused load or a fine on the corridor.",
      "Plates, TMT, billets, and long structurals need different loading patterns than coils — one “steel truck” story does not fit all.",
    ],
    howZaftysHelps: [
      "Own side-wall and 40 ft flatbed trailers for coil and long-product programs; open body where lengths and site rules fit.",
      "Coil moves planned with securing and weighbridge language before the truck is allotted — not after it arrives at the mill.",
      "Repeat mill-to-fabricator, mill-to-warehouse, and stockyard lanes under contract or dedicated capacity so the class stays locked.",
      "Labeled network trailers when a mill program needs more coil capacity than we own that day.",
      "TMS on contracted trips for status and e-POD so procurement is not chasing WhatsApp after dispatch.",
    ],
    corridors: [
      "Mill-to-fabricator and mill-to-stockyard / warehouse for coils and plates.",
      "TMT, billets, and structural steel to project and dealer destinations.",
      "Port / ICD inbound coils and finished steel on road legs we execute.",
      "Plant construction and project steel delivery with axle-aware routing.",
    ],
    equipment: [
      "Side wall trailer and 40 ft flat bed for steel coils and plates",
      "Multi-axle trailer combinations for heavy coil payloads",
      "Open body for TMT, billets, and long structurals where appropriate",
      "Labeled network flatbed / trailer overflow for mill surge",
    ],
    whatsappPrefill:
      "Hi ZAFTYS, I need a quote for steel / coil freight.\n\nOrigin (mill / stockyard / port):\nDestination:\nCargo (coils / plates / TMT / billets / structurals):\nWeight / pieces:\n",
    seoH1: "Steel coil transportation with flatbed discipline.",
    seoTitle: "Steel Coil Transport India | Flatbed Trailer Logistics",
    seoDescription:
      "Steel coil, plate, TMT, and structural transport on flatbed and side-wall trailers. Mill windows, weighbridge and axle discipline, own fleet first.",
    faqs: [
      {
        question: "Do you specialize in steel coil transportation?",
        answer:
          "Yes. Coils are a primary steel load type for us — flatbed or side-wall trailer, proper securing, and weighbridge / axle checks before the truck leaves the mill or stockyard.",
      },
      {
        question: "What other steel products do you move?",
        answer:
          "Plates, TMT, billets, sections, and project structurals. Body class follows the cargo — coil bed vs open lengths — not a one-size steel truck.",
      },
      {
        question: "How do you handle mill dispatch windows?",
        answer:
          "Allotment is timed to mill and stockyard windows. Papers and vehicle class are confirmed before gate-in so the bay is not waiting on the wrong trailer.",
      },
      {
        question: "Can you support port or ICD coil inbound?",
        answer:
          "Road legs for inbound coils and finished steel from port / ICD to plant or warehouse are in scope when the corridor and trailer class fit.",
      },
    ],
    blogLinks: [
      { label: "Coil transport basics", path: "/blog/steel-coil-transport-basics" },
      { label: "Mill gate papers for coil", path: "/blog/mill-gate-papers-coil-dispatch" },
      { label: "Axle load and GVW limits", path: "/blog/india-axle-load-gvw-limits-heavy-freight" },
      { label: "Plant detention and TAT", path: "/blog/plant-detention-tat-yard-gate-india" },
    ],
    serviceLinks: [
      { label: "Industrial Freight", path: "/logistics/industrial-freight" },
      { label: "3PL Transportation", path: "/logistics/3pl-transportation" },
    ],
    relatedSlugs: ["coal-mining", "cement", "container-transport", "industrial-logistics"],
  },
  {
    slug: "container-transport",
    title: "Port & Container Road",
    description:
      "Container movement by road — port to city, city to port, port to factory, and ICD / CFS legs — sealed trailers timed to plant and port windows, not demurrage roulette.",
    features: ["Port ↔ city / factory road legs", "32 ft & 40 ft container trailers", "Plant & port window dispatch"],
    highlight: "Port ↔ city · sealed road legs",
    image: "/images/marketing/industry-container.jpg",
    products: [
      { name: "Port to factory / warehouse", note: "Inbound containers off the berth to the bay" },
      { name: "Factory / city to port", note: "Export boxes timed to cut-off and plant load" },
      { name: "Port to city / market", note: "Sealed FTL into inland consumption hubs" },
      { name: "ICD / CFS road legs", note: "Inland container depot and CFS transfers" },
      { name: "Empty / loaded trailer moves", note: "Where the corridor and chassis program fit" },
    ],
    challenges: [
      "Port–city and city–port road legs fail when CHA, transporter, and plant each own a slice of the trip while demurrage clocks run.",
      "Wrong trailer class (32 ft domestic vs 40 ft EXIM) or late gate-in burns free time at port and plant.",
      "Factory loading windows and port cut-offs do not wait for a broker who is still hunting a chassis.",
      "Empty trailer wait and unclear POD leave importers and exporters without one accountable road desk.",
    ],
    howZaftysHelps: [
      "Road execution between port, CFS/ICD, factory, warehouse, and city markets on one Amravati desk.",
      "Own 32 ft container SXL / MXL where we run the lane; 40 ft and surge chassis via labeled network when needed.",
      "Dispatch planned around plant slots and port / CFS windows — gate-in language before the trailer is sent.",
      "Contract or dedicated container programs on repeat port–plant corridors so Monday is not a spot scramble.",
      "TMS on contracted container moves so status is not a WhatsApp chase between port and factory.",
    ],
    corridors: [
      "Port to factory and port to warehouse for inbound containers.",
      "Factory and city to port for export-bound boxes.",
      "Port to city / inland market sealed FTL.",
      "ICD and CFS road transfers on programs we scope.",
    ],
    equipment: [
      "32 ft container SXL / MXL — domestic FTL workhorse",
      "20–24 ft sealed for lighter regional legs",
      "40 ft / 40 HC chassis for EXIM ISO where available",
      "Labeled network trailer overflow for yard surge days",
    ],
    whatsappPrefill:
      "Hi ZAFTYS, I need a quote for container road transport.\n\nPort / ICD / origin:\nFactory / city / destination:\nDirection (port→city / city→port):\nContainer size (20 / 32 / 40):\nTrips per week:\n",
    seoH1: "Port to city and city to port — container road transport.",
    seoTitle: "Container Transport India | Port to City Road Haulage",
    seoDescription:
      "Container transportation by road: port to city, city to port, port to factory, and ICD/CFS legs. 32 ft and 40 ft trailers, plant and port windows, own fleet first.",
    faqs: [
      {
        question: "Do you move containers port to city and city to port?",
        answer:
          "Yes. That is the core of this desk — inbound port-to-factory / warehouse / city and outbound factory / city-to-port road legs, plus ICD and CFS transfers where scoped.",
      },
      {
        question: "Which container sizes do you run?",
        answer:
          "32 ft SXL / MXL is our domestic FTL backbone. 20–24 ft for lighter regional sealed legs. 40 ft / 40 HC for EXIM ISO where we have the chassis — own fleet first, labeled network when the yard needs more.",
      },
      {
        question: "How do you handle port free time and plant windows?",
        answer:
          "Allotment is planned around port / CFS gate rules and factory slots before the trailer is sent. Demurrage risk is a desk conversation, not a surprise at the gate.",
      },
      {
        question: "Is this the same as your Container Transportation service?",
        answer:
          "Same road execution. This industry page is the port–city / EXIM vertical desk; the full service detail lives under Transportation → Container Transportation.",
      },
    ],
    blogLinks: [
      { label: "Container trucking deep research", path: "/blog/container-trucking-logistics-india" },
      { label: "32 ft vs 40 ft sealed capacity", path: "/blog/32ft-vs-40ft-sealed-container-india" },
      { label: "Port vs plant free time", path: "/blog/port-free-time-vs-plant-free-time-containers" },
      { label: "Empty return trips", path: "/blog/reduce-empty-return-trips" },
    ],
    serviceLinks: [
      { label: "Container Transportation", path: "/logistics/container-transportation" },
      { label: "3PL Transportation", path: "/logistics/3pl-transportation" },
    ],
    relatedSlugs: ["manufacturing", "fmcg", "industrial-logistics", "steel-metals"],
  },
  {
    slug: "chemicals",
    title: "Chemicals",
    description:
      "Industrial chemicals and bulk liquids with the right tanker or closed body, wash and document discipline, and an accountable desk — not informal spot tankers at the gate.",
    features: ["Tanker & packaged programs", "Wash / docs before allotment", "Structured LR & ePOD"],
    highlight: "Tanker discipline · papers first",
    image: "/images/marketing/industry-chemicals.jpg",
    products: [
      { name: "Bulk liquids", note: "Tanker class matched to product and wash rules" },
      { name: "Packaged chemicals", note: "Closed / covered body with sealed handover" },
      { name: "Solvents & intermediates", note: "Plant-to-plant on industrial belts" },
      { name: "Process chemicals", note: "Repeat FTL to manufacturing and processing sites" },
      { name: "Lubricants & oils", note: "Where tanker or drum programs fit scope" },
    ],
    challenges: [
      "Wrong tanker or dirty tank turns a cheap rate into a rejected load, a wash claim, or a compliance incident.",
      "MSDS, permits, and gate papers vary by cargo class — informal brokers often arrive without them.",
      "Plant free-time on chemical bays is short; late or undocumented tankers create detention and line stoppage.",
      "Consignors need one accountable party for LR, POD, and escalation — not a rotating WhatsApp chain.",
    ],
    howZaftysHelps: [
      "Tanker and packaged programs scoped honestly during consultation — we confirm class, wash, and corridor before allotment.",
      "Own fleet where the body fits; labeled network tankers when the program needs more capacity that week.",
      "Structured LR, proof of delivery, and desk communication through ZAFTYS operations — not informal spot-only coordination.",
      "Contract lanes on repeat plant-to-plant chemical belts so the vehicle class stays locked.",
      "TMS visibility on contracted trips so plant teams are not chasing drivers for status.",
    ],
    corridors: [
      "Plant-to-plant chemical movement on industrial belts.",
      "Bulk liquid delivery to manufacturing and processing sites.",
      "Packaged chemical distribution on repeat FTL lanes.",
      "Inbound intermediates to formulation and blending units where scoped.",
    ],
    equipment: [
      "Tanker assets where program scope and product allow",
      "Closed and covered body for packaged chemical cargo",
      "Wash / cleanliness confirmation before loading where required",
      "Labeled network tanker overflow for surge indents",
    ],
    whatsappPrefill:
      "Hi ZAFTYS, I need a quote for chemical freight.\n\nOrigin (plant):\nDestination:\nProduct / packaging (bulk tanker / drums / packaged):\nTrips per week:\n",
    seoH1: "Chemical freight with tanker class and papers in order.",
    seoTitle: "Chemical Logistics India | Tanker & Packaged Transport",
    seoDescription:
      "Industrial chemical and bulk liquid transport with tanker or closed-body class, wash and document discipline, own fleet first and labeled network overflow.",
    faqs: [
      {
        question: "What chemical freight can ZAFTYS support?",
        answer:
          "Industrial chemicals and bulk liquids where tanker or packaged handling fits the program. We scope product, wash, and corridor honestly before allotment — we do not claim every haz class by default.",
      },
      {
        question: "How is compliance and documentation handled?",
        answer:
          "Papers, LR, and POD sit with the ZAFTYS desk on contracted moves. Route and documentation expectations are confirmed with the cargo class, not after the tanker reaches the gate.",
      },
      {
        question: "Do you own chemical tankers?",
        answer:
          "Where we have the class, we run company assets. Specialized or surge tanker demand uses verified partners and is labeled as network capacity — never silently sold as owned fleet.",
      },
      {
        question: "Can we see shipment status without calling dispatch?",
        answer:
          "Active contracted shipments can be monitored through ZAFTYS TMS so operations teams spend less time on status follow-ups.",
      },
    ],
    blogLinks: [
      { label: "Chemical tanker wash and MSDS", path: "/blog/chemical-tanker-freight-wash-msds" },
      { label: "Planning industrial shipments", path: "/blog/planning-industrial-shipments" },
      { label: "Plant detention and TAT", path: "/blog/plant-detention-tat-yard-gate-india" },
      { label: "ePOD and e-Way Bill billing", path: "/blog/epod-fastag-eway-bill-billing-india" },
    ],
    serviceLinks: [
      { label: "Industrial Freight", path: "/logistics/industrial-freight" },
      { label: "Contract Logistics", path: "/logistics/contract-logistics" },
    ],
    relatedSlugs: ["manufacturing", "industrial-logistics", "cement", "fmcg"],
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    description:
      "Production-linked inbound and outbound FTL — raw materials in, finished goods out, inter-plant WIP — timed to shift gates and line schedules, not a generic truck hunt.",
    features: ["Production-window dispatch", "Inbound + outbound + WIP", "TMS on contracted trips"],
    highlight: "Shift gates · line-linked FTL",
    image: "/images/marketing/industry-manufacturing.jpg",
    products: [
      { name: "Inbound raw materials", note: "Supplier-to-plant timed to shift and bay" },
      { name: "Finished goods outbound", note: "Plant-to-warehouse and plant-to-customer" },
      { name: "Inter-plant WIP", note: "Transfers across multi-plant networks" },
      { name: "Packaging & components", note: "Closed or open body by SKU profile" },
      { name: "Peak / model-change surge", note: "Labeled network when own fleet is short" },
    ],
    challenges: [
      "Inbound misses a shift gate and the line waits — freight cost is secondary to lost production hours.",
      "Outbound finished goods and dealer pushes pile up when vehicles are shopped the morning of indent.",
      "Multi-plant networks create different gate rules, body preferences, and SLA clocks on every site.",
      "Peak weeks and model changes blow past internal fleet; ad-hoc carriers lose ePOD and escalation discipline.",
    ],
    howZaftysHelps: [
      "Dedicated and contract FTL on repeat supplier-to-plant and plant-to-DC corridors with shift-window language.",
      "Own open and closed body where the SKU fits; labeled Tranzfort overflow for peak and model-change weeks.",
      "One Amravati desk across plants so indents are not a new broker hunt per site.",
      "TMS trip status, documentation, and ePOD so production and logistics share one record.",
      "Honest split: manufacturing pages sell production windows — heavy tipper / coil / bulker verticals stay on their own desks.",
    ],
    corridors: [
      "Supplier-to-plant inbound on industrial corridors.",
      "Plant-to-warehouse and plant-to-customer outbound lanes.",
      "Inter-plant transfers for WIP and finished goods.",
      "Regional dealer and DC push weeks with planned surge cover.",
    ],
    equipment: [
      "Open-body and closed body for varied SKU profiles",
      "FTL assignment for production-linked lanes",
      "Commercial LCV where DC and dealer drops fit",
      "Labeled network capacity for peak production windows",
    ],
    whatsappPrefill:
      "Hi ZAFTYS, I need a quote for manufacturing logistics.\n\nPlant / origin:\nDestination:\nFlow (inbound / outbound / inter-plant):\nFrequency / shift window:\n",
    seoH1: "Manufacturing FTL timed to production windows.",
    seoTitle: "Manufacturing Logistics India | Plant Window FTL",
    seoDescription:
      "Inbound, outbound, and inter-plant manufacturing freight timed to shift gates and line schedules. Own fleet first, labeled network overflow, ZAFTYS TMS visibility.",
    faqs: [
      {
        question: "Do you support multi-plant manufacturing networks?",
        answer:
          "Yes. Inbound supplier-to-plant and outbound plant-to-warehouse or customer lanes can run under one ZAFTYS account with site-specific gate language.",
      },
      {
        question: "How is this different from industrial logistics?",
        answer:
          "Manufacturing focuses on production-linked SKU flows and shift windows. Industrial logistics is the multi-plant account layer for mixed body classes, shutdown cargo, and contract-plus-spot programs across sites.",
      },
      {
        question: "How do you handle production peaks?",
        answer:
          "Core lanes stay on owned or dedicated trucks. Extra volume goes on Tranzfort and is labeled clearly. Listing and search are free; broker fee applies on trucker bookings.",
      },
      {
        question: "What visibility do plant teams get?",
        answer:
          "ZAFTYS TMS provides trip status, documentation, and ePOD so production and logistics teams share the same information.",
      },
    ],
    blogLinks: [
      { label: "Inter-plant WIP and shift gates", path: "/blog/inter-plant-wip-moves-shift-gate" },
      { label: "Contract vs spot for plant teams", path: "/blog/contract-logistics-vs-spot-ftl-plant-teams" },
      { label: "Plant detention and TAT", path: "/blog/plant-detention-tat-yard-gate-india" },
      { label: "ePOD that closes billing", path: "/blog/epod-that-closes-billing" },
    ],
    serviceLinks: [
      { label: "Contract Logistics", path: "/logistics/contract-logistics" },
      { label: "Dedicated Fleet", path: "/logistics/dedicated-fleet" },
    ],
    relatedSlugs: ["industrial-logistics", "fmcg", "container-transport", "steel-metals"],
  },
  {
    slug: "fmcg",
    title: "FMCG",
    description:
      "Factory-to-DC and hub replenishment with OTIF discipline, fast turnaround, and lane-level trip records — commercial FTL and LCV, not two-wheeler last mile.",
    features: ["Factory-to-DC FTL", "OTIF & ePOD", "Seasonal surge cover"],
    highlight: "OTIF · factory-to-DC lanes",
    image: "/images/marketing/industry-fmcg.jpg",
    products: [
      { name: "Factory-to-DC FTL", note: "Closed or open body by SKU and weather risk" },
      { name: "Hub replenishment", note: "Scheduled hub-to-hub on fixed windows" },
      { name: "Dealer / stockist push", note: "Regional FTL and commercial LCV" },
      { name: "Festive / seasonal surge", note: "Labeled network when own fleet is short" },
      { name: "Return / reverse where scoped", note: "Planned reverse legs — not empty promises" },
    ],
    challenges: [
      "Trade and dealer channels penalize late or undocumented deliveries — OTIF is the product, not the truck.",
      "Festive and promo peaks blow past standing capacity; last-minute brokers break ePOD and SLA trails.",
      "Lane cost is invisible without centralized trip, detention, and utilization records.",
      "Wrong body class (open vs closed) damages weather-sensitive SKUs and creates claim noise.",
    ],
    howZaftysHelps: [
      "Regional FTL and commercial LCV on repeat factory-to-DC corridors with schedule-aligned dispatch.",
      "ePOD and trip records through ZAFTYS TMS for OTIF confirmation — not WhatsApp photo chains.",
      "Core lanes on own or dedicated capacity; seasonal peaks on labeled Tranzfort overflow.",
      "Honest scope: commercial distribution lanes — not two-wheeler last mile or household shifting.",
      "One desk for indent, allotment, and exception so trade teams are not chasing multiple transporters.",
    ],
    corridors: [
      "Factory-to-DC regional movement.",
      "Hub-to-hub replenishment on scheduled lanes.",
      "Bulk SKU FTL where palletized FTL fits the network design.",
      "Dealer and stockist push weeks with planned surge cover.",
    ],
    equipment: [
      "Closed body for weather-sensitive and high-value SKUs",
      "Open body where product and corridor allow",
      "Commercial LCV for DC transfers and dealer drops",
      "Labeled network capacity for festive and promo peaks",
    ],
    whatsappPrefill:
      "Hi ZAFTYS, I need a quote for FMCG distribution.\n\nFactory / origin:\nDC / destination:\nSKU profile (closed / open):\nTrips per week / peak months:\n",
    seoH1: "FMCG factory-to-DC freight that makes OTIF.",
    seoTitle: "FMCG Logistics India | Factory-to-DC FTL & LCV",
    seoDescription:
      "Regional FMCG distribution with OTIF focus, ePOD, and lane discipline. Own fleet and commercial LCV first, labeled network for seasonal peaks.",
    faqs: [
      {
        question: "Do you run commercial LCV, or only last-mile vans?",
        answer:
          "We run commercial LCV for DC transfers, dealer drops, and packaged cargo on planned lanes. We do not do two-wheeler last mile or household shifting.",
      },
      {
        question: "How do you support OTIF goals?",
        answer:
          "Schedule-aligned dispatch, ePOD confirmation, and lane-level trip records through ZAFTYS TMS help confirm on-time, in-full performance.",
      },
      {
        question: "Can seasonal peaks be covered?",
        answer:
          "Yes. Core lanes stay reserved. Extra festive or promo volume posts on Tranzfort and is labeled as network capacity. Matching is AI-powered; trips we contract stay on GST billing.",
      },
      {
        question: "Do you run DC-to-store or store multi-drop programs?",
        answer:
          "No. We do not run DC-to-store or store multi-drop programs. FMCG here means factory-to-DC and hub replenishment on commercial FTL and LCV.",
      },
    ],
    blogLinks: [
      { label: "Factory-to-DC OTIF checklist", path: "/blog/factory-to-dc-otif-fmcg-shippers" },
      { label: "Empty return trips on FTL", path: "/blog/reduce-empty-return-trips" },
      { label: "Spot vs dedicated fleets", path: "/blog/spot-market-vs-dedicated-fleet-india" },
      { label: "ePOD that closes billing", path: "/blog/epod-that-closes-billing" },
    ],
    serviceLinks: [
      { label: "3PL Transportation", path: "/logistics/3pl-transportation" },
      { label: "Dedicated Fleet", path: "/logistics/dedicated-fleet" },
    ],
    relatedSlugs: ["manufacturing", "container-transport", "industrial-logistics", "chemicals"],
  },
  {
    slug: "industrial-logistics",
    title: "Industrial Logistics",
    description:
      "One account across plants for mixed industrial freight — contract lanes on our fleet, spot overflow on Tranzfort, shutdown and project windows, TMS on the trips we run.",
    features: ["Multi-plant account desk", "Contract + spot mix", "Shutdown & project windows"],
    highlight: "One desk · mixed plant freight",
    image: "/images/marketing/industry-industrial-logistics.jpg",
    products: [
      { name: "Multi-plant contract lanes", note: "Standing FTL across industrial belts" },
      { name: "Spot & surge overflow", note: "Labeled Tranzfort when plants need extra wheels" },
      { name: "Shutdown / turnaround cargo", note: "Windowed heavy and packaged moves" },
      { name: "Project & construction feeds", note: "Site deliveries with axle-aware routing" },
      { name: "Mixed body programs", note: "Tipper, open, flatbed, tanker, LCV under one desk" },
    ],
    challenges: [
      "Nationwide industrial shippers juggle contract lanes, spot demand, and multiple plants with different gate rules.",
      "Fragmented transporters multiply admin, GST noise, and blind spots when something fails on the road.",
      "Shutdown and project windows need reserved capacity — not a broker scramble the week of outage.",
      "Manufacturing SKU pages and heavy vertical pages do not replace an account layer that mixes body classes across sites.",
    ],
    howZaftysHelps: [
      "Enterprise-style account coordination: one commercial relationship, many plants, mixed body classes.",
      "Contracted core lanes on company trucks; spot and extra capacity on Tranzfort — labeled, never blended into owned counts.",
      "Shutdown, turnaround, and project windows planned with the desk before the outage week.",
      "TMS as the operational layer for dispatch, documentation, and client visibility across plants.",
      "Clear split from Manufacturing: this page is the multi-plant mixed-freight account; manufacturing is production-window SKU FTL.",
    ],
    corridors: [
      "Multi-plant inbound and outbound across industrial belts.",
      "Project and shutdown cargo on scheduled windows.",
      "Nationwide spot and contract mix on repeat and ad-hoc lanes.",
      "Cross-vertical feeds (e.g. plant materials + packaged outbound) under one account.",
    ],
    equipment: [
      "Asset mix aligned during program design: LCV, tipper, open, flatbed, tanker",
      "Dedicated fleet where contracts warrant",
      "Tranzfort for extra trucks on the day",
      "TMS close-out on every contracted trip",
    ],
    whatsappPrefill:
      "Hi ZAFTYS, I need a quote for industrial logistics.\n\nPlants involved:\nCorridor / lanes:\nCargo mix / body classes:\nContract vs spot split:\n",
    seoH1: "Industrial logistics — one desk across plants.",
    seoTitle: "Industrial Logistics India | Multi-Plant Freight Programs",
    seoDescription:
      "Multi-plant industrial freight with contract lanes, labeled spot overflow, shutdown windows, and ZAFTYS TMS. Own fleet first across mixed body classes.",
    faqs: [
      {
        question: "How is this different from manufacturing logistics?",
        answer:
          "Manufacturing focuses on production-linked inbound/outbound SKU flows and shift windows. Industrial logistics is the multi-plant account for mixed body classes, contract-plus-spot mix, and shutdown / project cargo.",
      },
      {
        question: "Can ZAFTYS manage contract and spot together?",
        answer:
          "Yes. Contracted lanes on company trucks. Spot and extra capacity on Tranzfort. GST billing on trips we run. Overflow is always labeled.",
      },
      {
        question: "What visibility do multi-plant teams get?",
        answer:
          "ZAFTYS TMS is the operational layer for dispatch, documentation, and client visibility across plants and lanes.",
      },
      {
        question: "How do you reduce transporter fragmentation?",
        answer:
          "One commercial relationship with ZAFTYS replaces juggling multiple informal carriers for core and surge volume across sites.",
      },
    ],
    blogLinks: [
      { label: "Shutdown and turnaround freight", path: "/blog/shutdown-turnaround-freight-capacity" },
      { label: "Contract vs spot for plant teams", path: "/blog/contract-logistics-vs-spot-ftl-plant-teams" },
      { label: "Planning industrial shipments", path: "/blog/planning-industrial-shipments" },
      { label: "Labeled network capacity", path: "/blog/labeled-network-capacity-live-trip" },
    ],
    serviceLinks: [
      { label: "Contract Logistics", path: "/logistics/contract-logistics" },
      { label: "Industrial Freight", path: "/logistics/industrial-freight" },
    ],
    relatedSlugs: ["manufacturing", "cement", "steel-metals", "container-transport"],
  },
] as const;

/** Legacy industry slug redirects (retail vertical removed — not in scope) */
export const INDUSTRY_SLUG_ALIASES: Record<string, string> = {
  mining: "coal-mining",
  retail: "fmcg",
  "retail-distribution": "fmcg",
};

export function getIndustryBySlug(slug: string): IndustryRecord | undefined {
  const resolved = INDUSTRY_SLUG_ALIASES[slug] ?? slug;
  return industries.find((i) => i.slug === resolved);
}

export function getRelatedIndustries(industry: IndustryRecord): IndustryRecord[] {
  return industry.relatedSlugs
    .map((slug) => getIndustryBySlug(slug))
    .filter((item): item is IndustryRecord => Boolean(item));
}

export function industryHubCards(): Pick<
  IndustryRecord,
  "slug" | "title" | "description" | "features" | "highlight" | "image"
>[] {
  return industries.map(({ slug, title, description, features, highlight, image }) => ({
    slug,
    title,
    description,
    features,
    highlight,
    image,
  }));
}

export function industryHubCardsOrdered(
  order: readonly string[],
): ReturnType<typeof industryHubCards> {
  const cards = industryHubCards();
  return order
    .map((slug) => cards.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
}
