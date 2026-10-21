const items = [
  "Or 18 carats",
  "Diamants certifiés GIA",
  "Serti main · Paris",
  "Pièces numérotées",
  "Écrin signature offert",
  "Service de conciergerie",
];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-j-gold/20 bg-j-noir py-5">
      <div className="aurelis-marquee flex w-max items-center">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center">
            {items.map((item, i) => (
              <span
                key={`${half}-${i}`}
                className="mx-8 flex items-center gap-8 font-jost text-[9px] font-light tracking-[0.38em] whitespace-nowrap text-j-ivory/55 uppercase sm:text-[10px]"
              >
                {item}
                <span aria-hidden className="text-[7px] text-j-gold">
                  ◆
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
