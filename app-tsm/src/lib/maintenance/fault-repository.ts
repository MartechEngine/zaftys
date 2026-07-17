import { demoFaultReports } from "@/lib/demo-data";
import {
  getFaultStatusOverride,
  setFaultStatus,
  type FaultStatus,
} from "@/lib/maintenance/fault-store";

export type { FaultStatus };

export type FaultReport = {
  id: string;
  vehicle: string;
  driver: string;
  issue: string;
  reported: string;
  status: FaultStatus;
};

export async function listFaultReports(filters?: {
  status?: FaultStatus | "active";
}): Promise<FaultReport[]> {
  let rows: FaultReport[] = demoFaultReports.map((f) => ({
    ...f,
    status: getFaultStatusOverride(f.id) ?? f.status,
  }));

  if (filters?.status === "active") {
    rows = rows.filter((f) => f.status !== "resolved");
  } else if (filters?.status) {
    rows = rows.filter((f) => f.status === filters.status);
  }

  return rows;
}

export async function getFaultReport(id: string): Promise<FaultReport | undefined> {
  return (await listFaultReports()).find((f) => f.id === id);
}

export async function updateFaultStatus(
  id: string,
  status: FaultStatus,
): Promise<FaultReport | undefined> {
  return setFaultStatus(id, status);
}
