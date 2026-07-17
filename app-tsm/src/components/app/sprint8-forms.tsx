"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api-client";
import type { ShipmentRecord } from "@/lib/dev-store";

export function EditShipmentFieldsForm({
  shipment,
  onUpdated,
}: {
  shipment: ShipmentRecord;
  onUpdated?: (s: ShipmentRecord) => void;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [client, setClient] = useState(shipment.client);
  const [origin, setOrigin] = useState(shipment.origin);
  const [destination, setDestination] = useState(shipment.destination);
  const [commodity, setCommodity] = useState(shipment.commodity);
  const [tonnage, setTonnage] = useState(String(shipment.tonnageMt));
  const [lrNumber, setLrNumber] = useState(shipment.lrNumber ?? "");
  const [submitting, setSubmitting] = useState(false);

  const locked = ["delivered", "cancelled"].includes(shipment.status);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const updated = await api.updateShipmentFields(shipment.id, {
        client: client.trim(),
        origin: origin.trim(),
        destination: destination.trim(),
        commodity: commodity.trim(),
        tonnageMt: Number(tonnage),
        lrNumber: lrNumber.trim() || undefined,
      });
      toast.success("Trip details updated");
      setOpen(false);
      onUpdated?.(updated);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update shipment.");
    } finally {
      setSubmitting(false);
    }
  }

  if (locked) return null;

  if (!open) {
    return (
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Edit trip
      </Button>
    );
  }

  return (
    <Card className="mb-4">
      <CardContent className="p-5">
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={onSubmit}>
          <label className="block text-sm sm:col-span-2">
            <span className="text-muted-foreground">Client</span>
            <Input className="mt-1" value={client} onChange={(e) => setClient(e.target.value)} required />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Origin</span>
            <Input className="mt-1" value={origin} onChange={(e) => setOrigin(e.target.value)} required />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Destination</span>
            <Input
              className="mt-1"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Commodity</span>
            <Input
              className="mt-1"
              value={commodity}
              onChange={(e) => setCommodity(e.target.value)}
              required
            />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Tonnage (MT)</span>
            <Input
              className="mt-1"
              type="number"
              min={1}
              value={tonnage}
              onChange={(e) => setTonnage(e.target.value)}
              required
            />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="text-muted-foreground">LR number</span>
            <Input className="mt-1" value={lrNumber} onChange={(e) => setLrNumber(e.target.value)} />
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

export function InvoicePdfButton({
  invoiceId,
  number,
}: {
  invoiceId: string;
  number: string;
}) {
  const [busy, setBusy] = useState(false);

  async function onClick() {
    setBusy(true);
    try {
      const res = await fetch(`/api/billing/invoices/${invoiceId}/pdf`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("PDF download failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${number}.html`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Invoice PDF downloaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not download PDF.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" onClick={onClick} disabled={busy}>
      {busy ? "Preparing…" : "Download PDF"}
    </Button>
  );
}

export function EditRateForm({
  rate,
}: {
  rate: { id: string; name: string; basis: string; rate: string; minCharge: string };
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(rate.name);
  const [basis, setBasis] = useState(rate.basis);
  const [rateValue, setRateValue] = useState(rate.rate);
  const [minCharge, setMinCharge] = useState(rate.minCharge);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.patchServiceRate(rate.id, {
        name: name.trim(),
        basis: basis.trim(),
        rate: rateValue.trim(),
        minCharge: minCharge.trim() || undefined,
      });
      toast.success("Rate updated");
      setOpen(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update rate.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button variant="outline" onClick={() => setOpen(true)}>
        Edit rate
      </Button>
    );
  }

  return (
    <Card className="mb-4 max-w-xl">
      <CardContent className="p-5">
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={onSubmit}>
          <label className="block text-sm sm:col-span-2">
            <span className="text-muted-foreground">Name</span>
            <Input className="mt-1" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Basis</span>
            <Input className="mt-1" value={basis} onChange={(e) => setBasis(e.target.value)} required />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Rate</span>
            <Input
              className="mt-1"
              value={rateValue}
              onChange={(e) => setRateValue(e.target.value)}
              required
            />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="text-muted-foreground">Min charge</span>
            <Input className="mt-1" value={minCharge} onChange={(e) => setMinCharge(e.target.value)} />
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

export function CreateDriverForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [license, setLicense] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const driver = await api.createDriver({
        name: name.trim(),
        phone: phone.trim(),
        license: license.trim() || undefined,
      });
      toast.success("Driver added");
      setOpen(false);
      router.push(`/fleet/drivers/${driver.id}`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create driver.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Add driver
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
            <Input className="mt-1" value={license} onChange={(e) => setLicense(e.target.value)} />
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

export function CreateVehicleForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [registration, setRegistration] = useState("");
  const [type, setType] = useState("Multi-axle");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const vehicle = await api.createVehicle({
        registration: registration.trim(),
        type: type.trim() || undefined,
      });
      toast.success("Vehicle added");
      setOpen(false);
      router.push(`/fleet/vehicles/${vehicle.id}`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create vehicle.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button variant="accent" size="sm" onClick={() => setOpen(true)}>
        Add vehicle
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
            <Input className="mt-1" value={type} onChange={(e) => setType(e.target.value)} />
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

export function CreateReportScheduleForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [cadence, setCadence] = useState("Mon 07:00");
  const [recipients, setRecipients] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createReportSchedule({
        name: name.trim(),
        cadence: cadence.trim(),
        recipients: recipients.trim(),
      });
      toast.success("Schedule added");
      setOpen(false);
      setName("");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add schedule.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Add schedule
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
            <span className="text-muted-foreground">Cadence</span>
            <Input className="mt-1" value={cadence} onChange={(e) => setCadence(e.target.value)} required />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Recipients</span>
            <Input
              className="mt-1"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              placeholder="ops@zaftys.com"
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
