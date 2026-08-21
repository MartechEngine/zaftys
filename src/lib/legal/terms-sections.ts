import type { LegalSection } from "@/components/legal/LegalDocument";

export const LEGAL_VERSION = "1.3";
export const LEGAL_UPDATED = "13 August 2026";

export const termsIntro =
  "These Website Terms of Use & Service (\"Terms\") govern access to zaftys.com and ZAFTYS logistics, capacity-facilitation, transporter/fleet-partner and technology services. They operate together with Trip Documentation. Where a specific written commercial agreement applies, that agreement prevails to the extent of any inconsistency. Review by an Indian advocate is recommended before treating this as definitive for disputes.";

export const termsSections: LegalSection[] = [
  {
    id: "introduction",
    title: "1. Introduction",
    blocks: [
      {
        type: "p",
        text: "Welcome to the website and digital services operated by ZAFTYS Logistics (\"ZAFTYS\", \"we\", \"us\", or \"our\"). By accessing the website, submitting an enquiry, requesting transportation capacity, approving a Vehicle, or otherwise engaging with ZAFTYS electronically, you agree to these Terms to the extent applicable to your activity.",
      },
    ],
  },
  {
    id: "about",
    title: "2. About ZAFTYS - capacity facilitation",
    blocks: [
      {
        type: "p",
        text: "ZAFTYS operates in logistics and transportation through (1) vehicles or capacity owned or directly operated by ZAFTYS, and/or (2) independent Fleet Partners, together with coordination, technology and related services.",
      },
      {
        type: "p",
        text: "Mode A - Owned or directly operated capacity: ZAFTYS may itself be (or supply) the Performing Carrier under applicable Trip Documentation.",
      },
      {
        type: "p",
        text: "Mode B - Marketplace / capacity facilitation: ZAFTYS identifies and proposes independent Fleet Partner capacity, shares available Vehicle and Document information with the Transporter, coordinates placement after Vehicle Approval, and may charge a Facilitation Fee. In Mode B, unless Trip Documentation expressly states that ZAFTYS is the Performing Carrier (including where ZAFTYS issues an LR / takes custody of goods in writing), ZAFTYS acts as capacity facilitator / arranger and is not the default Performing Carrier.",
      },
      {
        type: "p",
        text: "Nothing in these Terms is intended to misstate or avoid a statutory obligation that applies to ZAFTYS.",
      },
    ],
  },
  {
    id: "definitions",
    title: "3. Definitions",
    blocks: [
      {
        type: "ul",
        items: [
          "Transporter - customer or transport company requesting or purchasing capacity or logistics services from ZAFTYS (including large transporters such as CJ Darcl and similar).",
          "Fleet Partner - independent truck owner, fleet owner, operator or carrier whose Vehicle is proposed or arranged for a Trip.",
          "Performing Carrier - person or entity legally responsible for physically performing carriage for a Trip, as determined by law and Trip Documentation.",
          "Vehicle Approval - Transporter acceptance of the proposed Vehicle, driver and/or Fleet Partner via email, WhatsApp, portal, phone or other agreed method.",
          "Documents - RC, fitness, permit, insurance, PUC, driving licence, driver/owner identity and related papers shared for a proposed Vehicle.",
          "Facilitation Fee - broker/commission/placement fee payable to ZAFTYS for Mode B arrangement, distinct from freight unless Trip Documentation combines them.",
          "Free Time - waiting period during which no detention/halting is payable under Section 18.",
          "Trip Documentation - quotations, POs, placement memos, trip confirmations, invoices, emails and related records for a Trip.",
        ],
      },
    ],
  },
  {
    id: "eligibility",
    title: "4. Eligibility and authority",
    blocks: [
      {
        type: "p",
        text: "You represent that you are legally capable of entering a binding arrangement, that information you supply is accurate, that you are authorised to bind any organisation you represent, and that you will comply with applicable law. Acceptance on behalf of a business is intended to bind that organisation to the extent permitted by law.",
      },
    ],
  },
  {
    id: "website-use",
    title: "5. Website use",
    blocks: [
      {
        type: "p",
        text: "You may use the website only for lawful purposes. You must not use it for fraud, submit false information, impersonate others, upload malware, attempt unauthorised access, scrape data without permission, reverse engineer protected software, misuse forms or branding, or facilitate unlawful transportation. ZAFTYS may suspend or restrict access where reasonably necessary.",
      },
    ],
  },
  {
    id: "workflow",
    title: "6. Transportation workflow",
    blocks: [
      {
        type: "ol",
        items: [
          "Transporter submits a transportation requirement.",
          "ZAFTYS identifies or sources available capacity.",
          "ZAFTYS provides Vehicle and relevant driver/Fleet Partner details and Documents.",
          "Transporter reviews, verifies and approves the proposed Vehicle.",
          "ZAFTYS coordinates dispatch/placement.",
          "Vehicle reports for loading; loading is completed.",
          "Applicable payment/advance is received per commercial terms; ZAFTYS may settle with the Fleet Partner per the arrangement.",
          "Vehicle performs the Trip; delivery/POD and final settlement follow Trip terms.",
        ],
      },
      {
        type: "p",
        text: "Sequence may vary by Trip, payment terms, cargo and applicable law. Receipt of funds by ZAFTYS does not by itself determine whether ZAFTYS is owner, carrier, agent, intermediary or arranger - that status follows contractual arrangement, conduct and law.",
      },
    ],
  },
  {
    id: "orders",
    title: "7. Transporter orders and instructions",
    blocks: [
      {
        type: "p",
        text: "The Transporter is responsible for accuracy of origin, destination, timing, cargo description, quantity, weight, dimensions, vehicle type, special equipment, hazardous characteristics, permits, loading/unloading conditions and special instructions. ZAFTYS may rely on that information. Loss from incorrect or incomplete information may rest with the party that supplied it, subject to applicable law.",
      },
    ],
  },
  {
    id: "sourcing-approval",
    title: "8. Vehicle sourcing and Approval",
    blocks: [
      {
        type: "p",
        text: "ZAFTYS may propose a Vehicle from own capacity or a Fleet Partner, including registration, type, capacity, owner/operator, driver, compliance Documents, availability and ETA. Electronic Approval (website, email, WhatsApp, SMS, telephone, recorded or written communication) may be retained as a transaction record.",
      },
      {
        type: "p",
        text: "Approval means the Transporter has accepted that proposed Vehicle for the Trip based on information available at Approval. It does not waive any statutory right that cannot lawfully be waived.",
      },
    ],
  },
  {
    id: "verification",
    title: "9. Documents - mandatory Transporter verification",
    blocks: [
      {
        type: "p",
        text: "ZAFTYS shares Documents as received from the Fleet Partner or as otherwise available. Sharing is not a warranty that any Document is genuine, current, complete, accurate or sufficient. Any internal administrative check by ZAFTYS is for ZAFTYS’s own risk management only and is not a legal guarantee to the Transporter.",
      },
      {
        type: "p",
        text: "Before Vehicle Approval (and in any event before loading), the Transporter must independently verify: Vehicle identity and RC; fitness, permits, insurance and PUC as applicable; driver identity and appropriate licence; owner/operator authority; suitability for cargo, route and timing; and any other compliance the Transporter or its shipper requires.",
      },
      {
        type: "p",
        text: "By giving Vehicle Approval, the Transporter confirms it completed that verification or knowingly elected to proceed without completing some or all of it, and accepts the Vehicle, driver and Fleet Partner for that Trip. After Approval, ZAFTYS is not liable for forged, expired, incomplete, inaccurate or unsuitable Documents or for the Transporter’s failure to verify, except for ZAFTYS’s own fraud or wilful misconduct, or liability that cannot lawfully be excluded.",
      },
    ],
  },
  {
    id: "fleet-partner",
    title: "10. Fleet Partner responsibilities",
    blocks: [
      {
        type: "p",
        text: "Fleet Partners must provide accurate information; maintain registration, permits, fitness, insurance and PUC; ensure the driver is properly licensed; operate lawfully; follow lawful loading/delivery instructions; protect goods in their custody; avoid unauthorised diversion; report accidents, breakdowns, theft and detention; provide delivery documentation; cooperate with investigations; and must not provide forged or misleading Documents.",
      },
    ],
  },
  {
    id: "transporter-duties",
    title: "11. Transporter responsibilities",
    blocks: [
      {
        type: "p",
        text: "Transporters must provide accurate cargo and Trip information; declare weight and hazardous goods; provide shipping documents; arrange lawful loading/unloading access; independently verify Vehicles and Documents under Section 9 before Approval; approve promptly; pay freight, Facilitation Fees and detention where due; provide accurate consignee details; accept valid delivery documentation; and comply with law.",
      },
    ],
  },
  {
    id: "cargo",
    title: "12-14. Cargo declaration, prohibited and hazardous goods",
    blocks: [
      {
        type: "p",
        text: "The Transporter/consignor is responsible for accurate declaration of nature, quantity, weight, packaging, hazardous properties, permits and related information. Incorrect declarations may result in refusal, cancellation, additional charges, delay, regulatory consequences and liability for resulting loss.",
      },
      {
        type: "p",
        text: "ZAFTYS does not knowingly facilitate unlawful, prohibited, contraband, stolen or improperly declared goods and may refuse or stop a Trip where there is reasonable concern. Dangerous goods must be declared before placement with required documents, packaging and permits.",
      },
    ],
  },
  {
    id: "fees",
    title: "15-17. Freight, fees, payment and cancellation",
    blocks: [
      {
        type: "p",
        text: "Commercial amounts may include freight, Facilitation Fee, detention, cancellation charges, agreed pass-throughs and GST as required. Unless Trip Documentation states otherwise, the Facilitation Fee becomes due on Vehicle Approval. Oral variation of material terms is not binding where writing/electronic confirmation is required.",
      },
      {
        type: "p",
        text: "Where an advance is payable to ZAFTYS, pay only to ZAFTYS’s designated account. ZAFTYS may settle corresponding amounts with a Fleet Partner per the Trip arrangement, and may delay settlement where there is a reasonable documented concern of fraud, theft, diversion or material breach, subject to law and the commercial agreement.",
      },
      {
        type: "p",
        text: "Cancellation charges may apply where a Vehicle has been dispatched or arrived, costs have been incurred, Approval has been given, loading is refused after arrival, or a charge was expressly agreed. Trip-specific cancellation terms prevail.",
      },
    ],
  },
  {
    id: "detention",
    title: "18. Waiting time and detention (halting)",
    blocks: [
      {
        type: "p",
        text: "Unless Trip Documentation states otherwise: Free Time is forty-eight (48) consecutive hours of waiting in aggregate for that Trip (loading and unloading wait combined), starting at first reported arrival/gate-in at the first stop where waiting begins. Transit time does not count. The clock stops when the Vehicle is released and free to leave.",
      },
      {
        type: "p",
        text: "Detention beyond Free Time is payable by the Transporter to the Fleet Partner (or Performing Carrier). ZAFTYS may coordinate claims administration but does not automatically assume personal liability for unpaid detention and is not a guarantor between those parties.",
      },
      {
        type: "ol",
        items: [
          "Rate pre-agreed in writing for the Trip; else",
          "Prevailing market standard for that vehicle class and corridor; else",
          "One-thirtieth (1/30) of the agreed trip freight per calendar day, pro-rated beyond Free Time.",
        ],
      },
      {
        type: "p",
        text: "Claims should be supported by GPS, gate stamps, timestamps or written reporting. Trip-specific detention terms (including 24h load + 24h unload) prevail over this default.",
      },
    ],
  },
  {
    id: "delivery",
    title: "19. Delivery and proof of delivery",
    blocks: [
      {
        type: "p",
        text: "The relevant performing party must obtain and preserve appropriate delivery evidence (signed or electronic POD, gate record, timestamp, photograph, GPS or other commercially reasonable evidence). Transporters should promptly raise delivery discrepancies.",
      },
    ],
  },
  {
    id: "cargo-liability",
    title: "20. Cargo loss, theft, delay - Mode A / Mode B",
    blocks: [
      {
        type: "p",
        text: "Responsibility for cargo loss, damage, shortage, contamination, theft, pilferage, diversion or delay is determined by applicable law, Trip Documentation, custody and control, causing acts/omissions, and the parties’ contractual obligations.",
      },
      {
        type: "p",
        text: "Mode A: where ZAFTYS is the Performing Carrier, claims follow that Trip Documentation and mandatory carriage law where applicable.",
      },
      {
        type: "p",
        text: "Mode B: where a Fleet Partner is the Performing Carrier, physical carriage claims (including theft, late delivery and illegal acts attributable to the trucker) ordinarily lie with the Performing Carrier and custody-chain parties. ZAFTYS as capacity facilitator is not the cargo insurer and is not liable as Performing Carrier solely because it proposed the Vehicle, shared Documents, coordinated dispatch or administered settlement. Transporter - Fleet Partner disputes should be resolved between those parties; ZAFTYS may relay communications.",
      },
      {
        type: "p",
        text: "Nothing excludes liability that cannot lawfully be excluded or limited.",
      },
    ],
  },
  {
    id: "insurance-claims",
    title: "21-23. Insurance, claims and evidence",
    blocks: [
      {
        type: "p",
        text: "Unless expressly stated in writing, ZAFTYS does not provide cargo insurance. Parties should maintain insurance appropriate to their roles. Insurance or its absence does not by itself determine legal liability.",
      },
      {
        type: "p",
        text: "Material incidents should be reported as soon as reasonably practicable. Commercial claims notified to ZAFTYS for facilitation should be in writing within seven (7) days of delivery, refusal or incident (whichever earlier), unless mandatory law or Trip Documentation requires otherwise. Include Trip reference, Vehicle number, facts and supporting evidence. ZAFTYS is not the adjudicator of cargo claims between Transporter and Fleet Partner unless Trip Documentation says otherwise. Contractual notice does not extinguish non-excludable statutory rights.",
      },
      {
        type: "p",
        text: "ZAFTYS may collect and preserve communications, approvals, Documents, timestamps, payments, GPS, POD and related records to administer Trips, investigate incidents, prevent fraud, resolve disputes, protect rights, comply with law and improve services.",
      },
    ],
  },
  {
    id: "tech-comms",
    title: "24-27. Electronic records, recording, GPS and providers",
    blocks: [
      {
        type: "p",
        text: "Email, WhatsApp, SMS, portals, OTPs and electronic signatures may form part of the transaction record subject to applicable law. Where legally permitted, business communications may be retained or recorded for verification, quality, security, fraud prevention and disputes, with required notice or permission.",
      },
      {
        type: "p",
        text: "Where tracking is enabled, ZAFTYS may process Vehicle location, routes, timestamps and trip status for operations, ETA, security, investigation and dispute resolution. GPS can be inaccurate or delayed and is not an infallible record. Third-party providers (hosting, maps, payments, analytics, storage) may process data under their own terms.",
      },
    ],
  },
  {
    id: "ip-conduct",
    title: "28-32. Website content, IP, fraud, suspension",
    blocks: [
      {
        type: "p",
        text: "Website content is informational; a Trip is governed by its commercial documentation. ZAFTYS IP (name, logo, design, software, databases) may not be copied, scraped or misused without permission. Users must not submit forged Documents, false Vehicle numbers, fraudulent POD or payment claims, or manipulate Trip records. ZAFTYS may suspend or terminate access for non-payment, fraud, unlawful conduct, serious breach or material risk.",
      },
    ],
  },
  {
    id: "indemnity-liability",
    title: "33-35. Indemnity, limitation of liability, force majeure",
    blocks: [
      {
        type: "p",
        text: "To the maximum extent permitted by law, Transporters, Fleet Partners and other commercial users shall indemnify ZAFTYS from third-party claims arising from their breach, inaccurate information, unlawful cargo, forged Documents, violation of law, misuse of services, or vehicle/driver non-compliance within their responsibility - except to the extent finally determined to result from ZAFTYS liability that cannot lawfully be shifted.",
      },
      {
        type: "p",
        text: "ZAFTYS is not liable for indirect, incidental, special, exemplary or consequential loss (including lost profit or opportunity). Website/technology contractual liability is limited to amounts paid to ZAFTYS for the specific service in the three months before the claim event. For Mode B facilitation, aggregate contractual liability for that Trip’s facilitation is limited to the Facilitation Fee actually paid for that Trip, unless Trip Documentation makes ZAFTYS the Performing Carrier. Mode A carriage limits follow Trip agreements and mandatory law. Non-excludable liabilities and fraud exclusions remain.",
      },
      {
        type: "p",
        text: "ZAFTYS is not responsible for failure or delay from force majeure (natural disasters, war, riots, strikes, government restrictions, road closures, epidemics, major telecom/tech outages, fuel restrictions and similar events beyond reasonable control). Force majeure does not cancel payment obligations already due.",
      },
    ],
  },
  {
    id: "confidentiality-noncirc",
    title: "36-37. Confidentiality and non-circumvention",
    blocks: [
      {
        type: "p",
        text: "Rates, customer and Fleet Partner information, routes, pricing, credentials and non-public operational information should be treated as confidential where their nature so indicates, except disclosures required by law, needed to perform a Trip, to advisers, or to protect legal rights.",
      },
      {
        type: "p",
        text: "Where ZAFTYS introduces a Fleet Partner or capacity provider to a Transporter: for twelve (12) months from introduction or Vehicle Approval (whichever earlier), the Transporter shall not knowingly bypass ZAFTYS to book that introduced party for substantially the same commercial relationship without paying the applicable Facilitation Fee or obtaining written waiver. ZAFTYS may invoice the fee that would have applied, subject to reasonable evidence. More detailed written agreements prevail. This is a B2B default only and is not intended as an unlawful restraint of trade.",
      },
    ],
  },
  {
    id: "privacy-changes",
    title: "38-40. Third-party links, privacy, changes",
    blocks: [
      {
        type: "p",
        text: "Third-party links are not controlled by ZAFTYS. Personal data processing is governed by the ZAFTYS Privacy Policy. ZAFTYS may update these Terms by publishing a revised Last Updated date; website updates do not automatically amend a separately signed commercial agreement unless that agreement permits it.",
      },
    ],
  },
  {
    id: "law-disputes",
    title: "41-45. Governing law, disputes, severability",
    blocks: [
      {
        type: "p",
        text: "These Terms are governed by the laws of India. Parties should first attempt good-faith commercial resolution with a written dispute notice identifying Trip reference, nature, amount and proposed resolution. Subject to law and any specific agreement, courts at Amravati, Maharashtra may have jurisdiction over disputes from these website Terms. B2B arrangements may use a separate arbitration clause. Invalid provisions are severed to the minimum extent; no waiver from delayed enforcement. These Terms plus Trip Documentation and written commercial agreements form the framework; specific written agreements prevail on conflict.",
      },
    ],
  },
  {
    id: "contact",
    title: "46. Contact",
    blocks: [
      {
        type: "p",
        text: "ZAFTYS Logistics, Old Town, Badnera, Amravati, 444701, Maharashtra, India. Email: info@zaftys.com · legal@zaftys.com. For legal or privacy grievances, mark the subject \"Legal / Privacy Grievance\".",
      },
    ],
  },
];
