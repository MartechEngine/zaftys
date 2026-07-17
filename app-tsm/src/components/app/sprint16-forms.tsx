"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api-client";
import type { RolePermissionModule } from "@/lib/mutations/sprint16-store";

export function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setBusy(true);
    try {
      await api.completePasswordReset({
        email: email.trim(),
        password,
        confirmPassword,
      });
      setDone(true);
      toast.success("Password updated (demo stub)");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not reset password.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <p className="mt-4 text-sm text-emerald-700">
        Password updated for {email}. You can sign in with your new password (local demo).
      </p>
    );
  }

  return (
    <form className="mt-8 space-y-4" onSubmit={onSubmit}>
      <label className="block text-sm">
        <span className="text-muted-foreground">Email</span>
        <Input
          type="email"
          className="mt-1"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="block text-sm">
        <span className="text-muted-foreground">New password</span>
        <Input
          type="password"
          className="mt-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
        />
      </label>
      <label className="block text-sm">
        <span className="text-muted-foreground">Confirm password</span>
        <Input
          type="password"
          className="mt-1"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          minLength={8}
          required
        />
      </label>
      <Button type="submit" className="w-full" disabled={busy}>
        {busy ? "Updating…" : "Update password"}
      </Button>
    </form>
  );
}

export function EditReportScheduleRecipientsButton({
  id,
  recipients,
}: {
  id: string;
  recipients: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    const next = window.prompt("Recipients (comma-separated emails)", recipients)?.trim();
    if (!next || next === recipients) return;
    setBusy(true);
    try {
      await api.patchReportSchedule(id, { recipients: next });
      toast.success("Recipients updated");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update recipients.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Edit recipients"}
    </Button>
  );
}

export function AddSettingsGroupMemberButton({ groupId }: { groupId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    const userId = window.prompt("User ID to add (e.g. u1, u2)")?.trim();
    if (!userId) return;
    setBusy(true);
    try {
      await api.addSettingsGroupMember(groupId, userId);
      toast.success("Member added to group");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add member.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Add member"}
    </Button>
  );
}

export function RemoveSettingsGroupMemberButton({ groupId }: { groupId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    const userId = window.prompt("User ID to remove (e.g. u1, u2)")?.trim();
    if (!userId) return;
    if (!window.confirm(`Remove user ${userId} from this group?`)) return;
    setBusy(true);
    try {
      await api.removeSettingsGroupMember(groupId, userId);
      toast.success("Member removed from group");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not remove member.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Remove member"}
    </Button>
  );
}

export function RemoveFleetGroupMemberButton({
  groupId,
  driver,
  vehicle,
}: {
  groupId: string;
  driver: string;
  vehicle: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    if (!window.confirm(`Remove ${driver} · ${vehicle} from this fleet group?`)) return;
    setBusy(true);
    try {
      await api.removeFleetGroupMember(groupId, { driver, vehicle });
      toast.success("Member removed");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not remove member.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Remove"}
    </Button>
  );
}

const PERMISSION_LABELS: Record<RolePermissionModule, string> = {
  dispatch: "Dispatch",
  fleet: "Fleet",
  billing: "Billing",
  settings: "Settings",
  reports: "Reports",
  documents: "Documents",
};

export function RolePermissionsMatrix({
  roleId,
  permissions,
}: {
  roleId: string;
  permissions: Record<RolePermissionModule, boolean>;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function toggle(module: RolePermissionModule, enabled: boolean) {
    setBusy(module);
    try {
      await api.patchRolePermissions(roleId, { [module]: enabled });
      toast.success(`${PERMISSION_LABELS[module]} ${enabled ? "enabled" : "disabled"}`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update permission.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="flex flex-wrap gap-1">
      {(Object.keys(PERMISSION_LABELS) as RolePermissionModule[]).map((module) => {
        const on = permissions[module];
        return (
          <Button
            key={module}
            variant={on ? "default" : "outline"}
            size="sm"
            className="h-7 px-2 text-xs"
            disabled={busy === module}
            onClick={() => toggle(module, !on)}
          >
            {busy === module ? "…" : PERMISSION_LABELS[module]}
          </Button>
        );
      })}
    </div>
  );
}

export function EditNotificationRecipientsButton({
  id,
  recipients,
}: {
  id: string;
  recipients: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    const next = window.prompt("Recipients", recipients)?.trim();
    if (!next || next === recipients) return;
    setBusy(true);
    try {
      await api.patchNotificationRecipients(id, next);
      toast.success("Recipients updated");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update recipients.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "…" : "Edit recipients"}
    </Button>
  );
}

export function ExportCsvButton({ path, filename }: { path: string; filename: string }) {
  const [busy, setBusy] = useState(false);

  async function onClick() {
    setBusy(true);
    try {
      const res = await fetch(path, { cache: "no-store" });
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("CSV downloaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not export CSV.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy}>
      {busy ? "Exporting…" : "Export CSV"}
    </Button>
  );
}
