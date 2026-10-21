import Reveal from "./Reveal";
import { testimonials } from "../data/products";

export default function Testimonials() {
  return (
    <section className="bg-lilac-soda/25 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mb-10 text-center">
          <h2 className="text-3xl text-ink sm:text-4xl">
            <span className="font-serifx italic">Ils flottent</span>{" "}
            <span className="font-display text-lilac-deep drop-shadow-[2px_2px_0_rgba(27,42,181,1)]">
              déjà
            </span>
          </h2>
          <p className="mt-2 text-sm text-ink-deep/60">
            Avis illustratifs, rédigés pour la démonstration.
          </p>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-3xl border-2 border-ink/10 bg-white p-6 transition hover:-translate-y-1 hover:border-ink">
                <div
                  className="mb-3 text-sun"
                  aria-label="5 étoiles sur 5"
                >
                  ★★★★★
                </div>
                <blockquote className="flex-1 font-serifx text-lg leading-snug text-ink-deep italic">
                  « {t.quote} »
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-soda text-xl">
                    {t.emoji}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">{t.name}</p>
                    <p className="text-xs text-ink-deep/60">
                      Fan de {t.flavor}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
