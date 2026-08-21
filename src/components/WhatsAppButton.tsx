import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

type WhatsAppButtonProps = {
  message?: string;
  label?: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  /** solid = green WhatsApp; on-dark-outline = white outline for navy/orange bands */
  tone?: "solid" | "on-dark-outline";
  showIcon?: boolean;
  placement?: string;
  intent?: string;
};

export function WhatsAppButton({
  message,
  label = "Chat on WhatsApp",
  className,
  size = "lg",
  tone = "solid",
  showIcon = true,
  placement = "button",
  intent,
}: WhatsAppButtonProps) {
  return (
    <Button
      asChild
      size={size}
      variant="ghost"
      className={cn(
        tone === "solid" &&
          "bg-[#25D366] hover:bg-[#20BD5A] text-white border border-[#1fb855] shadow-lg font-semibold",
        tone === "on-dark-outline" &&
          "border-2 border-white/70 bg-transparent text-white hover:bg-white/10 hover:text-white hover:border-white font-semibold",
        className
      )}
    >
      <a
        href={whatsappUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("cta_whatsapp", { placement, ...(intent ? { intent } : {}) })}
      >
        {showIcon && <MessageCircle className="shrink-0" size={size === "sm" ? 16 : 20} />}
        <span>{label}</span>
      </a>
    </Button>
  );
}

export function WhatsAppFab({ message }: { message?: string }) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onClick={() => trackEvent("cta_whatsapp", { placement: "fab" })}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20BD5A] hover:scale-105 transition-all md:bottom-8 md:right-8"
    >
      <MessageCircle size={28} />
    </a>
  );
}
