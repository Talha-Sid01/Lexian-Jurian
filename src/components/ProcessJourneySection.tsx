import { FileText, ClipboardCheck, Scale, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ProcessJourneySection = () => {
  const steps = [
    {
      number: "01",
      icon: <FileText className="h-6 w-6" />,
      title: "Submission of Case",
      description: "Submit your case details and documentation for preliminary review by our expert legal team."
    },
    {
      number: "02",
      icon: <ClipboardCheck className="h-6 w-6" />,
      title: "Jury Report Preparation",
      description: "Our panel of experts conducts comprehensive evaluation and prepares a detailed assessment report."
    },
    {
      number: "03",
      icon: <Scale className="h-6 w-6" />,
      title: "Resolution",
      description: "Strategic dispute resolution through negotiation, mediation, or litigation to achieve favorable outcomes."
    },
    {
      number: "04",
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Stay Connected",
      description: "Subscribe to receive updates on your case progress and get personalized legal insights.",
      isCta: true
    }
  ];

  const handleSubscribeClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="processjourney" className="py-14 md:py-18 bg-primary">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-14 scroll-animate">
          <Badge className="mb-3 md:mb-4 bg-white/10 text-primary-foreground border-white/20 text-xs sm:text-sm px-4 py-1">
            Our Process
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-3 md:mb-4">
            Your Funding Journey
          </h2>
          <p className="text-base md:text-lg text-primary-foreground/85 max-w-2xl mx-auto leading-relaxed">
            A transparent, step-by-step journey to provide you with the support needed to pursue justice
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-white/20" />

          <div className="space-y-6 md:space-y-10">
            {steps.map((step, index) => (
              <div key={index} className="scroll-animate">
                <div className="flex flex-col md:flex-row gap-4 md:gap-7">
                  {/* Number and Line Connector */}
                  <div className="flex md:flex-col items-center gap-4 md:gap-0">
                    <div className="relative z-10 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#00BFFF] text-[#001d51] font-bold text-lg md:text-xl shadow-md">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 md:p-7 hover:border-[#00BFFF]/50 transition-all duration-200">
                    <div className="flex items-center gap-3.5 mb-3">
                      <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-[#00BFFF]/20 text-[#00BFFF]">
                        {step.icon}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-primary-foreground">{step.title}</h3>
                    </div>
                    <p className="text-primary-foreground/75 text-sm md:text-base leading-relaxed">{step.description}</p>
                    
                    {step.isCta && (
                      <button
                        onClick={handleSubscribeClick}
                        className="mt-5 inline-flex items-center gap-2 bg-[#00BFFF] text-[#001d51] px-5 py-2.5 rounded-lg font-semibold hover:bg-[#26cbff] transition-all duration-200 text-sm md:text-base"
                      >
                        Contact Us
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Info Cards */}
        <div className="mt-10 md:mt-14 scroll-animate">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center hover:border-[#00BFFF]/50 transition-all duration-200">
              <div className="text-2xl md:text-3xl font-bold text-[#00BFFF] mb-1">1%</div>
              <p className="text-primary-foreground/80 text-xs sm:text-sm">Minimal Upfront Cost</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center hover:border-[#00BFFF]/50 transition-all duration-200">
              <div className="text-2xl md:text-3xl font-bold text-[#00BFFF] mb-1">48-72 hrs</div>
              <p className="text-primary-foreground/80 text-xs sm:text-sm">Quick Assessment</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center hover:border-[#00BFFF]/50 transition-all duration-200">
              <div className="text-2xl md:text-3xl font-bold text-[#00BFFF] mb-1">100%</div>
              <p className="text-primary-foreground/80 text-xs sm:text-sm">Full Transparency</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessJourneySection;
