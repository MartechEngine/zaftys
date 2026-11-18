/** Deep-research exhibits: commercial vehicle verification / bogus truck prevention.
 * Pure TypeScript. Zero em-dashes or en-dashes; spaced hyphens only.
 * Workshop / orientation. Confirm bare statutes and insurer warranties before a claim memo.
 */
import type { BlogExhibit, BlogKpi } from "@/lib/blog-data";

export const vehicleVerificationKpis: readonly BlogKpi[] = [
  {
    value: "Readiness only",
    label: "ULIP assessment (not a latency report)",
    detail:
      "ZAFTYS Intelligence AI-assisted readiness note: official ULIP onboarding + VAHAN/SARATHI pathway. No measured ZAFTYS p50/p95. Synthetic latency examples are labelled as such.",
  },
  {
    value: "Lookup != clearance",
    label: "What a registry check proves",
    detail:
      "An official vehicle or licence lookup can support consistency of recorded particulars. It does not by itself prove identity fraud, cargo theft, or that the truck is safe to load.",
  },
  {
    value: "100%",
    label: "Chassis pencil-rub mandate",
    detail:
      "Non-negotiable physical protocol where lawful and practical: embossed chassis impression on tracing paper before outward loading slip - digital RC alone is not ground truth.",
  },
  {
    value: "Signal only",
    label: "FASTag / movement mismatch",
    detail:
      "Impossible speed or opposite-corridor toll trails are risk signals. They require independent checks. They do not prove identity fraud or diversion by themselves.",
  },
  {
    value: "Hold + escalate",
    label: "Mismatch response",
    detail:
      "Pause loading, verify independently, document, and escalate. Do not automatically accuse the driver or carrier of a crime from a single discrepancy.",
  },
  {
    value: "Zero payout risk",
    label: "Insurance due-diligence gap",
    detail:
      "Marine policies often carry registered-carrier warranties. Surveyors ask for gate evidence after diversion. Orientation only - insurer wording controls.",
  },
] as const;

export const vehicleVerificationTakeaways = [
  "Fake / bogus trucks (farzi gaadi) pair scrap or totaled chassis with cloned plates and forged RCs, then hunt spot loads through WhatsApp groups and roadside brokers (dalals).",
  "Physical paper checks fail when Transport Nagar print shops produce laminated RCs, Form 48 permits, and QR codes that open spoofed verification pages.",
  "Public Parivahan lookups and authorized Vahan / Sarathi / ULIP integrations (where available) support consistency checks - then chassis pencil rubbing still confirms the frame. ZAFTYS Intelligence publishes a ULIP readiness assessment only - not measured p50/p95 unless a dated authorised test report exists.",
  "FASTag / movement anomalies are risk signals, not proof of fraud. Pair them with independent identity and custody checks.",
  "A Dahej copper-rod workshop diversion (hypothetical composite) can write off Rs 2.15 Cr when marine cover repudiates for unvetted carrier due diligence - prevent at gate, do not litigate later.",
  "TranZfort replaces anonymous broker groups with OTP, PAN, and commercial RC review on the matching rail; plant gates still need independent Vahan / Sarathi / chassis controls. Do not imply TMS automates checks it does not currently perform.",
] as const;

