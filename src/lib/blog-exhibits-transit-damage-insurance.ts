/** Deep-research exhibits: transit damage, shortage, and cargo insurance India.
 * Pure TypeScript. Zero em-dashes or en-dashes; spaced hyphens only.
 * English first; Hindi plant terms only in brackets when needed.
 */
import type { BlogExhibit, BlogKpi } from "@/lib/blog-data";

export const transitDamageKpis: readonly BlogKpi[] = [
  {
    value: "10x freight",
    label: "Rule 12 cap when value unused",
    detail:
      "Carriage by Road Rules, 2011, Rule 12 workshop reading: without the declared-value and higher-risk path, carrier money exposure often models as the lesser of ten times freight or market value. Confirm the bare Rule text before you litigate.",
  },
  {
    value: "180 days",
    label: "Section 16 notice from booking",
    detail:
      "Carriage by Road Act, 2007, Section 16: written notice of loss or damage before suit, within 180 days from the date of booking. Not an informal chat to a broker.",
  },
  {
    value: "0.20-0.50%",
    label: "Contract shortage / weighbridge band",
    detail:
      "Commercial workshop for net-mass tolerance in industrial freight contracts. Cement and moisture-sensitive bulk often sit nearer 0.25% to 0.50%. Not a Legal Metrology maximum-error table by itself.",
  },
  {
    value: "24-48 hrs",
    label: "Insurer notice window (policy)",
    detail:
      "Common inland transit open-policy warranty band after gate-in. Read your schedule. Holding the truck four days before unpacking prejudices surveyor rights.",
  },
  {
    value: "Dock first",
    label: "Evidence before the clean stamp",
    detail:
      "Halt unload, photo plate/tarp/seals, write qualified remarks. A clean lorry receipt often ends both carrier recovery and the marine claim.",
  },
  {
    value: "Clean LR",
    label: "Estoppel risk on unqualified POD",
    detail:
      "An unqualified 'received in good condition' stamp is treated as sound delivery. Insurers and carriers lean on it when damage is found later in the warehouse.",
  },
] as const;

export const transitDamageTakeaways = [
  "Three layers must align: Carriage by Road Act liability, the transporter master agreement, and marine cargo inland transit cover. One layer alone rarely recovers a high-value industrial loss.",
  "Leaving declared value blank to avoid a small higher-risk charge is how the Rule 12 ten-times-freight trap quietly consumes a multi-lakh machine.",
  "A clean lorry receipt (bilty) is often fatal to both carrier recovery and insurance. Write specific damage or shortage remarks before you sign.",
  "Weighbridge shortage is a formula, not a chat argument: net at both ends, weighbridge slip (kanta parchi) on file, contract tolerance, then debit only the billable kilograms.",
  "ITC-A does not forgive broken warranties: double tarpaulin, registered common carrier, and timely surveyor notice still decide many repudiations.",
  "Prefer a registered common carrier on a written agreement over a local truck-stand commission agent (dalal) if you want damage certificates, subrogation, and the next day's truck.",
] as const;

export const transitDamageReferences = [
  "[Carriage by Road Act, 2007 (Act No. 41 of 2007)](https://www.indiacode.nic.in/handle/123456789/2043?locale=en) on India Code: registration of common carriers, goods forwarding note, goods receipt, liability (Section 10), higher risk rate (Section 11), notice before suit (Section 16).",
  "Carriage by Road Rules, 2011: Forms (including Form 7 forwarding note and Form 8 goods receipt) and Rule 12 limitation framework. Confirm the official PDF before quoting numbers in a demand letter.",
  "[Section 10 liability commentary](https://legislations.in/central/2007/the-carriage-by-road-act-2007/section-10) and [Section 16 notice](https://legislations.in/central/2007/the-carriage-by-road-act-2007/section-16): useful secondary mirrors; still verify against India Code.",
  "Marine Insurance Act, 1963 (Act No. 11 of 1963), Section 79: subrogation rights of the insurer after payment (confirm bare Act).",
  "Legal Metrology Act, 2009 and Legal Metrology (General) Rules, 2011: commercial weighbridge verification and maximum permissible error framework for Class III instruments.",
  "Insurer and broker claim checklists for inland marine open policies (carrier notice, no clean receipt, damage or shortage certificate, survey pack). Treat each insurer schedule as controlling.",
  "Manner of Giving Open Delivery and Prescription of Partial Delivery Certificate Form Rules, 1990: railway open-delivery procedure. Cited only to contrast with road joint-survey practice.",
] as const;

