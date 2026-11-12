/**
 * Geo-SEO corridors - aligned with live GBP service areas, description, and custom services.
 * Own fleet lanes stay labeled. Broader India coverage via TranZfort network stays labeled Network.
 * No em dash, en dash, or spaced hyphen used as a dash.
 */

import { corridorPath, paths } from "@/lib/site-paths";

/** Cities / districts configured on GBP service areas (plus HQ). */
export const gbpServiceCities = [
  "Amravati",
  "Surat",
  "Hazira",
  "Chandrapur",
  "Nagpur",
  "Pune",
  "Mumbai",
  "Kolkata",
  "Haldia",
  "Raipur",
  "Bengaluru",
  "Chennai",
  "Hyderabad",
  "Wardha",
  "Mangaluru",
] as const;

export const gbpServiceStates = [
  "Maharashtra",
  "Gujarat",
  "West Bengal",
  "Chhattisgarh",
] as const;

/** Live GBP business description - keep in sync with Maps profile. */
export const gbpBusinessDescription =
  "ZAFTYS is a technology-driven 3PL, transportation, and contract logistics provider offering heavy freight transportation across Maharashtra, Gujarat, West Bengal, and pan-India industrial corridors. Powered by our owned fleet and the extensive Tranzfort carrier network, we run regular full truckload (FTL) and contract logistics on key routes including Kolkata-Mumbai, Haldia-Surat/Mumbai, Hazira/Surat to Nagpur & Chandrapur, Pune-Nagpur-Chandrapur round trips, as well as South corridors to Hyderabad, Bengaluru, and Chennai. We specialize in heavy cargo, industrial dispatches, and multi-axle freight with transparent, digital dispatch tracking.";

export type CorridorCapacityModel = "own-first" | "own-and-network" | "network-heavy";

export type CorridorDef = {
  slug: string;
  /** Short nav / footer label */
  shortName: string;
  /** Hub card title */
  title: string;
  /** Visible H1 */
  h1: string;
  badge: string;
  lead: string;
  seoTitle: string;
  seoDescription: string;
  /** Featured in footer (top routes) */
  footerFeatured?: boolean;
  capacityModel: CorridorCapacityModel;
  capacityNote: string;
  origins: string[];
  destinations: string[];
  lanes: string[];
  transit: string;
  dispatch: string;
  cargo: string[];
  fleet: string[];
  tracking: string;
  scope: string[];
  relatedSlugs: string[];
};

