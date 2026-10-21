import Reveal from "./Reveal";
import { flavors } from "../data/products";
import { useCart } from "../context/CartContext";

export default function Flavors() {
  const { add } = useCart();

  return (
    <section id="saveurs" className="bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mb-12 text-center">
          <p className="mb-3 text-xs font-bold tracking-[0.25em] text-fuchsia-soda uppercase">
            La collection
          </p>
          <h2 className="text-4xl text-ink sm:text-5xl">
            <span className="font-display">Trois saveurs</span>{" "}
            <span className="font-serifx italic">en apesanteur</span>
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {flavors.map((f, i) => (
            <Reveal key={f.id} delay={i * 0.12}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border-4 border-ink bg-white shadow-[6px_8px_0_rgba(27,42,181,0.9)] transition hover:-translate-y-2 hover:shadow-[8px_12px_0_rgba(232,50,143,0.9)]">
                <div className={`relative overflow-hidden ${f.bg}`}>
                  <img
                    src={f.image}
                    alt={`Canette FRUIZZ ${f.name}`}
                    className="aspect-[4/4.4] w-full object-cover transition duration-700 group-hover:scale-105 group-hover:rotate-1"
                  />
                  <span className="absolute top-4 left-4 rotate-[-4deg] rounded-full bg-white/90 px-3 py-1 font-display text-xs tracking-wide text-ink">
                    33 cl
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className={`font-display text-2xl ${f.text}`}>{f.name}</h3>
                  <p className="mt-1 font-serifx text-lg italic text-ink-deep/70">
                    {f.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-deep/80">
                    {f.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {f.notes.map((n) => (
                      <li
                        key={n}
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${f.bgSoft} ${f.text}`}
                      >
                        {n}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center justify-between gap-3">
                    <span className="font-display text-xl text-ink">
                      {f.price.toFixed(2).replace(".", ",")} €
                    </span>
                    <button
                      onClick={() => add(f.id)}
                      className={`rounded-full px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 ${f.button}`}
                    >
                      Ajouter au panier
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-ink-deep/50">
          * Prix et offres fictifs — site de démonstration.
        </p>
      </div>
    </section>
  );
}
