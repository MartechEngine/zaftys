/**
 * Platform leaf pages under ZAFTYS TMS: Fleet, Tracking, APIs.
 * Dense product copy. No invented public KPIs. No em dash, en dash, or spaced hyphen as a dash.
 */

import { paths } from "@/lib/site-paths";
import type { IntelligenceLeafCopy } from "@/lib/intelligence-leaf-copy";

const homeCrumb = { name: "Home", path: "/" };
const tmsCrumb = { name: "ZAFTYS TMS", path: paths.technology.tms };

export const fleetManagementLeafCopy: IntelligenceLeafCopy = {
  id: "fleet",
  status: "Available",
  seo: {
    title: "Fleet Management in ZAFTYS TMS | Vehicles and Drivers",
    description:
      "Fleet management inside ZAFTYS TMS: vehicle registry, driver records, document expiry, and maintenance alerts tied to dispatch. Used on ZAFTYS own fleet daily.",
  },
  canonical: paths.technology.fleetManagement,
  breadcrumbs: [
    homeCrumb,
    tmsCrumb,
    { name: "Fleet Management", path: paths.technology.fleetManagement },
  ],
  hero: {
    badge: "Fleet Management · Available",
    h1: "Fleet records that survive the weighbridge and the audit.",
    lead: "Vehicle registry, drivers, documents, and maintenance inside the same TMS ZAFTYS dispatches on every day. Built so a truck is not stopped at the gate for expired paperwork.",
    imageAlt: "ZAFTYS TMS fleet and dispatch assignment screens",
    primaryCtaLabel: "Book a TMS demo",
    secondaryCta: { label: "Open ZAFTYS TMS", path: paths.technology.tms },
  },
  mail: {
    subject: "ZAFTYS TMS fleet management demo",
    body: "Hi ZAFTYS,\n\nI want a demo of fleet management in ZAFTYS TMS.\n\nCompany:\nRole:\nFleet size / body classes:\n\n",
  },
  problem: {
    eyebrow: "The fleet problem",
    h2: "Dispatch cannot run on scattered vehicle files",
    lead: "When registry, licences, and maintenance live outside the trip system, allotment guesses and gate stops follow. Fleet management belongs on the same spine as dispatch.",
    items: [
      {
        title: "Papers separate from trips",
        body: "RC, insurance, and permit status sit in folders while dispatch assigns a truck that should not leave the yard.",
      },
      {
        title: "Driver history without the movement",
        body: "Licence and assignment history are hard to defend when they are not tied to the trip record.",
      },
      {
        title: "Maintenance after the breakdown",
        body: "Service and document expiry alerts arrive too late if they are not visible next to allotment.",
      },
    ],
  },
  capabilities: {
    eyebrow: "What you get",
    h2: "Fleet management inside ZAFTYS TMS",
    lead: "Not a standalone fleet app. Records that feed dispatch, Own vs Network labeling, and trip close-out.",
    items: [
      {
        title: "Vehicle registry",
        body: "Body type, capacity, registration, and document status for company trucks you operate.",
      },
      {
        title: "Driver records",
        body: "Licence tracking, assignment history, and desk-ready profiles linked to trips.",
      },
      {
        title: "Document expiry alerts",
        body: "Insurance, fitness, and permit windows surfaced before the gate rejects the truck.",
      },
      {
        title: "Maintenance scheduling",
        body: "Service reminders tied to the fleet you actually run, not a generic calendar silo.",
      },
      {
        title: "Dispatch linkage",
        body: "Allotment draws from fleet truth so the wrong body class is harder to push onto a plant bay.",
      },
      {
        title: "Own fleet first",
        body: "Company trucks stay labeled. Network overflow via TranZfort does not silently rewrite fleet records.",
      },
    ],
  },
  visual: {
    eyebrow: "Product",
    h2: "Dispatch and fleet on the same stack",
    lead: "The Amravati desk assigns from records that live next to the trip lifecycle at app.zaftys.com.",
    primary: {
      src: "/images/tms/dispatch.webp",
      alt: "ZAFTYS TMS Dispatch board with backlog and vehicle assignment",
      caption: "Dispatch · fleet and trip assignment",
    },
    secondary: {
      src: "/images/tms/command-center.webp",
      alt: "ZAFTYS TMS Command Center with operational KPIs",
      caption: "Command Center · operations on the same spine",
    },
  },
  whoFor: {
    eyebrow: "Who it is for",
    h2: "Operators who own the truck and the paperwork",
    items: [
      {
        title: "Fleet and 3PL operators",
        body: "Keep vehicle and driver truth next to dispatch instead of in a parallel spreadsheet.",
      },
      {
        title: "Transport managers",
        body: "See expiry and maintenance risk before allotment, not after a plant refusal.",
      },
      {
        title: "Compliance and audit leads",
        body: "Document status tied to the commercial fleet you run on Indian corridors.",
      },
    ],
  },
  dataNotes: {
    eyebrow: "Data foundation",
    h2: "Fleet only helps if dispatch reads the same record",
    lead: "ZAFTYS TMS keeps registry, drivers, and trips on one platform. That is why fleet management is a module of the TMS, not a separate product brand.",
    points: [
      "Used on ZAFTYS own fleet daily",
      "Integrated with trip lifecycle and billing close-out",
      "Available to fleet operators under normal TMS onboarding",
      "Start from ZAFTYS TMS for the full platform story",
    ],
    cta: { label: "Open ZAFTYS TMS", path: paths.technology.tms },
  },
  honesty: {
    eyebrow: "Availability",
    h2: "Available inside ZAFTYS TMS",
    body: "Fleet management ships as part of the live TMS at app.zaftys.com. Module depth is confirmed during onboarding. This page does not invent public fleet headcounts.",
  },
  related: {
    eyebrow: "Related",
    h2: "Continue in the Platform",
    links: [
      {
        name: "ZAFTYS TMS",
        path: paths.technology.tms,
        blurb: "Full platform landing",
      },
      {
        name: "Tracking and visibility",
        path: paths.technology.tracking,
        blurb: "Live map and ePOD",
      },
      {
        name: "Logistics APIs",
        path: paths.technology.apis,
        blurb: "Connect ERP and commercial systems",
      },
      {
        name: "Our Fleet",
        path: paths.fleet,
        blurb: "Own vs Network body classes",
      },
    ],
  },
  finalCta: {
    h2: "Put fleet records where dispatch already works",
    lead: "Book a walkthrough of fleet management in ZAFTYS TMS, or start from the live platform page.",
    primaryLabel: "Book a TMS demo",
    secondary: { label: "Back to ZAFTYS TMS", path: paths.technology.tms },
  },
};

