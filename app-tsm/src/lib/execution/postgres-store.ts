/**
 * Postgres-backed ExecutionStore (ADR-008 / S3).
 * Opt-in: TSM_EXECUTION_BACKEND=postgres (+ DATABASE_URL + org id).
 */

import { and, desc, eq, sql } from "drizzle-orm";
import { randomUUID } from "crypto";
import { getDb, isDatabaseConfigured } from "@/lib/db/client";
import {
  tsmDrivers,
  tsmPositions,
  tsmShipments,
  tsmVehicles,
} from "@/lib/db/schema";
import type { CreateShipmentInput } from "@/lib/shipments/create-shipment";
import type { ShipmentStatus } from "@/lib/constants";
import type { Driver, ShipmentRecord, Vehicle } from "@/lib/dev-store";
import type { ExecutionPosition, ExecutionStore } from "@/lib/execution/types";
import { ExecutionError } from "@/lib/execution/types";

function requireDb() {
  if (!isDatabaseConfigured()) {
    throw new ExecutionError(
      "DATABASE_URL is required for TSM_EXECUTION_BACKEND=postgres",
      503,
    );
  }
  const db = getDb();
  if (!db) {
    throw new ExecutionError("Postgres client unavailable", 503);
  }
  return db;
}

function nowIso() {
  return new Date().toISOString();
}

function newPublicId() {
  const n = Math.floor(Math.random() * 9000) + 1000;
  return `ZFT-2026-${String(n).padStart(4, "0")}`;
}

/** Map transitional Fleetbase-style patches from shipment-repository onto domain records. */
function applyFbStylePatch(
  record: ShipmentRecord,
  patch: Record<string, unknown>,
): ShipmentRecord {
  const next: ShipmentRecord = { ...record, documents: [...(record.documents ?? [])] };
  const meta = patch.meta as Record<string, unknown> | undefined;
  if (meta) {
    if (meta.client != null) next.client = String(meta.client);
    if (meta.commodity != null) next.commodity = String(meta.commodity);
    if (meta.tonnage != null || meta.tonnage_mt != null) {
      const t = Number(meta.tonnage_mt ?? meta.tonnage);
      if (Number.isFinite(t)) next.tonnageMt = t;
    }
    if (meta.lr_number != null) next.lrNumber = String(meta.lr_number);
    if (meta.origin_type != null) {
      next.originType = String(meta.origin_type) as ShipmentRecord["originType"];
    }
    if (meta.tranzfort_id != null) {
      const tid = String(meta.tranzfort_id);
      next.tranzfortId = tid;
      next.tranzfortTripIds = Array.from(
        new Set([...(next.tranzfortTripIds ?? []), tid]),
      );
    }
  }
  const pickup = patch.pickup as { name?: string; city?: string } | undefined;
  if (pickup?.city || pickup?.name) {
    next.origin = String(pickup.city ?? pickup.name);
  }
  const dropoff = patch.dropoff as { name?: string; city?: string } | undefined;
  if (dropoff?.city || dropoff?.name) {
    next.destination = String(dropoff.city ?? dropoff.name);
  }
  if (patch.eta != null) next.eta = String(patch.eta);
  if (patch.driver != null) next.driverId = String(patch.driver);
  if (patch.vehicle != null) next.vehicleId = String(patch.vehicle);
  next.updatedAt = nowIso();
  return next;
}

export class PostgresExecutionStore implements ExecutionStore {
  readonly backend = "postgres" as const;

  constructor(private readonly orgId: string) {
    if (!orgId.trim()) {
      throw new ExecutionError(
        "PostgresExecutionStore requires orgId (session org or TSM_EXECUTION_ORG_ID)",
        400,
      );
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      const db = requireDb();
      await db.execute(sql`select 1`);
      return true;
    } catch {
      return false;
    }
  }

  async listShipments(limit = 100): Promise<ShipmentRecord[]> {
    const db = requireDb();
    const rows = await db
      .select()
      .from(tsmShipments)
      .where(eq(tsmShipments.orgId, this.orgId))
      .orderBy(desc(tsmShipments.updatedAt))
      .limit(limit);
    return rows.map((r) => r.payload as ShipmentRecord);
  }

  async getShipment(id: string): Promise<ShipmentRecord | null> {
    const db = requireDb();
    const rows = await db
      .select()
      .from(tsmShipments)
      .where(and(eq(tsmShipments.id, id), eq(tsmShipments.orgId, this.orgId)))
      .limit(1);
    const row = rows[0];
    return row ? (row.payload as ShipmentRecord) : null;
  }

