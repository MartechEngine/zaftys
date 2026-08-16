/** Exhibits for India axle load / GVW heavy-freight guide */

export const zaftysVizAxle = {
  navy: "#0B1C36",
  primary: "#1E4D8C",
  primaryBright: "#3D7CC9",
  teal: "#0D9488",
  warm: "#D97706",
} as const;

export const axleGvwTakeaways = [
  "Total gross vehicle weight (GVW) can look legal while one axle group is already over the MoRTH axle load limit. Distribution matters as much as net weight.",
  "Section 194 overloading fines in India start at a base penalty plus a per-tonne add-on, with mandatory offloading before the truck moves again. Confirm the current Act before a board pack.",
  "Axle load compliance is won at the plant weighbridge: RC-backed GVW, IP capture, and a gate that can refuse a non-compliant load.",
  "Treat published axle load norms and GVW bands as starting points. The registration certificate and the latest gazette win.",
] as const;

export const axleGvwExhibits = {
  "Why total weight is not enough": [
    {
      kind: "tiles" as const,
      caption: "The heavy-freight paradox",
      source: "Illustrative plant example. Your trailer layout and coil placement will differ.",
      items: [
        {
          title: "Total GVW looks fine",
          body: "A multi-axle trailer can sit under the overall MoRTH GVW while the load still fails on one axle group.",
        },
        {
          title: "One axle group fails",
          body: "Two coils parked over a rear tandem can overload that group even when net payload looks comfortable.",
        },
        {
          title: "Highway weigh catches it",
          body: "Checking posts weigh axle groups, not only the full truck. Impoundment and roadside re-handling follow.",
        },
        {
          title: "Plant time doubles",
          body: "Rejected trucks return to re-weigh and re-load. Gate TAT and e-Way Bill clocks both suffer.",
        },
      ],
    },
  ],
  "Four costs of getting axle load wrong": [
    {
      kind: "tiles" as const,
      caption: "Four ripple effects of axle non-compliance",
      source: "Operational pattern from industrial corridors. Not a rupee loss model.",
      items: [
        {
          title: "Highway impoundment",
          body: "Fines and locked transit. Shipper and transporter both feel the delay.",
        },
        {
          title: "Roadside offloading",
          body: "Mobile cranes on a shoulder damage coils and create safety risk.",
        },
        {
          title: "Gate bottlenecks",
          body: "Non-compliant trucks bounce back into the queue and burn plant TAT.",
        },
        {
          title: "e-Way Bill flags",
          body: "Net weight vs declared weight variances invite GST audit noise and invoice holds.",
        },
      ],
    },
  ],
  "Axle group limits under MoRTH framing": [
    {
      kind: "bars" as const,
      caption: "Typical MoRTH axle-group limits used in plant talk",
      source:
        "Starting points from MoRTH revised axle-load framing (S.O. 3467(E) / S.O. 4353(E) era). Confirm the gazette and the vehicle RC before you hard-code anything.",
      unit: "t",
      items: [
        { label: "Single axle, 2 tyres (steer)", value: 7.5 },
        { label: "Single axle, 4 tyres", value: 11.5 },
        { label: "Tandem axle, 8 tyres", value: 21 },
        { label: "Tridem axle, 12 tyres", value: 27 },
      ],
    },
  ],
  "Rigid truck GVW bands": [
    {
      kind: "bars" as const,
      caption: "Typical rigid truck GVW bands",
      source:
        "Plant conversation bands. Manufacturer rating or schedule limit, whichever is less. RC wins.",
      unit: "t",
      items: [
        { label: "2-axle rigid (6 wheels)", value: 18.5 },
        { label: "3-axle rigid (10 wheels)", value: 28 },
        { label: "4-axle rigid (12 wheels)", value: 35 },
        { label: "5-axle rigid", value: 42 },
      ],
    },
  ],
  "Tractor-trailer GVW bands": [
    {
      kind: "table" as const,
      caption: "Common tractor-trailer GVW bands for industrial FTL",
      source:
        "Orientation only. Modular / ODC moves need MoRTH permit rules and route clearances, not a generic GVW row.",
      headers: ["Configuration", "Typical layout", "GVW band (talk)"],
      rows: [
        ["3-axle tractor + 2-axle semi", "5 axles / ~18 tyres", "About 45.5 t"],
        ["3-axle tractor + 3-axle semi", "6 axles / ~22 tyres", "About 55 t"],
        ["Modular hydraulic / ODC", "Multi-axle puller assemblies", "Special MoRTH permit rules"],
      ],
    },
  ],
  "What Section 194 typically costs": [
    {
      kind: "tiles" as const,
      caption: "Overloading enforcement under Section 194 framing",
      source:
        "Motor Vehicles (Amendment) Act framing as commonly cited in ops rooms. Verify the current Act and state practice before a legal memo.",
      items: [
        {
          title: "Base fine",
          body: "About ₹20,000 when an overloaded commercial vehicle is detected.",
        },
        {
          title: "Per excess tonne",
          body: "About ₹2,000 for each tonne above the permissible limit.",
        },
        {
          title: "Mandatory offload",
          body: "The truck does not move until excess cargo is offloaded and re-weighed. Handling cost sits with the parties on the trip.",
        },
        {
          title: "Repeat offences",
          body: "Repeated overloading can trigger longer licence consequences for the driver. Do not treat the first fine as the only cost.",
        },
      ],
    },
  ],
  "Industry-specific weight traps": [
    {
      kind: "tiles" as const,
      caption: "Where each vertical usually fails axle compliance",
      source: "Ops pattern across steel, cement, mining, and liquid bulk. Not a ranked risk model.",
      items: [
        {
          title: "Steel coils",
          body: "Point loads. A coil a metre forward or aft overloads steer or tandem groups.",
        },
        {
          title: "Cement and fly ash",
          body: "Density changes. Full volume is not the same as legal GVW.",
        },
        {
          title: "Ore and minerals",
          body: "Moisture swings at the pithead. Monsoon tonnes are not summer tonnes.",
        },
        {
          title: "Chemical tankers",
          body: "Ullage and sloshing. Under-filled compartments move weight while rolling.",
        },
      ],
    },
  ],
  "Pre-dispatch weighbridge loop": [
    {
      kind: "steps" as const,
      caption: "Six stamps before the barrier opens",
      source: "Plant control loop. A highway map cannot replace these checks.",
      items: [
        { title: "Gate", body: "Confirm identity and RC-backed axle / GVW master data before entry." },
        { title: "Tare", body: "Empty weight from the indicator over IP or serial. No typed numbers." },
        { title: "Bay limit", body: "Show the loader a max payload from GVW minus tare." },
        { title: "Gross", body: "Capture loaded weight. Check GVW and distribution rules." },
        { title: "Docs", body: "Compare net to e-Way Bill tolerance before LR print." },
        { title: "Exit", body: "Open the gate only when weight and papers clear. Fail closed." },
      ],
    },
  ],
  "Manual vs GPS vs industrial control": [
    {
      kind: "table" as const,
      variant: "compare" as const,
      caption: "Paper slips vs industrial plant control",
      source: "Evaluation frame for plant compliance. Not a ranked vendor score. A GPS map alone does not cover these rows.",
      headers: ["Capability", "Paper / Excel", "Industrial plant control"],
      rows: [
        ["Axle and GVW rules", "Operator memory and a laminated chart", "RC-backed limits in the dispatch system"],
        ["Weighbridge capture", "Typed slips", "IP or serial from the indicator"],
        ["Override risk", "High. A clerk can clear a bad load", "Blocked. Fail the gate pass"],
        ["e-Way Bill check", "Manual after the fact", "Net vs declared before exit"],
        ["Point-load templates", "Tribal knowledge at the bay", "Cradle / well instructions on the slip"],
      ],
    },
  ],
  "A 20-point axle compliance checklist": [
    {
      kind: "donut" as const,
      caption: "How to weight the compliance audit",
      source: "Weights for this guide: gate and masters 25%, weighbridge 25%, bay distribution 25%, documents 15%, transporter governance 10%.",
      slices: [
        { label: "Gate and masters", value: 25, color: zaftysVizAxle.navy },
        { label: "Weighbridge", value: 25, color: zaftysVizAxle.primary },
        { label: "Bay distribution", value: 25, color: zaftysVizAxle.primaryBright },
        { label: "Documents", value: 15, color: zaftysVizAxle.teal },
        { label: "Transporter governance", value: 10, color: zaftysVizAxle.warm },
      ],
    },
    {
      kind: "table" as const,
      variant: "scorecard" as const,
      caption: "20-point axle and GVW compliance checklist (rate 1 to 5; skip = 0)",
      source: "Print for the plant walk. A skipped weighbridge lock is not a phase two.",
      headers: ["#", "Group", "Ask in the room", "Score"],
      rows: [
        ["1", "Gate", "Auto-fetch RC, axle count, and registered GVW at gate", ""],
        ["2", "Gate", "MoRTH / RC limits live in dispatch, not only a chart on the wall", ""],
        ["3", "Gate", "Flag modified or non-standard chassis before loading", ""],
        ["4", "Gate", "Driver licence and fitness checks before barrier open", ""],
        ["5", "Gate", "Identity confirm (FASTag or plate) matches the trip master", ""],
        ["6", "Weighbridge", "Weighbridge via IP or serial, not typed Excel", ""],
        ["7", "Weighbridge", "Manual weight override disabled for gate-pass print", ""],
        ["8", "Weighbridge", "Tare captured before any loading slip issues", ""],
        ["9", "Weighbridge", "Calibration certificates on file and in date", ""],
        ["10", "Weighbridge", "Gate pass blocked when gross exceeds registered GVW", ""],
        ["11", "Bay", "Coil cradles / wells mandated where the load needs them", ""],
        ["12", "Bay", "Bay gets a max payload slip from GVW minus tare", ""],
        ["13", "Bay", "Density or ullage rules for bulkers and tankers", ""],
        ["14", "Bay", "Crews trained on axle distribution templates", ""],
        ["15", "Bay", "Suspension and axle integrity checked before load", ""],
        ["16", "Docs", "Net weight vs e-Way Bill tolerance before exit", ""],
        ["17", "Docs", "Digital LR only after weight approval", ""],
        ["18", "Docs", "ODC permits verified before modular / special trailers leave", ""],
        ["19", "Governance", "Audit trail of rejected overloaded trucks", ""],
        ["20", "Governance", "Compliance history in monthly transporter quotas", ""],
      ],
    },
  ],
  "A six-week compliance rollout": [
    {
      kind: "timeline" as const,
      caption: "Keep the plant running while you lock the weighbridge",
      source: "Field rollout pattern. Paper wins if security and bay crews reject the screens.",
      items: [
        {
          phase: "Weeks 1 to 2",
          title: "Hardware and rules",
          body: "Bridge indicators, RC/GVW masters, e-Way Bill tolerance, transporter notice.",
        },
        {
          phase: "Weeks 3 to 4",
          title: "One plant",
          body: "Tare and gross capture, bay payload slips, fail-closed gate on overload.",
        },
        {
          phase: "Weeks 5 to 6",
          title: "Expand",
          body: "Other sites only after the pilot stops typing weights. Finance can match slips to invoices.",
        },
      ],
    },
  ],
  "What good plants tend to show": [
    {
      kind: "ranges" as const,
      caption: "Directional compliance bands, not a contract SLA",
      source:
        "Planning ranges from industrial weighbridge and coil-dispatch work, including ZAFTYS corridor experience. Measure your last 90 days before anyone writes a penalty clause.",
      items: [
        {
          label: "Weighbridge processing time",
          detail: "When slips stop being typed and IP capture is mandatory.",
          low: 40,
          high: 60,
          suffix: "% shorter",
        },
        {
          label: "e-Way Bill weight discrepancy noise",
          detail: "When net vs declared is checked before gate-out.",
          low: 70,
          high: 95,
          suffix: "% lower",
        },
        {
          label: "Roadside offload events",
          detail: "Toward rare when overloaded trucks cannot leave the plant. Not a promise of zero forever.",
        },
      ],
    },
  ],
} as const;
