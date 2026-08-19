import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CTAGroup } from "@/components/CTAGroup";
import { HeroEmailButton } from "@/components/HeroEmailButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { homeCopy, homeQuoteEmail } from "@/lib/home-copy";
import { homeTrustStrip } from "@/lib/constants";

export function HomeHeroSection() {
  const { hero } = homeCopy;

  return (
    <>
      <section
        id="hero"
        aria-label="Hero"
        className="relative pt-32 pb-24 overflow-hidden min-h-[700px] flex items-center"
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
              className="w-full h-full object-cover"
              width={1280}
              height={720}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40" />
        </div>
        <div className="container mx-auto container-padding relative z-10">
          <div className="max-w-4xl text-white">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4 animate-fade-in-up">
              {hero.badge}
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 animate-fade-in-up leading-tight">
              {hero.h1.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p
              className="text-xl md:text-2xl mb-4 text-gray-200 font-light animate-fade-in-up max-w-2xl"
              style={{ animationDelay: "0.2s" }}
            >
              {hero.lead}
            </p>
            <p
              className="text-sm uppercase tracking-widest text-accent/90 mb-10 animate-fade-in-up"
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

      <section aria-label="Proof points" className="py-12 bg-white border-b border-border relative -mt-10 mx-5 sm:mx-8 lg:mx-12 xl:mx-16 rounded-xl shadow-xl z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 container-padding">
          {homeTrustStrip.map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-lg font-heading font-bold text-primary mb-1">{item.label}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{item.sublabel}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