  async createShipment(input: CreateShipmentInput): Promise<ShipmentRecord> {
    const db = requireDb();
    const id = randomUUID();
    const publicId = newPublicId();
    const stamp = nowIso();

    let driverName: string | undefined;
    let vehicleReg: string | undefined;
    if (input.driverId) {
      const d = await this.getDriver(input.driverId);
      driverName = d?.name;
    }
    if (input.vehicleId) {
      const v = await this.getVehicle(input.vehicleId);
      vehicleReg = v?.registration;
    }

    const status: ShipmentStatus =
      input.driverId && input.vehicleId ? "dispatched" : "pending";

    const record: ShipmentRecord = {
      id,
      publicId,
      client: input.client,
      origin: input.originPlace?.city ?? input.origin,
      destination: input.destinationPlace?.city ?? input.destination,
      commodity: input.commodity,
      tonnageMt: input.tonnageMt,
      status,
      originType: input.originType ?? "fleet",
      lrNumber: input.lrNumber,
      materialCode: input.materialCode,
      originState: input.originPlace?.state,
      originLat: input.originPlace?.lat,
      originLng: input.originPlace?.lng,
      originLabel: input.originPlace?.label,
      destinationState: input.destinationPlace?.state,
      destinationLat: input.destinationPlace?.lat,
      destinationLng: input.destinationPlace?.lng,
      destinationLabel: input.destinationPlace?.label,
      driverId: input.driverId,
      vehicleId: input.vehicleId,
      driver: driverName,
      vehicle: vehicleReg,
      documents: [],
      updatedAt: stamp,
    };

    await db.insert(tsmShipments).values({
      id,
      orgId: this.orgId,
      publicId,
      status,
      payload: record,
      updatedAt: stamp,
    });

    return record;
  }

  async assignShipment(
    id: string,
    driverId: string,
    vehicleId: string,
  ): Promise<ShipmentRecord> {
    const existing = await this.getShipment(id);
    if (!existing) throw new ExecutionError(`Shipment ${id} not found`, 404);
    const driver = await this.getDriver(driverId);
    const vehicle = await this.getVehicle(vehicleId);
    if (!driver) throw new ExecutionError(`Driver ${driverId} not found`, 404);
    if (!vehicle) throw new ExecutionError(`Vehicle ${vehicleId} not found`, 404);

    const next: ShipmentRecord = {
      ...existing,
      driverId,
      vehicleId,
      driver: driver.name,
      vehicle: vehicle.registration,
      status: existing.status === "pending" ? "dispatched" : existing.status,
      updatedAt: nowIso(),
    };
    await this.upsertShipment(next);
    return next;
  }

  async updateShipmentStatus(
    id: string,
    status: ShipmentStatus,
  ): Promise<ShipmentRecord> {
    const existing = await this.getShipment(id);
    if (!existing) throw new ExecutionError(`Shipment ${id} not found`, 404);
    const next: ShipmentRecord = { ...existing, status, updatedAt: nowIso() };
    await this.upsertShipment(next);
    return next;
  }

  async updateShipmentPatch(
    id: string,
    patch: Record<string, unknown>,
  ): Promise<ShipmentRecord> {
    const existing = await this.getShipment(id);
    if (!existing) throw new ExecutionError(`Shipment ${id} not found`, 404);
    const next = applyFbStylePatch(existing, patch);
    if (patch.driver != null) {
      const d = await this.getDriver(String(patch.driver));
      if (d) next.driver = d.name;
    }
    if (patch.vehicle != null) {
      const v = await this.getVehicle(String(patch.vehicle));
      if (v) next.vehicle = v.registration;
    }
    await this.upsertShipment(next);
    return next;
  }

  async listDrivers(limit = 100): Promise<Driver[]> {
    const db = requireDb();
    const rows = await db
      .select()
      .from(tsmDrivers)
      .where(eq(tsmDrivers.orgId, this.orgId))
      .orderBy(desc(tsmDrivers.updatedAt))
      .limit(limit);
    return rows.map((r) => r.payload as Driver);
  }

  async getDriver(id: string): Promise<Driver | null> {
    const db = requireDb();
    const rows = await db
      .select()
      .from(tsmDrivers)
      .where(and(eq(tsmDrivers.id, id), eq(tsmDrivers.orgId, this.orgId)))
      .limit(1);
    return rows[0] ? (rows[0].payload as Driver) : null;
  }

  async createDriver(payload: Record<string, unknown>): Promise<Driver> {
    const db = requireDb();
    const id = randomUUID();
    const stamp = nowIso();
    const driver: Driver = {
      id,
      name: String(payload.name ?? "").trim() || "Driver",
      phone: String(payload.phone ?? "").trim(),
      license: String(
        payload.drivers_license_number ?? payload.license ?? "",
      ).trim(),
      licenseExpiry: String(payload.licenseExpiry ?? payload.drivers_license_expiry ?? ""),
      status: "off_duty",
    };
    await db.insert(tsmDrivers).values({
      id,
      orgId: this.orgId,
      payload: driver,
      updatedAt: stamp,
    });
    return driver;
  }

