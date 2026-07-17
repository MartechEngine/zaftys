"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";

export function ConfigToggleForm({
  section,
  field,
  label,
  current,
}: {
  section: string;
  field: string;
  label: string;
  current: boolean;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function toggle() {
    setSaving(true);
    try {
      await api.patchSettingsConfig(section, { [field]: !current });
      toast.success(`${label} ${!current ? "enabled" : "disabled"}`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update setting.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={toggle} disabled={saving}>
      {saving ? "Saving…" : current ? `Disable ${label}` : `Enable ${label}`}
    </Button>
  );
}
