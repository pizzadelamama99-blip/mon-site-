import { lazy, Suspense, useState } from "react";
import { motion } from "framer-motion";
import {
  METALS,
  PRODUCTS,
  STONES,
  formatPrice,
  getCollection,
  getProduct,
  type MetalId,
} from "../data";
import { useStore } from "../store";
import { useWebgl } from "../hooks";
import { Eyebrow, LuxButton, TextLink } from "./ui";
import { ProductCard } from "./Catalog";
import type { ViewPreset } from "../three/Viewer";

const JewelryViewer = lazy(() => import("../three/Viewer"));
const VIEWS: { id: ViewPreset; label: string }[] = [
  { id: "face", label: "Face" },
  { id: "trois-quarts", label: "Trois-quarts" },
  { id: "profil", label: "Profil" },
  { id: "pierre", label: "Pierre" },
  { id: "sertissage", label: "Sertissage" },
];

export default function ProductPage({ slug }: { slug: string }) {
  const product = getProduct(slug);
  const webgl = useWebgl();
  const { add, isFavorite, toggleFavorite } = useStore();

  const [metal, setMetal] = useState<MetalId>(product?.metal ?? "or-champagne");
  const [size, setSize] = useState<number | undefined>(product?.sizes?.[2]);
  const [qty, setQty] = useState(1);
  const [preset, setPreset] = useState<ViewPreset>("trois-quarts");
  const [mode, setMode] = useState<"3d" | "photo">("3d");

  if (!product) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <p className="font-ui text-[9px] tracking-[0.34em] text-a-champagne uppercase">Création introuvable</p>
        <h1 className="mt-5 font-lux text-4xl font-light">Cette pièce n'existe plus.</h1>
        <div className="mt-8">
          <LuxButton href="#/catalogue">Retour au catalogue</LuxButton>
        </div>
      </main>
    );
  }

  const collection = getCollection(product.collection);
  const price = product.price + METALS[metal].delta;
  const show3d = webgl === true && mode === "3d";
  const favorite = isFavorite(product.slug);
  const suggestions = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <main className="bg-a-obsidian pt-28 sm:pt-32">
      {/* Fil d'Ariane */}
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-2 font-ui text-[8px] tracking-[0.26em] text-a-ivory/35 uppercase">
          <a href="#/" className="transition-colors hover:text-a-champagne">Accueil</a>
          <span aria-hidden>/</span>
          <a href="#/catalogue" className="transition-colors hover:text-a-champagne">Catalogue</a>
          <span aria-hidden>/</span>
          <span className="text-a-ivory/60">{product.name}</span>
        </nav>
      </div>

      <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-10 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:py-14">
        {/* Visuel */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-white/8 bg-[radial-gradient(70%_60%_at_50%_45%,#1a191c,#0a0a0b_70%)] sm:aspect-[5/5]">
            {show3d ? (
              <Suspense fallback={null}>
                <JewelryViewer
                  metal={METALS[metal].color}
                  stone={STONES[product.stone].color}
                  shape={product.shape}
                  preset={preset}
                  halo={product.collection === "rubis" || product.slug === "bague-vestale-rose"}
                />
              </Suspense>
            ) : (
              <img
                src={product.image}
                alt={`${product.name} — ${product.tagline}`}
                className="h-full w-full object-cover"
              />
            )}

            {/* Bascule 3D / photo */}
            <div className="absolute top-4 right-4 flex border border-white/15 bg-a-obsidian/60 backdrop-blur-md">
              {(["3d", "photo"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  disabled={m === "3d" && webgl === false}
                  aria-pressed={mode === m}
                  className={`px-3 py-2 font-ui text-[8px] tracking-[0.24em] uppercase transition-colors disabled:opacity-30 ${
                    mode === m ? "bg-a-champagne text-a-obsidian" : "text-a-ivory/60 hover:text-a-ivory"
                  }`}
                >
                  {m === "3d" ? "3D" : "Photo"}
                </button>
              ))}
            </div>

            {show3d && (
              <p className="pointer-events-none absolute bottom-4 left-4 font-ui text-[7.5px] tracking-[0.26em] text-a-ivory/35 uppercase">
                Glissez pour tourner · molette pour zoomer
              </p>
            )}
          </div>

          {/* Angles */}
          {show3d && (
            <div className="mt-3 flex flex-wrap gap-2">
              {VIEWS.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setPreset(v.id)}
                  aria-pressed={preset === v.id}
                  className={`border px-4 py-2 font-ui text-[8px] tracking-[0.24em] uppercase transition-colors ${
                    preset === v.id
                      ? "border-a-champagne text-a-champagne"
                      : "border-white/12 text-a-ivory/45 hover:border-white/35 hover:text-a-ivory/80"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          )}

          {webgl === false && (
            <p className="mt-3 font-ui text-[8.5px] tracking-[0.2em] text-a-ivory/35 uppercase">
              Vue 3D indisponible sur cet appareil — photographie affichée.
            </p>
          )}
        </div>

        {/* Achat */}
        <div className="lg:col-span-5 lg:pl-6">
          <Eyebrow>{collection?.name ?? "Haute joaillerie"}</Eyebrow>
          <h1 className="mt-5 font-lux text-[clamp(2.2rem,4vw,3.3rem)] leading-[1.02] font-light text-a-ivory">
            {product.name}
          </h1>
          <p className="mt-2 font-ui text-[10px] tracking-[0.24em] text-a-ivory/45 uppercase">
            {product.tagline}
          </p>

          <p className="mt-6 font-lux text-[28px] font-light text-a-ivory">{formatPrice(price)}</p>
          <p className="mt-1 font-ui text-[8.5px] tracking-[0.2em] text-a-ivory/35 uppercase">
            TVA incluse · {product.available ? "Pièce disponible" : "Sur commande"}
          </p>

          <p className="mt-7 max-w-md font-ui text-[11.5px] leading-[2.05] font-light text-a-ivory/55">
            {product.description}
          </p>

          {/* Matière */}
          <div className="mt-8">
            <div className="mb-3 flex items-baseline justify-between">
              <p className="font-ui text-[8px] tracking-[0.3em] text-a-ivory/40 uppercase">Matière</p>
              <p className="font-ui text-[9px] text-a-ivory/60">{METALS[metal].name}</p>
            </div>
            <div className="flex gap-2.5">
              {product.metals.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMetal(m)}
                  aria-pressed={metal === m}
                  aria-label={METALS[m].name}
                  className={`h-9 w-9 rounded-full border-2 transition-all ${
                    metal === m ? "border-a-champagne" : "border-white/15 hover:border-white/40"
                  }`}
                  style={{ background: `radial-gradient(circle at 35% 30%, #ffffff55, ${METALS[m].color})` }}
                />
              ))}
            </div>
          </div>

          {/* Taille */}
          {product.sizes && (
            <div className="mt-7">
              <div className="mb-3 flex items-baseline justify-between">
                <p className="font-ui text-[8px] tracking-[0.3em] text-a-ivory/40 uppercase">Taille</p>
                <span className="font-ui text-[8.5px] text-a-ivory/35">Guide des tailles sur demande</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    aria-pressed={size === s}
                    className={`h-10 w-10 border font-ui text-[10.5px] transition-colors ${
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

          {/* Quantité + actions */}
          <div className="mt-8 flex items-stretch gap-3">
            <div className="flex items-center border border-white/15">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Diminuer la quantité"
                className="px-3 py-3 text-a-ivory/60 transition-colors hover:text-a-champagne"
              >
                −
              </button>
              <span aria-live="polite" className="w-8 text-center font-ui text-[11px] text-a-ivory">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(9, q + 1))}
                aria-label="Augmenter la quantité"
                className="px-3 py-3 text-a-ivory/60 transition-colors hover:text-a-champagne"
              >
                +
              </button>
            </div>
            <LuxButton
              variant="solid"
              className="flex-1"
              onClick={() => add({ slug: product.slug, metal, size, qty })}
            >
              Ajouter au panier
            </LuxButton>
            <button
              type="button"
              onClick={() => toggleFavorite(product.slug)}
              aria-pressed={favorite}
              aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
              className={`flex w-12 items-center justify-center border transition-colors ${
                favorite
                  ? "border-a-champagne text-a-champagne"
                  : "border-white/15 text-a-ivory/50 hover:border-a-champagne hover:text-a-champagne"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={favorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.3" aria-hidden>
                <path d="M12 20s-7.5-4.7-7.5-9.4A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 7.5 3C19.5 15.3 12 20 12 20Z" />
              </svg>
            </button>
          </div>

          <p className="mt-4 font-ui text-[8px] tracking-[0.2em] text-a-ivory/30 uppercase">
            Démonstration — aucun paiement n'est demandé
          </p>

          {/* Détails */}
          <div className="mt-9 border-t border-white/10 pt-6">
            <p className="font-ui text-[8px] tracking-[0.3em] text-a-ivory/40 uppercase">
              Caractéristiques
            </p>
            <ul className="mt-4 space-y-2.5">
              {product.details.map((d) => (
                <li key={d} className="flex gap-3 font-ui text-[10.5px] leading-relaxed text-a-ivory/55">
                  <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-a-champagne/60" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
            <div>
              <p className="font-ui text-[8px] tracking-[0.26em] text-a-ivory/35 uppercase">Livraison</p>
              <p className="mt-1.5 font-ui text-[10px] text-a-ivory/60">Assurée, sous 5 jours ouvrés</p>
            </div>
            <div>
              <p className="font-ui text-[8px] tracking-[0.26em] text-a-ivory/35 uppercase">Écrin</p>
              <p className="mt-1.5 font-ui text-[10px] text-a-ivory/60">Cuir pleine fleur, certificat inclus</p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-5">
            <TextLink href="#rendez-vous" className="text-a-ivory/55">
              Essayer en boutique
            </TextLink>
            <TextLink href="#/catalogue" className="text-a-ivory/55">
              Retour au catalogue
            </TextLink>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <section className="border-t border-white/8 py-16 sm:py-20">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
          <div className="flex items-end justify-between">
            <h2 className="font-lux text-2xl font-light text-a-ivory sm:text-3xl">
              À porter avec
            </h2>
            <TextLink href="#/catalogue" className="text-a-champagne">
              Tout voir
            </TextLink>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {suggestions.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.05 }}
              >
                <ProductCard product={p} compact />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
