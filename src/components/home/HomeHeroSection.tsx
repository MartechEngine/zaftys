import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CTAGroup } from "@/components/CTAGroup";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MarketingEyebrow } from "@/components/marketing/MarketingChrome";
import { homeCopy, homeQuoteEmail } from "@/lib/home-copy";
import { homeTrustStrip } from "@/lib/constants";

export function HomeHeroSection() {
  const { hero } = homeCopy;

  return (
    <>
      <section
        id="hero"
        aria-label="Hero"
        className="relative flex min-h-[700px] items-center overflow-hidden pb-24 pt-32"
      >
        <div className="absolute inset-0">
          <picture>
            <source
              type="image/webp"
              srcSet="/images/lcp/hero-home-640.webp 640w, /images/lcp/hero-home-960.webp 960w, /images/lcp/hero-home-1280.webp 1280w, /images/lcp/hero-home-1920.webp 1920w"
              sizes="(max-width: 768px) 100vw, 1280px"
            />
            <img
              src="/images/lcp/hero-home-960.jpg"
              alt={hero.heroImageAlt}
              className="h-full w-full object-cover"
              width={1280}
              height={720}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40" />
        </div>
        <div className="container relative z-10 mx-auto container-padding">
          <div className="max-w-4xl text-white">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-accent animate-fade-in-up">
              {hero.badge}
            </p>
            <h1 className="mb-6 animate-fade-in-up font-heading text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
              {hero.h1.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p
              className="mb-4 max-w-2xl animate-fade-in-up text-xl font-light text-gray-200 md:text-2xl"
              style={{ animationDelay: "0.2s" }}
            >
              {hero.lead}
            </p>
            <p
              className="mb-10 animate-fade-in-up text-xs uppercase tracking-wider text-accent/90"
              style={{ animationDelay: "0.3s" }}
            >
              {hero.tagline}
            </p>
            <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <CTAGroup className="justify-start sm:justify-start">
                <HeroEmailButton
                  label={homeQuoteEmail.label}
                  subject={homeQuoteEmail.subject}
                  body={homeQuoteEmail.body}
                />
                <WhatsAppButton label="Chat on WhatsApp" />
                <a href="#operating-model">
                  <Button size="lg" variant="on-dark-outline">
                    How we operate
                  </Button>
                </a>
              </CTAGroup>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Proof points" className="border-t border-border bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-10 sm:grid-cols-3 md:px-8 lg:grid-cols-6 lg:px-10">
          {homeTrustStrip.map((item) => (
            <div key={item.label} className="text-center">
              <div className="mb-1 font-heading text-base font-bold text-navy">{item.label}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{item.sublabel}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
