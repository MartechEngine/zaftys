import type { ShipmentDocument, ShipmentRecord } from "@/lib/dev-store";

export type DocumentLibraryEntry = {
  id: string;
  name: string;
  type: ShipmentDocument["type"];
  typeLabel: string;
  shipmentId: string;
  shipmentPublicId: string;
  client: string;
  uploadedAt: string;
  uploadedLabel: string;
};

const TYPE_LABELS: Record<ShipmentDocument["type"], string> = {
  lr: "LR",
  epod: "ePOD",
  invoice: "Invoice",
  other: "Other",
};

function formatUploadedLabel(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function flattenShipmentDocuments(shipments: ShipmentRecord[]): DocumentLibraryEntry[] {
  const entries: DocumentLibraryEntry[] = [];

  for (const shipment of shipments) {
    for (const doc of shipment.documents) {
      entries.push({
        id: doc.id,
        name: doc.name,
        type: doc.type,
        typeLabel: TYPE_LABELS[doc.type],
        shipmentId: shipment.id,
        shipmentPublicId: shipment.publicId,
        client: shipment.client,
        uploadedAt: doc.uploadedAt,
        uploadedLabel: formatUploadedLabel(doc.uploadedAt),
      });
    }
  }

  return entries.sort(
    (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
  );
}

export function filterDocumentLibrary(
  entries: DocumentLibraryEntry[],
  filters?: { q?: string; type?: string },
) {
  let result = entries;

  const type = filters?.type?.trim().toLowerCase();
  if (type && type !== "all") {
    result = result.filter((d) => d.type === type);
  }

  const needle = filters?.q?.trim().toLowerCase();
  if (needle) {
    result = result.filter((d) => {
      const haystack = [d.name, d.typeLabel, d.shipmentPublicId, d.client]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }

  return result;
}
