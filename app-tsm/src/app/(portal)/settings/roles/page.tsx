import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { DataTable } from "@/components/app/data-table";
import { demoRoles } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";

export default function SettingsRolesPage() {
  return (
    <>
      <PageHeader title="Settings" description="Roles and permissions" action={<Button variant="accent">New role</Button>} />
      <SettingsNav />
      <DataTable
        rows={demoRoles}
        columns={[
          { key: "name", header: "Role", render: (r) => r.name },
          { key: "users", header: "Users", render: (r) => r.users },
          { key: "type", header: "Type", render: (r) => r.type === "org" ? "Organization" : "System" },
        ]}
      />
    </>
  );
}
