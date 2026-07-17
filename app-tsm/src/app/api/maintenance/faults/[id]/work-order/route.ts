import { linkFaultWithWorkOrder } from "@/lib/maintenance/fault-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const result = await linkFaultWithWorkOrder(id);
  if (!result) return apiError("FAULT_NOT_FOUND", "Fault report not found.", 404);
  return apiSuccess(result);
}
