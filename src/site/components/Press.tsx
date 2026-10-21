import { pressQuotes } from "../data/catalog";
import { Hairline, Micro, Reveal } from "./ui";

export default function Press() {
  return (
    <section className="relative bg-j-noir py-20 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8">
        <Reveal className="flex items-center justify-center gap-4">
          <span className="h-px w-8 bg-j-gold/60" />
          <Micro>La presse en parle</Micro>
          <span className="h-px w-8 bg-j-gold/60" />
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-0">
          {pressQuotes.map((q, i) => (
            <Reveal key={q.source} delay={i * 0.1}>
              <figure
                className={`h-full px-0 md:px-8 ${
                  i > 0 ? "md:border-l md:border-white/10" : ""
                }`}
              >
                <span className="font-luxe text-5xl leading-none text-j-gold/30">
                  “
                </span>
                <blockquote className="-mt-3 font-luxe text-xl leading-[1.6] font-light text-j-ivory/85 sm:text-[1.4rem]">
                  {q.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <Hairline className="!w-8" />
                  <span className="font-jost text-[9px] tracking-[0.3em] text-j-gold uppercase">
                    {q.source}
                  </span>
                  <span className="font-jost text-[9px] tracking-[0.3em] text-j-ivory/30">
                    {q.year}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-5 border-y border-white/8 py-7">
          {["Revue de la Place", "Cahiers du Luxe", "L'Éclat", "Maison & Objet", "T Magazine"].map(
            (name) => (
              <span
                key={name}
                className="font-luxe text-sm tracking-[0.18em] text-j-ivory/40 italic"
              >
                {name}
              </span>
            ),
          )}
        </Reveal>
      </div>
    </section>
  );
}
