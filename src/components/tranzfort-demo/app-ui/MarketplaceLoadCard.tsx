import {
  Calendar,
  MessageCircle,
  Phone,
  Route,
  Info,
  Truck,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { MarketplaceLoad } from "../types";
import { BrandAccentChip } from "./BrandAccentChip";
import { MarketplaceRouteLine } from "./MarketplaceRouteLine";
import { MarketplaceSuperLoadChip } from "./MarketplaceSuperLoadChip";
import { formatMarketplacePrice, formatTyreLabel } from "./formatters";

type MarketplaceLoadCardProps = {
  load: MarketplaceLoad;
  className?: string;
  onViewDetails?: () => void;
  onCall?: () => void;
  onChat?: () => void;
  compact?: boolean;
};

export function MarketplaceLoadCard({
  load,
  className,
  onViewDetails,
  onCall,
  onChat,
  compact = false,
}: MarketplaceLoadCardProps) {
  const tyreLabel = load.tyres ? formatTyreLabel(load.tyres) : "";
  const supplierInitial =
    load.supplierInitial ?? (load.supplierName.trim()[0]?.toUpperCase() || "S");
  const priceType = load.priceType ?? "fixed";
  const priceLabel =
    priceType === "per_ton"
      ? formatMarketplacePrice(load.priceInr, "per_ton")
      : `${formatMarketplacePrice(load.priceInr, "fixed")} Fixed`;

  const Wrapper = onViewDetails ? "button" : "div";

  return (
    <div className={cn("app-gradient-border", className)}>
      <Wrapper
        type={onViewDetails ? "button" : undefined}
        onClick={onViewDetails}
        className={cn(
          "app-gradient-border-inner w-full text-left",
          onViewDetails && "cursor-pointer hover:brightness-[0.99] transition-[filter]",
        )}
      >
        <div className={cn("px-3 pt-2", compact ? "pb-1" : "pb-1.5")}>
          <div className="flex items-start gap-2">
            <div className="h-8 w-8 rounded-full bg-[#0E8C84]/15 text-[#0E8C84] text-xs font-bold flex items-center justify-center shrink-0">
              {supplierInitial}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-1">
                <div className="min-w-0">
                  <div className="text-[13px] font-bold app-text-primary truncate">{load.supplierName}</div>
                  {load.listingAge && (
                    <div className="text-[10px] app-text-secondary">{load.listingAge}</div>
                  )}
                </div>
                {load.isSuperLoad ? (
                  <MarketplaceSuperLoadChip showSpeaker={!compact} />
                ) : (
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-[#E7E5E4] app-text-secondary">
                    <Info className="h-3.5 w-3.5 opacity-60" />
                  </span>
                )}
              </div>
              <MarketplaceRouteLine
                originCity={load.origin}
                originState={load.originState}
                destinationCity={load.destination}
                destinationState={load.destinationState}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <div className="px-3 pb-1 flex items-center gap-2 min-w-0">
          <div className="text-[19px] font-extrabold app-text-primary shrink-0">{priceLabel}</div>
          <div className="flex gap-1 overflow-x-auto min-w-0 pb-0.5">
            <BrandAccentChip label={load.material} />
            {load.bodyType && <BrandAccentChip label={load.bodyType} />}
            {tyreLabel && <BrandAccentChip label={tyreLabel} />}
          </div>
        </div>

        <div className="px-3 pb-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] app-text-secondary">
          <MetaItem icon={Calendar} label={load.pickupDate} />
          {load.distanceKm != null && load.distanceKm > 0 && (
            <MetaItem icon={Route} label={`${load.distanceKm} km`} accent />
          )}
          {load.advancePercent != null && load.advancePercent > 0 && (
            <MetaItem icon={Wallet} label={`${load.advancePercent}% adv`} accent />
          )}
          {load.trucksNeeded != null && load.trucksNeeded > 1 && (
            <MetaItem
              icon={Truck}
              label={`${load.trucksBooked ?? 0}/${load.trucksNeeded}`}
            />
          )}
        </div>

        {!compact && (
          <div className="grid grid-cols-3 border-t border-[#E7E5E4] text-[10px] font-semibold app-text-secondary">
            <FooterAction icon={Phone} label="Call" onClick={onCall} />
            <FooterAction icon={Info} label="View details" onClick={onViewDetails} center />
            <FooterAction icon={MessageCircle} label="Chat" onClick={onChat} align="end" />
          </div>
        )}
      </Wrapper>
    </div>
  );
}

function MetaItem({
  icon: Icon,
  label,
  accent,
}: {
  icon: typeof Calendar;
  label: string;
  accent?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1", accent && "text-[#0284C7]")}>
      <Icon className="h-3 w-3 shrink-0 opacity-70" />
      {label}
    </span>
  );
}

function FooterAction({
  icon: Icon,
  label,
  onClick,
  center,
  align,
}: {
  icon: typeof Phone;
  label: string;
  onClick?: () => void;
  center?: boolean;
  align?: "end";
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className={cn(
        "flex items-center gap-1 py-2 px-2 hover:bg-[#FAF7F2] transition-colors",
        center && "justify-center border-x border-[#E7E5E4]",
        align === "end" && "justify-end",
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{label}</span>
    </button>
  );
}
