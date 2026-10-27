import logo1 from "@/assets/logo1.jpeg";
import logo2 from "@/assets/logo2.jpeg";
import logo3 from "@/assets/logo3.jpeg";
import logo4 from "@/assets/logo4.jpeg";
import logo5 from "@/assets/logo5.jpeg";
import logo6 from "@/assets/logo6.jpeg";
import logo7 from "@/assets/logo7.jpeg";
import logo8 from "@/assets/logo8.jpeg";
import logo10 from "@/assets/logo10.jpeg";
import logo11 from "@/assets/logo11.jpeg";
import logo12 from "@/assets/logo12.jpeg";
import logo13 from "@/assets/logo13.jpeg";
import logo14 from "@/assets/logo14.jpeg";
import logo15 from "@/assets/logo15.jpeg";
import logo16 from "@/assets/logo16.jpeg";
import logo17 from "@/assets/logo17.jpeg";
import logo18 from "@/assets/logo18.jpeg";

const LogoMarquee = () => {
  // Base logos (excluding logo9 as requested)
  const baseLogos = [
    { name: "Future Fertilizer & Chemicals", img: logo1 },
    { name: "Chambal Fertilisers and Chemicals", img: logo2 },
    { name: "Woodline Laminates", img: logo3 },
    { name: "Cochin Wood", img: logo4 },
    { name: "Mascot Aluminium", img: logo5 },
    { name: "Stitchrift India", img: logo6 },
    { name: "IBL Finance", img: logo7 },
    { name: "Winston", img: logo8 },
    { name: "Mr. Kissan Ventures", img: logo10 },
    { name: "RSI Solar", img: logo11 },
    { name: "Bhavani", img: logo12 },
    { name: "Mudrika Tea", img: logo13 },
    { name: "Formerra Spaces", img: logo14 },
    { name: "Bharat 24", img: logo15 },
    { name: "Exol Lubricants", img: logo16 },
    { name: "Lotus Lubes", img: logo17 },
    { name: "Lube One", img: logo18 },
  ];

  // Logos array for seamless marquee loop
  const logos = baseLogos;

  return (
    <section className="pt-6 pb-8 md:pt-8 md:pb-10 bg-slate-50/70 border-y border-slate-200/60 overflow-hidden">
      {/* Heading */}
      <div className="container mx-auto px-6 mb-5 md:mb-6">
        <p className="text-center text-xs md:text-sm uppercase tracking-wider text-slate-500 font-semibold">
          Trusted by Leading Companies
        </p>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Gradient overlays */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10" />

        <div className="flex animate-marquee-fast md:animate-marquee hover:[animation-play-state:paused]">
          {/* First loop */}
          {logos.map((logo, index) => (
            <div
              key={`logo-1-${index}`}
              className="group flex items-center justify-center mx-3 md:mx-5 min-w-[90px] md:min-w-[120px] h-28 md:h-32 flex-shrink-0 transition-transform duration-300 sm:hover:scale-110"
            >
              <img
                src={logo.img}
                alt={logo.name}
                className="h-20 md:h-24 w-auto max-w-[180px] md:max-w-[220px] object-contain grayscale opacity-80 mix-blend-multiply transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
              />
            </div>
          ))}

          {/* Second loop for seamless animation */}
          {logos.map((logo, index) => (
            <div
              key={`logo-2-${index}`}
              className="group flex items-center justify-center mx-3 md:mx-5 min-w-[90px] md:min-w-[120px] h-28 md:h-32 flex-shrink-0 transition-transform duration-300 sm:hover:scale-110"
            >
              <img
                src={logo.img}
                alt={logo.name}
                className="h-20 md:h-24 w-auto max-w-[180px] md:max-w-[220px] object-contain grayscale opacity-80 mix-blend-multiply transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
