import { logActivity } from "@/lib/dev-store";

export type QuoteRecord = {
  id: string;
  client: string;
  route: string;
  tonnage: number;
  rate: string;
  rateInr: number;
  validUntil: string;
  status: "sent" | "draft" | "accepted" | "declined";
  shipmentId?: string;
};

const g = globalThis as typeof globalThis & {
  __tsmDevQuotes?: QuoteRecord[];
};

function getQuoteStore(): QuoteRecord[] {
  if (!g.__tsmDevQuotes) g.__tsmDevQuotes = [];
  return g.__tsmDevQuotes;
}

export function listStoredQuotes(): QuoteRecord[] {
  return [...getQuoteStore()];
}

export function replaceStoredQuotes(items: QuoteRecord[]) {
  g.__tsmDevQuotes = [...items];
}

function formatInr(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function createStoredQuote(input: {
  client: string;
  route: string;
  tonnage: number;
  rateInr?: number;
  status?: "sent" | "draft" | "accepted" | "declined";
  validDays?: number;
}): QuoteRecord {
  const store = getQuoteStore();
  const rateInr = input.rateInr ?? Math.round(input.tonnage * 420);
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + (input.validDays ?? 3));

  const quote: QuoteRecord = {
    id: `q-${Date.now().toString(36)}`,
    client: input.client.trim(),
    route: input.route.trim(),
    tonnage: input.tonnage,
    rate: formatInr(rateInr),
    rateInr,
    validUntil: validUntil.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    status: input.status ?? "draft",
  };

  store.unshift(quote);
  logActivity({
    shipmentId: "",
    type: "quote.created",
    message: `Quote for ${quote.client} · ${quote.route} · ${quote.rate}`,
    timestamp: new Date().toISOString(),
  });
  return quote;
}

export function updateStoredQuoteStatus(
  id: string,
  status: QuoteRecord["status"],
): QuoteRecord | undefined {
  const store = getQuoteStore();
  const quote = store.find((q) => q.id === id);
  if (!quote) return undefined;
  quote.status = status;
  return quote;
}

export function upsertStoredQuote(quote: QuoteRecord): QuoteRecord {
  const store = getQuoteStore();
  const idx = store.findIndex((q) => q.id === quote.id);
  if (idx >= 0) {
    store[idx] = { ...store[idx], ...quote };
    return store[idx];
  }
  store.unshift(quote);
  return quote;
}

export function patchStoredQuoteFields(
  id: string,
  patch: { tonnage?: number; rateInr?: number },
): QuoteRecord | undefined {
  const store = getQuoteStore();
  let quote = store.find((q) => q.id === id);
  if (!quote) return undefined;

  if (patch.tonnage != null) quote.tonnage = patch.tonnage;
  if (patch.rateInr != null) {
    quote.rateInr = patch.rateInr;
    quote.rate = formatInr(patch.rateInr);
  }

  logActivity({
    shipmentId: "",
    type: "quote.revised",
    message: `${id} · ${quote.tonnage} MT · ${quote.rate}`,
    timestamp: new Date().toISOString(),
  });
  return quote;
}

export function linkQuoteToShipment(id: string, shipmentId: string): QuoteRecord | undefined {
  const store = getQuoteStore();
  const quote = store.find((q) => q.id === id);
  if (!quote) return undefined;
  quote.status = "accepted";
  quote.shipmentId = shipmentId;
  logActivity({
    shipmentId,
    type: "quote.accepted",
    message: `Quote ${quote.id} accepted · shipment created`,
    timestamp: new Date().toISOString(),
  });
  return quote;
}
