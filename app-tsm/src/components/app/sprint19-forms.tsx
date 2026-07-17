"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";
import { ConfigFieldForm } from "@/components/app/sprint18-forms";

export { ConfigFieldForm };

export function ResendClientUserInviteButton({
  clientId,
  userId,
  status,
  lastLogin,
}: {
  clientId: string;
  userId: string;
  status: string;
  lastLogin?: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  if (status !== "pending" || lastLogin === "Revoked") return null;

  async function onClick() {
    setBusy(true);
    try {
      const result = await api.resendClientUserInvite(clientId, userId);
      const { toastInviteLink } = await import("@/lib/invite-toast");
      toastInviteLink("Portal invite resent", result.invitePath);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not resend invite.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Resend invite"}
    </Button>
  );
}

export function ClearOrchestratorAppliedButton({
  applied,
}: {
  applied?: { publicId: string; shipmentId: string } | null;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  if (!applied) return null;

  async function onClick() {
    setBusy(true);
    try {
      await api.dismissOrchestratorApplied();
      toast.success("Applied plan dismissed");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not dismiss plan.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Dismiss"}
    </Button>
  );
}
