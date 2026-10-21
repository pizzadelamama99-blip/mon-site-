import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { formatPrice, getProduct, productPath } from "../data";
import { useMediaQuery, useWebgl } from "../hooks";
import { LuxButton } from "./ui";

const HeroScene = lazy(() => import("../three/HeroScene"));

const fade = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, delay: 0.35 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/**
 * Hero cinématographique : la scène 3D occupe le fond, la typographie
 * se pose par-dessus. Tant que la scène n'est pas prête (ou si WebGL
 * manque), une photographie de studio prend le relais.
 */
export default function Hero() {
  const webgl = useWebgl();
  const reduced = useReducedMotion();
  const wide = useMediaQuery("(min-width: 1024px)");
  const [ready, setReady] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const t = setTimeout(() => setReady(true), 500);
    return () => {
      mounted.current = false;
      clearTimeout(t);
    };
  }, []);

  const piece = getProduct("solitaire-eclat")!;
  // Sur mobile, la scène 3D reste légère : on lui préfère une photographie
  // plein cadre, plus lisible derrière la typographie.
  const showScene = webgl === true && !reduced && wide;

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden a-satin">
      {/* Mot géant derrière la pièce */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[26%] flex justify-center overflow-hidden">
        <motion.span
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="a-ghost-word font-lux text-[26vw] sm:text-[23vw]"
        >
          ÉCLAT
        </motion.span>
      </div>

      {/* Scène 3D / photographie */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_45%,rgba(214,192,154,0.10),transparent_70%)]" />
        {showScene ? (
          <Suspense fallback={null}>
            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: ready ? 1 : 0, scale: ready ? 1 : 1.04 }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <HeroScene animate />
            </motion.div>
          </Suspense>
        ) : (
          <>
            <img
              src={piece.image}
              alt="Solitaire Éclat, diamant taille marquise serti sur un anneau d'or champagne"
              className={
                wide
                  ? "absolute inset-0 m-auto h-[66%] w-auto max-w-[86%] object-contain opacity-90"
                  : "h-full w-full object-cover object-[52%_46%] opacity-70"
              }
              style={
                wide
                  ? {
                      WebkitMaskImage:
                        "radial-gradient(ellipse 62% 58% at 50% 50%, #000 55%, transparent 82%)",
                      maskImage:
                        "radial-gradient(ellipse 62% 58% at 50% 50%, #000 55%, transparent 82%)",
                    }
                  : undefined
              }
            />
            {!wide && <div className="absolute inset-0 bg-a-obsidian/45" />}
          </>
        )}
        {/* Fondus pour asseoir la typographie */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-a-obsidian via-a-obsidian/70 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[42%] bg-gradient-to-r from-a-obsidian/85 to-transparent" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-1 flex-col justify-center px-5 pt-32 pb-24 sm:px-8 lg:pt-36">
        <div className="max-w-xl">
          <motion.p custom={0} variants={fade} initial="hidden" animate="show" className="flex items-center gap-3 font-ui text-[9px] tracking-[0.4em] text-a-champagne uppercase">
            <span aria-hidden className="h-px w-10 bg-a-champagne/70" />
            Haute joaillerie — Paris
          </motion.p>

          <motion.h1
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-7 font-lux text-[clamp(2.9rem,6.4vw,5.6rem)] leading-[0.95] font-light tracking-[-0.02em] text-a-ivory"
          >
            L'éclat de{" "}
            <br />
            <em className="font-light italic text-a-champagne">l'exceptionnel</em>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-7 max-w-md font-ui text-[12.5px] leading-[2] font-light text-a-ivory/60"
          >
            Des créations précieuses, façonnées pour traverser le temps.
            Chaque pierre est choisie une à une, chaque monture dessinée
            pour une seule main.
          </motion.p>

          <motion.div
            custom={3}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <LuxButton href="#collections" variant="solid">
              Découvrir la collection
            </LuxButton>
            <LuxButton href="#atelier">Notre savoir-faire</LuxButton>
          </motion.div>

          <motion.dl
            custom={4}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-14 flex max-w-md gap-8 border-t border-white/10 pt-6"
          >
            {[
              ["Or 18 ct", "et platine 950"],
              ["Serti main", "à Paris"],
              ["Sur mesure", "en 6 semaines"],
            ].map(([value, label]) => (
              <div key={value}>
                <dt className="font-lux text-[15px] font-light text-a-ivory">{value}</dt>
                <dd className="mt-1 font-ui text-[8px] tracking-[0.24em] text-a-ivory/40 uppercase">
                  {label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Carte flottante de la pièce du hero */}
        <motion.a
          href={productPath(piece.slug)}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="group absolute right-8 bottom-24 hidden w-[248px] border border-white/12 bg-a-obsidian/55 p-4 backdrop-blur-md transition-colors hover:border-a-champagne/50 lg:block"
        >
          <div className="flex items-center gap-3">
            <img
              src={piece.image}
              alt=""
              className="h-14 w-14 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div>
              <p className="font-ui text-[7.5px] tracking-[0.3em] text-a-champagne uppercase">
                Pièce du moment
              </p>
              <p className="mt-1 font-lux text-[17px] leading-tight text-a-ivory">{piece.name}</p>
              <p className="font-ui text-[10px] text-a-ivory/55">{formatPrice(piece.price)}</p>
            </div>
          </div>
          <p className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5 font-ui text-[8px] tracking-[0.26em] text-a-ivory/45 uppercase">
            Voir la création
            <span aria-hidden className="text-a-champagne transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </p>
        </motion.a>
      </div>

      {/* Pied de hero */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1500px] items-end justify-between px-5 pb-7 sm:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="font-ui text-[8px] tracking-[0.34em] text-a-ivory/35 uppercase"
        >
          Collection 2026
        </motion.p>
        <motion.a
          href="#collections"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="flex items-center gap-3 font-ui text-[8px] tracking-[0.34em] text-a-ivory/45 uppercase transition-colors hover:text-a-champagne"
        >
          Faites défiler
          <span aria-hidden className="relative block h-8 w-px overflow-hidden bg-white/15">
            <span className="absolute inset-x-0 top-0 h-3 animate-bounce bg-a-champagne/80" />
          </span>
        </motion.a>
      </div>
    </section>
  );
}
