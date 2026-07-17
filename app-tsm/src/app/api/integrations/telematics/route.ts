import {
  createTelematicsProvider,
  listTelematicsProviders,
  testTelematicsProvider,
  validateCreateTelematicsInput,
} from "@/lib/integrations/integrations-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await listTelematicsProviders());
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const data = body as Record<string, unknown>;
  const id = String(data.id ?? "").trim();
  if (id) {
    const provider = await testTelematicsProvider(id);
    if (!provider) return apiError("PROVIDER_NOT_FOUND", "Telematics provider not found.", 404);
    return apiSuccess(provider);
  }

  const parsed = validateCreateTelematicsInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  return apiSuccess(await createTelematicsProvider(parsed.name), { created: true });
}

export async function PATCH(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const id = String((body as { id?: string }).id ?? "").trim();
  if (!id) return apiError("VALIDATION_ERROR", "id is required.");

  const provider = await testTelematicsProvider(id);
  if (!provider) return apiError("PROVIDER_NOT_FOUND", "Telematics provider not found.", 404);
  return apiSuccess(provider);
}
