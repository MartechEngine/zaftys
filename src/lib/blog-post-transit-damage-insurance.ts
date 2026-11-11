import type { BlogSection } from "@/lib/blog-data";
import { transitDamageExhibits } from "@/lib/blog-exhibits-transit-damage-insurance";

export const transitDamageFaqs = [
  {
    question: "Can a transporter refuse delivery if the shipper withholds freight for past damage?",
    answer:
      "Within limits. Under the Carriage by Road Act, 2007, a common carrier has rights around unpaid charges and consignee default (see Section 15 with counsel). Freezing current freight bills to recover a disputed past debit can trigger retention on ongoing consignments. Write a reconciliation window into the master services agreement before any set-off.",
  },
  {
    question: "What is the difference between an Act of God and ordinary monsoon damage?",
    answer:
      "An Act of God (vis major) is an extraordinary natural event that human foresight could not reasonably prevent. Ordinary monsoon rain is not an Act of God. Carriers operating in the Indian monsoon season are expected to use sound weather protection such as sealed bodies or double tarpaulins when the policy and contract require them.",
  },
  {
    question: "Does electronic proof of delivery hold the same weight as a stamped lorry receipt for claims?",
    answer:
      "Digital records can be valid under the Information Technology Act, 2000. For a transit damage claim against a transporter in India, electronic proof of delivery must carry time-stamped geo-coordinates, photographs, and qualified remarks. A generic 'delivered' click is weak evidence. See the [ePOD, FASTag, and e-Way Bill guide](/blog/epod-fastag-eway-bill-billing-india).",
  },
  {
    question: "Why do insurers demand a damage certificate from the carrier?",
    answer:
      "A damage certificate is an admission of transit-period fact by the bailee who had custody of the goods. It also supports subrogation under Section 79 of the Marine Insurance Act, 1963 after the insurer pays the claim.",
  },
  {
    question: "Does 'subject to verification' on the lorry receipt protect the plant?",
    answer:
      "Usually not. If damage or shortage is visible at the dock, write specific package counts, wet marks, seal breaks, and weighbridge figures on the delivery copy before you sign.",
  },
  {
    question: "How do you avoid the Rule 12 ten-times-freight liability cap?",
    answer:
      "Use the declared-value and higher-risk-rate path under Sections 10 and 11 with a registered common carrier, and pay the agreed charge. Leaving the value blank to avoid paperwork is how a Rs 42 lakh machine can collapse to about ten times freight under the Rule 12 model.",
  },
  {
    question: "Is a local truck-stand broker a common carrier under the Carriage by Road Act 2007?",
    answer:
      "Often no. Many commission agents (dalal) only arrange the truck. Statutory liability and damage certificates usually sit with the registered common carrier that issues the goods receipt. Prefer contracted carriers for industrial lanes. Start from [contract logistics](/logistics/contract-logistics).",
  },
  {
    question: "What should we do for visible damage versus damage found after unpacking?",
    answer:
      "Note visible damage on the delivery copy before signing. For non-apparent damage, send written notice quickly (many plants use about a six-day practice window under the lorry receipt reverse, master agreement, or policy) and still watch the Section 16 180-day suit-notice clock from the booking date.",
  },
  {
    question: "Is open delivery a road-transport statute in India?",
    answer:
      "The named Open Delivery Rules, 1990 apply to railways. On road freight, demand a joint survey, qualified remarks on the lorry receipt, and a carrier damage or shortage certificate. Do not wait for a railway form that will never arrive.",
  },
  {
    question: "What weighbridge shortage tolerance should a freight contract use?",
    answer:
      "Make it commodity-specific. Workshop bands: about 0.20% of net mass for many packaged industrial lanes, and about 0.25% to 0.50% for some bulk or moisture-sensitive materials. Always define the net-weight basis, stamped weighbridge slip (kanta parchi) rules, and re-weighment procedure.",
  },
] as const;

