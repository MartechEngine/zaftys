"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api, type ShipmentNote } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function formatWhen(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ShipmentNotesPanel({
  shipmentId,
  refreshKey,
}: {
  shipmentId: string;
  refreshKey?: number;
}) {
  const [notes, setNotes] = useState<ShipmentNote[]>([]);
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .getShipmentNotes(shipmentId)
      .then((data) => {
        if (!cancelled) setNotes(data);
      })
      .catch(() => {
        if (!cancelled) setNotes([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [shipmentId, refreshKey]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const text = body.trim();
    if (!text) return;

    setSaving(true);
    try {
      const note = await api.addShipmentNote(shipmentId, text);
      setNotes((prev) => [note, ...prev]);
      setBody("");
      toast.success("Note added.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save note.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={submit} className="space-y-2">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Add an internal note for dispatch and ops…"
            rows={3}
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-body placeholder:text-muted-foreground focus:border-accent/50 focus:outline-none"
          />
          <Button type="submit" size="sm" variant="accent" disabled={saving || !body.trim()}>
            {saving ? "Saving…" : "Add note"}
          </Button>
        </form>

        {loading ? (
          <p className="text-sm text-muted-foreground">Loading notes…</p>
        ) : notes.length === 0 ? (
          <p className="text-sm text-muted-foreground">No notes yet.</p>
        ) : (
          <ul className="space-y-3">
            {notes.map((note) => (
              <li
                key={note.id}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"
              >
                <p className="text-sm text-body">{note.body}</p>
                <p className="mt-1 text-xs text-subtle">
                  {note.author} · {formatWhen(note.createdAt)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
