import { listNetworkOverflow } from "@/lib/data/overflow-repository";
import { apiSuccess } from "@/lib/api-response";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? undefined;
  const status = searchParams.get("status") ?? "active";
  const data = await listNetworkOverflow(
    q,
    status === "all" ? undefined : (status as "active" | "open" | "review" | "accepted" | "rejected"),
  );
  return apiSuccess(data, { total: data.length });
}
