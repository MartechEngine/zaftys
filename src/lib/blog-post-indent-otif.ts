import type { BlogSection } from "@/lib/blog-data";
import { indentOtifExhibits } from "@/lib/blog-exhibits-indent-otif";

export const indentOtifFaqs = [
  {
    question: "What is OTIF in Indian road freight logistics?",
    answer:
      "OTIF (On-Time In-Full) is a compound service metric: the share of indented dispatches that are simultaneously on-time placed at the plant gate, in-full allocated (correct body, payload class, and compliance), and on-time delivered to the consignee under the transit SLA. It is stricter than a transporter's placement percentage alone.",
  },
  {
    question: "What is the difference between On-Time Placement (OTP) and On-Time In-Full (OTIF)?",
    answer:
      "OTP counts whether the vehicle crossed the plant gate inside the assigned arrival window. OTIF is compound: on-time placement, in-full allocation (correct body, payload class, and compliance), and on-time delivery to the consignee under the transit SLA. A transporter can post a high OTP while failing OTIF through late slots, wrong trucks that get rejected, or corridor delays. Score all three or you will celebrate empty metrics.",
  },
  {
    question: "What is indent cascading in transporter management?",
    answer:
      "Indent cascading is an automated waterfall: broadcast the daily indent to L1 contracted carriers with a hard acceptance window (this guide uses about two hours), auto-trigger L2 on timeout, then push remaining shortfalls to a backup pool or open marketplace. The point is to discover non-placement by late morning - not after packing docks are already choked.",
  },
  {
    question: "What placement ratio should industrial desks target for contracted transporters?",
    answer:
      "Treat about 92% monthly placement as a proposed starting target for contracted lanes - calibrate by plant, lane, vehicle type, and season. OTIF targets in the high 80s to low 90s only make sense once the plant's own TAT is clean and denominators are defined. These are recommendations, not a published national industry index; measure from gate timestamps, not transporter self-reports. Hybrid capacity rules: [spot vs dedicated](/blog/spot-market-vs-dedicated-fleet-india).",
  },
  {
    question: "What is risk purchase in a transporter contract?",
    answer:
      "Risk purchase (also called risk-and-cost procurement) lets the shipper buy replacement capacity when the contracted transporter fails to place inside the stipulated window, then debit the positive cost difference from the transporter's pending freight ledger. Commercially it sits in the lineage of Section 73 of the Indian Contract Act, 1872. Counsel must fit the clause to your facts; this guide is orientation, not a demand letter. Bare Act: [Indian Contract Act, 1872](https://www.indiacode.nic.in/handle/123456789/2187?locale=en).",
  },
  {
    question: "How can a plant legally enforce a risk-purchase penalty if a transporter defaults on an indent?",
    answer:
      "Draft the MSA so that on non-placement inside the stipulated window, the shipper may procure replacement capacity and debit the positive difference between emergency spot (or L2) cost and the contracted L1 rate from the transporter's pending freight ledger - with documentation of the replacement booking. Section 74 liquidated damages may also apply if a genuine pre-estimate is stated. Static Rs 1,000 penalties often fail when spot diversion earns the carrier more than the fine.",
  },
  {
    question: "How long should a plant dispatch desk give an L1 transporter to confirm a daily indent?",
    answer:
      "A two-hour digital acceptance window from morning indent broadcast is the operational benchmark in this guide - typically 09:00 to 11:00. Longer windows push discovery of shortfalls into the afternoon when packing bays are already choked. Shorter windows need honest plant TAT and fair detention credits or carriers will reject systematically. Automate the timeout into L2 rather than relying on a dispatcher to remember who to call.",
  },
  {
    question: "How does plant turnaround time (TAT) affect transporter OTIF?",
    answer:
      "Carriers systematically deprioritize plants that detain trucks for 36 to 48 hours. Sub-120-minute gate-to-gate TAT is a workshop loyalty signal that supports morning placement and can support lower baseline freight because utilisation is predictable. OTIF governance without TAT governance is one-sided bullying that eventually empties the morning fleet. Detail: [plant detention and TAT](/blog/plant-detention-tat-yard-gate-india).",
  },
  {
    question: "How does connecting an enterprise TMS to an open marketplace prevent dispatch halts?",
    answer:
      "When L1 and L2 contracted pools time out, the unfulfilled indent publishes from the TMS into an open marketplace so verified independent truckers can accept at transparent rates. The booking returns into the same gate-in, weigh, ePOD, and pay workflow - so the safety valve does not become a parallel WhatsApp ledger. Product paths: [ZAFTYS TMS](/zaftys-tms) and [TranZfort](https://www.tranzfort.com) (also [marketplace overview](/network/tranzfort)).",
  },
] as const;

