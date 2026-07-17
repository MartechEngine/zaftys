import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable, StatusPill } from "@/components/app/data-table";
import { demoOrchestratorPhases } from "@/lib/demo-data";
import { DISPATCH_NAV } from "@/lib/module-nav";
import { Button } from "@/components/ui/button";

const phaseStatus = {
  complete: { label: "Complete", className: "bg-emerald-100 text-emerald-800" },
  running: { label: "Running", className: "bg-blue-100 text-blue-800" },
  pending: { label: "Pending", className: "bg-muted text-muted-foreground" },
};

export default function DispatchOrchestratorPage() {
  return (
    <>
      <PageHeader
        title="Orchestrator"
        description="Multi-phase optimization pipeline for new orders"
        action={<Button variant="accent">Run pipeline</Button>}
      />
      <ModuleSubNav links={DISPATCH_NAV} />
      <Card className="mb-6 max-w-2xl">
        <CardContent className="p-5 text-sm">
          <p><span className="text-muted-foreground">Hands-free mode</span> · Disabled · <span className="text-accent">Configure in settings</span></p>
          <p className="mt-2 text-muted-foreground">Last run: ZFT-2026-0143 · 2.4s · assigned to network overflow</p>
        </CardContent>
      </Card>
      <DataTable
        rows={demoOrchestratorPhases}
        columns={[
          { key: "name", header: "Phase", render: (r) => r.name },
          { key: "status", header: "Status", render: (r) => <StatusPill status={r.status} map={phaseStatus} /> },
          { key: "duration", header: "Duration", render: (r) => r.duration },
        ]}
      />
      <Card className="mt-6 max-w-2xl">
        <CardContent className="p-5 text-sm">
          <h3 className="font-semibold text-navy">Review plan</h3>
          <p className="mt-2 text-muted-foreground">
            Proposed: assign ZFT-2026-0143 to Maharashtra Hauliers (network) · ETA Tomorrow 10:00
          </p>
          <div className="mt-4 flex gap-2">
            <Button variant="accent" size="sm">Approve & dispatch</Button>
            <Button variant="outline" size="sm">Edit assignment</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
