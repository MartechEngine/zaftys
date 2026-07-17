"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api-client";
import { ConfigFieldForm } from "@/components/app/sprint17-forms";

export { ConfigFieldForm };

export function ApplyOrchestratorButton({
  disabled,
}: {
  shipmentId?: string;
  disabled?: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    if (!window.confirm("Apply the proposed dispatch plan?")) return;
    setBusy(true);
    try {
      const result = await api.applyOrchestratorPlan();
      toast.success(`Plan applied · ${result.shipment.publicId} dispatched`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not apply plan.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="accent" size="sm" onClick={onClick} disabled={busy || disabled}>
      {busy ? "Applying…" : "Apply plan"}
    </Button>
  );
}

export function RescheduleDriverEventButton({
  shipmentId,
  time,
}: {
  shipmentId: string;
  time?: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    const nextEta = window.prompt("New ETA", time ?? "Tomorrow, 10:00 AM")?.trim();
    if (!nextEta) return;
    const scheduledAt = window.prompt("Scheduled date (ISO)", new Date().toISOString())?.trim();
    if (!scheduledAt) return;
    setBusy(true);
    try {
      await api.rescheduleShipment(shipmentId, { eta: nextEta, scheduledAt });
      toast.success("Trip rescheduled");
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

export function ReviseQuoteButton({
  quoteId,
  status,
  tonnage,
  rateInr,
}: {
  quoteId: string;
  status: string;
  tonnage: number;
  rateInr: number;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  if (status === "accepted" || status === "declined") return null;

  async function onClick() {
    const nextTonnage = window.prompt("Tonnage (MT)", String(tonnage))?.trim();
    if (!nextTonnage) return;
    const nextRate = window.prompt("Rate (INR)", String(rateInr))?.trim();
    if (!nextRate) return;
    setBusy(true);
    try {
      await api.reviseQuote(quoteId, {
        tonnage: Number(nextTonnage),
        rateInr: Number(nextRate),
      });
      toast.success("Quote revised");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not revise quote.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Revise"}
    </Button>
  );
}

export function EditPartReorderButton({
  id,
  reorder,
  location,
}: {
  id: string;
  reorder: number;
  location: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    const nextReorder = window.prompt("Reorder threshold", String(reorder))?.trim();
    if (!nextReorder) return;
    const nextLocation = window.prompt("Storage location", location)?.trim();
    if (!nextLocation) return;
    setBusy(true);
    try {
      await api.patchPartMeta(id, {
        reorder: Number(nextReorder),
        location: nextLocation,
      });
      toast.success("Reorder settings updated");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update part.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Edit reorder"}
    </Button>
  );
}

export function CreateFaultForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [vehicle, setVehicle] = useState("");
  const [driver, setDriver] = useState("");
  const [issue, setIssue] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await api.createFault({
        vehicle: vehicle.trim(),
        driver: driver.trim(),
        issue: issue.trim(),
      });
      toast.success("Fault report logged");
      setOpen(false);
      setVehicle("");
      setDriver("");
      setIssue("");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create fault.");
    } finally {
      setBusy(false);
    }
  }

  if (!open) {
    return (
      <Button variant="accent" size="sm" onClick={() => setOpen(true)}>
        Log fault
      </Button>
    );
  }

  return (
    <form className="flex flex-wrap items-end gap-2" onSubmit={onSubmit}>
      <label className="block text-sm">
        <span className="text-muted-foreground">Vehicle</span>
        <Input
          className="mt-1 w-36 font-mono text-xs"
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
          placeholder="MH-27-AB-1234"
          required
        />
      </label>
      <label className="block text-sm">
        <span className="text-muted-foreground">Driver</span>
        <Input className="mt-1 w-32" value={driver} onChange={(e) => setDriver(e.target.value)} required />
      </label>
      <label className="block text-sm">
        <span className="text-muted-foreground">Issue</span>
        <Input className="mt-1 w-48" value={issue} onChange={(e) => setIssue(e.target.value)} required />
      </label>
      <Button type="submit" size="sm" disabled={busy}>
        {busy ? "Saving…" : "Create"}
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={() => setOpen(false)}>
        Cancel
      </Button>
    </form>
  );
}

export function AssignNetworkShipmentButton({
  shipmentId,
  driver,
}: {
  shipmentId?: string;
  driver?: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  if (!shipmentId || driver) return null;

  async function onClick() {
    setBusy(true);
    try {
      await api.assignShipment(shipmentId!, "d1", "v1");
      toast.success("Driver assigned to network load");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not assign driver.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Assign driver"}
    </Button>
  );
}
