import { PageHeader } from "@/components/app/app-shell";
import { CreateClientForm } from "@/components/app/create-client-form";
import { listClients } from "@/lib/clients/client-repository";

export default async function NewClientPage() {
  const clients = await listClients();
  const cities = Array.from(
    new Set(clients.map((c) => c.city).filter(Boolean) as string[]),
  ).sort();

  return (
    <>
      <PageHeader
        title="Add client"
        description={`Shipper account · ${clients.length} in registry`}
      />
      <CreateClientForm cities={cities} />
    </>
  );
}
