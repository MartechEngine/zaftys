"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api-client";

export function ChangeUserRoleButton({ id, role }: { id: string; role: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    const next = window.prompt(`Role for user`, role)?.trim();
    if (!next || next === role) return;
    setBusy(true);
    try {
      await api.patchOrgUser(id, { role: next });
      toast.success("Role updated");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update role.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Change role"}
    </Button>
  );
}

export function DeactivateUserButton({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  if (status !== "active") return null;

  async function onClick() {
    if (!window.confirm("Deactivate this user?")) return;
    setBusy(true);
    try {
      await api.patchOrgUser(id, { status: "pending" });
      toast.success("User deactivated");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not deactivate.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Deactivate"}
    </Button>
  );
}

export function AssignDeviceButton({
  id,
  vehicle,
}: {
  id: string;
  vehicle: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  if (vehicle && vehicle !== "Unassigned") return null;

  async function onClick() {
    const next = window.prompt("Assign to vehicle registration", "MH-27-AB-1234")?.trim();
    if (!next) return;
    setBusy(true);
    try {
      await api.patchDevice(id, { vehicle: next });
      toast.success("Device assigned");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not assign device.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Assign"}
    </Button>
  );
}

export function EditPlaceDetailsButton({
  id,
  name,
  type,
  city,
}: {
  id: string;
  name: string;
  type: string;
  city: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    const nextName = window.prompt("Place name", name)?.trim();
    if (!nextName) return;
    const nextType = window.prompt("Type", type)?.trim();
    if (!nextType) return;
    const nextCity = window.prompt("City", city)?.trim();
    if (!nextCity) return;
    if (nextName === name && nextType === type && nextCity === city) return;
    setBusy(true);
    try {
      await api.patchPlace(id, { name: nextName, type: nextType, city: nextCity });
      toast.success("Place updated");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update place.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Edit details"}
    </Button>
  );
}

export function EditGeofenceTriggersButton({
  id,
  triggers,
}: {
  id: string;
  triggers: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    const next = window.prompt("Automation triggers", triggers)?.trim();
    if (!next || next === triggers) return;
    setBusy(true);
    try {
      await api.patchGeofence(id, { triggers: next });
      toast.success("Triggers updated");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update triggers.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Edit triggers"}
    </Button>
  );
}

export function ConfigFieldForm({
  section,
  field,
  label,
  value,
  inputType = "text",
}: {
  section: string;
  field: string;
  label: string;
  value: string | number;
  inputType?: "text" | "number";
}) {
  const router = useRouter();
  const [draft, setDraft] = useState(String(value));
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const parsed =
        inputType === "number" ? Number(draft) : draft.trim();
      if (inputType === "number" && Number.isNaN(parsed)) {
        throw new Error("Enter a valid number.");
      }
      await api.patchSettingsConfig(section, { [field]: parsed });
      toast.success(`${label} updated`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update setting.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="mt-2 flex flex-wrap items-end gap-2" onSubmit={onSubmit}>
      <label className="block text-sm">
        <span className="text-muted-foreground">{label}</span>
        <Input
          className="mt-1 w-48"
          type={inputType}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          required
        />
      </label>
      <Button type="submit" variant="outline" size="sm" disabled={saving}>
        {saving ? "Saving…" : "Save"}
      </Button>
    </form>
  );
}

export function DeleteAutomationButton({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    if (!window.confirm("Delete this automation rule?")) return;
    setBusy(true);
    try {
      await api.deleteAutomationRule(id);
      toast.success("Rule deleted");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete rule.");
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

export function DeleteReportScheduleButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    if (!window.confirm(`Delete schedule "${name}"?`)) return;
    setBusy(true);
    try {
      await api.deleteReportSchedule(id);
      toast.success("Schedule deleted");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete schedule.");
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

export function ToggleOrderFieldRequiredButton({
  orderTypeId,
  fieldId,
  required,
}: {
  orderTypeId: string;
  fieldId: string;
  required: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    setBusy(true);
    try {
      await api.patchOrderTypeField(orderTypeId, fieldId, { required: !required });
      toast.success(required ? "Field marked optional" : "Field marked required");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update field.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : required ? "Make optional" : "Make required"}
    </Button>
  );
}

export function DeleteOrderFieldButton({
  orderTypeId,
  fieldId,
  name,
}: {
  orderTypeId: string;
  fieldId: string;
  name: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    if (!window.confirm(`Delete field "${name}"?`)) return;
    setBusy(true);
    try {
      await api.deleteOrderTypeField(orderTypeId, fieldId);
      toast.success("Field deleted");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete field.");
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

export function AssignDriverVehicleButton({
  driverId,
  vehicleId,
  vehicle,
}: {
  driverId: string;
  vehicleId?: string;
  vehicle?: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const assigned = Boolean(vehicleId || vehicle);

  async function onClick() {
    if (assigned) {
      if (!window.confirm("Unassign vehicle from this driver?")) return;
      setBusy(true);
      try {
        await api.patchDriverVehicle(driverId, null);
        toast.success("Vehicle unassigned");
        router.refresh();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Could not unassign.");
      } finally {
        setBusy(false);
      }
      return;
    }

    const next = window.prompt("Vehicle ID (e.g. v1)", "v1")?.trim();
    if (!next) return;
    setBusy(true);
    try {
      await api.patchDriverVehicle(driverId, next);
      toast.success("Vehicle assigned");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not assign vehicle.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : assigned ? "Unassign vehicle" : "Assign vehicle"}
    </Button>
  );
}

export function ExportTallyNowButton({ connected }: { connected: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    setBusy(true);
    try {
      const result = await api.exportTallyNow();
      toast.success(`Exported ${result.invoiceCount} invoices · ${result.lastExport}`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Export failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy || !connected}>
      {busy ? "Exporting…" : "Export now"}
    </Button>
  );
}
