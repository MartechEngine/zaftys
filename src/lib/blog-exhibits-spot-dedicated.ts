/** Exhibits for spot vs dedicated fleet hybrid sourcing guide */

export const zaftysVizSpot = {
  navy: "#0B1C36",
  primary: "#1E4D8C",
  primaryBright: "#3D7CC9",
  teal: "#0D9488",
  warm: "#D97706",
} as const;

export const spotDedicatedTakeaways = [
  "Spot market vs dedicated contract fleets is rarely either/or. All-contract buys placement and locks cost when volume dips.",
  "All-spot freight buying buys flexibility. It also buys rate spikes, weak KYC, and phone-call tracking in peak weeks.",
  "Empty return kilometres still inflate round-trip rates on many Indian full truckload (FTL) corridors. Backhaul is a sourcing problem, not only a rate card line.",
  "A hybrid freight strategy (example: about 70% contract / 30% spot) works when one system allocates indents and overflow is verified, not a WhatsApp scramble.",
] as const;

export const spotDedicatedExhibits = {
  "The freight procurement dilemma": [
    {
      kind: "table" as const,
      variant: "compare" as const,
      caption: "Dedicated contract fleet vs traditional spot market",
      source: "Evaluation frame for industrial FTL procurement in India. Not a ranked vendor score.",
      headers: ["Dimension", "Dedicated contract", "Traditional spot broker"],
      rows: [
        ["Placement", "Strong on baseline lanes when SLAs are real", "Flexible in theory; weak in festive and harvest peaks"],
        ["Rates", "Stable lane cards with diesel clauses", "Can fall in soft months; spike hard in shortages"],
        ["Tracking", "Hardwired GPS is usual on dedicated assets", "Often phone calls; no shared trip record"],
        ["Compliance", "KYC and RC discipline if you audit it", "Paper risk rises with unverified brokers"],
        ["Cost shape", "Fixed cost and minimum volume pressure", "Variable cost with emergency premiums"],
        ["Best fit", "Predictable daily and weekly volume", "True surplus, one-off lanes, soft-month buys"],
      ],
    },
    {
      kind: "bars" as const,
      caption: "Illustrative seasonal pressure on spot availability (not a rate index)",
      source:
        "Directional workshop shape for trunk corridors. Actual weeks move with harvest calendars, diesel, and local festivals. Plot your own indent fill rate by month before you freeze a split.",
      unit: "relative stress",
      items: [
        { label: "Soft monsoon / shutdown", value: 25 },
        { label: "Steady production months", value: 45 },
        { label: "Post-harvest move", value: 75 },
        { label: "Festive / year-end peak", value: 95 },
      ],
    },
  ],
  "Four risks of unbalanced sourcing": [
    {
      kind: "tiles" as const,
      caption: "Four risks when sourcing tilts too far either way",
      source: "Operational pattern on industrial corridors. Not a rupee loss model.",
      items: [
        {
          title: "Spot rate spikes",
          body: "Peak weeks push emergency premiums and late placement when you live only on brokers.",
        },
        {
          title: "Unverified capacity",
          body: "Fake RC, weak driver KYC, and cargo risk climb when spot is pure phone trees.",
        },
        {
          title: "Idle contract cost",
          body: "Minimum volume guarantees bite when production dips and you still owe the fleet.",
        },
        {
          title: "Empty return miles",
          body: "No backhaul means round-trip pricing on outbound legs that should have been single-leg.",
        },
      ],
    },
  ],
  "Dedicated contract fleets for industrial FTL": [
    {
      kind: "table" as const,
      variant: "compare" as const,
      caption: "What a useful dedicated contract usually contains",
      source: "Clause checklist for 1 to 3 year industrial FTL agreements. Your counsel still owns the final text.",
      headers: ["Clause", "Why it matters", "Weak version to reject"],
      rows: [
        ["Lane rate card", "Stops daily brokerage fights on baseline volume", "One all-India average with no diesel index"],
        ["Fuel indexation", "Keeps the card honest when diesel moves", "Silent renegotiation every quarter"],
        ["Volume quota", "Splits work across empaneled transporters", "One transporter owns 100% with no overflow rule"],
        ["Placement SLA", "Indent response and arrival windows you can measure", "Best effort language with no clock"],
        ["MVG", "Protects the transporter only if volume is real", "Annual promise far above last year's actuals"],
        ["Telematics and KYC", "Makes GPS and driver checks enforceable", "Optional if available"],
        ["Detention and demurrage", "Aligns plant windows with claims", "Open-ended claims with no gate timestamps"],
      ],
    },
    {
      kind: "tiles" as const,
      caption: "What dedicated fleets usually buy you on the ground",
      source: "Typical industrial FTL contracts. Your SLA text still wins.",
      items: [
        {
          title: "Placement on core lanes",
          body: "Indent fulfillment holds better when volume is predictable and penalties are enforced.",
        },
        {
          title: "Rate cards",
          body: "Lane rates with diesel escalation beat daily brokerage arguments on baseline volume.",
        },
        {
          title: "Telematics leverage",
          body: "Hardwired GPS is realistic when you control the asset relationship.",
        },
        {
          title: "The trade-off",
          body: "Fixed cost and MVG clauses punish soft months unless your contract split is honest.",
        },
      ],
    },
  ],
  "Spot freight and the Indian spot market": [
    {
      kind: "table" as const,
      variant: "compare" as const,
      caption: "Traditional spot broker vs verified digital marketplace",
      source: "Process comparison for overflow capacity. TranZfort listing and search are free; a broker fee applies on booked loads.",
      headers: ["Step", "Traditional spot broker", "Verified digital marketplace"],
      rows: [
        ["Indent", "Phone calls and WhatsApp groups", "Broadcast to a verified network"],
        ["Matching", "Broker phone tree", "Ranked or bid matching on live capacity"],
        ["KYC", "Manual paper at the gate", "RC and licence checks before load where the network requires it"],
        ["Rate", "Opaque cash negotiation", "Visible bids against the corridor"],
        ["Tracking handoff", "Driver phone number on a slip", "Trip record the dispatch screen can see"],
        ["Billing", "Scattered invoices", "GST path through the contracting party when the trip is booked that way"],
      ],
    },
    {
      kind: "tiles" as const,
      caption: "When spot is the right tool (and when it is not)",
      source: "Procurement rules of thumb. Peak weeks punish unverified spot hardest.",
      items: [
        {
          title: "Use verified spot for",
          body: "True surplus above contract quota, new trial lanes, soft-month rate capture, and return-leg cover.",
        },
        {
          title: "Do not use raw spot for",
          body: "Every daily indent, hazmat without permits, coil or ODC without securement standards, or customer SLAs you cannot miss.",
        },
        {
          title: "Gate still owns KYC",
          body: "A marketplace check does not replace a plant refusal when papers fail. Fail closed at the barrier.",
        },
        {
          title: "Cash advance discipline",
          body: "Unlogged advances on highway brokers are how disputes and leakage start. Put advances in the trip record.",
        },
      ],
    },
  ],
  "The backhaul equation": [
    {
      kind: "tiles" as const,
      caption: "Why empty returns show up in your outbound rate",
      source:
        "Illustrative shape only. Corridor rupee figures vary. Empty-run share on Indian trucking is often discussed in a wide band (sometimes around one-quarter to one-third of truck kilometres). Measure your lanes.",
      items: [
        {
          title: "Outbound full",
          body: "Plant A ships to Plant B. Fuel, toll, and driver cost already sit on that leg.",
        },
        {
          title: "Return empty",
          body: "If the trailer deadheads home, the operator prices that emptiness into your outbound rate.",
        },
        {
          title: "Return with a load",
          body: "A paying backhaul splits the round-trip cost across two shippers.",
        },
        {
          title: "What to ask",
          body: "Do you track empty kilometres by corridor, and can overflow tools offer return loads?",
        },
      ],
    },
    {
      kind: "table" as const,
      caption: "Illustrative outbound rate shape with and without return cover",
      source:
        "Workshop numbers only. Replace with your corridor cards. The premium for empty return is the point, not the exact rupees.",
      headers: ["Scenario", "What the operator is covering", "Illustrative outbound shape"],
      rows: [
        ["Single-leg with return booked", "Fuel and time on outbound; return paid by another shipper", "Lower outbound card (example talk: about ₹2,200 / tonne)"],
        ["Forced round-trip / empty return", "Outbound plus deadhead home", "Higher outbound card (example talk: about ₹3,600 / tonne)"],
        ["What to measure", "Empty km % by corridor and body type", "Fill rate of return offers within 24 hours of unload"],
      ],
    },
  ],
  "How to size a hybrid freight sourcing split": [
    {
      kind: "steps" as const,
      caption: "Size the split from indent data, not from a slide",
      source: "Ops method. Revisit quarterly when corridors or production mix change.",
      items: [
        {
          title: "Pull 12 months",
          body: "Indents by corridor, body type, and week. Mark filled by contract vs spot vs failed.",
        },
        {
          title: "Find the floor",
          body: "The volume that almost never dips is your contract floor, not last year's hopeful peak.",
        },
        {
          title: "Find the surge band",
          body: "Weeks above the floor are overflow candidates. Count how often you paid emergency premiums.",
        },
        {
          title: "Set an example split",
          body: "Many plants land near 70/30. Some sit 80/20. Seasonal plants may need more verified spot.",
        },
        {
          title: "Write the overflow rule",
          body: "Unfilled after N hours goes to verified marketplace or empaneled spot, not a random WhatsApp blast.",
        },
      ],
    },
  ],
  "Hybrid freight strategy: a 70/30 example": [
    {
      kind: "stacked" as const,
      caption: "Example hybrid split: about 70% contract / 30% spot",
      source:
        "Example framework for discussion, not a universal rule. High-volume fixed corridors may sit heavier on contract. Seasonal plants may need more verified spot. Your last 12 months of indent data should set the split.",
      items: [
        { label: "Dedicated contract", value: 70, color: zaftysVizSpot.navy },
        { label: "Verified spot / overflow", value: 30, color: zaftysVizSpot.teal },
      ],
    },
    {
      kind: "steps" as const,
      caption: "How a hybrid indent flow usually runs",
      source: "Ops pattern. One dispatch view beats three WhatsApp groups.",
      items: [
        { title: "Baseline", body: "Contract quotas take the predictable daily volume first." },
        { title: "Overflow clock", body: "If the indent is still open after the SLA window, it becomes overflow." },
        { title: "Verified spot", body: "Broadcast or bid on a network that can show RC and driver checks." },
        { title: "One screen", body: "Contract GPS and spot status live in the same trip record." },
        { title: "Settle", body: "e-POD and rate-card match close the bill without a paper chase." },
      ],
    },
  ],
  "Industry patterns that change the mix": [
    {
      kind: "tiles" as const,
      caption: "How verticals usually tilt the contract vs spot mix",
      source: "Pattern talk for workshops. Your plant data still wins.",
      items: [
        {
          title: "Steel and metals",
          body: "Heavy on dedicated flatbeds and multi-axle for core mill lanes. Spot for project surges and return cover from auto hubs.",
        },
        {
          title: "Cement and building materials",
          body: "Contract for grinding-unit routines. Spot for monsoon recovery weeks and dealer push campaigns.",
        },
        {
          title: "Chemicals and liquids",
          body: "Contract and audited tankers first. Spot only when permits, wash, and hazmat papers clear the gate.",
        },
        {
          title: "FMCG and auto parts",
          body: "More elastic spot share around festive and model launches. Contract still owns the daily milk-run spine.",
        },
      ],
    },
  ],
  "Contract vs spot vs freight marketplace": [
    {
      kind: "table" as const,
      caption: "Sourcing channel scorecard for industrial FTL",
      source: "Orientation for procurement workshops. Reliability bands are directional talk, not ZAFTYS audited SLAs.",
      headers: ["Parameter", "Dedicated contract", "Traditional spot", "Verified marketplace overflow"],
      rows: [
        ["Placement on peaks", "Strong if capacity was reserved", "Often weak", "Better when the network is deep"],
        ["Rate behaviour", "Stable card", "High volatility", "Bid against the corridor"],
        ["Driver / RC checks", "Auditable if you demand them", "Often paper-only", "Digital checks where enabled"],
        ["Tracking", "Hardwired GPS common", "Phone calls", "Mix of GPS, plaza events, and consent location"],
        ["Backhaul help", "Manual and limited", "Local and limited", "Stronger when return loads are listed"],
        ["POD and GST path", "Central if contracted well", "Fragmented", "Cleaner when one party invoices"],
        ["Best use", "Baseline and SLA-critical lanes", "True one-offs when you accept risk", "Overflow, soft months, return matching"],
      ],
    },
  ],
  "Settlement and working capital": [
    {
      kind: "tiles" as const,
      caption: "Why sourcing choice shows up in finance cycle time",
      source: "Working-capital pattern on industrial FTL. Not a bank guarantee.",
      items: [
        {
          title: "Paper LR drag",
          body: "Scattered spot invoices and missing stamps lock customer billing for weeks.",
        },
        {
          title: "Three-way match",
          body: "Rate card, net weight, and e-POD in one trail cut dispute loops.",
        },
        {
          title: "Detention proof",
          body: "Gate timestamps beat cabin arguments when demurrage claims arrive.",
        },
        {
          title: "One GST path",
          body: "Overflow booked through one contracting party is cleaner than ten broker bills.",
        },
      ],
    },
  ],
  "A 25-point freight sourcing checklist": [
    {
      kind: "donut" as const,
      caption: "How to weight the sourcing audit",
      source: "Weights for this guide: contract 25%, spot 25%, visibility 20%, backhaul 20%, settlement 10%.",
      slices: [
        { label: "Contract sourcing", value: 25, color: zaftysVizSpot.navy },
        { label: "Spot sourcing", value: 25, color: zaftysVizSpot.primary },
        { label: "Transit visibility", value: 20, color: zaftysVizSpot.primaryBright },
        { label: "Backhaul", value: 20, color: zaftysVizSpot.teal },
        { label: "Settlement", value: 10, color: zaftysVizSpot.warm },
      ],
    },
    {
      kind: "table" as const,
      variant: "scorecard" as const,
      caption: "25-point freight sourcing checklist (rate 1 to 5; skip = 0)",
      source: "Print for the procurement workshop. A skipped KYC line is not a phase two.",
      headers: ["#", "Group", "Ask in the room", "Score"],
      rows: [
        ["1", "Contract", "Lane rate cards with fuel indexation on core corridors", ""],
        ["2", "Contract", "Clear volume quotas across empaneled transporters", ""],
        ["3", "Contract", "Placement SLAs with measurable indent response times", ""],
        ["4", "Contract", "MVG clauses reviewed against real plant volume", ""],
        ["5", "Contract", "Quarterly scorecards on placement and claims", ""],
        ["6", "Spot", "Driver and RC checks before the truck enters the bay", ""],
        ["7", "Spot", "Fitness, permit, and insurance validity checked", ""],
        ["8", "Spot", "Digital bidding or structured quotes, not only cash calls", ""],
        ["9", "Spot", "Weekly corridor rate benchmarks for overflow buys", ""],
        ["10", "Spot", "Cash advances controlled and logged", ""],
        ["11", "Visibility", "Spot trips visible without a mandatory new app for every driver", ""],
        ["12", "Visibility", "Independent corridor proof (for example toll plaza events) where available", ""],
        ["13", "Visibility", "Contract GPS and spot status on one dispatch screen", ""],
        ["14", "Visibility", "Route deviation and stop alerts that someone actually acts on", ""],
        ["15", "Visibility", "e-Way Bill validity watched on long hauls", ""],
        ["16", "Backhaul", "Empty kilometres tracked by primary corridor", ""],
        ["17", "Backhaul", "Return loads offered from suppliers or sister plants", ""],
        ["18", "Backhaul", "Marketplace or network tools used for return matching", ""],
        ["19", "Backhaul", "Single-leg rates negotiated when return cover exists", ""],
        ["20", "Backhaul", "Body-type match rules so return offers are usable", ""],
        ["21", "Settlement", "Photo e-POD captured within hours of unload", ""],
        ["22", "Settlement", "Three-way match on rate, weight, and e-POD", ""],
        ["23", "Settlement", "Detention verified against gate timestamps", ""],
        ["24", "Settlement", "Consolidated GST path for overflow when booked that way", ""],
        ["25", "Settlement", "Customer invoice trigger tied to trusted e-POD, not a missing paper LR", ""],
      ],
    },
  ],
  "A six-week hybrid sourcing rollout": [
    {
      kind: "timeline" as const,
      caption: "Move from WhatsApp spot to a hybrid split without freezing the plant",
      source: "Field rollout pattern. Expand only after one corridor proves the split.",
      items: [
        {
          phase: "Weeks 1 to 2",
          title: "Baseline and split",
          body: "Map corridor volumes and failed indents. Set an example contract/spot split. Connect indent masters and empaneled quotas.",
        },
        {
          phase: "Weeks 3 to 4",
          title: "Overflow pilot",
          body: "Route unfilled indents to verified spot or marketplace bids. Train dispatch and gate on KYC refusal. Run one festive-style drill if you can.",
        },
        {
          phase: "Weeks 5 to 6",
          title: "Scale and backhaul",
          body: "Add plants only when empty-km and placement reports are trusted. Open return matching. Hand finance the three-way match trail.",
        },
      ],
    },
  ],
  "What good hybrid programs tend to show": [
    {
      kind: "ranges" as const,
      caption: "Directional procurement bands, not a contract SLA",
      source:
        "Planning ranges from industrial FTL programs and corridor work, including ZAFTYS fleet and marketplace experience. Measure your last 12 months before anyone writes a savings guarantee.",
      items: [
        {
          label: "Freight cost on hybrid corridors",
          detail: "When backhaul cover and competitive overflow bids are real, not theatre.",
          low: 8,
          high: 14,
          suffix: "% lower",
        },
        {
          label: "Peak placement pain",
          detail: "Toward fewer stranded loads when overflow sits on a verified network instead of one broker phone.",
        },
        {
          label: "Invoice cycle after e-POD",
          detail: "From multi-week paper LR cycles toward a few days when finance trusts the digital trail.",
        },
        {
          label: "Emergency premium frequency",
          detail: "Fewer panic buys when overflow is pre-wired and contract floors are honest.",
        },
      ],
    },
  ],
} as const;
