import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";
import { getDispatchSettings } from "@/lib/settings/config-repository";
import { ConfigToggleForm } from "@/components/app/config-toggle-form";
import { ConfigFieldForm } from "@/components/app/sprint17-forms";

export default async function SettingsDispatchPage() {
  const settings = await getDispatchSettings();

  return (
    <>
      <PageHeader title="Settings" description="Dispatch board and orchestrator defaults" />
      <SettingsNav />
      <Card>
        <CardContent className="space-y-3 p-6 text-sm">
          <p>
            <strong>Kanban columns:</strong> {settings.kanbanColumns.join(" → ")}
          </p>
          <p>
            <strong>Orchestrator:</strong> {settings.orchestratorMode}
          </p>
          <p>
            <strong>Auto-assign:</strong> {settings.autoAssign ? "Enabled" : "Disabled"}
          </p>
          <p>
            <strong>Live queue:</strong> {settings.unassignedCount} unassigned ·{" "}
            {settings.activeShipments} active shipments
          </p>
          <ConfigToggleForm
            section="dispatch"
            field="autoAssign"
            label="auto-assign"
            current={settings.autoAssign}
          />
          <ConfigFieldForm
            section="dispatch"
            field="orchestratorMode"
            label="Orchestrator mode"
            value={settings.orchestratorMode}
          />
          <ConfigFieldForm
            section="dispatch"
            field="kanbanColumns"
            label="Kanban columns (comma or → separated)"
            value={settings.kanbanColumns.join(" → ")}
          />
        </CardContent>
      </Card>
    </>
  );
}
