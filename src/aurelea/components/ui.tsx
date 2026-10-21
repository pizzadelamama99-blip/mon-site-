import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/* Micro-libellé : filet doré + intitulé en petites capitales.         */
/* ------------------------------------------------------------------ */
export function Eyebrow({
  children,
  className = "",
  tone = "gold",
}: {
  children: ReactNode;
  className?: string;
  tone?: "gold" | "dark" | "light";
}) {
  const color =
    tone === "dark" ? "text-a-obsidian/55" : tone === "light" ? "text-a-ivory/60" : "text-a-champagne";
  return (
    <span className={`flex items-center gap-3 font-ui text-[9px] tracking-[0.36em] uppercase ${color} ${className}`}>
      <span aria-hidden className="h-px w-8 bg-current opacity-60" />
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Bouton principal — contour or, remplissage au survol.               */
/* ------------------------------------------------------------------ */
export function LuxButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "outline",
  className = "",
  disabled,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "outline" | "solid" | "light";
  className?: string;
  disabled?: boolean;
}) {
  const base =
    "group inline-flex items-center justify-center gap-3 px-8 py-4 font-ui text-[9.5px] tracking-[0.3em] uppercase transition-all duration-500 disabled:cursor-not-allowed disabled:opacity-50";
  const skin =
    variant === "solid"
      ? "bg-a-champagne text-a-obsidian hover:bg-a-ivory"
      : variant === "light"
        ? "bg-a-ivory text-a-obsidian hover:bg-a-champagne"
        : "border border-a-champagne/60 text-a-champagne hover:border-a-champagne hover:bg-a-champagne hover:text-a-obsidian";

  if (href) {
    return (
      <a href={href} className={`${base} ${skin} ${className}`} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${skin} ${className}`}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Lien souligné, animation de filet.                                  */
/* ------------------------------------------------------------------ */
export function TextLink({
  children,
  href,
  onClick,
  className = "",
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const cls = `group relative inline-flex items-center gap-2 font-ui text-[9.5px] tracking-[0.3em] uppercase ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
        —
      </span>
      <span
        aria-hidden
        className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 group-hover:scale-x-100"
      />
    </>
  );
  return href ? (
    <a href={href} className={cls} onClick={onClick}>
      {inner}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Apparition au défilement (IntersectionObserver + repli géométrique) */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  y = 22,
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
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight - 60 && r.bottom > 0) setShown(true);
    };
    check();
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          if (once) io.disconnect();
        }
      },
      { rootMargin: "-60px" },
    );
    io.observe(el);
    window.addEventListener("scroll", check, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", check);
    };
  }, [once, shown]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : y }}
      transition={{ duration: 0.9, delay: shown ? delay : 0, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Champ de formulaire                                                 */
/* ------------------------------------------------------------------ */
export function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  as = "input",
  value,
  onChange,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  as?: "input" | "textarea" | "select";
  value?: string;
  onChange?: (v: string) => void;
  className?: string;
}) {
  const shared =
    "w-full border-b border-white/15 bg-transparent py-3 font-ui text-[12px] text-a-ivory placeholder:text-a-ivory/25 focus:border-a-champagne focus:outline-none transition-colors";
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block font-ui text-[8px] tracking-[0.3em] text-a-ivory/40 uppercase">
        {label}
        {required ? " *" : ""}
      </span>
      {as === "textarea" ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          rows={3}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={`${shared} resize-none`}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={shared}
        />
      )}
    </label>
  );
}
