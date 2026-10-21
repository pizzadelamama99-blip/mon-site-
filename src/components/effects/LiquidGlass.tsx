import type { ReactNode, CSSProperties, HTMLAttributes } from "react";

/**
 * Effet 3 — Liquid Glass JS : verre liquide façon Apple
 * Repo: https://github.com/dashersw/liquid-glass-js
 * Demo: https://dashersw.github.io/liquid-glass-js/
 *
 * Installation d'origine (vanilla):
 * <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
 * + container.js + button.js
 * 
 * Ici on WRAPPE l'effet en React pour éviter html2canvas + WebGL2 full-capture,
 * et on reproduit fidèlement le rendu Apple avec :
 * - backdrop-filter blur (Blur 1→15)
 * - réfraction simulée via gradient + inner shadow
 * - tintOpacity (0→1) pour la teinte
 * - edgeIntensity via border + highlight
 * 
 * Les réglages correspondent aux sliders de la démo.
 */

type LiquidGlassProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  // Réglages mappés à la démo
  blur?: number; // 1..15
  tintOpacity?: number; // 0..1
  edgeIntensity?: number; // 0..0.1 -> converti en border opacity
  variant?: "card" | "pill" | "circle";
  radius?: number;
  /** "light" sur fond clair, "dark" sur fond sombre */
  tone?: "light" | "dark";
  // pour le wrapper vanilla on expose data-attrs
  interactive?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export default function LiquidGlass({
  children,
  className = "",
  style,
  blur = 12,
  tintOpacity = 0.18,
  edgeIntensity = 0.06,
  variant = "card",
  radius,
  tone = "light",
  interactive = true,
  ...rest
}: LiquidGlassProps) {
  const r =
    radius ??
    (variant === "pill" ? 9999 : variant === "circle" ? 9999 : 24);

  const borderOpacity = Math.min(0.9, 0.18 + edgeIntensity * 8);
  const isDark = tone === "dark";
  // Base teintée : verre clair sur fond clair, verre fumé sur fond sombre
  const baseTop = isDark
    ? `rgba(255,255,255,${0.16 * tintOpacity + 0.05})`
    : `rgba(255,255,255,${0.72 * tintOpacity + 0.16})`;
  const baseBottom = isDark
    ? `rgba(18,28,122,${0.55 * tintOpacity + 0.22})`
    : `rgba(253,249,238,${0.9 * tintOpacity + 0.08})`;
  const edge = isDark
    ? `rgba(255,255,255,${Math.min(0.6, 0.12 + edgeIntensity * 6)})`
    : `rgba(27,42,181,${borderOpacity})`;

  return (
    <div
      {...rest}
      className={`relative isolate overflow-hidden ${interactive ? "transition-all duration-300 hover:-translate-y-0.5" : ""} ${className}`}
      style={
        {
          borderRadius: r,
          backdropFilter: `blur(${blur}px) saturate(1.35)`,
          WebkitBackdropFilter: `blur(${blur}px) saturate(1.35)`,
          background: `linear-gradient(180deg, ${baseTop} 0%, ${baseBottom} 100%)`,
          border: `1px solid ${edge}`,
          boxShadow: isDark
            ? `0 18px 40px rgba(0,0,0,0.28), 0 1px 0 rgba(255,255,255,0.25) inset`
            : `0 8px 32px rgba(27,42,181,0.10), 0 1px 0 rgba(255,255,255,0.9) inset, 0 -1px 0 rgba(27,42,181,0.06) inset`,
          ...style,
        } as CSSProperties
      }
    >
      {/* highlight réfraction bord */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: r,
          background: `linear-gradient(110deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 38%, rgba(255,255,255,0) 62%, rgba(255,255,255,0.35) 100%)`,
          opacity: 0.55 + edgeIntensity * 2,
          mixBlendMode: "overlay",
        }}
      />
      {/* tint gradient façon Apple */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: r,
          background: `radial-gradient(120% 90% at 20% 15%, rgba(232,50,143,${0.18 * tintOpacity + 0.04}) 0%, transparent 55%), radial-gradient(100% 80% at 90% 90%, rgba(255,201,60,${0.18 * tintOpacity + 0.04}) 0%, transparent 60%)`,
          opacity: 1,
        }}
      />

      {/* contenu */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Bouton verre — API proche de Button({ text, type, onClick }) du repo
export function LiquidGlassButton({
  children,
  onClick,
  type = "pill",
  blur = 10,
  tintOpacity = 0.22,
  edgeIntensity = 0.05,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "rounded" | "pill" | "circle";
  blur?: number;
  tintOpacity?: number;
  edgeIntensity?: number;
  className?: string;
}) {
  const radius = type === "circle" ? 9999 : type === "pill" ? 9999 : 20;

  return (
    <button
      onClick={onClick}
      style={
        {
          borderRadius: radius,
          backdropFilter: `blur(${blur}px) saturate(1.4)`,
          WebkitBackdropFilter: `blur(${blur}px) saturate(1.4)`,
          background: `linear-gradient(180deg, rgba(255,255,255,${0.55 + tintOpacity * 0.4}) 0%, rgba(253,249,238,${0.5 + tintOpacity * 0.38}) 100%)`,
          border: `1.5px solid rgba(27,42,181,${0.2 + edgeIntensity * 5})`,
          boxShadow: `0 6px 20px rgba(27,42,181,0.12), 0 1px 0 rgba(255,255,255,1) inset`,
        } as CSSProperties
      }
      className={`relative isolate inline-flex items-center justify-center overflow-hidden px-6 py-3 font-bold text-ink transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(27,42,181,0.16)] active:translate-y-0 ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: radius,
          background:
            "linear-gradient(115deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 42%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.55) 100%)",
          opacity: 0.7,
        }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}

// Container façon Container.addChild() — pour grouper des glass elements
export function LiquidGlassContainer({
  children,
  className = "",
  blur = 14,
  tintOpacity = 0.16,
}: {
  children: ReactNode;
  className?: string;
  blur?: number;
  tintOpacity?: number;
}) {
  return (
    <LiquidGlass
      blur={blur}
      tintOpacity={tintOpacity}
      variant="card"
      radius={28}
      className={`p-2 ${className}`}
    >
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </LiquidGlass>
  );
}
