import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { DataTable } from "@/components/app/data-table";
import { listSettingsGroups } from "@/lib/settings/groups-repository";
import { CreateSettingsGroupForm } from "@/components/app/module-create-forms";
import { EditGroupPolicyButton } from "@/components/app/sprint11-forms";
import { RenameSettingsGroupButton } from "@/components/app/sprint14-forms";
import {
  AddSettingsGroupMemberButton,
  RemoveSettingsGroupMemberButton,
} from "@/components/app/sprint16-forms";

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
          {
            key: "actions",
            header: "",
            render: (r) => (
              <div className="flex flex-wrap gap-2">
                <RenameSettingsGroupButton id={r.id} name={r.name} />
                <EditGroupPolicyButton id={r.id} policy={r.policy} />
                <AddSettingsGroupMemberButton groupId={r.id} />
                <RemoveSettingsGroupMemberButton groupId={r.id} />
              </div>
            ),
          },
        ]}
      />
    </>
  );
}
