import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../context/CartContext";

const FREE_SHIPPING = 25;

export default function CartDrawer() {
  const { isOpen, closeCart, lines, setQty, remove, clear, total, flavorOf } =
    useCart();
  const [ordered, setOrdered] = useState(false);

  const handleOrder = () => {
    setOrdered(true);
    clear();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-ink-deep/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              closeCart();
              setOrdered(false);
            }}
          />
          <motion.aside
            className="fixed top-0 right-0 z-[70] flex h-full w-full max-w-md flex-col bg-cream shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            role="dialog"
            aria-label="Panier"
          >
            <div className="flex items-center justify-between border-b-2 border-ink/10 px-6 py-5">
              <h2 className="font-display text-2xl text-ink">Votre panier</h2>
              <button
                onClick={() => {
                  closeCart();
                  setOrdered(false);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink/15 text-ink transition hover:bg-ink hover:text-lime-soda"
                aria-label="Fermer le panier"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {ordered ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <span className="mb-4 text-6xl">🎉</span>
                  <h3 className="font-display text-xl text-ink">
                    Commande (fictive) envoyée !
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-ink-deep/70">
                    Merci d'avoir testé la démo FRUIZZ. Aucun paiement n'a été
                    effectué et aucune canette ne flottera jusqu'à chez vous…
                    pour l'instant.
                  </p>
                </div>
              ) : lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <span className="mb-4 text-6xl">🫧</span>
                  <h3 className="font-display text-xl text-ink">
                    C'est bien vide ici…
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-ink-deep/70">
                    Ajoutez quelques bulles pour remplir votre panier.
                  </p>
                  <a
                    href="#boutique"
                    onClick={closeCart}
                    className="mt-6 rounded-full bg-ink px-6 py-3 font-display text-lime-soda transition hover:-translate-y-0.5"
                  >
                    Voir la boutique
                  </a>
                </div>
              ) : (
                <ul className="space-y-4">
                  {lines.map((line) => {
                    const f = flavorOf(line.id);
                    if (!f) return null;
                    return (
                      <li
                        key={line.id}
                        className="flex items-center gap-4 rounded-2xl border-2 border-ink/10 bg-white p-3"
                      >
                        <div className={`shrink-0 overflow-hidden rounded-xl ${f.bg}`}>
                          <img
                            src={f.image}
                            alt={f.name}
                            className="h-20 w-16 object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`font-display text-sm ${f.text}`}>
                            {f.name}
                          </p>
                          <p className="text-xs text-ink-deep/60">
                            {f.price.toFixed(2).replace(".", ",")} € / canette
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              onClick={() => setQty(line.id, line.qty - 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-ink/15 text-sm font-bold text-ink hover:bg-ink hover:text-lime-soda"
                              aria-label="Diminuer"
                            >
                              −
                            </button>
                            <span className="w-6 text-center text-sm font-bold text-ink">
                              {line.qty}
                            </span>
                            <button
                              onClick={() => setQty(line.id, line.qty + 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-ink/15 text-sm font-bold text-ink hover:bg-ink hover:text-lime-soda"
                              aria-label="Augmenter"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="text-sm font-bold text-ink">
                            {(f.price * line.qty).toFixed(2).replace(".", ",")} €
                          </span>
                          <button
                            onClick={() => remove(line.id)}
                            className="text-xs text-ink-deep/50 underline hover:text-fuchsia-soda"
                          >
                            Retirer
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {!ordered && lines.length > 0 && (
              <div className="border-t-2 border-ink/10 px-6 py-5">
                <div className="mb-3">
                  {total >= FREE_SHIPPING ? (
                    <p className="rounded-full bg-mint/25 px-4 py-2 text-center text-xs font-bold text-ink">
                      🎁 Livraison offerte débloquée !
                    </p>
                  ) : (
                    <>
                      <p className="mb-2 text-center text-xs font-semibold text-ink-deep/70">
                        Plus que{" "}
                        {(FREE_SHIPPING - total).toFixed(2).replace(".", ",")} €
                        pour la livraison offerte
                      </p>
                      <div className="h-2 overflow-hidden rounded-full bg-ink/10">
                        <div
                          className="h-full rounded-full bg-fuchsia-soda transition-all duration-500"
                          style={{
                            width: `${Math.min(100, (total / FREE_SHIPPING) * 100)}%`,
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="font-bold text-ink">Total</span>
                  <span className="font-display text-xl text-ink">
                    {total.toFixed(2).replace(".", ",")} €
                  </span>
                </div>
                <button
                  onClick={handleOrder}
                  className="w-full rounded-full bg-ink py-4 font-display text-lg text-lime-soda shadow-[3px_4px_0_rgba(232,50,143,1)] transition hover:-translate-y-0.5 hover:bg-fuchsia-soda hover:text-white"
                >
                  Commander (démo)
                </button>
                <p className="mt-3 text-center text-[11px] text-ink-deep/50">
                  Panier de démonstration — aucun paiement réel.
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
