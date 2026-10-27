import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale, Shield, Gavel, Award } from "lucide-react";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ExpertJury = () => {
  const experts = [
    {
      name: "Justice (Retd.) Ramesh Sharma",
      title: "Retired High Court Judge",
      icon: Gavel,
      photo: "RS",
      experience: "35+ Years in Judiciary",
      quote: "Lexian & Jurian represents the gold standard in litigation finance. Their meticulous approach to case evaluation and commitment to ethical practices sets them apart. I am honored to be associated with such a principled organization that truly serves justice.",
      blessing: "May your pursuit of justice always be guided by truth and integrity."
    },
    {
      name: "IPS (Retd.) Vikram Singh",
      title: "Ex-IPS Officer & Security Consultant",
      icon: Shield,
      photo: "VS",
      experience: "30+ Years in Law Enforcement",
      quote: "In my decades of service, I have rarely witnessed such dedication to lawful resolution of disputes. Lexian & Jurian combines legal expertise with ethical standards that inspire confidence. Their work strengthens the fabric of our justice system.",
      blessing: "May your journey continue to uphold the principles of fairness and justice."
    },
    {
      name: "Adv. Suresh Menon",
      title: "Senior Advocate, Supreme Court",
      icon: Scale,
      photo: "SM",
      experience: "40+ Years in Legal Practice",
      quote: "Having practiced law for four decades, I can confidently say that Lexian & Jurian's approach to commercial dispute resolution is exemplary. Their strategic thinking and client-centric methodology deliver results while maintaining the highest professional standards.",
      blessing: "May your dedication to your clients continue to bear fruit in every case you undertake."
    },
    {
      name: "Shri (Retd.) Ajay Vasant Shirke",
      title: "Retired Income Tax Officer",
      icon: Award,
      photo: "AS",
      experience: "22+ Years in the Indian Income Tax Department",
      quote: "Lexian & Jurian's team demonstrates exceptional professionalism and integrity. Their thorough investigation methods and commitment to lawful proceedings reflect the best practices I have witnessed in my career. They are true partners in the pursuit of justice.",
      blessing: "I wish Lexian & Jurian success in their endeavour to provide responsible and transparent dispute resolution services. Commitment to due process and professional ethics will remain the foundation of long-term credibility"
    }
  ];
  // reveal scroll-animate elements on mount (fix for pages remaining invisible)
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.scroll-animate'));
    // small timeout to allow render
    setTimeout(() => els.forEach(el => el.classList.add('visible')), 50);
  }, []);

  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-14 md:pb-20">
        <div className="text-center mb-10 md:mb-12 scroll-animate">
          <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm px-4 py-1">
            Our Expert Jury
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-3 md:mb-4">
            Empanelled with Excellence
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Distinguished professionals from judiciary, law enforcement, and legal practice who guide and support our mission for justice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experts.map((expert, index) => {
            const Icon = expert.icon;
            return (
              <Card key={index} className="glare-effect hover-lift bg-card border border-border shadow-soft scroll-animate overflow-hidden">
                <CardContent className="p-0">
                  {/* Header with gradient */}
                  <div className="bg-gradient-to-r from-primary to-primary-light p-6 text-primary-foreground">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center text-2xl font-bold text-primary-foreground">
                        {expert.photo}
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-primary-foreground">{expert.name}</h3>
                        <p className="text-primary-foreground/90 text-sm md:text-base">{expert.title}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Icon className="h-4 w-4 text-[#00BFFF]" />
                          <span className="text-[#00BFFF] text-sm font-medium">{expert.experience}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quote section */}
                  <div className="p-6 space-y-4">
                    <div className="relative">
                      <span className="text-6xl text-primary/10 absolute -top-2 -left-2">"</span>
                      <p className="text-muted-foreground leading-relaxed pl-6 pt-4 italic">
                        {expert.quote}
                      </p>
                    </div>

                    {/* Blessing */}
                    <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
                      <p className="text-primary font-medium text-sm">
                        <span className="font-bold">Blessing:</span> {expert.blessing}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center scroll-animate">
          <Card className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground p-8 md:p-12 border-0">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary-foreground">Backed by Experience, Driven by Justice</h3>
            <p className="text-primary-foreground/90 max-w-2xl mx-auto">
              Our empanelled experts bring decades of combined experience from the highest levels of judiciary and law enforcement, ensuring that your case receives the guidance it deserves.
            </p>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExpertJury;