export const vehicleVerificationReferences = [
  "[Motor Vehicles Act, 1988](https://www.indiacode.nic.in/handle/123456789/1797?locale=en) - Sections 3, 4, 39, 56, 66, and 113 (licensing, registration, fitness, permits, weight limits). Confirm bare text.",
  "[Central Motor Vehicles Rules (CMVR), 1989](https://www.indiacode.nic.in/handle/123456789/1798?locale=en) - Rules 9, 32, 47, 50 (HSRP), and 93. Confirm amendments.",
  "[Bharatiya Nyaya Sanhita (BNS), 2023](https://www.indiacode.nic.in/handle/123456789/20062?locale=en) - Section 316 (criminal breach of trust by carrier / warehouse-keeper lineage) and Section 318 (cheating). Orientation; counsel owns charging strategy.",
  "[Carriage by Road Act, 2007](https://www.indiacode.nic.in/handle/123456789/2043?locale=en) - common carrier registration, goods forwarding note / goods receipt, and liability framing. Cite the specific section that supports each claim.",
  "[Parivahan - Know Your Vehicle Details](https://parivahan.gov.in/parivahan//en/content/know-your-vehicle-details) - public vehicle-detail starting point. Not a universal API and not every registry field.",
  "[ULIP - Data Access & Onboarding](http://ulipdocs.nldsl.in/docs/getting-started/data-access) - register, data request, screening, NDA, IP whitelist, compliance, staging then production.",
  "[ULIP - Authentication](http://ulipdocs.nldsl.in/docs/getting-started/authentication) - token-based HTTPS login for approved users.",
  "[ULIP - MoRTH services](http://ulipdocs.nldsl.in/docs/ministry/ministry-of-road-transport-and-highways) - documented VAHAN / SARATHI (and related) endpoints; approved field scope still controls what you receive.",
  "[goulip.in](https://goulip.in) - ULIP portal entry for registration.",
  "Methodology (ZAFTYS Intelligence): AI-assisted research. Teaching scenarios and hypothetical composites are labelled as such. No national cargo-theft percentage is asserted as an audited MoRTH statistic. No fabricated ULIP latency test.",
  "Product: [TranZfort](https://www.tranzfort.com) · [TranZfort marketplace](/network/tranzfort).",
  "Internal cluster: [transit damage and insurance](/blog/transit-damage-shortage-cargo-insurance-india-carrier-liability-guide), [spot vs dedicated](/blog/spot-market-vs-dedicated-fleet-india), [industrial TMS](/blog/industrial-tms-control-stack-india), [cost leaks](/blog/5-hidden-cost-leaks-heavy-industrial-freight-tms-3pl-guide), [load marketplaces](/blog/online-truck-load-marketplaces-india-freight-apps-guide), [freight rates](/blog/truck-freight-rates-india-cost-rate-benchmarking-guide).",
] as const;

