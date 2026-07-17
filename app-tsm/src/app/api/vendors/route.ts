import {
  createVendor,
  listVendors,
  validateCreateVendorInput,
} from "@/lib/vendors/vendor-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? undefined;
  return apiSuccess(await listVendors(q));
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = validateCreateVendorInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  try {
    const vendor = await createVendor(parsed);
    return apiSuccess(vendor, { created: true });
  } catch (e) {
    return apiError(
      "CREATE_FAILED",
      e instanceof Error ? e.message : "Could not create vendor.",
      409,
    );
  }
}
