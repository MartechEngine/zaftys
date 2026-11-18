import type { BlogSection } from "@/lib/blog-data";
import { gtaGstExhibits } from "@/lib/blog-exhibits-gta-gst";

export const gtaGstFaqs = [
  {
    question: "What is the current GST rate on GTA services in India?",
    answer:
      "Three practical routes apply. Default for specified recipients is 5% under reverse charge (RCM), paid in cash by the recipient with no ITC for the GTA on that service. A GTA that opts into forward charge may bill 5% without ITC, or 18% with full ITC from 22 September 2025 under Notification No. 15/2025-Central Tax (Rate) (the with-ITC option was 12% until 21 September 2025). Confirm the live rate schedule and Annexure V election before coding AP. Orientation only - not tax advice.",
  },
  {
    question: "What legally makes a transporter a Goods Transport Agency (GTA) under GST?",
    answer:
      "GTA character turns on providing service in relation to transport of goods by road and issuing a consignment note (by whatever name called), under Section 2(98) of the CGST Act read with Notification No. 11/2017-Central Tax (Rate). Owning or operating trucks alone does not make an entity a GTA. Tag every road vendor as GTA or non-GTA in master data before the first freight invoice posts.",
  },
  {
    question: "What happens if a shipper pays freight to an individual truck driver who does not issue a consignment note?",
    answer:
      "If the person is not a GTA because no consignment note is issued, the service may fall under the non-GTA road-transport exemption path under Notification No. 12/2017-Central Tax (Rate) as amended. That call is fact-heavy: who controlled the vehicle, what paper exists, and whether the arrangement was pure truck hire versus GTA service. Plants that treat every roadside hire as automatically exempt - or every bare cash voucher as GTA RCM - create departmental disputes either way. This guide is orientation, not tax advice.",
  },
  {
    question: "Can a company pay RCM on freight using Input Tax Credit in its Electronic Credit Ledger?",
    answer:
      "No. Reverse-charge liability on notified services is discharged in cash through the Electronic Cash Ledger. Eligible ITC is claimed separately - commonly framed through Table 4 of GSTR-3B for RCM - after the cash tax has been paid. Mixing the two ledgers is one of the most common AP configuration errors on freight.",
  },
  {
    question: "When must a GTA file Annexure V to opt for forward charge?",
    answer:
      "Annexure V is filed on the GST Common Portal, commonly between 1 January and 31 March of the year preceding the financial year for which forward charge will apply, or within the notified new-registration window. Once opted, the choice typically continues until Annexure VI is filed to exit. Side letters and rate-contract footnotes do not replace the portal election. Confirm the live portal advisory for the year in question.",
  },
  {
    question: "Can a GTA claim ITC on diesel under the 18% forward-charge option?",
    answer:
      "No in the usual path. Diesel is outside GST, so there is no GST ITC on diesel itself. The 18% with-ITC forward-charge option unlocks credit on eligible GST-taxed inputs and capital goods such as trucks, tyres, spares, and many services - subject to blocked-credit rules under Sections 16 and 17. Do not confuse diesel cost recovery in the freight rate with GST ITC.",
  },
  {
    question: "Were the Rs 750 and Rs 1,500 GTA exemptions withdrawn?",
    answer:
      "Yes. Notification No. 04/2022-Central Tax (Rate) withdrew the Entry 21 threshold exemptions for (i) consideration not exceeding Rs 1,500 for goods transported in a single carriage, and (ii) consideration not exceeding Rs 750 for all goods for a single consignee, with effect from 18 July 2022. Narrow goods-specific exemptions (for example agricultural produce, milk, salt, foodgrains, certain defence and relief movements) still need commodity mapping on the consignment note. Source PDF orientation: [Notification 04/2022-CT (Rate)](https://cbic-gst.gov.in/pdf/central-tax-rate/04_2022-ctr-eng.pdf).",
  },
  {
    question: "Can a GTA switch between 5% RCM and 18% forward charge mid-year for different customers?",
    answer:
      "Forward charge is an entity-level election through Annexure V for the financial year - not a per-customer toggle on the rate card. Billing some shippers at 18% (or the historical 12% rate for pre-22 Sep 2025 supplies) and others as if RCM applies, without a valid portal election and matching invoice endorsements, is how assessments begin. Annexure VI covers the notified exit path back toward RCM.",
  },
  {
    question: "Is GST applicable on vehicle detention and demurrage billed by a transporter?",
    answer:
      "Often yes when billed as part of, or incidental to, a taxable GTA supply - but the answer depends on the contract line description, whether a consignment note sits behind the trip, and which rate notification entry the vendor uses. Do not bury detention inside a diesel escalation clause and hope tax follows the diesel story. Tax classification still needs counsel.",
  },
] as const;

