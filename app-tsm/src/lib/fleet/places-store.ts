import { logActivity } from "@/lib/dev-store";

export type StoredPlace = {
  id: string;
  name: string;
  type: string;
  city: string;
  geofence: string;
};

const g = globalThis as typeof globalThis & {
  __tsmDevPlaces?: StoredPlace[];
};

function getStore(): StoredPlace[] {
  if (!g.__tsmDevPlaces) g.__tsmDevPlaces = [];
  return g.__tsmDevPlaces;
}

export function listStoredPlaces(): StoredPlace[] {
  return [...getStore()];
}

export function createStoredPlace(input: {
  name: string;
  type: string;
  city: string;
  geofence?: string;
}): StoredPlace {
  const place: StoredPlace = {
    id: `pl-${Date.now().toString(36)}`,
    name: input.name.trim(),
    type: input.type.trim(),
    city: input.city.trim(),
    geofence: input.geofence?.trim() || "250m",
  };
  getStore().unshift(place);
  logActivity({
    shipmentId: "",
    type: "place.created",
    message: `${place.name} · ${place.city}`,
    timestamp: new Date().toISOString(),
  });
  return place;
}
