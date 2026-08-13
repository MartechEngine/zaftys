/** ZAFTYS Market Reports  -  logistics & supply chain sneak-peek modules */

export type ReportCta =
  | { label: string; to: string }
  | { label: string; whatsapp: true };

export type ReportTocItem = {
  title: string;
  children?: readonly string[];
};

export type ReportKpi = {
  label: string;
  value: string;
  note?: string;
};

export type ReportTrustSignal = {
  label: string;
  detail: string;
};

export type MarketReport = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  publishedAt: string;
  updatedAt?: string;
  segment: "logistics-supply-chain";
  summary: string;
  pageCount: number;
  pdfPath: string;
  /** Optional product-page fields (flagship / MnM-style sneak peek) */
  reportId?: string;
  subtitle?: string;
  coverImage?: string;
  kpis?: readonly ReportKpi[];
  overview?: readonly string[];
  toc?: readonly ReportTocItem[];
  trustSignals?: readonly ReportTrustSignal[];
  snapshot: readonly { label: string; value: string; note?: string }[];
  tableOfContents: readonly string[];
  coverage: readonly string[];
  methodology: readonly string[];
  takeaways: readonly string[];
  sources?: readonly { label: string; url?: string }[];
  relatedReportSlugs: readonly string[];
  relatedBlogSlugs: readonly string[];
  cta: ReportCta;
};

export const REPORT_SEGMENT_LABEL = "Logistics & Supply Chain";

function report(
  partial: Omit<MarketReport, "segment" | "pdfPath"> & { pdfPath?: string },
): MarketReport {
  return {
    segment: "logistics-supply-chain",
    pdfPath: partial.pdfPath ?? `/reports/${partial.slug}.pdf`,
    ...partial,
  };
}

