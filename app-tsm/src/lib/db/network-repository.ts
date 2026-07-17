import { eq } from "drizzle-orm";
import { getDb, isDatabaseConfigured } from "@/lib/db/client";
import { networkListings, networkOffers } from "@/lib/db/schema";
import type { NetworkListing, NetworkOffer } from "@/lib/network/listing-types";

export async function loadNetworkFromDb(): Promise<{
  listings: NetworkListing[];
  offers: NetworkOffer[];
} | null> {
  const db = getDb();
  if (!db || !isDatabaseConfigured()) return null;

  const listingRows = await db.select().from(networkListings);
  const offerRows = await db.select().from(networkOffers);

  return {
    listings: listingRows.map((r) => r.payload as NetworkListing),
    offers: offerRows.map((r) => r.payload as NetworkOffer),
  };
}

export async function upsertListingToDb(listing: NetworkListing): Promise<void> {
  const db = getDb();
  if (!db || !isDatabaseConfigured()) return;

  const now = new Date().toISOString();
  // Unique on shipment_id — update that row even if listing.id changed in-memory
  const existing = await db
    .select({ id: networkListings.id })
    .from(networkListings)
    .where(eq(networkListings.shipmentId, listing.shipmentId))
    .limit(1);

  if (existing[0]) {
    await db
      .update(networkListings)
      .set({
        id: listing.id,
        state: listing.state,
        payload: listing,
        updatedAt: now,
      })
      .where(eq(networkListings.shipmentId, listing.shipmentId));
    return;
  }

  await db.insert(networkListings).values({
    id: listing.id,
    shipmentId: listing.shipmentId,
    state: listing.state,
    payload: listing,
    updatedAt: now,
  });
}

export async function upsertOfferToDb(offer: NetworkOffer): Promise<void> {
  const db = getDb();
  if (!db || !isDatabaseConfigured()) return;

  const now = new Date().toISOString();
  await db
    .insert(networkOffers)
    .values({
      id: offer.id,
      listingId: offer.listingId,
      shipmentId: offer.shipmentId,
      status: offer.status,
      payload: offer,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: networkOffers.id,
      set: {
        listingId: offer.listingId,
        shipmentId: offer.shipmentId,
        status: offer.status,
        payload: offer,
        updatedAt: now,
      },
    });
}

export async function flushNetworkToDb(
  listings: NetworkListing[],
  offers: NetworkOffer[],
): Promise<void> {
  const db = getDb();
  if (!db || !isDatabaseConfigured()) return;

  for (const listing of listings) {
    await upsertListingToDb(listing);
  }
  for (const offer of offers) {
    await upsertOfferToDb(offer);
  }
}

export async function deleteListingFromDb(listingId: string): Promise<void> {
  const db = getDb();
  if (!db || !isDatabaseConfigured()) return;
  await db.delete(networkOffers).where(eq(networkOffers.listingId, listingId));
  await db.delete(networkListings).where(eq(networkListings.id, listingId));
}
