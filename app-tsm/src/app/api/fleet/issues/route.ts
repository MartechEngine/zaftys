import {
  createFleetIssue,
  listFleetIssues,
  resolveFleetIssue,
  validateCreateIssueInput,
} from "@/lib/fleet/compliance-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await listFleetIssues());
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = validateCreateIssueInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);
  const issue = await createFleetIssue(parsed);
  return apiSuccess(issue);
}

export async function PATCH(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const data = body as Record<string, unknown>;
  const id = String(data.id ?? "").trim();
  const action = String(data.action ?? "resolve").trim();
  if (!id) return apiError("VALIDATION_ERROR", "id is required.");
  if (action !== "resolve") {
    return apiError("VALIDATION_ERROR", "Only action=resolve is supported.");
  }

  const issue = await resolveFleetIssue(id);
  if (!issue) return apiError("ISSUE_NOT_FOUND", "Issue not found.", 404);
  return apiSuccess(issue);
}
