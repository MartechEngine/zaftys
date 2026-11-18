/** Deep-research exhibits: transporter indent management & OTIF India.
 * Pure TypeScript. Zero em-dashes or en-dashes; spaced hyphens only.
 * Workshop bands. Confirm contract counsel before debit-note practice.
 */
import { zaftysViz } from "@/lib/blog-exhibits-tms-eval";
import type { BlogExhibit, BlogKpi } from "@/lib/blog-data";

export const indentOtifKpis: readonly BlogKpi[] = [
  {
    value: "22% - 35%*",
    label: "Morning indent dropouts (workshop)",
    detail:
      "*Workshop coaching band only - not a national dropout index. Share of verbally confirmed morning indents that fail afternoon gate cutoff; lane and season specific.",
  },
  {
    value: "18% - 25%",
    label: "Emergency spot premium",
    detail:
      "Freight markup when dispatch is forced into uncontracted roadside spot trucks to clear choked packing docks after contracted placement collapses.",
  },
  {
    value: "2 hours",
    label: "L1 cascading SLA window",
    detail:
      "Operational benchmark for L1 contracted carriers to accept or reject daily indents before the TMS auto-triggers L2 cascading.",
  },
  {
    value: "Rs 1.5k - 2.5k",
    label: "Daily placement penalty band",
    detail:
      "Common contractual liquidated damages for unfulfilled indents - often too small alone unless paired with a risk-purchase debit clause.",
  },
  {
    value: "68% vs 92%",
    label: "Manual vs TMS OTIF desk targets",
    detail:
      "Workshop coaching bands only - not a published national OTIF index. Contrast unorganized phone/WhatsApp indent plants with digitized desks running automated cascading and scorecards.",
  },
  {
    value: "Zero commission",
    label: "Marketplace safety valve",
    detail:
      "Unfulfilled enterprise indents publish from ZAFTYS web TMS into TranZfort open driver networks without a platform cut on the trip rate.",
  },
] as const;

export const indentOtifTakeaways = [
  "Morning verbal confirms are not placement. 22% to 35% of confirmed indents still fail the afternoon gate cutoff when transporters chase spot arbitrage.",
  "OTIF is compound: on-time gate placement, in-full vehicle specification, and on-time delivery - a 90% placement boast can hide a ~62% to 64% true OTIF.",
  "Automate the indent waterfall: L1 2-hour window, L2 cascade, backup pool, then TranZfort open push - identify shortfalls by 11:30 AM, not 4:00 PM.",
  "Static Rs 1,000 penalties fail when spot diversion earns Rs 4,000 more. Section 73 risk-purchase debit notes make non-placement expensive.",
  "Sub-120-minute plant TAT buys placement loyalty; 36-48 hour detention makes good carriers systematically deprioritize your morning indents.",
  "ZAFTYS runs the multi-seat cascading desk; TranZfort is the zero-commission safety valve - booked overflow returns into the same gate-to-pay ledger.",
] as const;

export const indentOtifReferences = [
  "[Indian Contract Act, 1872](https://www.indiacode.nic.in/handle/123456789/2187?locale=en) - Section 73 (compensation for loss or damage caused by breach of contract) and Section 74 (liquidated damages). Confirm bare text with counsel before debit practice.",
  "[Carriage by Road Act, 2007](https://www.indiacode.nic.in/handle/123456789/2043?locale=en) - Section 9 framing for common carrier liability on non-delivery and delay (orientation).",
  "[CGST Act / Rules](https://www.indiacode.nic.in/handle/123456789/11537?locale=en) - Rule 138(10) e-Way Bill validity linked to vehicle dispatch timing. Confirm live bare rules.",
  "Product: [TranZfort](https://www.tranzfort.com) · [TranZfort marketplace](/network/tranzfort).",
  "Internal cluster: [spot vs dedicated](/blog/spot-market-vs-dedicated-fleet-india), [plant detention TAT](/blog/plant-detention-tat-yard-gate-india), [truck freight rates](/blog/truck-freight-rates-india-cost-rate-benchmarking-guide), [5 hidden cost leaks](/blog/5-hidden-cost-leaks-heavy-industrial-freight-tms-3pl-guide), [industrial TMS](/blog/industrial-tms-control-stack-india), [load marketplaces](/blog/online-truck-load-marketplaces-india-freight-apps-guide).",
] as const;

