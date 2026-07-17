import { demoQuotes } from "@/lib/demo-data";
import { createShipment, fetchAllShipmentsRaw, getShipment } from "@/lib/data/shipment-repository";
import {
  createStoredQuote,
  linkQuoteToShipment,
  listStoredQuotes,
  updateStoredQuoteStatus,
  upsertStoredQuote,
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

function parseRoute(route: string) {
  const parts = route.split(/\s*→\s*|\s*-\s*/).map((p) => p.trim()).filter(Boolean);
  return {
    origin: parts[0] ?? "Unknown",
    destination: parts[1] ?? parts[0] ?? "Unknown",
  };
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

  const stored = listStoredQuotes();
  const storedIds = new Set(stored.map((q) => q.id));
  const merged = [
    ...stored,
    ...fromDemo.filter((q) => !storedIds.has(q.id)),
    ...fromPending.filter((q) => !storedIds.has(q.id)),
  ];
  const seen = new Set<string>();
  return merged.filter((q) => {
    if (seen.has(q.id)) return false;
    seen.add(q.id);
    return true;
  });
}

export async function getQuote(id: string): Promise<QuoteRecord | undefined> {
  return (await listQuotes()).find((q) => q.id === id);
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
  if (status === "accepted") {
    const result = await acceptQuote(id);
    return result?.quote;
  }

  const stored = updateStoredQuoteStatus(id, status);
  if (stored) return stored;

  const found = await getQuote(id);
  if (!found) return undefined;

  return upsertStoredQuote({ ...found, status });
}

export async function acceptQuote(id: string) {
  const existing = await getQuote(id);
  if (!existing) return null;

  if (existing.status === "accepted" && existing.shipmentId) {
    const shipment = await getShipment(existing.shipmentId);
    return shipment ? { quote: existing, shipment } : null;
  }

  if (existing.shipmentId && existing.id.startsWith("q-ship-")) {
    const shipment = await getShipment(existing.shipmentId);
    if (!shipment) return null;
    const quote = upsertStoredQuote({
      ...existing,
      status: "accepted",
      shipmentId: shipment.id,
    });
    return { quote, shipment };
  }

  const { origin, destination } = parseRoute(existing.route);
  const shipment = await createShipment({
    client: existing.client,
    origin,
    destination,
    commodity: "Quoted freight",
    tonnageMt: existing.tonnage,
    originType: "fleet",
  });
  if (!shipment) return null;

  upsertStoredQuote({ ...existing, status: "accepted", shipmentId: shipment.id });
  const quote = linkQuoteToShipment(existing.id, shipment.id) ?? {
    ...existing,
    status: "accepted" as const,
    shipmentId: shipment.id,
  };
  return { quote, shipment };
}
