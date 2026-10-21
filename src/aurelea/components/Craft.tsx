import { CRAFT_STEPS } from "../data";
import { Eyebrow, LuxButton, Reveal } from "./ui";

/**
 * Savoir-faire : photographie d'atelier tenue à gauche, quatre étapes
 * qui apparaissent au défilement à droite.
 */
export default function Craft() {
  return (
    <section id="atelier" className="relative border-t border-white/8 bg-a-obsidian py-20 sm:py-24">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <Eyebrow>Le savoir-faire</Eyebrow>
          <h2 className="mt-5 font-lux text-[clamp(2.1rem,4.6vw,3.8rem)] leading-[1.02] font-light text-a-ivory">
            Le geste derrière
            <br />
            <em className="italic text-a-champagne">l'éclat.</em>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="relative overflow-hidden">
                <img
                  src="/images/atelier-sertissage.jpg"
                  alt="Sertisseur posant un diamant sur une bague de platine sous binoculaire"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-a-obsidian/60 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 font-ui text-[8px] tracking-[0.32em] text-a-ivory/70 uppercase">
                  Atelier — 16, rue de la Paix
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                {[
                  ["1996", "premier établi"],
                  ["3", "artisans"],
                  ["6", "semaines par pièce"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <p className="font-lux text-2xl font-light text-a-ivory">{value}</p>
                    <p className="mt-1 font-ui text-[8px] tracking-[0.24em] text-a-ivory/35 uppercase">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:pl-6">
            <ol className="divide-y divide-white/10 border-y border-white/10">
              {CRAFT_STEPS.map((step, i) => (
                <Reveal key={step.n} delay={i * 0.06}>
                  <li className="group grid grid-cols-[auto_1fr] gap-5 py-6 transition-colors hover:bg-white/[0.02] sm:gap-8 sm:py-7">
                    <span className="font-ui text-[9px] tracking-[0.3em] text-a-champagne/80">{step.n}</span>
                    <div>
                      <h3 className="font-lux text-xl font-light text-a-ivory sm:text-2xl">{step.title}</h3>
                      <p className="mt-2 max-w-md font-ui text-[11px] leading-[1.95] font-light text-a-ivory/50">
                        {step.text}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <LuxButton href="#rendez-vous">Visiter l'atelier</LuxButton>
                <p className="font-ui text-[8.5px] tracking-[0.24em] text-a-ivory/35 uppercase">
                  Sur rendez-vous, du mardi au samedi
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
