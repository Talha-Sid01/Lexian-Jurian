import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  DollarSign, 
  IndianRupee,
  FileText, 
  BarChart3, 
  ArrowRight, 
  CheckCircle, 
  Users, 
  TrendingUp,
  Shield
} from "lucide-react";

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState("legal-funding");

  const tabs = [
    { id: "legal-funding", label: "Smart Resolution", icon: IndianRupee },
    { id: "case-management", label: "Case Management", icon: FileText },
    { id: "portfolio-services", label: "Portfolio Services", icon: BarChart3 }
  ];

  const tabContent = {
    "legal-funding": {
      title: "Smart Resotution Solutions",
      description: "Structured legal finance with low upfront cost and fees align to case outcomes.",
      features: [
        "Funding support up to ₹5 Cr",
        "Just 1% to get started",
        "Success-based fee after resolution",
        "Risk assessment and mitigation"
      ],
      stats: [
        { label: "Average Funding", value: "₹25 Lakhs", icon: IndianRupee },
        { label: "Approval Rate", value: "95%", icon: CheckCircle },
        { label: "Average Time to Fund", value: "14 days", icon: TrendingUp }
      ]
    },
    "case-management": {
      title: "Expert Case Management",
      description: "Strategic oversight and management of business portfolios with dedicated expert support.",
      features: [
        "Dedicated case managers",
        "Real-time progress tracking",
        "Strategic consultation",
        "Risk monitoring and reporting"
      ],
      stats: [
        { label: "Cases Managed", value: "30+", icon: FileText },
        { label: "Success Rate", value: "94%", icon: Shield },
        { label: "Client Satisfaction", value: "99%", icon: Users }
      ]
    },
    "portfolio-services": {
      title: "Portfolio Management",
      description: "Advanced portfolio optimization and diversification strategies for institutional investors.",
      features: [
        "Portfolio diversification",
        "Performance analytics",
        "Risk assessment tools",
        "Investment strategy consulting"
      ],
      stats: [
        { label: "Portfolio Value", value: "₹2.1 Cr+", icon: BarChart3 },
        { label: "Annual ROI", value: "24%", icon: TrendingUp },
        { label: "Active Clients", value: "30+", icon: Users }
      ]
    }
  };

  return (
    <section id="services" className="py-14 md:py-18 bg-gradient-surface">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-10 md:mb-12 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3 md:mb-4">
            Our Services
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Smart legal architect design to align your financial support with resolutions
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col md:flex-row justify-center mb-10 md:mb-14 bg-white rounded-xl p-2 shadow-soft max-w-4xl mx-auto border border-border/60">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center space-x-2.5 px-5 py-3 rounded-lg font-medium transition-all duration-200 flex-1 ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                }`}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm md:text-base">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in-up">
          {Object.entries(tabContent).map(([key, content]) => (
            <div
              key={key}
              className={`${activeTab === key ? "block" : "hidden"} animate-fade-in-up`}
            >
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-5xl mx-auto">
                <div className="space-y-6 md:space-y-8">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-primary mb-3 md:mb-4">
                      {content.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {content.description}
                    </p>
                  </div>

                  <div className="space-y-3.5">
                    {content.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground text-sm md:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary-light text-primary-foreground text-sm md:text-base font-semibold px-6 py-3 rounded-xl shadow-sm transition-all duration-200"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <div className="grid gap-4 md:gap-5">
                  {content.stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <Card key={index} className="p-6 hover-lift bg-white border border-border shadow-soft glare-effect rounded-xl transition-all duration-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-1">
                              {stat.value}
                            </div>
                            <div className="text-muted-foreground text-xs md:text-sm font-medium">
                              {stat.label}
                            </div>
                          </div>
                          <div className="p-3 bg-primary/10 rounded-xl">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
