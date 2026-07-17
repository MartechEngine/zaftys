import { getNotificationSettings, updateNotificationRecipients } from "@/lib/settings/config-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await getNotificationSettings());
}

export async function PATCH(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const data = body as { id?: string; recipients?: string };
  const id = String(data.id ?? "").trim();
  const recipients = String(data.recipients ?? "").trim();
  if (!id) return apiError("VALIDATION_ERROR", "id is required.");
  if (!recipients) return apiError("VALIDATION_ERROR", "recipients is required.");

  const channel = await updateNotificationRecipients(id, recipients);
  if (!channel) return apiError("CHANNEL_NOT_FOUND", "Notification channel not found.", 404);
  return apiSuccess(channel);
}
