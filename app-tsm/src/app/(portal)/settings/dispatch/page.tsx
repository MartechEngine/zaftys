import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { Card, CardContent } from "@/components/ui/card";

export default function SettingsDispatchPage() {
  return (
    <>
      <PageHeader title="Settings" description="Dispatch board and orchestrator defaults" />
      <SettingsNav />
      <Card>
        <CardContent className="p-6 space-y-3 text-sm">
          <p><strong>Kanban columns:</strong> Unassigned → Assigned → In progress → Completed</p>
          <p><strong>Orchestrator:</strong> Manual review before dispatch (demo)</p>
          <p><strong>Auto-assign:</strong> Disabled</p>
        </CardContent>
      </Card>
    </>
  );
}
