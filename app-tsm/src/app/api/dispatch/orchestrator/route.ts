import {
  applyOrchestratorProposal,
  dismissOrchestratorApplied,
  getOrchestratorState,
  runOrchestratorPipeline,
} from "@/lib/dispatch/orchestrator";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await getOrchestratorState());
}

export async function POST(request: Request) {
  let body: unknown = {};
  try {
    body = await request.json();
  } catch {
    /* empty body is fine for run */
  }

  const action = String((body as { action?: string }).action ?? "").trim();
  if (action === "apply") {
    const result = await applyOrchestratorProposal();
    if (!result) {
      return apiError("NO_PROPOSAL", "No orchestrator proposal to apply.", 404);
    }
    return apiSuccess(result, { created: true });
  }

  if (action === "dismiss") {
    const dismissed = dismissOrchestratorApplied();
    return apiSuccess({ dismissed });
  }

  return apiSuccess(await runOrchestratorPipeline(), { created: true });
}
