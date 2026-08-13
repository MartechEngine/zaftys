import { lazy, Suspense, useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route, useLocation, Navigate, useParams } from "react-router-dom";
import Navigation from "./components/Navigation";
import NotFound from "./pages/NotFound";
import { WhatsAppFab } from "./components/WhatsAppButton";
import { initAnalytics, trackPageview } from "./lib/analytics";
import { captureUtmFromLocation } from "./lib/utm";
import { logVisit } from "./lib/visit-log";

/** Lazy Home: LCP is owned by the HTML shell, so the Home chunk must not bloat the main bundle. */
const Home = lazy(() => import("./pages/Home"));
const Footer = lazy(() => import("./components/Footer"));
const Toaster = lazy(() =>
  import("@/components/ui/toaster").then((m) => ({ default: m.Toaster })),
);
const Sonner = lazy(() =>
  import("@/components/ui/sonner").then((m) => ({ default: m.Toaster })),
);
const TooltipProvider = lazy(() =>
  import("@/components/ui/tooltip").then((m) => ({ default: m.TooltipProvider })),
);
const About = lazy(() => import("./pages/About"));
const Technology = lazy(() => import("./pages/Technology"));
const Network = lazy(() => import("./pages/Network"));
const Services = lazy(() => import("./pages/Services"));
const Industries = lazy(() => import("./pages/Industries"));
const IndustryDetail = lazy(() => import("./pages/IndustryDetail"));
const Fleet = lazy(() => import("./pages/Fleet"));
const Careers = lazy(() => import("./pages/Careers"));
const Partner = lazy(() => import("./pages/Partner"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Resources = lazy(() => import("./pages/Resources"));
const MarketReports = lazy(() => import("./pages/MarketReports"));
const MarketReport = lazy(() => import("./pages/MarketReport"));
const ReportPdfReader = lazy(() => import("./pages/ReportPdfReader"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Cookies = lazy(() => import("./pages/Cookies"));
const LegalNotice = lazy(() => import("./pages/LegalNotice"));
const Login = lazy(() => import("./pages/Login"));

const PageFallback = () => (
  <div className="min-h-[40vh] flex items-center justify-center" role="status" aria-label="Loading page">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
  </div>
);

function LazyPage({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageFallback />}>{children}</Suspense>;
}

function ResourcesSlugRedirect() {
  const { slug } = useParams<{ slug: string }>();
  if (slug === "reports") {
    return <Navigate to="/resources/reports" replace />;
  }
  return <Navigate to={slug ? `/blog/${slug}` : "/blog"} replace />;
}

function removeLcpShell() {
  document.getElementById("lcp-shell")?.remove();
}

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") removeLcpShell();
  }, [pathname]);

  useEffect(() => {
    captureUtmFromLocation();
    initAnalytics();
    const page = `${pathname}${search}`;
    trackPageview(page, document.title);
    logVisit(page);
  }, [pathname, search]);

  return null;
};

/** Toast/tooltip UI is below-fold chrome — keep it out of the first paint path. */
function DeferredChrome() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const ric = window.requestIdleCallback?.bind(window);
    if (typeof ric === "function") {
      const id = ric(() => setReady(true), { timeout: 4000 });
      return () => window.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(() => setReady(true), 2000);
    return () => window.clearTimeout(t);
  }, []);
  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </Suspense>
  );
}

const AppShell = () => {
  const { pathname } = useLocation();
  const isAuthPage = pathname === "/login";

  return (
    <>
      <ScrollToTop />
      {!isAuthPage && <Navigation />}
      <Routes>
        {/* null fallback keeps the HTML LCP shell visible while Home loads */}
        <Route
          path="/"
          element={
            <Suspense fallback={null}>
              <Home />
            </Suspense>
          }
        />
        <Route path="/about" element={<LazyPage><About /></LazyPage>} />
        <Route path="/technology" element={<LazyPage><Technology /></LazyPage>} />
        <Route path="/platform" element={<Navigate to="/technology" replace />} />
        <Route path="/services" element={<LazyPage><Services /></LazyPage>} />
        <Route path="/industries" element={<LazyPage><Industries /></LazyPage>} />
        <Route path="/industries/mining" element={<Navigate to="/industries/coal-mining" replace />} />
        <Route path="/industries/retail" element={<Navigate to="/industries/retail-distribution" replace />} />
        <Route path="/industries/:slug" element={<LazyPage><IndustryDetail /></LazyPage>} />
        <Route path="/fleet" element={<LazyPage><Fleet /></LazyPage>} />
        <Route path="/network" element={<LazyPage><Network /></LazyPage>} />
        <Route path="/careers" element={<LazyPage><Careers /></LazyPage>} />
        <Route path="/partner" element={<LazyPage><Partner /></LazyPage>} />
        <Route path="/contact" element={<LazyPage><Contact /></LazyPage>} />
        <Route path="/blog" element={<LazyPage><Blog /></LazyPage>} />
        <Route path="/blog/:slug" element={<LazyPage><BlogPost /></LazyPage>} />
        <Route path="/resources" element={<LazyPage><Resources /></LazyPage>} />
        <Route path="/resources/reports" element={<LazyPage><MarketReports /></LazyPage>} />
        <Route
          path="/resources/reports/global-logistics-market-2026-2033"
          element={<Navigate to="/resources/reports/global-logistics-market-2027-2036" replace />}
        />
        <Route
          path="/resources/reports/global-logistics-market-2026-2033/read"
          element={<Navigate to="/resources/reports/global-logistics-market-2027-2036/read" replace />}
        />
        <Route path="/resources/reports/:slug/read" element={<LazyPage><ReportPdfReader /></LazyPage>} />
        <Route path="/resources/reports/:slug" element={<LazyPage><MarketReport /></LazyPage>} />
        <Route path="/resources/:slug" element={<ResourcesSlugRedirect />} />
        <Route path="/privacy" element={<LazyPage><Privacy /></LazyPage>} />
        <Route path="/terms" element={<LazyPage><Terms /></LazyPage>} />
        <Route path="/cookies" element={<LazyPage><Cookies /></LazyPage>} />
        <Route path="/legal-notice" element={<LazyPage><LegalNotice /></LazyPage>} />
        <Route path="/login" element={<LazyPage><Login /></LazyPage>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAuthPage && (
        <>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
          <WhatsAppFab />
        </>
      )}
    </>
  );
};

const App = () => (
  <HelmetProvider>
    <BrowserRouter>
      <AppShell />
      <DeferredChrome />
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
