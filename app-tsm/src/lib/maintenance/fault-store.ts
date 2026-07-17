import { demoFaultReports } from "@/lib/demo-data";
import { logActivity } from "@/lib/dev-store";

export type FaultStatus = "open" | "linked" | "resolved";

const g = globalThis as typeof globalThis & {
  __tsmFaultStatus?: Record<string, FaultStatus>;
};

function getOverrides(): Record<string, FaultStatus> {
  if (!g.__tsmFaultStatus) g.__tsmFaultStatus = {};
  return g.__tsmFaultStatus;
}

export function getFaultStatusOverride(id: string): FaultStatus | undefined {
  return getOverrides()[id];
}

export function setFaultStatus(id: string, status: FaultStatus) {
  const fault = demoFaultReports.find((f) => f.id === id);
  if (!fault) return undefined;
  getOverrides()[id] = status;
  logActivity({
    shipmentId: "",
    type: "fault.updated",
    message: `${fault.issue} · ${fault.vehicle} → ${status}`,
    timestamp: new Date().toISOString(),
  });
  return { ...fault, status };
}
