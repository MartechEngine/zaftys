export const WHATSAPP_PHONE = "919270923581";

export const COMPANY_EMAIL = "info@zaftys.com";

/** Public legal positioning  -  GST-compliant operations; not a Pvt Ltd entity */
export const legalEntity = {
  name: "ZAFTYS Logistics",
  credentialsShort: "GST compliant",
  credentialsLong: "GST compliant operations",
  billingNote: "Formal billing through ZAFTYS Logistics",
  transactionsNote:
    "All commercial transactions run through ZAFTYS Logistics with GST-compliant billing.",
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
  "Hi ZAFTYS, I'd like a quote for heavy load transport. From:  To:  Load type: ";

export const externalLinks = {
  tranzfort: "https://tranzfort.com",
  app: "https://app.zaftys.com",
} as const;

export function whatsappUrl(message = WHATSAPP_DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

/** Grid rule: card counts should divide evenly into row columns (2, 3, or 4). */

export const homeHowItWorks = [
  {
    step: "01",
    title: "You need capacity",
    description: "Direct suppliers and large transporters reach out to ZAFTYS for heavy industrial loads.",
  },
  {
    step: "02",
    title: "We dispatch our fleet",
    description: "Your load is assigned to our company-owned trucks. Every contract runs through ZAFTYS Logistics with GST-compliant billing.",
  },
  {
    step: "03",
    title: "Network scales you",
    description: "When demand exceeds our fleet, loads are posted on TranZfort where verified truckers book and fulfil under ZAFTYS.",
  },
  {
    step: "04",
    title: "Full visibility",
    description: "ZAFTYS TSM™ tracks every trip  -  powering our operations today and available for your business.",
  },
] as const;

/** 6 featured industries  -  2 rows × 3 cols on desktop */
export const homeIndustries = [
  { name: "Cement & Construction", slug: "cement", image: "/images/marketing/industry-cement.jpg" },
  { name: "Coal & Mining", slug: "coal-mining", image: "/images/services/materials/mining.jpg" },
  { name: "Steel & Metals", slug: "steel-metals", image: "/images/marketing/industry-steel-metals.jpg" },
  { name: "Chemicals", slug: "chemicals", image: "/images/marketing/industry-chemicals.jpg" },
  { name: "Manufacturing", slug: "manufacturing", image: "/images/marketing/industry-manufacturing.jpg" },
  { name: "Industrial Logistics", slug: "industrial-logistics", image: "/images/marketing/industry-industrial-logistics.jpg" },
] as const;

export const truckTypes = [
  {
    id: "open-body",
    title: "Open Body",
    tagline: "7–35T · bulk solids",
    description: "High-side and flat-deck trucks for coal, aggregates, bagged cement, and steel lengths on industrial corridors.",
  },
  {
    id: "tipper",
    title: "Tipper / Dumper",
    tagline: "16–35T · loose bulk",
    description: "Hydraulic discharge for sand, ore, overburden, and mine outbound  -  pit-to-plant specialists.",
  },
  {
    id: "flatbed",
    title: "Flatbed / Low-bed",
    tagline: "20–40T · heavy haul",
    description: "Open deck and multi-axle trailers for steel coils, machinery, pipes, and project cargo.",
  },
  {
    id: "tanker",
    title: "Bulk Tanker",
    tagline: "Liquids & powders",
    description: "Tankers for diesel, fly ash, cement powder, and industrial liquids with compartment tracking.",
  },
  {
    id: "container",
    title: "Container / Box",
    tagline: "Sealed freight",
    description: "Box-body and container configurations for palletized, weather-sensitive, and high-value cargo.",
  },
  {
    id: "contract",
    title: "Contract Fleet",
    tagline: "Dedicated lanes",
    description: "Long-term assigned assets and drivers on recurring plant, mill, and dealer programs.",
  },
] as const;

export const materialTypes = [
  {
    id: "mining",
    title: "Mining & Bulk",
    description: "Coal, iron ore, limestone, and aggregates  -  pit-to-plant haulage on rugged corridors.",
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
    description: "Regional distribution with OTIF focus and lane-level cost control.",
  },
  {
    id: "agriculture",
    title: "Agriculture",
    description: "Seasonal grain and agri bulk with scalable capacity during harvest windows.",
  },
] as const;

export const coreServices = [
  {
    id: "ftl",
    title: "Full Truckload (FTL)",
    description: "Dedicated heavy-haul for bulk loads  -  coal, cement, steel, and industrial freight across India.",
    link: "/services#ftl",
  },
  {
    id: "mining",
    title: "Mining Logistics",
    description: "Rugged terrain specialists moving raw materials from mines to plants safely and on schedule.",
    link: "/services#mining",
  },
  {
    id: "contract",
    title: "Contract Logistics",
    description: "Long-term fleet partnerships with predictable capacity for direct suppliers and transporters.",
    link: "/services#contract",
  },
  {
    id: "optimization",
    title: "Route Optimization",
    description: "Smart corridor planning to cut empty miles and keep your loads moving efficiently.",
    link: "/services#optimization",
  },
  {
    id: "enterprise",
    title: "Enterprise Programs",
    description: "Dedicated account management, SLAs, and visibility for large transporter partnerships.",
    link: "/services#enterprise",
  },
  {
    id: "overflow",
    title: "Network Overflow",
    description: "TranZfort network capacity when demand exceeds own fleet  -  still through ZAFTYS.",
    link: "/network",
  },
] as const;

export const tsmCapabilities = [
  { title: "Live GPS Tracking", desc: "Real-time location and ETA on every active shipment." },
  { title: "Dispatch & Analytics", desc: "Trip management, lane costs, and performance reporting." },
  { title: "24/7 Operations", desc: "Round-the-clock dispatch and exception handling." },
  { title: "Fleet & Driver Mgmt", desc: "Vehicles, drivers, documents, and compliance in one place." },
  { title: "Client Portal", desc: "Shippers track loads and access ePOD without calling dispatch." },
  { title: "Digital Documentation", desc: "LR, invoices, and proof of delivery stored securely." },
] as const;

export const networkHighlights = [
  { title: "Smart route intelligence", desc: "AI-assisted routing to cut empty miles on industrial corridors." },
  { title: "Hindi & English voice", desc: "Speak naturally on the road  -  built for Indian logistics." },
  { title: "Works offline", desc: "Core features keep working on highways with limited signal." },
  { title: "Verified truckers", desc: "KYC, RC, and vehicle docs before partners move your freight." },
  { title: "Load matching", desc: "Connect surplus capacity to industrial loads nationwide." },
  { title: "ZAFTYS transactions", desc: legalEntity.transactionsNote },
] as const;

/** Qualitative trust strip  -  no unverified numeric claims (copy-v2-b) */
export const homeTrustStrip = [
  { label: "Six Decades", sublabel: "Corridor experience" },
  { label: "Own Fleet", sublabel: "Heavy-haul assets" },
  { label: "Pan-India", sublabel: "Industrial corridors" },
  { label: "GST Compliant", sublabel: "Formal billing & invoicing" },
  { label: "Live Network", sublabel: "TranZfort capacity" },
  { label: "24/7 Dispatch", sublabel: "Operations support" },
] as const;
