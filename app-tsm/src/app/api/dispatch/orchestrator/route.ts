import {
  getOrchestratorState,
  runOrchestratorPipeline,
} from "@/lib/dispatch/orchestrator";
import { apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await getOrchestratorState());
}

export async function POST() {
  return apiSuccess(await runOrchestratorPipeline(), { created: true });
}
