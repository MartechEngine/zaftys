/** Deep-research exhibits: commercial vehicle verification / bogus truck prevention.
 * Pure TypeScript. Zero em-dashes or en-dashes; spaced hyphens only.
 * Workshop / orientation. Confirm bare statutes and insurer warranties before a claim memo.
 */
import { zaftysViz } from "@/lib/blog-exhibits-tms-eval";
import type { BlogExhibit, BlogKpi } from "@/lib/blog-data";

export const vehicleVerificationKpis: readonly BlogKpi[] = [
  {
    value: "~Rs 12k Cr*",
    label: "Broader cargo-theft commentary",
    detail:
      "*Industry commentary often cites ~Rs 12,000 Cr annual cargo-theft drag on Indian logistics - not an official MoRTH audited series. This guide's teaching cases focus on identity-fraud / bogus-truck diversions inside that broader risk.",
  },
  {
    value: "44%*",
    label: "WhatsApp / broker (dalal) teaching slice",
    detail:
      "*Workshop pie slice only inside this guide's teaching denominator - not a published national crime share. Soften before board packs.",
  },
  {
    value: "45 sec",
    label: "Automated gate API validation",
    detail:
      "Target cycle for enterprise TMS (ZAFTYS) via ULIP / Vahan / Sarathi handshakes to check RC, fitness, permit, and commercial DL at plant gate-in.",
  },
  {
    value: "100%",
    label: "Chassis pencil-rub mandate",
    detail:
      "Non-negotiable physical protocol: embossed chassis impression on tracing paper before outward loading slip - digital RC alone is not ground truth.",
  },
  {
    value: "72 hours",
    label: "Golden recovery window",
    detail:
      "Critical post-dispatch window before diverted trucks are often repainted, stripped, and fitted with fresh counterfeit plates. After that, recovery odds collapse.",
  },
  {
    value: "Zero payout",
    label: "Insurance repudiation risk",
    detail:
      "Underwriters commonly repudiate when surveyors find expired / forged RC or permit and a breach of registered-carrier due-diligence warranties on the marine policy.",
  },
] as const;

export const vehicleVerificationTakeaways = [
  "Fake / bogus trucks (farzi gaadi) pair scrap or totaled chassis with cloned plates and forged RCs, then hunt spot loads through WhatsApp groups and roadside brokers (dalals).",
  "Physical paper checks fail when Transport Nagar print shops produce laminated RCs, Form 48 permits, and QR codes that open spoofed verification pages.",
  "Vahan 4.0 and Sarathi via ULIP let ZAFTYS TMS validate RC, fitness, permit, and commercial DL in about 45 seconds - then chassis pencil rubbing still confirms the frame.",
  "FASTag history is a clone detector: impossible speed or opposite-corridor tolls mean the plate at your gate is not the truck that cleared the highway.",
  "A Dahej copper-rod workshop diversion can write off Rs 2.15 Cr when marine cover repudiates for unvetted carrier due diligence - prevent at gate, do not litigate later.",
  "TranZfort replaces anonymous broker groups with OTP, PAN, and RC-reviewed capacity; ZAFTYS hard-blocks expired fitness and blacklisted chassis at the weighbridge.",
] as const;

export const vehicleVerificationReferences = [
  "[Motor Vehicles Act, 1988](https://www.indiacode.nic.in/handle/123456789/1797?locale=en) - Sections 3, 4, 39, 56, 66, and 113 (licensing, registration, fitness, permits, weight limits). Confirm bare text.",
  "[Central Motor Vehicles Rules (CMVR), 1989](https://www.indiacode.nic.in/handle/123456789/1798?locale=en) - Rules 9, 32, 47, 50 (HSRP), and 93. Confirm amendments.",
  "[Bharatiya Nyaya Sanhita (BNS), 2023](https://www.indiacode.nic.in/handle/123456789/20062?locale=en) - Section 316 (criminal breach of trust by carrier / warehouse-keeper lineage) and Section 318 (cheating). Orientation; counsel owns charging strategy. Former IPC 405/407 and 415/420 framing for historical files.",
  "[Carriage by Road Act, 2007](https://www.indiacode.nic.in/handle/123456789/2043?locale=en) - common carrier registration and goods receipt practice under Section 3 and related rules.",
  "MoRTH Vahan 4.0 / Sarathi and ULIP API documentation - live field availability varies by integration path (see morth.nic.in / ULIP docs).",
  "Cargo-theft scale orientation: industry commentary often cites ~Rs 12,000 Cr annual Indian cargo-theft drag and high Asia share for India - not an official MoRTH audited series; treat as context, not ZAFTYS data.",
  "Product: [TranZfort](https://www.tranzfort.com) · [TranZfort marketplace](/network/tranzfort).",
  "Internal cluster: [transit damage and insurance](/blog/transit-damage-shortage-cargo-insurance-india-carrier-liability-guide), [spot vs dedicated](/blog/spot-market-vs-dedicated-fleet-india), [industrial TMS](/blog/industrial-tms-control-stack-india), [cost leaks](/blog/5-hidden-cost-leaks-heavy-industrial-freight-tms-3pl-guide), [load marketplaces](/blog/online-truck-load-marketplaces-india-freight-apps-guide), [freight rates](/blog/truck-freight-rates-india-cost-rate-benchmarking-guide).",
] as const;

