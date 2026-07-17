"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api-client";

export function AcceptQuoteButton({
  quoteId,
  status,
  shipmentId,
}: {
  quoteId: string;
  status: string;
  shipmentId?: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  if (status === "accepted" && shipmentId) {
    return (
      <Button variant="outline" size="sm" asChild>
        <Link href={`/shipments/${shipmentId}`}>Open trip</Link>
      </Button>
    );
  }

  if (status === "accepted") return null;

  async function onClick() {
    setBusy(true);
    try {
      const result = await api.acceptQuote(quoteId);
      toast.success(`Quote accepted · ${result.shipment.publicId}`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not accept quote.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="accent" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Accept → trip"}
    </Button>
  );
}

export function CreateIssueForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [vehicle, setVehicle] = useState("MH-27-AB-1234");
  const [driver, setDriver] = useState("R. Sharma");
  const [issue, setIssue] = useState("");
  const [severity, setSeverity] = useState<"high" | "medium" | "low">("medium");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createFleetIssue({ vehicle, driver, issue, severity });
      toast.success("Issue reported");
      setOpen(false);
      setIssue("");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create issue.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <Button variant="accent" size="sm" onClick={() => setOpen(true)}>
        Report issue
      </Button>
    );
  }

  return (
    <Card className="mb-4 max-w-lg">
      <CardContent className="p-5">
        <form className="grid gap-3" onSubmit={onSubmit}>
          <label className="block text-sm">
            <span className="text-muted-foreground">Vehicle</span>
            <Input className="mt-1" value={vehicle} onChange={(e) => setVehicle(e.target.value)} required />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Driver</span>
            <Input className="mt-1" value={driver} onChange={(e) => setDriver(e.target.value)} required />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Issue</span>
            <Input className="mt-1" value={issue} onChange={(e) => setIssue(e.target.value)} required />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Severity</span>
            <select
              className="mt-1 h-9 w-full rounded-md border border-white/10 bg-white/[0.05] px-3 text-sm"
              value={severity}
              onChange={(e) => setSeverity(e.target.value as "high" | "medium" | "low")}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>
          <div className="flex gap-2">
            <Button type="submit" variant="accent" disabled={submitting}>
              {submitting ? "Saving…" : "Submit"}
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

export function ResolveIssueButton({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    setBusy(true);
    try {
      await api.resolveFleetIssue(id);
      toast.success("Issue resolved");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not resolve.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Resolve"}
    </Button>
  );
}

export function RenewComplianceButton({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  if (status === "valid") return <span className="text-xs text-muted-foreground">OK</span>;

  async function onClick() {
    setBusy(true);
    try {
      await api.updateComplianceDoc(id, "valid");
      toast.success("Document marked valid");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Mark renewed"}
    </Button>
  );
}

export function VerifyPartnerButton({
  id,
  verified,
}: {
  id: string;
  verified: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  if (verified) return <span className="text-xs text-emerald-600">Verified</span>;

  async function onClick() {
    setBusy(true);
    try {
      await api.verifyPartner(id);
      toast.success("Partner verified");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not verify.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Verify"}
    </Button>
  );
}

export function ActivateUserButton({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  if (status === "active") return null;

  async function onClick() {
    setBusy(true);
    try {
      await api.activateOrgUser(id);
      toast.success("User activated");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not activate.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Activate"}
    </Button>
  );
}

export function RunCustomReportButton({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  if (status !== "ready") return null;

  async function onClick() {
    setBusy(true);
    try {
      const result = await api.runCustomReport(id);
      toast.success(`Ran · ${result.run.metric}`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not run report.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Run now"}
    </Button>
  );
}
