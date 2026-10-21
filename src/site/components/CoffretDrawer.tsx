import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { formatPrice } from "../data/catalog";
import { useCoffret } from "../context/CoffretContext";
import { GoldButton, Hairline } from "./ui";

export default function CoffretDrawer() {
  const { items, isOpen, close, dec, add, remove, total, count, clear } =
    useCoffret();

  // Échap ferme le tiroir, et le fond ne défile plus pendant la consultation.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={close}
            className="fixed inset-0 z-[70] bg-j-noir/70 backdrop-blur-sm"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Votre coffret"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-[440px] flex-col border-l border-j-gold/25 bg-j-noir-soft"
          >
            {/* En-tête */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
              <div>
                <p className="font-jost text-[8.5px] tracking-[0.36em] text-j-gold uppercase">
                  Votre sélection
                </p>
                <p className="mt-2 font-luxe text-2xl font-light text-j-ivory">
                  Le coffret
                  {count > 0 && (
                    <span className="ml-2 font-jost text-[10px] tracking-[0.2em] text-j-ivory/40">
                      ({count})
                    </span>
                  )}
                </p>
              </div>
              <button
                onClick={close}
                aria-label="Fermer le coffret"
                className="flex h-9 w-9 items-center justify-center text-j-ivory/60 transition-colors hover:text-j-gold"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.1">
                  <path d="M3 3l14 14M17 3L3 17" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Contenu */}
            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c8a24a" strokeWidth="0.9">
                      <path d="M4 8h16l-1.2 13H5.2L4 8Z" />
                      <path d="M8.5 8V6a3.5 3.5 0 0 1 7 0v2" strokeLinecap="round" />
                    </svg>
                  </span>
                  <p className="mt-6 font-luxe text-2xl font-light text-j-ivory">
                    Votre coffret est vide
                  </p>
                  <p className="mt-2 max-w-[240px] font-jost text-[11px] leading-relaxed text-j-ivory/45">
                    Ajoutez des pièces pour les présenter à votre conseiller lors
                    du rendez-vous.
                  </p>
                  <button
                    onClick={close}
                    className="mt-7 border-b border-j-gold/50 pb-1 font-jost text-[9px] tracking-[0.3em] text-j-gold uppercase"
                  >
                    Parcourir les créations
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-white/8">
                  {items.map(({ piece, qty }) => (
                    <li key={piece.id} className="flex gap-4 py-6">
                      <img
                        src={piece.image}
                        alt={piece.name}
                        loading="lazy"
                        className="h-24 w-20 shrink-0 object-cover"
                      />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-luxe text-lg leading-tight text-j-ivory">
                              {piece.name}
                            </p>
                            <p className="mt-1 font-jost text-[9px] tracking-[0.16em] text-j-ivory/40 uppercase">
                              {piece.material}
                            </p>
                          </div>
                          <button
                            onClick={() => remove(piece.id)}
                            aria-label={`Retirer ${piece.name}`}
                            className="text-j-ivory/30 transition-colors hover:text-j-gold"
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
                              <path d="M1 1l10 10M11 1L1 11" strokeLinecap="round" />
                            </svg>
                          </button>
                        </div>

                        <div className="mt-auto flex items-end justify-between pt-3">
                          <div className="flex items-center border border-white/15">
                            <button
                              onClick={() => dec(piece.id)}
                              aria-label="Retirer une pièce"
                              className="flex h-7 w-7 items-center justify-center text-j-ivory/60 hover:text-j-gold"
                            >
                              −
                            </button>
                            <span className="w-6 text-center font-jost text-[11px] text-j-ivory">
                              {qty}
                            </span>
                            <button
                              onClick={() => add(piece.id)}
                              aria-label="Ajouter une pièce"
                              className="flex h-7 w-7 items-center justify-center text-j-ivory/60 hover:text-j-gold"
                            >
                              +
                            </button>
                          </div>
                          <p className="font-luxe text-lg text-j-gold-light">
                            {formatPrice(piece.price * qty)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Pied */}
            {items.length > 0 && (
              <div className="border-t border-white/10 px-6 py-6">
                <div className="flex items-baseline justify-between">
                  <span className="font-jost text-[9px] tracking-[0.3em] text-j-ivory/50 uppercase">
                    Total indicatif
                  </span>
                  <span className="font-luxe text-3xl font-light text-j-ivory">
                    {formatPrice(total)}
                  </span>
                </div>
                <Hairline className="my-5" />
                <GoldButton
                  full
                  onClick={() => {
                    close();
                    document
                      .getElementById("rendez-vous")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Réserver en boutique
                </GoldButton>
                <button
                  onClick={clear}
                  className="mt-4 w-full font-jost text-[8.5px] tracking-[0.26em] text-j-ivory/45 uppercase transition-colors hover:text-j-ivory/60"
                >
                  Vider le coffret
                </button>
                <p className="mt-5 font-jost text-[9px] leading-relaxed text-j-ivory/38">
                  Le coffret est une sélection de démonstration : aucun paiement
                  n'est effectué. Votre conseiller confirme la disponibilité de
                  chaque pièce.
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