export const transitDamageSections: readonly BlogSection[] = [
  {
    heading: "Start here: receiving dock vs procurement checklist",
    paragraphs: [
      "Skip the statute chapter if a truck is already at the gate. Use the two lists below. Dock teams protect evidence in the next hour. Procurement and risk protect recovery before the next booking.",
      "Print the one-page pack if you want both lists plus the 24-hour clock on one sheet: [transit damage claim checklist (PDF)](/downloads/transit-damage-claim-checklist.pdf).",
    ],
    exhibits: transitDamageExhibits["Start here: receiving dock vs procurement checklist"],
  },
  {
    heading: "The three layers of cargo protection: law, contract, and insurance",
    paragraphs: [
      "In Indian industrial freight - steel, engineering machinery, packaged chemicals, cement, and electronics - a corridor often fails in public when a multi-axle trailer arrives with torn tarpaulins, crushed crates, broken container seals, or a weighbridge net shortage of a few hundred kilograms.",
      "That moment is when a transit damage claim against the transporter begins, whether anyone has written the claim letter yet or not.",
      "Halt the clean stamp. The receiving supervisor should refuse to sign a clean lorry receipt (bilty). The driver will push for an unqualified signature so he can leave. The booking commission agent (dalal) will blame factory loading or highway vibration. Finance may deduct cargo value from the freight invoice and then face a placement boycott.",
      "The marine surveyor later rejects the insurance claim when someone signed a clean proof of delivery or missed the insurer notice window.",
      "Unrecovered transit damage and unaccounted shortage can sit in a wide workshop band around 0.8% to 2.4% of manufactured revenue on poorly controlled corridors. Treat that band as a prompt to measure your own transit-loss ratio. It is not a national statistic and not a ZAFTYS audit.",
      "Clean financial recovery needs three layers that work together: statutory common-carrier law under the Carriage by Road Act, 2007; the commercial master services agreement with the transporter; and inland marine cargo cover under the Marine Insurance Act, 1963. Plants that rely only on insurance, or only on freight debit notes, discover the gap when the lorry receipt is clean and the broker has disappeared.",
      "In the unorganised spot sector, plants often book through roadside commission agents rather than a registered transport company. The broker may not be the common carrier under Section 3. The truck owner may lack the balance sheet for a multi-lakh debit. Surveyors ask for a damage certificate and get silence.",
      "Many inland transit open policies also warrant carriage by registered carriers, so informal booking can breach cover before the survey starts. Fine-print 'owner's risk' stamps do not automatically wipe statutory accountability - confirm with counsel - but they do show why industrial lanes belong on a written agreement with a registered common carrier. For capacity model choice, see the [spot market vs dedicated fleets guide](/blog/spot-market-vs-dedicated-fleet-india). Put liability on paper through [contract logistics](/logistics/contract-logistics).",
    ],
    exhibits: transitDamageExhibits["The three layers of cargo protection: law, contract, and insurance"],
  },
  {
    heading: "Carriage by Road Act 2007 and Rule 12 carrier liability caps",
    paragraphs: [
      "For over a century, freight liability in India sat under the Carriers Act, 1865. Parliament enacted the Carriage by Road Act, 2007 (Act No. 41 of 2007), followed by the Carriage by Road Rules, 2011. The Act is the legal backbone for every serious transit damage claim against a road common carrier.",
      "Plant teams still say lorry receipt (bilty). The statute speaks of goods forwarding notes and goods receipts.",
      "Section 3 requires registration before a person engages in the business of a common carrier. Section 8 covers the goods forwarding note. Section 9 covers the goods receipt. Sections 10 and 11 set liability and the higher-risk-rate path when cargo value is declared. Section 16 blocks suits without written notice of loss or damage within 180 days from the date of booking.",
      "Rule 12 of the 2011 Rules is where the ten-times-freight money cap appears when the value path is unused. Confirm every paraphrase against India Code before a demand letter leaves the plant.",
    ],
    subsections: [
      {
        heading: "Form 7, Form 8, and why declared value starts at booking",
        paragraphs: [
          "Value declaration starts when the truck is booked, not when finance argues after the loss. The Goods Forwarding Note (Form 7) is where the consignor declares value and hazardous flags. The Goods Receipt (Form 8) is what the common carrier issues on acceptance and is prima facie evidence of the packages and weight stated.",
          "Hazardous goods often use red-corner printing under the Rules - confirm the current form schedule.",
          "Leaving 'declared value' blank to avoid a small ad-valorem or higher-risk charge is how Rule 12 quietly consumes capital equipment. A precision CNC machine worth Rs 42,00,000 moving on Rs 48,000 freight models to about Rs 4,80,000 under a ten-times-freight reading when the value path was skipped. The uncovered Rs 37,20,000 is not a mystery. It is paperwork the plant chose not to complete.",
        ],
      },
      {
        heading: "Section 16: 180 days from booking, not from an informal chat",
        paragraphs: [
          "Section 16 is clear: no suit or other legal proceeding against a common carrier for loss or damage unless notice in writing was served within 180 days from the date of booking. Do not invent a 'booking or delivery' alternative unless counsel confirms a different reading of the bare Act.",
          "An informal message to a broker is weak practice. The notice should identify the consignment, the lorry receipt or goods receipt number, the booking date, and the quantum of damage, and should travel by a method that leaves a trail. Put Form 7 and Form 8 discipline on a registered carrier agreement through [contract logistics](/logistics/contract-logistics).",
        ],
      },
    ],
    exhibits: transitDamageExhibits["Carriage by Road Act 2007 and Rule 12 carrier liability caps"],
  },
  {
    heading: "Physical damage vs weighbridge shortage on Indian corridors",
    paragraphs: [
      "Industrial transit loss splits into physical cargo damage and weight shortage - the mass gap between dispatch and receiving weighbridges (kanta). Mixing both into one debit note confuses insurance recovery, contract recovery, and plant quality.",
      "The failure modes below are the patterns plants see most often on industrial corridors. They are a briefing aid for the receiving dock, not a published national claims index and not a ZAFTYS audited share table.",
      "Water ingress hits packaged cement, cold-rolled coils, paper reels, bagged chemicals, and electronics. Open bodies with a single torn tarp pull monsoon spray under the edge. Container road legs leak through damaged door gaskets and roof rust. Transit water damage from weak tarpaulins, and double-tarpaulin warranty failures, show up repeatedly in surveyor photographs. For sealed-box road legs, see [container transportation](/logistics/container-transportation).",
      "Impact and lashing failure hit machinery, structural steel, dies, and coiled steel when coir rope or thin wire replaces Grade-70 chains and load binders. See [steel and metals](/industries/steel-metals) and [industrial freight](/logistics/industrial-freight).",
      "Theft and bag slitting remain common on long hauls with unsecured overnight stops and cut bolt seals with weight substitution. Scale drift and moisture show up when packaging looks intact but net weights disagree - especially on clinker, washed coal, fly ash, and agro commodities. See [cement logistics](/industries/cement).",
      "Axle and weighbridge operating detail for coil corridors sits in [steel coil transport basics](/blog/steel-coil-transport-basics). For corridor design and body-class fit, start with [industrial freight](/logistics/industrial-freight).",
    ],
    exhibits: transitDamageExhibits["Physical damage vs weighbridge shortage on Indian corridors"],
  },
  {
    heading: "Weighbridge shortage tolerance in Indian freight contracts",
    paragraphs: [
      "One of the noisiest fights between plant dispatch and transporters is a destination net weight that is hundreds of kilograms light while the packing looks fine. Plants call this a weighbridge shortage or weighbridge difference (kanta difference). The printed slip is a weighbridge slip (kanta parchi).",
      "Write the shortage tolerance into the freight contract before the argument starts.",
      "Industrial weighbridges sit under the Legal Metrology Act, 2009 and the Legal Metrology (General) Rules, 2011. A commercial weighbridge slip should show serial number, vehicle number, gross, tare, net, timestamps, and preferably verification identity. A slip from an unstamped bridge is weak in billing and insurance disputes.",
      "Compare net weights at both ends. Keep original slips with the lorry receipt. If the gap exceeds the contract band, call for re-weighment at an agreed verified bridge. Match lorry receipt weight fields to the slip - do not estimate.",
      "A workshop band of about plus or minus 20 to 50 kg on a multi-axle truck is a translation of verification scale intervals, not a substitute for the stamped certificate on that bridge. Two bridges can show about 0.1% to 0.2% drift with no cargo removed. Commodity contracts often set shortage tolerance around 0.25% to 0.50% of invoiced net for bulk - confirm per material.",
      "Write the billable shortage as a formula in the master services agreement: billable shortage equals the greater of zero and the origin-to-destination net gap minus origin net times (scale tolerance plus moisture factor). Only billable shortage times invoice rupees per tonne becomes the freight debit. That stops unfair carrier punishment for scale noise without giving away pilferage. Related cost framing sits in [5 hidden cost leaks](/blog/5-hidden-cost-leaks-heavy-industrial-freight-tms-3pl-guide).",
    ],
    exhibits: transitDamageExhibits["Weighbridge shortage tolerance in Indian freight contracts"],
  },
  {
    heading: "Clean vs qualified lorry receipt (bilty) endorsements",
    paragraphs: [
      "The lorry receipt (bilty) is the goods receipt in plant practice and the document insurers and carriers read first. The delivery-copy endorsement decides whether carrier recovery and the marine claim stay alive. A clean versus qualified lorry receipt endorsement is not stationery. It is evidence.",
      "A clean endorsement - 'received in good condition' - creates a strong presumption of sound delivery. Damage found two days later in the warehouse is then framed as post-unloading damage.",
      "An ambiguous 'subject to verification' stamp without specifics is commercially weak when wet crates were visible at the dock. A qualified endorsement names broken crates, torn tarps, seal numbers, and weighbridge shortage, and points to a joint survey. That is the actionable path for clean claims.",
      "Halt unload when damage is visible. Photo the plate, tarp, seals, and cargo in place. Write the damage on the delivery copy before anyone signs. For damage that is not apparent at handover, many carrier and insurance practice notes expect written notice within about six days - confirm against the lorry receipt reverse, master agreement, and policy - while Section 16's 180-day suit-notice clock still runs from booking.",
      "Named open-delivery procedure under the 1990 Rules is railway law. On road freight, run a joint survey: halt unloading, call the transporter branch, inventory together, execute a joint inspection record (panchnama), qualify the lorry receipt, and obtain a damage or shortage certificate. That certificate is what inland transit open-policy claim packs expect. Capture photographs and qualified remarks in [ZAFTYS TMS](/zaftys-tms) rather than only in chat threads.",
    ],
    exhibits: transitDamageExhibits["Clean vs qualified lorry receipt (bilty) endorsements"],
  },
  {
    heading: "Marine cargo insurance ITC-A claim process and policy pitfalls",
    paragraphs: [
      "Enterprise plants usually buy an inland transit open declaration policy. Cover is not automatic recovery. Inland Transit Clause A (ITC-A) is all-risks language for ordinary transit, still subject to packing, inherent vice, and wilful misconduct exclusions as worded. Inland Transit Clause B (ITC-B) is named perils only and often leaves rain, theft, and lashing slips outside cover.",
      "Shortage claims are commonly discussed under ITC-A style cover - read your schedule.",
      "Many repudiations are warranty failures, not mystery damage. Double-tarpaulin warranties fail on a single torn tarp photograph. Registered-carrier warranties fail on informal truck-stand booking. Twenty-four to forty-eight hour notice warranties fail when the plant holds the truck four days before unpacking. A working marine cargo insurance claim process in India starts with immediate intimation, not with a month-end spreadsheet.",
      "When the insurer pays, subrogation under Section 79 of the Marine Insurance Act, 1963 lets the underwriter step into the shipper's shoes against the carrier. The shipper hands a letter of subrogation, the qualified lorry receipt, the joint inspection record, and the carrier notice. A master agreement that waives all recovery rights against the transporter can void marine recovery because the insurer cannot subrogate. Do not sign that waiver to make the freight look cheaper.",
    ],
    exhibits: transitDamageExhibits["Marine cargo insurance ITC-A claim process and policy pitfalls"],
  },
  {
    heading: "24-hour transit damage claim and surveyor SOP",
    paragraphs: [
      "A standard 24-hour clock keeps both insurance and carrier accountability alive. At gate-in, security inspects seals, tarpaulins, and body condition. If seals are broken or the body is crushed, do not open the container blindly.",
      "Within two hours, capture geo-tagged evidence: registration plate, tarp, seal numbers, and cargo in place. Prefer transport management system or electronic proof of delivery capture over a disappearing chat album.",
      "Within four hours, send formal written intimation to the transporter booking and delivery branches and to the marine claims desk, and start the monetary claim notice on the carrier that many policies require to preserve subrogation. Within twelve hours, aim for joint survey with an IRDAI surveyor and transporter representation. By twenty-four hours, close the documentary pack: joint inspection record, qualified lorry receipt remarks, and damage or shortage certificate.",
      "If the driver refuses to sign qualified remarks, do not detain the person illegally. Keep the vehicle in the bay under plant legal procedure, execute a two-party inspection record with independent witnesses noting the refusal, and email the transporter head office with photographs and weighbridge slips stating acceptance under protest in damaged condition.",
      "Download the one-page checklist that merges dock steps, the 24-hour clock, and the documents surveyors ask for: [transit damage claim checklist (PDF)](/downloads/transit-damage-claim-checklist.pdf). Digital proof discipline pairs with the [ePOD billing guide](/blog/epod-fastag-eway-bill-billing-india).",
    ],
    exhibits: transitDamageExhibits["24-hour transit damage claim and surveyor SOP"],
  },
  {
    heading: "Worked financial case: machinery damage on an industrial corridor",
    paragraphs: [
      "The numbers below are a teaching workshop, not a ZAFTYS audited claim file.",
    ],
    subsections: [
      {
        heading: "Composite claim vignette: what the plant almost lost",
        paragraphs: [
          "Composite from corridor practice (details changed). An engineering OEM moved a packed machining centre from a western India plant to an eastern fabricator on a multi-axle open body booked through a truck-stand broker. Value was left blank on the lorry receipt to 'save the higher-risk charge.' Near the midpoint, lashing failed. The crate shifted into the side body.",
          "Receiving signed 'subject to verification' while wet packing and a broken seal were visible. Photos stayed in a driver's WhatsApp chat that was later deleted. The marine desk repudiated on warranty and clean-delivery grounds. The Rule 12 model capped useful carrier recovery near ten times freight. Finance wrote off most of the machine after salvage.",
          "The same corridor, six months later, moved the replacement unit on a registered common carrier, declared value on Form 7, ITC-A cover, gate photos in the TMS, and a qualified lorry receipt with a joint inspection record. The claim pack survived the surveyor. The gap was procedure, not luck.",
        ],
      },
      {
        heading: "Scenario ledger: informal dispatch vs declared-value procedure",
        paragraphs: [
          "One 5-axis CNC milling machine, invoice Rs 48,00,000, moves from Chakan (Pune) to Jamshedpur on about 1,620 km. Agreed freight is Rs 72,000. Near Raipur, lashing fails. The machine tips against the side body. Surveyor net loss after Rs 6,00,000 salvage is Rs 42,00,000.",
          "Scenario A is informal dispatch: value blank on the lorry receipt, local truck-stand broker, warranties shaky, notice late. The Rule 12 model caps carrier exposure near 10 times Rs 72,000, or Rs 7,20,000. Insurance repudiates in the workshop assumption. Net write-off risk sits near Rs 34,80,000 after the thin carrier recovery.",
          "Scenario B is a registered common carrier, value declared at Rs 48,00,000, ITC-A cover, 24-hour survey, and joint inspection at Jamshedpur. The insurer pays Rs 42,00,000 less a Rs 50,000 deductible, or Rs 41,50,000 in the workshop. Freight offset and subrogation handle the balance path. Most exposure is secured. Do not treat any fixed recovery percentage as a ZAFTYS guarantee.",
          "The gap between A and B is declared value, a registered carrier, a clean operating procedure, and documents that survive a surveyor. Rate-card context for the freight line sits in the [truck freight rates guide](/blog/truck-freight-rates-india-cost-rate-benchmarking-guide). To review liability clauses on the lanes you actually run, [contact the team](/contact).",
        ],
      },
    ],
    exhibits: transitDamageExhibits["Worked financial case: machinery damage on an industrial corridor"],
  },
  {
    heading: "Master transporter contract clauses: enforceable liability provisions",
    paragraphs: [
      "Procurement must put carrier liability language in the annual master services agreement, not only in a chat-based rate. The clauses below are workshops for counsel to adapt. They are not legal advice and not a ZAFTYS tariff.",
      "First, the carrier warrants it is a registered common carrier under the Carriage by Road Act, 2007, and that Form 7, invoice, and e-Way Bill value feed the Section 10 and Section 11 liability path as agreed. Second, weighbridge differences up to the written net-mass band are treated as scale variance; shortage above the band debits pending freight after reconciliation.",
      "Third, qualified lorry receipt remarks and a damage or shortage certificate are due within 48 hours of joint survey, without freight prepayment as a precondition. Fourth, nothing waives shipper or underwriter subrogation. Fifth, seal numbers, photographs, and electronic proof of delivery sit on contracted trips in the agreed transport management system workflow.",
      "Owned fleet and labeled network overflow keep their labels through the bill. A liability clause does not turn a partner truck into a company truck. For accountable industrial carriage, start with [contract logistics](/logistics/contract-logistics).",
    ],
    exhibits: transitDamageExhibits["Master transporter contract clauses: enforceable liability provisions"],
  },
  {
    heading: "The 20-point industrial cargo protection audit matrix and FAQs",
    paragraphs: [
      "Score each check from 1 (unprepared or manual) to 5 (fully standardised and enforced). Four blocks share weight equally: statutory contracting, dispatch fitness, receiving lorry receipt discipline, and insurance plus shortage reconciliation.",
      "Eighty to one hundred points means the recovery path is disciplined. Fifty to seventy-nine means dock shortcuts still kill claims. Below fifty means unrecovered shrinkage is a recurring profit-and-loss line.",
      "Run the matrix in a room with procurement, finance, dispatch, and the receiving plant. Ask who owns declared value on the goods forwarding note, who is barred from signing a clean lorry receipt on damaged cargo, and who files Section 16 notices within 180 days of booking. The FAQ set below covers the questions finance and logistics heads ask after the first rejected marine claim.",
      "When the audit shows weak registered-carrier coverage, start with [contract logistics](/logistics/contract-logistics). When the gap is evidence on the trip, start with [ZAFTYS TMS](/zaftys-tms). When the cargo is steel, cement, or container road, use the matching industry or service page rather than a generic logistics-company search.",
      "If you want a liability-clause review on the corridors you actually run, [contact ZAFTYS](/contact) or send the current shortage clause and one rejected claim pack on WhatsApp.",
    ],
    exhibits: transitDamageExhibits["The 20-point industrial cargo protection audit matrix and FAQs"],
  },
];
