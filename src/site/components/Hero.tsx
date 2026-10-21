import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { formatPrice, pieces } from "../data/catalog";
import { GoldButton, Micro, OutlineButton } from "./ui";
import { useCoffret } from "../context/CoffretContext";

/**
 * Hero d'ouverture — inspiré de la direction « BRILLIANCE » :
 * la grande typographie passe derrière la pièce, le titre est répété en
 * fantôme, la bague occupe le centre et les informations se répartissent
 * aux quatre coins du cadre.
 */

const heroRing = pieces.find((p) => p.id === "rubis-imperial") ?? pieces[1];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { add } = useCoffret();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const ringY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const wordY = useTransform(scrollYProgress, [0, 1], ["0%", "36%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[calc(100svh-92px)] items-center overflow-hidden bg-j-noir"
    >
      {/* Halo de lumière derrière la pièce */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.14)_0%,rgba(157,11,35,0.13)_40%,transparent_70%)] blur-xl"
      />

      {/* Mot géant en fantôme */}
      <motion.p
        aria-hidden
        style={{ y: wordY }}
        className="pointer-events-none absolute top-[34%] left-1/2 w-full -translate-x-1/2 text-center font-luxe text-[15.5vw] leading-none font-light tracking-[0.04em] whitespace-nowrap text-j-ivory/[0.07] select-none"
      >
        BRILLANCE
      </motion.p>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-10 px-6 pt-10 pb-16 sm:px-8 lg:grid-cols-[1fr_1.25fr] lg:gap-6 lg:pt-4 lg:pb-20"
      >
        {/* Colonne texte */}
        <div className="order-2 max-w-md lg:order-1">
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
            transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-luxe text-[2.8rem] leading-[1.02] font-light text-j-ivory sm:text-6xl lg:text-[4.1rem]"
          >
            L'art de
            <br />
            <span className="italic text-j-gold-light">la lumière</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.55 }}
            className="mt-6 font-jost text-[12.5px] leading-[1.95] font-light text-j-ivory/65 sm:text-[13.5px]"
          >
            Des pierres choisies une à une, montées à la main place Vendôme.
            Chaque pièce est unique — comme celle qui la portera.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.75 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <GoldButton href="#collections" className="!px-6 !text-[10px]">
              Découvrir les collections
            </GoldButton>
            <OutlineButton href="#rubis" className="!px-6 !text-[10px]">
              La pièce signature
            </OutlineButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 1 }}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-2.5"
          >
            {["Or 18 carats", "Diamants GIA", "Atelier Paris"].map((t) => (
              <span
                key={t}
                className="flex items-center gap-2 font-jost text-[8.5px] tracking-[0.26em] text-j-ivory/45 uppercase"
              >
                <span className="h-1 w-1 rotate-45 bg-j-gold/70" />
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* La pièce, au centre du cadre */}
        <motion.div
          style={{ y: ringY, scale: ringScale }}
          className="relative order-1 lg:order-2"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto max-w-[560px]"
          >
            <img
              src="/images/ruby-ring.jpg"
              alt="Bague Rubis Impérial : rubis ovale entouré de vingt-deux diamants, platine 950"
              width={1024}
              height={1536}
              fetchPriority="high"
              decoding="async"
              className="mx-auto w-full object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.75)]"
            />

            {/* Cartel flottant, bas-gauche */}
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="absolute bottom-4 -left-2 hidden w-[186px] border border-white/12 bg-j-noir/70 p-4 backdrop-blur-md sm:block lg:-left-10"
            >
              <p className="font-jost text-[7.5px] tracking-[0.3em] text-j-gold uppercase">
                Pièce signature
              </p>
              <p className="mt-1.5 font-luxe text-lg leading-tight text-j-ivory">
                {heroRing.name}
              </p>
              <p className="mt-2 font-jost text-[9px] leading-relaxed text-j-ivory/45">
                {heroRing.carat} · {heroRing.stones.split(",")[0]}
              </p>
              <button
                onClick={() => add(heroRing.id)}
                className="mt-3 flex items-center gap-2 border-t border-white/10 pt-2.5 font-jost text-[8px] tracking-[0.26em] text-j-ivory/70 uppercase transition-colors hover:text-j-gold"
              >
                Ajouter au coffret
                <span aria-hidden>+</span>
              </button>
            </motion.div>

            {/* Prix, bas-droite */}
            <motion.div
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.25 }}
              className="absolute right-0 bottom-8 hidden text-right sm:block lg:-right-6"
            >
              <p className="font-luxe text-2xl font-light text-j-ivory">
                {formatPrice(heroRing.price)}
              </p>
              <p className="mt-1 font-jost text-[7.5px] tracking-[0.28em] text-j-ivory/35 uppercase">
                Sur commande · 6 mois
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bandeau bas : deux blocs d'information */}
      <div className="absolute inset-x-0 bottom-0 z-10 hidden border-t border-white/8 bg-j-noir/60 backdrop-blur-sm lg:block">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-8 px-8 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-j-gold/40 font-luxe text-[11px] text-j-gold">
              1928
            </span>
            <p className="font-jost text-[8.5px] leading-relaxed tracking-[0.2em] text-j-ivory/45 uppercase">
              Meilleurs diamants du monde,
              <br />
              signés des plus grands ateliers
            </p>
          </div>

          <p className="max-w-md text-center font-luxe text-[13px] leading-relaxed text-j-ivory/55 italic">
            « Crafted to captivate — chaque pièce transforme un instant en une
            histoire. »
          </p>

          <a
            href="#rendez-vous"
            className="group flex items-center gap-3 border border-white/20 px-5 py-2.5 font-jost text-[8.5px] tracking-[0.26em] text-j-ivory uppercase transition-colors hover:border-j-gold hover:text-j-gold"
          >
            Prendre rendez-vous
            <span className="h-px w-6 bg-j-gold transition-all group-hover:w-9" />
          </a>
        </div>
      </div>

      {/* Indicateur de défilement */}
      <div className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex">
        <span className="font-jost text-[7.5px] tracking-[0.4em] text-j-ivory/35 uppercase">
          Défiler
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-white/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-3.5 bg-j-gold"
            animate={{ y: [-14, 40] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </div>
    </section>
  );
}
