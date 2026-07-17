import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { demoSocketChannels } from "@/lib/demo-data";
import { INTEGRATIONS_NAV } from "@/lib/module-nav";

export default function SocketsPage() {
  return (
    <>
      <PageHeader title="WebSocket channels" description="SocketCluster channel debugger" />
      <ModuleSubNav links={INTEGRATIONS_NAV} />
      <DataTable
        rows={demoSocketChannels}
        columns={[
          { key: "channel", header: "Channel", render: (r) => <span className="font-mono text-xs">{r.channel}</span> },
          { key: "subscribers", header: "Subscribers", render: (r) => r.subscribers },
          { key: "lastMessage", header: "Last message", render: (r) => r.lastMessage },
        ]}
      />
    </>
  );
}
