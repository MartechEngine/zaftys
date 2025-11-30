import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, UserCircle } from "lucide-react";
import logoHeader from "@/assets/logo-header.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Technology", path: "/technology" },
    { name: "Services", path: "/services" },
    { name: "Industries", path: "/industries" },
    { name: "Fleet", path: "/fleet" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-md py-2" 
          : "bg-white/90 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto container-padding">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logoHeader} alt="ZAFTYS Logistics" className="h-14 md:h-16 w-auto transition-all" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-bold transition-colors uppercase tracking-wide ${
                  location.pathname === link.path
                    ? "text-accent"
                    : "text-navy hover:text-accent hover:bg-navy/5"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-3">
            <Link to="/login">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-navy hover:text-accent hover:bg-navy/5 gap-2 font-semibold"
              >
                <UserCircle size={20} />
                Login
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                size="sm" 
                className="bg-accent hover:bg-accent-light text-white border-0 font-bold tracking-wide uppercase shadow-md"
              >
                Get a Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-navy hover:bg-navy/10 rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 animate-fade-in bg-white border-t border-gray-100 shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 text-sm font-bold transition-colors uppercase tracking-wide ${
                    location.pathname === link.path
                      ? "text-accent bg-accent/5 border-l-4 border-accent"
                      : "text-navy hover:text-accent hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 space-y-3 px-4 border-t border-gray-100 mt-2">
                <Button 
                  variant="outline" 
                  className="w-full border-navy/20 text-navy hover:bg-navy/5 justify-start gap-2"
                >
                  <UserCircle size={18} />
                  Client Login
                </Button>
                <Button 
                  className="w-full bg-accent hover:bg-accent-light text-white border-0 uppercase tracking-wide font-bold"
                >
                  Get a Quote
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

