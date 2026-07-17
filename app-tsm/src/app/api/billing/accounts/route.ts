import {
  createLedgerAccount,
  listLedgerAccounts,
  validateCreateLedgerAccountInput,
} from "@/lib/billing/accounts-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await listLedgerAccounts());
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = validateCreateLedgerAccountInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  return apiSuccess(await createLedgerAccount(parsed), { created: true });
}
