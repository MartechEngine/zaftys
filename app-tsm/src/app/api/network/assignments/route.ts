import { listNetworkAssignments } from "@/lib/data/overflow-repository";
import { getShipment } from "@/lib/data/shipment-repository";
import { apiSuccess } from "@/lib/api-response";

export async function GET() {
  const assignments = listNetworkAssignments();
  const rows = await Promise.all(
    assignments.map(async (a) => {
      const shipment = a.shipmentId ? await getShipment(a.shipmentId) : undefined;
      return {
        id: a.id,
        bookingId: a.bookingId,
        route: a.route,
        commodity: a.commodity,
        tonnage: a.tonnage,
        shipmentId: a.shipmentId,
        publicId: shipment?.publicId,
        status: shipment?.status,
        driver: shipment?.driver,
      };
    }),
  );
  return apiSuccess(rows, { total: rows.length });
}
