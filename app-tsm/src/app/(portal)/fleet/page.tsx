import Link from "next/link";
import { Gauge, Truck, User } from "lucide-react";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { IconStatCard } from "@/components/app/ui-primitives";
import { listDrivers, listVehicles } from "@/lib/data/shipment-repository";
import { FleetTabs } from "@/components/app/fleet-tabs";
import { FLEET_NAV } from "@/lib/module-nav";
import { CreateDriverForm, CreateVehicleForm } from "@/components/app/sprint8-forms";

export default async function FleetPage() {
  const [vehicles, drivers] = await Promise.all([listVehicles(), listDrivers()]);
  const expiringCount = vehicles.filter((v) => v.docs === "expiring").length;
  const onTrip = vehicles.filter((v) => v.status === "on_trip").length;

  return (
    <>
      <PageHeader
        title="Fleet"
        description="Vehicles, drivers, and compliance documents"
        eyebrow="Resources"
        action={
          <div className="flex gap-2">
            <CreateDriverForm />
            <CreateVehicleForm />
          </div>
        }
      />

      <ModuleSubNav links={FLEET_NAV} />

      <section className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <IconStatCard label="Vehicles" value={vehicles.length} icon={Truck} />
        <IconStatCard label="Drivers" value={drivers.length} icon={User} />
        <IconStatCard label="On trip" value={onTrip} icon={Gauge} />
        <IconStatCard
          label="Doc alerts"
          value={expiringCount}
          icon={Truck}
        />
      </section>

      {expiringCount > 0 && (
        <div className="mb-4 rounded-xl border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-heading">
          {expiringCount} vehicle(s) have documents expiring within 30 days ·{" "}
          <Link href="/fleet/compliance" className="text-primary hover:underline">
            View compliance
          </Link>
        </div>
      )}

      <FleetTabs vehicles={vehicles} drivers={drivers} />
    </>
  );
}
