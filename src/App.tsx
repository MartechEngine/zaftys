import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route, useLocation, Navigate, useParams } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import { WhatsAppFab } from "./components/WhatsAppButton";
import { initAnalytics, trackPageview } from "./lib/analytics";
import { captureUtmFromLocation } from "./lib/utm";
import { logVisit } from "./lib/visit-log";
import { paths, legacyNetworkPath, legacyTmsPath, reportPath, reportReadPath } from "./lib/site-paths";
import Home from "./pages/Home";

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

const LogisticsHub = lazy(() => import("./pages/logistics/LogisticsHub"));
const ThreePlTransportation = lazy(() =>
  import("./pages/logistics/LogisticsSolutions").then((m) => ({ default: m.ThreePlTransportation })),
);
const ContractLogistics = lazy(() =>
  import("./pages/logistics/LogisticsSolutions").then((m) => ({ default: m.ContractLogistics })),
);
const DedicatedFleetPage = lazy(() =>
  import("./pages/logistics/LogisticsSolutions").then((m) => ({ default: m.DedicatedFleet })),
);
const IndustrialFreight = lazy(() =>
  import("./pages/logistics/LogisticsSolutions").then((m) => ({ default: m.IndustrialFreight })),
);
const ContainerTransportation = lazy(() =>
  import("./pages/logistics/LogisticsSolutions").then((m) => ({ default: m.ContainerTransportation })),
);

const NetworkHub = lazy(() => import("./pages/network/NetworkHub"));
const TransporterNetwork = lazy(() =>
  import("./pages/network/NetworkSolutions").then((m) => ({ default: m.TransporterNetwork })),
);
const TruckCapacity = lazy(() =>
  import("./pages/network/NetworkSolutions").then((m) => ({ default: m.TruckCapacity })),
);

const TechnologyHub = lazy(() => import("./pages/technology/TechnologyHub"));
const FleetManagement = lazy(() =>
  import("./pages/technology/TechnologySolutions").then((m) => ({ default: m.FleetManagement })),
);
const TrackingVisibility = lazy(() =>
  import("./pages/technology/TechnologySolutions").then((m) => ({ default: m.TrackingVisibility })),
);
const LogisticsApis = lazy(() =>
  import("./pages/technology/TechnologySolutions").then((m) => ({ default: m.LogisticsApis })),
);

const IntelligenceHub = lazy(() => import("./pages/intelligence/IntelligenceHub"));
const ZaftysAnalytics = lazy(() =>
  import("./pages/intelligence/IntelligenceSolutions").then((m) => ({ default: m.ZaftysAnalytics })),
);
const FreightRateIntelligence = lazy(() =>
  import("./pages/intelligence/IntelligenceSolutions").then((m) => ({ default: m.FreightRateIntelligence })),
);
const MarketIntelligence = lazy(() =>
  import("./pages/intelligence/IntelligenceSolutions").then((m) => ({ default: m.MarketIntelligence })),
);
const SupplyChainAi = lazy(() =>
  import("./pages/intelligence/IntelligenceSolutions").then((m) => ({ default: m.SupplyChainAi })),
);

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
    return <Navigate to={paths.reports} replace />;
  }
  return <Navigate to={slug ? `/blog/${slug}` : paths.blog} replace />;
}

function LegacyReportRedirect({ read = false }: { read?: boolean }) {
  const { slug } = useParams<{ slug: string }>();
  const target = slug === "global-logistics-market-2026-2033"
    ? "global-logistics-market-2027-2036"
    : slug;
  if (!target) return <Navigate to={paths.reports} replace />;
  return <Navigate to={read ? reportReadPath(target) : reportPath(target)} replace />;
}

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
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

