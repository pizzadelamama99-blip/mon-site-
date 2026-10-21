import { useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Canvas } from "@react-three/fiber";
import RubyRingScene from "./effects/RubyRingScene";
import ShaderBoundary from "./effects/ShaderBoundary";
import { GoldButton, Hairline, Micro, Reveal } from "./ui";
import { useIsMobile, useReducedMotion } from "../../hooks/useMediaQuery";

/**
 * Section « Rubis Impérial » — la pièce signature.
 *
 * Le défilement pilote la bague 3D :
 *  - la rotation part du profil et finit face caméra,
 *  - la bague se rapproche puis respire,
 *  - le rubis s'éclaire,
 *  - les chapitres de texte s'enchaînent à gauche.
 * Aucune interaction requise : l'animation suit le scroll (et reste
 * strictement statique si l'utilisateur préfère réduire les animations).
 */

const chapters = [
  {
    n: "01",
    title: "La pierre",
    text: "Un rubis ovale de Birmanie, non chauffé, choisi pour la profondeur de son rouge — ni trop clair, ni fermé.",
    value: "4,18 ct",
    label: "Rubis ovale non chauffé",
  },
  {
    n: "02",
    title: "Le halo",
    text: "Vingt-deux diamants taille brillant cerclent la pierre, sertis à la main sur une couronne de platine 950.",
    value: "22",
    label: "Diamants de halo · D–E / VVS",
  },
  {
    n: "03",
    title: "Les épaules",
    text: "Huit baguettes descendent le long du jonc, alignées au dixième de millimètre pour un seul trait de lumière.",
    value: "8",
    label: "Diamants baguettes calibrés",
  },
  {
    n: "04",
    title: "La main",
    text: "Monture ouverte, pavillon visible : la lumière traverse la pierre et revient. Un solitaire qui se porte comme un secret.",
    value: "6 mois",
    label: "D'atelier, sur commande",
  },
];

