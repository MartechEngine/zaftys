"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api-client";

export function CreateFuelTransactionForm({ vehicles }: { vehicles: string[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [vehicle, setVehicle] = useState(vehicles[0] ?? "");
  const [station, setStation] = useState("IOCL Badnera");
  const [liters, setLiters] = useState("180");
  const [amountInr, setAmountInr] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createFuelTransaction({
        vehicle,
        station: station.trim(),
        liters: Number(liters),
        amountInr: amountInr ? Number(amountInr) : undefined,
      });
      toast.success("Fuel fill logged");
      setOpen(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not log fuel fill.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button variant="accent" onClick={() => setOpen(true)}>
        Log fill
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
            <span className="text-muted-foreground">Station</span>
            <Input
              className="mt-1"
              value={station}
              onChange={(e) => setStation(e.target.value)}
              required
            />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Liters</span>
            <Input
              className="mt-1"
              type="number"
              min="1"
              step="0.1"
              value={liters}
              onChange={(e) => setLiters(e.target.value)}
              required
            />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Amount ₹ (optional)</span>
            <Input
              className="mt-1"
              type="number"
              min="0"
              value={amountInr}
              onChange={(e) => setAmountInr(e.target.value)}
              placeholder="Auto = liters × 90"
            />
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
