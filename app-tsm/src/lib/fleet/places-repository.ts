import { demoFleetGroups, demoPlaces } from "@/lib/demo-data";
import { fetchAllShipmentsRaw, listDrivers, listVehicles } from "@/lib/data/shipment-repository";
import { createStoredPlace, listStoredPlaces } from "@/lib/fleet/places-store";

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

  const enrich = (p: { id: string; name: string; type: string; city: string; geofence: string }) => ({
    ...p,
    activeShipments: shipments.filter(
      (s) => cityMatches(p.city, s.origin) || cityMatches(p.city, s.destination),
    ).length,
  });

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
    return {
      ...g,
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

export async function getFleetGroup(id: string) {
  const group = (await listFleetGroups()).find((g) => g.id === id);
  if (!group) return undefined;

  const [drivers, vehicles] = await Promise.all([listDrivers(), listVehicles()]);
  const members: FleetGroupMember[] = drivers.slice(0, group.drivers).map((d, i) => ({
    driver: d.name,
    vehicle: d.vehicle ?? vehicles[i]?.registration ?? "Unassigned",
  }));

  return { group, members };
}
