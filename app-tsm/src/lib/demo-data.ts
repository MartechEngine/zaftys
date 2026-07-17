/** Rich mock data for full UI preview — all modules */

export const demoClients = [
  { id: "c1", name: "Acme Cement", gstin: "27AABCA1234A1Z5", city: "Nagpur", activeShipments: 4, contact: "Rajesh Mehta" },
  { id: "c2", name: "Steel Corp India", gstin: "27AABCS5678B2Z6", city: "Pune", activeShipments: 2, contact: "Priya Deshmukh" },
  { id: "c3", name: "FMCG Distributors", gstin: "27AABCF9012C3Z7", city: "Amravati", activeShipments: 1, contact: "Amit Joshi" },
  { id: "c4", name: "Mining Ltd", gstin: "27AABCM3456D4Z8", city: "Chandrapur", activeShipments: 3, contact: "Suresh Rao" },
  { id: "c5", name: "Vidarbha Industries", gstin: "27AABCV7890E5Z9", city: "Wardha", activeShipments: 0, contact: "Neha Kulkarni" },
];

export const demoOverflowLoads = [
  { id: "tz1", bookingId: "TZ-8842", route: "Amravati → Mumbai", commodity: "Cement", tonnage: 32, posted: "2h ago", status: "open" as const },
  { id: "tz2", bookingId: "TZ-8845", route: "Nagpur → Hyderabad", commodity: "Steel", tonnage: 28, posted: "5h ago", status: "open" as const },
  { id: "tz3", bookingId: "TZ-8839", route: "Wardha → Pune", commodity: "FMCG", tonnage: 15, posted: "1d ago", status: "review" as const },
];

export const demoPartners = [
  { id: "p1", name: "Maharashtra Hauliers", verified: true, trips: 48, onTime: "94%", rating: 4.8 },
  { id: "p2", name: "Vidarbha Transport Co", verified: true, trips: 31, onTime: "91%", rating: 4.6 },
  { id: "p3", name: "Central India Fleet", verified: false, trips: 12, onTime: "88%", rating: 4.2 },
];

export const demoDocuments = [
  { id: "doc1", name: "LR-2026-8891.pdf", type: "LR", shipment: "ZFT-2026-0142", client: "Acme Cement", date: "11 Jul 2026" },
  { id: "doc2", name: "ePOD-Nagpur.jpg", type: "ePOD", shipment: "ZFT-2026-0138", client: "FMCG Distributors", date: "10 Jul 2026" },
  { id: "doc3", name: "LR-2026-8870.pdf", type: "LR", shipment: "ZFT-2026-0138", client: "FMCG Distributors", date: "10 Jul 2026" },
  { id: "doc4", name: "Weighbridge-Chanda.pdf", type: "Weighbridge", shipment: "ZFT-2026-0140", client: "Mining Ltd", date: "11 Jul 2026" },
  { id: "doc5", name: "Invoice-July-0142.pdf", type: "Invoice", shipment: "ZFT-2026-0142", client: "Acme Cement", date: "11 Jul 2026" },
];

export const demoPlaces = [
  { id: "pl1", name: "Amravati Cement Plant", type: "Plant", city: "Amravati", geofence: "500m" },
  { id: "pl2", name: "Nagpur Weighbridge WB-3", type: "Weighbridge", city: "Nagpur", geofence: "100m" },
  { id: "pl3", name: "Badnera Depot", type: "Depot", city: "Amravati", geofence: "250m" },
  { id: "pl4", name: "Chandrapur Mine Gate", type: "Plant", city: "Chandrapur", geofence: "750m" },
];

export const demoVendors = [
  { id: "vnd1", name: "Ashok Tyres & Services", type: "Maintenance", city: "Amravati", contact: "+91 712 255 1234" },
  { id: "vnd2", name: "Vidarbha Fuel Station", type: "Fuel", city: "Nagpur", contact: "+91 712 266 5678" },
];

