import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import ResponsiveImage from "@/components/ResponsiveImage";
import { homeCopy } from "@/lib/home-copy";
import { homeFeaturedIndustries } from "@/lib/constants";
import { paths } from "@/lib/site-paths";

export function HomeIndustriesSection() {
  const { industries } = homeCopy;

  return (
    <section id="industries" aria-labelledby="industries-heading" className="section-padding bg-white">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">{industries.eyebrow}</p>
          <h2 id="industries-heading" className="text-4xl font-heading font-bold mb-4 text-primary">
            {industries.h2}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{industries.lead}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {homeFeaturedIndustries.map((industry) => (
            <Link key={industry.slug} to={`${paths.industries}/${industry.slug}`}>
              <Card className="overflow-hidden hover:border-primary/50 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white h-full border-none shadow-md group flex flex-col">
                <ResponsiveImage
                  src={industry.image}
                  alt={`${industry.name} transport by ZAFTYS`}
                  aspectRatio="2/1"
                  objectFit="cover"
                  imgClassName="object-center"
                />
                <CardContent className="p-5">
                  <p className="font-heading font-bold text-navy group-hover:text-primary transition-colors">
                    {industry.name}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-8">
          <Link to={paths.industries} className="text-primary font-semibold hover:underline">
            View all industries <ArrowRight className="inline ml-1" size={14} />
          </Link>
        </p>
      </div>
    </section>
  );
}
