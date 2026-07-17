"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api-client";

export function UploadLogoButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    setBusy(true);
    try {
      await api.uploadOrgLogo("zaftys-logo.png");
      toast.success("Logo uploaded");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not upload logo.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" className="mt-2" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Upload logo"}
    </Button>
  );
}

export function RotateFleetbaseKeyButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    setBusy(true);
    try {
      const detail = await api.rotateFleetbaseKey();
      toast.success(`Key rotated · ${detail.apiKeyMasked}`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not rotate key.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Rotate key"}
    </Button>
  );
}

export function ChangePasswordButton() {
  const [busy, setBusy] = useState(false);

  async function onClick() {
    const next = window.prompt("New password (min 6 characters)")?.trim();
    if (!next) return;
    setBusy(true);
    try {
      await api.changePassword({ newPassword: next });
      toast.success("Password updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not change password.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button type="button" variant="outline" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Change password"}
    </Button>
  );
}

export function EditFleetGroupButton({
  id,
  name,
  zone,
}: {
  id: string;
  name: string;
  zone: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    const nextName = window.prompt("Group name", name)?.trim();
    if (!nextName) return;
    const nextZone = window.prompt("Zone", zone)?.trim();
    if (nextZone == null) return;
    if (nextName === name && nextZone === zone) return;
    setBusy(true);
    try {
      await api.patchFleetGroup(id, { name: nextName, zone: nextZone });
      toast.success("Fleet group updated");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update group.");
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

export function ConnectFuelProviderButton({
  id,
  status,
}: {
  id: string;
  status: "connected" | "disconnected";
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const next = status === "connected" ? "disconnected" : "connected";

  async function onClick() {
    setBusy(true);
    try {
      await api.setFuelProviderStatus(id, next);
      toast.success(next === "connected" ? "Provider connected" : "Provider disconnected");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update provider.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : next === "connected" ? "Connect" : "Disconnect"}
    </Button>
  );
}

export function TestTelematicsButton({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    setBusy(true);
    try {
      const result = await api.testTelematicsProvider(id);
      toast.success(`Ping OK · ${result.lastPing}`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Connection test failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "Testing…" : "Test"}
    </Button>
  );
}

export function CreateAutomationForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [trigger, setTrigger] = useState("status → delivered");
  const [action, setAction] = useState("Notify ops channel");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createAutomationRule({ trigger: trigger.trim(), action: action.trim() });
      toast.success("Automation rule created");
      setOpen(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create rule.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button variant="accent" onClick={() => setOpen(true)}>
        Create rule
      </Button>
    );
  }

  return (
    <Card className="mb-4 max-w-xl">
      <CardContent className="p-5">
        <form className="grid gap-3" onSubmit={onSubmit}>
          <label className="block text-sm">
            <span className="text-muted-foreground">When</span>
            <Input
              className="mt-1"
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              required
            />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Then</span>
            <Input
              className="mt-1"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              required
            />
          </label>
          <div className="flex gap-2">
            <Button type="submit" variant="accent" disabled={submitting}>
              {submitting ? "Saving…" : "Save"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function RenameOrderTypeButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    const next = window.prompt("Order type name", name)?.trim();
    if (!next || next === name) return;
    setBusy(true);
    try {
      await api.renameOrderType(id, next);
      toast.success("Order type renamed");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not rename.");
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

export function DeleteWebhookButton({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    if (!window.confirm("Delete this webhook?")) return;
    setBusy(true);
    try {
      await api.deleteWebhook(id);
      toast.success("Webhook deleted");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete webhook.");
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

export function UnassignDeviceButton({
  id,
  vehicle,
}: {
  id: string;
  vehicle: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  if (!vehicle || vehicle === "Unassigned") return null;

  async function onClick() {
    setBusy(true);
    try {
      await api.patchDevice(id, { vehicle: "Unassigned" });
      toast.success("Device unassigned");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not unassign device.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Unassign"}
    </Button>
  );
}
