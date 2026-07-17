import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { ModuleSubNav } from "@/components/app/module-sub-nav";
import { Card, CardContent } from "@/components/ui/card";
import { demoPlaces } from "@/lib/demo-data";
import { FLEET_NAV } from "@/lib/module-nav";

export default async function PlaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const place = demoPlaces.find((p) => p.id === id);
  if (!place) notFound();

  return (
    <>
      <PageHeader title={place.name} description={`${place.type} · ${place.city}`} />
      <ModuleSubNav links={FLEET_NAV} />
      <Card className="max-w-lg">
        <CardContent className="space-y-2 p-5 text-sm">
          <p><span className="text-muted-foreground">Geofence radius</span> · {place.geofence}</p>
          <p><span className="text-muted-foreground">Coordinates</span> · 20.9333°N, 77.7500°E</p>
          <p><span className="text-muted-foreground">Automation</span> · Status → at_plant on enter</p>
          <Link href="/settings/geofences" className="inline-block text-link hover:underline">Edit geofence rules</Link>
        </CardContent>
      </Card>
      <p className="mt-4 text-sm">
        <Link href="/fleet/places" className="text-link hover:underline">← Places</Link>
      </p>
    </>
  );
}
