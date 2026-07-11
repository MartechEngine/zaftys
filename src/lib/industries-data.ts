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
  seoTitle: string;
  seoDescription: string;
};

export const industries: readonly IndustryRecord[] = [
  {
    slug: "cement",
    title: "Cement & Construction",
    description:
      "High-volume tipper and bulk lanes with plant dispatch discipline  -  cement, clinker, aggregates, and project delivery where detention and loading windows matter.",
    features: ["Tipper & bulk carriers", "Plant window coordination", "Multi-site dispatch"],
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
      "TranZfort verified capacity when seasonal or project demand exceeds owned assets.",
      "Shipment visibility through ZAFTYS TSM on active lanes  -  one partner, one channel.",
    ],
    corridors: [
      "Plant-to-project and plant-to-dealer lanes across Maharashtra, Gujarat, and central India.",
      "Clinker and cement movement between grinding units and consumption hubs.",
      "Aggregates supply to infrastructure and construction sites.",
    ],
    equipment: ["16–35T tippers and bulk carriers", "Open-body for bagged and loose bulk", "Multi-axle for heavy project loads"],
    whatsappPrefill:
      "Hi ZAFTYS, I need a quote for Cement & Construction freight. Corridor:  Load type:  Volume:",
    seoTitle: "Cement & Construction Logistics  -  Bulk Tipper Transport",
    seoDescription:
      "High-volume cement, clinker, and aggregates transport with plant dispatch discipline. Own fleet, TranZfort overflow, and TSM visibility through ZAFTYS.",
  },
  {
    slug: "coal-mining",
    title: "Coal & Mining",
    description:
      "Rugged pit-to-plant and mine-to-mill movement for raw materials  -  built for tough terrain, site operations, and continuous dispatch cycles.",
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
      "Structured onboarding for network partners when surge capacity is required.",
      "Central coordination through ZAFTYS  -  not multiple brokers or load boards.",
    ],
    corridors: [
      "Coal and ore movement from mines to power plants and processing units.",
      "Overburden and aggregate haul on active mining routes.",
      "Pit-to-stockyard and mill-feed lanes across eastern and central India.",
    ],
    equipment: ["35T+ heavy-duty tippers", "Reinforced bodies for abrasive loads", "Site-ready dispatch windows"],
    whatsappPrefill:
      "Hi ZAFTYS, I need a quote for Coal & Mining freight. Corridor:  Load type:  Volume:",
    seoTitle: "Coal & Mining Logistics  -  Heavy-Duty Tipper Transport",
    seoDescription:
      "Rugged pit-to-plant and mine-to-mill freight with DGMS-aware discipline. Company fleet and verified TranZfort capacity through ZAFTYS.",
  },
  {
    slug: "steel-metals",
    title: "Steel & Metals",
    description:
      "Secure heavy-haul for coils, plates, billets, and structural loads  -  weighbridge coordination, axle discipline, and mill timing on repeat lanes.",
    features: ["Flatbed & low-bed assets", "Weighbridge coordination", "Corridor predictability"],
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
      "Repeat lane discipline with structured LR, ePOD, and client visibility via TSM.",
      "Overflow capacity through TranZfort when mill programs exceed owned fleet.",
    ],
    corridors: [
      "Mill-to-fabricator and mill-to-warehouse lanes on industrial corridors.",
      "Port and ICD movement for imported coils and finished steel.",
      "Project steel delivery for infrastructure and plant construction.",
    ],
    equipment: ["Flatbed and low-bed trailers", "Multi-axle for heavy coils", "Open-body for lengths and structurals"],
    whatsappPrefill:
      "Hi ZAFTYS, I need a quote for Steel & Metals freight. Corridor:  Load type:  Weight:",
    seoTitle: "Steel & Metals Logistics  -  Coil And Heavy-Haul Transport",
    seoDescription:
      "Secure heavy-haul for coils, plates, and structural steel with weighbridge discipline. ZAFTYS own fleet, TranZfort network, and TSM tracking.",
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
      "Consignors need accountable partners  -  not informal spot carriers.",
    ],
    howZaftysHelps: [
      "Tanker and packaged programs scoped during consultation  -  honest capability matching.",
      "Structured LR, proof of delivery, and communication through ZAFTYS operations.",
      "Visibility on active shipments without repeated dispatch follow-up calls.",
    ],
    corridors: [
      "Plant-to-plant chemical movement on industrial belts.",
      "Bulk liquid delivery to manufacturing and processing sites.",
      "Packaged chemical distribution on repeat FTL lanes.",
    ],
    equipment: ["Tanker assets where program scope allows", "Closed and covered body for packaged cargo", "Documented trip lifecycle via TSM"],
    whatsappPrefill:
      "Hi ZAFTYS, I need a quote for Chemicals freight. Corridor:  Load type:  Packaging:",
    seoTitle: "Chemical Logistics  -  Compliant Bulk And Tanker Transport",
    seoDescription:
      "Compliance-focused chemical and bulk liquid transport with structured documentation. Through ZAFTYS Logistics with TSM visibility.",
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    description:
      "Multi-plant inbound and outbound flows with tight production windows, gate coordination, and SLA-driven dispatch.",
    features: ["Plant-to-plant lanes", "SLA-driven dispatch", "Overflow via TranZfort"],
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
      "TranZfort network scales capacity during peaks  -  still one ZAFTYS relationship.",
      "TSM gives operations teams shipment status without manual follow-up.",
    ],
    corridors: [
      "Supplier-to-plant inbound on industrial corridors.",
      "Plant-to-warehouse and plant-to-customer outbound lanes.",
      "Inter-plant transfers for WIP and finished goods.",
    ],
    equipment: ["Open-body and closed body for varied SKU profiles", "FTL assignment for production-linked lanes", "Multi-stop routing where programs require"],
    whatsappPrefill:
      "Hi ZAFTYS, I need a quote for Manufacturing logistics. Corridor:  Load type:  Frequency:",
    seoTitle: "Manufacturing Logistics  -  Plant-To-Plant FTL Programs",
    seoDescription:
      "Inbound and outbound manufacturing freight with production-window discipline. Own fleet, TranZfort overflow, and ZAFTYS TSM visibility.",
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
      "Regional FTL capacity on repeat corridors with structured dispatch.",
      "ePOD and trip records through ZAFTYS TSM for OTIF confirmation.",
      "Network overflow for seasonal peaks without adding vendor complexity.",
    ],
    corridors: [
      "Factory-to-DC regional movement.",
      "Hub-to-hub replenishment on scheduled lanes.",
      "Bulk SKU FTL where palletized FTL fits the network design.",
    ],
    equipment: ["Closed body and open-body by SKU profile", "FTL for DC-bound loads", "Schedule-aligned dispatch windows"],
    whatsappPrefill:
      "Hi ZAFTYS, I need a quote for FMCG distribution. Corridor:  Load type:  Frequency:",
    seoTitle: "FMCG Logistics  -  Regional FTL And DC Distribution",
    seoDescription:
      "Regional FMCG distribution with OTIF focus and lane-level discipline. ZAFTYS fleet, TranZfort capacity, and TSM tracking.",
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
      "Digital proof of delivery and trip records through ZAFTYS TSM.",
      "Single logistics partner for core lanes plus TranZfort for surge volume.",
    ],
    corridors: [
      "DC-to-store regional distribution.",
      "Hub-to-hub transfer between fulfillment centers.",
      "Supplier-to-DC inbound on contracted lanes.",
    ],
    equipment: ["Closed body for packaged retail freight", "Multi-drop capable assets where scoped", "ePOD-enabled trip completion"],
    whatsappPrefill:
      "Hi ZAFTYS, I need a quote for Retail Distribution. Corridor:  Load type:  Drops:",
    seoTitle: "Retail Distribution Logistics  -  DC-To-Store FTL",
    seoDescription:
      "DC-to-store and hub distribution with schedule discipline and ePOD. Through ZAFTYS with own fleet and TranZfort overflow.",
  },
  {
    slug: "industrial-logistics",
    title: "Industrial Logistics",
    description:
      "Complex multi-plant and multi-stop freight for industrial shippers  -  contract and spot mix under one partner.",
    features: ["Contract + spot mix", "Multi-stop routing", "Enterprise account coordination"],
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
      "TranZfort verified network for overflow and spot without new vendor relationships.",
      "TSM as the operational layer for dispatch, documentation, and client visibility.",
    ],
    corridors: [
      "Multi-plant inbound and outbound across industrial belts.",
      "Project and shutdown cargo on scheduled windows.",
      "Nationwide spot and contract mix on repeat and ad-hoc lanes.",
    ],
    equipment: ["Asset mix aligned during program design  -  tipper, open, flatbed, tanker", "Dedicated fleet where contracts warrant", "Network capacity for surge and spot"],
    whatsappPrefill:
      "Hi ZAFTYS, I need a quote for Industrial Logistics. Corridor:  Load type:  Plants involved:",
    seoTitle: "Industrial Logistics  -  Multi-Plant Freight Programs",
    seoDescription:
      "Complex multi-plant industrial freight with contract and spot capacity. ZAFTYS own fleet, TranZfort network, and TSM platform.",
  },
] as const;

/** @deprecated use coal-mining */
export const INDUSTRY_SLUG_ALIASES: Record<string, string> = {
  mining: "coal-mining",
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