const AppShell = () => {
  const { pathname } = useLocation();
  const isAuthPage = pathname === paths.login;

  return (
    <>
      <ScrollToTop />
      {!isAuthPage && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Logistics */}
        <Route path={paths.logistics.hub} element={<LazyPage><LogisticsHub /></LazyPage>} />
        <Route path={paths.logistics.threePl} element={<LazyPage><ThreePlTransportation /></LazyPage>} />
        <Route path={paths.logistics.contract} element={<LazyPage><ContractLogistics /></LazyPage>} />
        <Route path={paths.logistics.dedicated} element={<LazyPage><DedicatedFleetPage /></LazyPage>} />
        <Route path={paths.logistics.industrial} element={<LazyPage><IndustrialFreight /></LazyPage>} />
        <Route path={paths.logistics.container} element={<LazyPage><ContainerTransportation /></LazyPage>} />

        {/* Network */}
        <Route path={paths.network.hub} element={<LazyPage><NetworkHub /></LazyPage>} />
        <Route path={paths.network.tranzfort} element={<LazyPage><Network /></LazyPage>} />
        <Route path={paths.network.transporterNetwork} element={<LazyPage><TransporterNetwork /></LazyPage>} />
        <Route path={paths.network.truckCapacity} element={<LazyPage><TruckCapacity /></LazyPage>} />

        {/* Technology */}
        <Route path={paths.technology.hub} element={<LazyPage><TechnologyHub /></LazyPage>} />
        <Route path={paths.technology.tms} element={<LazyPage><Technology /></LazyPage>} />
        <Route path={paths.technology.fleetManagement} element={<LazyPage><FleetManagement /></LazyPage>} />
        <Route path={paths.technology.tracking} element={<LazyPage><TrackingVisibility /></LazyPage>} />
        <Route path={paths.technology.apis} element={<LazyPage><LogisticsApis /></LazyPage>} />

        {/* Intelligence */}
        <Route path={paths.intelligence.hub} element={<LazyPage><IntelligenceHub /></LazyPage>} />
        <Route path={paths.intelligence.analytics} element={<LazyPage><ZaftysAnalytics /></LazyPage>} />
        <Route path={paths.intelligence.freightRates} element={<LazyPage><FreightRateIntelligence /></LazyPage>} />
        <Route path={paths.intelligence.marketIntelligence} element={<LazyPage><MarketIntelligence /></LazyPage>} />
        <Route path={paths.intelligence.ai} element={<LazyPage><SupplyChainAi /></LazyPage>} />

        {/* Legacy redirects */}
        <Route path="/services" element={<Navigate to={paths.logistics.hub} replace />} />
        <Route path={legacyNetworkPath} element={<Navigate to={paths.network.tranzfort} replace />} />
        <Route path={legacyTmsPath} element={<Navigate to={paths.technology.tms} replace />} />
        <Route path="/platform" element={<Navigate to={paths.technology.tms} replace />} />
        <Route path="/technology" element={<Navigate to={paths.technology.hub} replace />} />

        {/* Existing pages */}
        <Route path={paths.about} element={<LazyPage><About /></LazyPage>} />
        <Route path={paths.fleet} element={<LazyPage><Fleet /></LazyPage>} />
        <Route path={paths.industries} element={<LazyPage><Industries /></LazyPage>} />
        <Route path="/industries/mining" element={<Navigate to="/industries/coal-mining" replace />} />
        <Route path="/industries/retail" element={<Navigate to="/industries/retail-distribution" replace />} />
        <Route path="/industries/:slug" element={<LazyPage><IndustryDetail /></LazyPage>} />
        <Route path={paths.partner} element={<LazyPage><Partner /></LazyPage>} />
        <Route path={paths.contact} element={<LazyPage><Contact /></LazyPage>} />
        <Route path={paths.careers} element={<LazyPage><Careers /></LazyPage>} />
        <Route path={paths.blog} element={<LazyPage><Blog /></LazyPage>} />
        <Route path="/blog/:slug" element={<LazyPage><BlogPost /></LazyPage>} />
        <Route path={paths.resources} element={<LazyPage><Resources /></LazyPage>} />
        <Route path={paths.reports} element={<LazyPage><MarketReports /></LazyPage>} />
        <Route
          path="/reports/global-logistics-market-2026-2033/read"
          element={<Navigate to={reportReadPath("global-logistics-market-2027-2036")} replace />}
        />
        <Route
          path="/reports/global-logistics-market-2026-2033"
          element={<Navigate to={reportPath("global-logistics-market-2027-2036")} replace />}
        />
        <Route path="/reports/:slug/read" element={<LazyPage><ReportPdfReader /></LazyPage>} />
        <Route path="/reports/:slug" element={<LazyPage><MarketReport /></LazyPage>} />
        <Route path="/resources/reports" element={<Navigate to={paths.reports} replace />} />
        <Route path="/resources/reports/:slug/read" element={<LegacyReportRedirect read />} />
        <Route path="/resources/reports/:slug" element={<LegacyReportRedirect />} />
        <Route path="/resources/:slug" element={<ResourcesSlugRedirect />} />
        <Route path="/privacy" element={<LazyPage><Privacy /></LazyPage>} />
        <Route path="/terms" element={<LazyPage><Terms /></LazyPage>} />
        <Route path="/cookies" element={<LazyPage><Cookies /></LazyPage>} />
        <Route path="/legal-notice" element={<LazyPage><LegalNotice /></LazyPage>} />
        <Route path={paths.login} element={<LazyPage><Login /></LazyPage>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAuthPage && (
        <>
          <Footer />
          <WhatsAppFab />
        </>
      )}
    </>
  );
};

const App = () => (
  <HelmetProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </TooltipProvider>
  </HelmetProvider>
);

export default App;
