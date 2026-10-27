import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Shield, FileText, TrendingUp, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RiskAssessment = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      icon: Shield,
      title: "Comprehensive Case Analysis",
      description: "Detailed evaluation of legal merits, potential outcomes, and financial viability of your dispute."
    },
    {
      icon: FileText,
      title: "Documentation Review",
      description: "Thorough examination of contracts, agreements, and supporting evidence to assess case strength."
    },
    {
      icon: TrendingUp,
      title: "Financial Risk Modeling",
      description: "Advanced modeling to project costs, timelines, and expected recovery amounts across different scenarios."
    },
    {
      icon: CheckCircle,
      title: "Strategic Recommendations",
      description: "Expert guidance on litigation strategy, settlement opportunities, and optimal funding structures."
    }
  ];

  const process = [
    "Submit your case details and supporting documents",
    "Our expert team conducts preliminary assessment within 48 hours",
    "Detailed risk analysis report delivered within 5-7 business days",
    "Consultation meeting to discuss findings and recommendations",
    "Receive customized funding proposal if case meets our criteria"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-24 bg-gradient-hero">
          <div className="container mx-auto px-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mb-8 text-primary-foreground hover:bg-white/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            
            <div className="max-w-4xl mx-auto text-center text-primary-foreground">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">
                Risk Assessment Services
              </h1>
              <p className="text-base sm:text-lg md:text-xl opacity-90">
                Expert evaluation to determine the viability and potential of your legal dispute
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto mb-16 text-center">
              <h2 className="text-4xl font-bold text-primary mb-6">
                Why Risk Assessment Matters
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Before committing significant resources to litigation, it's crucial to understand 
                the risks, costs, and potential outcomes. Our comprehensive risk assessment service 
                provides you with the insights needed to make informed decisions about pursuing legal action.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-20">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={index} className="glare-effect hover-lift">
                    <CardContent className="p-8">
                      <div className="mb-4">
                        <div className="p-3 bg-primary/10 rounded-xl w-fit">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-primary mb-3">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-primary mb-8 text-center">
                Our Assessment Process
              </h2>
              <div className="space-y-4">
                {process.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4 p-6 bg-gradient-surface rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <p className="text-muted-foreground pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 bg-primary text-primary-foreground p-12 rounded-lg text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Assess Your Case?</h2>
              <p className="text-lg mb-8 opacity-90">
                Get started with a free preliminary consultation to determine if our risk 
                assessment service is right for your legal dispute.
              </p>
              <Button 
                onClick={() => {
                  navigate('/');
                  setTimeout(() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }}
                variant="secondary"
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
              >
                Request Assessment
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RiskAssessment;
