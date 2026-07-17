"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api-client";
import { ConfigFieldForm } from "@/components/app/sprint13-forms";

export { ConfigFieldForm };

export function AssignVehicleDriverButton({
  vehicleId,
  driver,
}: {
  vehicleId: string;
  driver?: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const assigned = Boolean(driver);

  async function onClick() {
    if (assigned) {
      if (!window.confirm("Unassign driver from this vehicle?")) return;
      setBusy(true);
      try {
        await api.patchVehicleDriver(vehicleId, null);
        toast.success("Driver unassigned");
        router.refresh();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Could not unassign.");
      } finally {
        setBusy(false);
      }
      return;
    }

    const next = window.prompt("Driver ID (e.g. d1)", "d1")?.trim();
    if (!next) return;
    setBusy(true);
    try {
      await api.patchVehicleDriver(vehicleId, next);
      toast.success("Driver assigned");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not assign driver.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : assigned ? "Unassign driver" : "Assign driver"}
    </Button>
  );
}

export function EditReportScheduleCadenceButton({
  id,
  cadence,
}: {
  id: string;
  cadence: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    const next = window.prompt("Cadence", cadence)?.trim();
    if (!next || next === cadence) return;
    setBusy(true);
    try {
      await api.patchReportSchedule(id, { cadence: next });
      toast.success("Schedule updated");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update schedule.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Edit cadence"}
    </Button>
  );
}

export function DeleteGeofenceButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    if (!window.confirm(`Delete geofence "${name}"?`)) return;
    setBusy(true);
    try {
      await api.deleteGeofence(id);
      toast.success("Geofence deleted");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete geofence.");
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

export function ExportReportCsvButton({
  path,
  filename,
}: {
  path: string;
  filename: string;
}) {
  const [busy, setBusy] = useState(false);

  async function onClick() {
    setBusy(true);
    try {
      const res = await fetch(`${path}?format=csv`, { cache: "no-store" });
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}-${new Date().toISOString().slice(0, 10)}.csv`;
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
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "Exporting…" : "Export CSV"}
    </Button>
  );
}

export function AddFleetGroupMemberButton({ groupId }: { groupId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    const driver = window.prompt("Driver name")?.trim();
    if (!driver) return;
    const vehicle = window.prompt("Vehicle registration")?.trim();
    if (!vehicle) return;
    setBusy(true);
    try {
      await api.addFleetGroupMember(groupId, { driver, vehicle });
      toast.success("Member added");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add member.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Add member"}
    </Button>
  );
}

export function CheckFleetbaseHealthButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    setBusy(true);
    try {
      const detail = await api.checkFleetbaseHealth();
      const msg =
        detail.latencyMs != null
          ? `Health OK · ${detail.latencyMs}ms`
          : detail.reachable
            ? "Health OK"
            : "Unreachable (demo fallback)";
      toast.success(msg);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Health check failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "Checking…" : "Run health check"}
    </Button>
  );
}

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    setBusy(true);
    try {
      await api.requestPasswordReset(trimmed);
      setSent(true);
      toast.success("Reset link sent (demo stub)");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send reset link.");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <p className="mt-4 text-sm text-emerald-700">
        If an account exists for {email}, a reset link has been queued (local demo).
      </p>
    );
  }

  return (
    <form className="mt-8 space-y-4" onSubmit={onSubmit}>
      <label className="block text-sm">
        <span className="text-muted-foreground">Email</span>
        <Input
          type="email"
          className="mt-1"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <Button type="submit" className="w-full" disabled={busy}>
        {busy ? "Sending…" : "Send reset link"}
      </Button>
    </form>
  );
}

export function CreateLedgerAccountForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState<"Income" | "Expense" | "Asset" | "Liability">("Expense");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createLedgerAccount({ code: code.trim(), name: name.trim(), type });
      toast.success("Account created");
      setCode("");
      setName("");
      setOpen(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create account.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button variant="accent" size="sm" onClick={() => setOpen(true)}>
        Add account
      </Button>
    );
  }

  return (
    <form className="flex flex-wrap items-end gap-2" onSubmit={onSubmit}>
      <label className="block text-sm">
        <span className="text-muted-foreground">Code</span>
        <Input className="mt-1 w-24 font-mono" value={code} onChange={(e) => setCode(e.target.value)} required />
      </label>
      <label className="block text-sm">
        <span className="text-muted-foreground">Name</span>
        <Input className="mt-1 w-48" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label className="block text-sm">
        <span className="text-muted-foreground">Type</span>
        <select
          className="mt-1 block w-32 rounded-md border border-input bg-background px-2 py-2 text-sm"
          value={type}
          onChange={(e) => setType(e.target.value as typeof type)}
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
          <option value="Asset">Asset</option>
          <option value="Liability">Liability</option>
        </select>
      </label>
      <Button type="submit" size="sm" disabled={submitting}>
        {submitting ? "Saving…" : "Save"}
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>
        Cancel
      </Button>
    </form>
  );
}
