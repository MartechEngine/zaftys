import {
  createClient,
  listClients,
  validateCreateClientInput,
} from "@/lib/clients/client-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? undefined;
  return apiSuccess(await listClients(q));
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = validateCreateClientInput(body);
  if ("error" in parsed) {
    return apiError("VALIDATION_ERROR", parsed.error);
  }

  try {
    const client = await createClient(parsed);
    return apiSuccess(client, { created: true });
  } catch (e) {
    return apiError(
      "CREATE_FAILED",
      e instanceof Error ? e.message : "Could not create client.",
      409,
    );
  }
}
