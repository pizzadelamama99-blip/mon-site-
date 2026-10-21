import { motion } from "framer-motion";

export default function Campaign() {
  return (
    <section className="relative overflow-hidden">
      <img
        src="/images/campaign.jpg"
        alt="Canette FRUIZZ plongeant dans un splash de soda rose"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-deep/80 via-ink-deep/40 to-transparent" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-center px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-4 inline-block rounded-full bg-sun px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-ink uppercase">
            Campagne de l'été
          </p>
          <h2 className="max-w-xl text-4xl leading-tight text-white sm:text-6xl">
            <span className="font-display drop-shadow-[3px_3px_0_rgba(232,50,143,1)]">
              Plongez
            </span>{" "}
            <span className="font-serifx italic">dans la</span>
            <br />
            <span className="font-serifx italic">gravité</span>{" "}
            <span className="font-display text-sun drop-shadow-[3px_3px_0_rgba(232,50,143,1)]">
              zéro.
            </span>
          </h2>
          <p className="mt-4 max-w-md text-base font-medium text-white/85 sm:text-lg">
            Cet été, chaque canette collector fait gagner un voyage en
            apesanteur fruitée. Enfin… presque.*
          </p>
          <a
            href="#boutique"
            className="mt-8 inline-block rounded-full bg-white px-7 py-3.5 font-display text-lg tracking-wide text-ink shadow-[4px_4px_0_rgba(255,201,60,1)] transition hover:-translate-y-1 hover:bg-sun"
          >
            Voir la boutique
          </a>
          <p className="mt-6 text-xs text-white/60">* Jeu-concours illustratif.</p>
        </motion.div>
      </div>
    </section>
  );
}
