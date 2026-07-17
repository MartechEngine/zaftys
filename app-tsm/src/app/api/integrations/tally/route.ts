import { getTallyExportStatus, configureTally } from "@/lib/integrations/tally-repository";
import { apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await getTallyExportStatus());
}

export async function POST() {
  return apiSuccess(await configureTally());
}
