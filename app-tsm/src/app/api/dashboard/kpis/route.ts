import { getKpis } from "@/lib/data/shipment-repository";
import { apiSuccess } from "@/lib/api-response";

export async function GET() {
  return apiSuccess(await getKpis());
}
