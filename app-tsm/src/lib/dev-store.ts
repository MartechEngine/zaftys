import type { Shipment, ShipmentStatus, OriginType } from "./constants";
import type { NetworkListingMirror } from "./network/listing-types";
import { createTrackToken, verifyTrackToken } from "./track/tokens";
import { geoForShipment, type ShipmentGeo } from "./geo";

export interface ShipmentDocument {
  id: string;
  type: "lr" | "epod" | "invoice" | "other";
  name: string;
  uploadedAt: string;
  storageKey?: string;
  contentType?: string;
  sizeBytes?: number;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  license: string;
  licenseExpiry: string;
  vehicle?: string;
  vehicleId?: string;
  status: "on_duty" | "off_duty" | "on_trip";
}

export interface Vehicle {
  id: string;
  registration: string;
  type: string;
  capacityMt: number;
  driver?: string;
  status: "available" | "on_trip" | "maintenance";
  docs: "valid" | "expiring" | "expired";
}

export interface ShipmentRecord extends Shipment {
  driverId?: string;
  vehicleId?: string;
  tranzfortId?: string;
  /** Multiple TranZfort trip ids (e.g. multi-truck network assignments). */
  tranzfortTripIds?: string[];
  networkListing?: NetworkListingMirror;
  documents: ShipmentDocument[];
  trackToken?: string;
  updatedAt: string;
  geo?: ShipmentGeo;
}

function attachGeo(shipment: ShipmentRecord): ShipmentRecord {
  return {
    ...shipment,
    geo: geoForShipment({
      id: shipment.id,
      origin: shipment.origin,
      destination: shipment.destination,
      status: shipment.status,
      updatedAt: shipment.updatedAt,
    }),
  };
}

export interface ActivityEvent {
  id: string;
  shipmentId: string;
  type: string;
  message: string;
  timestamp: string;
}

export interface ShipmentNote {
  id: string;
  shipmentId: string;
  author: string;
  body: string;
  createdAt: string;
}

export interface ExceptionItem {
  id: string;
  publicId: string;
  reason: string;
  shipmentId: string;
}

const now = () => new Date().toISOString();

