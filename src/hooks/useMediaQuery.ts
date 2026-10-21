import { useEffect, useState } from "react";

/**
 * Petit hook utilitaire basé sur matchMedia.
 * Sert à alléger les effets WebGL sur mobile / si "réduire les animations".
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** true si l'utilisateur préfère moins d'animations (accessibilité). */
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** true sur petit écran (mobile). */
export function useIsMobile() {
  return useMediaQuery("(max-width: 767px)");
}
