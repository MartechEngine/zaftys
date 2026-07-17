import { listNetworkAssignments } from "@/lib/data/overflow-repository";
import { getShipment } from "@/lib/data/shipment-repository";
import {
  getListingByShipment,
  listAcceptedListingAssignments,
} from "@/lib/network/listing-store";
import { ensureNetworkHydrated } from "@/lib/network/network-persistence";
import { apiSuccess } from "@/lib/api-response";

export async function GET() {
  await ensureNetworkHydrated();
  const [overflowAssignments, outboundOffers] = await Promise.all([
    Promise.resolve(listNetworkAssignments()),
    Promise.resolve(listAcceptedListingAssignments()),
  ]);

  const overflowRows = await Promise.all(
    overflowAssignments.map(async (a) => {
      const shipment = a.shipmentId ? await getShipment(a.shipmentId) : undefined;
      return {
        id: a.id,
        source: "overflow" as const,
        bookingId: a.bookingId,
        route: a.route,
        commodity: a.commodity,
        tonnage: a.tonnage,
        shipmentId: a.shipmentId,
        publicId: shipment?.publicId,
        status: shipment?.status,
        driver: shipment?.driver,
        truck: shipment?.vehicle,
        partner: undefined as string | undefined,
      };
    }),
  );

  const outboundRows = await Promise.all(
    outboundOffers.map(async (offer) => {
      const shipment = await getShipment(offer.shipmentId);
      const listing = getListingByShipment(offer.shipmentId);
      return {
        id: offer.id,
        source: "outbound" as const,
        bookingId: listing?.id ?? offer.listingId,
        route: shipment ? `${shipment.origin} → ${shipment.destination}` : "—",
        commodity: shipment?.commodity ?? "—",
        tonnage: shipment?.tonnageMt ?? 0,
        shipmentId: offer.shipmentId,
        publicId: shipment?.publicId,
        status: shipment?.status,
        driver: offer.partnerName,
        truck: offer.truckLabel,
        partner: offer.partnerName,
      };
    }),
  );

  const rows = [...outboundRows, ...overflowRows];
  return apiSuccess(rows, { total: rows.length });
}
