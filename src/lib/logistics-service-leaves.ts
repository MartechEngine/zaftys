/**
 * Rich logistics service leaves - SEO + leaf chrome around logisticsHubCopy sections.
 * Body content is never duplicated here; it comes from logisticsHubCopy.
 */

import { paths } from "@/lib/site-paths";
import { logisticsHubCopy, type LogisticsServiceCopy } from "@/lib/logistics-hub-copy";

export type LogisticsLeafCta = "quote" | "contract" | "container";

export type LogisticsServiceLeafDef = {
  key: "threePl" | "contract" | "dedicated" | "industrial" | "container";
  path: string;
  cta: LogisticsLeafCta;
  seo: { title: string; description: string };
  service: LogisticsServiceCopy;
  related: readonly { name: string; path: string }[];
};

const homeCrumb = { name: "Home", path: "/" };
const logisticsCrumb = { name: "Logistics", path: paths.logistics.hub };

export function logisticsLeafBreadcrumbs(leaf: LogisticsServiceLeafDef) {
  return [homeCrumb, logisticsCrumb, { name: leaf.service.title, path: leaf.path }];
}

export const logisticsServiceLeaves: Record<LogisticsServiceLeafDef["key"], LogisticsServiceLeafDef> = {
  container: {
    key: "container",
    path: paths.logistics.container,
    cta: "container",
    seo: {
      title: "Container Transportation India | Port to Plant | ZAFTYS",
      description:
        "Container road legs in India: port to factory, factory to port, and inland sealed FTL. Gate timing, labeled overflow, TMS on contracted moves. Request capacity.",
    },
    service: logisticsHubCopy.container,
    related: [
      { name: "3PL Transportation", path: paths.logistics.threePl },
      { name: "Industrial Freight", path: paths.logistics.industrial },
      { name: "Our Fleet", path: paths.fleet },
      { name: "Port & Container Road", path: `${paths.industries}/container-transport` },
    ],
  },
  threePl: {
    key: "threePl",
    path: paths.logistics.threePl,
    cta: "quote",
    seo: {
      title: "3PL Transportation Services India | FTL | ZAFTYS",
      description:
        "Full-truckload 3PL in India from ZAFTYS: owned fleet first, labeled partner overflow, GST billing, and TMS on trips we run. Request a quote for your corridor.",
    },
    service: logisticsHubCopy.threePl,
    related: [
      { name: "Contract Logistics", path: paths.logistics.contract },
      { name: "Industrial Freight", path: paths.logistics.industrial },
      { name: "Our Fleet", path: paths.fleet },
      { name: "TranZfort", path: paths.network.tranzfort },
    ],
  },
  industrial: {
    key: "industrial",
    path: paths.logistics.industrial,
    cta: "quote",
    seo: {
      title: "Industrial Freight Transport India | Steel Cement Mining | ZAFTYS",
      description:
        "Industrial FTL for steel, cement, mining, and project cargo in India. Right body class, plant windows, weighbridge awareness. Talk to the desk.",
    },
    service: logisticsHubCopy.industrial,
    related: [
      { name: "Container Transportation", path: paths.logistics.container },
      { name: "Contract Logistics", path: paths.logistics.contract },
      { name: "Industries", path: paths.industries },
      { name: "Our Fleet", path: paths.fleet },
    ],
  },
  contract: {
    key: "contract",
    path: paths.logistics.contract,
    cta: "contract",
    seo: {
      title: "Contract Logistics India | Reserved FTL Capacity | ZAFTYS",
      description:
        "Contract logistics in India with reserved FTL capacity, SLA tracking, plant-window dispatch, and TMS visibility. Discuss a capacity program for your lanes.",
    },
    service: logisticsHubCopy.contract,
    related: [
      { name: "Dedicated Fleet", path: paths.logistics.dedicated },
      { name: "3PL Transportation", path: paths.logistics.threePl },
      { name: "Our Fleet", path: paths.fleet },
      { name: "ZAFTYS TMS", path: paths.technology.tms },
    ],
  },
  dedicated: {
    key: "dedicated",
    path: paths.logistics.dedicated,
    cta: "contract",
    seo: {
      title: "Dedicated Fleet India | Assigned Trucks | ZAFTYS",
      description:
        "Dedicated fleet programs in India: trucks and drivers assigned to your corridors, fixed body class, plant-window dispatch, labeled overflow. Discuss your program.",
    },
    service: logisticsHubCopy.dedicated,
    related: [
      { name: "Contract Logistics", path: paths.logistics.contract },
      { name: "3PL Transportation", path: paths.logistics.threePl },
      { name: "Our Fleet", path: paths.fleet },
      { name: "Fleet Management", path: paths.technology.fleetManagement },
    ],
  },
};
