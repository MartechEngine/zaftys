import { logActivity } from "@/lib/dev-store";
import { demoWorkOrders } from "@/lib/demo-data";
import { demoSeed } from "@/lib/data/demo-mode";

export type WorkOrderStatus = "open" | "in_progress" | "resolved";

export type StoredWorkOrder = {
  id: string;
  vehicle: string;
  title: string;
  status: WorkOrderStatus;
  due: string;
  cost: string;
  vendor: string;
  notes: string;
};

const g = globalThis as typeof globalThis & {
  __tsmDevWorkOrders?: StoredWorkOrder[];
  __tsmWorkOrderStatus?: Record<string, WorkOrderStatus>;
};

function getCreatedStore(): StoredWorkOrder[] {
  if (!g.__tsmDevWorkOrders) g.__tsmDevWorkOrders = [];
  return g.__tsmDevWorkOrders;
}

function getStatusOverrides(): Record<string, WorkOrderStatus> {
  if (!g.__tsmWorkOrderStatus) g.__tsmWorkOrderStatus = {};
  return g.__tsmWorkOrderStatus;
}

export function listStoredWorkOrders(): StoredWorkOrder[] {
  return [...getCreatedStore()];
}

export function replaceStoredWorkOrders(items: StoredWorkOrder[]) {
  g.__tsmDevWorkOrders = [...items];
}

export function getWorkOrderStatusOverride(id: string): WorkOrderStatus | undefined {
  return getStatusOverrides()[id];
}

export function getWorkOrderStatusOverridesSnapshot() {
  return { ...getStatusOverrides() };
}

export function replaceWorkOrderStatusOverrides(
  next: Record<string, WorkOrderStatus>,
) {
  g.__tsmWorkOrderStatus = { ...next };
}

export function createStoredWorkOrder(input: {
  vehicle: string;
  title: string;
  vendor: string;
  due?: string;
  cost?: string;
  notes?: string;
}): StoredWorkOrder {
  const due =
    input.due?.trim() ||
    new Date(Date.now() + 5 * 86400000).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const wo: StoredWorkOrder = {
    id: `wo-${Date.now().toString(36)}`,
    vehicle: input.vehicle.trim(),
    title: input.title.trim(),
    status: "open",
    due,
    cost: input.cost?.trim() || "₹0",
    vendor: input.vendor.trim(),
    notes: input.notes?.trim() || "",
  };
  getCreatedStore().unshift(wo);
  logActivity({
    shipmentId: "",
    type: "work_order.created",
    message: `${wo.title} · ${wo.vehicle}`,
    timestamp: new Date().toISOString(),
  });
  return wo;
}

export function setWorkOrderStatus(
  id: string,
  status: WorkOrderStatus,
): StoredWorkOrder | undefined {
  const created = getCreatedStore().find((w) => w.id === id);
  if (created) {
    created.status = status;
    logActivity({
      shipmentId: "",
      type: "work_order.updated",
      message: `${created.title} → ${status}`,
      timestamp: new Date().toISOString(),
    });
    return created;
  }

  const demo = demoSeed(demoWorkOrders).find((w) => w.id === id);
  if (!demo) return undefined;

  getStatusOverrides()[id] = status;
  logActivity({
    shipmentId: "",
    type: "work_order.updated",
    message: `${demo.title} → ${status}`,
    timestamp: new Date().toISOString(),
  });
  return { ...demo, status };
}
