"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api-client";

export function CreateWorkOrderForm({
  vehicles,
  vendors,
}: {
  vehicles: string[];
  vendors: string[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [vehicle, setVehicle] = useState(vehicles[0] ?? "");
  const [vendor, setVendor] = useState(vendors[0] ?? "");
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState("₹10,000");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const wo = await api.createWorkOrder({
        vehicle,
        vendor,
        title: title.trim(),
        cost: cost.trim() || undefined,
        notes: notes.trim() || undefined,
      });
      toast.success("Work order created");
      setOpen(false);
      router.push(`/maintenance/work-orders/${wo.id}`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create work order.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button variant="accent" onClick={() => setOpen(true)}>
        New work order
      </Button>
    );
  }

  return (
    <Card className="mb-4 max-w-2xl">
      <CardContent className="p-5">
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={onSubmit}>
          <label className="block text-sm">
            <span className="text-muted-foreground">Vehicle</span>
            <select
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-sm"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              required
            >
              {vehicles.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Vendor</span>
            <select
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              required
            >
              {vendors.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="text-muted-foreground">Job title</span>
            <Input
              className="mt-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Est. cost</span>
            <Input className="mt-1" value={cost} onChange={(e) => setCost(e.target.value)} />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Notes</span>
            <Input className="mt-1" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </label>
          <div className="flex gap-2 sm:col-span-2">
            <Button type="submit" variant="accent" disabled={submitting}>
              {submitting ? "Saving…" : "Create"}
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
