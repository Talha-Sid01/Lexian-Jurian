import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import ConcaveTestimonialCarousel, { TestimonialItem } from "@/components/ConcaveTestimonialCarousel";

const TestimonialsSection = () => {
  const testimonials: TestimonialItem[] = [
    {
      id: "jayeshbhai-thakkar",
      text: "Lexian & Jurian helped us recover ₹24 lakhs with only 1% upfront. Their contingency-based expertise enabled us to pursue a claim we otherwise couldn’t afford.",
      author: "Jayeshbhai Thakkar",
      position: "MD, Manufacturing Corp",
      initials: "JT",
      rating: 5,
      recoveryAmount: "₹24 Lakhs Recovered",
      caseType: "Commercial Supply Default",
      highlight: "1% Upfront Contingency",
    },
    {
      id: "sunil-mulchandani",
      text: "Their strategic handling of our investor dispute was exceptional. The team managed the entire process with professionalism, kept us informed at every stage, and secured full recovery of our investment along with damages.",
      author: "Sunil Mulchandani",
      position: "Managing Partner, VC Fund",
      initials: "SM",
      rating: 5,
      recoveryAmount: "₹42 Lakhs Recovered",
      caseType: "Investor Misrepresentation",
      highlight: "Full Recovery + Damages",
    },
    {
      id: "dineshbhai-mehta",
      text: "As a small business owner, I thought the dispute was too difficult. Lexian & Jurian handled everything and resolved it in under a year. We paid only 1% and after our win their winning percentage.",
      author: "Dineshbhai Mehta",
      position: "CEO, Retail Solutions",
      initials: "DM",
      rating: 5,
      recoveryAmount: "₹18 Lakhs Recovered",
      caseType: "Retail Partnership Dispute",
      highlight: "Resolved in 10 Months",
    },
    {
      id: "rajesh-singhania",
      text: "When our tier-1 contractor defaulted on critical component deliveries, conventional litigation looked like a multi-year cash sink. Lexian & Jurian underwrote the dispute, deployed senior litigation strategists, and secured a full recovery settlement in 8 months.",
      author: "Rajesh Singhania",
      position: "Director, Precision Engineering",
      initials: "RS",
      rating: 5,
      recoveryAmount: "₹56 Lakhs Recovered",
      caseType: "Contract Breach Recovery",
      highlight: "95% Success Settlement",
    },
    {
      id: "ananya-sharma",
      text: "Recovering a ₹45 lakh token refund from a premier developer seemed nearly impossible after two years of stalled negotiations. Lexian & Jurian's team stepped in, leveraged institutional arbitration precedents, and retrieved 98% of our capital within 90 days.",
      author: "Ananya Sharma",
      position: "Principal Investor, Real Estate Holdings",
      initials: "AS",
      rating: 5,
      recoveryAmount: "₹45 Lakhs Recovered",
      caseType: "Real Estate Booking Dispute",
      highlight: "Resolved in 90 Days",
    },
    {
      id: "vikramaditya-rao",
      text: "The risk-free litigation funding structure gave our board total confidence to enforce our rights without balance-sheet strain. They absorbed all procedural disbursements, so our executive team stayed 100% focused on core operations.",
      author: "Vikramaditya Rao",
      position: "Co-Founder, Tech Logistics India",
      initials: "VR",
      rating: 5,
      recoveryAmount: "₹38 Lakhs Recovered",
      caseType: "Commercial Arbitration",
      highlight: "Zero Risk Legal Funding",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-8 md:mb-12 scroll-animate px-4">
          <Badge className="mb-3 md:mb-4 bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm px-4 py-1">
            Client Testimonials
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3 md:mb-4">
            What Our Clients Say
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our clients say about working with us.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-5 md:mt-8">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-4 w-4 sm:h-5 sm:w-5 text-[#00BFFF] fill-[#00BFFF]"
                />
              ))}
            </div>
            <span className="text-muted-foreground text-xs sm:text-sm font-medium">
              4.9/5 Client Satisfaction Rating
            </span>
          </div>
        </div>

        {/* Custom 3D Concave Testimonials Carousel */}
        <div className="max-w-6xl mx-auto">
          <ConcaveTestimonialCarousel testimonials={testimonials} autoplayInterval={5500} />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

