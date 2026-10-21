import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* ---------- Micro-libellé doré (sur-titre) ---------- */
export function Micro({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-jost text-[10px] font-medium tracking-[0.42em] text-j-gold uppercase sm:text-[11px] ${className}`}
    >
      {children}
    </span>
  );
}

/* ---------- Filet doré ---------- */
export function Hairline({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`block h-px w-full bg-gradient-to-r from-transparent via-j-gold/45 to-transparent ${className}`}
    />
  );
}

/* ---------- Bouton principal : or plein ---------- */
export function GoldButton({
  children,
  href,
  onClick,
  className = "",
  full = false,
  type = "button",
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  full?: boolean;
  type?: "button" | "submit" | "reset";
}) {
  const cls = `group relative inline-flex items-center justify-center overflow-hidden border border-j-gold bg-j-gold px-8 py-3.5 font-jost text-[11px] font-medium tracking-[0.28em] text-j-noir uppercase transition-all duration-500 hover:bg-j-gold-light ${
    full ? "w-full" : ""
  } ${className}`;

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-[900ms] group-hover:translate-x-full"
      />
    </>
  );

  if (href) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

/* ---------- Bouton secondaire : contour ---------- */
export function OutlineButton({
  children,
  href,
  onClick,
  className = "",
  light = false,
  full = false,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  light?: boolean;
  full?: boolean;
}) {
  const cls = `inline-flex items-center justify-center border px-8 py-3.5 font-jost text-[11px] font-medium tracking-[0.28em] uppercase transition-colors duration-500 ${
    light
      ? "border-j-noir/30 text-j-noir hover:border-j-noir hover:bg-j-noir hover:text-j-ivory"
      : "border-white/25 text-j-ivory hover:border-j-gold hover:text-j-gold"
  } ${full ? "w-full" : ""} ${className}`;

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

/* ---------- Lien souligné doré ---------- */
export function GoldLink({
  children,
  href = "#",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2 font-jost text-[11px] font-medium tracking-[0.28em] text-j-ivory uppercase transition-colors hover:text-j-gold ${className}`}
    >
      <span className="border-b border-j-gold/40 pb-1 transition-colors group-hover:border-j-gold">
        {children}
      </span>
      <span aria-hidden className="text-j-gold">
        —
      </span>
    </a>
  );
}

/* ---------- Apparition au défilement ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-70px" });
  // Filet de sécurité : si l'IntersectionObserver rate un défilement rapide
  // (saut d'ancre, retour arrière), la géométrie prend le relais au scroll.
  const [near, setNear] = useState(false);

  useEffect(() => {
    if (inView || near) return;
    const check = () => {
      const r = ref.current?.getBoundingClientRect();
      if (r && r.top < window.innerHeight - 70 && r.bottom > 0) setNear(true);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [inView, near]);

  const visible = inView || near;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : y }}
      transition={{ duration: 1, delay: visible ? delay : 0, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
