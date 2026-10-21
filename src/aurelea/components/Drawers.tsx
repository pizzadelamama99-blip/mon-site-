import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BRAND } from "../config";
import { METALS, PRODUCTS, STONES, formatPrice, getProduct, productPath } from "../data";
import { useStore } from "../store";

/* ------------------------------------------------------------------ */
/* Enveloppe commune                                                   */
/* ------------------------------------------------------------------ */
function Panel({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  side = "right",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  side?: "right" | "left";
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] flex bg-a-obsidian/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ x: side === "right" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: side === "right" ? "100%" : "-100%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={`ml-auto flex h-full w-full max-w-[440px] flex-col border-l border-white/10 bg-a-velvet ${
              side === "left" ? "mr-auto ml-0 border-r border-l-0" : ""
            }`}
          >
            <header className="flex items-start justify-between border-b border-white/10 px-6 py-5">
              <div>
                <h2 className="font-lux text-2xl font-light text-a-ivory">{title}</h2>
                {subtitle && (
                  <p className="mt-1 font-ui text-[8px] tracking-[0.26em] text-a-ivory/40 uppercase">
                    {subtitle}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer"
                className="mt-1 text-a-ivory/50 transition-colors hover:text-a-champagne"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
                  <path d="m5 5 14 14M19 5 5 19" />
                </svg>
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
            {footer && <div className="border-t border-white/10 px-6 py-6">{footer}</div>}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Panier                                                              */
/* ------------------------------------------------------------------ */
export function CartDrawer() {
  const { lines, openCart, setOpenCart, setQty, remove, subtotal, shipping, total, clear } = useStore();
  const [checkout, setCheckout] = useState(false);

  return (
    <Panel
      open={openCart}
      onClose={() => {
        setOpenCart(false);
        setCheckout(false);
      }}
      title="Votre sélection"
      subtitle={`${lines.reduce((n, l) => n + l.qty, 0)} pièce${lines.length > 1 ? "s" : ""}`}
      footer={
        lines.length > 0 ? (
          <div className="space-y-3">
            <div className="flex justify-between font-ui text-[10.5px] text-a-ivory/55">
              <span>Sous-total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between font-ui text-[10.5px] text-a-ivory/55">
              <span>{BRAND.shipping.label}</span>
              <span>{shipping === 0 ? "Offerte" : formatPrice(shipping)}</span>
            </div>
            <div className="flex items-baseline justify-between border-t border-white/10 pt-3">
              <span className="font-ui text-[9px] tracking-[0.26em] text-a-ivory/50 uppercase">Total</span>
              <span className="font-lux text-2xl font-light text-a-ivory">{formatPrice(total)}</span>
            </div>

            {!checkout ? (
              <button
                type="button"
                onClick={() => setCheckout(true)}
                className="mt-2 w-full bg-a-champagne py-4 font-ui text-[9px] tracking-[0.3em] text-a-obsidian uppercase transition-colors hover:bg-a-ivory"
              >
                Passer commande
              </button>
            ) : (
              <div className="mt-2 border border-a-champagne/30 bg-a-champagne/5 p-4">
                <p className="font-ui text-[10px] leading-[1.9] text-a-ivory/65">
                  Le paiement en ligne n'est pas encore activé sur cette
                  démonstration. Aucune carte n'est demandée, aucune commande
                  n'est enregistrée.
                </p>
                <a
                  href="#rendez-vous"
                  onClick={() => setOpenCart(false)}
                  className="mt-3 inline-block border-b border-a-champagne pb-0.5 font-ui text-[8.5px] tracking-[0.24em] text-a-champagne uppercase"
                >
                  Finaliser en boutique
                </a>
              </div>
            )}

            <button
              type="button"
              onClick={clear}
              className="w-full pt-1 font-ui text-[8px] tracking-[0.24em] text-a-ivory/30 uppercase underline-offset-4 transition-colors hover:text-a-ivory/60 hover:underline"
            >
              Vider la sélection
            </button>
          </div>
        ) : null
      }
    >
      {lines.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center text-center">
          <p className="font-lux text-2xl font-light text-a-ivory">Votre écrin est vide.</p>
          <p className="mt-3 max-w-xs font-ui text-[10.5px] leading-relaxed text-a-ivory/45">
            Ajoutez une création pour la conserver ici — votre sélection reste
            enregistrée sur cet appareil.
          </p>
          <a
            href="#/catalogue"
            onClick={() => setOpenCart(false)}
            className="mt-7 border border-a-champagne/50 px-6 py-3 font-ui text-[8.5px] tracking-[0.26em] text-a-champagne uppercase transition-colors hover:bg-a-champagne hover:text-a-obsidian"
          >
            Parcourir le catalogue
          </a>
        </div>
      ) : (
        <ul className="space-y-5">
          {lines.map((l) => (
            <li key={l.key} className="flex gap-4 border-b border-white/8 pb-5">
              <img src={l.image} alt={l.name} className="h-24 w-20 shrink-0 object-cover" style={{ objectPosition: l.focus ?? "50% 50%" }} />
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-lux text-[17px] leading-tight text-a-ivory">{l.name}</p>
                    <p className="mt-1 font-ui text-[8px] tracking-[0.2em] text-a-ivory/40 uppercase">
                      {METALS[l.metal].short}
                      {l.size ? ` · T.${l.size}` : ""}
                    </p>
                  </div>
                  <p className="shrink-0 font-ui text-[10.5px] text-a-ivory/75">
                    {formatPrice(l.price * l.qty)}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center border border-white/12">
                    <button
                      type="button"
                      onClick={() => setQty(l.key, l.qty - 1)}
                      aria-label={`Diminuer la quantité de ${l.name}`}
                      className="px-2.5 py-1 text-a-ivory/50 hover:text-a-champagne"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-ui text-[10px] text-a-ivory">{l.qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(l.key, l.qty + 1)}
                      aria-label={`Augmenter la quantité de ${l.name}`}
                      className="px-2.5 py-1 text-a-ivory/50 hover:text-a-champagne"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(l.key)}
                    className="font-ui text-[8px] tracking-[0.2em] text-a-ivory/30 uppercase transition-colors hover:text-a-ivory/70"
                  >
                    Retirer
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}

/* ------------------------------------------------------------------ */
/* Favoris                                                             */
/* ------------------------------------------------------------------ */
export function FavoritesPanel() {
  const { openFavorites, setOpenFavorites, favorites, toggleFavorite, add } = useStore();
  const items = useMemo(() => favorites.map(getProduct).filter(Boolean), [favorites]);

  return (
    <Panel
      open={openFavorites}
      onClose={() => setOpenFavorites(false)}
      title="Vos favoris"
      subtitle={`${items.length} pièce${items.length > 1 ? "s" : ""} conservée${items.length > 1 ? "s" : ""}`}
    >
      {items.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center text-center">
          <p className="font-lux text-2xl font-light text-a-ivory">Aucun favori pour l'instant.</p>
          <p className="mt-3 max-w-xs font-ui text-[10.5px] leading-relaxed text-a-ivory/45">
            Touchez le cœur d'une création pour la retrouver ici, même après
            avoir fermé le site.
          </p>
          <a
            href="#/catalogue"
            onClick={() => setOpenFavorites(false)}
            className="mt-7 border border-a-champagne/50 px-6 py-3 font-ui text-[8.5px] tracking-[0.26em] text-a-champagne uppercase transition-colors hover:bg-a-champagne hover:text-a-obsidian"
          >
            Voir les créations
          </a>
        </div>
      ) : (
        <ul className="space-y-5">
          {items.map((p) => (
            <li key={p!.slug} className="flex gap-4 border-b border-white/8 pb-5">
              <a href={productPath(p!.slug)} onClick={() => setOpenFavorites(false)} className="shrink-0">
                <img src={p!.image} alt={p!.name} className="h-24 w-20 object-cover" style={{ objectPosition: p!.focus ?? "50% 50%" }} />
              </a>
              <div className="flex flex-1 flex-col">
                <p className="font-lux text-[17px] leading-tight text-a-ivory">{p!.name}</p>
                <p className="mt-1 font-ui text-[8px] tracking-[0.2em] text-a-ivory/40 uppercase">
                  {STONES[p!.stone].name} · {METALS[p!.metal].short}
                </p>
                <p className="mt-1 font-ui text-[10.5px] text-a-ivory/70">{formatPrice(p!.price)}</p>
                <div className="mt-auto flex items-center gap-4 pt-3">
                  <button
                    type="button"
                    onClick={() => add({ slug: p!.slug, metal: p!.metal, size: p!.sizes?.[2] })}
                    className="font-ui text-[8px] tracking-[0.2em] text-a-champagne uppercase underline-offset-4 hover:underline"
                  >
                    Ajouter au panier
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleFavorite(p!.slug)}
                    className="font-ui text-[8px] tracking-[0.2em] text-a-ivory/30 uppercase hover:text-a-ivory/70"
                  >
                    Retirer
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}

/* ------------------------------------------------------------------ */
/* Recherche                                                           */
/* ------------------------------------------------------------------ */
export function SearchOverlay() {
  const { openSearch, setOpenSearch } = useStore();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!openSearch) setQuery("");
  }, [openSearch]);

  useEffect(() => {
    if (!openSearch) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenSearch(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openSearch, setOpenSearch]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS.slice(0, 4);
    return PRODUCTS.filter((p) =>
      `${p.name} ${p.tagline} ${STONES[p.stone].name} ${METALS[p.metal].short} ${p.category}`
        .toLowerCase()
        .includes(q),
    ).slice(0, 6);
  }, [query]);

  return (
    <AnimatePresence>
      {openSearch && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[75] bg-a-obsidian/95 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Recherche"
        >
          <div className="mx-auto flex h-full max-w-3xl flex-col px-6 pt-10">
            <div className="flex items-center justify-between">
              <span className="font-ui text-[8px] tracking-[0.34em] text-a-champagne uppercase">Recherche</span>
              <button
                type="button"
                onClick={() => setOpenSearch(false)}
                aria-label="Fermer la recherche"
                className="text-a-ivory/60 hover:text-a-champagne"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
                  <path d="m5 5 14 14M19 5 5 19" />
                </svg>
              </button>
            </div>

            <label className="mt-8 block border-b border-white/15 pb-4">
              <span className="sr-only">Rechercher une création</span>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Un nom, une pierre, une matière…"
                className="w-full bg-transparent font-lux text-2xl font-light text-a-ivory placeholder:text-a-ivory/25 focus:outline-none sm:text-3xl"
              />
            </label>

            <p className="mt-6 font-ui text-[8px] tracking-[0.3em] text-a-ivory/35 uppercase">
              {query ? `${results.length} résultat${results.length > 1 ? "s" : ""}` : "Suggestions"}
            </p>

            <ul className="mt-4 divide-y divide-white/8 overflow-y-auto">
              {results.map((p) => (
                <li key={p.slug}>
                  <a
                    href={productPath(p.slug)}
                    onClick={() => setOpenSearch(false)}
                    className="group flex items-center gap-4 py-4 transition-colors hover:bg-white/[0.03]"
                  >
                    <img src={p.image} alt="" className="h-16 w-14 object-cover" style={{ objectPosition: p.focus ?? "50% 50%" }} />
                    <div className="flex-1">
                      <p className="font-lux text-lg font-light text-a-ivory">{p.name}</p>
                      <p className="font-ui text-[8px] tracking-[0.2em] text-a-ivory/40 uppercase">
                        {STONES[p.stone].name} · {METALS[p.metal].short}
                      </p>
                    </div>
                    <span className="font-ui text-[10.5px] text-a-ivory/60">{formatPrice(p.price)}</span>
                  </a>
                </li>
              ))}
              {results.length === 0 && (
                <li className="py-10 text-center">
                  <p className="font-lux text-xl font-light text-a-ivory">Aucune création trouvée.</p>
                  <p className="mt-2 font-ui text-[10px] text-a-ivory/45">
                    Essayez « rubis », « alliance » ou « platine ».
                  </p>
                </li>
              )}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
