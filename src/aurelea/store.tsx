import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { BRAND } from "./config";
import { METALS, getProduct, type MetalId } from "./data";

/* ------------------------------------------------------------------ */
/* Panier et favoris — conservés entre les visites (localStorage).     */
/* ------------------------------------------------------------------ */

export type CartLine = {
  key: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  metal: MetalId;
  size?: number;
  qty: number;
};

type Store = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  add: (input: {
    slug: string;
    metal?: MetalId;
    size?: number;
    qty?: number;
  }) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  openCart: boolean;
  setOpenCart: (open: boolean) => void;
  openFavorites: boolean;
  setOpenFavorites: (open: boolean) => void;
  openSearch: boolean;
  setOpenSearch: (open: boolean) => void;
  favorites: string[];
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
};

const StoreContext = createContext<Store | null>(null);

const CART_KEY = "aurelea.cart.v1";
const FAV_KEY = "aurelea.favorites.v1";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* mode privé : le panier reste en mémoire */
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => read<CartLine[]>(CART_KEY, []));
  const [favorites, setFavorites] = useState<string[]>(() => read<string[]>(FAV_KEY, []));
  const [openCart, setOpenCart] = useState(false);
  const [openFavorites, setOpenFavorites] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => write(CART_KEY, lines), [lines]);
  useEffect(() => write(FAV_KEY, favorites), [favorites]);

  const add = useCallback<Store["add"]>(({ slug, metal, size, qty = 1 }) => {
    const product = getProduct(slug);
    if (!product) return;
    const chosenMetal = metal ?? product.metal;
    const key = `${slug}--${chosenMetal}${size ? `--${size}` : ""}`;
    const price = product.price + METALS[chosenMetal].delta;

    setLines((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) {
        return prev.map((l) => (l.key === key ? { ...l, qty: Math.min(9, l.qty + qty) } : l));
      }
      return [
        ...prev,
        {
          key,
          slug,
          name: product.name,
          image: product.image,
          price,
          metal: chosenMetal,
          size,
          qty: Math.min(9, qty),
        },
      ];
    });
    setOpenCart(true);
  }, []);

  const remove = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, qty: Math.min(9, qty) } : l)),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }, []);

  const value = useMemo<Store>(() => {
    const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
    const shipping =
      subtotal === 0 || subtotal >= BRAND.shipping.freeAbove ? 0 : BRAND.shipping.standard;
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      add,
      remove,
      setQty,
      clear,
      openCart,
      setOpenCart,
      openFavorites,
      setOpenFavorites,
      openSearch,
      setOpenSearch,
      favorites,
      toggleFavorite,
      isFavorite: (slug: string) => favorites.includes(slug),
    };
  }, [lines, favorites, add, remove, setQty, clear, openCart, openFavorites, openSearch, toggleFavorite]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore doit être utilisé dans <StoreProvider>");
  return ctx;
}
