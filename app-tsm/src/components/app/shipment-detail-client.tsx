"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Copy, FileText } from "lucide-react";
import { toast } from "sonner";
import { AssignDriverDrawer } from "@/components/app/assign-driver-drawer";
import { ShipmentActivityFeed } from "@/components/app/shipment-activity-feed";
import { ShipmentDocumentUpload } from "@/components/app/shipment-document-upload";
import { ShipmentDetailMap } from "@/components/app/shipment-detail-map";
import { ShipmentNotesPanel } from "@/components/app/shipment-notes-panel";
import { OriginBadge, ShipmentStatusChip } from "@/components/app/status-chip";
import { EditShipmentFieldsForm } from "@/components/app/sprint8-forms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api, type ActivityEvent } from "@/lib/api-client";
import type { ShipmentRecord } from "@/lib/dev-store";
import { buildShipmentTimeline } from "@/lib/shipments/timeline";

export function ShipmentDetailClient({ shipment }: { shipment: ShipmentRecord }) {
  const router = useRouter();
  const [assignOpen, setAssignOpen] = useState(false);
  const [current, setCurrent] = useState(shipment);
  const [tab, setTab] = useState<"overview" | "notes" | "billing">("overview");
  const [busy, setBusy] = useState(false);
  const [activityRefresh, setActivityRefresh] = useState(0);
  const [activities, setActivities] = useState<ActivityEvent[]>([]);

  const estCharge = current.tonnageMt * 420;
  const gst = Math.round(estCharge * 0.18);

  useEffect(() => {
    api
      .getShipmentActivity(current.id)
      .then(setActivities)
      .catch(() => setActivities([]));
  }, [current.id, activityRefresh]);

  const timeline = buildShipmentTimeline(current, activities);

  function bumpActivity() {
    setActivityRefresh((n) => n + 1);
  }

  async function copyTrackLink() {
    try {
      const link = await api.generateTrackLink(current.id);
      const full = `${window.location.origin}${link.url}`;
      await navigator.clipboard.writeText(full);
      toast.success("Tracking link copied to clipboard.");
    } catch {
      toast.error("Could not generate track link.");
    }
  }

  async function sendToOverflow() {
    setBusy(true);
    try {
      const result = await api.postShipmentToOverflow(current.id);
      toast.success(`Posted to overflow · ${result.load.bookingId}`);
      router.push("/network/overflow");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not post to overflow.");
    } finally {
      setBusy(false);
    }
  }

  async function runStatusAction(
    action: "delivered" | "in_transit" | "cancelled",
    successLabel: string,
  ) {
    setBusy(true);
    try {
      const updated =
        action === "cancelled"
          ? await api.cancelShipment(current.id)
          : await api.updateShipmentStatus(current.id, action);
      setCurrent(updated);
      router.refresh();
      bumpActivity();
      toast.success(successLabel);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Action failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-2">
        <ShipmentStatusChip status={current.status} />
        <OriginBadge originType={current.originType} />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {current.status === "pending" && (
          <Button variant="accent" onClick={() => setAssignOpen(true)}>
            Assign driver
          </Button>
        )}
        <Button variant="outline" onClick={copyTrackLink}>
          <Copy className="mr-2 h-4 w-4" />
          Copy track link
        </Button>
        {current.trackToken && (
          <Button variant="outline" asChild>
            <Link
              href={`/track/${encodeURIComponent(current.trackToken)}`}
              target="_blank"
            >
              Preview track page
            </Link>
          </Button>
        )}
        {current.status === "in_transit" && (
          <Button
            variant="outline"
            disabled={busy}
            onClick={() => runStatusAction("delivered", "Marked as delivered")}
          >
            Mark delivered
          </Button>
        )}
        {current.status === "exception" && (
          <>
            <Button
              variant="outline"
              disabled={busy}
              onClick={() => runStatusAction("in_transit", "Exception resolved")}
            >
              Resolve exception
            </Button>
            <Button
              variant="accent"
              disabled={busy}
              onClick={() => runStatusAction("delivered", "Marked as delivered")}
            >
              Mark delivered
            </Button>
          </>
        )}
        {current.status === "pending" && (
          <Button
            variant="outline"
            disabled={busy}
            onClick={() => runStatusAction("cancelled", "Shipment cancelled")}
          >
            Cancel
          </Button>
        )}
        {["pending", "dispatched"].includes(current.status) && current.originType === "fleet" && (
          <Button variant="outline" disabled={busy} onClick={sendToOverflow}>
            Send to overflow
          </Button>
        )}
        <EditShipmentFieldsForm shipment={current} onUpdated={setCurrent} />
      </div>

      <div className="mb-6 flex gap-2 border-b border-white/10 pb-2">
        {(["overview", "notes", "billing"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-lg px-3 py-1.5 text-sm capitalize transition-colors ${tab === t ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "notes" ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <ShipmentNotesPanel
            shipmentId={current.id}
            refreshKey={activityRefresh}
            onAdded={bumpActivity}
          />
          <ShipmentActivityFeed shipmentId={current.id} refreshKey={activityRefresh} />
        </div>
      ) : tab === "billing" ? (
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle>Trip billing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <Row label="Freight charge" value={`₹${estCharge.toLocaleString("en-IN")}`} />
            <Row label="GST (18%)" value={`₹${gst.toLocaleString("en-IN")}`} />
            <Row label="Total" value={`₹${(estCharge + gst).toLocaleString("en-IN")}`} />
            <Row label="Invoice" value={current.status === "delivered" ? "INV-2026-0870" : "Pending delivery"} />
            <Button variant="outline" size="sm" className="mt-4" asChild>
              <Link href="/billing/invoices">View invoices</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
      <>
        <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {timeline.map((step) => (
                <div key={step.label} className="flex gap-3">
                  <div
                    className={`mt-1 h-3 w-3 shrink-0 rounded-full ${
                      step.current
                        ? "bg-accent ring-4 ring-accent/20"
                        : step.done
                          ? "bg-success"
                          : "border-2 border-muted-foreground/30 bg-background"
                    }`}
                  />
                  <div>
                    <p className="font-medium text-heading">{step.label}</p>
                    <p className="text-xs text-subtle">{step.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <ShipmentActivityFeed shipmentId={current.id} refreshKey={activityRefresh} />

          <Card>
            <CardHeader>
              <CardTitle>Trip details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 text-sm">
              <Row label="Commodity" value={current.commodity} />
              <Row label="Tonnage" value={`${current.tonnageMt} MT`} />
              <Row label="LR number" value={current.lrNumber ?? "—"} />
              <Row label="Client" value={current.client} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Load line items</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <ul className="space-y-2">
                <li className="flex justify-between border-b border-border pb-2">
                  <span>{current.commodity}</span>
                  <span className="text-muted-foreground">{current.tonnageMt} MT</span>
                </li>
                <li className="flex justify-between text-muted-foreground">
                  <span>Bags / units</span>
                  <span>{Math.round(current.tonnageMt * 20)} bags est.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>India compliance</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 text-sm">
              <Row label="Consignor GSTIN" value="27AABCU9603R1ZM" />
              <Row label="Consignee GSTIN" value="27AABCA1234A1Z5" />
              <Row label="e-way bill" value={current.lrNumber ? "EWB-2026-44821" : "Pending LR"} />
              <Row label="Weighbridge" value={current.status === "at_weighbridge" ? "In progress" : "—"} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              {current.documents.length === 0 ? (
                <p className="text-sm text-muted-foreground">No documents uploaded yet.</p>
              ) : (
                <ul className="space-y-2">
                  {current.documents.map((doc) => (
                    <li
                      key={doc.id}
                      className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm"
                    >
                      <span className="text-xs text-label uppercase">{doc.type}</span>
                      <span className="font-medium text-heading">{doc.name}</span>
                    </li>
                  ))}
                </ul>
              )}
              <ShipmentDocumentUpload
                shipmentId={current.id}
                onUploaded={(s) => {
                  setCurrent(s);
                  router.refresh();
                }}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Map</CardTitle>
            </CardHeader>
            <CardContent>
              <ShipmentDetailMap
                shipmentId={current.id}
                publicId={current.publicId}
                vehicle={current.vehicle}
                driver={current.driver}
                geo={current.geo}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assignment</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              {current.driver ? (
                <>
                  <p className="font-medium text-heading">{current.driver}</p>
                  <p className="text-muted-foreground">{current.vehicle}</p>
                </>
              ) : (
                <p className="text-orange">Not assigned</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      </>
      )}

      <AssignDriverDrawer
        shipmentId={current.id}
        shipmentLabel={current.publicId}
        open={assignOpen}
        onClose={() => setAssignOpen(false)}
        onAssigned={async () => {
          const updated = await api.getShipment(current.id);
          setCurrent(updated);
          router.refresh();
          bumpActivity();
        }}
      />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-label">{label}</span>
      <span className="text-right text-body">{value}</span>
    </div>
  );
}
