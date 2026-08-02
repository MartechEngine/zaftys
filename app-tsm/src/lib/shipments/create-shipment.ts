import type { OriginType } from "@/lib/constants";

export interface CreateShipmentPlace {
  city: string;
  state?: string;
  lat?: number;
  lng?: number;
  label?: string;
}

export interface CreateShipmentInput {
  client: string;
  origin: string;
  destination: string;
  commodity: string;
  tonnageMt: number;
  lrNumber?: string;
  originType?: OriginType;
  driverId?: string;
  vehicleId?: string;
  /** Structured TranZfort-aligned fields (from catalog pickers). */
  originPlace?: CreateShipmentPlace;
  destinationPlace?: CreateShipmentPlace;
  materialCode?: string;
}

export function validateCreateShipmentInput(body: unknown): CreateShipmentInput | { error: string } {
  if (!body || typeof body !== "object") {
    return { error: "Request body is required." };
  }
  const b = body as Record<string, unknown>;
  const client = String(b.client ?? "").trim();
  const origin = String(b.origin ?? "").trim();
  const destination = String(b.destination ?? "").trim();
  const commodity = String(b.commodity ?? "").trim();
  const tonnageMt = Number(b.tonnageMt);
  const materialCode = b.materialCode != null ? String(b.materialCode).trim() : undefined;

  if (!client) return { error: "Client is required." };
  if (!origin) return { error: "Origin is required." };
  if (!destination) return { error: "Destination is required." };
  if (!commodity) return { error: "Commodity / material is required." };
  if (!Number.isFinite(tonnageMt) || tonnageMt <= 0) {
    return { error: "Tonnage must be a positive number." };
  }

  const originType = b.originType as OriginType | undefined;
  const validOrigin: OriginType[] = ["fleet", "network", "handoff"];
  const resolvedOrigin = originType && validOrigin.includes(originType) ? originType : "fleet";

  function asPlace(raw: unknown): CreateShipmentPlace | undefined {
    if (!raw || typeof raw !== "object") return undefined;
    const p = raw as Record<string, unknown>;
    const city = String(p.city ?? "").trim();
    if (!city) return undefined;
    const lat = p.lat != null ? Number(p.lat) : undefined;
    const lng = p.lng != null ? Number(p.lng) : undefined;
    return {
      city,
      state: p.state != null ? String(p.state).trim() : undefined,
      lat: Number.isFinite(lat) ? lat : undefined,
      lng: Number.isFinite(lng) ? lng : undefined,
      label: p.label != null ? String(p.label).trim() : undefined,
    };
  }

  return {
    client,
    origin,
    destination,
    commodity,
    tonnageMt,
    lrNumber: b.lrNumber ? String(b.lrNumber).trim() : undefined,
    originType: resolvedOrigin,
    driverId: b.driverId ? String(b.driverId) : undefined,
    vehicleId: b.vehicleId ? String(b.vehicleId) : undefined,
    originPlace: asPlace(b.originPlace) ?? asPlace({
      city: origin,
      state: b.originState,
      lat: b.originLat,
      lng: b.originLng,
      label: b.originLabel,
    }),
    destinationPlace: asPlace(b.destinationPlace) ?? asPlace({
      city: destination,
      state: b.destinationState,
      lat: b.destinationLat,
      lng: b.destinationLng,
      label: b.destinationLabel,
    }),
    materialCode: materialCode || undefined,
  };
}
