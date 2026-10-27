import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceDetailsModal from "@/components/ServiceDetailsModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  IndianRupee, 
  FileText, 
  BarChart3, 
  CheckCircle, 
  TrendingUp, 
  Shield, 
  Users, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Scale
} from "lucide-react";

interface ServiceData {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  stats: {
    label: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
  highlights: string[];
}

const SERVICES_DATA: ServiceData[] = [
  {
    id: "legal-funding",
    badge: "Core Solution",
    title: "Smart Resolution Solutions",
    tagline: "Outcome-Aligned Legal Capital for High-Value Disputes",
    description:
      "Structured legal finance with low upfront cost and fees align to case outcomes. Designed to protect operational cash flow and empower meritorious claims without financial strain.",
    icon: IndianRupee,
    features: [
      "Funding support up to ₹5 Cr",
      "Just 1% to get started",
      "Success-based fee after resolution",
      "Risk assessment and mitigation",
    ],
    stats: [
      { label: "Average Funding", value: "₹25 Lakhs", icon: IndianRupee },
      { label: "Approval Rate", value: "95%", icon: CheckCircle },
      { label: "Average Time to Fund", value: "14 days", icon: TrendingUp },
    ],
    highlights: [
      "Non-recourse commercial dispute funding",
      "Covers senior advocates, arbitral filings & forensic audits",
      "No recurring monthly payments or balance sheet liabilities",
      "Strict evaluation against commercial claim merits",
    ],
  },
  {
    id: "case-management",
    badge: "Strategic Oversight",
    title: "Expert Case Management",
    tagline: "End-to-End Strategic Guidance from Filing to Enforcement",
    description:
      "Strategic oversight and management of business portfolios with dedicated expert support. We coordinate counsel, assemble evidence, track timelines, and facilitate decisive resolutions.",
    icon: FileText,
    features: [
      "Dedicated case managers",
      "Real-time progress tracking",
      "Strategic consultation",
      "Risk monitoring and reporting",
    ],
    stats: [
      { label: "Cases Managed", value: "30+", icon: FileText },
      { label: "Success Rate", value: "94%", icon: Shield },
      { label: "Client Satisfaction", value: "99%", icon: Users },
    ],
    highlights: [
      "Dedicated case managers with corporate legal experience",
      "24/7 transparent milestone updates and evidence logs",
      "Settlement negotiation and mediation support",
      "Continuous risk monitoring and strategic realignment",
    ],
  },
  {
    id: "portfolio-services",
    badge: "Enterprise Capital",
    title: "Portfolio Management",
    tagline: "Commercial Claim Portfolio Optimization for Institutional Clients",
    description:
      "Advanced portfolio optimization and diversification strategies for institutional investors, businesses, and family offices looking to bundle and systematically resolve multiple contested receivables.",
    icon: BarChart3,
    features: [
      "Portfolio diversification",
      "Performance analytics",
      "Risk assessment tools",
      "Investment strategy consulting",
    ],
    stats: [
      { label: "Portfolio Value", value: "₹2.1 Cr+", icon: BarChart3 },
      { label: "Annual ROI", value: "24%", icon: TrendingUp },
      { label: "Active Clients", value: "30+", icon: Users },
    ],
    highlights: [
      "Cross-claim portfolio valuation and risk underwriting",
      "Proprietary legal recovery yield analytics",
      "Systematic recovery mechanisms across multiple debtors",
      "Custom SPV and syndicate facilitation models",
    ],
  },
];

const Services = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("legal-funding");
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Our Services | Lexian & Jurian — Smart Dispute Resolution";
  }, []);

  const activeService = SERVICES_DATA.find((s) => s.id === activeTab) || SERVICES_DATA[0];

  return (
    <div className="min-h-screen bg-white text-foreground flex flex-col justify-between">
      <Header />

      <main>
        {/* ============================================================== */}
        {/* HERO HEADER SECTION                                            */}
        {/* ============================================================== */}
        <section className="relative py-14 sm:py-18 md:py-20 bg-gradient-hero text-white overflow-hidden">
          {/* Subtle Background Radial Light */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background:
                "radial-gradient(circle at 80% 20%, rgba(0, 191, 255, 0.4) 0%, transparent 60%)",
            }}
          />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
            {/* Back to Home Link */}
            <div className="mb-6 sm:mb-8">
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-1.5 h-auto text-xs sm:text-sm rounded-full inline-flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Home</span>
              </Button>
            </div>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm mb-4 text-xs sm:text-sm font-medium text-[#00BFFF]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Specialized Dispute Facilitation & Capital</span>
              </div>

              <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-5xl leading-[1.18] tracking-tight">
                Our Services
              </h1>

              <p className="mt-4 text-base sm:text-lg md:text-xl text-white/85 leading-relaxed font-normal">
                Smart legal architecture designed to align your financial support with resolutions. Explore our complete suite of non-recourse legal finance, strategic case management, and institutional portfolio solutions.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* INTERACTIVE TABBED SHOWCASE (PRESERVING EXACT ORIGINAL SECTION) */}
        {/* ============================================================== */}
        <section className="py-14 sm:py-18 md:py-20 bg-gradient-surface border-b border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-8 sm:mb-12">
              <span className="text-xs uppercase font-bold tracking-widest text-[#00BFFF]">
                Full Service Spectrum
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#001d51] mt-2">
                Explore Our Core Offerings
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-2.5">
                Every solution is structured to remove financial risk, accelerate judicial or arbitral resolution, and preserve business capital.
              </p>
            </div>

            {/* Tab Selector */}
            <div className="flex flex-col sm:flex-row justify-center mb-10 sm:mb-12 bg-white rounded-2xl p-1.5 sm:p-2 shadow-soft max-w-3xl mx-auto border border-border/70">
              {SERVICES_DATA.map((service) => {
                const Icon = service.icon;
                const isActive = activeTab === service.id;

                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveTab(service.id)}
                    className={`
                      flex items-center justify-center gap-2.5 px-4 py-3 sm:py-3.5 rounded-xl font-medium transition-all duration-200 flex-1 text-xs sm:text-sm md:text-base
                      ${
                        isActive
                          ? "bg-[#001d51] text-white shadow-sm font-semibold"
                          : "text-slate-600 hover:text-[#001d51] hover:bg-slate-50"
                      }
                    `}
                  >
                    <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${isActive ? "text-[#00BFFF]" : "text-slate-500"}`} />
                    <span>{service.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Service Showcase Card */}
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 border border-slate-200/80 shadow-medium animate-fade-in-up">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left: Content & Features */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <Badge className="bg-[#00BFFF]/15 text-[#0082c3] border-0 text-xs font-semibold px-3 py-1 mb-3">
                      {activeService.badge}
                    </Badge>
                    <h3 className="font-serif font-bold text-2xl sm:text-3xl md:text-[2rem] text-[#001d51] leading-tight">
                      {activeService.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-[#00BFFF] mt-1 mb-3">
                      {activeService.tagline}
                    </p>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {activeService.description}
                    </p>
                  </div>

                  {/* Core Features List */}
                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#001d51]">
                      Key Features & Deliverables:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeService.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <CheckCircle className="h-5 w-5 text-[#00BFFF] shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-slate-700 font-medium">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <Button
                      onClick={() => setSelectedServiceForModal(activeService.id)}
                      variant="outline"
                      className="border-slate-300 text-[#001d51] hover:border-[#00BFFF] hover:bg-slate-50 text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full"
                    >
                      <span>Explore In Detail</span>
                      <ChevronRight className="ml-1 w-4 h-4" />
                    </Button>

                    <Link to="/#enquiry">
                      <Button className="bg-[#00BFFF] text-[#001d51] hover:bg-[#26cbff] text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-full shadow-xs">
                        <span>Enquire About This Service</span>
                        <ArrowRight className="ml-1.5 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right: Key Performance Metrics Cards */}
                <div className="lg:col-span-5 grid grid-cols-1 gap-4">
                  {activeService.stats.map((stat, idx) => {
                    const StatIcon = stat.icon;
                    return (
                      <Card
                        key={idx}
                        className="p-5 sm:p-6 bg-slate-50/70 border border-slate-200/80 rounded-2xl shadow-xs transition-transform duration-200 hover:-translate-y-0.5"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl sm:text-3xl font-bold text-[#001d51]">
                              {stat.value}
                            </div>
                            <div className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                              {stat.label}
                            </div>
                          </div>
                          <div className="p-3 bg-white rounded-xl shadow-xs border border-slate-200/60">
                            <StatIcon className="h-5 w-5 sm:h-6 sm:w-6 text-[#00BFFF]" />
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* COMPREHENSIVE 3-COLUMN SERVICE PILLARS OVERVIEW                */}
        {/* ============================================================== */}
        <section className="py-14 sm:py-18 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <span className="text-xs uppercase font-bold tracking-widest text-[#00BFFF]">
                Why Businesses Choose Us
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#001d51] mt-2">
                All 3 Service Pillars At A Glance
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2.5">
                Whether managing individual unpaid invoices or multi-crore arbitral claims, our three integrated capabilities work harmoniously to protect your enterprise.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {SERVICES_DATA.map((srv) => {
                const SrvIcon = srv.icon;
                return (
                  <div
                    key={srv.id}
                    className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-slate-200/80 bg-white hover:border-[#00BFFF] hover:shadow-medium transition-all duration-300 rounded-2xl group"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-[#001d51]/5 text-[#001d51] group-hover:bg-[#00BFFF]/15 group-hover:text-[#0082c3] flex items-center justify-center mb-5 transition-colors">
                        <SrvIcon className="w-6 h-6" />
                      </div>

                      <Badge className="bg-slate-100 text-slate-700 border-0 text-[11px] font-semibold mb-2">
                        {srv.badge}
                      </Badge>

                      <h3 className="font-serif font-bold text-xl text-[#001d51] mb-2.5">
                        {srv.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                        {srv.description}
                      </p>

                      <div className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                        {srv.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00BFFF]" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedServiceForModal(srv.id)}
                        className="text-xs font-semibold text-[#001d51] hover:text-[#00BFFF] inline-flex items-center gap-1 transition-colors"
                      >
                        <span>View Breakdown</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      <Link
                        to="/#enquiry"
                        className="text-xs font-semibold text-[#00BFFF] hover:underline"
                      >
                        Enquire →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* CONCLUDING ENQUIRY CTA SECTION                                 */}
        {/* ============================================================== */}
        <section className="py-14 sm:py-18 bg-gradient-hero text-white text-center relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-15"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(0, 191, 255, 0.5) 0%, transparent 60%)",
            }}
          />

          <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10 space-y-5">
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 mx-auto flex items-center justify-center text-[#00BFFF]">
              <Scale className="w-6 h-6" />
            </div>

            <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl leading-tight">
              Ready to Discuss Your Commercial Dispute?
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Submit your dispute details for a confidential, risk-free case evaluation by our experienced dispute advisory team.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link to="/#enquiry">
                <Button className="bg-[#00BFFF] text-[#001d51] hover:bg-[#26cbff] text-sm sm:text-base font-semibold px-7 py-3 h-11 sm:h-12 rounded-full shadow-md transition-transform hover:-translate-y-0.5">
                  <span>Discuss Your Commercial Dispute</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>

              <Link to="/#contact">
                <Button
                  variant="outline"
                  className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white text-sm sm:text-base font-medium px-6 py-3 h-11 sm:h-12 rounded-full"
                >
                  Contact Office Directly
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Reusable Detailed Service Modal */}
      {selectedServiceForModal && (
        <ServiceDetailsModal
          isOpen={Boolean(selectedServiceForModal)}
          onClose={() => setSelectedServiceForModal(null)}
          serviceType={selectedServiceForModal}
        />
      )}
    </div>
  );
};

export default Services;
