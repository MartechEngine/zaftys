export type IndustryRecord = {
  slug: string;
  title: string;
  description: string;
  features: readonly string[];
  highlight: string;
  image: string;
  heroHeadline: string;
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
};

export const industries: readonly IndustryRecord[] = [
  {
    slug: "cement",
    title: "Cement & Construction",
    description:
      "Bulker and tipper work for cement, clinker, and aggregates. Plant windows, detention, and payload discipline on repeat corridors.",
    features: ["Tipper and bulk carriers", "Plant window coordination", "Multi-site dispatch"],
    highlight: "Bulk volume & detention control",
    image: "/images/marketing/industry-cement.jpg",
    heroHeadline: "Plant Windows And Bulk Volume Need Disciplined Dispatch.",
    challenges: [
      "Loading queues and detention at plants can disrupt downstream project schedules.",
      "Bulk cement and aggregates require matched tipper assets and payload discipline.",
      "Multi-site projects need coordinated dispatch without fragmented transporter calls.",
    ],
    howZaftysHelps: [
      "Company-operated tipper and bulk fleet on repeat cement corridors.",
      "Post on TranZfort when a plant window needs more trucks than we have that day.",
      "Shipment visibility through ZAFTYS TMS on contracted trips.",
    ],
    corridors: [
      "Plant-to-project and plant-to-dealer lanes across Maharashtra, Gujarat, and central India.",
      "Clinker and cement movement between grinding units and consumption hubs.",
      "Aggregates supply to infrastructure and construction sites.",
    ],
    equipment: ["16-35T tippers and bulk carriers", "Open-body for bagged and loose bulk", "Multi-axle for heavy project loads"],
    whatsappPrefill:
      "Hi ZAFTYS, I need a quote for Cement & Construction freight. Corridor:  Load type:  Volume:",
    seoH1: "Cement and clinker that hit the plant window.",
    seoTitle: "Cement Logistics | Bulker and Tipper",
    seoDescription:
      "Cement, clinker, and aggregates on tipper and bulker trucks. Own fleet, TranZfort marketplace, and ZAFTYS TMS.",
    faqs: [
      {
        question: "What cement freight does ZAFTYS handle?",
        answer:
          "Bagged and bulk cement, clinker, and aggregates on plant-to-project and plant-to-dealer lanes, with tipper and bulk assets matched to loading windows.",
      },
      {
        question: "How do you reduce detention at cement plants?",
        answer:
          "We plan around plant windows and assign suitable tipper capacity. If the window needs more trucks, post on TranZfort. Listing is free.",
      },
      {
        question: "Can I track cement shipments?",
        answer:
          "Yes. Active lanes use ZAFTYS TMS for shipment visibility, documentation, and proof of delivery without chasing multiple transporters.",
      },
    ],
  },
  {
    slug: "coal-mining",
    title: "Coal & Mining",
    description:
      "Tipper and bulker work from pit to plant. Tough terrain, site gates, and continuous dispatch cycles for coal, ore, and aggregates.",
    features: ["Heavy-duty tippers", "DGMS-aware operations", "24/7 site coverage"],
    highlight: "Mining corridor expertise",
    image: "/images/services/materials/mining.jpg",
    heroHeadline: "Mine-To-Plant Freight Demands Rugged Assets And Site Discipline.",
    challenges: [
      "Pit roads and variable terrain require heavy-duty tippers and experienced operators.",
      "Continuous dispatch cycles need reliable capacity without ad-hoc carrier gaps.",
      "Site documentation and safety expectations must stay consistent across shifts.",
    ],
    howZaftysHelps: [
      "Heavy-duty tipper programs aligned to mining and raw-material corridors.",
      "Site papers and shift handover through the ZAFTYS desk.",
      "Post on TranZfort when the site needs more tippers. Search is free. ZAFTYS bills trips we contract.",
    ],
    corridors: [
      "Coal and ore movement from mines to power plants and processing units.",
      "Overburden and aggregate haul on active mining routes.",
      "Pit-to-stockyard and mill-feed lanes across eastern and central India.",
    ],
    equipment: ["35T+ heavy-duty tippers", "Reinforced bodies for abrasive loads", "Site-ready dispatch windows"],
    whatsappPrefill:
      "Hi ZAFTYS, I need a quote for Coal & Mining freight. Corridor:  Load type:  Volume:",
    seoH1: "Pit-to-plant freight for coal and ore.",
    seoTitle: "Coal and Mining Logistics | Tipper",
    seoDescription:
      "Pit-to-plant and mine-to-mill freight with site discipline. Company fleet and verified TranZfort capacity through ZAFTYS.",
    faqs: [
      {
        question: "Do you run pit-to-plant tipper programs?",
        answer:
          "Yes. Heavy-duty tipper programs support coal, ore, and aggregate movement on rugged mining corridors with continuous dispatch cycles.",
      },
      {
        question: "What happens when mining demand exceeds owned fleet?",
        answer:
          "Post the extra loads on TranZfort. Matching is AI-powered. Trips contracted through ZAFTYS stay on GST billing.",
      },
      {
        question: "Is site documentation handled consistently?",
        answer:
          "Structured LR, trip records, and handover discipline are part of the ZAFTYS operating model across shifts and sites.",
      },
    ],
  },
  {
    slug: "steel-metals",
    title: "Steel & Metals",
    description:
      "Heavy-load work for coils, plates, billets, and structurals. Weighbridge, axle limits, and mill windows on repeat lanes.",
    features: ["Flatbed and low-bed assets", "Weighbridge coordination", "Corridor predictability"],
    highlight: "Heavy haul & mill timing",
    image: "/images/marketing/industry-steel-metals.jpg",
    heroHeadline: "Steel Moves Need Axle Discipline And Mill-Window Precision.",
    challenges: [
      "Coils and plates require secure strapping, correct bed type, and weighbridge compliance.",
      "Mill dispatch windows leave little room for late vehicles or documentation gaps.",
      "Heavy structural loads demand low-bed assets and route planning for axle limits.",
    ],
    howZaftysHelps: [
      "Flatbed and low-bed fleet matched to coil, plate, and structural programs.",
      "Repeat lane discipline with structured LR, ePOD, and client visibility via TMS.",
      "TranZfort when a mill program needs more trucks than we have that day.",
    ],
    corridors: [
      "Mill-to-fabricator and mill-to-warehouse lanes on industrial corridors.",
      "Port and ICD movement for imported coils and finished steel.",
      "Project steel delivery for infrastructure and plant construction.",
    ],
    equipment: ["Flatbed and low-bed trailers", "Multi-axle for heavy coils", "Open-body for lengths and structurals"],
    whatsappPrefill:
      "Hi ZAFTYS, I need a quote for Steel & Metals freight. Corridor:  Load type:  Weight:",
    seoH1: "Coils and plates with axle discipline.",
    seoTitle: "Steel Logistics | Coil and Heavy Load",
    seoDescription:
      "Secure heavy load for coils, plates, and structural steel with weighbridge discipline. Own fleet, TranZfort, and ZAFTYS TMS.",
    faqs: [
      {
        question: "Can ZAFTYS move steel coils and plates?",
        answer:
          "Yes. Flatbed and low-bed programs cover coils, plates, billets, and structural loads with strapping and weighbridge discipline.",
      },
      {
        question: "How do you handle mill dispatch windows?",
        answer:
          "Repeat lane planning, documented trips, and ZAFTYS TMS visibility help keep mill timing and exception communication structured.",
      },
      {
        question: "Do you cover port and ICD steel movement?",
        answer:
          "We plan mill-to-fabricator, warehouse, and port/ICD lanes on industrial corridors as part of steel programs.",
      },
    ],
  },
  {
    slug: "chemicals",
    title: "Chemicals",
    description:
      "Compliance-focused transport for industrial chemicals and bulk liquids with documentation discipline and structured handover.",
    features: ["Tanker programs", "Haz-route awareness", "Structured LR & POD"],
    highlight: "Compliance & reliability",
    image: "/images/marketing/industry-chemicals.jpg",
    heroHeadline: "Chemical Freight Requires Documentation Discipline, Not Shortcuts.",
    challenges: [
      "Bulk liquids and industrial chemicals need appropriate tanker or packaged handling.",
      "Route and documentation expectations vary by cargo class and corridor.",
      "Consignors need an accountable desk, not informal spot carriers.",
    ],
    howZaftysHelps: [
      "Tanker and packaged programs scoped during consultation. Honest capability matching.",
      "Structured LR, proof of delivery, and communication through ZAFTYS operations.",
      "Visibility on active shipments without repeated dispatch follow-up calls.",
    ],
    corridors: [
      "Plant-to-plant chemical movement on industrial belts.",
      "Bulk liquid delivery to manufacturing and processing sites.",
      "Packaged chemical distribution on repeat FTL lanes.",
    ],
    equipment: ["Tanker assets where program scope allows", "Closed and covered body for packaged cargo", "Documented trip lifecycle via TMS"],
    whatsappPrefill:
      "Hi ZAFTYS, I need a quote for Chemicals freight. Corridor:  Load type:  Packaging:",
    seoH1: "Tanker freight with the papers in order.",
    seoTitle: "Chemical Logistics | Tanker Transport",
    seoDescription:
      "Compliance-focused chemical and bulk liquid transport with structured documentation and ZAFTYS TMS visibility.",
    faqs: [
      {
        question: "What chemical freight can ZAFTYS support?",
        answer:
          "Industrial chemicals and bulk liquids where tanker or packaged handling fits the program. Scoped honestly during consultation.",
      },
      {
        question: "How is compliance handled?",
        answer:
          "Documentation discipline, structured LR and POD, and accountable handover through ZAFTYS. Not informal spot-only coordination.",
      },
      {
        question: "Can we see shipment status without calling dispatch?",
        answer:
          "Active shipments can be monitored through ZAFTYS TMS so operations teams spend less time on status follow-ups.",
      },
    ],
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    description:
      "Multi-plant inbound and outbound flows with tight production windows, gate coordination, and SLA-driven dispatch.",
    features: ["Plant-to-plant lanes", "SLA-driven dispatch", "TranZfort marketplace"],
    highlight: "Production window discipline",
    image: "/images/marketing/industry-manufacturing.jpg",
    heroHeadline: "Production Schedules Depend On Predictable Inbound And Outbound Freight.",
    challenges: [
      "Inbound raw materials and outbound finished goods must align with shift and gate windows.",
      "Multi-plant networks create routing complexity across regions.",
      "Peak periods strain internal logistics teams and ad-hoc carrier sourcing.",
    ],
    howZaftysHelps: [
      "Dedicated and spot FTL programs with dispatch discipline on repeat lanes.",
      "TranZfort for peak weeks. Listing and search are free. Broker fee on trucker bookings.",
      "TMS gives operations teams shipment status without manual follow-up.",
    ],
    corridors: [
      "Supplier-to-plant inbound on industrial corridors.",
      "Plant-to-warehouse and plant-to-customer outbound lanes.",
      "Inter-plant transfers for WIP and finished goods.",
    ],
    equipment: ["Open-body and closed body for varied SKU profiles", "FTL assignment for production-linked lanes", "Multi-stop routing where programs require"],
    whatsappPrefill:
      "Hi ZAFTYS, I need a quote for Manufacturing logistics. Corridor:  Load type:  Frequency:",
    seoH1: "Plant-to-plant FTL on production windows.",
    seoTitle: "Manufacturing Logistics | Plant-to-Plant FTL",
    seoDescription:
      "Inbound and outbound manufacturing freight with production-window discipline. Own fleet, TranZfort, and ZAFTYS TMS.",
    faqs: [
      {
        question: "Do you support multi-plant manufacturing networks?",
        answer:
          "Yes. Inbound supplier-to-plant and outbound plant-to-warehouse or customer lanes can run under one ZAFTYS account.",
      },
      {
        question: "How do you handle production peaks?",
        answer:
          "Core lanes stay on owned or dedicated trucks. Extra volume can go on TranZfort. Listing and search are free. We charge a broker fee to truckers on booked loads.",
      },
      {
        question: "What visibility do plant teams get?",
        answer:
          "ZAFTYS TMS provides trip status, documentation, and ePOD so production and logistics teams share the same information.",
      },
    ],
  },
  {
    slug: "fmcg",
    title: "FMCG",
    description:
      "Regional distribution with OTIF focus, fast turnaround, and lane-level cost control on repeat corridors.",
    features: ["Regional FTL", "Fast turnaround", "Live visibility"],
    highlight: "OTIF & cost per lane",
    image: "/images/marketing/industry-fmcg.jpg",
    heroHeadline: "FMCG Lanes Live Or Die On OTIF And Turnaround Time.",
    challenges: [
      "Regional DC programs need consistent vehicles and predictable dispatch.",
      "Retail and trade channels penalize late or undocumented deliveries.",
      "Lane cost visibility is hard without centralized trip and utilization data.",
    ],
    howZaftysHelps: [
      "Regional FTL and commercial LCV on repeat factory-to-DC corridors.",
      "e-POD and trip records through ZAFTYS TMS for OTIF confirmation.",
      "TranZfort for seasonal peaks. Listing and search are free. Broker fee on trucker bookings.",
    ],
    corridors: [
      "Factory-to-DC regional movement.",
      "Hub-to-hub replenishment on scheduled lanes.",
      "Bulk SKU FTL where palletized FTL fits the network design.",
    ],
    equipment: ["Closed body and open-body by SKU profile", "FTL for DC-bound loads", "Schedule-aligned dispatch windows"],
    whatsappPrefill:
      "Hi ZAFTYS, I need a quote for FMCG distribution. Corridor:  Load type:  Frequency:",
    seoH1: "Factory-to-DC freight that makes OTIF.",
    seoTitle: "FMCG Logistics | Regional FTL and LCV",
    seoDescription:
      "Regional FMCG distribution with OTIF focus and lane discipline. ZAFTYS fleet, TranZfort capacity, and TMS tracking.",
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
          "Yes. Post seasonal loads on TranZfort. Matching is AI-powered. Trips we contract stay on GST billing.",
      },
    ],
  },
  {
    slug: "retail-distribution",
    title: "Retail Distribution",
    description:
      "DC-to-store and hub distribution with schedule discipline, multi-drop routing, and ePOD confirmation.",
    features: ["Multi-drop routing", "Schedule adherence", "ePOD confirmation"],
    highlight: "OTIF to DC and store",
    image: "/images/marketing/industry-retail.jpg",
    heroHeadline: "Store And DC Programs Need Schedule Discipline And Proof Of Delivery.",
    challenges: [
      "Multi-drop routes require sequencing and adherence to delivery windows.",
      "Retail partners expect documented OTIF and exception communication.",
      "Ad-hoc carrier mix makes cost and performance hard to manage.",
    ],
    howZaftysHelps: [
      "Structured FTL and multi-stop programs scoped to your network design.",
      "Digital proof of delivery and trip records through ZAFTYS TMS.",
      "Single desk for core lanes. TranZfort when a DC program needs more trucks that week.",
    ],
    corridors: [
      "DC-to-store regional distribution.",
      "Hub-to-hub transfer between fulfillment centers.",
      "Supplier-to-DC inbound on contracted lanes.",
    ],
    equipment: ["Closed body for packaged retail freight", "Multi-drop capable assets where scoped", "ePOD-enabled trip completion"],
    whatsappPrefill:
      "Hi ZAFTYS, I need a quote for Retail Distribution. Corridor:  Load type:  Drops:",
    seoH1: "DC and store freight with proof of delivery.",
    seoTitle: "Retail Distribution | DC to Store FTL",
    seoDescription:
      "DC-to-store and hub distribution with schedule discipline and e-POD. Own fleet, TranZfort marketplace, and ZAFTYS TMS.",
    faqs: [
      {
        question: "Do you run DC-to-store programs?",
        answer:
          "Yes, where FTL, LCV, or multi-stop designs fit your network. Scoped during program design with schedule and e-POD requirements.",
      },
      {
        question: "How is proof of delivery handled?",
        answer:
          "Digital ePOD and trip completion records through ZAFTYS TMS support OTIF confirmation for retail partners.",
      },
      {
        question: "Can TranZfort cover surge on retail lanes?",
        answer:
          "Yes. Post the extra loads on TranZfort. Core contracted lanes still run through ZAFTYS.",
      },
    ],
  },
  {
    slug: "industrial-logistics",
    title: "Industrial Logistics",
    description:
      "Multi-plant and multi-stop freight. Contract lanes on our fleet. Spot loads on TranZfort. TMS on the trips we run.",
    features: ["Contract and spot mix", "Multi-stop routing", "Enterprise account coordination"],
    highlight: "Multi-plant complexity",
    image: "/images/marketing/industry-industrial-logistics.jpg",
    heroHeadline: "Multi-Plant Supply Chains Need One Accountable Logistics Partner.",
    challenges: [
      "Nationwide industrial shippers juggle contract lanes, spot demand, and multiple plants.",
      "Fragmented transporters increase admin load and reduce visibility.",
      "Scaling programs without losing dispatch discipline is a common bottleneck.",
    ],
    howZaftysHelps: [
      "Enterprise-style account coordination with own fleet on core programs.",
      "TranZfort for spot loads and extra trucks. Listing and search are free. Broker fee on trucker bookings.",
      "TMS as the operational layer for dispatch, documentation, and client visibility.",
    ],
    corridors: [
      "Multi-plant inbound and outbound across industrial belts.",
      "Project and shutdown cargo on scheduled windows.",
      "Nationwide spot and contract mix on repeat and ad-hoc lanes.",
    ],
    equipment: ["Asset mix aligned during program design: LCV, tipper, open, flatbed, tanker", "Dedicated fleet where contracts warrant", "TranZfort for extra trucks on the day"],
    whatsappPrefill:
      "Hi ZAFTYS, I need a quote for Industrial Logistics. Corridor:  Load type:  Plants involved:",
    seoH1: "Multi-plant freight under one desk.",
    seoTitle: "Industrial Logistics | Multi-Plant Programs",
    seoDescription:
      "Complex multi-plant industrial freight with contract and spot capacity. Own fleet, TranZfort network, and ZAFTYS TMS.",
    faqs: [
      {
        question: "Can ZAFTYS manage contract and spot together?",
        answer:
          "Yes. Contracted lanes on company trucks. Spot and extra capacity on TranZfort. GST billing on trips we run.",
      },
      {
        question: "What visibility do multi-plant teams get?",
        answer:
          "ZAFTYS TMS is the operational layer for dispatch, documentation, and client visibility across plants and lanes.",
      },
      {
        question: "How do you reduce transporter fragmentation?",
        answer:
          "One commercial relationship with ZAFTYS replaces juggling multiple informal carriers for core and surge volume.",
      },
    ],
  },
] as const;

/** @deprecated use coal-mining / retail-distribution */
export const INDUSTRY_SLUG_ALIASES: Record<string, string> = {
  mining: "coal-mining",
  retail: "retail-distribution",
};

export function getIndustryBySlug(slug: string): IndustryRecord | undefined {
  const resolved = INDUSTRY_SLUG_ALIASES[slug] ?? slug;
  return industries.find((i) => i.slug === resolved);
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
