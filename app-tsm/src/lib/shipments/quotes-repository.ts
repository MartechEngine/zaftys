import { demoQuotes } from "@/lib/demo-data";
import { fetchAllShipmentsRaw } from "@/lib/data/shipment-repository";
import {
  createStoredQuote,
  listStoredQuotes,
  updateStoredQuoteStatus,
  type QuoteRecord,
} from "@/lib/shipments/quotes-store";

export type { QuoteRecord };

export type CreateQuoteInput = {
  client: string;
  origin: string;
  destination: string;
  tonnage: number;
  rateInr?: number;
  status?: "sent" | "draft";
};

function formatInr(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function formatValidUntil(iso: string) {
  const d = new Date(iso);
  d.setDate(d.getDate() + 3);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function validateCreateQuoteInput(body: unknown): CreateQuoteInput | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;
  const client = String(data.client ?? "").trim();
  const origin = String(data.origin ?? "").trim();
  const destination = String(data.destination ?? "").trim();
  const tonnage = Number(data.tonnage);
  const rateInr = data.rateInr != null ? Number(data.rateInr) : undefined;
  const status = data.status === "sent" ? "sent" : "draft";

  if (!client) return { error: "Client is required." };
  if (!origin || !destination) return { error: "Origin and destination are required." };
  if (!Number.isFinite(tonnage) || tonnage <= 0) return { error: "Tonnage must be > 0." };
  if (rateInr != null && (!Number.isFinite(rateInr) || rateInr < 0)) {
    return { error: "Rate must be a non-negative number." };
  }

  return { client, origin, destination, tonnage, rateInr, status };
}

export async function listQuotes(): Promise<QuoteRecord[]> {
  const shipments = await fetchAllShipmentsRaw();

  const fromPending: QuoteRecord[] = shipments
    .filter((s) => s.status === "pending" && !s.driver)
    .slice(0, 3)
    .map((s) => {
      const rateInr = s.tonnageMt * 420;
      return {
        id: `q-ship-${s.id}`,
        client: s.client,
        route: `${s.origin} → ${s.destination}`,
        tonnage: s.tonnageMt,
        rate: formatInr(rateInr),
        rateInr,
        validUntil: formatValidUntil(s.updatedAt),
        status: "draft" as const,
        shipmentId: s.id,
      };
    });

  const fromDemo: QuoteRecord[] = demoQuotes.map((q) => ({
    ...q,
    rateInr: parseInt(q.rate.replace(/[^\d]/g, ""), 10) || 0,
  }));

  const merged = [...listStoredQuotes(), ...fromDemo, ...fromPending];
  const seen = new Set<string>();
  return merged.filter((q) => {
    if (seen.has(q.id)) return false;
    seen.add(q.id);
    return true;
  });
}

export async function createQuote(input: CreateQuoteInput): Promise<QuoteRecord> {
  return createStoredQuote({
    client: input.client,
    route: `${input.origin} → ${input.destination}`,
    tonnage: input.tonnage,
    rateInr: input.rateInr,
    status: input.status,
  });
}

export async function updateQuoteStatus(
  id: string,
  status: QuoteRecord["status"],
): Promise<QuoteRecord | undefined> {
  const stored = updateStoredQuoteStatus(id, status);
  if (stored) return stored;

  const all = await listQuotes();
  const found = all.find((q) => q.id === id);
  if (!found) return undefined;

  // Demo / derived quotes: promote into store with new status
  return createStoredQuote({
    client: found.client,
    route: found.route,
    tonnage: found.tonnage,
    rateInr: found.rateInr,
    status,
  });
}
