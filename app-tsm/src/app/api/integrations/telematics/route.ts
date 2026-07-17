import {
  createTelematicsProvider,
  listTelematicsProviders,
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

  const parsed = validateCreateTelematicsInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  return apiSuccess(await createTelematicsProvider(parsed.name), { created: true });
}
