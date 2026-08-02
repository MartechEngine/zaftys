import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable } from "@/components/app/data-table";
import { PartStockActions } from "@/components/app/part-stock-actions";
import { CreatePartForm } from "@/components/app/sprint17-forms";
import { EditPartReorderButton } from "@/components/app/sprint18-forms";
import { listPartsInventory } from "@/lib/maintenance/work-order-repository";
import { MAINTENANCE_NAV } from "@/lib/module-nav";

export default async function MaintenancePartsPage() {
  const parts = await listPartsInventory();
  const lowStock = parts.filter((p) => p.lowStock).length;

  return (
    <>
      <PageHeader
        title="Parts inventory"
        description={
          lowStock > 0
            ? `${lowStock} SKU${lowStock === 1 ? "" : "s"} at or below reorder threshold`
            : "Stock levels and reorder thresholds"
        }
        action={<CreatePartForm />}
      />
      <ModuleSubNav links={MAINTENANCE_NAV} />
      <DataTable
        rows={parts}
        emptyMessage="No parts in inventory yet. Create a SKU to track stock and reorder levels."
        columns={[
          {
            key: "sku",
            header: "SKU",
            render: (r) => <span className="font-mono text-xs">{r.sku}</span>,
          },
          { key: "name", header: "Part", render: (r) => r.name },
          {
            key: "stock",
            header: "In stock",
            render: (r) => (
              <span className={r.lowStock ? "font-medium text-orange" : undefined}>{r.stock}</span>
            ),
          },
          { key: "reorder", header: "Reorder at", render: (r) => r.reorder },
          { key: "location", header: "Location", render: (r) => r.location },
          {
            key: "adjust",
            header: "Adjust",
            render: (r) => (
              <div className="flex flex-wrap gap-2">
                <PartStockActions id={r.id} stock={r.stock} />
                <EditPartReorderButton id={r.id} reorder={r.reorder} location={r.location} />
              </div>
            ),
          },
        ]}
      />
    </>
  );
}
