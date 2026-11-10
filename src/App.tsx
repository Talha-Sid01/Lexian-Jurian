import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import FloatingContactWidget from "./components/FloatingContactWidget";
import CookieConsentPopup from "./components/CookieConsentPopup";

import Index from "./pages/Index";

const Services = lazy(() => import("./pages/Services"));
const OurStory = lazy(() => import("./pages/OurStory"));
const RiskAssessment = lazy(() => import("./pages/RiskAssessment"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const Admin = lazy(() => import("./pages/Admin"));
const ProvenResults = lazy(() => import("./pages/ProvenResults"));
const ProvenResultDetail = lazy(() => import("./pages/ProvenResultDetail"));
const ExpertJury = lazy(() => import("./pages/ExpertJury"));
const NotFound = lazy(() => import("./pages/NotFound"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#070b14]">
    <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <FloatingContactWidget />
        <CookieConsentPopup />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/risk-assessment" element={<RiskAssessment />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/proven-results" element={<ProvenResults />} />
            <Route path="/proven-results/:id" element={<ProvenResultDetail />} />
            <Route path="/expert-jury" element={<ExpertJury />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
