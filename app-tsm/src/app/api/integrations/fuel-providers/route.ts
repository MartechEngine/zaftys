import {
  listFuelProviders,
  updateFuelProviderStatus,
} from "@/lib/integrations/integrations-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await listFuelProviders());
}

export async function PATCH(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const data = body as { id?: string; status?: string };
  const id = String(data.id ?? "").trim();
  if (!id) return apiError("VALIDATION_ERROR", "id is required.");

  const status = String(data.status ?? "").trim() as "connected" | "disconnected";
  if (status !== "connected" && status !== "disconnected") {
    return apiError("VALIDATION_ERROR", "status must be connected or disconnected.");
  }

  const provider = await updateFuelProviderStatus(id, status);
  if (!provider) return apiError("PROVIDER_NOT_FOUND", "Fuel provider not found.", 404);
  return apiSuccess(provider);
}
