import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { DataTable } from "@/components/app/data-table";
import { listSettingsGroups } from "@/lib/settings/groups-repository";
import { CreateSettingsGroupForm } from "@/components/app/module-create-forms";

export default async function SettingsGroupsPage() {
  const groups = await listSettingsGroups();

  return (
    <>
      <PageHeader
        title="Settings"
        description="Bulk policy assignment via groups"
        action={<CreateSettingsGroupForm />}
      />
      <SettingsNav />
      <DataTable
        rows={groups}
        columns={[
          { key: "name", header: "Group", render: (r) => r.name },
          { key: "members", header: "Members", render: (r) => r.members },
          { key: "policy", header: "Policy", render: (r) => r.policy },
        ]}
      />
    </>
  );
}
