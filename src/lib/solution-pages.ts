import { paths } from "@/lib/site-paths";
import type { SolutionPageProps } from "@/components/SolutionPageLayout";

type SolutionContent = Omit<SolutionPageProps, "children">;

const homeCrumb = { name: "Home", path: "/" };

export const logisticsSolutions: Record<string, SolutionContent> = {
  threePl: {
    seo: {
      title: "3PL Transportation Services India",
      description:
        "ZAFTYS 3PL transportation for industrial and commercial freight. Owned fleet, contract capacity, and verified partner network across India.",
    },
    canonical: paths.logistics.threePl,
    badge: "3PL Transportation",
    h1: "Reliable transportation capacity for demanding freight.",
    lead: "ZAFTYS provides transportation execution for industrial, commercial, and infrastructure-related freight. We combine owned vehicles, contracted capacity, and a verified transportation network.",
    breadcrumbs: [homeCrumb, { name: "Logistics", path: paths.logistics.hub }, { name: "3PL Transportation", path: paths.logistics.threePl }],
    features: [
      { title: "Full truckload", description: "Dedicated truck capacity for origin-to-destination freight movements across commercial corridors." },
      { title: "Heavy freight", description: "Multi-axle, flatbed, and project cargo for plants, mills, and industrial sites." },
      { title: "Third-party capacity", description: "Verified partner trucks through Tranzfort when your lane needs more vehicles than we have that day." },
    ],
    highlights: [
      "Owned fleet from LCV through ODC",
      "GST-compliant billing on contracted trips",
      "TMS visibility on ZAFTYS-operated movements",
      "Pan-India commercial corridors",
    ],
    relatedLinks: [
      { name: "Contract Logistics", path: paths.logistics.contract },
      { name: "Our Fleet", path: paths.fleet },
      { name: "Tranzfort Network", path: paths.network.tranzfort },
    ],
    primaryCta: "quote",
    secondaryLink: { label: "View all logistics", path: paths.logistics.hub },
  },
  contract: {
    seo: {
      title: "Contract Logistics and Dedicated Transportation",
      description:
        "Contract logistics and dedicated transportation capacity for recurring freight. SLA management, dispatch, and TMS visibility from ZAFTYS.",
    },
    canonical: paths.logistics.contract,
    badge: "Contract Logistics",
    h1: "Dedicated transportation for recurring freight.",
    lead: "ZAFTYS provides contract logistics and dedicated transportation capacity for businesses and logistics operators with recurring freight requirements.",
    breadcrumbs: [homeCrumb, { name: "Logistics", path: paths.logistics.hub }, { name: "Contract Logistics", path: paths.logistics.contract }],
    features: [
      { title: "Dedicated capacity", description: "Reserve transportation capacity for recurring requirements across plants, mills, and distribution centres." },
      { title: "Dedicated routes", description: "Predictable capacity across recurring origin-destination corridors you run every week." },
      { title: "Managed dispatch", description: "Vehicle assignment, dispatch, and operational execution from one Amravati desk." },
    ],
    highlights: [
      "SLA and performance tracking against agreed requirements",
      "Tracking and visibility through ZAFTYS TMS",
      "Assigned trucks and drivers on repeat windows",
      "Account desk that knows your gate and loading windows",
    ],
    relatedLinks: [
      { name: "Dedicated Fleet", path: paths.logistics.dedicated },
      { name: "3PL Transportation", path: paths.logistics.threePl },
      { name: "ZAFTYS TMS", path: paths.technology.tms },
    ],
    primaryCta: "contract",
    secondaryLink: { label: "Discuss on WhatsApp", path: paths.contact },
  },
  dedicated: {
    seo: {
      title: "Dedicated Fleet Services India",
      description:
        "Dedicated fleet and assigned truck capacity for recurring industrial freight lanes. Contract programs with TMS visibility from ZAFTYS.",
    },
    canonical: paths.logistics.dedicated,
    badge: "Dedicated Fleet",
    h1: "Assigned capacity on corridors you run every week.",
    lead: "Reserve dedicated trucks and drivers for plant, mill, or DC programs. The vehicle class follows the lane, whether LCV, heavy load, container, tanker, or bulker.",
    breadcrumbs: [homeCrumb, { name: "Logistics", path: paths.logistics.hub }, { name: "Dedicated Fleet", path: paths.logistics.dedicated }],
    features: [
      { title: "Assigned vehicles", description: "Trucks and drivers dedicated to your program for a season or a year." },
      { title: "Any vehicle class", description: "LCV, heavy load, container, tanker, and bulker on the same contract framework." },
      { title: "Performance on the lane", description: "Operational performance measured on the corridor, not a one-off spot rate." },
    ],
    highlights: [
      "Plant and DC window awareness built into dispatch",
      "TMS visibility for shippers on contracted trips",
      "TranZfort overflow when surge capacity is needed",
      "GST-compliant billing through ZAFTYS",
    ],
    relatedLinks: [
      { name: "Contract Logistics", path: paths.logistics.contract },
      { name: "Our Fleet", path: paths.fleet },
    ],
    primaryCta: "contract",
  },
  industrial: {
    seo: {
      title: "Industrial Freight Transportation India",
      description:
        "Heavy industrial freight transportation for steel, cement, mining, manufacturing, and project cargo. Own fleet and verified network capacity.",
    },
    canonical: paths.logistics.industrial,
    badge: "Industrial Freight",
    h1: "Heavy freight built around plant windows and weighbridge reality.",
    lead: "Transportation for manufacturing, construction, steel, cement, mining, and other heavy industries. We match truck class to cargo, axle limits, and gate schedules.",
    breadcrumbs: [homeCrumb, { name: "Logistics", path: paths.logistics.hub }, { name: "Industrial Freight", path: paths.logistics.industrial }],
    features: [
      { title: "Steel and metals", description: "Coils, plates, and structural sections with weighbridge and axle discipline." },
      { title: "Cement and bulk", description: "Plant-to-project bulkers on repeat lanes with loading window awareness." },
      { title: "Mining and aggregates", description: "Pit-to-plant corridors for coal, ore, limestone, and aggregates." },
    ],
    highlights: [
      "Multi-axle, flatbed, tipper, and ODC capability",
      "Plant detention and TAT awareness at dispatch",
      "Industrial corridor experience across India",
      "Technology layer for tracking and documentation",
    ],
    relatedLinks: [
      { name: "Industries", path: paths.industries },
      { name: "Container Transportation", path: paths.logistics.container },
    ],
    primaryCta: "quote",
  },
  container: {
    seo: {
      title: "Container Transportation Port to Market India",
      description:
        "Container and port-to-market transportation between ports, warehouses, factories, and cities. ZAFTYS heavy-vehicle and container capacity.",
    },
    canonical: paths.logistics.container,
    badge: "Container & Port",
    h1: "Connecting ports, markets, and cities.",
    lead: "Container and heavy-vehicle transportation for movements between ports, warehouses, factories, markets, and cities across India.",
    breadcrumbs: [homeCrumb, { name: "Logistics", path: paths.logistics.hub }, { name: "Container Transportation", path: paths.logistics.container }],
    features: [
      { title: "Port to warehouse", description: "Container movement from port to distribution and storage facilities." },
      { title: "Port to factory", description: "Direct factory delivery from port arrivals for production inputs." },
      { title: "Factory to port", description: "Export-bound container movement from plant to port." },
    ],
    highlights: [
      "Container trailers and sealed freight configurations",
      "Port-to-city and market-to-port corridors",
      "Combined with ZAFTYS TMS for trip visibility",
      "Partner network capacity through Tranzfort when needed",
    ],
    relatedLinks: [
      { name: "3PL Transportation", path: paths.logistics.threePl },
      { name: "Industrial Freight", path: paths.logistics.industrial },
    ],
    primaryCta: "container",
  },
};

