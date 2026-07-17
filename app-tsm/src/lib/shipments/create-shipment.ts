import type { OriginType } from "@/lib/constants";

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

  if (!client) return { error: "Client is required." };
  if (!origin) return { error: "Origin is required." };
  if (!destination) return { error: "Destination is required." };
  if (!commodity) return { error: "Commodity is required." };
  if (!Number.isFinite(tonnageMt) || tonnageMt <= 0) {
    return { error: "Tonnage must be a positive number." };
  }

  const originType = b.originType as OriginType | undefined;
  const validOrigin: OriginType[] = ["fleet", "network", "handoff"];
  const resolvedOrigin = originType && validOrigin.includes(originType) ? originType : "fleet";

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
  };
}
