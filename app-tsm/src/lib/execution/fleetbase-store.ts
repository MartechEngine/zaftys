/**
 * Fleetbase-backed ExecutionStore (transitional — ADR-008 Phase A/B).
 * Only this module may import @/lib/fleetbase/* for LOS operations.
 */

import { getFleetbaseClient } from "@/lib/fleetbase/client";
import {
  buildFleetbaseCreatePayload,
  mapFleetbaseDriver,
  mapFleetbaseOrder,
  mapFleetbaseVehicle,
  toFleetbaseStatus,
} from "@/lib/fleetbase/mapper";
import type { CreateShipmentInput } from "@/lib/shipments/create-shipment";
import type { ShipmentStatus } from "@/lib/constants";
import type { Driver, ShipmentRecord, Vehicle } from "@/lib/dev-store";
import type { ExecutionPosition, ExecutionStore } from "@/lib/execution/types";
import { ExecutionError } from "@/lib/execution/types";

function wrap(err: unknown, context: string): never {
  const msg = err instanceof Error ? err.message : String(err);
  throw new ExecutionError(`Fleetbase unavailable (${context}): ${msg}`, 502);
}

export class FleetbaseExecutionStore implements ExecutionStore {
  readonly backend = "fleetbase" as const;

  private client() {
    return getFleetbaseClient();
  }

  async healthCheck(): Promise<boolean> {
    return this.client().healthCheck();
  }

  async listShipments(limit = 100): Promise<ShipmentRecord[]> {
    try {
      const orders = await this.client().listOrders(limit);
      return orders.map(mapFleetbaseOrder);
    } catch (e) {
      wrap(e, "listShipments");
    }
  }

  async getShipment(id: string): Promise<ShipmentRecord | null> {
    try {
      const order = await this.client().getOrder(id);
      return mapFleetbaseOrder(order);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (/404|not found/i.test(msg)) return null;
      wrap(e, "getShipment");
    }
  }

  async createShipment(input: CreateShipmentInput): Promise<ShipmentRecord> {
    try {
      const client = this.client();
      let order = await client.createOrder(buildFleetbaseCreatePayload(input));
      if (input.driverId && input.vehicleId) {
        try {
          order = await client.assignOrder(order.id, input.driverId, input.vehicleId);
        } catch (e) {
          console.warn(
            "[ExecutionStore] Fleetbase assign failed; order created unassigned:",
            e,
          );
        }
      }
      return mapFleetbaseOrder(order);
    } catch (e) {
      wrap(e, "createShipment");
    }
  }

  async assignShipment(
    id: string,
    driverId: string,
    vehicleId: string,
  ): Promise<ShipmentRecord> {
    try {
      const order = await this.client().assignOrder(id, driverId, vehicleId);
      return mapFleetbaseOrder(order);
    } catch (e) {
      wrap(e, "assignShipment");
    }
  }

  async updateShipmentStatus(
    id: string,
    status: ShipmentStatus,
  ): Promise<ShipmentRecord> {
    try {
      const order = await this.client().updateOrderStatus(
        id,
        toFleetbaseStatus(status),
      );
      return mapFleetbaseOrder(order);
    } catch (e) {
      wrap(e, "updateShipmentStatus");
    }
  }

  async updateShipmentPatch(
    id: string,
    patch: Record<string, unknown>,
  ): Promise<ShipmentRecord> {
    try {
      const order = await this.client().updateOrder(id, patch);
      return mapFleetbaseOrder(order);
    } catch (e) {
      wrap(e, "updateShipmentPatch");
    }
  }

  async listDrivers(limit = 100): Promise<Driver[]> {
    try {
      const raw = await this.client().listDrivers(limit);
      return raw.map((d) => mapFleetbaseDriver(d as Record<string, unknown>));
    } catch (e) {
      wrap(e, "listDrivers");
    }
  }

  async getDriver(id: string): Promise<Driver | null> {
    try {
      const raw = await this.client().getDriver(id);
      return mapFleetbaseDriver(raw as Record<string, unknown>);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (/404|not found/i.test(msg)) return null;
      wrap(e, "getDriver");
    }
  }

  async createDriver(payload: Record<string, unknown>): Promise<Driver> {
    try {
      const raw = await this.client().createDriver(payload);
      return mapFleetbaseDriver(raw as Record<string, unknown>);
    } catch (e) {
      wrap(e, "createDriver");
    }
  }

  async updateDriver(id: string, patch: Record<string, unknown>): Promise<Driver> {
    try {
      const raw = await this.client().updateDriver(id, patch);
      return mapFleetbaseDriver(raw as Record<string, unknown>);
    } catch (e) {
      wrap(e, "updateDriver");
    }
  }

  async listVehicles(limit = 100): Promise<Vehicle[]> {
    try {
      const raw = await this.client().listVehicles(limit);
      return raw.map((v) => mapFleetbaseVehicle(v as Record<string, unknown>));
    } catch (e) {
      wrap(e, "listVehicles");
    }
  }

  async getVehicle(id: string): Promise<Vehicle | null> {
    try {
      const raw = await this.client().getVehicle(id);
      return mapFleetbaseVehicle(raw as Record<string, unknown>);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (/404|not found/i.test(msg)) return null;
      wrap(e, "getVehicle");
    }
  }

  async createVehicle(payload: Record<string, unknown>): Promise<Vehicle> {
    try {
      const raw = await this.client().createVehicle(payload);
      return mapFleetbaseVehicle(raw as Record<string, unknown>);
    } catch (e) {
      wrap(e, "createVehicle");
    }
  }

  async updateVehicle(id: string, patch: Record<string, unknown>): Promise<Vehicle> {
    try {
      const raw = await this.client().updateVehicle(id, patch);
      return mapFleetbaseVehicle(raw as Record<string, unknown>);
    } catch (e) {
      wrap(e, "updateVehicle");
    }
  }

  async listPositions(limit = 100): Promise<ExecutionPosition[]> {
    try {
      return await this.client().listPositions(limit);
    } catch {
      return [];
    }
  }
}
