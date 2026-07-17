import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { listSocketChannels } from "@/lib/integrations/integrations-repository";
import { INTEGRATIONS_NAV } from "@/lib/module-nav";

export default async function SocketsPage() {
  const channels = await listSocketChannels();
  const demoUi = process.env.TSM_DEMO_UI !== "0";

  return (
    <>
      <PageHeader title="WebSocket channels" description="SocketCluster channel debugger" />
      <ModuleSubNav links={INTEGRATIONS_NAV} />
      {!demoUi && channels.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-10 text-center text-sm text-muted-foreground">
          No live socket channels connected. Configure SocketCluster / realtime transport to see
          subscribers here.
        </div>
      ) : (
        <DataTable
          rows={channels}
          emptyMessage="No socket channels connected."
          columns={[
            {
              key: "channel",
              header: "Channel",
              render: (r) => (
                <span className="inline-flex items-center gap-2 font-mono text-xs">
                  {r.channel}
                  {r.demo ? (
                    <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-sans uppercase tracking-wide text-amber-200">
                      Demo sample
                    </span>
                  ) : null}
                </span>
              ),
            },
            { key: "subscribers", header: "Subscribers", render: (r) => r.subscribers },
            { key: "lastMessage", header: "Last message", render: (r) => r.lastMessage },
          ]}
        />
      )}
    </>
  );
}
