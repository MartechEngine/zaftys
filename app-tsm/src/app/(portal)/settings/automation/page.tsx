import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { DataTable } from "@/components/app/data-table";
import { demoAutomationRules } from "@/lib/demo-data";

export default function SettingsAutomationPage() {
  return (
    <>
      <PageHeader title="Settings" description="Automation triggers on status and events" />
      <SettingsNav />
      <DataTable
        rows={demoAutomationRules}
        columns={[
          { key: "trigger", header: "When", render: (r) => <span className="font-mono text-xs">{r.trigger}</span> },
          { key: "action", header: "Then", render: (r) => r.action },
          { key: "enabled", header: "Enabled", render: (r) => (r.enabled ? "Yes" : "No") },
        ]}
      />
    </>
  );
}
