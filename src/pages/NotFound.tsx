import { Button } from "@/components/ui/button";
import { CTAGroup } from "@/components/CTAGroup";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";
import { pageSeo } from "@/lib/page-seo";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy text-white px-4">
      <SEO
        title={pageSeo.notFound.title}
        description={pageSeo.notFound.description}
        canonical="/404"
      />
      <div className="text-center">
        <h1 className="text-9xl font-heading font-bold text-accent mb-4 opacity-20 animate-pulse">404</h1>
        <h2 className="text-4xl font-bold mb-6 relative z-10 -mt-16">Page Not Found</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-md mx-auto">
          The route you are looking for doesn't exist. It might have been moved or deleted.
        </p>
        <CTAGroup>
          <Link to="/">
            <Button size="lg" variant="accent">
              <ArrowLeft className="mr-2" size={20} /> Return Home
            </Button>
          </Link>
          <Link to="/services">
            <Button size="lg" variant="on-dark-outline">Services</Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="on-dark-outline">Contact</Button>
          </Link>
        </CTAGroup>
      </div>
    </div>
  );
};

export default NotFound;
