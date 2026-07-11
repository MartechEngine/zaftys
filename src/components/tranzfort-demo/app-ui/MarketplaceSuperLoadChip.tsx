import { Crown, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

type MarketplaceSuperLoadChipProps = {
  className?: string;
  showSpeaker?: boolean;
};

export function MarketplaceSuperLoadChip({ className, showSpeaker = true }: MarketplaceSuperLoadChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center h-7 rounded-lg app-super-load overflow-hidden shrink-0",
        className,
      )}
    >
      <span className="inline-flex items-center gap-1 px-2 text-[10px] font-bold tracking-wide uppercase">
        <Crown className="h-3 w-3" />
        Super Load
      </span>
      {showSpeaker && (
        <>
          <span className="w-px h-4 bg-white/35" />
          <span className="inline-flex items-center justify-center w-8 h-7">
            <Volume2 className="h-3.5 w-3.5" />
          </span>
        </>
      )}
    </span>
  );
}
