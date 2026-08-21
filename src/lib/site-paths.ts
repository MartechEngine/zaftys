/** Canonical public paths. Keep menu labels, sitemap, and redirects in sync. */

export const paths = {
  logistics: {
    hub: "/logistics",
    threePl: "/logistics/3pl-transportation",
    contract: "/logistics/contract-logistics",
    dedicated: "/logistics/dedicated-fleet",
    industrial: "/logistics/industrial-freight",
    container: "/logistics/container-transportation",
  },
  network: {
    hub: "/network",
    tranzfort: "/network/tranzfort",
    transporterNetwork: "/network/transporter-network",
    truckCapacity: "/network/truck-capacity",
  },
  technology: {
    /** Platform / ZAFTYS TMS. Leaves nest under /zaftys-tms. */
    tms: "/zaftys-tms",
    fleetManagement: "/zaftys-tms/fleet-management",
    tracking: "/zaftys-tms/tracking",
    apis: "/zaftys-tms/apis",
  },
  intelligence: {
    hub: "/intelligence",
    analytics: "/intelligence/analytics",
    freightRates: "/intelligence/freight-rates",
    marketIntelligence: "/intelligence/market-intelligence",
    ai: "/intelligence/ai",
  },
  fleet: "/fleet",
  industries: "/industries",
  partner: "/partner",
  about: "/about",
  contact: "/contact",
  careers: "/careers",
  reports: "/reports",
  blog: "/blog",
  resources: "/resources",
  login: "/login",
} as const;

/** @deprecated Use paths.network.tranzfort */
export const legacyNetworkPath = "/tranzfort-network";

export function reportPath(slug: string): string {
  return `${paths.reports}/${slug}`;
}

export function reportReadPath(slug: string): string {
  return `${paths.reports}/${slug}/read`;
}

export function industryPath(slug: string): string {
  return `${paths.industries}/${slug}`;
}
