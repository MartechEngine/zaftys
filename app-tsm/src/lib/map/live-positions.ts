import type { GeoPoint, ShipmentGeo } from "@/lib/geo";
import type { ShipmentRecord } from "@/lib/dev-store";
import { upsertDocument, loadCollection } from "@/lib/db/collections";
import { isDatabaseConfigured } from "@/lib/db/client";

export type LivePosition = {
  id: string;
  shipmentId: string;
  lat: number;
  lng: number;
  vehicleId?: string;
  source?: string;
  updatedAt: string;
};

const COLLECTION = "live_positions" as const;

const g = globalThis as typeof globalThis & {
  __tsmLivePositions?: Map<string, LivePosition>;
  __tsmLivePositionsHydrated?: boolean;
  __tsmGeoOverlays?: Map<string, Partial<ShipmentGeo>>;
};

function positions(): Map<string, LivePosition> {
  if (!g.__tsmLivePositions) g.__tsmLivePositions = new Map();
  return g.__tsmLivePositions;
}

function overlays(): Map<string, Partial<ShipmentGeo>> {
  if (!g.__tsmGeoOverlays) g.__tsmGeoOverlays = new Map();
  return g.__tsmGeoOverlays;
}

export async function ensurePositionsHydrated() {
  if (g.__tsmLivePositionsHydrated || !isDatabaseConfigured()) {
    g.__tsmLivePositionsHydrated = true;
    return;
  }
  try {
    const rows = await loadCollection<LivePosition>(COLLECTION);
    const map = positions();
    for (const row of rows) {
      if (row?.shipmentId && Number.isFinite(row.lat) && Number.isFinite(row.lng)) {
        map.set(row.shipmentId, row);
      }
    }
  } catch (err) {
    console.error("[live-positions] hydrate failed", err);
  } finally {
    g.__tsmLivePositionsHydrated = true;
  }
}

export async function upsertLivePosition(input: {
  shipmentId: string;
  lat: number;
  lng: number;
  vehicleId?: string;
  source?: string;
}): Promise<LivePosition> {
  await ensurePositionsHydrated();
  const row: LivePosition = {
    id: input.shipmentId,
    shipmentId: input.shipmentId,
    lat: input.lat,
    lng: input.lng,
    vehicleId: input.vehicleId,
    source: input.source ?? "telematics",
    updatedAt: new Date().toISOString(),
  };
  positions().set(input.shipmentId, row);

  overlays().set(input.shipmentId, {
    current: { lat: input.lat, lng: input.lng },
    gpsUpdatedAt: row.updatedAt,
    gpsStale: false,
  });

  if (isDatabaseConfigured()) {
    try {
      await upsertDocument(COLLECTION, row.id, row);
    } catch (err) {
      console.error("[live-positions] persist failed", err);
    }
  }
  return row;
}

export async function listLivePositions(): Promise<LivePosition[]> {
  await ensurePositionsHydrated();
  return [...positions().values()];
}

export function setGeoOverlay(shipmentId: string, patch: Partial<ShipmentGeo>) {
  const prev = overlays().get(shipmentId) ?? {};
  overlays().set(shipmentId, { ...prev, ...patch });
}

/** Merge live positions + geo overlays onto shipment records. */
export function applyLiveGeo(shipments: ShipmentRecord[]): ShipmentRecord[] {
  return shipments.map((s) => {
    const pos = positions().get(s.id);
    const overlay = overlays().get(s.id);
    if (!pos && !overlay) return s;

    const current: GeoPoint | undefined = pos
      ? { lat: pos.lat, lng: pos.lng }
      : (overlay?.current ?? s.geo?.current);

    const origin = s.geo?.origin ?? current;
    const destination = s.geo?.destination ?? current;
    if (!origin || !destination) return s;

    return {
      ...s,
      geo: {
        origin,
        destination,
        current,
        gpsUpdatedAt: pos?.updatedAt ?? overlay?.gpsUpdatedAt ?? s.geo?.gpsUpdatedAt,
        gpsStale: overlay?.gpsStale ?? (pos ? false : s.geo?.gpsStale),
      },
    };
  });
}