export const corridors: readonly CorridorDef[] = [
  {
    slug: "surat-hazira-nagpur-chandrapur",
    shortName: "Surat-Nagpur / Chandrapur",
    title: "Surat & Hazira to Nagpur & Chandrapur",
    h1: "Surat and Hazira to Nagpur and Chandrapur freight corridor.",
    badge: "Gujarat to Vidarbha",
    lead:
      "Heavy manufacturing, structural steel, coils, machinery, and port-to-inland transit connecting Gujarat's industrial belt to Central India. Regular FTL and multi-axle trailer capacity on lanes our trucks run.",
    seoTitle: "Surat Hazira to Nagpur Chandrapur Freight | ZAFTYS",
    seoDescription:
      "FTL from Surat and Hazira to Nagpur and Chandrapur. Steel, coils, machinery, multi-axle trailers. Owned fleet first, labeled TranZfort overflow. Quote the Amravati desk.",
    footerFeatured: true,
    capacityModel: "own-first",
    capacityNote:
      "Owned fleet first on Surat/Hazira to Nagpur and Chandrapur. Labeled TranZfort network when volume or timing needs more trucks.",
    origins: ["Surat", "Hazira"],
    destinations: ["Nagpur", "Chandrapur"],
    lanes: ["Surat to Nagpur", "Surat to Chandrapur", "Hazira to Nagpur", "Hazira to Chandrapur"],
    transit:
      "Typical road transit on these Gujarat-Vidarbha legs is about 1.5 to 3 days door-to-door once loaded, depending on plant windows, weighbridge queues, and monsoon. Confirm the current schedule with the desk for your indent.",
    dispatch:
      "Regular industrial FTL and multi-axle trailer capacity. Indent on WhatsApp or email with origin gate, cargo class, and preferred loading window.",
    cargo: [
      "Structural steel and fabricated structures",
      "Steel coils and galvanized material",
      "Machinery and industrial equipment",
      "Port-to-inland heavy freight from Hazira belt",
    ],
    fleet: [
      "Multi-axle trailers and flatbeds",
      "Open high-side trailers",
      "32 ft MXL / sealed body where the cargo needs it",
      "Company trucks first; labeled network overflow when required",
    ],
    tracking:
      "Trips contracted through ZAFTYS sit on ZAFTYS TMS for dispatch status, GPS, and ePOD. Marketplace overflow runs through TranZfort with Own vs Network labels kept honest.",
    scope: [
      "Gujarat industrial belt (Surat, Hazira) to Central India manufacturing and mineral corridors",
      "Daily-style FTL programs where volume supports recurring allotment",
      "Port-adjacent pickup at Hazira with inland delivery discipline",
    ],
    relatedSlugs: ["pune-nagpur-chandrapur", "mumbai-kolkata-raipur", "mundra-port-exim"],
  },
  {
    slug: "pune-nagpur-chandrapur",
    shortName: "Pune Round-Trip",
    title: "Pune to Nagpur & Chandrapur Round-Trip",
    h1: "Pune to Nagpur and Chandrapur round-trip logistics.",
    badge: "Two-way Vidarbha",
    lead:
      "Dedicated up-and-down logistics connecting Pune MIDC industrial clusters (automotive, engineering, forging) with Vidarbha's manufacturing and mineral belts. Both directions on corridors our trucks cover.",
    seoTitle: "Pune to Nagpur Chandrapur Round-Trip FTL | ZAFTYS",
    seoDescription:
      "Two-way FTL between Pune and Nagpur or Chandrapur. Automotive and engineering outbounds, Vidarbha returns. Owned fleet lanes with TMS tracking. Request a quote.",
    footerFeatured: true,
    capacityModel: "own-first",
    capacityNote:
      "Owned trucks on Chandrapur/Nagpur to Pune up and down. Network overflow only when labeled and needed.",
    origins: ["Pune", "Nagpur", "Chandrapur"],
    destinations: ["Nagpur", "Chandrapur", "Pune"],
    lanes: [
      "Pune to Nagpur",
      "Nagpur to Pune",
      "Pune to Chandrapur",
      "Chandrapur to Pune",
    ],
    transit:
      "Typical Pune-Nagpur / Pune-Chandrapur road transit is about 1 to 2.5 days each way after loading, subject to MIDC gates, highway conditions, and plant slots. Round-trip programs are planned so return windows are not left empty by default.",
    dispatch:
      "Two-way indent preference: tell us both legs when you can. Recurring automotive and engineering programs get a named desk owner.",
    cargo: [
      "Automotive and engineering components",
      "Forgings, castings, and finished assemblies",
      "Industrial machinery and plant spares",
      "Mineral and manufacturing returns from Vidarbha",
    ],
    fleet: [
      "Multi-axle and open body suited to industrial pallets and steel",
      "32 ft MXL for sealed or weather-sensitive loads",
      "High-side trailers for bulky fabrications",
      "Own fleet first on the round-trip plan",
    ],
    tracking:
      "ZAFTYS TMS on contracted trips for status and ePOD. Round-trip empty risk is managed at the desk, not left to a last-minute chat hunt.",
    scope: [
      "Pune MIDC clusters to Nagpur and Chandrapur manufacturing belts",
      "Up-and-down capacity planning to cut empty return kilometres",
      "Contract and dedicated program options for steady weekly volume",
    ],
    relatedSlugs: ["surat-hazira-nagpur-chandrapur", "mumbai-kolkata-raipur", "south-india-hyderabad-bengaluru-chennai"],
  },
  {
    slug: "mumbai-kolkata-raipur",
    shortName: "Mumbai-Kolkata / Raipur",
    title: "Mumbai to Kolkata & Raipur Long-Haul",
    h1: "Mumbai to Kolkata and Raipur interstate long-haul.",
    badge: "East-West corridors",
    lead:
      "East-West national highway freight for heavy commodities, industrial goods, and raw materials. Kolkata to Mumbai, Mumbai to Kolkata, and Mumbai to Raipur on lanes covered by our trucks, with GPS tracking and scheduled transit windows.",
    seoTitle: "Mumbai to Kolkata Raipur FTL Long-Haul | ZAFTYS",
    seoDescription:
      "Interstate FTL Mumbai-Kolkata and Mumbai-Raipur. Heavy industrial freight, GPS on contracted trips, owned fleet first. Quote ZAFTYS for your lane.",
    footerFeatured: false,
    capacityModel: "own-first",
    capacityNote:
      "Owned fleet on Kolkata-Mumbai and Mumbai-Raipur legs we run. Labeled TranZfort partners when you need surge capacity.",
    origins: ["Mumbai", "Kolkata"],
    destinations: ["Kolkata", "Mumbai", "Raipur"],
    lanes: ["Kolkata to Mumbai", "Mumbai to Kolkata", "Mumbai to Raipur", "Mumbai to Nagpur", "Mumbai to Chandrapur"],
    transit:
      "Mumbai-Kolkata long-haul is typically about 4 to 7 days door-to-door after loading, depending on route choice, monsoon, and plant free time. Mumbai-Raipur is often shorter; confirm ETA bands with the desk for the vehicle class you need.",
    dispatch:
      "Scheduled transit windows agreed at indent. Share commodity, payload, and whether toll is inside the rate before we lock the truck class.",
    cargo: [
      "Heavy commodities and industrial raw materials",
      "Steel and project cargo suited to open or flatbed",
      "Finished industrial goods for east-west plant programs",
      "Inter-plant and DC replenishment on fixed corridors",
    ],
    fleet: [
      "Multi-axle trailers for long-haul payload",
      "Open high-side and flatbed configurations",
      "32 ft MXL where sealed road legs fit the program",
      "Own trucks on core lanes; network labeled when added",
    ],
    tracking:
      "Contracted trips use ZAFTYS TMS GPS, status, and ePOD. You get a named desk through transit, not only a marketplace ping.",
    scope: [
      "East-West interstate FTL with industrial shippers",
      "Mumbai hub connections into Vidarbha (Nagpur, Chandrapur) on owned lanes",
      "Transparent Own vs Network labeling on every allotment",
    ],
    relatedSlugs: ["haldia-surat-mumbai", "surat-hazira-nagpur-chandrapur", "jnpt-nhava-sheva-container"],
  },
  {
    slug: "haldia-surat-mumbai",
    shortName: "Haldia-Surat / Mumbai",
    title: "Haldia Port to Surat & Mumbai",
    h1: "Haldia to Surat and Mumbai industrial freight.",
    badge: "Port evacuation westbound",
    lead:
      "Port evacuation, industrial chemicals, steel, and cross-country long-haul FTL connecting West Bengal maritime hubs to Western India. Haldia to Mumbai and Haldia to Surat on corridors our trucks cover.",
    seoTitle: "Haldia to Surat Mumbai Port Freight | ZAFTYS",
    seoDescription:
      "Haldia port evacuation to Surat and Mumbai. Industrial FTL, steel and chemicals, long-haul owned fleet lanes. Request capacity from ZAFTYS.",
    footerFeatured: false,
    capacityModel: "own-first",
    capacityNote:
      "Owned fleet on Haldia to Mumbai and Haldia to Surat. Network overflow labeled when port surge exceeds company trucks.",
    origins: ["Haldia", "Kolkata"],
    destinations: ["Surat", "Mumbai", "Hazira"],
    lanes: ["Haldia to Mumbai", "Haldia to Surat"],
    transit:
      "Haldia to Western India is typically a multi-day long-haul (often about 4 to 7+ days after gate-out), driven by port free time, document close, and destination plant windows. Lock the loading slot before promising a hard ETA.",
    dispatch:
      "Port pickup needs clear CFS/port instructions, cargo class, and destination gate rules. Indent early when free time is tight.",
    cargo: [
      "Port-evacuated industrial cargo",
      "Steel and heavy commodities",
      "Industrial chemicals where documentation allows (confirm MSDS / permits)",
      "Factory-bound inbound from eastern maritime hubs",
    ],
    fleet: [
      "Multi-axle and open trailers for port-to-plant",
      "Sealed / 32 ft options when weather or product requires it",
      "Flatbeds for oversized or structural pieces within legal limits",
      "Own capacity first on these westbound legs",
    ],
    tracking:
      "ZAFTYS TMS on contracted trips. Port exit to plant gate stays on one desk so free-time and detention conversations stay factual.",
    scope: [
      "West Bengal maritime hubs to Maharashtra and Gujarat industrial destinations",
      "Coordination around port documents and plant receiving windows",
      "FTL programs, not parcel or sundry LTL theatre",
    ],
    relatedSlugs: ["mumbai-kolkata-raipur", "surat-hazira-nagpur-chandrapur", "jnpt-nhava-sheva-container"],
  },
  {
    slug: "jnpt-nhava-sheva-container",
    shortName: "JNPT / Nhava Sheva",
    title: "JNPT / Nhava Sheva Port Haulage",
    h1: "JNPT and Nhava Sheva port haulage and container transport.",
    badge: "EXIM container road",
    lead:
      "EXIM container drayage, factory-to-port export logistics, and port evacuation serving industrial Maharashtra, Gujarat, and inland container depots. 32 ft domestic and ISO chassis where the program needs them.",
    seoTitle: "JNPT Nhava Sheva Container Haulage | ZAFTYS",
    seoDescription:
      "JNPT / Nhava Sheva container road haulage and factory-to-port EXIM. 32 ft and trailer capacity, TMS on contracted trips. Quote ZAFTYS.",
    footerFeatured: true,
    capacityModel: "own-and-network",
    capacityNote:
      "Own 32 ft container capacity where we run the lane. 40 ft / surge chassis and overflow via labeled TranZfort network when the yard needs more wheels.",
    origins: ["Mumbai", "JNPT", "Nhava Sheva"],
    destinations: ["Pune", "Nagpur", "Surat", "Hazira", "Chandrapur", "Amravati"],
    lanes: [
      "JNPT / Nhava Sheva to inland Maharashtra and Gujarat plants",
      "Factory-to-port export haulage",
      "Port evacuation to ICD / CFS and factory doors",
    ],
    transit:
      "Port-to-plant transit depends on terminal release, weighbridge, and destination distance. Mumbai metro / Pune legs are often same-day to next-day after gate-out; longer inland legs follow corridor norms. Confirm free time and cut-offs with the desk.",
    dispatch:
      "Share container size, laden/empty, shipping line cut-off, and factory gate rules. We match body class before the truck enters the terminal queue.",
    cargo: [
      "EXIM ISO containers (import / export)",
      "Domestic 32 ft sealed movements tied to port programs",
      "Factory-to-port export staging",
      "ICD / CFS bridging where road legs apply",
    ],
    fleet: [
      "32 ft SXL / MXL domestic container backbone",
      "40 ft / ISO chassis via own or labeled network",
      "Trailers for non-box heavy pieces when the move is not containerised",
      "Clear Own vs Network labeling on every allotment",
    ],
    tracking:
      "Contracted ZAFTYS trips use TMS visibility through terminal and plant gates. TranZfort supports digital matching when network capacity is required.",
    scope: [
      "Nhava Sheva / JNPT ecosystem road haulage",
      "Industrial Maharashtra and Gujarat plant doors",
      "Export and import programs with document-aware dispatch",
    ],
    relatedSlugs: ["mundra-port-exim", "mumbai-kolkata-raipur", "haldia-surat-mumbai"],
  },
  {
    slug: "mundra-port-exim",
    shortName: "Mundra Port EXIM",
    title: "Mundra Port Dedicated Trailer & EXIM",
    h1: "Mundra Port dedicated trailer and EXIM freight.",
    badge: "Gujarat port corridors",
    lead:
      "High-capacity trailer freight, heavy machinery, and port-to-inland evacuation connecting Adani Mundra Port to pan-India factories. Dedicated trailer programs with labeled network surge when required.",
    seoTitle: "Mundra Port EXIM Trailer Freight | ZAFTYS",
    seoDescription:
      "Mundra Port EXIM and dedicated trailer freight to inland factories. Heavy machinery, port evacuation, Own fleet and TranZfort network. Get a quote.",
    footerFeatured: true,
    capacityModel: "own-and-network",
    capacityNote:
      "Dedicated trailer and EXIM programs with owned capacity where available. Pan-India inland legs often use labeled TranZfort network trucks under the ZAFTYS desk.",
    origins: ["Mundra", "Hazira", "Surat"],
    destinations: ["Nagpur", "Chandrapur", "Pune", "Mumbai", "Hyderabad", "Bengaluru", "Chennai"],
    lanes: [
      "Mundra port to inland factory doors",
      "Port evacuation and return empties / export staging",
      "Gujarat port belt into Maharashtra and wider India",
    ],
    transit:
      "Mundra to inland India varies widely by destination. Gujarat and Maharashtra plants may clear in about 1 to 3 days after release; longer south or east legs need corridor-specific ETAs from the desk.",
    dispatch:
      "Port free time, trailer type, and inland gate rules drive allotment. Tell us laden weight, ODC flags, and preferred delivery window up front.",
    cargo: [
      "EXIM freight and port-evacuated industrial cargo",
      "Heavy machinery and project pieces within legal limits",
      "High-capacity trailer loads for factory programs",
      "Return and export staging moves",
    ],
    fleet: [
      "High-capacity multi-axle trailers",
      "Flatbeds for machinery and structural cargo",
      "Container chassis where the booking is box freight",
      "Labeled network trailers for pan-India surge",
    ],
    tracking:
      "ZAFTYS TMS on trips we contract. TranZfort matching when network trailers cover the inland leg. Labels stay Own vs Network.",
    scope: [
      "Adani Mundra Port connected industrial programs",
      "Dedicated trailer capacity for recurring EXIM volume",
      "Inland delivery across Maharashtra, Gujarat corridors, and wider India via network when needed",
    ],
    relatedSlugs: ["jnpt-nhava-sheva-container", "surat-hazira-nagpur-chandrapur", "south-india-hyderabad-bengaluru-chennai"],
  },
  {
    slug: "south-india-hyderabad-bengaluru-chennai",
    shortName: "South Corridors",
    title: "South India Corridors",
    h1: "South corridors to Hyderabad, Bengaluru, and Chennai.",
    badge: "Central / West to South",
    lead:
      "Interstate manufacturing dispatches connecting Central and Western industrial belts to Southern tech and automotive corridors. Owned capacity on feeder legs where we run them; labeled TranZfort network across the wider South program.",
    seoTitle: "Hyderabad Bengaluru Chennai FTL Corridors | ZAFTYS",
    seoDescription:
      "FTL to Hyderabad, Bengaluru, and Chennai from Western and Central India. Manufacturing dispatches with Own fleet and TranZfort network. Quote ZAFTYS.",
    footerFeatured: false,
    capacityModel: "network-heavy",
    capacityNote:
      "South long-haul often uses labeled TranZfort network trucks under the ZAFTYS desk. Western/Central feeder legs use owned fleet where we already run the corridor.",
    origins: ["Mumbai", "Pune", "Nagpur", "Chandrapur", "Surat", "Amravati"],
    destinations: ["Hyderabad", "Bengaluru", "Chennai", "Mangaluru"],
    lanes: [
      "Western / Central India to Hyderabad",
      "Western / Central India to Bengaluru",
      "Western / Central India to Chennai",
      "South connections including Mangaluru where the program requires",
    ],
    transit:
      "North/West to South FTL is typically a multi-day interstate move. Exact bands depend on origin cluster and destination plant gates. Ask the desk for a schedule window before you commit production to a hard delivery date.",
    dispatch:
      "Share origin plant, South destination, body class preference, and weekly volume. We will say Own vs Network before allotment.",
    cargo: [
      "Automotive and manufacturing finished goods",
      "Engineering components and plant inputs",
      "Industrial freight suited to FTL trailers",
      "Contract program volume between clusters",
    ],
    fleet: [
      "Multi-axle trailers and open high-side",
      "32 ft MXL for sealed interstate legs",
      "Network trailers verified before allotment",
      "Own fleet on connecting Western/Central lanes when available",
    ],
    tracking:
      "Contracted trips stay on ZAFTYS TMS. TranZfort supports discovery and network capacity across South corridors. Own vs Network never silently mixed.",
    scope: [
      "Hyderabad, Bengaluru, and Chennai manufacturing and tech-adjacent industrial belts",
      "Feed from Maharashtra and Gujarat industrial origins",
      "Pan-India network cover via TranZfort when Own trucks are not on that exact South leg",
    ],
    relatedSlugs: ["pune-nagpur-chandrapur", "mundra-port-exim", "mumbai-kolkata-raipur"],
  },
] as const;

