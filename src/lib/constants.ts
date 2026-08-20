export const WHATSAPP_PHONE = "919270923581";

export const COMPANY_EMAIL = "info@zaftys.com";
export const CONTACT_FORM_EMAIL = "contact@zaftys.com";
export const SUBSCRIBERS_EMAIL = "subscribers@zaftys.com";

/** Public legal positioning  -  GST-compliant operations; not a Pvt Ltd entity */
export const legalEntity = {
  name: "ZAFTYS Logistics",
  credentialsShort: "GST compliant",
  credentialsLong: "GST compliant operations",
  billingNote: "Formal billing through ZAFTYS Logistics",
  transactionsNote:
    "Trips contracted through ZAFTYS are billed with GST-compliant invoicing.",
} as const;

const MAPS_QUERY = "Old Town, Badnera, Amravati, 444701, Maharashtra, India";

export const companyAddress = {
  line1: "Old Town, Badnera",
  line2: "Amravati, 444701",
  line3: "Maharashtra, India",
  streetAddress: "Old Town, Badnera",
  locality: "Amravati",
  region: "Maharashtra",
  postalCode: "444701",
  country: "IN",
  mapsQuery: MAPS_QUERY,
  mapsEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&z=15&output=embed`,
  mapsDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAPS_QUERY)}`,
} as const;

export function mailtoCompany(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  return `mailto:${COMPANY_EMAIL}${query ? `?${query}` : ""}`;
}

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi ZAFTYS, I need a freight quote. From:  To:  Load type (LCV / heavy / container / tanker / bulker):  Weight: ";

export const WHATSAPP_POST_LOAD_MESSAGE =
  "Hi ZAFTYS, I want to post a load on TranZfort. From:  To:  Truck type:";

export const externalLinks = {
  tranzfort: "https://tranzfort.com",
  app: "https://app.zaftys.com",
  linkedin: "https://www.linkedin.com/company/zaftys",
} as const;

/** Marketplace claims locked with legal + product (Aug 2026). */
export const tranzfortCopy = {
  matching: "AI-powered matching",
  listingFree: "Listing and search are free.",
  brokerFee: "We charge a broker fee to truckers on booked loads.",
  listingAndBroker:
    "Listing and search are free. We charge a broker fee to truckers on booked loads.",
} as const;

