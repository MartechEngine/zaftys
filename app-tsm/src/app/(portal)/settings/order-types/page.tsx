import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { DataTable } from "@/components/app/data-table";
import { listOrderTypes } from "@/lib/settings/order-types-repository";
import { CreateOrderTypeForm } from "@/components/app/module-create-forms";

export default async function SettingsOrderTypesPage() {
  const orderTypes = await listOrderTypes();

  return (
    <>
      <PageHeader
        title="Settings"
        description="Order configurations and custom fields"
        action={<CreateOrderTypeForm />}
      />
      <SettingsNav />
      <DataTable
        rows={orderTypes}
        columns={[
          {
            key: "name",
            header: "Order type",
            render: (r) => (
              <Link href={`/settings/order-types/${r.id}`} className="font-medium text-link">
                {r.name}
              </Link>
            ),
          },
          { key: "statuses", header: "Statuses", render: (r) => r.statuses },
          { key: "fields", header: "Custom fields", render: (r) => r.fields },
          { key: "active", header: "Active trips", render: (r) => r.activeShipments },
          { key: "default", header: "Default", render: (r) => (r.default ? "Yes" : "—") },
        ]}
      />
    </>
  );
}