const INITIAL_SHIPMENTS: ShipmentRecord[] = [
  {
    id: "1",
    publicId: "ZFT-2026-0142",
    client: "Acme Cement",
    origin: "Amravati",
    destination: "Nagpur",
    commodity: "Cement",
    tonnageMt: 32,
    status: "in_transit",
    originType: "fleet",
    driver: "R. Sharma",
    driverId: "d1",
    vehicle: "MH-27-AB-1234",
    vehicleId: "v1",
    eta: "Today, 2:00 PM",
    lrNumber: "LR-2026-8891",
    trackToken: "demo-1",
    documents: [
      { id: "doc1", type: "lr", name: "LR-2026-8891.pdf", uploadedAt: "2026-07-11T08:00:00Z" },
    ],
    updatedAt: now(),
  },
  {
    id: "2",
    publicId: "ZFT-2026-0143",
    client: "Steel Corp",
    origin: "Wardha",
    destination: "Pune",
    commodity: "Steel coils",
    tonnageMt: 28,
    status: "pending",
    originType: "network",
    tranzfortId: "tz-demo-8842",
    eta: "Today, 4:30 PM",
    documents: [],
    updatedAt: now(),
  },
  {
    id: "3",
    publicId: "ZFT-2026-0138",
    client: "FMCG Distributors",
    origin: "Nagpur",
    destination: "Amravati",
    commodity: "FMCG",
    tonnageMt: 18,
    status: "delivered",
    originType: "fleet",
    driver: "A. Patil",
    driverId: "d2",
    vehicle: "MH-27-CD-5678",
    vehicleId: "v2",
    lrNumber: "LR-2026-8870",
    trackToken: "demo-3",
    documents: [
      { id: "doc2", type: "lr", name: "LR-2026-8870.pdf", uploadedAt: "2026-07-10T06:00:00Z" },
      { id: "doc3", type: "epod", name: "ePOD-Nagpur.jpg", uploadedAt: "2026-07-10T14:30:00Z" },
    ],
    updatedAt: now(),
  },
  {
    id: "4",
    publicId: "ZFT-2026-0140",
    client: "Mining Ltd",
    origin: "Chandrapur",
    destination: "Amravati",
    commodity: "Iron ore",
    tonnageMt: 40,
    status: "exception",
    originType: "fleet",
    driver: "V. Khan",
    driverId: "d3",
    vehicle: "MH-27-EF-9012",
    vehicleId: "v3",
    eta: "Delayed +45m",
    trackToken: "demo-4",
    documents: [],
    updatedAt: now(),
  },
  {
    id: "5",
    publicId: "ZFT-2026-0144",
    client: "Vidarbha Industries",
    origin: "Wardha",
    destination: "Mumbai",
    commodity: "Textiles",
    tonnageMt: 22,
    status: "dispatched",
    originType: "fleet",
    driver: "S. Deshmukh",
    driverId: "d4",
    vehicle: "MH-27-GH-3456",
    vehicleId: "v4",
    eta: "Tomorrow, 10:00 AM",
    trackToken: "demo-5",
    documents: [{ id: "doc4", type: "lr", name: "LR-2026-8895.pdf", uploadedAt: "2026-07-11T10:00:00Z" }],
    updatedAt: now(),
  },
  {
    id: "6",
    publicId: "ZFT-2026-0145",
    client: "Acme Cement",
    origin: "Amravati",
    destination: "Nagpur",
    commodity: "Cement",
    tonnageMt: 35,
    status: "at_plant",
    originType: "fleet",
    driver: "R. Sharma",
    driverId: "d1",
    vehicle: "MH-27-AB-1234",
    vehicleId: "v1",
    eta: "Today, 5:00 PM",
    trackToken: "demo-6",
    documents: [],
    updatedAt: now(),
  },
  {
    id: "7",
    publicId: "ZFT-2026-0146",
    client: "Steel Corp",
    origin: "Nagpur",
    destination: "Pune",
    commodity: "Steel coils",
    tonnageMt: 30,
    status: "at_weighbridge",
    originType: "fleet",
    driver: "A. Patil",
    driverId: "d2",
    vehicle: "MH-27-CD-5678",
    vehicleId: "v2",
    eta: "Today, 6:30 PM",
    trackToken: "demo-7",
    documents: [],
    updatedAt: now(),
  },
  {
    id: "8",
    publicId: "ZFT-2026-0147",
    client: "FMCG Distributors",
    origin: "Nagpur",
    destination: "Hyderabad",
    commodity: "FMCG",
    tonnageMt: 16,
    status: "in_transit",
    originType: "network",
    driver: "M. Reddy",
    driverId: "d5",
    vehicle: "TS-09-XY-4421",
    vehicleId: "v5",
    eta: "Tomorrow, 8:00 AM",
    trackToken: "demo-8",
    documents: [],
    updatedAt: now(),
  },
  {
    id: "9",
    publicId: "ZFT-2026-0148",
    client: "Acme Cement",
    origin: "Amravati",
    destination: "Nagpur",
    commodity: "Cement",
    tonnageMt: 32,
    status: "pending",
    originType: "network",
    eta: "Tomorrow, 6:00 AM",
    documents: [],
    updatedAt: now(),
  },
  {
    id: "10",
    publicId: "ZFT-2026-0135",
    client: "Mining Ltd",
    origin: "Chandrapur",
    destination: "Nagpur",
    commodity: "Iron ore",
    tonnageMt: 38,
    status: "delivered",
    originType: "fleet",
    driver: "V. Khan",
    driverId: "d3",
    vehicle: "MH-27-EF-9012",
    vehicleId: "v3",
    lrNumber: "LR-2026-8855",
    trackToken: "demo-10",
    documents: [
      { id: "doc5", type: "lr", name: "LR-2026-8855.pdf", uploadedAt: "2026-07-09T06:00:00Z" },
      { id: "doc6", type: "epod", name: "ePOD-Nagpur.jpg", uploadedAt: "2026-07-09T16:00:00Z" },
    ],
    updatedAt: now(),
  },
  {
    id: "11",
    publicId: "ZFT-2026-0132",
    client: "Steel Corp",
    origin: "Wardha",
    destination: "Pune",
    commodity: "Steel",
    tonnageMt: 26,
    status: "cancelled",
    originType: "fleet",
    documents: [],
    updatedAt: now(),
  },
  {
    id: "12",
    publicId: "ZFT-2026-0149",
    client: "Vidarbha Industries",
    origin: "Wardha",
    destination: "Mumbai",
    commodity: "Machinery",
    tonnageMt: 24,
    status: "pending",
    originType: "fleet",
    eta: "Tomorrow, 2:00 PM",
    documents: [],
    updatedAt: now(),
  },
];

