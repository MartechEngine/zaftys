/**
 * LR lifecycle: generate / regenerate / void with audit (ADR-009).
 */

import {
  addShipmentDocument,
  getShipment,
  updateShipmentFields,
} from "@/lib/data/shipment-repository";
import {
  allocateLrNumber,
  appendLrAudit,
  type LrAuditAction,
} from "@/lib/documents/lr-audit-store";
import { buildLrPdf } from "@/lib/documents/lr-pdf";
import type { ShipmentDocument, ShipmentRecord } from "@/lib/dev-store";
import { getOrgProfile } from "@/lib/settings/org-repository";
import { isS3Configured, putObject } from "@/lib/storage/s3";
import { getExecutionStore, isLiveExecutionMode } from "@/lib/execution";

export type LrActionResult = {
  shipment: ShipmentRecord;
  lrNumber: string;
  documentId?: string;
  filename?: string;
  stored: boolean;
  action: LrAuditAction;
  downloadPath?: string;
};

function activeLrDocs(shipment: ShipmentRecord): ShipmentDocument[] {
  return (shipment.documents ?? []).filter(
    (d) => d.type === "lr" && !d.voidedAt,
  );
}

async function persistShipment(next: ShipmentRecord): Promise<ShipmentRecord> {
  if (!isLiveExecutionMode()) return next;
  const store = getExecutionStore();
  if (
    "putShipmentRecord" in store &&
    typeof (store as { putShipmentRecord?: unknown }).putShipmentRecord ===
      "function"
  ) {
    return (store as { putShipmentRecord: (r: ShipmentRecord) => Promise<ShipmentRecord> }).putShipmentRecord(
      next,
    );
  }
  return next;
}

async function persistAudit(row: ReturnType<typeof appendLrAudit>) {
  try {
    const { persistItem } = await import("@/lib/db/collections");
    await persistItem("tsm_lr_audit", row.id, row);
  } catch (e) {
    console.warn("[lr-audit] persist skipped", e);
  }
  try {
    const { persistItem } = await import("@/lib/db/collections");
    const { getLrSeriesSnapshot } = await import("@/lib/documents/lr-audit-store");
    await persistItem("tsm_lr_series", "series", getLrSeriesSnapshot());
  } catch {
    /* optional */
  }
}

export async function voidShipmentLr(input: {
  shipmentId: string;
  orgId: string;
  actorUserId: string;
  actorName?: string;
  reason?: string;
}): Promise<LrActionResult> {
  const shipment = await getShipment(input.shipmentId);
  if (!shipment) throw new Error("Shipment not found.");

  const active = activeLrDocs(shipment);
  if (active.length === 0) throw new Error("No active LR to void.");

  const stamp = new Date().toISOString();
  const reason = input.reason?.trim() || "Voided by user";
  const docs = (shipment.documents ?? []).map((d) => {
    if (d.type !== "lr" || d.voidedAt) return d;
    return {
      ...d,
      voidedAt: stamp,
      voidReason: reason,
      voidedBy: input.actorName ?? input.actorUserId,
      name: d.name.startsWith("VOIDED-") ? d.name : `VOIDED-${d.name}`,
    };
  });

  const next: ShipmentRecord = {
    ...shipment,
    documents: docs,
    updatedAt: stamp,
  };
  const saved = await persistShipment(next);

  const lrNumber = shipment.lrNumber || active[0]?.name.replace(/\.pdf$/i, "") || "—";
  const audit = appendLrAudit({
    orgId: input.orgId,
    shipmentId: input.shipmentId,
    action: "void",
    lrNumber,
    documentId: active[0]?.id,
    actorUserId: input.actorUserId,
    actorName: input.actorName,
    reason,
  });
  await persistAudit(audit);

  return {
    shipment: saved,
    lrNumber,
    documentId: active[0]?.id,
    stored: false,
    action: "void",
  };
}

export async function generateShipmentLr(input: {
  shipmentId: string;
  orgId: string;
  actorUserId: string;
  actorName?: string;
  /** regenerate allocates a new series number and voids prior active LRs */
  regenerate?: boolean;
  reason?: string;
}): Promise<LrActionResult> {
  let shipment = await getShipment(input.shipmentId);
  if (!shipment) throw new Error("Shipment not found.");

  const action: LrAuditAction = input.regenerate ? "regenerate" : "generate";

  if (input.regenerate) {
    const active = activeLrDocs(shipment);
    if (active.length > 0) {
      const voided = await voidShipmentLr({
        shipmentId: input.shipmentId,
        orgId: input.orgId,
        actorUserId: input.actorUserId,
        actorName: input.actorName,
        reason: input.reason?.trim() || "Superseded by regenerate",
      });
      shipment = voided.shipment;
    }
  }

  const hasActiveLr = activeLrDocs(shipment).length > 0;
  const lrNumber =
    input.regenerate || !shipment.lrNumber?.trim() || !hasActiveLr
      ? allocateLrNumber(input.orgId)
      : shipment.lrNumber.trim();

  const org = await getOrgProfile();
  const pdf = await buildLrPdf(shipment, {
    name: org.name,
    gstin: org.gstin,
    address: org.address,
  }, { lrNumber });

  try {
    await updateShipmentFields(input.shipmentId, { lrNumber: pdf.lrNumber });
  } catch (e) {
    console.warn("[lr] could not persist lrNumber", e);
  }

  const docId = `doc-lr-${Date.now()}`;
  const storageKey = `shipments/${input.shipmentId}/${docId}/${pdf.filename}`;
  let uploadedKey: string | undefined;

  if (isS3Configured()) {
    await putObject(storageKey, pdf.buffer, "application/pdf");
    uploadedKey = storageKey;
  }

  const updated = await addShipmentDocument(input.shipmentId, {
    id: docId,
    type: "lr",
    name: pdf.filename,
    storageKey: uploadedKey,
    contentType: "application/pdf",
    sizeBytes: pdf.buffer.length,
  });
  if (!updated) throw new Error("Could not attach LR document.");

  const audit = appendLrAudit({
    orgId: input.orgId,
    shipmentId: input.shipmentId,
    action,
    lrNumber: pdf.lrNumber,
    documentId: docId,
    actorUserId: input.actorUserId,
    actorName: input.actorName,
    reason: input.reason,
  });
  await persistAudit(audit);

  return {
    shipment: updated,
    lrNumber: pdf.lrNumber,
    documentId: docId,
    filename: pdf.filename,
    stored: Boolean(uploadedKey),
    action,
    downloadPath: uploadedKey
      ? `/api/documents/${docId}/download`
      : `/api/shipments/${input.shipmentId}/lr`,
  };
}
