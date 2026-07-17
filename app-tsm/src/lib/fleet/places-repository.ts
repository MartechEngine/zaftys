import { demoFleetGroups, demoPlaces } from "@/lib/demo-data";
import { fetchAllShipmentsRaw, listDrivers, listVehicles } from "@/lib/data/shipment-repository";
import {
  createStoredPlace,
  listStoredPlaces,
  patchStoredPlace,
} from "@/lib/fleet/places-store";
import { getPlacePatch, patchPlaceFields } from "@/lib/mutations/sprint11-store";
import { getFleetGroupPatch, patchFleetGroupFields } from "@/lib/mutations/sprint12-store";
import { addFleetGroupMember, listFleetGroupMembers } from "@/lib/mutations/sprint15-store";
import {
  listRemovedFleetGroupMembers,
  removeFleetGroupMember,
} from "@/lib/mutations/sprint16-store";

export type PlaceRecord = {
  id: string;
  name: string;
  type: string;
  city: string;
  geofence: string;
  activeShipments: number;
};

export type CreatePlaceInput = {
  name: string;
  type: string;
  city: string;
  geofence?: string;
};

export type FleetGroupRecord = {
  id: string;
  name: string;
  drivers: number;
  vehicles: number;
  zone: string;
};

export type FleetGroupMember = {
  driver: string;
  vehicle: string;
};

function cityMatches(placeCity: string, location: string) {
  const city = placeCity.toLowerCase();
  const loc = location.toLowerCase();
  return loc.includes(city) || city.includes(loc.split(" ")[0]);
}

export function validateCreatePlaceInput(body: unknown): CreatePlaceInput | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const name = String(data.name ?? "").trim();
  const type = String(data.type ?? "").trim() || "Depot";
  const city = String(data.city ?? "").trim();
  const geofence = String(data.geofence ?? "").trim();

  if (!name) return { error: "Place name is required." };
  if (!city) return { error: "City is required." };

  return { name, type, city, geofence: geofence || undefined };
}

export async function listPlaces(q?: string): Promise<PlaceRecord[]> {
  const shipments = await fetchAllShipmentsRaw();

  const enrich = (p: {
    id: string;
    name: string;
    type: string;
    city: string;
    geofence: string;
  }) => {
    const patch = getPlacePatch(p.id);
    const merged = { ...p, ...patch };
    return {
      ...merged,
      activeShipments: shipments.filter(
        (s) => cityMatches(merged.city, s.origin) || cityMatches(merged.city, s.destination),
      ).length,
    };
  };

  let places: PlaceRecord[] = [
    ...listStoredPlaces().map(enrich),
    ...demoPlaces.map(enrich),
  ];

  if (q?.trim()) {
    const needle = q.trim().toLowerCase();
    places = places.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        p.city.toLowerCase().includes(needle) ||
        p.type.toLowerCase().includes(needle),
    );
  }

  return places;
}

export async function createPlace(input: CreatePlaceInput): Promise<PlaceRecord> {
  const place = createStoredPlace(input);
  return { ...place, activeShipments: 0 };
}

export async function updatePlace(
  id: string,
  input: Partial<CreatePlaceInput>,
): Promise<PlaceRecord | undefined> {
  const existing = (await listPlaces()).find((p) => p.id === id);
  if (!existing) return undefined;

  const stored = patchStoredPlace(id, input);
  if (stored) return { ...stored, activeShipments: existing.activeShipments };

  patchPlaceFields(id, input);
  return { ...existing, ...input };
}

export async function getPlace(id: string) {
  const place = (await listPlaces()).find((p) => p.id === id);
  if (!place) return undefined;

  const shipments = await fetchAllShipmentsRaw();
  const relatedShipments = shipments
    .filter(
      (s) => cityMatches(place.city, s.origin) || cityMatches(place.city, s.destination),
    )
    .slice(0, 5);

  return { place, relatedShipments };
}

export async function listFleetGroups(): Promise<FleetGroupRecord[]> {
  const { listStoredFleetGroups } = await import("@/lib/mutations/entity-stores");
  const [drivers, vehicles] = await Promise.all([listDrivers(), listVehicles()]);

  const demo = demoFleetGroups.map((g, index) => {
    const driverSlice = Math.max(1, Math.floor(drivers.length / demoFleetGroups.length));
    const vehicleSlice = Math.max(1, Math.floor(vehicles.length / demoFleetGroups.length));
    const patch = getFleetGroupPatch(g.id);
    return {
      ...g,
      ...patch,
      drivers: Math.min(g.drivers, driverSlice + (index === 0 ? 1 : 0)),
      vehicles: Math.min(g.vehicles, vehicleSlice + (index === 0 ? 1 : 0)),
    };
  });

  return [...listStoredFleetGroups(), ...demo];
}

export function validateCreateFleetGroupInput(
  body: unknown,
): { name: string; zone?: string } | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const name = String(data.name ?? "").trim();
  if (!name) return { error: "Group name is required." };
  return { name, zone: String(data.zone ?? "").trim() || undefined };
}

export async function createFleetGroup(input: { name: string; zone?: string }) {
  const { createStoredFleetGroup } = await import("@/lib/mutations/entity-stores");
  return createStoredFleetGroup(input);
}

export async function updateFleetGroup(
  id: string,
  input: { name?: string; zone?: string },
): Promise<FleetGroupRecord | undefined> {
  const existing = (await listFleetGroups()).find((g) => g.id === id);
  if (!existing) return undefined;

  const { patchStoredFleetGroup } = await import("@/lib/mutations/entity-stores");
  const stored = patchStoredFleetGroup(id, input);
  if (stored) return stored;

  patchFleetGroupFields(id, input);
  return { ...existing, ...input };
}

export async function getFleetGroup(id: string) {
  const group = (await listFleetGroups()).find((g) => g.id === id);
  if (!group) return undefined;

  const [drivers, vehicles] = await Promise.all([listDrivers(), listVehicles()]);
  const storedMembers = listFleetGroupMembers(id);
  const removed = listRemovedFleetGroupMembers(id);
  const derivedMembers: FleetGroupMember[] = drivers.slice(0, group.drivers).map((d, i) => ({
    driver: d.name,
    vehicle: d.vehicle ?? vehicles[i]?.registration ?? "Unassigned",
  }));
  const baseMembers = storedMembers.length > 0 ? [...derivedMembers, ...storedMembers] : derivedMembers;
  const members = baseMembers.filter(
    (m) =>
      !removed.some((r) => r.driver === m.driver && r.vehicle === m.vehicle),
  );

  return { group, members };
}

export async function addFleetGroupMemberRecord(
  groupId: string,
  input: { driver: string; vehicle: string },
) {
  const group = (await listFleetGroups()).find((g) => g.id === groupId);
  if (!group) return undefined;
  addFleetGroupMember(groupId, input);
  return getFleetGroup(groupId);
}

export async function removeFleetGroupMemberRecord(
  groupId: string,
  input: { driver: string; vehicle: string },
) {
  const group = (await listFleetGroups()).find((g) => g.id === groupId);
  if (!group) return undefined;
  removeFleetGroupMember(groupId, input);
  return getFleetGroup(groupId);
}