/** Shared in-memory store — survives across Next.js API route module instances */
function getShipmentsStore(): ShipmentRecord[] {
  const g = globalThis as typeof globalThis & { __tsmDevShipments?: ShipmentRecord[] };
  if (!g.__tsmDevShipments) {
    g.__tsmDevShipments = structuredClone(INITIAL_SHIPMENTS);
  }
  return g.__tsmDevShipments;
}

const drivers: Driver[] = [
  {
    id: "d1",
    name: "R. Sharma",
    phone: "+91 98765 43210",
    license: "MH-2020-1234567",
    licenseExpiry: "2027-03-15",
    vehicle: "MH-27-AB-1234",
    vehicleId: "v1",
    status: "on_trip",
  },
  {
    id: "d2",
    name: "A. Patil",
    phone: "+91 98765 43211",
    license: "MH-2019-7654321",
    licenseExpiry: "2026-08-20",
    vehicle: "MH-27-CD-5678",
    vehicleId: "v2",
    status: "on_duty",
  },
  {
    id: "d3",
    name: "V. Khan",
    phone: "+91 98765 43212",
    license: "MH-2021-9988776",
    licenseExpiry: "2028-01-10",
    vehicle: "MH-27-EF-9012",
    vehicleId: "v3",
    status: "on_trip",
  },
  {
    id: "d4",
    name: "S. Deshmukh",
    phone: "+91 98765 43213",
    license: "MH-2018-5544332",
    licenseExpiry: "2027-11-05",
    vehicle: "MH-27-GH-3456",
    vehicleId: "v4",
    status: "on_trip",
  },
  {
    id: "d5",
    name: "M. Reddy",
    phone: "+91 98765 43214",
    license: "TS-2020-1122334",
    licenseExpiry: "2026-12-18",
    vehicle: "TS-09-XY-4421",
    vehicleId: "v5",
    status: "on_trip",
  },
];

const vehicles: Vehicle[] = [
  {
    id: "v1",
    registration: "MH-27-AB-1234",
    type: "Multi-axle",
    capacityMt: 35,
    driver: "R. Sharma",
    status: "on_trip",
    docs: "valid",
  },
  {
    id: "v2",
    registration: "MH-27-CD-5678",
    type: "Trailer",
    capacityMt: 40,
    driver: "A. Patil",
    status: "available",
    docs: "expiring",
  },
  {
    id: "v3",
    registration: "MH-27-EF-9012",
    type: "Multi-axle",
    capacityMt: 42,
    driver: "V. Khan",
    status: "on_trip",
    docs: "valid",
  },
  {
    id: "v4",
    registration: "MH-27-GH-3456",
    type: "Trailer",
    capacityMt: 38,
    driver: "S. Deshmukh",
    status: "on_trip",
    docs: "valid",
  },
  {
    id: "v5",
    registration: "TS-09-XY-4421",
    type: "Multi-axle",
    capacityMt: 30,
    driver: "M. Reddy",
    status: "on_trip",
    docs: "valid",
  },
];