export const indentOtifExhibits: Record<string, readonly BlogExhibit[]> = {
  "The 9:00 AM dispatch crisis: anatomy of an indent failure": [
    {
      kind: "callout",
      caption: "Key definitions (quotable)",
      source: "Desk vocabulary for this guide. Measure from gate timestamps, not transporter self-reports.",
      items: [
        {
          title: "OTIF",
          body: "On-Time In-Full: on-time gate placement + in-full vehicle allocation + on-time consignee delivery, as a share of indented dispatches.",
          tone: "teal",
        },
        {
          title: "OTP",
          body: "On-Time Placement only - vehicle crossed the plant gate inside the assigned window. Necessary but not sufficient for OTIF.",
          tone: "navy",
        },
        {
          title: "Indent cascading",
          body: "Automated L1 acceptance window, L2 cascade on timeout, then backup pool / open-marketplace push so shortfalls surface before afternoon choke.",
          tone: "warm",
        },
      ],
    },
    {
      kind: "donut",
      caption: "Root causes of transporter morning indent failures",
      source:
        "Single-denominator workshop pie (100%). Teaching pattern - not a ZAFTYS audited national dropout index.",
      slices: [
        { label: "Spot market arbitrage (higher-paying corridors)", value: 42, color: zaftysViz.warm },
        { label: "Previous unloading demurrage / plant detention", value: 26, color: zaftysViz.navy },
        { label: "Driver absenteeism and shortages", value: 18, color: zaftysViz.primary },
        { label: "Mechanical breakdowns and fitness failures", value: 14, color: zaftysViz.teal },
      ],
    },
    {
      kind: "timeline",
      caption: "Daily rhythm of a manufacturing dispatch collapse",
      source: "Composite plant pattern. Shift times vary by industry.",
      items: [
        {
          phase: "09:00",
          title: "Indent blast",
          body: "Production plan locks; desk issues indents for dozens of multi-axle / container trucks.",
        },
        {
          phase: "11:00",
          title: "Verbal confirm",
          body: "Phone and WhatsApp numbers arrive - not gate arrivals.",
        },
        {
          phase: "14:30",
          title: "The collapse",
          body: "Half the fleet is missing. Puncture, driver unreachable, RTO checking excuses.",
        },
        {
          phase: "16:00",
          title: "Choke",
          body: "Packing bays fill, customer LD risk rises, roadside spot scramble begins.",
        },
      ],
    },
  ],

  "Deconstructing OTIF for Indian road freight": [
    {
      kind: "image",
      caption: "Compound industrial OTIF equation [VENDOR SLA MEASUREMENT]",
      source: "Workshop definition. Recompute with your gate and ePOD timestamps.",
      src: "/images/blog/indent-otif-compound-equation.png",
      alt: "Formula board for OTIF percent as on-time placed intersect in-full payload intersect on-time delivered over total indented times 100",
    },
    {
      kind: "tiles",
      caption: "Three components that make OTIF honest",
      source: "Plant dispatch definition for this guide.",
      items: [
        {
          title: "On-Time Placement (OTP)",
          body: "Vehicle crosses security within the assigned arrival window (e.g. 10:00 to 13:00).",
        },
        {
          title: "In-Full Allocation (IFA)",
          body: "Body type, floor, payload class, and Vahan/Sarathi compliance match the indent - not a wrong truck that 'showed up.'",
        },
        {
          title: "On-Time Delivery (OTD)",
          body: "Consignee gate arrival inside the corridor transit SLA after clean dispatch.",
        },
      ],
    },
    {
      kind: "callout",
      caption: "The 90% placement myth",
      source: "Teaching contrast.",
      items: [
        {
          title: "Superficial placement",
          body: "Transporter boasts 90% vehicles placed - ignoring late slots and gate rejections.",
          tone: "warm",
        },
        {
          title: "True OTIF",
          body: "After punctuality and in-full filters, the same month can land near 62% to 64% OTIF.",
          tone: "teal",
        },
      ],
    },
  ],

  "The indent waterfall: designing an automated cascading engine": [
    {
      kind: "flow",
      caption: "Four-stage automated indent waterfall",
      source: "ZAFTYS dispatch architecture pattern for this guide.",
      items: [
        { title: "L1 primary", body: "Tender quota lane share. Strict 2-hour digital accept/reject." },
        { title: "L2 secondary", body: "Auto re-allocate on L1 timeout at contracted differential." },
        { title: "Backup pool / 3PL", body: "Pre-vetted regional reserve if L2 times out by ~1:00 PM." },
        { title: "TranZfort open", body: "Unplaced indents publish to verified truckers with zero commission." },
      ],
    },
    {
      kind: "callout",
      caption: "Why phone cascading fails",
      source: "Ops briefing.",
      items: [
        {
          title: "Favoritism and delay",
          body: "Human dispatchers call friends first and discover shortfalls after packing bays are already choked.",
          tone: "warm",
        },
        {
          title: "Time-bound automation",
          body: "Digital windows surface capacity gaps by ~11:30 AM instead of 4:00 PM panic.",
          tone: "teal",
        },
      ],
    },
  ],

  "Contractual SLAs and penalties: making non-placement enforceable": [
    {
      kind: "image",
      caption: "Risk-purchase differential debit [LEGAL PENALTY CALCULATION]",
      source: "Orientation under Section 73 Indian Contract Act. Counsel owns enforceability on your MSA.",
      src: "/images/blog/indent-otif-risk-purchase-debit.png",
      alt: "Formula board for debit amount as emergency spot rate minus contracted L1 rate plus consequential demurrage",
    },
    {
      kind: "tiles",
      caption: "Why Rs 1,000 penalties get ignored",
      source: "Commercial workshop pattern.",
      items: [
        {
          title: "Arbitrage math",
          body: "Absorbing a Rs 1,000 penalty is rational when diverting to spot earns Rs 4,000 more margin.",
        },
        {
          title: "Risk purchase",
          body: "Shipper buys replacement capacity; positive rate differential debits the defaulting transporter ledger.",
        },
        {
          title: "Reciprocal fairness",
          body: "On-time trucks stuck beyond free time earn automatic detention credit - or carriers stop believing the SLA.",
        },
      ],
    },
  ],

  "The 100-point industrial transporter performance scorecard": [
    {
      kind: "table",
      caption: "100-point industrial transporter performance rubric",
      source: "Data from weighbridge timestamps, gate logs, and ePOD. Workshop weights - tune to your tender.",
      headers: ["Pillar", "Points", "Metric", "Target benchmark"],
      rows: [
        ["Indent placement ratio", "35", "(Placed / Indented) x 35", "Minimum ~92%"],
        ["Gate-in punctuality / slot", "20", "Arrival inside assigned 2-hour slot", ">=90% on-slot"],
        ["Vehicle quality / compliance", "15", "Zero reject for tarp, floor, tyres, fitness", ">=98% pass"],
        ["En-route transit SLA", "20", "GPS corridor time vs contracted SLA", ">=90% on-SLA"],
        ["ePOD and billing cleanliness", "10", "Stamped POD upload within 24 hours", ">=95% clean"],
      ],
    },
    {
      kind: "callout",
      caption: "Dynamic tender quota",
      source: "Vendor governance pattern.",
      items: [
        {
          title: "Score drives volume",
          body: "Monthly leaders automatically win higher lane allocation next cycle - without a subjective vendor review meeting.",
          tone: "teal",
        },
        {
          title: "Laggards cascade first",
          body: "Chronic low scores lose L1 priority and face earlier L2 / marketplace exposure.",
          tone: "navy",
        },
      ],
    },
  ],

  "Yard and gate friction: how plant TAT dictates placement": [
    {
      kind: "tiles",
      caption: "Why good transporters abandon slow plants",
      source: "Carrier economics. Pair with plant detention guide.",
      items: [
        {
          title: "36-48 hour detention",
          body: "Slow security, uncalibrated weighbridges, manual loading, delayed consignment note / LR (bilty) - trucks earn nothing while EMI runs.",
        },
        {
          title: "Standing burn",
          body: "Two days stuck can cost ~Rs 7,000+ in EMI and driver wages - carriers deprioritize your next morning indent.",
        },
        {
          title: "Fast-gate dividend",
          body: "Sub-120-minute TAT plants often see 98%+ morning placement and ~5% lower baseline freight.",
        },
      ],
    },
    {
      kind: "callout",
      caption: "Placement is a two-way SLA",
      source: "See [plant detention TAT](/blog/plant-detention-tat-yard-gate-india).",
      items: [
        {
          title: "You cannot score what you delay",
          body: "Punishing non-placement while holding trucks two days destroys trust and placement ratios together.",
          tone: "warm",
        },
        {
          title: "Measure both clocks",
          body: "Indent OTIF and plant TAT belong on the same monthly governance pack.",
          tone: "teal",
        },
      ],
    },
  ],

  "Worked financial case: the cost of a 10-truck placement failure": [
    {
      kind: "image",
      caption: "Net cost of indent placement failure [DISPATCH DOWNTIME COST]",
      source: "Workshop: Total failure cost = spot premium + lost production hours x opex + customer LD.",
      src: "/images/blog/indent-otif-failure-cost.png",
      alt: "Formula board for total failure cost as spot rate premium plus production hours lost times hourly plant opex plus customer LD penalty",
    },
    {
      kind: "image",
      caption: "True cost of a 10-truck placement failure (Jamshedpur workshop)",
      source:
        "Teaching waterfall: manual scramble ~Rs 2,98,000 vs automated cascade ~Rs 18,400 recovered on carrier ledgers. Not a ZAFTYS audited plant file.",
      src: "/images/blog/indent-otif-10-truck-waterfall.png",
      alt: "Horizontal cost comparison of unorganized manual scramble near Rs 298000 versus automated TMS cascading with TranZfort near Rs 18400",
    },
    {
      kind: "table",
      caption: "Approach A vs Approach B line items (workshop)",
      source: "Heavy engineering / fasteners plant. 30 trailers daily to Western India. Month-end critical day.",
      headers: ["Line", "Manual scramble (A)", "TMS + TranZfort (B)"],
      rows: [
        ["Confirmed then missing", "10 trailers by 3:00 PM", "Same shortfall detected at L1 timeout"],
        ["Emergency spot premium", "~Rs 12,000 / truck (+22%)", "L2 + open match at transparent rates"],
        ["Unsourced trucks", "4 still missing", "0 - marketplace fills"],
        ["Packing line halt", "8 hours", "Avoided"],
        ["Customer LD", "Rs 1,50,000", "Rs 0"],
        ["Net corporate exposure", "~Rs 2,98,000", "~Rs 18,400 (debit recoverable)"],
      ],
    },
  ],

  "Standard operating procedure: the 8-step daily indent lifecycle": [
    {
      kind: "image",
      caption: "Automated indent waterfall and sourcing lifecycle",
      source: "Plant dispatcher and procurement shared protocol.",
      src: "/images/blog/indent-otif-8-step-lifecycle.png",
      alt: "Process board with eight steps from ERP sync through L1 window, L2 cascade, TranZfort push, driver booking, Vahan gate, weigh gate-out, and scorecard update",
    },
    {
      kind: "steps",
      caption: "8-stage daily protocol (desk copy)",
      source: "Clock times are workshop defaults - tune to your shift.",
      items: [
        { title: "01 ERP sync (08:00)", body: "Sales orders and net weight sizing lock the indent list." },
        { title: "02 L1 broadcast (09:00)", body: "TMS pushes digital indents to primary carriers." },
        { title: "03 2-hour window", body: "Accept or reject digitally by 11:00 - no WhatsApp folklore." },
        { title: "04 L2 cascade", body: "Timeouts auto-move to secondary at contracted differential." },
        { title: "05 TranZfort push", body: "Unplaced loads open to verified truckers from ~13:00." },
        { title: "06 Vahan gate-in", body: "Slot staging with live RC / DL checks." },
        { title: "07 Weigh and consignment note / LR (bilty)", body: "Weighbridge and documents before gate-out." },
        { title: "08 Scorecard update", body: "Daily placement, punctuality, and ePOD logs close the loop." },
      ],
    },
  ],

  "System architecture: connecting ZAFTYS web TMS to TranZfort mobile capacity": [
    {
      kind: "tiles",
      caption: "Dual-layer enterprise solution",
      source: "Product positioning for this guide.",
      items: [
        {
          title: "Layer 1 - ZAFTYS command centre",
          body: "Multi-seat web TMS for plant managers, logistics heads, and finance - L1/L2 waterfall, weighbridge APIs, freight audit ledgers.",
        },
        {
          title: "Layer 2 - TranZfort safety valve",
          body: "One-click broadcast of unfulfilled indents to verified truckers with zero commission when contracts fail or season spikes.",
        },
        {
          title: "Closed governance loop",
          body: "Marketplace bookings return into ZAFTYS gate-in, weigh, ePOD, and pay - institutional control preserved.",
        },
      ],
    },
  ],

  "The 20-point indent management and OTIF audit matrix and FAQs": [
    {
      kind: "table",
      variant: "scorecard",
      caption: "20-point indent management and OTIF readiness audit (rate 1 to 5; skip = 0)",
      source: "Coaching matrix for logistics, procurement, and ops VPs. Not a certification product.",
      headers: ["#", "Group", "Ask in the room", "Score"],
      rows: [
        ["1", "Sourcing", "Are daily indents sized from ERP orders - not verbal guesses?", ""],
        ["2", "Sourcing", "Is every indent tagged with body type and payload class?", ""],
        ["3", "Sourcing", "Are WhatsApp-only confirms banned as proof of placement?", ""],
        ["4", "Sourcing", "Is open marketplace used only after L1/L2 timeout rules?", ""],
        ["5", "Sourcing", "Is emergency spot premium tracked as a separate leak KPI?", ""],
        ["6", "Contract", "Is L1 acceptance window hard-coded at ~2 hours?", ""],
        ["7", "Contract", "Does L2 cascade fire automatically without phone calls?", ""],
        ["8", "Contract", "Is a Section 73 style risk-purchase debit in the MSA?", ""],
        ["9", "Contract", "Are detention credits automatic when plant TAT overruns?", ""],
        ["10", "Contract", "Does monthly scorecard change next-cycle volume quota?", ""],
        ["11", "Gate", "Is on-time placement measured at security timestamp?", ""],
        ["12", "Gate", "Are wrong-spec vehicles scored as in-full failures?", ""],
        ["13", "Gate", "Is plant TAT reported beside transporter OTIF?", ""],
        ["14", "Gate", "Is Vahan validation mandatory before loading slip?", ""],
        ["15", "Gate", "Do e-Way Bill Part B times align with gate-out?", ""],
        ["16", "Visibility", "Is OTIF computed compound - not placement alone?", ""],
        ["17", "Visibility", "Are ePOD uploads scored inside 24 hours?", ""],
        ["18", "Visibility", "Do L1 dropouts show on a live dispatch board by noon?", ""],
        ["19", "Visibility", "Can finance see risk-purchase debits on the freight ledger?", ""],
        ["20", "Visibility", "Do marketplace trips post into the same TMS scorecard?", ""],
      ],
    },
  ],
};
