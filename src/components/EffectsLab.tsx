import { useRef } from "react";
import { motion } from "framer-motion";
import CanScene from "./effects/CanScene";
import LiquidLogo from "./effects/LiquidLogo";
import LiquidGlass, { LiquidGlassButton } from "./effects/LiquidGlass";
import Reveal from "./Reveal";
import { useIsMobile, useReducedMotion } from "../hooks/useMediaQuery";

const effects = [
  {
    n: "01",
    title: "ShaderGradient",
    text: "Gradient 3D animé en fond de hero. Réglé dans le customizer, branché en props.",
    repo: "https://github.com/ruucm/shadergradient",
    demo: "https://www.shadergradient.co/customize",
    tag: "WebGL · MIT",
  },
  {
    n: "02",
    title: "Liquid Logo",
    text: "Le wordmark FRUIZZ en métal liquide, masqué depuis un SVG et animé en temps réel.",
    repo: "https://github.com/paper-design/shaders",
    demo: "https://liquid.paper.design/",
    tag: "Shaders · MIT",
  },
  {
    n: "03",
    title: "Liquid Glass",
    text: "Verre liquide façon Apple : flou, réfraction et teinte sur les cartes et les boutons.",
    repo: "https://github.com/dashersw/liquid-glass-js",
    demo: "https://dashersw.github.io/liquid-glass-js/",
    tag: "Verre · MIT",
  },
  {
    n: "04",
    title: "React Three Fiber",
    text: "Trois canettes modélisées en primitives, étiquettes générées en canvas, scène orbitale.",
    repo: "https://github.com/pmndrs/react-three-fiber",
    demo: "https://docs.pmnd.rs/react-three-fiber",
    tag: "3D · MIT",
  },
];

export default function EffectsLab() {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const animate = !reduced;
  const scroller = useRef<HTMLDivElement>(null);

  return (
    <section
      id="labo"
      className="relative overflow-hidden bg-ink-deep py-16 text-white sm:py-24"
    >
      {/* halo de fond */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-32 h-[32rem] w-[32rem] rounded-full bg-fuchsia-soda/30 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -left-32 h-[32rem] w-[32rem] rounded-full bg-lilac-deep/40 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mb-10 text-center">
          <p className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-[0.25em] text-sun uppercase backdrop-blur">
            Apesanteur 3D
          </p>
          <div className="mx-auto mb-4 flex w-full max-w-[280px] items-center justify-center">
            <LiquidLogo width={260} height={86} colorBack="#121c7a" />
          </div>
          <h2 className="text-4xl leading-tight sm:text-5xl">
            <span className="font-display text-lime-soda drop-shadow-[3px_3px_0_rgba(232,50,143,1)]">
              Faites tourner
            </span>{" "}
            <span className="font-serifx italic">la canette</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/70 sm:text-base">
            Une scène 3D temps réel, du verre liquide et un logo en métal :
            quatre briques open source posées sur ce site. Glissez pour faire
            tourner la scène.
          </p>
        </Reveal>

        <div className="grid items-stretch gap-6 lg:grid-cols-[1.15fr_1fr]">
          {/* Scène 3D */}
          <Reveal delay={0.05}>
            <div className="relative h-[380px] overflow-hidden rounded-[2rem] border-2 border-white/15 bg-gradient-to-br from-lilac-deep/40 via-ink/40 to-fuchsia-soda/20 sm:h-[460px]">
              <CanScene animate={animate} className="!h-full !w-full" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-ink-deep/80 to-transparent px-5 pt-10 pb-4">
                <span className="text-xs font-semibold tracking-[0.2em] text-white/70 uppercase">
                  ✦ Glissez pour tourner
                </span>
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold text-lime-soda">
                  WebGL · 60 fps
                </span>
              </div>
            </div>
          </Reveal>

          {/* Cartes verre liquide + liens */}
          <Reveal delay={0.12}>
            <div className="flex h-full flex-col gap-3">
              <LiquidGlass
                className="p-5"
                tone="dark"
                blur={14}
                tintOpacity={0.3}
                edgeIntensity={0.08}
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="font-display text-lg text-white">
                    Verre liquide
                  </h3>
                  <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold tracking-wider text-lime-soda uppercase">
                    Liquid Glass
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-white/75">
                  Le même effet que sur la barre de navigation : flou 12,
                  réfraction sur les bords, teinte à 18 %. Réglages calés sur
                  les curseurs de la démo.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <LiquidGlassButton
                    onClick={() =>
                      document
                        .getElementById("boutique")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    type="pill"
                    className="!text-ink"
                  >
                    Voir la boutique
                  </LiquidGlassButton>
                  <a
                    href="https://dashersw.github.io/liquid-glass-js/"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full px-4 py-3 text-xs font-bold text-white/70 underline decoration-white/30 underline-offset-4 transition hover:text-lime-soda"
                  >
                    Démo ↗
                  </a>
                </div>
              </LiquidGlass>

              <div
                ref={scroller}
                className="grid gap-2 sm:grid-cols-2 lg:max-h-[248px] lg:overflow-y-auto lg:pr-1"
              >
                {effects.slice(0, isMobile ? 2 : 4).map((e) => (
                  <motion.a
                    key={e.title}
                    href={e.repo}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -3 }}
                    className="group rounded-2xl border border-white/12 bg-white/[0.06] p-4 backdrop-blur-sm transition hover:border-lime-soda/50 hover:bg-white/10"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-display text-sm text-lime-soda">
                        {e.n} · {e.title}
                      </span>
                      <span className="text-[10px] font-bold tracking-wide text-white/40">
                        {e.tag}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/65">
                      {e.text}
                    </p>
                    <span className="mt-2 inline-block text-[11px] font-bold text-sun opacity-70 transition group-hover:opacity-100">
                      GitHub ↗
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <p className="mt-8 text-center text-[11px] text-white/40">
          Effets open source (MIT) — ralentis automatiquement sur mobile et si
          l'utilisateur préfère réduire les animations.
        </p>
      </div>
    </section>
  );
}
