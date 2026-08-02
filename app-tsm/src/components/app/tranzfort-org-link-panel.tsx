"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api-client";
import { bridgeStatusLabel } from "@/lib/tsm/live-honesty";

function maskSupplierId(id: string | undefined): string {
  if (!id) return "—";
  if (id.length <= 12) return id;
  return `${id.slice(0, 8)}…${id.slice(-4)}`;
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Settings panel: TSM company fields for publish identity + paste UUID link.
 * Link uses company name from this form — set TZ-matching names before live link.
 */
export function TranzfortOrgLinkPanel() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [linking, setLinking] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [legalName, setLegalName] = useState("");
  const [tradeName, setTradeName] = useState("");
  const [mainContactName, setMainContactName] = useState("");
  const [supplierIdInput, setSupplierIdInput] = useState("");
  const [linkedSupplierId, setLinkedSupplierId] = useState<string | undefined>();
  const [orgId, setOrgId] = useState("");
  const [bridge, setBridge] = useState({
    mode: "mock",
    liveConfigured: false,
    linked: false,
  });

  const refresh = useCallback(async () => {
    const data = await api.getTsmOrg();
    setOrgId(data.org.id);
    setLegalName(data.org.legalName);
    setTradeName(data.org.tradeName);
    setMainContactName(data.org.mainContactName);
    setLinkedSupplierId(data.org.tranzfortSupplierId);
    setBridge(data.bridge);
    setCanEdit(data.seat.canPublish);
    setLoading(false);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await refresh();
      } catch (err) {
        if (!cancelled) {
          setLoading(false);
          toast.error(err instanceof Error ? err.message : "Could not load TSM org.");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [refresh]);

  async function onSaveCompany(e: React.FormEvent) {
    e.preventDefault();
    if (!canEdit) return;
    setSaving(true);
    try {
      await api.patchTsmOrg({
        legalName: legalName.trim(),
        tradeName: tradeName.trim(),
        mainContactName: mainContactName.trim(),
      });
      toast.success("Publish identity updated");
      await refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save company fields.");
    } finally {
      setSaving(false);
    }
  }

  async function onLink(e: React.FormEvent) {
    e.preventDefault();
    if (!canEdit) return;
    const supplierId = supplierIdInput.trim();
    if (!UUID_RE.test(supplierId)) {
      toast.error("supplierId must be a TranZfort profiles.id UUID.");
      return;
    }
    if (!tradeName.trim() || tradeName.trim().toUpperCase() === "ZAFTYS") {
      toast.error(
        "Set trade name to the supplier’s TranZfort company name before linking (avoid default ZAFTYS).",
      );
      return;
    }
    setLinking(true);
    try {
      const res = await api.linkTranzfortSupplier({
        supplierId,
        companyName: tradeName.trim(),
        mainContactName: mainContactName.trim() || undefined,
      });
      toast.success(res.message);
      setSupplierIdInput("");
      await refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Link failed.");
    } finally {
      setLinking(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-muted-foreground">
        Loading TranZfort bridge…
      </div>
    );
  }

  const status = bridgeStatusLabel(bridge);
  const liveLinked = bridge.mode === "live" && bridge.linked && bridge.liveConfigured;

  return (
    <div className="space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm">
      <div>
        <p className="font-medium text-foreground">TranZfort publish identity</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Posts use this company / linked supplier — not each seat’s personal TZ account. Org{" "}
          <span className="font-mono text-foreground">{orgId}</span>.
        </p>
        <p className="mt-2 text-xs">
          Bridge: <span className="text-foreground">{status}</span>
          {liveLinked ? (
            <span className="ml-2 text-emerald-300">· live map OK</span>
          ) : bridge.linked && bridge.mode !== "live" ? (
            <span className="ml-2 text-amber-200">· local link only (mock)</span>
          ) : null}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Linked supplier:{" "}
          <span className="font-mono text-foreground">{maskSupplierId(linkedSupplierId)}</span>
        </p>
      </div>

      <form className="space-y-3" onSubmit={onSaveCompany}>
        <label className="block text-xs text-muted-foreground">
          Legal name
          <Input
            className="mt-1"
            value={legalName}
            onChange={(e) => setLegalName(e.target.value)}
            disabled={!canEdit}
            required
          />
        </label>
        <label className="block text-xs text-muted-foreground">
          Trade name (publish / link company_name)
          <Input
            className="mt-1"
            value={tradeName}
            onChange={(e) => setTradeName(e.target.value)}
            disabled={!canEdit}
            required
          />
        </label>
        <label className="block text-xs text-muted-foreground">
          Main contact
          <Input
            className="mt-1"
            value={mainContactName}
            onChange={(e) => setMainContactName(e.target.value)}
            disabled={!canEdit}
            required
          />
        </label>
        {canEdit ? (
          <Button type="submit" variant="outline" disabled={saving}>
            {saving ? "Saving…" : "Save company fields"}
          </Button>
        ) : (
          <p className="text-xs text-muted-foreground">View only — admin or dispatcher can edit.</p>
        )}
      </form>

      {canEdit && (
        <form className="space-y-3 border-t border-white/10 pt-4" onSubmit={onLink}>
          <p className="text-xs text-muted-foreground">
            Paste verified TranZfort <span className="font-mono">profiles.id</span>. Email match
            alone does not link. Save company fields first so live link does not overwrite TZ with
            ZAFTYS.
          </p>
          <label className="block text-xs text-muted-foreground">
            supplierId (UUID)
            <Input
              className="mt-1 font-mono"
              value={supplierIdInput}
              onChange={(e) => setSupplierIdInput(e.target.value.trim())}
              placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              autoComplete="off"
            />
          </label>
          <Button type="submit" variant="accent" disabled={linking || !supplierIdInput}>
            {linking
              ? "Linking…"
              : bridge.mode === "live"
                ? "Link to TranZfort (live)"
                : "Store mock link (local)"}
          </Button>
        </form>
      )}
    </div>
  );
}
