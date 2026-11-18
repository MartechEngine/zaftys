import type { BlogSection } from "@/lib/blog-data";
import { container32ftExhibits } from "@/lib/blog-exhibits-32ft-container";

export const container32ftFaqs = [
  {
    question: "Can a 32-foot container truck legally carry 20 tonnes of cargo in India?",
    answer:
      "Almost never as a length-class promise. Available payload = registered GVW minus actual tare (subject to axle limits). Use the multi-OEM evidence table in this guide (Tata, Ashok Leyland, Eicher rows checked by ZAFTYS Intelligence) - publish only manufacturer-stated figures and leave blanks as 'Not stated in the cited source.' Twenty tonnes usually implies a heavier multi-axle / tractor-trailer combination. Confirm RC GVW and measured tare. Axle law detail: [India axle load and GVW limits](/blog/india-axle-load-gvw-limits-heavy-freight).",
  },
  {
    question: "What is the difference between a 32-ft SXL and a 32-ft Multi-Axle (MXL) truck?",
    answer:
      "Both are roughly 32 feet long closed boxes in commercial desk language. SXL usually means a single rear-axle (2-axle / 6-wheeler) story; MXL usually means a multi-axle / tandem rear group (3-axle / 10-wheeler) story. Those labels are commercial, not universal OEM standards with fixed tare and payload. From the dock they look similar. On the rate card, toll class, and highway weighbridge they are different vehicles. Always write axle class and RC GVW on the indent - never '32ft' alone.",
  },
  {
    question: "How do you calculate cubic feet (CFT) for a 32-ft container?",
    answer:
      "Measure usable internal length, width, and height in inches, multiply them, and divide by 1,728. Hypothetical arithmetic: 31.5 x 7.8 x 8.0 ft = 1,965.6 CFT geometric volume (~1,966 CFT). That is not usable loading volume - doors, wheel housings, lining, and restraints reduce practical capacity. High Cube internals near 9.5 to 10.0 ft height often land nearer 2,300 to 2,450 CFT on paper. Do not trust brochure stickers that ignore wheel-arch intrusion.",
  },
  {
    question: "When should a desk choose 32-ft SXL versus 32-ft MXL?",
    answer:
      "Use density: total cargo kilograms divided by usable CFT. Workshop rule of thumb - under about 4.5 kg/CFT (foam, snacks, empty bottles, light packaging) usually wants SXL; above about 6.0 kg/CFT (oil drums, paint, fasteners, dense liquids) usually needs MXL. Between 4.5 and 6.0, quote both and recompute after tare weigh. Hiring MXL for cube-out cargo is classic dead-freight.",
  },
  {
    question: "Why are 32-foot High Cube (HQ) container trucks priced higher than standard height containers?",
    answer:
      "HQ boxes buy usable cubic feet - often moving from ~1,966 CFT geometric examples toward ~2,300 to 2,450 CFT on paper - but they need low-deck chassis packages, low-profile tyres, and tighter CMVR height discipline. MoRTH CMVR Chapter V orientation uses 3.8 m general, 4.20 m tractor-trailer goods vehicle, and 4.52 m for specified laden ISO / fabricated containerized exceptions - not every 32-ft box qualifies for 4.52 m. Capital cost, specialised fleet scarcity, and higher empty tare can all lift the trip rate. Pay the premium only when stack height or cube-out density actually needs the extra headroom.",
  },
  {
    question: "How many standard wooden pallets can fit inside a 32-foot container?",
    answer:
      "For 1200 x 1000 mm industrial pallets, plan on 16 in a straight side-by-side / pinwheel floor layout (8 rows of 2). Nested turn arrangements can reach 18 when clear internal width allows. High Cube double-stacking can reach 32 to 36 pallets only if crush strength and legal payload both survive. Measure clear internals; brochure widths lie after lining and corrugation.",
  },
  {
    question: "What is the statutory height limit for closed container trucks under CMVR Rule 93?",
    answer:
      "CMVR overall-height rules are category-based. The MoRTH Chapter V consolidated text orients around 3.8 m general vehicle height, 4.20 m for tractor-trailer goods vehicles, and 4.52 m for a laden trailer carrying an ISO Series 1 freight container or a fabricated containerized motor vehicle when that exception applies. Do not claim every domestic 32-ft enclosed box is automatically legal at 4.52 m. Confirm RC, body-builder plate, live consolidated rule, and route clearances before specifying a nominal '10-ft' HQ box. Primary source: [MoRTH CMVR Chapter V PDF](https://morth.gov.in/sites/default/files/CMVR-chapter5.pdf). Body construction practice also references AIS-093.",
  },
  {
    question: "What fine applies if a 32-ft SXL is overloaded under Indian motor vehicle law?",
    answer:
      "Section 113 of the Motor Vehicles Act sets weight limits and limitations on use. Section 194 sets the penalty for contravening those limits - read the current [Motor Vehicles Act bare text](https://www.indiacode.nic.in/handle/123456789/1797?locale=en) and state compounding schedules before quoting a rupee figure in a legal memo. Ops briefings often cite a base-plus-per-tonne framing; do not treat those rupees as verified statutory text in this guide. Offloading delays and detention still apply when limits are breached. Visual space left in the box is not a defence.",
  },
  {
    question: "How should a 32-ft container load be posted on a digital marketplace?",
    answer:
      "Never publish only '32ft container.' Write the axle class and height variant explicitly - for example '32ft SXL HQ 2200 CFT' or '32ft MXL standard height' - plus pin codes, commodity, net kg, and loading window. Wrong-language posts attract the wrong chassis. Matching context: [online truck load marketplaces](/blog/online-truck-load-marketplaces-india-freight-apps-guide); product path: [TranZfort](https://www.tranzfort.com).",
  },
] as const;

