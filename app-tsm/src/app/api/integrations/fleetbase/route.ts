import {
  getFleetbaseIntegrationDetail,
  rotateFleetbaseKey,
  runFleetbaseHealthCheck,
} from "@/lib/integrations/integrations-repository";
import { apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await getFleetbaseIntegrationDetail());
}

export async function POST(request: Request) {
  let body: unknown = {};
  try {
    body = await request.json();
  } catch {
    // empty body is fine for rotate key
  }

  const action = String((body as { action?: string }).action ?? "").trim();
  if (action === "health") {
    return apiSuccess(await runFleetbaseHealthCheck());
  }

  return apiSuccess(await rotateFleetbaseKey());
}
