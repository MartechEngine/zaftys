"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api-client";

export function InviteClientUserForm({ clientId }: { clientId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const result = await api.inviteClientUser(clientId, {
        name: name.trim(),
        email: email.trim(),
      });
      const { toastInviteLink } = await import("@/lib/invite-toast");
      toastInviteLink("Invite sent", result.invitePath);
      setOpen(false);
      setName("");
      setEmail("");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not invite user.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button variant="accent" size="sm" onClick={() => setOpen(true)}>
        Invite user
      </Button>
    );
  }

  return (
    <Card className="mb-4 max-w-xl">
      <CardContent className="p-5">
        <form className="grid gap-3" onSubmit={onSubmit}>
          <label className="block text-sm">
            <span className="text-muted-foreground">Name</span>
            <Input className="mt-1" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Email</span>
            <Input
              className="mt-1"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <div className="flex gap-2">
            <Button type="submit" variant="accent" disabled={submitting}>
              {submitting ? "Sending…" : "Send invite"}
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
