import { runTranZfortSync } from "@/lib/sync/run-tranzfort-sync";
import { apiSuccess } from "@/lib/api-response";

/** Manual / cron trigger for TranZfort → Fleetbase shadow sync. */
export async function POST() {
  const result = await runTranZfortSync();
  return apiSuccess(result);
}
