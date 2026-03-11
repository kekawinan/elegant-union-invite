import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import islamicOrnament from "@/assets/islamic-ornament.png";

/* ── Islamic-style hexagonal corner motif (no overlap, slow rotation) ── */
const HEX_STROKE = "rgba(180, 140, 80, 0.35)";
const HEX_FILL = "rgba(180, 140, 80, 0.08)";
const ROTATION_SPEED = 0.00012; // radians per ms — slow rotation

function drawHexagon(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  rotation: number,
  lineScale: number
) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6 + rotation;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = HEX_FILL;
  ctx.fill();
  ctx.strokeStyle = HEX_STROKE;
  ctx.lineWidth = 1.5 * lineScale;
  ctx.stroke();
}

/** Organic bloom: hexagons placed by angle and distance from a soft center — no grid, no right angles. */
function getHexagonPositions(
  size: number,
  position: "top-left" | "bottom-right"
): { cx: number; cy: number; radius: number; lineScale: number }[] {
  const pad = size * 0.1;
  const scale = size * 0.44;

  // Hand-picked angles (radians) and distances — gentle arc, not 0/90°
  const layout = [
    { angle: 0.35, dist: 0.22, radius: 0.26, lineScale: 1 },
    { angle: 1.15, dist: 0.52, radius: 0.18, lineScale: 0.9 },
    { angle: 2.0, dist: 0.38, radius: 0.2, lineScale: 0.92 },
    { angle: 2.95, dist: 0.58, radius: 0.15, lineScale: 0.85 },
    { angle: 3.9, dist: 0.44, radius: 0.16, lineScale: 0.86 },
    { angle: 4.8, dist: 0.5, radius: 0.19, lineScale: 0.88 },
  ];

  if (position === "top-left") {
    const ax = pad + scale * 0.6;
    const ay = pad + scale * 0.55;
    return layout.map(({ angle, dist, radius, lineScale }) => ({
      cx: ax + scale * dist * Math.cos(angle),
      cy: ay + scale * dist * Math.sin(angle),
      radius: scale * radius,
      lineScale,
    }));
  }
  const ax = size - (pad + scale * 0.6);
  const ay = size - (pad + scale * 0.55);
  return layout.map(({ angle, dist, radius, lineScale }) => ({
    cx: ax - scale * dist * Math.cos(angle),
    cy: ay - scale * dist * Math.sin(angle),
    radius: scale * radius,
    lineScale,
  }));
}

function useHexagonCanvas(position: "top-left" | "bottom-right") {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startTimeRef = useRef<number>(Date.now());

  const draw = useRef(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
    const size = Math.min(480, Math.max(280, Math.min(window.innerWidth, window.innerHeight) * 0.5));
    const pixelSize = Math.round(size * dpr);
    const elapsed = Date.now() - startTimeRef.current;
    const rotation = (elapsed * ROTATION_SPEED) % (Math.PI * 2);
    const dir = position === "bottom-right" ? -1 : 1;
    const positions = getHexagonPositions(size, position);

    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);

    const phaseOffsets = [0, 0.9, 1.7, 2.6, 3.4, 4.2];
    positions.forEach(({ cx, cy, radius, lineScale }, i) => {
      drawHexagon(ctx, cx, cy, radius, rotation * dir + phaseOffsets[i], lineScale);
    });

    ctx.restore();
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
    const size = Math.min(480, Math.max(280, Math.min(window.innerWidth, window.innerHeight) * 0.5));
    const pixelSize = Math.round(size * dpr);
    canvas.width = pixelSize;
    canvas.height = pixelSize;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    draw.current();
  }, [position]);

  useEffect(() => {
    let rafId: number;
    const tick = () => {
      draw.current();
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [position]);

  useEffect(() => {
    const onResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      const size = Math.min(480, Math.max(280, Math.min(window.innerWidth, window.innerHeight) * 0.5));
      const pixelSize = Math.round(size * dpr);
      canvas.width = pixelSize;
      canvas.height = pixelSize;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [position]);

  return canvasRef;
}

const HexagonDecoration = () => (
  <>
    <div
      className="pointer-events-none fixed left-0 top-0 z-0"
      aria-hidden="true"
    >
      <canvas ref={useHexagonCanvas("top-left")} />
    </div>
    <div
      className="pointer-events-none fixed bottom-0 right-0 z-0"
      aria-hidden="true"
    >
      <canvas ref={useHexagonCanvas("bottom-right")} />
    </div>
  </>
);

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
        href="https://maps.app.goo.gl/mVLPq2KeCNqvzA1V7?g_st=ic"
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
    <main className="relative mx-auto max-w-3xl overflow-hidden">
      <HexagonDecoration />
      <OpeningSection />
      <br />
      <HeroSection />
      <EventDetailsSection />
      <ClosingSection />
      <footer className="pb-10 pt-4 text-center text-sm text-muted-foreground">
      </footer>
    </main>
  );
};

export default Index;
