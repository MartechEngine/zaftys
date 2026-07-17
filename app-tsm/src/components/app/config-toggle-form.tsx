"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api-client";

export function ConfigToggleForm({
  section,
  field,
  label,
  current,
}: {
  section: string;
  field: string;
  label: string;
  current: boolean;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function toggle() {
    setSaving(true);
    try {
      await api.patchSettingsConfig(section, { [field]: !current });
      toast.success(`${label} ${!current ? "enabled" : "disabled"}`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update setting.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={toggle} disabled={saving}>
      {saving ? "Saving…" : current ? `Disable ${label}` : `Enable ${label}`}
    </Button>
  );
}

export function NotificationChannelToggle({
  id,
  channel,
  enabled,
}: {
  id: string;
  channel: string;
  enabled: boolean;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function toggle() {
    setSaving(true);
    try {
      await api.patchSettingsConfig("notifications", { [id]: !enabled });
      toast.success(`${channel} ${!enabled ? "enabled" : "disabled"}`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update channel.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={toggle} disabled={saving}>
      {saving ? "…" : enabled ? "Disable" : "Enable"}
    </Button>
  );
}

export function EditClientForm({
  client,
}: {
  client: {
    id: string;
    name: string;
    gstin?: string;
    city?: string;
    contact?: string;
  };
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(client.name);
  const [gstin, setGstin] = useState(client.gstin ?? "");
  const [city, setCity] = useState(client.city ?? "");
  const [contact, setContact] = useState(client.contact ?? "");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.patchClient(client.id, {
        name: name.trim(),
        gstin: gstin.trim() || undefined,
        city: city.trim() || undefined,
        contact: contact.trim() || undefined,
      });
      toast.success("Client updated");
      setOpen(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update client.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button variant="outline" onClick={() => setOpen(true)}>
        Edit client
      </Button>
    );
  }

  return (
    <Card className="mb-4 max-w-xl">
      <CardContent className="p-5">
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={onSubmit}>
          <label className="block text-sm sm:col-span-2">
            <span className="text-muted-foreground">Company name</span>
            <Input className="mt-1" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">GSTIN</span>
            <Input className="mt-1" value={gstin} onChange={(e) => setGstin(e.target.value)} />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">City</span>
            <Input className="mt-1" value={city} onChange={(e) => setCity(e.target.value)} />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="text-muted-foreground">Primary contact</span>
            <Input className="mt-1" value={contact} onChange={(e) => setContact(e.target.value)} />
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
