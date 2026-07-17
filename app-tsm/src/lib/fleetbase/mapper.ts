import type { OriginType, ShipmentStatus } from "@/lib/constants";
import type { Driver, ShipmentRecord, Vehicle } from "@/lib/dev-store";
import type { CreateShipmentInput } from "@/lib/shipments/create-shipment";

export interface FleetbaseOrder {
  id: string;
  public_id?: string;
  status?: string;
  meta?: Record<string, unknown>;
  customer?: { name?: string };
  pickup?: { name?: string; city?: string };
  dropoff?: { name?: string; city?: string };
  driver?: { name?: string; uuid?: string };
  vehicle?: { plate_number?: string; uuid?: string };
  eta?: string;
}

export interface FleetbaseDriver {
  uuid?: string;
  id?: string;
  name?: string;
  phone?: string;
  phone_number?: string;
  drivers_license_number?: string;
  drivers_license_expiry?: string;
  status?: string;
  vehicle?: { plate_number?: string; uuid?: string; id?: string };
  vehicle_uuid?: string;
}

export interface FleetbaseVehicle {
  uuid?: string;
  id?: string;
  plate_number?: string;
  name?: string;
  model?: string;
  type?: string;
  capacity?: number;
  meta?: { capacity_mt?: number };
  status?: string;
  driver?: { name?: string; uuid?: string };
}

function mapStatus(raw?: string): ShipmentStatus {
  const s = (raw ?? "pending").toLowerCase();
  const map: Record<string, ShipmentStatus> = {
    created: "pending",
    pending: "pending",
    dispatched: "dispatched",
    pickup: "at_plant",
    at_plant: "at_plant",
    started: "in_transit",
    in_progress: "in_transit",
    in_transit: "in_transit",
    at_weighbridge: "at_weighbridge",
    exception: "exception",
    completed: "delivered",
    delivered: "delivered",
    cancelled: "cancelled",
  };
  return map[s] ?? "pending";
}

/** Map TSM portal status → Fleetbase order status field */
export function toFleetbaseStatus(status: ShipmentStatus): string {
  const map: Partial<Record<ShipmentStatus, string>> = {
    pending: "created",
    dispatched: "dispatched",
    at_plant: "pickup",
    in_transit: "started",
    at_weighbridge: "started",
    exception: "started",
    delivered: "completed",
    cancelled: "cancelled",
  };
  return map[status] ?? status;
}

function mapOrigin(meta?: Record<string, unknown>): OriginType {
  const o = meta?.origin_type ?? meta?.origin;
  if (o === "network") return "network";
  if (o === "handoff") return "handoff";
  return "fleet";
}

function mapDriverStatus(raw?: string): Driver["status"] {
  const s = (raw ?? "").toLowerCase();
  if (s.includes("trip") || s === "active") return "on_trip";
  if (s === "off_duty" || s === "inactive") return "off_duty";
  return "on_duty";
}

function mapVehicleStatus(raw?: string): Vehicle["status"] {
  const s = (raw ?? "").toLowerCase();
  if (s.includes("maint")) return "maintenance";
  if (s.includes("trip") || s === "active") return "on_trip";
  return "available";
}

export function mapFleetbaseOrder(order: FleetbaseOrder): ShipmentRecord {
  const meta = order.meta ?? {};
  const origin =
    order.pickup?.city ?? order.pickup?.name ?? (meta.origin as string) ?? "—";
  const destination =
    order.dropoff?.city ?? order.dropoff?.name ?? (meta.destination as string) ?? "—";

  return {
    id: order.id,
    publicId: order.public_id ?? order.id.slice(0, 12).toUpperCase(),
    client: order.customer?.name ?? (meta.client as string) ?? "—",
    origin,
    destination,
    commodity: (meta.commodity as string) ?? "—",
    tonnageMt: Number(meta.tonnage ?? meta.tonnage_mt ?? 0),
    status: mapStatus(order.status),
    originType: mapOrigin(meta),
    driver: order.driver?.name,
    driverId: order.driver?.uuid,
    vehicle: order.vehicle?.plate_number,
    vehicleId: order.vehicle?.uuid,
    eta: order.eta,
    lrNumber: meta.lr_number as string | undefined,
    tranzfortId: meta.tranzfort_id as string | undefined,
    documents: [],
    trackToken: meta.track_token as string | undefined,
    updatedAt: new Date().toISOString(),
  };
}

export function mapFleetbaseDriver(raw: FleetbaseDriver | Record<string, unknown>): Driver {
  const d = raw as FleetbaseDriver;
  const id = String(d.uuid ?? d.id ?? "");
  return {
    id,
    name: d.name ?? "Driver",
    phone: d.phone ?? d.phone_number ?? "—",
    license: d.drivers_license_number ?? "—",
    licenseExpiry: d.drivers_license_expiry ?? "—",
    vehicle: d.vehicle?.plate_number,
    vehicleId: d.vehicle?.uuid ?? d.vehicle?.id ?? d.vehicle_uuid,
    status: mapDriverStatus(d.status),
  };
}

export function mapFleetbaseVehicle(raw: FleetbaseVehicle | Record<string, unknown>): Vehicle {
  const v = raw as FleetbaseVehicle;
  const id = String(v.uuid ?? v.id ?? "");
  const capacityMt = Number(v.meta?.capacity_mt ?? v.capacity ?? 0) || 28;
  return {
    id,
    registration: v.plate_number ?? v.name ?? id.slice(0, 8).toUpperCase(),
    type: v.type ?? v.model ?? "Truck",
    capacityMt,
    driver: v.driver?.name,
    status: mapVehicleStatus(v.status),
    docs: "valid",
  };
}

/** Payload for Fleetbase POST /v1/orders — extend as spike documents schemas */
export function buildFleetbaseCreatePayload(input: CreateShipmentInput): Record<string, unknown> {
  return {
    type: "transport",
    status: "created",
    pickup: { name: input.origin, city: input.origin },
    dropoff: { name: input.destination, city: input.destination },
    meta: {
      client: input.client,
      commodity: input.commodity,
      tonnage: input.tonnageMt,
      tonnage_mt: input.tonnageMt,
      origin_type: input.originType ?? "fleet",
      ...(input.lrNumber ? { lr_number: input.lrNumber } : {}),
    },
  };
}
