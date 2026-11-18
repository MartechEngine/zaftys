/** Deep-research exhibits: GST on GTA - RCM vs forward charge.
 * Pure TypeScript. Zero em-dashes or en-dashes; spaced hyphens only.
 * Orientation for ops and finance desks. Not tax advice.
 */
import { zaftysViz } from "@/lib/blog-exhibits-tms-eval";
import type { BlogExhibit, BlogKpi } from "@/lib/blog-data";

export const gtaGstKpis: readonly BlogKpi[] = [
  {
    value: "5% RCM",
    label: "Default specified-recipient rate",
    detail:
      "Statutory route under Section 9(3) where the registered recipient pays 5% in cash and the transporter takes zero ITC on that GTA service. Confirm bare notifications before a tax memo.",
  },
  {
    value: "18% Forward",
    label: "Full-ITC carrier election",
    detail:
      "Forward charge with ITC is 18% from 22 Sep 2025 (Notification No. 15/2025-CT Rate; was 12% until 21 Sep 2025). Requires a valid Annexure V portal election.",
  },
  {
    value: "Rs 0",
    label: "Rs 750 / Rs 1,500 exemption",
    detail:
      "Historic single-consignment and full-vehicle exemptions withdrawn under Notification No. 04/2022-CT (Rate). Small GTA dockets still attract GST.",
  },
  {
    value: "100%",
    label: "Consignment note litmus",
    detail:
      "Issuing a consignment note (by whatever name) is the legal criterion that makes road transport a GTA service - not mere truck ownership.",
  },
  {
    value: "Annexure V",
    label: "Forward-charge portal election",
    detail:
      "Annual GST Common Portal declaration before the financial year (or within the new-registration window) to bill under forward charge.",
  },
  {
    value: "18% p.a.",
    label: "Section 50 interest risk",
    detail:
      "Interest exposure on delayed RCM cash discharge when desks misclassify freight invoices. Penalty framing under Section 122 is separate.",
  },
] as const;

export const gtaGstTakeaways = [
  "Owning trucks is not enough. GTA status under Section 2(98) / Notification 11/2017 turns on providing road transport of goods and issuing a consignment note - by whatever name called.",
  "Non-GTA hire without a consignment note can be exempt under Notification 12/2017 - and that exact fact pattern is what GST audits attack when plants book informal trucks on bare cash vouchers.",
  "Three commercial routes: 5% RCM under Section 9(3) (recipient cash, transporter zero ITC), 5% forward without ITC, and 18% forward with full ITC after a valid Annexure V election (12% applied only to supplies up to 21 Sep 2025).",
  "Missing forward-charge invoice endorsements often default the trip back to RCM - classic double-tax exposure when the shipper already paid GST to the vendor.",
  "Rs 750 / Rs 1,500 threshold exemptions were withdrawn by Notification 04/2022. Even small GTA dockets attract GST; only narrow goods-specific exemptions survive and need commodity mapping on the LR.",
  "For GST-registered manufacturers, 18% forward charge is often GST-neutral after clean ITC while letting organized fleets recover truck/tyre tax - but ITC then depends on GSTR-2B vendor filing.",
] as const;

