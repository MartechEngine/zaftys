import { getTallyExportStatus, configureTally, exportTallyNow } from "@/lib/integrations/tally-repository";
import { apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await getTallyExportStatus());
}

export async function POST(request: Request) {
  let body: unknown = {};
  try {
    body = await request.json();
  } catch {
    // empty body is fine for configure
  }

  const action = String((body as { action?: string }).action ?? "").trim();
  if (action === "export") {
    return apiSuccess(await exportTallyNow());
  }

  return apiSuccess(await configureTally());
}
