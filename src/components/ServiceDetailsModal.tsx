import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, CheckCircle, ArrowRight } from "lucide-react";

interface ServiceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: string;
}

const ServiceDetailsModal = ({ isOpen, onClose, serviceType }: ServiceDetailsModalProps) => {
  const serviceDetails = {
    "legal-funding": {
      title: "Legal Funding Solutions",
      description: "Comprehensive litigation finance tailored to your case requirements and risk profile.",
      detailedContent: `Our Legal Funding Solutions provide non-recourse capital to businesses and law firms pursuing meritorious legal claims. We understand that legal costs can be substantial and unpredictable, often preventing clients from pursuing rightful claims.

Key Features:
• Non-recourse funding up to ₹500 crores
• No upfront costs or monthly payments
• We only get paid if you win your case
• Competitive rates starting from 15% of recovery
• Quick approval process (7-14 days)
• Expert risk assessment by our legal team

Eligible Cases:
• Commercial contract disputes
• Breach of contract claims
• Partnership and shareholder disputes
• Intellectual property disputes
• International arbitration cases
• Employment law disputes

Our Process:
1. Initial case evaluation (free)
2. Due diligence and risk assessment
3. Funding approval and agreement
4. Ongoing case monitoring and support
5. Recovery sharing upon successful resolution

With over ₹2000 crores in successful recoveries, we have the expertise and capital to handle cases of any size and complexity.`,
      benefits: [
        "No win, no fee structure",
        "Preserve cash flow during litigation",
        "Access to top legal representation",
        "Risk mitigation through expert assessment",
        "Transparent fee structure",
        "Quick decision making"
      ]
    },
    "case-management": {
      title: "Expert Case Management",
      description: "Strategic oversight and management of litigation portfolios with dedicated expert support.",
      detailedContent: `Our Case Management services provide comprehensive oversight of your litigation portfolio, ensuring optimal outcomes through strategic planning and expert guidance.

Service Components:
• Dedicated case managers with legal backgrounds
• Real-time case tracking and reporting
• Strategic consultation and planning
• Risk monitoring and mitigation
• Regular progress reviews and updates
• Settlement negotiation support

Technology Platform:
Our proprietary case management system provides:
• 24/7 access to case status and documents
• Automated milestone tracking
• Budget monitoring and forecasting
• Communication logs and scheduling
• Document repository and sharing
• Performance analytics and reporting

Expert Team:
• Senior legal professionals with 15+ years experience
• Former judges and senior advocates
• Specialized knowledge in various practice areas
• Continuous training and development
• Client-focused service approach

Benefits:
• Improved case outcomes through expert oversight
• Reduced legal costs through efficient management
• Better communication and transparency
• Strategic advantage through experienced guidance
• Risk reduction through proactive monitoring`,
      benefits: [
        "Dedicated case management team",
        "Real-time progress tracking",
        "Strategic legal guidance",
        "Cost optimization",
        "Risk assessment and monitoring",
        "Technology-enabled transparency"
      ]
    },
    "portfolio-services": {
      title: "Portfolio Management",
      description: "Advanced portfolio optimization and diversification strategies for institutional investors.",
      detailedContent: `Our Portfolio Services cater to institutional investors, family offices, and high-net-worth individuals seeking exposure to litigation finance as an alternative investment class.

Investment Strategy:
• Diversified portfolio across case types and jurisdictions
• Risk-adjusted returns targeting 20-30% IRR
• Low correlation with traditional asset classes
• Quarterly performance reporting and analysis
• Professional portfolio management by experienced team

Portfolio Construction:
• Due diligence on every investment opportunity
• Risk scoring and categorization
• Diversification across practice areas and geographies
• Optimal capital allocation strategies
• Continuous monitoring and risk management

Types of Investments:
• Single-case funding opportunities
• Portfolio funding for law firms
• After-the-event (ATE) insurance
• International arbitration awards
• Class action settlements
• IP monetization opportunities

Risk Management:
• Comprehensive due diligence process
• Expert legal and financial analysis
• Diversification across multiple cases
• Regular portfolio monitoring and rebalancing
• Stress testing and scenario analysis
• Professional liability insurance coverage

Investor Benefits:
• Access to exclusive investment opportunities
• Professional management by experienced team
• Comprehensive reporting and transparency
• Institutional-grade risk management
• Strong historical performance track record`,
      benefits: [
        "Diversified litigation investment portfolio",
        "Professional portfolio management",
        "Target returns of 20-30% IRR",
        "Low correlation with traditional assets",
        "Comprehensive risk management",
        "Institutional-grade reporting"
      ]
    }
  };

  const currentService = serviceDetails[serviceType as keyof typeof serviceDetails];

  if (!isOpen || !currentService) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-up">
      <Card className="w-full max-w-4xl bg-white shadow-large border-0 animate-scale-in max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative bg-gradient-primary text-white rounded-t-lg p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div>
            <Badge className="mb-3 bg-white/20 text-primary-foreground border-white/30">
              Service Details
            </Badge>
            <h2 className="text-2xl font-bold mb-2">{currentService.title}</h2>
            <p className="text-primary-foreground/90">{currentService.description}</p>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                  {currentService.detailedContent}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card className="p-4 bg-muted/20">
                <h4 className="font-semibold text-primary mb-3">Key Benefits</h4>
                <ul className="space-y-2">
                  {currentService.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              
              <div className="space-y-3">
                <Button className="w-full bg-gradient-primary">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full">
                  Schedule Consultation
                </Button>
                <Button variant="ghost" className="w-full text-primary">
                  Download Brochure
                </Button>
              </div>
              
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">₹1.3+Cr</div>
                <div className="text-sm text-muted-foreground">Successfully Recovered</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceDetailsModal;
