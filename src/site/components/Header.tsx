import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useCoffret } from "../context/CoffretContext";
import LiquidGlass from "../../components/effects/LiquidGlass";

const links = [
  { href: "#collections", label: "Collections" },
  { href: "#diamant", label: "Le diamant" },
  { href: "#creations", label: "Créations" },
  { href: "#maison", label: "La maison" },
  { href: "#rendez-vous", label: "Rendez-vous" },
];

export default function Header() {
  const { count, open } = useCoffret();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 40));
    return () => unsub();
  }, [scrollY]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Échap ferme le menu plein écran
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      {/* Bandeau de service */}
      <div className="relative z-50 border-b border-white/10 bg-j-noir">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-2.5 sm:px-8">
          <p className="max-w-[62%] font-jost text-[8px] leading-relaxed tracking-[0.22em] text-j-ivory-dim uppercase sm:max-w-none sm:text-[10px] sm:tracking-[0.3em]">
            Écrin signature & livraison assurée offerts
          </p>
          <div className="hidden items-center gap-6 sm:flex">
            <a
              href="#rendez-vous"
              className="font-jost text-[9px] tracking-[0.3em] text-j-ivory-dim uppercase transition-colors hover:text-j-gold sm:text-[10px]"
            >
              Conciergerie
            </a>
            <span aria-hidden className="h-3 w-px bg-white/15" />
            <span className="font-jost text-[9px] tracking-[0.3em] text-j-gold uppercase sm:text-[10px]">
              FR · EUR
            </span>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-700 ${
          scrolled
            ? "border-b border-white/10 bg-j-noir/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 transition-all duration-700 sm:px-8 ${
            scrolled ? "py-4" : "py-6"
          }`}
        >
          {/* Navigation gauche (desktop) */}
          <nav className="hidden flex-1 items-center gap-8 lg:flex">
            {links.slice(0, 3).map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative font-jost text-[10px] font-medium tracking-[0.3em] text-j-ivory/80 uppercase transition-colors hover:text-j-gold"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-j-gold transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Burger mobile */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span className="h-px w-6 bg-j-ivory" />
            <span className="h-px w-6 bg-j-ivory" />
            <span className="h-px w-4 bg-j-gold" />
          </button>

          {/* Logotype */}
          <a
            href="#top"
            className="flex flex-1 flex-col items-center justify-center lg:flex-none"
          >
            <span className="font-luxe text-[21px] leading-none font-light tracking-[0.3em] text-j-ivory sm:text-[26px] sm:tracking-[0.34em]">
              AURELIS
            </span>
            <span className="mt-1.5 hidden font-jost text-[7px] tracking-[0.5em] whitespace-nowrap text-j-gold uppercase min-[380px]:block sm:text-[8px] sm:tracking-[0.55em]">
              Haute Joaillerie · Paris
            </span>
          </a>

          {/* Actions droite */}
          <div className="flex flex-1 items-center justify-end gap-5 sm:gap-7">
            <a
              href="#creations"
              aria-label="Rechercher"
              className="hidden transition-colors hover:text-j-gold sm:block"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.1"
              >
                <circle cx="8.5" cy="8.5" r="6" />
                <path d="M13 13l4.5 4.5" strokeLinecap="round" />
              </svg>
            </a>
            <a
              href="#rendez-vous"
              className="hidden font-jost text-[10px] tracking-[0.3em] text-j-ivory/80 uppercase transition-colors hover:text-j-gold lg:block"
            >
              Prendre rendez-vous
            </a>
            <button
              onClick={open}
              aria-label="Ouvrir mon coffret"
              className="relative flex items-center gap-2 font-jost text-[10px] tracking-[0.24em] text-j-ivory uppercase transition-colors hover:text-j-gold"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.1"
              >
                <path d="M3 6.5h14l-1 11H4l-1-11Z" />
                <path d="M7 6.5V4.8a3 3 0 0 1 6 0v1.7" strokeLinecap="round" />
              </svg>
              <span className="hidden sm:inline">Coffret</span>
              {count > 0 && (
                <span className="flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-j-gold px-1 text-[9px] font-semibold tracking-normal text-j-noir">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile plein écran */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-j-noir/97 backdrop-blur-2xl"
          >
            <div className="flex h-full flex-col px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="font-luxe text-xl tracking-[0.3em] text-j-ivory">
                  AURELIS
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Fermer le menu"
                  className="flex h-10 w-10 items-center justify-center text-j-ivory"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.1"
                  >
                    <path d="M3 3l14 14M17 3L3 17" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <nav className="mt-16 flex flex-col gap-1">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * i + 0.1, duration: 0.5 }}
                    className="border-b border-white/10 py-5 font-luxe text-3xl font-light text-j-ivory"
                  >
                    {l.label}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto">
                <LiquidGlass
                  tone="dark"
                  blur={14}
                  tintOpacity={0.25}
                  edgeIntensity={0.06}
                  interactive={false}
                  className="p-5"
                  radius={2}
                >
                  <p className="font-jost text-[9px] tracking-[0.35em] text-j-gold uppercase">
                    Conciergerie
                  </p>
                  <p className="mt-2 font-luxe text-xl text-j-ivory">
                    Prendre rendez-vous en boutique
                  </p>
                  <a
                    href="#rendez-vous"
                    onClick={() => setMenuOpen(false)}
                    className="mt-4 inline-block border-b border-j-gold/50 pb-1 font-jost text-[10px] tracking-[0.3em] text-j-ivory uppercase"
                  >
                    12, place Vendôme, Paris
                  </a>
                </LiquidGlass>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
