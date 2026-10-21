import { boutiques } from "../data/catalog";
import { Hairline } from "./ui";

const columns = [
  {
    title: "Collections",
    links: [
      "Éclat",
      "Jardin Secret",
      "Métamorphoses",
      "Ligne Or",
      "Pièces d'exception",
    ],
  },
  {
    title: "Services",
    links: [
      "Prendre rendez-vous",
      "Sur-mesure",
      "Transformation de bijoux",
      "Entretien & rhodiage",
      "Certificats GIA",
    ],
  },
  {
    title: "La maison",
    links: ["Notre histoire", "L'atelier", "Engagements", "Le Cercle", "Carrières"],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-j-noir">
      <div className="mx-auto max-w-[1400px] px-6 pt-16 pb-10 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          {/* Marque */}
          <div>
            <p className="font-luxe text-2xl font-light tracking-[0.3em] text-j-ivory">
              AURELIS
            </p>
            <p className="mt-2 font-jost text-[8px] tracking-[0.5em] text-j-gold uppercase">
              Haute Joaillerie · Paris
            </p>
            <p className="mt-6 max-w-xs font-jost text-[11.5px] leading-[1.9] font-light text-j-ivory/45">
              Maison fondée en 1928, place Vendôme. Pièces uniques, pierres
              certifiées, atelier intégré.
            </p>
            <div className="mt-7 flex gap-5">
              {["Instagram", "Pinterest", "Journal"].map((s) => (
                <a
                  key={s}
                  href="#top"
                  className="font-jost text-[9px] tracking-[0.24em] text-j-ivory/45 uppercase transition-colors hover:text-j-gold"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Liens + boutiques */}
          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="font-jost text-[8.5px] tracking-[0.34em] text-j-gold uppercase">
                  {col.title}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#top"
                        className="font-jost text-[11.5px] font-light text-j-ivory/55 transition-colors hover:text-j-ivory"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Boutiques */}
        <div className="mt-14 grid gap-6 border-t border-white/8 pt-10 sm:grid-cols-3">
          {boutiques.map((b) => (
            <div key={b.city}>
              <p className="font-jost text-[8.5px] tracking-[0.34em] text-j-ivory/45 uppercase">
                {b.city}
              </p>
              <p className="mt-2 font-luxe text-lg text-j-ivory/80">{b.address}</p>
              <a
                href={`tel:${b.tel.replace(/\s/g, "")}`}
                className="mt-1 inline-block font-jost text-[10px] tracking-[0.16em] text-j-gold/70 hover:text-j-gold"
              >
                {b.tel}
              </a>
            </div>
          ))}
        </div>

        <Hairline className="mt-12" />

        <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="font-jost text-[9px] tracking-[0.14em] text-j-ivory/40 uppercase">
            © 2026 Maison Aurelis — Site de démonstration, aucune vente réelle
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="#top"
              className="font-jost text-[9px] tracking-[0.14em] text-j-ivory/40 uppercase transition-colors hover:text-j-ivory/60"
            >
              Mentions légales
            </a>
            <a
              href="#top"
              className="font-jost text-[9px] tracking-[0.14em] text-j-ivory/40 uppercase transition-colors hover:text-j-ivory/60"
            >
              Confidentialité
            </a>
            <a
              href="#/fruizz"
              className="font-jost text-[9px] tracking-[0.14em] text-j-ivory/20 uppercase transition-colors hover:text-j-gold/70"
            >
              Concept soda ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