export const networkSolutions: Record<string, SolutionContent> = {
  transporterNetwork: {
    seo: {
      title: "Transporter Network and Verified Carriers",
      description:
        "ZAFTYS verified transporter network. Third-party truck capacity with RC, insurance, and onboarding checks before partners move your freight.",
    },
    canonical: paths.network.transporterNetwork,
    badge: "Transporter Network",
    h1: "Verified carriers when your lane needs more trucks.",
    lead: "ZAFTYS coordinates a network of verified transportation partners. Onboarding checks RC, insurance, and operating patterns before a partner shows as available.",
    breadcrumbs: [homeCrumb, { name: "Network", path: paths.network.hub }, { name: "Transporter Network", path: paths.network.transporterNetwork }],
    features: [
      { title: "Verified onboarding", description: "KYC, RC, fitness, permit, and insurance checks before partners move freight." },
      { title: "Corridor matching", description: "Partners matched to corridors and vehicle classes they actually run." },
      { title: "ZAFTYS coordination", description: "Trips contracted through ZAFTYS stay on GST billing with structured documentation." },
    ],
    highlights: [
      "Distinct from owned fleet, clearly labeled as partner capacity",
      "Tranzfort digital access for load posting and discovery",
      "TMS visibility on ZAFTYS-contracted partner trips",
      "Built for Indian highway conditions and paperwork",
    ],
    relatedLinks: [
      { name: "Become a Partner", path: paths.partner },
      { name: "Tranzfort", path: paths.network.tranzfort },
    ],
    primaryCta: "partner",
    secondaryLink: { label: "Partner registration", path: paths.partner },
  },
  truckCapacity: {
    seo: {
      title: "Truck Capacity Sourcing India",
      description:
        "Source owned or third-party truck capacity through ZAFTYS. Combine company fleet with verified partner network for demanding freight lanes.",
    },
    canonical: paths.network.truckCapacity,
    badge: "Truck Capacity",
    h1: "Source capacity from fleet and network in one relationship.",
    lead: "When demand exceeds owned fleet on a lane, ZAFTYS sources verified third-party capacity through Tranzfort and partner coordination, without losing commercial or operational control.",
    breadcrumbs: [homeCrumb, { name: "Network", path: paths.network.hub }, { name: "Truck Capacity", path: paths.network.truckCapacity }],
    features: [
      { title: "Owned fleet first", description: "Company trucks across LCV, heavy load, container, tanker, and bulker classes." },
      { title: "Network overflow", description: "Verified partners when surge or corridor demand exceeds owned capacity." },
      { title: "One desk", description: "Same ZAFTYS commercial relationship whether the truck is owned or partner-sourced." },
    ],
    highlights: [
      "Capacity sourcing integrated with ZAFTYS TMS dispatch",
      "No anonymous last-minute vendor chaos",
      "GST-compliant billing on contracted trips",
      "Free listing and search on Tranzfort for overflow loads",
    ],
    relatedLinks: [
      { name: "Our Fleet", path: paths.fleet },
      { name: "Tranzfort", path: paths.network.tranzfort },
    ],
    primaryCta: "quote",
  },
};

