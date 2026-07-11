import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { HERO_LOAD } from "./fixtures/loads";
import { SAMPLE_BOOKING_REQUESTS } from "./fixtures/booking-requests";
import { BookingRequestCard } from "./app-ui/BookingRequestCard";
import { MarketplaceLoadCard } from "./app-ui/MarketplaceLoadCard";

type Phase = "idle" | "posting" | "live" | "request";

type MatchFlowDemoProps = {
  theme?: "app" | "dark";
  className?: string;
};

const motionProps = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.25 },
};

/** Supplier posts → load goes live → trucker booking request (real app flow) */
export function MatchFlowDemo({ theme = "app", className }: MatchFlowDemoProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const isApp = theme === "app";
  const topRequest = SAMPLE_BOOKING_REQUESTS[0];

  const run = () => {
    if (phase !== "idle" && phase !== "request") return;
    setPhase("posting");
    window.setTimeout(() => setPhase("live"), 600);
    window.setTimeout(() => setPhase("request"), 1400);
  };

  const reset = () => setPhase("idle");

  const btnPrimary = isApp
    ? "bg-gradient-to-r from-[#0E8C84] to-[#0A5550]"
    : "bg-gradient-brand";
  const textMuted = isApp ? "app-text-muted" : "text-white/55";
  const textPrimary = isApp ? "app-text-primary" : "text-white";

  return (
    <div className={cn("space-y-4", isApp ? "app-canvas px-1" : "text-white", className)}>
      <div className="grid grid-cols-2 gap-2 text-center">
        <div className={cn("rounded-xl p-3", isApp ? "app-card" : "demo-card")}>
          <div className={cn("text-[10px] uppercase tracking-wider", textMuted)}>Supplier</div>
          <div className={cn("text-xs font-semibold mt-1", textPrimary)}>Post load</div>
        </div>
        <div className={cn("rounded-xl p-3", isApp ? "app-card" : "demo-card")}>
          <div className={cn("text-[10px] uppercase tracking-wider", textMuted)}>Trucker</div>
          <div className={cn("text-xs font-semibold mt-1", textPrimary)}>Book load</div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {phase === "idle" && (
          <motion.div key="idle" {...motionProps}>
            <button
              type="button"
              onClick={run}
              aria-label="Simulate TranZfort booking flow from post load to booking request"
              className={cn(
                "w-full h-9 rounded-lg text-white text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E8C84] focus-visible:ring-offset-2",
                btnPrimary,
              )}
            >
              Simulate booking flow
            </button>
          </motion.div>
        )}

        {phase === "posting" && (
          <motion.div
            key="posting"
            {...motionProps}
            className="flex items-center justify-center gap-2 py-6"
            role="status"
            aria-live="polite"
          >
            <Loader2 className={cn("h-4 w-4 animate-spin motion-reduce:animate-none", isApp ? "text-[#0E8C84]" : "text-orange-glow")} />
            <span className={cn("text-sm", isApp ? "app-text-secondary" : "text-white/70")}>Publishing load…</span>
          </motion.div>
        )}

        {(phase === "live" || phase === "request") && (
          <motion.div key="live" {...motionProps} className="space-y-3">
            <div
              className={cn(
                "flex items-center justify-center gap-2 text-xs font-semibold",
                isApp ? "text-[#0E8C84]" : "text-teal-glow",
              )}
            >
              <span>Posted</span>
              <ArrowRight className="h-3 w-3" />
              <span>Live on Find Loads</span>
            </div>
            <MarketplaceLoadCard load={HERO_LOAD} compact />
            {phase === "request" && (
              <motion.div {...motionProps} className="space-y-3">
                <div className={cn("text-[10px] text-center", textMuted)}>Trucker sends booking request</div>
                <BookingRequestCard request={topRequest} />
                <button
                  type="button"
                  onClick={reset}
                  aria-label="Reset booking flow demo"
                  className="text-xs text-[#0E8C84] font-semibold hover:underline w-full text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E8C84] rounded"
                >
                  Run again
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
