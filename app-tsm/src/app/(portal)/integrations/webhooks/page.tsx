import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { listWebhooks } from "@/lib/integrations/integrations-repository";
import { StatusPill } from "@/components/app/data-table";
import { INTEGRATIONS_NAV } from "@/lib/module-nav";
import { CreateWebhookForm } from "@/components/app/module-create-forms";

const whStatus = {
  active: { label: "Active", className: "bg-emerald-100 text-emerald-800" },
  failed: { label: "Failed", className: "bg-red-100 text-red-800" },
};

export default async function IntegrationsWebhooksPage() {
  const webhooks = await listWebhooks();

  return (
    <>
      <PageHeader
        title="Webhooks"
        description="Outbound event subscriptions"
        action={<CreateWebhookForm />}
      />
      <ModuleSubNav links={INTEGRATIONS_NAV} />
      <DataTable
        rows={webhooks}
        columns={[
          { key: "url", header: "Endpoint", render: (r) => r.url },
          { key: "events", header: "Events", render: (r) => r.events },
          { key: "status", header: "Status", render: (r) => <StatusPill status={r.status} map={whStatus} /> },
          { key: "last", header: "Last delivery", render: (r) => r.lastDelivery },
        ]}
      />
      <p className="mt-4 text-sm">
        <Link href="/integrations" className="text-link hover:underline">← Integrations</Link>
      </p>
    </>
  );
}