export const technologySolutions: Record<string, SolutionContent> = {
  fleetManagement: {
    seo: {
      title: "Fleet Management Software India",
      description:
        "Fleet management in ZAFTYS TMS: vehicle registry, driver records, document expiry alerts, and maintenance scheduling for transport operators.",
    },
    canonical: paths.technology.fleetManagement,
    badge: "Fleet Management",
    h1: "Fleet records that survive the weighbridge and the audit.",
    lead: "Vehicle registry, driver records, document expiry alerts, and maintenance scheduling inside ZAFTYS TMS, the same system we dispatch on every day.",
    breadcrumbs: [homeCrumb, { name: "Technology", path: paths.technology.hub }, { name: "Fleet Management", path: paths.technology.fleetManagement }],
    features: [
      { title: "Vehicle registry", description: "Complete fleet records with body type, capacity, and document status." },
      { title: "Driver management", description: "Driver records, licence tracking, and assignment history." },
      { title: "Maintenance alerts", description: "Document expiry and maintenance scheduling so trucks are not stopped at the gate." },
    ],
    highlights: [
      "Built for Indian commercial fleet operations",
      "Integrated with dispatch and trip lifecycle",
      "Used on ZAFTYS own fleet daily",
      "Available to shippers and fleet operators",
    ],
    relatedLinks: [{ name: "ZAFTYS TMS", path: paths.technology.tms }],
    primaryCta: "demo",
  },
  tracking: {
    seo: {
      title: "Shipment Tracking and Visibility India",
      description:
        "Live GPS tracking, dynamic ETAs, and shipper portal visibility in ZAFTYS TMS. Track active movements and delivery progress digitally.",
    },
    canonical: paths.technology.tracking,
    badge: "Tracking & Visibility",
    h1: "Visibility after the truck leaves the origin.",
    lead: "Track active movements, delivery status, and exceptions through digital workflows. Shippers use the portal for tracking and e-POD on contracted trips.",
    breadcrumbs: [homeCrumb, { name: "Technology", path: paths.technology.hub }, { name: "Tracking", path: paths.technology.tracking }],
    features: [
      { title: "Live GPS tracking", description: "Live location updates, dynamic ETAs, and route deviation alerts on the dispatch map." },
      { title: "Shipper portal", description: "Customer visibility without chasing WhatsApp photos from the driver." },
      { title: "Digital e-POD", description: "Proof of delivery captured digitally and linked to the trip record." },
    ],
    highlights: [
      "Driver mobile app for status updates on the road",
      "Exception visibility for dispatch and customer teams",
      "Integrated with billing and trip close-out",
      "Live at app.zaftys.com",
    ],
    relatedLinks: [{ name: "ZAFTYS TMS", path: paths.technology.tms }],
    primaryCta: "demo",
  },
  apis: {
    seo: {
      title: "Logistics API Integrations",
      description:
        "ZAFTYS logistics API integrations for ERP, TMS, and operational systems. Connect transportation data with your commercial workflows.",
    },
    canonical: paths.technology.apis,
    badge: "Logistics APIs",
    h1: "Connect transportation data to your systems.",
    lead: "Integrate trip, fleet, and visibility data from ZAFTYS TMS with ERP, warehouse, and commercial systems. API availability varies by module; we only advertise what is implemented.",
    breadcrumbs: [homeCrumb, { name: "Technology", path: paths.technology.hub }, { name: "APIs", path: paths.technology.apis }],
    features: [
      { title: "Trip data export", description: "Operational trip records available for integration with your systems." },
      { title: "Status webhooks", description: "Event-driven updates for dispatch and delivery milestones where supported." },
      { title: "Enterprise onboarding", description: "Structured integration planning for shippers and logistics operators." },
    ],
    highlights: [
      "Built around real dispatch workflows, not generic middleware",
      "Discuss specific endpoints and scope during enterprise onboarding",
      "Same platform ZAFTYS uses internally",
    ],
    relatedLinks: [{ name: "ZAFTYS TMS", path: paths.technology.tms }],
    primaryCta: "demo",
  },
};

