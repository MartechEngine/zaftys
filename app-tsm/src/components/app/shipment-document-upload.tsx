"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";
import type { ShipmentRecord } from "@/lib/dev-store";

const TYPES = [
  { value: "lr", label: "LR" },
  { value: "epod", label: "ePOD" },
  { value: "invoice", label: "Invoice" },
  { value: "other", label: "Other" },
] as const;

export function ShipmentDocumentUpload({
  shipmentId,
  onUploaded,
}: {
  shipmentId: string;
  onUploaded: (shipment: ShipmentRecord) => void;
}) {
  const [type, setType] = useState<(typeof TYPES)[number]["value"]>("lr");
  const [fileName, setFileName] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = fileName.trim();
    if (!name) {
      toast.error("Enter a file name.");
      return;
    }
    setBusy(true);
    try {
      const updated = await api.uploadShipmentDocument(shipmentId, { type, name });
      onUploaded(updated);
      setFileName("");
      toast.success("Document added.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3 border-t border-white/10 pt-4">
      <p className="text-xs text-muted-foreground">
        Attach LR, ePOD, or weighbridge slip (metadata stored; file storage in P3).
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-label">Type</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as (typeof TYPES)[number]["value"])}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-sm outline-none focus:border-primary/40"
          >
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="text-label">File name</span>
          <input
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="LR-2026-8891.pdf"
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-sm outline-none placeholder:text-subtle focus:border-primary/40"
          />
        </label>
      </div>
      <Button type="submit" variant="accent" size="sm" disabled={busy}>
        <Upload className="mr-2 size-4" />
        {busy ? "Uploading…" : "Add document"}
      </Button>
    </form>
  );
}
