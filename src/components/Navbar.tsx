import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import LiquidGlass from "./effects/LiquidGlass";

const links = [
  { href: "#saveurs", label: "Saveurs" },
  { href: "#histoire", label: "Notre histoire" },
  { href: "#labo", label: "Labo 3D" },
  { href: "#boutique", label: "Boutique" },
];

export default function Navbar() {
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Barre en verre liquide (effet Liquid Glass) */}
        <LiquidGlass
          variant="pill"
          radius={9999}
          blur={14}
          tintOpacity={0.2}
          edgeIntensity={0.05}
          interactive={false}
          className="px-3 py-2 sm:px-5"
        >
          <nav className="relative flex items-center justify-between">
            {/* Desktop links */}
            <div className="hidden items-center gap-1 md:flex">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-full px-3.5 py-1.5 text-sm font-semibold text-ink transition hover:bg-ink hover:text-lime-soda"
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Burger mobile */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {menuOpen ? (
                  <path d="M3 3l12 12M15 3L3 15" />
                ) : (
                  <path d="M2 4.5h14M2 9h14M2 13.5h14" />
                )}
              </svg>
            </button>

            {/* Logo */}
            <a
              href="#top"
              className="absolute left-1/2 -translate-x-1/2 font-display text-2xl tracking-wide text-fuchsia-soda drop-shadow-[2px_2px_0_rgba(27,42,181,0.9)] transition hover:rotate-2 sm:text-3xl"
            >
              FRUIZZ
            </a>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative flex h-10 items-center gap-2 rounded-full border-2 border-ink bg-ink px-4 text-sm font-bold text-lime-soda transition hover:-translate-y-0.5 hover:bg-fuchsia-soda hover:text-white"
              aria-label="Ouvrir le panier"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 2h2l1.6 8.5a1 1 0 0 0 1 .8h5.9a1 1 0 0 0 1-.8L14.8 5H4.4" />
                <circle cx="6.5" cy="13.5" r="1" />
                <circle cx="11.5" cy="13.5" r="1" />
              </svg>
              <span className="hidden sm:inline">Panier</span>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-fuchsia-soda px-1 text-[11px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>
          </nav>
        </LiquidGlass>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden md:hidden"
            >
              <div className="mt-2 flex flex-col gap-2 rounded-3xl border border-ink/10 bg-cream/90 p-3 shadow-[0_10px_30px_rgba(27,42,181,0.12)] backdrop-blur-xl">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl bg-white/70 px-4 py-3 font-semibold text-ink transition hover:bg-ink hover:text-lime-soda"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
