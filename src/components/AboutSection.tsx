import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Award, 
  Building, 
  Globe, 
  Users, 
  ArrowRight,
  Star
} from "lucide-react";

const AboutSection = () => {
  const achievements = [
    {
      icon: Award,
      title: "Industry Leader",
      description: "15+ years of litigation finance excellence"
    },
    {
      icon: Building,
      title: "Global Presence", 
      description: "Offices in New York, London, and Singapore"
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "50+ legal and finance professionals"
    },
    {
      icon: Globe,
      title: "International Reach",
      description: "Cases funded across 25+ countries"
    }
  ];

  return (
    <section id="about" className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
          <div className="space-y-6 scroll-animate">
            <div>
              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm px-4 py-1">
                About Lexian & Jurian
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3 md:mb-4">
                Pioneering Legal Finance Innovation
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                Founded by seasoned legal and financial experts, Lexian & Jurian has established 
                itself as the premier litigation finance firm, combining deep legal expertise with
                sophisticated financial modeling to deliver exceptional results.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Our commitment to transparency, innovation, and client success has made us the 
                trusted partner for law firms, corporations, and individuals seeking strategic 
                litigation funding solutions.
              </p>
            </div>

            <div className="flex items-center space-x-3 pt-1">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-5 w-5 text-[#00BFFF] fill-current" />
                ))}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                4.9/5 Client Satisfaction Rating
              </div>
            </div>

            <Button 
              onClick={() => window.location.href = '/our-story'}
              className="bg-primary hover:bg-primary-light text-primary-foreground text-sm font-semibold px-5 py-2.5 h-11 rounded-xl shadow-sm transition-all duration-200"
            >
              Our Story
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5 scroll-animate">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <Card key={index} className="p-5 hover-lift bg-gradient-surface border border-border shadow-soft scroll-animate rounded-xl transition-all duration-200">
                  <div className="p-2.5 bg-primary/10 rounded-xl w-fit mb-3">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-primary mb-1 text-sm md:text-base">
                    {achievement.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {achievement.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;