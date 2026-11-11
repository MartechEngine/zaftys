import type { BlogSection } from "@/lib/blog-data";
import { ftlVsPtlExhibits } from "@/lib/blog-exhibits-ftl-vs-ptl";

export const ftlVsPtlFaqs = [
  {
    question: "What is the difference between LTL and PTL in India?",
    answer:
      "In Indian plant English, PTL (part truckload), LTL (less-than-truckload), sundry, and parcel usually mean the same operating model: shared hubs, mixed cargo, and chargeable-weight billing. FTL means a dedicated vehicle for one consignor. Ask the carrier which word their tariff uses, then compare landed cost - not the label.",
  },
  {
    question: "Should I get both FTL and PTL quotes above 3 tonnes?",
    answer:
      "Yes. Above about 3 tonnes - or when cargo fills roughly half to two-thirds of the smallest suitable truck - quote both modes on the same lane. Dense trunk routes and thin destination towns shift the break-even. Paper ₹/kg alone is not enough.",
  },
  {
    question: "Can we book a dedicated FTL truck if the cargo only fills half the vehicle?",
    answer:
      "Yes. That is a dead-freight trade-off. Compare the empty cubic metres you pay for against PTL packaging, damage scrap, inventory days, and ODA fees on the same lane. Many industrial desks still prefer half a sealed truck to a full sundry journey when cargo is fragile or high value. Start a quote from [dedicated fleet](/logistics/dedicated-fleet).",
  },
  {
    question: "How does the Carriage by Road Act 2007 treat liability on PTL parcel receipts versus dedicated FTL lorry receipts?",
    answer:
      "Common-carrier liability still turns on registration, the goods receipt, and declared value (Sections 9-11 and Rule 12). PTL multi-party custody and clean dockets often weaken evidence after hub handling. Dedicated FTL with a seal trail and qualified remarks is cleaner for surveyors. Full claim SOP: [transit damage and shortage claims](/blog/transit-damage-shortage-cargo-insurance-india-carrier-liability-guide).",
  },
  {
    question: "What is the standard ODA (Out of Delivery Area) distance threshold in Indian PTL?",
    answer:
      "There is no single national kilometre rule. Carriers flag docks outside primary municipal or pin-code service lists in the tariff annex. Confirm that annex before you assume a plant is 'local delivery.' Flat ODA penalties of a few thousand rupees are common on industrial estates outside city cores.",
  },
  {
    question: "How should a plant move from daily small PTL dispatches to consolidated bi-weekly dedicated FTL?",
    answer:
      "Run an SKU density audit, set a consolidation rhythm, strip over-crating that only existed for hub handling, size the body class, lock route and seals, and close with ePOD. Use the eight-point protocol in this guide. For reserved capacity on repeating lanes, see [contract logistics](/logistics/contract-logistics).",
  },
  {
    question: "When does volumetric weight usually hurt industrial shippers on PTL?",
    answer:
      "When cargo is high-cube and light: control panels, hollow fabrications, plastics, packaging, air ducting. Under a 10 lbs/CFT style rule, chargeable weight can run near double the actual mass. Always ask for the carrier's CFT or CBM factor in writing.",
  },
  {
    question: "Is FTL always cheaper than PTL above 3.5 tonnes?",
    answer:
      "Not always. The 3.5 to 6.0 tonne band is a workshop starting point. Recompute with your trip rate, PTL ₹/kg, FOV, ODA, crating, and damage history. Paper-only comparisons understate FTL. Landed-cost comparisons usually favour dedicated trucks earlier. Method detail sits in the [truck freight rates guide](/blog/truck-freight-rates-india-cost-rate-benchmarking-guide).",
  },
] as const;

