import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import LegalPlanPopup from "./LegalPlanPopup";

const PricingSection = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  const plans = [
    {
      name: "Startup Shield",
      subtitle: "Perfect for small businesses and startups",
      price: "10%",
      priceNote: "of recovered amount only",
      features: [
        "Contract disputes up to ₹50 lakhs",
        "Payment recovery cases",
        "Basic commercial litigation", 
        "Email & phone support",
        "Document review included",
        "No upfront legal fees",
        "30-day response guarantee"
      ]
    },
    {
      name: "Business Pro",
      subtitle: "Most chosen by growing businesses",
      price: "15%", 
      priceNote: "of recovered amount only",
      popular: true,
      features: [
        "Commercial disputes up to ₹2 crores",
        "Partnership & shareholder disputes",
        "Breach of contract cases",
        "Priority legal support",
        "Dedicated case manager",
        "Court representation included",
        "15-day response guarantee",
        "Settlement negotiation"
      ]
    },
    {
      name: "Enterprise Max",
      subtitle: "For large corporations and complex cases", 
      price: "8%",
      priceNote: "of recovered amount only",
      features: [
        "Unlimited dispute value",
        "Complex commercial litigation",
        "Multi-jurisdictional cases",
        "24/7 legal hotline",
        "Senior advocate representation",
        "Expedited court filing",
        "7-day response guarantee",
        "Risk assessment reports"
      ]
    },
    {
      name: "Annual Retainer",
      subtitle: "Year-round legal protection",
      price: "₹1,50,000",
      priceNote: "per year + 5% success fee",
      features: [
        "Unlimited legal consultations",
        "5 dispute cases per year",
        "Contract drafting & review",
        "Compliance advisory", 
        "Monthly legal health checks",
        "Priority court representation",
        "24-hour legal helpline"
      ]
    },
    {
      name: "Quick Resolution",
      subtitle: "Fast-track dispute settlement",
      price: "₹75,000",
      priceNote: "one-time fee + 10% success fee",
      features: [
        "30-day resolution target",
        "Mediation & arbitration focus",
        "Out-of-court settlements",
        "Cases up to ₹1 crore",
        "Expert negotiation team",
        "Documentation support",
        "Cost-effective approach"
      ]
    },
    {
      name: "International Plus", 
      subtitle: "Cross-border dispute resolution",
      price: "15%",
      priceNote: "of recovered amount only",
      features: [
        "International arbitration support",
        "Multi-jurisdictional litigation",
        "Cross-border enforcement",
        "Global legal network",
        "Currency hedge protection",
        "International court representation",
        "Regulatory compliance support"
      ]
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-muted/20" id="pricing">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8 md:mb-12 scroll-animate">
          <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm px-4 py-1">
            Legal Plans
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3 md:mb-4">
            Commercial Dispute Resolution Made Affordable
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-2">
            Minimal Upfront Cost · We Win When You Win · Just Results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`glare-effect hover-lift bg-white border shadow-soft scroll-animate relative rounded-xl transition-all duration-200 ${
              plan.popular ? 'border-[#00BFFF] shadow-md ring-1 ring-[#00BFFF]/20' : 'border-border'
            }`}>
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-[#00BFFF] text-[#001d51] font-semibold text-xs px-3.5 py-1 shadow-sm border-0">
                    <Star className="w-3.5 h-3.5 mr-1 fill-current" />
                    MOST POPULAR
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-3 pt-6">
                <div className="space-y-1.5">
                  <h3 className="text-lg md:text-xl font-semibold text-primary">{plan.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{plan.subtitle}</p>
                  <div className="py-3">
                    <div className="text-3xl md:text-4xl font-bold text-primary">{plan.price}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground mt-0.5">{plan.priceNote}</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 pb-6 px-6">
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-xs sm:text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={() => setSelectedPlan(plan.name)}
                  className={`w-full rounded-lg font-medium text-xs sm:text-sm h-10 ${
                    plan.popular ? 'bg-primary hover:bg-primary-light text-primary-foreground' : 'hover:bg-primary hover:text-white'
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 md:mt-14 scroll-animate max-w-5xl mx-auto">
          <Card className="glare-effect bg-gradient-primary text-white rounded-2xl">
            <CardContent className="p-8 md:p-10 text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Premium Consultation</h3>
              <p className="text-sm md:text-base opacity-90 mb-6">
                Need a custom solution? Let's discuss your specific requirements.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                  <h4 className="font-semibold text-lg mb-2">Custom Solutions</h4>
                  <p className="opacity-90">Tailored legal strategies for unique cases</p>
                </div>
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                  <h4 className="font-semibold text-lg mb-2">Expert Analysis</h4>
                  <p className="opacity-90">Comprehensive case evaluation and strategy</p>
                </div>
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                  <h4 className="font-semibold text-lg mb-2">Flexible Terms</h4>
                  <p className="opacity-90">Negotiable fee structures based on case complexity</p>
                </div>
              </div>
              <div className="flex justify-center">
  <Button 
    onClick={() => setSelectedPlan('Premium Consultation')}
    variant="secondary" 
    size="lg"
    className="
      w-full sm:w-auto
      max-w-full
      bg-white text-primary
      hover:bg-white/90
      px-6
      text-center
      whitespace-normal
    "
  >
    Schedule Premium Consultation
  </Button>
</div>

            </CardContent>
          </Card>
        </div>
      </div>

      <LegalPlanPopup 
        isOpen={selectedPlan !== null}
        onClose={() => setSelectedPlan(null)}
        planName={selectedPlan || ''}
      />
    </section>
  );
};

export default PricingSection;
