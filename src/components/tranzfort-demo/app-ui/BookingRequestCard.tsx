import { cn } from "@/lib/utils";
import type { BookingRequest } from "../fixtures/booking-requests";
import { PlatformReviewedBadge } from "./PlatformReviewedBadge";

type BookingRequestCardProps = {
  request: BookingRequest;
  onApprove?: () => void;
  onReject?: () => void;
  isApproving?: boolean;
  className?: string;
};

export function BookingRequestCard({
  request,
  onApprove,
  onReject,
  isApproving,
  className,
}: BookingRequestCardProps) {
  const initial = request.truckerName.trim()[0]?.toUpperCase() || "T";
  const truckMeta = [request.bodyType, request.tyres ? `${request.tyres} tyres` : ""]
    .filter(Boolean)
    .join(" · ");

  return (
    <div
      className={cn(
        "app-card rounded-xl border border-[#E7E5E4] overflow-hidden",
        className,
      )}
    >
      <div className="flex gap-2.5 p-2.5 border-l-4 border-l-[#0E8C84]">
        <div className="h-9 w-9 rounded-full bg-[#0E8C84]/12 text-[#0E8C84] text-sm font-bold flex items-center justify-center shrink-0">
          {initial}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="text-xs font-bold app-text-primary truncate">{request.truckerName}</div>
              <div className="text-[10px] app-text-secondary mt-0.5">
                {request.truckLabel}
                {request.submittedAt ? ` · ${request.submittedAt}` : ""}
              </div>
            </div>
            <span className="shrink-0 text-[9px] font-semibold px-1.5 py-0.5 rounded-md bg-[#FEF3C7] text-[#92400E]">
              New
            </span>
          </div>

          <div className="mt-2 space-y-1.5">
            {request.verified && <PlatformReviewedBadge />}
            {request.rating > 0 && (
              <p className="text-[10px] app-text-secondary">Rating {request.rating.toFixed(1)}</p>
            )}
            {truckMeta && <p className="text-[10px] app-text-secondary">{truckMeta}</p>}
          </div>

          <div className="mt-2.5 flex gap-1.5">
            <button
              type="button"
              onClick={onApprove}
              disabled={isApproving}
              className="flex-1 h-8 rounded-lg bg-gradient-to-r from-[#0E8C84] to-[#0A5550] text-white text-[10px] font-semibold disabled:opacity-60"
            >
              {isApproving ? "Approving…" : "Approve"}
            </button>
            <button
              type="button"
              onClick={onReject}
              className="flex-1 h-8 rounded-lg border border-[#E7E5E4] bg-white app-text-secondary text-[10px] font-semibold"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
