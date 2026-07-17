"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";
import { ConfigFieldForm } from "@/components/app/sprint13-forms";
import { InvoiceStatusActions } from "@/components/app/invoice-status-actions";
import { WorkOrderStatusActions } from "@/components/app/work-order-status-actions";

export { ConfigFieldForm, InvoiceStatusActions, WorkOrderStatusActions };

export function RevokeClientUserButton({
  clientId,
  userId,
  status,
}: {
  clientId: string;
  userId: string;
  status: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  if (status !== "active") return null;

  async function onClick() {
    if (!window.confirm("Revoke portal access for this user?")) return;
    setBusy(true);
    try {
      await api.revokeClientUser(clientId, userId);
      toast.success("Portal access revoked");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not revoke access.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Revoke"}
    </Button>
  );
}

export function EditContactButton({
  clientId,
  contactId,
  name,
  role,
  phone,
  email,
}: {
  clientId: string;
  contactId: string;
  name: string;
  role: string;
  phone: string;
  email: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    const nextName = window.prompt("Contact name", name)?.trim();
    if (!nextName) return;
    const nextRole = window.prompt("Role", role)?.trim();
    if (!nextRole) return;
    const nextPhone = window.prompt("Phone", phone)?.trim();
    if (!nextPhone) return;
    const nextEmail = window.prompt("Email", email)?.trim();
    if (!nextEmail) return;
    if (
      nextName === name &&
      nextRole === role &&
      nextPhone === phone &&
      nextEmail === email
    ) {
      return;
    }
    setBusy(true);
    try {
      await api.patchClientContact(clientId, contactId, {
        name: nextName,
        role: nextRole,
        phone: nextPhone,
        email: nextEmail,
      });
      toast.success("Contact updated");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update contact.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Edit"}
    </Button>
  );
}

export function DeleteContactButton({
  clientId,
  contactId,
  name,
}: {
  clientId: string;
  contactId: string;
  name: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    if (!window.confirm(`Delete contact "${name}"?`)) return;
    setBusy(true);
    try {
      await api.deleteClientContact(clientId, contactId);
      toast.success("Contact deleted");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete contact.");
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

export function RenameSettingsGroupButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    const next = window.prompt("Group name", name)?.trim();
    if (!next || next === name) return;
    setBusy(true);
    try {
      await api.patchSettingsGroup(id, { name: next });
      toast.success("Group renamed");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not rename group.");
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

export function RenameGeofenceButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    const next = window.prompt("Geofence name", name)?.trim();
    if (!next || next === name) return;
    setBusy(true);
    try {
      await api.patchGeofence(id, { name: next });
      toast.success("Geofence renamed");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not rename geofence.");
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

export function RelocateEquipmentButton({
  id,
  location,
}: {
  id: string;
  location: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    const next = window.prompt("New location", location)?.trim();
    if (!next || next === location) return;
    setBusy(true);
    try {
      await api.patchEquipment(id, { location: next });
      toast.success("Equipment relocated");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not relocate equipment.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Relocate"}
    </Button>
  );
}

export function EditMaintenanceScheduleButton({
  id,
  vehicle,
  trigger,
  nextDue,
  type,
}: {
  id: string;
  vehicle: string;
  trigger: string;
  nextDue: string;
  type: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    const nextTrigger = window.prompt("Trigger", trigger)?.trim();
    if (!nextTrigger) return;
    const nextDueDate = window.prompt("Next due", nextDue)?.trim();
    if (!nextDueDate) return;
    const nextType = window.prompt("Type", type)?.trim();
    if (!nextType) return;
    if (nextTrigger === trigger && nextDueDate === nextDue && nextType === type) return;
    setBusy(true);
    try {
      await api.patchMaintenanceSchedule(id, {
        trigger: nextTrigger,
        nextDue: nextDueDate,
        type: nextType,
        vehicle,
      });
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
      {busy ? "…" : "Edit"}
    </Button>
  );
}
