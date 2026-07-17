"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api-client";

export function CreateInvoiceForm({ defaultClient }: { defaultClient?: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [client, setClient] = useState(defaultClient ?? "");
  const [description, setDescription] = useState("Freight charges");
  const [subtotalInr, setSubtotalInr] = useState("50000");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const invoice = await api.createInvoice({
        client: client.trim(),
        description: description.trim(),
        subtotalInr: Number(subtotalInr),
      });
      toast.success("Invoice created", { description: invoice.number });
      setOpen(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create invoice.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button variant="accent" onClick={() => setOpen(true)}>
        Create invoice
      </Button>
    );
  }

  return (
    <Card className="mb-4 max-w-2xl">
      <CardContent className="p-5">
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={onSubmit}>
          <label className="block text-sm sm:col-span-2">
            <span className="text-muted-foreground">Client</span>
            <Input className="mt-1" value={client} onChange={(e) => setClient(e.target.value)} required />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="text-muted-foreground">Description</span>
            <Input
              className="mt-1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Subtotal (INR)</span>
            <Input
              className="mt-1"
              type="number"
              min={1}
              value={subtotalInr}
              onChange={(e) => setSubtotalInr(e.target.value)}
              required
            />
          </label>
          <div className="flex items-end gap-2">
            <Button type="submit" variant="accent" disabled={submitting}>
              {submitting ? "Creating…" : "Create"}
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
