import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LazyTmsScreensCarousel } from "@/components/LazyTmsScreensCarousel";
import { CTAGroup } from "@/components/CTAGroup";
import { homeCopy } from "@/lib/home-copy";
import { paths } from "@/lib/site-paths";

export function HomePlatformSection() {
  const { platform } = homeCopy;

  return (
    <section id="platform" aria-labelledby="platform-heading">
      <div className="section-padding bg-white pb-8">
        <div className="container mx-auto container-padding">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              {platform.eyebrow}
            </p>
            <h2 id="platform-heading" className="text-4xl font-heading font-bold mb-4 text-navy">
              {platform.h2}
            </h2>
            <p className="text-lg text-muted-foreground">{platform.lead}</p>
          </div>
        </div>
      </div>

      <div className="section-padding bg-muted/30 pt-4" aria-labelledby="platform-tms-heading">
        <div className="container mx-auto container-padding">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="lg:w-1/2 w-full order-2 lg:order-1">
              <LazyTmsScreensCarousel surface="muted" />
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 border border-primary/20">
                {platform.tms.badge}
              </div>
              <h3
                id="platform-tms-heading"
                className="text-3xl md:text-4xl font-heading font-bold mb-4 text-navy leading-tight"
              >
                {platform.tms.h3}
              </h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{platform.tms.lead}</p>
              <CTAGroup className="justify-start">
                <Link to={paths.technology.tms}>
                  <Button variant="accent">See ZAFTYS TMS</Button>
                </Link>
                <Link to={paths.contact}>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    Book a Demo
                  </Button>
                </Link>
              </CTAGroup>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
