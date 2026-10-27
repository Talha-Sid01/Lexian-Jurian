import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Award, Users, Globe, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OurStory = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                Our Story
              </h1>
              <p className="text-base sm:text-lg md:text-xl opacity-90">
                Pioneering Legal Finance Innovation Since 2008
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">The Beginning</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Lexian & Jurian was founded in 2008 by two visionary legal professionals who recognized 
                  a critical gap in the justice system: meritorious cases were being abandoned due to 
                  lack of funding. What started as a small boutique litigation finance firm in Mumbai 
                  has grown into one of India's most trusted names in commercial dispute resolution.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our founders, seasoned attorneys with decades of combined experience, understood that 
                  justice delayed is justice denied. They set out to create a firm that would not only 
                  provide capital but also strategic guidance to maximize case outcomes.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-8 bg-primary/5 rounded-lg">
                  <Award className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-primary mb-3">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To democratize access to justice by providing strategic litigation finance 
                    solutions that empower businesses to pursue rightful claims without financial barriers.
                  </p>
                </div>
                <div className="p-8 bg-primary/5 rounded-lg">
                  <TrendingUp className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-primary mb-3">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To be the leading litigation finance firm globally, recognized for excellence, 
                    innovation, and unwavering commitment to our clients' success.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">Growth & Milestones</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-primary pl-6">
                    <h4 className="font-semibold text-lg mb-2">2008 - Foundation</h4>
                    <p className="text-muted-foreground">
                      Established in Mumbai with a vision to transform litigation finance in India.
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-6">
                    <h4 className="font-semibold text-lg mb-2">2012 - Major Expansion</h4>
                    <p className="text-muted-foreground">
                      Funded our first ₹50 crore+ case, establishing credibility in high-value disputes.
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-6">
                    <h4 className="font-semibold text-lg mb-2">2016 - International Recognition</h4>
                    <p className="text-muted-foreground">
                      Expanded services to cross-border disputes and international arbitration.
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-6">
                    <h4 className="font-semibold text-lg mb-2">2020 - Digital Transformation</h4>
                    <p className="text-muted-foreground">
                      Launched digital case assessment platform, making legal finance more accessible.
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-6">
                    <h4 className="font-semibold text-lg mb-2">2024 - Industry Leadership</h4>
                    <p className="text-muted-foreground">
                      Over ₹500 crores in successful recoveries, serving 200+ clients across industries.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">Our Values</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-surface rounded-lg">
                    <Users className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h4 className="font-semibold text-lg mb-2">Client First</h4>
                    <p className="text-sm text-muted-foreground">
                      Every decision we make prioritizes our clients' best interests and case outcomes.
                    </p>
                  </div>
                  <div className="text-center p-6 bg-gradient-surface rounded-lg">
                    <Globe className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h4 className="font-semibold text-lg mb-2">Transparency</h4>
                    <p className="text-sm text-muted-foreground">
                      Clear communication and honest assessment at every stage of engagement.
                    </p>
                  </div>
                  <div className="text-center p-6 bg-gradient-surface rounded-lg">
                    <Award className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h4 className="font-semibold text-lg mb-2">Excellence</h4>
                    <p className="text-sm text-muted-foreground">
                      Uncompromising quality in case selection, legal strategy, and execution.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-primary text-primary-foreground p-12 rounded-lg text-center">
                <h2 className="text-3xl font-bold mb-4">Join Us on Our Journey</h2>
                <p className="text-lg mb-8 opacity-90">
                  Whether you're a business facing a commercial dispute or a legal professional 
                  seeking partnership opportunities, we're here to help you succeed.
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
                  Get in Touch
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OurStory;
