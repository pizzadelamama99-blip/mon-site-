import { motion } from "framer-motion";
import ShaderBackground from "./effects/ShaderBackground";
import { LiquidGlassButton } from "./effects/LiquidGlass";
import { useIsMobile, useReducedMotion } from "../hooks/useMediaQuery";

export default function Hero() {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  // Perf : un seul canvas WebGL visible, pas sur mobile ni si animations réduites
  const showShader = !isMobile && !reduced;

  return (
    <section id="top" className="relative overflow-hidden bg-lime-soda">
      {/* Effet 1 — ShaderGradient en fond */}
      {showShader ? (
        <ShaderBackground />
      ) : (
        <>
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(120%_90%_at_12%_8%,#e8328f_0%,transparent_42%),radial-gradient(100%_80%_at_92%_18%,#ffc93c_0%,transparent_48%),linear-gradient(160deg,#b9e26a_0%,#c9a7f0_55%,#a8d95c_100%)] opacity-80"
          />
          {/* Voile de lisibilité quand WebGL n'est pas disponible */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-lime-soda/85 via-lime-soda/55 to-transparent"
          />
        </>
      )}

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-8 px-4 pt-10 pb-16 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-4 lg:pt-16 lg:pb-24">
        {/* Texte */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center lg:text-left"
        >
          <p className="mb-4 inline-block rotate-[-2deg] rounded-full bg-fuchsia-soda px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-white uppercase shadow-[3px_3px_0_rgba(27,42,181,1)]">
            Soda pétillant aux fruits
          </p>
          <h1 className="text-5xl leading-[0.95] text-ink sm:text-6xl lg:text-7xl">
            <span className="font-serifx italic">La bulle</span>{" "}
            <span className="font-display text-fuchsia-soda drop-shadow-[3px_3px_0_rgba(27,42,181,1)]">
              qui fait
            </span>
            <br />
            <span className="font-display text-orange-soda drop-shadow-[3px_3px_0_rgba(27,42,181,1)]">
              flotter
            </span>{" "}
            <span className="font-serifx italic">les fruits</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base font-medium text-ink-deep/80 sm:text-lg lg:mx-0">
            Trois saveurs surréalistes, de vrais fruits, des bulles fines et
            zéro ennui. Bienvenue dans l'apesanteur FRUIZZ.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a
              href="#boutique"
              className="rounded-full bg-ink px-7 py-3.5 font-display text-lg tracking-wide text-lime-soda shadow-[4px_4px_0_rgba(232,50,143,1)] transition hover:-translate-y-1 hover:shadow-[6px_8px_0_rgba(232,50,143,1)]"
            >
              Commander
            </a>
            {/* Effet 3 — bouton en verre liquide */}
            <LiquidGlassButton
              onClick={() =>
                document
                  .getElementById("saveurs")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              type="pill"
              blur={12}
              tintOpacity={0.3}
              className="!px-7 !py-3.5 !text-base"
            >
              Découvrir les saveurs
            </LiquidGlassButton>
          </div>
        </motion.div>

        {/* Visuel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="animate-floaty overflow-hidden rounded-[2.5rem] border-4 border-ink shadow-[10px_12px_0_rgba(27,42,181,0.9)]">
            <img
              src="/images/hero.jpg"
              alt="Canettes FRUIZZ flottant parmi des fruits surréalistes"
              className="h-full w-full object-cover"
            />
          </div>
          {/* Stickers */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: -12 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
            className="absolute -top-5 -left-4 rounded-full bg-sun px-4 py-3 font-display text-sm text-ink shadow-[3px_3px_0_rgba(27,42,181,1)] sm:text-base"
          >
            100% pop !
          </motion.div>
          <motion.div
            initial={{ scale: 0, rotate: 30 }}
            animate={{ scale: 1, rotate: 8 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
            className="absolute -right-3 -bottom-5 rounded-full bg-fuchsia-soda px-4 py-3 font-display text-sm text-white shadow-[3px_3px_0_rgba(27,42,181,1)] sm:text-base"
          >
            3 saveurs ✦
          </motion.div>
        </motion.div>
      </div>

      {/* Vague de transition */}
      <svg
        viewBox="0 0 1440 70"
        className="relative z-10 block w-full text-cream"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M0,40 C180,80 360,0 540,25 C720,50 900,70 1080,45 C1260,20 1380,35 1440,45 L1440,70 L0,70 Z"
        />
      </svg>
    </section>
  );
}
