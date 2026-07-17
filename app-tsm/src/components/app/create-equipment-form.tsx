"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api-client";

const TYPES = ["Weighbridge", "Loader", "Telematics", "Generator", "Other"];
const STATUSES = ["active", "stored", "maintenance"] as const;

export function CreateEquipmentForm({ locations }: { locations: string[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("Loader");
  const [location, setLocation] = useState(locations[0] ?? "Spare inventory");
  const [status, setStatus] = useState<(typeof STATUSES)[number]>("active");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createEquipment({
        name: name.trim(),
        type,
        location,
        status,
      });
      toast.success("Equipment added");
      setOpen(false);
      setName("");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add equipment.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button variant="accent" onClick={() => setOpen(true)}>
        Add equipment
      </Button>
    );
  }

  return (
    <Card className="mb-4 max-w-2xl">
      <CardContent className="p-5">
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={onSubmit}>
          <label className="block text-sm sm:col-span-2">
            <span className="text-muted-foreground">Name</span>
            <Input className="mt-1" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Type</span>
            <select
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Status</span>
            <select
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              value={status}
              onChange={(e) => setStatus(e.target.value as (typeof STATUSES)[number])}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="text-muted-foreground">Location</span>
            <select
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              {[...locations, "Spare inventory"].filter((v, i, a) => a.indexOf(v) === i).map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
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
