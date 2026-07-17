import {
  createAutomationRule,
  listAutomationRules,
  setAutomationRuleEnabled,
  validateCreateAutomationInput,
} from "@/lib/settings/automation-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await listAutomationRules());
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = validateCreateAutomationInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  return apiSuccess(await createAutomationRule(parsed), { created: true });
}

export async function PATCH(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const data = body as { id?: string; enabled?: boolean };
  const id = String(data.id ?? "").trim();
  if (!id) return apiError("VALIDATION_ERROR", "id is required.");
  if (typeof data.enabled !== "boolean") {
    return apiError("VALIDATION_ERROR", "enabled must be a boolean.");
  }

  const rule = await setAutomationRuleEnabled(id, data.enabled);
  if (!rule) return apiError("RULE_NOT_FOUND", "Automation rule not found.", 404);
  return apiSuccess(rule);
}
