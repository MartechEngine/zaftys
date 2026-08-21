/**
 * /zaftys-tms - Platform landing for ZAFTYS TMS.
 * Ops-first. The stack we dispatch on. No invented public metrics.
 * No em dash, en dash, or spaced hyphen used as a dash.
 */

import { paths } from "@/lib/site-paths";

export const technologyHubCopy = {
  hero: {
    badge: "ZAFTYS TMS · live",
    h1: "The TMS we dispatch on every day.",
    lead: "Plan, dispatch, track, and close out transportation in one system. Shippers use the portal for tracking and ePOD. Fleet operators use the same stack for vehicles, drivers, and trip close-out. Login at app.zaftys.com.",
  },
  intro: {
    eyebrow: "What it is",
    h2: "Platform technology shaped by the Amravati desk",
    lead: "Peers sell generic TMS suites. We ship the stack that already runs plant windows, weighbridge loops, Own vs Network labeling, and ePOD close-out on corridors ZAFTYS executes.",
    pillars: [
      {
        title: "One trip lifecycle",
        body: "Order to billing on the same record. No second spreadsheet for status.",
      },
      {
        title: "Live at app.zaftys.com",
        body: "Dispatch, shipments, map, and portal in production for ZAFTYS operations and customer programs.",
      },
      {
        title: "Own vs Network labeled",
        body: "Company trucks and TranZfort overflow stay distinct in the system of record.",
      },
      {
        title: "Built for Indian gates",
        body: "Plant windows, multi-axle, LCV drops, and document checks treated as first-class events.",
      },
    ],
  },
  workflow: {
    eyebrow: "Connected workflow",
    h2: "From indent to analytics without leaving the trip",
    lead: "Every step writes back to the same movement. That is what makes Analytics and desk AI research possible later.",
    steps: [
      "Order",
      "Load planning",
      "Capacity sourcing",
      "Vehicle allocation",
      "Dispatch",
      "Tracking",
      "Delivery",
      "ePOD",
      "Billing",
      "Analytics",
    ],
  },
  modules: [
    {
      id: "tms",
      title: "Command Center and dispatch",
      status: "Available",
      lead: "Plan, dispatch, track, and close out transportation from one operational system. Command Center, Dispatch, Shipments, and Live Map are the screens the desk already trusts.",
      points: [
        "Trip lifecycle from indent through billing",
        "Exception queues instead of scattered WhatsApp threads",
        "Same platform ZAFTYS dispatches on daily",
        "Shipper and operator views from one operational truth",
      ],
      image: "/images/tms/command-center.webp",
      imageAlt: "ZAFTYS TMS Command Center with operational KPIs",
      caption: "Command Center · live at app.zaftys.com",
      cta: { label: "Login at app.zaftys.com", path: paths.login },
      secondaryCta: { label: "Book a demo", path: paths.contact },
    },
    {
      id: "tracking",
      title: "Tracking and visibility",
      status: "Available",
      lead: "Live GPS, shipment status, and digital ePOD on contracted trips. Shippers see the load without calling the control room for every update.",
      points: [
        "Live map for active contracted moves",
        "Shipper portal for tracking and documents",
        "Digital ePOD linked to the trip record",
        "Exception visibility for desk and customer teams",
      ],
      image: "/images/tms/map.webp?v=2",
      imageAlt: "ZAFTYS TMS Live Map with real-time GPS tracking",
      caption: "Live Map · GPS on contracted trips",
      cta: { label: "Tracking and visibility", path: paths.technology.tracking },
    },
    {
      id: "fleet",
      title: "Fleet management",
      status: "Available",
      lead: "Vehicle registry, drivers, documents, and maintenance inside the same TMS stack. Built so trucks are not stopped at the gate for expired paperwork.",
      points: [
        "Vehicle and driver records in one place",
        "Document expiry and maintenance alerts",
        "Assignment history tied to dispatch",
        "Used on ZAFTYS own fleet every day",
      ],
      image: "/images/tms/dispatch.webp",
      imageAlt: "ZAFTYS TMS Dispatch board used with fleet assignment",
      caption: "Dispatch · fleet and trip assignment",
      cta: { label: "Fleet management", path: paths.technology.fleetManagement },
    },
    {
      id: "apis",
      title: "Logistics APIs",
      status: "Available",
      lead: "Connect trip, fleet, and visibility data with ERP and commercial systems. We only discuss endpoints that are implemented. Scope is confirmed in enterprise onboarding.",
      points: [
        "Trip data for downstream systems",
        "Status events where supported",
        "Integration planning for shippers and operators",
        "Built around real dispatch workflows, not generic middleware",
      ],
      image: "/images/tms/network.webp",
      imageAlt: "ZAFTYS TMS network view for capacity and integrations context",
      caption: "Network · capacity and partner context",
      cta: { label: "Logistics APIs", path: paths.technology.apis },
    },
  ],
  buyers: {
    eyebrow: "Who it is for",
    h2: "Shippers and operators on the same stack",
    items: [
      {
        title: "Shippers and manufacturers",
        body: "Portal tracking and ePOD without chasing driver photos. Lane performance when Analytics is in play.",
      },
      {
        title: "Fleet and 3PL operators",
        body: "Dispatch, fleet records, and trip close-out on the system ZAFTYS runs internally.",
      },
      {
        title: "Technology and IT leads",
        body: "One operational spine to connect ERP later, with API scope stated during onboarding.",
      },
    ],
  },
  live: {
    eyebrow: "Production",
    h2: "Live today at app.zaftys.com",
    lead: "Not a slideware TMS. The Amravati desk runs contracted trips on this stack.",
    points: [
      "Dispatch and trip lifecycle in production",
      "Client portal for shipment visibility and ePOD",
      "Fleet, driver, and document records on one system",
      "Plant windows, weighbridge, multi-axle, and LCV drops as first-class events",
    ],
    primary: { label: "Login at app.zaftys.com", path: paths.login },
    secondary: { label: "Book a demo", path: paths.contact },
  },
  faqs: [
    {
      question: "Is ZAFTYS TMS a live product?",
      answer:
        "Yes. ZAFTYS TMS powers ZAFTYS dispatch operations daily and is available to shippers and fleet operators via app.zaftys.com. Request a demo if you want a guided walkthrough.",
    },
    {
      question: "Who should use ZAFTYS TMS?",
      answer:
        "Shippers who need shipment visibility, and fleet operators who want dispatch, fleet records, documentation, and trip reporting in one platform. It is not limited to heavy-haul work.",
    },
    {
      question: "How is this different from generic TMS tools?",
      answer:
        "ZAFTYS TMS is shaped by our own transport desk: plant loading windows, weighbridge loops, LCV drops, multi-axle work, and TranZfort when a trip needs a partner truck.",
    },
  ],
  related: {
    eyebrow: "Connected products",
    h2: "TMS feeds Logistics Intelligence",
    links: [
      {
        name: "ZAFTYS Analytics",
        path: paths.intelligence.analytics,
        blurb: "Operations KPIs on the same trip spine",
      },
      {
        name: "Logistics Intelligence",
        path: paths.intelligence.hub,
        blurb: "Rates, reports, and desk AI research",
      },
      {
        name: "Logistics services",
        path: paths.logistics.hub,
        blurb: "Capacity and contract transportation",
      },
      {
        name: "TranZfort",
        path: paths.network.tranzfort,
        blurb: "Marketplace when the lane needs network capacity",
      },
    ],
  },
  finalCta: {
    h2: "Start with the live portal",
    lead: "Log in at app.zaftys.com, or request a guided demo for your operations team.",
    primaryLabel: "Book a TMS demo",
    secondaryLabel: "Login at app.zaftys.com",
    secondaryPath: paths.login,
  },
} as const;

export const technologyDemoMail = {
  subject: "ZAFTYS TMS demo request",
  body: "Hi ZAFTYS,\n\nI want to book a demo of ZAFTYS TMS.\n\nCompany:\nRole:\nUse case:\n\n",
} as const;
