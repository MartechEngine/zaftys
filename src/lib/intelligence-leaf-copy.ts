/**
 * Intelligence leaf pages: Analytics, Freight Rates, Market Intelligence, Supply Chain AI.
 * Dense product copy. No invented public KPIs. No em dash, en dash, or spaced hyphen as a dash.
 */

import { paths } from "@/lib/site-paths";
import type { IntelStatus } from "@/lib/intelligence-hub-copy";

export type IntelligenceLeafCopy = {
  id: string;
  status: IntelStatus;
  seo: { title: string; description: string };
  canonical: string;
  breadcrumbs: { name: string; path: string }[];
  hero: {
    badge: string;
    h1: string;
    lead: string;
    imageAlt: string;
    primaryCtaLabel: string;
    /** When set, primary CTA is an in-app link instead of mailto. */
    primaryCtaPath?: string;
    secondaryCta: { label: string; path: string };
  };
  mail: { subject: string; body: string };
  problem: {
    eyebrow: string;
    h2: string;
    lead: string;
    items: readonly { title: string; body: string }[];
  };
  capabilities: {
    eyebrow: string;
    h2: string;
    lead: string;
    items: readonly { title: string; body: string }[];
  };
  visual: {
    eyebrow: string;
    h2: string;
    lead: string;
    primary: { src: string; alt: string; caption: string };
    secondary?: { src: string; alt: string; caption: string };
  };
  whoFor: {
    eyebrow: string;
    h2: string;
    items: readonly { title: string; body: string }[];
  };
  dataNotes: {
    eyebrow: string;
    h2: string;
    lead: string;
    points: readonly string[];
    cta: { label: string; path: string };
  };
  honesty: {
    eyebrow: string;
    h2: string;
    body: string;
  };
  related: {
    eyebrow: string;
    h2: string;
    links: readonly { name: string; path: string; blurb: string }[];
  };
  finalCta: {
    h2: string;
    lead: string;
    primaryLabel: string;
    primaryPath?: string;
    secondary: { label: string; path: string };
  };
};

const homeCrumb = { name: "Home", path: "/" };
const intelCrumb = { name: "Intelligence", path: paths.intelligence.hub };

