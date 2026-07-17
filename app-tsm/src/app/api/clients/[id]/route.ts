import {
  getClient,
  listClientShipments,
  patchClient,
  validatePatchClientInput,
} from "@/lib/clients/client-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const client = await getClient(id);
  if (!client) return apiError("CLIENT_NOT_FOUND", "Client not found.", 404);

  const recentShipments = await listClientShipments(client.name);
  return apiSuccess({ client, recentShipments });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = validatePatchClientInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  const client = await patchClient(id, parsed);
  if (!client) return apiError("CLIENT_NOT_FOUND", "Client not found.", 404);
  return apiSuccess(client);
}
