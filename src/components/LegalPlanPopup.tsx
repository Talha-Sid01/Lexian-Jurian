import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Scale } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import blueLogo from "@/assets/bluelogo.png";
interface LegalPlanPopupProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
}

const LegalPlanPopup = ({ isOpen, onClose, planName }: LegalPlanPopupProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    company: ""
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
          formType: 'Legal Plan',
          fullName: formData.name,
          phone: formData.phone,
          city: formData.city,
          company: formData.company,
          plan: planName
        })
      });
      
      toast({
        title: "Application Submitted!",
        description: `Thank you for choosing ${planName}. We'll contact you within 24 hours.`,
      });
      
      setFormData({
        name: "",
        phone: "",
        city: "",
        company: ""
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit. Please try again.",
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

  const handleSelectChange = (field: string) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-up">
      <Card className="w-full max-w-md bg-white shadow-large border-0 animate-scale-in">
        <CardHeader className="relative bg-gradient-primary text-white rounded-t-lg p-4">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          
          <div className="text-center">
            <div className="text-center flex items-center justify-center gap-2">
            <img src={blueLogo} alt="Logo" className="h-8 w-8" />
              <h2 className="text-lg font-bold">Lexian & Jurian</h2>
            </div>
            <p className="text-sm opacity-90">{planName}</p>
          </div>
        </CardHeader>
        
        <CardContent className="p-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm">Full Name *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="phone" className="text-sm">Phone *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="+91 XXXXX XXXXX"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="city" className="text-sm">City *</Label>
              <Select onValueChange={handleSelectChange("city")} required>
                <SelectTrigger className="mt-1">
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
              <Label htmlFor="company" className="text-sm">Company Name</Label>
              <Input
                id="company"
                name="company"
                type="text"
                placeholder="Company name (optional)"
                value={formData.company}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LegalPlanPopup;
