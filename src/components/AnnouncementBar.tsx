const announcements = [
  "PID Imports India Pvt Ltd has partnered with Lexian & Jurian",
  "Medisus Pharma case of ₹60 Lakhs under resolution",
  "Shree Cement dispute successfully resolved in favor of our client",
  "Rekha Tiles onboarded for commercial recovery services",
  "Vardhan Energy signs long-term dispute advisory partnership",
  "New Delhi office expansion — now serving clients pan-India",
  "Arvind Fashions engages Lexian & Jurian for IP dispute resolution",
];

const AnnouncementBar = () => {
  const items = [...announcements, ...announcements, ...announcements];

  return (
    <div className="w-full bg-[#001d51] text-white overflow-hidden border-b border-white/10">
      <div className="relative flex overflow-hidden py-2">
        <div className="flex animate-marquee-faster whitespace-nowrap">
          {items.map((text, i) => (
            <span key={i} className="mx-8 text-xs sm:text-sm font-medium tracking-wide flex items-center">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00BFFF] mr-3" />
              {text}
            </span>
          ))}
        </div>
        <div className="flex animate-marquee-faster whitespace-nowrap" aria-hidden="true">
          {items.map((text, i) => (
            <span key={i} className="mx-8 text-xs sm:text-sm font-medium tracking-wide flex items-center">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00BFFF] mr-3" />
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
