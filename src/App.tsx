import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate, useParams } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import About from "./pages/About";
import Technology from "./pages/Technology";
import Industries from "./pages/Industries";
import Fleet from "./pages/Fleet";
import Careers from "./pages/Careers";
import Partner from "./pages/Partner";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Login from "./pages/Login";
import { WhatsAppFab } from "./components/WhatsAppButton";

const Home = lazy(() => import("./pages/Home"));
const Network = lazy(() => import("./pages/Network"));
const Services = lazy(() => import("./pages/Services"));
const IndustryDetail = lazy(() => import("./pages/IndustryDetail"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

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

const App = () => (
  <HelmetProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Navigation />
        <Routes>
          <Route path="/" element={<LazyPage><Home /></LazyPage>} />
          <Route path="/about" element={<About />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/platform" element={<Navigate to="/technology" replace />} />
          <Route path="/services" element={<LazyPage><Services /></LazyPage>} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/mining" element={<Navigate to="/industries/coal-mining" replace />} />
          <Route path="/industries/:slug" element={<LazyPage><IndustryDetail /></LazyPage>} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/network" element={<LazyPage><Network /></LazyPage>} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<LazyPage><Blog /></LazyPage>} />
          <Route path="/blog/:slug" element={<LazyPage><BlogPost /></LazyPage>} />
          <Route path="/resources" element={<Navigate to="/blog" replace />} />
          <Route path="/resources/:slug" element={<ResourcesSlugRedirect />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <WhatsAppFab />
      </BrowserRouter>
    </TooltipProvider>
  </HelmetProvider>
);

export default App;
