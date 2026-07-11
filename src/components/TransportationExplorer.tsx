import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { materialTypes, truckTypes } from "@/lib/constants";
import { materialsForTruck, trucksForMaterial } from "@/lib/transportation-matrix";
import type { MaterialId, TruckId } from "@/lib/transportation-matrix";
import { truckImageForId, materialImageForId } from "@/lib/services-images";
import ResponsiveImage from "@/components/ResponsiveImage";

type ViewMode = "truck" | "material";

const MODES = [
  { id: "truck" as const, label: "By truck type" },
  { id: "material" as const, label: "By material" },
] as const;

export function TransportationExplorer() {
  const [mode, setMode] = useState<ViewMode>("truck");
  const [selectedTruck, setSelectedTruck] = useState<TruckId>("open-body");
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialId>("mining");

  const isTruckMode = mode === "truck";
  const selectedTruckData = truckTypes.find((t) => t.id === selectedTruck)!;
  const selectedMaterialData = materialTypes.find((m) => m.id === selectedMaterial)!;

  const matchedMaterials = materialsForTruck(selectedTruck);
  const matchedTrucks = trucksForMaterial(selectedMaterial);

  const pickerItems = isTruckMode ? truckTypes : materialTypes;
  const heroImage = isTruckMode
    ? truckImageForId(selectedTruck)
    : materialImageForId(selectedMaterial);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="rounded-2xl border border-border bg-white shadow-lg overflow-hidden">
        {/* Mode switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 sm:px-6 py-4 border-b border-border bg-muted/30">
          <p className="text-sm font-semibold text-navy">Explore asset ↔ cargo pairings</p>
          <div
            className="inline-flex rounded-full border border-border bg-white p-1 self-start sm:self-auto"
            role="tablist"
            aria-label="Explorer view"
          >
            {MODES.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={mode === id}
                onClick={() => setMode(id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  mode === id ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-navy",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 lg:min-h-[480px]">
          {/* Picker  -  single column with thumbnails */}
          <div className="lg:col-span-2 border-b lg:border-b-0 lg:border-r border-border bg-muted/10">
            <p className="px-4 pt-4 pb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {isTruckMode ? "Truck types" : "Materials"}
            </p>
            <ul className="px-2 pb-3 lg:pb-2 lg:max-h-[440px] lg:overflow-y-auto demo-scroll space-y-1">
              {pickerItems.map((item) => {
                const id = item.id as TruckId & MaterialId;
                const selected = isTruckMode ? selectedTruck === id : selectedMaterial === id;
                const thumb = isTruckMode
                  ? truckImageForId(id as TruckId)
                  : materialImageForId(id as MaterialId);

                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() =>
                        isTruckMode ? setSelectedTruck(id as TruckId) : setSelectedMaterial(id as MaterialId)
                      }
                      className={cn(
                        "w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                        selected
                          ? "bg-white shadow-md ring-1 ring-primary/25 border border-primary/20"
                          : "hover:bg-white/80 border border-transparent",
                      )}
                    >
                      <div
                        className={cn(
                          "w-14 h-10 shrink-0 rounded-md overflow-hidden flex items-center justify-center",
                          isTruckMode ? "bg-navy" : "bg-muted",
                        )}
                      >
                        <img src={thumb.src} alt="" className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block font-heading font-bold text-sm text-navy truncate">{item.title}</span>
                        {"tagline" in item && item.tagline ? (
                          <span className="block text-[10px] text-muted-foreground uppercase tracking-wide truncate">
                            {item.tagline}
                          </span>
                        ) : (
                          <span className="block text-[11px] text-muted-foreground line-clamp-1">{item.description}</span>
                        )}
                      </div>
                      {selected && <CheckCircle2 className="text-primary shrink-0" size={18} />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Detail + matches */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="p-4 sm:p-6 flex-1 flex flex-col">
              <ResponsiveImage
                src={heroImage.src}
                alt={heroImage.alt}
                aspectRatio="2/1"
                objectFit="contain"
                className={cn("rounded-xl border border-border mb-5", isTruckMode ? "bg-navy" : "bg-muted/30")}
              />

              <h3 className="font-heading font-bold text-xl text-navy mb-2">
                {isTruckMode ? selectedTruckData.title : selectedMaterialData.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {isTruckMode ? selectedTruckData.description : selectedMaterialData.description}
              </p>

              <div className="mt-auto">
                <div className="flex items-center gap-2 mb-3">
                  <ArrowRight className="text-accent shrink-0" size={16} />
                  <p className="text-xs font-bold uppercase tracking-wider text-navy">
                    {isTruckMode ? "Typical materials" : "Recommended trucks"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(isTruckMode ? materialTypes : truckTypes).map((item) => {
                    const match = isTruckMode
                      ? matchedMaterials.includes(item.id as MaterialId)
                      : matchedTrucks.includes(item.id as TruckId);

                    if (!match) return null;

                    return (
                      <span
                        key={item.id}
                        className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 border border-accent/25 px-3 py-1.5 text-xs font-semibold text-navy"
                      >
                        <CheckCircle2 className="text-accent" size={12} />
                        {item.title}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            <p className="text-[11px] text-muted-foreground px-4 sm:px-6 py-3 border-t border-border bg-muted/20 leading-relaxed">
              Typical pairings from ZAFTYS dispatch practice  -  final assignment depends on load weight, route, and compliance review.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
