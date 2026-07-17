import { getOperationsReport, type CorridorStat } from "@/lib/reports/operations-report";

export type LaneReport = {
  corridors: CorridorStat[];
  totalCorridors: number;
  topCorridor: string | null;
};

export async function getLanesReport(): Promise<LaneReport> {
  const ops = await getOperationsReport();
  return {
    corridors: ops.byCorridor,
    totalCorridors: ops.byCorridor.length,
    topCorridor: ops.byCorridor[0]?.corridor ?? null,
  };
}

export function lanesReportToCsv(corridors: CorridorStat[]) {
  const header = ["corridor", "trips", "on_time_pct"];
  const rows = corridors.map((c) =>
    [csvEscape(c.corridor), c.trips, c.onTime].join(","),
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
