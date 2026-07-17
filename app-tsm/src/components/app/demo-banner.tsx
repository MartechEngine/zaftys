import { glassChip } from "@/lib/surface";
import { cn } from "@/lib/utils";

export function DemoBanner() {
  return (
    <div
      className={cn(
        glassChip,
        "mb-6 flex items-center gap-2 border-orange/25 bg-orange/10 px-4 py-2.5 text-sm text-heading",
      )}
    >
      <span className="h-2 w-2 shrink-0 rounded-full bg-orange" aria-hidden />
      <span>
        <strong>Demo UI mode</strong> — all modules use rich mock data. Set{" "}
        <code className="rounded bg-white/10 px-1 text-xs text-navy-bright">TSM_DEMO_UI=0</code> in{" "}
        <code className="rounded bg-white/10 px-1 text-xs text-navy-bright">.env.local</code> to use live Fleetbase.
      </span>
    </div>
  );
}
