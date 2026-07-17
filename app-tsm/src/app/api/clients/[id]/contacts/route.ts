import {
  createClientContact,
  deleteClientContact,
  getClient,
  listClientContacts,
  patchClientContact,
  validateCreateContactInput,
  validatePatchContactInput,
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

  const parsed = validatePatchContactInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  const { contactId, ...patch } = parsed;
  const contact = await patchClientContact(id, contactId, patch);
  if (!contact) return apiError("CONTACT_NOT_FOUND", "Contact not found.", 404);
  return apiSuccess(contact);
}

export async function DELETE(
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

  const contactId = String((body as { contactId?: string; id?: string }).contactId ?? (body as { id?: string }).id ?? "").trim();
  if (!contactId) return apiError("VALIDATION_ERROR", "contactId is required.");

  const deleted = await deleteClientContact(id, contactId);
  if (!deleted) return apiError("CONTACT_NOT_FOUND", "Contact not found.", 404);
  return apiSuccess({ contactId, deleted: true });
}
