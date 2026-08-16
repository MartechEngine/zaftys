/** Exhibits for plant detention / TAT yard and gate operations guide */

export const zaftysVizTat = {
  navy: "#0B1C36",
  primary: "#1E4D8C",
  primaryBright: "#3D7CC9",
  teal: "#0D9488",
  warm: "#D97706",
} as const;

export const plantTatTakeaways = [
  "Plant detention and long truck turnaround time (TAT) often cost more than highway transit on industrial full truckload (FTL) lanes.",
  "Measure plant turnaround time as five stages: gate entry, tare, bay, gross, and exit docs. A single arrival/departure pin hides the bottleneck.",
  "Detention claims, rate premiums, and driver attrition compound when arrivals are unscheduled and weighbridge weights are typed by hand.",
  "Cut plant detention with timed loading windows, fail-closed weighbridge capture, body-type bay matching, and digital LR / e-POD, not another WhatsApp group.",
] as const;

export const plantTatExhibits = {
  "Where in-plant logistics bottlenecks sit": [
    {
      kind: "bars" as const,
      caption: "Illustrative morning gate pressure (not your plant count)",
      source:
        "Workshop shape for high-volume industrial sites. Plot your own arrivals by hour for two weeks before you freeze slot rules.",
      unit: "relative arrivals",
      items: [
        { label: "Before 7 a.m.", value: 15 },
        { label: "7 to 9 a.m. surge", value: 95 },
        { label: "Midday", value: 40 },
        { label: "Late afternoon", value: 55 },
        { label: "Night / off-peak", value: 20 },
      ],
    },
    {
      kind: "tiles" as const,
      caption: "Four causes of in-plant congestion",
      source: "Operational pattern on Indian industrial yards. Not a single-plant case study.",
      items: [
        {
          title: "Unscheduled arrivals",
          body: "Peak-hour clusters choke the gate when transporters all aim for the same morning window.",
        },
        {
          title: "Manual weighbridge",
          body: "Typed tare and gross numbers create queues, re-weighs, and override risk.",
        },
        {
          title: "Body-type mismatch",
          body: "Open body sent to a closed bay, or tanker sent to a crane dock, burns yard minutes.",
        },
        {
          title: "Paperwork lag",
          body: "Physical LR and gate-pass lines hold trucks after loading is already done.",
        },
      ],
    },
  ],
  "Five stages of plant turnaround time (TAT)": [
    {
      kind: "table" as const,
      variant: "compare" as const,
      caption: "Five-stage plant TAT: illustrative manual vs disciplined targets",
      source:
        "Workshop targets for industrial plants, not a ZAFTYS contract SLA. Bay loading time still depends on cargo and labour. Measure your last 90 days before you publish a plant goal.",
      headers: ["Stage", "Illustrative manual drag", "Disciplined target shape", "What breaks it"],
      rows: [
        [
          "1. Gate entry and security",
          "Often 30 to 60 minutes",
          "A few minutes with pre-cleared papers and slot control",
          "Paper PO checks, missing e-Way Bill, early arrivals at the barrier",
        ],
        [
          "2. Tare weigh",
          "Often 20 to 40 minutes",
          "A few minutes with IP or serial capture",
          "Typed weights, dual queues, indicator not linked",
        ],
        [
          "3. Bay or dock loading",
          "Often 2 to 4 hours",
          "About 45 to 90 minutes when bay assignment is real",
          "Wrong body type, packing not ready, no bay display",
        ],
        [
          "4. Gross weigh and GVW check",
          "Often 30 to 60 minutes",
          "A few minutes with auto net and overload block",
          "Re-weigh loops, override culture, no GVW lock",
        ],
        [
          "5. Docs and gate exit",
          "Often 45 to 90 minutes",
          "Minutes when digital LR and exit clear together",
          "Cabin queues for paper LR and gate pass",
        ],
        [
          "Total plant TAT (shape)",
          "Often 5 to 8+ hours",
          "Toward roughly 1 to 2 hours on well-run sites",
          "Any stage without a timestamp",
        ],
      ],
    },
    {
      kind: "steps" as const,
      caption: "What each TAT stage must prove",
      source: "Ops checklist. If a stage has no timestamp, you cannot manage it.",
      items: [
        {
          title: "Gate",
          body: "Vehicle and driver identity, e-Way Bill status, and slot window before the barrier opens.",
        },
        { title: "Tare", body: "Empty weight from the indicator, not a clerk keyboard." },
        {
          title: "Bay",
          body: "Body type matched to dock; driver told where to go without wandering.",
        },
        { title: "Gross", body: "Loaded weight captured; net and GVW checked before a gate pass." },
        {
          title: "Exit",
          body: "Digital LR and papers ready so the truck does not wait in a cabin queue.",
        },
      ],
    },
  ],
  "What plant detention really costs": [
    {
      kind: "tiles" as const,
      caption: "Who pays when plant TAT blows out",
      source:
        "Directional cost shapes from industrial FTL programs. Detention rupee bands vary by contract. Confirm your free-time clause before a board pack.",
      items: [
        {
          title: "Manufacturer",
          body: "Detention claims, higher baseline lane rates, finished-goods backup on the floor.",
        },
        {
          title: "Fleet operator",
          body: "Fewer trips per month, idle fuel, weaker asset utilization on the same truck.",
        },
        {
          title: "Driver",
          body: "Long duty hours in unmanaged queues, fatigue, and attrition pressure.",
        },
        {
          title: "Customer",
          body: "Late arrivals and stockout risk when the plant clock eats the corridor plan.",
        },
      ],
    },
    {
      kind: "table" as const,
      caption: "Detention and rate pressure (illustrative talk bands)",
      source: "Common cabin and contract talk on multi-axle FTL. Your rate card wins.",
      headers: ["Cost lever", "What to ask", "Illustrative band"],
      rows: [
        [
          "Detention after free time",
          "What is free time, and when does the clock start?",
          "Often discussed around ₹1,500 to ₹3,500 per day per multi-axle truck",
        ],
        [
          "Rate premium for slow plants",
          "Do vendors price expected wait into the lane card?",
          "Efficient plants often avoid an 8% to 15% talk premium vs chronic queues",
        ],
        [
          "Lost trips",
          "How many round trips does plant wait steal per month?",
          "A truck stuck in yards can lose multiple long-haul turns",
        ],
        [
          "Idle fuel",
          "Are engines idling in the approach queue?",
          "Often discussed around 1.5 to 2.5 litres per hour while waiting",
        ],
      ],
    },
  ],
  "How to baseline plant TAT before you buy software": [
    {
      kind: "steps" as const,
      caption: "Two-week plant TAT baseline (paper is fine to start)",
      source: "Ops method. Software amplifies a measured baseline. It does not invent one.",
      items: [
        {
          title: "Pick one site",
          body: "Choose the highest-volume outbound or inbound gate, not the quietest plant.",
        },
        {
          title: "Stamp five times",
          body: "Gate in, tare done, bay start, gross done, gate out. Even a shared sheet beats one arrival pin.",
        },
        {
          title: "Tag the failure",
          body: "For each long trip, mark whether gate, weigh, bay, docs, or packing readiness owned the wait.",
        },
        {
          title: "Count morning surge",
          body: "Arrivals by hour for ten working days. That chart sets slot capacity.",
        },
        {
          title: "Only then set targets",
          body: "Publish stage goals from your median and 90th percentile, not from a vendor slide.",
        },
      ],
    },
  ],
  "Free-time clocks that survive finance": [
    {
      kind: "table" as const,
      variant: "compare" as const,
      caption: "Detention clock rules that reduce cabin fights",
      source: "Contract and yard design notes. Counsel still owns the final free-time clause.",
      headers: ["Rule", "Strong version", "Weak version to reject"],
      rows: [
        ["Clock start", "Gate-in timestamp after identity clears", "Whenever the driver says he arrived on the highway"],
        ["Free time", "Fixed hours by body type and load class", "Vague reasonable time language"],
        ["Exclusions", "Plant force majeure and packing holds logged", "Open-ended plant excuses with no stamp"],
        ["Early arrival", "Staging yard; clock starts at slot open", "Early truck jumps the queue and starts billing"],
        ["Evidence", "Five-stage stamps plus weight tickets", "WhatsApp screenshots and cabin memory"],
      ],
    },
  ],
  "Slot windows that transporters will follow": [
    {
      kind: "tiles" as const,
      caption: "What makes timed loading windows real",
      source: "Yard discipline pattern. A slot PDF nobody enforces is theatre.",
      items: [
        {
          title: "Capacity first",
          body: "Slots cannot exceed weighbridge and bay throughput for that hour.",
        },
        {
          title: "Book before dispatch",
          body: "Transporters reserve windows when the indent is accepted, not at the gate.",
        },
        {
          title: "Early = staging",
          body: "Arrive early and wait off the highway. Do not open the barrier for queue jumpers.",
        },
        {
          title: "Missed slot = overflow",
          body: "Reassign the next free window. Do not punish the corridor with a blocked approach road.",
        },
      ],
    },
  ],
  "Yard management from queue to scheduled gate": [
    {
      kind: "steps" as const,
      caption: "Yard and gate workflow that actually cuts detention",
      source: "Field pattern. Ask in the demo which gate hardware and slot tools are live, not assumed.",
      items: [
        {
          title: "Production sync",
          body: "Know dock and material readiness before you invite trucks.",
        },
        {
          title: "Timed slots",
          body: "Transporters book loading windows instead of all arriving at 8 a.m.",
        },
        {
          title: "Gate control",
          body: "Early trucks stage off the highway; on-slot trucks clear identity and papers.",
        },
        {
          title: "Directed bay",
          body: "Body type and open dock decide the path, not a shouted instruction.",
        },
        {
          title: "Auto weigh",
          body: "Tare and gross from the indicator; overload blocks the exit pass.",
        },
        {
          title: "Digital exit",
          body: "LR and e-POD trail close the trip without a paper cabin queue.",
        },
      ],
    },
  ],
  "Industry patterns that change yard design": [
    {
      kind: "tiles" as const,
      caption: "How verticals usually break plant TAT",
      source: "Pattern talk for plant walks. Your bay labour and cargo still win.",
      items: [
        {
          title: "Steel and metals",
          body: "Crane and cradle time dominate bay dwell. Body-type and securement mismatch destroys the morning.",
        },
        {
          title: "Cement and bulk",
          body: "Tipper and silo windows, weighbridge queues, and monsoon moisture swings drive detention.",
        },
        {
          title: "Chemicals and liquids",
          body: "Wash, permit, and bay segregation matter more than raw speed. Wrong bay is a safety event.",
        },
        {
          title: "FMCG and auto parts",
          body: "Dock door scarcity and festive surges. Slot adherence beats hero dispatchers.",
        },
      ],
    },
  ],
  "Manual vs GPS vs yard management": [
    {
      kind: "table" as const,
      variant: "compare" as const,
      caption: "Manual ledgers vs basic GPS vs industrial yard control",
      source: "Evaluation frame for plant walks. Not a ranked vendor score.",
      headers: ["Capability", "Manual paper", "Basic GPS only", "Industrial yard and gate control"],
      rows: [
        ["Gate check-in", "Paper register", "Phone call or geofence pin", "Slot window plus identity and paper checks"],
        ["In-plant guidance", "Oral instructions", "Not supported", "Bay assignment the driver can follow"],
        ["Weighbridge capture", "Typed numbers", "Not supported", "IP or serial capture; typing locked"],
        ["Loading slots", "First come, first served", "Arrival pin only", "Timed windows with staging for early trucks"],
        ["TAT audit", "One entry time", "Arrival and departure only", "Five-stage timestamps"],
        ["Detention calc", "Paper dispute", "Rough dwell estimate", "Rule engine on free time and gate stamps"],
        ["e-POD / LR path", "Physical mail weeks later", "Usually missing", "Digital LR and photo e-POD trail"],
      ],
    },
  ],
  "A 25-point plant detention and TAT checklist": [
    {
      kind: "donut" as const,
      caption: "How to weight the plant TAT audit",
      source: "Weights for this guide: gate 25%, weighbridge 25%, yard and bays 20%, documents 20%, analytics 10%.",
      slices: [
        { label: "Gate and arrival", value: 25, color: zaftysVizTat.navy },
        { label: "Weighbridge", value: 25, color: zaftysVizTat.primary },
        { label: "Yard and bays", value: 20, color: zaftysVizTat.primaryBright },
        { label: "Documents and e-POD", value: 20, color: zaftysVizTat.teal },
        { label: "Vendor analytics", value: 10, color: zaftysVizTat.warm },
      ],
    },
    {
      kind: "table" as const,
      variant: "scorecard" as const,
      caption: "25-point plant yard and TAT checklist (rate 1 to 5; skip = 0)",
      source: "Print for the plant walk. A skipped weighbridge lock is not a phase two.",
      headers: ["#", "Group", "Ask in the room", "Score"],
      rows: [
        ["1", "Gate", "Timed loading slot windows enforced for incoming trucks", ""],
        ["2", "Gate", "Off-highway staging for early or unscheduled vehicles", ""],
        ["3", "Gate", "Driver and registration checks before the barrier opens", ""],
        ["4", "Gate", "e-Way Bill or PO status checked at entry, not after the truck is inside", ""],
        ["5", "Gate", "Inbound raw-material and outbound finished-goods lanes separated where volume needs it", ""],
        ["6", "Weighbridge", "Indicator linked by IP or serial; no typed weight as system of record", ""],
        ["7", "Weighbridge", "Manual override disabled or dual-controlled with an audit log", ""],
        ["8", "Weighbridge", "Net weight calculated and checked against MoRTH GVW framing", ""],
        ["9", "Weighbridge", "Tare logged before a bay slip is issued", ""],
        ["10", "Weighbridge", "Gate pass blocked when weight sits outside e-Way Bill tolerance", ""],
        ["11", "Slots", "Bay and dock queues visible to drivers without wandering the yard", ""],
        ["12", "Slots", "Vehicle body type matched to dock capability", ""],
        ["13", "Slots", "Warehouse or packing readiness visible before the truck is called in", ""],
        ["14", "Slots", "Bay assignment sent by SMS, WhatsApp, display, or equivalent", ""],
        ["15", "Slots", "Bay dwell tracked separately from total plant TAT", ""],
        ["16", "Documentation", "Digital LR generated after gross clearance", ""],
        ["17", "Documentation", "Photo e-POD captured at destination with a usable trail", ""],
        ["18", "Documentation", "Detention calculated from free-time rules and gate timestamps", ""],
        ["19", "Documentation", "ERP or billing sync for weight, LR, and detention where claimed", ""],
        ["20", "Documentation", "e-Way Bill validity watched on long hauls after exit", ""],
        ["21", "Analytics", "Stage-by-stage TAT reported by shift", ""],
        ["22", "Analytics", "Transporters scored on slot adherence and compliance", ""],
        ["23", "Analytics", "Auditable log of detention claims approved or rejected", ""],
        ["24", "Analytics", "Yard density visible to plant managers without a paper walk", ""],
        ["25", "Analytics", "Plant TAT data used in lane-rate negotiations with transporters", ""],
      ],
    },
  ],
  "A six-week yard TAT rollout": [
    {
      kind: "timeline" as const,
      caption: "Deploy yard discipline without freezing the plant",
      source: "Field rollout pattern. Expand only after one site proves five-stage timestamps.",
      items: [
        {
          phase: "Weeks 1 to 2",
          title: "Connect and set rules",
          body: "Link weighbridge capture, define slot rules from the baseline chart, onboard transporters, and map staging for early trucks.",
        },
        {
          phase: "Weeks 3 to 4",
          title: "Single-plant pilot",
          body: "Enforce staggered slots at one high-volume site. Train gate, weighbridge, and bay staff. Fail-close overrides. Run one peak-morning drill.",
        },
        {
          phase: "Weeks 5 to 6",
          title: "Scale and settle",
          body: "Add plants when TAT reports are trusted. Hand finance automated detention and three-way match trails. Feed TAT into lane-rate talks.",
        },
      ],
    },
  ],
  "What good yards tend to show": [
    {
      kind: "ranges" as const,
      caption: "Directional plant TAT bands, not a contract SLA",
      source:
        "Planning ranges from industrial yard programs and corridor work, including ZAFTYS plant and fleet experience. Measure your last 90 days before anyone writes a 75% cut guarantee.",
      items: [
        {
          label: "In-plant turnaround time",
          detail: "From multi-hour unmanaged queues toward roughly one to two hours on disciplined sites.",
        },
        {
          label: "Unbudgeted detention claims",
          detail: "Toward far fewer claims when slots and free-time clocks are real.",
          low: 50,
          high: 75,
          suffix: "% lower",
        },
        {
          label: "Weighbridge throughput",
          detail: "When typing stops and IP capture is mandatory.",
          low: 30,
          high: 50,
          suffix: "% higher",
        },
        {
          label: "Billing after e-POD",
          detail: "From multi-week paper LR cycles toward a few days when finance trusts the trail.",
        },
        {
          label: "Morning approach congestion",
          detail: "Toward fewer highway-side queues when early trucks stage and slots are enforced.",
        },
      ],
    },
  ],
} as const;
