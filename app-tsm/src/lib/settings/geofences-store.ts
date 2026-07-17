import { logActivity } from "@/lib/dev-store";

export type StoredGeofence = {
  id: string;
  name: string;
  radius: string;
  triggers: string;
  linkedPlaces: number;
  placeId?: string;
};

const g = globalThis as typeof globalThis & {
  __tsmDevGeofences?: StoredGeofence[];
};

function getStore(): StoredGeofence[] {
  if (!g.__tsmDevGeofences) g.__tsmDevGeofences = [];
  return g.__tsmDevGeofences;
}

export function listStoredGeofences(): StoredGeofence[] {
  return [...getStore()];
}

export function createStoredGeofence(input: {
  name: string;
  radius: string;
  triggers: string;
  placeId?: string;
}): StoredGeofence {
  const geofence: StoredGeofence = {
    id: `gf-${Date.now().toString(36)}`,
    name: input.name.trim(),
    radius: input.radius.trim(),
    triggers: input.triggers.trim(),
    linkedPlaces: input.placeId ? 1 : 0,
    placeId: input.placeId,
  };
  getStore().unshift(geofence);
  logActivity({
    shipmentId: "",
    type: "geofence.created",
    message: `${geofence.name} · ${geofence.radius}`,
    timestamp: new Date().toISOString(),
  });
  return geofence;
}

export function patchStoredGeofence(
  id: string,
  patch: Partial<Pick<StoredGeofence, "name" | "radius" | "triggers">>,
): StoredGeofence | null {
  const row = getStore().find((g) => g.id === id);
  if (!row) return null;
  if (patch.name !== undefined) row.name = patch.name.trim();
  if (patch.radius !== undefined) row.radius = patch.radius.trim();
  if (patch.triggers !== undefined) row.triggers = patch.triggers.trim();
  logActivity({
    shipmentId: "",
    type: "geofence.updated",
    message: row.name,
    timestamp: new Date().toISOString(),
  });
  return row;
}
