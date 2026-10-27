import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
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
                Privacy Policy
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
              <h2 className="text-3xl font-bold text-primary mb-4">1. Introduction</h2>
              <p className="text-muted-foreground mb-6">
                Lexian & Jurian ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                information when you visit our website or use our services.
              </p>

              <h2 className="text-3xl font-bold text-primary mb-4">2. Information We Collect</h2>
              <p className="text-muted-foreground mb-4">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                <li>Name, email address, phone number, and company information</li>
                <li>Case details and legal documentation you submit for assessment</li>
                <li>Communication preferences and correspondence with our team</li>
                <li>Payment and billing information for funded cases</li>
              </ul>

              <h2 className="text-3xl font-bold text-primary mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                <li>Evaluate your case and provide litigation finance services</li>
                <li>Communicate with you about our services and your inquiries</li>
                <li>Process payments and maintain accurate financial records</li>
                <li>Improve our services and website functionality</li>
                <li>Comply with legal obligations and protect our legal rights</li>
              </ul>

              <h2 className="text-3xl font-bold text-primary mb-4">4. Information Sharing and Disclosure</h2>
              <p className="text-muted-foreground mb-4">
                We do not sell or rent your personal information. We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                <li>Legal professionals and experts involved in case assessment</li>
                <li>Service providers who assist in our business operations</li>
                <li>Law enforcement or regulatory bodies when required by law</li>
              </ul>

              <h2 className="text-3xl font-bold text-primary mb-4">5. Data Security</h2>
              <p className="text-muted-foreground mb-6">
                We implement appropriate technical and organizational measures to protect your 
                personal information against unauthorized access, alteration, disclosure, or destruction. 
                However, no internet transmission is completely secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="text-3xl font-bold text-primary mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                <li>Access, correct, or delete your personal information</li>
                <li>Object to or restrict certain processing of your data</li>
                <li>Request a copy of your data in a portable format</li>
                <li>Withdraw consent where processing is based on consent</li>
              </ul>

              <h2 className="text-3xl font-bold text-primary mb-4">7. Cookies and Tracking</h2>
              <p className="text-muted-foreground mb-6">
                We use cookies and similar tracking technologies to enhance your experience on our website. 
                You can control cookie preferences through your browser settings.
              </p>

              <h2 className="text-3xl font-bold text-primary mb-4">8. Changes to This Policy</h2>
              <p className="text-muted-foreground mb-6">
                We may update this Privacy Policy from time to time. We will notify you of any 
                material changes by posting the new policy on our website with an updated effective date.
              </p>

              <h2 className="text-3xl font-bold text-primary mb-4">9. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have questions or concerns about this Privacy Policy, please contact us at:
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

export default PrivacyPolicy;
