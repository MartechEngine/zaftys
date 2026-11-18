import type { BlogSection } from "@/lib/blog-data";
import { vehicleVerificationExhibits } from "@/lib/blog-exhibits-vehicle-verification";

export const vehicleVerificationFaqs = [
  {
    question: "How do you verify a commercial vehicle RC online in India before loading?",
    answer:
      "Query live Vahan fields for maker/model, unladen tare, GVW, engine number, chassis number, fitness expiry, road tax, and goods permit status, then match those fields to the physical truck. Pair with Sarathi for driver licence class and status. Consumer apps can help a human read public fields, but plants should store timestamped API results in the weighbridge workflow. A laminated photocopy is not verification.",
  },
  {
    question: "What is the difference between a cloned registration number and a forged RC?",
    answer:
      "A cloned registration number copies the plate identity of a real, often compliant truck operating elsewhere - the highway may show two vehicles 'owning' one number. A forged RC is a fabricated document (laminate, smart-card lookalike, or PDF) that may invent particulars or spoof a verification QR. Clones often pass a casual Vahan glance if the genuine record is active; they fail chassis rubbing and FASTag trajectory checks. Forged RCs often fail live Vahan status, fitness, or permit fields. Run both digital and physical controls.",
  },
  {
    question: "What is BNS Section 316 for common carriers?",
    answer:
      "Section 316 of the Bharatiya Nyaya Sanhita, 2023 covers criminal breach of trust by a common carrier, wharfinger, or warehouse-keeper in the lineage formerly associated with IPC Sections 405/407 - punishable with imprisonment up to seven years and fine framing. Orientation only; counsel owns charging strategy. Historical FIRs may still cite IPC numbers. Preventative gate controls matter more than post-theft litigation as an operating plan.",
  },
  {
    question: "Can FASTag history help detect a cloned truck at the plant gate?",
    answer:
      "Yes as a plausibility sensor, not as a standalone legal proof. If the plate at your gate implies impossible speed or an opposite-corridor toll trail versus the declared inbound, treat the booking as a hard flag. FASTag confirms the highway footprint of a tag-chassis pair; chassis pencil rubbing still confirms the frame under the plate.",
  },
  {
    question: "Can a security guard rely on the mParivahan or NextGen Parivahan mobile app for gate entry?",
    answer:
      "Consumer apps help a human read public fields, but they are not a controlled enterprise audit trail. Plants need timestamped API results inside the TMS weighbridge workflow, hard-fail rules, and stored evidence for insurance. Guard-phone lookups can be skipped under congestion, spoofed by fake QR pages, or lost when the shift ends. Use mParivahan as a backup torch - not as the system of record.",
  },
  {
    question: "Why do insurance companies reject cargo claims when a truck driver has a non-commercial license?",
    answer:
      "Marine and cargo policies often carry warranties that carriage is by a properly licensed common carrier and that the vehicle/driver are legally authorised for the goods moved. A non-commercial licence, missing HGMV/TRANS class, or missing Hazchem endorsement can be treated as a due-diligence breach - especially after a diversion or transit loss. Surveyors will ask for gate evidence. Claim hygiene: [transit damage and cargo insurance](/blog/transit-damage-shortage-cargo-insurance-india-carrier-liability-guide).",
  },
  {
    question: "What should a plant manager do if the chassis pencil rubbing does not match the RC extract?",
    answer:
      "Stop the load. Do not negotiate at the bay. Photograph the rubbing, the frame location, the plate, and the driver; quarantine the vehicle outside the loading area; escalate to security and logistics heads; and treat the booking as failed placement. Re-source through verified capacity. Logging a 'known broker assurance' and loading anyway is how Rs crore write-offs begin. Blacklist the chassis/plate pair across plants in the TMS.",
  },
  {
    question: "What is a fake / bogus truck (farzi gaadi) in Indian highway freight?",
    answer:
      "A fake / bogus truck (farzi gaadi) is typically a scrap or totaled commercial chassis fitted with cloned plates and a forged or mismatched RC pack, then offered into spot loads through roadside brokers or informal WhatsApp groups. The racket targets high-value discrete cargo that liquidates quickly. Digital registry queries plus physical chassis rubbing are the paired controls.",
  },
  {
    question: "How does marketplace KYC relate to plant-gate verification?",
    answer:
      "Marketplace KYC (OTP, PAN, RC review, in-app evidence) replaces anonymous broker groups with identity and a trip timeline - it is not a guarantee against every crime. Enterprise plants still run Vahan, Sarathi, FASTag, and chassis rubbing at the gate, and should pull marketplace trips into TMS hard blocks. Product path: [TranZfort](https://www.tranzfort.com) (also [marketplace overview](/network/tranzfort)); matching context: [online truck load marketplaces](/blog/online-truck-load-marketplaces-india-freight-apps-guide).",
  },
] as const;