const activities: ActivityEvent[] = [
  {
    id: "a1",
    shipmentId: "1",
    type: "shipment.status_changed",
    message: "ZFT-2026-0142 in transit to Nagpur",
    timestamp: "2026-07-11T09:30:00Z",
  },
  {
    id: "a2",
    shipmentId: "2",
    type: "shipment.created",
    message: "ZFT-2026-0143 synced from TranZfort",
    timestamp: "2026-07-11T08:15:00Z",
  },
  {
    id: "a3",
    shipmentId: "4",
    type: "shipment.exception",
    message: "ZFT-2026-0140 delayed +45m on Chandrapur corridor",
    timestamp: "2026-07-11T07:45:00Z",
  },
  {
    id: "a4",
    shipmentId: "6",
    type: "shipment.status_changed",
    message: "ZFT-2026-0145 arrived at Amravati plant",
    timestamp: "2026-07-11T06:20:00Z",
  },
  {
    id: "a5",
    shipmentId: "10",
    type: "shipment.delivered",
    message: "ZFT-2026-0135 delivered — ePOD received",
    timestamp: "2026-07-10T16:00:00Z",
  },
  {
    id: "a6",
    shipmentId: "9",
    type: "shipment.created",
    message: "ZFT-2026-0148 network booking awaiting assignment",
    timestamp: "2026-07-11T05:00:00Z",
  },
];

export const syncStatus = {
  lastSyncAt: new Date().toISOString(),
  healthy: true,
};

export function listShipments(filters?: {
  tab?: string;
  status?: string;
}) {
  const shipments = getShipmentsStore();
  let result = [...shipments];
  if (filters?.tab === "active") {
    result = result.filter((s) =>
      ["pending", "dispatched", "at_plant", "in_transit", "at_weighbridge", "exception"].includes(s.status),
    );
  } else if (filters?.tab === "completed") {
    result = result.filter((s) => s.status === "delivered");
  } else if (filters?.tab === "exceptions") {
    result = result.filter((s) => s.status === "exception" || (!s.driver && s.status === "pending"));
  }
  if (filters?.status) {
    result = result.filter((s) => s.status === filters.status);
  }
  return result.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).map(attachGeo);
}

export function getShipment(id: string) {
  const shipments = getShipmentsStore();
  const s = shipments.find((sh) => sh.id === id);
  return s ? attachGeo(s) : undefined;
}

export function getShipmentByToken(token: string) {
  const shipments = getShipmentsStore();
  const decoded = decodeURIComponent(token);
  const verified = verifyTrackToken(decoded);
  if (verified) {
    const s = shipments.find((sh) => sh.id === verified.shipmentId);
    if (s) return attachGeo(s);
  }
  const s = shipments.find(
    (sh) => sh.trackToken === decoded || sh.trackToken === token || token.includes(sh.id),
  );
  return s ? attachGeo(s) : undefined;
}

