import {
  createClientContact,
  getClient,
  listClientContacts,
  validateCreateContactInput,
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
  return apiSuccess(await listClientContacts(id));
}

export async function POST(
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

  const parsed = validateCreateContactInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  const contact = await createClientContact(id, parsed);
  if (!contact) return apiError("CLIENT_NOT_FOUND", "Client not found.", 404);
  return apiSuccess(contact, { created: true });
}
