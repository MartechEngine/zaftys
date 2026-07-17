import { listAllDocuments } from "@/lib/data/shipment-repository";
import { apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? undefined;
  const type = searchParams.get("type") ?? undefined;
  const data = await listAllDocuments({ q, type });
  return apiSuccess(data, { total: data.length });
}
