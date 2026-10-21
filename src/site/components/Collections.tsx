import { collections } from "../data/catalog";
import { GoldLink, Micro, Reveal } from "./ui";

export default function Collections() {
  return (
    <section
      id="collections"
      className="relative overflow-hidden bg-j-ivory py-20 text-j-noir sm:py-28 lg:py-32"
    >
      {/* filets d'encadrement */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-j-noir/10" />

      <div className="mx-auto max-w-[1400px] px-6 sm:px-8">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-j-gold-deep" />
              <Micro className="!text-j-gold-deep">Les collections</Micro>
            </div>
            <h2 className="mt-6 max-w-xl font-luxe text-4xl leading-[1.08] font-light sm:text-5xl lg:text-[3.4rem]">
              Trois écritures,
              <br />
              <span className="italic text-j-gold-deep">une même lumière.</span>
            </h2>
          </div>
          <p className="max-w-xs font-jost text-[13px] leading-[1.9] font-light text-j-noir/60">
            Chaque collection naît d'un dessin à la gouache, puis d'une année
            d'atelier. Aucune pièce n'est reproduite à l'identique.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3 lg:gap-8">
          {collections.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.12}>
              <a href="#creations" className="group block">
                <div className="relative overflow-hidden bg-j-noir">
                  <img
                    src={c.image}
                    alt={`Collection ${c.name} — ${c.subtitle}`}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-j-noir/80 via-j-noir/5 to-transparent opacity-80" />

                  <span className="absolute top-5 left-5 font-jost text-[9px] tracking-[0.32em] text-j-ivory/80 uppercase">
                    {String(i + 1).padStart(2, "0")} — {c.count} pièces
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="font-jost text-[9px] tracking-[0.34em] text-j-gold-light uppercase">
                      {c.subtitle}
                    </p>
                    <h3 className="mt-2 font-luxe text-3xl font-light text-j-ivory">
                      {c.name}
                    </h3>
                    <div className="mt-4 grid grid-rows-[0fr] overflow-hidden transition-all duration-700 group-hover:grid-rows-[1fr]">
                      <p className="min-h-0 font-jost text-[12px] leading-relaxed font-light text-j-ivory/70">
                        {c.text}
                      </p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2 font-jost text-[9px] tracking-[0.3em] text-j-ivory uppercase">
                      Découvrir
                      <span className="h-px w-5 bg-j-gold transition-all duration-500 group-hover:w-9" />
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex justify-center" delay={0.15}>
          <GoldLink href="#creations" className="!text-j-noir hover:!text-j-gold-deep">
            Voir toutes les créations
          </GoldLink>
        </Reveal>
      </div>
    </section>
  );
}
