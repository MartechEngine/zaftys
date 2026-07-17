import {
  createFuelTransaction,
  listFuelTransactions,
  validateCreateFuelTransactionInput,
} from "@/lib/fleet/fuel-repository";
import { apiError, apiSuccess } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return apiSuccess(await listFuelTransactions());
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.");
  }

  const parsed = validateCreateFuelTransactionInput(body);
  if ("error" in parsed) return apiError("VALIDATION_ERROR", parsed.error);

  const tx = await createFuelTransaction(parsed);
  return apiSuccess(tx, { created: true });
}
