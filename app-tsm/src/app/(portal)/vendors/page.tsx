import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { DataTable, SearchFilterBar } from "@/components/app/data-table";
import { CreateVendorForm } from "@/components/app/create-vendor-form";
import { listVendors } from "@/lib/vendors/vendor-repository";

export default async function VendorsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const vendors = await listVendors(q);

  return (
    <>
      <PageHeader
        title="Vendors"
        description="Maintenance, fuel, and supplier registry"
        action={<CreateVendorForm />}
      />
      <SearchFilterBar placeholder="Search vendors…" />
      <DataTable
        rows={vendors}
        emptyMessage="No vendors yet. Create a vendor for maintenance and fuel suppliers."
        columns={[
          {
            key: "name",
            header: "Vendor",
            render: (r) => (
              <Link href={`/vendors/${r.id}`} className="font-medium text-link hover:underline">
                {r.name}
              </Link>
            ),
          },
          { key: "type", header: "Type", render: (r) => r.type },
          { key: "city", header: "City", render: (r) => r.city },
          { key: "contact", header: "Contact", render: (r) => r.contact },
          { key: "open", header: "Open jobs", render: (r) => r.openWorkOrders },
        ]}
      />
    </>
  );
}
