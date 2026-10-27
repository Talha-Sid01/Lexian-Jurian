import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Cookie, ShieldCheck, Sliders, BarChart3, Megaphone, Lock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CookiePolicy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Cookie Policy | Lexian & Jurian";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-24 bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,191,255,0.12)_0%,transparent_60%)] pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mb-8 text-primary-foreground hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>

            <div className="max-w-4xl mx-auto text-center text-primary-foreground">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs sm:text-sm font-medium mb-4 text-[#00BFFF]">
                <Cookie className="h-4 w-4" />
                Legal Transparency & Compliance
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Cookie Policy
              </h1>
              <p className="text-base sm:text-lg text-primary-foreground/90 font-medium mb-2">
                Lexian & Jurian
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs sm:text-sm text-primary-foreground/75">
                <span><strong>Effective Date:</strong> 20 October 2026</span>
                <span className="hidden sm:inline">•</span>
                <span><strong>Last Updated:</strong> 20 October 2026</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="space-y-12 text-slate-700 leading-relaxed">
              
              {/* 1. Introduction */}
              <div className="border-b border-slate-100 pb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="text-[#00BFFF]">1.</span> Introduction
                </h2>
                <p className="mb-4">
                  Lexian & Jurian (“we,” “our,” “us,” or the “Company”) operates the website{" "}
                  <a
                    href="https://www.lexianandjurian.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00BFFF] hover:underline font-medium inline-flex items-center gap-1"
                  >
                    www.lexianandjurian.com
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>{" "}
                  (the “Website”).
                </p>
                <p className="mb-4">
                  This Cookie Policy explains how we use cookies and similar technologies when you visit our Website, interact with our services, or access information relating to our commercial dispute resolution and legal-tech solutions.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-sm text-slate-600">
                  This Policy should be read together with our{" "}
                  <Link to="/privacy-policy" className="text-[#00BFFF] font-semibold hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link to="/terms-of-service" className="text-[#00BFFF] font-semibold hover:underline">
                    Terms & Conditions
                  </Link>.
                </div>
              </div>

              {/* 2. What Are Cookies? */}
              <div className="border-b border-slate-100 pb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="text-[#00BFFF]">2.</span> What Are Cookies?
                </h2>
                <p className="mb-4">
                  Cookies are small text files stored on your computer, mobile device, or browser when you visit a website. They help websites function properly, remember user preferences, improve performance, and understand how visitors interact with online services.
                </p>
                <p>
                  We may also use similar technologies, including pixels, tags, local storage, and analytics technologies, where applicable.
                </p>
              </div>

              {/* 3. Types of Cookies We May Use */}
              <div className="border-b border-slate-100 pb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="text-[#00BFFF]">3.</span> Types of Cookies We May Use
                </h2>
                <p className="mb-6">
                  Depending on the features and technologies implemented on our Website, we may use the following categories of cookies:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Category A */}
                  <Card className="border border-slate-200 bg-white shadow-soft">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                          <Lock className="h-5 w-5 text-[#00BFFF]" />
                        </div>
                        <div>
                          <Badge variant="outline" className="text-[11px] mb-1 text-slate-500">Essential</Badge>
                          <h3 className="font-bold text-primary text-base">A. Strictly Necessary Cookies</h3>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">
                        These cookies are essential for the proper functioning, security, and accessibility of our Website. They may support session management, form submissions, security checks, and protection against unauthorised access.
                      </p>
                      <p className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        These cookies cannot generally be disabled through our Website's cookie controls without affecting essential functionality.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Category B */}
                  <Card className="border border-slate-200 bg-white shadow-soft">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                          <Sliders className="h-5 w-5 text-[#00BFFF]" />
                        </div>
                        <div>
                          <Badge variant="outline" className="text-[11px] mb-1 text-slate-500">Preferences</Badge>
                          <h3 className="font-bold text-primary text-base">B. Functional Cookies</h3>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600">
                        These cookies allow our Website to remember your preferences and settings, helping provide a consistent and convenient browsing experience.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Category C */}
                  <Card className="border border-slate-200 bg-white shadow-soft">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                          <BarChart3 className="h-5 w-5 text-[#00BFFF]" />
                        </div>
                        <div>
                          <Badge variant="outline" className="text-[11px] mb-1 text-slate-500">Optimization</Badge>
                          <h3 className="font-bold text-primary text-base">C. Analytics and Performance Cookies</h3>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">
                        These cookies, where implemented, help us understand how visitors use our Website, including which pages are visited, how users navigate the Website, and whether technical errors occur.
                      </p>
                      <p className="text-xs text-slate-500">
                        We may use this information to improve our Website's performance, content, accessibility, and user experience.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Category D */}
                  <Card className="border border-slate-200 bg-white shadow-soft">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                          <Megaphone className="h-5 w-5 text-[#00BFFF]" />
                        </div>
                        <div>
                          <Badge variant="outline" className="text-[11px] mb-1 text-slate-500">Consent Required</Badge>
                          <h3 className="font-bold text-primary text-base">D. Marketing and Advertising Cookies</h3>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">
                        If marketing or advertising technologies are implemented, these cookies may help us measure the effectiveness of campaigns, understand engagement with our content, and deliver relevant communications or advertisements.
                      </p>
                      <p className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        Non-essential marketing cookies will be used subject to applicable consent requirements.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* 4. Why Do We Use Cookies? */}
              <div className="border-b border-slate-100 pb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="text-[#00BFFF]">4.</span> Why Do We Use Cookies?
                </h2>
                <p className="mb-4">We may use cookies and similar technologies to:</p>
                <ul className="space-y-2.5 mb-6 pl-2">
                  {[
                    "Ensure the Website operates securely and efficiently.",
                    "Maintain essential website functionality.",
                    "Remember user preferences and settings.",
                    "Analyse website traffic and usage patterns.",
                    "Improve our services and digital experience.",
                    "Monitor the performance of our content and marketing campaigns, where applicable.",
                    "Detect suspicious activity and help protect our Website against misuse."
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#00BFFF] mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/15 text-sm text-primary font-medium flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-[#00BFFF] flex-shrink-0 mt-0.5" />
                  <span>
                    We do not intend to use cookies to access the contents of your personal documents, commercial agreements, or dispute-related records stored on your device.
                  </span>
                </div>
              </div>

              {/* 5. Third-Party Cookies */}
              <div className="border-b border-slate-100 pb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="text-[#00BFFF]">5.</span> Third-Party Cookies
                </h2>
                <p className="mb-4">
                  Certain third-party services integrated into our Website may place cookies or use similar technologies. These may include analytics providers, website hosting or security providers, embedded content services, and marketing platforms, depending on the integrations we use.
                </p>
                <p className="mb-4">
                  Such third parties may process information in accordance with their own privacy policies and applicable terms.
                </p>
                <p className="text-slate-600 text-sm">
                  We encourage you to review the privacy policies of relevant third-party providers. We do not control third-party cookie practices independently of the services we use.
                </p>
              </div>

              {/* 6. Your Consent and Cookie Preferences */}
              <div className="border-b border-slate-100 pb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="text-[#00BFFF]">6.</span> Your Consent and Cookie Preferences
                </h2>
                <p className="mb-4">
                  Where required by applicable law, we will seek your consent before placing or accessing non-essential cookies on your device.
                </p>
                <p className="mb-4">You may be provided with options to:</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
                    <strong className="text-primary block mb-1">Accept All</strong>
                    <span className="text-xs text-slate-600">
                      Allow all categories of cookies presented in the consent interface.
                    </span>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
                    <strong className="text-primary block mb-1">Reject Non-Essential Cookies</strong>
                    <span className="text-xs text-slate-600">
                      Decline cookies that are not necessary for the Website's operation.
                    </span>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
                    <strong className="text-primary block mb-1">Manage Preferences</strong>
                    <span className="text-xs text-slate-600">
                      Choose which optional categories of cookies you permit.
                    </span>
                  </div>
                </div>
                <p className="mb-3">
                  You may withdraw or modify your consent at any time through the cookie preference controls made available on our Website, where available.
                </p>
                <p className="text-sm text-slate-500">
                  Strictly necessary cookies may continue to operate where required to provide essential website functions.
                </p>
              </div>

              {/* 7. How to Manage or Delete Cookies */}
              <div className="border-b border-slate-100 pb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="text-[#00BFFF]">7.</span> How to Manage or Delete Cookies
                </h2>
                <p className="mb-4">
                  Most web browsers allow you to view, block, restrict, or delete cookies through their settings.
                </p>
                <p className="mb-4">
                  You can manage cookies by accessing the privacy or security settings of your browser. Please note that disabling certain cookies may affect website functionality, including the availability of some features.
                </p>
                <p className="text-sm text-slate-500">
                  Deleting cookies does not necessarily remove information already collected and retained by us or third-party service providers. Such information will be handled in accordance with our applicable privacy practices and legal obligations.
                </p>
              </div>

              {/* 8. Personal Data and Privacy */}
              <div className="border-b border-slate-100 pb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="text-[#00BFFF]">8.</span> Personal Data and Privacy
                </h2>
                <p className="mb-4">
                  Some cookies or similar technologies may collect or process information such as IP address, browser type, device information, approximate location derived from technical data, browsing activity, and interaction data.
                </p>
                <p className="mb-4">
                  Where such information constitutes personal data under applicable law, we will handle it in accordance with our Privacy Policy and applicable data protection requirements.
                </p>
                <p className="text-primary font-medium">
                  We will not knowingly use cookies in a manner that unlawfully compromises your privacy or confidentiality.
                </p>
              </div>

              {/* 9. Data Security and Retention */}
              <div className="border-b border-slate-100 pb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="text-[#00BFFF]">9.</span> Data Security and Retention
                </h2>
                <p className="mb-4">
                  Cookies may be session-based, expiring when you close your browser, or persistent, remaining on your device for a defined period or until deleted.
                </p>
                <p className="mb-4">
                  Retention periods may vary depending on the cookie's purpose and the relevant provider's configuration.
                </p>
                <p className="text-sm text-slate-600">
                  We take reasonable measures, appropriate to the circumstances, to protect information processed through our Website. However, no internet-based system can be guaranteed to be completely secure.
                </p>
              </div>

              {/* 10. Applicable Laws */}
              <div className="border-b border-slate-100 pb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="text-[#00BFFF]">10.</span> Applicable Laws
                </h2>
                <p className="mb-4">
                  This Policy is intended to operate in accordance with applicable laws and regulations in India, including relevant provisions of the Information Technology Act, 2000, applicable rules, and the Digital Personal Data Protection Act, 2023, and rules thereunder, to the extent applicable and in force.
                </p>
                <p className="text-slate-600 text-sm">
                  Where visitors access our Website from other jurisdictions, additional data protection requirements may apply depending on the circumstances.
                </p>
              </div>

              {/* 11. Changes to This Cookie Policy */}
              <div className="border-b border-slate-100 pb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="text-[#00BFFF]">11.</span> Changes to This Cookie Policy
                </h2>
                <p className="mb-4">
                  We may revise this Cookie Policy from time to time to reflect changes in our website functionality, technologies, business operations, or applicable legal requirements.
                </p>
                <p className="text-slate-600 text-sm">
                  Any revised version will be published on this page with an updated “Last Updated” date. We encourage visitors to review this Policy periodically.
                </p>
              </div>

              {/* 12. Contact Us */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="text-[#00BFFF]">12.</span> Contact Us
                </h2>
                <p className="mb-6">
                  If you have any questions, concerns, or requests regarding this Cookie Policy or our use of cookies, please contact us through the official contact details published on our Website.
                </p>

                <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-soft space-y-4">
                  <div className="border-b border-slate-200/70 pb-3">
                    <h3 className="font-bold text-lg text-primary">Lexian & Jurian</h3>
                    <p className="text-xs text-slate-500">A Smart Dispute Resolution Platform</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start gap-3">
                      <ExternalLink className="h-4 w-4 text-[#00BFFF] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs text-slate-500 block">Website</span>
                        <a
                          href="https://www.lexianandjurian.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary font-medium hover:text-[#00BFFF] transition-colors"
                        >
                          www.lexianandjurian.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="h-4 w-4 text-[#00BFFF] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs text-slate-500 block">Direct Email</span>
                        <div className="flex flex-col space-y-1">
                          <a
                            href="mailto:info@lexianandjurian.com"
                            className="text-primary font-medium hover:text-[#00BFFF] transition-colors"
                          >
                            info@lexianandjurian.com
                          </a>
                          <a
                            href="mailto:ceo@lexianandjurian.com"
                            className="text-primary font-medium hover:text-[#00BFFF] transition-colors"
                          >
                            ceo@lexianandjurian.com
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-4 w-4 text-[#00BFFF] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs text-slate-500 block">Phone</span>
                        <span className="text-primary font-medium">+91 77150 91827</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-[#00BFFF] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs text-slate-500 block">Registered Office</span>
                        <span className="text-primary font-medium">F-4, Palkhi Aura, Borivali East, Mumbai-400066</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-200/70 text-xs sm:text-sm bg-primary/5 p-3.5 rounded-xl border border-primary/10">
                    <span className="text-primary font-semibold">Privacy Request Notice: </span>
                    <span className="text-slate-600">
                      For privacy-related requests, please mention{" "}
                      <strong className="text-primary font-bold">“Cookie Policy – Privacy Enquiry”</strong> in your communication.
                    </span>
                  </div>
                </div>

                {/* Footer Acknowledgement Statement */}
                <div className="mt-10 p-5 rounded-xl bg-slate-100/70 border border-slate-200 text-xs sm:text-sm text-slate-500 italic text-center">
                  By continuing to use our Website, you acknowledge that you have had the opportunity to review this Cookie Policy. Where consent is legally required for non-essential cookies, continued browsing alone will not be treated as a substitute for obtaining that consent.
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
