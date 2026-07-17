import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { DataTable } from "@/components/app/data-table";
import { listOrgRoles } from "@/lib/settings/roles-repository";
import { CreateRoleForm } from "@/components/app/module-create-forms";
import { RenameRoleButton } from "@/components/app/sprint11-forms";
import { RolePermissionsMatrix } from "@/components/app/sprint16-forms";
import { DeleteOrgRoleButton } from "@/components/app/sprint17-forms";

export default async function SettingsRolesPage() {
  const roles = await listOrgRoles();

  return (
    <>
      <PageHeader
        title="Settings"
        description="Roles and permissions"
        action={<CreateRoleForm />}
      />
      <SettingsNav />
      <DataTable
        rows={roles}
        columns={[
          { key: "name", header: "Role", render: (r) => r.name },
          { key: "users", header: "Users", render: (r) => r.users },
          {
            key: "type",
            header: "Type",
            render: (r) => (r.type === "org" ? "Organization" : "System"),
          },
          {
            key: "permissions",
            header: "Permissions",
            render: (r) => (
              <RolePermissionsMatrix roleId={r.id} permissions={r.permissions} />
            ),
          },
          {
            key: "actions",
            header: "",
            render: (r) => (
              <div className="flex flex-wrap gap-2">
                <RenameRoleButton id={r.id} name={r.name} />
                <DeleteOrgRoleButton id={r.id} name={r.name} type={r.type} />
              </div>
            ),
          },
        ]}
      />
    </>
  );
}
