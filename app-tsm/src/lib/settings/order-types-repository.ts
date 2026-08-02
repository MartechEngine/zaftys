import { demoOrderTypes } from "@/lib/demo-data";
import { demoSeed } from "@/lib/data/demo-mode";
import { fetchAllShipmentsRaw } from "@/lib/data/shipment-repository";
import {
  createStoredOrderField,
  createStoredOrderType,
  listStoredOrderFields,
  listStoredOrderTypes,
  renameStoredOrderType,
  type StoredOrderField,
} from "@/lib/settings/order-types-store";
import { getOrderTypeNamePatch, patchOrderTypeName } from "@/lib/mutations/sprint12-store";
import {
  getOrderFieldPatch,
  isOrderFieldDeleted,
  markOrderFieldDeleted,
  patchOrderField,
} from "@/lib/mutations/sprint13-store";
import {
  deleteStoredOrderField,
  patchStoredOrderField,
} from "@/lib/settings/order-types-store";
import {
  ensureSettingsHydrated,
  persistOrderField,
  persistOrderType,
} from "@/lib/db/domain-persistence";

export type OrderTypeRecord = {
  id: string;
  name: string;
  statuses: number;
  fields: number;
  default: boolean;
  activeShipments: number;
};

const STATUS_FLOWS: Record<string, string> = {
  ot1: "pending → dispatched → at_plant → in_transit → at_weighbridge → delivered",
  ot2: "pending → at_plant → in_transit → at_weighbridge → delivered",
  ot3: "pending → review → accepted → dispatched → in_transit → delivered",
};

const FLOW_STEPS: Record<string, string[]> = {
  ot1: ["pending", "dispatched", "at_plant", "in_transit", "at_weighbridge", "delivered"],
  ot2: ["pending", "at_plant", "in_transit", "at_weighbridge", "delivered"],
  ot3: ["pending", "review", "accepted", "dispatched", "in_transit", "delivered"],
};

export type OrderTypeField = {
  id: string;
  name: string;
  type: "text" | "number" | "file" | "signature" | "currency" | "percent";
  required: boolean;
};

const ORDER_TYPE_FIELDS: Record<string, OrderTypeField[]> = {
  ot1: [
    { id: "f1", name: "LR number", type: "text", required: true },
    { id: "f2", name: "Tonnage (MT)", type: "number", required: true },
    { id: "f3", name: "e-way bill", type: "text", required: false },
    { id: "f4", name: "Weighbridge slip", type: "file", required: false },
    { id: "f5", name: "Receiver signature", type: "signature", required: false },
  ],
  ot2: [
    { id: "f1", name: "LR number", type: "text", required: true },
    { id: "f2", name: "Tonnage (MT)", type: "number", required: true },
    { id: "f3", name: "Weighbridge slip", type: "file", required: true },
    { id: "f4", name: "Plant gate pass", type: "text", required: false },
    { id: "f5", name: "Moisture reading", type: "number", required: false },
  ],
  ot3: [
    { id: "f1", name: "TranZfort booking ID", type: "text", required: true },
    { id: "f2", name: "Partner rate", type: "currency", required: false },
    { id: "f3", name: "Overflow markup", type: "percent", required: false },
    { id: "f4", name: "Partner POD", type: "file", required: false },
  ],
};

const CUSTOM_FIELDS: Record<string, string[]> = {
  ot1: ["LR number · text · required", "Tonnage (MT) · number · required", "e-way bill · text · optional"],
  ot2: [
    "LR number · text · required",
    "Tonnage (MT) · number · required",
    "Weighbridge slip · file · required",
    "Plant gate pass · text · optional",
  ],
  ot3: [
    "TranZfort booking ID · text · required",
    "Partner rate · currency · optional",
    "Overflow markup · percent · optional",
  ],
};

function matchesOrderType(
  ot: (typeof demoOrderTypes)[number],
  shipment: { originType: string; commodity: string },
) {
  if (ot.id === "ot3") return shipment.originType === "network";
  if (ot.id === "ot2") return shipment.commodity.toLowerCase().includes("cement");
  return shipment.originType === "fleet";
}

export async function listOrderTypes(): Promise<OrderTypeRecord[]> {
  await ensureSettingsHydrated();
  const shipments = await fetchAllShipmentsRaw();

  const demo = demoSeed(demoOrderTypes).map((ot) => {
    const namePatch = getOrderTypeNamePatch(ot.id);
    return {
      ...ot,
      name: namePatch ?? ot.name,
      activeShipments: shipments.filter(
        (s) =>
          matchesOrderType(ot, s) &&
          !["delivered", "cancelled"].includes(s.status),
      ).length,
    };
  });

  const stored = listStoredOrderTypes().map((ot) => ({
    ...ot,
    activeShipments: 0,
  }));

  return [...stored, ...demo];
}

export async function renameOrderType(
  id: string,
  name: string,
): Promise<OrderTypeRecord | undefined> {
  await ensureSettingsHydrated();
  const existing = (await listOrderTypes()).find((ot) => ot.id === id);
  if (!existing) return undefined;

  const stored = renameStoredOrderType(id, name);
  if (stored) {
    await persistOrderType(stored);
    return { ...stored, activeShipments: existing.activeShipments };
  }

  patchOrderTypeName(id, name);
  const merged = { ...existing, name: name.trim() };
  await persistOrderType({
    id: merged.id,
    name: merged.name,
    statuses: merged.statuses,
    fields: merged.fields,
    default: merged.default,
  });
  return merged;
}

