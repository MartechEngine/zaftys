import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type MarketplaceRouteLineProps = {
  originCity: string;
  originState?: string;
  destinationCity: string;
  destinationState?: string;
  className?: string;
};

export function MarketplaceRouteLine({
  originCity,
  originState = "",
  destinationCity,
  destinationState = "",
  className,
}: MarketplaceRouteLineProps) {
  return (
    <div className={cn("flex items-stretch gap-2 h-[52px]", className)}>
      <LocationBlock label="FROM" city={originCity} state={originState} align="start" />
      <div className="flex items-center shrink-0 px-0.5">
        <ArrowRight className="h-5 w-5 app-text-secondary opacity-60" />
      </div>
      <LocationBlock label="TO" city={destinationCity} state={destinationState} align="end" />
    </div>
  );
}

function LocationBlock({
  label,
  city,
  state,
  align,
}: {
  label: string;
  city: string;
  state: string;
  align: "start" | "end";
}) {
  return (
    <div className={cn("flex-1 min-w-0 flex flex-col justify-center", align === "end" && "items-end text-right")}>
      <span className="text-[10px] font-semibold tracking-wide app-text-secondary uppercase">{label}</span>
      <span className="text-[15px] font-bold app-text-primary leading-tight truncate w-full">{city}</span>
      {state.trim() && <span className="text-[10px] app-text-secondary">{state}</span>}
    </div>
  );
}
