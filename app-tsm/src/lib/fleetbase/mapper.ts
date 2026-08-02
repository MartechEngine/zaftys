import type { OriginType, ShipmentStatus } from "@/lib/constants";
import type { Driver, ShipmentRecord, Vehicle } from "@/lib/dev-store";
import type { CreateShipmentInput } from "@/lib/shipments/create-shipment";
import { geoEndpointsForShipment, isValidGps } from "@/lib/geo";

export interface FleetbasePlaceRef {
  name?: string;
  city?: string;
  address?: string;
  province?: string;
  latitude?: number;
  longitude?: number;
}

export interface FleetbaseOrder {
  id: string;
  public_id?: string;
  internal_id?: string;
  status?: string;
  meta?: Record<string, unknown>;
  customer?: { name?: string };
  pickup?: FleetbasePlaceRef;
  dropoff?: FleetbasePlaceRef;
  /** Nested payload used by Fleetbase order API responses */
  payload?: {
    pickup?: FleetbasePlaceRef;
    dropoff?: FleetbasePlaceRef;
  };
  driver?: { name?: string; uuid?: string; id?: string };
  vehicle?: { plate_number?: string; uuid?: string; id?: string; name?: string };
  driver_assigned?: { name?: string; uuid?: string; id?: string };
  vehicle_assigned?: {
    plate_number?: string;
    uuid?: string;
    id?: string;
    name?: string;
  };
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

export interface FleetbaseContact {
  uuid?: string;
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  phone_number?: string;
  type?: string;
  meta?: Record<string, unknown>;
  address?: string;
  city?: string;
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
  const pickup = order.pickup ?? order.payload?.pickup;
  const dropoff = order.dropoff ?? order.payload?.dropoff;
  const driver = order.driver_assigned ?? order.driver;
  const vehicle = order.vehicle_assigned ?? order.vehicle;

  const firstText = (...values: unknown[]) => {
    for (const value of values) {
      if (typeof value === "string" && value.trim()) return value.trim();
    }
    return "—";
  };
  // Fleetbase often returns empty strings for place fields. Nullish coalescing
  // would stop at "", hiding our structured meta fallback.
  const origin = firstText(pickup?.city, pickup?.name, pickup?.address, meta.origin);
  const destination = firstText(
    dropoff?.city,
    dropoff?.name,
    dropoff?.address,
    meta.destination,
  );

  const lat = Number(
    meta.latitude ?? meta.lat ?? (meta.location as { lat?: number })?.lat,
  );
  const lng = Number(
    meta.longitude ??
      meta.lng ??
      meta.lon ??
      (meta.location as { lng?: number })?.lng,
  );
  const hasLivePos = isValidGps(lat, lng);
  const endpoints = geoEndpointsForShipment(origin, destination);

