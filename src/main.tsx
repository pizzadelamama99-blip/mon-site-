import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SodaApp from "./App";
import AureleaApp from "./aurelea/App";

/**
 * Deux démonstrations cohabitent dans le même build :
 *   /                    → Auréléa Atelier, haute joaillerie (par défaut)
 *   #/fruizz             → FRUIZZ, concept soda (démo précédente)
 *
 * Routage par hash : aucune règle de rewrite serveur n'est nécessaire.
 * Les ancres de section (#collections, #atelier…) restent gérées par le
 * navigateur : seuls les chemins commençant par « / » sont des routes.
 */
function useHash() {
  const [hash, setHash] = useState(() =>
    typeof window === "undefined" ? "" : window.location.hash.replace(/^#/, ""),
  );

  useEffect(() => {
    const onHash = () => {
      const next = window.location.hash.replace(/^#/, "");
      setHash(next);
      if (!next.startsWith("/")) {
        // Ancre de section : on laisse le navigateur défiler, on remonte juste.
        if (!next) window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return hash;
}

function Root() {
  const hash = useHash();
  const isSoda = hash.startsWith("/fruizz");

  useEffect(() => {
    document.body.style.backgroundColor = isSoda ? "#ddf3a5" : "#080809";
    document.documentElement.style.backgroundColor = isSoda ? "#ddf3a5" : "#080809";
  }, [isSoda]);

  if (isSoda) return <SodaApp />;
  return <AureleaApp path={hash || "/"} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
