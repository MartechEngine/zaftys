/**
 * Pilot import: Fleetbase LOS → PostgresExecutionStore (ADR-008 Phase C optional).
 * Keep Fleetbase until this + publish→shipment link + UI smoke are green.
 */

import { randomUUID } from "crypto";
import { getDb } from "@/lib/db/client";
import { tsmDrivers, tsmVehicles } from "@/lib/db/schema";
import type { ShipmentStatus } from "@/lib/constants";
import type { ShipmentRecord } from "@/lib/dev-store";
import { FleetbaseExecutionStore } from "@/lib/execution/fleetbase-store";
import { PostgresExecutionStore } from "@/lib/execution/postgres-store";
import { listSupplierLoads } from "@/lib/tsm/loads-client";
import type { SupplierLoadRow } from "@/lib/tsm/loads-types";

function norm(s: string | undefined | null) {
  return (s ?? "")
    .toLowerCase()
    .replace(/,\s*maharashtra|\s+mh\b/gi, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function loadMatchesShipment(load: SupplierLoadRow, ship: ShipmentRecord) {
  const o = norm(load.originLabel);
  const d = norm(load.destinationLabel);
  const m = norm(load.material);
  const so = norm(ship.originLabel ?? ship.origin);
  const sd = norm(ship.destinationLabel ?? ship.destination);
  const sm = norm(ship.commodity);
  const oHit = Boolean(o && so && (o.includes(so) || so.includes(o)));
  const dHit = Boolean(d && sd && (d.includes(sd) || sd.includes(d)));
  const mHit = Boolean(m && sm && (m.includes(sm) || sm.includes(m)));
  return oHit && dHit && mHit;
}

function statusFromLoad(load: SupplierLoadRow): ShipmentStatus {
  if (load.status === "cancelled") return "cancelled";
  if (load.status === "completed" || load.status === "assigned_full") return "delivered";
  return "pending";
}

function shipmentFromLoad(load: SupplierLoadRow): ShipmentRecord {
  const origin = load.originLabel.split(",")[0]?.trim() || load.originLabel;
  const destination =
    load.destinationLabel.split(",")[0]?.trim() || load.destinationLabel;
  const stamp = load.publishedAt ?? new Date().toISOString();
  return {
    id: randomUUID(),
    publicId: `TZ-${load.id.slice(0, 8).toUpperCase()}`,
    client: "TranZfort marketplace",
    origin,
    destination,
    commodity: load.material,
    tonnageMt: Number(load.weightTonnes) > 0 ? Number(load.weightTonnes) : 1,
    status: statusFromLoad(load),
    originType: "network",
    materialCode: load.materialCode ?? undefined,
    originLabel: load.originLabel,
    destinationLabel: load.destinationLabel,
    tranzfortId: load.id,
    tranzfortTripIds: [load.id],
    documents: [],
    updatedAt: stamp,
  };
}

export type ImportFleetbaseResult = {
  orgId: string;
  importedShipments: number;
  skippedShipments: number;
  importedDrivers: number;
  importedVehicles: number;
  linkedLoads: number;
  createdFromLoads: number;
  errors: string[];
  sampleIds: string[];
};

export async function importFleetbaseIntoPostgres(opts: {
  orgId: string;
  supplierId?: string | null;
}): Promise<ImportFleetbaseResult> {
  const orgId = opts.orgId.trim().toLowerCase();
  const result: ImportFleetbaseResult = {
    orgId,
    importedShipments: 0,
    skippedShipments: 0,
    importedDrivers: 0,
    importedVehicles: 0,
    linkedLoads: 0,
    createdFromLoads: 0,
    errors: [],
    sampleIds: [],
  };

  const pg = new PostgresExecutionStore(orgId);
  const fb = new FleetbaseExecutionStore();
  const db = getDb();

  try {
    const [orders, drivers, vehicles] = await Promise.all([
      fb.listShipments(200),
      fb.listDrivers(200),
      fb.listVehicles(200),
    ]);

    if (db) {
      for (const d of drivers) {
        try {
          const stamp = new Date().toISOString();
          const existed = await pg.getDriver(d.id);
          await db
            .insert(tsmDrivers)
            .values({ id: d.id, orgId, payload: d, updatedAt: stamp })
            .onConflictDoUpdate({
              target: tsmDrivers.id,
              set: { payload: d, updatedAt: stamp, orgId },
            });
          if (!existed) result.importedDrivers += 1;
        } catch (e) {
          result.errors.push(
            `driver ${d.id}: ${e instanceof Error ? e.message : String(e)}`,
          );
        }
      }

      for (const v of vehicles) {
        try {
          const stamp = new Date().toISOString();
          const existed = await pg.getVehicle(v.id);
          await db
            .insert(tsmVehicles)
            .values({ id: v.id, orgId, payload: v, updatedAt: stamp })
            .onConflictDoUpdate({
              target: tsmVehicles.id,
              set: { payload: v, updatedAt: stamp, orgId },
            });
          if (!existed) result.importedVehicles += 1;
        } catch (e) {
          result.errors.push(
            `vehicle ${v.id}: ${e instanceof Error ? e.message : String(e)}`,
          );
        }
      }
    }

    for (const order of orders) {
      try {
        const existing = await pg.getShipment(order.id);
        if (existing) {
          result.skippedShipments += 1;
          continue;
        }
        await pg.putShipmentRecord(order);
        result.importedShipments += 1;
        if (result.sampleIds.length < 8) result.sampleIds.push(order.id);
      } catch (e) {
        result.errors.push(
          `shipment ${order.id}: ${e instanceof Error ? e.message : String(e)}`,
        );
      }
    }
  } catch (e) {
    result.errors.push(
      `fleetbase_read: ${e instanceof Error ? e.message : String(e)}`,
    );
  }

  if (opts.supplierId?.trim()) {
    try {
      const loads = await listSupplierLoads({
        supplierId: opts.supplierId,
        statusTab: "all",
        limit: 100,
        offset: 0,
      });
      const posted = loads.items.filter((l) => l.postedFromTsm);
      let ships = await pg.listShipments(500);

      for (const load of posted) {
        const byTz = ships.find(
          (s) =>
            s.tranzfortId === load.id || s.tranzfortTripIds?.includes(load.id),
        );
        if (byTz) continue;

        const fuzzy = ships.find((s) => loadMatchesShipment(load, s));
        if (fuzzy) {
          await pg.updateShipmentPatch(fuzzy.id, {
            meta: { tranzfort_id: load.id },
          });
          result.linkedLoads += 1;
          ships = await pg.listShipments(500);
          continue;
        }

        const created = await pg.putShipmentRecord(shipmentFromLoad(load));
        result.createdFromLoads += 1;
        if (result.sampleIds.length < 8) result.sampleIds.push(created.id);
        ships = await pg.listShipments(500);
      }
    } catch (e) {
      result.errors.push(
        `load_mirror: ${e instanceof Error ? e.message : String(e)}`,
      );
    }
  }

  return result;
}