export const gtaGstReferences = [
  "[CGST Act, 2017](https://www.indiacode.nic.in/handle/123456789/11537?locale=en) - Sections 2(98), 9(1), 9(3), 16(2), 31, and 50. Confirm bare text and amendments before a demand reply.",
  "IGST Act, 2017 - Section 5(3) for inter-State reverse charge framing on notified services.",
  "[GST Council - September 2025 FAQ](https://www.gstcouncil.gov.in/sites/default/files/2025-09/faq_0.pdf) - official FAQ discussing GTA 5% without ITC and 18% with full eligible ITC framing from 22 Sep 2025.",
  "[GST Council - September 2025 press release](https://gstcouncil.gov.in/sites/default/files/2025-09/press_release_press_information_bureau_0.pdf) - Council recommendations context; rate cards still follow notified text.",
  "[CBIC Notification No. 11/2017-Central Tax (Rate)](https://taxinformation.cbic.gov.in/view-pdf/1000997/ENG/Notifications) as amended - GTA rate entries and forward-charge option (confirm subsequent amendments).",
  "[Notification No. 15/2025-Central Tax (Rate)](https://gst.karnataka.gov.in/Documents/NOTIFICATIONS/CTR1518925.pdf) (17 Sep 2025) - with-ITC forward-charge central tax raised so the option is 18% from 22 Sep 2025 (was 12% until 21 Sep 2025).",
  "[Notification No. 12/2017-Central Tax (Rate)](https://cbic-gst.gov.in/pdf/central-tax-rate/Notification12-CGST.pdf) as amended - exemption entries for GTA commodities.",
  "[Notification No. 04/2022-Central Tax (Rate)](https://cbic-gst.gov.in/pdf/central-tax-rate/04_2022-ctr-eng.pdf) (13 Jul 2022; effective 18 Jul 2022) - withdrawal of Entry 21 threshold exemptions for single carriage ≤ Rs 1,500 and single consignee ≤ Rs 750.",
  "[Notification No. 13/2017-Central Tax (Rate)](https://cbic-gst.gov.in/pdf/central-tax-rate/Notification13-CGST.pdf) - principal RCM notification listing GTA among notified services and specified recipients.",
  "Service Tax Rules, 1994 - Rule 4B consignment-note particulars (historical grounding; not standalone GST authority - explain only where current GST law still supports the proposition).",
  "Methodology: rate arithmetic tables are illustrative only and do not determine the applicable route for a shipment. Have a qualified GST professional approve the decision table before relying on it.",
  "Product: [TranZfort](https://www.tranzfort.com) · [TranZfort marketplace](/network/tranzfort).",
  "Internal cluster: [truck freight rates](/blog/truck-freight-rates-india-cost-rate-benchmarking-guide), [ePOD billing](/blog/epod-fastag-eway-bill-billing-india), [spot vs dedicated](/blog/spot-market-vs-dedicated-fleet-india), [transit damage](/blog/transit-damage-shortage-cargo-insurance-india-carrier-liability-guide), [industrial TMS](/blog/industrial-tms-control-stack-india), [cost leaks](/blog/5-hidden-cost-leaks-heavy-industrial-freight-tms-3pl-guide), [load marketplaces](/blog/online-truck-load-marketplaces-india-freight-apps-guide).",
] as const;

