import { motion } from "framer-motion";

const GoldDivider = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center gap-3 ${className}`}>
    <span className="block h-px w-12 bg-gold-light" />
    <span className="block h-1.5 w-1.5 rotate-45 bg-gold" />
    <span className="block h-px w-12 bg-gold-light" />
  </div>
);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" as const },
  }),
};

const HeroSection = () => (
  <section className="flex min-h-[85vh] flex-col items-center justify-center px-6 py-20 text-center">
    <motion.p
      className="text-lg tracking-wide text-muted-foreground md:text-xl"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={0}
    >
      With joyous hearts, we invite you to celebrate the marriage of
    </motion.p>

    <motion.div
      className="my-8"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={1}
    >
      <GoldDivider />
    </motion.div>

    <motion.h1
      className="font-serif text-4xl font-semibold leading-tight tracking-wide text-foreground sm:text-5xl md:text-6xl"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={2}
    >
      Srie Tasriah
    </motion.h1>

    <motion.p
      className="my-3 font-serif text-2xl italic text-gold sm:text-3xl"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={3}
    >
      &amp;
    </motion.p>

    <motion.h1
      className="font-serif text-4xl font-semibold leading-tight tracking-wide text-foreground sm:text-5xl md:text-6xl"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={4}
    >
      Darmalus Leman
    </motion.h1>

    <motion.div
      className="mt-8"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={5}
    >
      <GoldDivider />
    </motion.div>
  </section>
);

const EventDetailsSection = () => (
  <motion.section
    className="mx-auto max-w-xl px-6 py-16 text-center"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    <motion.h2
      className="mb-10 font-serif text-3xl font-medium text-foreground md:text-4xl"
      variants={fadeUp}
      custom={0}
    >
      Event Details
    </motion.h2>

    <div className="space-y-8">
      {/* Date */}
      <motion.div
        className="flex flex-col items-center gap-2"
        variants={fadeUp}
        custom={1}
      >
        <div className="flex items-center gap-3 text-gold">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
          <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Date</span>
        </div>
        <p className="text-xl font-medium text-foreground md:text-2xl">
          Saturday, 11 April 2026
        </p>
      </motion.div>

      <GoldDivider />

      {/* Time */}
      <motion.div
        className="flex flex-col items-center gap-2"
        variants={fadeUp}
        custom={2}
      >
        <div className="flex items-center gap-3 text-gold">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Time</span>
        </div>
        <p className="text-xl font-medium text-foreground md:text-2xl">
          09:00 – 14:00 WIB
        </p>
      </motion.div>

      <GoldDivider />

      {/* Venue */}
      <motion.div
        className="flex flex-col items-center gap-2"
        variants={fadeUp}
        custom={3}
      >
        <div className="flex items-center gap-3 text-gold">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Venue</span>
        </div>
        <p className="text-xl font-medium text-foreground md:text-2xl">
          Paradise Serpong City
        </p>
        <p className="text-base text-muted-foreground md:text-lg">
          Cluster Paradise Hill 3 Blok G 8 No 28
        </p>
      </motion.div>
    </div>
  </motion.section>
);

const LocationSection = () => (
  <motion.section
    className="mx-auto max-w-xl px-6 py-16 text-center"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    <motion.div variants={fadeUp} custom={0}>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 rounded-lg border border-gold-light bg-card px-8 py-4 text-lg font-medium text-foreground shadow-sm transition-all duration-300 hover:border-gold hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        Open in Google Maps
      </a>
    </motion.div>

    <motion.div className="mt-16" variants={fadeUp} custom={1}>
      <GoldDivider className="mb-8" />
      <p className="font-serif text-xl italic leading-relaxed text-muted-foreground md:text-2xl">
        "Your presence and blessings are the greatest gift to us."
      </p>
      <GoldDivider className="mt-8" />
    </motion.div>
  </motion.section>
);

const Index = () => {
  return (
    <main className="mx-auto max-w-3xl">
      <HeroSection />
      <EventDetailsSection />
      <LocationSection />
      <footer className="pb-10 pt-6 text-center text-sm text-muted-foreground">
        <p>With love & gratitude</p>
      </footer>
    </main>
  );
};

export default Index;