  return {
    id: order.id,
    publicId:
      order.public_id ??
      order.internal_id ??
      order.id.slice(0, 12).toUpperCase(),
    client: order.customer?.name ?? (meta.client as string) ?? "—",
    origin,
    destination,
    commodity: (meta.commodity as string) ?? "—",
    tonnageMt: Number(meta.tonnage ?? meta.tonnage_mt ?? 0),
    status: mapStatus(order.status),
    originType: mapOrigin(meta),
    driver: driver?.name,
    driverId: driver?.uuid ?? driver?.id,
    vehicle: vehicle?.plate_number ?? vehicle?.name,
    vehicleId: vehicle?.uuid ?? vehicle?.id,
    eta: order.eta,
    lrNumber: meta.lr_number as string | undefined,
    materialCode:
      typeof meta.material_code === "string" ? meta.material_code : undefined,
    originState:
      typeof meta.origin_state === "string"
        ? meta.origin_state
        : typeof pickup?.province === "string"
          ? pickup.province
          : undefined,
    originLat: Number.isFinite(Number(meta.origin_lat))
      ? Number(meta.origin_lat)
      : Number.isFinite(Number(pickup?.latitude))
        ? Number(pickup?.latitude)
        : undefined,
    originLng: Number.isFinite(Number(meta.origin_lng))
      ? Number(meta.origin_lng)
      : Number.isFinite(Number(pickup?.longitude))
        ? Number(pickup?.longitude)
        : undefined,
    originLabel:
      typeof meta.origin_label === "string"
        ? meta.origin_label
        : typeof pickup?.name === "string"
          ? pickup.name
          : undefined,
    destinationState:
      typeof meta.destination_state === "string"
        ? meta.destination_state
        : typeof dropoff?.province === "string"
          ? dropoff.province
          : undefined,
    destinationLat: Number.isFinite(Number(meta.destination_lat))
      ? Number(meta.destination_lat)
      : Number.isFinite(Number(dropoff?.latitude))
        ? Number(dropoff?.latitude)
        : undefined,
    destinationLng: Number.isFinite(Number(meta.destination_lng))
      ? Number(meta.destination_lng)
      : Number.isFinite(Number(dropoff?.longitude))
        ? Number(dropoff?.longitude)
        : undefined,
    destinationLabel:
      typeof meta.destination_label === "string"
        ? meta.destination_label
        : typeof dropoff?.name === "string"
          ? dropoff.name
          : undefined,
    tranzfortId: meta.tranzfort_id as string | undefined,
    documents: [],
    trackToken: meta.track_token as string | undefined,
    updatedAt: new Date().toISOString(),
    // Live: endpoints from city centroids OK; never invent moving `current`
    geo: hasLivePos
      ? {
          origin: endpoints?.origin ?? { lat, lng },
          destination: endpoints?.destination ?? { lat, lng },
          current: { lat, lng },
          gpsUpdatedAt: new Date().toISOString(),
          gpsStale: false,
        }
      : endpoints
        ? { origin: endpoints.origin, destination: endpoints.destination, gpsStale: true }
        : undefined,
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

/** Map Fleetbase contact → TSM ClientRecord (shipment counts filled by callers). */
export function mapFleetbaseContact(c: FleetbaseContact): {
  id: string;
  name: string;
  gstin?: string;
  city?: string;
  contact?: string;
} {
  const id = String(c.uuid ?? c.id ?? "");
  const meta = c.meta ?? {};
  const gstin =
    typeof meta.gstin === "string"
      ? meta.gstin
      : typeof meta.GSTIN === "string"
        ? meta.GSTIN
        : undefined;
  const city =
    c.city ??
    (typeof meta.city === "string" ? meta.city : undefined) ??
    (typeof meta.address_city === "string" ? meta.address_city : undefined);
  const contactName =
    typeof meta.contact === "string"
      ? meta.contact
      : typeof meta.primary_contact === "string"
        ? meta.primary_contact
        : c.email || c.phone || c.phone_number || undefined;

  return {
    id,
    name: c.name?.trim() || `Contact ${id.slice(0, 8)}`,
    gstin,
    city,
    contact: contactName,
  };
}

function synthesizedClientEmail(name?: string): string {
  const slug = (name ?? "client")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.|\.$/g, "")
    .slice(0, 40);
  return `${slug || "client"}@clients.zaftys.local`;
}

/**
 * Build Fleetbase contact create/update payload from TSM client fields.
 * ContactController requires both `phone` and `email` keys present (even if empty).
 */
export function buildFleetbaseClientPayload(input: {
  name?: string;
  gstin?: string;
  city?: string;
  contact?: string;
}): Record<string, unknown> {
  const meta: Record<string, unknown> = {};
  if (input.gstin) meta.gstin = input.gstin;
  if (input.city) meta.city = input.city;

  const payload: Record<string, unknown> = {
    type: "customer",
    phone: "",
    email: "",
  };
  if (input.name !== undefined) payload.name = input.name;
  if (input.city !== undefined) payload.city = input.city || undefined;

  const contact = input.contact?.trim() ?? "";
  const digits = contact.replace(/\D/g, "");
  if (contact.includes("@")) {
    payload.email = contact;
  } else if (digits.length >= 7) {
    payload.phone = contact.startsWith("+") ? `+${digits}` : digits;
    meta.contact = contact;
    payload.email = synthesizedClientEmail(input.name);
  } else if (contact) {
    meta.contact = contact;
    payload.email = synthesizedClientEmail(input.name);
  } else {
    payload.email = synthesizedClientEmail(input.name);
  }

  if (Object.keys(meta).length > 0) payload.meta = meta;
  return payload;
}

/** Payload for Fleetbase POST /v1/orders — extend as spike documents schemas */
export function buildFleetbaseCreatePayload(input: CreateShipmentInput): Record<string, unknown> {
  const originCity = input.originPlace?.city ?? input.origin;
  const destCity = input.destinationPlace?.city ?? input.destination;
  return {
    type: "transport",
    status: "created",
    pickup: {
      name: input.originPlace?.label ?? originCity,
      city: originCity,
      ...(input.originPlace?.state ? { province: input.originPlace.state } : {}),
      ...(Number.isFinite(input.originPlace?.lat) ? { latitude: input.originPlace!.lat } : {}),
      ...(Number.isFinite(input.originPlace?.lng) ? { longitude: input.originPlace!.lng } : {}),
    },
    dropoff: {
      name: input.destinationPlace?.label ?? destCity,
      city: destCity,
      ...(input.destinationPlace?.state ? { province: input.destinationPlace.state } : {}),
      ...(Number.isFinite(input.destinationPlace?.lat)
        ? { latitude: input.destinationPlace!.lat }
        : {}),
      ...(Number.isFinite(input.destinationPlace?.lng)
        ? { longitude: input.destinationPlace!.lng }
        : {}),
    },
    meta: {
      client: input.client,
      origin: originCity,
      destination: destCity,
      commodity: input.commodity,
      tonnage: input.tonnageMt,
      tonnage_mt: input.tonnageMt,
      origin_type: input.originType ?? "fleet",
      ...(input.lrNumber ? { lr_number: input.lrNumber } : {}),
      ...(input.materialCode ? { material_code: input.materialCode } : {}),
      ...(input.originPlace?.state ? { origin_state: input.originPlace.state } : {}),
      ...(Number.isFinite(input.originPlace?.lat) ? { origin_lat: input.originPlace!.lat } : {}),
      ...(Number.isFinite(input.originPlace?.lng) ? { origin_lng: input.originPlace!.lng } : {}),
      ...(input.originPlace?.label ? { origin_label: input.originPlace.label } : {}),
      ...(input.destinationPlace?.state
        ? { destination_state: input.destinationPlace.state }
        : {}),
      ...(Number.isFinite(input.destinationPlace?.lat)
        ? { destination_lat: input.destinationPlace!.lat }
        : {}),
      ...(Number.isFinite(input.destinationPlace?.lng)
        ? { destination_lng: input.destinationPlace!.lng }
        : {}),
      ...(input.destinationPlace?.label
        ? { destination_label: input.destinationPlace.label }
        : {}),
    },
  };
}
