import { createShipment } from "@/lib/data/shipment-repository";
import type { CreateShipmentInput } from "@/lib/shipments/create-shipment";
import { logActivity } from "@/lib/dev-store";

export type ImportShipmentRow = {
  client: string;
  origin: string;
  destination: string;
  commodity: string;
  tonnageMt: number;
  lrNumber?: string;
};

export type ImportShipmentsResult = {
  created: number;
  skipped: number;
  errors: string[];
  ids: string[];
};

function parseCsvLine(line: string): string[] {
  const cells: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        current += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      cells.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  cells.push(current.trim());
  return cells;
}

function headerIndex(headers: string[], ...names: string[]) {
  const lower = headers.map((h) => h.toLowerCase().replace(/\s+/g, "_"));
  for (const name of names) {
    const idx = lower.indexOf(name.toLowerCase());
    if (idx >= 0) return idx;
  }
  return -1;
}

export function parseImportCsv(csv: string): ImportShipmentRow[] | { error: string } {
  const lines = csv
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length < 2) return { error: "CSV must include a header row and at least one data row." };

  const headers = parseCsvLine(lines[0]);
  const clientIdx = headerIndex(headers, "client");
  const originIdx = headerIndex(headers, "origin");
  const destIdx = headerIndex(headers, "destination");
  const commodityIdx = headerIndex(headers, "commodity");
  const tonnageIdx = headerIndex(headers, "tonnage_mt", "tonnage");

  if (clientIdx < 0 || originIdx < 0 || destIdx < 0 || commodityIdx < 0 || tonnageIdx < 0) {
    return {
      error: "CSV header must include client, origin, destination, commodity, tonnage_mt.",
    };
  }

  const lrIdx = headerIndex(headers, "lr_number", "lr");

  const rows: ImportShipmentRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cells = parseCsvLine(lines[i]);
    const client = cells[clientIdx]?.trim();
    const origin = cells[originIdx]?.trim();
    const destination = cells[destIdx]?.trim();
    const commodity = cells[commodityIdx]?.trim();
    const tonnageMt = Number(cells[tonnageIdx]);
    if (!client || !origin || !destination || !commodity) continue;
    if (!Number.isFinite(tonnageMt) || tonnageMt <= 0) continue;
    rows.push({
      client,
      origin,
      destination,
      commodity,
      tonnageMt,
      lrNumber: lrIdx >= 0 ? cells[lrIdx]?.trim() || undefined : undefined,
    });
  }

  if (rows.length === 0) return { error: "No valid shipment rows found in CSV." };
  return rows;
}

export function validateImportBody(body: unknown):
  | { rows: ImportShipmentRow[] }
  | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const data = body as Record<string, unknown>;

  if (typeof data.csv === "string" && data.csv.trim()) {
    const parsed = parseImportCsv(data.csv);
    if ("error" in parsed) return parsed;
    return { rows: parsed };
  }

  if (Array.isArray(data.rows)) {
    const rows: ImportShipmentRow[] = [];
    for (const row of data.rows) {
      if (!row || typeof row !== "object") continue;
      const r = row as Record<string, unknown>;
      const client = String(r.client ?? "").trim();
      const origin = String(r.origin ?? "").trim();
      const destination = String(r.destination ?? "").trim();
      const commodity = String(r.commodity ?? "").trim();
      const tonnageMt = Number(r.tonnageMt ?? r.tonnage_mt);
      if (!client || !origin || !destination || !commodity) continue;
      if (!Number.isFinite(tonnageMt) || tonnageMt <= 0) continue;
      rows.push({
        client,
        origin,
        destination,
        commodity,
        tonnageMt,
        lrNumber: r.lrNumber ? String(r.lrNumber).trim() : undefined,
      });
    }
    if (rows.length === 0) return { error: "Provide at least one valid row." };
    return { rows };
  }

  return { error: "Provide csv text or rows array." };
}

export async function importShipments(rows: ImportShipmentRow[]): Promise<ImportShipmentsResult> {
  const result: ImportShipmentsResult = {
    created: 0,
    skipped: 0,
    errors: [],
    ids: [],
  };

  for (const [index, row] of rows.entries()) {
    const input: CreateShipmentInput = {
      client: row.client,
      origin: row.origin,
      destination: row.destination,
      commodity: row.commodity,
      tonnageMt: row.tonnageMt,
      lrNumber: row.lrNumber,
      originType: "fleet",
    };
    try {
      const shipment = await createShipment(input);
      if (!shipment) {
        result.skipped += 1;
        result.errors.push(`Row ${index + 1}: create failed`);
        continue;
      }
      result.created += 1;
      result.ids.push(shipment.id);
    } catch (e) {
      result.skipped += 1;
      result.errors.push(
        `Row ${index + 1}: ${e instanceof Error ? e.message : "create failed"}`,
      );
    }
  }

  logActivity({
    shipmentId: "",
    type: "shipments.imported",
    message: `${result.created} created · ${result.skipped} skipped`,
    timestamp: new Date().toISOString(),
  });

  return result;
}
