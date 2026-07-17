import { demoEquipment } from "@/lib/demo-data";
import { listPlaces } from "@/lib/fleet/places-repository";
import {
  createStoredEquipment,
  listStoredEquipment,
  patchStoredEquipment,
  type EquipmentRecord,
  type EquipmentStatus,
} from "@/lib/fleet/equipment-store";
import { getEquipmentPatch, patchEquipmentFields } from "@/lib/mutations/sprint11-store";

export type { EquipmentRecord, EquipmentStatus };

export type CreateEquipmentInput = {
  name: string;
  type: string;
  location: string;
  status?: EquipmentStatus;
};

export function validateCreateEquipmentInput(
  body: unknown,
): CreateEquipmentInput | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const name = String(data.name ?? "").trim();
  const type = String(data.type ?? "").trim() || "Loader";
  const location = String(data.location ?? "").trim();
  const statusRaw = String(data.status ?? "active");
  const status = (["active", "stored", "maintenance"].includes(statusRaw)
    ? statusRaw
    : "active") as EquipmentStatus;

  if (!name) return { error: "Equipment name is required." };
  if (!location) return { error: "Location is required." };

  return { name, type, location, status };
}

export async function listEquipment(): Promise<EquipmentRecord[]> {
  const places = await listPlaces();
  const fromPlaces: EquipmentRecord[] = places
    .filter((p) => /plant|depot/i.test(p.type))
    .slice(0, 2)
    .map((p, index) => ({
      id: `eq-place-${p.id}`,
      name: index === 0 ? "Portable weighbridge WB-P2" : "Yard loader FL-03",
      type: index === 0 ? "Weighbridge" : "Loader",
      location: p.name,
      status: "active" as const,
      placeId: p.id,
    }));

  const merged = [...listStoredEquipment(), ...demoEquipment, ...fromPlaces].map((item) => {
    const patch = getEquipmentPatch(item.id);
    return patch ? { ...item, ...patch } : item;
  });
  const seen = new Set<string>();
  return merged.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

export async function createEquipment(input: CreateEquipmentInput): Promise<EquipmentRecord> {
  const places = await listPlaces();
  const place = places.find((p) => p.name === input.location);
  return createStoredEquipment({
    ...input,
    placeId: place?.id,
  });
}

export async function updateEquipment(
  id: string,
  input: { location?: string; status?: EquipmentStatus },
): Promise<EquipmentRecord | undefined> {
  const existing = (await listEquipment()).find((e) => e.id === id);
  if (!existing) return undefined;
  const stored = patchStoredEquipment(id, input);
  if (stored) return stored;
  patchEquipmentFields(id, input);
  return { ...existing, ...input };
}