export const demoWorkOrders = [
  { id: "wo1", vehicle: "MH-27-CD-5678", title: "Brake pad replacement", status: "open" as const, due: "15 Jul 2026", cost: "₹12,400", vendor: "Ashok Tyres & Services", notes: "Front axle pads worn" },
  { id: "wo2", vehicle: "MH-27-GH-3456", title: "Scheduled service 50k km", status: "in_progress" as const, due: "18 Jul 2026", cost: "₹28,000", vendor: "Ashok Tyres & Services", notes: "Oil, filters, inspection" },
  { id: "wo3", vehicle: "MH-27-AB-1234", title: "Tyre rotation", status: "resolved" as const, due: "08 Jul 2026", cost: "₹6,200", vendor: "Ashok Tyres & Services", notes: "Completed on schedule" },
];

export const demoMaintenanceSchedules = [
  { id: "ms1", vehicle: "MH-27-AB-1234", trigger: "Every 10,000 km", nextDue: "22 Jul 2026", type: "Service" },
  { id: "ms2", vehicle: "MH-27-CD-5678", trigger: "Every 6 months", nextDue: "01 Aug 2026", type: "Inspection" },
  { id: "ms3", vehicle: "MH-27-EF-9012", trigger: "Every 15,000 km", nextDue: "05 Aug 2026", type: "Tyre check" },
  { id: "ms4", vehicle: "MH-27-GH-3456", trigger: "Annual", nextDue: "12 Sep 2026", type: "Fitness renewal prep" },
];

export const demoParts = [
  { id: "pt1", sku: "BRK-PAD-FA", name: "Front brake pads (multi-axle)", stock: 8, reorder: 4, location: "Amravati depot" },
  { id: "pt2", sku: "OIL-15W40-20L", name: "Engine oil 15W-40 (20L)", stock: 12, reorder: 6, location: "Amravati depot" },
  { id: "pt3", sku: "TYR-295-80R22", name: "Tyre 295/80R22.5", stock: 2, reorder: 4, location: "Nagpur yard" },
  { id: "pt4", sku: "FIL-AIR-MA", name: "Air filter — multi-axle", stock: 15, reorder: 5, location: "Amravati depot" },
];

export const demoFaultReports = [
  { id: "fr1", vehicle: "MH-27-EF-9012", driver: "V. Khan", issue: "Engine warning light", reported: "11 Jul, 9:14 AM", status: "open" as const },
  { id: "fr2", vehicle: "MH-27-CD-5678", driver: "A. Patil", issue: "Brake squeal on descent", reported: "10 Jul, 4:30 PM", status: "linked" as const },
  { id: "fr3", vehicle: "MH-27-GH-3456", driver: "S. Deshmukh", issue: "AC not cooling", reported: "09 Jul, 11:00 AM", status: "resolved" as const },
];

export const demoServiceRates = [
  { id: "sr1", name: "Amravati – Nagpur (cement)", basis: "Per MT · zone", rate: "₹420/MT", minCharge: "₹8,400" },
  { id: "sr2", name: "Nagpur – Pune (steel)", basis: "Distance + weight", rate: "₹18/km/MT", minCharge: "₹12,000" },
  { id: "sr3", name: "Network overflow markup", basis: "Percentage", rate: "+12%", minCharge: "—" },
  { id: "sr4", name: "Detention (plant wait)", basis: "Per hour", rate: "₹800/hr", minCharge: "2 hr free" },
];

export const demoLedgerAccounts = [
  { id: "la1", code: "4000", name: "Freight revenue", type: "Income", balance: "₹24,80,000" },
  { id: "la2", code: "4100", name: "Network overflow revenue", type: "Income", balance: "₹3,20,000" },
  { id: "la3", code: "5000", name: "Fuel & tolls", type: "Expense", balance: "₹8,40,000" },
  { id: "la4", code: "5100", name: "Maintenance", type: "Expense", balance: "₹1,86,000" },
];

