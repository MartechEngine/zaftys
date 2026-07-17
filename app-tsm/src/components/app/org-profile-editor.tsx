"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api-client";

export function OrgProfileEditor({
  initial,
}: {
  initial: {
    name: string;
    gstin: string;
    address: string;
    phone: string;
    email: string;
  };
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(initial.name);
  const [gstin, setGstin] = useState(initial.gstin);
  const [address, setAddress] = useState(initial.address);
  const [phone, setPhone] = useState(initial.phone);
  const [email, setEmail] = useState(initial.email);
  const [submitting, setSubmitting] = useState(false);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.updateOrgProfile({ name, gstin, address, phone, email });
      toast.success("Organization updated");
      setEditing(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update organization.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!editing) {
    return (
      <Button variant="outline" className="mt-2" onClick={() => setEditing(true)}>
        Edit profile
      </Button>
    );
  }

  return (
    <form className="mt-4 space-y-3" onSubmit={onSave}>
      <label className="block text-sm">
        <span className="text-muted-foreground">Legal name</span>
        <Input className="mt-1" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label className="block text-sm">
        <span className="text-muted-foreground">GSTIN</span>
        <Input
          className="mt-1 font-mono"
          value={gstin}
          onChange={(e) => setGstin(e.target.value.toUpperCase())}
          maxLength={15}
        />
      </label>
      <label className="block text-sm">
        <span className="text-muted-foreground">Address</span>
        <Input className="mt-1" value={address} onChange={(e) => setAddress(e.target.value)} />
      </label>
      <label className="block text-sm">
        <span className="text-muted-foreground">Phone</span>
        <Input className="mt-1" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </label>
      <label className="block text-sm">
        <span className="text-muted-foreground">Email</span>
        <Input
          className="mt-1"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <div className="flex gap-2">
        <Button type="submit" variant="accent" disabled={submitting}>
          {submitting ? "Saving…" : "Save"}
        </Button>
        <Button type="button" variant="outline" onClick={() => setEditing(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
