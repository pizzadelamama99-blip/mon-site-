import { microCopy } from "../data/catalog";
import { Micro, Reveal } from "./ui";

/**
 * « Nos engagements » — grille de preuves à la DE'ART :
 * quatre blocs image + titre + texte, sur fond noir profond.
 */
export default function Promises() {
  return (
    <section className="relative overflow-hidden border-y border-white/8 bg-j-noir py-16 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8">
        <Reveal className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-j-gold" />
            <Micro>Nos engagements</Micro>
          </div>
          <p className="max-w-sm font-jost text-[11px] leading-relaxed font-light text-j-ivory/45">
            Quatre promesses qui accompagnent chaque pièce, de l'atelier à la
            dernière expertise.
          </p>
        </Reveal>

        <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {microCopy.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.07}>
              <article className="group flex h-full flex-col bg-j-noir">
                <div className="relative overflow-hidden">
                  <img
                    src={m.image}
                    alt={m.title}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: m.focus ?? "50% 50%" }}
                    className="aspect-[5/4] w-full object-cover opacity-80 transition-all duration-[1200ms] group-hover:scale-[1.04] group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-j-noir via-j-noir/20 to-transparent" />
                  <span className="absolute top-4 left-4 font-luxe text-sm text-j-gold/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-luxe text-xl leading-snug font-light text-j-ivory">
                    {m.title}
                  </h3>
                  <p className="mt-2 font-jost text-[10.5px] leading-[1.85] font-light text-j-ivory/50">
                    {m.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
