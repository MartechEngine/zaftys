import { cn } from "@/lib/utils";

type BrandAccentChipProps = {
  label: string;
  mini?: boolean;
  className?: string;
};

export function BrandAccentChip({ label, mini = true, className }: BrandAccentChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md app-brand-chip font-semibold whitespace-nowrap",
        mini ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-1 text-[11px]",
        className,
      )}
    >
      {label}
    </span>
  );
}