export const indentOtifSections: readonly BlogSection[] = [
  {
    heading: "The 9:00 AM dispatch crisis: anatomy of an indent failure",
    paragraphs: [
      "Composite from plant practice (details changed). A western India fasteners desk locked the production plan at 09:00 and indented forty multi-axle trailers across two contracted transporters. By 11:00 the WhatsApp groups were full of vehicle numbers. By 15:00 only twenty trucks had crossed security. The excuses were familiar - puncture on the way, driver not answering, RTO checking - and the packing bays were already choked with finished goods that had nowhere to roll.",
      "That daily rhythm is the Indian manufacturing indent crisis in miniature. Morning confirmation is theatre. Afternoon placement is reality. Between the two sits a market fact most MSAs pretend not to know: many transporters do not own every truck they commit. They intend to source from the local Transport Nagar after the indent lands. When spot rates spike on a competing agricultural harvest corridor or a port export rush, those same trucks quietly divert to higher-paying loads. The contracted factory indent is abandoned with a polite apology and a soft penalty the carrier has already priced in.",
      "Cascading consequences are operational, not abstract. Finished goods inventory fills staging lanes. Customer assembly lines miss kit. Dispatch heads face late-delivery liquidated damages. Finance later discovers the 'cheap' contract rate was replaced by a higher emergency replacement quote - compare like-for-like vehicle, route, and service level before calling it a percentage premium. Related leak pattern: [5 hidden cost leaks](/blog/5-hidden-cost-leaks-heavy-industrial-freight-tms-3pl-guide).",
      "Hybrid capacity strategy - when dedicated fleets should hold the base and when labeled spot is allowed - belongs in [spot market vs dedicated fleets](/blog/spot-market-vs-dedicated-fleet-india). This dossier is about the indent engine that makes that hybrid enforceable before 4:00 PM panic.",
    ],
    exhibits: indentOtifExhibits["The 9:00 AM dispatch crisis: anatomy of an indent failure"],
  },
  {
    heading: "Deconstructing OTIF for Indian road freight",
    paragraphs: [
      "Indian road freight needs a stricter OTIF definition than a transporter's monthly placement boast. Delivering a day late is a failure. Delivering 18 tonnes against a 25-tonne indent is also a failure. Showing up with the wrong body type that security rejects is a failure that never appears in a naive 'trucks placed' percentage.",
      "Define events before formulas. Indent created: request for specified vehicle, lane, cargo, capacity, and placement time. Eligible indent: included in the reporting population under agreed rules. Accepted indent: acknowledged by the transporter. Truck confirmed: vehicle/driver assigned - confirmation alone is not physical placement. Vehicle reported at gate: arrival recorded. Accepted placement: vehicle meets stated requirements and is accepted. On-time placement: accepted placement by the agreed deadline. Cancelled indent: actor, reason, and time recorded; the SLA must say whether cancellations are excluded.",
      "Show metrics separately. Placement rate = eligible indents successfully placed / eligible indents. On-time placement rate = eligible indents placed by deadline / eligible indents. Compound OTIF = share of the agreed OTIF population that is simultaneously on-time placed, in-full allocated, and on-time delivered. Do not silently drop failures from the denominator. State treatment of client cancellations, duplicates, force majeure, rejected vehicles, and late changes.",
      "Hypothetical monthly example (not a ZAFTYS result or national benchmark): 500 eligible indents, 450 successfully placed, 420 placed by the agreed deadline, 390 shipments meet defined on-time and in-full criteria. Placement rate = 450/500 = 90%. Placement shortfall = 10%. OTIF across the eligible population = 390/500 = 78%. OTIF among placed vehicles = 390/450 = 86.7% - a different metric with a different denominator. Placement rate and delivery OTIF are not interchangeable.",
      "Define 'in full' before you argue. Partial deliveries, damaged cargo that fails consignee acceptance, customer-caused delay, and cancelled shipments need explicit include/exclude rules. If an indent is not placed, state whether it is an OTIF failure or excluded by contract - publish the primary metric and any secondary conditional metric separately. Damaged-but-delivered is usually an OTIF miss even when the truck was on time.",
      "Measure from weighbridge and gate timestamps plus ePOD - not from WhatsApp screenshots. How those timestamps feed gate-to-pay is covered in the [industrial TMS control stack](/blog/industrial-tms-control-stack-india).",
    ],
    exhibits: indentOtifExhibits["Deconstructing OTIF for Indian road freight"],
  },
  {
    heading: "The indent waterfall: designing an automated cascading engine",
    paragraphs: [
      "Manual indent cascading - a dispatcher telephoning secondary transporters after lunch - creates favoritism, delayed decisions, and missed cutoffs. By the time the human admits L1 has failed, packing bays are already full and the spot market knows you are desperate.",
      "Design a four-stage automated waterfall. Stage 1: L1 primary contract carriers receive indents against tender quota (for example 60% of lane volume) with a strict two-hour digital acceptance window. Stage 2: if L1 fails to confirm or explicitly rejects, the TMS auto-reallocates to L2 at the contracted rate differential. Stage 3: if L2 times out by about 1:00 PM, shift to a pre-vetted regional backup pool or contracted 3PL reserve. Stage 4: if internal pools still fail by about 2:00 PM, publish the unplaced indent from the web TMS into TranZfort for direct trucker matching at zero platform commission.",
      "Time-bound automation is the point. Capacity shortfalls surface by mid-morning when alternative carriers still have trucks - not at 4:00 PM when only emergency premiums remain. Marketplace mechanics for that safety valve sit in [online truck load marketplaces](/blog/online-truck-load-marketplaces-india-freight-apps-guide).",
    ],
    exhibits: indentOtifExhibits["The indent waterfall: designing an automated cascading engine"],
  },
  {
    heading: "Contractual SLAs and penalties: making non-placement enforceable",
    paragraphs: [
      "Standard Indian transport penalty clauses often fail because they are cheaper to pay than to honour. A static Rs 500 to Rs 1,000 daily non-placement fee is rational to absorb when diverting the same truck to an alternative spot load earns a Rs 4,000 higher margin. Soft penalties price the breach; they do not prevent it.",
      "Risk purchase under the commercial reading of Section 73 of the Indian Contract Act, 1872 changes the math. Hypothetical commercial example: contracted rate Rs 50,000; comparable replacement quote Rs 58,000; gross difference Rs 8,000. That difference is not automatically recoverable - comparability must account for vehicle capacity, route, cargo, service level, transit time, and taxes. Contract terms and applicable law determine what can be claimed. Counsel must own enforceability before describing a risk-purchase debit as enforceable; this chapter is orientation.",
      "Reciprocal SLAs keep the relationship honest. If the transporter places on time and the factory holds the vehicle beyond free time for loading, detention must credit automatically. Carriers that lose two days of utilisation to your yard will systematically deprioritize your morning indents regardless of how stern the penalty clause sounds. Rate construction that feeds those differentials still sits in the [truck freight rates guide](/blog/truck-freight-rates-india-cost-rate-benchmarking-guide).",
    ],
    exhibits: indentOtifExhibits["Contractual SLAs and penalties: making non-placement enforceable"],
  },
  {
    heading: "The 100-point industrial transporter performance scorecard",
    paragraphs: [
      "Subjective vendor reviews reward the last lunch meeting. Industrial governance needs a mathematical scorecard derived from plant weighbridge timestamps, gate logs, GPS corridor data, and digital ePOD records.",
      "Weight five pillars to 100 points. Indent placement ratio carries 35 points - vehicles placed over vehicles indented, with a proposed starting threshold near 92% until calibrated. Gate-in punctuality and slot adherence carry 20. Vehicle quality and compliance pass rate carry 15 - zero tolerance for torn tarpaulins, damaged floors, bald tyres, or expired Vahan fitness. En-route transit SLA adherence carries 20. ePOD submission and billing cleanliness carry 10 - stamped, legible proof uploaded within 24 hours of unloading.",
      "Dynamic tender quota closes the loop. Top monthly scores automatically win higher volume allocation next cycle. Chronic laggards lose L1 priority and face earlier cascade exposure. Without that link, the scorecard is a PDF that nobody fears.",
    ],
    exhibits: indentOtifExhibits["The 100-point industrial transporter performance scorecard"],
  },
  {
    heading: "Yard and gate friction: how plant TAT dictates placement",
    paragraphs: [
      "Placement ratios are not only a transporter problem. Good carriers abandon bad plants. Slow security checks, uncalibrated weighbridges, manual loading gangs, and delayed consignment note / LR (bilty) generation create 36-to-48-hour gate detention. A truck stuck two days burns roughly Rs 7,000 or more in fixed EMI and driver wages while earning nothing. The rational carrier response is to confirm your indent in the morning and quietly serve a faster plant instead.",
      "The fast-gate dividend is measurable. Plants that drive turnaround under about 120 minutes routinely secure 98%+ morning placement compliance and can negotiate roughly 5% lower baseline freight because utilisation is predictable. OTIF governance without TAT governance is one-sided bullying that eventually empties your morning fleet.",
      "Full yard and gate operations detail - detention clocks, weighbridge discipline, bay sequencing - sits in [plant detention and turnaround time](/blog/plant-detention-tat-yard-gate-india). Put transporter OTIF and plant TAT on the same monthly pack for leadership.",
    ],
    exhibits: indentOtifExhibits["Yard and gate friction: how plant TAT dictates placement"],
  },
  {
    heading: "Worked financial case: the cost of a 10-truck placement failure",
    paragraphs: [
      "Workshop only - not a ZAFTYS audited plant file. A heavy engineering and fasteners plant in Jamshedpur dispatches about 30 trailers daily toward Western India. On a critical month-end day, primary transporters confirm 30 vehicles and fail to place 10 by 15:00.",
      "Approach A is the unorganized manual scramble. The dispatcher calls roadside brokers, pays an emergency spot premium near Rs 12,000 per truck (+22%), still cannot source four trucks, watches the packing line halt for eight hours, and absorbs about Rs 1,50,000 customer late-delivery liquidated damages. Net corporate loss lands near Rs 2,98,000.",
      "Approach B is automated TMS cascading plus a TranZfort safety valve. L1 timeout triggers L2 within two hours. Remaining unfulfilled loads broadcast to the Android marketplace. Independent truckers accept at transparent direct rates. Customer LD stays at zero. L1 default differentials debit under risk-purchase terms. Total exposure contains near Rs 18,400 - and that amount is recoverable from carrier penalty ledgers when documentation is clean.",
      "The lesson is not that spot is free. The lesson is that discovery timing and debit enforceability decide whether a placement failure costs three lakhs or eighteen thousand. Rebuild corridor rate maths with the [freight rates guide](/blog/truck-freight-rates-india-cost-rate-benchmarking-guide) before you set the contracted differentials the debit note will use.",
    ],
    exhibits: indentOtifExhibits["Worked financial case: the cost of a 10-truck placement failure"],
  },
  {
    heading: "Standard operating procedure: the 8-step daily indent lifecycle",
    paragraphs: [
      "Plant dispatchers, procurement heads, and transport desks need one clock. Eight stages. No afternoon folklore.",
      "Step 01 at 08:00: ERP sales-order sync and net weight sizing lock the indent list. Step 02 at 09:00: automated indent broadcast to L1 via TMS. Step 03: two-hour digital acceptance or rejection window through 11:00. Step 04: automated L2 cascading through early afternoon. Step 05 from about 13:00: open marketplace safety-valve broadcast on TranZfort for still-unplaced loads.",
      "Step 06: gate-in automated Vahan verification and slot staging through mid-afternoon. Step 07: in-situ weighbridge and consignment note / LR (bilty) generation into evening gate-out. Step 08 by 20:00: daily indent performance logging and scorecard update so tomorrow's cascade priorities already reflect today's failures.",
      "Print the process board on the dispatch wall. When a step is skipped - verbal L1 confirms, missing risk-purchase debit, marketplace used before L2 timeout - the exception is visible and owned.",
    ],
    exhibits: indentOtifExhibits["Standard operating procedure: the 8-step daily indent lifecycle"],
  },
  {
    heading: "System architecture: connecting ZAFTYS web TMS to TranZfort mobile capacity",
    paragraphs: [
      "Large manufacturing enterprises cannot run multi-plant logistics on scattered WhatsApp groups and individual phone calls. They need concurrent seats, audit trails, and cascading rules that fire without a hero dispatcher.",
      "Layer 1 is the command centre: ZAFTYS web TMS for plant managers, logistics heads, and finance. It owns long-term contract fleets, automated L1/L2 waterfall rules, weighbridge API integration, monthly freight audit ledgers, and the 100-point scorecard. Layer 2 is the open capacity safety valve: TranZfort, integrated into the dispatch engine so one action publishes unfulfilled indents to verified truckers on free marketplace matching when contracts fail or seasonal surges exceed reserved fleets.",
      "The closed governance loop is non-negotiable. An open-market truck booked via TranZfort must flow back into ZAFTYS gate-in, weighbridge, ePOD, and pay. Otherwise the safety valve becomes a second, invisible transport company. Architecture for that gate-to-pay spine sits in the [industrial TMS control stack](/blog/industrial-tms-control-stack-india).",
    ],
    exhibits: indentOtifExhibits["System architecture: connecting ZAFTYS web TMS to TranZfort mobile capacity"],
  },
  {
    heading: "The 20-point indent management and OTIF audit matrix and FAQs",
    paragraphs: [
      "Score the diagnostic with logistics, procurement, and operations leadership in one room. Rate each line 1 to 5 across sourcing discipline, contract cascading, gate measurement, and visibility. Skip equals 0. A plant with beautiful MSA language and WhatsApp-only morning confirms has already failed sourcing readiness.",
      "Interpret blocks together. Strong cascading with terrible plant TAT will still lose carriers. Strong marketplace integration without risk-purchase debits will still socialise emergency premiums onto the P&L. Re-score after thirty days of timestamp data, not after the kickoff workshop.",
      "FAQs below cover placement benchmarks, risk-purchase enforceability, OTP versus OTIF, L1 confirmation windows, and TMS-to-marketplace halt prevention. Statutory orientation: Indian Contract Act Sections 73 and 74; Carriage by Road Act Section 9 framing; CGST Rule 138(10) e-Way Bill validity. Confirm bare text before a debit dispute or demand letter.",
      "Next step: run corporate indent cascading on [ZAFTYS TMS](/zaftys-tms) and keep the free matching safety valve on [TranZfort](https://www.tranzfort.com) (also [TranZfort marketplace](/network/tranzfort) · [Legal](https://tranzfort.com/legal/)) so morning confirms become afternoon trucks - or documented, recoverable defaults.",
    ],
    exhibits: indentOtifExhibits["The 20-point indent management and OTIF audit matrix and FAQs"],
  },
];