export const ftlVsPtlSections: readonly BlogSection[] = [
  {
    heading: "Start here: FTL vs PTL decision in three lines",
    paragraphs: [
      "Skip the algebra if you only need a desk rule. Use the three bands below, then recompute with your tariff.",
      "Print the one-page worksheet if you want inputs and the break-even steps on one sheet: [FTL vs PTL break-even worksheet (PDF)](/downloads/ftl-vs-ptl-break-even-worksheet.pdf).",
    ],
    exhibits: ftlVsPtlExhibits["Start here: FTL vs PTL decision in three lines"],
  },
  {
    heading: "The fundamental fork in Indian freight: direct transit vs network consolidation",
    paragraphs: [
      "Composite from corridor practice (details changed). A western India auto-ancillary plant shipped 4.2 tonnes of painted panels on a national PTL docket because the ₹/kg sticker beat the FTL trip quote by about Rs 6,000. The bill later added FOV, ODA into the estate, and wooden crating the hub required. Two cartons crushed in a Transport Nagar godown. The physical bilty returned after two weeks. Finance 'saved' on freight and lost on scrap, delay, and cash turnaround.",
      "Every industrial dispatch desk in India eventually faces the same fork: book a sundry / part truckload (PTL) docket into a regional parcel network, or book a dedicated full truckload (FTL) that runs point-to-point from your dock to the customer gate.",
      "In Indian plant English, PTL, LTL (less-than-truckload), sundry, and parcel usually describe the same shared-hub model. FTL means one commercial vehicle for one consignor - sealed, dedicated, origin to destination. The label on the booking screen matters less than the operating philosophy.",
      "The Indian PTL market splits between regional sundry operators and national parcel carriers. Multi-tier commission booking agents (dalal) often sell the docket while someone else runs the trunk trailer. That split is fine for samples. It becomes expensive when factory production is steady, finished goods are fragile, and late delivery penalties are real.",
      "Growing manufacturers outgrow the parcel network when weekly tonnes, cube, and damage history say so. The question is not 'which logo is on the bilty.' The question is which operating philosophy protects landed cost and the next invoice. For how contract FTL capacity sits next to spot overflow, see [spot market vs dedicated fleets](/blog/spot-market-vs-dedicated-fleet-india). To place a dedicated truck on your lane, start with [dedicated fleet](/logistics/dedicated-fleet).",
    ],
    exhibits: ftlVsPtlExhibits["The fundamental fork in Indian freight: direct transit vs network consolidation"],
  },
  {
    heading: "The physical journey: how goods move through PTL networks vs dedicated FTL",
    paragraphs: [
      "PTL looks simple on a booking screen. On the ground it is a hub-and-spoke odyssey: feeder tempo to local branch, staging in the godown, consolidation at a regional transshipment centre, line-haul between hubs, destination de-consolidation, branch transfer, then Out of Delivery Area (ODA) last mile.",
      "Count the touches. Shared sundry cargo is often handled four to seven times. Manual dumping, hooks on bags, forklift mast punctures, open rain-yard staging, and tumbling inside unlashed mixed loads are how carton crush and water claims begin. Claim paperwork after the fact sits in the [transit damage guide](/blog/transit-damage-shortage-cargo-insurance-india-carrier-liability-guide).",
      "Dedicated FTL is boring on purpose. Factory dock loading, driver verification, bolt or electronic seal, highway cruise, unbroken seal audit at the customer gate. One load. One unload. That is the physical reason damage bands collapse and surveyors get a clean custody story.",
      "If your cargo cannot survive a Transport Nagar godown floor, stop paying for the privilege. Point-to-point industrial carriage is what [industrial freight](/logistics/industrial-freight) and [dedicated fleet](/logistics/dedicated-fleet) are built for.",
    ],
    exhibits: ftlVsPtlExhibits["The physical journey: how goods move through PTL networks vs dedicated FTL"],
  },
  {
    heading: "The true cost stack of PTL: unmasking the surcharges",
    paragraphs: [
      "The base freight per kilogram is a sticker. Landed PTL cost adds minimum docket fees, Freight on Value (FOV) risk charges, hamali, municipal cess entries, ODA penalties when the dock sits outside the pin list, and re-booking or demurrage when the godown holds beyond about forty-eight hours.",
      "FOV at 0.10% to 0.25% of invoice value is easy to miss on a rate card and expensive on a Rs 28 lakh machine move. ODA flat fees of Rs 1,500 to Rs 5,000 turn 'cheap per kg' into a bad joke for industrial estates outside municipal cores.",
      "Add secondary wooden crating that exists only because hubs are violent, plus damage scrap, plus inventory days. That is the hidden rupee stack. Related leak framing sits in [5 hidden cost leaks](/blog/5-hidden-cost-leaks-heavy-industrial-freight-tms-3pl-guide).",
      "When you compare modes, demand the full ancillary schedule - not only the headline ₹/kg. Then put the same lane on a dedicated trip quote from [contract logistics](/logistics/contract-logistics) or [dedicated fleet](/logistics/dedicated-fleet).",
    ],
    exhibits: ftlVsPtlExhibits["The true cost stack of PTL: unmasking the surcharges"],
  },
  {
    heading: "Volumetric weight (10 lbs/CFT) trap on industrial PTL",
    paragraphs: [
      "Parcel networks bill chargeable weight as the greater of actual gross mass and volumetric weight. Many Indian PTL tariffs still use about 10 lbs per cubic foot, or a CBM factor around 250 to 300 kg. Confirm the schedule. Do not guess.",
      "Chargeable weight equals max of actual kilograms and (L x W x H in inches / 1728) times 10 lbs times 0.4536. High-cube, lightweight engineering goods - control panels, hollow fabrications, plastics, packaging, air ducting - pay for ghost weight. Effective freight can run two to three times the mass-based rate.",
      "Workshop example: 2,200 kg of control panels at about 12 CBM (~424 CFT) can bill near 4,240 kg under a 10 lbs/CFT rule. You did not ship more steel. You shipped air that the tariff prices as mass.",
      "If your SKUs cube-out, dedicated FTL often wins earlier than a weigh-out spreadsheet suggests. Bring cube and mass when you ask for an FTL quote on [dedicated fleet](/logistics/dedicated-fleet).",
    ],
    exhibits: ftlVsPtlExhibits["Volumetric weight (10 lbs/CFT) trap on industrial PTL"],
  },
  {
    heading: "How to calculate FTL vs PTL break-even weight",
    paragraphs: [
      "Write both sides as total landed cost. Cost of PTL equals weight times rate per kg, plus surcharges, plus packaging, plus damage scrap, plus inventory drag. Cost of FTL equals the dedicated trip rate plus dock handling.",
      "Break-even weight is the threshold where those totals cross. In workshop form: FTL trip minus the fixed PTL fees you avoid, divided by the net per-kg PTL disadvantage after FOV and damage delta. Render the algebra on the formula board - do not trust a raw sticker comparison.",
      "Size the truck before you trust the maths. Break-even only after you pick the smallest body that fits both weight and cube. Comparing a 32-ft FTL quote to a 2-tonne PTL docket invents a false win for sundry. Body-class detail sits in [planning industrial shipments](/blog/planning-industrial-shipments).",
      "Use capacity bands with the tonne band. Workshop scanner rule: well under about one-third of that truck usually stays PTL; roughly half to two-thirds is the quote-both grey zone; above about three-quarters, FTL usually wins on cost and control. Density moves the bands - light cube-out cargo pushes crossover earlier.",
      "Lane density moves them too. On a dense trunk (easy consolidation both ways), PTL ₹/kg stays competitive longer. On a thin lane into a smaller town, PTL holds cargo for the next trunk and rates climb - so FTL can win at surprisingly low tonnes. Same weight, different corridor, different answer.",
      "Hidden break-even drift matters. Pure paper freight (ignore pack and scrap) can show break-even near 6.5 tonnes. Adding crating and damage often pulls the real threshold down to about 3.0 to 4.5 tonnes on a standard ~1,000 km industrial corridor. That is a workshop band. Recompute with your numbers.",
      "The two expensive mistakes: booking half-empty FTL without consolidating Monday and Wednesday into one Thursday truck; and splitting one large load into several PTL dockets to 'avoid' an FTL commitment (minimums apply per consignment). How to build the FTL trip line from diesel, wear, and standing cost is in the [truck freight rates guide](/blog/truck-freight-rates-india-cost-rate-benchmarking-guide). When the math favours a dedicated truck, convert the lane through [contract logistics](/logistics/contract-logistics).",
      "Worksheet with blank inputs: [FTL vs PTL break-even worksheet (PDF)](/downloads/ftl-vs-ptl-break-even-worksheet.pdf).",
    ],
    exhibits: ftlVsPtlExhibits["How to calculate FTL vs PTL break-even weight"],
  },
  {
    heading: "Transit time, working capital, and cash-flow velocity",
    paragraphs: [
      "Inventory in transit is working capital. Workshop form: consignment value times WACC over 365 times extra transit days. Five extra days on a Rs 28 lakh invoice at 12% WACC is real money even before damage.",
      "PTL paper lorry receipts (bilty) can take 12 to 25 days to return by regional courier. That freezes invoice discounting and slows GST input tax credit hygiene. Direct FTL with electronic proof of delivery inside the hour unlocks faster customer approval and cash turnaround.",
      "Ops detail for ePOD and e-Way Bill close-out sits in the [ePOD billing guide](/blog/epod-fastag-eway-bill-billing-india). On trips ZAFTYS runs, capture seals and delivery remarks in [ZAFTYS TMS](/zaftys-tms) instead of a disappearing chat album.",
    ],
    exhibits: ftlVsPtlExhibits["Transit time, working capital, and cash-flow velocity"],
  },
  {
    heading: "Statutory and documentation compliance: e-Way Bill Part B multi-vehicle updating",
    paragraphs: [
      "Under CGST Rule 138 practice, Part B must track the vehicle that actually moves the goods. PTL cargo that hops feeder tempo to trunk trailer to local van needs Part B updates and, where applicable, multi-vehicle consolidation under Form GST EWB-02. Confirm bare rules and CBIC circulars before a legal memo.",
      "Highway interception under Section 129 is the operational nightmare: one expired or mis-updated docket in a mixed sundry trailer can trap every compliant consignment on that vehicle for days. Your clean cargo pays for someone else's paperwork failure.",
      "Dedicated FTL keeps a clean single-vehicle Part B from origin to gate. No intermediate hub rewrite for that consignment. That regulatory simplicity is part of the service value - not a slogan. Place those lanes on [dedicated fleet](/logistics/dedicated-fleet).",
    ],
    exhibits: ftlVsPtlExhibits["Statutory and documentation compliance: e-Way Bill Part B multi-vehicle updating"],
  },
  {
    heading: "Worked numerical case study: 4.5-tonne industrial consignment (Chakan to Sanand)",
    paragraphs: [
      "Workshop corridor only - not a ZAFTYS audited claim file. A precision automotive and electrical shipper moves 4,500 kg (4.5 MT), 12 pallets, invoice Rs 28,00,000, from Chakan (Pune) to Sanand (Ahmedabad), about 660 km.",
      "Model A is a national PTL sundry network at Rs 7.50 per kg. Model B is a dedicated 19-ft closed-body FTL (~6.5 T payload) at Rs 38,000 trip. Sticker comparison says PTL wins at Rs 33,750. Landed comparison does not.",
      "Add docket, hamali, and FOV (+Rs 4,740), mandatory wooden crating (+Rs 9,000), working capital drag on a five-day delta (+Rs 550), and a 1.8% damage scrap allowance (+Rs 5,040) - a workshop allowance for this teaching ledger, not a ZAFTYS audited claims rate. Landed PTL becomes Rs 53,490. Dedicated FTL stays Rs 38,000, arrives in about 22 hours instead of about six days, and saves roughly Rs 15,490 (~29%).",
      "That is why industrial desks that only compare ₹/kg keep losing money. Ask for a landed-cost quote on your consolidation lanes via [dedicated fleet](/logistics/dedicated-fleet) or WhatsApp origin, destination, and weekly tonnes.",
    ],
    exhibits: ftlVsPtlExhibits["Worked numerical case study: 4.5-tonne industrial consignment (Chakan to Sanand)"],
  },
  {
    heading: "When PTL still beats dedicated FTL (and when to switch)",
    paragraphs: [
      "PTL still wins when the job is multi-destination: five customers in five cities is five sundry dockets, not five trucks. It also wins on regular sub-~2 tonne non-fragile spares, sporadic samples to remote Tier-3/4 locations, schedule slack ('this week' not 'Thursday'), and plants that cannot stage a full truck at the dock.",
      "Switch to FTL when consolidated dispatches cross about 3.5 tonnes or about three-quarters of the smallest suitable truck, when finished goods hate water or scratches, when assembly lines carry late-delivery penalties, or when cargo is pilferage-prone (copper, electronics, brass, batteries).",
      "Plot shipment density / volume against cargo value / fragility. Then recompute on that lane's density - dense trunk vs thin town - before you lock a national rule into the SOP.",
      "Use the eight-point transition protocol: density audit, consolidation rhythm, packaging strip, vehicle sizing, seal and route lock, direct gate load, ePOD closeout, cash-flow acceleration. Reserved capacity on repeating lanes belongs on [contract logistics](/logistics/contract-logistics). Surge overflow stays labeled - see [spot vs dedicated](/blog/spot-market-vs-dedicated-fleet-india).",
      "If you already know the lanes that should move off sundry, send them to the desk. We quote dedicated industrial FTL first.",
    ],
    exhibits: ftlVsPtlExhibits["When PTL still beats dedicated FTL (and when to switch)"],
  },
  {
    heading: "LinkedIn abstract (copy for distribution)",
    paragraphs: [
      "FTL vs PTL in India is not a sticker ₹/kg fight. Part truckload (also called LTL or sundry) shares hubs and bills chargeable weight - often with a 10 lbs/CFT volumetric trap on high-cube industrial goods. Full truckload is one sealed vehicle, origin to gate.",
      "Workshop starting band: under about one-third of the smallest suitable truck, PTL usually wins on cost. Half to two-thirds is quote-both territory. Above about three-quarters - or roughly 3.5 to 6.0 tonnes on many industrial corridors after FOV, ODA, crating, and damage - dedicated FTL often wins on landed cost, damage, and cash-flow. Dense trunks and thin town lanes shift the crossover. Recompute with your tariff.",
      "Two expensive mistakes: half-empty FTL without consolidation, and splitting one load into several PTL dockets to avoid a truck. Full guide and worksheet: zaftys.com/blog/ftl-vs-ptl-freight-services-india-cost-break-even-guide",
    ],
    bullets: [
      "Landed cost = base + FOV + ODA + crating + scrap + inventory days",
      "Quote both modes above ~3 tonnes or ~50% of truck cube/weight",
      "Next step: dedicated FTL quote on consolidation lanes - /logistics/dedicated-fleet",
    ],
    exhibits: ftlVsPtlExhibits["LinkedIn abstract (copy for distribution)"],
  },
  {
    heading: "Frequently asked questions and statutory citations",
    paragraphs: [
      "The FAQ set below covers LTL vs PTL naming, when to quote both modes, dead freight, Carriage by Road Act evidence differences, ODA thresholds, and how to consolidate daily PTL into bi-weekly FTL. Confirm CGST Rule 138 / Form GST EWB-02, Carriage by Road Act Sections 9-10 and Rule 12, and Indian Contract Act bailment Sections 148-161 against bare text before a demand letter.",
      "Carrier volumetric factors and ODA pin lists sit in the tariff annex. This guide is orientation for procurement and plant logistics - not legal or insurance advice.",
      "When the answer is 'book the truck,' start from [dedicated fleet](/logistics/dedicated-fleet). When the answer is 'fix the claim pack,' use the [transit damage guide](/blog/transit-damage-shortage-cargo-insurance-india-carrier-liability-guide). When the answer is 'rebuild the rate card,' use the [freight rates guide](/blog/truck-freight-rates-india-cost-rate-benchmarking-guide).",
    ],
    exhibits: ftlVsPtlExhibits["Frequently asked questions and statutory citations"],
  },
];
