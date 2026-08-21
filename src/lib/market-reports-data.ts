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

export type MarketReportFaq = {
  question: string;
  answer: string;
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
  /** Crawlable long-form copy for SEO (always rendered on the report page) */
  executiveSummary?: readonly string[];
  keyFindings?: readonly string[];
  methodologyNarrative?: readonly string[];
  faq?: readonly MarketReportFaq[];
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
    pdfPath: partial.pdfPath ?? `/files/market-reports/${partial.slug}.pdf`,
    ...partial,
  };
}

export const marketReports: readonly MarketReport[] = [
  report({
    slug: "global-logistics-market-2027-2036",
    title: "Global Logistics Market Size, Share & Forecast 2027-2036",
    seoTitle: "Global Logistics Market Size and Forecast 2027-2036 | ZAFTYS",
    seoDescription:
      "Global logistics market research report: US$ 4,334.3 BN (2026) to US$ 11,344.7 BN (2036), 10.1% CAGR. Road freight, ocean, air, warehousing, TMS, regions & vendors — unlock PDF with company email.",
    publishedAt: "2026-08-13",
    updatedAt: "2026-08-13",
    reportId: "ZAF-LOGISTICS-2027-2036",
    subtitle:
      "Institutional market intelligence on transportation, warehousing, and related logistics services — by mode, application, technology, end user, and geography. Historical 2017-2026; forecast 2027-2036.",
    coverImage: "/images/reports/global-logistics-market-2027-2036-preview.png?v=2",
    pdfPath: "/files/market-reports/global-logistics-market-2027-2036.pdf",
    pageCount: 238,
    summary:
      "ZAFTYS Analytics models the global logistics market from US$ 4,334.3 BN in 2026 to US$ 11,344.7 BN by 2036 (10.1% CAGR), with segment cuts across road freight (FTL/LTL/express), ocean, air, rail & intermodal, warehousing, cold chain, TMS/WMS, end users, and regional deep-dives.",
    kpis: [
      { label: "Market size 2026", value: "US$ 4,334.3 BN" },
      { label: "Forecast 2036", value: "US$ 11,344.7 BN" },
      { label: "CAGR 2026-2036", value: "10.1%" },
    ],
    executiveSummary: [
      "ZAFTYS Analytics models the global logistics market at US$ 4,334.3 BN in 2026, expanding to US$ 11,344.7 BN by 2036. That path implies a 10.1% compound annual growth rate across the forecast window. The series spans historical years 2017 through 2026 and a forward outlook for 2027-2036, so planners can connect a decade of backcast context to the next planning cycle. Figures are drawn from the pinned Data Bank spine for report ID ZAF-LOGISTICS-2027-2036 and are intended as institutional decision support — not audited financial statements or a substitute for company-level diligence.",
      "Structurally, Asia Pacific is modeled as the largest regional pool at about 35.0% of base-year value, with North America near 25.0% and Europe near 22.0%. By offering, road freight — full truckload, less-than-truckload, and express — leads share. Road freight fleet also dominates the technology cut, while retail and e-commerce lead applications. Those concentration points matter more for capacity and investment planning than a single global headline: a shipper or 3PL allocating capital across modes and theaters needs the segment cuts, not only the top-line CAGR.",
      "Coverage follows the logistics value chain from origin through road, port, warehouse, and last-mile delivery. The 238-page institutional PDF includes customs and multimodal orchestration, reverse logistics, cold storage and ASRS, and WMS/TMS software alongside carrier, broker, and 3PL/4PL end-user views. Vendor profiles and regional deep-dives sit on the same bank-grounded spine so readers can move from market size to competitive and geographic context without mixing incompatible metrics. Gaps in evidence are disclosed rather than filled with invented residuals; where triangulation is weaker, the report prefers conservative framing over false precision.",
      "Readers should use this page’s open summary, findings, and methodology narrative as the crawlable institutional brief, then unlock the full PDF for chapter-level exhibits, competitive profiles, and appendix references. ZAFTYS Analytics positions the work for logistics planners, operators, and investors who need transparent modeled figures — honest about limits — rather than a black-box market size claim.",
    ],
    keyFindings: [
      "Global logistics spend is modeled from US$ 4,334.3 BN in 2026 to US$ 11,344.7 BN in 2036 at a 10.1% CAGR. The growth bridge is useful for long-range network and warehousing plans, but ZAFTYS Analytics treats the path as a base-case institutional model. Scenario bands and disclosed gaps should sit beside any board or budget use of the headline numbers, especially when comparing corridors with different mode and regulatory mixes.",
      "Asia Pacific holds the largest regional share at roughly 35% of 2026 value, ahead of North America (~25%) and Europe (~22%). Regional mix shifts the practical addressable pool for asset and digital investment: APAC scale, North American density of contract logistics and parcel-adjacent flows, and European regulatory and multimodal complexity each pull different capability stacks and partner strategies.",
      "Road freight (FTL, LTL, and express) leads the offering mix, and road freight fleet leads the technology cut. Ocean, air, rail, and intermodal remain material for long-haul and trade-lane planning, but land-side capacity and fleet modernization dominate modeled value. Cold chain, ASRS, and warehouse automation appear as high-relevance adjacencies rather than the core size spine, which keeps physical logistics services as the primary market definition.",
      "By application, retail and e-commerce lead modeled demand, with manufacturing, healthcare, food, and oil & chemicals as important vertical overlays. End-user cuts across shippers, 3PL/4PL providers, carriers, and brokers show that the same tonnage can sit in very different commercial models — so share of wallet and service design matter as much as aggregate market size when sizing opportunity by customer type.",
      "WMS/TMS, digital fleet tools, EV and autonomy themes, and multimodal orchestration are treated as technology and process layers on top of physical transport and warehousing. They influence productivity and the economics of software-enabled services, but the primary market spine remains logistics services value. Readers should not conflate software TAM with total logistics spend when sizing investment or partnership cases.",
    ],
    methodologyNarrative: [
      "Estimation uses hybrid top-down and bottom-up triangulation, preferring top-down where the evidence mix is stronger and checking bottom-up cuts against segment and regional priors. The pinned Data Bank spine fixes 2026 at US$ 4,334.3 BN and 2036 at US$ 11,344.7 BN at approximately 10.1% CAGR, so chapter-level exhibits reconcile to a single institutional backbone rather than drifting by section. Historical coverage from 2017 through 2026 anchors the growth bridge before the 2027-2036 forecast window.",
      "Primary interview insight informs how evidence is weighted and where methodology emphasis should fall; numeric claims prefer bank-verified sources over anecdote. When coverage is thin, the report discloses gaps instead of inventing residual plugs. Modeled series are planning support for shippers, operators, and investors — not audited financial statements, regulatory filings, or a guarantee of future market outcomes. Trust signals on the product page (bank-grounded claims, hybrid estimation, and the 238-page PDF scope) mirror that stance.",
      "Segment architecture follows product and services (road, ocean, air, rail, warehousing), applications, technology and fleet, end users, and geography. That taxonomy keeps regional and mode cuts comparable across chapters and prevents residual “other” buckets from absorbing unexplained value. Readers comparing this series to third-party logistics studies should confirm metric definitions before stacking numbers.",
    ],
    faq: [
      {
        question: "What is the modeled size of the global logistics market in this ZAFTYS report?",
        answer:
          "ZAFTYS Analytics models global logistics at US$ 4,334.3 BN in 2026, rising to US$ 11,344.7 BN by 2036 at a 10.1% CAGR. Historical coverage runs 2017-2026; the forecast window is 2027-2036. These are bank-grounded decision-support figures for report ID ZAF-LOGISTICS-2027-2036, not audited financials.",
      },
      {
        question: "Which regions and segments lead the market in the base year?",
        answer:
          "Asia Pacific is the largest regional pool at about 35% of 2026 value, followed by North America (~25%) and Europe (~22%). By offering, road freight (FTL, LTL, express) leads; by application, retail and e-commerce leads. Road freight fleet dominates the technology cut in the model.",
      },
      {
        question: "How should planners use these logistics market figures?",
        answer:
          "Use segment, regional, and end-user cuts alongside the headline CAGR when planning capacity, network design, or vendor strategy. Treat exhibits as institutional decision support with disclosed gaps — not as audited statements or a single number for capital allocation without scenario bands.",
      },
      {
        question: "What does the full PDF cover beyond the market size spine?",
        answer:
          "The 238-page report (ZAF-LOGISTICS-2027-2036) covers modes, warehousing and cold chain, WMS/TMS, end users, regional deep-dives, vendor profiles, dynamics and regulation, plus methodology and appendix materials. PDF download and online reading unlock with a company email; the open HTML brief on this page is ungated for indexing.",
      },
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
    seoTitle: "Digital Freight Matching Market Size and Forecast 2027-2036 | ZAFTYS",
    seoDescription:
      "Digital freight matching (DFM) market report: US$ 81.2 BN (2026) to US$ 1,314.0 BN (2036), 32.1% CAGR. Platform revenue, spot/contract matching, TMS APIs, 22 countries — unlock PDF with company email.",
    publishedAt: "2026-08-14",
    updatedAt: "2026-08-16",
    reportId: "ZAF-DFM-2027-2036",
    subtitle:
      "Institutional research on digital freight matching platforms and marketplaces — platform / matching-service revenue (not matched freight GMV). Historical 2021-2026; forecast 2027-2036. Bank dfm-institutional-220.",
    coverImage: "/images/reports/digital-freight-matching-market-2027-2036-preview.jpg?v=3",
    pdfPath: "/files/market-reports/digital-freight-matching-market-2027-2036.pdf",
    pageCount: 214,
    summary:
      "ZAFTYS Analytics models digital freight matching platform revenue at US$ 81.2 BN in 2026, expanding to US$ 1,314.0 BN by 2036 (32.1% CAGR). Coverage spans spot and contract lane matching, multimodal orchestration, dynamic pricing, eBOL/docs, payments & factoring, analytics, mobile/web/API access, modes, verticals, 22 country deep-dives, and 15 operator profiles.",
    kpis: [
      { label: "Platform revenue 2026", value: "US$ 81.2 BN" },
      { label: "Forecast 2036", value: "US$ 1,314.0 BN" },
      { label: "CAGR 2027-2036", value: "32.1%" },
    ],
    executiveSummary: [
      "ZAFTYS Analytics models digital freight matching (DFM) platform and matching-service revenue at US$ 81.2 BN in 2026, expanding to US$ 1,314.0 BN by 2036 at a base-case 32.1% CAGR. History is backfilled from 2021; the forward outlook covers 2027-2036 on bank dfm-institutional-220 (report ID ZAF-DFM-2027-2036). The institutional spine measures take-rate, board subscriptions, and matching value-added services — not the invoice value of hauled freight. Conflating platform revenue with matched freight GMV would overstate addressable software and marketplace economics by an order of magnitude for many planning uses.",
      "North America is the largest regional pool at 38.0% of modeled 2026 value (about US$ 30.9 BN). Asia-Pacific holds 28.0% of the base and shows the strongest growth tilt, with a regional CAGR near 35.0% in the model. Spot load-capacity matching leads L2 services at roughly US$ 32.9 BN in 2026, ahead of contract and recurring lane matching and multimodal orchestration. At L1, freight matching services are about 78% of value and value-added matching about 22%. Scope covers matching marketplaces and matching rails embedded in TMS/ERP stacks; digital brokerage is treated as an adjacent sibling market and is not mixed into the primary TAM.",
      "Competitive context includes Uber Freight, Transfix, Loadsmart, Freightos, DAT, BlackBuck, Sennder, Truckstop, and peers across fifteen operator profiles, with twenty-two country deep-dives across five theaters. A roughly 19% CAGR path is retained as the bear envelope if take-rate compression reprices the base case after 2030. As with other ZAFTYS Analytics series, exhibits are decision support for product, corridor, and partnership planning — not audited financials or a guarantee of platform outcomes.",
      "This page publishes an always-visible executive brief, key findings, methodology narrative, and FAQ so search engines and human readers can index the institutional story without unlocking the PDF. The 214-page report remains gated for full exhibits; the open HTML is intentionally substantial and aligned to the same bank KPIs already used in the snapshot and overview.",
    ],
    keyFindings: [
      "DFM platform revenue is modeled from US$ 81.2 BN in 2026 to US$ 1,314.0 BN in 2036 at a 32.1% CAGR (2027-2036 base case). That growth rate reflects digital matching penetration and take-rate / subscription / VAS economics on the platform spine — not growth in physical freight volumes alone. Planners should keep GMV context labeled separately when comparing to logistics spend reports such as the companion global logistics market series.",
      "North America leads 2026 value at 38.0% (about US$ 30.9 BN). Asia-Pacific is 28.0% of the base and the fastest-tilt theater near a 35% regional CAGR. Europe, MEA, and LATAM complete the five-theater geography used for the twenty-two country snapshots. Regional mix drives where product localization, carrier density, and regulatory friction matter most for roadmap and go-to-market sequencing.",
      "Spot load-capacity matching leads the L2 service mix at about US$ 32.9 BN in 2026, followed by contract/recurring lanes and multimodal orchestration. Dynamic pricing and rate assist, eBOL and digital documentation, and payments, factoring, and settlement sit in the value-added layer (~22% of L1), while core freight matching services are ~78%. That split clarifies where pure matching monetization ends and adjacent VAS begins.",
      "Access cuts favor mobile as the largest channel in the model, with web and API / embedded TMS matching as critical enterprise paths. By mode, road freight dominates digital matching value; ocean, air, and rail matching are material for multimodal orchestration but smaller on the platform-revenue spine. End users span shippers, carriers, and digital brokers / 3PLs under different contract models, which changes who pays and how retention works.",
      "A ~19% CAGR bear path is retained for take-rate compression after 2030. Competitive intensity among scaled platforms and marketplace peers can pressure monetization even when matched volume grows. Scenario bands around the 32.1% base case are therefore as important as the headline forecast for investment and product roadmap decisions.",
    ],
    methodologyNarrative: [
      "Estimation uses hybrid top-down and bottom-up triangulation on platform and matching-service revenue. The pinned DFM databank (dfm-institutional-220) fixes 2026 at US$ 81.2 BN and 2036 at US$ 1,314.0 BN at approximately 32.1% CAGR. Regional and L2/L3 cuts are held to evidenced share priors rather than undifferentiated residuals so chapter exhibits reconcile to the spine. History backfill from 2021 supports the growth bridge into the 2027-2036 forecast.",
      "Matched freight GMV is treated as labeled context only and is not the primary size metric. Dual-track definitions separate matching marketplaces and embedded matching rails from adjacent digital brokerage. Primary interview synthesis informs weighting across shipper, carrier, and platform voices; gaps are disclosed rather than invented. Modeled series support planning — they are not audited financial statements — and the product-page trust signals (platform-revenue spine, hybrid estimation, 214-page PDF with 22 countries and 15 operator profiles) reflect that discipline.",
      "Service, vertical, access, mode, and end-user taxonomies are applied consistently so North America’s 38.0% base share (~US$ 30.9 BN), Asia-Pacific’s growth tilt (~35% regional CAGR), and the spot-matching lead (~US$ 32.9 BN in 2026) remain comparable across chapters. The ~19% CAGR bear envelope is retained explicitly for take-rate compression scenarios after 2030.",
    ],
    faq: [
      {
        question: "What does ZAFTYS measure in the digital freight matching market — platform revenue or freight GMV?",
        answer:
          "The primary spine is platform / matching-service revenue: take-rate, board subscriptions, and matching VAS. Matched freight GMV may appear as labeled context but is not the TAM used for the US$ 81.2 BN (2026) to US$ 1,314.0 BN (2036) path at 32.1% CAGR on bank dfm-institutional-220.",
      },
      {
        question: "Which region and services lead the DFM market in 2026?",
        answer:
          "North America leads at 38.0% of modeled 2026 value (about US$ 30.9 BN). Spot load-capacity matching leads L2 services (~US$ 32.9 BN). Freight matching services are ~78% of L1; value-added matching is ~22%. Asia-Pacific shows the strongest growth tilt (~35% regional CAGR).",
      },
      {
        question: "Is digital brokerage included in the digital freight matching TAM?",
        answer:
          "No. Digital brokerage is treated as an adjacent sibling market and is not mixed into the primary DFM platform-revenue TAM. Scope covers matching marketplaces and matching rails embedded in TMS/ERP stacks under dual-track definitions in the report.",
      },
      {
        question: "What is in the full DFM PDF and how do I unlock it?",
        answer:
          "The 214-page report (ZAF-DFM-2027-2036) covers services, verticals, access modes, transportation modes, end users, 22 country deep-dives, 15 operator profiles, scenarios, and methodology. Unlock download or online reading with a company email; the executive summary, findings, methodology narrative, and FAQ on this page stay ungated.",
      },
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
