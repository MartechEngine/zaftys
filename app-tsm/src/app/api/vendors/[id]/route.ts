import {
  getVendor,
  patchVendor,
  validatePatchVendorInput,
} from "@/lib/vendors/vendor-repository";
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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = validatePatchVendorInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  const result = await patchVendor(id, parsed);
  if (!result) return apiError("VENDOR_NOT_FOUND", "Vendor not found.", 404);
  return apiSuccess(result.vendor);
}