export const vehicleVerificationExhibits: Record<string, readonly BlogExhibit[]> = {
  "The underworld of highway freight theft in India": [
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
      kind: "donut",
      caption: "Vulnerabilities in freight sourcing: where cargo theft begins",
      source:
        "Single-denominator workshop pie (100%). Teaching pattern for industrial desks - not a ZAFTYS audited national crime index and not a published government share table.",
      slices: [
        { label: "Unverified spot via WhatsApp / roadside brokers (dalals) (workshop)", value: 44, color: zaftysViz.warm },
        { label: "Counterfeit document acceptance (workshop)", value: 26, color: zaftysViz.navy },
        { label: "Driver impersonation / missing endorsements (workshop)", value: 18, color: zaftysViz.primary },
        { label: "In-transit divergence at unmonitored dhabas (workshop)", value: 12, color: zaftysViz.teal },
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
      caption: "Vahan and Sarathi fields the gate must match",
      source: "MoRTH registry orientation. Live API field names vary by ULIP product path.",
      headers: ["System", "Must-match fields", "Gate action if mismatch"],
      rows: [
        ["Vahan 4.0", "Maker/model, tare, GVW, engine, chassis", "Hold - do not load"],
        ["Vahan 4.0", "Fitness expiry, road tax, goods permit", "Hold - do not load"],
        ["Sarathi", "Name, photo, licence status active", "Hold - do not load"],
        ["Sarathi", "Authorized classes (TRANS/HGMV), commercial badge", "Hold - do not load"],
        ["Sarathi", "Hazchem endorsement when cargo needs it", "Hold - do not load"],
      ],
    },
    {
      kind: "callout",
      caption: "ULIP bridge into ZAFTYS TMS",
      source: "Product capability framing - ~45 second multi-point validation target.",
      items: [
        {
          title: "Instant handshake",
          body: "Enterprise TMS queries ULIP-connected Vahan/Sarathi at gate-in so bribery and torch-light errors stop being the control.",
          tone: "teal",
        },
        {
          title: "Hard block",
          body: "Expired fitness, suspended permit, or blacklisted chassis never receives a loading slip.",
          tone: "navy",
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
        ["Outcome", "Rs 2.15 Cr write-off", "~45-90 sec gate block"],
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
      caption: "8-stage gate protocol (desk copy)",
      source: "Same sequence as the process board.",
      items: [
        { title: "01 Visual plate audit", body: "HSRP screws, font, commercial yellow plate integrity." },
        { title: "02 Vahan API", body: "Active RC, fitness, tax, permit, tare, GVW." },
        { title: "03 Sarathi DL", body: "Photo, status, HGMV/TRANS, Hazchem if needed." },
        { title: "04 FASTag history", body: "Corridor plausibility vs declared origin." },
        { title: "05 Chassis pencil rub", body: "Frame stamp vs Vahan extract." },
        { title: "06 Driver live ID", body: "Plate photo, masked Aadhaar / biometric." },
        { title: "07 Breathalyzer + EHS", body: "Zero BAC; tyres, lights, isolator." },
        { title: "08 Gate pass + seal", body: "Issue pass; record seal on e-Way Bill Part B." },
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
          title: "ZAFTYS ULIP gate",
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
