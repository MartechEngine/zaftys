import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, UserCircle, ChevronDown } from "lucide-react";
import logoHeaderWebp from "@/assets/logo-zaftys-280.webp";
import logoHeaderPng from "@/assets/logo-zaftys-280.png";
import { mailtoCompany } from "@/lib/constants";
import { heroMailBodies, heroMailSubjects } from "@/lib/hero-ctas";
import { trackEvent } from "@/lib/analytics";

const quoteMailto = mailtoCompany(heroMailSubjects.quote, heroMailBodies.quote);

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setResourcesOpen(false);
    setMobileResourcesOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Services", path: "/services" },
    { name: "Fleet", path: "/fleet" },
    { name: "Network", path: "/network" },
    { name: "Platform", path: "/technology" },
    { name: "Industries", path: "/industries" },
    { name: "Partner", path: "/partner" },
    { name: "Contact", path: "/contact" },
  ];

  const resourcesLinks = [
    { name: "Blog", path: "/blog" },
    { name: "Reports", path: "/resources/reports" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const isResourcesActive =
    location.pathname === "/resources" ||
    location.pathname.startsWith("/resources/") ||
    location.pathname === "/blog" ||
    location.pathname.startsWith("/blog/");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10 ${
        isScrolled
          ? "bg-white/95 md:backdrop-blur-md shadow-md py-2"
          : "bg-white/95 md:bg-white/90 md:backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto container-padding">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <picture>
              <source srcSet={logoHeaderWebp} type="image/webp" />
              <img
                src={logoHeaderPng}
                alt="ZAFTYS Logistics"
                width={280}
                height={86}
                className="h-12 md:h-14 w-auto transition-all"
                decoding="async"
                fetchPriority="high"
              />
            </picture>
          </Link>

          <div className="hidden xl:flex items-center space-x-1">
            {navLinks.slice(0, 5).map((link) => (
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

            <div
              className="relative"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button
                type="button"
                className={`px-3 py-2 rounded-md text-sm font-bold transition-colors uppercase tracking-wide inline-flex items-center gap-1 ${
                  isResourcesActive
                    ? "text-accent"
                    : "text-navy hover:text-accent hover:bg-navy/5"
                }`}
                aria-expanded={resourcesOpen}
                aria-haspopup="true"
              >
                Resources <ChevronDown size={14} />
              </button>
              {resourcesOpen ? (
                <div className="absolute left-0 top-full pt-1 min-w-[200px]">
                  <div className="rounded-lg border border-border bg-white shadow-lg py-2">
                    {resourcesLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`block px-4 py-2.5 text-sm font-semibold transition-colors ${
                          isActive(link.path) ||
                          (link.path === "/blog" && location.pathname.startsWith("/blog/")) ||
                          (link.path === "/resources/reports" &&
                            location.pathname.startsWith("/resources/reports"))
                            ? "text-accent bg-accent/5"
                            : "text-navy hover:text-accent hover:bg-navy/5"
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {navLinks.slice(5).map((link) => (
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
              <a href={quoteMailto} onClick={() => trackEvent("cta_mailto", { placement: "nav", intent: "quote" })}>
                Get a Quote
              </a>
            </Button>
          </div>

          <button
            className="xl:hidden p-2 text-navy hover:bg-navy/10 rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="xl:hidden py-4 animate-fade-in bg-white border-t border-gray-100 shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="flex flex-col space-y-2">
              {navLinks.slice(0, 5).map((link) => (
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

              <button
                type="button"
                onClick={() => setMobileResourcesOpen((open) => !open)}
                className={`px-4 py-3 text-sm font-bold transition-colors uppercase tracking-wide text-left flex items-center justify-between ${
                  isResourcesActive
                    ? "text-accent bg-accent/5 border-l-4 border-accent"
                    : "text-navy hover:text-accent hover:bg-gray-50"
                }`}
              >
                Resources <ChevronDown size={16} className={mobileResourcesOpen ? "rotate-180" : ""} />
              </button>
              {mobileResourcesOpen ? (
                <div className="pl-4 pb-2 space-y-1">
                  {resourcesLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="block px-4 py-2.5 text-sm font-semibold text-navy hover:text-accent"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              ) : null}

              {navLinks.slice(5).map((link) => (
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
                  <a href={quoteMailto} onClick={() => trackEvent("cta_mailto", { placement: "nav", intent: "quote" })}>
                Get a Quote
              </a>
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
