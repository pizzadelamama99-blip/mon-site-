const items = [
  "LIVRAISON OFFERTE DÈS 25 € *",
  "NOUVEAU : PÊCHE SOLEIL ☀️",
  "ZÉRO ENNUI, 100% BULLES",
  "FABRIQUÉ AVEC DE VRAIS FRUITS *",
];

export default function Ticker() {
  const row = [...items, ...items, ...items];
  return (
    <div className="relative z-50 overflow-hidden bg-ink py-2 text-lime-soda">
      <div className="animate-marquee flex w-max whitespace-nowrap">
        {[0, 1].map((half) => (
          <div key={half} className="flex">
            {row.map((item, i) => (
              <span
                key={`${half}-${i}`}
                className="mx-5 text-[11px] font-bold tracking-[0.18em] sm:text-xs"
              >
                {item} <span className="mx-3 text-fuchsia-soda">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
