import { demoGeofences } from "@/lib/demo-data";
import { demoSeed } from "@/lib/data/demo-mode";
import { listPlaces } from "@/lib/fleet/places-repository";
import {
  createStoredGeofence,
  listStoredGeofences,
  patchStoredGeofence,
} from "@/lib/settings/geofences-store";
import { getGeofencePatch, patchGeofenceFields } from "@/lib/mutations/sprint11-store";
import { isGeofenceDeleted, markGeofenceDeleted } from "@/lib/mutations/sprint15-store";
import { ensureSettingsHydrated, persistGeofence } from "@/lib/db/domain-persistence";

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
  await ensureSettingsHydrated();
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
  return [...listStoredGeofences(), ...demoSeed(demoGeofences), ...fromPlaces]
    .map((row) => {
      const patch = getGeofencePatch(row.id);
      return patch ? { ...row, ...patch } : row;
    })
    .filter((g) => !isGeofenceDeleted(g.id))
    .filter((g) => {
      if (seen.has(g.name)) return false;
      seen.add(g.name);
      return true;
    });
}

export async function createGeofence(input: CreateGeofenceInput): Promise<GeofenceRecord> {
  await ensureSettingsHydrated();
  const geofence = createStoredGeofence(input);
  await persistGeofence(geofence);
  return geofence;
}

export async function updateGeofence(
  id: string,
  input: Partial<Pick<GeofenceRecord, "name" | "radius" | "triggers">>,
): Promise<GeofenceRecord | undefined> {
  await ensureSettingsHydrated();
  const existing = (await listGeofences()).find((g) => g.id === id);
  if (!existing) return undefined;
  const stored = patchStoredGeofence(id, input);
  if (stored) {
    await persistGeofence(stored);
    return stored;
  }
  patchGeofenceFields(id, input);
  const merged = { ...existing, ...input };
  await persistGeofence({
    id: merged.id,
    name: merged.name,
    radius: merged.radius,
    triggers: merged.triggers,
    linkedPlaces: merged.linkedPlaces,
    placeId: merged.placeId,
  });
  return merged;
}

export async function deleteGeofence(id: string): Promise<boolean> {
  const all = await listGeofences();
  const existing = all.find((g) => g.id === id);
  if (!existing) return false;

  const { deleteStoredGeofence } = await import("@/lib/settings/geofences-store");
  deleteStoredGeofence(id);
  markGeofenceDeleted(id);
  return true;
}
