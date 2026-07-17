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
  const { getSchedulePatch } = await import("@/lib/mutations/sprint14-store");
  return [...listStoredSchedules(), ...demoMaintenanceSchedules.map((s) => ({ ...s }))].map(
    (row) => {
      const patch = getSchedulePatch(row.id);
      return patch ? { ...row, ...patch } : row;
    },
  );
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

export function validatePatchScheduleInput(
  body: unknown,
):
  | {
      id: string;
      vehicle?: string;
      trigger?: string;
      nextDue?: string;
      type?: string;
    }
  | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const id = String(data.id ?? "").trim();
  if (!id) return { error: "id is required." };

  const patch: {
    id: string;
    vehicle?: string;
    trigger?: string;
    nextDue?: string;
    type?: string;
  } = { id };

  if (data.vehicle !== undefined) {
    const vehicle = String(data.vehicle).trim();
    if (!vehicle) return { error: "Vehicle cannot be empty." };
    patch.vehicle = vehicle;
  }
  if (data.trigger !== undefined) {
    const trigger = String(data.trigger).trim();
    if (!trigger) return { error: "Trigger cannot be empty." };
    patch.trigger = trigger;
  }
  if (data.nextDue !== undefined) {
    patch.nextDue = String(data.nextDue).trim() || undefined;
  }
  if (data.type !== undefined) {
    patch.type = String(data.type).trim() || undefined;
  }

  if (Object.keys(patch).length === 1) {
    return { error: "Provide at least one field to update." };
  }
  return patch;
}

export async function patchMaintenanceSchedule(
  id: string,
  input: { vehicle?: string; trigger?: string; nextDue?: string; type?: string },
): Promise<MaintenanceSchedule | undefined> {
  const schedules = await listMaintenanceSchedules();
  const existing = schedules.find((s) => s.id === id);
  if (!existing) return undefined;

  const { patchStoredSchedule } = await import("@/lib/mutations/entity-stores");
  const { patchScheduleFields } = await import("@/lib/mutations/sprint14-store");

  const stored = patchStoredSchedule(id, input);
  if (stored) return stored;

  patchScheduleFields(id, input);
  return { ...existing, ...input };
}

export async function listPartsInventory(): Promise<PartRecord[]> {
  const { getPartStock } = await import("@/lib/maintenance/parts-store");
  const { listCreatedParts } = await import("@/lib/mutations/sprint17-store");

  const demoRows = demoParts.map((p) => {
    const stock = getPartStock(p.id) ?? p.stock;
    return {
      ...p,
      stock,
      lowStock: stock <= p.reorder,
    };
  });

  const created = listCreatedParts().map((p) => ({
    ...p,
    lowStock: p.stock <= p.reorder,
  }));

  return [...created, ...demoRows];
}

export function validateCreatePartInput(
  body: unknown,
): { sku: string; name: string; stock?: number; reorder?: number; location?: string } | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const sku = String(data.sku ?? "").trim();
  const name = String(data.name ?? "").trim();
  if (!sku) return { error: "SKU is required." };
  if (!name) return { error: "Part name is required." };
  const stock = data.stock != null ? Number(data.stock) : undefined;
  const reorder = data.reorder != null ? Number(data.reorder) : undefined;
  if (stock != null && (!Number.isFinite(stock) || stock < 0)) {
    return { error: "Stock must be a non-negative number." };
  }
  if (reorder != null && (!Number.isFinite(reorder) || reorder < 0)) {
    return { error: "Reorder threshold must be a non-negative number." };
  }
  return {
    sku,
    name,
    stock,
    reorder,
    location: String(data.location ?? "").trim() || undefined,
  };
}

export async function createPart(input: {
  sku: string;
  name: string;
  stock?: number;
  reorder?: number;
  location?: string;
}) {
  const { createStoredPart } = await import("@/lib/mutations/sprint17-store");
  const part = createStoredPart(input);
  return { ...part, lowStock: part.stock <= part.reorder };
}

export async function adjustPartsStock(id: string, delta: number) {
  const { adjustPartStock } = await import("@/lib/maintenance/parts-store");
  return adjustPartStock(id, delta);
}
