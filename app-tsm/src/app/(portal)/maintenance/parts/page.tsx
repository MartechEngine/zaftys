import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { demoParts } from "@/lib/demo-data";
import { MAINTENANCE_NAV } from "@/lib/module-nav";

export default function MaintenancePartsPage() {
  return (
    <>
      <PageHeader title="Parts inventory" description="Stock levels and reorder thresholds" />
      <ModuleSubNav links={MAINTENANCE_NAV} />
      <DataTable
        rows={demoParts}
        columns={[
          { key: "sku", header: "SKU", render: (r) => <span className="font-mono text-xs">{r.sku}</span> },
          { key: "name", header: "Part", render: (r) => r.name },
          { key: "stock", header: "In stock", render: (r) => r.stock },
          { key: "reorder", header: "Reorder at", render: (r) => r.reorder },
          { key: "location", header: "Location", render: (r) => r.location },
        ]}
      />
    </>
  );
}
