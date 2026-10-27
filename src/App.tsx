import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import FloatingContactWidget from "./components/FloatingContactWidget";
import CookieConsentPopup from "./components/CookieConsentPopup";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import OurStory from "./pages/OurStory";
import RiskAssessment from "./pages/RiskAssessment";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import Admin from "./pages/Admin";
import ProvenResults from "./pages/ProvenResults";
import ProvenResultDetail from "./pages/ProvenResultDetail";
import ExpertJury from "./pages/ExpertJury";
import Services from "./pages/Services";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <FloatingContactWidget />
        <CookieConsentPopup />
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
