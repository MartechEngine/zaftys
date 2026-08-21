/** India report slate #1–2 — crawlable HTML briefs (SEO plan §13). No invented India TAM. */
import type { MarketReport } from "@/lib/market-reports-data";

function report(
  partial: Omit<MarketReport, "segment" | "pdfPath"> & { pdfPath?: string },
): MarketReport {
  return {
    segment: "logistics-supply-chain",
    pdfPath: partial.pdfPath ?? `/files/market-reports/${partial.slug}.pdf`,
    ...partial,
  };
}

export const indiaWave1Reports: readonly MarketReport[] = [
  report({
    slug: "india-road-freight-ftl-outlook-2027-2036",
    title: "India Road Freight & FTL Outlook 2027-2036",
    seoTitle: "India Road Freight FTL Outlook 2027-2036 | ZAFTYS",
    seoDescription:
      "India road freight and FTL outlook 2027-2036: industrial corridors, contract vs spot, plant windows, Own vs Network capacity, and honest methodology limits — ZAFTYS Analytics.",
    publishedAt: "2026-08-22",
    updatedAt: "2026-08-22",
    reportId: "ZAF-INDIA-FTL-2027-2036",
    subtitle:
      "India-first companion to the global logistics series — full truckload and industrial road freight decision support. Historical context through 2026; planning horizon 2027-2036. No invented national TAM.",
    coverImage: "/images/reports/global-logistics-market-2027-2036-preview.png?v=2",
    pageCount: 96,
    summary:
      "ZAFTYS Analytics frames India road FTL as a corridor-and-gate problem: plant windows, axle reality, contract vs spot mix, and labeled network overflow. This brief is institutional decision support with disclosed limits — not a fabricated India market-size number.",
    kpis: [
      { label: "Scope", value: "India road FTL", note: "Industrial & commercial" },
      { label: "Horizon", value: "2027-2036", note: "Planning window" },
      { label: "Metric posture", value: "No invented TAM", note: "Disclosed limits" },
    ],
    executiveSummary: [
      "India’s road freight system moves the majority of domestic tonnage that manufacturers, mills, cement works, and DCs depend on. For ZAFTYS Analytics, the useful unit of analysis is not a single national “logistics market” headline — those are widely published elsewhere and often mix modes, warehousing, and courier in ways that do not help an FTL buyer. This outlook focuses on full truckload and near-FTL industrial road moves: vehicle class, corridor habit, plant and yard clocks, and the commercial split between reserved capacity and spot overflow.",
      "The 2027-2036 planning window matters because Indian industrial shippers are simultaneously digitising trip close-out, tightening GST and e-Way Bill hygiene, and facing more explicit Own vs Network honesty from serious operators. Rate sheets alone do not capture detention, wrong body class, or unlabeled brokerage. This report’s open HTML brief therefore organises decision themes that plant and logistics leaders can take into sourcing workshops — with explicit refusal to invent a rupee or US-dollar India FTL TAM that we have not banked.",
      "Structurally, the brief distinguishes (1) contract and dedicated programs for repeat plant windows, (2) spot and marketplace overflow for true surge, and (3) documentation and visibility layers (ePOD, TMS, live map) that turn trips into settleable records. It sits beside the global logistics market series as an India-first companion: global size spines stay on the global report; India FTL gets corridor language, gate physics, and procurement frames instead of a cosplay national number.",
      "Readers should treat this page as the crawlable institutional brief. The unlockable PDF is the chapter pack for deeper exhibits as they ship; until the full chapter PDF is complete, the stub PDF confirms lead interest while the HTML remains the authoritative public summary. ZAFTYS Analytics will not fill methodology gaps with residual plugs or vanity fleet claims.",
    ],
    keyFindings: [
      "India FTL cost-to-serve is dominated by plant and yard time as often as by highway kilometres. Shippers who only compare per-km rates systematically underprice detention, weighbridge, and wrong-body refusals. Pair this outlook with operational guides on plant TAT and axle/GVW discipline before locking annual contracts.",
      "Repeat production-linked lanes (inbound raw material, finished goods, inter-plant WIP) belong on contract or dedicated language. Daily spot hunting for core windows is a process choice that shows up as OTIF noise, not as “market flexibility.” Hybrid models only work when overflow rules and Own vs Network labels are written down.",
      "Marketplace and network overflow are legitimate surge tools when KYC, vehicle class, and labeling are real. They are not a substitute for owned or reserved capacity on must-run plant clocks. TranZfort-style matching (free to list/search; fee on booking) should be evaluated as a rail, not as invisible brokerage rebranded as fleet.",
      "Digitised trip close-out — ePOD tied to trip ID, e-Way Bill discipline, GST invoice match — is becoming a buyer criterion alongside rate. Chat photo proof does not scale to multi-plant networks. TMS evaluation should ask where exceptions and documents live, not only whether a map pings.",
      "National market-size headlines are intentionally out of scope here. Where third-party India logistics studies are cited in the PDF chapters, they will be labeled as external context with metric definitions checked — never silently relabeled as ZAFTYS banked TAM.",
    ],
    methodologyNarrative: [
      "This series uses hybrid qualitative–quantitative framing: corridor and plant-window patterns from ZAFTYS operations context (directional, site-specific), publicly available regulatory and policy references (MoRTH axle/GVW framing, GST/e-Way Bill practice as published), and structured procurement questions for shippers. It does not publish an invented India road freight TAM or CAGR for 2027-2036.",
      "Evidence hierarchy prefers: (1) disclosed operational patterns and checklists, (2) named public sources and policy texts, (3) scenario discussion without residual plugs. Gaps are stated. Modeled decision frames are planning support — not audited market statistics, not a guarantee of corridor rates, and not a claim of pan-India owned fleet counts.",
      "Relationship to other ZAFTYS Analytics products: the global logistics market report carries the banked global size spine; the digital freight matching report carries platform-revenue methodology. This India FTL outlook borrows institutional tone and unlock UX, not those numeric spines. Cluster CTAs point readers to live logistics and manufacturing pillars for commercial execution.",
    ],
    faq: [
      {
        question: "Does this report publish an India road freight market size in rupees or US dollars?",
        answer:
          "No. ZAFTYS Analytics deliberately omits an invented India FTL TAM. The brief focuses on corridor, gate, contract/spot, and digitisation decision themes. External studies, if referenced in PDF chapters, will be labeled with metric definitions — not rebranded as ZAFTYS banked figures.",
      },
      {
        question: "Who is this India FTL outlook for?",
        answer:
          "Plant logistics leaders, manufacturing and industrial shippers, and procurement teams evaluating contract vs spot FTL, Own vs Network honesty, and trip close-out quality on Indian road corridors for the 2027-2036 planning window.",
      },
      {
        question: "How does this relate to the global logistics market report?",
        answer:
          "It is an India-first companion. Global size and mode spines remain on the global logistics series. This outlook does not duplicate that TAM; it translates institutional research into India FTL operating and sourcing language.",
      },
      {
        question: "What do I get when I unlock the PDF?",
        answer:
          "Company-email unlock opens the report PDF pack for download or online reading. The HTML executive summary, findings, methodology, and FAQ on this page stay ungated for indexing. Early unlocks may include a stub until the full chapter PDF ships — the public HTML brief remains the crawlable authority.",
      },
    ],
    overview: [
      "India road FTL for industrial and commercial shippers is framed as corridor, vehicle class, and plant-window design — not a single national market-size claim.",
      "Decision themes: contract/dedicated vs spot overflow, Own vs Network labeling, detention and axle reality, and digitised trip close-out.",
      "Companion to the global logistics series; honest limits; cluster links into ZAFTYS logistics and manufacturing desks.",
    ],
    snapshot: [
      { label: "Scope", value: "India road FTL" },
      { label: "Horizon", value: "2027-2036" },
      { label: "TAM posture", value: "Not invented", note: "Disclosed limits" },
      { label: "Report ID", value: "ZAF-INDIA-FTL-2027-2036" },
      { label: "Companion", value: "Global logistics series" },
      { label: "Unlock", value: "Company email", note: "PDF gated; HTML open" },
    ],
    tableOfContents: [
      "Executive summary & India FTL framing",
      "Definition: FTL vs adjacent road services",
      "Plant windows, detention & axle reality",
      "Contract, dedicated & spot overflow",
      "Own vs Network & marketplace rails",
      "Digitised close-out (ePOD, e-Way Bill, GST)",
      "Buyer criteria checklist",
      "Methodology limits & sources",
      "Appendix & glossary",
    ],
    toc: [
      {
        title: "1-2 Framing & definitions",
        children: ["Why no invented India TAM", "FTL scope boundaries"],
      },
      {
        title: "3-4 Operations physics",
        children: ["Plant/yard clocks", "Axle & weighbridge", "Body class match"],
      },
      {
        title: "5-6 Commercial models",
        children: ["Contract & dedicated", "Spot & labeled network", "Marketplace rails"],
      },
      {
        title: "7-9 Close-out, checklist & method",
        children: ["ePOD to invoice", "Buyer questions", "Limits & references"],
      },
    ],
    coverage: [
      "India industrial & commercial FTL",
      "Plant window & detention themes",
      "Contract vs spot capacity",
      "Own vs Network labeling",
      "TMS / ePOD adjacency",
      "Methodology limits (no invented TAM)",
    ],
    methodology: [
      "Qualitative–quantitative hybrid with disclosed gaps",
      "No invented India road freight TAM or CAGR",
      "Directional ops context + public regulatory references",
      "Companion framing to global logistics series — separate numeric spines",
    ],
    takeaways: [
      "India FTL decisions are corridor-and-gate problems more often than headline market-size problems.",
      "Reserve capacity for repeat plant windows; use labeled overflow for true surge.",
      "Digitised trip proof is becoming a buyer criterion alongside rate.",
      "This outlook refuses invented national TAM figures.",
    ],
    trustSignals: [
      { label: "No invented India TAM", detail: "Limits disclosed on-page" },
      { label: "Ops-grounded themes", detail: "Plant windows, class, labeling" },
      { label: "HTML brief ungated", detail: "PDF unlock for chapter pack" },
    ],
    sources: [
      { label: "ZAFTYS Analytics — India FTL outlook framing (ZAF-INDIA-FTL-2027-2036)" },
      { label: "Companion: Global Logistics Market Size & Forecast 2027-2036" },
      { label: "Published on site 2026-08-22 · www.zaftys.com" },
    ],
    relatedReportSlugs: [
      "global-logistics-market-2027-2036",
      "india-cement-logistics-bulk-movement-outlook",
      "digital-freight-matching-market-2027-2036",
    ],
    relatedBlogSlugs: [
      "contract-logistics-vs-spot-ftl-plant-teams",
      "planning-industrial-shipments",
      "labeled-network-capacity-live-trip",
      "plant-detention-tat-yard-gate-india",
    ],
    cta: { label: "Explore transportation", to: "/logistics" },
  }),
  report({
    slug: "india-cement-logistics-bulk-movement-outlook",
    title: "India Cement Logistics & Bulk Movement Outlook",
    seoTitle: "India Cement Logistics Bulk Movement Outlook | ZAFTYS",
    seoDescription:
      "India cement logistics and bulk movement outlook: bagged vs bulk, pneumatic bulker, tipper vs open body, plant loading windows, and honest research limits — ZAFTYS Analytics.",
    publishedAt: "2026-08-22",
    updatedAt: "2026-08-22",
    reportId: "ZAF-INDIA-CEMENT-LOG-2026",
    subtitle:
      "Decision support for bagged cement, bulk cement, fly ash, clinker, and aggregates road movement in India — body class, plant clocks, and detention — without invented national cement logistics TAM.",
    coverImage: "/images/blog/cement-plant-loading-windows.jpg",
    pageCount: 84,
    summary:
      "ZAFTYS Analytics maps cement logistics as a body-class and plant-window discipline: pneumatic bulker for loose product, tipper/open body for bagged and aggregates, and reserved capacity for repeat plant-to-dealer and plant-to-RMC lanes.",
    kpis: [
      { label: "Scope", value: "Cement & bulk road", note: "India" },
      { label: "Body classes", value: "Bulker · tipper · open", note: "Class before rate" },
      { label: "TAM posture", value: "No invented TAM", note: "Disclosed limits" },
    ],
    executiveSummary: [
      "Cement and construction solids move on Indian roads under rules that generic FTL marketing ignores. Loose cement and dry fly ash into silos need pneumatic bulker discharge. Bagged cement and many aggregate lanes need open body or tipper according to unload method. Clinker and grinding-unit feeds add another corridor pattern. Treating all of that as “any open truck” is how plants burn free time and shippers pay for refusals.",
      "This outlook is written for cement producers, grinding units, RMC networks, and construction project desks that buy road capacity into and out of works. The planning questions are operational: which body class, which plant window, how detention is coded, when contract capacity beats spot, and how labeled network overflow should appear on the trip when owned bulkers or tippers are not enough.",
      "ZAFTYS Analytics again refuses an invented India cement logistics TAM. Public production and consumption statistics exist in government and industry publications; converting them into a precise “cement logistics market size” without a banked methodology would be cosplay precision. Instead, the brief publishes a crawlable decision structure and points commercial readers to the live cement industry desk for quotes.",
      "The HTML brief on this page is ungated. PDF unlock delivers the chapter pack as it ships (stub PDF may confirm interest early). Cluster links connect findings to cement plant loading windows, bulker vs tipper guides, and industrial freight leaves — reports support pillars; they do not replace them.",
    ],
    keyFindings: [
      "Intake hardware at the receiving site decides the truck before rate shopping starts. Silo pneumatic intake → bulker. Bag bay or dump → open body / tipper. Wrong allotment is a gate event, not a highway surprise.",
      "Plant loading windows and weighbridge queues erase corridor maths when ignored. Cement programs that plan kilometres without free-time and bay reality systematically understate cost-to-serve.",
      "Repeat plant-to-dealer, plant-to-RMC, and plant-to-project lanes should sit on reserved tipper/bulker capacity. Spot overflow is for true surge and must stay labeled — never silently sold as owned fleet.",
      "Bagged vs bulk is a product and machine split, not a marketing synonym. Bulk cement and fly ash are not “tipper with a tarp.” Open body vs tipper for bags and aggregates depends on unload SOP, not habit.",
      "No national cement logistics TAM is published here. External production or freight studies cited in chapters will carry source labels and definition checks.",
    ],
    methodologyNarrative: [
      "Methods combine directional ZAFTYS operations context on cement and construction corridors, publicly discussable plant-window and body-class practice, and structured buyer checklists. The series does not invent a rupee cement logistics market size or CAGR.",
      "Evidence preference: operational class rules and detention physics first; named public references second; scenario discussion without residual plugs. Gaps disclosed. Planning support only — not audited statistics.",
      "Cluster relationship: deepens the cement industry pillar and industrial freight service leaf. Companion India FTL outlook covers cross-vertical road freight themes; this report stays on cement and bulk movement specificity.",
    ],
    faq: [
      {
        question: "Does this report size the India cement logistics market in money terms?",
        answer:
          "No. It deliberately omits an invented cement logistics TAM. Focus is body class, plant windows, detention, and capacity models. External stats, if used in PDF chapters, will be labeled with definitions.",
      },
      {
        question: "Who should read the cement logistics outlook?",
        answer:
          "Cement and grinding-unit logistics teams, RMC and project freight buyers, and transporters designing bulker/tipper programs for plant-linked corridors.",
      },
      {
        question: "How is this different from the India FTL outlook?",
        answer:
          "The India FTL outlook is cross-vertical road freight decision support. This report is cement- and bulk-specific: bulker, tipper, open body, fly ash, clinker, and plant loading windows.",
      },
      {
        question: "Where do I go for a live quote?",
        answer:
          "Use the ZAFTYS cement industry desk for commercial execution. This research page is institutional decision support, not a substitute for an indent.",
      },
    ],
    overview: [
      "Cement road logistics is framed as body-class and plant-window design for bagged, bulk, fly ash, clinker, and aggregates.",
      "Decision themes: bulker vs tipper vs open body, detention, reserved vs labeled overflow.",
      "No invented national cement logistics TAM; cluster link to the cement pillar.",
    ],
    snapshot: [
      { label: "Scope", value: "Cement & bulk road" },
      { label: "Classes", value: "Bulker / tipper / open" },
      { label: "TAM posture", value: "Not invented" },
      { label: "Report ID", value: "ZAF-INDIA-CEMENT-LOG-2026" },
      { label: "Cluster", value: "Cement pillar" },
      { label: "Unlock", value: "Company email" },
    ],
    tableOfContents: [
      "Executive summary & cement logistics framing",
      "Bagged vs bulk vs aggregates — class map",
      "Pneumatic bulker programs",
      "Tipper & open body unload rules",
      "Plant loading windows & detention",
      "Contract capacity vs labeled overflow",
      "Buyer checklist",
      "Methodology limits & references",
    ],
    toc: [
      {
        title: "1-2 Framing & class map",
        children: ["Why class before rate", "Product → body matrix"],
      },
      {
        title: "3-5 Operations",
        children: ["Bulker intake", "Tipper vs open body", "Plant windows"],
      },
      {
        title: "6-8 Commercial & method",
        children: ["Reserved vs overflow", "Buyer checklist", "Limits"],
      },
    ],
    coverage: [
      "Bagged cement road moves",
      "Bulk cement & fly ash bulker",
      "Aggregates & tipper dump",
      "Plant loading windows",
      "Contract vs labeled network",
      "Methodology limits",
    ],
    methodology: [
      "Ops-grounded class and window framing",
      "No invented cement logistics TAM",
      "Disclosed gaps; planning support only",
      "Cluster support for cement industry pillar",
    ],
    takeaways: [
      "Match bulker, tipper, or open body to intake and unload — not to a generic cement rate.",
      "Plant windows dominate cost-to-serve on cement corridors.",
      "Reserve repeat lanes; label overflow.",
      "No invented national cement logistics market size in this brief.",
    ],
    trustSignals: [
      { label: "Class-first framing", detail: "Bulker / tipper / open" },
      { label: "No invented TAM", detail: "Limits on-page" },
      { label: "HTML brief ungated", detail: "PDF for chapter pack" },
    ],
    sources: [
      { label: "ZAFTYS Analytics — India cement logistics outlook (ZAF-INDIA-CEMENT-LOG-2026)" },
      { label: "Cluster: Cement logistics industry desk on zaftys.com" },
      { label: "Published on site 2026-08-22 · www.zaftys.com" },
    ],
    relatedReportSlugs: [
      "india-road-freight-ftl-outlook-2027-2036",
      "global-logistics-market-2027-2036",
    ],
    relatedBlogSlugs: [
      "cement-plant-loading-windows",
      "pneumatic-bulker-bulk-cement-fly-ash",
      "open-body-vs-tipper-bagged-cement-aggregates",
      "plant-detention-tat-yard-gate-india",
    ],
    cta: { label: "Cement logistics", to: "/industries/cement" },
  }),
];
