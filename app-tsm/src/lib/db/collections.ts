import { and, eq } from "drizzle-orm";
import { getDb, isDatabaseConfigured } from "@/lib/db/client";
import { appDocuments } from "@/lib/db/schema";

export type CollectionName =
  | "clients"
  | "client_contacts"
  | "client_users"
  | "client_patches"
  | "invoices"
  | "invoice_status"
  | "service_rates"
  | "rate_patches"
  | "ledger_accounts"
  | "org_profile"
  | "org_users"
  | "org_user_patches"
  | "roles"
  | "role_patches"
  | "role_permissions"
  | "settings_groups"
  | "automation_rules"
  | "automation_overrides"
  | "geofences"
  | "geofence_patches"
  | "order_types"
  | "order_fields"
  | "order_type_patches"
  | "config_patches"
  | "vendors"
  | "vendor_patches"
  | "work_orders"
  | "work_order_status"
  | "fault_status"
  | "parts_stock"
  | "maintenance_schedules"
  | "quotes"
  | "quote_patches"
  | "user_passwords"
  | "sync_state"
  | "invite_tokens"
  | "fleet_drivers"
  | "fleet_vehicles"
  | "driver_patches"
  | "vehicle_patches"
  | "custom_reports"
  | "report_schedules"
  | "fleet_places"
  | "fleet_equipment"
  | "fleet_groups"
  | "network_partners"
  | "place_patches"
  | "equipment_patches"
  | "fleet_group_patches"
  | "sync_dlq"
  | "notification_reads"
  | "notification_items"
  | "live_positions";

const g = globalThis as typeof globalThis & {
  __tsmCollectionHydrated?: Set<string>;
};

function hydratedSet() {
  if (!g.__tsmCollectionHydrated) g.__tsmCollectionHydrated = new Set();
  return g.__tsmCollectionHydrated;
}

export function isCollectionHydrated(name: CollectionName) {
  return hydratedSet().has(name);
}

export function markCollectionHydrated(name: CollectionName) {
  hydratedSet().add(name);
}

export async function loadCollection<T>(name: CollectionName): Promise<T[]> {
  const db = getDb();
  if (!db || !isDatabaseConfigured()) return [];
  const rows = await db
    .select()
    .from(appDocuments)
    .where(eq(appDocuments.collection, name));
  return rows.map((r) => r.payload as T);
}

export async function upsertDocument(
  collection: CollectionName,
  id: string,
  payload: unknown,
): Promise<void> {
  const db = getDb();
  if (!db || !isDatabaseConfigured()) return;
  const now = new Date().toISOString();
  await db
    .insert(appDocuments)
    .values({ collection, id, payload, updatedAt: now })
    .onConflictDoUpdate({
      target: [appDocuments.collection, appDocuments.id],
      set: { payload, updatedAt: now },
    });
}

export async function deleteDocument(
  collection: CollectionName,
  id: string,
): Promise<void> {
  const db = getDb();
  if (!db || !isDatabaseConfigured()) return;
  await db
    .delete(appDocuments)
    .where(
      and(eq(appDocuments.collection, collection), eq(appDocuments.id, id)),
    );
}

export async function replaceCollection(
  collection: CollectionName,
  items: { id: string; payload: unknown }[],
): Promise<void> {
  const db = getDb();
  if (!db || !isDatabaseConfigured()) return;
  await db.delete(appDocuments).where(eq(appDocuments.collection, collection));
  const now = new Date().toISOString();
  if (items.length === 0) return;
  await db.insert(appDocuments).values(
    items.map((item) => ({
      collection,
      id: item.id,
      payload: item.payload,
      updatedAt: now,
    })),
  );
}

/** Hydrate once: load DB rows into memory via replaceFn when memory is empty or force. */
export async function ensureArrayHydrated<T extends { id: string }>(opts: {
  collection: CollectionName;
  list: () => T[];
  replace: (items: T[]) => void;
}): Promise<void> {
  if (!isDatabaseConfigured()) {
    markCollectionHydrated(opts.collection);
    return;
  }
  if (isCollectionHydrated(opts.collection)) return;

  const fromDb = await loadCollection<T>(opts.collection);
  if (fromDb.length > 0 && opts.list().length === 0) {
    opts.replace(fromDb);
  } else if (fromDb.length > 0) {
    // Merge DB into memory by id (DB wins for overlapping ids)
    const map = new Map(opts.list().map((x) => [x.id, x]));
    for (const row of fromDb) map.set(row.id, row);
    opts.replace([...map.values()]);
  }
  markCollectionHydrated(opts.collection);
}

/** Hydrate a Record/Map-style patch bag stored as documents. */
export async function ensureMapHydrated<T>(opts: {
  collection: CollectionName;
  get: () => Map<string, T> | Record<string, T>;
  set: (entries: [string, T][]) => void;
}): Promise<void> {
  if (!isDatabaseConfigured()) {
    markCollectionHydrated(opts.collection);
    return;
  }
  if (isCollectionHydrated(opts.collection)) return;

  const fromDb = await loadCollection<{ id: string; value: T }>(opts.collection);
  if (fromDb.length > 0) {
    opts.set(fromDb.map((r) => [r.id, r.value]));
  }
  markCollectionHydrated(opts.collection);
}

export async function persistMapEntry<T>(
  collection: CollectionName,
  id: string,
  value: T,
): Promise<void> {
  await upsertDocument(collection, id, { id, value });
}
