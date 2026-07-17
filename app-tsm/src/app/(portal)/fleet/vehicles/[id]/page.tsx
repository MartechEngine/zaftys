import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { PageBreadcrumbs } from "@/components/app/page-breadcrumbs";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { RecentShipmentsList } from "@/components/app/recent-shipments-list";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/app/data-table";
import { getVehicle } from "@/lib/data/fleet-repository";
import { listDevices } from "@/lib/integrations/integrations-repository";
import { FLEET_NAV } from "@/lib/module-nav";
import { EditVehicleForm } from "@/components/app/sprint7-forms";

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vehicle = await getVehicle(id);
  if (!vehicle) notFound();

  const devices = await listDevices(vehicle.registration);

  return (
    <>
      <PageBreadcrumbs
        items={[
          { label: "Fleet", href: "/fleet" },
          { label: vehicle.registration },
        ]}
      />
      <PageHeader
        title={vehicle.registration}
        description={`${vehicle.type} · ${vehicle.capacityMt} MT capacity`}
        action={<EditVehicleForm vehicle={vehicle} />}
      />
      <ModuleSubNav links={FLEET_NAV} />
      <div className="mb-4 text-sm">
        <Link href={`/fleet/vehicles/${id}/devices`} className="text-link hover:underline">
          Telematics devices →
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="space-y-2 p-5 text-sm">
            <p>
              <span className="text-muted-foreground">Status</span> ·{" "}
              <span className="capitalize">{vehicle.status.replace("_", " ")}</span>
            </p>
            <p>
              <span className="text-muted-foreground">Assigned driver</span> ·{" "}
              {vehicle.driver ?? "—"}
            </p>
            <p>
              <span className="text-muted-foreground">Documents</span> ·{" "}
              <span className="capitalize">{vehicle.docs}</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <h3 className="font-semibold text-navy">Linked devices</h3>
            {devices.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">No device assigned</p>
            ) : (
              <DataTable
                rows={devices}
                columns={[
                  {
                    key: "imei",
                    header: "IMEI",
                    render: (r) => <span className="font-mono text-xs">{r.imei}</span>,
                  },
                  { key: "provider", header: "Provider", render: (r) => r.provider },
                  { key: "status", header: "Status", render: (r) => r.status },
                ]}
              />
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardContent className="p-5">
          <h3 className="font-semibold text-navy">Recent shipments</h3>
          <div className="mt-3">
            <RecentShipmentsList shipments={vehicle.recentShipments} />
          </div>
        </CardContent>
      </Card>

      <p className="mt-6 text-sm">
        <Link href="/fleet" className="text-link hover:underline">
          ← Fleet
        </Link>
      </p>
    </>
  );
}
