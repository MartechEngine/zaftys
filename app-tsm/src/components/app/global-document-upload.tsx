"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";

const TYPES = [
  { value: "lr", label: "LR" },
  { value: "epod", label: "ePOD" },
  { value: "invoice", label: "Invoice" },
  { value: "other", label: "Weighbridge / other" },
] as const;

export function GlobalDocumentUpload({
  shipments,
}: {
  shipments: { id: string; publicId: string; client: string }[];
}) {
  const router = useRouter();
  const [shipmentId, setShipmentId] = useState(shipments[0]?.id ?? "");
  const [type, setType] = useState<(typeof TYPES)[number]["value"]>("lr");
  const [fileName, setFileName] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!shipmentId) {
      toast.error("Select a shipment.");
      return;
    }
    const name = fileName.trim();
    if (!name) {
      toast.error("Enter a file name.");
      return;
    }
    setBusy(true);
    try {
      await api.uploadShipmentDocument(shipmentId, { type, name });
      toast.success("Document added.");
      router.push("/documents");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-sm">
        <span className="text-muted-foreground">Shipment</span>
        <select
          value={shipmentId}
          onChange={(e) => setShipmentId(e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-sm outline-none focus:border-primary/40"
        >
          {shipments.length === 0 ? (
            <option value="">No shipments available</option>
          ) : (
            shipments.map((s) => (
              <option key={s.id} value={s.id}>
                {s.publicId} · {s.client}
              </option>
            ))
          )}
        </select>
      </label>

      <label className="block text-sm">
        <span className="text-muted-foreground">Document type</span>
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
        <span className="text-muted-foreground">File name</span>
        <input
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="LR-2026-8891.pdf"
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-sm outline-none placeholder:text-subtle focus:border-primary/40"
        />
      </label>

      <div className="rounded-lg border border-dashed border-white/15 px-6 py-10 text-center text-sm text-muted-foreground">
        Drop file here or enter a file name above (blob storage in P3).
      </div>

      <div className="flex gap-2">
        <Button type="submit" variant="accent" disabled={busy || !shipments.length}>
          <Upload className="mr-2 size-4" />
          {busy ? "Uploading…" : "Upload"}
        </Button>
        <Button type="button" variant="outline" disabled={busy} onClick={() => router.push("/documents")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
