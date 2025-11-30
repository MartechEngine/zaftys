import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy text-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-heading font-bold text-accent mb-4 opacity-20 animate-pulse">404</h1>
        <h2 className="text-4xl font-bold mb-6 relative z-10 -mt-16">Page Not Found</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-md mx-auto">
          The route you are looking for doesn't exist. It might have been moved or deleted.
        </p>
        <Link to="/">
          <Button size="lg" className="bg-accent hover:bg-accent-light text-white">
            <ArrowLeft className="mr-2" size={20} /> Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