export const trackingLeafCopy: IntelligenceLeafCopy = {
  id: "tracking",
  status: "Available",
  seo: {
    title: "Shipment Tracking and Visibility | ZAFTYS TMS",
    description:
      "Live GPS, shipper portal, and digital ePOD in ZAFTYS TMS. Track contracted trips after the truck leaves origin without chasing WhatsApp status.",
  },
  canonical: paths.technology.tracking,
  breadcrumbs: [
    homeCrumb,
    tmsCrumb,
    { name: "Tracking & Visibility", path: paths.technology.tracking },
  ],
  hero: {
    badge: "Tracking & Visibility · Available",
    h1: "Visibility after the truck leaves the origin.",
    lead: "Live map, shipment status, and digital ePOD on contracted trips. Shippers see the load without calling the control room for every update. Desk and customer share one trip record.",
    imageAlt: "ZAFTYS TMS live map and shipments tracking",
    primaryCtaLabel: "Book a TMS demo",
    secondaryCta: { label: "Open ZAFTYS TMS", path: paths.technology.tms },
  },
  mail: {
    subject: "ZAFTYS TMS tracking and visibility demo",
    body: "Hi ZAFTYS,\n\nI want a demo of tracking and visibility in ZAFTYS TMS.\n\nCompany:\nRole:\nCorridors / shipper portal needs:\n\n",
  },
  problem: {
    eyebrow: "The visibility problem",
    h2: "WhatsApp photos are not a control tower",
    lead: "Once the truck leaves the gate, plant and procurement still need ETA, detention, and proof. Scattered driver messages invent three versions of the truth.",
    items: [
      {
        title: "Status by chat thread",
        body: "Delay, gate wait, and delivery confirmation arrive as images instead of events on the trip.",
      },
      {
        title: "Shipper blind after allotment",
        body: "Customers call the desk because they cannot see the contracted movement themselves.",
      },
      {
        title: "POD that never closes billing",
        body: "Paper or photo POD that is not linked to the trip slows settlement and dispute handling.",
      },
    ],
  },
  capabilities: {
    eyebrow: "What you get",
    h2: "Tracking built into the trip lifecycle",
    lead: "Visibility is a ZAFTYS TMS module, not a pin on a disconnected map product.",
    items: [
      {
        title: "Live GPS on contracted trips",
        body: "Location, route context, and desk alerts on movements running in ZAFTYS TMS.",
      },
      {
        title: "Shipments list and status",
        body: "Trip stages aligned to dispatch, gate, delivery, and close-out, not a single vague in transit label.",
      },
      {
        title: "Shipper portal",
        body: "Customer visibility for tracking and documents without chasing the driver for every update.",
      },
      {
        title: "Digital ePOD",
        body: "Proof of delivery captured digitally and linked to the same trip record used for billing.",
      },
      {
        title: "Exception visibility",
        body: "Delay and deviation surfaced for dispatch and customer teams from the operational spine.",
      },
      {
        title: "Driver mobile updates",
        body: "Status and delivery capture on the road so the desk is not rebuilding the story from memory.",
      },
    ],
  },
  visual: {
    eyebrow: "Product",
    h2: "Live Map and Shipments",
    lead: "The same screens the Amravati desk uses on contracted moves at app.zaftys.com.",
    primary: {
      src: "/images/tms/map.webp?v=2",
      alt: "ZAFTYS TMS Live Map with real-time GPS tracking",
      caption: "Live Map · GPS on contracted trips",
    },
    secondary: {
      src: "/images/tms/shipments.webp?v=2",
      alt: "ZAFTYS TMS Shipments screen listing live loads and trip status",
      caption: "Shipments · status aligned to the trip lifecycle",
    },
  },
  whoFor: {
    eyebrow: "Who it is for",
    h2: "Desks and shippers who share one trip truth",
    items: [
      {
        title: "Shippers and manufacturers",
        body: "Portal tracking and ePOD without a daily control-room phone tree.",
      },
      {
        title: "Dispatch and control towers",
        body: "Map and exception queues on the trips you already run in ZAFTYS TMS.",
      },
      {
        title: "Billing and documentation teams",
        body: "ePOD linked to the movement so close-out is not a scavenger hunt.",
      },
    ],
  },
  dataNotes: {
    eyebrow: "Data foundation",
    h2: "Tracking only holds on trips in the TMS",
    lead: "Visibility assumes indent, dispatch, and close-out land in ZAFTYS TMS. Spot folklore outside the system is not the product promise.",
    points: [
      "Live at app.zaftys.com for contracted programs",
      "Integrated with billing and trip close-out",
      "Own vs Network labeling preserved on the movement",
      "Ask during demo how your corridors and portal users are onboarded",
    ],
    cta: { label: "Open ZAFTYS TMS", path: paths.technology.tms },
  },
  honesty: {
    eyebrow: "Availability",
    h2: "Available on contracted trips in ZAFTYS TMS",
    body: "Tracking and portal depth depend on how the trip is run in the TMS. We do not claim universal visibility on every marketplace truck outside contracted workflows.",
  },
  related: {
    eyebrow: "Related",
    h2: "Continue in the Platform",
    links: [
      {
        name: "ZAFTYS TMS",
        path: paths.technology.tms,
        blurb: "Full platform landing",
      },
      {
        name: "Fleet management",
        path: paths.technology.fleetManagement,
        blurb: "Vehicles, drivers, documents",
      },
      {
        name: "ZAFTYS Analytics",
        path: paths.intelligence.analytics,
        blurb: "Corridor KPIs on the same spine",
      },
      {
        name: "Logistics APIs",
        path: paths.technology.apis,
        blurb: "Push status into your systems",
      },
    ],
  },
  finalCta: {
    h2: "Give the shipper a portal, not another WhatsApp group",
    lead: "Book a tracking walkthrough, or start from the ZAFTYS TMS platform page.",
    primaryLabel: "Book a TMS demo",
    secondary: { label: "Back to ZAFTYS TMS", path: paths.technology.tms },
  },
};

