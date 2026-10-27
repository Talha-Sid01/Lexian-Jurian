import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Scale, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import blueLogo from "@/assets/bluelogo.png";
const WelcomePopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    city: ""
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzoR8djwnvKksctY5kKm9_w_D50WeP-O6wTB5NVnklC8UktMuniS3NECCqw62c3a9y8GQ/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'Welcome Popup',
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          company: formData.company
        })
      });
      
      toast({
        title: "Success!",
        description: "Thank you! We'll contact you soon for your free consultation.",
      });
      
      setIsVisible(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        city: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      city: value
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-up">
      <Card className="w-full max-w-md bg-white shadow-large border-0 animate-scale-in">
        <CardHeader className="relative bg-gradient-primary text-white rounded-t-lg p-4">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          
          <div className="text-center flex items-center justify-center gap-2">
            <img src={blueLogo} alt="Logo" className="h-8 w-8" />
            <div>
              <h2 className="text-lg font-bold">Lexian & Jurian</h2>
              <p className="text-xs opacity-90">Free Legal Consultation</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4">
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary">We Win When You Win</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Get expert legal advice with no upfront costs.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Label htmlFor="name" className="text-xs">Full Name *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                className="h-8 text-sm"
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="text-xs">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleInputChange}
                className="h-8 text-sm"
              />
            </div>
            
            <div>
              <Label htmlFor="phone" className="text-xs">Phone *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="+91 XXXXX XXXXX"
                value={formData.phone}
                onChange={handleInputChange}
                className="h-8 text-sm"
              />
            </div>
            
            <div>
              <Label htmlFor="city" className="text-xs">City *</Label>
              <Select onValueChange={handleSelectChange} required>
                <SelectTrigger className="h-8 text-sm">
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
              <Label htmlFor="company" className="text-xs">Company</Label>
              <Input
                id="company"
                name="company"
                type="text"
                placeholder="Company name (optional)"
                value={formData.company}
                onChange={handleInputChange}
                className="h-8 text-sm"
              />
            </div>
            
            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1 h-8 text-xs"
                disabled={isSubmitting}
              >
                Later
              </Button>
              <Button
                type="submit"
                className="flex-1 h-8 text-xs bg-gradient-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Get Consultation"}
              </Button>
            </div>
          </form>
          
          <p className="text-xs text-muted-foreground text-center mt-2">
            * Your information is secure and confidential.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomePopup;
