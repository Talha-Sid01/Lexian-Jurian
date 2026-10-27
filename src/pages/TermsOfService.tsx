import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
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
                Terms of Service
              </h1>
              <p className="text-sm md:text-base opacity-90">
                Last Updated: January 2025
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-primary mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground mb-6">
                By accessing or using the services provided by Lexian & Jurian, you agree to be bound 
                by these Terms of Service. If you disagree with any part of these terms, you may not 
                access our services.
              </p>

              <h2 className="text-3xl font-bold text-primary mb-4">2. Services Description</h2>
              <p className="text-muted-foreground mb-6">
                Lexian & Jurian provides litigation finance services, including funding for commercial 
                disputes, case assessment, and strategic legal consultation. Our services are subject 
                to individual agreements and are provided on a case-by-case basis.
              </p>

              <h2 className="text-3xl font-bold text-primary mb-4">3. Eligibility</h2>
              <p className="text-muted-foreground mb-4">To use our services, you must:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                <li>Be at least 18 years of age or the age of majority in your jurisdiction</li>
                <li>Have the legal capacity to enter into binding agreements</li>
                <li>Provide accurate and complete information during registration and case submission</li>
                <li>Have a legitimate legal claim or dispute requiring financial support</li>
              </ul>

              <h2 className="text-3xl font-bold text-primary mb-4">4. Case Submission and Assessment</h2>
              <p className="text-muted-foreground mb-4">
                When you submit a case for our evaluation:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                <li>You grant us permission to review all submitted documentation</li>
                <li>You warrant that all information provided is accurate and truthful</li>
                <li>You understand that case submission does not guarantee funding approval</li>
                <li>We reserve the right to reject any case at our sole discretion</li>
                <li>Assessment timelines are estimates and may vary based on case complexity</li>
              </ul>

              <h2 className="text-3xl font-bold text-primary mb-4">5. Funding Terms</h2>
              <p className="text-muted-foreground mb-4">
                If your case is approved for funding:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                <li>A separate funding agreement will be executed outlining specific terms</li>
                <li>Funding is non-recourse, meaning repayment is contingent on case success</li>
                <li>Our fee structure is based on recovered amounts as specified in the agreement</li>
                <li>You must keep us informed of all case developments and material changes</li>
                <li>Settlement decisions require our prior consent as outlined in the funding agreement</li>
              </ul>

              <h2 className="text-3xl font-bold text-primary mb-4">6. Confidentiality</h2>
              <p className="text-muted-foreground mb-6">
                All information shared during case assessment and funding remains confidential. 
                We maintain strict confidentiality standards and will not disclose your information 
                without your consent, except as required by law or our funding agreement.
              </p>

              <h2 className="text-3xl font-bold text-primary mb-4">7. No Attorney-Client Relationship</h2>
              <p className="text-muted-foreground mb-6">
                Lexian & Jurian is a litigation finance firm, not a law firm. Our services do not 
                create an attorney-client relationship. We recommend consulting with independent 
                legal counsel for legal advice regarding your case.
              </p>

              <h2 className="text-3xl font-bold text-primary mb-4">8. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-6">
                To the maximum extent permitted by law, Lexian & Jurian shall not be liable for any 
                indirect, incidental, special, consequential, or punitive damages arising from your 
                use of our services or any case outcomes.
              </p>

              <h2 className="text-3xl font-bold text-primary mb-4">9. Dispute Resolution</h2>
              <p className="text-muted-foreground mb-6">
                Any disputes arising from these Terms of Service shall be resolved through arbitration 
                in Mumbai, India, in accordance with the Arbitration and Conciliation Act, 1996. 
                The arbitration shall be conducted in English.
              </p>

              <h2 className="text-3xl font-bold text-primary mb-4">10. Governing Law</h2>
              <p className="text-muted-foreground mb-6">
                These Terms of Service shall be governed by and construed in accordance with the 
                laws of India, without regard to its conflict of law provisions.
              </p>

              <h2 className="text-3xl font-bold text-primary mb-4">11. Modifications</h2>
              <p className="text-muted-foreground mb-6">
                We reserve the right to modify these Terms of Service at any time. Material changes 
                will be notified via email or prominent notice on our website. Continued use of our 
                services after changes constitutes acceptance of the modified terms.
              </p>

              <h2 className="text-3xl font-bold text-primary mb-4">12. Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                For questions about these Terms of Service, please contact:
              </p>
              <div className="bg-primary/5 p-6 rounded-lg">
                <p className="text-muted-foreground mb-2">
                  <strong>Email:</strong>{" "}
                  <a href="mailto:info@lexianandjurian.com" className="text-primary hover:underline">info@lexianandjurian.com</a>
                  {" / "}
                  <a href="mailto:ceo@lexianandjurian.com" className="text-primary hover:underline">ceo@lexianandjurian.com</a>
                </p>
                <p className="text-muted-foreground mb-2">
                  <strong>Phone:</strong> +91 77150 91827
                </p>
                <p className="text-muted-foreground">
                  <strong>Address:</strong> F-4, Palkhi Aura, Borivali East, Mumbai-400066
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