export function whatsappUrl(message = WHATSAPP_DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

/** Grid rule: card counts should divide evenly into row columns (2, 3, or 4). */

export const homeLogisticsServices = [
  {
    id: "3pl",
    title: "3PL Transportation",
    description: "Transportation execution with owned fleet and verified partner capacity.",
    link: "/logistics/3pl-transportation",
  },
  {
    id: "contract",
    title: "Contract Logistics",
    description: "Dedicated programs for recurring freight with SLA management.",
    link: "/logistics/contract-logistics",
  },
  {
    id: "dedicated",
    title: "Dedicated Fleet",
    description: "Assigned trucks and drivers on plant, mill, or DC programs.",
    link: "/logistics/dedicated-fleet",
  },
  {
    id: "industrial",
    title: "Industrial Freight",
    description: "Heavy freight for steel, cement, mining, and project cargo.",
    link: "/logistics/industrial-freight",
  },
  {
    id: "container",
    title: "Container Transportation",
    description: "Port-to-market, factory-to-port, and city movements.",
    link: "/logistics/container-transportation",
  },
  {
    id: "fleet",
    title: "Our Fleet",
    description: "Owned heavy-vehicle capacity from LCV through ODC.",
    link: "/fleet",
  },
] as const;

/** @deprecated Use homeLogisticsServices */
export const homeProducts = homeLogisticsServices;

/** 6 catalogue cards: 5 vehicle classes + contract as a program (2 rows x 3 cols) */
export const vehicleClasses = [
  {
    id: "lcv",
    title: "LCV",
    tagline: "Distribution and regional FTL",
    kind: "class" as const,
    description:
      "Open and closed LCV: Ace, Dost, and 14ft to 24ft, including 6W container. Not house shifting. Not two-wheeler last mile.",
    link: "/services#lcv",
  },
  {
    id: "heavy",
    title: "Heavy load",
    tagline: "Multi-axle, flatbed, project cargo",
    kind: "class" as const,
    description:
      "Open truck, trailer, tipper, and ODC: coils, machinery, low bed, and oversize-aware work. Plant windows, weighbridge, and axle limits.",
    link: "/services#heavy",
  },
  {
    id: "container",
    title: "Container",
    tagline: "Sealed and box-body freight",
    kind: "class" as const,
    description:
      "Container trailers and closed body for palletised, weather-sensitive, and high-value cargo, including plant-to-warehouse moves.",
    link: "/services#container",
  },
  {
    id: "tanker",
    title: "Tanker",
    tagline: "Liquids",
    kind: "class" as const,
    description:
      "Tankers quoted per cargo: water, chemical, acid, petroleum, and edible oil.",
    link: "/services#tanker",
  },
  {
    id: "bulker",
    title: "Bulker",
    tagline: "Loose and bagged bulk",
    kind: "class" as const,
    description:
      "Cement, fly ash, lime, and powder bulkers on plant-to-project lanes.",
    link: "/services#bulker",
  },
  {
    id: "contract",
    title: "Contract fleet",
    tagline: "Dedicated lanes (program)",
    kind: "program" as const,
    description:
      "Assigned trucks and drivers on a plant, mill, or DC program. Any class, on a longer ticket.",
    link: "/services#contract",
  },
] as const;

/** Industries shown on homepage — keep in sync with industries-data */
export const homeIndustries = [
  { name: "Cement & Construction", slug: "cement", image: "/images/marketing/industry-cement.jpg" },
  { name: "Port & Container Road", slug: "container-transport", image: "/images/marketing/industry-container.jpg" },
  { name: "Mining Products", slug: "coal-mining", image: "/images/marketing/industry-coal-mining.jpg" },
  { name: "Steel & Metals", slug: "steel-metals", image: "/images/marketing/industry-steel-metals.jpg" },
  { name: "Manufacturing", slug: "manufacturing", image: "/images/marketing/industry-manufacturing.jpg" },
  { name: "FMCG", slug: "fmcg", image: "/images/marketing/industry-fmcg.jpg" },
  { name: "Chemicals", slug: "chemicals", image: "/images/marketing/industry-chemicals.jpg" },
  { name: "Industrial Logistics", slug: "industrial-logistics", image: "/images/marketing/industry-industrial-logistics.jpg" },
] as const;

/** 3 operating-model pillars for homepage section 2 (not a service catalog) */
export const homeOperatingModel = [
  {
    id: "fleet",
    step: "01",
    title: "Owned fleet",
    description: "Company trucks from LCV through ODC on corridors we run every week.",
    link: "/fleet",
  },
  {
    id: "contract",
    step: "02",
    title: "Contract logistics",
    description: "Dedicated programs for recurring plant, mill, and DC freight with SLA management.",
    link: "/logistics/contract-logistics",
  },
  {
    id: "network",
    step: "03",
    title: "Network capacity",
    description: "Verified Tranzfort partners when surge exceeds owned fleet. Always labeled clearly.",
    link: "/network/tranzfort",
  },
] as const;

/** 4 primary services on homepage — full list lives on /logistics */
export const homeFeaturedLogisticsServices = homeLogisticsServices.filter((s) =>
  (["3pl", "contract", "industrial", "container"] as const).includes(s.id as "3pl" | "contract" | "industrial" | "container"),
);

/** 4 primary industries on homepage — full grid on /industries */
export const homeFeaturedIndustries = homeIndustries.filter((i) =>
  (["cement", "steel-metals", "coal-mining", "manufacturing"] as const).includes(i.slug as "cement" | "steel-metals" | "coal-mining" | "manufacturing"),
);

export const truckTypes = [
  {
    id: "lcv",
    title: "LCV",
    tagline: "Distribution · regional FTL",
    description:
      "Open and closed LCV: Ace, Dost, and 14ft to 24ft, including 6W container. Not house shifting. Not two-wheeler last mile.",
  },
  {
    id: "open-body",
    title: "Open Body",
    tagline: "7-35T · bulk solids",
    description: "High-side and flat-deck trucks for coal, aggregates, bagged cement, and steel lengths.",
  },
  {
    id: "tipper",
    title: "Tipper / Dumper",
    tagline: "16-35T · loose bulk",
    description: "Hydraulic discharge for sand, ore, overburden, and mine outbound on pit-to-plant lanes.",
  },
  {
    id: "flatbed",
    title: "Flatbed / Low-bed",
    tagline: "20-40T · heavy load",
    description: "Open deck and multi-axle trailers for steel coils, machinery, pipes, and project cargo.",
  },
  {
    id: "tanker",
    title: "Bulk Tanker",
    tagline: "Liquids",
    description: "Water, chemical, acid, petroleum, and edible oil, quoted per cargo and corridor.",
  },
  {
    id: "container",
    title: "Container / Box",
    tagline: "Sealed freight",
    description: "Box-body and container configurations for palletized, weather-sensitive, and high-value cargo.",
  },
] as const;

export const materialTypes = [
  {
    id: "mining",
    title: "Mining & Bulk",
    description: "Coal, iron ore, limestone, bauxite, and quarry aggregates on tipper programs.",
  },
  {
    id: "construction",
    title: "Construction",
    description: "Cement, clinker, sand, and ready-mix inputs for plants, projects, and dealer networks.",
  },
  {
    id: "metals",
    title: "Metals & Steel",
    description: "Coils, plates, billets, and structural sections with weighbridge and axle discipline.",
  },
  {
    id: "energy",
    title: "Energy & Chemicals",
    description: "Petroleum products, industrial chemicals, and lubricants with haz-route awareness.",
  },
  {
    id: "fmcg",
    title: "FMCG",
    description: "Regional FTL and commercial LCV with OTIF focus on factory-to-DC and hub lanes.",
  },
  {
    id: "agriculture",
    title: "Agriculture",
    description: "Seasonal grain and agri bulk with scalable capacity during harvest windows.",
  },
] as const;

export const networkHighlights = [
  { title: "Route intelligence", desc: "Smarter routing suggestions to cut empty miles on repeat corridors." },
  { title: "Hindi & English voice", desc: "Speak naturally on the road. Built for Indian logistics." },
  { title: "Works offline", desc: "Core features keep working on highways with limited signal." },
  { title: "Verified truckers", desc: "KYC, RC, and vehicle docs before partners move your freight." },
  { title: "Load matching", desc: "AI-powered matching of loads and trucks. Listing and search are free. Broker fee on trucker bookings." },
  { title: "GST on ZAFTYS trips", desc: "Trips contracted through ZAFTYS stay on GST billing." },
] as const;

/** Qualitative trust strip — verified labels only */
export const homeTrustStrip = [
  { label: "Own Fleet", sublabel: "Heavy vehicle capacity" },
  { label: "Partner Network", sublabel: "Verified carriers" },
  { label: "Contract Logistics", sublabel: "Recurring freight" },
  { label: "ZAFTYS TMS", sublabel: "Live dispatch system" },
  { label: "Pan-India", sublabel: "Freight corridors" },
  { label: "60+ Years", sublabel: "Trucking heritage" },
] as const;
