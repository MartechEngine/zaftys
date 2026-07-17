import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable, StatusPill } from "@/components/app/data-table";
import { getOrchestratorState } from "@/lib/dispatch/orchestrator";
import { DISPATCH_NAV } from "@/lib/module-nav";
import { RunOrchestratorButton } from "@/components/app/module-create-forms";
import { Button } from "@/components/ui/button";

const phaseStatus = {
  complete: { label: "Complete", className: "bg-emerald-100 text-emerald-800" },
  running: { label: "Running", className: "bg-blue-100 text-blue-800" },
  pending: { label: "Pending", className: "bg-muted text-muted-foreground" },
};

export default async function DispatchOrchestratorPage() {
  const state = await getOrchestratorState();

  return (
    <>
      <PageHeader
        title="Orchestrator"
        description={`${state.pendingTargets} pending targets · ${state.openOverflow} open overflow loads`}
        action={<RunOrchestratorButton />}
      />
      <ModuleSubNav links={DISPATCH_NAV} />
      <Card className="mb-6 max-w-2xl">
        <CardContent className="p-5 text-sm">
          <p>
            <span className="text-muted-foreground">Hands-free mode</span> ·{" "}
            {state.handsFreeMode ? "Enabled" : "Disabled"} ·{" "}
            <Link href="/settings/dispatch" className="text-accent hover:underline">
              Configure in settings
            </Link>
          </p>
          {state.lastRun ? (
            <p className="mt-2 text-muted-foreground">
              Last run: {state.lastRun.publicId} · {state.lastRun.duration} ·{" "}
              {state.lastRun.outcome}
            </p>
          ) : (
            <p className="mt-2 text-muted-foreground">No pending shipments to orchestrate.</p>
          )}
        </CardContent>
      </Card>
      <DataTable
        rows={state.phases}
        columns={[
          { key: "name", header: "Phase", render: (r) => r.name },
          {
            key: "status",
            header: "Status",
            render: (r) => <StatusPill status={r.status} map={phaseStatus} />,
          },
          { key: "duration", header: "Duration", render: (r) => r.duration },
        ]}
      />
      {state.proposal && (
        <Card className="mt-6 max-w-2xl">
          <CardContent className="p-5 text-sm">
            <h3 className="font-semibold text-navy">Review plan</h3>
            <p className="mt-2 text-muted-foreground">
              Proposed: {state.proposal.action} for{" "}
              <Link href={`/shipments/${state.proposal.shipmentId}`} className="text-link hover:underline">
                {state.proposal.publicId}
              </Link>{" "}
              → {state.proposal.partner} · {state.proposal.route} · ETA {state.proposal.eta}
            </p>
            <div className="mt-4 flex gap-2">
              <Button variant="accent" size="sm" asChild>
                <Link href={`/shipments/${state.proposal.shipmentId}`}>Review shipment</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/network/overflow">View overflow</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
