import { Component, type ErrorInfo, type ReactNode } from "react";

/**
 * Filet de sécurité pour les effets WebGL.
 * Si un shader échoue (pilote graphique, WebGL désactivé, mémoire GPU saturée),
 * on affiche un fallback statique élégant plutôt qu'une page blanche.
 */
export default class ShaderBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // On reste silencieux pour l'utilisateur, mais on trace pour le diagnostic.
    console.warn("[Aurelis] effet WebGL indisponible :", error.message, info.componentStack);
  }

  render() {
    if (this.state.failed) {
      return (
        this.props.fallback ?? (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-luxe text-2xl font-light tracking-[0.32em] text-j-gold-light">
              AURELIS
            </span>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
