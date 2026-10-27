import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale, Handshake, Zap, UserCheck } from "lucide-react";
import BlurText from "./BlurText";

const WhyChooseUsSection = () => {
  const features = [
    {
      id: "experienced-litigators",
      icon: Scale,
      title: "Experienced Litigators",
      description: "Our team includes former senior partners from top-tier firms with decades of commercial litigation experience."
    },
    {
      id: "contingency-model",
      icon: Handshake,
      title: "Contingency Model",
      description: "We align our success with yours. No upfront costs, no hourly fees—just results."
    },
    {
      id: "speedy-resolution",
      icon: Zap,
      title: "Speedy Resolution",
      description: "We prioritize efficient resolution strategies that minimize disruption to your business."
    },
    {
      id: "subject-expert-juries",
      icon: UserCheck,
      title: "Subject Expert Juries",
      description: "Every case receives direct attention from subject matter experts, not just junior associates."
    }
  ];

  return (
    <section id="our-unique-approach" className="py-12 md:py-16 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Heading & Description */}
        <div className="text-center mb-8 md:mb-12 px-4">
          <Badge className="mb-3 md:mb-4 bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm px-4 py-1">
            Why Choose Us
          </Badge>

          <div className="block">
            <BlurText
              as="h2"
              text="Our Unique Approach"
              effect="blur"
              animateBy="words"
              direction="bottom"
              staggerFrom="center"
              trigger="view"
              delay={110}
              stepDuration={0.4}
              blur={6}
              distance={24}
              className="text-3xl sm:text-4xl font-bold text-primary mb-3 md:mb-4 tracking-tight"
            />
          </div>

          <div className="max-w-2xl mx-auto">
            <BlurText
              as="p"
              text="Our unique approach sets us apart from traditional law firms. We combine expertise with innovation to deliver exceptional results."
              effect="blur"
              animateBy="words"
              direction="bottom"
              staggerFrom="start"
              trigger="view"
              delay={25}
              stepDuration={0.3}
              blur={4}
              distance={12}
              className="text-base md:text-lg text-muted-foreground leading-relaxed"
            />
          </div>
        </div>

        {/* Feature Cards Grid (Original 2-column desktop layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.id}
                className="glare-effect hover-lift bg-white border border-border shadow-soft rounded-xl transition-all duration-200 hover:border-[#00BFFF]/40 hover:shadow-md"
              >
                <CardContent className="p-6 md:p-7">
                  <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-5">
                    <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
                      <Icon className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <BlurText
                        as="h3"
                        text={feature.title}
                        effect="blur"
                        animateBy="words"
                        direction="bottom"
                        trigger="view"
                        delay={70 + index * 60}
                        stepDuration={0.35}
                        blur={5}
                        distance={18}
                        className="text-lg md:text-xl font-semibold text-primary mb-1.5 md:mb-2 block"
                      />
                      <BlurText
                        as="p"
                        text={feature.description}
                        effect="blur"
                        animateBy="words"
                        direction="bottom"
                        staggerFrom="start"
                        trigger="view"
                        delay={120 + index * 60}
                        stepDuration={0.25}
                        blur={3}
                        distance={8}
                        className="text-muted-foreground leading-relaxed text-sm md:text-base block"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;