import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { LuxButton, Reveal } from "./ui";

/**
 * Éditorial ivoire — contraste de rythme dans la page.
 * Le mot « DISTINGUER » traverse la composition derrière la pièce,
 * la mise en page reste volontairement asymétrique.
 */
export default function Editorial() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const wordX = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section id="editorial" ref={ref} className="relative isolate overflow-hidden bg-a-ivory py-20 text-a-obsidian sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.p
          style={reduced ? undefined : { x: wordX }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-lux text-[24vw] leading-none font-light tracking-[-0.02em] whitespace-nowrap text-a-obsidian/[0.07] select-none"
        >
          distinguer
        </motion.p>
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px] px-5 sm:px-8">
        <div className="flex items-center justify-between border-b border-a-obsidian/10 pb-5">
          <span className="font-ui text-[9px] tracking-[0.36em] text-a-gold uppercase">L'atelier</span>
          <span className="font-ui text-[8px] tracking-[0.3em] text-a-obsidian/40 uppercase">
            Paris — 2e arrondissement
          </span>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4 lg:pt-8">
            <Reveal>
              <p className="font-ui text-[9px] leading-[1.9] tracking-[0.16em] text-a-obsidian/55 uppercase">
                Un bijou qui
                <br />
                se porte, ne se
                <br />
                remarque pas.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-8 font-lux text-[clamp(2.2rem,4.2vw,3.4rem)] leading-[1.02] font-light">
                L'art de
                <br />
                <em className="italic">se distinguer.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-xs font-ui text-[11.5px] leading-[2.05] font-light text-a-obsidian/65">
                Chaque création traduit une recherche d'équilibre entre la
                matière, la lumière et la précision du geste. Rien de plus.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-9">
                <LuxButton href="#/catalogue" variant="light" className="!border !border-a-obsidian/20 !bg-transparent !text-a-obsidian hover:!bg-a-obsidian hover:!text-a-ivory">
                  Explorer la collection
                </LuxButton>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <motion.div style={reduced ? undefined : { y: photoY }}>
              <Reveal>
                <figure className="border border-a-obsidian/12 bg-white/50 p-2 sm:p-3">
                  <img
                    src="/images/alliance-baguettes.jpg"
                    alt="Alliance Éternité, diamants taille émeraude serti clos sur un jonc d'or champagne"
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </figure>
                <figcaption className="mt-3 flex items-center justify-between font-ui text-[8px] tracking-[0.26em] text-a-obsidian/50 uppercase">
                  <span>Alliance Éternité</span>
                  <span>Or champagne · 18 ct</span>
                </figcaption>
              </Reveal>
            </motion.div>
          </div>

          <div className="lg:col-span-3">
            <Reveal delay={0.1}>
              <img
                src="/images/portrait-maison.jpg"
                alt="Portrait portant des pendantes de diamants Auréléa"
                loading="lazy"
                decoding="async"
                className="aspect-[3/4] w-full max-w-[260px] object-cover object-[50%_35%]"
              />
              <p className="mt-3 max-w-[260px] font-ui text-[8px] leading-[1.9] tracking-[0.2em] text-a-obsidian/50 uppercase">
                Boucles Larme — diamants taille poire, or blanc
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-10 hidden max-w-[240px] font-ui text-[10px] leading-[1.95] font-light text-a-obsidian/60 lg:block">
                Le dessin se fait à la gouache, à l'échelle réelle. Rien ne part
                en fabrication sans avoir été porté sur papier plusieurs fois.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
