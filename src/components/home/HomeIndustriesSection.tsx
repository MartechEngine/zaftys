import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingEyebrow } from "@/components/marketing/MarketingChrome";
import ResponsiveImage from "@/components/ResponsiveImage";
import { homeCopy } from "@/lib/home-copy";
import { homeFeaturedIndustries } from "@/lib/constants";
import { paths } from "@/lib/site-paths";

export function HomeIndustriesSection() {
  const { industries } = homeCopy;

  return (
    <section id="industries" aria-labelledby="industries-heading" className="section-band bg-white">
      <div className="section-band-inner">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <MarketingEyebrow>{industries.eyebrow}</MarketingEyebrow>
          <h2 id="industries-heading" className="font-heading text-3xl font-bold text-navy md:text-4xl">
            {industries.h2}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">{industries.lead}</p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {homeFeaturedIndustries.map((industry) => (
            <Link
              key={industry.slug}
              to={`/industries/${industry.slug}`}
              className="group flex flex-col overflow-hidden border border-border bg-white shadow-sm transition-[box-shadow,border-color] duration-200 hover:border-primary/35 hover:shadow-md"
            >
              <div className="overflow-hidden bg-surface">
                <ResponsiveImage
                  src={industry.image}
                  alt={`${industry.name} transport by ZAFTYS`}
                  aspectRatio="4/3"
                  objectFit="cover"
                  imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 items-center justify-between gap-2 p-5">
                <h3 className="font-heading text-base font-bold text-navy group-hover:text-primary">
                  {industry.name}
                </h3>
                <ArrowRight className="shrink-0 text-primary" size={16} />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to={paths.industries}>
            <Button variant="outline-brand">
              All industries <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
