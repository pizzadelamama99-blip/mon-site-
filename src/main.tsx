import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SodaApp from "./App";
import AurelisApp from "./site/App";

/**
 * Deux démonstrations cohabitent dans le même build :
 *   /            → Maison Aurelis, haute joaillerie (par défaut)
 *   #/fruizz     → FRUIZZ, concept soda (démo précédente)
 *
 * Routage par hash : fonctionne aussi bien en développement que sur un
 * hébergement statique (aucune règle de rewrite serveur nécessaire).
 */
function useHashRoute() {
  const [hash, setHash] = useState(() =>
    typeof window === "undefined" ? "" : window.location.hash,
  );

  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const isSoda = hash.startsWith("#/fruizz");

  // Le fond du document suit la charte de la démo affichée.
  useEffect(() => {
    document.body.style.backgroundColor = isSoda ? "#ddf3a5" : "#070708";
    document.documentElement.style.backgroundColor = isSoda
      ? "#ddf3a5"
      : "#070708";
  }, [isSoda]);

  return isSoda;
}

// Exposé pour l'export « Télécharger le site » (voir DownloadSiteButton).
if (typeof window !== "undefined") {
  // @ts-expect-error — propriété globale volontaire
  window.__getSiteHtml = () => document.documentElement.outerHTML;
}

function Root() {
  const isSoda = useHashRoute();
  return <>{isSoda ? <SodaApp /> : <AurelisApp />}</>;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
