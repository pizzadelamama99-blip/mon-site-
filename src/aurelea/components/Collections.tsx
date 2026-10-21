import { COLLECTIONS } from "../data";
import { Eyebrow, Reveal, TextLink } from "./ui";

/**
 * Collections : grille éditoriale à rythme irrégulier (7 / 5, 4 / 4 / 4, 5 / 7).
 * Le survol zoome l'image, décale le texte et allume un filet doré.
 */
export default function Collections() {
  return (
    <section id="collections" className="relative border-t border-white/8 bg-a-obsidian py-20 sm:py-24">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Les collections</Eyebrow>
            <h2 className="mt-5 max-w-lg font-lux text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[1.02] font-light text-a-ivory">
              Huit familles,
              <br />
              <em className="italic text-a-champagne">une même écriture.</em>
            </h2>
          </div>
          <p className="max-w-sm font-ui text-[11.5px] leading-[2] font-light text-a-ivory/50">
            Chaque collection part d'une contrainte de dessin — une pierre, une
            ligne, un geste — et se décline sans jamais changer de ton.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {COLLECTIONS.map((c, i) => {
            const spans = [
              "lg:col-span-7 lg:row-span-2",
              "lg:col-span-5",
              "lg:col-span-5",
              "lg:col-span-4",
              "lg:col-span-4",
              "lg:col-span-4",
              "lg:col-span-5",
              "lg:col-span-7",
            ];
            const tall = i === 0;
            return (
              <Reveal
                key={c.slug}
                delay={(i % 3) * 0.06}
                className={spans[i] ?? "lg:col-span-4"}
              >
                <a
                  href="#/catalogue"
                  className={`group relative block h-full overflow-hidden bg-a-velvet ${
                    tall ? "aspect-[4/5] lg:aspect-[3/4]" : "aspect-[4/3] sm:aspect-[16/11]"
                  }`}
                >
                  <img
                    src={c.image}
                    alt={`${c.name} — ${c.line}`}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: c.focus ?? "50% 50%" }}
                    className="h-full w-full object-cover opacity-85 transition-all duration-[1400ms] ease-out group-hover:scale-[1.05] group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-a-obsidian/90 via-a-obsidian/25 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                    <p className="font-ui text-[8px] tracking-[0.34em] text-a-champagne uppercase">
                      {c.line}
                    </p>
                    <h3 className="mt-2 font-lux text-[clamp(1.4rem,2.2vw,2.1rem)] font-light text-a-ivory transition-transform duration-700 group-hover:-translate-y-0.5">
                      {c.name}
                    </h3>
                    <p className="mt-2 max-w-sm font-ui text-[10.5px] leading-[1.85] font-light text-a-ivory/0 transition-all duration-700 group-hover:text-a-ivory/55">
                      {c.text}
                    </p>
                    <span
                      aria-hidden
                      className="mt-4 block h-px w-10 origin-left scale-x-50 bg-a-champagne transition-transform duration-700 group-hover:scale-x-100"
                    />
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <TextLink href="#/catalogue" className="text-a-champagne">
            Toutes les créations
          </TextLink>
        </Reveal>
      </div>
    </section>
  );
}
