import { createShipment, getShipmentTabCounts, listShipments } from "@/lib/data/shipment-repository";
import { apiError, apiSuccess } from "@/lib/api-response";
import { validateCreateShipmentInput } from "@/lib/shipments/create-shipment";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tab = searchParams.get("tab") ?? undefined;
  const status = searchParams.get("status") ?? undefined;
  const q = searchParams.get("q") ?? undefined;
  const client = searchParams.get("client") ?? undefined;
  const origin = searchParams.get("origin") ?? undefined;
  const destination = searchParams.get("destination") ?? undefined;
  const source = searchParams.get("source") ?? undefined;
  const data = await listShipments({ tab, status, q, client, origin, destination, source });
  const counts = await getShipmentTabCounts(q);
  return apiSuccess(data, { total: data.length, counts });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = validateCreateShipmentInput(body);
  if ("error" in parsed) {
    return apiError("VALIDATION_ERROR", parsed.error);
  }

  const shipment = await createShipment(parsed);
  if (!shipment) {
    return apiError("CREATE_FAILED", "Could not create shipment.", 500);
  }

  return apiSuccess(shipment, { created: true });
}