export const demoGstSummary = {
  period: "Jul 2026",
  taxableValue: "₹18,40,000",
  cgst: "₹1,65,600",
  sgst: "₹1,65,600",
  igst: "₹42,000",
  filings: [
    { id: "gf1", return: "GSTR-1", period: "Jun 2026", status: "filed" as const, due: "11 Jul 2026" },
    { id: "gf2", return: "GSTR-3B", period: "Jun 2026", status: "filed" as const, due: "20 Jul 2026" },
    { id: "gf3", return: "GSTR-1", period: "Jul 2026", status: "pending" as const, due: "11 Aug 2026" },
  ],
};

export const demoTelematicsProviders = [
  { id: "tp1", name: "Flespi", vehicles: 12, status: "connected" as const, lastPing: "1 min ago" },
  { id: "tp2", name: "Traccar (self-hosted)", vehicles: 5, status: "connected" as const, lastPing: "3 min ago" },
  { id: "tp3", name: "Samsara", vehicles: 0, status: "disconnected" as const, lastPing: "—" },
];

export const demoDevices = [
  { id: "dv1", imei: "359633100012345", vehicle: "MH-27-AB-1234", provider: "Flespi", firmware: "2.4.1", status: "online" as const },
  { id: "dv2", imei: "359633100012346", vehicle: "MH-27-CD-5678", provider: "Flespi", firmware: "2.4.1", status: "online" as const },
  { id: "dv3", imei: "359633100012347", vehicle: "MH-27-EF-9012", provider: "Traccar", firmware: "1.8.0", status: "offline" as const },
];

export const demoSensors = [
  { id: "sn1", device: "359633100012345", type: "GPS", value: "20.9333°N, 77.7500°E", updated: "30s ago" },
  { id: "sn2", device: "359633100012345", type: "Speed", value: "62 km/h", updated: "30s ago" },
  { id: "sn3", device: "359633100012346", type: "Fuel level", value: "68%", updated: "2 min ago" },
];

export const demoSocketChannels = [
  { id: "sk1", channel: "order.updated", subscribers: 3, lastMessage: "2 min ago" },
  { id: "sk2", channel: "driver.location", subscribers: 5, lastMessage: "15s ago" },
  { id: "sk3", channel: "sync.completed", subscribers: 1, lastMessage: "3 min ago" },
];

export const demoOrderTypes = [
  { id: "ot1", name: "Standard freight", statuses: 8, fields: 12, default: true },
  { id: "ot2", name: "Cement bulk", statuses: 10, fields: 18, default: false },
  { id: "ot3", name: "Network overflow", statuses: 6, fields: 9, default: false },
];

export const demoGeofences = [
  { id: "gf1", name: "Amravati Cement Plant", radius: "500m", triggers: "at_plant on enter", linkedPlaces: 1 },
  { id: "gf2", name: "Nagpur WB-3", radius: "100m", triggers: "at_weighbridge on enter", linkedPlaces: 1 },
  { id: "gf3", name: "Chandrapur Mine Gate", radius: "750m", triggers: "at_plant on enter", linkedPlaces: 1 },
];

export const demoGroups = [
  { id: "gr1", name: "Dispatch team", members: 4, policy: "Dispatcher" },
  { id: "gr2", name: "Fleet ops", members: 3, policy: "Fleet Manager" },
  { id: "gr3", name: "Client portal — Acme", members: 2, policy: "Client (read-only)" },
];

export const demoFuelProviders = [
  { id: "fp1", name: "IOCL Fleet Card", stations: 48, status: "connected" as const },
  { id: "fp2", name: "BPCL SmartDrive", stations: 0, status: "disconnected" as const },
];

