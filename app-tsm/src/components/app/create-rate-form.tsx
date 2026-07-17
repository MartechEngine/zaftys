"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api-client";

export function CreateRateForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [basis, setBasis] = useState("Per MT · zone");
  const [rate, setRate] = useState("₹420/MT");
  const [minCharge, setMinCharge] = useState("₹8,400");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createServiceRate({
        name: name.trim(),
        basis: basis.trim(),
        rate: rate.trim(),
        minCharge: minCharge.trim() || undefined,
      });
      toast.success("Rate created");
      setOpen(false);
      setName("");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create rate.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button variant="accent" onClick={() => setOpen(true)}>
        Add rate
      </Button>
    );
  }

  return (
    <Card className="mb-4 max-w-2xl">
      <CardContent className="p-5">
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={onSubmit}>
          <label className="block text-sm sm:col-span-2">
            <span className="text-muted-foreground">Name</span>
            <Input
              className="mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Wardha – Mumbai (cement)"
              required
            />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Basis</span>
            <Input className="mt-1" value={basis} onChange={(e) => setBasis(e.target.value)} required />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Rate</span>
            <Input className="mt-1" value={rate} onChange={(e) => setRate(e.target.value)} required />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="text-muted-foreground">Min charge</span>
            <Input
              className="mt-1"
              value={minCharge}
              onChange={(e) => setMinCharge(e.target.value)}
            />
          </label>
          <div className="flex gap-2 sm:col-span-2">
            <Button type="submit" variant="accent" disabled={submitting}>
              {submitting ? "Saving…" : "Save rate"}
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
