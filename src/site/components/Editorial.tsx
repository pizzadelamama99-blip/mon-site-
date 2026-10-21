import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GoldLink, Reveal } from "./ui";

export default function Editorial() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["18px", "-18px"]);

  return (
    <section
      ref={ref}
      className="relative h-[520px] overflow-hidden bg-j-noir sm:h-[600px] lg:h-[660px]"
    >
      <motion.img
        style={{ y }}
        src="/images/editorial-mains.jpg"
        alt="Main portant trois bagues en or rose serties de diamants"
        loading="lazy"
        decoding="async"
        className="absolute -top-[6%] left-0 h-[112%] w-full object-cover object-[72%_50%] sm:object-[68%_50%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-j-noir via-j-noir/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-j-noir/80 via-transparent to-j-noir/20" />

      <div className="relative mx-auto flex h-full max-w-[1400px] items-center px-6 sm:px-8">
        <motion.div style={{ y: textY }} className="max-w-lg">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-j-gold" />
              <span className="font-jost text-[10px] tracking-[0.4em] text-j-gold uppercase">
                Métamorphoses
              </span>
            </div>
            <p className="mt-7 font-luxe text-[2.3rem] leading-[1.15] font-light text-j-ivory sm:text-5xl">
              La main est
              <br />
              <span className="italic text-j-gold-light">un paysage.</span>
            </p>
            <p className="mt-6 max-w-sm font-jost text-[12.5px] leading-[1.95] font-light text-j-ivory/60">
              Trois anneaux d'or rose, sertis de diamants épars, dessinés pour se
              porter ensemble ou séparément. Une écriture qui se réinvente à
              chaque main.
            </p>
            <div className="mt-9">
              <GoldLink href="#creations">Découvrir la collection</GoldLink>
            </div>
          </Reveal>
        </motion.div>
      </div>

      {/* légende discrète de la photographie */}
      <div className="absolute right-6 bottom-6 hidden text-right sm:right-8 sm:block">
        <p className="font-jost text-[8px] tracking-[0.32em] text-j-ivory/40 uppercase">
          Bagues Sillage — or rose 18 ct
        </p>
      </div>
    </section>
  );
}