export const gtaGstExhibits: Record<string, readonly BlogExhibit[]> = {
  "What legally constitutes a Goods Transport Agency under GST": [
    {
      kind: "callout",
      caption: "Methodology and corrections",
      source: "Editorial standard for this guide.",
      items: [
        {
          title: "Illustrative vs legal",
          body: "Rate arithmetic and decision aids are educational. Notifications and portal text control. No named GST professional has signed this page.",
          tone: "warm",
        },
        {
          title: "Corrections",
          body: "Report a factual or citation error to contact@zaftys.com with the article URL and the claim to check.",
          tone: "teal",
        },
      ],
    },
    {
      kind: "callout",
      caption: "Key definitions (quotable)",
      source: "Orientation. Confirm bare CGST Act and rate notifications before a tax memo.",
      items: [
        {
          title: "GTA",
          body: "Person who provides service in relation to transport of goods by road and issues a consignment note - by whatever name called (Section 2(98) / Notification 11/2017 framing).",
          tone: "teal",
        },
        {
          title: "Consignment note",
          body: "Carrier-issued goods receipt with Rule 4B-style particulars (serial, parties, vehicle, goods, pins, person liable for tax). Factory delivery challans are not substitutes.",
          tone: "navy",
        },
        {
          title: "RCM vs forward charge",
          body: "RCM: specified recipient pays 5% in cash. Forward charge: GTA bills 5% without ITC or 18% with ITC (from 22 Sep 2025) after Annexure V.",
          tone: "warm",
        },
      ],
    },
    {
      kind: "callout",
      caption: "Legal litmus test (orientation)",
      source: "Section 2(98) CGST Act and Notification No. 11/2017-CT (Rate) framing. Confirm bare text.",
      items: [
        {
          title: "GTA",
          body: "Person who provides service in relation to transport of goods by road AND issues a consignment note - by whatever name called.",
          tone: "teal",
        },
        {
          title: "Not automatic",
          body: "Owning or operating commercial trucks alone does not make the entity a GTA.",
          tone: "navy",
        },
      ],
    },
    {
      kind: "tiles",
      caption: "Non-GTA exemption trap",
      source: "Entry 21 / 22 style exemptions under Notification No. 12/2017-CT (Rate). Commodity and fact-specific.",
      items: [
        {
          title: "Truck owner (truck-malik), no note",
          body: "Individual owner-operator who does not issue a consignment note can sit outside GTA - road transport then often treated as exempt.",
        },
        {
          title: "Audit vulnerability",
          body: "Hiring informal trucks on unvetted receipts without a note creates misclassification fights in departmental audits.",
        },
        {
          title: "Desk rule",
          body: "Tag every vendor as GTA or non-GTA in the TMS master before the first trip posts to AP.",
        },
      ],
    },
  ],

  "The consignment note: statutory structure, legal role, and evidentiary weight": [
    {
      kind: "table",
      caption: "Mandatory particulars on a valid consignment note (workshop checklist)",
      source: "Rule 4B Service Tax Rules lineage carried into GST practice. Confirm current circulars before a legal memo.",
      headers: ["#", "Particular", "Why auditors care"],
      rows: [
        ["1", "Consecutive serial number", "Proves controlled stationery / system series"],
        ["2", "Date of goods booking", "Tax period and transit timeline"],
        ["3", "Consignor and consignee name + GSTIN", "Identifies parties and registration status"],
        ["4", "Vehicle registration number", "Matches e-Way Bill Part B and gate photos"],
        ["5", "Goods description, weight, value, packages", "Links freight to cargo and declared value"],
        ["6", "Origin and destination pin codes", "Lane evidence for IGST / CGST+SGST"],
        ["7", "Person liable for tax", "Consignor, consignee, or GTA - drives RCM vs forward"],
      ],
    },
    {
      kind: "tiles",
      caption: "Document hierarchy (do not confuse the stack)",
      source: "Operating briefing. Carriage and GST documents serve different jobs.",
      items: [
        {
          title: "Consignment note / LR",
          body: "Carrier-issued goods receipt that can establish GTA character and custody.",
        },
        {
          title: "Delivery challan",
          body: "Internal factory movement paper. Cannot substitute a carrier consignment note for GTA classification.",
        },
        {
          title: "Tax invoice",
          body: "GST billing document. Must carry rate, tax, and forward-charge endorsement when opted.",
        },
        {
          title: "TranZfort trail",
          body: "Digital LR / POD photos on the trip timeline preserve the audit pack for corporate desks.",
        },
      ],
    },
  ],

  "The master tax matrix: 5% RCM vs 5% forward vs 18% forward charge": [
    {
      kind: "flow",
      caption: "Educational tax-route decision aid (not tax advice)",
      source: "Exact treatment depends on transaction facts and current law. Have a qualified GST professional approve before coding AP.",
      items: [
        { title: "1. Road goods transport?", body: "If not, stop applying GTA rate cards." },
        { title: "2. Is the supplier a GTA?", body: "Consignment-note / Section 2(98) litmus - else classify the actual service." },
        { title: "3. Non-GTA path?", body: "If not GTA, determine the correct classification - do not auto-apply GTA treatment." },
        { title: "4. Recipient / RCM?", body: "Check Notification 13/2017 conditions before assuming reverse charge." },
        { title: "5. Forward charge?", body: "Verify Annexure V election and invoice endorsement conditions." },
        { title: "6. Rate + payer", body: "Confirm applicable rate, tax-payment responsibility, and invoice treatment." },
        { title: "7. ITC last", body: "Assess ITC only after eligibility, documentation, and blocked-credit rules." },
        { title: "8. Audit trail", body: "Record notification, entry/paragraph, and date of conclusion." },
      ],
    },
    {
      kind: "table",
      caption: "Three operating tax routes for commercial road freight (workshop)",
      source: "Rate entries under Notification No. 11/2017 as amended by Notification No. 15/2025-CT (Rate). Confirm current rate schedule.",
      headers: ["Route", "Who bills / pays", "ITC for GTA", "ITC for recipient"],
      rows: [
        [
          "A - 5% RCM (Sec 9(3))",
          "Recipient pays 5% to Government in cash",
          "Zero on that GTA service",
          "Claims 5% if used for business (Table 4 framing)",
        ],
        [
          "B - 5% forward, no ITC",
          "GTA bills 5% on invoice",
          "Zero on ops inputs",
          "Claims via GSTR-2B match",
        ],
        [
          "C - 18% forward with ITC",
          "GTA bills 18% on invoice (from 22 Sep 2025; was 12%)",
          "Full ITC on eligible inputs / capital",
          "Claims 18% via GSTR-2B match",
        ],
      ],
    },
    {
      kind: "table",
      caption: "Illustrative GST arithmetic only (does not choose the route)",
      source: "Assumes the displayed freight is the taxable value. Excludes separate commercial charges. ITC timing and eligibility are separate questions.",
      headers: ["Illustrative taxable freight", "5% arithmetic", "18% arithmetic"],
      rows: [
        ["Rs 10,000", "Rs 500", "Rs 1,800"],
        ["Rs 50,000", "Rs 2,500", "Rs 9,000"],
        ["Rs 1,00,000", "Rs 5,000", "Rs 18,000"],
      ],
    },
    {
      kind: "table",
      caption: "Notification register (verify before reliance)",
      source: "Orientation register (ZAFTYS Intelligence). Cross-check linked official PDFs and live amendments before a demand reply. Not a substitute for consolidated law or CA advice.",
      headers: ["Notification / instrument", "Authority", "What it frames", "Effective / note", "Subsequent amendments", "Source"],
      rows: [
        ["11/2017-CT (Rate)", "CBIC / Central Tax (Rate)", "GTA rate entries / forward option", "2017 base; confirm live", "Incl. 03/2022 and later rate edits", "CBIC taxinformation link"],
        ["13/2017-CT (Rate)", "CBIC / Central Tax (Rate)", "RCM on notified GTA services / recipients", "Confirm live annex", "Recipient-list amendments over time", "cbic-gst.gov.in PDF"],
        ["12/2017-CT (Rate)", "CBIC / Central Tax (Rate)", "Exemption entries", "Commodity-specific", "Amended incl. 04/2022 threshold withdrawal", "cbic-gst.gov.in PDF"],
        ["04/2022-CT (Rate)", "CBIC / Central Tax (Rate)", "Withdraws Rs 750 / Rs 1,500 thresholds", "Effective 18 Jul 2022", "Confirm no later reintroduction for your facts", "cbic-gst.gov.in PDF"],
        ["15/2025-CT (Rate)", "CBIC / Central Tax (Rate)", "With-ITC option to 18%", "From 22 Sep 2025", "Confirm any later CT Rate edits", "State GST / CBIC hosted PDF"],
        ["GST Council Sep 2025 FAQ", "GST Council", "Public explanation of 5% / 18% framing", "Sep 2025 FAQ", "Orientation only; notifications control", "gstcouncil.gov.in FAQ PDF"],
      ],
    },
    {
      kind: "table",
      caption: "Hypothetical Rs 50,000 freight invoice checklist",
      source: "Illustrative reconciliation aid. Does not determine which rate or payer applies.",
      headers: ["Item", "RCM 5% scenario (if applicable)", "Forward 18% scenario (if applicable)"],
      rows: [
        ["Taxable freight value", "Rs 50,000", "Rs 50,000"],
        ["GST arithmetic", "Rs 2,500", "Rs 9,000"],
        ["Who pays tax (if that route applies)", "Liable specified recipient in cash", "Supplier invoices and deposits"],
        ["Shipper cash to vendor", "Rs 50,000 freight", "Rs 59,000 freight + GST"],
        ["Documents to match", "Contract, consignment note, e-Way Bill where applicable, tax invoice/self-invoice path, GSTIN, payment evidence, ledger", "Same + Annexure V endorsement on invoice"],
        ["ITC", "Conditional after eligibility / Table 4 framing", "Conditional after GSTR-2B and blocked-credit rules"],
      ],
    },
    {
      kind: "callout",
      caption: "Shipper cash-flow lens",
      source: "Workshop. Working-capital timing differs even when net GST is recoverable. Full ITC is not automatic eligibility for every expense.",
      items: [
        {
          title: "5% RCM",
          body: "Cash leaves the Electronic Cash Ledger first. ITC comes back in the same period if correctly claimed - but cash is still parked briefly.",
          tone: "warm",
        },
        {
          title: "18% forward",
          body: "Cash goes to the vendor with freight. ITC depends on vendor GSTR-1 appearing in GSTR-2B. Supplies up to 21 Sep 2025 stayed at 12% with ITC.",
          tone: "teal",
        },
      ],
    },
  ],

  "The specified recipient rule: who pays tax under Section 9(3)": [
    {
      kind: "steps",
      caption: "Specified persons typically liable for GTA RCM",
      source: "Notification No. 13/2017-CT (Rate) list orientation. Read the live notification annex.",
      items: [
        { title: "Factory", body: "Registered under the Factories Act, 1948." },
        { title: "Society / co-op", body: "Societies Registration Act entities and co-operative societies." },
        { title: "GST-registered person", body: "Anyone registered under CGST / SGST / UTGST / IGST." },
        { title: "Body corporate", body: "Companies established by law (Pvt Ltd, Ltd, and peers)." },
        { title: "Partnership / LLP", body: "Registered or unregistered partnership firms including LLPs." },
        { title: "Casual taxable person", body: "Casual taxable persons under GST." },
      ],
    },
    {
      kind: "tiles",
      caption: "Who is the recipient for freight tax?",
      source: "Priority rule: the person who pays or is liable to pay freight.",
      items: [
        {
          title: "Ex-factory / FOB",
          body: "Consignee pays freight - consignee typically discharges RCM when specified.",
        },
        {
          title: "FOR destination",
          body: "Consignor pays freight - consignor typically discharges RCM when specified.",
        },
        {
          title: "Unregistered recipient",
          body: "When the recipient is an unregistered individual / consumer, RCM often collapses and the GTA must bill under forward charge.",
        },
      ],
    },
  ],

  "Statutory declarations: Annexure V, Annexure VI, and invoice endorsements": [
    {
      kind: "timeline",
      caption: "Forward-charge election lifecycle",
      source: "Notification No. 03/2022-CT (Rate) mechanism. Confirm portal windows each year.",
      items: [
        {
          phase: "V",
          title: "Annexure V election",
          body: "GTA opts into forward charge on the GST Common Portal before the FY starts (1 Jan to 31 Mar window), or within the new-registration period.",
        },
        {
          phase: "INV",
          title: "Invoice endorsement",
          body: "Every freight tax invoice must carry the statutory forward-charge declaration text for that financial year.",
        },
        {
          phase: "VI",
          title: "Annexure VI exit",
          body: "Declaration to leave forward charge and return to the RCM default path - follow notified timing.",
        },
      ],
    },
    {
      kind: "callout",
      caption: "Missing endorsement risk",
      source: "Commercial dispute pattern. Not a penalty computation.",
      items: [
        {
          title: "Default to RCM",
          body: "An invoice without the exact forward-charge declaration often gets treated as RCM under Section 9(3).",
          tone: "warm",
        },
        {
          title: "Shipper exposure",
          body: "Corporate desks then face double-tax arguments: tax already paid to vendor plus RCM cash demand.",
          tone: "navy",
        },
      ],
    },
  ],

  "The omission of Rs 750 and Rs 1,500 exemptions: post-July 2022 reality": [
    {
      kind: "tiles",
      caption: "What changed after Notification No. 04/2022-CT (Rate)",
      source: "Effective 18 July 2022 orientation. Confirm gazette text.",
      items: [
        {
          title: "Before",
          body: "Entry 21 clauses (b) and (c) exempted consideration not exceeding Rs 1,500 for goods in a single carriage, or Rs 750 for all goods for a single consignee.",
        },
        {
          title: "Why removed",
          body: "Closed the split-docket leak - multiple Rs 740 notes on one truck to stay under the cap.",
        },
        {
          title: "Now",
          body: "Even a Rs 500 part-load GTA docket can attract GST under RCM or forward charge.",
        },
      ],
    },
    {
      kind: "table",
      caption: "Narrow goods-specific exemptions that still need mapping",
      source: "Surviving commodity exemptions under Notification No. 12/2017 as amended. Not a complete schedule.",
      headers: ["Category", "Desk check"],
      rows: [
        ["Agricultural produce", "Confirm definition and packing state"],
        ["Milk, salt, foodgrains", "Rice, wheat, pulses - schedule language controls"],
        ["Defence / military equipment", "Contract and end-use papers"],
        ["Organic manure", "Commodity description on LR"],
        ["Natural disaster relief materials", "Declared relief movement"],
      ],
    },
  ],

  "Worked financial case: 5% RCM vs 18% forward charge on Rs 10 lakh monthly freight": [
    {
      kind: "image",
      caption: "RCM cash outflow vs ITC recovery [TAX LIABILITY ENGINE]",
      source: "Workshop. Net tax cost can be Rs 0 after eligible ITC - cash timing still matters.",
      src: "/images/blog/gta-gst-rcm-cash-itc.png",
      alt: "Formula board showing RCM cash obligation at 5 percent of gross freight and net tax cost after Table 4 ITC reclaim",
    },
    {
      kind: "table",
      caption: "Rs 10,00,000 monthly freight - Model A (5% RCM) vs Model B (18% forward from 22 Sep 2025)",
      source: "Teaching ledger for an engineering plant with ~25 long-haul FTL trips. Not a ZAFTYS audited client file. Pre-22 Sep 2025 Model B used 12% (Rs 1,20,000 GST).",
      headers: ["Line", "Model A - 5% RCM", "Model B - 18% forward"],
      rows: [
        ["Gross freight billed", "Rs 10,00,000", "Rs 10,00,000"],
        ["GST on freight", "Rs 50,000 RCM cash", "Rs 1,80,000 on vendor invoice"],
        ["Shipper cash to vendor", "Rs 10,00,000", "Rs 11,80,000"],
        ["Shipper cash to Government", "Rs 50,000 (cash ledger)", "Rs 0 on this line"],
        ["Eligible ITC (workshop)", "Rs 50,000", "Rs 1,80,000 via GSTR-2B"],
        ["Net GST cost after ITC", "Rs 0", "Rs 0 (if 2B matches)"],
        ["Carrier ITC on assets", "None on this route", "Trucks / tyres / spares recoverable"],
      ],
    },
    {
      kind: "image",
      caption: "Carrier operating margin under 18% forward charge [CARRIER ASSET RECOVERY]",
      source: "Workshop illustration of how ITC on truck and tyre GST can lower the net cost floor.",
      src: "/images/blog/gta-gst-carrier-asset-recovery.png",
      alt: "Formula board for net asset amortization after recovering 28 percent GST on trucks and tyres across operational mileage",
    },
    {
      kind: "callout",
      caption: "Workshop reveal",
      source: "Cash-flow neutral GST for registered manufacturers when ITC is clean.",
      items: [
        {
          title: "Shipper",
          body: "18% forward is often GST-neutral after full ITC - watch GSTR-2B vendor dependency and higher interim cash parked with the vendor.",
          tone: "teal",
        },
        {
          title: "Organized fleet",
          body: "Eligible asset ITC can change a carrier's cost base versus an RCM path with no GTA-service ITC - treat any freight-rate gap as a negotiation hypothesis, not a measured national discount.",
          tone: "navy",
        },
      ],
    },
  ],

  "Freight invoicing, e-invoicing, and GSTR-2B audit reconciliation": [
    {
      kind: "tiles",
      caption: "E-invoice and 2B traps",
      source: "Rule 48(4) IRN orientation. Turnover thresholds change - confirm live CBIC notifications.",
      items: [
        {
          title: "E-invoicing",
          body: "GTAs crossing aggregate turnover limits need IRN and QR on tax invoices under Rule 48(4).",
        },
        {
          title: "Forward-charge 2B trap",
          body: "If the GTA skips GSTR-1, recipient ITC stalls under Section 16(2)(aa) until the invoice appears.",
        },
        {
          title: "RCM advantage",
          body: "Recipient pays via GSTR-3B cash and claims self-generated ITC in the same period - less vendor filing dependency.",
        },
      ],
    },
    {
      kind: "steps",
      caption: "How ZAFTYS TMS hardens the freight tax audit",
      source: "Product capability framing for enterprise desks.",
      items: [
        {
          title: "GSTIN + Annexure V",
          body: "Validate transporter registration and forward-charge election before AP posts.",
        },
        {
          title: "Ledger split",
          body: "Auto-split RCM cash liability vs forward-charge vendor payout.",
        },
        {
          title: "Declaration gate",
          body: "Block settlement if the mandatory forward-charge text is missing on the scanned invoice / LR pack.",
        },
      ],
    },
  ],

  "Standard operating procedure: the 8-step corporate freight tax audit workflow": [
    {
      kind: "image",
      caption: "8-point freight tax and invoicing compliance lifecycle",
      source: "Operating sequence for procurement, dispatch, and accounts payable.",
      src: "/images/blog/gta-gst-8-step-compliance.png",
      alt: "Process board with eight steps from classify transporter through Annexure V audit, consignment note, tax route, invoice text, e-Way Bill match, RCM cash pay, and GSTR-2B reconcile",
    },
    {
      kind: "image",
      caption: "The master GTA tax path",
      source: "Decision tree workshop. Confirm notifications before locking an SOP.",
      src: "/images/blog/gta-gst-master-tax-path.png",
      alt: "Decision tree from consignment note presence to Annexure V election to specified recipient RCM versus forward charge outcomes",
    },
  ],

  "The 20-point industrial freight tax readiness matrix and FAQs": [
    {
      kind: "donut",
      caption: "Corporate freight tax exposure: anatomy of an audited freight ledger",
      source:
        "Single-denominator workshop pie (100%). Not a ZAFTYS audited national claims or GST audit index.",
      slices: [
        { label: "Compliant 5% RCM (cash discharged)", value: 56, color: zaftysViz.navy },
        { label: "Compliant forward charge (valid Annexure V)", value: 24, color: zaftysViz.teal },
        { label: "Disputed RCM (delayed cash ledger)", value: 12, color: zaftysViz.warm },
        { label: "Ineligible non-consignment vouchers", value: 8, color: zaftysViz.primaryBright },
      ],
    },
    {
      kind: "image",
      caption: "Section 50 / 122 misclassification exposure [STATUTORY NON-COMPLIANCE COST]",
      source: "Orientation formula. Penalty and interest computation needs counsel and bare Act text.",
      src: "/images/blog/gta-gst-section50-exposure.png",
      alt: "Formula board for unpaid RCM plus 18 percent per annum interest plus Section 122 penalty framing",
    },
    {
      kind: "table",
      variant: "scorecard",
      caption: "20-point industrial freight tax readiness audit (rate 1 to 5; skip = 0)",
      source: "Coaching matrix for plant logistics and finance. Not a certification product.",
      headers: ["#", "Group", "Ask in the room", "Score"],
      rows: [
        ["1", "Vendor", "Is every road vendor tagged GTA vs non-GTA in the master?", ""],
        ["2", "Vendor", "Is consignment-note issuance verified before first booking?", ""],
        ["3", "Vendor", "Are individual truck owner (truck-malik) hires blocked from GTA tax codes?", ""],
        ["4", "Vendor", "Is person-liable-for-tax captured on every LR?", ""],
        ["5", "Vendor", "Are FOR vs ex-factory freight-payer rules coded in contracts?", ""],
        ["6", "Docs", "Do LRs carry serials, GSTINs, vehicle number, and pins?", ""],
        ["7", "Docs", "Is factory delivery challan banned as a GTA substitute?", ""],
        ["8", "Docs", "Are digital LR / POD photos stored on the trip timeline?", ""],
        ["9", "Docs", "Is forward-charge endorsement text checked on every invoice?", ""],
        ["10", "Docs", "Do e-Way Bill Part B vehicle numbers match the LR?", ""],
        ["11", "Finance", "Is RCM routed only through the Electronic Cash Ledger?", ""],
        ["12", "Finance", "Is RCM ITC claimed in the correct GSTR-3B table?", ""],
        ["13", "Finance", "Is forward-charge ITC gated on GSTR-2B appearance?", ""],
        ["14", "Finance", "Are detention / demurrage lines tax-classified with counsel?", ""],
        ["15", "Finance", "Is Section 50 interest monitored on late RCM cash?", ""],
        ["16", "Invoice", "Is Annexure V status re-checked before each FY?", ""],
        ["17", "Invoice", "Is Annexure VI exit tracked when carriers leave forward charge?", ""],
        ["18", "Invoice", "Are e-invoice IRN rules applied when turnover thresholds hit?", ""],
        ["19", "Invoice", "Does TMS block pay on missing declaration scans?", ""],
        ["20", "Invoice", "Do marketplace trips post into the same tax ledger as contracts?", ""],
      ],
    },
  ],
};
