import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type PlatformReviewedBadgeProps = {
  compact?: boolean;
  className?: string;
};

export function PlatformReviewedBadge({ compact = true, className }: PlatformReviewedBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-[#E7E5E4] bg-[#F3F4F6] text-[#0E8C84] font-semibold",
        compact ? "px-1.5 py-0.5 text-[9px]" : "px-2 py-1 text-[10px]",
        className,
      )}
    >
      <BadgeCheck className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} />
      Platform reviewed
    </span>
  );
}