export const analyticsLeafCopy: IntelligenceLeafCopy = {
  id: "analytics",
  status: "Available",
  seo: {
    title: "ZAFTYS Analytics India | Operations Transportation Data",
    description:
      "Operations analytics for India corridors from trips ZAFTYS runs: lane reliability, owned vs network performance, cost against trip records, and ePOD close-out. Built on ZAFTYS TMS.",
  },
  canonical: paths.intelligence.analytics,
  breadcrumbs: [homeCrumb, intelCrumb, { name: "Analytics", path: paths.intelligence.analytics }],
  hero: {
    badge: "ZAFTYS Analytics · Available",
    h1: "Operations analytics from trips you can defend.",
    lead: "Corridor reliability, Own vs Network score, cost against trip records, and exception close-out from the same Command Center stack the Amravati desk uses.",
    imageAlt: "ZAFTYS Analytics on TMS operational data",
    primaryCtaLabel: "Explore ZAFTYS Analytics",
    secondaryCta: { label: "See ZAFTYS TMS", path: paths.technology.tms },
  },
  mail: {
    subject: "ZAFTYS Analytics inquiry",
    body: "Hi ZAFTYS,\n\nI want to explore ZAFTYS Analytics.\n\nCompany:\nRole:\nCorridors / use case:\n\n",
  },
  problem: {
    eyebrow: "The desk problem",
    h2: "Status lives in chats. Decisions need trip truth.",
    lead: "Plant and procurement meetings ask for corridor reliability and carrier score. WhatsApp threads and spreadsheet exports cannot answer without the dispatch record.",
    items: [
      {
        title: "Scattered exception signal",
        body: "Delay, gate, and ePOD pressure arrive as messages instead of a queue tied to the trip.",
      },
      {
        title: "Blended fleet storytelling",
        body: "Owned trucks and network overflow get mixed into one KPI, so accountability disappears.",
      },
      {
        title: "Cost without the trip",
        body: "Commercial conversations happen without dispatch and billing linkage on the same movement.",
      },
    ],
  },
  capabilities: {
    eyebrow: "What you get",
    h2: "Analytics built on trips ZAFTYS executes",
    lead: "Not a generic visibility demo. Views from ZAFTYS TMS history on corridors and programs you run.",
    items: [
      {
        title: "Lane and corridor performance",
        body: "Transit shape, exception patterns, and reliability by corridor from live trip history.",
      },
      {
        title: "Owned fleet vs network score",
        body: "Company trucks and TranZfort overflow measured separately. Never silently blended.",
      },
      {
        title: "Cost against trip records",
        body: "Commercial cost visibility tied to dispatch and billing where TMS is live.",
      },
      {
        title: "Exception and close-out views",
        body: "Delay, gate, and ePOD cycle pressure so the desk can act, not only watch a map.",
      },
      {
        title: "Shipper and operator lenses",
        body: "Same operational truth, framed for the plant desk or the fleet desk that needs it.",
      },
      {
        title: "Command Center continuity",
        body: "Screens match app.zaftys.com so training is the product, not a separate BI project.",
      },
    ],
  },
  visual: {
    eyebrow: "Product",
    h2: "Command Center and Shipments as the source",
    lead: "Intelligence reads the same trip lifecycle ZAFTYS dispatches and closes every day.",
    primary: {
      src: "/images/tms/command-center.webp",
      alt: "ZAFTYS TMS Command Center with operational KPIs",
      caption: "Command Center · operational KPIs from live trips",
    },
    secondary: {
      src: "/images/tms/shipments.webp",
      alt: "ZAFTYS TMS Shipments screen with live load status",
      caption: "Shipments · status aligned to the trip lifecycle",
    },
  },
  whoFor: {
    eyebrow: "Who it is for",
    h2: "People who own the lane outcome",
    items: [
      {
        title: "Shippers and manufacturers",
        body: "Corridor reliability and detention pressure without calling the control room for every status.",
      },
      {
        title: "Fleet and 3PL operators",
        body: "Dispatch KPIs and partner performance on the stack ZAFTYS runs internally.",
      },
      {
        title: "Logistics and plant leads",
        body: "OTIF shape and exception queues framed for weekly ops reviews.",
      },
    ],
  },
  dataNotes: {
    eyebrow: "Data foundation",
    h2: "Analytics only holds if the trip record is complete",
    lead: "Indent, gate, GPS, ePOD, and billing need to land in ZAFTYS TMS. That is the contract for trustworthy corridor views.",
    points: [
      "Dispatch and trip lifecycle from app.zaftys.com",
      "Own fleet and labeled TranZfort overflow kept distinct",
      "Plant and port windows treated as first-class events",
      "Market reports sit under Market Intelligence, not inside these KPIs",
    ],
    cta: { label: "Open ZAFTYS TMS", path: paths.technology.tms },
  },
  honesty: {
    eyebrow: "Availability",
    h2: "Available for operations ZAFTYS runs and customer TMS programs",
    body: "Module scope is confirmed during onboarding. This page does not invent public fleet or corridor counts. Institutional research lives on Market Intelligence and /reports.",
  },
  related: {
    eyebrow: "Related modules",
    h2: "Continue in Logistics Intelligence",
    links: [
      {
        name: "Freight Rate Intelligence",
        path: paths.intelligence.freightRates,
        blurb: "Lane rate context · Beta",
      },
      {
        name: "Market Intelligence",
        path: paths.intelligence.marketIntelligence,
        blurb: "Institutional reports · Available",
      },
      {
        name: "Supply Chain AI",
        path: paths.intelligence.ai,
        blurb: "Desk AI roadmap · Research",
      },
      {
        name: "Intelligence hub",
        path: paths.intelligence.hub,
        blurb: "All modules overview",
      },
    ],
  },
  finalCta: {
    h2: "Put your corridors on analytics the desk already trusts",
    lead: "Ask for an Analytics walkthrough, or start from the TMS we dispatch on every day.",
    primaryLabel: "Explore ZAFTYS Analytics",
    secondary: { label: "Back to Intelligence", path: paths.intelligence.hub },
  },
};

