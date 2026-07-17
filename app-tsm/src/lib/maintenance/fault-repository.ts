import { demoFaultReports } from "@/lib/demo-data";
import {
  getFaultWorkOrderId,
  linkFaultToWorkOrder,
} from "@/lib/mutations/sprint17-store";
import {
  createWorkOrder,
  getWorkOrder,
} from "@/lib/maintenance/work-order-repository";
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
  workOrderId?: string;
};

export async function listFaultReports(filters?: {
  status?: FaultStatus | "active";
}): Promise<FaultReport[]> {
  let rows: FaultReport[] = demoFaultReports.map((f) => ({
    ...f,
    status: getFaultStatusOverride(f.id) ?? f.status,
    workOrderId: getFaultWorkOrderId(f.id),
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
  const updated = setFaultStatus(id, status);
  if (!updated) return undefined;
  return { ...updated, workOrderId: getFaultWorkOrderId(id) };
}

export async function linkFaultWithWorkOrder(id: string) {
  const fault = demoFaultReports.find((f) => f.id === id);
  if (!fault) return undefined;

  const existingWoId = getFaultWorkOrderId(id);
  if (existingWoId) {
    const wo = await getWorkOrder(existingWoId);
    setFaultStatus(id, "linked");
    return {
      fault: { ...fault, status: "linked" as const, workOrderId: existingWoId },
      workOrder: wo,
    };
  }

  const workOrder = await createWorkOrder({
    vehicle: fault.vehicle,
    title: `Fault: ${fault.issue}`,
    vendor: "Ashok Tyres & Services",
    notes: `Linked from fault ${id} · reported by ${fault.driver}`,
  });

  linkFaultToWorkOrder(id, workOrder.id);
  setFaultStatus(id, "linked");

  return {
    fault: { ...fault, status: "linked" as const, workOrderId: workOrder.id },
    workOrder,
  };
}
