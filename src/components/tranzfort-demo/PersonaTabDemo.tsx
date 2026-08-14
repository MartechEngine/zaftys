import { useState } from "react";
import { cn } from "@/lib/utils";
import { AppDemoFrame } from "./AppDemoFrame";
import { DemoDisclaimer } from "./DemoDisclaimer";
import { FindLoadsDemo } from "./FindLoadsDemo";
import { PostLoadDemo } from "./PostLoadDemo";
import { DemoTabBar } from "./DemoTabBar";

type Tab = "supplier" | "trucker";

const TABS = [
  { id: "supplier" as const, label: "Shipper flow" },
  { id: "trucker" as const, label: "Trucker flow" },
] as const;

type PersonaTabDemoProps = {
  className?: string;
  /** phone = device chrome (hero); panel = wide card (sections) */
  variant?: "phone" | "panel";
  /** hero = tab bar styled for navy backgrounds */
  surface?: "hero" | "light";
  showDisclaimer?: boolean;
  disclaimerVariant?: "default" | "on-dark";
};

export function PersonaTabDemo({
  className,
  variant = "panel",
  surface = "light",
  showDisclaimer = false,
  disclaimerVariant = "default",
}: PersonaTabDemoProps) {
  const [tab, setTab] = useState<Tab>("supplier");
  const isPhone = variant === "phone";

  return (
    <div className={cn("space-y-3 sm:space-y-4", className)}>
      {showDisclaimer && (
        <DemoDisclaimer variant={disclaimerVariant} />
      )}

      <DemoTabBar
        tabs={TABS}
        active={tab}
        onChange={setTab}
        surface={surface}
        accent={tab === "supplier" ? "teal" : "orange"}
      />

      <AppDemoFrame
        variant={variant}
        title={tab === "supplier" ? "Post Load" : "Find Loads"}
        screen="app"
        bezel="teal"
        className={cn(
          isPhone ? "mx-auto" : "max-w-sm mx-auto min-h-[280px] sm:min-h-[340px] md:min-h-[400px]",
        )}
      >
        {tab === "supplier" ? <PostLoadDemo theme="app" /> : <FindLoadsDemo theme="app" />}
      </AppDemoFrame>
    </div>
  );
}