export const intelligenceSolutions: Record<string, SolutionContent> = {
  analytics: {
    seo: {
      title: "ZAFTYS Analytics | Transportation Data",
      description:
        "ZAFTYS Analytics brings transportation, freight, carrier, and market data together to understand performance, cost, capacity, and market movement.",
    },
    canonical: paths.intelligence.analytics,
    badge: "ZAFTYS Analytics",
    h1: "Turn transportation data into decisions.",
    lead: "ZAFTYS Analytics brings together transportation, freight, carrier, and market data to help logistics teams understand performance, cost, capacity, and market movement.",
    breadcrumbs: [homeCrumb, { name: "Intelligence", path: paths.intelligence.hub }, { name: "Analytics", path: paths.intelligence.analytics }],
    features: [
      { title: "Lane performance", description: "Understand transit times, cost, and reliability by corridor." },
      { title: "Carrier performance", description: "Measure partner and owned fleet performance against SLAs." },
      { title: "Cost analysis", description: "Connect operational records with commercial cost visibility." },
    ],
    highlights: [
      "Built on transportation operations ZAFTYS runs",
      "Institutional market reports available at /reports",
      "Module availability varies; labeled during onboarding",
    ],
    relatedLinks: [
      { name: "Market Reports", path: paths.reports },
      { name: "Market Intelligence", path: paths.intelligence.marketIntelligence },
    ],
    primaryCta: "intelligence",
  },
  freightRates: {
    seo: {
      title: "Freight Rate Intelligence India",
      description:
        "Freight rate intelligence from ZAFTYS Analytics. Lane-level rate context built on real transportation and market data.",
    },
    canonical: paths.intelligence.freightRates,
    badge: "Freight Rate Intelligence · Beta",
    h1: "Lane-level freight rate context.",
    lead: "Freight rate intelligence designed for transportation teams who need corridor-level context, not generic market averages. Capabilities are rolling out in phases.",
    breadcrumbs: [homeCrumb, { name: "Intelligence", path: paths.intelligence.hub }, { name: "Freight Rates", path: paths.intelligence.freightRates }],
    features: [
      { title: "Lane intelligence", description: "Rate and movement context for corridors you actually run." },
      { title: "Market context", description: "Understand how corridor rates move over time." },
      { title: "Operational linkage", description: "Connected to trip and dispatch data where available." },
    ],
    highlights: [
      "Labeled Beta until full product release",
      "Not a substitute for a contracted rate on your lane",
      "Built from real logistics operations",
    ],
    relatedLinks: [{ name: "ZAFTYS Analytics", path: paths.intelligence.analytics }],
    primaryCta: "intelligence",
  },
  marketIntelligence: {
    seo: {
      title: "Logistics Market Intelligence Reports",
      description:
        "Market intelligence on Indian logistics, freight trends, and digital transportation from ZAFTYS Analytics and institutional research reports.",
    },
    canonical: paths.intelligence.marketIntelligence,
    badge: "Market Intelligence",
    h1: "Research on how freight markets move.",
    lead: "Institutional research on logistics markets, digital freight, and transportation trends. Open reports for a preview, then unlock full PDFs with your company email.",
    breadcrumbs: [homeCrumb, { name: "Intelligence", path: paths.intelligence.hub }, { name: "Market Intelligence", path: paths.intelligence.marketIntelligence }],
    features: [
      { title: "Market reports", description: "Institutional PDFs on global logistics and digital freight matching." },
      { title: "Industry trends", description: "Analysis of corridor, mode, and market movement patterns." },
      { title: "Operational insights", description: "Research shaped by ZAFTYS transportation experience." },
    ],
    highlights: [
      "Reports available at /reports",
      "Gated PDF download with company email",
      "Blog deep research on operational topics",
    ],
    relatedLinks: [
      { name: "View Reports", path: paths.reports },
      { name: "Blog", path: paths.blog },
    ],
    primaryCta: "intelligence",
    secondaryLink: { label: "Browse reports", path: paths.reports },
  },
  ai: {
    seo: {
      title: "Supply Chain AI for Transportation",
      description:
        "ZAFTYS AI capabilities for transportation and supply-chain workflows. Exception analysis, operational intelligence, and decision support. Labeled by availability.",
    },
    canonical: paths.intelligence.ai,
    badge: "Supply Chain AI · Research",
    h1: "AI built around real logistics operations.",
    lead: "ZAFTYS is developing AI capabilities for transportation and supply-chain workflows: freight analysis, exception handling, operational data queries, and faster decisions. Features are labeled Available, Beta, or Coming Soon.",
    breadcrumbs: [homeCrumb, { name: "Intelligence", path: paths.intelligence.hub }, { name: "Supply Chain AI", path: paths.intelligence.ai }],
    features: [
      { title: "Operational intelligence", description: "AI assistants designed for dispatch and logistics desk workflows." },
      { title: "Exception analysis", description: "Help teams understand delays, deviations, and delivery exceptions." },
      { title: "Forecasting", description: "Demand and capacity forecasting in research and beta phases." },
    ],
    highlights: [
      "Not positioned as a generic AI company",
      "Built on transportation data from operations we run",
      "Each capability labeled by release status",
      "TranZfort matching uses AI on corridor and vehicle fit",
    ],
    relatedLinks: [
      { name: "ZAFTYS Analytics", path: paths.intelligence.analytics },
      { name: "ZAFTYS TMS", path: paths.technology.tms },
    ],
    primaryCta: "intelligence",
  },
};