export function createShipment(input: {
  client: string;
  origin: string;
  destination: string;
  commodity: string;
  tonnageMt: number;
  lrNumber?: string;
  originType?: OriginType;
  driverId?: string;
  vehicleId?: string;
  originPlace?: {
    city: string;
    state?: string;
    lat?: number;
    lng?: number;
    label?: string;
  };
  destinationPlace?: {
    city: string;
    state?: string;
    lat?: number;
    lng?: number;
    label?: string;
  };
  materialCode?: string;
}) {
  const shipments = getShipmentsStore();
  const id = `sh-${Date.now()}`;
  const publicId = `ZFT-2026-${String(shipments.length + 150).padStart(4, "0")}`;

  const shipment: ShipmentRecord = {
    id,
    publicId,
    client: input.client,
    origin: input.originPlace?.city ?? input.origin,
    destination: input.destinationPlace?.city ?? input.destination,
    commodity: input.commodity,
    tonnageMt: input.tonnageMt,
    status: "pending",
    originType: input.originType ?? "fleet",
    lrNumber: input.lrNumber,
    materialCode: input.materialCode,
    originState: input.originPlace?.state,
    originLat: input.originPlace?.lat,
    originLng: input.originPlace?.lng,
    originLabel: input.originPlace?.label,
    destinationState: input.destinationPlace?.state,
    destinationLat: input.destinationPlace?.lat,
    destinationLng: input.destinationPlace?.lng,
    destinationLabel: input.destinationPlace?.label,
    documents: [],
    trackToken: `demo-${id}`,
    updatedAt: now(),
  };

  shipments.unshift(shipment);

  activities.unshift({
    id: `a${Date.now()}`,
    shipmentId: id,
    type: "shipment.created",
    message: `${publicId} created · ${shipment.origin} → ${shipment.destination}`,
    timestamp: now(),
  });

  if (input.driverId && input.vehicleId) {
    const assigned = assignShipment(id, input.driverId, input.vehicleId);
    if (assigned) return assigned;
    // Keep created shipment even if assign ids are unknown (stored-only fleet, etc.)
  }

  return attachGeo(shipment);
}

export function assignShipment(
  id: string,
  driverId: string,
  vehicleId: string,
) {
  const shipments = getShipmentsStore();
  const shipment = shipments.find((s) => s.id === id);

  // Prefer seeded demo fleet, then session-created overlays
  let driver = drivers.find((d) => d.id === driverId);
  let vehicle = vehicles.find((v) => v.id === vehicleId);
  try {
    const g = globalThis as typeof globalThis & {
      __tsmDrivers?: Driver[];
      __tsmVehicles?: Vehicle[];
      __tsmDriverPatches?: Record<string, Partial<Driver>>;
      __tsmVehiclePatches?: Record<string, Partial<Vehicle>>;
    };
    if (!driver) {
      driver = g.__tsmDrivers?.find((d) => d.id === driverId);
      const patch = g.__tsmDriverPatches?.[driverId];
      if (driver && patch) driver = { ...driver, ...patch, id: driver.id };
    }
    if (!vehicle) {
      vehicle = g.__tsmVehicles?.find((v) => v.id === vehicleId);
      const patch = g.__tsmVehiclePatches?.[vehicleId];
      if (vehicle && patch) vehicle = { ...vehicle, ...patch, id: vehicle.id };
    }
  } catch {
    /* ignore */
  }

  if (!shipment || !driver || !vehicle) return null;

  shipment.driverId = driverId;
  shipment.vehicleId = vehicleId;
  shipment.driver = driver.name;
  shipment.vehicle = vehicle.registration;
  shipment.status = "dispatched";
  shipment.trackToken = shipment.trackToken ?? `demo-${id}`;
  shipment.updatedAt = now();

  activities.unshift({
    id: `a${Date.now()}`,
    shipmentId: id,
    type: "shipment.assigned",
    message: `${shipment.publicId} assigned to ${driver.name} · ${vehicle.registration}`,
    timestamp: now(),
  });

  return shipment ? attachGeo(shipment) : null;
}

export function getKpis() {
  const shipments = getShipmentsStore();
  const active = shipments.filter((s) =>
    ["dispatched", "at_plant", "in_transit", "at_weighbridge"].includes(s.status),
  ).length;
  const exceptions = shipments.filter(
    (s) => s.status === "exception" || (s.status === "pending" && s.originType === "network"),
  ).length;
  const atPlant = shipments.filter((s) => s.status === "at_plant").length;
  const networkOverflow = shipments.filter(
    (s) => s.status === "pending" && s.originType === "network",
  ).length;

  return { activeTrips: active, exceptions, atPlant, networkOverflow };
}

