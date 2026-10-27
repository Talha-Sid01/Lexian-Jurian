import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Clock, Target, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CaseStudiesSection = () => {
  const navigate = useNavigate();

  // These 4 are the inbuilt case studies - they match the hardcoded IDs
  const caseStudies = [
    {
      id: "contract-breach-recovery",
      title: "Contract Breach Recovery",
      description: "Successful recovery from supplier who failed to deliver critical components on schedule.",
      recovered: "₹56 Lakhs",
      duration: "8 Months",
      successRate: "95%"
    },
    {
      id: "investor-misrepresentation",
      title: "Investor Misrepresentation",
      description: "Recovery for investors who were misled about a company's financial position prior to investment.",
      recovered: "₹42 Lakhs",
      duration: "14 Months",
      successRate: "100%"
    },
    {
      id: "ip-infringement",
      title: "Long-Pending Token Refund Resolution",
      description: "Real Estate Booking Dispute – Lodha Group Project",
      recovered: "₹45 Lakhs",
      duration: "3 Months",
      successRate: "98%"
    },
    {
      id: "partnership-dissolution",
      title: "Partnership Dissolution",
      description: "Complex partnership dispute involving asset division and business valuation.",
      recovered: "₹18 Lakhs",
      duration: "13 Months",
      successRate: "Settlement"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-8 md:mb-12 scroll-animate">
          <Badge className="mb-3 md:mb-4 bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm px-4 py-1">
            Case Studies
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3 md:mb-4">
            Proven Results
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Real cases, real recoveries. See how we've helped businesses recover substantial amounts through strategic litigation finance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
          {caseStudies.map((study) => (
            <Card key={study.id} className="glare-effect hover-lift bg-card border border-border shadow-sm scroll-animate rounded-xl">
              <CardContent className="p-5 md:p-6">
                <div className="mb-4 md:mb-5">
                  <h3 className="text-lg md:text-xl font-semibold text-primary mb-1.5 md:mb-2">
                    {study.title}
                  </h3>
                  <p className="text-foreground/70 text-xs md:text-sm leading-relaxed">
                    {study.description}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4 md:mb-5">
                  <div className="text-center p-2.5 md:p-3.5 bg-primary/5 rounded-lg">
                    <TrendingUp className="mx-auto mb-1 md:mb-1.5 h-4 w-4 text-primary" />
                    <div className="font-bold text-primary text-sm md:text-base">{study.recovered}</div>
                    <div className="text-[10px] md:text-xs text-foreground/60 mt-0.5">Recovered</div>
                  </div>
                  <div className="text-center p-2.5 md:p-3.5 bg-accent/10 rounded-lg">
                    <Clock className="mx-auto mb-1 md:mb-1.5 h-4 w-4 text-accent" />
                    <div className="font-bold text-accent text-sm md:text-base">{study.duration}</div>
                    <div className="text-[10px] md:text-xs text-foreground/60 mt-0.5">Duration</div>
                  </div>
                  <div className="text-center p-2.5 md:p-3.5 bg-green-50 border border-green-100 rounded-lg">
                    <Target className="mx-auto mb-1 md:mb-1.5 h-4 w-4 text-green-600" />
                    <div className="font-bold text-green-600 text-sm md:text-base">{study.successRate}</div>
                    <div className="text-[10px] md:text-xs text-foreground/60 mt-0.5">Success</div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full h-10 text-xs sm:text-sm font-medium hover:border-primary/40 hover:bg-primary/5 rounded-lg transition-colors"
                  onClick={() => navigate(`/proven-results/${study.id}`)}
                >
                  View Details
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10 md:mt-12 scroll-animate">
          <Button 
            size="lg"
            variant="outline"
            className="text-sm md:text-base font-semibold px-6 py-2.5 h-11 md:h-12 rounded-xl hover:bg-primary hover:text-white transition-all duration-200"
            onClick={() => navigate('/proven-results')}
          >
            View More Results
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
