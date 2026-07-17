import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { DataTable } from "@/components/app/data-table";
import { AutomationToggle } from "@/components/app/automation-toggle";
import { listAutomationRules } from "@/lib/settings/automation-repository";

export default async function SettingsAutomationPage() {
  const rules = await listAutomationRules();

  return (
    <>
      <PageHeader title="Settings" description="Automation triggers on status and events" />
      <SettingsNav />
      <DataTable
        rows={rules}
        columns={[
          {
            key: "trigger",
            header: "When",
            render: (r) => <span className="font-mono text-xs">{r.trigger}</span>,
          },
          { key: "action", header: "Then", render: (r) => r.action },
          {
            key: "enabled",
            header: "Enabled",
            render: (r) => (r.enabled ? "Yes" : "No"),
          },
          {
            key: "matchCount",
            header: "Matches now",
            render: (r) => r.matchCount ?? "—",
          },
          {
            key: "toggle",
            header: "",
            render: (r) => <AutomationToggle id={r.id} enabled={r.enabled} />,
          },
        ]}
      />
    </>
  );
}
