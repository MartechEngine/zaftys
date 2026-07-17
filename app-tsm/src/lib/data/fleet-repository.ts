import type { Driver, ShipmentRecord, Vehicle } from "@/lib/dev-store";
import {
  fetchAllShipmentsRaw,
  getActiveDataSource,
  listDrivers,
  listVehicles,
} from "@/lib/data/shipment-repository";
import { getFleetbaseClient } from "@/lib/fleetbase/client";
import { mapFleetbaseDriver, mapFleetbaseVehicle } from "@/lib/fleetbase/mapper";

export type DriverDetail = Driver & {
  recentShipments: ShipmentRecord[];
};

export type VehicleDetail = Vehicle & {
  recentShipments: ShipmentRecord[];
};

function recentForDriver(shipments: ShipmentRecord[], driver: Driver, limit = 8) {
  return shipments
    .filter((s) => s.driverId === driver.id || s.driver === driver.name)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, limit);
}

function recentForVehicle(shipments: ShipmentRecord[], vehicle: Vehicle, limit = 8) {
  return shipments
    .filter(
      (s) =>
        s.vehicleId === vehicle.id ||
        s.vehicle === vehicle.registration,
    )
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, limit);
}

export async function getDriver(id: string): Promise<DriverDetail | null> {
  if (getActiveDataSource() === "fleetbase") {
    try {
      const raw = await getFleetbaseClient().getDriver(id);
      const driver = mapFleetbaseDriver(raw as Record<string, unknown>);
      const shipments = await fetchAllShipmentsRaw();
      return { ...driver, recentShipments: recentForDriver(shipments, driver) };
    } catch (e) {
      console.warn("[driver] Fleetbase getDriver fallback to list:", e);
    }
  }

  const driver = (await listDrivers()).find((d) => d.id === id);
  if (!driver) return null;

  const shipments = await fetchAllShipmentsRaw();
  return { ...driver, recentShipments: recentForDriver(shipments, driver) };
}

export async function getVehicle(id: string): Promise<VehicleDetail | null> {
  if (getActiveDataSource() === "fleetbase") {
    try {
      const raw = await getFleetbaseClient().getVehicle(id);
      const vehicle = mapFleetbaseVehicle(raw as Record<string, unknown>);
      const shipments = await fetchAllShipmentsRaw();
      return { ...vehicle, recentShipments: recentForVehicle(shipments, vehicle) };
    } catch (e) {
      console.warn("[vehicle] Fleetbase getVehicle fallback to list:", e);
    }
  }

  const vehicle = (await listVehicles()).find((v) => v.id === id);
  if (!vehicle) return null;

  const shipments = await fetchAllShipmentsRaw();
  return { ...vehicle, recentShipments: recentForVehicle(shipments, vehicle) };
}
