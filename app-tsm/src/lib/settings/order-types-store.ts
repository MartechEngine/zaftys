import { logActivity } from "@/lib/dev-store";

export type StoredOrderType = {
  id: string;
  name: string;
  statuses: number;
  fields: number;
  default: boolean;
};

export type StoredOrderField = {
  id: string;
  orderTypeId: string;
  name: string;
  type: "text" | "number" | "file" | "signature" | "currency" | "percent";
  required: boolean;
};

const g = globalThis as typeof globalThis & {
  __tsmOrderTypes?: StoredOrderType[];
  __tsmOrderFields?: StoredOrderField[];
};

function types(): StoredOrderType[] {
  if (!g.__tsmOrderTypes) g.__tsmOrderTypes = [];
  return g.__tsmOrderTypes;
}

function fields(): StoredOrderField[] {
  if (!g.__tsmOrderFields) g.__tsmOrderFields = [];
  return g.__tsmOrderFields;
}

export function listStoredOrderTypes(): StoredOrderType[] {
  return [...types()];
}

export function createStoredOrderType(name: string): StoredOrderType {
  const ot: StoredOrderType = {
    id: `ot-${Date.now().toString(36)}`,
    name: name.trim(),
    statuses: 6,
    fields: 0,
    default: false,
  };
  types().unshift(ot);
  logActivity({
    shipmentId: "",
    type: "order_type.created",
    message: `Order type ${ot.name}`,
    timestamp: new Date().toISOString(),
  });
  return ot;
}

export function listStoredOrderFields(orderTypeId: string): StoredOrderField[] {
  return fields().filter((f) => f.orderTypeId === orderTypeId);
}

export function createStoredOrderField(input: {
  orderTypeId: string;
  name: string;
  type: StoredOrderField["type"];
  required?: boolean;
}): StoredOrderField {
  const field: StoredOrderField = {
    id: `f-${Date.now().toString(36)}`,
    orderTypeId: input.orderTypeId,
    name: input.name.trim(),
    type: input.type,
    required: Boolean(input.required),
  };
  fields().unshift(field);
  const ot = types().find((t) => t.id === input.orderTypeId);
  if (ot) ot.fields += 1;
  logActivity({
    shipmentId: "",
    type: "order_field.created",
    message: `${field.name} on ${input.orderTypeId}`,
    timestamp: new Date().toISOString(),
  });
  return field;
}