export const demoContacts = [
  { id: "ct1", clientId: "c1", name: "Rajesh Mehta", role: "Logistics head", phone: "+91 98765 11111", email: "rajesh@acme.com" },
  { id: "ct2", clientId: "c1", name: "Sunita Rao", role: "Accounts", phone: "+91 98765 11112", email: "sunita@acme.com" },
  { id: "ct3", clientId: "c2", name: "Priya Deshmukh", role: "Dispatch", phone: "+91 98765 22221", email: "priya@steelcorp.in" },
];

export const demoClientUsers = [
  { id: "cu1", clientId: "c1", name: "Acme Portal User", email: "portal@acme.com", status: "active" as const, lastLogin: "Today" },
  { id: "cu2", clientId: "c1", name: "Rajesh Mehta", email: "rajesh@acme.com", status: "active" as const, lastLogin: "2d ago" },
  { id: "cu3", clientId: "c2", name: "Steel Corp Viewer", email: "viewer@steelcorp.in", status: "pending" as const, lastLogin: "—" },
];

export const demoFleetGroups = [
  { id: "fg1", name: "Vidarbha cement fleet", drivers: 8, vehicles: 12, zone: "Amravati – Nagpur" },
  { id: "fg2", name: "Pune corridor", drivers: 5, vehicles: 7, zone: "Nagpur – Pune" },
  { id: "fg3", name: "Network partners (TS)", drivers: 3, vehicles: 4, zone: "Inter-state" },
];

export const demoFuelTransactions = [
  { id: "ft1", vehicle: "MH-27-AB-1234", station: "IOCL Badnera", liters: 180, amount: "₹16,200", date: "11 Jul 2026" },
  { id: "ft2", vehicle: "MH-27-CD-5678", station: "IOCL Nagpur", liters: 220, amount: "₹19,800", date: "10 Jul 2026" },
  { id: "ft3", vehicle: "MH-27-EF-9012", station: "Vidarbha Fuel", liters: 195, amount: "₹17,550", date: "09 Jul 2026" },
];

export const demoFuelReports = [
  { id: "fr1", vehicle: "MH-27-AB-1234", kmPerLiter: 3.2, costPerKm: "₹8.40", period: "Jul 2026" },
  { id: "fr2", vehicle: "MH-27-CD-5678", kmPerLiter: 2.9, costPerKm: "₹9.10", period: "Jul 2026" },
  { id: "fr3", vehicle: "MH-27-EF-9012", kmPerLiter: 3.1, costPerKm: "₹8.65", period: "Jul 2026" },
];

export const demoFleetIssues = [
  { id: "fi1", vehicle: "MH-27-EF-9012", driver: "V. Khan", issue: "Engine warning light", severity: "high" as const, reported: "11 Jul" },
  { id: "fi2", vehicle: "MH-27-CD-5678", driver: "A. Patil", issue: "Brake squeal", severity: "medium" as const, reported: "10 Jul" },
];

export const demoEquipment = [
  { id: "eq1", name: "Weighbridge portable scale WB-P1", type: "Weighbridge", location: "Badnera depot", status: "active" as const },
  { id: "eq2", name: "Forklift FL-02", type: "Loader", location: "Amravati plant", status: "active" as const },
  { id: "eq3", name: "GPS spare modem GM-44", type: "Telematics", location: "Spare inventory", status: "stored" as const },
];

export const demoDriverScorecards = [
  { id: "ds1", name: "R. Sharma", trips: 24, onTime: "96%", safety: "A", rating: 4.9 },
  { id: "ds2", name: "A. Patil", trips: 18, onTime: "91%", safety: "B+", rating: 4.6 },
  { id: "ds3", name: "V. Khan", trips: 21, onTime: "88%", safety: "B", rating: 4.4 },
  { id: "ds4", name: "S. Deshmukh", trips: 15, onTime: "94%", safety: "A-", rating: 4.7 },
];

