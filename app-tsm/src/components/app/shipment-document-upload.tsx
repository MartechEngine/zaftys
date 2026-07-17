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
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      toast.error("Choose a file to upload.");
      return;
    }
    setBusy(true);
    try {
      const updated = await api.uploadShipmentDocumentFile(shipmentId, { type, file });
      onUploaded(updated);
      setFile(null);
      toast.success("Document uploaded.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3 border-t border-white/10 pt-4">
      <p className="text-xs text-muted-foreground">
        Attach LR, ePOD, or weighbridge slip — file is stored when object storage is configured.
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
          <span className="text-label">File</span>
          <input
            type="file"
            required
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-sm outline-none file:mr-3 file:rounded file:border-0 file:bg-white/10 file:px-3 file:py-1 file:text-sm focus:border-primary/40"
          />
          {file ? (
            <p className="mt-1 text-xs text-muted-foreground">{file.name}</p>
          ) : null}
        </label>
      </div>
      <Button type="submit" variant="accent" size="sm" disabled={busy}>
        <Upload className="mr-2 size-4" />
        {busy ? "Uploading…" : "Add document"}
      </Button>
    </form>
  );
}
