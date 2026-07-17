import { getDispatchCalendar } from "@/lib/dispatch/calendar";
import { apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await getDispatchCalendar());
}
