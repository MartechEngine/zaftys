import { demoPartners } from "@/lib/demo-data";
import {
  listNetworkAssignments,
  listNetworkOverflow,
} from "@/lib/data/overflow-repository";
import { fetchAllShipmentsRaw, getSyncStatus } from "@/lib/data/shipment-repository";
import { getOutboundListingStats } from "@/lib/network/listing-store";
import {
  createStoredPartner,
  listStoredPartners,
  verifyStoredPartner,
} from "@/lib/mutations/entity-stores";
import { isPartnerVerifiedOverride, markPartnerVerifiedOverride } from "@/lib/mutations/sprint10-store";

export type PartnerRecord = {
  id: string;
  name: string;
  verified: boolean;
  trips: number;
  onTime: string;
  rating: number;
  activeAssignments: number;
};

export async function listPartners(q?: string): Promise<PartnerRecord[]> {
  const [shipments, assignments] = await Promise.all([
    fetchAllShipmentsRaw(),
    listNetworkAssignments(),
  ]);

  const networkTrips = shipments.filter((s) => s.originType === "network").length;

  let partners: PartnerRecord[] = [
    ...listStoredPartners(),
    ...demoPartners.map((p, index) => ({
      ...p,
      verified: p.verified || isPartnerVerifiedOverride(p.id),
      trips: p.trips + Math.max(0, Math.floor(networkTrips / demoPartners.length) - index),
      activeAssignments: Math.floor(assignments.length / demoPartners.length),
    })),
  ];

  if (q?.trim()) {
    const needle = q.trim().toLowerCase();
    partners = partners.filter((p) => p.name.toLowerCase().includes(needle));
  }

  return partners.sort((a, b) => b.trips - a.trips);
}

export function validateCreatePartnerInput(
  body: unknown,
): { name: string } | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const name = String((body as Record<string, unknown>).name ?? "").trim();
  if (!name) return { error: "Partner name is required." };
  return { name };
}

export async function createPartner(name: string): Promise<PartnerRecord> {
  return createStoredPartner({ name });
}

export async function verifyPartner(id: string): Promise<PartnerRecord | undefined> {
  const stored = verifyStoredPartner(id);
  if (stored) return stored;
  const partner = await getPartner(id);
  if (!partner) return undefined;
  markPartnerVerifiedOverride(id);
  return { ...partner, verified: true };
}

export async function getPartner(id: string): Promise<PartnerRecord | undefined> {
  return (await listPartners()).find((p) => p.id === id);
}

export async function getNetworkSummary() {
  const { ensureNetworkHydrated } = await import("@/lib/network/network-persistence");
  await ensureNetworkHydrated();
  const [overflow, assignments, sync, partners] = await Promise.all([
    listNetworkOverflow(undefined, "active"),
    listNetworkAssignments(),
    getSyncStatus(),
    listPartners(),
  ]);

  const verifiedPartners = partners.filter((p) => p.verified).length;
  const outbound = getOutboundListingStats();
  const fillRate =
    assignments.length + overflow.length > 0
      ? Math.round((assignments.length / (assignments.length + overflow.length)) * 100)
      : 94;

  return {
    openOverflow: overflow.length,
    outboundOpenPosts: outbound.openPosts,
    outboundOffersWaiting: outbound.offersWaiting,
    outboundDrafts: outbound.drafts,
    verifiedPartners,
    totalPartners: partners.length,
    activeAssignments: assignments.length,
    syncHealthy: sync.healthy,
    syncLabel: sync.healthy ? "OK" : "Degraded",
    fillRate: `${fillRate}%`,
    lastSyncAt: sync.lastSyncAt,
  };
}