export const marketReports: readonly MarketReport[] = [
  report({
    slug: "global-logistics-market-2027-2036",
    title: "Global Logistics Market",
    seoTitle: "Global Logistics Market Size & Forecast 2027-2036",
    seoDescription:
      "ZAFTYS Analytics global logistics market report  -  US$ 4,334.3 BN (2026) to US$ 11,350.0 BN (2036), 10.1% CAGR, modes, regions, and methodology.",
    publishedAt: "2026-08-11",
    reportId: "ZAF-LOGISTICS-2036",
    subtitle:
      "Logistics market by transportation, warehousing, and related services  -  mode, geography, and business scenarios. Historical 2021-2026, forecast 2027-2036.",
    coverImage: "/reports/covers/global-logistics-market-2027-2036-preview.png?v=1",
    pdfPath: "/reports/global-logistics-market-2027-2036.pdf",
    pageCount: 210,
    summary:
      "Institutional market intelligence on the global logistics market: size, growth path to 2036, segment cuts, and a bank-grounded methodology shippers and operators can use for planning.",
    kpis: [
      { label: "Market size 2026", value: "US$ 4,334.3 BN" },
      { label: "Forecast 2036", value: "US$ 11,350.0 BN" },
      { label: "CAGR 2026-2036", value: "10.1%" },
    ],
    overview: [
      "The global logistics market is estimated at US$ 4,334.3 BN in 2026 and is projected to reach US$ 11,350.0 BN by 2036, implying a 10.1% CAGR over the forecast window. The study spans historical analysis from 2021 through 2026 and a forward outlook to 2036.",
      "Coverage follows the logistics value chain from origin through road, port, warehouse, and delivery. Segment views include service offerings, application verticals, tech and fleet, contract models, and regional deep-dives. Modeled series are decision support  -  not audited financial statements.",
      "Estimates use hybrid top-down and bottom-up triangulation (preferring top-down where coverage is stronger). Databank pins 2026 and 2036 endpoints at about 10.1% CAGR. Gaps are disclosed rather than invented; claims prefer bank-verified sources.",
    ],
    snapshot: [
      { label: "Market size 2026", value: "US$ 4,334.3 BN" },
      { label: "Forecast 2036", value: "US$ 11,350.0 BN" },
      { label: "CAGR", value: "10.1%", note: "2026-2036" },
      { label: "Horizon", value: "2021-2036", note: "History + forecast" },
    ],
    tableOfContents: [
      "Executive summary & growth bridge",
      "Market introduction & scope",
      "Market dynamics & regulations",
      "Global market by service offering",
      "Application verticals",
      "Tech & fleet",
      "End user / contract models",
      "Regional deep-dives",
      "Competitive landscape",
      "Appendix & references",
    ],
    toc: [
      {
        title: "1 Executive summary & growth bridge",
        children: ["Growth bridge", "Key findings for planners"],
      },
      {
        title: "2 Market introduction & scope",
        children: ["Taxonomy — service offering", "Taxonomy — application verticals", "Methodology matrix", "Top-down vs bottom-up"],
      },
      {
        title: "3 Market dynamics & regulations",
        children: ["Drivers & restraints", "PESTLE / Porter / SWOT", "Pricing & fuel volatility", "Patent & innovation themes"],
      },
      {
        title: "4 Global market by service offering",
        children: ["Road, ocean, air, rail & intermodal", "Service offering detail grids"],
      },
      {
        title: "5 Application verticals",
        children: ["Last-mile parcel", "Automotive & heavy machinery", "Cold chain & medical", "Hazmat & project cargo"],
      },
      {
        title: "6 Tech & fleet",
        children: ["Road / ocean / air / rail capacity", "EV & autonomous pilots", "WMS / TMS software stack"],
      },
      {
        title: "7 End user / contract model",
        children: ["Shippers", "3PL / 4PL", "Carriers & brokers"],
      },
      {
        title: "8-13 Regional deep-dives & competition",
        children: ["North America and other regions", "Competitive landscape & profiles"],
      },
      {
        title: "14-17 Exhibits, scenarios & appendix",
        children: ["Exhibit reading guide", "Scenario bands & sensitivity", "Appendix & references"],
      },
    ],
    coverage: [
      "Transportation & logistics services",
      "Application verticals",
      "Tech, fleet & contract models",
      "Regional deep-dives & competition",
    ],
    methodology: [
      "Hybrid top-down + bottom-up triangulation (prefer top-down where evidence is stronger)",
      "Databank pins 2026 = US$ 4,334.3 BN and 2036 = US$ 11,350.0 BN at about 10.1% CAGR",
      "Numeric claims prefer bank-verified sources; gaps are disclosed rather than invented",
      "Modeled series are decision support  -  not audited financial statements",
    ],
    takeaways: [
      "Global logistics spend is modeled from US$ 4,334.3 BN in 2026 to US$ 11,350.0 BN in 2036 at a 10.1% CAGR.",
      "Service, vertical, fleet, and regional cuts matter more than a single headline number.",
      "Use scenario bands and disclosed gaps  -  treat exhibits as planning support, not audited statements.",
    ],
    trustSignals: [
      { label: "Bank-grounded claims", detail: "Pinned Data Bank version; gaps disclosed" },
      { label: "Hybrid estimation", detail: "Top-down + bottom-up triangulation" },
      { label: "Ops + analytics", detail: "ZAFTYS Analytics with logistics operating context" },
    ],
    sources: [
      { label: "ZAFTYS Analytics Data Bank (report ID ZAF-LOGISTICS-2036)" },
      { label: "Bank logistics-institutional-220  -  pinned model version" },
    ],
    relatedReportSlugs: [
      "india-industrial-road-freight-2026",
      "ftl-vs-ltl-industrial-india",
      "tms-adoption-heavy-haul-india",
    ],
    relatedBlogSlugs: ["planning-industrial-shipments", "tms-for-heavy-haul"],
    cta: { label: "Discuss logistics planning on WhatsApp", whatsapp: true },
  }),
  report({
    slug: "india-industrial-road-freight-2026",
    title: "India Industrial Road Freight: What Shippers Should Watch (2026)",
    seoTitle: "India Industrial Road Freight 2026",
    seoDescription:
      "ZAFTYS Logistics sneak peek on India industrial road freight  -  FTL mix, corridors, plant windows, and visibility for cement, steel, and mining shippers.",
    publishedAt: "2026-08-10",
    summary:
      "A shipper-facing outlook on industrial road freight in India: where volume still concentrates, what breaks reliability on plant lanes, and how organized capacity plus TMS visibility change the operating picture.",
    pageCount: 18,
    snapshot: [
      { label: "Focus", value: "Industrial FTL", note: "Heavy-haul and bulk corridors" },
      { label: "Geography", value: "India", note: "Emphasis on MH / industrial belts" },
      { label: "Primary modes", value: "Road FTL", note: "Tipper, open-body, multi-axle" },
      { label: "Audience", value: "Shippers & ops", note: "Plants, mills, mines" },
    ],
    tableOfContents: [
      "Executive summary",
      "Industrial freight demand drivers",
      "Corridor reliability and plant windows",
      "FTL mix: tipper, open-body, multi-axle",
      "Visibility and documentation expectations",
      "Implications for shippers and fleet partners",
      "Sources and definitions",
    ],
    coverage: ["Industrial FTL", "Plant loading windows", "Corridor ops", "ePOD / LR discipline"],
    methodology: [
      "Desk review of public infrastructure and logistics policy notes",
      "ZAFTYS corridor operations observations (qualitative, labeled as ops notes)",
      "Synthesis for industrial shippers  -  not a paid market-size forecast product",
    ],
    takeaways: [
      "Reliability on plant lanes still beats lowest spot rate for most industrial programs.",
      "Empty miles and backhaul design decide whether surge capacity stays profitable.",
      "TMS visibility is becoming a commercial expectation, not a nice-to-have.",
    ],
    sources: [
      { label: "PIB / ministry logistics and infrastructure releases (public)" },
      { label: "ZAFTYS Logistics corridor operations notes (2025-2026)" },
    ],
    relatedReportSlugs: ["ftl-vs-ltl-industrial-india", "maharashtra-industrial-freight-corridors", "tms-adoption-heavy-haul-india"],
    relatedBlogSlugs: ["planning-industrial-shipments", "tms-for-heavy-haul"],
    cta: { label: "Discuss your corridor on WhatsApp", whatsapp: true },
  }),
  report({
    slug: "cement-logistics-india-corridors",
    title: "Cement Logistics in India: Plant Windows, Tippers, and Corridor Reality",
    seoTitle: "Cement Logistics India Corridors",
    seoDescription:
      "ZAFTYS Logistics report sneak peek on cement logistics  -  plant windows, tipper programs, and corridor planning for industrial shippers.",
    publishedAt: "2026-08-10",
    summary:
      "How cement and construction freight actually moves: tipper suitability, plant gate discipline, and what shippers should demand from a logistics partner on active lanes.",
    pageCount: 14,
    snapshot: [
      { label: "Vertical", value: "Cement" },
      { label: "Typical assets", value: "Tippers / bulk" },
      { label: "Critical constraint", value: "Plant windows" },
      { label: "Region focus", value: "India corridors" },
    ],
    tableOfContents: [
      "Cement freight profile",
      "Plant loading windows and queue risk",
      "Tipper vs open-body decisions",
      "Documentation and ePOD expectations",
      "Surge capacity through verified partners",
      "Checklist for shippers",
    ],
    coverage: ["Cement & construction", "Tipper programs", "Plant gates", "Overflow capacity"],
    methodology: [
      "Public cement and infrastructure demand context",
      "ZAFTYS cement-lane operating patterns",
      "Shipper checklist derived from dispatch failure modes",
    ],
    takeaways: [
      "Missed plant windows cost more than a slightly higher freight rate.",
      "Asset match (tipper vs open-body) must be decided before dispatch, not at the gate.",
      "Overflow capacity only works when coordination stays with one accountable partner.",
    ],
    relatedReportSlugs: ["india-industrial-road-freight-2026", "empty-miles-and-backhaul-india"],
    relatedBlogSlugs: ["cement-plant-loading-windows"],
    cta: { label: "Talk cement logistics", whatsapp: true },
  }),
  report({
    slug: "steel-coil-transport-market-india",
    title: "Steel & Coil Transport in India: Handling, Lanes, and Service Discipline",
    seoTitle: "Steel Coil Transport India",
    seoDescription:
      "ZAFTYS Logistics sneak peek on steel and coil transport  -  handling risk, lane discipline, and what industrial shippers should require.",
    publishedAt: "2026-08-09",
    summary:
      "Steel and coil moves punish weak handling and vague ETAs. This sneak peek covers lane patterns, damage risk, and the operating standards that matter.",
    pageCount: 15,
    snapshot: [
      { label: "Vertical", value: "Steel & metals" },
      { label: "Risk focus", value: "Handling / damage" },
      { label: "Asset focus", value: "Flatbed / multi-axle" },
      { label: "Audience", value: "Mills & traders" },
    ],
    tableOfContents: [
      "Steel freight demand pockets",
      "Coil and section handling risks",
      "Lane planning and transit expectations",
      "Documentation and claim readiness",
      "Partner standards checklist",
    ],
    coverage: ["Coil transport", "Heavy sections", "Flatbed / multi-axle", "POD quality"],
    methodology: [
      "Public steel logistics context",
      "ZAFTYS steel-lane ops notes",
      "Failure-mode review (damage, delay, incomplete POD)",
    ],
    takeaways: [
      "Handling standards must be explicit before the first load.",
      "Incomplete POD is a commercial risk, not only an ops annoyance.",
      "Heavy-haul asset fit beats generic marketplace matching.",
    ],
    relatedReportSlugs: ["india-industrial-road-freight-2026", "organized-fleet-vs-brokered-capacity"],
    relatedBlogSlugs: ["steel-coil-transport-basics"],
    cta: { label: "Discuss steel freight", whatsapp: true },
  }),
  report({
    slug: "coal-mining-tipper-logistics-india",
    title: "Coal & Mining Tipper Logistics: Pit-to-Plant Moves That Hold Schedule",
    seoTitle: "Coal Mining Tipper Logistics India",
    seoDescription:
      "ZAFTYS Logistics sneak peek on coal and mining tipper logistics  -  pit-to-plant cycles, utilization, and schedule discipline.",
    publishedAt: "2026-08-09",
    summary:
      "Mining and coal freight live or die on tipper cycles, weighbridge loops, and realistic ETAs. This report sneak peek frames what shippers should measure.",
    pageCount: 13,
    snapshot: [
      { label: "Vertical", value: "Coal & mining" },
      { label: "Cycle focus", value: "Pit-to-plant" },
      { label: "Asset", value: "Tippers" },
      { label: "Ops pressure", value: "Weighbridge / queue" },
    ],
    tableOfContents: [
      "Mining freight profile",
      "Tipper cycle economics",
      "Weighbridge and queue reality",
      "Safety and documentation basics",
      "When to add network overflow",
    ],
    coverage: ["Tipper cycles", "Pit-to-plant", "Weighbridge loops", "Overflow capacity"],
    methodology: [
      "Public mining logistics context",
      "ZAFTYS tipper-lane ops observations",
      "Cycle-time checklist for shippers",
    ],
    takeaways: [
      "Cycle time visibility matters more than a single trip rate quote.",
      "Queue and weighbridge delay should be planned, not treated as surprises.",
      "Overflow partners need the same documentation standard as own fleet.",
    ],
    relatedReportSlugs: ["cement-logistics-india-corridors", "empty-miles-and-backhaul-india"],
    relatedBlogSlugs: ["planning-industrial-shipments"],
    cta: { label: "Talk mining logistics", whatsapp: true },
  }),
  report({
    slug: "ftl-vs-ltl-industrial-india",
    title: "FTL vs LTL for Industrial Shippers in India",
    seoTitle: "FTL vs LTL Industrial India",
    seoDescription:
      "When industrial shippers should choose FTL vs LTL in India  -  ZAFTYS Logistics sneak peek for plant and corridor freight.",
    publishedAt: "2026-08-08",
    summary:
      "A practical comparison of FTL and LTL for industrial freight: cost, control, documentation, and when each model fails on plant lanes.",
    pageCount: 12,
    snapshot: [
      { label: "Models", value: "FTL / LTL" },
      { label: "Best for FTL", value: "Plant programs" },
      { label: "LTL growth pocket", value: "Regional SME" },
      { label: "Decision driver", value: "Control vs cost" },
    ],
    tableOfContents: [
      "Definitions for industrial freight",
      "When FTL is non-negotiable",
      "Where LTL can work",
      "Documentation and visibility differences",
      "Decision framework for shippers",
    ],
    coverage: ["FTL programs", "LTL / PTL", "Plant vs distribution", "Service trade-offs"],
    methodology: [
      "Operational comparison from industrial dispatch patterns",
      "Shipper decision matrix (control, damage risk, window tightness)",
    ],
    takeaways: [
      "Tight plant windows usually push programs toward FTL.",
      "LTL needs stronger scan/POD discipline to protect industrial cargo.",
      "Mixed networks work only with one commercial owner.",
    ],
    relatedReportSlugs: ["india-industrial-road-freight-2026", "organized-fleet-vs-brokered-capacity"],
    relatedBlogSlugs: ["reduce-empty-return-trips"],
    cta: { label: "Get a freight recommendation", whatsapp: true },
  }),
  report({
    slug: "empty-miles-and-backhaul-india",
    title: "Empty Miles & Backhaul in India: Utilization Levers for Industrial Fleets",
    seoTitle: "Empty Miles Backhaul India",
    seoDescription:
      "ZAFTYS Logistics sneak peek on empty miles and backhaul  -  utilization levers for industrial fleets and shippers in India.",
    publishedAt: "2026-08-08",
    summary:
      "Empty return trips silently destroy margins. This sneak peek covers backhaul design, matching, and what shippers can change without creating chaos.",
    pageCount: 11,
    snapshot: [
      { label: "Problem", value: "Empty returns" },
      { label: "Lever", value: "Backhaul design" },
      { label: "Enabler", value: "Matching + TMS" },
      { label: "Audience", value: "Fleet & shippers" },
    ],
    tableOfContents: [
      "Why empty miles persist",
      "Backhaul design for industrial lanes",
      "Matching vs marketplace noise",
      "Measurement: utilization KPIs",
      "Practical playbook",
    ],
    coverage: ["Empty miles", "Backhaul", "Utilization", "Network matching"],
    methodology: [
      "Ops review of return-trip failure modes",
      "KPI definitions usable by shippers and fleet partners",
    ],
    takeaways: [
      "Backhaul must be designed into the lane, not hoped for after dispatch.",
      "Verified matching beats ad-hoc broker spam for industrial cargo.",
      "Utilization KPIs should be shared with the commercial team.",
    ],
    relatedReportSlugs: ["ftl-vs-ltl-industrial-india", "organized-fleet-vs-brokered-capacity"],
    relatedBlogSlugs: ["reduce-empty-return-trips"],
    cta: { label: "Improve lane utilization", whatsapp: true },
  }),
  report({
    slug: "maharashtra-industrial-freight-corridors",
    title: "Maharashtra Industrial Freight Corridors: A Shipper’s Working Map",
    seoTitle: "Maharashtra Industrial Freight Corridors",
    seoDescription:
      "ZAFTYS Logistics sneak peek on Maharashtra industrial freight corridors  -  Vidarbha and industrial belt planning notes for shippers.",
    publishedAt: "2026-08-07",
    summary:
      "A corridor-first look at Maharashtra industrial freight: where volume clusters, what slows trucks, and how local knowledge still beats generic routing.",
    pageCount: 16,
    snapshot: [
      { label: "Geography", value: "Maharashtra" },
      { label: "Focus", value: "Industrial belts" },
      { label: "HQ lens", value: "Amravati / Vidarbha" },
      { label: "Mode", value: "Road FTL" },
    ],
    tableOfContents: [
      "Industrial demand pockets in Maharashtra",
      "Vidarbha and central corridor notes",
      "Plant and mill access constraints",
      "Seasonal and monsoon operating notes",
      "Partnering for reliable capacity",
    ],
    coverage: ["Maharashtra corridors", "Vidarbha", "Plant access", "Local ops knowledge"],
    methodology: [
      "Public corridor and industrial geography context",
      "ZAFTYS Maharashtra corridor experience",
    ],
    takeaways: [
      "Local gate and approach knowledge still decides on-time performance.",
      "Monsoon planning is an ops requirement, not a footnote.",
      "One accountable partner simplifies multi-plant Maharashtra programs.",
    ],
    relatedReportSlugs: ["india-industrial-road-freight-2026", "cement-logistics-india-corridors"],
    relatedBlogSlugs: ["planning-industrial-shipments"],
    cta: { label: "Plan a Maharashtra lane", whatsapp: true },
  }),
  report({
    slug: "tms-adoption-heavy-haul-india",
    title: "TMS Adoption in Heavy-Haul & Industrial Fleets in India",
    seoTitle: "TMS Adoption Heavy Haul India",
    seoDescription:
      "What industrial and heavy-haul fleets should require from a TMS in India  -  ZAFTYS Logistics report sneak peek.",
    publishedAt: "2026-08-07",
    summary:
      "GPS alone is not a TMS. This sneak peek outlines the modules industrial fleets and shippers actually use: dispatch, documents, ePOD, and customer visibility.",
    pageCount: 14,
    snapshot: [
      { label: "Product lens", value: "TMS" },
      { label: "Segment", value: "Heavy-haul" },
      { label: "Must-have", value: "Dispatch + ePOD" },
      { label: "Outcome", value: "Shared visibility" },
    ],
    tableOfContents: [
      "Why industrial TMS differs from city tracking apps",
      "Core modules that matter",
      "Adoption barriers on the ground",
      "Shipper portal expectations",
      "Evaluation checklist",
    ],
    coverage: ["Dispatch", "GPS / ETA", "ePOD", "Fleet records", "Client portal"],
    methodology: [
      "Capability checklist from live industrial TMS use",
      "Shipper interview themes (qualitative)",
    ],
    takeaways: [
      "Plant-window and document workflows separate real TMS from trackers.",
      "Adoption fails when drivers and clerks are not trained into the habit.",
      "Shippers increasingly expect portal access without chasing dispatch on chat.",
    ],
    relatedReportSlugs: ["india-industrial-road-freight-2026", "organized-fleet-vs-brokered-capacity"],
    relatedBlogSlugs: ["tms-for-heavy-haul"],
    cta: { label: "Book a TMS walkthrough", whatsapp: true },
  }),
  report({
    slug: "warehouse-to-plant-supply-chain-india",
    title: "Warehouse-to-Plant Supply Chains in Industrial India",
    seoTitle: "Warehouse to Plant Supply Chain India",
    seoDescription:
      "ZAFTYS Logistics sneak peek on warehouse-to-plant industrial supply chains  -  DC links, FTL rhythm, and documentation.",
    publishedAt: "2026-08-06",
    summary:
      "How industrial supply chains connect warehouses, DCs, and plants: cadence, documentation, and where road freight partners create or destroy reliability.",
    pageCount: 13,
    snapshot: [
      { label: "Flow", value: "WH / DC → plant" },
      { label: "Mode", value: "Mostly FTL" },
      { label: "Risk", value: "Missed slots" },
      { label: "Enabler", value: "Visibility" },
    ],
    tableOfContents: [
      "Industrial WH-to-plant patterns",
      "Slotting and cadence",
      "Inventory vs transport trade-offs",
      "Documentation handoffs",
      "Partner operating model",
    ],
    coverage: ["Warehouse links", "Plant inbound", "FTL cadence", "Handoff docs"],
    methodology: [
      "Supply-chain handoff mapping for industrial inbound",
      "Ops notes from plant-facing dispatches",
    ],
    takeaways: [
      "Transport and warehouse teams need a shared slot language.",
      "Late POD closes the loop for inventory accuracy, not only freight billing.",
      "Industrial inbound rarely tolerates pure spot chaos.",
    ],
    relatedReportSlugs: ["ftl-vs-ltl-industrial-india", "tms-adoption-heavy-haul-india"],
    relatedBlogSlugs: ["planning-industrial-shipments"],
    cta: { label: "Review inbound freight", whatsapp: true },
  }),
  report({
    slug: "organized-fleet-vs-brokered-capacity",
    title: "Organized Fleet vs Brokered Capacity: Choosing the Right Mix",
    seoTitle: "Organized Fleet vs Brokered Capacity",
    seoDescription:
      "When to use company fleet vs verified network capacity  -  ZAFTYS Logistics sneak peek for industrial shippers in India.",
    publishedAt: "2026-08-06",
    summary:
      "Own fleet, verified network partners, and informal brokering are not the same product. This sneak peek helps shippers choose a mix without losing accountability.",
    pageCount: 12,
    snapshot: [
      { label: "Models", value: "Own / network / broker" },
      { label: "Priority", value: "Accountability" },
      { label: "Surge tool", value: "Verified network" },
      { label: "Risk", value: "Fragmented vendors" },
    ],
    tableOfContents: [
      "Definitions and failure modes",
      "When own fleet should lead",
      "When verified network overflow helps",
      "Why informal brokering breaks industrial programs",
      "Recommended operating model",
    ],
    coverage: ["Company fleet", "Verified partners", "Brokered spot", "Single commercial owner"],
    methodology: [
      "Comparison of accountability models used on industrial lanes",
      "ZAFTYS own-fleet + TranZfort network operating pattern",
    ],
    takeaways: [
      "Industrial shippers need one commercial throat to choke.",
      "Verified overflow is a capacity tool, not a substitute for standards.",
      "Informal multi-broker stacks create documentation and claim gaps.",
    ],
    relatedReportSlugs: ["india-industrial-road-freight-2026", "empty-miles-and-backhaul-india"],
    relatedBlogSlugs: ["tms-for-heavy-haul"],
    cta: { label: "Design your capacity mix", whatsapp: true },
  }),
];

export function listReports(): MarketReport[] {
  return [...marketReports].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getReportBySlug(slug: string): MarketReport | undefined {
  return marketReports.find((r) => r.slug === slug);
}

export function relatedReports(report: MarketReport): MarketReport[] {
  return report.relatedReportSlugs
    .map((slug) => getReportBySlug(slug))
    .filter((r): r is MarketReport => Boolean(r));
}

export function formatReportDate(isoDate: string): string {
  const date = new Date(`${isoDate}T12:00:00`);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function reportModifiedAt(report: Pick<MarketReport, "publishedAt" | "updatedAt">): string {
  return report.updatedAt ?? report.publishedAt;
}

/** Absolute-path cover for OG/schema (strip cache-bust query). */
export function reportShareImage(report: Pick<MarketReport, "coverImage">): string {
  const raw = report.coverImage ?? "/og-image.png";
  return raw.split("?")[0] || "/og-image.png";
}
