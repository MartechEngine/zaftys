/** Wave 3 — depth, trust & differentiation (SEO plan §12). */
import type { BlogPost } from "@/lib/blog-data";

export const wave3BlogPosts: readonly BlogPost[] = [
  {
    slug: "inter-plant-wip-moves-shift-gate",
    title: "Inter-Plant WIP Moves: FTL That Follows the Shift Gate",
    seoTitle: "Inter-Plant WIP FTL Shift Gate India",
    seoDescription:
      "Inter-plant WIP moves in India: FTL timed to shift gates, bay rules, papers between plants, and how manufacturing desks keep WIP from waiting on ad-hoc trucks.",
    category: "industries",
    publishedAt: "2026-08-22",
    updatedAt: "2026-08-22",
    author: "ZAFTYS Operations",
    summary:
      "WIP between plants is not a leisurely stock transfer. This guide covers FTL that follows shift gates so production does not wait on a random open body.",
    readMinutes: 8,
    heroImage: "/images/blog/planning-industrial-shipments.jpg",
    heroAlt: "Inter-plant WIP freight timed to manufacturing shift gates",
    takeaways: [
      "WIP FTL fails when allotment ignores the receiving plant’s shift gate.",
      "Papers and vehicle class must match both gates — not only the origin bay.",
      "Repeat WIP lanes belong on contract or dedicated capacity, not daily spot hunts.",
    ],
    midCtaAfterHeading: "Two gates, one indent",
    relatedSlugs: [
      "contract-logistics-vs-spot-ftl-plant-teams",
      "plant-detention-tat-yard-gate-india",
      "planning-industrial-shipments",
      "shutdown-turnaround-freight-capacity",
    ],
    faqs: [
      {
        question: "What counts as inter-plant WIP freight?",
        answer:
          "Full-truckload transfers of work-in-progress or semi-finished goods between plants in the same network — timed to production, not a generic warehouse move.",
      },
      {
        question: "Why do shift gates matter more than distance?",
        answer:
          "A short corridor still fails if the trailer arrives outside the receiving bay window. Detention and line wait start at the gate, not at kilometre 200.",
      },
      {
        question: "Should WIP run on spot FTL?",
        answer:
          "Core WIP lanes should be reserved. Spot is for true surge. See [contract vs spot for plant teams](/blog/contract-logistics-vs-spot-ftl-plant-teams).",
      },
      {
        question: "Where is the manufacturing desk?",
        answer: "[Manufacturing logistics](/industries/manufacturing).",
      },
    ],
    sections: [
      {
        heading: "WIP is a production clock",
        paragraphs: [
          "Inter-plant WIP looks like ordinary FTL until the receiving line is waiting. Then every late gate-in is a production event, not a logistics anecdote.",
          "Treat WIP as manufacturing logistics first — see [manufacturing](/industries/manufacturing) and [planning industrial shipments](/blog/planning-industrial-shipments).",
        ],
      },
      {
        heading: "Two gates, one indent",
        paragraphs: ["Before allotment, lock:"],
        bullets: [
          "Origin load window and receiving shift gate",
          "Body class both plants will accept",
          "Papers both gates require (LR, e-Way Bill path, plant passes)",
          "Who owns ETA updates when either queue slips",
        ],
      },
      {
        heading: "Detention is dual-sided",
        paragraphs: [
          "WIP trips inherit plant detention physics at both ends. Use the same discipline as [plant detention and TAT](/blog/plant-detention-tat-yard-gate-india) — twice.",
        ],
      },
      {
        heading: "Reserve the lane",
        paragraphs: [
          "If WIP repeats weekly, put it on [contract logistics](/logistics/contract-logistics) or [dedicated fleet](/logistics/dedicated-fleet). Labeled network overflow covers peaks without rewriting ownership — [labeled network capacity](/blog/labeled-network-capacity-live-trip).",
        ],
      },
      {
        heading: "What to do next",
        paragraphs: [
          "List WIP lanes with shift windows and trips/week. We will map reserved capacity so production is not shopping trucks mid-shift.",
        ],
      },
    ],
    cta: { label: "Manufacturing logistics", to: "/industries/manufacturing" },
  },
  {
    slug: "shutdown-turnaround-freight-capacity",
    title: "Shutdown and Turnaround Freight: Reserving Capacity Before the Outage Week",
    seoTitle: "Shutdown Turnaround Freight Capacity India",
    seoDescription:
      "Shutdown and turnaround freight in India: reserve tipper and trailer capacity before outage week, project cargo windows, and how industrial desks avoid scramble allotment.",
    category: "industries",
    publishedAt: "2026-08-22",
    updatedAt: "2026-08-22",
    author: "ZAFTYS Operations",
    summary:
      "Shutdown weeks punish plants that hunt trucks after the outage starts. This guide covers reserving industrial freight capacity before turnaround, not during it.",
    readMinutes: 8,
    heroImage: "/images/blog/planning-industrial-shipments.jpg",
    heroAlt: "Industrial plant shutdown freight capacity planning",
    takeaways: [
      "Book body classes and windows before the shutdown calendar locks.",
      "Shutdown cargo mixes tipper, trailer, and ODC — one generic FTL booking fails.",
      "Overflow stays labeled; panic brokerage is not a plan.",
    ],
    midCtaAfterHeading: "What to reserve before week zero",
    relatedSlugs: [
      "inter-plant-wip-moves-shift-gate",
      "planning-industrial-shipments",
      "contract-logistics-vs-spot-ftl-plant-teams",
      "tipper-programs-coal-ore-limestone",
    ],
    faqs: [
      {
        question: "When should shutdown freight be reserved?",
        answer:
          "As soon as the outage window is credible — weeks ahead for scarce body classes — not the Monday the turnaround starts.",
      },
      {
        question: "What cargo shows up in shutdown weeks?",
        answer:
          "Scaffolding and project materials, removed equipment, catalysts or refractories, waste and scrap tipper moves, and urgent inbound spares — mix varies by plant.",
      },
      {
        question: "Is this the same as manufacturing WIP?",
        answer:
          "Related but different clock. WIP follows shift gates year-round; shutdown freight is a burst around an outage calendar. See [industrial logistics](/industries/industrial-logistics).",
      },
      {
        question: "Can TranZfort cover last-minute shutdown demand?",
        answer:
          "It can cover labeled overflow. It is not a substitute for reserving core classes before the week. See [TranZfort matching](/blog/tranzfort-matching-free-to-post).",
      },
    ],
    sections: [
      {
        heading: "Outage week is too late to shop",
        paragraphs: [
          "Every industrial belt has the same story: turnaround starts, WhatsApp fills with tipper and trailer asks, and rates spike because capacity was never reserved.",
          "Industrial logistics desks exist to plan that burst early — [industrial logistics](/industries/industrial-logistics).",
        ],
      },
      {
        heading: "What to reserve before week zero",
        paragraphs: ["Build a short capacity pack:"],
        bullets: [
          "Body classes by day (tipper, open, trailer, ODC if any)",
          "Origin / destination sites inside and outside the fence",
          "Gate and permit constraints for heavy or odd loads",
          "Which trips are must-own vs labeled overflow",
        ],
      },
      {
        heading: "Mix of minerals and metals adjacency",
        paragraphs: [
          "Some shutdown moves look like mining tipper work; others like mill steel. Keep the industrial account as the umbrella and pull vertical habits from [tipper programs](/blog/tipper-programs-coal-ore-limestone) or steel desks as needed.",
        ],
      },
      {
        heading: "Contract the core",
        paragraphs: [
          "Put must-run shutdown lanes on [contract](/logistics/contract-logistics) language before the calendar. Use the [contract vs spot](/blog/contract-logistics-vs-spot-ftl-plant-teams) frame so surge is intentional.",
        ],
      },
      {
        heading: "What to do next",
        paragraphs: [
          "Send the next outage window and draft material list. We will reserve classes before scramble week — without inventing a fake fleet size.",
        ],
      },
    ],
    cta: { label: "Industrial logistics", to: "/industries/industrial-logistics" },
  },
  {
    slug: "amravati-desk-pan-corridor-without-fake-fleet-counts",
    title: "How Amravati Desks Run Pan-Corridor Trips Without Fake Fleet-Size Claims",
    seoTitle: "Amravati Desk Pan-Corridor Freight ZAFTYS",
    seoDescription:
      "How ZAFTYS Amravati desks run pan-corridor FTL without fake fleet-size claims: owned capacity first, labeled network overflow, and accountable trip close-out.",
    category: "operations",
    publishedAt: "2026-08-22",
    updatedAt: "2026-08-22",
    author: "ZAFTYS Operations",
    summary:
      "Pan-India corridors do not require invented truck counts. This guide explains how an Amravati desk runs trips with owned fleet first and labeled network when volume spikes.",
    readMinutes: 7,
    heroImage: "/images/blog/tms-for-heavy-haul.jpg",
    heroAlt: "ZAFTYS operations desk coordinating corridor freight",
    takeaways: [
      "Corridor coverage is a desk + capacity model — not a vanity fleet number.",
      "Owned trucks run first; network overflow is labeled on the trip.",
      "If a brochure leads with “thousands of trucks,” ask what is owned on your lane today.",
    ],
    midCtaAfterHeading: "What the desk actually owns",
    relatedSlugs: [
      "labeled-network-capacity-live-trip",
      "tranzfort-matching-free-to-post",
      "gst-billing-contracted-trips-invoice",
      "partner-onboarding-rc-insurance-corridor",
    ],
    faqs: [
      {
        question: "Where is ZAFTYS based?",
        answer:
          "Operations desk in Amravati (Old Town, Badnera), Maharashtra — coordinating contracted trips across industrial corridors. See [About](/about) and [Contact](/contact).",
      },
      {
        question: "Do you claim a national owned fleet count?",
        answer:
          "We do not inflate marketing with unverifiable fleet totals. We state owned capacity where we run lanes and labeled partner capacity for overflow.",
      },
      {
        question: "How do shippers verify Own vs Network?",
        answer:
          "Ask for the label on allotment and on the trip record in [ZAFTYS TMS](/zaftys-tms). Read [labeled network capacity](/blog/labeled-network-capacity-live-trip).",
      },
      {
        question: "How do partners join?",
        answer: "[Partner onboarding](/blog/partner-onboarding-rc-insurance-corridor) and [/partner](/partner).",
      },
    ],
    sections: [
      {
        heading: "Coverage without cosplay fleet counts",
        paragraphs: [
          "Indian logistics marketing often leads with a huge truck number. Shippers discover later that the number was every vehicle that ever touched a load board.",
          "ZAFTYS runs from an Amravati desk with company fleet on corridors we operate and verified partners when you need more wheels — labeled. See [About](/about).",
        ],
      },
      {
        heading: "What the desk actually owns",
        paragraphs: ["On a live program:"],
        bullets: [
          "Indent intake and vehicle class match",
          "Allotment follow-through until documentation closes",
          "Own vs Network honesty on the trip",
          "GST billing when the trip is contracted through ZAFTYS",
        ],
      },
      {
        heading: "How pan-corridor work scales",
        paragraphs: [
          "Repeat lanes get reserved habits. Peaks use [TranZfort](/network/tranzfort). Visibility sits in TMS so status is not only a phone tree — [reading a live map](/blog/reading-live-map-without-calling-control-room).",
        ],
      },
      {
        heading: "Trust checks for buyers",
        paragraphs: [
          "Ask for Own vs Network on the last ten trips, sample ePOD tied to invoices, and a refused KYC example. If the answers are vague, the fleet claim was the product.",
        ],
      },
      {
        heading: "What to do next",
        paragraphs: [
          "Share corridor, cargo, and weekly volume. We will say what we can run owned and what would be labeled network — without a fantasy headcount.",
        ],
      },
    ],
    cta: { label: "About ZAFTYS", to: "/about" },
  },
  {
    slug: "gst-billing-contracted-trips-invoice",
    title: "GST Billing on Contracted Trips: What Shippers Should See on the Invoice",
    seoTitle: "GST Billing Contracted Freight Invoice India",
    seoDescription:
      "GST billing on contracted FTL trips in India: what shippers should see on the invoice, trip-tied proof, and how ZAFTYS separates marketplace fees from contract billing.",
    category: "operations",
    publishedAt: "2026-08-22",
    updatedAt: "2026-08-22",
    author: "ZAFTYS Operations",
    summary:
      "A clean freight invoice is a trip trail, not a surprise PDF. This guide lists what shippers should see on GST billing for contracted movements.",
    readMinutes: 8,
    heroImage: "/images/blog/epod-fastag-eway-bill-compliance-india.jpg",
    heroAlt: "GST freight invoice tied to contracted trip proof",
    takeaways: [
      "Contracted trips should invoice with GST identity, trip references, and matching proof.",
      "Marketplace broker fees and ZAFTYS contract invoices are different commercial events.",
      "Block dirty bills when ePOD and documents do not match the line.",
    ],
    midCtaAfterHeading: "What belongs on the invoice pack",
    relatedSlugs: [
      "epod-that-closes-billing",
      "epod-fastag-eway-bill-billing-india",
      "tranzfort-matching-free-to-post",
      "document-expiry-weighbridge-fleet-records",
    ],
    faqs: [
      {
        question: "What should a contracted freight invoice show?",
        answer:
          "Supplier GST details, shipper billing entity, trip / LR references, lane and dates, taxable value, GST breakup, and enough detail to match ePOD and documents.",
      },
      {
        question: "Is a TranZfort booking fee the same as ZAFTYS freight invoice?",
        answer:
          "No. Marketplace booking fees follow TranZfort rules. Contracted trips through ZAFTYS bill as ZAFTYS GST invoices. Ask which rail applies before allotment.",
      },
      {
        question: "How does ePOD connect to GST billing?",
        answer:
          "Delivery proof should sit on the same trip the invoice references. See [ePOD that closes billing](/blog/epod-that-closes-billing).",
      },
      {
        question: "Is this tax advice?",
        answer:
          "No. It is operational billing hygiene. Confirm GST treatment with your finance and tax advisors.",
      },
    ],
    sections: [
      {
        heading: "Invoice quality is ops quality",
        paragraphs: [
          "Finance disputes are often logistics disputes that arrived late. If the trip record is messy, the GST invoice will be messy.",
          "This is billing hygiene for contracted FTL — not tax advice. Confirm treatment with your advisors.",
        ],
      },
      {
        heading: "What belongs on the invoice pack",
        paragraphs: ["Shippers should be able to match:"],
        bullets: [
          "Legal names and GSTINs for billed parties",
          "Trip / LR / indent references",
          "Origin–destination and service period",
          "Taxable value and GST line breakup",
          "Supporting ePOD and statutory docs where required",
        ],
      },
      {
        heading: "Two rails, two conversations",
        paragraphs: [
          "TranZfort: free to list/search; fee on booking — [matching guide](/blog/tranzfort-matching-free-to-post).",
          "ZAFTYS contracted trip: GST invoice from ZAFTYS when we contract the move. Do not conflate the fee types in month-end packs.",
        ],
      },
      {
        heading: "Close-out before invoice",
        paragraphs: [
          "Use [ePOD that closes billing](/blog/epod-that-closes-billing) and the deeper [ePOD / e-Way Bill](/blog/epod-fastag-eway-bill-billing-india) guide so dirty trips never become clean-looking invoices.",
        ],
      },
      {
        heading: "What to do next",
        paragraphs: [
          "Audit five recent freight invoices against trip ePOD. Gaps you find are the process to fix — before the next rate negotiation.",
        ],
      },
    ],
    cta: { label: "Explore ZAFTYS TMS", to: "/zaftys-tms" },
  },
  {
    slug: "partner-onboarding-rc-insurance-corridor",
    title: "Partner Onboarding: RC, Insurance, and Corridor Fit Before the First Load",
    seoTitle: "Transport Partner Onboarding RC Insurance India",
    seoDescription:
      "ZAFTYS transport partner onboarding: RC, insurance, fitness, corridor fit, and why KYC happens before the first load — not after a failed plant gate.",
    category: "operations",
    publishedAt: "2026-08-22",
    updatedAt: "2026-08-22",
    author: "ZAFTYS Operations",
    summary:
      "Network capacity only helps if partners clear KYC and corridor fit first. This guide covers onboarding papers and why the first load is not the verification step.",
    readMinutes: 7,
    heroImage: "/images/blog/tms-for-heavy-haul.jpg",
    heroAlt: "Transport partner document verification before allotment",
    takeaways: [
      "RC, insurance, fitness, and permits are entry tickets — not paperwork after allotment.",
      "Corridor fit includes body class and plant habits, not only a rate.",
      "Verified partners can earn labeled capacity and badge paths — not anonymous load-board chaos.",
    ],
    midCtaAfterHeading: "Documents before the first indent",
    relatedSlugs: [
      "document-expiry-weighbridge-fleet-records",
      "labeled-network-capacity-live-trip",
      "tranzfort-matching-free-to-post",
      "amravati-desk-pan-corridor-without-fake-fleet-counts",
    ],
    faqs: [
      {
        question: "What documents do partners need?",
        answer:
          "Typically vehicle RC, insurance, fitness, relevant permits, and driver credentials — plus any corridor-specific plant requirements. Confirm the current checklist on [/partner](/partner).",
      },
      {
        question: "Can I take a first load before KYC?",
        answer:
          "No. First load is not the verification step. Failed papers at a plant gate burn shipper trust and free time.",
      },
      {
        question: "How does this relate to TranZfort?",
        answer:
          "Marketplace matching still expects verifiable capacity. See [TranZfort matching](/blog/tranzfort-matching-free-to-post) and [partner](/partner).",
      },
      {
        question: "What is a Verified ZAFTYS Partner badge?",
        answer:
          "A trust signal for fleet owners who clear onboarding and link back to zaftys.com/partner — part of the network quality story, not a paid directory listing claim.",
      },
    ],
    sections: [
      {
        heading: "Overflow without KYC is just risk",
        paragraphs: [
          "Labeled network capacity only works when partners are real, insured, and fit for the corridor. Onboarding is how ZAFTYS keeps Own vs Network honest under surge.",
        ],
      },
      {
        heading: "Documents before the first indent",
        paragraphs: ["Expect to clear:"],
        bullets: [
          "RC and fitness with valid dates",
          "Insurance for the vehicle class",
          "Permits required for the corridors you want",
          "Driver credentials as plants require",
          "Body class list you can actually field",
        ],
      },
      {
        heading: "Corridor fit beyond papers",
        paragraphs: [
          "A tipper that passes KYC still fails a coil mill. Partners declare corridors and cargo types they can run — steel, cement, mining, container — so allotment is not a random match. See [document expiry](/blog/document-expiry-weighbridge-fleet-records).",
        ],
      },
      {
        heading: "Where to register",
        paragraphs: [
          "Start at [/partner](/partner). Marketplace paths also run through [TranZfort](/network/tranzfort). Labeled trips after onboarding are explained in [labeled network capacity](/blog/labeled-network-capacity-live-trip).",
        ],
      },
      {
        heading: "What to do next",
        paragraphs: [
          "If you run fit capacity on industrial corridors, complete partner KYC before peak season — not during someone else’s shutdown week.",
        ],
      },
    ],
    cta: { label: "Register as partner", to: "/partner" },
  },
  {
    slug: "when-analytics-help-when-whatsapp-lies",
    title: "When Analytics Help — and When WhatsApp Still Lies About the Lane",
    seoTitle: "Freight Analytics vs WhatsApp Lane Reality",
    seoDescription:
      "When freight analytics help Indian shippers — and when WhatsApp still lies about the lane: rate context, exception truth, and honest use of ZAFTYS intelligence.",
    category: "technology",
    publishedAt: "2026-08-22",
    updatedAt: "2026-08-22",
    author: "ZAFTYS Operations",
    summary:
      "Dashboards do not fix a lane that only exists in chat optimism. This guide separates useful freight analytics from WhatsApp stories that survive until the gate.",
    readMinutes: 8,
    heroImage: "/images/blog/tms-evaluation-guide-indian-manufacturers.jpg",
    heroAlt: "Freight analytics compared with lane reality from operations",
    takeaways: [
      "Analytics help when denominators and trip proof are real — not when chat is the system of record.",
      "Rate boards without detention and body-class context still mislead plant teams.",
      "Use intelligence to question the lane; use the desk to run it.",
    ],
    midCtaAfterHeading: "Where analytics earn their keep",
    relatedSlugs: [
      "reading-live-map-without-calling-control-room",
      "epod-that-closes-billing",
      "tms-evaluation-guide-indian-manufacturers",
      "contract-logistics-vs-spot-ftl-plant-teams",
    ],
    faqs: [
      {
        question: "Can analytics replace a transporter desk?",
        answer:
          "No. Analytics inform decisions; allotment, papers, and exceptions still need an accountable desk.",
      },
      {
        question: "When is WhatsApp the wrong system of record?",
        answer:
          "Whenever OTIF, detention, or billing depends on proof. Chat is fine for alerts — bad as the only archive.",
      },
      {
        question: "Where does ZAFTYS publish intelligence products?",
        answer:
          "[Logistics intelligence](/intelligence) and related leaves for analytics, rates context, and market views — without promising vanity KPIs we do not operate.",
      },
      {
        question: "How do reports fit?",
        answer:
          "Institutional [market reports](/reports) are research landings with crawlable HTML and gated PDFs — different from live trip analytics.",
      },
    ],
    sections: [
      {
        heading: "Two truths can coexist",
        paragraphs: [
          "A rate index can be directionally useful while a single plant lane is lying in WhatsApp about ETA and detention. Shippers need both market context and trip-level honesty.",
          "ZAFTYS separates [intelligence](/intelligence) products from execution desks on purpose.",
        ],
      },
      {
        heading: "Where analytics earn their keep",
        paragraphs: ["Useful when you have:"],
        bullets: [
          "Trip-tied status and ePOD — not only chat screenshots",
          "Clear definitions for on-time and detention",
          "Body class and corridor filters on any rate comparison",
          "A willingness to change sourcing when the data contradicts habit",
        ],
      },
      {
        heading: "Where WhatsApp still lies",
        paragraphs: [
          "“Truck left” without gate-out proof. “At plant” while in a queue outside free time. “Owned fleet” that is unlabeled network. Fix those with [live map literacy](/blog/reading-live-map-without-calling-control-room), [ePOD close-out](/blog/epod-that-closes-billing), and [Own vs Network labels](/blog/labeled-network-capacity-live-trip).",
        ],
      },
      {
        heading: "Honest product posture",
        paragraphs: [
          "We will not invent SLA percentages for marketing. Intelligence should make better questions; TMS and the desk answer them on contracted trips. Evaluate software with the [TMS evaluation guide](/blog/tms-evaluation-guide-indian-manufacturers).",
        ],
      },
      {
        heading: "What to do next",
        paragraphs: [
          "Pick one corridor where chat and month-end numbers disagree. Instrument that lane in TMS before you buy another dashboard.",
        ],
      },
    ],
    cta: { label: "Logistics intelligence", to: "/intelligence" },
  },
];