export const freightRatesLeafCopy: IntelligenceLeafCopy = {
  id: "freight-rates",
  status: "Beta",
  seo: {
    title: "Freight Rate Intelligence India | Lane Context",
    description:
      "Lane-level freight rate context from ZAFTYS for India corridors you run. Beta product linked to trip and desk records. Not a published national spot index.",
  },
  canonical: paths.intelligence.freightRates,
  breadcrumbs: [homeCrumb, intelCrumb, { name: "Freight Rates", path: paths.intelligence.freightRates }],
  hero: {
    badge: "Freight Rate Intelligence · Beta",
    h1: "Lane rate context you can take to a plant meeting.",
    lead: "Corridor movement for lanes you operate, linked to trip and commercial records. Explicitly Beta. Not a scraped national average, and not a substitute for your contracted rate.",
    imageAlt: "ZAFTYS Freight Rate Intelligence dashboard",
    primaryCtaLabel: "Request rate intelligence access",
    secondaryCta: { label: "See Analytics", path: paths.intelligence.analytics },
  },
  mail: {
    subject: "Freight Rate Intelligence early access",
    body: "Hi ZAFTYS,\n\nI want early access to Freight Rate Intelligence.\n\nCompany:\nRole:\nCorridors of interest:\nVehicle classes:\n\n",
  },
  problem: {
    eyebrow: "The procurement problem",
    h2: "Generic indexes do not survive a plant negotiation",
    lead: "Peers publish lane benchmarks and spot indexes. Your desk needs corridor context for the lanes you run, with limits you can state out loud.",
    items: [
      {
        title: "National averages without your lane",
        body: "A countrywide number that cannot be defended against your origin, body class, and plant window.",
      },
      {
        title: "Contract renewals on gut feel",
        body: "Overflow and renewal decisions without a defined window of corridor movement.",
      },
      {
        title: "Silent product limits",
        body: "Tools that look complete in a demo but hide which corridors and commodities are actually live.",
      },
    ],
  },
  capabilities: {
    eyebrow: "What you get",
    h2: "Beta corridor context, labeled limits",
    lead: "Built for logistics and procurement heads who need corridor language, not a marketing chart.",
    items: [
      {
        title: "Corridor movement over time",
        body: "Rate context on program lanes across a defined window, not a scraped national average.",
      },
      {
        title: "Contract vs spot framing",
        body: "Support renewals and overflow choices where ZAFTYS TMS is deployed on the lane.",
      },
      {
        title: "Filters the desk actually uses",
        body: "Origin, destination, commodity, and vehicle class as working dimensions in the Beta product.",
      },
      {
        title: "Alerts on thresholds you set",
        body: "Early access rate alerts for lanes you care about, with stated Beta coverage.",
      },
      {
        title: "Operational linkage",
        body: "Tied to trip and desk records where available, so context stays near the movement.",
      },
      {
        title: "Honest Beta boundary",
        body: "Phased corridors, early access, limits stated before you buy. Marketing does not invent live rates.",
      },
    ],
  },
  visual: {
    eyebrow: "Product",
    h2: "Freight Rate Intelligence dashboard",
    lead: "The Beta product surface for lane trends, vehicle and commodity cuts, and desk alerts. Coverage is confirmed during onboarding.",
    primary: {
      src: "/images/intelligence/freight-rate-intelligence.png",
      alt: "ZAFTYS Freight Rate Intelligence dashboard with lane rates, trends, and alerts",
      caption: "Freight Rate Intelligence · Beta product view",
    },
  },
  whoFor: {
    eyebrow: "Who it is for",
    h2: "Procurement and ops leads on active corridors",
    items: [
      {
        title: "Procurement and logistics heads",
        body: "Corridor context for renewals and spot overflow, without treating the screen as your contracted rate.",
      },
      {
        title: "Shipper control towers",
        body: "Lane movement language for weekly freight reviews on programs ZAFTYS runs or TMS-connects.",
      },
      {
        title: "Fleet commercial teams",
        body: "Context alongside Analytics when Own vs Network mix and lane cost both matter.",
      },
    ],
  },
  dataNotes: {
    eyebrow: "Data foundation",
    h2: "Rate context follows the trip and the desk",
    lead: "Beta quality depends on trip records, commercial history, and the corridors you enroll. It is not a public spot exchange.",
    points: [
      "Linked to trip data where ZAFTYS TMS is live",
      "Corridors and commodities confirmed in early access",
      "Not a substitute for a contracted rate on your lane",
      "Ask for corridor list before treating any chart as decision-ready",
    ],
    cta: { label: "See ZAFTYS TMS", path: paths.technology.tms },
  },
  honesty: {
    eyebrow: "Availability",
    h2: "Labeled Beta until full product release",
    body: "Early access with limited corridors or features. Limits are stated before you buy. Dashboard figures on marketing pages are product UI, not a published national rate commitment.",
  },
  related: {
    eyebrow: "Related modules",
    h2: "Continue in Logistics Intelligence",
    links: [
      {
        name: "ZAFTYS Analytics",
        path: paths.intelligence.analytics,
        blurb: "Operations KPIs · Available",
      },
      {
        name: "Market Intelligence",
        path: paths.intelligence.marketIntelligence,
        blurb: "Institutional reports · Available",
      },
      {
        name: "Supply Chain AI",
        path: paths.intelligence.ai,
        blurb: "Desk AI roadmap · Research",
      },
      {
        name: "Intelligence hub",
        path: paths.intelligence.hub,
        blurb: "All modules overview",
      },
    ],
  },
  finalCta: {
    h2: "Get early access on the corridors you actually run",
    lead: "Tell us your lanes and vehicle classes. We will confirm Beta coverage before anything is treated as live.",
    primaryLabel: "Request rate intelligence access",
    secondary: { label: "Back to Intelligence", path: paths.intelligence.hub },
  },
};

