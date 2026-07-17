"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api-client";

export function SimpleCreateForm({
  label,
  placeholder = "Name",
  fieldLabel = "Name",
  size = "default",
  onCreate,
}: {
  label: string;
  placeholder?: string;
  fieldLabel?: string;
  size?: "default" | "sm";
  onCreate: (name: string) => Promise<void>;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onCreate(name.trim());
      toast.success(`${label} created`);
      setOpen(false);
      setName("");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : `Could not create ${label.toLowerCase()}.`);
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button variant="accent" size={size} onClick={() => setOpen(true)}>
        {label}
      </Button>
    );
  }

  return (
    <Card className="mb-4 max-w-md">
      <CardContent className="p-5">
        <form className="grid gap-3" onSubmit={onSubmit}>
          <label className="block text-sm">
            <span className="text-muted-foreground">{fieldLabel}</span>
            <Input
              className="mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={placeholder}
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

export function CreateOrderTypeForm() {
  return (
    <SimpleCreateForm
      label="Add order type"
      placeholder="Bulk cement haul"
      onCreate={async (name) => {
        await api.createOrderType(name);
      }}
    />
  );
}

export function CreateRoleForm() {
  return (
    <SimpleCreateForm
      label="New role"
      placeholder="Yard supervisor"
      onCreate={async (name) => {
        await api.createRole(name);
      }}
    />
  );
}

export function CreatePartnerForm() {
  return (
    <SimpleCreateForm
      label="Add partner"
      placeholder="Partner fleet name"
      onCreate={async (name) => {
        await api.createPartner(name);
      }}
    />
  );
}

export function CreateTelematicsForm() {
  return (
    <SimpleCreateForm
      label="Add provider"
      placeholder="Samsara / Geotab / …"
      fieldLabel="Provider"
      onCreate={async (name) => {
        await api.createTelematicsProvider(name);
      }}
    />
  );
}

export function CreateWebhookForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("https://hooks.example.com/zaftys");
  const [events, setEvents] = useState("order.*");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createWebhook({ url: url.trim(), events: events.trim() });
      toast.success("Webhook added");
      setOpen(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add webhook.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button variant="accent" onClick={() => setOpen(true)}>
        Add webhook
      </Button>
    );
  }

  return (
    <Card className="mb-4 max-w-xl">
      <CardContent className="p-5">
        <form className="grid gap-3" onSubmit={onSubmit}>
          <label className="block text-sm">
            <span className="text-muted-foreground">URL</span>
            <Input className="mt-1" value={url} onChange={(e) => setUrl(e.target.value)} required />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Events</span>
            <Input className="mt-1" value={events} onChange={(e) => setEvents(e.target.value)} />
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

export function CreateDeviceForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [imei, setImei] = useState("");
  const [vehicle, setVehicle] = useState("MH-27-AB-1234");
  const [provider, setProvider] = useState("Flespi");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createDevice({
        imei: imei.trim(),
        vehicle: vehicle.trim(),
        provider: provider.trim() || undefined,
      });
      toast.success("Device registered");
      setOpen(false);
      setImei("");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not register device.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button variant="accent" onClick={() => setOpen(true)}>
        Register device
      </Button>
    );
  }

  return (
    <Card className="mb-4 max-w-xl">
      <CardContent className="p-5">
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={onSubmit}>
          <label className="block text-sm sm:col-span-2">
            <span className="text-muted-foreground">IMEI</span>
            <Input className="mt-1" value={imei} onChange={(e) => setImei(e.target.value)} required />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Vehicle</span>
            <Input className="mt-1" value={vehicle} onChange={(e) => setVehicle(e.target.value)} required />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Provider</span>
            <Input className="mt-1" value={provider} onChange={(e) => setProvider(e.target.value)} />
          </label>
          <div className="flex gap-2 sm:col-span-2">
            <Button type="submit" variant="accent" disabled={submitting}>
              {submitting ? "Saving…" : "Register"}
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

export function CreateScheduleForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [vehicle, setVehicle] = useState("MH-27-AB-1234");
  const [type, setType] = useState("Service");
  const [trigger, setTrigger] = useState("Every 10,000 km");
  const [nextDue, setNextDue] = useState("30 days");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createMaintenanceSchedule({
        vehicle: vehicle.trim(),
        type: type.trim(),
        trigger: trigger.trim(),
        nextDue: nextDue.trim(),
      });
      toast.success("Schedule created");
      setOpen(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create schedule.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button variant="accent" onClick={() => setOpen(true)}>
        Add schedule
      </Button>
    );
  }

  return (
    <Card className="mb-4 max-w-2xl">
      <CardContent className="p-5">
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={onSubmit}>
          <label className="block text-sm">
            <span className="text-muted-foreground">Vehicle</span>
            <Input className="mt-1" value={vehicle} onChange={(e) => setVehicle(e.target.value)} required />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Type</span>
            <Input className="mt-1" value={type} onChange={(e) => setType(e.target.value)} required />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Trigger</span>
            <Input className="mt-1" value={trigger} onChange={(e) => setTrigger(e.target.value)} required />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Next due</span>
            <Input className="mt-1" value={nextDue} onChange={(e) => setNextDue(e.target.value)} />
          </label>
          <div className="flex gap-2 sm:col-span-2">
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

export function CreateFleetGroupForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [zone, setZone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createFleetGroup({ name: name.trim(), zone: zone.trim() || undefined });
      toast.success("Fleet group created");
      setOpen(false);
      setName("");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create group.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button variant="accent" onClick={() => setOpen(true)}>
        Create group
      </Button>
    );
  }

  return (
    <Card className="mb-4 max-w-md">
      <CardContent className="p-5">
        <form className="grid gap-3" onSubmit={onSubmit}>
          <label className="block text-sm">
            <span className="text-muted-foreground">Name</span>
            <Input className="mt-1" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Zone</span>
            <Input className="mt-1" value={zone} onChange={(e) => setZone(e.target.value)} />
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

export function CreateSettingsGroupForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [policy, setPolicy] = useState("Dispatcher");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createSettingsGroup({
        name: name.trim(),
        policy: policy.trim() || undefined,
      });
      toast.success("Group created");
      setOpen(false);
      setName("");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create group.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button variant="accent" onClick={() => setOpen(true)}>
        Create group
      </Button>
    );
  }

  return (
    <Card className="mb-4 max-w-md">
      <CardContent className="p-5">
        <form className="grid gap-3" onSubmit={onSubmit}>
          <label className="block text-sm">
            <span className="text-muted-foreground">Name</span>
            <Input className="mt-1" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Policy</span>
            <Input className="mt-1" value={policy} onChange={(e) => setPolicy(e.target.value)} />
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

export function InviteOrgUserForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Dispatcher");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.inviteOrgUser({
        name: name.trim(),
        email: email.trim(),
        role: role.trim() || undefined,
      });
      toast.success("Invite sent");
      setOpen(false);
      setName("");
      setEmail("");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not invite user.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button variant="accent" onClick={() => setOpen(true)}>
        Invite user
      </Button>
    );
  }

  return (
    <Card className="mb-4 max-w-md">
      <CardContent className="p-5">
        <form className="grid gap-3" onSubmit={onSubmit}>
          <label className="block text-sm">
            <span className="text-muted-foreground">Name</span>
            <Input className="mt-1" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Email</span>
            <Input
              className="mt-1"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Role</span>
            <Input className="mt-1" value={role} onChange={(e) => setRole(e.target.value)} />
          </label>
          <div className="flex gap-2">
            <Button type="submit" variant="accent" disabled={submitting}>
              {submitting ? "Sending…" : "Send invite"}
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

export function CreateOrderFieldForm({ orderTypeId }: { orderTypeId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("text");
  const [required, setRequired] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createOrderTypeField(orderTypeId, {
        name: name.trim(),
        type: type as "text" | "number" | "file" | "signature" | "currency" | "percent",
        required,
      });
      toast.success("Field added");
      setOpen(false);
      setName("");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add field.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button variant="accent" size="sm" onClick={() => setOpen(true)}>
        Add field
      </Button>
    );
  }

  return (
    <Card className="mb-4 max-w-md">
      <CardContent className="p-5">
        <form className="grid gap-3" onSubmit={onSubmit}>
          <label className="block text-sm">
            <span className="text-muted-foreground">Name</span>
            <Input className="mt-1" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Type</span>
            <select
              className="mt-1 w-full rounded-lg border border-white/12 bg-white/[0.05] px-3 py-2 text-sm"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {["text", "number", "file", "signature", "currency", "percent"].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={required}
              onChange={(e) => setRequired(e.target.checked)}
            />
            Required
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

export function RunOrchestratorButton() {
  const router = useRouter();
  const [running, setRunning] = useState(false);

  async function onClick() {
    setRunning(true);
    try {
      const result = await api.runOrchestrator();
      toast.success("Pipeline run complete", {
        description: result.run?.id ?? "ok",
      });
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Pipeline failed.");
    } finally {
      setRunning(false);
    }
  }

  return (
    <Button variant="accent" onClick={onClick} disabled={running}>
      {running ? "Running…" : "Run pipeline"}
    </Button>
  );
}

export function ResendInviteButton({
  driverId,
  disabled,
}: {
  driverId: string;
  disabled?: boolean;
}) {
  const router = useRouter();
  const [sending, setSending] = useState(false);

  async function onClick() {
    setSending(true);
    try {
      await api.resendDriverInvite(driverId);
      toast.success("Invite resent");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not resend invite.");
    } finally {
      setSending(false);
    }
  }

  return (
    <Button variant="accent" size="sm" disabled={disabled || sending} onClick={onClick}>
      {sending ? "Sending…" : "Resend SMS invite"}
    </Button>
  );
}
