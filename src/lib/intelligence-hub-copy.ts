/**
 * /intelligence hub — product-complete logistics intelligence.
 * Ops-first; capabilities labeled Available / Beta / Research.
 * No invented market rates or fake KPI counts.
 * No em dash, en dash, or spaced hyphen used as a dash.
 */

import { paths } from "@/lib/site-paths";

export type IntelStatus = "Available" | "Beta" | "Research";

export const intelligenceHubCopy = {
  hero: {
    badge: "Logistics Intelligence",
    h1: "Decisions from the trips you actually run.",
    lead:
      "ZAFTYS Intelligence sits on top of transportation we execute: dispatch, exceptions, lane cost, carrier score, and market research. Not a generic visibility SaaS. Capabilities are labeled Available, Beta, or Research.",
  },
  intro: {
    eyebrow: "What it is",
    h2: "A decision layer for industrial freight desks",
    lead:
      "Peers sell control towers, lane benchmarking, and predictive ETAs. We build the same class of tools around data from ZAFTYS TMS and the Amravati desk, so analytics match plant windows, GST trips, and Own vs Network labeling.",
    pillars: [
      {
        title: "Operations analytics",
        body: "OTIF shape, exception queues, utilization, and ePOD cycle time from trips in ZAFTYS TMS.",
      },
      {
        title: "Lane and rate context",
        body: "Corridor cost and movement for lanes you run. Beta for rate intelligence. Not a published spot index.",
      },
      {
        title: "Market research",
        body: "Institutional reports on logistics and digital freight matching, gated for company email.",
      },
      {
        title: "Desk AI (research)",
        body: "Exception summaries and operational queries under research. Labeled before anything ships as product.",
      },
    ],
  },
  buyers: {
    eyebrow: "Who it is for",
    h2: "Built for people who own the lane, not a slide deck",
    items: [
      {
        title: "Shippers and manufacturers",
        body: "See corridor reliability, detention pressure, and carrier score without calling the control room for every status.",
      },
      {
        title: "Fleet and 3PL operators",
        body: "Dispatch KPIs, empty-km pressure, and partner performance on the same stack ZAFTYS runs internally.",
      },
      {
        title: "Procurement and logistics heads",
        body: "Lane cost context and market reports to support contract vs spot decisions. Not a substitute for your negotiated rate.",
      },
    ],
  },
  modules: [
    {
      id: "analytics",
      title: "Operations Analytics",
      status: "Available" as IntelStatus,
      lead:
        "KPI dashboards and drill-downs on transportation ZAFTYS executes. Lane reliability, cost against trip records, owned fleet vs labeled network, and delivery close-out.",
      points: [
        "Corridor transit and exception patterns from live trip history",
        "Owned fleet and partner performance measured separately",
        "Cost views tied to dispatch and billing records where TMS is live",
        "Shipper and operator views from the same operational truth",
      ],
      image: "/images/tms/command-center.webp",
      imageAlt: "ZAFTYS TMS Command Center with operational KPIs",
      cta: { label: "Explore ZAFTYS Analytics", path: paths.intelligence.analytics },
    },
    {
      id: "control",
      title: "Exception and control views",
      status: "Available" as IntelStatus,
      lead:
        "Visibility only helps if the desk can act. Intelligence surfaces delay, deviation, and gate pressure from ZAFTYS TMS shipments and live map, then hands the trip back to dispatch.",
      points: [
        "Shipment list and status aligned to the trip lifecycle",
        "Live map for active contracted moves",
        "Exception queues instead of scattered WhatsApp threads",
        "Same system the Amravati desk uses on company trips",
      ],
      image: "/images/tms/shipments.webp",
      imageAlt: "ZAFTYS TMS Shipments screen with live load status",
      cta: { label: "See tracking and TMS", path: paths.technology.tracking },
      secondaryCta: { label: "Open ZAFTYS TMS", path: paths.technology.tms },
    },
    {
      id: "freight-rates",
      title: "Freight Rate Intelligence",
      status: "Beta" as IntelStatus,
      lead:
        "Lane-level rate context for corridors you operate. Built from operational and commercial records, not a scraped national average you cannot defend in a plant meeting.",
      points: [
        "Corridor rate movement over time for lanes in your program",
        "Context for contract renewals and spot overflow decisions",
        "Linked to trip data where ZAFTYS TMS is deployed",
        "Explicitly Beta: early access, phased corridors, labeled limits",
      ],
      image: "/images/intelligence/freight-rate-intelligence.webp",
      imageAlt: "ZAFTYS Freight Rate Intelligence dashboard with lane rates, trends, and alerts",
      cta: { label: "Freight rate intelligence", path: paths.intelligence.freightRates },
    },
    {
      id: "market",
      title: "Market Intelligence",
      status: "Available" as IntelStatus,
      lead:
        "Institutional research on logistics markets and digital freight matching. Open a preview, unlock the full PDF with a company email.",
      points: [
        "Global logistics market outlook reports",
        "Digital freight matching research",
        "Ops-informed framing, not generic SEO summaries",
        "Also linked from blog deep research on plant TAT, ePOD, and FTL",
      ],
      image: "/images/reports/global-logistics-market-2027-2036-preview.png",
      imageAlt: "ZAFTYS Analytics market report cover preview",
      cta: { label: "Browse market reports", path: paths.reports },
      secondaryCta: { label: "Market intelligence page", path: paths.intelligence.marketIntelligence },
    },
    {
      id: "ai",
      title: "Supply Chain AI",
      status: "Research" as IntelStatus,
      lead:
        "AI for desk workflows: exception narrative, lane answers, guardrails on trip truth, and TranZfort matching. We are not pitching a generic AI company.",
      points: [
        "Research on exception and corridor answers from trip events",
        "Guardrails that refuse invented rates or truck status",
        "Orchestration into ZAFTYS TMS and desk queues",
        "TranZfort already uses AI for corridor and vehicle fit",
      ],
      image: "/images/intelligence/ai-02-processing.webp",
      imageAlt: "ZAFTYS Supply Chain AI processing: exception narrative, lane questions, vehicle fit, and risk",
      cta: { label: "Read the Supply Chain AI article", path: paths.intelligence.ai },
    },
  ],
  dataFoundation: {
    eyebrow: "Data foundation",
    h2: "Intelligence is only as good as the trip record",
    lead:
      "Industry platforms promise predictive ETAs and lane benchmarks. Those only hold if indent, gate, weigh, GPS, ePOD, and billing land in one system. ZAFTYS Intelligence assumes ZAFTYS TMS on contracted trips.",
    points: [
      "Dispatch and trip lifecycle from app.zaftys.com",
      "Own fleet and labeled TranZfort overflow kept distinct in reporting",
      "Plant and port windows treated as first-class events, not a single map pin",
      "No invented corridor counts or blended owned fleet tallies on marketing pages",
    ],
    ctaTms: { label: "See ZAFTYS TMS", path: paths.technology.tms },
    ctaLogistics: { label: "Logistics services", path: paths.logistics.hub },
  },
  honesty: {
    eyebrow: "How we label capability",
    h2: "Available. Beta. Research. Say it on the page.",
    items: [
      {
        status: "Available",
        body: "In production for ZAFTYS operations and offered to customers under normal onboarding.",
      },
      {
        status: "Beta",
        body: "Early access with limited corridors or features. Limits are stated before you buy.",
      },
      {
        status: "Research",
        body: "Active development. Not sold as a finished module. Status updates before launch.",
      },
    ],
  },
  finalCta: {
    h2: "Put your corridors on a decision layer that matches the desk",
    lead: "Ask for an intelligence walkthrough, open market reports, or start from the TMS we already run.",
    primaryLabel: "Explore logistics intelligence",
    secondaryLabel: "Browse market reports",
  },
} as const;

export const intelligenceInquiryMail = {
  subject: "Logistics intelligence inquiry",
  body: "Hi ZAFTYS,\n\nI want to explore Logistics Intelligence.\n\nCompany:\nRole:\nCorridors / use case:\nModules of interest (Analytics / Rates / Reports / AI):\n\n",
} as const;
