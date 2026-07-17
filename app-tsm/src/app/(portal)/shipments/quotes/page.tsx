import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { DataTable, SearchFilterBar, StatusPill } from "@/components/app/data-table";
import { CreateQuoteForm } from "@/components/app/create-quote-form";
import { listQuotes } from "@/lib/shipments/quotes-repository";

const quoteStatus = {
  sent: { label: "Sent", className: "bg-blue-100 text-blue-800" },
  draft: { label: "Draft", className: "bg-muted text-muted-foreground" },
  accepted: { label: "Accepted", className: "bg-emerald-100 text-emerald-800" },
};

export default async function ShipmentsQuotesPage() {
  const quotes = await listQuotes();

  return (
    <>
      <PageHeader
        title="Quotes"
        description="On-demand freight quotations"
        action={<CreateQuoteForm defaultClient={quotes[0]?.client} />}
      />
      <SearchFilterBar placeholder="Search quotes…" />
      <DataTable
        rows={quotes}
        columns={[
          { key: "client", header: "Client", render: (r) => r.client },
          { key: "route", header: "Route", render: (r) => r.route },
          { key: "tonnage", header: "Tonnage", render: (r) => `${r.tonnage} MT` },
          { key: "rate", header: "Quoted rate", render: (r) => r.rate },
          { key: "validUntil", header: "Valid until", render: (r) => r.validUntil },
          {
            key: "status",
            header: "Status",
            render: (r) => <StatusPill status={r.status} map={quoteStatus} />,
          },
        ]}
      />
      <p className="mt-4 text-sm">
        <Link href="/shipments" className="text-link hover:underline">
          ← Shipments
        </Link>
      </p>
    </>
  );
}
