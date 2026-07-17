import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { listSocketChannels } from "@/lib/integrations/integrations-repository";
import { INTEGRATIONS_NAV } from "@/lib/module-nav";

export default async function SocketsPage() {
  const channels = await listSocketChannels();

  return (
    <>
      <PageHeader title="WebSocket channels" description="SocketCluster channel debugger" />
      <ModuleSubNav links={INTEGRATIONS_NAV} />
      <DataTable
        rows={channels}
        columns={[
          { key: "channel", header: "Channel", render: (r) => <span className="font-mono text-xs">{r.channel}</span> },
          { key: "subscribers", header: "Subscribers", render: (r) => r.subscribers },
          { key: "lastMessage", header: "Last message", render: (r) => r.lastMessage },
        ]}
      />
    </>
  );
}
