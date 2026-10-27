import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Lock, Plus, Trash2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    heading: "",
    subheading: "",
    cardTitle1: "",
    value1: "",
    cardTitle2: "",
    value2: "",
    cardTitle3: "",
    value3: ""
  });

  const [sections, setSections] = useState<Array<{ heading: string; content: string }>>([
    { heading: "", content: "" }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "LEXIANANDJURIANNADMIN") {
      setIsAuthenticated(true);
      toast({
        title: "Access Granted",
        description: "Welcome to admin panel",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect password",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const addSection = () => {
    setSections([...sections, { heading: "", content: "" }]);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const updateSection = (index: number, field: 'heading' | 'content', value: string) => {
    const newSections = [...sections];
    newSections[index][field] = value;
    setSections(newSections);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const content = JSON.stringify({ sections });
      
      const response = await fetch('https://script.google.com/macros/s/AKfycbzoR8djwnvKksctY5kKm9_w_D50WeP-O6wTB5NVnklC8UktMuniS3NECCqw62c3a9y8GQ/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'Proven Results',
          ...formData,
          content
        })
      });

      toast({
        title: "Success!",
        description: "Proven result added successfully",
      });

      setFormData({
        heading: "",
        subheading: "",
        cardTitle1: "",
        value1: "",
        cardTitle2: "",
        value2: "",
        cardTitle3: "",
        value3: ""
      });

      setSections([{ heading: "", content: "" }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add proven result. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <Lock className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-center text-2xl">Admin Access</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 pt-10 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">Admin Panel</h1>
            <p className="text-muted-foreground">Add new proven results to showcase on the website</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add Proven Result
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="heading">Heading *</Label>
                    <Input
                      id="heading"
                      name="heading"
                      value={formData.heading}
                      onChange={handleInputChange}
                      placeholder="e.g., Contract Breach Recovery"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="subheading">Subheading *</Label>
                    <Input
                      id="subheading"
                      name="subheading"
                      value={formData.subheading}
                      onChange={handleInputChange}
                      placeholder="Brief description"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cardTitle1">Card 1 Title *</Label>
                    <Input
                      id="cardTitle1"
                      name="cardTitle1"
                      value={formData.cardTitle1}
                      onChange={handleInputChange}
                      placeholder="e.g., Recovered"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="value1">Card 1 Value *</Label>
                    <Input
                      id="value1"
                      name="value1"
                      value={formData.value1}
                      onChange={handleInputChange}
                      placeholder="e.g., ₹18Cr"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cardTitle2">Card 2 Title *</Label>
                    <Input
                      id="cardTitle2"
                      name="cardTitle2"
                      value={formData.cardTitle2}
                      onChange={handleInputChange}
                      placeholder="e.g., Duration"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="value2">Card 2 Value *</Label>
                    <Input
                      id="value2"
                      name="value2"
                      value={formData.value2}
                      onChange={handleInputChange}
                      placeholder="e.g., 8 Months"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cardTitle3">Card 3 Title *</Label>
                    <Input
                      id="cardTitle3"
                      name="cardTitle3"
                      value={formData.cardTitle3}
                      onChange={handleInputChange}
                      placeholder="e.g., Success Rate"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="value3">Card 3 Value *</Label>
                    <Input
                      id="value3"
                      name="value3"
                      value={formData.value3}
                      onChange={handleInputChange}
                      placeholder="e.g., 95%"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-lg">Case Content Sections *</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addSection}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Section
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Add multiple sections to describe the case details (e.g., Overview, Challenge, Solution, Outcome)
                  </p>

                  {sections.map((section, index) => (
                    <Card key={index} className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-sm font-semibold">Section {index + 1}</Label>
                          {sections.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSection(index)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div>
                          <Label htmlFor={`section-heading-${index}`} className="text-sm">Section Title *</Label>
                          <Input
                            id={`section-heading-${index}`}
                            value={section.heading}
                            onChange={(e) => updateSection(index, 'heading', e.target.value)}
                            placeholder="e.g., Overview, Challenge, Solution"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor={`section-content-${index}`} className="text-sm">Section Content *</Label>
                          <Textarea
                            id={`section-content-${index}`}
                            value={section.content}
                            onChange={(e) => updateSection(index, 'content', e.target.value)}
                            placeholder="Enter the detailed content for this section..."
                            rows={4}
                            required
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? "Adding..." : "Add Proven Result"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate('/proven-results')}
                  >
                    View All Results
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
