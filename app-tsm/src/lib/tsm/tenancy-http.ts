import { apiError } from "@/lib/api-response";
import { TenancyError, tenancyHttpStatus } from "@/lib/tsm/tenancy";

/** If `e` is TenancyError, return API error response; else null. */
export function tenancyApiError(e: unknown) {
  if (e instanceof TenancyError) {
    return apiError(e.code, e.message, tenancyHttpStatus(e.code));
  }
  return null;
}
