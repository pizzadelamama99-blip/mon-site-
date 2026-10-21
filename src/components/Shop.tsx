import { useState } from "react";
import Reveal from "./Reveal";
import { flavors } from "../data/products";
import { useCart } from "../context/CartContext";

function QtyPicker({
  qty,
  setQty,
}: {
  qty: number;
  setQty: (q: number) => void;
}) {
  return (
    <div className="flex items-center rounded-full border-2 border-ink/15 bg-cream">
      <button
        onClick={() => setQty(Math.max(1, qty - 1))}
        className="flex h-9 w-9 items-center justify-center rounded-full font-bold text-ink transition hover:bg-ink hover:text-lime-soda"
        aria-label="Diminuer"
      >
        −
      </button>
      <span className="w-8 text-center text-sm font-bold text-ink">{qty}</span>
      <button
        onClick={() => setQty(qty + 1)}
        className="flex h-9 w-9 items-center justify-center rounded-full font-bold text-ink transition hover:bg-ink hover:text-lime-soda"
        aria-label="Augmenter"
      >
        +
      </button>
    </div>
  );
}

export default function Shop() {
  const { add } = useCart();
  const [qtys, setQtys] = useState<Record<string, number>>({});

  return (
    <section id="boutique" className="bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.25em] text-orange-soda uppercase">
              Boutique
            </p>
            <h2 className="text-4xl text-ink sm:text-5xl">
              <span className="font-display">Faites le plein</span>{" "}
              <span className="font-serifx italic">de bulles</span>
            </h2>
          </div>
          <p className="rounded-full bg-mint/25 px-4 py-2 text-sm font-semibold text-ink">
            🚚 Livraison offerte dès 25 € *
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {flavors.map((f, i) => {
            const qty = qtys[f.id] ?? 1;
            return (
              <Reveal key={f.id} delay={i * 0.1}>
                <div className="flex h-full items-center gap-4 rounded-3xl border-2 border-ink/10 bg-white p-4 transition hover:-translate-y-1 hover:border-ink hover:shadow-[5px_6px_0_rgba(27,42,181,0.9)]">
                  <div className={`shrink-0 overflow-hidden rounded-2xl ${f.bg}`}>
                    <img
                      src={f.image}
                      alt={`Canette ${f.name}`}
                      className="h-28 w-24 object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div>
                      <h3 className={`font-display text-lg leading-tight ${f.text}`}>
                        {f.name}
                      </h3>
                      <p className="text-xs text-ink-deep/60">
                        Canette 33 cl —{" "}
                        <span className="font-bold text-ink">
                          {f.price.toFixed(2).replace(".", ",")} €
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <QtyPicker
                        qty={qty}
                        setQty={(q) => setQtys((p) => ({ ...p, [f.id]: q }))}
                      />
                      <button
                        onClick={() => add(f.id, qty)}
                        className={`rounded-full px-4 py-2 text-xs font-bold text-white transition hover:-translate-y-0.5 ${f.button}`}
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2} className="mt-8">
          <div className="flex flex-col items-center justify-between gap-4 rounded-3xl bg-ink p-6 text-center sm:flex-row sm:text-left">
            <div>
              <h3 className="font-display text-xl text-lime-soda">
                Le pack découverte — 12 canettes, 3 saveurs
              </h3>
              <p className="mt-1 text-sm text-white/70">
                4 × Mangue Dragon, 4 × Litchi Lilas, 4 × Pêche Soleil.
                L'apesanteur complète.
              </p>
            </div>
            <button
              onClick={() => {
                add("mangue-dragon", 4);
                add("litchi-lilas", 4);
                add("peche-soleil", 4);
              }}
              className="shrink-0 rounded-full bg-sun px-6 py-3 font-display text-ink shadow-[3px_3px_0_rgba(232,50,143,1)] transition hover:-translate-y-1"
            >
              Ajouter le pack — 34,80 €
            </button>
          </div>
          <p className="mt-4 text-center text-xs text-ink-deep/50">
            * Boutique de démonstration : aucune commande ni aucun paiement
            réels ne sont effectués.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
