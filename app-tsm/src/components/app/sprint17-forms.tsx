"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api-client";
import { ConfigFieldForm } from "@/components/app/sprint13-forms";

export { ConfigFieldForm };

export function ImportShipmentsCsvButton() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function onFile(file: File) {
    setBusy(true);
    try {
      const csv = await file.text();
      const result = await api.importShipmentsCsv(csv);
      toast.success(`Imported ${result.created} shipment${result.created === 1 ? "" : "s"}`);
      if (result.skipped > 0) {
        toast.message(`${result.skipped} row(s) skipped`);
      }
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Import failed.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void onFile(file);
        }}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
      >
        {busy ? "Importing…" : "Import CSV"}
      </Button>
    </>
  );
}

export function DeclineQuoteButton({
  quoteId,
  status,
}: {
  quoteId: string;
  status: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  if (status === "declined" || status === "accepted") return null;

  async function onClick() {
    if (!window.confirm("Decline this quote?")) return;
    setBusy(true);
    try {
      await api.updateQuoteStatus(quoteId, "declined");
      toast.success("Quote declined");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not decline quote.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Decline"}
    </Button>
  );
}

export function RescheduleShipmentButton({
  shipmentId,
  eta,
}: {
  shipmentId: string;
  eta?: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    const nextEta = window.prompt("New ETA", eta ?? "Tomorrow, 10:00 AM")?.trim();
    if (!nextEta) return;
    const scheduledAt = window.prompt("Scheduled date (ISO)", new Date().toISOString())?.trim();
    if (!scheduledAt) return;
    setBusy(true);
    try {
      await api.rescheduleShipment(shipmentId, { eta: nextEta, scheduledAt });
      toast.success("Dispatch rescheduled");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not reschedule.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Reschedule"}
    </Button>
  );
}

export function SyncPlaceGeofenceButton({
  id,
  geofence,
}: {
  id: string;
  geofence: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    setBusy(true);
    try {
      await api.syncPlaceGeofence(id);
      toast.success(`Geofence synced (${geofence})`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not sync geofence.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "Syncing…" : "Sync geofence"}
    </Button>
  );
}

export function DeleteOrgRoleButton({
  id,
  name,
}: {
  id: string;
  name: string;
  type?: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  if (!id.startsWith("role-")) return null;

  async function onClick() {
    if (!window.confirm(`Delete role "${name}"?`)) return;
    setBusy(true);
    try {
      await api.deleteOrgRole(id);
      toast.success("Role deleted");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete role.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Delete"}
    </Button>
  );
}

export function ResendOrgUserInviteButton({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  if (status !== "pending") return null;

  async function onClick() {
    setBusy(true);
    try {
      await api.resendOrgUserInvite(id);
      toast.success("Invite resent");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not resend invite.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Resend invite"}
    </Button>
  );
}

export function CreatePartForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [stock, setStock] = useState("0");
  const [reorder, setReorder] = useState("4");
  const [location, setLocation] = useState("Main depot");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await api.createPart({
        sku: sku.trim(),
        name: name.trim(),
        stock: Number(stock),
        reorder: Number(reorder),
        location: location.trim(),
      });
      toast.success("Part SKU created");
      setOpen(false);
      setSku("");
      setName("");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create part.");
    } finally {
      setBusy(false);
    }
  }

  if (!open) {
    return (
      <Button variant="accent" size="sm" onClick={() => setOpen(true)}>
        New SKU
      </Button>
    );
  }

  return (
    <form className="flex flex-wrap items-end gap-2" onSubmit={onSubmit}>
      <label className="block text-sm">
        <span className="text-muted-foreground">SKU</span>
        <Input className="mt-1 w-36" value={sku} onChange={(e) => setSku(e.target.value)} required />
      </label>
      <label className="block text-sm">
        <span className="text-muted-foreground">Part name</span>
        <Input className="mt-1 w-48" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label className="block text-sm">
        <span className="text-muted-foreground">Stock</span>
        <Input className="mt-1 w-20" type="number" min={0} value={stock} onChange={(e) => setStock(e.target.value)} />
      </label>
      <label className="block text-sm">
        <span className="text-muted-foreground">Reorder at</span>
        <Input className="mt-1 w-20" type="number" min={0} value={reorder} onChange={(e) => setReorder(e.target.value)} />
      </label>
      <label className="block text-sm">
        <span className="text-muted-foreground">Location</span>
        <Input className="mt-1 w-36" value={location} onChange={(e) => setLocation(e.target.value)} />
      </label>
      <Button type="submit" size="sm" disabled={busy}>
        {busy ? "Creating…" : "Create"}
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={() => setOpen(false)}>
        Cancel
      </Button>
    </form>
  );
}

export function LinkFaultWorkOrderButton({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  if (status !== "open") return null;

  async function onClick() {
    setBusy(true);
    try {
      const result = await api.linkFaultWorkOrder(id);
      toast.success(`Work order ${result.workOrder.id} created`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not link work order.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Link WO"}
    </Button>
  );
}

export function ShipmentsExportButton({ path }: { path: string }) {
  const [busy, setBusy] = useState(false);

  async function onClick() {
    setBusy(true);
    try {
      const res = await fetch(path, { cache: "no-store" });
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `shipments-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("CSV downloaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not export CSV.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button type="button" variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "Exporting…" : "Export CSV"}
    </Button>
  );
}
