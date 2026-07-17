import { getTallyExportStatus } from "@/lib/integrations/tally-repository";
import { apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await getTallyExportStatus());
}
