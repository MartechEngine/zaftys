import { demoFaultReports, demoMaintenanceSchedules, demoParts, demoWorkOrders } from "@/lib/demo-data";
import {
  createStoredWorkOrder,
  getWorkOrderStatusOverride,
  listStoredWorkOrders,
  setWorkOrderStatus,
  type WorkOrderStatus,
} from "@/lib/maintenance/work-order-store";

export type { WorkOrderStatus };

export type WorkOrderRecord = {
  id: string;
  vehicle: string;
  title: string;
  status: WorkOrderStatus;
  due: string;
  cost: string;
  costInr: number;
  vendor: string;
  notes: string;
};

export type CreateWorkOrderInput = {
  vehicle: string;
  title: string;
  vendor: string;
  due?: string;
  cost?: string;
  notes?: string;
};

function parseCostInr(cost: string) {
  return parseInt(cost.replace(/\D/g, ""), 10) || 0;
}

function toRecord(wo: {
  id: string;
  vehicle: string;
  title: string;
  status: WorkOrderStatus;
  due: string;
  cost: string;
  vendor: string;
  notes: string;
}): WorkOrderRecord {
  return { ...wo, costInr: parseCostInr(wo.cost) };
}

export function validateCreateWorkOrderInput(
  body: unknown,
): CreateWorkOrderInput | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const vehicle = String(data.vehicle ?? "").trim();
  const title = String(data.title ?? "").trim();
  const vendor = String(data.vendor ?? "").trim();
  const due = String(data.due ?? "").trim();
  const cost = String(data.cost ?? "").trim();
  const notes = String(data.notes ?? "").trim();

  if (!vehicle) return { error: "Vehicle is required." };
  if (!title) return { error: "Title is required." };
  if (!vendor) return { error: "Vendor is required." };

  return {
    vehicle,
    title,
    vendor,
    due: due || undefined,
    cost: cost || undefined,
    notes: notes || undefined,
  };
}

export async function listWorkOrders(filters?: {
  status?: WorkOrderStatus | "active";
  vendor?: string;
}): Promise<WorkOrderRecord[]> {
  const demo = demoWorkOrders.map((wo) =>
    toRecord({ ...wo, status: getWorkOrderStatusOverride(wo.id) ?? wo.status }),
  );
  let rows = [...listStoredWorkOrders().map(toRecord), ...demo];

  if (filters?.status === "active") {
    rows = rows.filter((wo) => wo.status !== "resolved");
  } else if (filters?.status) {
    rows = rows.filter((wo) => wo.status === filters.status);
  }

  if (filters?.vendor?.trim()) {
    const needle = filters.vendor.trim().toLowerCase();
    rows = rows.filter((wo) => wo.vendor.toLowerCase().includes(needle));
  }

  return rows;
}

export async function createWorkOrder(input: CreateWorkOrderInput): Promise<WorkOrderRecord> {
  return toRecord(createStoredWorkOrder(input));
}

export async function updateWorkOrderStatus(
  id: string,
  status: WorkOrderStatus,
): Promise<WorkOrderRecord | undefined> {
  const updated = setWorkOrderStatus(id, status);
  return updated ? toRecord(updated) : undefined;
}

export async function getWorkOrder(id: string): Promise<WorkOrderRecord | undefined> {
  return (await listWorkOrders()).find((w) => w.id === id);
}

export async function getMaintenanceSummary() {
  const workOrders = await listWorkOrders();
  const openCount = workOrders.filter((wo) => wo.status !== "resolved").length;
  const { listFaultReports } = await import("@/lib/maintenance/fault-repository");
  const openFaults = (await listFaultReports({ status: "active" })).length;

  return {
    openWorkOrders: openCount,
    scheduleCount: demoMaintenanceSchedules.length,
    partsSkuCount: demoParts.length,
    openFaults,
    recentWorkOrders: workOrders.slice(0, 5),
  };
}

export type MaintenanceSchedule = {
  id: string;
  vehicle: string;
  trigger: string;
  nextDue: string;
  type: string;
};

export type PartRecord = {
  id: string;
  sku: string;
  name: string;
  stock: number;
  reorder: number;
  location: string;
  lowStock: boolean;
};

export async function listMaintenanceSchedules(): Promise<MaintenanceSchedule[]> {
  const { listStoredSchedules } = await import("@/lib/mutations/entity-stores");
  return [...listStoredSchedules(), ...demoMaintenanceSchedules.map((s) => ({ ...s }))];
}

export function validateCreateScheduleInput(
  body: unknown,
): { vehicle: string; trigger: string; nextDue?: string; type?: string } | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const vehicle = String(data.vehicle ?? "").trim();
  const trigger = String(data.trigger ?? "").trim();
  if (!vehicle) return { error: "Vehicle is required." };
  if (!trigger) return { error: "Trigger is required." };
  return {
    vehicle,
    trigger,
    nextDue: String(data.nextDue ?? "").trim() || undefined,
    type: String(data.type ?? "").trim() || undefined,
  };
}

export async function createMaintenanceSchedule(input: {
  vehicle: string;
  trigger: string;
  nextDue?: string;
  type?: string;
}): Promise<MaintenanceSchedule> {
  const { createStoredSchedule } = await import("@/lib/mutations/entity-stores");
  return createStoredSchedule(input);
}

export async function listPartsInventory(): Promise<PartRecord[]> {
  const { getPartStock } = await import("@/lib/maintenance/parts-store");
  return demoParts.map((p) => {
    const stock = getPartStock(p.id) ?? p.stock;
    return {
      ...p,
      stock,
      lowStock: stock <= p.reorder,
    };
  });
}

export async function adjustPartsStock(id: string, delta: number) {
  const { adjustPartStock } = await import("@/lib/maintenance/parts-store");
  return adjustPartStock(id, delta);
}
