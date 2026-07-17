import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { Card, CardContent } from "@/components/ui/card";
import { listVehicles } from "@/lib/data/shipment-repository";
import { REPORTS_NAV } from "@/lib/module-nav";

export default async function ReportsFleetPage() {
  const vehicles = await listVehicles();
  const onTrip = vehicles.filter((v) => v.status === "on_trip").length;
  const available = vehicles.filter((v) => v.status === "available").length;
  const utilization = Math.round((onTrip / vehicles.length) * 100);

  return (
    <>
      <PageHeader title="Fleet utilization" description="Asset usage and idle time" />
      <ModuleSubNav links={REPORTS_NAV} />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Utilization</p><p className="text-3xl font-bold text-navy">{utilization}%</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">On trip</p><p className="text-3xl font-bold text-navy">{onTrip}</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Available</p><p className="text-3xl font-bold text-navy">{available}</p></CardContent></Card>
      </div>
      <Card>
        <CardContent className="p-5 text-sm text-muted-foreground">
          Empty miles analysis and depot idle time charts — connect Fleetbase analytics in P4.
        </CardContent>
      </Card>
    </>
  );
}
