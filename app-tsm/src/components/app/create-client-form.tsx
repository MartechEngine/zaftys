"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api-client";

const FALLBACK_CITIES = ["Nagpur", "Amravati", "Pune", "Mumbai", "Wardha", "Chandrapur"];

export function CreateClientForm({ cities }: { cities: string[] }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [gstin, setGstin] = useState("");
  const [city, setCity] = useState(cities[0] ?? FALLBACK_CITIES[0]);
  const [contact, setContact] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const cityOptions = useMemo(() => {
    const merged = [...cities, ...FALLBACK_CITIES];
    return Array.from(new Set(merged.filter(Boolean)));
  }, [cities]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Company name is required.");
      return;
    }
    setSubmitting(true);
    try {
      const client = await api.createClient({
        name: name.trim(),
        gstin: gstin.trim() || undefined,
        city,
        contact: contact.trim() || undefined,
      });
      toast.success(`${client.name} created`);
      router.push(`/clients/${client.id}`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create client.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="max-w-2xl">
      <CardContent className="p-6">
        <form className="space-y-4" onSubmit={onSubmit}>
          <label className="block text-sm">
            <span className="text-muted-foreground">Company name</span>
            <Input
              className="mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Acme Cement"
              required
            />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">GSTIN</span>
            <Input
              className="mt-1 font-mono"
              value={gstin}
              onChange={(e) => setGstin(e.target.value.toUpperCase())}
              placeholder="27AABCA1234A1Z5"
              maxLength={15}
            />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">City</span>
            <select
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              {cityOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Primary contact</span>
            <Input
              className="mt-1"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Rajesh Mehta"
            />
          </label>
          <div className="flex gap-2 pt-2">
            <Button type="submit" variant="accent" disabled={submitting}>
              {submitting ? "Creating…" : "Create client"}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/clients">Cancel</Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
