/** ZAFTYS Market Reports — institutional logistics & digital freight intelligence */

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
    title: "Global Logistics Market Size, Share & Forecast 2027-2036",
    seoTitle: "Global Logistics Market Size and Forecast 2027-2036",
    seoDescription:
      "Global logistics market research report: US$ 4,334.3 BN (2026) to US$ 11,344.7 BN (2036), 10.1% CAGR. Road freight, ocean, air, warehousing, TMS, regions & vendors — unlock PDF with company email.",
    publishedAt: "2026-08-13",
    updatedAt: "2026-08-13",
    reportId: "ZAF-LOGISTICS-2027-2036",
    subtitle:
      "Institutional market intelligence on transportation, warehousing, and related logistics services — by mode, application, technology, end user, and geography. Historical 2017-2026; forecast 2027-2036.",
    coverImage: "/reports/covers/global-logistics-market-2027-2036-preview.png?v=2",
    pdfPath: "/reports/global-logistics-market-2027-2036.pdf",
    pageCount: 238,
    summary:
      "ZAFTYS Analytics models the global logistics market from US$ 4,334.3 BN in 2026 to US$ 11,344.7 BN by 2036 (10.1% CAGR), with segment cuts across road freight (FTL/LTL/express), ocean, air, rail & intermodal, warehousing, cold chain, TMS/WMS, end users, and regional deep-dives.",
    kpis: [
      { label: "Market size 2026", value: "US$ 4,334.3 BN" },
      { label: "Forecast 2036", value: "US$ 11,344.7 BN" },
      { label: "CAGR 2026-2036", value: "10.1%" },
    ],
    overview: [
      "The global logistics market is modeled at US$ 4,334.3 BN in 2026 and is projected to reach US$ 11,344.7 BN by 2036, implying a 10.1% CAGR over the forecast window. Historical coverage runs from 2017 through 2026; the forward outlook covers 2027-2036.",
      "Asia Pacific holds the largest regional share at about 35.0% of base-year value, followed by North America (~25.0%) and Europe (~22.0%). By offering, road freight (FTL, LTL, express) leads share; by technology, road freight fleet dominates; by application, retail & e-commerce leads.",
      "Coverage follows the logistics value chain from origin through road, port, warehouse, and delivery — including customs, multimodal orchestration, reverse logistics, cold storage, ASRS, and WMS/TMS software. Modeled series are decision support, not audited financial statements.",
    ],
    snapshot: [
      { label: "Market size 2026", value: "US$ 4,334.3 BN" },
      { label: "Forecast 2036", value: "US$ 11,344.7 BN" },
      { label: "CAGR", value: "10.1%", note: "2026-2036" },
      { label: "Horizon", value: "2017-2036", note: "History + forecast" },
      { label: "APAC share (2026)", value: "~35%", note: "Largest region" },
      { label: "Report ID", value: "ZAF-LOGISTICS-2027-2036" },
    ],
    tableOfContents: [
      "Executive summary & premium insights",
      "Market introduction, definition & scope",
      "Research methodology & evidence mix",
      "Market dynamics, regulation & pricing",
      "Product & services (road, ocean, air, rail, warehousing)",
      "Applications (retail, industrial, healthcare, food, chemicals)",
      "Technology & fleet (including EV, autonomy, WMS/TMS)",
      "End users (shippers, 3PL/4PL, carriers & brokers)",
      "Geography deep-dives (NA, Europe, APAC, RoW)",
      "Key players / vendor profiles",
      "Appendix, glossary & references",
    ],
    toc: [
      {
        title: "0 Executive summary & premium insights",
        children: ["Growth bridge 2017→2036", "Key findings for planners"],
      },
      {
        title: "1-2 Market introduction & research methodology",
        children: ["Definition & scope", "Segments", "Hybrid estimation & evidence mix"],
      },
      {
        title: "3 Market dynamics & regulations",
        children: ["Porter / ecosystem", "Drivers & restraints", "Pricing, investment, patents"],
      },
      {
        title: "4 Product & services",
        children: [
          "Road freight (FTL, LTL, express)",
          "Ocean, air, rail & intermodal",
          "Warehousing, cold storage, ASRS",
          "Customs, multimodal, reverse logistics",
        ],
      },
      {
        title: "5-7 Application, technology & end users",
        children: [
          "Retail & e-commerce, manufacturing, healthcare, food, oil & chemicals",
          "Road/ocean/air/rail fleets, EV & autonomy, WMS/TMS",
          "Shippers, 3PL/4PL, carriers & brokers",
        ],
      },
      {
        title: "8-9 Geography & competitive landscape",
        children: ["North America, Europe, Asia Pacific, Rest of World", "DHL, UPS, FedEx, Maersk, K+N, and peers"],
      },
      {
        title: "10 Appendix",
        children: ["Glossary", "References"],
      },
    ],
    coverage: [
      "Global logistics market size & forecast",
      "Road freight FTL / LTL / express",
      "Ocean, air, rail & intermodal",
      "Warehousing, cold chain & ASRS",
      "WMS / TMS & digital fleet tech",
      "3PL / 4PL / shipper / carrier models",
      "Regional & country deep-dives",
      "Vendor competitive profiles",
    ],
    methodology: [
      "Hybrid top-down + bottom-up triangulation (prefer top-down where evidence is stronger)",
      "Pinned Data Bank spine: 2026 = US$ 4,334.3 BN; 2036 = US$ 11,344.7 BN at ~10.1% CAGR",
      "Primary interview census informs methodology mix; numeric claims prefer bank-verified sources",
      "Gaps disclosed rather than invented; modeled series are planning support, not audited statements",
    ],
    takeaways: [
      "Global logistics spend is modeled from US$ 4,334.3 BN in 2026 to US$ 11,344.7 BN in 2036 at a 10.1% CAGR.",
      "Asia Pacific is the largest regional pool (~35% base-year share); road freight leads the offering mix.",
      "Service, technology, vertical, and regional cuts matter more than a single headline number for planning.",
      "Use scenario bands and disclosed gaps — treat exhibits as decision support, not audited financials.",
    ],
    trustSignals: [
      { label: "Bank-grounded claims", detail: "Pinned Data Bank version; gaps disclosed" },
      { label: "Hybrid estimation", detail: "Top-down + bottom-up triangulation" },
      { label: "238-page institutional PDF", detail: "Modes, regions, vendors & methodology" },
    ],
    sources: [
      { label: "ZAFTYS Analytics Data Bank (report ID ZAF-LOGISTICS-2027-2036)" },
      { label: "Bank logistics-institutional model · published 2026-08-13" },
    ],
    relatedReportSlugs: ["digital-freight-matching-market-2027-2036"],
    relatedBlogSlugs: ["planning-industrial-shipments", "tms-for-heavy-haul"],
    cta: { label: "Discuss logistics planning on WhatsApp", whatsapp: true },
  }),
  report({
    slug: "digital-freight-matching-market-2027-2036",
    title: "Digital Freight Matching Market Size & Forecast 2027-2036",
    seoTitle: "Digital Freight Matching Market Size and Forecast 2027-2036",
    seoDescription:
      "Digital freight matching (DFM) market report: US$ 81.2 BN (2026) to US$ 1,314.0 BN (2036), 32.1% CAGR. Platform revenue, spot/contract matching, TMS APIs, 22 countries — unlock PDF with company email.",
    publishedAt: "2026-08-14",
    updatedAt: "2026-08-16",
    reportId: "ZAF-DFM-2027-2036",
    subtitle:
      "Institutional research on digital freight matching platforms and marketplaces — platform / matching-service revenue (not matched freight GMV). Historical 2021-2026; forecast 2027-2036. Bank dfm-institutional-220.",
    coverImage: "/reports/covers/digital-freight-matching-market-2027-2036-preview.jpg?v=3",
    pdfPath: "/reports/digital-freight-matching-market-2027-2036.pdf",
    pageCount: 214,
    summary:
      "ZAFTYS Analytics models digital freight matching platform revenue at US$ 81.2 BN in 2026, expanding to US$ 1,314.0 BN by 2036 (32.1% CAGR). Coverage spans spot and contract lane matching, multimodal orchestration, dynamic pricing, eBOL/docs, payments & factoring, analytics, mobile/web/API access, modes, verticals, 22 country deep-dives, and 15 operator profiles.",
    kpis: [
      { label: "Platform revenue 2026", value: "US$ 81.2 BN" },
      { label: "Forecast 2036", value: "US$ 1,314.0 BN" },
      { label: "CAGR 2027-2036", value: "32.1%" },
    ],
    overview: [
      "The digital freight matching (DFM) market is modeled at US$ 81.2 BN in 2026 platform / matching-service revenue, expanding to US$ 1,314.0 BN by 2036 at a base-case 32.1% CAGR (history backfill from 2021). The institutional spine measures take-rate, board subscriptions, and matching VAS — not the invoice value of hauled freight.",
      "North America is the largest regional pool at 38.0% of modeled 2026 value (about US$ 30.9 BN); Asia-Pacific is 28.0% of the base and the fastest-tilt theater (~35.0% regional CAGR). Spot load-capacity matching leads L2 services (~US$ 32.9 BN in 2026), then contract/recurring lanes and multimodal orchestration. Freight matching services are ~78% of L1; value-added matching is ~22%.",
      "Scope covers matching marketplaces and matching rails embedded in TMS/ERP stacks. Digital brokerage is treated as an adjacent sibling market, not mixed into TAM. Competitive profiles include Uber Freight, Transfix, Loadsmart, Freightos, DAT, BlackBuck, Sennder, Truckstop, and peers. A ~19% CAGR path is retained as the bear envelope if take-rate compression reprices the base case after 2030.",
    ],
    snapshot: [
      { label: "Platform revenue 2026", value: "US$ 81.2 BN" },
      { label: "Forecast 2036", value: "US$ 1,314.0 BN" },
      { label: "CAGR", value: "32.1%", note: "2027-2036 base case" },
      { label: "Metric spine", value: "Platform revenue", note: "Not freight GMV" },
      { label: "NA share (2026)", value: "38.0%", note: "~US$ 30.9 BN" },
      { label: "Horizon", value: "2021-2036", note: "Bank 14 Aug 2026" },
    ],
    tableOfContents: [
      "Executive summary & growth bridge",
      "Market introduction, taxonomy & dual-track definitions",
      "Market dynamics, regulation & take-rate pricing",
      "Global market by service offering",
      "Application / industry verticals",
      "Platform access (mobile, web, API/TMS)",
      "Transportation mode (road, ocean, air, rail)",
      "End users & contract models",
      "Regional deep-dives (NA, Europe, APAC, MEA, LATAM)",
      "Primary interview synthesis",
      "Competitive landscape & 15 operator profiles",
      "Scenarios, appendix, glossary & references",
    ],
    toc: [
      {
        title: "1-2 Executive summary & market introduction",
        children: [
          "Platform-revenue growth bridge",
          "Matching vs GMV dual-track definitions",
          "Adjacency: matching vs digital brokerage",
        ],
      },
      {
        title: "3 Market dynamics & regulations",
        children: ["Drivers & restraints", "PESTLE / Porter / SWOT", "Take-rate & pricing dynamics"],
      },
      {
        title: "4-5 Service offerings & verticals",
        children: [
          "Spot & contract lane matching",
          "Multimodal orchestration, pricing, eBOL, payments",
          "Retail, manufacturing, FMCG, pharma, hazmat, project cargo",
        ],
      },
      {
        title: "6-8 Access, modes & end users",
        children: [
          "Mobile / web / API-TMS matching",
          "Road, ocean, air, rail digital matching",
          "Shippers, carriers, digital brokers / 3PLs",
        ],
      },
      {
        title: "9-15 Regions, interviews & competition",
        children: [
          "22 country snapshots across five theaters",
          "Shipper, carrier & platform voice",
          "Uber Freight, Transfix, Loadsmart, DAT, BlackBuck, Sennder & peers",
        ],
      },
      {
        title: "16-18 Exhibits, scenarios & appendix",
        children: ["Exhibit reading guide", "Scenario bands", "Glossary & references"],
      },
    ],
    coverage: [
      "Digital freight matching platforms & marketplaces",
      "Spot load-capacity & contract lane matching",
      "Multimodal matching orchestration",
      "Dynamic pricing & rate assist",
      "eBOL / digital documentation",
      "Payments, factoring & settlement",
      "Mobile, web, and API / embedded TMS matching",
      "Road, ocean, air, and rail digital matching",
      "22 country deep-dives & 15 operator profiles",
    ],
    methodology: [
      "Hybrid top-down + bottom-up triangulation on platform / matching-service revenue",
      "Pinned DFM databank dfm-institutional-220: 2026 = US$ 81.2 BN; 2036 = US$ 1,314.0 BN at ~32.1% CAGR",
      "Regional and L2/L3 cuts held to evidenced share priors rather than undifferentiated residuals",
      "Matched freight GMV treated as labeled context only — not the primary size spine",
    ],
    takeaways: [
      "DFM platform revenue is modeled from US$ 81.2 BN in 2026 to US$ 1,314.0 BN in 2036 at a 32.1% CAGR.",
      "Institutional scope is platform / matching-service revenue (take-rate, subscription, VAS) — not freight GMV.",
      "North America leads 2026 value (38.0%, ~US$ 30.9 BN); Asia-Pacific shows the strongest growth tilt (~35% CAGR).",
      "Spot matching leads service mix; mobile is the largest access cut; road freight dominates mode. A ~19% CAGR bear path is retained for take-rate compression.",
    ],
    trustSignals: [
      { label: "Platform-revenue spine", detail: "Explicitly not freight GMV" },
      { label: "Hybrid estimation", detail: "Top-down CAGR + bottom-up take-rate checks" },
      { label: "214-page institutional PDF", detail: "22 countries, 15 operator profiles" },
    ],
    sources: [
      { label: "ZAFTYS DFM market databank 2027-2036 (bank dfm-institutional-220)" },
      { label: "Published 2026-08-14 · updated on site 2026-08-16 · www.zaftys.com" },
    ],
    relatedReportSlugs: ["global-logistics-market-2027-2036"],
    relatedBlogSlugs: ["tms-for-heavy-haul", "reduce-empty-return-trips"],
    cta: { label: "Discuss freight matching on WhatsApp", whatsapp: true },
  }),
];

export function listReports(): MarketReport[] {
  return [...marketReports].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function latestReports(limit: number): MarketReport[] {
  return listReports().slice(0, limit);
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
