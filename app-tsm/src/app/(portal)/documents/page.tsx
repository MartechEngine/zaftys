import Link from "next/link";
import { PageHeader } from "@/components/app/app-shell";
import { DataTable, type DataTableColumn } from "@/components/app/data-table";
import { listAllDocuments } from "@/lib/data/shipment-repository";
import type { DocumentLibraryEntry } from "@/lib/documents/library";
import { Button } from "@/components/ui/button";
import { ExportCsvButton } from "@/components/app/sprint16-forms";

export const dynamic = "force-dynamic";

const DOC_TYPES = [
  { value: "all", label: "All types" },
  { value: "lr", label: "LR" },
  { value: "epod", label: "ePOD" },
  { value: "invoice", label: "Invoice" },
  { value: "other", label: "Other" },
] as const;

const columns: DataTableColumn<DocumentLibraryEntry>[] = [
  {
    key: "name",
    header: "File",
    render: (r) => <span className="font-medium text-navy">{r.name}</span>,
  },
  { key: "type", header: "Type", render: (r) => r.typeLabel },
  {
    key: "shipment",
    header: "Shipment",
    render: (r) => (
      <Link href={`/shipments/${r.shipmentId}`} className="font-mono text-xs text-link">
        {r.shipmentPublicId}
      </Link>
    ),
  },
  { key: "client", header: "Client", render: (r) => r.client },
  { key: "date", header: "Uploaded", render: (r) => r.uploadedLabel },
];

export default async function DocumentsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string }>;
}) {
  const { q = "", type = "all" } = await searchParams;
  const query = q.trim();
  const typeKey = DOC_TYPES.some((t) => t.value === type) ? type : "all";

  const documents = await listAllDocuments({
    q: query || undefined,
    type: typeKey === "all" ? undefined : typeKey,
  });

  return (
    <>
      <PageHeader
        title="Documents"
        description="LR, ePOD, weighbridge slips, and invoices across all shipments"
        action={
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/documents/upload">Upload</Link>
            </Button>
            <ExportCsvButton
              path={`/api/documents/export?${new URLSearchParams({
                ...(query ? { q: query } : {}),
                ...(typeKey !== "all" ? { type: typeKey } : {}),
              }).toString()}`}
              filename="documents"
            />
          </div>
        }
      />

      <form method="get" className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="block flex-1 text-sm">
          <span className="text-muted-foreground">Search</span>
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search file, shipment, client…"
            className="mt-1 h-9 w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 text-sm outline-none backdrop-blur-sm placeholder:text-subtle focus:border-primary/40"
          />
        </label>
        <label className="block text-sm sm:w-44">
          <span className="text-muted-foreground">Type</span>
          <select
            name="type"
            defaultValue={typeKey}
            className="mt-1 h-9 w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 text-sm outline-none focus:border-primary/40"
          >
            {DOC_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
        <div className="flex gap-2">
          <Button type="submit" size="sm">
            Filter
          </Button>
          {(query || typeKey !== "all") && (
            <Button type="button" variant="outline" size="sm" asChild>
              <Link href="/documents">Clear</Link>
            </Button>
          )}
        </div>
      </form>

      <p className="mb-3 text-xs text-muted-foreground">{documents.length} document(s)</p>

      <DataTable
        rows={documents}
        columns={columns}
        emptyMessage={
          query || typeKey !== "all"
            ? "No documents match your filters."
            : "No documents yet — upload from a shipment or the upload page."
        }
      />
    </>
  );
}
