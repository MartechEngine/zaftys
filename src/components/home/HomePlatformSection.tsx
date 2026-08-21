import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LazyTmsScreensCarousel } from "@/components/LazyTmsScreensCarousel";
import { CTAGroup } from "@/components/CTAGroup";
import { MarketingEyebrow } from "@/components/marketing/MarketingChrome";
import { homeCopy } from "@/lib/home-copy";
import { paths } from "@/lib/site-paths";

export function HomePlatformSection() {
  const { platform } = homeCopy;

  return (
    <section id="platform" aria-labelledby="platform-heading">
      <div className="section-band bg-white">
        <div className="section-band-inner max-w-3xl text-center">
          <MarketingEyebrow>{platform.eyebrow}</MarketingEyebrow>
          <h2 id="platform-heading" className="font-heading text-3xl font-bold text-navy md:text-4xl">
            {platform.h2}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">{platform.lead}</p>
        </div>
      </div>

      <div className="section-band-wide bg-surface" aria-labelledby="platform-tms-heading">
        <div className="section-band-inner-wide">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
            <div className="w-full order-2 lg:order-1 lg:w-1/2">
              <LazyTmsScreensCarousel surface="muted" />
            </div>
            <div className="order-1 lg:order-2 lg:w-1/2">
              <div className="mb-4 inline-block border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                {platform.tms.badge}
              </div>
              <h3
                id="platform-tms-heading"
                className="font-heading text-2xl font-bold leading-tight text-navy md:text-3xl"
              >
                {platform.tms.h3}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                {platform.tms.lead}
              </p>
              <CTAGroup className="mt-6 justify-start">
                <Link to={paths.technology.tms}>
                  <Button variant="accent">See ZAFTYS TMS</Button>
                </Link>
                <Link to={paths.contact}>
                  <Button variant="outline-brand">Book a Demo</Button>
                </Link>
              </CTAGroup>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
