"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api-client";

export function SendQuoteButton({
  quoteId,
  status,
}: {
  quoteId: string;
  status: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  if (status !== "draft") return null;

  async function onClick() {
    setBusy(true);
    try {
      await api.updateQuoteStatus(quoteId, "sent");
      toast.success("Quote sent");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send quote.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Send"}
    </Button>
  );
}

export function TestTraccarButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    setBusy(true);
    try {
      const result = await api.testTraccarConnection();
      toast.success(`Traccar ${result.status} · ${result.lastSync}`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Connection test failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "Testing…" : "Test connection"}
    </Button>
  );
}

export function RenameRoleButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    const next = window.prompt("Role name", name)?.trim();
    if (!next || next === name) return;
    setBusy(true);
    try {
      await api.patchOrgRole(id, next);
      toast.success("Role renamed");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not rename role.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Rename"}
    </Button>
  );
}

export function EditGroupPolicyButton({
  id,
  policy,
}: {
  id: string;
  policy: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    const next = window.prompt("Policy / role name", policy)?.trim();
    if (!next || next === policy) return;
    setBusy(true);
    try {
      await api.patchSettingsGroup(id, { policy: next });
      toast.success("Group policy updated");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update group.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Edit policy"}
    </Button>
  );
}

export function AssignEquipmentButton({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const next = status === "stored" ? "active" : "stored";

  async function onClick() {
    setBusy(true);
    try {
      await api.patchEquipment(id, { status: next as "active" | "stored" });
      toast.success(next === "active" ? "Equipment assigned" : "Moved to storage");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update equipment.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : next === "active" ? "Assign" : "Store"}
    </Button>
  );
}

export function EditGeofenceRadiusButton({
  id,
  radius,
}: {
  id: string;
  radius: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    const next = window.prompt("Radius", radius)?.trim();
    if (!next || next === radius) return;
    setBusy(true);
    try {
      await api.patchGeofence(id, { radius: next });
      toast.success("Geofence updated");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update geofence.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Edit radius"}
    </Button>
  );
}

export function EditPlaceGeofenceButton({
  id,
  geofence,
}: {
  id: string;
  geofence: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    const next = window.prompt("Geofence radius", geofence)?.trim();
    if (!next || next === geofence) return;
    setBusy(true);
    try {
      await api.patchPlace(id, { geofence: next });
      toast.success("Place geofence updated");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update place.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Edit geofence"}
    </Button>
  );
}

export function EditOrderTypeFlowForm({
  orderTypeId,
  steps,
}: {
  orderTypeId: string;
  steps: string[];
}) {
  const router = useRouter();
  const [value, setValue] = useState(steps.join(" → "));
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await api.patchOrderTypeFlow(orderTypeId, value);
      toast.success("Status flow updated");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update flow.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-end" onSubmit={onSubmit}>
      <label className="block flex-1 text-sm">
        <span className="text-muted-foreground">Flow (use → between steps)</span>
        <Input className="mt-1" value={value} onChange={(e) => setValue(e.target.value)} />
      </label>
      <Button type="submit" variant="accent" size="sm" disabled={busy}>
        {busy ? "Saving…" : "Save flow"}
      </Button>
    </form>
  );
}
