import ScrollVelocity from './ScrollVelocity';

const ServicesMarquee = () => {
  return (
    <section className="py-6 md:py-8 bg-primary overflow-hidden">
      <ScrollVelocity 
        texts={[
          "Contract Disputes ✦ Investment Recovery ✦ Partnership Resolution ✦ IP Protection ✦ Commercial Litigation ✦",
          "Supplier Disputes ✦ Business Fraud ✦ Asset Recovery ✦ Legal Strategy ✦ Dispute Resolution ✦"
        ]} 
        velocity={70}
        className="text-lg sm:text-xl md:text-2xl text-white/90 font-semibold tracking-wide"
        numCopies={4}
      />
    </section>
  );
};

export default ServicesMarquee;
