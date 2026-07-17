import {
  createWebhook,
  deleteWebhook,
  listWebhooks,
  validateCreateWebhookInput,
} from "@/lib/integrations/integrations-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await listWebhooks());
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = validateCreateWebhookInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  return apiSuccess(await createWebhook(parsed), { created: true });
}

export async function DELETE(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const id = String((body as { id?: string }).id ?? "").trim();
  if (!id) return apiError("VALIDATION_ERROR", "id is required.");

  const ok = await deleteWebhook(id);
  if (!ok) return apiError("WEBHOOK_NOT_FOUND", "Webhook not found.", 404);
  return apiSuccess({ id, deleted: true });
}

export async function PATCH(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const data = body as { id?: string; delete?: boolean };
  const id = String(data.id ?? "").trim();
  if (!id) return apiError("VALIDATION_ERROR", "id is required.");
  if (!data.delete) {
    return apiError("VALIDATION_ERROR", "Set delete: true to remove a webhook.");
  }

  const ok = await deleteWebhook(id);
  if (!ok) return apiError("WEBHOOK_NOT_FOUND", "Webhook not found.", 404);
  return apiSuccess({ id, deleted: true });
}
