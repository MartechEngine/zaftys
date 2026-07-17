import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { DataTable } from "@/components/app/data-table";
import { demoGroups } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";

export default function SettingsGroupsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Bulk policy assignment via groups" action={<Button variant="accent">Create group</Button>} />
      <SettingsNav />
      <DataTable
        rows={demoGroups}
        columns={[
          { key: "name", header: "Group", render: (r) => r.name },
          { key: "members", header: "Members", render: (r) => r.members },
          { key: "policy", header: "Policy", render: (r) => r.policy },
        ]}
      />
    </>
  );
}
