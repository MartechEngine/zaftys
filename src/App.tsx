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

const Home = lazy(() => import("./pages/Home"));
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
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
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
  return <Navigate to={slug ? `/blog/${slug}` : "/blog"} replace />;
}

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
};

const AppShell = () => {
  const { pathname } = useLocation();
  const isAuthPage = pathname === "/login";

  return (
    <>
      <ScrollToTop />
      {!isAuthPage && <Navigation />}
      <Routes>
        <Route path="/" element={<LazyPage><Home /></LazyPage>} />
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
        <Route path="/resources" element={<Navigate to="/blog" replace />} />
        <Route path="/resources/:slug" element={<ResourcesSlugRedirect />} />
        <Route path="/privacy" element={<LazyPage><Privacy /></LazyPage>} />
        <Route path="/terms" element={<LazyPage><Terms /></LazyPage>} />
        <Route path="/login" element={<LazyPage><Login /></LazyPage>} />
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
