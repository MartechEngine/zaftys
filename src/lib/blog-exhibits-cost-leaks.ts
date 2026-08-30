/** Deep-research exhibits: 5 Hidden Cost Leaks in Heavy Industrial Freight.
 * Pure TypeScript. Zero em-dashes or en-dashes; spaced hyphens only.
 */
import { zaftysViz } from "@/lib/blog-exhibits-tms-eval";
import type { BlogExhibit, BlogKpi } from "@/lib/blog-data";

export const costLeaksKpis: readonly BlogKpi[] = [
  {
    value: "30-40%",
    label: "Visible freight rate share",
    detail: "Base freight rates make up only 30% to 40% of Total Cost of Logistics (TCL). The remaining 60% to 70% hides in yard detention, scale variance, in-transit capital lockup, and invoice leakage.",
  },
  {
    value: "₹500-1,000",
    label: "Hourly detention overrun",
    detail: "Standard multi-axle and heavy-haul trailers incur ₹500 to ₹1,000+ per hour in detention once the 2 to 4 hour free-time window expires.",
  },
  {
    value: "5% vs 10%",
    label: "MoRTH scale tolerance",
    detail: "Section 113(3) provides a 5% scale tolerance. Exceeding 10% over gross vehicle weight triggers mandatory roadside offloading under Supreme Court guidelines.",
  },
  {
    value: "Tri-Hybrid",
    label: "Highway tracking stack",
    detail: "Combines hardwired GPS pings, NHAI FASTag NETC toll plaza timestamps, and consent-based SIM cellular triangulation for complete route visibility.",
  },
  {
    value: "4-Way",
    label: "Automated invoice audit",
    detail: "Matches ERP Purchase Order, automated gate timestamps, locked weighbridge slips, and geo-stamped digital ePODs before freight payment release.",
  },
  {
    value: "48 hours",
    label: "Settlement target",
    detail: "Replaces 30 to 60 day physical paper Lorry Receipt (LR) courier cycles with same-day digital proof and rapid transporter reconciliation.",
  },
] as const;

export const costLeaksTakeaways = [
  "Looking only at freight rates (INR per tonne or INR per km) blinds procurement to 60% to 70% of logistics leakage across plant yards, weighbridges, and finance desks.",
  "Yard detention is not bad luck; it is uncoordinated scheduling. Automated gate-in, bay allocation, and scale locking eliminate queue demurrage and drop plant turnaround time under 120 minutes.",
  "Highway telematics fail when spot market drivers disconnect power fuses or spoof mobile apps. A tri-hybrid tracking engine pairing GPS with tamper-proof FASTag NETC toll logs closes blind spots.",
  "Weighbridge manipulation of just 80 kg per truck at a high-volume manufacturing plant leaks over ₹5.8 Crores annually. Direct indicator interlocking and strict MoRTH axle checks prevent scale fraud and highway fines.",
  "Freight invoices should never be audited on paper months after delivery. A digital 4-way match (PO + Gate + Scale + ePOD) turns a 45-day working capital drag into a 48-hour clean settlement.",
] as const;

export const costLeaksReferences = [
  "National Logistics Policy (NLP) and NITI Aayog: Framework for reducing national logistics costs to 8% - 9% of GDP.",
  "Ministry of Road Transport and Highways (MoRTH): S.O. 3467(E) and S.O. 4353(E) on safe axle loading, gross vehicle weight (GVW), and gross combination weight (GCW) limits.",
  "Motor Vehicles Act, 1988: Section 113 (Weight limits) and Section 194 (Overloading penalties and mandatory offloading directives).",
  "National Payments Corporation of India (NPCI) / NHAI / IHMCL: National Electronic Toll Collection (NETC) FASTag API specifications and toll plaza geocode data.",
  "Central Goods and Services Tax (CGST) Rules, 2017: Rule 138, 138(10) on e-Way Bill distance validity (200 km regular / 20 km ODC) and Part A / Part B compliance.",
  "Legal Metrology (General) Rules, 2011 and OIML R76 Class III standards for industrial weighbridge digital indicators and scale calibration.",
  "Indian Institute of Management Ahmedabad (IIMA) and CRISIL Research: Operational benchmarks on commercial vehicle turnaround time, idle standing costs, and road freight diesel sensitivity.",
  "ZAFTYS Industrial Operations Data: Aggregated trip, gate, weighbridge, and freight settlement metrics across heavy industrial manufacturing corridors, 2024 - 2026.",
] as const;

