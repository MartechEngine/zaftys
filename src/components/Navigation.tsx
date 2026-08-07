import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, UserCircle } from "lucide-react";
import logoHeader from "@/assets/logo-zaftys.png";
import { mailtoCompany } from "@/lib/constants";
import { heroMailBodies, heroMailSubjects } from "@/lib/hero-ctas";

const quoteMailto = mailtoCompany(heroMailSubjects.quote, heroMailBodies.quote);

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
    { name: "Services", path: "/services" },
    { name: "Fleet", path: "/fleet" },
    { name: "Network", path: "/network" },
    { name: "Platform", path: "/technology" },
    { name: "Industries", path: "/industries" },
    { name: "Blog", path: "/blog" },
    { name: "Partner", path: "/partner" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) =>
    path === "/blog"
      ? location.pathname === "/blog" || location.pathname.startsWith("/blog/")
      : location.pathname === path;

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
            <img
              src={logoHeader}
              alt="ZAFTYS Logistics"
              className="h-12 md:h-14 w-auto transition-all"
              decoding="async"
              fetchPriority="high"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-bold transition-colors uppercase tracking-wide ${
                  isActive(link.path)
                    ? "text-accent"
                    : "text-navy hover:text-accent hover:bg-navy/5"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden xl:flex items-center space-x-3">
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
            <Button asChild size="sm" variant="accent" className="font-semibold uppercase tracking-wide">
              <a href={quoteMailto}>Get a Quote</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden p-2 text-navy hover:bg-navy/10 rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden py-4 animate-fade-in bg-white border-t border-gray-100 shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 text-sm font-bold transition-colors uppercase tracking-wide ${
                    isActive(link.path)
                      ? "text-accent bg-accent/5 border-l-4 border-accent"
                      : "text-navy hover:text-accent hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 space-y-3 px-4 border-t border-gray-100 mt-2">
                <Link to="/login" className="block">
                  <Button variant="outline" className="w-full border-navy/20 text-navy hover:bg-navy/5 justify-start gap-2">
                    <UserCircle size={18} />
                    Login
                  </Button>
                </Link>
                <Button asChild className="w-full font-semibold uppercase tracking-wide" variant="accent">
                  <a href={quoteMailto}>Get a Quote</a>
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
