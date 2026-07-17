import {
  listNotifications,
  markNotificationsRead,
  markAllNotificationsRead,
} from "@/lib/notifications/inbox";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  const items = await listNotifications(25);
  const unread = items.filter((n) => !n.read).length;
  return apiSuccess(items, { unread });
}

export async function PATCH(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  if (!body || typeof body !== "object") {
    return apiError("INVALID_BODY", "Body must be an object.");
  }

  const data = body as Record<string, unknown>;
  const all = data.all === true;
  const ids = Array.isArray(data.ids)
    ? data.ids.map((id) => String(id).trim()).filter(Boolean)
    : [];

  if (!all && ids.length === 0) {
    return apiError("VALIDATION_ERROR", "Provide { ids: string[] } or { all: true }.");
  }

  const marked = all ? await markAllNotificationsRead() : await markNotificationsRead(ids);
  const items = await listNotifications(25);
  const unread = items.filter((n) => !n.read).length;

  return apiSuccess({ marked, unread });
}
