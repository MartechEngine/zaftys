/** ZAFTYS print tokens (reports agent) */
export const zaftysViz = {
  navy: "#0B1C36",
  primary: "#1E4D8C",
  primaryBright: "#3D7CC9",
  teal: "#0D9488",
  warm: "#D97706",
  panel: "#F8FAFC",
} as const;

export const tmsEvalTakeaways = [
  "Score the TMS demo at the gate, weighbridge, and GST portal. A busy map is not a transport management system.",
  "Western parcel and LTL platforms often fail Indian manufacturing yards for structural reasons, not 'change resistance.'",
  "Road still carries on the order of 70 percent of domestic goods movement in India (NITI Aayog / RMI). Much of that work still runs on calls, WhatsApp, and Excel.",
  "Test tri-hybrid tracking, five yard stamps, payload lock, hybrid fleet, and e-POD in one operational view when you evaluate a TMS.",
] as const;

export const tmsEvalExhibits = {
  "Executive takeaways": [
    {
      kind: "donut",
      caption: "Domestic goods movement: road still dominates",
      source:
        "Order of magnitude. Source: NITI Aayog and RMI, Fast Tracking Freight in India (June 2021). Not a ZAFTYS operating KPI. Other modes are grouped; read the original before a board pack.",
      slices: [
        { label: "Road", value: 70, color: zaftysViz.navy },
        { label: "Other modes (rail, water, air)", value: 30, color: zaftysViz.primaryBright },
      ],
    },
  ],
  "What informal coordination actually costs": [
    {
      kind: "tiles",
      caption: "Four process holes a TMS either closes or ignores",
      source: "Operational pattern from the article. Not a rupee loss model.",
      items: [
        {
          title: "Uncontrolled detention",
          body: "Unannounced arrivals fill peak bays and leave nights idle. You pay hours that never loaded a truck.",
        },
        {
          title: "Spot visibility blackout",
          body: "Overflow broker trucks rarely carry the GPS box in the IT RFP. If the TMS cannot see them, the tower is a dedicated-fleet toy.",
        },
        {
          title: "Paper POD lock-up",
          body: "Physical LRs on a monthly mail cycle. One missing stamp can halt invoicing for 45 to 60 days.",
        },
        {
          title: "e-Way Bill expiry",
          body: "Checking posts impound cargo when validity lapses. A pretty North American lane board will not extend the GST window.",
        },
      ],
    },
  ],
  "Why generic global TMS products fail at Indian plants": [
    {
      kind: "table",
      variant: "compare",
      caption: "One-slide comparison for the shortlist",
      source: "Evaluation frame for Indian industrial FTL. Not a ranked vendor score.",
      headers: ["Test", "Generic Western TMS", "India-specific industrial TMS"],
      rows: [
        ["Cargo mix", "Parcel, rail, LTL, intermodal containers", "Heavy FTL, multi-axle trailers, spot brokers"],
        ["Tracking assumption", "Nearly 100 percent installed GPS", "GPS plus FASTag plus driver SIM consent"],
        ["Plant model", "One geofence pin", "Gate, weighbridge, bay, e-POD as stages"],
        ["Regulatory hooks", "International duty modules; India as phase-two APIs", "Native e-Way Bill, FASTag, GST LR"],
        ["Time to a live plant", "9 to 12 month implementations", "Pilot in weeks with clerks in the room"],
      ],
    },
  ],
  "Pillar 1: Tri-hybrid tracking (GPS, FASTag, SIM)": [
    {
      kind: "steps",
      caption: "Three streams, one dispatch screen",
      source:
        "Framework for who owns the truck. Not a measured mix of trips. Do not treat the three nodes as 33 percent shares.",
      items: [
        {
          title: "Hardwired GPS",
          body: "Company-owned and long-term dedicated fleets. 30-second pings, fuel, route compliance.",
        },
        {
          title: "FASTag plazas",
          body: "Immutable corridor checkpoints the driver cannot switch off. Ask for NPCI or IHMCL feeds.",
        },
        {
          title: "SIM consent",
          body: "Spot trucks in a demand spike. SMS or WhatsApp consent, then cellular location. No extra box.",
        },
        {
          title: "One dashboard",
          body: "Dispatch does not flip between three apps. Split screens are how trucks disappear.",
        },
      ],
    },
  ],
  "Pillar 2: Yard stages and plant TAT": [
    {
      kind: "steps",
      caption: "Five timestamps, not a single 'vehicle on site' flag",
      source: "Plant TAT stages used in the demo scorecard. A highway map cannot split these delays.",
      items: [
        { title: "Gate", body: "FASTag or QR check-in before the barrier. Identity, RC, e-Way Bill." },
        { title: "Tare", body: "Empty weight from the indicator over serial or IP. No typed numbers." },
        { title: "Bay", body: "Queue rule to a door or silo. Not whoever shouts loudest." },
        { title: "Gross", body: "Loaded weight vs PO tolerance and GVW." },
        { title: "Exit", body: "Digital LR and gate pass only after weight and papers clear." },
      ],
    },
  ],
  "Pillar 3: Multi-axle payload and weighbridge lock": [
    {
      kind: "bars",
      caption: "Typical GVW bands used in plant conversations",
      source:
        "Starting points for demo talk, not eternal law. Confirm MoRTH gazette against the vehicle RC. Multi-axle trailers are often discussed up to about 55 tonnes depending on axle spacing.",
      unit: "t",
      items: [
        { label: "2-axle 6-wheeler", value: 18.5 },
        { label: "3-axle 10-wheeler", value: 28 },
        { label: "4-axle 12-wheeler", value: 35 },
        { label: "5-axle 14-wheeler", value: 42 },
        { label: "Multi-axle trailer (18W+)", value: 55 },
      ],
    },
  ],
  "Pillar 4: Hybrid fleet and backhaul": [
    {
      kind: "stacked",
      caption: "Example contract indent split (not market share)",
      source:
        "Example from this guide: transporter A 50%, B 30%, C 20%. Your quotas will differ. A TMS that only knows our trucks dumps overflow back onto WhatsApp.",
      items: [
        { label: "Transporter A", value: 50, color: zaftysViz.navy },
        { label: "Transporter B", value: 30, color: zaftysViz.primaryBright },
        { label: "Transporter C", value: 20, color: zaftysViz.teal },
      ],
    },
  ],
  "Pillar 5: e-POD, freight audit, and ERP": [
    {
      kind: "table",
      variant: "compare",
      caption: "Paper POD versus digital e-POD",
      source: "The software cannot invent a faster treasury policy. It can remove the excuse that the LR is still in transit.",
      headers: ["Step", "Traditional paper", "Digital e-POD"],
      rows: [
        ["Proof", "Physical LR, monthly mail to head office", "Photo of signed, stamped LR via app or WhatsApp"],
        ["Check", "Stamp hunting weeks later", "Geofence and FASTag exit timestamp before it is treated as clean"],
        ["Audit", "Manual match in a spreadsheet", "Three-way match: rate card, net weight, approved detention"],
        ["Cash", "Invoice held 45 to 60 days", "A handful of days if finance agrees to trust the file"],
      ],
    },
  ],
  "A 25-point demo checklist": [
    {
      kind: "donut",
      caption: "How to weight the demo scorecard",
      source: "Weights from this guide: tracking 25%, yard 25%, sourcing 20%, finance 20%, vendor 10%.",
      slices: [
        { label: "Tracking", value: 25, color: zaftysViz.navy },
        { label: "In-plant yard", value: 25, color: zaftysViz.primary },
        { label: "Fleet sourcing", value: 20, color: zaftysViz.primaryBright },
        { label: "Finance and ERP", value: 20, color: zaftysViz.teal },
        { label: "Vendor capability", value: 10, color: zaftysViz.warm },
      ],
    },
    {
      kind: "table",
      variant: "scorecard",
      caption: "25-point demo checklist (rate each line 1 to 5; skip = 0)",
      source: "Print this for the projector. A skipped weighbridge is not a 'phase two.'",
      headers: ["#", "Group", "Ask in the room", "Score"],
      rows: [
        ["1", "Tracking", "Hardwired GPS for dedicated fleet", ""],
        ["2", "Tracking", "Direct NPCI or IHMCL FASTag feeds", ""],
        ["3", "Tracking", "Consent-based SIM for spot vehicles", ""],
        ["4", "Tracking", "Dynamic e-Way Bill alerts before validity expires", ""],
        ["5", "Tracking", "Route deviation and unauthorised stop detection", ""],
        ["6", "Yard", "Five TAT milestones (gate, weigh, bay, weigh, exit)", ""],
        ["7", "Yard", "Weighbridge via IP or serial", ""],
        ["8", "Yard", "Gate-pass block if loaded weight exceeds registered GVW", ""],
        ["9", "Yard", "Timed loading slots to stop highway queues", ""],
        ["10", "Yard", "Gate dashboards that work on a basic tablet", ""],
        ["11", "Sourcing", "Contract indent split by quota", ""],
        ["12", "Sourcing", "Digital spot auction for overflow", ""],
        ["13", "Sourcing", "Marketplace backhaul such as TranZfort", ""],
        ["14", "Sourcing", "Multi-axle trailer configurations and axle rules", ""],
        ["15", "Sourcing", "Driver interface in the languages you actually run", ""],
        ["16", "Finance", "Photo e-POD with geofence and toll timestamp", ""],
        ["17", "Finance", "GST-compliant digital LR at gate exit", ""],
        ["18", "Finance", "Three-way invoice audit (rate, net weight, detention)", ""],
        ["19", "Finance", "Pre-built SAP, Oracle, or Tally connectors", ""],
        ["20", "Finance", "Detention by your hourly delay rules", ""],
        ["21", "Vendor", "Pilot go-live in under four weeks without stopping the plant", ""],
        ["22", "Vendor", "Trip or tonne pricing finance can explain, not only seats", ""],
        ["23", "Vendor", "On-site training for clerks, security, and local transporters", ""],
        ["24", "Vendor", "Offline or low-bandwidth behaviour", ""],
        ["25", "Vendor", "Proof they run freight operations in India", ""],
      ],
    },
  ],
  "A six-week rollout that security will not reject": [
    {
      kind: "timeline",
      caption: "Keep the plant running. Do not cut over every site on a Monday.",
      source: "Field-risk rollout from this guide. The paper register wins if security, weighbridge, and transporters reject the screens.",
      items: [
        {
          phase: "Weeks 1 to 2",
          title: "Setup",
          body: "ERP APIs, rate cards, body specs, detention rules, weighbridge bridge. No big-bang go-live.",
        },
        {
          phase: "Weeks 3 to 4",
          title: "One plant",
          body: "Train security and weighbridge. Brief brokers on SIM consent and WhatsApp e-POD.",
        },
        {
          phase: "Weeks 5 to 6",
          title: "Expand",
          body: "Other sites only after the register is no longer the real system. Turn on three-way audit.",
        },
      ],
    },
  ],
  "What good operations tend to show": [
    {
      kind: "ranges",
      caption: "Directional plant bands, not a contract SLA",
      source:
        "Planning ranges from industrial gate-to-exit work, steel coil moves, and cement dispatch, including ZAFTYS corridor experience. Measure your last 90 days before anyone writes a penalty clause.",
      items: [
        {
          label: "In-plant vehicle TAT",
          detail: "Shorter when stages are timestamped and loading slots exist.",
          low: 30,
          high: 45,
          suffix: "% shorter",
        },
        {
          label: "Unbudgeted detention claims",
          detail: "When windows are real and early arrivals can be refused or reslotted.",
          low: 50,
          high: 70,
          suffix: "% lower",
        },
        {
          label: "e-POD to customer invoice",
          detail: "From a 45-day paper cycle toward a few days when photos, location checks, and finance trust are in place.",
        },
      ],
    },
  ],
} as const;
