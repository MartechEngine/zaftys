import { logActivity } from "@/lib/dev-store";

export type EquipmentStatus = "active" | "stored" | "maintenance";

export type EquipmentRecord = {
  id: string;
  name: string;
  type: string;
  location: string;
  status: EquipmentStatus;
  placeId?: string;
};

const g = globalThis as typeof globalThis & {
  __tsmDevEquipment?: EquipmentRecord[];
};

function getStore(): EquipmentRecord[] {
  if (!g.__tsmDevEquipment) g.__tsmDevEquipment = [];
  return g.__tsmDevEquipment;
}

export function listStoredEquipment(): EquipmentRecord[] {
  return [...getStore()];
}

export function replaceStoredEquipment(items: EquipmentRecord[]) {
  g.__tsmDevEquipment = [...items];
}

export function createStoredEquipment(input: {
  name: string;
  type: string;
  location: string;
  status?: EquipmentStatus;
  placeId?: string;
}): EquipmentRecord {
  const item: EquipmentRecord = {
    id: `eq-${Date.now().toString(36)}`,
    name: input.name.trim(),
    type: input.type.trim(),
    location: input.location.trim(),
    status: input.status ?? "active",
    placeId: input.placeId,
  };
  getStore().unshift(item);
  logActivity({
    shipmentId: "",
    type: "equipment.created",
    message: `${item.name} · ${item.type}`,
    timestamp: new Date().toISOString(),
  });
  return item;
}

export function patchStoredEquipment(
  id: string,
  patch: Partial<Pick<EquipmentRecord, "location" | "status">>,
): EquipmentRecord | null {
  const item = getStore().find((e) => e.id === id);
  if (!item) return null;
  if (patch.location !== undefined) item.location = patch.location.trim();
  if (patch.status !== undefined) item.status = patch.status;
  logActivity({
    shipmentId: "",
    type: "equipment.updated",
    message: item.name,
    timestamp: new Date().toISOString(),
  });
  return item;
}
