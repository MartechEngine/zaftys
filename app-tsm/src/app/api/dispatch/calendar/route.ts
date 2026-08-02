import { getDispatchCalendar } from "@/lib/dispatch/calendar";
import { apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return apiSuccess(await getDispatchCalendar());
  } catch (e) {
    console.warn(
      "[dispatch/calendar] degraded:",
      e instanceof Error ? e.message : e,
    );
    return apiSuccess([], { total: 0, degraded: true });
  }
}
