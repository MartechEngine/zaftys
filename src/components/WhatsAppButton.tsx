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
  showIcon?: boolean;
  placement?: string;
  intent?: string;
};

/**
 * WhatsApp CTA — always solid green (`whatsapp` variant).
 * See `src/lib/cta-recipe.ts`.
 */
export function WhatsAppButton({
  message,
  label = "Chat on WhatsApp",
  className,
  size = "lg",
  showIcon = true,
  placement = "button",
  intent,
}: WhatsAppButtonProps) {
  return (
    <Button asChild size={size} variant="whatsapp" className={cn(className)}>
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
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-xl transition-all hover:scale-105 hover:bg-whatsapp-hover md:bottom-8 md:right-8"
    >
      <MessageCircle size={28} />
    </a>
  );
}
