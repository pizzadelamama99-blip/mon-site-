import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GoldLink, Micro, Reveal } from "./ui";

/**
 * Éditorial pleine largeur « atelier » — d'après la référence Velore :
 * fond ivoire, très grande typographie qui se glisse derrière la pièce,
 * légendes techniques en petits corps, portrait en médaillon.
 *
 * La grille est explicite (12 colonnes) : plus de collage en position
 * absolue, donc aucun chevauchement possible entre le mot géant, le texte
 * et le bouton, quelle que soit la largeur d'écran.
 */
export default function Editorial() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const wordX = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);
  const ringY = useTransform(scrollYProgress, [0, 1], ["7%", "-7%"]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-j-ivory py-16 text-j-noir sm:py-20 lg:py-24"
    >
      {/* Le mot géant, derrière toute la composition */}
      <motion.p
        aria-hidden
        style={{ x: wordX }}
        className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 font-luxe text-[26vw] leading-[0.75] font-light tracking-[-0.03em] whitespace-nowrap text-j-noir/[0.09] select-none"
      >
        velora atelier
      </motion.p>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-8">
        {/* Ligne d'en-tête */}
        <div className="flex items-center justify-between border-b border-j-noir/10 pb-5">
          <Micro className="!text-j-gold-deep">L'atelier</Micro>
          <p className="font-jost text-[8.5px] tracking-[0.26em] text-j-noir/45 uppercase">
            Paris — place Vendôme
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
          {/* Manifeste */}
          <div className="order-2 flex flex-col justify-center lg:order-1 lg:col-span-4">
            <Reveal>
              <p className="font-jost text-[9px] leading-[1.9] tracking-[0.16em] text-j-noir/55 uppercase">
                Le bijou qui devient
                <br />
                une partie de votre histoire.
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-7 font-luxe text-[34px] leading-[1.05] font-light text-j-noir sm:text-[42px] lg:text-[46px]">
                L'éternité,
                <br />
                <em className="font-normal italic">en une bague.</em>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[330px] font-jost text-[11.5px] leading-[2] font-light text-j-noir/60">
                Dessinées avec précision, serties à la main sur un socle
                diamantin, les pièces Aurelis reflètent la rareté — et
                l'exceptionnel savoir-faire de nos artisans.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 flex items-center gap-6">
                <GoldLink
                  href="#creations"
                  className="!text-j-noir hover:!text-j-gold-deep"
                >
                  Explorer la collection
                </GoldLink>
              </div>
              <p className="mt-6 font-jost text-[8px] tracking-[0.26em] text-j-noir/40 uppercase">
                Aurelis / 01
              </p>
            </Reveal>
          </div>

          {/* Pièce centrale, fondue dans l'ivoire */}
          <div className="order-1 lg:order-2 lg:col-span-5">
            <motion.div style={{ y: ringY }} className="relative">
              <figure className="border border-j-noir/12 bg-white/40 p-2 sm:p-3">
                <img
                  src="/images/eternity-white.jpg"
                  alt="Alliance Éternité, diamants taille émeraude sur jonc d'or blanc"
                  loading="lazy"
                  decoding="async"
                  className="w-full mix-blend-multiply"
                />
              </figure>
              <div className="mt-4 flex items-center justify-center gap-4">
                <span className="h-px w-10 bg-j-noir/25" />
                <p className="font-jost text-[8.5px] tracking-[0.24em] text-j-noir/55 uppercase">
                  Alliance Éternité · 18 ct or blanc
                </p>
                <span className="h-px w-10 bg-j-noir/25" />
              </div>
            </motion.div>
          </div>

          {/* Portrait en médaillon */}
          <div className="order-3 lg:col-span-3 lg:pl-6">
            <motion.div style={{ y: portraitY }}>
              <Reveal y={14}>
                <img
                  src="/images/portrait-earrings.jpg"
                  alt="Portrait portant des pendantes de diamants"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/4] w-full max-w-[230px] object-cover object-[50%_35%]"
                />
                <div className="mt-3 flex max-w-[230px] items-baseline justify-between gap-3">
                  <p className="font-jost text-[8px] tracking-[0.2em] text-j-noir/50 uppercase">
                    Pendantes Lumière
                  </p>
                  <p className="font-jost text-[8px] tracking-[0.2em] text-j-noir/35 uppercase">
                    18 ct
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-10 hidden max-w-[230px] font-jost text-[10px] leading-[1.95] font-light text-j-noir/55 lg:block">
                  Un seul geste, mille heures : la pièce est portée avant
                  d'être vendue, essayée à la lumière du jour, puis ajustée
                  au dixième de millimètre.
                </p>
              </Reveal>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