export const demoQuotes = [
  { id: "q1", client: "Acme Cement", route: "Amravati → Mumbai", tonnage: 32, rate: "₹13,440", validUntil: "14 Jul 2026", status: "sent" as const },
  { id: "q2", client: "Vidarbha Industries", route: "Wardha → Pune", tonnage: 24, rate: "₹18,600", validUntil: "13 Jul 2026", status: "draft" as const },
];

export const demoOrchestratorPhases = [
  { id: "ph1", name: "Zone assignment", status: "complete" as const, duration: "0.8s" },
  { id: "ph2", name: "Capacity match", status: "complete" as const, duration: "1.2s" },
  { id: "ph3", name: "Route optimization (VROOM)", status: "running" as const, duration: "—" },
  { id: "ph4", name: "Driver scoring", status: "pending" as const, duration: "—" },
];

export const demoAutomationRules = [
  { id: "ar1", trigger: "status → in_transit", action: "Send client tracking SMS", enabled: true },
  { id: "ar2", trigger: "network booking > 30 min unassigned", action: "Notify overflow partners", enabled: true },
  { id: "ar3", trigger: "geofence enter (plant)", action: "Set status at_plant", enabled: true },
  { id: "ar4", trigger: "document expiry < 30 days", action: "Email fleet manager", enabled: false },
];

export const demoInvoices = [
  { id: "inv1", number: "INV-2026-0891", client: "Acme Cement", amount: "₹1,24,800", gst: "₹22,464", status: "pending" as const, due: "25 Jul 2026" },
  { id: "inv2", number: "INV-2026-0870", client: "FMCG Distributors", amount: "₹86,400", gst: "₹15,552", status: "paid" as const, due: "01 Jul 2026" },
  { id: "inv3", number: "INV-2026-0888", client: "Steel Corp India", amount: "₹2,10,000", gst: "₹37,800", status: "pending" as const, due: "20 Jul 2026" },
];

export const demoWebhooks = [
  { id: "wh1", url: "https://hooks.acme.com/zaftys", events: "order.*", status: "active" as const, lastDelivery: "2 min ago" },
  { id: "wh2", url: "https://api.internal/sync", events: "driver.location", status: "active" as const, lastDelivery: "15 min ago" },
  { id: "wh3", url: "https://staging.test/hook", events: "shipment.completed", status: "failed" as const, lastDelivery: "1h ago" },
];

export const demoUsers = [
  { id: "u1", name: "Ops Dispatcher", email: "dispatcher@zaftys.local", role: "Dispatcher", status: "active" as const },
  { id: "u2", name: "Fleet Manager", email: "fleet@zaftys.local", role: "Fleet Manager", status: "active" as const },
  { id: "u3", name: "Client User", email: "client@acme.com", role: "Client", status: "active" as const },
  { id: "u4", name: "Pending Invite", email: "new.ops@zaftys.com", role: "Dispatcher", status: "pending" as const },
];

export const demoRoles = [
  { id: "r1", name: "Administrator", users: 1, type: "org" as const },
  { id: "r2", name: "Dispatcher", users: 3, type: "org" as const },
  { id: "r3", name: "Fleet Manager", users: 2, type: "org" as const },
  { id: "r4", name: "Client (read-only)", users: 5, type: "org" as const },
];

export const demoNotifications = [
  { id: "n1", title: "Late ETA: ZFT-2026-0140", body: "Mining Ltd shipment delayed +45m on Chandrapur corridor", time: "10 min ago", read: false },
  { id: "n2", title: "New TranZfort booking", body: "TZ-8842 cement load Amravati → Mumbai awaiting dispatch", time: "2h ago", read: false },
  { id: "n3", title: "Document expiring", body: "MH-27-CD-5678 fitness certificate expires in 28 days", time: "1d ago", read: true },
  { id: "n4", title: "ePOD received", body: "ZFT-2026-0138 delivered — ePOD uploaded by A. Patil", time: "1d ago", read: true },
];

