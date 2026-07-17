import { demoGeofences } from "@/lib/demo-data";
import { listPlaces } from "@/lib/fleet/places-repository";
import {
  createStoredGeofence,
  listStoredGeofences,
  patchStoredGeofence,
} from "@/lib/settings/geofences-store";
import { getGeofencePatch, patchGeofenceFields } from "@/lib/mutations/sprint11-store";

export type GeofenceRecord = {
  id: string;
  name: string;
  radius: string;
  triggers: string;
  linkedPlaces: number;
  placeId?: string;
};

export type CreateGeofenceInput = {
  name: string;
  radius: string;
  triggers: string;
  placeId?: string;
};

export function validateCreateGeofenceInput(
  body: unknown,
): CreateGeofenceInput | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const name = String(data.name ?? "").trim();
  const radius = String(data.radius ?? "").trim() || "250m";
  const triggers = String(data.triggers ?? "").trim() || "at_plant on enter";
  const placeId = String(data.placeId ?? "").trim() || undefined;

  if (!name) return { error: "Geofence name is required." };

  return { name, radius, triggers, placeId };
}

export async function listGeofences(): Promise<GeofenceRecord[]> {
  const places = await listPlaces();

  const fromPlaces: GeofenceRecord[] = places
    .filter((p) => p.geofence)
    .map((p) => ({
      id: `gf-place-${p.id}`,
      name: p.name,
      radius: p.geofence,
      triggers: /weighbridge/i.test(p.type) ? "at_weighbridge on enter" : "at_plant on enter",
      linkedPlaces: 1,
      placeId: p.id,
    }));

  const seen = new Set<string>();
  return [...listStoredGeofences(), ...demoGeofences, ...fromPlaces]
    .map((row) => {
      const patch = getGeofencePatch(row.id);
      return patch ? { ...row, ...patch } : row;
    })
    .filter((g) => {
      if (seen.has(g.name)) return false;
      seen.add(g.name);
      return true;
    });
}

export async function createGeofence(input: CreateGeofenceInput): Promise<GeofenceRecord> {
  return createStoredGeofence(input);
}

export async function updateGeofence(
  id: string,
  input: Partial<Pick<GeofenceRecord, "name" | "radius" | "triggers">>,
): Promise<GeofenceRecord | undefined> {
  const existing = (await listGeofences()).find((g) => g.id === id);
  if (!existing) return undefined;
  const stored = patchStoredGeofence(id, input);
  if (stored) return stored;
  patchGeofenceFields(id, input);
  return { ...existing, ...input };
}
