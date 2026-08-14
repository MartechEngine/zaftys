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

export const homeProducts = [
  {
    id: "transport",
    title: "Transport",
    description:
      "Company trucks across the TranZfort catalog. Quote on WhatsApp.",
    link: "/services",
    cta: "See truck classes",
  },
  {
    id: "tms",
    title: "ZAFTYS TMS",
    description:
      "Dispatch, GPS, e-POD, and shipper visibility. We run it on our own trips. Login at app.zaftys.com.",
    link: "/zaftys-tms",
    cta: "See ZAFTYS TMS",
  },
  {
    id: "marketplace",
    title: "TranZfort marketplace",
    description:
      "Post a load or find a load. AI-powered matching. Listing and search are free. We charge a broker fee to truckers on booked loads.",
    link: "/tranzfort-network",
    cta: "Open TranZfort",
  },
] as const;

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

/** 8 industries  -  2 rows x 4 cols on desktop */
export const homeIndustries = [
  { name: "Cement & Construction", slug: "cement", image: "/images/marketing/industry-cement.jpg" },
  { name: "Coal & Mining", slug: "coal-mining", image: "/images/services/materials/mining.jpg" },
  { name: "Steel & Metals", slug: "steel-metals", image: "/images/marketing/industry-steel-metals.jpg" },
  { name: "Chemicals", slug: "chemicals", image: "/images/marketing/industry-chemicals.jpg" },
  { name: "Manufacturing", slug: "manufacturing", image: "/images/marketing/industry-manufacturing.jpg" },
  { name: "FMCG", slug: "fmcg", image: "/images/marketing/industry-fmcg.jpg" },
  { name: "Retail Distribution", slug: "retail-distribution", image: "/images/marketing/industry-retail.jpg" },
  { name: "Industrial Logistics", slug: "industrial-logistics", image: "/images/marketing/industry-industrial-logistics.jpg" },
] as const;

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
    description: "Coal, iron ore, limestone, and aggregates on pit-to-plant corridors.",
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
    title: "FMCG & Retail",
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

/** Qualitative trust strip  -  no unverified numeric claims (copy-v2-b) */
export const homeTrustStrip = [
  { label: "Own Fleet", sublabel: "LCV to ODC" },
  { label: "ZAFTYS TMS", sublabel: "Live at app.zaftys.com" },
  { label: "TranZfort", sublabel: "Free to post and find" },
  { label: "GST Compliant", sublabel: "Formal billing and invoicing" },
  { label: "Pan-India", sublabel: "Commercial corridors" },
  { label: "24/7 Dispatch", sublabel: "Operations support" },
] as const;
