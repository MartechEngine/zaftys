import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, UserCircle, ChevronDown } from "lucide-react";
import logoHeader from "@/assets/logo-zaftys.png";
import { mailtoCompany } from "@/lib/constants";
import { heroMailBodies, heroMailSubjects } from "@/lib/hero-ctas";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { headerNav, type NavDropdown } from "@/lib/nav-config";
import { paths } from "@/lib/site-paths";

const quoteMailto = mailtoCompany(heroMailSubjects.quote, heroMailBodies.quote);

function pathMatches(pathname: string, path: string): boolean {
  if (pathname === path) return true;
  if (path === paths.blog && pathname.startsWith("/blog/")) return true;
  if (path === paths.reports && pathname.startsWith("/reports/")) return true;
  if (path === paths.industries && pathname.startsWith("/industries/")) return true;
  if (path === paths.resources && pathname.startsWith("/resources/")) return true;
  if (path === paths.logistics.hub && pathname.startsWith("/logistics/")) return true;
  if (path === paths.network.hub && pathname.startsWith("/network/")) return true;
  if (path === paths.intelligence.hub && pathname.startsWith("/intelligence/")) return true;
  return false;
}

function dropdownIsActive(pathname: string, group: NavDropdown): boolean {
  if (pathMatches(pathname, group.hubPath)) return true;

  if (group.id === "logistics") {
    return (
      pathname.startsWith("/logistics") ||
      pathname === paths.fleet ||
      pathname === paths.logistics.dedicated ||
      pathname === paths.logistics.container
    );
  }

  if (group.id === "platform") {
    return (
      pathname === paths.technology.tms ||
      pathname.startsWith(`${paths.technology.tms}/`) ||
      pathname.startsWith("/technology") ||
      pathname === paths.network.tranzfort ||
      pathname.startsWith(`${paths.network.tranzfort}/`)
    );
  }

  if (group.id === "intelligence") {
    return pathname.startsWith("/intelligence");
  }

  if (group.id === "company") {
    return group.items.some((item) => pathMatches(pathname, item.path));
  }

  if (group.id === "resources") {
    return (
      group.items.some((item) => pathMatches(pathname, item.path)) ||
      pathname.startsWith("/resources/")
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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-md py-2" : "bg-white/90 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto container-padding">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={logoHeader}
              alt="ZAFTYS"
              width={280}
              height={86}
              className="h-11 md:h-12 w-auto transition-all"
              decoding="async"
            />
          </Link>

          <div className="hidden xl:flex items-center space-x-0.5">
            {headerNav.map((entry) => {
              if (entry.type === "link") {
                const active =
                  entry.id === "intelligence"
                    ? location.pathname === paths.intelligence.hub || location.pathname.startsWith("/intelligence/")
                    : entry.id === "network"
                      ? location.pathname === paths.network.hub || location.pathname.startsWith("/network/")
                      : pathMatches(location.pathname, entry.path);
                return (
                  <Link
                    key={entry.id}
                    to={entry.path}
                    className={cn(
                      "px-2 py-2 rounded-md text-xs font-bold transition-colors uppercase tracking-wide",
                      active ? "text-accent" : "text-navy hover:text-accent hover:bg-navy/5",
                    )}
                  >
                    {entry.label}
                  </Link>
                );
              }

              const active = dropdownIsActive(location.pathname, entry);
              const open = openDesktopGroup === entry.id;

              return (
                <div
                  key={entry.id}
                  className="relative"
                  onMouseEnter={() => setOpenDesktopGroup(entry.id)}
                  onMouseLeave={() => setOpenDesktopGroup(null)}
                >
                  <div className="inline-flex items-center">
                    <Link
                      to={entry.hubPath}
                      className={cn(
                        "pl-2 pr-1 py-2 rounded-l-md text-xs font-bold transition-colors uppercase tracking-wide",
                        active ? "text-accent" : "text-navy hover:text-accent hover:bg-navy/5",
                      )}
                    >
                      {entry.label}
                    </Link>
                    <button
                      type="button"
                      className={cn(
                        "pr-2 py-2 rounded-r-md transition-colors inline-flex items-center",
                        active ? "text-accent" : "text-navy hover:text-accent hover:bg-navy/5",
                      )}
                      aria-expanded={open}
                      aria-haspopup="true"
                      aria-label={`${entry.label} menu`}
                      onClick={() => setOpenDesktopGroup(open ? null : entry.id)}
                    >
                      <ChevronDown size={12} />
                    </button>
                  </div>
                  {open ? (
                    <div className="absolute left-0 top-full pt-1 min-w-[240px]">
                      <div className="rounded-lg border border-border bg-white shadow-lg py-2">
                        {entry.items.map((link) => (
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

          <div className="hidden xl:flex items-center space-x-2 shrink-0">
            <Link to={paths.login}>
              <Button variant="ghost" size="sm" className="text-navy hover:text-accent hover:bg-navy/5 gap-1.5 font-semibold">
                <UserCircle size={18} />
                Login
              </Button>
            </Link>
            <Button asChild size="sm" variant="accent" className="font-semibold uppercase tracking-wide text-xs">
              <a href={quoteMailto} onClick={() => trackEvent("cta_mailto", { placement: "nav", intent: "quote" })}>
                Request Transportation
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

        {isMobileMenuOpen ? (
          <div className="xl:hidden py-4 animate-fade-in bg-white border-t border-gray-100 shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="flex flex-col space-y-1">
              {headerNav.map((entry) => {
                if (entry.type === "link") {
                  const active =
                    entry.id === "intelligence"
                      ? location.pathname === paths.intelligence.hub || location.pathname.startsWith("/intelligence/")
                      : entry.id === "network"
                        ? location.pathname === paths.network.hub || location.pathname.startsWith("/network/")
                        : pathMatches(location.pathname, entry.path);
                  return (
                    <Link
                      key={entry.id}
                      to={entry.path}
                      className={cn(
                        "px-4 py-3 text-sm font-bold transition-colors uppercase tracking-wide",
                        active
                          ? "text-accent bg-accent/5 border-l-4 border-accent"
                          : "text-navy hover:text-accent hover:bg-gray-50",
                      )}
                    >
                      {entry.label}
                    </Link>
                  );
                }

                const active = dropdownIsActive(location.pathname, entry);
                const open = openMobileGroup === entry.id;

                return (
                  <div key={entry.id}>
                    <div className="flex items-center">
                      <Link
                        to={entry.hubPath}
                        className={cn(
                          "flex-1 px-4 py-3 text-sm font-bold transition-colors uppercase tracking-wide",
                          active
                            ? "text-accent bg-accent/5 border-l-4 border-accent"
                            : "text-navy hover:text-accent hover:bg-gray-50",
                        )}
                      >
                        {entry.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setOpenMobileGroup(open ? null : entry.id)}
                        className="px-4 py-3 text-navy hover:text-accent"
                        aria-expanded={open}
                        aria-label={`Expand ${entry.label} menu`}
                      >
                        <ChevronDown size={16} className={cn("transition-transform", open && "rotate-180")} />
                      </button>
                    </div>
                    {open ? (
                      <div className="pl-4 pb-2 space-y-1">
                        {entry.items.map((link) => (
                          <Link
                            key={link.path}
                            to={link.path}
                            className={cn(
                              "block px-4 py-2.5 text-sm font-semibold",
                              pathMatches(location.pathname, link.path) ? "text-accent" : "text-navy hover:text-accent",
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
                <Link to={paths.login} className="block">
                  <Button variant="outline" className="w-full border-navy/20 text-navy hover:bg-navy/5 justify-start gap-2">
                    <UserCircle size={18} />
                    Login
                  </Button>
                </Link>
                <Button asChild className="w-full font-semibold uppercase tracking-wide" variant="accent">
                  <a href={quoteMailto} onClick={() => trackEvent("cta_mailto", { placement: "nav", intent: "quote" })}>
                    Request Transportation
                  </a>
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Navigation;
