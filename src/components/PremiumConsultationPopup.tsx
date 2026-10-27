import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Scale, Award } from "lucide-react";

interface PremiumConsultationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PremiumConsultationPopup = ({ isOpen, onClose }: PremiumConsultationPopupProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    claimAmount: "",
    claimAge: "",
    businessDispute: "",
    gstTransaction: "",
    supportingDocuments: "",
    transactionType: "",
    manufacturerOrTrader: "",
    priority: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here - this will be connected to Google Sheets
    console.log("Premium consultation form submitted:", { ...formData, source: "premium_consultation" });
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      <Card className="w-full max-w-2xl bg-white shadow-large border-0 animate-scale-in max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative bg-gradient-primary text-white rounded-t-lg p-4">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          
          <div className="text-center flex items-center justify-center gap-2">
            <img src="/src/assets/bluelogo.png" alt="Logo" className="h-6 w-6" />
            <div>
              <h2 className="text-lg font-bold">Lexian & Jurian</h2>
              <p className="text-xs opacity-90">Premium Legal Consultation</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold text-primary">Detailed Case Assessment</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Please provide detailed information about your case for our expert evaluation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  className="h-9"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-sm">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="h-9"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  className="h-9"
                />
              </div>
              
              <div>
                <Label htmlFor="company" className="text-sm">Company Name</Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Company name"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="h-9"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="city" className="text-sm">City *</Label>
              <Select onValueChange={handleSelectChange("city")} required>
                <SelectTrigger className="h-9">
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
              <Label htmlFor="claimAmount" className="text-sm">What is the claim amount? *</Label>
              <Select onValueChange={handleSelectChange("claimAmount")} required>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select claim amount range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="below-50k">Below ₹50,000</SelectItem>
                  <SelectItem value="50k-1lakh">₹50,000 - ₹1 Lakh</SelectItem>
                  <SelectItem value="1-3lakh">₹1 Lakh - ₹3 Lakh</SelectItem>
                  <SelectItem value="3-5lakh">₹3 Lakh - ₹5 Lakh</SelectItem>
                  <SelectItem value="5-10lakh">₹5 Lakh - ₹10 Lakh</SelectItem>
                  <SelectItem value="10-30lakh">₹10 Lakh - ₹30 Lakh</SelectItem>
                  <SelectItem value="30lakh-1cr">₹30 Lakh - ₹1 Crore</SelectItem>
                  <SelectItem value="1-3cr">₹1 Crore - ₹3 Crore</SelectItem>
                  <SelectItem value="above-3cr">Above ₹3 Crore</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="claimAge" className="text-sm">How old is your claim? (in years) *</Label>
              <Select onValueChange={handleSelectChange("claimAge")} required>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select age of claim" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less-1">Less than 1 year</SelectItem>
                  <SelectItem value="1-2">1-2 years</SelectItem>
                  <SelectItem value="2-3">2-3 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="above-5">Above 5 years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessDispute" className="text-sm">Is this a business dispute? *</Label>
                <Select onValueChange={handleSelectChange("businessDispute")} required>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="gstTransaction" className="text-sm">Transaction with or without GST? *</Label>
                <Select onValueChange={handleSelectChange("gstTransaction")} required>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="with-gst">With GST</SelectItem>
                    <SelectItem value="without-gst">Without GST</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="supportingDocuments" className="text-sm">Do you have supporting documents? (invoices, agreements, etc.) *</Label>
              <Select onValueChange={handleSelectChange("supportingDocuments")} required>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="transactionType" className="text-sm">What was the transaction? *</Label>
              <Textarea
                id="transactionType"
                name="transactionType"
                placeholder="Please describe the nature of the transaction..."
                value={formData.transactionType}
                onChange={handleInputChange}
                className="resize-none"
                rows={3}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="manufacturerOrTrader" className="text-sm">Are you a manufacturer or trader? *</Label>
                <Select onValueChange={handleSelectChange("manufacturerOrTrader")} required>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manufacturer">Manufacturer</SelectItem>
                    <SelectItem value="trader">Trader</SelectItem>
                    <SelectItem value="service-provider">Service Provider</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="priority" className="text-sm">Is this on your priority? *</Label>
                <Select onValueChange={handleSelectChange("priority")} required>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex gap-3 pt-4">
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
              >
                Schedule Premium Consultation
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PremiumConsultationPopup;