import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BRAND, NAV } from "../config";
import { useStore } from "../store";

function Icon({ name }: { name: "search" | "heart" | "bag" | "menu" | "close" }) {
  const common = {
    width: 17,
    height: 17,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "search")
    return (
      <svg {...common}>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4.5 4.5" />
      </svg>
    );
  if (name === "heart")
    return (
      <svg {...common}>
        <path d="M12 20s-7.5-4.7-7.5-9.4A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 7.5 3C19.5 15.3 12 20 12 20Z" />
      </svg>
    );
  if (name === "bag")
    return (
      <svg {...common}>
        <path d="M6 8h12l-1 12H7L6 8Z" />
        <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
      </svg>
    );
  if (name === "menu")
    return (
      <svg {...common}>
        <path d="M4 8h16M4 16h16" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="m5 5 14 14M19 5 5 19" />
    </svg>
  );
}

export default function Header() {
  const { count, setOpenCart, setOpenFavorites, setOpenSearch, favorites } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40">
        {/* Bandeau de service */}
        <div className="hidden justify-between border-b border-white/8 bg-a-obsidian/85 px-8 py-2.5 backdrop-blur-md md:flex">
          <p className="font-ui text-[8.5px] tracking-[0.32em] text-a-ivory/45 uppercase">
            Écrin signature &amp; livraison assurée offerts
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#rendez-vous"
              className="font-ui text-[8.5px] tracking-[0.32em] text-a-ivory/45 uppercase transition-colors hover:text-a-champagne"
            >
              Prendre rendez-vous
            </a>
            <span aria-hidden className="h-3 w-px bg-white/12" />
            <span className="font-ui text-[8.5px] tracking-[0.32em] text-a-champagne uppercase">FR · EUR</span>
          </div>
        </div>

        {/* Barre principale */}
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? "border-b border-white/8 bg-a-obsidian/90 py-3 backdrop-blur-xl"
              : "bg-gradient-to-b from-a-obsidian/70 to-transparent py-5"
          }`}
        >
          <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 sm:px-8">
            {/* Navigation gauche */}
            <nav className="hidden flex-1 items-center gap-7 lg:flex">
              {NAV.slice(0, 2).map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-ui text-[9px] tracking-[0.28em] text-a-ivory/65 uppercase transition-colors hover:text-a-ivory"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-1 items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMenu(true)}
                aria-label="Ouvrir le menu"
                className="flex h-9 w-9 items-center justify-center text-a-ivory"
              >
                <Icon name="menu" />
              </button>
            </div>

            {/* Logotype */}
            <a href="#/" className="flex flex-col items-center" aria-label={`${BRAND.fullName} — accueil`}>
              <span className="font-lux text-[22px] leading-none tracking-[0.42em] text-a-ivory sm:text-[24px]">
                {BRAND.name}
              </span>
              <span className="mt-1 font-ui text-[7px] tracking-[0.52em] text-a-champagne uppercase">
                {BRAND.suffix}
              </span>
            </a>

            {/* Actions */}
            <div className="flex flex-1 items-center justify-end gap-4 sm:gap-5">
              <a
                href="#/catalogue"
                className="hidden font-ui text-[9px] tracking-[0.28em] text-a-ivory/65 uppercase transition-colors hover:text-a-ivory lg:block"
              >
                Catalogue
              </a>
              <button
                type="button"
                onClick={() => setOpenSearch(true)}
                aria-label="Rechercher une création"
                className="text-a-ivory/70 transition-colors hover:text-a-champagne"
              >
                <Icon name="search" />
              </button>
              <button
                type="button"
                onClick={() => setOpenFavorites(true)}
                aria-label={`Favoris (${favorites.length})`}
                className="relative text-a-ivory/70 transition-colors hover:text-a-champagne"
              >
                <Icon name="heart" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1.5 -right-2 font-ui text-[8px] text-a-champagne">
                    {favorites.length}
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setOpenCart(true)}
                aria-label={`Panier (${count})`}
                className="relative text-a-ivory/70 transition-colors hover:text-a-champagne"
              >
                <Icon name="bag" />
                {count > 0 && (
                  <span className="absolute -top-1.5 -right-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-a-champagne font-ui text-[7.5px] text-a-obsidian">
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu mobile plein écran */}
      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-a-obsidian lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex h-full flex-col px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="font-lux text-[18px] tracking-[0.4em] text-a-ivory">{BRAND.name}</span>
                <button
                  type="button"
                  onClick={() => setMenu(false)}
                  aria-label="Fermer le menu"
                  className="text-a-ivory"
                >
                  <Icon name="close" />
                </button>
              </div>

              <nav className="mt-16 flex flex-col gap-7">
                {NAV.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenu(false)}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.5 }}
                    className="font-lux text-3xl font-light text-a-ivory"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto space-y-3 border-t border-white/10 pt-6">
                <a href="#rendez-vous" onClick={() => setMenu(false)} className="block font-ui text-[9px] tracking-[0.3em] text-a-champagne uppercase">
                  Prendre rendez-vous
                </a>
                <p className="font-ui text-[9px] tracking-[0.24em] text-a-ivory/40 uppercase">
                  {BRAND.address}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
