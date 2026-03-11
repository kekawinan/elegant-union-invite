import { motion } from "framer-motion";
import floralBorder from "@/assets/floral-border.png";
import islamicOrnament from "@/assets/islamic-ornament.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: "easeOut" as const },
  }),
};

const GoldDivider = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center gap-3 ${className}`}>
    <span className="block h-px w-14 bg-gold-light" />
    <span className="block h-1.5 w-1.5 rotate-45 bg-gold" />
    <span className="block h-px w-14 bg-gold-light" />
  </div>
);

const IslamicOrnamentDivider = ({ className = "" }: { className?: string }) => (
  <div className={`flex justify-center ${className}`}>
    <img
      src={islamicOrnament}
      alt=""
      className="h-16 w-auto opacity-60 sm:h-20"
      aria-hidden="true"
    />
  </div>
);

/* ── Section 1: Opening / Bismillah ── */
const OpeningSection = () => (
  <motion.section
    className="relative flex flex-col items-center px-6 pb-10 pt-16 text-center sm:pt-20"
    initial="hidden"
    animate="visible"
  >
    {/* Floral border as background */}
    <img
      src={floralBorder}
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
    />

    <motion.p
      className="relative z-10 font-arabic text-3xl leading-relaxed text-foreground sm:text-4xl"
      variants={fadeUp}
      custom={0}
    >
      بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
    </motion.p>

    <motion.p
      className="relative z-10 mt-2 text-base italic text-muted-foreground"
      variants={fadeUp}
      custom={1}
    >
      Bismillahirrahmanirrahim
    </motion.p>

    <motion.div className="relative z-10 my-6" variants={fadeUp} custom={2}>
      <GoldDivider />
    </motion.div>

    <motion.p
      className="relative z-10 font-arabic text-xl text-foreground sm:text-2xl"
      variants={fadeUp}
      custom={3}
    >
      اَلسَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
    </motion.p>

    <motion.p
      className="relative z-10 mt-1 text-base text-muted-foreground"
      variants={fadeUp}
      custom={4}
    >
      Assalamu'alaikum Warahmatullahi Wabarakatuh
    </motion.p>

    <motion.div className="relative z-10 my-8" variants={fadeUp} custom={5}>
      <IslamicOrnamentDivider />
    </motion.div>

    <motion.blockquote
      className="relative z-10 mx-auto max-w-lg border-l-2 border-gold-light pl-5 text-left font-serif text-base italic leading-relaxed text-muted-foreground sm:text-lg"
      variants={fadeUp}
      custom={6}
    >
      "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu
      isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa
      tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang."
      <footer className="mt-3 text-sm font-medium not-italic text-gold-dark">
        — QS. Ar-Rum: 21
      </footer>
    </motion.blockquote>
  </motion.section>
);

/* ── Section 2: Hero / Names ── */
const HeroSection = () => (
  <motion.section
    className="px-6 py-16 text-center"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    <motion.p
      className="mx-auto max-w-md text-lg leading-relaxed text-muted-foreground sm:text-xl"
      variants={fadeUp}
      custom={0}
    >
      Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud
      menyelenggarakan acara pernikahan:
    </motion.p>

    <motion.div className="my-8" variants={fadeUp} custom={1}>
      <GoldDivider />
    </motion.div>

    <motion.h1
      className="font-serif text-4xl font-semibold leading-tight tracking-wide text-foreground sm:text-5xl md:text-6xl"
      variants={fadeUp}
      custom={2}
    >
      Srie Tasriah
    </motion.h1>

    <motion.p
      className="my-4 font-serif text-2xl italic text-gold sm:text-3xl"
      variants={fadeUp}
      custom={3}
    >
      &amp;
    </motion.p>

    <motion.h1
      className="font-serif text-4xl font-semibold leading-tight tracking-wide text-foreground sm:text-5xl md:text-6xl"
      variants={fadeUp}
      custom={4}
    >
      Darmalus Leman
    </motion.h1>

    <motion.div className="mt-8" variants={fadeUp} custom={5}>
      <IslamicOrnamentDivider />
    </motion.div>
  </motion.section>
);

/* ── Section 3: Event Details ── */
const EventDetailsSection = () => (
  <motion.section
    className="mx-auto max-w-xl px-6 py-16 text-center"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    <motion.h2
      className="mb-12 font-serif text-3xl font-medium text-foreground md:text-4xl"
      variants={fadeUp}
      custom={0}
    >
      Detail Acara
    </motion.h2>

    <div className="space-y-10">
      {/* Date */}
      <motion.div className="flex flex-col items-center gap-2" variants={fadeUp} custom={1}>
        <div className="flex items-center gap-3 text-gold">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M16 2v4" />
            <path d="M8 2v4" />
            <path d="M3 10h18" />
          </svg>
          <span className="text-sm font-semibold uppercase tracking-widest text-olive-light">
            Hari &amp; Tanggal
          </span>
        </div>
        <p className="text-xl font-medium text-foreground md:text-2xl">
          Sabtu, 11 April 2026
        </p>
      </motion.div>

      <GoldDivider />

      {/* Time */}
      <motion.div className="flex flex-col items-center gap-2" variants={fadeUp} custom={2}>
        <div className="flex items-center gap-3 text-gold">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="text-sm font-semibold uppercase tracking-widest text-olive-light">
            Waktu
          </span>
        </div>
        <p className="text-xl font-medium text-foreground md:text-2xl">
          09:00 – 14:00 WIB
        </p>
      </motion.div>

      <GoldDivider />

      {/* Venue */}
      <motion.div className="flex flex-col items-center gap-2" variants={fadeUp} custom={3}>
        <div className="flex items-center gap-3 text-gold">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="text-sm font-semibold uppercase tracking-widest text-olive-light">
            Tempat
          </span>
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

/* ── Section 4: Location & Closing ── */
const ClosingSection = () => (
  <motion.section
    className="relative mx-auto max-w-xl px-6 py-16 text-center"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    <motion.div variants={fadeUp} custom={0}>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 rounded-lg border-2 border-gold bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:bg-olive hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        Buka di Google Maps
      </a>
    </motion.div>

    <motion.div className="mt-14" variants={fadeUp} custom={1}>
      <GoldDivider className="mb-8" />
      <p className="mx-auto max-w-md text-lg leading-relaxed text-muted-foreground sm:text-xl">
        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
        Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan do'a restu.
      </p>
    </motion.div>

    <motion.div className="mt-12" variants={fadeUp} custom={2}>
      <IslamicOrnamentDivider className="mb-6" />
      <p className="font-arabic text-xl text-foreground sm:text-2xl">
        وَالسَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
      </p>
      <p className="mt-1 text-base text-muted-foreground">
        Wassalamu'alaikum Warahmatullahi Wabarakatuh
      </p>
    </motion.div>
  </motion.section>
);

const Index = () => {
  return (
    <main className="mx-auto max-w-3xl overflow-hidden">
      <OpeningSection />
      <HeroSection />
      <EventDetailsSection />
      <ClosingSection />
      <footer className="pb-10 pt-4 text-center text-sm text-muted-foreground">
        <p>Dengan cinta &amp; rasa syukur</p>
      </footer>
    </main>
  );
};

export default Index;