export const vehicleVerificationExhibits: Record<string, readonly BlogExhibit[]> = {
  "The underworld of highway freight theft in India": [
    {
      kind: "callout",
      caption: "Quick answer",
      source: "Primary query framing for commercial vehicle verification in India.",
      items: [
        {
          title: "What to verify",
          body: "Registration consistency, chassis/engine identity, fitness/permit/tax status, driver licence class, substitution events, movement signals, and cargo custody.",
          tone: "navy",
        },
        {
          title: "What a lookup is",
          body: "A consistency check - not proof of fraud and not a full loading clearance.",
          tone: "teal",
        },
        {
          title: "Corrections",
          body: "Report factual errors to contact@zaftys.com with the article URL.",
          tone: "warm",
        },
      ],
    },
    {
      kind: "callout",
      caption: "Key definitions (quotable)",
      source: "Ops vocabulary for this guide. Confirm bare statutes before an FIR strategy memo.",
      items: [
        {
          title: "Fake / bogus truck (farzi gaadi)",
          body: "Scrap or totaled chassis with cloned plates and forged or mismatched RC packs, offered into spot loads via brokers or informal WhatsApp groups.",
          tone: "warm",
        },
        {
          title: "Cloned plate vs forged RC",
          body: "Clone copies a live registration identity; forged RC fabricates or spoofs the document. Clones often need chassis rubbing and FASTag to catch.",
          tone: "navy",
        },
        {
          title: "Chassis pencil rubbing",
          body: "Physical embossed-frame impression matched to the Vahan extract - the ground-truth control when digital identity alone can be stolen.",
          tone: "teal",
        },
      ],
    },
    {
      kind: "tiles",
      caption: "Hypothetical risk ranking: where gate controls usually fail first",
      source:
        "Teaching ranking only - not a national crime share, not MoRTH data, and not a ZAFTYS audited sample. Use it to prioritise SOP coverage, not to quote percentages externally.",
      items: [
        {
          title: "1. Unverified spot sourcing",
          body: "Anonymous WhatsApp groups and roadside brokers (dalals) bring trucks the plant has never identity-checked.",
        },
        {
          title: "2. Counterfeit document acceptance",
          body: "Torch-light laminate checks without a live registry query accept forged RC, fitness, and permit packs.",
        },
        {
          title: "3. Driver impersonation",
          body: "Missing commercial badges, lost-licence reuse, or handover drivers after a clean gate-in photo.",
        },
        {
          title: "4. In-transit custody break",
          body: "Phone dark at an unmonitored dhaba after the plant already treated gate paper as enough.",
        },
      ],
    },
    {
      kind: "tiles",
      caption: "Anatomy of a fake / bogus truck (farzi gaadi) racket",
      source: "Corridor pattern briefing for Gujarat-Maharashtra, Delhi-NCR, and eastern steel belts.",
      items: [
        {
          title: "Scrap chassis + cloned plates",
          body: "Totaled or scrap commercial frames from auctions get duplicate plates copied from active compliant trucks.",
        },
        {
          title: "Fake laminated RC pack",
          body: "Desktop-published fitness, Form 48 permits, and insurance PDFs with QR codes aimed at spoofed pages.",
        },
        {
          title: "Spot-load hunting",
          body: "WhatsApp groups and roadside brokers feed high-value discrete cargo that liquidates in secondary markets inside 24 hours.",
        },
      ],
    },
  ],

  "Document forgery vs reality: the limits of physical paper checks": [
    {
      kind: "callout",
      caption: "Why the laminated pack still fools the gate",
      source: "Plant security briefing. Not a print-shop prevalence study.",
      items: [
        {
          title: "Smart-card lookalikes",
          body: "High-quality counterfeit RC cards and fitness laminates from Transport Nagar DTP shops pass a torch-light glance.",
          tone: "warm",
        },
        {
          title: "Fake QR traps",
          body: "QR codes that open phishing 'verification' pages give the guard a green screen that is not Vahan.",
          tone: "navy",
        },
      ],
    },
    {
      kind: "tiles",
      caption: "Driver identity disconnects",
      source: "CMVR Rule 9 endorsement orientation.",
      items: [
        {
          title: "Wrong name / photo",
          body: "Laminated DL with someone else's identity, or a license reported lost months earlier.",
        },
        {
          title: "Missing badges",
          body: "No HGMV / TRANS class, or no Hazchem endorsement when the commodity requires it.",
        },
        {
          title: "Handover driver",
          body: "Verified driver checks in; an unverified substitute takes the wheel at a dhaba 10 km outside the zone.",
        },
      ],
    },
  ],

  "Digital verification: Vahan 4.0, Sarathi, and ULIP integration": [
    {
      kind: "table",
      caption: "Verification matrix: what each check proves and how to respond",
      source: "Educational matrix. A database lookup is not a complete security clearance. No single signal proves identity, authority, and custody together.",
      headers: ["Check", "Evidence / method", "What it establishes", "Mismatch response"],
      rows: [
        ["Registration number", "Official vehicle lookup + physical plate", "Whether recorded particulars appear consistent", "Pause loading; verify independently"],
        ["Chassis / engine IDs", "RC/authorized record + physical stamp where lawful", "Whether identifiers match the vehicle record", "Document and escalate discrepancy"],
        ["GVW / configuration", "RC and approved vehicle record", "Recorded configuration / weight particulars", "Reassess suitability and compliance"],
        ["Fitness, insurance, permit, tax", "Official record or valid document", "Status of the specific requirement checked", "Resolve the specific deficiency"],
        ["Driver licence", "Available official verification + physical ID", "Licence status/class to the extent the service confirms", "Reverify before dispatch"],
        ["Driver substitution", "Original vs replacement driver records", "Whether the change is documented", "Recheck replacement driver"],
        ["FASTag / movement", "Authorized available transaction data", "Limited corridor evidence only", "Treat as signal, not proof of fraud"],
        ["Cargo custody", "Seal, photos, weighbridge, ePOD, timestamps", "Handover / chain-of-custody evidence", "Preserve records and escalate"],
      ],
    },
    {
      kind: "callout",
      caption: "What a registry check proves / does not prove",
      source: "Capability framing for public Parivahan lookups and authorized integrations.",
      items: [
        {
          title: "Proves (at most)",
          body: "Consistency of recorded vehicle or licence particulars against the registry extract available on that access path.",
          tone: "teal",
        },
        {
          title: "Does not prove",
          body: "Identity fraud, cargo theft, that the truck is safe to load, or that every MoRTH field is live on every plant path.",
          tone: "warm",
        },
        {
          title: "Integration evidence",
          body: "Publish field list, auth path, test date, success/fail counts, and p50/p95 only with a dated test report. Otherwise treat TMS automation as recommended architecture.",
          tone: "navy",
        },
      ],
    },
    {
      kind: "table",
      caption: "Mismatch escalation (neutral process)",
      source: "Do not automatically accuse the driver or carrier of a crime from a single discrepancy.",
      headers: ["Stage", "Action"],
      rows: [
        ["1. Hold", "Pause loading and keep the vehicle in a controlled area"],
        ["2. Re-verify", "Repeat registry/physical checks with a second verifier where practical"],
        ["3. Document", "Photo, extract, timestamps, approving person for exceptions"],
        ["4. Escalate", "Notify dispatch / security lead; involve transporter contact"],
        ["5. Decide", "Clear, reject, or refer - never load on unresolved hard fails"],
        ["6. Retain", "Keep an auditable record with access controls and retention rules"],
      ],
    },
    {
      kind: "callout",
      caption: "ZAFTYS Intelligence: ULIP Integration Readiness Assessment",
      source:
        "AI-assisted assessment from official ULIP docs (checked 19 Nov 2026). Not a live ZAFTYS API test, access approval, or measured latency report.",
      items: [
        {
          title: "Accurate claim",
          body: "ULIP can provide approved access to datasets including VAHAN and SARATHI after onboarding. Field availability depends on approval conditions ([ULIP data access](http://ulipdocs.nldsl.in/docs/getting-started/data-access)).",
          tone: "teal",
        },
        {
          title: "Not claimed here",
          body: "No ZAFTYS API access status, field list, instant verification, or measured p50/p95 latency. No fabricated request logs or sample sizes.",
          tone: "warm",
        },
        {
          title: "Plant practice now",
          body: "Use public Parivahan lookups and physical checks. Treat TMS automation as recommended architecture until a dated authorised test report exists.",
          tone: "navy",
        },
      ],
    },
    {
      kind: "steps",
      caption: "Official ULIP onboarding pathway (requirements)",
      source: "http://ulipdocs.nldsl.in/docs/getting-started/data-access - paraphrase of published steps; confirm live docs before filing a request.",
      items: [
        {
          title: "Register and request",
          body: "Create an account on goulip.in; submit company details, use-case, and the source systems / fields needed.",
        },
        {
          title: "Screening and NDA",
          body: "ULIP review finalises scope; complete the Non-Disclosure Agreement.",
        },
        {
          title: "Technical controls",
          body: "Whitelist the data-centre public IP; keep the consuming app login-based; retain access logs; plan yearly security audit.",
        },
        {
          title: "Staging then production",
          body: "Test on staging, submit a test report, then receive production APIs if approved.",
        },
      ],
    },
    {
      kind: "table",
      caption: "Integration requirements and verification risks",
      source: "ZAFTYS Intelligence readiness framing. Risks are operational - not evidence that ZAFTYS is already integrated.",
      headers: ["Topic", "What to plan for", "Risk if ignored"],
      rows: [
        ["Authorisation scope", "Only approved VAHAN / SARATHI (and other) fields for the use-case", "Expecting fields you were never granted"],
        ["Identity vs clearance", "Registry match is consistency evidence, not a load-safety clearance", "Skipping chassis rubbing after a green lookup"],
        ["Downtime / fallback", "Document hold rules when ULIP or Parivahan is unavailable", "Guards accept laminates under congestion"],
        ["Logging and audit", "Retain request/response metadata per ULIP compliance expectations", "Cannot prove due diligence after a claim"],
        ["Latency at the gate", "Measure only after authorised access with a dated test plan", "Publishing invented 'instant' timings"],
      ],
    },
    {
      kind: "table",
      caption: "p50 / p95 meaning and reproducible future-test method",
      source: "Methodology only. Do not publish measured ZAFTYS timings until this protocol is run on authorised credentials.",
      headers: ["Item", "Definition / rule"],
      rows: [
        ["p50 (median)", "Half of successful timed requests finish at or below this duration"],
        ["p95", "95% of successful timed requests finish at or below this duration; captures the slow tail guards feel"],
        ["Clock start / stop", "Start when the client sends the authorised request; stop when a final success or hard-fail response is received (exclude UI render)"],
        ["Sample design", "Pre-register N, time window, environments (staging vs production), endpoints, and success criteria before the run"],
        ["Exclusions", "Separate auth/login time from data-call time; log timeouts and HTTP errors as fails, not as latency samples"],
        ["Publish bar", "Field list returned, N, success/fail counts, p50, p95, test date, environment - or publish nothing as 'measured'"],
      ],
    },
    {
      kind: "callout",
      caption: "SYNTHETIC latency examples only - not measured ZAFTYS performance",
      source: "Invented teaching numbers for methodology literacy. Do not cite as ZAFTYS ULIP results.",
      items: [
        {
          title: "Synthetic example A",
          body: "Suppose 100 successful staging calls: p50 = 1.2 s, p95 = 4.8 s. These figures are synthetic - not from ZAFTYS logs.",
          tone: "warm",
        },
        {
          title: "Synthetic example B",
          body: "Suppose the same endpoint under peak load: p50 = 2.5 s, p95 = 12.0 s. Still synthetic. A plant SOP must use measured percentiles after authorised testing.",
          tone: "navy",
        },
        {
          title: "How to use them",
          body: "Use only to explain why p95 (not average) drives gate staffing. Replace with real percentiles before any commercial or ops claim.",
          tone: "teal",
        },
      ],
    },
  ],

  "The physical ground truth: chassis rubbing and vehicle geometry audits": [
    {
      kind: "steps",
      caption: "Four physical checkpoints that digital clones still fail",
      source: "Plant security SOP orientation.",
      items: [
        {
          title: "Chassis pencil rubbing",
          body: "Locate frame stamp near wheel arch; rub pencil on tracing paper; match font and spacing to manufacturer embossing and Vahan extract.",
        },
        {
          title: "Engine number stamp",
          body: "Read the mechanical block stamp against the RC engine number - not a sticker on the firewall.",
        },
        {
          title: "Body vs registration class",
          body: "RC shows 2-axle 18.5 T SXL but a 3-axle 10-wheeler arrives - chassis-swapped or rebuilt. Hold.",
        },
        {
          title: "Cabin and tyre red flags",
          body: "Mismatched tyres, missing OEM badges, fresh spray over the VIN plate - escalate before weighbridge.",
        },
      ],
    },
    {
      kind: "table",
      caption: "10-point red flag checklist for plant gate security",
      source: "Print for the guard cabin. Any single hard fail = hold and call dispatch.",
      headers: ["#", "Red flag", "Why it matters"],
      rows: [
        ["1", "Missing / loose HSRP rivets or non-standard plate font", "Plate may be cloned or swapped"],
        ["2", "Handwritten overwrites on laminated RC", "Desktop forgery pattern"],
        ["3", "Driver cannot name transporter head-office city", "Impersonation / broker (dalal) hire"],
        ["4", "Mobile number not consistent with booking record", "Burner phone risk"],
        ["5", "Non-functional tail lamps on high-value dispatch", "EHS + stolen-rebuild pattern"],
        ["6", "Refusal of chassis pencil rubbing", "Frame stamp will not match"],
        ["7", "Fresh paint around VIN / chassis area", "Tamper cover-up"],
        ["8", "Axle count disagrees with RC GVW class", "Chassis swap"],
        ["9", "Insurance QR opens a non-MoRTH page", "Spoof verification"],
        ["10", "Second person loitering to 'help papers'", "Handover / syndicate assist"],
      ],
    },
  ],

  "FASTag plausibility audits: the digital footprint check": [
    {
      kind: "image",
      caption: "FASTag spatial-temporal plausibility [TELEMETRY PLAUSIBILITY CHECK]",
      source: "Workshop rule. Confirm NETC / bank ledger access path before locking the SOP.",
      src: "/images/blog/vehicle-verification-fastag-plausibility.png",
      alt: "Formula board for implied speed as distance between last toll and gate divided by hours, flagging clones above 85 km/h or opposite corridor direction",
    },
    {
      kind: "callout",
      caption: "Clone detector in one sentence",
      source: "Chakan gate teaching example.",
      items: [
        {
          title: "Impossible trajectory",
          body: "Truck claims Mumbai arrival at 10:00 AM in Chakan, but FASTag cleared a Varanasi-side plaza six hours earlier - plate at the gate is not the highway truck.",
          tone: "warm",
        },
        {
          title: "TMS job",
          body: "Query FASTag history at gate-in and hard-fail opposite-corridor or impossible speed before loading starts.",
          tone: "teal",
        },
      ],
    },
  ],

  "Driver profiling and chain of custody protocols": [
    {
      kind: "tiles",
      caption: "Verify the operator, not only the machine",
      source: "Gate human-factor controls. Align with plant EHS policy.",
      items: [
        {
          title: "Live plate photo",
          body: "Driver standing beside the registration plate at gate-in - timestamped into the trip file.",
        },
        {
          title: "Masked Aadhaar / biometric",
          body: "OTP or thumbprint match per plant privacy SOP - identity, not a laminated photocopy.",
        },
        {
          title: "Breathalyzer",
          body: "Zero BAC policy before the loading bay opens on high-value or Hazchem moves.",
        },
        {
          title: "SIM ownership ping",
          body: "Primary number in driver's name; live SMS/WhatsApp test so burner phones fail at the gate.",
        },
      ],
    },
  ],

  "Worked case study: copper wire rods diverted on the Gujarat-Maharashtra belt": [
    {
      kind: "image",
      caption: "Freight loss risk coefficient [RISK EXPOSURE ENGINE]",
      source: "Workshop: Risk = Consignment value x Sourcing factor x Verification gap.",
      src: "/images/blog/vehicle-verification-risk-coefficient.png",
      alt: "Formula board contrasting unvetted spot truck risk near Rs 1.8 crore versus Vahan-verified marketplace truck residual risk under Rs 50,000",
    },
    {
      kind: "image",
      caption: "Anatomy of a stolen copper wire dispatch (workshop waterfall)",
      source:
        "Teaching ledger: cargo Rs 2.15 Cr plus LD and legal costs to ~Rs 2.315 Cr landed loss versus ~Rs 15 gate API cost. Not a ZAFTYS audited claim file.",
      src: "/images/blog/vehicle-verification-copper-loss-waterfall.png",
      alt: "Horizontal waterfall from invoiced cargo Rs 2.15 crore through insurance repudiation, late delivery LD, and legal costs to total corporate loss near Rs 2.315 crore beside Rs 15 verification cost",
    },
    {
      kind: "table",
      caption: "Dahej to Bhiwandi copper rods - failure points vs 90-second protocol",
      source: "Composite workshop. Invoiced value Rs 2.15 Cr / 24 T electrolytic copper wire rods.",
      headers: ["Control", "What happened", "What stops it"],
      rows: [
        ["RC check", "Laminated photocopy accepted", "Live Vahan 4.0 API"],
        ["DL check", "Valid-looking DL already reported lost", "Sarathi status + photo match"],
        ["Chassis rub", "Skipped in evening congestion", "Mandatory pencil rubbing"],
        ["Tracking", "Phone off near Valsad 9:30 PM", "FASTag + milestone TMS"],
        ["Insurance", "Repudiated - due diligence warranty", "Registered carrier + gate evidence"],
        ["Outcome", "Rs 2.15 Cr write-off", "Hold-first gate block before load"],
      ],
    },
  ],

  "Statutory penalties and the legal framework: BNS 2023 vs IPC": [
    {
      kind: "tiles",
      caption: "Criminal framing for diverters (orientation)",
      source: "BNS 2023 orientation. Counsel owns FIR strategy. Historical IPC numbers noted for older files.",
      items: [
        {
          title: "Section 316 BNS",
          body: "Criminal breach of trust by common carrier / warehouse-keeper lineage (ex IPC 405/407). Imprisonment up to 7 years and fine framing.",
        },
        {
          title: "Section 318 BNS",
          body: "Cheating and dishonestly inducing delivery of property (ex IPC 415/420).",
        },
        {
          title: "Forgery lineage",
          body: "BNS forgery provisions covering forged RCs, permits, and licences (ex IPC 465/468 practice).",
        },
      ],
    },
    {
      kind: "callout",
      caption: "Prevention beats multi-year recovery",
      source: "Ops conclusion for plant leadership.",
      items: [
        {
          title: "FIR is slow",
          body: "Police recovery under Section 316 BNS can take years while working capital is already gone.",
          tone: "warm",
        },
        {
          title: "Gate is fast",
          body: "Eliminate the bogus truck before loading. Litigation is residual, not the control.",
          tone: "teal",
        },
      ],
    },
  ],

  "Standard operating procedure: the 8-point pre-loading gate verification protocol": [
    {
      kind: "image",
      caption: "8-point pre-loading verification SOP",
      source: "Security, weighbridge, and dispatch shared protocol.",
      src: "/images/blog/vehicle-verification-8-step-gate.png",
      alt: "Process board with eight steps from visual plate audit through Vahan, Sarathi, FASTag, chassis rubbing, driver photo, breathalyzer, and gate pass issuance",
    },
    {
      kind: "image",
      caption: "True cost of a stolen freight incident [FINANCIAL DRAIN CALCULATION]",
      source: "Workshop loss stack beyond invoice value.",
      src: "/images/blog/vehicle-verification-true-cost.png",
      alt: "Formula board for total loss as invoiced cargo minus scrap recovery plus legal costs plus insurance deductible plus customer late delivery LD",
    },
    {
      kind: "steps",
      caption: "10-stage gate protocol (desk copy)",
      source: "Aligned to the master gate-security checklist. Image above is illustrative process art - follow this sequence.",
      items: [
        { title: "01 Record arrival", body: "Time, registration, vehicle type, transporter." },
        { title: "02 Compare identifiers", body: "Lawful registry lookup + physical plate / RC consistency." },
        { title: "03 Driver identity + licence", body: "Available lawful verification methods only." },
        { title: "04 Document status", body: "Fitness, insurance, permit, tax / expiry." },
        { title: "05 Cargo suitability", body: "GVW, body, endorsements match the order." },
        { title: "06 Substitution re-check", body: "Any driver/vehicle change is re-verified." },
        { title: "07 Custody record", body: "Loading ref, seal, photos where permitted, weighbridge, departure." },
        { title: "08 Exception approver", body: "Named person for any override." },
        { title: "09 Mismatch hold", body: "Hold, re-verify, escalate - do not auto-accuse." },
        { title: "10 Retain audit trail", body: "Access-controlled retention of verification artifacts." },
      ],
    },
  ],

  "How TranZfort and ZAFTYS eliminate sourcing vulnerabilities and the 20-point audit": [
    {
      kind: "tiles",
      caption: "Marketplace vetting vs enterprise gate engine",
      source: "Product positioning for this guide.",
      items: [
        {
          title: "TranZfort identity layer",
          body: "OTP, business details, PAN, and commercial RC review replace anonymous WhatsApp broker groups.",
        },
        {
          title: "Trip photo timeline",
          body: "Dock, loading, consignment note / LR (bilty), seal, and POD photos create an auditable chain of custody.",
        },
        {
          title: "ZAFTYS gate controls (where live)",
          body: "Vahan/Sarathi embedded at weighbridge; auto-block expired fitness and blacklisted chassis.",
        },
      ],
    },
    {
      kind: "table",
      variant: "scorecard",
      caption: "20-point vehicle and gate verification readiness audit (rate 1 to 5; skip = 0)",
      source: "Coaching matrix for security, dispatch, and procurement. Not a certification product.",
      headers: ["#", "Group", "Ask in the room", "Score"],
      rows: [
        ["1", "Sourcing", "Are WhatsApp-only spot trucks banned for high-value cargo?", ""],
        ["2", "Sourcing", "Is every spot vendor tagged with PAN / GSTIN before first load?", ""],
        ["3", "Sourcing", "Do dedicated and marketplace trucks share one gate SOP?", ""],
        ["4", "Sourcing", "Is roadside broker (dalal) placement logged as elevated risk?", ""],
        ["5", "Sourcing", "Can the desk pull verified capacity from TranZfort instead of groups?", ""],
        ["6", "Docs", "Is live Vahan mandatory - no laminated photocopy alone?", ""],
        ["7", "Docs", "Is Sarathi status checked for suspended / lost licences?", ""],
        ["8", "Docs", "Are Form 48 permit and fitness expiry hard-gated?", ""],
        ["9", "Docs", "Do insurance QR codes open only trusted verification paths?", ""],
        ["10", "Docs", "Is Hazchem endorsement required when commodity needs it?", ""],
        ["11", "Gate", "Is chassis pencil rubbing mandatory before loading slip?", ""],
        ["12", "Gate", "Is engine stamp checked against the RC extract?", ""],
        ["13", "Gate", "Does axle count vs RC GVW class get a visual confirm?", ""],
        ["14", "Gate", "Is driver live photo with plate stored on the trip?", ""],
        ["15", "Gate", "Is breathalyzer enforced on high-value / Hazchem moves?", ""],
        ["16", "Visibility", "Is FASTag history queried at gate-in?", ""],
        ["17", "Visibility", "Are impossible speed / opposite-corridor flags hard fails?", ""],
        ["18", "Visibility", "Does phone switch-off trigger an escalation playbook?", ""],
        ["19", "Visibility", "Are seals and Part B updates on the same timeline?", ""],
        ["20", "Visibility", "Do blacklisted chassis sync across all plants in the TMS?", ""],
      ],
    },
  ],
};
