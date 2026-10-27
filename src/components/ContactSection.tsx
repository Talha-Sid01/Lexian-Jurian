import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  ArrowRight
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    company: "",
    disputeType: "",
    claimValue: "",
    caseDetails: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await fetch('https://script.google.com/macros/s/AKfycbzoR8djwnvKksctY5kKm9_w_D50WeP-O6wTB5NVnklC8UktMuniS3NECCqw62c3a9y8GQ/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'Contact Form',
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          city: formData.city,
          company: formData.company,
          disputeType: formData.disputeType,
          claimValue: formData.claimValue,
          caseDetails: formData.caseDetails
        })
      });
      
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you within 24 hours.",
      });
      
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        city: "",
        company: "",
        disputeType: "",
        claimValue: "",
        caseDetails: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const contactInfo = [
    {
      icon: MapPin,
      title: "Office Location",
      details: ["F-4,Palkhi Aura, Borivali East, Mumbai-400066"]
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 77150 91827"]
    },
    {
      icon: Mail,
      title: "Email",
      details: ["ceo@lexianandjurian.com", "info@lexianandjurian.com"]
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 2:00 PM"]
    }
  ];

  return (
    <section id="contact" className="py-12 md:py-16 bg-gradient-hero">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8 md:mb-12 scroll-animate">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-3 md:mb-4">
            Get Free Case Review Now
          </h2>
          <p className="text-base md:text-lg text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Ready to discuss your litigation finance needs? Our expert team is here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-6 lg:space-y-8 scroll-animate">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card key={index} className="p-6 bg-white/10 border-white/20 backdrop-blur-sm hover:border-white transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <Icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary-foreground mb-2">
                          {info.title}
                        </h3>
                        {info.details.map((detail, i) => (
                          info.title === "Email" ? (
                            <a
                              key={i}
                              href={`mailto:${detail}`}
                              className="text-primary-foreground/80 hover:text-primary-foreground text-sm block hover:underline transition-colors"
                            >
                              {detail}
                            </a>
                          ) : (
                            <p key={i} className="text-primary-foreground/80 text-sm">
                              {detail}
                            </p>
                          )
                        ))}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
            
            <Card className="p-6 bg-white/10 border-white/20 backdrop-blur-sm overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.7876!2d72.8577!3d19.2183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDEzJzA2LjAiTiA3MsKwNTEnMjcuOCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
            </Card>
          </div>

          <Card className="p-8 bg-white/95 backdrop-blur-sm scroll-animate">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Full Name *
                </label>
                <Input 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name" 
                  className="bg-white border-border focus:border-primary"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Phone Number *
                  </label>
                  <Input 
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 XXXXX XXXXX" 
                    className="bg-white border-border focus:border-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Email *
                  </label>
                  <Input 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com" 
                    className="bg-white border-border focus:border-primary"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    City *
                  </label>
                  <Select onValueChange={(value) => handleSelectChange('city', value)} required>
                    <SelectTrigger className="bg-white border-border focus:border-primary">
                      <SelectValue placeholder="Select your city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                      <SelectItem value="pune">Pune</SelectItem>
                      <SelectItem value="chennai">Chennai</SelectItem>
                      <SelectItem value="hyderabad">Hyderabad</SelectItem>
                      <SelectItem value="kolkata">Kolkata</SelectItem>
                      <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Company Name
                  </label>
                  <Input 
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your company name" 
                    className="bg-white border-border focus:border-primary"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Type of Dispute *
                  </label>
                  <Select onValueChange={(value) => handleSelectChange('disputeType', value)} required>
                    <SelectTrigger className="bg-white border-border focus:border-primary">
                      <SelectValue placeholder="Select dispute type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contract-breach">Contract Breach</SelectItem>
                      <SelectItem value="investor-dispute">Investor Dispute</SelectItem>
                      <SelectItem value="partnership-dissolution">Partnership Dissolution</SelectItem>
                      <SelectItem value="supplier-dispute">Supplier Dispute</SelectItem>
                      <SelectItem value="ip-infringement">IP Infringement</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Claim Value *
                  </label>
                  <Select onValueChange={(value) => handleSelectChange('claimValue', value)} required>
                    <SelectTrigger className="bg-white border-border focus:border-primary">
                      <SelectValue placeholder="Select claim value" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="less-than-1-lakh">Less than ₹1 Lakh</SelectItem>
                      <SelectItem value="1-to-5-lakh">₹1 to ₹5 Lakh</SelectItem>
                      <SelectItem value="5-to-10-lakh">₹5 to ₹10 Lakh</SelectItem>
                      <SelectItem value="10-to-50-lakh">₹10 to ₹50 Lakh</SelectItem>
                      <SelectItem value="50-lakh-to-1-cr">₹50 Lakh to ₹1 Cr</SelectItem>
                      <SelectItem value="1-to-3-cr">₹1 Cr to ₹3 Cr</SelectItem>
                      <SelectItem value="above-3-cr">₹3 Cr and above</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Case Details *
                </label>
                <Textarea 
                  name="caseDetails"
                  value={formData.caseDetails}
                  onChange={handleInputChange}
                  placeholder="Please provide details about your case..."
                  rows={4}
                  className="bg-white border-border focus:border-primary resize-none"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