export const costLeaksExhibits: Record<string, readonly BlogExhibit[]> = {
  "The Invisible Drain: Macro Economics of Indian Industrial Freight": [
    {
      kind: "donut",
      caption: "Total Cost of Logistics (TCL) - Visible freight vs hidden leakage",
      source: "Heavy manufacturing enterprise data (Steel, Cement, Mining, Chemicals). Direct freight rate is only 35% of total logistics expense.",
      slices: [
        { label: "Base freight rate", value: 35, color: zaftysViz.navy },
        { label: "Gate detention & yard wait", value: 22, color: zaftysViz.primary },
        { label: "Weighbridge shrinkage & overload", value: 16, color: zaftysViz.primaryBright },
        { label: "In-transit capital & buffer stock", value: 15, color: zaftysViz.teal },
        { label: "Manual audit & invoice leaks", value: 12, color: zaftysViz.warm },
      ],
    },
    {
      kind: "table",
      variant: "compare",
      caption: "Direct freight rate focus vs Total Cost of Logistics (TCL) framework",
      source: "Operational comparison for industrial plant heads, CFOs, and supply chain directors.",
      headers: ["Cost component", "Traditional freight rate focus", "Total Cost of Logistics (TCL) model"],
      rows: [
        ["Procurement metric", "Lowest base quote (INR/tonne or INR/km)", "Total landed cost including dwell, shrinkage, and capital"],
        ["Plant gate dwell", "Ignored at booking; disputed on detention bills", "Measured per truck stage; capped under 120 minutes"],
        ["Weighment variance", "Accepted as unavoidable scale tolerance (1-2%)", "Direct scale serial lock; automated tolerance flags (<0.5%)"],
        ["Transit tracking", "Basic driver phone calls or standalone GPS pin", "Tri-hybrid GPS + FASTag toll timestamps + SIM triangulation"],
        ["Delivery proof", "Physical paper LR returned in 30 to 60 days", "Instant digital ePOD with geo-stamped signature and photo"],
        ["Invoice processing", "Manual spreadsheet checks; delayed payment cycles", "Automated 4-way match (PO + Gate + Scale + ePOD) in 48 hrs"],
      ],
    },
    {
      kind: "callout",
      caption: "Mathematical formulas: Total Cost of Logistics (TCL) & In-Transit Capital Cost",
      source: "Financial impact models for heavy industrial enterprises (Steel, Cement, Mining, Chemicals, Capital Goods).",
      items: [
        {
          title: "Total Cost of Logistics (TCL) Equation",
          body: "TCL = Base Freight Rate + Gate Detention Penalties + Weighbridge Variance & Shrinkage + In-Transit Working Capital Drag + Invoice Leakage & Billing Overcharges.",
          tone: "navy",
        },
        {
          title: "In-Transit Capital Holding Cost Formula",
          body: "Daily In-Transit Capital Cost = Consignment Value (INR) * (WACC % / 365) * Transit Delay (Days).",
          tone: "teal",
        },
        {
          title: "Worked Financial Case: Steel Coil Consignment",
          body: "A heavy flatbed carrying specialized cold-rolled steel coils valued at ₹5,00,00,000 (₹5 Crores) with an enterprise WACC of 12% incurs ₹16,438 per day in working capital interest drag. A 4-day unmonitored highway delay locks up ₹65,752 in pure financing waste on a single truckload.",
          tone: "warm",
        },
      ],
    },
    {
      kind: "tiles",
      caption: "Fixed vs Variable Cost Structure of Long-Haul Industrial Trucks (32ft MXL / 49T Trailer)",
      source: "Operational cost benchmarks explaining why idle truck standing triggers aggressive carrier detention claims.",
      items: [
        {
          title: "Fixed Costs: ₹1,10,000 - ₹1,30,000 / Month",
          body: "Vehicle loan EMI (₹55k - ₹65k), driver/helper salaries and trip allowance (₹44k - ₹58k), commercial insurance, national permits, and fitness certification (₹30k - ₹32k). Fixed costs tick 24/7 even when idling at plant gates.",
        },
        {
          title: "Variable Costs: ₹26 - ₹37 / Kilometre",
          body: "Diesel fuel (45% - 50% of variable spend, i.e., ₹19 - ₹24/km), NHAI FASTag electronic tolls (₹3 - ₹7/km), tyre wear and scheduled preventive maintenance (₹3.50 - ₹5.50/km).",
        },
        {
          title: "The Idling Penalty Dynamic",
          body: "When trucks sit idle inside plant gates for 8 hours, transporters earn zero variable revenue while fixed amortisation continues. Transporters recover this loss by inflating subsequent spot quotes or billing punitive detention.",
        },
      ],
    },
  ],

  "Leak #1: Plant Gate Turnaround Time (TAT) and Yard Demurrage": [
    {
      kind: "image",
      caption: "Demurrage & Gate Detention Calculation Formula",
      source: "Commercial calculation: Detention Cost = Max(0, Total Plant Dwell Hours - Contract Free Time) * Hourly Vehicle Class Rate.",
      src: "/images/blog/tms-formula-detention.png",
      alt: "Plant gate detention and turnaround time calculation formula diagram",
    },
    {
      kind: "flow",
      caption: "The 5-Stage Automated Yard Milestone Framework",
      source: "How modern plant TMS eliminates truck queues and tracks real dwell time across the plant boundary.",
      items: [
        { title: "1. Outer Gate In", body: "ANPR camera reads number plate; FASTag verifies RFID tag; matches open ERP dispatch order; boom barrier opens." },
        { title: "2. Tare Weighment", body: "Truck rolls onto weighbridge; optical beams verify positioning; indicator locks unladen weight via RS-232 serial feed." },
        { title: "3. Bay Allocation", body: "System checks loading bay availability; sends SMS/WhatsApp to driver with assigned bay number; digital screen directs traffic." },
        { title: "4. Gross Weighment", body: "Loaded truck returns to scale; system calculates net payload; verifies against MoRTH axle cap and ERP invoice quantity." },
        { title: "5. Digital Gate Out", body: "e-Way Bill Part B automatically confirmed; digital gate pass generated; barrier lifts; exit timestamp recorded." },
      ],
    },
    {
      kind: "table",
      variant: "compare",
      caption: "Plant gate & yard milestone diagnostic matrix",
      source: "Operational risks of manual paper registers vs automated TMS yard management.",
      headers: ["Yard milestone stage", "Manual process risk", "Automated TMS solution", "Operational savings"],
      rows: [
        ["Stage 1: Gate Entry", "Manual paper register; 15-25 min queue per vehicle", "FASTag / ANPR instant scan; ERP order check", "Eliminates gate queues; zero unverified truck entry"],
        ["Stage 2: Tare Weighment", "Operator types tare weight; vulnerability to scale fraud", "Serial port scale lock; auto-records unladen mass", "Prevents payload inflation; cuts weighment time by 60%"],
        ["Stage 3: Bay Loading", "Drivers wander looking for bays; loading bottlenecks", "Automated SMS/WhatsApp bay allocation & digital display", "Reduces yard wandering by 45 to 90 minutes per trip"],
        ["Stage 4: Gross Weighment", "Overloading past MoRTH limits; highway RTO fines", "Automated scale lock + ERP tolerance threshold check", "100% compliance with legal axle caps; zero RTO penalties"],
        ["Stage 5: Gate Exit", "Manual invoice checking; lost physical gate passes", "Automated digital gate pass and real-time e-Way sync", "Reduces exit processing time to under 2 minutes"],
      ],
    },
    {
      kind: "bars",
      caption: "Standard hourly detention charges by vehicle class in India (INR / hour)",
      source: "Indian freight market commercial contract benchmarks. Dwell billing starts after 2 to 4 hours free time.",
      unit: "₹/hr",
      items: [
        { label: "14ft / 20ft Rigid LCV", value: 350 },
        { label: "32ft Multi-Axle Vehicle (MXL)", value: 600 },
        { label: "40ft Flatbed Trailer (40T/49T)", value: 850 },
        { label: "55T Heavy Bulker / Tipper", value: 1000 },
      ],
    },
    {
      kind: "callout",
      caption: "Financial Loss Case Study: Plant Gate Dwell Overrun",
      source: "Demurrage loss calculation for medium-to-large manufacturing facilities.",
      items: [
        {
          title: "200 Outbound Trips Monthly Scenario",
          body: "A plant dispatching 200 outbound trips per month with an average 2-hour detention overrun past free time at ₹500/hr incurs ₹2,00,000 monthly in pure detention penalties (₹24 Lakhs/year).",
          tone: "warm",
        },
        {
          title: "Factory Throughput Bottleneck",
          body: "Gate congestion creates floor stockouts in finished goods storage, forcing upstream production lines to throttle output while trucks miss evening highway departure windows.",
          tone: "navy",
        },
      ],
    },
  ],

  "Leak #2: Heavy-Haul Volatility and Spot Market Capacity Risks": [
    {
      kind: "donut",
      caption: "The 80/20 Capacity Allocation Model for Industrial Plants",
      source: "Recommended fleet allocation strategy to optimize freight spend, ensure placement SLAs, and handle surge.",
      slices: [
        { label: "Committed 3PL Contract Fleet (ZAFTYS)", value: 80, color: zaftysViz.navy },
        { label: "Flexible Digital Spot Surge (TranZfort)", value: 20, color: zaftysViz.teal },
      ],
    },
    {
      kind: "table",
      variant: "compare",
      caption: "Dedicated 3PL contract fleet vs unorganized spot broker market",
      source: "Supply chain risk and cost comparison for enterprise manufacturing shippers.",
      headers: ["Operational metric", "Dedicated 3PL contract fleet (ZAFTYS)", "Unorganized spot broker market"],
      rows: [
        ["Placement guarantee", "98% to 100% committed SLA placement", "Volatile placement (drops 30-50% during harvest/monsoon)"],
        ["Rate predictability", "Fixed quarterly or annual contract rate cards", "Subject to daily spot surges (up to 35-40% price spikes)"],
        ["Equipment specification", "Custom trailers (coil-wells, bulkers, low-beds)", "Generic open trucks; improper lashing and safety gear"],
        ["Driver qualification", "Plant safety inducted, background verified", "Unverified drivers; high risk of pilferage and cargo damage"],
        ["Technology integration", "Live TMS feeds, automated gate pass & ePOD", "Fragmented phone check-ins; zero automated status logs"],
      ],
    },
    {
      kind: "tiles",
      caption: "Specialized equipment demands by industrial commodity",
      source: "Heavy industrial cargo cannot be hauled on generic open trucks without severe product damage and safety risk.",
      items: [
        {
          title: "Steel & Metals",
          body: "Requires flatbeds with dedicated coil wells, heavy-duty dunnage, and certified high-tensile chain lashing to prevent rolling and axle shift during high-speed transit.",
        },
        {
          title: "Cement & Aggregates",
          body: "Requires pneumatic cement bulkers with high-efficiency air compressors or sealed heavy tippers to prevent moisture ingress and discharge line blockages.",
        },
        {
          title: "Chemicals & Liquid Cargo",
          body: "Demands CCOE / PESO-certified ISO tank containers with stainless steel insulation, emergency shutoff valves, and hazmat-certified drivers with TREM cards.",
        },
        {
          title: "Coal & Mining Ores",
          body: "Requires heavy-duty 3-axle tipper trailers with reinforced Hardox bodies, anti-roll suspension, and dust containment tarpaulins for 24/7 mine site operations.",
        },
      ],
    },
  ],

  "Leak #3: Highway In-Transit Blind Spots and Spoofed Telematics": [
    {
      kind: "image",
      caption: "GST e-Way Bill Distance Validity Formula",
      source: "CGST Rule 138(10): 1 day validity per 200 km for regular freight; 1 day per 20 km for Over-Dimensional Cargo (ODC).",
      src: "/images/blog/tms-formula-eway-validity.png",
      alt: "GST e-Way Bill distance validity calculation formula",
    },
    {
      kind: "flow",
      caption: "Tri-hybrid tracking engine data architecture",
      source: "How ZAFTYS TMS combines 3 independent tracking streams into one tamper-proof freight visibility layer.",
      items: [
        { title: "Layer 1: Hardwired GPS", body: "Dedicated telematics hardware provides 60-second ping intervals, engine ignition status, speed logs, and harsh braking alerts." },
        { title: "Layer 2: FASTag NETC API", body: "Tamper-proof toll plaza timestamps from over 650 NHAI toll booths verify highway checkpoints without hardware dependency." },
        { title: "Layer 3: SIM Triangulation", body: "Consent-based cellular network tower pings track spot market and hired market trucks without installing any hardware." },
        { title: "Unified Visibility Engine", body: "TMS cross-verifies all 3 feeds to calculate accurate corridor ETAs, flag unauthorized halts, and trigger route deviation alerts." },
      ],
    },
    {
      kind: "table",
      variant: "compare",
      caption: "Technical comparison of the 3 freight tracking layers",
      source: "Architecture specification for industrial freight tracking in India.",
      headers: ["Tracking layer", "Primary use case", "Hardware dependency", "Tamper vulnerability", "Data captured"],
      rows: [
        ["Hardwired GPS Unit", "Dedicated 3PL & owned fleets", "High (wired device & OBD)", "Medium (fuse can be pulled or antenna covered)", "Lat/Long, speed, fuel sensor, odometer, engine run-time"],
        ["FASTag NETC Toll API", "All commercial freight (Spot & Contract)", "Zero (uses vehicle FASTag)", "Zero (100% tamper-proof toll infrastructure)", "Toll plaza ID, geocode, timestamp, vehicle class code, lane direction"],
        ["SIM Cell Triangulation", "Market hired & spot trucks", "Zero (uses driver mobile SIM)", "Low (operator-level tower triangulations)", "Cell tower sector location, geofence boundary crosses, trip start/end"],
      ],
    },
    {
      kind: "callout",
      caption: "Why standalone GPS fails on Indian freight corridors",
      source: "Real-world failure points encountered by manufacturing logistics teams.",
      items: [
        {
          title: "The power fuse pull",
          body: "Spot drivers frequently disconnect the power fuse or unscrew battery leads to conceal unauthorized deviations, side-hauls, or illegal fuel transfers.",
          tone: "warm",
        },
        {
          title: "App-based spoofing",
          body: "Smartphone tracking apps are easily tricked by mock-location apps, simulated GPS coordinate spoofers, or simple phone battery shutdowns.",
          tone: "navy",
        },
        {
          title: "The FASTag fail-safe solution",
          body: "Because FASTag is read by high-power overhead toll plaza scanners across national highways, a truck cannot pass an NHAI toll plaza without creating an unalterable digital timestamp.",
          tone: "teal",
        },
      ],
    },
  ],

  "Leak #4: Weighbridge Manipulation and Axle Discrepancies": [
    {
      kind: "image",
      caption: "Material Shortage & Weighbridge Tolerance Formula",
      source: "Shortage calculation: Billable Shortage = Max(0, Factory Net Weight - Customer Net Weight - Contract Tolerance).",
      src: "/images/blog/tms-formula-shortage.png",
      alt: "Weighbridge shortage and tolerance calculation formula",
    },
    {
      kind: "callout",
      caption: "The multi-crore math of weighbridge fraud",
      source: "Financial loss simulation for a 400-truck-per-day industrial plant with minor scale manipulation.",
      items: [
        {
          title: "Daily material shrinkage formula",
          body: "Daily Loss (INR) = Outbound Trucks per Day * Weight Discrepancy per Truck (kg) * Material Value (INR per kg).",
          tone: "navy",
        },
        {
          title: "Cement plant financial impact calculation",
          body: "A cement plant shipping 400 bulkers daily with a tiny 80 kg scale manipulation loses 32,000 kg (32 tonnes) of product every single day. At ₹5,000 per tonne, that equals ₹1,60,000 per day in stolen material, or ₹5.84 Crores per year in untracked shrinkage.",
          tone: "warm",
        },
      ],
    },
    {
      kind: "steps",
      caption: "Automated weighbridge interlocking protocol",
      source: "Zero-human-override hardware and software integration sequence.",
      items: [
        { title: "1. Optical Sensor Positioning", body: "Dual infrared optical sensors at both ends of the weigh platform verify that the vehicle is fully on the scale and not bridging the apron." },
        { title: "2. RS-232 Direct Serial Capture", body: "The TMS directly queries the digital weight indicator via serial/modbus port. Manual keyboard typing is disabled in software." },
        { title: "3. Net Payload Calculation", body: "The system automatically subtracts verified tare weight from gross weight to calculate certified net payload." },
        { title: "4. MoRTH Compliance & ERP Tolerance Check", body: "System checks gross vehicle weight against legal axle limits (49T rigid / 55T trailer) and verifies net weight against the ERP Sales Order." },
        { title: "5. Interlocked Barrier Clearance", body: "If within legal and commercial tolerance, the digital weigh slip is locked and the exit boom barrier opens. If mismatched, the barrier stays locked." },
      ],
    },
    {
      kind: "table",
      variant: "compare",
      caption: "MoRTH safe axle load limits and statutory enforcement rules",
      source: "Motor Vehicles Act Section 113, 194 and MoRTH Gazette Notification S.O. 3467(E).",
      headers: ["Axle / Vehicle configuration", "Statutory maximum weight", "Legal tolerance margin", "Enforcement & Penalty"],
      rows: [
        ["Single Axle (4 tyres, standard)", "11.5 tonnes (12.5T with air suspension)", "5% scale tolerance (Sec 113(3))", "Fines per tonne above legal limit"],
        ["Tandem Axle (8 tyres, rigid/trailer)", "21.0 tonnes", "5% scale tolerance (Sec 113(3))", "Mandatory offloading if >10% overload"],
        ["Tri-Axle (12 tyres, trailer)", "27.0 tonnes", "5% scale tolerance (Sec 113(3))", "High highway RTO detention penalties"],
        ["Rigid Multi-Axle Vehicles Upper Cap", "49.0 tonnes Gross Vehicle Weight (GVW)", "5% scale tolerance (Sec 113(3))", "Vehicle registration suspension risk"],
        ["Semi-Articulated / Tractor-Trailer Cap", "55.0 tonnes Gross Combination Weight", "5% scale tolerance (Sec 113(3))", "Strict Supreme Court offloading order"],
      ],
    },
  ],

  "Leak #5: Delayed e-PODs and Working Capital Lockup": [
    {
      kind: "image",
      caption: "Five-Stage Industrial Plant Control Stack",
      source: "Gate Identity → Locked Weighbridge → Documents & e-Way → Digital Delivery Proof (ePOD) → Four-Way Settlement.",
      src: "/images/blog/tms-five-stage-stack.png",
      alt: "Five-stage industrial TMS control stack from gate to settlement",
    },
    {
      kind: "flow",
      caption: "4-way automated freight invoice reconciliation engine",
      source: "How automated matching replaces 45-day paper freight audit cycles.",
      items: [
        { title: "1. ERP Purchase Order", body: "Contract freight rate, lane origin/destination, and agreed fuel escalation formula." },
        { title: "2. Automated Gate Timestamps", body: "Verified entry, tare weigh, gross weigh, and exit timestamps to audit detention claims." },
        { title: "3. Locked Weighbridge Slip", body: "Tamper-proof certified scale net weight matching dispatch invoice quantity." },
        { title: "4. Geo-Stamped Digital ePOD", body: "Consignee signed delivery copy with GPS geofence validation and shortage notes." },
        { title: "Automated Payment Approval", body: "If all 4 match within tolerance, invoice is passed for payment in 48 hours without human friction." },
      ],
    },
    {
      kind: "table",
      variant: "compare",
      caption: "Physical paper LR vs Digital ePOD 4-Way freight audit",
      source: "Operational timeline and working capital comparison.",
      headers: ["Process parameter", "Traditional physical paper LR process", "Digital ePOD 4-Way automated matching"],
      rows: [
        ["POD return timeline", "30 to 60 days via physical courier from remote sites", "Instant digital upload within 2 hours of delivery"],
        ["Invoice audit cycle", "15 to 30 days of manual spreadsheet reconciliation", "Automated system audit completed in under 48 hours"],
        ["Shortage / damage disputes", "Endless phone arguments between transporter and plant", "Visual photo proof & receiver notes locked at delivery"],
        ["Detention billing verification", "Transporter claims manual hours; zero proof", "Automated gate in/out timestamps cross-checked instantly"],
        ["Transporter cash flow", "Delayed payments lead to carrier refusal during peaks", "Fast payment cycles secure top-tier carrier loyalty"],
      ],
    },
    {
      kind: "tiles",
      caption: "Digital ePOD mandatory verification checklist",
      source: "Required digital artifacts captured via driver mobile link or transporter app.",
      items: [
        {
          title: "High-Resolution Signed LR Photo",
          body: "Clear photographic capture of the physical consignee acknowledgement stamp and authorized receiver signature.",
        },
        {
          title: "GPS Geofenced Coordinate Check",
          body: "Digital timestamp and latitude/longitude coordinates verified within a 50-meter radius of the customer unloading point.",
        },
        {
          title: "Delivery Timestamp Validation",
          body: "Automated verification that delivery occurred during authorized customer site operating and receiving hours.",
        },
        {
          title: "Structured Exception Recording",
          body: "Categorized recording of any carton shortage, bag burst, moisture damage, or customer unloading detention hours.",
        },
        {
          title: "Customer OTP / Digital Acknowledgment",
          body: "Secure one-time password verification sent to the authorized consignee store manager for instant delivery validation.",
        },
      ],
    },
  ],

  "The Master 25-Point Industrial Freight Scorecard": [
    {
      kind: "table",
      variant: "scorecard",
      caption: "The 25-Point Industrial Freight and Plant Logistics Audit Matrix",
      source: "Tap 1 (weak / manual) to 5 (automated / live). Use in management reviews with plant heads, procurement, and logistics directors.",
      headers: ["No.", "Group", "Audit criterion"],
      rows: [
        ["1", "Gate", "Are plant gate entry and exit timestamps captured automatically via FASTag / ANPR cameras without manual logbooks?"],
        ["2", "Gate", "Does your yard system track free-time hours automatically and alert supervisors before detention penalties kick in?"],
        ["3", "Gate", "Are truck drivers assigned specific loading/unloading bays via automated SMS or WhatsApp alerts with zero yard wandering?"],
        ["4", "Gate", "Is average total plant Turnaround Time (TAT) maintained under 120 minutes from outer gate entry to exit?"],
        ["5", "Gate", "Is truck arrival dynamically synchronized with daily ERP production schedules and warehouse bay capacity?"],
        ["6", "Contract", "Is at least 75% to 80% of your freight volume covered by SLA-managed dedicated 3PL contract fleets?"],
        ["7", "Contract", "Do your transport contracts include clear, enforceable SLA penalties for placement failures and transit delays?"],
        ["8", "Contract", "Can your logistics team secure specialized equipment (bulkers, coil flatbeds, tankers) within 4 hours during peak surges?"],
        ["9", "Contract", "Is every spot market truck automatically vetted for driver license, RC, national permit, and insurance validity?"],
        ["10", "Contract", "Are backhaul return loads systematically analyzed and matched to reduce round-trip freight costs?"],
        ["11", "Visibility", "Does your in-transit visibility system combine hardwired GPS, FASTag toll logs, and cellular SIM triangulation?"],
        ["12", "Visibility", "Are automated alerts generated if a vehicle deviates from approved industrial transit corridors or makes unauthorized halts?"],
        ["13", "Visibility", "Is dynamic customer delivery ETA recalculated and updated automatically every 60 minutes?"],
        ["14", "Visibility", "Are high-risk highway corridors and state borders monitored using automated geofenced checkpoints?"],
        ["15", "Visibility", "Can your team track hired market trucks in real time without requiring physical hardware installation?"],
        ["16", "Weighbridge", "Are plant weighbridge scale indicators interlocked directly with your TMS software via serial/modbus port?"],
        ["17", "Weighbridge", "Is manual keyboard weight typing completely disabled for weighbridge operators across all plant shifts?"],
        ["18", "Weighbridge", "Does your system verify vehicle gross loads against statutory MoRTH safe axle weight limits before gate exit?"],
        ["19", "Weighbridge", "Are weight variances exceeding 0.5% between Sales Order and Scale Net automatically flagged for security audit?"],
        ["20", "Weighbridge", "Is vehicle tare (unladen) weight verified and locked on every single entry before bay loading?"],
        ["21", "Finance", "Are digital ePODs captured and uploaded into the system within 2 hours of customer delivery?"],
        ["22", "Finance", "Is freight invoice auditing fully automated using a 4-Way match (PO rate + Gate time + Scale net + ePOD)?"],
        ["23", "Finance", "Is e-Way Bill validity monitored in real time with automated alerts before the legal transit window expires?"],
        ["24", "Finance", "Are detention invoices automatically cross-checked against system gate timestamps before payment approval?"],
        ["25", "Finance", "Is the complete freight billing and reconciliation cycle completed in under 48 hours from delivery?"],
      ],
    },
  ],
};
