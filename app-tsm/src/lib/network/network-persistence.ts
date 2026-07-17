import { isDatabaseConfigured } from "@/lib/db/client";
import { flushNetworkToDb, loadNetworkFromDb } from "@/lib/db/network-repository";
import {
  isNetworkStoreHydrated,
  markNetworkStoreHydrated,
  replaceNetworkStore,
  snapshotNetworkStore,
} from "@/lib/network/listing-store";

/** Load listings/offers from Postgres once per process when DATABASE_URL is set. */
export async function ensureNetworkHydrated() {
  if (!isDatabaseConfigured()) {
    markNetworkStoreHydrated();
    return;
  }
  if (isNetworkStoreHydrated()) return;

  const loaded = await loadNetworkFromDb();
  if (loaded && (loaded.listings.length > 0 || loaded.offers.length > 0)) {
    replaceNetworkStore(loaded);
    return;
  }
  markNetworkStoreHydrated();
}

/** Persist current in-memory network state to Postgres (no-op without DATABASE_URL). */
export async function persistNetworkSnapshot() {
  if (!isDatabaseConfigured()) return;
  const snap = snapshotNetworkStore();
  await flushNetworkToDb(snap.listings, snap.offers);
}