export const marketIntelligenceLeafCopy: IntelligenceLeafCopy = {
  id: "market",
  status: "Available",
  seo: {
    title: "Logistics Market Intelligence Reports India | ZAFTYS",
    description:
      "Institutional logistics market reports and digital freight matching research from ZAFTYS Analytics for India freight desks. Preview online, unlock PDFs with company email.",
  },
  canonical: paths.intelligence.marketIntelligence,
  breadcrumbs: [
    homeCrumb,
    intelCrumb,
    { name: "Market Intelligence", path: paths.intelligence.marketIntelligence },
  ],
  hero: {
    badge: "Market Intelligence · Available",
    h1: "Research on how freight markets move.",
    lead: "Institutional PDFs on logistics outlook and digital freight matching, framed for industrial freight desks. Preview online, unlock the full report with a company email.",
    imageAlt: "ZAFTYS market intelligence report preview",
    primaryCtaLabel: "Browse market reports",
    primaryCtaPath: paths.reports,
    secondaryCta: { label: "Intelligence hub", path: paths.intelligence.hub },
  },
  mail: {
    subject: "Market intelligence inquiry",
    body: "Hi ZAFTYS,\n\nI want to discuss market intelligence and reports.\n\nCompany:\nRole:\nTopics of interest:\n\n",
  },
  problem: {
    eyebrow: "The research problem",
    h2: "Ops teams need market framing, not SEO summaries",
    lead: "Generic logistics blogs do not help a plant or procurement lead prepare for corridor and mode conversations. Research has to speak plant windows, FTL, and digital matching honestly.",
    items: [
      {
        title: "Thin market content",
        body: "Recycled headlines without operational framing or a full PDF you can circulate.",
      },
      {
        title: "Reports disconnected from the desk",
        body: "Institutional PDFs that never link back to Analytics, TMS, or how ZAFTYS runs trips.",
      },
      {
        title: "No clear unlock path",
        body: "Paywalls without a preview, or previews that never become a usable company PDF.",
      },
    ],
  },
  capabilities: {
    eyebrow: "What you get",
    h2: "Institutional reports plus ops-informed framing",
    lead: "Available now at /reports. Separate from live Operations Analytics KPIs.",
    items: [
      {
        title: "Institutional market reports",
        body: "Global logistics outlook and digital freight matching research hosted on ZAFTYS Analytics reports.",
      },
      {
        title: "Ops-informed language",
        body: "Written for industrial freight desks: plant windows, FTL, ePOD, and corridor decisions.",
      },
      {
        title: "Gated full PDF",
        body: "Preview the cover and summary, then unlock the full PDF with a company email.",
      },
      {
        title: "Blog deep research",
        body: "Complementary pieces on plant TAT, ePOD billing, spot vs dedicated, and TMS evaluation.",
      },
      {
        title: "Clear product boundary",
        body: "Market research does not pretend to be live lane KPIs. Those live in Analytics.",
      },
      {
        title: "Desk follow-up",
        body: "After reading, ask for a corridor walkthrough if you want operational next steps.",
      },
    ],
  },
  visual: {
    eyebrow: "Product",
    h2: "Market report preview and gated PDF",
    lead: "Open the report surface, review the preview, unlock the full PDF with a company email.",
    primary: {
      src: "/images/reports/global-logistics-market-2027-2036-preview.png",
      alt: "ZAFTYS Analytics market report cover preview",
      caption: "Market report cover · unlock full PDF with company email",
    },
  },
  whoFor: {
    eyebrow: "Who it is for",
    h2: "Leaders preparing market and corridor conversations",
    items: [
      {
        title: "Logistics and supply chain heads",
        body: "Market framing for board or plant reviews without confusing research with live TMS KPIs.",
      },
      {
        title: "Strategy and commercial teams",
        body: "Digital freight matching and logistics outlook material with a clear PDF unlock path.",
      },
      {
        title: "Operators evaluating ZAFTYS",
        body: "Research that sits next to Analytics and TMS so the product story stays coherent.",
      },
    ],
  },
  dataNotes: {
    eyebrow: "How it connects",
    h2: "Research sits beside operations, not inside them",
    lead: "Use Market Intelligence for outlook and matching research. Use Analytics and TMS for trip truth on corridors you run.",
    points: [
      "Full library at /reports",
      "Company email gate for PDF download",
      "Blog deep research for operational topics",
      "No invented live rate tables on this page",
    ],
    cta: { label: "Browse market reports", path: paths.reports },
  },
  honesty: {
    eyebrow: "Availability",
    h2: "Available now through reports and this module page",
    body: "Preview and gated PDF flows are live. This module does not replace Operations Analytics or Freight Rate Intelligence Beta coverage statements.",
  },
  related: {
    eyebrow: "Related modules",
    h2: "Continue in Logistics Intelligence",
    links: [
      {
        name: "View reports",
        path: paths.reports,
        blurb: "Full report library",
      },
      {
        name: "ZAFTYS Analytics",
        path: paths.intelligence.analytics,
        blurb: "Operations KPIs · Available",
      },
      {
        name: "Freight Rate Intelligence",
        path: paths.intelligence.freightRates,
        blurb: "Lane rate context · Beta",
      },
      {
        name: "Intelligence hub",
        path: paths.intelligence.hub,
        blurb: "All modules overview",
      },
    ],
  },
  finalCta: {
    h2: "Open the reports, then talk corridors if you need to",
    lead: "Browse the library, unlock a PDF with your company email, or ask the desk for a walkthrough.",
    primaryLabel: "Browse market reports",
    primaryPath: paths.reports,
    secondary: { label: "Back to Intelligence", path: paths.intelligence.hub },
  },
};
