import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { SettingsNav } from "@/components/app/settings-nav";
import { DataTable } from "@/components/app/data-table";
import { demoOrderTypes } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";

export default function SettingsOrderTypesPage() {
  return (
    <>
      <PageHeader title="Settings" description="Order configurations and custom fields" action={<Button variant="accent">Add order type</Button>} />
      <SettingsNav />
      <DataTable
        rows={demoOrderTypes}
        columns={[
          { key: "name", header: "Order type", render: (r) => <Link href={`/settings/order-types/${r.id}`} className="font-medium text-link font-medium">{r.name}</Link> },
          { key: "statuses", header: "Statuses", render: (r) => r.statuses },
          { key: "fields", header: "Custom fields", render: (r) => r.fields },
          { key: "default", header: "Default", render: (r) => (r.default ? "Yes" : "—") },
        ]}
      />
    </>
  );
}