  async updateDriver(id: string, patch: Record<string, unknown>): Promise<Driver> {
    const existing = await this.getDriver(id);
    if (!existing) throw new ExecutionError(`Driver ${id} not found`, 404);
    const next: Driver = {
      ...existing,
      name: patch.name != null ? String(patch.name) : existing.name,
      phone: patch.phone != null ? String(patch.phone) : existing.phone,
      license:
        patch.drivers_license_number != null || patch.license != null
          ? String(patch.drivers_license_number ?? patch.license)
          : existing.license,
      vehicleId:
        patch.vehicle_uuid !== undefined
          ? patch.vehicle_uuid
            ? String(patch.vehicle_uuid)
            : undefined
          : existing.vehicleId,
    };
    const db = requireDb();
    await db
      .update(tsmDrivers)
      .set({ payload: next, updatedAt: nowIso() })
      .where(and(eq(tsmDrivers.id, id), eq(tsmDrivers.orgId, this.orgId)));
    return next;
  }

  async listVehicles(limit = 100): Promise<Vehicle[]> {
    const db = requireDb();
    const rows = await db
      .select()
      .from(tsmVehicles)
      .where(eq(tsmVehicles.orgId, this.orgId))
      .orderBy(desc(tsmVehicles.updatedAt))
      .limit(limit);
    return rows.map((r) => r.payload as Vehicle);
  }

  async getVehicle(id: string): Promise<Vehicle | null> {
    const db = requireDb();
    const rows = await db
      .select()
      .from(tsmVehicles)
      .where(and(eq(tsmVehicles.id, id), eq(tsmVehicles.orgId, this.orgId)))
      .limit(1);
    return rows[0] ? (rows[0].payload as Vehicle) : null;
  }

  async createVehicle(payload: Record<string, unknown>): Promise<Vehicle> {
    const db = requireDb();
    const id = randomUUID();
    const stamp = nowIso();
    const meta = payload.meta as { capacity_mt?: number } | undefined;
    const vehicle: Vehicle = {
      id,
      registration: String(payload.plate_number ?? payload.registration ?? "")
        .trim()
        .toUpperCase(),
      type: String(payload.type ?? "truck").trim() || "truck",
      capacityMt: Number(meta?.capacity_mt ?? payload.capacityMt ?? 25) || 25,
      status: "available",
      docs: "valid",
    };
    await db.insert(tsmVehicles).values({
      id,
      orgId: this.orgId,
      payload: vehicle,
      updatedAt: stamp,
    });
    return vehicle;
  }

  async updateVehicle(id: string, patch: Record<string, unknown>): Promise<Vehicle> {
    const existing = await this.getVehicle(id);
    if (!existing) throw new ExecutionError(`Vehicle ${id} not found`, 404);
    const meta = patch.meta as { capacity_mt?: number } | undefined;
    const next: Vehicle = {
      ...existing,
      registration:
        patch.plate_number != null || patch.registration != null
          ? String(patch.plate_number ?? patch.registration).toUpperCase()
          : existing.registration,
      type: patch.type != null ? String(patch.type) : existing.type,
      capacityMt:
        meta?.capacity_mt != null
          ? Number(meta.capacity_mt)
          : existing.capacityMt,
    };
    const db = requireDb();
    await db
      .update(tsmVehicles)
      .set({ payload: next, updatedAt: nowIso() })
      .where(and(eq(tsmVehicles.id, id), eq(tsmVehicles.orgId, this.orgId)));
    return next;
  }

  async listPositions(limit = 100): Promise<ExecutionPosition[]> {
    const db = requireDb();
    const rows = await db
      .select()
      .from(tsmPositions)
      .where(eq(tsmPositions.orgId, this.orgId))
      .orderBy(desc(tsmPositions.updatedAt))
      .limit(limit);
    return rows.map((r) => ({
      id: r.id,
      orderId: r.orderId ?? undefined,
      latitude: r.latitude ?? undefined,
      longitude: r.longitude ?? undefined,
    }));
  }

  private async upsertShipment(record: ShipmentRecord) {
    const db = requireDb();
    const stamp = record.updatedAt || nowIso();
    await db
      .insert(tsmShipments)
      .values({
        id: record.id,
        orgId: this.orgId,
        publicId: record.publicId,
        status: record.status,
        payload: record,
        updatedAt: stamp,
      })
      .onConflictDoUpdate({
        target: tsmShipments.id,
        set: {
          publicId: record.publicId,
          status: record.status,
          payload: record,
          updatedAt: stamp,
          orgId: this.orgId,
        },
      });
  }

  /** Upsert a full domain record (pilot import / TZ mirror). Preserves `record.id`. */
  async putShipmentRecord(record: ShipmentRecord): Promise<ShipmentRecord> {
    const next: ShipmentRecord = {
      ...record,
      documents: [...(record.documents ?? [])],
      updatedAt: nowIso(),
    };
    await this.upsertShipment(next);
    return next;
  }
}
