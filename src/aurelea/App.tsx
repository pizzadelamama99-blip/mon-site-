import { useEffect } from "react";
import { StoreProvider } from "./store";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Collections from "./components/Collections";
import Featured from "./components/Featured";
import Editorial from "./components/Editorial";
import Craft from "./components/Craft";
import Catalog from "./components/Catalog";
import ProductPage from "./components/ProductPage";
import Maison from "./components/Maison";
import Footer, { Appointment, Newsletter } from "./components/Footer";
import { CartDrawer, FavoritesPanel, SearchOverlay } from "./components/Drawers";
import { BRAND } from "./config";

/**
 * Routes (hash) :
 *   #/                     accueil
 *   #/catalogue            catalogue complet (filtres, tri, recherche)
 *   #/creation/:slug       fiche produit immersive
 *   #/maison               la maison
 *   #/fruizz               démo soda (gérée dans main.tsx)
 */
function Route({ path }: { path: string }) {
  const clean = path.replace(/^\/+/, "").replace(/\/+$/, "");
  const [segment, slug] = clean.split("/");

  if (segment === "creation" && slug) return <ProductPage slug={slug} />;
  if (segment === "catalogue") return <Catalog full />;
  if (segment === "maison") return <Maison />;

  return (
    <>
      <Hero />
      <Collections />
      <Featured />
      <Editorial />
      <Craft />
      <Catalog />
      <Appointment />
      <Newsletter />
    </>
  );
}

export default function AureleaApp({ path }: { path: string }) {
  // Les ancres de section (#collections…) arrivent ici sous forme de chemin :
  // on laisse le navigateur faire défiler, sans casser le routeur.
  useEffect(() => {
    if (path.startsWith("/") || !path) return;
    const el = document.getElementById(path);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [path]);

  return (
    <StoreProvider>
      <div className="aurelea-root aurelea-grain relative min-h-screen overflow-x-hidden">
        <a
          href="#collections"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:border focus:border-a-champagne focus:bg-a-obsidian focus:px-5 focus:py-3 focus:font-ui focus:text-[9px] focus:tracking-[0.3em] focus:text-a-champagne focus:uppercase"
        >
          Aller au contenu
        </a>

        <Header />

        <Route path={path} />

        <Footer />

        <CartDrawer />
        <FavoritesPanel />
        <SearchOverlay />

        <p className="sr-only">{BRAND.fullName} — démonstration de site de haute joaillerie.</p>
      </div>
    </StoreProvider>
  );
}