export const logisticsApisLeafCopy: IntelligenceLeafCopy = {
  id: "apis",
  status: "Available",
  seo: {
    title: "Logistics API Integrations | ZAFTYS TMS",
    description:
      "Connect ZAFTYS TMS trip, fleet, and visibility data with ERP and commercial systems. Scope confirmed in enterprise onboarding. Only implemented endpoints are discussed.",
  },
  canonical: paths.technology.apis,
  breadcrumbs: [
    homeCrumb,
    tmsCrumb,
    { name: "Logistics APIs", path: paths.technology.apis },
  ],
  hero: {
    badge: "Logistics APIs · Available",
    h1: "Connect transportation data to your systems.",
    lead: "Integrate trip, fleet, and visibility data from ZAFTYS TMS with ERP, warehouse, and commercial workflows. We only discuss endpoints that are implemented. Scope is confirmed in enterprise onboarding.",
    imageAlt: "ZAFTYS TMS network and integrations context",
    primaryCtaLabel: "Discuss API onboarding",
    secondaryCta: { label: "Open ZAFTYS TMS", path: paths.technology.tms },
  },
  mail: {
    subject: "ZAFTYS TMS API integration inquiry",
    body: "Hi ZAFTYS,\n\nI want to discuss logistics API integration with ZAFTYS TMS.\n\nCompany:\nRole:\nSystems to connect (ERP / WMS / other):\nUse cases:\n\n",
  },
  problem: {
    eyebrow: "The integration problem",
    h2: "ERP cannot invent a trip the TMS never held",
    lead: "Finance and planning systems need clean movement data. Middleware promises fail when the operational record is incomplete or undocumented.",
    items: [
      {
        title: "Generic API brochures",
        body: "Endpoint lists that do not match what the dispatch desk actually writes on a live trip.",
      },
      {
        title: "Manual rekey into ERP",
        body: "Billing and status copied by hand because trip truth never left the TMS.",
      },
      {
        title: "Unscoped onboarding",
        body: "Integration projects that start without stating which modules and events are live.",
      },
    ],
  },
  capabilities: {
    eyebrow: "What you get",
    h2: "APIs around real dispatch workflows",
    lead: "Built for shippers and operators already on ZAFTYS TMS, not a standalone middleware brand.",
    items: [
      {
        title: "Trip data for downstream systems",
        body: "Operational records available for integration where your commercial stack needs the movement.",
      },
      {
        title: "Status events where supported",
        body: "Event-driven updates for dispatch and delivery milestones that exist in the product today.",
      },
      {
        title: "Fleet and document context",
        body: "Connect registry and compliance fields when the onboarding scope includes fleet modules.",
      },
      {
        title: "Enterprise onboarding",
        body: "Structured planning for which systems, corridors, and users come online first.",
      },
      {
        title: "Honest endpoint boundaries",
        body: "We do not advertise APIs that are not implemented. Scope is written before build work starts.",
      },
      {
        title: "Same internal platform",
        body: "Integrations sit on the stack ZAFTYS uses for its own contracted trips.",
      },
    ],
  },
  visual: {
    eyebrow: "Product",
    h2: "Operational data from the TMS spine",
    lead: "APIs only matter when Command Center, Shipments, and close-out already hold the trip.",
    primary: {
      src: "/images/tms/network.webp",
      alt: "ZAFTYS TMS network view for capacity and partner context",
      caption: "Network · capacity and partner context",
    },
    secondary: {
      src: "/images/tms/shipments.webp?v=2",
      alt: "ZAFTYS TMS Shipments screen as source for trip data integrations",
      caption: "Shipments · trip records for downstream systems",
    },
  },
  whoFor: {
    eyebrow: "Who it is for",
    h2: "IT and ops leads connecting commercial systems",
    items: [
      {
        title: "IT and integration leads",
        body: "Need scoped endpoints and onboarding, not a PDF of aspirational APIs.",
      },
      {
        title: "Shipper technology teams",
        body: "Want trip and ePOD data into ERP or planning tools after TMS is live.",
      },
      {
        title: "Fleet operator systems owners",
        body: "Connecting dispatch truth to billing and internal reporting stacks.",
      },
    ],
  },
  dataNotes: {
    eyebrow: "How we onboard",
    h2: "Scope first. Then endpoints.",
    lead: "API work starts with which trip events and systems matter. We do not start from a generic swagger dump.",
    points: [
      "Discuss specific endpoints during enterprise onboarding",
      "Built around dispatch workflows, not generic middleware",
      "Availability varies by module and customer program",
      "TMS login and desk process come before integration theatre",
    ],
    cta: { label: "Open ZAFTYS TMS", path: paths.technology.tms },
  },
  honesty: {
    eyebrow: "Availability",
    h2: "Available under scoped enterprise onboarding",
    body: "Logistics APIs are offered where implemented for your program. This page does not publish a fake universal endpoint catalog. Ask for the live scope before you plan an ERP project.",
  },
  related: {
    eyebrow: "Related",
    h2: "Continue in the Platform",
    links: [
      {
        name: "ZAFTYS TMS",
        path: paths.technology.tms,
        blurb: "Full platform landing",
      },
      {
        name: "Tracking and visibility",
        path: paths.technology.tracking,
        blurb: "Live map and ePOD",
      },
      {
        name: "Fleet management",
        path: paths.technology.fleetManagement,
        blurb: "Vehicles and documents",
      },
      {
        name: "ZAFTYS Analytics",
        path: paths.intelligence.analytics,
        blurb: "KPIs on the same trip spine",
      },
    ],
  },
  finalCta: {
    h2: "Scope the integration against trips you actually run",
    lead: "Tell us which systems must receive trip and ePOD data. We will confirm what is live before anyone writes middleware.",
    primaryLabel: "Discuss API onboarding",
    secondary: { label: "Back to ZAFTYS TMS", path: paths.technology.tms },
  },
};