function RingCanvas({
  progress,
  animate,
}: {
  progress: React.MutableRefObject<number>;
  animate: boolean;
}) {
  const webglOk = useRef<boolean | null>(null);
  if (webglOk.current === null) {
    try {
      const c = document.createElement("canvas");
      webglOk.current = !!(c.getContext("webgl2") ?? c.getContext("webgl"));
    } catch {
      webglOk.current = false;
    }
  }

  if (!webglOk.current) {
    return (
      <img
        src="/images/ruby-ring.jpg"
        alt="Bague Rubis Impérial, rubis ovale entouré de diamants"
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <Canvas
      dpr={[1, 1.8]}
      shadows
      camera={{ position: [0, 0.4, 7.2], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ShaderBoundary fallback={<div className="h-full w-full bg-j-noir" />}>
        <RubyRingScene progress={progress} animate={animate} />
      </ShaderBoundary>
    </Canvas>
  );
}

export default function RubySignature() {
  const section = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start end", "end start"],
  });

  // Le scroll brut est lissé : la bague suit avec une inertie précieuse.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 26,
    mass: 0.6,
  });
  // On expose une ref lue par useFrame : aucun re-render par image.
  const progress = useRef(0);
  useMotionValueEvent(smooth, "change", (v) => {
    progress.current = v;
  });

  const wordmarkY = useTransform(smooth, [0, 1], ["28%", "-16%"]);
  const wordmarkOpacity = useTransform(smooth, [0, 0.25, 0.8, 1], [0.1, 0.22, 0.22, 0.08]);

  return (
    <section
      id="rubis"
      ref={section}
      className="relative overflow-hidden border-y border-white/8 bg-j-noir"
    >
      {/* halo rouge derrière la pièce */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(157,11,35,0.30)_0%,rgba(80,6,20,0.18)_42%,transparent_68%)] blur-2xl"
      />

      <div className="relative mx-auto max-w-[1500px] px-6 sm:px-8">
        {/* Le mot géant derrière la bague, façon « BRILLIANCE » */}
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
          <motion.p
            style={{ y: wordmarkY, opacity: wordmarkOpacity }}
            className="absolute top-[42%] left-1/2 w-full -translate-x-1/2 text-center font-luxe text-[19vw] leading-none font-light tracking-[0.06em] whitespace-nowrap text-j-ivory select-none"
          >
            BRILLANCE
          </motion.p>
        </div>

        {/* En-tête */}
        <Reveal className="relative pt-20 text-center sm:pt-24">
          <Micro>Pièce signature · 2026</Micro>
          <h2 className="mt-5 font-luxe text-4xl leading-[1.05] font-light text-j-ivory sm:text-5xl lg:text-6xl">
            Rubis
            <span className="italic text-j-gold-light"> Impérial</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md font-jost text-[12px] leading-[1.9] font-light text-j-ivory/55">
            Faites défiler : la bague tourne, la pierre s'allume. Une pièce
            unique, montée à la commande dans notre atelier.
          </p>
        </Reveal>

        {/* Scène + chapitres */}
        <div className="relative mt-2 grid items-center gap-6 pb-20 lg:mt-0 lg:grid-cols-[0.85fr_1.3fr_0.85fr] lg:gap-4 lg:pb-24">
          {/* Chapitres — colonne gauche */}
          <div className="order-2 hidden flex-col gap-8 lg:order-1 lg:flex">
            {chapters.slice(0, 2).map((c, i) => (
              <Reveal key={c.n} delay={0.06 * i} y={18}>
                <div className="border-l border-j-gold/25 pl-5">
                  <p className="font-jost text-[8.5px] tracking-[0.34em] text-j-gold/80 uppercase">
                    {c.n} — {c.title}
                  </p>
                  <p className="mt-2 font-jost text-[11.5px] leading-[1.85] font-light text-j-ivory/55">
                    {c.text}
                  </p>
                  <p className="mt-3 font-luxe text-2xl font-light text-j-ivory">
                    {c.value}
                    <span className="mt-0.5 block font-jost text-[8px] tracking-[0.26em] text-j-ivory/35 uppercase">
                      {c.label}
                    </span>
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* La bague */}
          <div className="relative order-1 lg:order-2">
            <div className="relative mx-auto aspect-square w-full max-w-[560px] lg:max-w-none">
              {/* Version mobile : le mot reste cantonné au cadre de la pièce */}
              <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden lg:hidden">
                <motion.p
                  style={{ y: wordmarkY, opacity: wordmarkOpacity }}
                  className="font-luxe text-[16vw] leading-none font-light tracking-[0.04em] whitespace-nowrap text-j-ivory select-none"
                >
                  BRILLANCE
                </motion.p>
              </div>
              <RingCanvas progress={progress} animate={!reduced} />

              {/* cotes techniques discrètes */}
              <div className="pointer-events-none absolute top-6 left-6 hidden items-center gap-2 sm:flex">
                <span className="h-px w-8 bg-j-gold/50" />
                <span className="font-jost text-[8px] tracking-[0.3em] text-j-ivory/40 uppercase">
                  Platine 950
                </span>
              </div>
              <div className="pointer-events-none absolute right-6 bottom-6 hidden items-center gap-2 sm:flex">
                <span className="font-jost text-[8px] tracking-[0.3em] text-j-ivory/40 uppercase">
                  18 × 14 mm
                </span>
                <span className="h-px w-8 bg-j-gold/50" />
              </div>
            </div>

            <div className="relative z-10 mt-2 flex flex-col items-center gap-4">
              <span className="font-jost text-[8px] tracking-[0.34em] text-j-ivory/50 uppercase">
                {isMobile ? "Défilez — la bague tourne" : "Le défilement pilote la pièce"}
              </span>
              <GoldButton href="#creations" className="!px-7 !py-3 !text-[9.5px]">
                Voir la pièce au catalogue
              </GoldButton>
            </div>
          </div>

          {/* Chapitres — colonne droite */}
          <div className="order-3 hidden flex-col gap-8 lg:flex">
            {chapters.slice(2).map((c, i) => (
              <Reveal key={c.n} delay={0.06 * i} y={18}>
                <div className="border-l border-j-gold/25 pl-5">
                  <p className="font-jost text-[8.5px] tracking-[0.34em] text-j-gold/80 uppercase">
                    {c.n} — {c.title}
                  </p>
                  <p className="mt-2 font-jost text-[11.5px] leading-[1.85] font-light text-j-ivory/55">
                    {c.text}
                  </p>
                  <p className="mt-3 font-luxe text-2xl font-light text-j-ivory">
                    {c.value}
                    <span className="mt-0.5 block font-jost text-[8px] tracking-[0.26em] text-j-ivory/35 uppercase">
                      {c.label}
                    </span>
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Chapitres empilés sur mobile / tablette */}
        <div className="grid gap-6 pb-16 sm:grid-cols-2 lg:hidden">
          {chapters.map((c, i) => (
            <Reveal key={c.n} delay={0.04 * i}>
              <div className="border-l border-j-gold/25 pl-4">
                <p className="font-jost text-[8px] tracking-[0.3em] text-j-gold/80 uppercase">
                  {c.n} — {c.title}
                </p>
                <p className="mt-2 font-jost text-[11px] leading-[1.8] font-light text-j-ivory/55">
                  {c.text}
                </p>
                <p className="mt-2 font-luxe text-xl font-light text-j-ivory">
                  {c.value}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Hairline className="mb-0" />
      </div>
    </section>
  );
}
