/** Exhibits for ePOD / FASTag / e-Way Bill freight billing guide */

export const zaftysVizBilling = {
  navy: "#0B1C36",
  primary: "#1E4D8C",
  primaryBright: "#3D7CC9",
  teal: "#0D9488",
  warm: "#D97706",
} as const;

export const epodBillingTakeaways = [
  "Electronic proof of delivery (ePOD) and digital LRs beat courier paper when finance trusts photo, time, and location evidence.",
  "GST e-Way Bill expiry is a compliance and cash risk. Alerts and extension discipline beat portal panic at the checking post.",
  "FASTag plaza events help as independent corridor proof where available. They do not replace ePOD or customer acceptance.",
  "Three-way freight invoice matching on rate card, weighbridge net weight, and ePOD / detention stamps cuts disputes without slowing clean bills.",
] as const;

export const epodBillingExhibits = {
  "Where freight billing delays trap working capital": [
    {
      kind: "bars" as const,
      caption: "Illustrative freight billing cycle pressure (not your DSO)",
      source:
        "Workshop shape for industrial FTL when POD is paper. Plot your own invoice-to-cash days by lane before you freeze a target.",
      unit: "relative delay",
      items: [
        { label: "Unload day", value: 10 },
        { label: "Paper in transit", value: 55 },
        { label: "AP dispute loop", value: 85 },
        { label: "Clean digital ePOD path", value: 20 },
      ],
    },
    {
      kind: "steps" as const,
      caption: "Paper freight billing path that stretches DSO",
      source: "Common industrial FTL pattern. Your courier and customer AP rules will differ.",
      items: [
        { title: "Unload", body: "Cargo lands. Receiver stamps a physical LR." },
        { title: "Dashboard folder", body: "Driver carries the paper until a transport office collects it." },
        { title: "Courier lag", body: "Days or weeks before accounts sees a clean POD." },
        { title: "Dispute loop", body: "Smudged stamp, missing page, or detention fight freezes the bill." },
        { title: "Late cash", body: "Customer invoicing and transporter payment both wait on the paper." },
      ],
    },
    {
      kind: "tiles" as const,
      caption: "Four finance and compliance failure points",
      source: "Operational pattern on industrial corridors. Not a rupee loss model.",
      items: [
        {
          title: "Paper POD delays",
          body: "Lost or late LRs lock customer invoicing and stretch days sales outstanding.",
        },
        {
          title: "e-Way Bill risk",
          body: "Expired bills at checking posts trigger GST penalty exposure under Section 129 framing.",
        },
        {
          title: "Unverified detention",
          body: "Paper waiting slips without gate timestamps become weeks of AP argument.",
        },
        {
          title: "Rate and weight drift",
          body: "Manual Excel match of rate card, weigh slip, and e-Way Bill invites overpay and disputes.",
        },
      ],
    },
  ],
  "How to baseline billing before you buy software": [
    {
      kind: "steps" as const,
      caption: "Two-week freight billing baseline",
      source: "Finance ops method. Software amplifies a measured cycle. It does not invent one.",
      items: [
        {
          title: "Pick one corridor",
          body: "Highest invoice volume or highest dispute rate, not the quietest lane.",
        },
        {
          title: "Stamp the cash path",
          body: "Unload date, POD received date, invoice posted date, payment released date.",
        },
        {
          title: "Tag the hold",
          body: "Missing POD, e-Way Bill fight, detention dispute, rate mismatch, or ERP rekey.",
        },
        {
          title: "Count exception types",
          body: "Which hold owned the most rupee-days. That becomes your pilot priority.",
        },
        {
          title: "Only then set targets",
          body: "Publish cycle goals from your median and 90th percentile, not from a vendor slide.",
        },
      ],
    },
  ],
  "e-Way Bill rules finance must respect": [
    {
      kind: "table" as const,
      caption: "e-Way Bill validity and extension talk frame (confirm current CBIC rules)",
      source:
        "Orientation from commonly cited GST e-Way Bill distance and extension practice. Confirm the current CBIC / portal rules before a legal memo. Not legal advice.",
      headers: ["Parameter", "Commonly cited rule", "What ops must do"],
      rows: [
        [
          "General cargo validity",
          "Often discussed as about 1 day per 200 km (or part thereof)",
          "Watch remaining distance and clock on long hauls",
        ],
        [
          "ODC validity",
          "Often discussed as about 1 day per 20 km (or part thereof)",
          "Do not force ODC into a general-cargo clock",
        ],
        [
          "Extension window",
          "Often discussed as 8 hours before to 8 hours after expiry",
          "Alert early; extend inside the window",
        ],
        [
          "Expired bill at check",
          "Section 129 CGST framing; heavy tax penalty exposure",
          "Prevent expiry; do not invent a roadside fix",
        ],
        [
          "Weight vs declaration",
          "Portal and audit noise when net vs declared diverge",
          "Match weighbridge net to e-Way Bill before gate-out",
        ],
      ],
    },
  ],
  "e-Way Bill alerts that dispatch will actually use": [
    {
      kind: "tiles" as const,
      caption: "Alert design that avoids portal panic and alert fatigue",
      source: "Ops pattern. Early noise that nobody trusts is as bad as a silent expiry.",
      items: [
        {
          title: "Watch distance and clock",
          body: "Combine remaining validity with corridor progress, not a calendar popup alone.",
        },
        {
          title: "Alert early enough to act",
          body: "A six-hour heads-up beats an SMS after the checking post already stopped the truck.",
        },
        {
          title: "One owner",
          body: "Named dispatcher or shift lead owns extension. Shared inboxes miss the window.",
        },
        {
          title: "Evidence pack",
          body: "Location, reason, and prior extensions sit with the trip so audit is not a memory test.",
        },
      ],
    },
  ],
  "What a trusted ePOD pack contains": [
    {
      kind: "table" as const,
      variant: "compare" as const,
      caption: "Weak photo upload vs finance-ready ePOD pack",
      source: "AP acceptance pattern. Customer contract language still wins.",
      headers: ["Element", "Weak version", "Trusted version"],
      rows: [
        ["Image", "Blurry cabin selfie of any paper", "Readable stamped LR or signed delivery sheet"],
        ["Time", "Phone clock the driver can change", "Server timestamp at upload"],
        ["Location", "None", "Destination geofence or equivalent check"],
        ["Corridor support", "None", "Plaza or other independent ping where available"],
        ["Trip link", "WhatsApp image with no trip ID", "Bound to indent, LR number, and customer PO"],
        ["Access", "Only the driver has the photo", "Customer and AP can retrieve without courier"],
      ],
    },
  ],
  "ePOD, FASTag, and e-Way Bill for freight billing": [
    {
      kind: "tiles" as const,
      caption: "ePOD, corridor proof, and e-Way Bill discipline",
      source:
        "Capability frame for finance workshops. Ask which feeds are live in the demo. Treat any claim that one sensor covers every Indian trip as a demo question.",
      items: [
        {
          title: "Digital ePOD",
          body: "Photo of stamped LR or signed delivery with time and location. Invoicing can start the same day when finance trusts the trail.",
        },
        {
          title: "Corridor proof",
          body: "Where available, toll plaza events or other independent pings support that the truck was on the corridor near delivery.",
        },
        {
          title: "e-Way Bill sync",
          body: "Validity watched against transit progress. Alerts and extension workflows beat last-minute portal logins.",
        },
        {
          title: "Into three-way match",
          body: "Clean ePOD and stamps feed rate, weight, and detention checks before ERP payment.",
        },
      ],
    },
  ],
  "Three-way freight invoice matching": [
    {
      kind: "table" as const,
      variant: "compare" as const,
      caption: "Three-way freight invoice match",
      source: "Finance ops pattern. Tolerances are plant policy, not a universal GST percentage.",
      headers: ["Leg", "Data source", "What match proves"],
      rows: [
        ["Rate", "Contract lane card with fuel indexation", "Billed rate sits on the agreed card for the dispatch date"],
        ["Weight", "Plant weighbridge net (IP or serial preferred)", "Billed tonnes match captured net within tolerance"],
        ["Delivery / detention", "ePOD plus gate or free-time stamps", "Delivery happened; waiting claims follow free-time rules"],
        ["Outcome if clean", "Auto-approve path into ERP AP", "Payment moves without a paper chase"],
        ["Outcome if dirty", "Exception queue with evidence pack", "Overpay and fake detention get blocked early"],
      ],
    },
  ],
  "Exception queues AP can clear in hours": [
    {
      kind: "tiles" as const,
      caption: "How dirty bills should fail without freezing clean ones",
      source: "AP design pattern. Auto-approve is useless if exceptions also sit in a black hole.",
      items: [
        {
          title: "Reason codes",
          body: "Rate, weight, POD missing, detention, duplicate, IRN. Not a generic hold.",
        },
        {
          title: "Evidence attached",
          body: "Rate card line, weigh ticket, ePOD, gate stamps travel with the exception.",
        },
        {
          title: "Owner and SLA",
          body: "Named AP or logistics billing owner with a clear clear-by time.",
        },
        {
          title: "Clean path stays open",
          body: "Matched bills keep posting while exceptions queue separately.",
        },
      ],
    },
  ],
  "GST e-invoice and IRN hygiene": [
    {
      kind: "tiles" as const,
      caption: "What finance should check on transporter tax documents",
      source: "B2B GST practice orientation. Confirm current e-invoicing thresholds and IRN rules for your parties.",
      items: [
        {
          title: "IRN present where required",
          body: "B2B transporter invoices that need IRN without one create ITC and audit noise.",
        },
        {
          title: "QR and party match",
          body: "Buyer, seller, and trip parties should match the commercial trip, not a recycled PDF.",
        },
        {
          title: "Weight and value align",
          body: "Invoice quantity should not fight the weighbridge net and e-Way Bill declaration.",
        },
        {
          title: "Store the trail",
          body: "Keep IRN and document images on the trip record for later GST questions.",
        },
      ],
    },
  ],
  "Industry patterns that change the billing pack": [
    {
      kind: "tiles" as const,
      caption: "How verticals usually stress ePOD and e-Way Bill",
      source: "Pattern talk for finance workshops. Your customer AP rules still win.",
      items: [
        {
          title: "Steel and metals",
          body: "Coil and plate claims need readable securement and weight evidence with the POD pack.",
        },
        {
          title: "Cement and bulk",
          body: "Weighbridge net vs e-Way Bill fights are common. Detention at plant windows feeds AP disputes.",
        },
        {
          title: "Chemicals and liquids",
          body: "Seal numbers, wash certificates, and bay segregation notes often sit beside the ePOD.",
        },
        {
          title: "FMCG and auto parts",
          body: "High invoice volume. Missing POD photos and duplicate bills hurt DSO fastest.",
        },
      ],
    },
  ],
  "Manual vs GPS vs billing automation": [
    {
      kind: "table" as const,
      variant: "compare" as const,
      caption: "Manual paper vs basic GPS vs freight billing automation",
      source: "Evaluation frame for finance and dispatch workshops. Not a ranked vendor score.",
      headers: ["Capability", "Manual paper", "Basic GPS only", "Billing automation with ePOD"],
      rows: [
        ["Proof of delivery", "Physical LR weeks later", "Usually missing", "Photo ePOD with time and location"],
        ["Delivery location audit", "Signature argument", "Geofence pin only", "Geofence plus corridor proof where available"],
        ["e-Way Bill extension", "Manual portal login", "Not supported", "Transit alerts and extension workflow"],
        ["Freight invoice audit", "Excel match", "Not supported", "Three-way rate, weight, ePOD"],
        ["Detention audit", "Paper slips", "Rough dwell guess", "Free-time rules on gate stamps"],
        ["GST e-invoice / IRN checks", "Manual review", "Not supported", "IRN and QR checks where product supports them"],
        ["Billing cycle shape", "Often 45 to 60 days talk", "Still slow without POD", "Toward a few days when finance trusts the trail"],
      ],
    },
  ],
  "A 25-point ePOD and e-Way Bill checklist": [
    {
      kind: "donut" as const,
      caption: "How to weight the freight billing audit",
      source: "Weights for this guide: ePOD 25%, e-Way Bill 25%, invoice audit 20%, detention 20%, ERP 10%.",
      slices: [
        { label: "Digital ePOD", value: 25, color: zaftysVizBilling.navy },
        { label: "e-Way Bill compliance", value: 25, color: zaftysVizBilling.primary },
        { label: "Invoice audit", value: 20, color: zaftysVizBilling.primaryBright },
        { label: "Detention control", value: 20, color: zaftysVizBilling.teal },
        { label: "ERP and reporting", value: 10, color: zaftysVizBilling.warm },
      ],
    },
    {
      kind: "table" as const,
      variant: "scorecard" as const,
      caption: "25-point logistics finance and billing checklist (rate 1 to 5; skip = 0)",
      source: "Print for the finance workshop. A skipped e-Way Bill alert is not a phase two.",
      headers: ["#", "Group", "Ask in the room", "Score"],
      rows: [
        ["1", "EPOD", "Photo ePOD uploaded within hours of unload", ""],
        ["2", "EPOD", "ePOD tied to destination geofence or equivalent location check", ""],
        ["3", "EPOD", "Independent corridor proof available where the product supports it", ""],
        ["4", "EPOD", "Electronic LR generated at plant exit where process allows", ""],
        ["5", "EPOD", "Customer can retrieve digital POD without waiting for courier paper", ""],
        ["6", "Eway", "e-Way Bill validity monitored during long-haul transit", ""],
        ["7", "Eway", "Alerts fire early enough to act inside the extension window", ""],
        ["8", "Eway", "Dispatchers can start extension from the same ops screen", ""],
        ["9", "Eway", "Weighbridge net compared to e-Way Bill declared weight", ""],
        ["10", "Eway", "Transporter e-invoices checked for IRN where B2B rules require it", ""],
        ["11", "Invoice", "Three-way match runs before payment approval", ""],
        ["12", "Invoice", "Lane rate cards with fuel indexation stored centrally", ""],
        ["13", "Invoice", "Weighbridge net pulled without retyping as bill truth", ""],
        ["14", "Invoice", "Rate overcharges flagged before posting", ""],
        ["15", "Invoice", "Duplicate freight invoices blocked", ""],
        ["16", "Detention", "Detention calculated from free-time rules and gate stamps", ""],
        ["17", "Detention", "Free-time thresholds enforced by body type or load class", ""],
        ["18", "Detention", "Unverified paper detention slips rejected or quarantined", ""],
        ["19", "Detention", "Detention cost auditable by plant and transporter", ""],
        ["20", "Detention", "Toll or plaza charges reconciled where logs are available", ""],
        ["21", "ERP", "TMS or billing tool syncs with ERP (SAP, Oracle, Tally, or bridge)", ""],
        ["22", "ERP", "Clean matched invoices can post to AP without rekeying", ""],
        ["23", "ERP", "DSO or billing-cycle metrics visible by lane", ""],
        ["24", "ERP", "Freight spend variance visible against budget", ""],
        ["25", "ERP", "Full digital audit trail for every processed freight invoice", ""],
      ],
    },
  ],
  "A six-week freight billing rollout": [
    {
      kind: "timeline" as const,
      caption: "Deploy billing automation without freezing month-end",
      source: "Field rollout pattern. Expand only after one corridor proves three-way match.",
      items: [
        {
          phase: "Weeks 1 to 2",
          title: "Masters and alerts",
          body: "Connect ERP and e-Way Bill workflows you will actually use. Load rate cards and free-time rules. Configure early expiry alerts from the baseline.",
        },
        {
          phase: "Weeks 3 to 4",
          title: "Pilot corridor",
          body: "Run photo ePOD and three-way match on one high-volume lane. Train drivers and AP. Fast-track clean bills. Keep dirty bills in a coded exception queue.",
        },
        {
          phase: "Weeks 5 to 6",
          title: "Scale and report",
          body: "Add plants when exception queues are trusted. Post clean bills to ERP. Give finance a DSO and compliance view by lane.",
        },
      ],
    },
  ],
  "What good billing programs tend to show": [
    {
      kind: "ranges" as const,
      caption: "Directional finance bands, not a contract SLA",
      source:
        "Planning ranges from industrial FTL billing programs and corridor work, including ZAFTYS fleet experience. Measure your last 90 days before anyone writes a zero-penalty guarantee.",
      items: [
        {
          label: "Freight billing cycle",
          detail: "From multi-week paper LR cycles toward a few days when ePOD is trusted.",
        },
        {
          label: "e-Way Bill expiry events",
          detail: "Toward rare when alerts and extension discipline are real. Not a promise of zero forever.",
        },
        {
          label: "Rate and weight overpays",
          detail: "Toward far fewer when three-way match blocks dirty bills early.",
        },
        {
          label: "Unverified detention claims",
          detail: "When free-time clocks use gate stamps instead of paper slips.",
          low: 50,
          high: 80,
          suffix: "% lower",
        },
        {
          label: "AP exception clear time",
          detail: "Toward hours when reason codes and evidence packs travel with the bill.",
        },
      ],
    },
  ],
} as const;