export const container32ftSections: readonly BlogSection[] = [
  {
    heading: "The workhorse of Indian high-cube logistics",
    paragraphs: [
      "Composite from corridor practice (details changed). A Pune packaging dispatcher booked 'one 32-foot container' for folded cartons to Noida because that was the phrase every broker understood. The truck that arrived was a 10-wheeler MXL. The cargo cubed out at 6.8 tonnes. The plant paid a 28-tonne chassis rate for air. The next week the same desk forced an SXL and tried to load 11 tonnes of denser SKUs 'because the box is big.' The highway weighbridge disagreed. Same length label. Two opposite failures.",
      "The 32-foot closed container became the workhorse of Indian high-cube logistics because open wooden trucks failed the modern cargo brief. FMCG secondaries, white goods, pharmaceuticals, packaging materials, automotive plastic components, and retail e-commerce need weather protection, pilferage resistance, tamper-evident bolt sealing, and dock-to-dock pallet loading that a tarpaulin cannot honestly provide.",
      "Enclosed steel or aluminium bodies plus rear double doors created a standardised unit that warehouse teams could plan around. That standardisation is valuable. It is also dangerous when language collapses. On Indian desks, '32 feet' is routinely treated as a payload promise. It is only a length class. The expensive confusion is assuming one weight capacity while the yard quietly mixes 2-axle SXL and 3-axle MXL chassis under identical box silhouettes.",
      "Body-type selection sits upstream of rate shopping. If you are still choosing among open, container, flatbed, and bulker for the SKU family, start with [planning industrial shipments](/blog/planning-industrial-shipments). This dossier assumes you already know you need a closed 32-ft box - and need to stop hiring the wrong axle under it.",
    ],
    exhibits: container32ftExhibits["The workhorse of Indian high-cube logistics"],
  },
  {
    heading: "32-foot SXL vs 32-foot MXL: engineering architecture",
    paragraphs: [
      "Deconstruct the vehicle the way a body builder and an RTO inspector do: chassis GVW first, enclosed-body tare second, net legal payload last. Marketing photos that show only the box are how procurement gets lied to.",
      "Formula first: available payload = registered GVW minus actual tare, subject to axle-load limits and other legal constraints. Keep three measurements separate: OEM deck length, internal usable cargo dimensions, and legal payload for that configuration.",
      "Model-specific OEM evidence beats folklore. The exhibit table below lists manufacturer-published values checked by ZAFTYS Intelligence on 19 Nov 2026 for Tata (Azura T.19 orientation, Ultra Ex 1918.T, SIGNA 3525.T, SIGNA 4932.T), Ashok Leyland Haulage 4x2 GVW 19T, and Eicher Pro 3015 L32. Where payload or unladen weight is blank, the cited public page did not state it - write 'Not stated in the cited source' rather than inventing a number. Deck length is not usable internal cargo cube. Nearby OEM note: the official [Azura 1918 PDF](https://trucks.tatamotors.com/assets/trucks/files/2026-01/azura-range.pdf) publishes GVW 18,500 kg and payload 12,600 kg but only 17-24 ft load-body options - so it is not entered as a 32-ft row.",
      "SXL and MXL remain useful commercial labels when posting loads - single-axle vs multi-axle closed boxes - but this guide does not publish universal 7.0-8.5 T / 14.5-16.2 T national bands as facts. Those ranges need matching configuration-specific OEM or RC evidence for each row. Until then, calculate from the vehicle in front of you.",
      "Tare is not a constant. Steel corrugated sheets, aluminium composites, and PUF panels change empty weight by tonnes on the same external length. The only honest payload number is GVW minus measured empty weight on your weighbridge - expanded in [axle load and GVW limits](/blog/india-axle-load-gvw-limits-heavy-freight).",
    ],
    exhibits: container32ftExhibits["32-foot SXL vs 32-foot MXL: engineering architecture"],
  },
  {
    heading: "Internal dimensions, height variants, and cubic feet mathematics",
    paragraphs: [
      "Volume is where high-cube shippers live. Hypothetical geometric example: 31.5 ft internal length by 7.8 ft width by 8.0 ft height = 1,965.6 CFT (~55.6 CBM). That is geometric volume, not usable loading volume - door frames, lining, wheel housings, and restraints steal cube. High Cube (HQ) variants push internal height toward 9.5 to 10.0 ft and land nearer 2,300 to 2,450 CFT (~65 to 69 CBM) on paper.",
      "Compute CFT the way the warehouse should: convert internal inches, multiply length by width by height, divide by 1,728. Do not trust brochure '2,500 CFT' stickers that ignore wheel-arch intrusion, plywood lining, and door-frame loss. The formula board in this chapter is the desk calculator.",
      "CMVR height categories bind the dream of endless HQ. MoRTH Chapter V orientation: 3.8 m general vehicle height; 4.20 m tractor-trailer goods vehicle; 4.52 m for specified laden ISO Series 1 / fabricated containerized exceptions when that text applies. Do not treat every domestic 32-ft enclosed box as automatically eligible for 4.52 m. Confirm RC, body plate, live consolidated rule, and route clearances. Primary source: [MoRTH CMVR Chapter V PDF](https://morth.gov.in/sites/default/files/CMVR-chapter5.pdf). A nominal 10-foot box on a high chassis with standard tyre radius will still violate the live envelope or scrape toll plaza canopies and highway overpasses.",
      "That is why serious HQ fleets specify low-deck chassis and low-profile tyre packages - commonly 295/80 R22.5 or 275/70 R22.5 class - to keep the roof legal. Height is an engineering package, not a body-builder vanity option. Port and hinterland container context beyond domestic 32-ft boxes sits in [container trucking logistics India](/blog/container-trucking-logistics-india).",
    ],
    exhibits: container32ftExhibits["Internal dimensions, height variants, and cubic feet mathematics"],
  },
  {
    heading: "The physics of cube-out vs weigh-out",
    paragraphs: [
      "Every closed-body dispatch is a competition between air and mass. Cube-out means the container's physical volume is full while total cargo mass remains well below legal carrying capacity. Weigh-out means cargo mass has hit the GVW / axle cap while cubic space remains empty. Hiring decisions that ignore which limit binds first are how dead-freight and Section 113 overload / Section 194 fine exposure are born.",
      "Critical density is the selection engine. Density equals total cargo kilograms divided by usable internal cubic feet. Workshop SXL threshold: about 8,000 kg over 2,000 CFT equals roughly 4.0 kg per cubic foot (~141 kg/CBM). Workshop MXL threshold: about 15,000 kg over 2,000 CFT equals roughly 7.5 kg per cubic foot (~265 kg/CBM).",
      "Decision rule for the wall. If cargo density sits under about 4.5 kg/CFT - foam, packaged snacks, empty bottles, plastic bumpers, light packaging - SXL is usually mandatory; hiring MXL pays for axle capacity the cube cannot use. If density sits above about 6.0 kg/CFT - lubricating oil drums, paint buckets, automotive fasteners, dense liquids - MXL is usually mandatory; forcing SXL creates immediate highway overload exposure.",
      "Between 4.5 and 6.0 kg/CFT, quote both, recompute after tare weigh, and check whether HQ height changes pallet stack count. Related mode choice - when even a right-sized FTL container loses to PTL on tiny consignments - sits in [FTL vs PTL](/blog/ftl-vs-ptl-freight-services-india-cost-break-even-guide). Dead-freight as a cost leak is also framed in [5 hidden cost leaks](/blog/5-hidden-cost-leaks-heavy-industrial-freight-tms-3pl-guide).",
    ],
    exhibits: container32ftExhibits["The physics of cube-out vs weigh-out"],
  },
  {
    heading: "Pallet loading mathematics and floor space optimization",
    paragraphs: [
      "Indian industrial logistics mostly plans on 1200 x 1000 mm (48 x 40 inch) pallets. Euro 1200 x 800 mm units appear in some automotive and retail networks. The floor geometry inside a 32-foot box is tighter than brochure drawings: usable length near 9,600 mm and usable width near 2,380 mm after corrugation and lining.",
      "Straight side-by-side or pinwheel layouts with 1200 x 1000 mm pallets typically yield exactly 16 floor positions - eight rows of two. Nested turn arrangements can reach 18 when clear width approaches 2,400 mm. If your lined width is 2,350 mm, stop promising 18 on the sales call.",
      "Vertical double-stacking is where HQ earns its keep - and where crush failures begin. When packaging crush-test strength allows, a 32-ft HQ can hold 32 to 36 pallets. That number is worthless if bottom cartons collapse or if total mass exceeds SXL or MXL legal payload. Height without strength is expensive air.",
      "Transit damage risk from poor stack design is not a separate topic for later. Seal the planning loop with packing and claim hygiene from [transit damage and shortage claims](/blog/transit-damage-shortage-cargo-insurance-india-carrier-liability-guide) when the cargo is crush- or water-sensitive.",
    ],
    exhibits: container32ftExhibits["Pallet loading mathematics and floor space optimization"],
  },
  {
    heading: "Regulatory compliance: axle weights, CMVR norms, and weighbridge traps",
    paragraphs: [
      "Section 113 of the Motor Vehicles Act is the trap that catches 'the box still had space' loading. A factory supervisor who puts about 11 tonnes into a 32-ft SXL is not using free cube. That mass routinely exceeds the single rear drive axle limit even when visual space remains above the cargo. Highway RTO weighbridges exist to find exactly that pattern.",
      "Statutory overloading consequences are cash and time. Section 194 sets the penalty for contravening Section 113 / 114 weight limits. Confirm the live Act text and state compounding schedules before quoting a rupee figure - this guide does not publish an unverified fine schedule as law. Offloading delays, detention, and customer OTIF damage still follow a roadside stop. Do not wait for counsel to install a gross weighbridge step in the SOP.",
      "CMVR Rule 93 also polices geometry. Rear body overhang framed under Rule 93(6) generally cannot exceed 60% of vehicle wheelbase. Illegal extensions of 32-ft boxes to 34-ft or 36-ft to steal cube are a favourite body-builder shortcut and an RTO impoundment magnet. AIS-093 body construction practice is the builder-side counterpart to those dimensional rules.",
      "MoRTH Notification S.O. 3467(E) axle-load ratings are the quantitative backbone for why SXL and MXL are not interchangeable. Full plant-facing explanation of axle groups, bridge formula thinking, and weighbridge SOPs sits in [Understanding India's axle load norms and GVW limits](/blog/india-axle-load-gvw-limits-heavy-freight).",
    ],
    exhibits: container32ftExhibits["Regulatory compliance: axle weights, CMVR norms, and weighbridge traps"],
  },
  {
    heading: "Worked financial case: packaging manufacturer Pune to Delhi corridor",
    paragraphs: [
      "Workshop only - not a ZAFTYS audited trip file. A corrugated box and packaging manufacturer dispatches from Chakan (Pune) to Greater Noida (Delhi-NCR), about 1,450 km. Consignment: 1,900 CFT of folded corrugated cartons at 6,800 kg (6.8 MT) actual weight. Density is about 3.6 kg/CFT - deep in cube-out territory.",
      "Model A: the desk erroneously hires a 32-ft MXL container. The transporter quotes Rs 78,000 because the rate card is built on 28 T chassis running costs, higher empty weight, and 3-axle / MAV toll class. The cargo never uses the extra payload. Model B: right-sized 32-ft SXL High Cube contracted via open matching at Rs 58,000 for the same cube and window.",
      "Reconcile landed cost, not sticker folklore. Fuel burn on a 3-axle chassis exceeds a 2-axle for the same light load. NHAI toll workshop bands used here - about Rs 5.20 per km for 2-axle commercial versus about Rs 6.35 per km for 3-axle MAV across 1,450 km - widen the gap further. Net: SXL saves about Rs 20,000 per trip (~25.6%). At two trucks weekly, that is roughly Rs 4.8 lakh annual recovery before you count fewer overload near-misses.",
      "The third failure mode in the waterfall is worse than oversizing: forcing ~12 MT onto an SXL 'to save freight.' Base trip plus Section 194 fine framing (for a Section 113 breach) and demurrage can land near Rs 89,000 - more expensive than the MXL you were trying to avoid, with legal risk attached. Rebuild diesel and standing-cost logic with the [truck freight rates guide](/blog/truck-freight-rates-india-cost-rate-benchmarking-guide) before locking either model into a contract annex.",
    ],
    exhibits: container32ftExhibits["Worked financial case: packaging manufacturer Pune to Delhi corridor"],
  },
  {
    heading: "Standard operating procedure: the 8-step container selection protocol",
    paragraphs: [
      "Plant dispatchers, warehouse leads, and transport procurement need one protocol that survives shift handover. Eight stages. No 'book any 32-footer.'",
      "Step 01: calculate total consignment mass in kilograms from actual scale tickets or verified SKU weights - not sales estimates. Step 02: calculate total consignment volume as the sum of package length times width times height in inches, divided by 1,728, to get total CFT. Step 03: compute average bulk density as total kg over total CFT. Step 04: determine axle requirement - density under ~4.5 kg/CFT leans SXL; density above leans MXL; grey band quotes both.",
      "Step 05: check vertical clearance and pallet stacking limits - decide whether 9.5-ft / 10-ft HQ is required and whether the applicable CMVR height category (3.8 / 4.20 / 4.52 m) and route clearances still hold on the available chassis. Step 06: publish the verified spec into TranZfort or ZAFTYS as '32ft SXL HQ' or '32ft MXL,' never as ambiguous '32ft container.' Step 07: at gate-in, inspect door gaskets, locking rods, and floor flatness before loading begins. Step 08: record tare weight, load, and apply a numbered bolt seal with photo on the trip record.",
      "Print the process board. When a timeline breaks - density skipped, RC GVW unread, seal missing - the exception is owned. Pair this SOP with gate-to-pay discipline in the [industrial TMS control stack](/blog/industrial-tms-control-stack-india).",
    ],
    exhibits: container32ftExhibits["Standard operating procedure: the 8-step container selection protocol"],
  },
  {
    heading: "How modern marketplaces and enterprise TMS streamline container sourcing",
    paragraphs: [
      "Wrong chassis thrives in vague language. Open marketplaces fix that only when the post is exact. On TranZfort, independent suppliers and factory phones publish free load cards with explicit container specifications - for example '32ft SXL HQ 2200 CFT' or '32ft MXL standard height' - so truckers who own the matching body can bid without a freight-market (mandi) translator. Listing labels do not guarantee legal compliance - still confirm RC GVW, measured tare, height category, and route clearances before loading.",
      "In-app chat keeps rate, advance, and loading window on one thread. Document vetting must include reading the commercial RC to confirm axle class and GVW before the dock opens. A beautiful 32-ft box on the wrong GVW class is still the wrong truck. Listing labels never guarantee compliance.",
      "High-volume manufacturers still need a web command centre. ZAFTYS TMS embeds volumetric calculation against sales-order manifests, recommends chassis class from SKU weight and cube, allocates dedicated high-cube fleets, and tracks door-to-door milestones with digital ePOD. Spot overflow published into TranZfort returns into the same ledger so finance does not reconcile two universes.",
      "That hybrid - marketplace precision for indie and surge capacity, TMS control for enterprise fleets - is the same architecture argued in the [online truck load marketplaces guide](/blog/online-truck-load-marketplaces-india-freight-apps-guide). Sizing science without sourcing discipline still leaves the plant paying for air.",
    ],
    exhibits: container32ftExhibits["How modern marketplaces and enterprise TMS streamline container sourcing"],
  },
  {
    heading: "The 20-point container sizing and fleet audit matrix and FAQs",
    paragraphs: [
      "Score the diagnostic with dispatch, warehouse, and fleet in one room. Rate each line 1 to 5 across chassis selection, documents, sourcing, and gate inspection. Skip equals 0. A team that still raises indents as '32ft container' without SXL/MXL has already failed the first control.",
      "Interpret by block. Strong chassis scores with weak gate scores still produce Section 113 near-misses. Strong marketplace posting with unread RC GVW still loads the wrong axle. Re-score after thirty days of tare-weigh data, not after the training lunch.",
      "The master specification matrix below compares 24-ft and 32-ft SXL/MXL standard and HQ variants on length, cube, GVW, tare, payload, toll class, and ideal cargo. Treat it as a workshop wall chart. Measure your empty fleet before you paste brochure CFT into a customer promise.",
      "FAQs cover the 20-tonne myth, SXL vs MXL differences, HQ price premiums, pallet counts, and CMVR height categories (3.8 / 4.20 / 4.52 m). Statutory orientation: MoRTH CMVR Chapter V; CMVR Rule 93; MoRTH S.O. 3467(E); Motor Vehicles Act Sections 113, 114, and 194; AIS-093. Confirm bare text before a demand letter or body-builder dispute.",
      "Next step: eliminate dead-freight by posting right-sized 32-ft specs on [TranZfort](https://www.tranzfort.com) (also [TranZfort marketplace](/network/tranzfort)) and running volumetric fleet allocation on [ZAFTYS TMS](/zaftys-tms).",
    ],
    exhibits: container32ftExhibits["The 20-point container sizing and fleet audit matrix and FAQs"],
  },
];
