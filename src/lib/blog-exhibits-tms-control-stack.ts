/** Deep-research exhibits: Industrial TMS control stack — image diagrams + light supporting charts. */
import { zaftysViz } from "@/lib/blog-exhibits-tms-eval";
import type { BlogExhibit, BlogKpi } from "@/lib/blog-data";

export const tmsControlStackKpis: readonly BlogKpi[] = [
  {
    value: "5",
    label: "Stages that matter",
    detail: "Gate, weigh, documents, delivery proof, then money. Miss one and the rest argue.",
  },
  {
    value: "Inside",
    label: "Where time burns",
    detail: "On busy plants, a lot of truck time is spent inside the boundary - not only on the highway.",
  },
  {
    value: "200 km",
    label: "e-Way day rule",
    detail: "Normal cargo: about one day of validity per 200 km. ODC uses a tighter 20 km clock.",
  },
  {
    value: "49 / 55 t",
    label: "Weight ceilings",
    detail: "MoRTH framing many plants plan around: rigid up to 49 t, tractor-trailer up to 55 t (check your axle layout).",
  },
  {
    value: "4 docs",
    label: "Before you pay",
    detail: "Rate card, scale net, delivery proof, transporter bill. If they do not meet, do not clear blindly.",
  },
  {
    value: "Own / network",
    label: "Stay honest",
    detail: "Owned trucks, contract trucks, and partner overflow should stay labeled through settlement.",
  },
] as const;

export const tmsControlStackTakeaways = [
  "A map on the highway will not fix a messy gate, a typed weighbridge slip, or an invoice nobody can match.",
  "Lock weight and axle rules before the truck leaves. Highway overload drama costs more than a blocked gate-out.",
  "e-Way Bills have a real clock. Update the vehicle details in time, and do not pretend every delay can be auto-extended forever.",
  "Pay freight only when the rate, the weight, the delivery proof, and the bill tell the same story - and say whether the trip was own fleet or labeled overflow.",
] as const;

export const tmsControlStackReferences = [
  "MoRTH S.O. 3467(E) (2018) on axle weight and GVW / GCW ceilings - confirm current gazette text.",
  "Motor Vehicles Act Section 194 on overload penalties - confirm current notified amounts with counsel.",
  "CGST Rule 138 / 138(10) on e-Way Bills: Part A / Part B, 200 km and 20 km slabs, extension window near expiry.",
  "CGST Act Section 31 and Rule 46 on tax invoices. Rule 48 is e-invoice for notified businesses - a different track.",
  "NETC / FASTag: mandatory for M and N class vehicles from 1 January 2021 (MoRTH / IHMCL).",
  "ULIP / DPIIT for authorised vehicle and driver data access when your application is onboarded.",
  "Legal Metrology / OIML R76 Class III for industrial weighbridges - keep stamps and recalibration dates.",
  "SAP LE-TRA toward S/4HANA Transportation Management - confirm support dates with your SAP partner.",
  "ZAFTYS plant and corridor work, 2024–2026 - directional, not a national survey.",
] as const;