export const gtaGstSections: readonly BlogSection[] = [
  {
    heading: "What legally constitutes a Goods Transport Agency under GST",
    paragraphs: [
      "Composite from plant audit practice (details changed). A western India engineering buyer hired roadside trucks for three months on cash vouchers and WhatsApp RC photos. Finance booked the lines as exempt 'truck hire.' The assessment file asked a simpler question: where are the consignment notes? There were none. The department argued GTA. The plant argued non-GTA. Both sides were arguing about a document that had never been created. The fight was expensive because the master data decision had never been made.",
      "Start with the statute, not the axle count. Section 2(98) of the CGST Act and the rate entries under Notification No. 11/2017-Central Tax (Rate) define a Goods Transport Agency by what the person does - provide service in relation to transport of goods by road and issue a consignment note, by whatever name called. Owning or operating commercial trucks does not, by itself, make an entity a GTA.",
      "That litmus test is the entire classification engine. A fleet company that issues controlled LR stationery on every trip is almost certainly in GTA territory. An individual truck owner (truck-malik) who only rents the vehicle and never issues a note may sit outside GTA. The legal character follows the paper trail and the nature of the service, not the paint on the cabin.",
      "The non-GTA exemption path is real and heavily audited. Transport of goods by road by a person who is not a GTA can be exempt under the Entry 21 / 22 style framework of Notification No. 12/2017-Central Tax (Rate) as amended. That is exactly why informal hire on unvetted receipts becomes a corporate vulnerability: the plant wants exemption economics; the officer wants GTA tax; the file contains neither a clean consignment note nor a clean hire agreement.",
      "Fix master data before the first accounts-payable posting. Every road vendor in the TMS should be tagged GTA or non-GTA with a named owner for exceptions. Hybrid contract-plus-spot capacity labeling - and why unlabeled overflow recreates this mess - is covered in [spot market vs dedicated fleets](/blog/spot-market-vs-dedicated-fleet-india).",
    ],
    exhibits: gtaGstExhibits["What legally constitutes a Goods Transport Agency under GST"],
  },
  {
    heading: "The consignment note: statutory structure, legal role, and evidentiary weight",
    paragraphs: [
      "The consignment note is older than GST. Rule 4B of the Service Tax Rules, 1994 set mandatory particulars for notes issued by goods transport agencies. GST jurisprudence and departmental practice still treat that structure as the evidentiary spine when officers ask whether a road movement was a GTA supply.",
      "A valid note is deliberately boring. It carries a consecutive serial number; the date of goods booking; names and GSTINs of consignor and consignee; the commercial vehicle registration number; description, weight, value, and packages of goods; origin and destination pin codes; and the person liable for paying tax - consignor, consignee, or the GTA. Missing fields are not stationery aesthetics. They are how tax ownership and custody arguments collapse later.",
      "Document hierarchy matters. A factory delivery challan proves internal movement under your control. It cannot substitute for a carrier-issued consignment note when the question is GTA classification. A tax invoice is the GST billing instrument. A consignment note / LR (bilty) is often the consignment note under another name - but only if it actually carries the particulars. Renaming a thin gate pass as 'LR' does not create Rule 4B substance.",
      "Mobile marketplaces strengthen evidence, not tax-rate choice. Digital LR copies and timestamped POD photos on a trip timeline stop finance from reconstructing a claim pack from disappearing WhatsApp albums at assessment time. Pair custody and damage hygiene with [transit damage and shortage claims](/blog/transit-damage-shortage-cargo-insurance-india-carrier-liability-guide) and close-out mechanics in the [ePOD billing guide](/blog/epod-fastag-eway-bill-billing-india).",
    ],
    exhibits: gtaGstExhibits["The consignment note: statutory structure, legal role, and evidentiary weight"],
  },
  {
    heading: "The master tax matrix: 5% RCM vs 5% forward vs 18% forward charge",
    paragraphs: [
      "Commercial road freight under GTA has three practical tax routes. Use the decision aid first: is it road transport of goods; is the supplier a GTA (consignment-note litmus); does RCM apply to this recipient; if forward charge, is Annexure V valid; then confirm rate, payer, invoice treatment, and only then assess ITC eligibility. Memorize cash direction and ITC rights before you memorize the percentage on a slide. Wrong route selection is how shippers double-pay and how carriers strand capital credits. Educational orientation only - not tax advice.",
      "Route A is 5% Reverse Charge under Section 9(3) of the CGST Act (and the parallel IGST framing where applicable). The registered specified recipient pays 5% directly into the Government treasury in cash through the Electronic Cash Ledger. The transporter takes zero Input Tax Credit on that GTA service. The recipient may claim 100% of the 5% as ITC when the service is used for business furtherance, typically through the RCM tables of GSTR-3B.",
      "Route B is 5% forward charge without ITC under Section 9(1). The GTA bills 5% on the freight tax invoice and deposits it. The GTA still cannot claim ITC on operational inputs such as diesel (already outside the usual credit path), tyres, and truck capital under this option. The recipient pays 5% to the GTA and claims ITC only when the invoice appears cleanly in GSTR-2B.",
      "Route C is 18% forward charge with full ITC under Section 9(1), after a valid Annexure V election. From 22 September 2025, Notification No. 15/2025-Central Tax (Rate) raised the with-ITC option from 12% to 18% (9% CGST + 9% SGST, or 18% IGST). The GTA bills 18%. It can recover eligible GST on capital assets - new truck purchases often at 28%, radial tyres often at 28%, maintenance and spares often at 18%, plus telematics and TMS software - subject to blocked-credit rules. The recipient pays 18% to the GTA and claims the same through GSTR-2B matching. Supplies up to 21 September 2025 remain at the historical 12% with-ITC rate.",
      "For GST-registered manufacturers, net GST cost after clean ITC can look similar across Route A and Route C. Cash timing and dependency do not. RCM parks cash with Government first and frees ITC in the same period if claimed correctly. Forward charge parks cash with the vendor and waits on the vendor's GSTR-1 - and at 18% the interim cash parked with the vendor is larger than under the old 12% card. How the underlying trip rate itself was built - diesel, standing cost, backhaul - still sits in the [truck freight rates guide](/blog/truck-freight-rates-india-cost-rate-benchmarking-guide).",
    ],
    exhibits: gtaGstExhibits["The master tax matrix: 5% RCM vs 5% forward vs 18% forward charge"],
  },
  {
    heading: "The specified recipient rule: who pays tax under Section 9(3)",
    paragraphs: [
      "RCM does not apply to every person who pays a truck. It applies when the recipient of the GTA service is a specified person under the principal RCM notification - Notification No. 13/2017-Central Tax (Rate) and its amendments. The usual industrial list includes factories registered under the Factories Act, 1948; societies; co-operative societies; persons registered under CGST / SGST / UTGST / IGST; bodies corporate; partnership firms (registered or unregistered) including LLPs; and casual taxable persons.",
      "Read the live annex, not a 2017 training deck. Category edges matter for trusts, government bodies, and special entities. A desk that auto-codes every freight bill to RCM without checking recipient status will eventually invent liabilities - or miss them.",
      "Priority rule for 'who is the recipient': the person who pays, or is liable to pay, the freight for transportation of goods. Ex-factory / FOB contracts where the consignee pays freight typically put RCM on the consignee when that consignee is specified. FOR destination contracts where the consignor pays freight typically put RCM on the consignor. Ambiguous 'freight as actual' clauses create ownership fights after the truck has already moved and the tax period has closed.",
      "When the recipient is an unregistered individual or consumer, the Section 9(3) RCM logic often collapses. The GTA must then discharge tax under forward charge. That is why marketplace trips to unregistered buyers and registered factories cannot share one blind tax code. Contract templates should name the freight payer in the same clause that names the Incoterm.",
    ],
    exhibits: gtaGstExhibits["The specified recipient rule: who pays tax under Section 9(3)"],
  },
  {
    heading: "Statutory declarations: Annexure V, Annexure VI, and invoice endorsements",
    paragraphs: [
      "Notification No. 03/2022-Central Tax (Rate) made the forward-charge option procedural rather than informal. The election lives on the GST Common Portal. A side letter to the plant logistics head, or a line in a rate contract, does not replace Annexure V.",
      "Annexure V is the formal opt-in by a GTA to pay tax under forward charge. It is filed before the financial year begins - commonly in the 1 January to 31 March window - or within the notified period after obtaining a new registration (often discussed as a 45-day style window; confirm the live portal instruction for that registration). Annexure VI is the declaration path for exiting forward charge and returning toward the RCM default regime under the notified process.",
      "The freight tax invoice must speak the election. Forward-charge invoices need the statutory endorsement language: registration under the CGST Act exists; the option to pay tax on GTA services under forward charge has been exercised for the stated financial year; and conditions have not been violated. Exact wording should follow the notification / portal text, not a paraphrased marketing footer.",
      "Missing endorsements are not formatting nits. Corporate desks and officers often treat a bare invoice as defaulting back to RCM under Section 9(3). Shippers who already paid tax to the vendor then face a second cash demand - classic double-taxation dispute fuel. Automate the gate: [ZAFTYS TMS](/zaftys-tms) should validate Annexure V status and block settlement when the scanned invoice lacks the declaration the vendor's election implies.",
    ],
    exhibits: gtaGstExhibits["Statutory declarations: Annexure V, Annexure VI, and invoice endorsements"],
  },
  {
    heading: "The omission of Rs 750 and Rs 1,500 exemptions: post-July 2022 reality",
    paragraphs: [
      "Before 18 July 2022, many industrial and trading desks treated small freight as automatically clean. Entry 21 style relief under Notification No. 12/2017-Central Tax (Rate) commonly exempted GTA services where consideration charged for transportation of goods on a consignment transported in a single carriage did not exceed Rs 1,500, or where consideration charged for transportation of all such goods for a single consignee did not exceed Rs 750. Rate cards and SOPs still whisper those numbers years later.",
      "Notification No. 04/2022-Central Tax (Rate) withdrew that threshold regime with effect from 18 July 2022. The policy problem was not only revenue. It was leakage by design: splitting one truck movement into multiple sub-Rs 750 dockets so each 'consignee' line stayed under the cap. The exemption invited stationery games.",
      "Current reality is blunt for GTA supplies. Even a Rs 500 part-load freight docket issued by a GTA can attract GST - either under RCM when a specified recipient pays freight, or under forward charge when the GTA bills tax. Desks that still tell buyers 'under 750 is exempt' are running outdated folklore into live AP.",
      "Narrow goods-specific exemptions survive and must be mapped carefully: agricultural produce, milk, salt, foodgrains such as rice, wheat and pulses, certain defence / military equipment movements, organic manure, and relief materials for natural disasters, among other notified categories. Commodity language on the consignment note matters more than the old rupee caps. Mode choice between FTL and PTL remains a separate landed-cost problem in the [FTL vs PTL guide](/blog/ftl-vs-ptl-freight-services-india-cost-break-even-guide).",
    ],
    exhibits: gtaGstExhibits["The omission of Rs 750 and Rs 1,500 exemptions: post-July 2022 reality"],
  },
  {
    heading: "Worked financial case: 5% RCM vs 18% forward charge on Rs 10 lakh monthly freight",
    paragraphs: [
      "Workshop only - not a ZAFTYS audited client file. An engineering component plant books about Rs 10,00,000 of monthly freight across roughly 25 long-haul FTL shipments. The teaching question is cash-flow and ITC mechanics, not which transporter logo looks more organized.",
      "Model A: contracted transporter operates under 5% RCM. The transporter bills net freight of Rs 10,00,000 and takes no ITC on the GTA service. The shipper pays Rs 10,00,000 to the vendor and discharges Rs 50,000 RCM through the Electronic Cash Ledger, then claims Rs 50,000 eligible ITC in the same tax period when Table 4 framing and business-use tests are met. Net GST cost can be Rs 0. Cash was still parked with Government first.",
      "Model B: organized transporter operates under 18% forward charge with full ITC after Annexure V (post-22 Sep 2025 rate under Notification No. 15/2025-CT Rate). The transporter bills Rs 10,00,000 plus Rs 1,80,000 GST. The shipper pays Rs 11,80,000 to the vendor and claims Rs 1,80,000 ITC when the invoice appears in GSTR-2B. Net GST cost can again be Rs 0 - if the vendor files. If GSTR-1 slips, Section 16(2)(aa) freezes the credit while cash has already left the company. For supplies up to 21 Sep 2025, the same Model B used 12% (Rs 1,20,000 GST / Rs 11,20,000 cash to vendor).",
      "The financial reveal for registered manufacturers is that 18% forward charge can be GST cash-flow neutral after clean ITC, while enabling organized fleets to recover eligible GST on trucks and tyres that an RCM-only operator cannot unlock on the same path - subject to blocked-credit rules. Whether that produces a lower base freight is a negotiation hypothesis, not a measured national discount. The trade-off is larger interim cash parked with the vendor until GSTR-2B clears. Do not assume 18% is automatically fully recoverable, or that 5% is automatically the lowest economic cost.",
      "Single-trip arithmetic example (hypothetical): on Rs 50,000 taxable freight, 5% is Rs 2,500 and 18% is Rs 9,000. Under RCM the liable recipient pays under applicable rules; under forward charge the supplier invoices and pays. Match contract, consignment note, e-Way Bill where applicable, tax invoice, GSTIN, payment evidence, and ledger entry before claiming ITC.",
      "Rebuild the trip operating floor with the [freight rates guide](/blog/truck-freight-rates-india-cost-rate-benchmarking-guide) before you convert a tax-route preference into a rate negotiation. Tax neutrality on GST does not make a bad diesel clause cheap.",
    ],
    exhibits: gtaGstExhibits["Worked financial case: 5% RCM vs 18% forward charge on Rs 10 lakh monthly freight"],
  },
  {
    heading: "Freight invoicing, e-invoicing, and GSTR-2B audit reconciliation",
    paragraphs: [
      "E-invoicing under Rule 48(4) follows aggregate turnover thresholds notified over time. When a GTA crosses the live limit, Invoice Reference Number (IRN) generation and QR codes become part of the freight tax invoice. Treating IRN as optional stationery is how e-invoice non-compliance and ITC disputes arrive together.",
      "Forward charge creates a hard GSTR-2B dependency. If the GTA fails to report the invoice in GSTR-1, the recipient's ITC is blocked under Section 16(2)(aa) until the document appears. Plants that 'trust the PDF' without watching 2B are financing the vendor's filing delay with their own working capital.",
      "RCM flips the dependency structure. The recipient pays tax directly via GSTR-3B in cash and claims self-generated ITC in the same tax period. Vendor filing risk falls. Cash-ledger discipline and correct table mapping rise. That is why some CFOs prefer RCM on chaotic spot vendors even when a forward-charge fleet is cheaper on base freight - they are buying filing certainty, not only a percentage.",
      "Enterprise TMS should automate three controls. Validate transporter GSTIN status and Annexure V election before AP posts. Auto-split ledgers into RCM cash liability versus forward-charge vendor payout. Block invoice settlement when the mandatory forward-charge declaration is missing from the vendor's scanned tax invoice or LR pack. Gate-to-pay document architecture sits in the [industrial TMS control stack](/blog/industrial-tms-control-stack-india); marketplace evidence packs sit in the [load marketplaces guide](/blog/online-truck-load-marketplaces-india-freight-apps-guide).",
    ],
    exhibits: gtaGstExhibits["Freight invoicing, e-invoicing, and GSTR-2B audit reconciliation"],
  },
  {
    heading: "Standard operating procedure: the 8-step corporate freight tax audit workflow",
    paragraphs: [
      "Procurement heads, plant dispatchers, and accounts payable need one written protocol. Eight stages. No folklore about 'small freight is exempt' and no verbal tax ownership after the truck has left.",
      "Step 01: vendor classification and GSTIN profile setup - tag GTA versus individual truck owner before the first indent. Step 02: verify Annexure V portal election for the financial year when forward charge is claimed. Step 03: inspect the consignment note / LR for mandatory particulars. Step 04: determine the primary tax route - RCM versus forward charge - from vendor profile, recipient status, and freight-payer clause.",
      "Step 05: validate the freight tax invoice and statutory declaration text. Step 06: cross-match e-Way Bill Part B vehicle number to the LR and gate photos. Step 07: discharge RCM liability through the Electronic Cash Ledger in GSTR-3B when RCM applies. Step 08: reconcile ITC - Table 4 for RCM credits, GSTR-2B for forward-charge credits - before the month closes.",
      "The decision tree exhibit is the wall chart: consignment note first, Annexure V second, specified recipient third. When capacity is hybrid - dedicated contract fleets plus open marketplace overflow - keep the same SOP. Overflow trucks still need a tax path before the gate opens, or finance inherits a WhatsApp classification problem at month-end.",
    ],
    exhibits: gtaGstExhibits["Standard operating procedure: the 8-step corporate freight tax audit workflow"],
  },
  {
    heading: "The 20-point industrial freight tax readiness matrix and FAQs",
    paragraphs: [
      "Score the diagnostic matrix with plant logistics and finance in the same room. Rate each line 1 to 5 across vendor classification, documentation, tax accounting, and portal / invoice controls. Skip equals 0. A TMS demo that cannot block a missing Annexure V endorsement has not passed invoice readiness.",
      "The donut is a teaching pie for how audited freight ledgers often break in practice: compliant 5% RCM correctly discharged in cash; compliant forward-charge invoices with valid Annexure V; disputed RCM from delayed cash-ledger payments; and ineligible non-consignment-note vouchers misclassified as truck rentals. It is a workshop denominator, not a national audit index.",
      "FAQs below cover the current GTA rate card, GTA definition, non-note hire, cash-ledger RCM, Annexure V timing, diesel ITC myths, the withdrawn Rs 750 / Rs 1,500 thresholds, mid-year switching, and detention GST.",
      "Statutory orientation only: CGST Act Sections 2(98), 9(1), 9(3), 16(2), 31, and 50; IGST Act Section 5(3); Notification No. 11/2017-CT (Rate) as amended including Notification No. 03/2022 and Notification No. 15/2025 (18% with-ITC from 22 Sep 2025); Notification No. 12/2017-CT (Rate) as amended by Notification No. 04/2022; Notification No. 13/2017-CT (Rate); GST Council recommendations on GTA rate flexibility. Confirm bare text and current circulars before a demand letter or tax memo. This dossier is boardroom operations research - not a substitute for counsel.",
      "Next step: automate determination, Annexure V checks, and ledger split in [ZAFTYS TMS](/zaftys-tms), and keep digital consignment-note / POD evidence on [TranZfort](https://www.tranzfort.com) (also [TranZfort marketplace](/network/tranzfort)) for verified open-market capacity that still posts into the same freight tax ledger.",
    ],
    exhibits: gtaGstExhibits["The 20-point industrial freight tax readiness matrix and FAQs"],
  },
];
