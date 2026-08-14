import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, UserCircle, ChevronDown } from "lucide-react";
import logoHeader from "@/assets/logo-zaftys.png";
import { mailtoCompany } from "@/lib/constants";
import { heroMailBodies, heroMailSubjects } from "@/lib/hero-ctas";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const quoteMailto = mailtoCompany(heroMailSubjects.quote, heroMailBodies.quote);

type NavItem = { name: string; path: string };
type NavGroup = { id: string; label: string; items: readonly NavItem[] };

const navGroups: readonly NavGroup[] = [
  {
    id: "solutions",
    label: "Solutions",
    items: [
      { name: "Services", path: "/services" },
      { name: "Industries", path: "/industries" },
      { name: "Fleet", path: "/fleet" },
    ],
  },
  {
    id: "technology",
    label: "Technology",
    items: [
      { name: "ZAFTYS TMS", path: "/zaftys-tms" },
      { name: "TranZfort Network", path: "/tranzfort-network" },
    ],
  },
  {
    id: "company",
    label: "Company",
    items: [
      { name: "About", path: "/about" },
      { name: "Partner", path: "/partner" },
      { name: "Contact", path: "/contact" },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    items: [
      { name: "Blog", path: "/blog" },
      { name: "Reports", path: "/reports" },
    ],
  },
];

function pathMatches(pathname: string, path: string): boolean {
  if (pathname === path) return true;
  if (path === "/blog" && pathname.startsWith("/blog/")) return true;
  if (path === "/reports" && pathname.startsWith("/reports/")) return true;
  if (path === "/industries" && pathname.startsWith("/industries/")) return true;
  if (path === "/resources" && pathname.startsWith("/resources/")) return true;
  return false;
}

function groupIsActive(pathname: string, group: NavGroup): boolean {
  if (group.id === "resources") {
    return (
      pathname === "/resources" ||
      pathname.startsWith("/resources/") ||
      pathname === "/blog" ||
      pathname.startsWith("/blog/") ||
      pathname === "/reports" ||
      pathname.startsWith("/reports/")
    );
  }
  return group.items.some((item) => pathMatches(pathname, item.path));
}

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDesktopGroup, setOpenDesktopGroup] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
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
    setOpenDesktopGroup(null);
    setOpenMobileGroup(null);
  }, [location]);

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
              width={280}
              height={86}
              className="h-12 md:h-14 w-auto transition-all"
              decoding="async"
            />
          </Link>

          <div className="hidden xl:flex items-center space-x-1">
            {navGroups.map((group) => {
              const active = groupIsActive(location.pathname, group);
              const open = openDesktopGroup === group.id;
              return (
                <div
                  key={group.id}
                  className="relative"
                  onMouseEnter={() => setOpenDesktopGroup(group.id)}
                  onMouseLeave={() => setOpenDesktopGroup(null)}
                >
                  <button
                    type="button"
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-bold transition-colors uppercase tracking-wide inline-flex items-center gap-1",
                      active
                        ? "text-accent"
                        : "text-navy hover:text-accent hover:bg-navy/5",
                    )}
                    aria-expanded={open}
                    aria-haspopup="true"
                    onClick={() => setOpenDesktopGroup(open ? null : group.id)}
                  >
                    {group.label} <ChevronDown size={14} />
                  </button>
                  {open ? (
                    <div className="absolute left-0 top-full pt-1 min-w-[220px]">
                      <div className="rounded-lg border border-border bg-white shadow-lg py-2">
                        {group.items.map((link) => (
                          <Link
                            key={link.path}
                            to={link.path}
                            className={cn(
                              "block px-4 py-2.5 text-sm font-semibold transition-colors",
                              pathMatches(location.pathname, link.path)
                                ? "text-accent bg-accent/5"
                                : "text-navy hover:text-accent hover:bg-navy/5",
                            )}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
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
            <div className="flex flex-col space-y-1">
              {navGroups.map((group) => {
                const active = groupIsActive(location.pathname, group);
                const open = openMobileGroup === group.id;
                return (
                  <div key={group.id}>
                    <button
                      type="button"
                      onClick={() => setOpenMobileGroup(open ? null : group.id)}
                      className={cn(
                        "w-full px-4 py-3 text-sm font-bold transition-colors uppercase tracking-wide text-left flex items-center justify-between",
                        active
                          ? "text-accent bg-accent/5 border-l-4 border-accent"
                          : "text-navy hover:text-accent hover:bg-gray-50",
                      )}
                      aria-expanded={open}
                    >
                      {group.label}
                      <ChevronDown size={16} className={cn("transition-transform", open && "rotate-180")} />
                    </button>
                    {open ? (
                      <div className="pl-4 pb-2 space-y-1">
                        {group.items.map((link) => (
                          <Link
                            key={link.path}
                            to={link.path}
                            className={cn(
                              "block px-4 py-2.5 text-sm font-semibold",
                              pathMatches(location.pathname, link.path)
                                ? "text-accent"
                                : "text-navy hover:text-accent",
                            )}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}

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
