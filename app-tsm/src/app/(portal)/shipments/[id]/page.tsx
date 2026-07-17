import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/app-shell";
import { PageBreadcrumbs } from "@/components/app/page-breadcrumbs";
import { ShipmentDetailClient } from "@/components/app/shipment-detail-client";
import { getShipment } from "@/lib/data/shipment-repository";

export default async function ShipmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const shipment = await getShipment(id);
  if (!shipment) notFound();

  return (
    <>
      <PageBreadcrumbs
        items={[
          { label: "Shipments", href: "/shipments" },
          { label: shipment.publicId },
        ]}
      />
      <PageHeader
        title={shipment.publicId}
        description={`${shipment.origin} → ${shipment.destination}`}
      />
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading shipment…</p>}>
        <ShipmentDetailClient shipment={shipment} />
      </Suspense>
    </>
  );
}
