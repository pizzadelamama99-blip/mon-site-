import { useMemo, useState } from "react";
import { formatPrice, pieces } from "../data/catalog";
import { useCoffret } from "../context/CoffretContext";
import { Micro, Reveal } from "./ui";

const categories = ["Toutes", "Bagues", "Colliers", "Boucles", "Bracelets"] as const;
type Cat = (typeof categories)[number];

export default function Catalog() {
  const [cat, setCat] = useState<Cat>("Toutes");
  const { add } = useCoffret();

  const list = useMemo(
    () => (cat === "Toutes" ? pieces : pieces.filter((p) => p.category === cat)),
    [cat],
  );

  return (
    <section
      id="creations"
      className="relative bg-j-ivory py-20 text-j-noir sm:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-j-gold-deep" />
              <Micro className="!text-j-gold-deep">Les créations</Micro>
            </div>
            <h2 className="mt-6 font-luxe text-4xl leading-[1.08] font-light sm:text-5xl">
              Pièces disponibles
            </h2>
          </div>

          {/* Filtres */}
          <div className="-mx-1 flex flex-wrap items-center gap-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 font-jost text-[9.5px] tracking-[0.26em] uppercase transition-colors ${
                  cat === c
                    ? "bg-j-noir text-j-ivory"
                    : "text-j-noir/50 hover:text-j-noir"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={Math.min(i * 0.06, 0.3)}>
              <article className="group">
                <div className="relative overflow-hidden bg-j-noir-soft">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: p.focus ?? "50% 50%" }}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                  />
                  {p.signature && (
                    <span className="absolute top-4 left-4 bg-j-ivory/90 px-2.5 py-1 font-jost text-[8px] tracking-[0.28em] text-j-noir uppercase">
                      Signature
                    </span>
                  )}
                  {/* survol : ajout au coffret */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-j-noir/85 px-4 py-3 backdrop-blur-sm transition-transform duration-500 group-hover:translate-y-0">
                    <button
                      onClick={() => add(p.id)}
                      className="w-full font-jost text-[9px] tracking-[0.3em] text-j-ivory uppercase transition-colors hover:text-j-gold"
                    >
                      Ajouter au coffret
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-luxe text-xl leading-snug font-normal">
                      {p.name}
                    </h3>
                    <p className="shrink-0 font-luxe text-lg whitespace-nowrap text-j-gold-deep">
                      {formatPrice(p.price)}
                    </p>
                  </div>
                  <p className="mt-1.5 font-jost text-[9.5px] leading-relaxed tracking-[0.12em] text-j-noir/55 uppercase">
                    {p.material}
                  </p>
                  <p className="font-jost text-[9.5px] leading-relaxed tracking-[0.12em] text-j-noir/55 uppercase">
                    {p.stones}
                    {p.carat ? ` · ${p.carat}` : ""}
                  </p>
                </div>

                <button
                  onClick={() => add(p.id)}
                  className="mt-3 border-b border-j-noir/25 pb-0.5 font-jost text-[9px] tracking-[0.28em] text-j-noir/60 uppercase transition-colors hover:border-j-gold-deep hover:text-j-gold-deep"
                >
                  Ajouter au coffret
                </button>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-j-noir/10 pt-8 sm:flex-row">
          <p className="max-w-md font-jost text-[11px] leading-relaxed font-light text-j-noir/55">
            Les prix affichés sont indicatifs. Chaque pièce étant unique, votre
            conseiller confirmera la disponibilité et le tarif définitif lors du
            rendez-vous.
          </p>
          <a
            href="#rendez-vous"
            className="border-b border-j-gold-deep/50 pb-1 font-jost text-[10px] tracking-[0.28em] text-j-gold-deep uppercase transition-colors hover:border-j-gold-deep"
          >
            Demander une pièce sur mesure
          </a>
        </Reveal>
      </div>
    </section>
  );
}
