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
  await db
    .insert(networkListings)
    .values({
      id: listing.id,
      shipmentId: listing.shipmentId,
      state: listing.state,
      payload: listing,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: networkListings.id,
      set: {
        shipmentId: listing.shipmentId,
        state: listing.state,
        payload: listing,
        updatedAt: now,
      },
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
