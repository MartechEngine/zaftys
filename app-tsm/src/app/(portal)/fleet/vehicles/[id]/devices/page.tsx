import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { DataTable, StatusPill } from "@/components/app/data-table";
import { listDevices } from "@/lib/integrations/integrations-repository";
import { listVehicles } from "@/lib/data/shipment-repository";
import { FLEET_NAV } from "@/lib/module-nav";
import { Button } from "@/components/ui/button";

const deviceStatus = {
  online: { label: "Online", className: "bg-emerald-100 text-emerald-800" },
  offline: { label: "Offline", className: "bg-red-100 text-red-800" },
};

export default async function VehicleDevicesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vehicle = (await listVehicles()).find((v) => v.id === id);
  if (!vehicle) notFound();

  const devices = await listDevices(vehicle.registration);

  return (
    <>
      <PageHeader title="Telematics devices" description={vehicle.registration} action={<Button variant="accent" size="sm">Assign device</Button>} />
      <ModuleSubNav links={FLEET_NAV} />
      <DataTable
        rows={devices}
        columns={[
          { key: "imei", header: "IMEI", render: (r) => <span className="font-mono text-xs">{r.imei}</span> },
          { key: "provider", header: "Provider", render: (r) => r.provider },
          { key: "firmware", header: "Firmware", render: (r) => r.firmware },
          { key: "status", header: "Status", render: (r) => <StatusPill status={r.status} map={deviceStatus} /> },
        ]}
      />
      <p className="mt-4 text-sm">
        <Link href={`/fleet/vehicles/${id}`} className="text-link hover:underline">← Vehicle</Link>
      </p>
    </>
  );
}
