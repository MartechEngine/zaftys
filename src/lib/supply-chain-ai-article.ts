/**
 * /intelligence/ai — Supply Chain AI research article.
 * Five logistics-first stages. No invented public scale KPIs.
 * No em dash, en dash, or spaced hyphen used as a dash.
 */

import { paths } from "@/lib/site-paths";

export const supplyChainAiArticle = {
  seo: {
    title: "Supply Chain AI for Logistics Desks | ZAFTYS Research",
    description:
      "How ZAFTYS designs Supply Chain AI for freight desks: trip data, exception answers, guardrails, TMS handoff, and desk outcomes. Research. Analytics is Available separately.",
  },
  canonical: paths.intelligence.ai,
  breadcrumbs: [
    { name: "Home", path: "/" },
    { name: "Intelligence", path: paths.intelligence.hub },
    { name: "Supply Chain AI", path: paths.intelligence.ai },
  ],
  hero: {
    badge: "Supply Chain AI · Research",
    h1: "From trip data to desk decisions.",
    lead: "Research on AI that explains exceptions, answers corridor questions, and hands work back into ZAFTYS TMS. TranZfort matching AI is live. Broader desk AI stays Research until labeled otherwise.",
  },
  mail: {
    subject: "Supply Chain AI research inquiry",
    body: "Hi ZAFTYS,\n\nI want to discuss Supply Chain AI research.\n\nCompany:\nRole:\nUse cases of interest:\n\n",
  },
  intro: {
    eyebrow: "Why this architecture",
    h2: "AI only matters if it sits on the trip spine",
    lead: "A logistics desk does not need a generic copilot. It needs answers that cite indent, gate, GPS, ePOD, and labeled Own vs Network capacity. This article walks five stages designed around ZAFTYS TMS and the Amravati desk.",
    points: [
      "Built for dispatch and control-tower workflows, not a generic AI brand",
      "Own fleet and labeled network data stay distinct",
      "Guardrails force answers back to the trip record",
      "Status is Research: product claims only when labeled Available or Beta",
    ],
  },
  vsAnalytics: {
    eyebrow: "Boundary",
    h2: "Analytics is Available. Desk AI is Research.",
    lead: "Do not confuse the two. They share the same trip spine. They are not the same product.",
    items: [
      {
        title: "ZAFTYS Analytics · Available",
        body: "KPI dashboards and drill-downs: corridor reliability, Own vs Network score, cost against trip records, exception queues you can see today in Command Center and Shipments.",
        path: paths.intelligence.analytics,
        linkLabel: "Open Analytics",
      },
      {
        title: "Supply Chain AI · Research",
        body: "Natural-language exception narrative, corridor Q&A, and automated handoff into desk tasks. Designed on top of that same TMS truth. Not sold as finished until status moves.",
        path: null,
        linkLabel: null,
      },
    ],
  },
  scenario: {
    eyebrow: "Desk scenario",
    h2: "What Research is aiming to do on a live trip",
    lead: "Illustrative flow. Not a live chat product today. Shows how input, processing, guardrails, and orchestration should connect.",
    steps: [
      {
        label: "Situation",
        body: "A contracted FTL is late at a plant gate. The shipper asks why. WhatsApp has three conflicting updates.",
      },
      {
        label: "From the trip record",
        body: "ZAFTYS TMS shows dispatch time, last GPS ping, gate check-in attempt, and an open detention note. Own fleet labeled, not mixed with network overflow.",
      },
      {
        label: "What AI should return",
        body: "A short narrative: arrived after the plant window, gate queue open, detention clock started, next action for the desk. No invented ETA that the record cannot support.",
      },
      {
        label: "Handoff",
        body: "Create or update an exception task in TMS, notify the assigned desk owner, keep the shipper portal status aligned. Analytics still holds the corridor KPI view for the weekly review.",
      },
    ],
  },
  whoFor: {
    eyebrow: "Who this is for",
    h2: "People who will use the answer, not the slide",
    items: [
      {
        title: "Dispatch and control towers",
        body: "Need exception narrative and next action without rebuilding the trip story from chat threads.",
      },
      {
        title: "Shipper logistics leads",
        body: "Want corridor answers grounded in contracted trip events, with Own vs Network still labeled.",
      },
      {
        title: "Technology reviewers",
        body: "Evaluating how desk AI would sit on ZAFTYS TMS, with guardrails and Research status stated upfront.",
      },
    ],
  },
  stages: [
    {
      id: "data-input",
      step: "01",
      title: "Data input",
      subtitle: "Trip truth into one intake layer.",
      image: "/images/intelligence/ai-01-data-input.webp",
      imageAlt: "ZAFTYS Supply Chain AI stage 1: data sources from TMS, history, desk prompts, ERP, and TranZfort",
      lead: "Accurate desk answers start with the same sources operations already trust. Intake is designed around trip records, not anonymous public averages.",
      body: [
        "ZAFTYS TMS trip records carry dispatch, live map, gate events, and ePOD close-out for contracted moves.",
        "Historical corridor data teaches patterns on lanes ZAFTYS actually runs.",
        "Desk prompts and exception notes capture what the control room is asking in the moment.",
        "ERP and plant windows, plus partner and TranZfort feeds, extend context without blending Own vs Network labels.",
      ],
      takeaway:
        "Multi-source inputs only help when they stay grounded in trips ZAFTYS actually runs.",
    },
    {
      id: "processing",
      step: "02",
      title: "AI processing",
      subtitle: "From trip events to desk answers.",
      image: "/images/intelligence/ai-02-processing.webp",
      imageAlt: "ZAFTYS Supply Chain AI stage 2: processing exception narrative, lane questions, vehicle fit, and risk signals",
      lead: "The engine turns trip events into answers: what blocked the move, what the corridor history says, what truck fits next, and what risk to flag before the plant call.",
      body: [
        "Timeline synthesis: order dispatch, GPS, gate, and detention into one readable story for the open trip.",
        "Corridor Q&A: history and live status for lanes in your program, not a national average chart.",
        "Capacity and vehicle fit: the same matching logic already used on TranZfort for corridor and body class.",
        "Risk flags: patterns the desk should see early, such as repeated gate misses on a plant window.",
      ],
      takeaway:
        "Processing is logistics Q&A on the trip spine, not a generic chatbot with a freight skin.",
    },
    {
      id: "security",
      step: "03",
      title: "Guardrails",
      subtitle: "Safe answers on commercial trip data.",
      image: "/images/intelligence/ai-03-guardrails.webp",
      imageAlt: "ZAFTYS Supply Chain AI stage 3: guardrail layers that ground answers in the trip record",
      lead: "AI that touches commercial freight data must fail closed when the trip record cannot support the answer. Guardrails are product design, not decoration.",
      body: [
        "Input validation checks prompts and feeds before they reach the model.",
        "Answers must ground in the trip record. Invented rates, trucks, or statuses are blocked.",
        "Role-based access limits who can see which corridors and commercial fields.",
        "Sensitive fields stay encrypted, and desk queries are auditable for later review.",
      ],
      takeaway:
        "Guardrails keep Supply Chain AI honest to ZAFTYS TMS truth.",
    },
    {
      id: "orchestration",
      step: "04",
      title: "Orchestration",
      subtitle: "Connect. Assign. Act.",
      image: "/images/intelligence/ai-04-orchestration.webp",
      imageAlt: "ZAFTYS Supply Chain AI stage 4: orchestration engine connected to TMS, TranZfort, portal, APIs, and billing",
      lead: "Intelligence only helps if suggestions become desk work inside tools you already run.",
      body: [
        "The orchestration engine covers task planning, exception queues, decision handoff, and desk follow-up.",
        "Connected systems include ZAFTYS TMS, TranZfort, shipper portal, partner APIs, and billing close-out.",
        "app.zaftys.com remains the operational spine: dispatch, shipments, map, and ePOD already exist there.",
        "Broader automation into ERP and full desk assistants stays Research until labeled Beta or Available.",
      ],
      takeaway:
        "Orchestration turns AI into assignable work, not another unread dashboard.",
    },
    {
      id: "outputs",
      step: "05",
      title: "Desk outcomes",
      subtitle: "What good looks like when Research becomes product.",
      image: "/images/intelligence/ai-05-outcomes.webp",
      imageAlt: "ZAFTYS Supply Chain AI stage 5: desk outcomes such as clearer corridor answers and fewer status chases",
      lead: "Success is measured in how the desk works a lane, not in invented global scale counters.",
      body: [
        "Fewer conflicting status threads: one trip-backed explanation instead of three WhatsApp versions.",
        "Clearer plant and procurement conversations: corridor answers that cite events, not folklore.",
        "Better allotment on TranZfort: vehicle fit that is already live in matching.",
        "Cleaner weekly reviews: AI narrative for the open exception, Analytics KPIs for the corridor trend.",
      ],
      takeaway:
        "Impact only counts when it attaches to trips you can defend.",
    },
  ],
  liveToday: {
    eyebrow: "What is live today",
    h2: "Matching AI on TranZfort. Trip truth on TMS.",
    items: [
      {
        title: "TranZfort matching",
        body: "AI already supports corridor and vehicle fit on the marketplace. That is product, not a research slide.",
      },
      {
        title: "ZAFTYS TMS and Analytics",
        body: "Dispatch, shipments, map, and operations analytics are Available. They are the spine this research assumes.",
      },
      {
        title: "Desk AI roadmap",
        body: "Exception narrative, corridor Q&A, and broader orchestration stay Research until we label them Beta or Available.",
      },
    ],
  },
  related: {
    eyebrow: "Related",
    h2: "Continue in Logistics Intelligence",
    links: [
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
        name: "Market Intelligence",
        path: paths.intelligence.marketIntelligence,
        blurb: "Institutional reports · Available",
      },
      {
        name: "Intelligence hub",
        path: paths.intelligence.hub,
        blurb: "All modules overview",
      },
    ],
  },
  finalCta: {
    h2: "Talk Research with the team that runs the lanes",
    lead: "Ask about Supply Chain AI for your desk, or start from Analytics and TMS where product is already Available.",
    primaryLabel: "Discuss Supply Chain AI",
    secondaryLabel: "Back to Intelligence",
    secondaryPath: paths.intelligence.hub,
  },
} as const;
