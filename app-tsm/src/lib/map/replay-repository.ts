import { fetchAllShipmentsRaw } from "@/lib/data/shipment-repository";
import { allowDemoSeeds } from "@/lib/data/demo-mode";

export type ReplayPoint = {
  lat: number;
  lng: number;
  timestamp: string;
  speedKmh: number;
};

export type JourneyReplay = {
  shipmentId: string;
  publicId: string;
  route: string;
  vehicle: string;
  driver?: string;
  completedAt: string;
  durationMinutes: number;
  distanceKm: number;
  pointCount: number;
  points: ReplayPoint[];
};

const ROUTE_COORDS: Record<string, [number, number][]> = {
  "Nagpur→Amravati": [
    [21.1458, 79.0882],
    [21.12, 79.05],
    [21.08, 78.98],
    [21.02, 78.92],
    [20.95, 78.88],
    [20.9333, 77.75],
  ],
  "Amravati→Nagpur": [
    [20.9333, 77.75],
    [20.98, 77.82],
    [21.05, 77.95],
    [21.1, 78.05],
    [21.1458, 79.0882],
  ],
  default: [
    [20.9333, 77.75],
    [21.0, 78.0],
    [21.1458, 79.0882],
  ],
};

function routeKey(origin: string, destination: string) {
  return `${origin}→${destination}`;
}

function interpolatePoints(coords: [number, number][], count: number): ReplayPoint[] {
  const base = Date.now() - count * 60_000;
  const points: ReplayPoint[] = [];

  for (let i = 0; i < count; i += 1) {
    const t = i / Math.max(1, count - 1);
    const segmentIndex = Math.min(Math.floor(t * (coords.length - 1)), coords.length - 2);
    const localT = t * (coords.length - 1) - segmentIndex;
    const [lat1, lng1] = coords[segmentIndex];
    const [lat2, lng2] = coords[segmentIndex + 1];
    points.push({
      lat: lat1 + (lat2 - lat1) * localT,
      lng: lng1 + (lng2 - lng1) * localT,
      timestamp: new Date(base + i * 60_000).toISOString(),
      speedKmh: 35 + Math.round(Math.sin(i / 3) * 12),
    });
  }

  return points;
}

function buildReplay(shipment: Awaited<ReturnType<typeof fetchAllShipmentsRaw>>[number]): JourneyReplay {
  const key = routeKey(shipment.origin, shipment.destination);
  const coords = ROUTE_COORDS[key] ?? ROUTE_COORDS.default;
  const pointCount = 24;
  const points = interpolatePoints(coords, pointCount);

  return {
    shipmentId: shipment.id,
    publicId: shipment.publicId,
    route: `${shipment.origin} → ${shipment.destination}`,
    vehicle: shipment.vehicle ?? "—",
    driver: shipment.driver,
    completedAt: shipment.updatedAt,
    durationMinutes: pointCount,
    distanceKm: key.includes("Amravati") ? 152 : 98,
    pointCount,
    points,
  };
}

export async function listReplayCandidates() {
  if (!allowDemoSeeds()) return [];
  const shipments = await fetchAllShipmentsRaw();
  return shipments
    .filter((s) => s.status === "delivered" && s.vehicle)
    .map((s) => ({
      shipmentId: s.id,
      publicId: s.publicId,
      route: `${s.origin} → ${s.destination}`,
      vehicle: s.vehicle!,
      completedAt: s.updatedAt,
    }));
}

export async function getJourneyReplay(shipmentId?: string): Promise<JourneyReplay | undefined> {
  // Live: no invented GPS journeys until telematics history is wired
  if (!allowDemoSeeds()) return undefined;

  const shipments = await fetchAllShipmentsRaw();
  const delivered = shipments.filter((s) => s.status === "delivered" && s.vehicle);

  const target =
    (shipmentId ? delivered.find((s) => s.id === shipmentId) : undefined) ??
    delivered.find((s) => s.publicId === "ZFT-2026-0138") ??
    delivered[0];

  if (!target) return undefined;
  return buildReplay(target);
}
