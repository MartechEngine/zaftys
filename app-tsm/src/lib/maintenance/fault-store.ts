import { demoFaultReports } from "@/lib/demo-data";
import { demoSeed } from "@/lib/data/demo-mode";
import { logActivity } from "@/lib/dev-store";
import {
  listCreatedFaults,
  upsertCreatedFault,
} from "@/lib/mutations/sprint18-store";

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
  const created = listCreatedFaults().find((f) => f.id === id);
  if (created) {
    const updated = upsertCreatedFault({ ...created, status });
    getOverrides()[id] = status;
    logActivity({
      shipmentId: "",
      type: "fault.updated",
      message: `${updated.issue} · ${updated.vehicle} → ${status}`,
      timestamp: new Date().toISOString(),
    });
    return updated;
  }

  const fault = demoSeed(demoFaultReports).find((f) => f.id === id);
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

export function replaceFaultStatusOverrides(map: Record<string, FaultStatus>) {
  g.__tsmFaultStatus = { ...map };
}

export function listFaultStatusOverrides(): { id: string; value: FaultStatus }[] {
  return Object.entries(getOverrides()).map(([id, value]) => ({ id, value }));
}
