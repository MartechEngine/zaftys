import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { DataTable } from "@/components/app/data-table";
import { demoUsers } from "@/lib/demo-data";
import { StatusPill } from "@/components/app/data-table";
import { Button } from "@/components/ui/button";

const userStatus = {
  active: { label: "Active", className: "bg-emerald-100 text-emerald-800" },
  pending: { label: "Pending", className: "bg-amber-100 text-amber-800" },
};

export default function SettingsUsersPage() {
  return (
    <>
      <PageHeader title="Settings" description="User management and invites" action={
        <Button variant="accent" asChild>
          <Link href="/invite/demo-invite-token">Invite user</Link>
        </Button>
      } />
      <SettingsNav />
      <DataTable
        rows={demoUsers}
        columns={[
          { key: "name", header: "Name", render: (r) => r.name },
          { key: "email", header: "Email", render: (r) => r.email },
          { key: "role", header: "Role", render: (r) => r.role },
          { key: "status", header: "Status", render: (r) => <StatusPill status={r.status} map={userStatus} /> },
        ]}
      />
    </>
  );
}
