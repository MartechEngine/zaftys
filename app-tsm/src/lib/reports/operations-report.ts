import type { ShipmentRecord } from "@/lib/dev-store";
import { fetchAllShipmentsRaw } from "@/lib/data/shipment-repository";
import { isExceptionShipment } from "@/lib/shipments/filters";

export type CorridorStat = {
  corridor: string;
  trips: number;
  onTime: number;
};

export type OperationsReport = {
  totalTrips: number;
  onTimePercent: number;
  avgTransitHours: number;
  exceptions: number;
  byCorridor: CorridorStat[];
};

export type DriverScorecard = {
  id: string;
  name: string;
  trips: number;
  onTime: string;
  safety: string;
  rating: number;
};

function corridorLabel(origin: string, destination: string) {
  return `${origin} – ${destination}`;
}

function isOnTimeDelivery(s: ShipmentRecord) {
  return s.status === "delivered";
}

export async function getOperationsReport(): Promise<OperationsReport> {
  const shipments = await fetchAllShipmentsRaw();
  const totalTrips = shipments.length;
  const delivered = shipments.filter((s) => s.status === "delivered");
  const onTimeCount = delivered.filter(isOnTimeDelivery).length;
  const onTimePercent =
    delivered.length > 0 ? Math.round((onTimeCount / delivered.length) * 100) : 0;

  const exceptions = shipments.filter(isExceptionShipment).length;

  const corridorMap = new Map<string, { trips: number; onTime: number; delivered: number }>();
  for (const s of shipments) {
    const key = corridorLabel(s.origin, s.destination);
    const entry = corridorMap.get(key) ?? { trips: 0, onTime: 0, delivered: 0 };
    entry.trips += 1;
    if (s.status === "delivered") {
      entry.delivered += 1;
      if (isOnTimeDelivery(s)) entry.onTime += 1;
    }
    corridorMap.set(key, entry);
  }

  const byCorridor = [...corridorMap.entries()]
    .map(([corridor, stats]) => ({
      corridor,
      trips: stats.trips,
      onTime:
        stats.delivered > 0 ? Math.round((stats.onTime / stats.delivered) * 100) : 0,
    }))
    .sort((a, b) => b.trips - a.trips);

  const activeCount = shipments.filter((s) =>
    ["dispatched", "in_transit", "at_plant", "at_weighbridge"].includes(s.status),
  ).length;
  const avgTransitHours =
    totalTrips > 0
      ? Math.round(((activeCount * 6 + delivered.length * 18) / Math.max(totalTrips, 1)) * 10) / 10
      : 0;

  return {
    totalTrips,
    onTimePercent,
    avgTransitHours,
    exceptions,
    byCorridor,
  };
}

export async function getDriverScorecards(): Promise<DriverScorecard[]> {
  const shipments = await fetchAllShipmentsRaw();
  const byDriver = new Map<
    string,
    { name: string; trips: number; delivered: number; onTime: number }
  >();

  for (const s of shipments) {
    if (!s.driver) continue;
    const key = s.driverId ?? s.driver;
    const entry = byDriver.get(key) ?? {
      name: s.driver,
      trips: 0,
      delivered: 0,
      onTime: 0,
    };
    entry.trips += 1;
    if (s.status === "delivered") {
      entry.delivered += 1;
      if (isOnTimeDelivery(s)) entry.onTime += 1;
    }
    byDriver.set(key, entry);
  }

  return [...byDriver.entries()]
    .map(([id, d]) => {
      const onTimePct =
        d.delivered > 0 ? Math.round((d.onTime / d.delivered) * 100) : 0;
      const rating = Math.min(5, Math.round((3.8 + onTimePct / 50) * 10) / 10);
      const safety = onTimePct >= 95 ? "A" : onTimePct >= 90 ? "A-" : onTimePct >= 85 ? "B+" : "B";
      return {
        id,
        name: d.name,
        trips: d.trips,
        onTime: `${onTimePct}%`,
        safety,
        rating,
      };
    })
    .sort((a, b) => b.trips - a.trips);
}

export function operationsReportToCsv(byCorridor: CorridorStat[]) {
  const header = ["corridor", "trips", "on_time_pct"];
  const rows = byCorridor.map((c) =>
    [csvEscape(c.corridor), c.trips, c.onTime].join(","),
  );
  return [header.join(","), ...rows].join("\n");
}

export function driverScorecardsToCsv(scorecards: DriverScorecard[]) {
  const header = ["driver", "trips", "on_time", "safety", "rating"];
  const rows = scorecards.map((d) =>
    [csvEscape(d.name), d.trips, csvEscape(d.onTime), d.safety, d.rating].join(","),
  );
  return [header.join(","), ...rows].join("\n");
}

function csvEscape(value: string | number) {
  const s = String(value ?? "");
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}
