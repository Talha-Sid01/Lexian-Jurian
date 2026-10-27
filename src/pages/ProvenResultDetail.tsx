import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Clock, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ProvenResult {
  id: string;
  heading: string;
  subheading: string;
  cardTitle1: string;
  value1: string;
  cardTitle2: string;
  value2: string;
  cardTitle3: string;
  value3: string;
  content: string;
}

// Hardcoded inbuilt results
const inbuiltResults: Record<string, ProvenResult> = {
  "contract-breach-recovery": {
    id: "contract-breach-recovery",
    heading: "Contract Breach Recovery",
    subheading: "Successful recovery from supplier who failed to deliver critical components on schedule.",
    cardTitle1: "Recovered",
    value1: "₹56 Lakhs",
    cardTitle2: "Duration",
    value2: "8 Months",
    cardTitle3: "Success",
    value3: "95%",
    content: JSON.stringify({
      sections: [
        {
          heading: "Case Overview",
          content: "Our client, a mid-sized manufacturer, faced significant losses when a key supplier consistently delivered defective components, causing production delays and contractual penalties. The breach of contract resulted in cascading effects across their supply chain."
        },
        {
          heading: "Our Approach",
          content: "We conducted a comprehensive analysis of the contract terms, documented all instances of non-performance, and quantified the financial impact on our client's business. Our team prepared a detailed case demonstrating clear breach of contract and substantial damages."
        },
        {
          heading: "Outcome",
          content: "We successfully recovered ₹56 Lakhs in damages, including lost profits and contractual penalties, through strategic negotiation and alternative dispute resolution. The settlement included compensation for both direct losses and consequential damages."
        }
      ]
    })
  },
  "investor-misrepresentation": {
    id: "investor-misrepresentation",
    heading: "Investor Misrepresentation",
    subheading: "Recovery for investors who were misled about a company's financial position prior to investment.",
    cardTitle1: "Recovered",
    value1: "₹42 Lakhs",
    cardTitle2: "Duration",
    value2: "14 Months",
    cardTitle3: "Success",
    value3: "100%",
    content: JSON.stringify({
      sections: [
        {
          heading: "Case Details",
          content: "A group of investors were misled about a technology company's financial position and market potential. The company had inflated revenue figures and concealed significant liabilities."
        },
        {
          heading: "Investigation",
          content: "Our forensic team uncovered discrepancies in financial statements and gathered evidence of intentional misrepresentation through document analysis and expert testimony."
        },
        {
          heading: "Resolution",
          content: "Through thorough investigation and expert testimony, we demonstrated intentional misrepresentation and secured full recovery of our clients' ₹42 Lakhs investment plus additional damages."
        }
      ]
    })
  },
  "ip-infringement": {
    id: "ip-infringement",
    heading: "Long-Pending Token Refund Resolution",
    subheading: "Real Estate Booking Dispute – Lodha Group Project.",
    cardTitle1: "Recovered",
    value1: "₹45 Lakhs",
    cardTitle2: "Duration",
    value2: "3 Months",
    cardTitle3: "Success",
    value3: "98%",
    content: JSON.stringify({
      sections: [
        {
          heading: "Case Snapshot",
          content: "A group of homebuyers had their booking token amounts blocked for over 12 years in relation to a real estate project developed by the Lodha Group. Despite multiple follow-ups over the years, the refunds remained unresolved, causing prolonged financial and emotional strain."
        },
        {
          heading: "Our Role",
          content: "We conducted a comprehensive case review and counterparty analysis through our internal jury team, including transaction history, contractual obligations, and settlement viability. Based on the assessment, the matter was strategically escalated by placing the opposite party on the NESL platform, creating formal financial visibility and structured pressure for resolution. Our experts coordinated negotiations and facilitated engagement with relevant stakeholders to drive a time-bound settlement process."
        },
        {
          heading: "Resolution",
          content: "The matter was resolved within three months, resulting in a ₹45 lakh recovery, with 98% of the total claim settled. The resolution closed a dispute that had remained unresolved for over a decade, allowing the clients to finally recover their blocked funds without prolonged litigation."
        }
      ]
    })
  },
  "partnership-dissolution": {
    id: "partnership-dissolution",
    heading: "Partnership Dissolution",
    subheading: "Complex partnership dispute involving asset division and business valuation.",
    cardTitle1: "Recovered",
    value1: "₹18 Lakhs",
    cardTitle2: "Duration",
    value2: "13 Months",
    cardTitle3: "Success",
    value3: "Settlement",
    content: JSON.stringify({
      sections: [
        {
          heading: "The Dispute",
          content: "Our client was involved in a complex partnership dispute with significant assets at stake. The opposing partner attempted to undervalue the business and exclude our client from key decisions."
        },
        {
          heading: "Valuation Process",
          content: "We engaged leading valuation experts and forensic accountants to establish the true value of partnership assets and uncover hidden value transfers."
        },
        {
          heading: "Settlement",
          content: "Through meticulous analysis and strategic negotiation, we secured a ₹18 Lakhs settlement that fairly divided the business assets and protected our client's interests."
        }
      ]
    })
  }
};

const ProvenResultDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState<ProvenResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchResult();
  }, [id]);
  // After content loads, reveal scroll-animate elements
  useEffect(() => {
    if (!isLoading) {
      const els = Array.from(document.querySelectorAll<HTMLElement>('.scroll-animate'));
      // slight delay to ensure DOM is ready
      setTimeout(() => els.forEach(el => el.classList.add('visible')), 50);
    }
  }, [isLoading]);

  const fetchResult = async () => {
    // First check if it's an inbuilt result
    if (id && inbuiltResults[id]) {
      setResult(inbuiltResults[id]);
      setIsLoading(false);
      return;
    }

    // Otherwise fetch from backend
    try {
      const response = await fetch(`https://script.google.com/macros/s/AKfycbzoR8djwnvKksctY5kKm9_w_D50WeP-O6wTB5NVnklC8UktMuniS3NECCqw62c3a9y8GQ/exec?type=provenResults&id=${id}`);
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error('Error fetching result:', error);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = (title: string | undefined) => {
    if (!title) return Target;
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('recover')) return TrendingUp;
    if (lowerTitle.includes('duration') || lowerTitle.includes('time')) return Clock;
    return Target;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary">
        <Header />
        <div className="container mx-auto px-6 py-24">
          <div className="text-center py-20">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-secondary">
        <Header />
        <div className="container mx-auto px-6 py-24">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-primary mb-4">Result Not Found</h2>
            <Button onClick={() => navigate('/proven-results')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Results
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const Icon1 = getIcon(result.cardTitle1);
  const Icon2 = getIcon(result.cardTitle2);
  const Icon3 = getIcon(result.cardTitle3);

  let sections: Array<{ heading: string; content: string }> = [];
  try {
    const parsed = JSON.parse(result.content);
    sections = parsed.sections || [];
  } catch (e) {
    console.error('Error parsing content:', e);
  }

  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      <div className="container mx-auto px-6 pt-10 sm:pt-12 pb-16">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/proven-results')}
          className="mb-6 text-primary hover:text-primary/80"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Results
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="mb-10 scroll-animate">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-3">
              {result.heading}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              {result.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            <Card className="bg-card border border-border rounded-xl">
              <CardContent className="p-5 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Icon1 className="h-5 w-5 text-primary" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">{result.value1}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{result.cardTitle1}</div>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border rounded-xl">
              <CardContent className="p-5 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Icon2 className="h-5 w-5 text-accent" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">{result.value2}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{result.cardTitle2}</div>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border rounded-xl">
              <CardContent className="p-5 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Icon3 className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">{result.value3}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{result.cardTitle3}</div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <Card key={index} className="scroll-animate bg-card border border-border">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">
                    {section.heading}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button 
              size="lg"
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
            >
              Get Similar Results for Your Case
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProvenResultDetail;