export function getExceptions(): ExceptionItem[] {
  const shipments = getShipmentsStore();
  return shipments
    .filter((s) => s.status === "exception" || (s.status === "pending" && !s.driver))
    .map((s) => ({
      id: s.id,
      shipmentId: s.id,
      publicId: s.publicId,
      reason:
        s.status === "exception"
          ? "Late ETA (+45m)"
          : s.originType === "network"
            ? "Unassigned - network booking"
            : "Awaiting assignment",
    }));
}

export function listDrivers() {
  return [...drivers];
}

export function listVehicles() {
  return [...vehicles];
}

export function listActivities(limit = 10) {
  return activities.slice(0, limit);
}

export function listActivitiesForShipment(shipmentId: string, limit = 20) {
  return activities.filter((a) => a.shipmentId === shipmentId).slice(0, limit);
}

export function logActivity(event: Omit<ActivityEvent, "id">) {
  activities.unshift({
    ...event,
    id: `a${Date.now()}`,
  });
}

function getNotesStore(): Map<string, ShipmentNote[]> {
  const g = globalThis as typeof globalThis & {
    __tsmDevNotes?: Map<string, ShipmentNote[]>;
  };
  if (!g.__tsmDevNotes) {
    g.__tsmDevNotes = new Map([
      [
        "1",
        [
          {
            id: "n1",
            shipmentId: "1",
            author: "Dispatcher",
            body: "Customer requested morning delivery slot at Nagpur plant.",
            createdAt: "2026-07-11T08:30:00Z",
          },
        ],
      ],
    ]);
  }
  return g.__tsmDevNotes;
}

