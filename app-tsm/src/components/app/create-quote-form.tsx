"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api-client";

export function CreateQuoteForm({ defaultClient }: { defaultClient?: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [client, setClient] = useState(defaultClient ?? "");
  const [origin, setOrigin] = useState("Amravati");
  const [destination, setDestination] = useState("Mumbai");
  const [tonnage, setTonnage] = useState("32");
  const [rateInr, setRateInr] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createQuote({
        client: client.trim(),
        origin: origin.trim(),
        destination: destination.trim(),
        tonnage: Number(tonnage),
        rateInr: rateInr ? Number(rateInr) : undefined,
        status: "draft",
      });
      toast.success("Quote created");
      setOpen(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create quote.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button variant="accent" onClick={() => setOpen(true)}>
        New quote
      </Button>
    );
  }

  return (
    <Card className="mb-4 max-w-2xl">
      <CardContent className="p-5">
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={onSubmit}>
          <label className="block text-sm sm:col-span-2">
            <span className="text-muted-foreground">Client</span>
            <Input
              className="mt-1"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              required
            />
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
            <span className="text-muted-foreground">Tonnage (MT)</span>
            <Input
              className="mt-1"
              type="number"
              min="1"
              step="0.1"
              value={tonnage}
              onChange={(e) => setTonnage(e.target.value)}
              required
            />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Rate (₹, optional)</span>
            <Input
              className="mt-1"
              type="number"
              min="0"
              value={rateInr}
              onChange={(e) => setRateInr(e.target.value)}
              placeholder="Auto = tonnage × 420"
            />
          </label>
          <div className="flex gap-2 sm:col-span-2">
            <Button type="submit" variant="accent" disabled={submitting}>
              {submitting ? "Saving…" : "Save draft"}
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
