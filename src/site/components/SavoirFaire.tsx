import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { atelierSteps } from "../data/catalog";
import { GoldLink, Micro, Reveal } from "./ui";

export default function SavoirFaire() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section
      id="maison"
      ref={ref}
      className="relative overflow-hidden border-y border-white/8 bg-j-noir-soft py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          {/* Image atelier */}
          <Reveal className="lg:sticky lg:top-28">
            <div className="relative overflow-hidden">
              <motion.img
                style={{ y }}
                src="/images/atelier.jpg"
                alt="Artisan sertissant un diamant dans un atelier parisien"
        loading="lazy"
                decoding="async"
                className="h-[420px] w-full scale-110 object-cover sm:h-[560px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-j-noir/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="font-jost text-[8px] tracking-[0.34em] text-j-gold uppercase">
                  Atelier — 12, place Vendôme
                </p>
                <p className="mt-2 font-luxe text-xl font-light text-j-ivory">
                  Trois artisans. Quatre-vingt-dix-huit ans.
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="font-jost text-[9px] tracking-[0.28em] text-j-ivory/35 uppercase">
                Sertissage à la pince
              </p>
              <p className="font-jost text-[9px] tracking-[0.28em] text-j-ivory/35 uppercase">
                Loupe binoculaire ×10
              </p>
            </div>
          </Reveal>

          {/* Texte + étapes */}
          <div>
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-j-gold" />
                <Micro>Le savoir-faire</Micro>
              </div>
              <h2 className="mt-6 font-luxe text-4xl leading-[1.08] font-light text-j-ivory sm:text-5xl">
                Quatre gestes,
                <br />
                <span className="italic text-j-gold-light">des mois de patience.</span>
              </h2>
              <p className="mt-6 max-w-md font-jost text-[13px] leading-[1.95] font-light text-j-ivory/60">
                Nous ne produisons pas de séries. Chaque pièce traverse le même
                chemin, du choix de la pierre au dernier poli — un parcours de
                quatre à sept mois, selon la complexité du serti.
              </p>
            </Reveal>

            <div className="mt-12">
              {atelierSteps.map((s, i) => (
                <Reveal key={s.n} delay={0.08 * i}>
                  <div className="group grid grid-cols-[auto_1fr] gap-6 border-t border-white/10 py-7 transition-colors hover:border-j-gold/40 sm:gap-10">
                    <span className="font-luxe text-2xl font-light text-j-gold/60 transition-colors group-hover:text-j-gold sm:text-3xl">
                      {s.n}
                    </span>
                    <div>
                      <h3 className="font-luxe text-2xl font-light text-j-ivory">
                        {s.title}
                      </h3>
                      <p className="mt-2 max-w-lg font-jost text-[12.5px] leading-[1.9] font-light text-j-ivory/55">
                        {s.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1} className="mt-10">
              <GoldLink href="#rendez-vous">
                Visiter l'atelier sur rendez-vous
              </GoldLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
