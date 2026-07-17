"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api-client";

export function GstExportButton() {
  const [busy, setBusy] = useState(false);

  async function onClick() {
    setBusy(true);
    try {
      const res = await fetch("/api/billing/gst?format=csv", { cache: "no-store" });
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `gst-export-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("GST CSV downloaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not export GST.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" onClick={onClick} disabled={busy}>
      {busy ? "Exporting…" : "Export CSV"}
    </Button>
  );
}

export function ConfigureTallyButton({ connected }: { connected: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    setBusy(true);
    try {
      await api.configureTally();
      toast.success(connected ? "Tally refreshed" : "Tally configured");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not configure Tally.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="accent" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "Saving…" : connected ? "Refresh Tally" : "Configure Tally"}
    </Button>
  );
}

export function CreateCustomReportForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createCustomReport({
        name: name.trim(),
        description: description.trim() || undefined,
      });
      toast.success("Report saved");
      setOpen(false);
      setName("");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create report.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button variant="accent" onClick={() => setOpen(true)}>
        New report
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
            <span className="text-muted-foreground">Description</span>
            <Input
              className="mt-1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

export function EditDriverForm({
  driver,
}: {
  driver: { id: string; name: string; phone: string; license: string };
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(driver.name);
  const [phone, setPhone] = useState(driver.phone);
  const [license, setLicense] = useState(driver.license);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.patchDriver(driver.id, {
        name: name.trim(),
        phone: phone.trim(),
        license: license.trim(),
      });
      toast.success("Driver updated");
      setOpen(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update driver.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button variant="outline" onClick={() => setOpen(true)}>
        Edit
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
            <span className="text-muted-foreground">Phone</span>
            <Input className="mt-1" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">License</span>
            <Input className="mt-1" value={license} onChange={(e) => setLicense(e.target.value)} required />
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

export function EditVehicleForm({
  vehicle,
}: {
  vehicle: { id: string; registration: string; type: string; capacityMt: number };
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [registration, setRegistration] = useState(vehicle.registration);
  const [type, setType] = useState(vehicle.type);
  const [capacityMt, setCapacityMt] = useState(String(vehicle.capacityMt));
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.patchVehicle(vehicle.id, {
        registration: registration.trim(),
        type: type.trim(),
        capacityMt: Number(capacityMt),
      });
      toast.success("Vehicle updated");
      setOpen(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update vehicle.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button variant="outline" onClick={() => setOpen(true)}>
        Edit
      </Button>
    );
  }

  return (
    <Card className="mb-4 max-w-md">
      <CardContent className="p-5">
        <form className="grid gap-3" onSubmit={onSubmit}>
          <label className="block text-sm">
            <span className="text-muted-foreground">Registration</span>
            <Input
              className="mt-1"
              value={registration}
              onChange={(e) => setRegistration(e.target.value)}
              required
            />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Type</span>
            <Input className="mt-1" value={type} onChange={(e) => setType(e.target.value)} required />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Capacity (MT)</span>
            <Input
              className="mt-1"
              type="number"
              min={1}
              value={capacityMt}
              onChange={(e) => setCapacityMt(e.target.value)}
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

export function EditVendorForm({
  vendor,
}: {
  vendor: { id: string; name: string; type: string; city: string; contact: string };
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(vendor.name);
  const [type, setType] = useState(vendor.type);
  const [city, setCity] = useState(vendor.city);
  const [contact, setContact] = useState(vendor.contact);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.patchVendor(vendor.id, {
        name: name.trim(),
        type: type.trim(),
        city: city.trim(),
        contact: contact.trim(),
      });
      toast.success("Vendor updated");
      setOpen(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update vendor.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button variant="outline" onClick={() => setOpen(true)}>
        Edit
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
            <Input className="mt-1" value={type} onChange={(e) => setType(e.target.value)} required />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">City</span>
            <Input className="mt-1" value={city} onChange={(e) => setCity(e.target.value)} required />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Contact</span>
            <Input className="mt-1" value={contact} onChange={(e) => setContact(e.target.value)} required />
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

export function AssignDeviceForm({ defaultVehicle }: { defaultVehicle: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [imei, setImei] = useState("");
  const [provider, setProvider] = useState("Flespi");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createDevice({
        imei: imei.trim(),
        vehicle: defaultVehicle,
        provider: provider.trim() || undefined,
      });
      toast.success("Device assigned");
      setOpen(false);
      setImei("");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not assign device.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button variant="accent" size="sm" onClick={() => setOpen(true)}>
        Assign device
      </Button>
    );
  }

  return (
    <Card className="mb-4 max-w-md">
      <CardContent className="p-5">
        <form className="grid gap-3" onSubmit={onSubmit}>
          <p className="text-sm text-muted-foreground">Vehicle · {defaultVehicle}</p>
          <label className="block text-sm">
            <span className="text-muted-foreground">IMEI</span>
            <Input className="mt-1" value={imei} onChange={(e) => setImei(e.target.value)} required />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Provider</span>
            <Input className="mt-1" value={provider} onChange={(e) => setProvider(e.target.value)} />
          </label>
          <div className="flex gap-2">
            <Button type="submit" variant="accent" disabled={submitting}>
              {submitting ? "Saving…" : "Assign"}
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
