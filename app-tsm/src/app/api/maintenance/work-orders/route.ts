import {
  createWorkOrder,
  listWorkOrders,
  validateCreateWorkOrderInput,
} from "@/lib/maintenance/work-order-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") ?? undefined;
  const vendor = searchParams.get("vendor") ?? undefined;
  return apiSuccess(
    await listWorkOrders({
      status: status as "open" | "in_progress" | "resolved" | "active" | undefined,
      vendor,
    }),
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = validateCreateWorkOrderInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  const wo = await createWorkOrder(parsed);
  return apiSuccess(wo, { created: true });
}
