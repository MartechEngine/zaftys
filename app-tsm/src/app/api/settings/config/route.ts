import {
  getSettingsHub,
  getDispatchSettings,
  getMapSettings,
  getBillingTemplateSettings,
  getSecuritySettings,
  getNotificationSettings,
  getRoutingSettings,
  getSchedulingSettings,
  getNavigatorAppSettings,
  getPaymentsSettings,
  getReportSchedules,
  getTrackingSettings,
  getPolicyBlocks,
  patchSettingsConfig,
  validatePatchConfigInput,
} from "@/lib/settings/config-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const section = new URL(request.url).searchParams.get("section") ?? "hub";

  switch (section) {
    case "hub":
      return apiSuccess(await getSettingsHub());
    case "dispatch":
      return apiSuccess(await getDispatchSettings());
    case "map":
      return apiSuccess(await getMapSettings());
    case "billing":
      return apiSuccess(await getBillingTemplateSettings());
    case "security":
      return apiSuccess(await getSecuritySettings());
    case "notifications":
      return apiSuccess(await getNotificationSettings());
    case "routing":
      return apiSuccess(await getRoutingSettings());
    case "scheduling":
      return apiSuccess(await getSchedulingSettings());
    case "navigator":
      return apiSuccess(await getNavigatorAppSettings());
    case "payments":
      return apiSuccess(await getPaymentsSettings());
    case "reports":
      return apiSuccess(await getReportSchedules());
    case "tracking":
      return apiSuccess(await getTrackingSettings());
    case "policies":
      return apiSuccess(await getPolicyBlocks());
    default:
      return apiError("UNKNOWN_SECTION", `Unknown settings section: ${section}`, 400);
  }
}

export async function PATCH(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = validatePatchConfigInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  const patched = await patchSettingsConfig(parsed.section, parsed.values);
  return apiSuccess({ section: parsed.section, values: patched });
}