export const vehicleVerificationSections: readonly BlogSection[] = [
  {
    heading: "The underworld of highway freight theft in India",
    paragraphs: [
      "Composite from corridor practice (details changed). A Dahej metals desk needed a spot 10-wheeler for copper wire rods to Bhiwandi overnight. A roadside broker posted the indent into a WhatsApp group. A laminated RC arrived by photo. The rate was slightly soft. The truck looked ordinary. By morning the phone was dead, the legitimate owner of that registration number was hauling gravel in another state, and finance was staring at a repudiated marine claim. That is not a rare anecdote. It is the product of a repeatable racket.",
      "Fake / bogus trucks (farzi gaadi) are assembled, not invented from nothing. Syndicates buy totaled or scrap commercial chassis from insurance auctions and yards, obtain duplicate plates matching active compliant trucks, manufacture laminated RC packs, and hunt spot loads through informal brokers and open WhatsApp freight groups. Primary industrial corridors - Gujarat-Maharashtra chemical and metal belts, Delhi-NCR logistics hubs, Odisha-Jharkhand steel lanes - see the same pattern because liquidation markets sit nearby.",
      "High-value discrete commodities are preferred targets. Finished steel coils, copper wire rods, aluminium ingots, brand-new radial tyres, consumer electronics, and packaged agro-chemicals convert to cash in secondary scrap or wholesale markets inside about 24 hours of plant exit. Continuous process bulk that needs specialised unload equipment is less attractive. Discrete, liquidatable cargo is why verification intensity must scale with invoice value - not with how rushed the shift feels.",
      "Sourcing channel is the first control. Dedicated fleets with known assets fail less often than anonymous spot. Hybrid rules for when spot is allowed - and how it must be labeled - sit in [spot market vs dedicated fleets](/blog/spot-market-vs-dedicated-fleet-india). Unlabeled overflow into anonymous WhatsApp groups and roadside brokers is the highest-risk teaching pattern in this guide - a coaching ranking, not a published national crime share.",
    ],
    exhibits: vehicleVerificationExhibits["The underworld of highway freight theft in India"],
  },
  {
    heading: "Document forgery vs reality: the limits of physical paper checks",
    paragraphs: [
      "Factory security gates still run on torch light and laminate thickness. That control died the day Transport Nagar desktop publishers learned to print smart-card lookalikes. High-quality counterfeit RC cards, fitness certificates, Form 48 All-India National Permits, and comprehensive insurance PDFs now carry QR codes that open spoofed 'verification' pages. The guard sees green. Vahan never saw the request.",
      "Physical paper inspection fails because it asks a human to authenticate a document that was designed to look authentic under time pressure. Evening gate congestion, festival rush, and 'broker is known' culture finish the bypass. If your SOP still says 'check original RC' without defining a live registry query, you have a ceremony, not a control.",
      "Driver identity is a second forgery surface. Laminated licences arrive with someone else's name or photo. Commercial badges omit HGMV / TRANS classes required under CMVR practice. Hazchem endorsements under Rule 9 framing are missing on chemical moves. The handover-driver trick is simpler still: the verified driver clears the gate, then an unverified substitute takes the wheel at a roadside dhaba ten kilometres outside the industrial zone. Your trip file still shows the face that smiled at security.",
      "Insurance surveyors will reconstruct this timeline after a diversion. Claim packs that cannot prove live verification and chain of custody fail for reasons explained in [transit damage, shortage, and cargo insurance](/blog/transit-damage-shortage-cargo-insurance-india-carrier-liability-guide). Prevent at the gate; do not invent paperwork after the phone goes dark.",
    ],
    exhibits: vehicleVerificationExhibits["Document forgery vs reality: the limits of physical paper checks"],
  },
  {
    heading: "Digital verification: Vahan 4.0, Sarathi, and ULIP integration",
    paragraphs: [
      "India already built the public registries. The plant failure is not missing databases. It is failing to query them before the loading bay opens.",
      "Vahan 4.0 is the MoRTH-managed national vehicle registry. Gate desks must match maker/model, registered unladen tare, GVW, engine number, chassis number, fitness expiry, road tax validity, and goods permit status against the physical truck. A pretty laminate that disagrees with Vahan is not a 'data lag.' It is a hold.",
      "Sarathi is the national driving-licence repository. Match driver name, photograph, licence status (active versus suspended/cancelled), authorised vehicle classes, and commercial badge validity. For hazardous cargo, confirm the endorsement the commodity requires. A licence that looks fine on paper but is suspended in Sarathi is a hard fail.",
      "ULIP - the Unified Logistics Interface Platform - is one authorized bridge that can connect enterprise software such as ZAFTYS TMS to MoRTH registries where the plant has live credentials. Treat multi-point gate validation as a design goal, not a published response-time guarantee. Congestion is still the syndicate's ally: when verification is slow or optional, guards skip it. When it is embedded in the weighbridge workflow with hard blocks and a documented fallback when the service is down, bribery and torch-light errors stop being the operating system. Architecture detail for gate-to-pay sits in the [industrial TMS control stack](/blog/industrial-tms-control-stack-india).",
    ],
    exhibits: vehicleVerificationExhibits["Digital verification: Vahan 4.0, Sarathi, and ULIP integration"],
  },
  {
    heading: "The physical ground truth: chassis rubbing and vehicle geometry audits",
    paragraphs: [
      "Digital records can be cloned when criminals steal the identity of a live, compliant truck in another state. Vahan may show an active RC because the genuine vehicle is active. The truck at your gate is a different machine wearing that plate. Registry queries alone are necessary and insufficient.",
      "Four physical checkpoints still catch what APIs cannot. First, chassis number pencil rubbing: locate the embossed alphanumeric stamp on the frame - typically near a front wheel arch - rub pencil on tracing paper, and compare character font and spacing to manufacturer embossing standards and the Vahan extract. Second, engine number stamping on the mechanical block - not a firewall sticker. Third, body geometry versus registration class: an RC for a 2-axle 18.5 T SXL that arrives as a 3-axle 10-wheeler is a chassis-swapped or rebuilt story. Fourth, cabin condition: mismatched tyres, missing OEM badges, and fresh spray paint over the VIN plate are immediate red flags.",
      "Congestion is not an excuse to skip rubbing. The copper case in this guide failed exactly there. If the shift is overloaded, add a second verifier - do not delete the control. Print the ten-point red-flag table for the guard cabin and treat any hard fail as a hold, not a 'call the broker.'",
    ],
    exhibits: vehicleVerificationExhibits["The physical ground truth: chassis rubbing and vehicle geometry audits"],
  },
  {
    heading: "FASTag plausibility audits: the digital footprint check",
    paragraphs: [
      "Every commercial truck in India is supposed to carry an active NETC FASTag mapped to chassis and bank wallet. That creates a highway breadcrumb trail that cloned plates cannot honestly share with two physical trucks at once.",
      "Spatial plausibility is the clone detector. If a vehicle arrives at a Chakan (Pune) factory at 10:00 AM claiming a Mumbai inbound, but the FASTag ledger shows a clearance near Varanasi six hours earlier, the truck at your gate is not the truck that earned those toll debits. Implied speed above about 85 km/h across impossible distance, or travel opposite to the declared corridor, should hard-flag the booking.",
      "Enterprise TMS integrations should query FASTag history at gate-in - not after the e-Way Bill Part B is already filed. Pair toll footprints with trip milestones so a phone switch-off mid-corridor triggers escalation before the 72-hour golden window expires. Toll and freight cost context for honest trucks still sits in the [truck freight rates guide](/blog/truck-freight-rates-india-cost-rate-benchmarking-guide); here the ledger is a security sensor, not a rate input.",
    ],
    exhibits: vehicleVerificationExhibits["FASTag plausibility audits: the digital footprint check"],
  },
  {
    heading: "Driver profiling and chain of custody protocols",
    paragraphs: [
      "Machines get verified; operators get substituted. Chain of custody fails when the plant photographs a vehicle and waves through a human it never really identified.",
      "Mandatory live photo capture of the driver standing next to the registration plate at gate-in creates a timestamped pair. Masked Aadhaar OTP or biometric thumbprint matching - per plant privacy policy - ties that face to a unique identity. Digital breathalyzer screening under a zero BAC policy keeps impairment out of high-value and Hazchem dispatches before the bay opens.",
      "Mobile discipline closes the handover trick. Verify that the primary number is registered in the driver's name through telco ownership checks where available, and enforce an active SMS or WhatsApp ping at gate entry. A temporary burner phone that will be discarded after dispatch fails that ping. If the number dies at the first dhaba, your escalation playbook should already be running - not starting from a blank chat history.",
    ],
    exhibits: vehicleVerificationExhibits["Driver profiling and chain of custody protocols"],
  },
  {
    heading: "Worked case study: copper wire rods diverted on the Gujarat-Maharashtra belt",
    paragraphs: [
      "Workshop composite - not a ZAFTYS audited claim file. Consignment: 24 tonnes of electrolytic copper wire rods from Dahej (Gujarat) to Bhiwandi (Maharashtra). Invoiced value: Rs 2.15 crores. The dispatch desk needed a spot 10-wheeler. A roadside broker arranged a truck via WhatsApp at a competitive rate. Soft freight is not a discount when identity is fake - it is bait. Rate shopping without verification is a cost leak of a different kind; see [5 hidden cost leaks](/blog/5-hidden-cost-leaks-heavy-industrial-freight-tms-3pl-guide).",
      "Failure points stacked. The guard accepted a laminated colour photocopy of the RC without a live Vahan check. The driving licence looked valid but belonged to a person who had reported it lost six months earlier. Chassis pencil rubbing was skipped because evening gate congestion 'would delay production.' Each skipped control was rationalised. Together they authorised the theft.",
      "Diversion timeline: truck left Dahej at 6:00 PM; driver's phone switched off near Valsad at 9:30 PM; vehicle never reached Bhiwandi. The legitimate owner of the cloned registration was found hauling gravel in Rajasthan with the genuine truck. Cargo loss: Rs 2.15 crores. Marine claim repudiated for breach of registered common-carrier due-diligence warranty. Direct balance-sheet write-off: Rs 2.15 crores - before late-delivery LD and legal costs push the workshop total near Rs 2.315 crores.",
      "The control stack that stops this is hold-first: live registry fail, licence status fail, FASTag/movement impossibility, or chassis mismatch - any one pauses loading until independently cleared. A public Parivahan lookup or authorized ULIP path (where available) supports consistency checks; it is not by itself a full security clearance. The workshop cost framing of a registry query is trivial next to cargo value. Prevention is not optional insurance theatre.",
    ],
    exhibits: vehicleVerificationExhibits["Worked case study: copper wire rods diverted on the Gujarat-Maharashtra belt"],
  },
  {
    heading: "Statutory penalties and the legal framework: BNS 2023 vs IPC",
    paragraphs: [
      "Criminal law is not your primary control, but shippers should know what they are walking into after a diversion. Section 316 of the Bharatiya Nyaya Sanhita, 2023 covers criminal breach of trust by a common carrier, wharfinger, or warehouse-keeper in the lineage formerly associated with IPC Sections 405/407 - punishable with imprisonment up to seven years and fine framing. Section 318 BNS covers cheating and dishonestly inducing delivery of property (ex IPC 415/420). Forgery provisions cover making and using forged RCs, permits, and licences (ex IPC 465/468 practice).",
      "Confirm bare BNS text and charging practice with counsel. Historical FIRs may still cite IPC numbers. Carriage by Road Act, 2007 registration and goods-receipt duties still shape the civil and regulatory overlay for common carriers.",
      "Recovery via police FIR under Section 316 BNS routinely takes years. Working capital does not wait. The imperative for plant leadership is preventative gate-level elimination - Vahan, Sarathi, FASTag, chassis rubbing - over post-theft litigation as the operating plan. Legal pursuit is residual hygiene after the control failed.",
    ],
    exhibits: vehicleVerificationExhibits["Statutory penalties and the legal framework: BNS 2023 vs IPC"],
  },
  {
    heading: "Standard operating procedure: the 8-point pre-loading gate verification protocol",
    paragraphs: [
      "Security guards, weighbridge operators, and dispatch managers need one shared protocol. No 'known broker' exceptions without a named director approval that will survive an insurance surveyor.",
      "Step 01: record arrival time, registration number, vehicle type, and transporter. Step 02: compare registration / vehicle identifiers with permitted records using available lawful lookups (public Parivahan or authorized registry path) plus physical plate audit. Step 03: verify driver identity and licence with available lawful methods. Step 04: check fitness, insurance, permit, and tax status / expiry.",
      "Step 05: confirm the vehicle is appropriate for the cargo and order (GVW, body, endorsements). Step 06: record any driver or vehicle substitution and re-verify it. Step 07: record loading reference, seal number, photographs where permitted, weighbridge data, and departure time. Step 08: record the approving person for exceptions. Step 09: on discrepancy - hold, verify independently, escalate; do not automatically accuse the driver or carrier of a crime. Step 10: preserve an auditable record with access controls and retention rules.",
      "Physical chassis rubbing and FASTag/movement plausibility still sit beside registry checks - a lookup is not a clearance. Congestion staffing must protect identity and chassis steps. Gate-to-pay embedding of these checks on [ZAFTYS TMS](/zaftys-tms) is recommended architecture where credentials exist, not a claim that every plant already has live automated ULIP timings.",
    ],
    exhibits: vehicleVerificationExhibits["Standard operating procedure: the 8-point pre-loading gate verification protocol"],
  },
  {
    heading: "How TranZfort and ZAFTYS eliminate sourcing vulnerabilities and the 20-point audit",
    paragraphs: [
      "Sourcing vulnerability starts before the gate. Anonymous WhatsApp broker groups sit at the top of this guide's hypothetical risk ranking. TranZfort replaces that opacity with authenticated indie suppliers and truckers - phone OTP, business details, PAN, and commercial RC review - plus in-app chat, transparent pricing, and a timestamped photo timeline from dock to sealed load to stamped POD. That creates an auditable digital trail instead of a disappearing album. Plant gates still need independent registry and chassis controls.",
      "Enterprise multi-plant manufacturers still need hard controls at the weighbridge. Where authorized Vahan/Sarathi/ULIP paths are live, ZAFTYS web TMS can hard-block expired fitness and suspended permits, maintain blacklisted chassis lists across plants, and reconcile open-marketplace spot capacity sourced via TranZfort inside the same gate-to-pay workflow. Present unavailable integrations as a recommended architecture, not as a measured live guarantee. Verified spot is still spot - it must stay labeled - but it is no longer anonymous.",
      "Score the 20-point readiness matrix with security, dispatch, and procurement in one room. One to five. Skip equals zero. Strong marketplace posting with skipped chassis rubbing still writes off copper. Strong registry checks with WhatsApp-only high-value sourcing still invite the syndicate through the front door.",
      "FAQs below cover cloned plates versus forged RCs, mParivahan limits, insurance repudiation on non-commercial licences, chassis mismatch response, and TranZfort legitimacy controls. Statutory orientation: Motor Vehicles Act Sections 3, 4, 39, 56, 66, 113; CMVR Rules 9, 32, 47, 50, 93; BNS Sections 316 and 318; Carriage by Road Act 2007. Confirm bare text before a demand letter or FIR strategy memo.",
      "Next step: harden gate verification on [ZAFTYS TMS](/zaftys-tms) and source verified open-market capacity on [TranZfort](https://www.tranzfort.com) (also [TranZfort marketplace](/network/tranzfort)) so identity fails before loading - not after a Rs 2 crore phone goes dark.",
    ],
    exhibits: vehicleVerificationExhibits["How TranZfort and ZAFTYS eliminate sourcing vulnerabilities and the 20-point audit"],
  },
];
