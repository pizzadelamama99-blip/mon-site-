import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  COLLECTIONS,
  METALS,
  PRODUCTS,
  STONES,
  formatPrice,
  productPath,
  type CategoryId,
  type MetalId,
  type Product,
  type StoneId,
} from "../data";
import { useStore } from "../store";
import { Eyebrow, LuxButton, Reveal, TextLink } from "./ui";

/* ------------------------------------------------------------------ */
/* Cœur (favori)                                                      */
/* ------------------------------------------------------------------ */
function HeartButton({ slug, className = "" }: { slug: string; className?: string }) {
  const { isFavorite, toggleFavorite } = useStore();
  const active = isFavorite(slug);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(slug);
      }}
      aria-pressed={active}
      aria-label={active ? "Retirer des favoris" : "Ajouter aux favoris"}
      className={`flex h-9 w-9 items-center justify-center border transition-colors duration-300 ${
        active
          ? "border-a-champagne bg-a-champagne text-a-obsidian"
          : "border-white/20 bg-a-obsidian/40 text-a-ivory/70 hover:border-a-champagne hover:text-a-champagne"
      } ${className}`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.3" aria-hidden>
        <path d="M12 20s-7.5-4.7-7.5-9.4A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 7.5 3C19.5 15.3 12 20 12 20Z" />
      </svg>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Carte produit                                                      */
/* ------------------------------------------------------------------ */
export function ProductCard({
  product,
  onQuickView,
  compact = false,
}: {
  product: Product;
  onQuickView?: (p: Product) => void;
  compact?: boolean;
}) {
  const { add } = useStore();

  return (
    <article className="group relative">
      <div className="relative overflow-hidden bg-a-velvet">
        <a href={productPath(product.slug)} className="block" aria-label={`Voir ${product.name}`}>
          <img
            src={product.image}
            alt={`${product.name} — ${product.tagline}`}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: product.focus ?? "50% 50%" }}
            className={`w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06] ${
              compact ? "aspect-[4/3]" : "aspect-[4/5]"
            }`}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-a-obsidian/70 via-transparent to-transparent opacity-70" />
        </a>

        {!product.available && (
          <span className="absolute top-3 left-3 border border-white/25 bg-a-obsidian/60 px-2.5 py-1 font-ui text-[7.5px] tracking-[0.24em] text-a-ivory/70 uppercase backdrop-blur-sm">
            Sur commande
          </span>
        )}

        <div className="absolute top-3 right-3 z-10">
          <HeartButton slug={product.slug} />
        </div>

        {/* Actions au survol — hors du lien, pour ne pas imbriquer d'interactif */}
        <div className="absolute inset-x-3 bottom-3 flex translate-y-3 gap-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 focus-within:translate-y-0 focus-within:opacity-100">
          {onQuickView && (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="flex-1 border border-white/25 bg-a-obsidian/70 px-3 py-2.5 font-ui text-[8px] tracking-[0.24em] text-a-ivory uppercase backdrop-blur-md transition-colors hover:border-a-champagne hover:text-a-champagne"
            >
              Aperçu rapide
            </button>
          )}
          <button
            type="button"
            onClick={() => add({ slug: product.slug, metal: product.metal, size: product.sizes?.[2] })}
            className="flex-1 border border-a-champagne/60 bg-a-champagne px-3 py-2.5 font-ui text-[8px] tracking-[0.24em] text-a-obsidian uppercase transition-colors hover:bg-a-ivory"
          >
            Ajouter
          </button>
        </div>
      </div>

      <div className="pt-4">
        <p className="font-ui text-[7.5px] tracking-[0.3em] text-a-champagne/80 uppercase">
          {STONES[product.stone].name} · {METALS[product.metal].short}
        </p>
        <div className="mt-1.5 flex items-baseline justify-between gap-4">
          <h3 className="font-lux text-[19px] leading-tight font-light text-a-ivory">
            <a href={productPath(product.slug)} className="transition-colors hover:text-a-champagne">
              {product.name}
            </a>
          </h3>
          <p className="shrink-0 font-ui text-[11.5px] text-a-ivory/85">{formatPrice(product.price)}</p>
        </div>
        <p className="mt-1 font-ui text-[10px] leading-relaxed text-a-ivory/45">{product.tagline}</p>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Aperçu rapide                                                      */
/* ------------------------------------------------------------------ */
export function QuickView({ product, onClose }: { product: Product; onClose: () => void }) {
  const { add } = useStore();
  const [metal, setMetal] = useState<MetalId>(product.metal);
  const [size, setSize] = useState<number | undefined>(product.sizes?.[2]);
  const price = product.price + METALS[metal].delta;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] flex items-end justify-center bg-a-obsidian/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Aperçu de ${product.name}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative grid w-full max-w-4xl grid-cols-1 bg-a-velvet sm:grid-cols-2"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer l'aperçu"
            className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center border border-white/20 bg-a-obsidian/60 text-a-ivory backdrop-blur-sm transition-colors hover:border-a-champagne hover:text-a-champagne"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
              <path d="m5 5 14 14M19 5 5 19" />
            </svg>
          </button>

          <img
            src={product.image}
            alt={product.name}
            style={{ objectPosition: product.focus ?? "50% 50%" }}
            className="h-64 w-full object-cover sm:h-full"
          />

          <div className="p-6 sm:p-8">
            <p className="font-ui text-[8px] tracking-[0.32em] text-a-champagne uppercase">
              {product.carat ?? STONES[product.stone].name}
            </p>
            <h3 className="mt-3 font-lux text-3xl font-light text-a-ivory">{product.name}</h3>
            <p className="mt-3 font-ui text-[11px] leading-[1.95] font-light text-a-ivory/55">
              {product.tagline} — {product.description.split(".")[0]}.
            </p>
            <p className="mt-5 font-lux text-2xl font-light text-a-ivory">{formatPrice(price)}</p>

            <div className="mt-6">
              <p className="mb-2 font-ui text-[8px] tracking-[0.28em] text-a-ivory/40 uppercase">Matière</p>
              <div className="flex flex-wrap gap-2">
                {product.metals.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMetal(m)}
                    aria-pressed={metal === m}
                    className={`border px-3 py-2 font-ui text-[8.5px] tracking-[0.18em] uppercase transition-colors ${
                      metal === m
                        ? "border-a-champagne text-a-champagne"
                        : "border-white/15 text-a-ivory/55 hover:border-white/40"
                    }`}
                  >
                    {METALS[m].short}
                  </button>
                ))}
              </div>
            </div>

            {product.sizes && (
              <div className="mt-5">
                <p className="mb-2 font-ui text-[8px] tracking-[0.28em] text-a-ivory/40 uppercase">
                  Taille
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      aria-pressed={size === s}
                      className={`h-9 w-9 border font-ui text-[10px] transition-colors ${
                        size === s
                          ? "border-a-champagne text-a-champagne"
                          : "border-white/15 text-a-ivory/55 hover:border-white/40"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-7 flex flex-col gap-3">
              <LuxButton onClick={() => add({ slug: product.slug, metal, size })} variant="solid">
                Ajouter au panier
              </LuxButton>
              <TextLink href={productPath(product.slug)} className="justify-center text-a-ivory/60">
                Voir la fiche complète
              </TextLink>
            </div>
            <p className="mt-4 font-ui text-[8px] tracking-[0.2em] text-a-ivory/30 uppercase">
              Démonstration — paiement non activé
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Catalogue                                                          */
/* ------------------------------------------------------------------ */
const CATEGORIES: CategoryId[] = ["Bagues", "Fiançailles", "Alliances", "Colliers", "Bracelets", "Boucles"];
const STONE_IDS = Object.keys(STONES) as StoneId[];
const METAL_IDS = Object.keys(METALS) as MetalId[];

export default function Catalog({ full = false }: { full?: boolean }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | "">("");
  const [stone, setStone] = useState<StoneId | "">("");
  const [metal, setMetal] = useState<MetalId | "">("");
  const [collection, setCollection] = useState("");
  const [sort, setSort] = useState<"prix-asc" | "prix-desc" | "nom">("prix-asc");
  const [quick, setQuick] = useState<Product | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = PRODUCTS.filter((p) => {
      if (category && p.category !== category) return false;
      if (stone && p.stone !== stone) return false;
      if (metal && !p.metals.includes(metal)) return false;
      if (collection && p.collection !== collection) return false;
      if (q) {
        const hay = `${p.name} ${p.tagline} ${p.description} ${p.carat ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    return list.sort((a, b) =>
      sort === "prix-asc" ? a.price - b.price : sort === "prix-desc" ? b.price - a.price : a.name.localeCompare(b.name),
    );
  }, [query, category, stone, metal, collection, sort]);

  // La même grille sert l'accueil (h2) et la page catalogue (h1) : un seul
  // titre de niveau 1 par page, sans dupliquer le composant.
  const Heading = full ? "h1" : "h2";

  // Sur l'accueil, on ne montre que des pièces disponibles, avec des visuels
  // distincts : quatre vignettes identiques donneraient une impression de faux.
  const displayed = full
    ? results
    : results
        .filter((p) => p.available)
        .filter((p, i, all) => all.findIndex((x) => x.image === p.image) === i)
        .slice(0, 4);

  const reset = () => {
    setQuery("");
    setCategory("");
    setStone("");
    setMetal("");
    setCollection("");
  };

  return (
    <section id={full ? "catalogue" : "creations"} className="relative border-t border-white/8 bg-a-obsidian py-20 sm:py-24">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>{full ? "Le catalogue" : "Les créations"}</Eyebrow>
            <Heading className="mt-5 font-lux text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[1.02] font-light text-a-ivory">
              {full ? "Toutes les pièces" : "Pièces disponibles"}
              <em className="italic text-a-champagne">.</em>
            </Heading>
          </div>
          {!full && (
            <TextLink href="#/catalogue" className="text-a-champagne">
              Voir le catalogue
            </TextLink>
          )}
          {full && (
            <p className="font-ui text-[10px] tracking-[0.22em] text-a-ivory/40 uppercase">
              {results.length} pièce{results.length > 1 ? "s" : ""}
            </p>
          )}
        </Reveal>

        {/* Barre de filtres */}
        {full && (
          <div className="mt-10 border-y border-white/10 py-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <label className="relative flex-1 lg:max-w-xs">
                <span className="sr-only">Rechercher une création</span>
                <svg
                  aria-hidden
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  className="absolute top-1/2 left-0 -translate-y-1/2 text-a-ivory/35"
                >
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="m16 16 4.5 4.5" />
                </svg>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Nom, pierre, matière…"
                  className="w-full border-b border-white/15 bg-transparent py-2 pl-6 font-ui text-[11.5px] text-a-ivory placeholder:text-a-ivory/30 focus:border-a-champagne focus:outline-none"
                />
              </label>

              <div className="flex flex-wrap items-center gap-3">
                <Select label="Catégorie" value={category} onChange={(v) => setCategory(v as CategoryId | "")}>
                  <option value="">Toutes</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
                <Select label="Pierre" value={stone} onChange={(v) => setStone(v as StoneId | "")}>
                  <option value="">Toutes</option>
                  {STONE_IDS.map((s) => (
                    <option key={s} value={s}>
                      {STONES[s].name}
                    </option>
                  ))}
                </Select>
                <Select label="Matière" value={metal} onChange={(v) => setMetal(v as MetalId | "")}>
                  <option value="">Toutes</option>
                  {METAL_IDS.map((m) => (
                    <option key={m} value={m}>
                      {METALS[m].short}
                    </option>
                  ))}
                </Select>
                <Select label="Collection" value={collection} onChange={setCollection}>
                  <option value="">Toutes</option>
                  {COLLECTIONS.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </Select>
                <Select label="Tri" value={sort} onChange={(v) => setSort(v as typeof sort)}>
                  <option value="prix-asc">Prix croissant</option>
                  <option value="prix-desc">Prix décroissant</option>
                  <option value="nom">Nom (A–Z)</option>
                </Select>
                <button
                  type="button"
                  onClick={reset}
                  className="font-ui text-[8.5px] tracking-[0.24em] text-a-ivory/40 uppercase underline-offset-4 transition-colors hover:text-a-champagne hover:underline"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Grille */}
        {displayed.length === 0 ? (
          <div className="mt-16 border border-white/10 py-16 text-center">
            <p className="font-lux text-2xl font-light text-a-ivory">Aucune pièce ne correspond.</p>
            <p className="mt-3 font-ui text-[10.5px] text-a-ivory/45">
              Essayez une autre pierre, ou réinitialisez les filtres.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 border border-a-champagne/50 px-6 py-3 font-ui text-[8.5px] tracking-[0.26em] text-a-champagne uppercase transition-colors hover:bg-a-champagne hover:text-a-obsidian"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {displayed.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 0.05}>
                <ProductCard product={p} onQuickView={setQuick} />
              </Reveal>
            ))}
          </div>
        )}

        {!full && (
          <Reveal className="mt-12 flex justify-center">
            <LuxButton href="#/catalogue">Voir les {PRODUCTS.length} créations</LuxButton>
          </Reveal>
        )}
      </div>

      {quick && <QuickView product={quick} onClose={() => setQuick(null)} />}
    </section>
  );
}

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      {/* Le nom du filtre reste visible : cinq menus « Toutes » identiques
          seraient indéchiffrables. */}
      <span className="font-ui text-[7.5px] tracking-[0.3em] text-a-ivory/35 uppercase">{label}</span>
      <span className="relative block">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none border border-white/15 bg-transparent py-2 pr-8 pl-3 font-ui text-[9px] tracking-[0.18em] text-a-ivory/75 uppercase transition-colors hover:border-white/35 focus:border-a-champagne focus:outline-none [&>option]:bg-a-velvet [&>option]:text-a-ivory"
        >
          {children}
        </select>
        <span aria-hidden className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-[8px] text-a-ivory/40">
          ▾
        </span>
      </span>
    </label>
  );
}
