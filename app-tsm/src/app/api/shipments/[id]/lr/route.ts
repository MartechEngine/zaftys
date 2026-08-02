import { getSession } from "@/lib/auth/session";
import { apiError, apiSuccess } from "@/lib/api-response";
import { getShipment } from "@/lib/data/shipment-repository";
import { buildLrPdf } from "@/lib/documents/lr-pdf";
import {
  generateShipmentLr,
  voidShipmentLr,
} from "@/lib/documents/lr-service";
import { listLrAudit } from "@/lib/documents/lr-audit-store";
import { getOrgProfile } from "@/lib/settings/org-repository";
import { getOrgAccountForSession } from "@/lib/tsm/org-repository";
import { tenancyApiError } from "@/lib/tsm/tenancy-http";
import { ensureTsmOrgHydrated } from "@/lib/db/domain-persistence";

export const dynamic = "force-dynamic";

/**
 * POST body: { action?: "generate"|"regenerate"|"void", reason?: string, download?: boolean }
 * Default action = generate.
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);

  const { id } = await params;
  await ensureTsmOrgHydrated();

  let orgId = "org_zaftys_local";
  try {
    const org = await getOrgAccountForSession(session);
    orgId = org.id;
  } catch (e) {
    const err = tenancyApiError(e);
    if (err) return err;
    throw e;
  }

  let body: Record<string, unknown> = {};
  try {
    const text = await request.text();
    if (text.trim()) body = JSON.parse(text) as Record<string, unknown>;
  } catch {
    return apiError("INVALID_JSON", "Body must be JSON when provided.");
  }

  const actionRaw = String(body.action ?? "generate").toLowerCase();
  const action =
    actionRaw === "void" || actionRaw === "regenerate" ? actionRaw : "generate";
  const reason =
    typeof body.reason === "string" ? body.reason : undefined;

  try {
    const result =
      action === "void"
        ? await voidShipmentLr({
            shipmentId: id,
            orgId,
            actorUserId: session.id,
            actorName: session.name,
            reason,
          })
        : await generateShipmentLr({
            shipmentId: id,
            orgId,
            actorUserId: session.id,
            actorName: session.name,
            regenerate: action === "regenerate",
            reason,
          });

    const url = new URL(request.url);
    const wantDownload =
      body.download === true || url.searchParams.get("download") === "1";

    if (wantDownload && action !== "void") {
      const shipment = await getShipment(id);
      if (!shipment) return apiError("SHIPMENT_NOT_FOUND", "Shipment not found.", 404);
      const org = await getOrgProfile();
      const pdf = await buildLrPdf(shipment, {
        name: org.name,
        gstin: org.gstin,
        address: org.address,
      }, { lrNumber: result.lrNumber });
      return new Response(new Uint8Array(pdf.buffer), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${result.filename ?? `${result.lrNumber}.pdf`}"`,
          "Content-Length": String(pdf.buffer.length),
          "X-TSM-LR-Number": result.lrNumber,
        },
      });
    }

    return apiSuccess({
      ...result,
      audit: listLrAudit(10, id),
    }, { [action]: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "LR action failed";
    if (message.includes("not found")) {
      return apiError("SHIPMENT_NOT_FOUND", message, 404);
    }
    if (message.includes("No active LR")) {
      return apiError("NO_ACTIVE_LR", message, 409);
    }
    if (message.includes("attach")) {
      return apiError("UPDATE_FAILED", message, 500);
    }
    if (message.includes("store") || message.includes("S3") || message.includes("upload")) {
      return apiError("UPLOAD_FAILED", message, 502);
    }
    return apiError("LR_FAILED", message, 500);
  }
}

/** GET — preview PDF (does not attach). */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) return apiError("UNAUTHORIZED", "Sign in required.", 401);

  const { id } = await params;
  const shipment = await getShipment(id);
  if (!shipment) return apiError("SHIPMENT_NOT_FOUND", "Shipment not found.", 404);

  const org = await getOrgProfile();
  const pdf = await buildLrPdf(shipment, {
    name: org.name,
    gstin: org.gstin,
    address: org.address,
  });

  return new Response(new Uint8Array(pdf.buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${pdf.filename}"`,
      "Content-Length": String(pdf.buffer.length),
    },
  });
}
