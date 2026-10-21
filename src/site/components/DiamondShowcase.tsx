import { useRef } from "react";
import { useInView } from "framer-motion";
import DiamondScene from "./effects/DiamondScene";
import GoldLogo from "./effects/GoldLogo";
import ShaderBoundary from "./effects/ShaderBoundary";
import { stonesSpecs } from "../data/catalog";
import { Hairline, Micro, OutlineButton, Reveal } from "./ui";
import { useIsMobile, useReducedMotion } from "../../hooks/useMediaQuery";

export default function DiamondShowcase() {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const animate = !reduced;
  const holder = useRef<HTMLDivElement>(null);
  // La scène ne tourne que lorsqu'elle est visible : GPU au repos ailleurs.
  const inView = useInView(holder, { margin: "160px" });

  return (
    <section
      id="diamant"
      className="relative overflow-hidden bg-j-noir py-20 sm:py-28"
    >
      {/* halo doré derrière la pièce */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(200,162,74,0.20)_0%,rgba(58,17,25,0.16)_45%,transparent_70%)] blur-2xl"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-8">
        <Reveal className="text-center">
          <Micro>Pièce d'exception</Micro>
          <div className="mt-6 flex justify-center">
            <ShaderBoundary
              fallback={
                <span className="font-luxe text-3xl font-light tracking-[0.4em] text-j-gold-light">
                  AURELIS
                </span>
              }
            >
              <GoldLogo width={isMobile ? 230 : 320} height={isMobile ? 74 : 102} />
            </ShaderBoundary>
          </div>
          <h2 className="mx-auto mt-6 max-w-2xl font-luxe text-4xl leading-[1.1] font-light text-j-ivory sm:text-5xl lg:text-[3.6rem]">
            Le diamant,
            <span className="italic text-j-gold-light"> sculpté par la lumière</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Scène 3D */}
          <Reveal>
            <div
              ref={holder}
              className="relative aspect-square w-full overflow-hidden border border-white/10 bg-[radial-gradient(circle_at_50%_45%,#16130d_0%,#08080a_62%)]"
            >
              <ShaderBoundary
                fallback={
                  <img
                    src="/images/ring-solitaire.jpg"
                    alt="Solitaire en or jaune et diamant"
                    className="h-full w-full object-cover opacity-90"
                  />
                }
              >
                <DiamondScene animate={animate && inView} className="!h-full !w-full" />
              </ShaderBoundary>

              {/* coins dorés */}
              {[
                "top-4 left-4 border-t border-l",
                "top-4 right-4 border-t border-r",
                "bottom-4 left-4 border-b border-l",
                "right-4 bottom-4 border-b border-r",
              ].map((pos) => (
                <span
                  key={pos}
                  aria-hidden
                  className={`pointer-events-none absolute h-6 w-6 border-j-gold/40 ${pos}`}
                />
              ))}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-6 pb-5">
                <span className="font-jost text-[9px] tracking-[0.3em] text-j-ivory/45 uppercase">
                  Rendu temps réel — glisser pour tourner
                </span>
                <span className="font-jost text-[9px] tracking-[0.3em] text-j-gold/70 uppercase">
                  Or 18 ct · {`3,04 ct`}
                </span>
              </div>
            </div>
          </Reveal>

          {/* Cartel de la pièce */}
          <Reveal delay={0.15}>
            <div>
              <p className="font-jost text-[9px] tracking-[0.36em] text-j-gold uppercase">
                Bague Solitaire Auréa
              </p>
              <p className="mt-4 font-luxe text-2xl leading-relaxed font-light text-j-ivory/85 sm:text-[1.7rem]">
                « Un diamant ne s'admire pas de face. Il faut le porter à la
                lumière du soir, là où se révèlent ses feux. »
              </p>

              <Hairline className="mt-8" />

              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
                {stonesSpecs.map((s) => (
                  <div key={s.label}>
                    <dt className="font-jost text-[8px] tracking-[0.3em] text-j-ivory/40 uppercase">
                      {s.label}
                    </dt>
                    <dd className="mt-1.5 font-luxe text-lg text-j-ivory">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <Hairline className="mt-8" />

              <p className="mt-6 font-jost text-[12px] leading-[1.9] font-light text-j-ivory/55">
                Chaque diamant de la maison est accompagné de son certificat
                gemmologique et d'un entretien annuel à vie, dans l'une de nos
                trois boutiques.
              </p>

              <div className="mt-8">
                <OutlineButton href="#rendez-vous">
                  Voir cette pièce en boutique
                </OutlineButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
