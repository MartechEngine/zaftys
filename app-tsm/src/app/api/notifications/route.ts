import { listNotifications } from "@/lib/notifications/inbox";
import { apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  const items = await listNotifications(25);
  const unread = items.filter((n) => !n.read).length;
  return apiSuccess(items, { unread });
}
