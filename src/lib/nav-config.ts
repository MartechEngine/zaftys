import { paths } from "@/lib/site-paths";

export type NavLink = { name: string; path: string };

export type NavDropdown = {
  type: "dropdown";
  id: string;
  label: string;
  /** Hub route - parent label links here; used for active-state prefix matching */
  hubPath: string;
  items: readonly NavLink[];
};

export type NavFlatLink = {
  type: "link";
  id: string;
  label: string;
  path: string;
};

export type HeaderNavEntry = NavDropdown | NavFlatLink;

/**
 * Primary header navigation.
 * Order: Logistics → Platform → Network (flat) → Intelligence → Industries → Company → Resources
 * No "Overview" rows in any dropdown.
 *
 * Logistics (locked 20 Aug 2026): Transportation + Our Fleet only in header.
 * Service SKUs are rich leaves under /logistics/* - also linked from hub + footer.
 * Network: flat hub at `/network`. TranZfort + capacity leaves are hub / footer deep links.
 * Platform: TMS modules + TranZfort (also reachable via Network hub).
 */
export const headerNav: readonly HeaderNavEntry[] = [
  {
    type: "dropdown",
    id: "logistics",
    label: "Logistics",
    hubPath: paths.logistics.hub,
    items: [
      { name: "Transportation", path: paths.logistics.hub },
      { name: "Our Fleet", path: paths.fleet },
    ],
  },
  {
    type: "dropdown",
    id: "platform",
    label: "Platform",
    hubPath: paths.technology.tms,
    items: [
      { name: "ZAFTYS TMS", path: paths.technology.tms },
      { name: "TranZfort", path: paths.network.tranzfort },
      { name: "Tracking & Visibility", path: paths.technology.tracking },
      { name: "Fleet Management", path: paths.technology.fleetManagement },
    ],
  },
  {
    type: "link",
    id: "network",
    label: "Network",
    path: paths.network.hub,
  },
  {
    type: "link",
    id: "intelligence",
    label: "Intelligence",
    path: paths.intelligence.hub,
  },
  {
    type: "link",
    id: "industries",
    label: "Industries",
    path: paths.industries,
  },
  {
    type: "dropdown",
    id: "company",
    label: "Company",
    hubPath: paths.about,
    items: [
      { name: "About", path: paths.about },
      { name: "Contact", path: paths.contact },
      { name: "Careers", path: paths.careers },
      { name: "Become a Partner", path: paths.partner },
    ],
  },
  {
    type: "dropdown",
    id: "resources",
    label: "Resources",
    hubPath: paths.resources,
    items: [
      { name: "Blog", path: paths.blog },
      { name: "Market Reports", path: paths.reports },
    ],
  },
] as const;

/** @deprecated Use headerNav */
export const navGroups = headerNav.filter((e): e is NavDropdown => e.type === "dropdown");

export const footerColumns = [
  {
    title: "Logistics",
    links: [
      { name: "Transportation", path: paths.logistics.hub },
      { name: "3PL Transportation", path: paths.logistics.threePl },
      { name: "Contract Logistics", path: paths.logistics.contract },
      { name: "Dedicated Fleet", path: paths.logistics.dedicated },
      { name: "Industrial Freight", path: paths.logistics.industrial },
      { name: "Container Transportation", path: paths.logistics.container },
      { name: "Our Fleet", path: paths.fleet },
    ],
  },
  {
    title: "Platform",
    links: [
      { name: "ZAFTYS TMS", path: paths.technology.tms },
      { name: "Tracking & Visibility", path: paths.technology.tracking },
      { name: "Fleet Management", path: paths.technology.fleetManagement },
      { name: "Logistics APIs", path: paths.technology.apis },
      { name: "Login", path: paths.login },
    ],
  },
  {
    title: "Network",
    links: [
      { name: "Network", path: paths.network.hub },
      { name: "TranZfort", path: paths.network.tranzfort },
      { name: "Transporter Network", path: paths.network.transporterNetwork },
      { name: "Truck Capacity", path: paths.network.truckCapacity },
    ],
  },
  {
    title: "Intelligence",
    links: [
      { name: "ZAFTYS Analytics", path: paths.intelligence.analytics },
      { name: "Freight Rate Intelligence", path: paths.intelligence.freightRates },
      { name: "Market Intelligence", path: paths.intelligence.marketIntelligence },
      { name: "Supply Chain AI", path: paths.intelligence.ai },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", path: paths.about },
      { name: "Industries", path: paths.industries },
      { name: "Contact", path: paths.contact },
      { name: "Careers", path: paths.careers },
      { name: "Become a Partner", path: paths.partner },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", path: paths.blog },
      { name: "Market Reports", path: paths.reports },
    ],
  },
] as const;
