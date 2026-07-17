import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { GlobalDocumentUpload } from "@/components/app/global-document-upload";
import { Card, CardContent } from "@/components/ui/card";
import { listShipments } from "@/lib/data/shipment-repository";

export const dynamic = "force-dynamic";

export default async function DocumentUploadPage() {
  const shipments = await listShipments();
  const options = shipments.map((s) => ({
    id: s.id,
    publicId: s.publicId,
    client: s.client,
  }));

  return (
    <>
      <PageHeader title="Upload document" description="LR, ePOD, weighbridge slip, or invoice" />
      <Card className="max-w-lg">
        <CardContent className="p-6">
          <GlobalDocumentUpload shipments={options} />
        </CardContent>
      </Card>
      <p className="mt-6 text-sm text-muted-foreground">
        <Link href="/documents" className="text-link hover:underline">
          ← Back to documents
        </Link>
      </p>
    </>
  );
}
