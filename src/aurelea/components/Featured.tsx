import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { formatPrice, getProduct, productPath } from "../data";
import { Eyebrow, LuxButton, Reveal } from "./ui";

/**
 * Pièce phare : le Rubis Éternité. Parallaxe verticale limitée sur la
 * photographie, texte à gauche, caractéristiques en liste fine.
 * Le fond bleu nuit est peint en dégradé pour laisser respirer la photo.
 */
export default function Featured() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.55, 0.15]);

  const piece = getProduct("rubis-eternite")!;

  return (
    <section
      id="haute-joaillerie"
      ref={ref}
      className="relative overflow-hidden border-y border-white/8 bg-[#0a0e16] py-20 sm:py-24"
    >
      {/* fond : nuit minérale + faisceau */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_70%_45%,rgba(36,58,96,0.55),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 left-[58%] h-[130%] w-[28%] rotate-[18deg] bg-gradient-to-b from-white/10 via-white/3 to-transparent blur-2xl"
      />

      <div className="relative mx-auto grid max-w-[1500px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        {/* Texte */}
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>Haute joaillerie · 2026</Eyebrow>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="mt-6 font-lux text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.98] font-light text-a-ivory">
              Le rouge
              <br />
              <em className="italic text-a-champagne">de l'éternité</em>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-md font-ui text-[12px] leading-[2.1] font-light text-a-ivory/55">
              Une pierre de caractère, révélée par l'éclat intemporel des
              diamants. Le rubis est tenu par quatre griffes écartées aux points
              cardinaux : la lumière entre, la couleur reste.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <dl className="mt-9 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-white/10 pt-7">
              {[
                ["Matière", "Platine 950"],
                ["Pierre centrale", "Rubis ovale 4,18 ct"],
                ["Sertissage", "Halo clos, 22 brillants"],
                ["Tailles", "48 à 58"],
              ].map(([term, value]) => (
                <div key={term}>
                  <dt className="font-ui text-[8px] tracking-[0.3em] text-a-ivory/35 uppercase">{term}</dt>
                  <dd className="mt-1.5 font-lux text-[16px] font-light text-a-ivory">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <p className="font-lux text-2xl font-light text-a-ivory">{formatPrice(piece.price)}</p>
              <LuxButton href={productPath(piece.slug)} variant="solid">
                Découvrir cette création
              </LuxButton>
            </div>
            <p className="mt-4 font-ui text-[8.5px] tracking-[0.22em] text-a-ivory/35 uppercase">
              {piece.available
                ? "Pièce disponible — expédition sous 48 h"
                : "Pièce sur commande — 6 semaines d'atelier"}
            </p>
          </Reveal>
        </div>

        {/* Photographie */}
        <div className="lg:col-span-7">
          <motion.div style={reduced ? undefined : { y }} className="relative">
            <motion.div
              aria-hidden
              style={reduced ? undefined : { opacity: glow }}
              className="pointer-events-none absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(163,16,42,0.55),transparent_65%)] blur-3xl"
            />
            <img
              src={piece.image}
              alt="Rubis Éternité : rubis ovale entouré d'un halo de diamants sur un anneau de platine"
              loading="lazy"
              decoding="async"
              className="relative w-full object-contain drop-shadow-[0_50px_80px_rgba(0,0,0,0.65)]"
            />
            <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-3">
              <span className="font-ui text-[8px] tracking-[0.3em] text-a-ivory/40 uppercase">
                AE-RUB-001
              </span>
              <span className="font-ui text-[8px] tracking-[0.3em] text-a-ivory/40 uppercase">
                Rubis non chauffé
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