export const tmsControlStackExhibits: Record<string, readonly BlogExhibit[]> = {
  "Start here": [
    {
      kind: "image",
      caption: "The stack in one picture",
      source:
        "Gate → weigh → documents → delivery proof → settlement. Bay and loading still burn time, but they sit with production / yard management - this guide owns the control seams around them.",
      src: "/images/blog/tms-five-stage-stack.png",
      alt: "Five-stage industrial TMS control stack from gate to settlement",
    },
    {
      kind: "tiles",
      caption: "Who usually owns each stage",
      source: "Titles vary by plant. The point is one named owner per seam - not 'everyone and no one.'",
      items: [
        { title: "Gate", body: "Security + transporter desk. Identity, override log, queue." },
        { title: "Weigh", body: "Weighbridge / plant ops. Locked net, anti-cheat, overload block." },
        { title: "Documents", body: "Dispatch + tax. LR, e-Way Part B timing, night peak queue." },
        { title: "Delivery proof", body: "Dispatch + customer service. Link close, seals, shortage." },
        { title: "Settlement", body: "Finance + commercial. Fuel, detention, four-way match." },
      ],
    },
    {
      kind: "donut",
      caption: "Where a busy plant day often goes (teaching picture)",
      source: "Not your exact plant. Useful for a workshop: a lot of truck time is still inside the yard.",
      slices: [
        { label: "Inside the plant", value: 55, color: zaftysViz.navy },
        { label: "On the road", value: 30, color: zaftysViz.primaryBright },
        { label: "Unload / POD chase", value: 15, color: zaftysViz.teal },
      ],
    },
  ],

  "Why yards still leak money": [
    {
      kind: "table",
      variant: "compare",
      caption: "Five places the story usually breaks",
      source: "Walk one outbound lane with operations and finance. Ask who can still edit each record.",
      headers: ["Break point", "What you see", "What good looks like"],
      rows: [
        ["Gate", "Paper register, long queue", "Truck ID tied to a real open order"],
        ["Weighbridge", "Typed weight, arguments later", "Scale feeds the system; edits are locked"],
        ["Documents", "e-Way updated after the truck left", "Vehicle details set before gate-out"],
        ["Delivery", "POD photo lost in chat", "Proof tied to the same trip, with shortage rules"],
        ["Payment", "Three files, three truths", "Four documents match - or a clear exception"],
      ],
    },
    {
      kind: "table",
      variant: "compare",
      caption: "Inbound raw material vs outbound finished goods",
      source: "Same five stages. Different fights. Do not copy one playbook onto the other without checking.",
      headers: ["Seam", "Inbound (raw / purchase)", "Outbound (finished goods)"],
      rows: [
        ["Gate", "PO / indent check; priority when stock is low", "SO / packing readiness; avoid morning surge"],
        ["Weigh", "Tare first, then gross; purchase weight fights", "Gross then tare; overload risk before highway"],
        ["Documents", "Supplier / GST inbound rules", "LR + e-Way Part B before gate-out"],
        ["Proof", "Plant receives; quality / moisture often matter", "Customer receives; seals and shortage rules"],
        ["Pay", "Freight may sit with inbound logistics or vendor", "Four-way match before transporter payment"],
      ],
    },
    {
      kind: "bars",
      caption: "Example idle hours on a rough plant day",
      source:
        "Teaching numbers. Bay wait is real - it belongs to production and yard slots, not to the five control stages below. Still measure it; fix it on a parallel track.",
      unit: "hours",
      items: [
        { label: "Waiting at gate", value: 2.5 },
        { label: "Weigh / reposition fights", value: 1.2 },
        { label: "Bay wait + loading", value: 3.0 },
        { label: "Paper / e-Way at exit", value: 0.8 },
      ],
    },
  ],

  "Gate: know the truck before the boom opens": [
    {
      kind: "tiles",
      caption: "Three ways in - and a backup",
      source: "You do not need every gadget on day one. You do need a logged fallback when cameras fail at 2 AM.",
      items: [
        { title: "Number plate camera", body: "Reads the plate when the truck crawls in. Mud and broken fonts will still beat it sometimes." },
        { title: "FASTag / plant RFID", body: "Second chance when the plate is dirty. FASTag is mandatory on commercial classes for toll - useful at the gate too." },
        { title: "QR / WhatsApp pass", body: "For spot trucks and failed reads. Still logged. Never a silent paper exception." },
        { title: "Order check", body: "No open indent? Boom stays down. Override only with a name and a reason." },
      ],
    },
    {
      kind: "callout",
      caption: "What to ask in the demo",
      items: [
        {
          title: "Show me failure",
          body: "Ask what happens when the plate cannot be read and the tag is dead. If the answer is 'guard writes it down,' you bought a camera, not control.",
          tone: "navy",
        },
        {
          title: "Show me the log",
          body: "Every override should leave a trail finance and security can replay later.",
          tone: "teal",
        },
      ],
    },
  ],

  "Weighbridge: the plant cash register": [
    {
      kind: "bars",
      caption: "Weight ceilings many plants plan with (tonnes)",
      source:
        "MoRTH 2018 framing for common classes. Mid configs (4-axle / 5-axle rigid and more) live in the axle load guide - encode by layout, not one magic number.",
      unit: "t",
      items: [
        { label: "2-axle rigid", value: 18.5 },
        { label: "3-axle rigid", value: 28.5 },
        { label: "Rigid ceiling", value: 49 },
        { label: "Tractor-trailer ceiling", value: 55 },
      ],
    },
    {
      kind: "tiles",
      caption: "Simple anti-cheat checks",
      items: [
        { title: "Truck fully on the deck", body: "Beams or sensors catch half-on wheels before you accept a weight." },
        { title: "Stable reading only", body: "Ignore bouncing numbers. Wait for a stable signal from the indicator." },
        { title: "Tare has an expiry", body: "Old light tare slips should die after a set window or when the truck leaves." },
        { title: "Over legal weight?", body: "Block gate-out and offload inside the plant. Cheaper than a highway stop." },
      ],
    },
  ],

  "Documents: LR and e-Way Bill": [
    {
      kind: "image",
      caption: "How long an e-Way Bill lasts",
      source:
        "CGST Rule 138(10). Normal cargo uses 200 km per day. Oversize work uses 20 km per day. The vehicle details (Part B) are what start the useful clock. Not every movement needs an e-Way Bill - confirm threshold and exemptions with tax.",
      src: "/images/blog/tms-formula-eway-validity.png",
      alt: "Infographic of e-Way Bill validity: 200 km per day for normal cargo, 20 km for ODC",
    },
    {
      kind: "steps",
      caption: "A sane document order",
      items: [
        { title: "Weight is locked", body: "Net comes from the scale, not a typed field someone can 'fix.'" },
        { title: "LR / bilty", body: "Carriage document for the transporter - tied to that net." },
        { title: "e-Way Part A", body: "Consignment details when an e-Way Bill is required. Waiting for a truck is fine." },
        { title: "e-Way Part B", body: "Put the real vehicle number before the truck leaves. Then the distance clock makes sense." },
      ],
    },
    {
      kind: "flow",
      caption: "Multi-drop without inventing a second inventory",
      source: "One registration, one certified net, child documents that still add up.",
      items: [
        { title: "Parent trip", body: "One truck, one locked scale net for the whole load." },
        { title: "Child LRs", body: "Separate carriage lines per consignee / drop." },
        { title: "Child e-Way Bills", body: "Separate bills when required - vehicle number stays consistent." },
        { title: "Weight check", body: "Child weights must sum to parent net. If not, stop and fix." },
      ],
    },
    {
      kind: "callout",
      caption: "When e-Way does not apply",
      items: [
        {
          title: "Ask tax, then encode the rule",
          body: "Value thresholds, certain goods, and some short / exempt movements do not need an e-Way Bill. Your TMS should skip generation cleanly - not invent a fake bill to 'complete the flow.'",
          tone: "navy",
        },
        {
          title: "Night peak without lockouts",
          body: "Do not hammer the GST portal in a tight loop at 23:00. Queue vehicle updates, retry calmly when the portal is busy, and keep a human path for stuck bills.",
          tone: "teal",
        },
      ],
    },
  ],

  "Delivery proof without another app war": [
    {
      kind: "steps",
      caption: "A flow drivers will actually finish",
      items: [
        { title: "Near the site", body: "System sees the truck close to the unloading point." },
        { title: "Open a link", body: "WhatsApp or SMS - no forced heavy app for one plant." },
        { title: "Capture proof", body: "Signed paper, seal photos, optional customer weight." },
        { title: "Receiver confirms", body: "OTP or clear acceptance closes the trip." },
        { title: "Shortage?", body: "Over the contract tolerance → debit on the same trip, not a side chat." },
      ],
    },
    {
      kind: "image",
      caption: "Shortage check (teaching example)",
      source: "Swap in your commodity tolerance and rate. Encode once with commodity managers - stop renegotiating in chat.",
      src: "/images/blog/tms-formula-shortage.png",
      alt: "Infographic of factory net vs customer net, tolerance, and billable shortage debit",
    },
    {
      kind: "callout",
      caption: "App vs link",
      items: [
        {
          title: "Spot-heavy lanes",
          body: "Many drivers will not install another app for one plant. Lead with WhatsApp or SMS session links.",
          tone: "navy",
        },
        {
          title: "Dedicated fleets",
          body: "A proper driver app can still win when the same fleet lives inside your programme every day.",
          tone: "teal",
        },
      ],
    },
  ],

  "Settlement: fuel, detention, four-way match": [
    {
      kind: "image",
      caption: "Diesel escalation (contract math)",
      source: "α is usually negotiated around 0.30–0.35. Lock the base diesel city and the formula in writing. Rupee example is teaching only.",
      src: "/images/blog/tms-formula-fuel-escalation.png",
      alt: "Infographic of diesel freight escalation formula with worked rupee example",
    },
    {
      kind: "image",
      caption: "Plant detention clock",
      source: "Use gate-in and gate-out from the same identity system. The ₹/hour bands are examples - swap in your rate card.",
      src: "/images/blog/tms-formula-detention.png",
      alt: "Infographic of plant detention free time and hourly tiers",
    },
    {
      kind: "table",
      variant: "compare",
      caption: "Four-way match - and what to do when it fails",
      source: "All four must agree before you pay. Named exception + owner beats a blocked payment run nobody owns.",
      headers: ["Document", "Must show", "If it disagrees"],
      rows: [
        ["Rate card", "Lane, fuel α, detention tiers", "Hold line → procurement / commercial"],
        ["Scale net", "Certified gross / tare trail", "Hold pay → plant weigh + transporter desk"],
        ["Delivery proof", "Closed POD, seals, shortage debit", "Hold pay → dispatch / customer service"],
        ["Transporter bill", "Same trip, same maths", "Clear rest after debit / fix → finance"],
      ],
    },
    {
      kind: "steps",
      caption: "ERP object map (SAP-shaped, keep labels honest)",
      source: "Names vary by landscape. The point is one trip identity through weight, service entry, and invoice match - not a slide full of transaction codes.",
      items: [
        { title: "Order / delivery", body: "Sales or purchase order and delivery / shipment object that the gate can check." },
        { title: "Freight / trip", body: "TMS trip or freight order carrying gate stamps, locked net, and documents." },
        { title: "Goods / service confirm", body: "Plant goods movement or service confirmation that finance will trust." },
        { title: "Invoice match", body: "Four-way clear (or coded exception) before payment run - MIRO-style on SAP." },
      ],
    },
  ],

  "How mature is your yard?": [
    {
      kind: "table",
      variant: "scorecard",
      caption: "Manual · Half-digital · Under control",
      source: "Use the last 90 days of proof. Do not average five scores into one happy label.",
      headers: ["Area", "Manual", "Half-digital", "Under control"],
      rows: [
        ["Gate", "Paper book", "Camera, no order link", "ID + open order + log"],
        ["Weigh", "Typed slip", "Print, still editable", "Scale lock + weight rules"],
        ["Documents", "Portal after exit", "Vehicle details late", "Set before gate-out"],
        ["Delivery", "Photo in chat", "App nobody opens", "Link + proof + shortage rules"],
        ["Payment", "Excel fight", "Three-way leaks", "Four-way + clear exceptions"],
      ],
    },
  ],

  "Build in the right order": [
    {
      kind: "timeline",
      caption: "Order of work that usually sticks",
      source: "Calendars slip. This order should not.",
      items: [
        {
          phase: "1",
          title: "Measure first",
          body: "Gate waits, weight fights, document misses, days to POD, days to pay.",
        },
        {
          phase: "2",
          title: "Fix gate + scale",
          body: "Identity and locked weight before you celebrate a live map.",
        },
        {
          phase: "3",
          title: "Documents",
          body: "LR and e-Way discipline, including night peak queues.",
        },
        {
          phase: "4",
          title: "POD then money",
          body: "Close delivery proof, then fuel, detention, and four-way match.",
        },
      ],
    },
    {
      kind: "tiles",
      caption: "Freeze these denominators before anyone claims savings",
      source: "Same units for 90 days. No mixing median with best-day hero stories.",
      items: [
        { title: "Gate wait (hours)", body: "Median and 90th percentile from identity clear to leave staging / enter bay." },
        { title: "Weight fights (count)", body: "Typed overrides, reposition reweighs, overload blocks per 100 trips." },
        { title: "Document misses (%)", body: "Trips that left without vehicle details set when e-Way was required." },
        { title: "Days to POD / pay", body: "Gate-out to closed proof; closed proof to cleared transporter bill." },
      ],
    },
    {
      kind: "callout",
      caption: "Keep reading (full paths on this site)",
      items: [
        {
          title: "Buying a TMS?",
          body: "Score demos with /blog/tms-evaluation-guide-indian-manufacturers before you buy hardware theatre.",
          tone: "navy",
        },
        {
          title: "Axle and GVW",
          body: "Hardcode weight rules only after /blog/india-axle-load-gvw-limits-heavy-freight.",
          tone: "teal",
        },
        {
          title: "Yard time and billing",
          body: "Neighbour posts: /blog/plant-detention-tat-yard-gate-india and /blog/epod-fastag-eway-bill-billing-india.",
          tone: "warm",
        },
      ],
    },
  ],

  "What to do next": [
    {
      kind: "steps",
      caption: "Ten questions for the next vendor demo",
      source: "If they cannot answer live, park the glossy map slide.",
      items: [
        { title: "Gate fail", body: "Show plate fail + dead tag. What happens at 2 AM?" },
        { title: "Override log", body: "Show name, reason, and replay for security / finance." },
        { title: "Half-on deck", body: "Show weigh capture blocked when the truck is not fully on the scale." },
        { title: "Tare expiry", body: "Show old light slips die after gate-out or policy window." },
        { title: "Part B timing", body: "Show vehicle details set before gate-out when e-Way is required." },
        { title: "Portal busy", body: "Show calm retry - not a tight loop - when GST is slow at night." },
        { title: "Link POD", body: "Show WhatsApp/SMS close without forcing an app install." },
        { title: "Shortage debit", body: "Show tolerance math and debit on the same trip identity." },
        { title: "Four-way mismatch", body: "Show a named exception with an owner, not a silent short-pay." },
        { title: "Capacity label", body: "Show own fleet vs labeled overflow on the settlement line." },
      ],
    },
  ],
};
