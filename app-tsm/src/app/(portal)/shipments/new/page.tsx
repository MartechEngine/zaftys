import { PageHeader } from "@/components/app/app-shell";
import { CreateShipmentWizard } from "@/components/app/create-shipment-wizard";

export default function NewShipmentPage() {
  return (
    <>
      <PageHeader title="Create shipment" description="4-step wizard" />
      <CreateShipmentWizard />
    </>
  );
}
