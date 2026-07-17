import Link from "next/link";
import { notFound } from "next/navigation";
import { ShipmentStatusChip } from "@/components/app/status-chip";
import { TrackMap } from "@/components/app/track-map";
import { PortalBackground } from "@/components/effects/portal-background";
import { Card, CardContent } from "@/components/ui/card";
import { APP_NAME, COMPANY_EMAIL } from "@/lib/constants";
import { getShipmentByToken } from "@/lib/data/shipment-repository";
import { glassCard } from "@/lib/surface";
import { cn } from "@/lib/utils";

export default async function TrackPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const shipment = await getShipmentByToken(decodeURIComponent(token));
  if (!shipment) notFound();

  return (
    <div className="relative min-h-screen">
      <PortalBackground />
      <header className={cn(glassCard, "relative z-10 mx-auto mt-4 max-w-lg rounded-2xl px-4 py-4")}>
        <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-brand text-sm font-bold text-white mx-auto">
          Z
        </div>
        <p className="mt-2 text-center text-sm font-medium text-heading">Track your shipment</p>
        <p className="text-center text-xs text-muted-foreground">{shipment.publicId}</p>
      </header>

      <main className="relative z-10 mx-auto max-w-lg px-4 py-8">
        <div className="text-center">
          <ShipmentStatusChip status={shipment.status} />
          <h1 className="mt-4 text-xl font-semibold text-heading">
            {shipment.status === "in_transit"
              ? `Your shipment is on the way to ${shipment.destination}`
              : `Shipment ${shipment.publicId}`}
          </h1>
          {shipment.eta && (
            <p className="mt-2 text-muted-foreground">Expected {shipment.eta}</p>
          )}
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
          <TrackMap
            publicId={shipment.publicId}
            vehicle={shipment.vehicle}
            driver={shipment.driver}
            geo={shipment.geo}
          />
        </div>

        <Card className="mt-4">
          <CardContent className="p-4 text-sm">
            <p>
              <span className="text-muted-foreground">From:</span> {shipment.origin}
            </p>
            <p className="mt-1">
              <span className="text-muted-foreground">To:</span> {shipment.destination}
            </p>
            <p className="mt-1">
              <span className="text-muted-foreground">Load:</span> {shipment.commodity},{" "}
              {shipment.tonnageMt} MT
            </p>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardContent className="p-4 text-sm">
            <p className="font-medium text-heading">Shipment timeline</p>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li>Booked · {shipment.origin}</li>
              {shipment.driver && <li>Dispatched · {shipment.driver}</li>}
              {["in_transit", "delivered", "exception"].includes(shipment.status) && (
                <li>In transit · en route to {shipment.destination}</li>
              )}
              {shipment.status === "delivered" && <li>Delivered · ePOD captured</li>}
            </ul>
          </CardContent>
        </Card>

        {shipment.documents.some((d) => d.type === "epod") && (
          <Card className="mt-4">
            <CardContent className="p-4 text-sm">
              <p className="font-medium text-heading">Proof of delivery</p>
              <ul className="mt-2 space-y-1 text-muted-foreground">
                {shipment.documents
                  .filter((d) => d.type === "epod")
                  .map((d) => (
                    <li key={d.id}>{d.name}</li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        )}

        <footer className="mt-12 text-center text-xs text-muted-foreground">
          <p>Powered by {APP_NAME}™</p>
          <p className="mt-1">
            <a href={`mailto:${COMPANY_EMAIL}`} className="text-navy-bright hover:text-heading">
              {COMPANY_EMAIL}
            </a>
            {" · "}
            <Link href="https://zaftys.com" className="text-navy-bright hover:text-heading">
              zaftys.com
            </Link>
          </p>
        </footer>
      </main>
    </div>
  );
}