export const demoReportOps = {
  totalTrips: 142,
  onTimePercent: 92,
  avgTransitHours: 18.4,
  exceptions: 8,
  byCorridor: [
    { corridor: "Amravati – Nagpur", trips: 48, onTime: 94 },
    { corridor: "Nagpur – Pune", trips: 32, onTime: 89 },
    { corridor: "Chandrapur – Amravati", trips: 24, onTime: 91 },
    { corridor: "Wardha – Mumbai", trips: 18, onTime: 88 },
  ],
};

export const demoIntegrations = [
  { id: "int1", name: "Fleetbase API", status: "connected" as const, latency: "42ms", detail: "Execution backend" },
  { id: "int2", name: "TranZfort Sync", status: "connected" as const, latency: "—", detail: "Last sync 3 min ago" },
  { id: "int3", name: "OpenFreeMap", status: "connected" as const, latency: "—", detail: "Live map tiles (free)" },
  { id: "int4", name: "WhatsApp", status: "disconnected" as const, latency: "—", detail: "Configure in P5" },
  { id: "int5", name: "Tally Export", status: "disconnected" as const, latency: "—", detail: "Configure in P5" },
];

export const demoCalendarEvents = [
  { id: "cal1", date: "12 Jul", time: "06:00", shipment: "ZFT-2026-0148", route: "Amravati → Nagpur", driver: "R. Sharma" },
  { id: "cal2", date: "12 Jul", time: "14:00", shipment: "ZFT-2026-0149", route: "Nagpur → Pune", driver: "Unassigned" },
  { id: "cal3", date: "13 Jul", time: "08:00", shipment: "ZFT-2026-0150", route: "Wardha → Mumbai", driver: "A. Patil" },
];

export const demoApiLogs = [
  { id: "log1", method: "GET", path: "/v1/orders", status: 200, latency: "38ms", time: "2 min ago" },
  { id: "log2", method: "POST", path: "/v1/orders", status: 201, latency: "112ms", time: "15 min ago" },
  { id: "log3", method: "GET", path: "/v1/drivers", status: 200, latency: "45ms", time: "22 min ago" },
  { id: "log4", method: "PATCH", path: "/v1/orders/ord_abc", status: 422, latency: "89ms", time: "1h ago" },
  { id: "log5", method: "GET", path: "/v1/vehicles", status: 200, latency: "41ms", time: "2h ago" },
];

export const demoPlatformEvents = [
  { id: "ev1", type: "order.updated", resource: "ZFT-2026-0142", source: "Fleetbase", time: "5 min ago" },
  { id: "ev2", type: "driver.location", resource: "R. Sharma", source: "Navigator", time: "8 min ago" },
  { id: "ev3", type: "sync.completed", resource: "TranZfort", source: "TSM Sync", time: "3 min ago" },
  { id: "ev4", type: "webhook.failed", resource: "staging.test/hook", source: "Webhooks", time: "1h ago" },
  { id: "ev5", type: "document.uploaded", resource: "LR-2026-8891.pdf", source: "Portal", time: "3h ago" },
];

export const demoComplianceDocs = [
  { id: "cd1", vehicle: "MH-27-CD-5678", doc: "Fitness certificate", expires: "08 Aug 2026", status: "expiring" as const },
  { id: "cd2", vehicle: "MH-27-AB-1234", doc: "Insurance", expires: "15 Jan 2027", status: "valid" as const },
  { id: "cd3", vehicle: "MH-27-EF-9012", doc: "RC", expires: "20 Mar 2027", status: "valid" as const },
  { id: "cd4", vehicle: "TS-09-XY-4421", doc: "Permit (inter-state)", expires: "01 Jun 2026", status: "expired" as const },
];

export const demoOrg = {
  name: "ZAFTYS Logistics Pvt Ltd",
  gstin: "27AABCU9603R1ZM",
  address: "Old Town, Badnera, Amravati 444701, Maharashtra",
  phone: "+91 927 092 3581",
  email: "info@zaftys.com",
};
