import { BRAND } from "../config";
import { BOUTIQUES } from "../data";
import { Eyebrow, LuxButton, Reveal } from "./ui";

/** Page institutionnelle — courte, factuelle, sans histoire inventée. */
export default function Maison() {
  return (
    <main className="bg-a-obsidian pt-28 sm:pt-32">
      {/* Ouverture */}
      <section className="mx-auto max-w-[1500px] px-5 pb-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow>La Maison</Eyebrow>
            <h1 className="mt-6 font-lux text-[clamp(2.8rem,6vw,5rem)] leading-[0.98] font-light text-a-ivory">
              Une maison
              <br />
              <em className="italic text-a-champagne">de dessin.</em>
            </h1>
            <p className="mt-8 max-w-md font-ui text-[12px] leading-[2.1] font-light text-a-ivory/55">
              {BRAND.fullName} est une maison de haute joaillerie
              contemporaine. Nous dessinons peu, nous dessinons longtemps :
              chaque pièce est pensée pour une seule personne, puis réalisée
              dans notre atelier parisien.
            </p>
            <p className="mt-4 max-w-md font-ui text-[12px] leading-[2.1] font-light text-a-ivory/55">
              Pas de collection saisonnière, pas de série. Un dessin, une
              pierre, un geste — et le temps qu'il faut pour que les trois
              s'accordent.
            </p>
          </div>

          <div className="lg:col-span-6">
            <Reveal>
              <img
                src="/images/portrait-maison.jpg"
                alt="Portrait portant des pendantes et un collier de diamants Auréléa"
                className="aspect-[4/5] w-full object-cover"
              />
              <p className="mt-3 flex justify-between font-ui text-[8px] tracking-[0.24em] text-a-ivory/35 uppercase">
                <span>Campagne 2026</span>
                <span>Pendantes Larme</span>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trois engagements réellement tenus dans la démonstration */}
      <section className="border-y border-white/8 py-16 sm:py-20">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
          <div className="grid gap-10 sm:grid-cols-3">
            {[
              {
                t: "Un seul atelier",
                d: "Dessin, fonte, sertissage et polissage se font au même endroit, à Paris. Nous ne sous-traitons aucune étape.",
              },
              {
                t: "Des pierres choisies",
                d: "Chaque centre est sélectionné à la lumière du jour. Les caractéristiques annoncées sont celles du modèle exposé.",
              },
              {
                t: "Le sur-mesure",
                d: "À partir d'une pierre que vous apportez ou que nous trouvons, un dessin à la gouache puis une pièce unique.",
              },
            ].map((v, i) => (
              <Reveal key={v.t} delay={i * 0.08}>
                <p className="font-ui text-[8px] tracking-[0.3em] text-a-champagne uppercase">
                  0{i + 1}
                </p>
                <h2 className="mt-3 font-lux text-2xl font-light text-a-ivory">{v.t}</h2>
                <p className="mt-3 font-ui text-[10.5px] leading-[1.95] font-light text-a-ivory/50">{v.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Atelier */}
      <section className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <img
                src="/images/atelier-sertissage.jpg"
                alt="Sertissage à la main dans l'atelier Auréléa"
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.08}>
              <Eyebrow>L'atelier</Eyebrow>
              <h2 className="mt-5 font-lux text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.05] font-light text-a-ivory">
                {BRAND.address}
              </h2>
              <p className="mt-5 font-ui text-[11px] leading-[2] font-light text-a-ivory/50">
                L'atelier reçoit sur rendez-vous, du mardi au samedi. Vous y
                verrez les pierres à la lumière du jour, les gouaches
                originales et les pièces en cours de montage.
              </p>
              <div className="mt-8">
                <LuxButton href="#rendez-vous">Prendre rendez-vous</LuxButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-white/8 py-14">
        <div className="mx-auto grid max-w-[1500px] gap-8 px-5 sm:px-8 lg:grid-cols-3">
          {BOUTIQUES.map((b) => (
            <div key={b.city}>
              <p className="font-lux text-xl font-light text-a-ivory">{b.city}</p>
              <p className="mt-2 font-ui text-[10px] leading-relaxed text-a-ivory/45">{b.address}</p>
              <a
                href={`tel:${b.tel.replace(/\s/g, "")}`}
                className="mt-2 inline-block font-ui text-[10px] text-a-ivory/60 hover:text-a-champagne"
              >
                {b.tel}
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
