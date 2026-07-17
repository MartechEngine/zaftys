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
