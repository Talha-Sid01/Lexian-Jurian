import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Clock, Target, ArrowRight } from "lucide-react";
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

// Hardcoded inbuilt results - these 4 are always shown
const inbuiltResults: ProvenResult[] = [
  {
    id: "contract-breach-recovery",
    heading: "Contract Breach Recovery",
    subheading:
      "Successful recovery from supplier who failed to deliver critical components on schedule.",
    cardTitle1: "Recovered",
    value1: "₹56 Lakhs",
    cardTitle2: "Duration",
    value2: "8 Months",
    cardTitle3: "Success",
    value3: "95%",
    content: "{}",
  },
  {
    id: "investor-misrepresentation",
    heading: "Investor Misrepresentation",
    subheading:
      "Recovery for investors who were misled about a company's financial position prior to investment.",
    cardTitle1: "Recovered",
    value1: "₹42 Lakhs",
    cardTitle2: "Duration",
    value2: "14 Months",
    cardTitle3: "Success",
    value3: "100%",
    content: "{}",
  },
  {
    id: "ip-infringement",
    heading: "Long-Pending Token Refund Resolution",
    subheading:
      "Real Estate Booking Dispute – Lodha Group Project.",
    cardTitle1: "Recovered",
    value1: "₹45 Lakhs",
    cardTitle2: "Duration",
    value2: "3 Months",
    cardTitle3: "Success",
    value3: "98%",
    content: "{}",
  },
  {
    id: "partnership-dissolution",
    heading: "Partnership Dissolution",
    subheading:
      "Complex partnership dispute involving asset division and business valuation.",
    cardTitle1: "Recovered",
    value1: "₹18 Lakhs",
    cardTitle2: "Duration",
    value2: "13 Months",
    cardTitle3: "Success",
    value3: "Settlement",
    content: "{}",
  },
];

const ProvenResults = () => {
  const [backendResults, setBackendResults] = useState<ProvenResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzoR8djwnvKksctY5kKm9_w_D50WeP-O6wTB5NVnklC8UktMuniS3NECCqw62c3a9y8GQ/exec?type=provenResults"
      );
      const data = await response.json();
      setBackendResults(data.results || []);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ FIX: guarantee visibility of scroll-animate content
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".scroll-animate");
    els.forEach((el) => {
      el.classList.add("visible");
      el.style.opacity = "1";
      el.style.transform = "none";
    });
  }, []);

  // Combine inbuilt + backend results
  const allResults = [...inbuiltResults, ...backendResults];

  const getIcon = (title: string | undefined) => {
    if (!title) return Target;
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("recover")) return TrendingUp;
    if (lowerTitle.includes("duration") || lowerTitle.includes("time"))
      return Clock;
    return Target;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-14 md:pb-20">
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-3 md:mb-4 px-4">
            All Proven Results
          </h1>
          <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto px-4">
            Comprehensive collection of our successful case recoveries and achievements
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <p className="text-foreground/70">Loading results...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {allResults.map((result) => {
              const Icon1 = getIcon(result.cardTitle1);
              const Icon2 = getIcon(result.cardTitle2);
              const Icon3 = getIcon(result.cardTitle3);

              return (
                <Card
                  key={result.id}
                  className="glare-effect hover-lift bg-card border border-border shadow-md"
                >
                  <CardContent className="p-5 md:p-6">
                    <div className="mb-5 md:mb-6">
                      <h3 className="text-lg md:text-xl font-semibold text-primary mb-2 md:mb-3">
                        {result.heading}
                      </h3>
                      <p className="text-foreground/70 text-xs md:text-sm leading-relaxed">
                        {result.subheading}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 md:gap-3 mb-5 md:mb-6">
                      <div className="text-center p-3 md:p-4 bg-primary/5 rounded-lg">
                        <Icon1 className="mx-auto mb-1 md:mb-2 h-4 w-4 text-primary" />
                        <div className="font-bold text-primary text-sm md:text-lg">
                          {result.value1}
                        </div>
                        <div className="text-[10px] md:text-xs text-foreground/60 mt-1">
                          {result.cardTitle1}
                        </div>
                      </div>

                      <div className="text-center p-3 md:p-4 bg-accent/10 rounded-lg">
                        <Icon2 className="mx-auto mb-1 md:mb-2 h-4 w-4 text-accent" />
                        <div className="font-bold text-accent text-sm md:text-lg">
                          {result.value2}
                        </div>
                        <div className="text-[10px] md:text-xs text-foreground/60 mt-1">
                          {result.cardTitle2}
                        </div>
                      </div>

                      <div className="text-center p-3 md:p-4 bg-green-100 rounded-lg">
                        <Icon3 className="mx-auto mb-1 md:mb-2 h-4 w-4 text-green-600" />
                        <div className="font-bold text-green-600 text-sm md:text-lg">
                          {result.value3}
                        </div>
                        <div className="text-[10px] md:text-xs text-foreground/60 mt-1">
                          {result.cardTitle3}
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() =>
                        navigate(`/proven-results/${result.id}`)
                      }
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProvenResults;