export function validateCreateOrderTypeInput(
  body: unknown,
): { name: string } | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const name = String((body as Record<string, unknown>).name ?? "").trim();
  if (!name) return { error: "Order type name is required." };
  return { name };
}

export async function createOrderType(name: string): Promise<OrderTypeRecord> {
  await ensureSettingsHydrated();
  const ot = createStoredOrderType(name);
  await persistOrderType(ot);
  return { ...ot, activeShipments: 0 };
}

export function validateCreateOrderFieldInput(
  body: unknown,
): { name: string; type: StoredOrderField["type"]; required?: boolean } | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const name = String(data.name ?? "").trim();
  const type = String(data.type ?? "text").trim() as StoredOrderField["type"];
  const allowed = ["text", "number", "file", "signature", "currency", "percent"];
  if (!name) return { error: "Field name is required." };
  if (!allowed.includes(type)) return { error: "Invalid field type." };
  return { name, type, required: Boolean(data.required) };
}

export async function createOrderTypeField(
  orderTypeId: string,
  input: { name: string; type: StoredOrderField["type"]; required?: boolean },
) {
  await ensureSettingsHydrated();
  const orderType = (await listOrderTypes()).find((ot) => ot.id === orderTypeId);
  if (!orderType) return undefined;
  const field = createStoredOrderField({ orderTypeId, ...input });
  await persistOrderField(field);
  return { orderType, field };
}

export async function getOrderType(id: string) {
  const orderType = (await listOrderTypes()).find((ot) => ot.id === id);
  if (!orderType) return undefined;

  const shipments = await fetchAllShipmentsRaw();
  const recentShipments = shipments
    .filter((s) => matchesOrderType(orderType, s))
    .slice(0, 5);

  return {
    orderType,
    statusFlow: STATUS_FLOWS[id] ?? STATUS_FLOWS.ot1,
    customFields: CUSTOM_FIELDS[id] ?? CUSTOM_FIELDS.ot1,
    recentShipments,
  };
}

export async function getOrderTypeFields(id: string) {
  const orderType = (await listOrderTypes()).find((ot) => ot.id === id);
  if (!orderType) return undefined;
  const stored = listStoredOrderFields(id).map((f) => ({
    id: f.id,
    name: f.name,
    type: f.type,
    required: f.required,
  }));
  const base = ORDER_TYPE_FIELDS[id] ?? (stored.length ? [] : ORDER_TYPE_FIELDS.ot1);
  return {
    orderType,
    fields: [...stored, ...base]
      .filter((f) => !isOrderFieldDeleted(f.id))
      .map((f) => {
        const patch = getOrderFieldPatch(f.id);
        return patch ? { ...f, ...patch } : f;
      }),
  };
}

export async function getOrderTypeFlow(id: string) {
  const orderType = (await listOrderTypes()).find((ot) => ot.id === id);
  if (!orderType) return undefined;
  const { getOrderTypeFlowOverride } = await import("@/lib/mutations/sprint11-store");
  const override = getOrderTypeFlowOverride(id);
  const steps = override ?? FLOW_STEPS[id] ?? FLOW_STEPS.ot1;
  return {
    orderType,
    steps,
    statusFlow: steps.join(" → "),
    stepCount: steps.length,
  };
}

export async function updateOrderTypeFlow(id: string, steps: string[]) {
  const orderType = (await listOrderTypes()).find((ot) => ot.id === id);
  if (!orderType) return undefined;
  const cleaned = steps.map((s) => s.trim()).filter(Boolean);
  if (cleaned.length < 2) return { error: "Flow needs at least 2 steps." as const };
  const { setOrderTypeFlowOverride } = await import("@/lib/mutations/sprint11-store");
  setOrderTypeFlowOverride(id, cleaned);
  return getOrderTypeFlow(id);
}

export async function updateOrderTypeField(
  orderTypeId: string,
  fieldId: string,
  input: { required?: boolean },
) {
  await ensureSettingsHydrated();
  const result = await getOrderTypeFields(orderTypeId);
  if (!result) return undefined;
  const field = result.fields.find((f) => f.id === fieldId);
  if (!field) return undefined;

  const stored = patchStoredOrderField(fieldId, input);
  if (stored) {
    await persistOrderField(stored);
    return stored;
  }

  patchOrderField(fieldId, input);
  const merged = { ...field, ...input, orderTypeId };
  await persistOrderField({
    id: merged.id,
    orderTypeId,
    name: merged.name,
    type: merged.type,
    required: merged.required,
  });
  return { ...field, ...input };
}

export async function deleteOrderTypeField(orderTypeId: string, fieldId: string) {
  if (isOrderFieldDeleted(fieldId)) return true;
  const result = await getOrderTypeFields(orderTypeId);
  if (!result) return false;
  if (!result.fields.some((f) => f.id === fieldId)) return false;

  deleteStoredOrderField(fieldId);
  markOrderFieldDeleted(fieldId);
  return true;
}