export type CorridorSlug = (typeof corridors)[number]["slug"];

export const corridorBySlug: Record<string, CorridorDef> = Object.fromEntries(
  corridors.map((c) => [c.slug, c]),
);

export function getCorridor(slug: string): CorridorDef | undefined {
  return corridorBySlug[slug];
}

export function corridorUrl(slug: string): string {
  return corridorPath(slug);
}

export const corridorsHubCopy = {
  badge: "Routes & Corridors",
  h1: "Industrial FTL corridors we run across India.",
  lead:
    "Desk in Amravati. Clients across Surat, Hazira, Chandrapur, Nagpur, Pune, Mumbai, and more. Owned trucks on named Western and Central lanes. Labeled TranZfort network when the program needs wider India cover.",
  imageAlt: "ZAFTYS heavy freight trucks on industrial corridors across India",
  areasEyebrow: "GBP service areas",
  areasH2: "Cities and states we serve",
  areasLead:
    "Aligned with our Google Business Profile service areas. Headquarters remains Old Town, Badnera, Amravati. These cities are operational coverage, not separate fake branch offices.",
  honestyEyebrow: "Own vs Network",
  honestyH2: "How capacity is labeled on every corridor",
  honestyLead:
    "Company trucks on the lanes we list as Own-first. Verified TranZfort partners for surge and pan-India routes. We never silently blend the two.",
  honestyPoints: [
    {
      title: "Owned fleet corridors",
      body: "Kolkata-Mumbai, Haldia to Mumbai/Surat, Surat/Hazira to Nagpur & Chandrapur, Mumbai to Raipur/Nagpur/Chandrapur, and Chandrapur/Nagpur-Pune up and down.",
    },
    {
      title: "Port and South programs",
      body: "JNPT, Mundra, and South corridors combine Own capacity where we run the feeder with labeled network trailers for wider cover.",
    },
    {
      title: "TranZfort pan-India",
      body: "Network trucks can serve almost every Indian route when you need digital matching. Trips contracted through ZAFTYS stay on GST billing and desk ownership.",
    },
  ],
  indexEyebrow: "Named lanes",
  indexH2: "Corridor landing pages",
  indexLead: "Each page covers transit bands, cargo, fleet, tracking, and a direct quote CTA.",
  ctaH2: "Need capacity on one of these corridors?",
  ctaLead: "WhatsApp the Amravati desk with From, To, cargo, and window. We reply with Own vs Network clearly labeled.",
} as const;

export const corridorQuote = {
  label: "Request corridor quote",
  subject: "Corridor freight quote",
  body: "Hi ZAFTYS,\n\nI'd like a quote on a corridor lane.\n\nCorridor / page:\nFrom:\nTo:\nCargo / vehicle class:\nWeight / trips:\nWindow:\n\n",
};

export function corridorWhatsAppMessage(corridor: CorridorDef): string {
  return `Hi ZAFTYS, I need a quote on ${corridor.title}.\n\nFrom:\nTo:\nCargo:\nVehicle class:\nWindow:\n`;
}

export function corridorBreadcrumbs(corridor: CorridorDef) {
  return [
    { name: "Home", path: "/" },
    { name: "Logistics", path: paths.logistics.hub },
    { name: "Routes & Corridors", path: paths.logistics.corridors },
    { name: corridor.shortName, path: corridorUrl(corridor.slug) },
  ];
}

export const footerCorridorLinks = corridors
  .filter((c) => c.footerFeatured)
  .map((c) => ({ name: c.shortName, path: corridorUrl(c.slug) }));