export function listShipmentNotes(shipmentId: string, limit = 50) {
  const notes = getNotesStore().get(shipmentId) ?? [];
  return [...notes]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

export function addShipmentNote(shipmentId: string, author: string, body: string) {
  const trimmed = body.trim();
  if (!trimmed) return null;

  const note: ShipmentNote = {
    id: `n${Date.now()}`,
    shipmentId,
    author,
    body: trimmed,
    createdAt: now(),
  };

  const store = getNotesStore();
  const existing = store.get(shipmentId) ?? [];
  existing.unshift(note);
  store.set(shipmentId, existing);

  logActivity({
    shipmentId,
    type: "shipment.note",
    message: `Note added by ${author}`,
    timestamp: now(),
  });

  return note;
}

export function getAvailableDrivers() {
  return drivers.filter((d) => d.status !== "off_duty");
}

export function getAvailableVehicles(minCapacity?: number) {
  return vehicles.filter(
    (v) =>
      v.status === "available" &&
      v.docs !== "expired" &&
      (minCapacity === undefined || v.capacityMt >= minCapacity),
  );
}

export function updateShipmentStatus(id: string, status: ShipmentStatus) {
  const shipments = getShipmentsStore();
  const shipment = shipments.find((s) => s.id === id);
  if (!shipment) return null;

  shipment.status = status;
  shipment.updatedAt = now();
  if (status === "delivered") {
    shipment.eta = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  const labels: Partial<Record<ShipmentStatus, string>> = {
    in_transit: "In transit",
    delivered: "Delivered",
    cancelled: "Cancelled",
    exception: "Exception flagged",
  };
  const label = labels[status] ?? status.replace("_", " ");

  activities.unshift({
    id: `a${Date.now()}`,
    shipmentId: id,
    type: `shipment.${status}`,
    message: `${shipment.publicId} · ${label}`,
    timestamp: now(),
  });

  return attachGeo(shipment);
}

export type ShipmentFieldsPatch = {
  client?: string;
  origin?: string;
  destination?: string;
  commodity?: string;
  tonnageMt?: number;
  lrNumber?: string;
  eta?: string;
  originType?: OriginType;
  driver?: string;
  driverId?: string;
  vehicle?: string;
  vehicleId?: string;
  /** Link marketplace Super Load after publish. */
  tranzfortId?: string;
  networkListing?: NetworkListingMirror | null;
};

export function updateShipmentFields(id: string, patch: ShipmentFieldsPatch) {
  const shipments = getShipmentsStore();
  const shipment = shipments.find((s) => s.id === id);
  if (!shipment) return null;

  if (patch.client !== undefined) shipment.client = patch.client;
  if (patch.origin !== undefined) shipment.origin = patch.origin;
  if (patch.destination !== undefined) shipment.destination = patch.destination;
  if (patch.commodity !== undefined) shipment.commodity = patch.commodity;
  if (patch.tonnageMt !== undefined) shipment.tonnageMt = patch.tonnageMt;
  if (patch.lrNumber !== undefined) shipment.lrNumber = patch.lrNumber;
  if (patch.eta !== undefined) shipment.eta = patch.eta;
  if (patch.originType !== undefined) shipment.originType = patch.originType;
  if (patch.driver !== undefined) shipment.driver = patch.driver;
  if (patch.vehicle !== undefined) shipment.vehicle = patch.vehicle;
  if (patch.tranzfortId !== undefined) {
    shipment.tranzfortId = patch.tranzfortId;
    shipment.tranzfortTripIds = Array.from(
      new Set([...(shipment.tranzfortTripIds ?? []), patch.tranzfortId]),
    );
  }
  if (patch.networkListing !== undefined) {
    if (patch.networkListing === null) delete shipment.networkListing;
    else shipment.networkListing = patch.networkListing;
  }
  shipment.updatedAt = now();

  activities.unshift({
    id: `a${Date.now()}`,
    shipmentId: id,
    type: "shipment.updated",
    message: `${shipment.publicId} · trip details updated`,
    timestamp: now(),
  });

  return attachGeo(shipment);
}

export function cancelShipment(id: string) {
  return updateShipmentStatus(id, "cancelled");
}

export function tickActiveGeo() {
  const shipments = getShipmentsStore();
  for (const shipment of shipments) {
    if (!["dispatched", "in_transit", "at_plant", "at_weighbridge"].includes(shipment.status)) {
      continue;
    }
    const geo = geoForShipment({
      id: shipment.id,
      origin: shipment.origin,
      destination: shipment.destination,
      status: shipment.status,
      updatedAt: now(),
    });
    if (geo) {
      shipment.geo = geo;
    }
    shipment.updatedAt = now();
  }
}

export function addShipmentDocument(
  id: string,
  input: {
    type: ShipmentDocument["type"];
    name: string;
    id?: string;
    storageKey?: string;
    contentType?: string;
    sizeBytes?: number;
  },
) {
  const shipments = getShipmentsStore();
  const shipment = shipments.find((s) => s.id === id);
  if (!shipment) return null;

  const doc: ShipmentDocument = {
    id: input.id ?? `doc-${Date.now()}`,
    type: input.type,
    name: input.name,
    uploadedAt: now(),
    ...(input.storageKey ? { storageKey: input.storageKey } : {}),
    ...(input.contentType ? { contentType: input.contentType } : {}),
    ...(input.sizeBytes != null ? { sizeBytes: input.sizeBytes } : {}),
  };
  shipment.documents.push(doc);
  shipment.updatedAt = now();

  activities.unshift({
    id: `a${Date.now()}`,
    shipmentId: id,
    type: "document.uploaded",
    message: `${shipment.publicId} · ${input.type.toUpperCase()} uploaded`,
    timestamp: now(),
  });

  return attachGeo(shipment);
}

export function generateTrackLink(id: string) {
  const shipments = getShipmentsStore();
  const shipment = shipments.find((s) => s.id === id);
  if (!shipment) return null;
  shipment.trackToken = createTrackToken(id);
  return {
    token: shipment.trackToken,
    url: `/track/${encodeURIComponent(shipment.trackToken)}`,
  };
}

export type { ShipmentStatus };