export const transitDamageExhibits: Record<string, readonly BlogExhibit[]> = {
  "Start here: receiving dock vs procurement checklist": [
    {
      kind: "tiles",
      caption: "Start here - two jobs, two lists",
      source: "Operating checklist for this guide. Not legal advice.",
      items: [
        {
          title: "Receiving dock (next hour)",
          body: "1) Halt unload on visible damage. 2) Photo plate, tarp, seals, cargo in place. 3) Refuse a clean stamp. 4) Write qualified LR remarks. 5) Call branch + start joint survey / insurer notice.",
        },
        {
          title: "Procurement / risk (before next booking)",
          body: "1) Use a registered common carrier. 2) Declare value on Form 7. 3) Write shortage tolerance in the MSA. 4) Ban subrogation waivers. 5) Score the 20-point audit with finance and dispatch.",
        },
      ],
    },
  ],

  "The three layers of cargo protection: law, contract, and insurance": [
    {
      kind: "tiles",
      caption: "Three layers of industrial cargo risk allocation",
      source: "Operating model for this guide. Not a statute table.",
      items: [
        {
          title: "Layer 1: Statute",
          body: "Carriage by Road Act, 2007 and Rules, 2011. Registered common carriers, liability caps, 180-day suit notice from booking.",
        },
        {
          title: "Layer 2: Contract",
          body: "Shipper and transporter agreement: shortage thresholds, debit notes, tarpaulin counts, certificate timing, electronic proof of delivery.",
        },
        {
          title: "Layer 3: Marine cover",
          body: "Inland transit open policy (ITC-A or ITC-B) under the Marine Insurance Act, 1963, subject to warranties and subrogation.",
        },
      ],
    },
    {
      kind: "callout",
      caption: "Why a local truck-stand broker rarely saves the claim",
      source: "Operating pattern. Confirm facts on your vendor list.",
      items: [
        {
          title: "Not the common carrier",
          body: "Many commission agents (dalal) only arrange the truck. Section 3 registration and the goods receipt sit elsewhere, or nowhere.",
          tone: "warm",
        },
        {
          title: "No damage certificate",
          body: "Surveyors ask the carrier to certify transit damage. Spot brokers routinely refuse.",
          tone: "navy",
        },
        {
          title: "Policy warranty breach",
          body: "Open policies often warrant registered or qualified carriers. Informal booking can void cover before the survey starts.",
          tone: "teal",
        },
      ],
    },
  ],

  "Carriage by Road Act 2007 and Rule 12 carrier liability caps": [
    {
      kind: "callout",
      caption: "Confirm with counsel before a demand letter",
      source: "India Code and the bare Rules control. This guide is orientation only.",
      items: [
        {
          title: "Statute text wins",
          body: "Paraphrases of Sections 10, 11, 16 and Rule 12 are workshops. Read India Code and the Carriage by Road Rules, 2011 before you litigate or debit freight.",
          tone: "navy",
        },
        {
          title: "Policy schedule wins",
          body: "Insurer notice windows, tarpaulin warranties, and registered-carrier warranties sit in your open-policy schedule, not in a blog exhibit.",
          tone: "teal",
        },
      ],
    },
    {
      kind: "table",
      caption: "Key Carriage by Road Act provisions for industrial freight teams",
      source: "Named statute overview. Confirm section text on India Code before a demand letter.",
      headers: ["Provision", "Meaning", "What to lock in operations"],
      rows: [
        ["Section 3", "Registration of common carriers", "Vendor master shows a registered carrier, not only a mobile number"],
        ["Section 8 / Form 7", "Goods forwarding note", "Declare value and hazardous flags at booking"],
        ["Section 9 / Form 8", "Goods receipt / lorry receipt (bilty)", "Keep the receipt that states packages and weight"],
        ["Sections 10-11", "Liability and higher risk rate", "Declared value path when cargo exceeds ten-times-freight risk"],
        ["Section 16", "Notice before suit", "Written notice within 180 days of booking"],
        ["Rule 12", "Prescribed money cap", "Model the ten-times-freight trap when value is blank"],
      ],
    },
    {
      kind: "image",
      caption: "Rule 12 ten-times-freight workshop on a Pune to Coimbatore CNC move",
      source: "Carriage by Road Rules, 2011 Rule 12 model. Workshop freight Rs 48,000. Not a ZAFTYS claim file.",
      src: "/images/blog/transit-rule12-ten-times-freight.png",
      alt: "Formula board showing Rule 12 maximum liability as the lesser of ten times freight or market value on a Rs 42 lakh machine with Rs 48,000 freight",
    },
  ],

  "Physical damage vs weighbridge shortage on Indian corridors": [
    {
      kind: "tiles",
      caption: "Common transit-loss failure modes (briefing aid, not a share index)",
      source:
        "Directional workshop for dock briefing. Not a ZAFTYS audited national claims database. Do not quote as published percentages.",
      items: [
        {
          title: "Water / weather",
          body: "Torn single tarp, weak double-tarpaulin practice, container gasket and roof leaks on monsoon legs.",
        },
        {
          title: "Impact / lashing",
          body: "Coir rope or thin wire instead of Grade-70 chains and binders on machinery, steel, and dies.",
        },
        {
          title: "Theft / siphoning",
          body: "Cut bolt seals, bag slitting, overnight stops without secure yards, weight substitution.",
        },
        {
          title: "Scale drift / moisture",
          body: "Intact packing with net disagreement on clinker, coal, fly ash, and agro bulk - define tolerance in the contract.",
        },
      ],
    },
    {
      kind: "tiles",
      caption: "Commodity bridges for industrial shippers",
      source: "Cluster links into ZAFTYS commercial pages.",
      items: [
        {
          title: "Steel and machinery",
          body: "Impact, tip, and lashing failure. See steel and metals and industrial freight.",
        },
        {
          title: "Cement and bagged bulk",
          body: "Water under weak tarps plus weighbridge shortage disputes. See cement industry page.",
        },
        {
          title: "Container road legs",
          body: "Broken seals and gasket seepage. See container transportation.",
        },
      ],
    },
  ],

  "Weighbridge shortage tolerance in Indian freight contracts": [
    {
      kind: "table",
      caption: "Anatomy of a weighbridge shortage dispute (workshop)",
      source:
        "Illustrative nets only. Your contract tolerance and both stamped weighbridge slips (kanta parchi) control the debit. Not a ZAFTYS audited claim file.",
      headers: ["Field", "Origin plant", "Destination plant"],
      rows: [
        ["Gross", "49,200 kg", "48,550 kg"],
        ["Tare", "14,200 kg", "14,180 kg"],
        ["Net", "35,000 kg", "34,370 kg"],
        ["Mass gap", "630 kg (~1.80%)", "Compare nets, not only gross"],
        ["Scale band (0.10%)", "35 kg", "Workshop translation"],
        ["Moisture band (0.20%)", "70 kg", "Commodity-specific"],
        ["Billable unexplained", "525 kg", "Debit candidate in this contract"],
      ],
    },
    {
      kind: "image",
      caption: "Billable weighbridge shortage equation for the freight contract",
      source: "Commercial workshop. Not a Legal Metrology maximum-error table and not a ZAFTYS tariff.",
      src: "/images/blog/transit-billable-shortage-equation.png",
      alt: "Formula board for billable shortage equal to max of zero and weight gap minus origin net times scale and moisture tolerances",
    },
  ],

  "Clean vs qualified lorry receipt (bilty) endorsements": [
    {
      kind: "tiles",
      caption: "Three classes of lorry receipt (bilty) endorsements at delivery",
      source: "Dock procedure for claim survival. Counsel still owns litigation strategy.",
      items: [
        {
          title: "Clean",
          body: "'Received in good condition' plus stamp. Strong estoppel risk. Insurers lean on it.",
        },
        {
          title: "Ambiguous",
          body: "'Subject to internal inspection' without specifics. Weak when visible damage was ignored.",
        },
        {
          title: "Qualified",
          body: "Exact crate counts, wet marks, seal breaks, and weighbridge shortage. Preserves rights.",
        },
      ],
    },
    {
      kind: "steps",
      caption: "Road joint survey and damage / shortage certificate workflow",
      source:
        "Road industrial practice workshop. Named Open Delivery Rules, 1990 are railway. Do not paste railway forms onto a truck claim.",
      items: [
        { title: "Halt unload", body: "Secure truck, cargo, and driver inside the plant perimeter." },
        {
          title: "Call the branch",
          body: "Notify transporter booking and delivery branches in writing with LR number and photos.",
        },
        {
          title: "Joint inventory",
          body: "Count and photograph packages together before free unloading continues.",
        },
        {
          title: "Inspection record + LR",
          body: "Execute joint inspection record (panchnama). Qualify the lorry receipt with specifics.",
        },
        {
          title: "Carrier certificate",
          body: "Obtain damage or shortage certificate from the registered common carrier.",
        },
        {
          title: "Insurer pack",
          body: "Send papers to the marine claims desk inside the policy notice window.",
        },
      ],
    },
  ],

  "Marine cargo insurance ITC-A claim process and policy pitfalls": [
    {
      kind: "callout",
      caption: "Read your policy schedule before you assume ITC-A recovery",
      source: "Open-policy warranties control. This guide is orientation only - not insurance advice.",
      items: [
        {
          title: "Warranties first",
          body: "Double tarpaulin, registered carrier, and notice timing are often conditions precedent. A torn tarp photo can end the claim before surveyor debate starts.",
          tone: "warm",
        },
        {
          title: "Counsel + broker",
          body: "Confirm subrogation language in the transporter MSA with counsel. Confirm notice and certificate wording with your marine broker against the schedule.",
          tone: "navy",
        },
      ],
    },
    {
      kind: "table",
      variant: "compare",
      caption: "Inland Transit Clauses: ITC-A versus ITC-B",
      source: "Operating comparison workshop. Your policy schedule and endorsements control cover.",
      headers: ["Clause", "Scope", "Typical gaps"],
      rows: [
        [
          "ITC-A",
          "All risks of loss or damage in ordinary transit",
          "Inherent vice, packing failure, wilful misconduct as worded",
        ],
        [
          "ITC-B",
          "Named perils only (collision, fire, overturn, etc.)",
          "Often excludes rain, theft, lashing slip, water ingress",
        ],
      ],
    },
    {
      kind: "flow",
      caption: "Subrogation path after a marine settlement",
      source: "Marine Insurance Act, 1963, Section 79 workshop framing. Confirm bare Act. Not a ZAFTYS recovery guarantee.",
      items: [
        {
          title: "Shipper claims",
          body: "Open policy declaration, photographs, qualified lorry receipt, carrier notice.",
        },
        { title: "Insurer pays", body: "Settlement net of deductible after survey." },
        {
          title: "Letter of subrogation",
          body: "Shipper hands rights and claim file to the underwriter.",
        },
        {
          title: "Carrier recovery",
          body: "Insurer pursues the registered common carrier.",
        },
      ],
    },
  ],

  "24-hour transit damage claim and surveyor SOP": [
    {
      kind: "timeline",
      caption: "24-hour transit damage response clock",
      source: "Plant procedure workshop aligned to common open-policy notice bands. Not a ZAFTYS audited SOP mandate.",
      items: [
        {
          phase: "00:00",
          title: "Gate-in discovery",
          body: "Inspect seals, tarpaulins, and body. Broken seal or crushed crates: do not open blindly.",
        },
        {
          phase: "02:00",
          title: "Digital evidence",
          body: "Ten or more geo-tagged photographs: plate, tarp, seals, cargo in place. Prefer TMS or ePOD capture.",
        },
        {
          phase: "04:00",
          title: "Written intimation",
          body: "Email transporter branches and the marine claims desk. Start the monetary claim notice on the carrier.",
        },
        {
          phase: "12:00",
          title: "Joint survey",
          body: "IRDAI surveyor with transporter branch or driver present where possible.",
        },
        {
          phase: "24:00",
          title: "Documentary close",
          body: "Joint inspection record, qualified lorry receipt remarks, damage or shortage certificate on file.",
        },
      ],
    },
  ],

  "Worked financial case: machinery damage on an industrial corridor": [
    {
      kind: "table",
      variant: "compare",
      caption: "Recovery ledger workshop: informal dispatch versus declared-value procedure",
      source: "Teaching corridor only. Not a ZAFTYS audited claim file and not a recovery guarantee.",
      headers: ["Line", "Scenario A informal", "Scenario B declared value + ITC-A"],
      rows: [
        ["Invoice value", "Rs 48,00,000", "Rs 48,00,000"],
        ["Freight", "Rs 72,000", "Rs 72,000"],
        ["Value on LR", "Blank", "Rs 48,00,000 declared"],
        ["Carrier path", "Rule 12 model Rs 7,20,000", "Full value path + subrogation"],
        ["Insurer path", "Repudiated (workshop)", "Rs 41,50,000 after Rs 50,000 deductible"],
        ["Net write-off risk", "About Rs 34,80,000", "Most exposure secured in workshop"],
      ],
    },
  ],

  "Master transporter contract clauses: enforceable liability provisions": [
    {
      kind: "tiles",
      caption: "Five contract clauses that keep claims alive",
      source: "Workshop language for counsel to adapt. Not legal advice and not a ZAFTYS tariff.",
      items: [
        {
          title: "Registration + value",
          body: "Carrier warrants Carriage by Road registration. Form 7 and invoice value feed Sections 10-11.",
        },
        {
          title: "Weighbridge threshold",
          body: "Net shortage above the written band debits pending freight after reconciliation.",
        },
        {
          title: "Certificates",
          body: "Qualified lorry receipt remarks and damage or shortage certificate within 48 hours of joint survey.",
        },
        {
          title: "Subrogation",
          body: "No waiver of shipper or underwriter recovery rights against the carrier.",
        },
        {
          title: "Evidence",
          body: "Seal numbers, photographs, and electronic proof of delivery on contracted trips in the agreed TMS workflow.",
        },
      ],
    },
  ],

  "The 20-point industrial cargo protection audit matrix and FAQs": [
    {
      kind: "table",
      caption: "20-point cargo protection audit (score 1 unprepared to 5 enforced)",
      source: "Coaching matrix for plant dispatch and risk heads. Not a certification and not a ZAFTYS audit product.",
      headers: ["Block", "Checks (abbreviated)", "Weight"],
      rows: [
        [
          "A. Statute and contracting",
          "Registered carriers, Form 7 value, Sections 10-11, subrogation, Section 16 tracker",
          "25%",
        ],
        [
          "B. Dispatch fitness",
          "Double tarp, gaskets, Grade-70 lashing, bolt seals, e-Way Bill Part B map",
          "25%",
        ],
        [
          "C. Receiving discipline",
          "No clean LR on damage, joint survey, geo photos, inspection record, stamped weighbridge slip",
          "25%",
        ],
        [
          "D. Insurance and shortage",
          "ITC warranties, 24-hour notice, tolerance model, claims ledger, tonne-km loss review",
          "25%",
        ],
      ],
    },
  ],
};
