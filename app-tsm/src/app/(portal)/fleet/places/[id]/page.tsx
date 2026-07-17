import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { PageBreadcrumbs } from "@/components/app/page-breadcrumbs";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { ShipmentStatusChip } from "@/components/app/status-chip";
import { Card, CardContent } from "@/components/ui/card";
import { getPlace } from "@/lib/fleet/places-repository";
import { FLEET_NAV } from "@/lib/module-nav";
import { EditPlaceGeofenceButton } from "@/components/app/sprint11-forms";
import { EditPlaceDetailsButton } from "@/components/app/sprint13-forms";

export default async function PlaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getPlace(id);
  if (!result) notFound();

  const { place, relatedShipments } = result;

  return (
    <>
      <PageBreadcrumbs
        items={[
          { label: "Fleet", href: "/fleet" },
          { label: "Places", href: "/fleet/places" },
          { label: place.name },
        ]}
      />
      <PageHeader title={place.name} description={`${place.type} · ${place.city}`} />
      <ModuleSubNav links={FLEET_NAV} />
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="max-w-lg">
          <CardContent className="space-y-2 p-5 text-sm">
            <p>
              <span className="text-muted-foreground">Geofence radius</span> · {place.geofence}
            </p>
            <p>
              <span className="text-muted-foreground">Active shipments</span> ·{" "}
              {place.activeShipments}
            </p>
            <p>
              <span className="text-muted-foreground">Automation</span> · Status → at_plant on
              enter
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <EditPlaceDetailsButton
                id={place.id}
                name={place.name}
                type={place.type}
                city={place.city}
              />
              <EditPlaceGeofenceButton id={place.id} geofence={place.geofence} />
              <Link href="/settings/geofences" className="text-sm text-link hover:underline">
                Geofence rules →
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <h3 className="font-semibold text-navy">Related shipments</h3>
            {relatedShipments.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">No active trips at this location.</p>
            ) : (
              <ul className="mt-3 divide-y divide-border text-sm">
                {relatedShipments.map((s) => (
                  <li key={s.id} className="flex items-center justify-between py-2">
                    <Link href={`/shipments/${s.id}`} className="text-link hover:underline">
                      {s.publicId}
                    </Link>
                    <ShipmentStatusChip status={s.status} />
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
      <p className="mt-4 text-sm">
        <Link href="/fleet/places" className="text-link hover:underline">
          ← Places
        </Link>
      </p>
    </>
  );
}
