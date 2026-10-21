import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GoldButton, Micro, OutlineButton } from "./ui";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[calc(100svh-96px)] items-center overflow-hidden bg-j-noir"
    >
      {/* Photographie */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src="/images/hero-necklace.jpg"
          alt="Collier en or jaune et diamant poire porté sur une peau ambrée"
          width={1536}
          height={1024}
          fetchPriority="high"
          decoding="async"
          className="aurelis-kenburns h-full w-full object-cover object-[58%_46%] lg:object-[60%_48%]"
        />
      </motion.div>

      {/* Voiles */}
      <div className="absolute inset-0 bg-gradient-to-r from-j-noir via-j-noir/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-j-noir via-transparent to-j-noir/70" />

      {/* Contenu */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pt-16 pb-24 sm:px-8 lg:py-32"
      >
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <span className="h-px w-10 bg-j-gold" />
            <Micro>Maison fondée en 1928</Micro>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 font-luxe text-[2.9rem] leading-[1.02] font-light text-j-ivory sm:text-6xl lg:text-[4.4rem]"
          >
            L'éclat de
            <br />
            <span className="italic text-j-gold-light">l'éternité</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="mt-7 max-w-md font-jost text-[13px] leading-[1.9] font-light text-j-ivory/70 sm:text-sm"
          >
            Des pierres choisies une à une, montées à la main dans notre atelier
            de la place Vendôme. Chaque pièce est unique — comme celle qui la
            portera.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <GoldButton href="#collections" className="!px-6 !text-[10px]">
              Découvrir les collections
            </GoldButton>
            <OutlineButton href="#rendez-vous" className="!px-6 !text-[10px]">
              Prendre rendez-vous
            </OutlineButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 1.1 }}
            className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3"
          >
            {["Or 18 carats", "Diamants certifiés GIA", "Atelier Paris"].map(
              (t) => (
                <span
                  key={t}
                  className="flex items-center gap-2 font-jost text-[9px] tracking-[0.28em] text-j-ivory/45 uppercase"
                >
                  <span className="h-1 w-1 rotate-45 bg-j-gold/70" />
                  {t}
                </span>
              ),
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Indicateur de défilement */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex">
        <span className="font-jost text-[8px] tracking-[0.4em] text-j-ivory/40 uppercase">
          Défiler
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-white/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-j-gold"
            animate={{ y: [-16, 48] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </div>

      {/* Mention éditoriale */}
      <div className="absolute right-8 bottom-8 hidden max-w-[190px] text-right lg:block">
        <p className="font-luxe text-sm leading-relaxed italic text-j-ivory/50">
          « La lumière n'appartient à personne. Nous la tenons un instant. »
        </p>
        <p className="mt-3 font-jost text-[8px] tracking-[0.35em] text-j-gold/70 uppercase">
          Élise Aurelis, 1962
        </p>
      </div>
    </section>
  );
}
