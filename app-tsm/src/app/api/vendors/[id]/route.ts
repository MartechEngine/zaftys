import { getVendor } from "@/lib/vendors/vendor-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const result = await getVendor(id);
  if (!result) return apiError("VENDOR_NOT_FOUND", "Vendor not found.", 404);
  return apiSuccess(result);
}
