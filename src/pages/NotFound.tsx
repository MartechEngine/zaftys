import { Button } from "@/components/ui/button";
import { CTAGroup } from "@/components/CTAGroup";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";
import { pageSeo } from "@/lib/page-seo";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy text-white px-5 sm:px-8">
      <SEO
        title={pageSeo.notFound.title}
        description={pageSeo.notFound.description}
        noindex
      />
      <div className="text-center">
        <h1 className="text-9xl font-heading font-bold text-accent mb-4 opacity-20 animate-pulse">404</h1>
        <h2 className="text-4xl font-bold mb-6 relative z-10 -mt-16">This page is not here.</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-md mx-auto">
          Try home, services, or contact. ZAFTYS TMS and TranZfort are also a click away.
        </p>
        <CTAGroup>
          <Link to="/">
            <Button size="lg" variant="accent">
              <ArrowLeft className="mr-2" size={20} /> Return Home
            </Button>
          </Link>
          <Link to="/logistics">
            <Button size="lg" variant="on-dark-outline">Logistics Services</Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="on-dark-outline">Contact</Button>
          </Link>
        </CTAGroup>
        <p className="mt-6 text-sm text-gray-400">
          <Link to="/zaftys-tms" className="underline hover:text-white">ZAFTYS TMS</Link>
          {" · "}
          <Link to="/network/tranzfort" className="underline hover:text-white">TranZfort</Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
