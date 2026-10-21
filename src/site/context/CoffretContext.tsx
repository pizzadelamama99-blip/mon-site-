import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { pieces, type Piece } from "../data/catalog";

type Line = { id: string; qty: number };

type State = { lines: Line[] };

type Action =
  | { type: "add"; id: string }
  | { type: "remove"; id: string }
  | { type: "dec"; id: string }
  | { type: "clear" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add": {
      const found = state.lines.find((l) => l.id === action.id);
      if (found) {
        return {
          lines: state.lines.map((l) =>
            l.id === action.id ? { ...l, qty: l.qty + 1 } : l,
          ),
        };
      }
      return { lines: [...state.lines, { id: action.id, qty: 1 }] };
    }
    case "dec": {
      return {
        lines: state.lines
          .map((l) => (l.id === action.id ? { ...l, qty: l.qty - 1 } : l))
          .filter((l) => l.qty > 0),
      };
    }
    case "remove":
      return { lines: state.lines.filter((l) => l.id !== action.id) };
    case "clear":
      return { lines: [] };
    default:
      return state;
  }
}

type CoffretItem = { piece: Piece; qty: number };

type Ctx = {
  items: CoffretItem[];
  count: number;
  total: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  lastAdded: Piece | null;
};

const CoffretContext = createContext<Ctx | null>(null);

export function CoffretProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<Piece | null>(null);

  const add = useCallback((id: string) => {
    dispatch({ type: "add", id });
    const piece = pieces.find((p) => p.id === id) ?? null;
    setLastAdded(piece);
    setIsOpen(true);
  }, []);

  const items = useMemo<CoffretItem[]>(
    () =>
      state.lines
        .map((l) => {
          const piece = pieces.find((p) => p.id === l.id);
          return piece ? { piece, qty: l.qty } : null;
        })
        .filter((x): x is CoffretItem => x !== null),
    [state.lines],
  );

  const count = items.reduce((n, i) => n + i.qty, 0);
  const total = items.reduce((n, i) => n + i.qty * i.piece.price, 0);

  const value: Ctx = {
    items,
    count,
    total,
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    add,
    dec: (id) => dispatch({ type: "dec", id }),
    remove: (id) => dispatch({ type: "remove", id }),
    clear: () => dispatch({ type: "clear" }),
    lastAdded,
  };

  return (
    <CoffretContext.Provider value={value}>{children}</CoffretContext.Provider>
  );
}

export function useCoffret() {
  const ctx = useContext(CoffretContext);
  if (!ctx) throw new Error("useCoffret doit être utilisé dans CoffretProvider");
  return ctx;
}
