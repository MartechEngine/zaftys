import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { DataTable, StatusPill } from "@/components/app/data-table";
import { listOrgUsers } from "@/lib/settings/users-repository";
import { InviteOrgUserForm } from "@/components/app/module-create-forms";
import { ActivateUserButton } from "@/components/app/sprint10-forms";
import { ChangeUserRoleButton, DeactivateUserButton } from "@/components/app/sprint13-forms";

const userStatus = {
  active: { label: "Active", className: "bg-emerald-100 text-emerald-800" },
  pending: { label: "Pending", className: "bg-amber-100 text-amber-800" },
};

export default async function SettingsUsersPage() {
  const users = await listOrgUsers();

  return (
    <>
      <PageHeader
        title="Settings"
        description="User management and invites"
        action={<InviteOrgUserForm />}
      />
      <SettingsNav />
      <DataTable
        rows={users}
        columns={[
          { key: "name", header: "Name", render: (r) => r.name },
          { key: "email", header: "Email", render: (r) => r.email },
          { key: "role", header: "Role", render: (r) => r.role },
          {
            key: "status",
            header: "Status",
            render: (r) => <StatusPill status={r.status} map={userStatus} />,
          },
          {
            key: "actions",
            header: "",
            render: (r) => (
              <div className="flex flex-wrap gap-2">
                <ActivateUserButton id={r.id} status={r.status} />
                <ChangeUserRoleButton id={r.id} role={r.role} />
                <DeactivateUserButton id={r.id} status={r.status} />
              </div>
            ),
          },
        ]}
      />
    </>
  );
}
