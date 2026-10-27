import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is a non-recourse commercial dispute resolution?",
      answer: "Non-recourse commercial dispute resolution means we cover all legal costs and expenses upfront. If we don't win your case, you owe us nothing. We only get paid a percentage of the recovered amount when we successfully resolve your dispute."
    },
    {
      question: "What types of cases do you accept?",
      answer: "We specialize in commercial disputes including contract breaches, investor disputes, partnership dissolutions, supplier conflicts, intellectual property infringements, and commercial recovery cases. Each case is evaluated on its merits and potential recovery value."
    },
    {
      question: "How much does it cost to work with you?",
      answer: "There are no upfront costs or hourly fees. We work on a contingency basis, taking a percentage of the recovered amount only if we win your case. The percentage varies based on the complexity and value of your case, typically ranging from 15% to 25%."
    },
    {
      question: "How long does the dispute resolution process take?",
      answer: "The duration varies depending on the complexity of the case and the cooperation of the opposing party. Simple cases may resolve in a few months, while complex litigation can take 1-2 years. We prioritize efficient resolution strategies to minimize disruption to your business."
    },
    {
      question: "What is your success rate?",
      answer: "Our overall success rate is 95%. We carefully evaluate each case before acceptance to ensure it has strong merits and recovery potential. This selective approach allows us to maintain our high success rate and deliver results for our clients."
    },
    {
      question: "Do you handle cases outside of India?",
      answer: "Yes, we handle international commercial disputes through our network of global legal partners. Our International Plus plan is specifically designed for cross-border cases and includes expertise in multiple jurisdictions and international arbitration."
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8 md:mb-12 scroll-animate">
          <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm px-4 py-1">
            FAQ
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3 md:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our services and process.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <Card key={index} className="mb-3 glare-effect hover-lift bg-white border border-border shadow-soft scroll-animate rounded-xl transition-all duration-200">
              <CardContent className="p-0">
                <button
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between hover:bg-primary/5 transition-colors rounded-xl"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <span className="font-semibold text-primary pr-4 text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`h-5 w-5 text-primary transition-transform flex-shrink-0 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {openFAQ === index && (
                  <div className="px-6 pb-6 animate-scale-in">
                    <div className="pt-4 border-t border-border">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;