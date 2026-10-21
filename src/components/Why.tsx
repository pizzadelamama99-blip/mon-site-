import Reveal from "./Reveal";

const reasons = [
  {
    emoji: "🍓",
    title: "Vrais fruits",
    text: "Du jus et des infusions de fruits, rien d'artificiel dans nos bulles.",
    bg: "bg-fuchsia-soda/10",
  },
  {
    emoji: "🫧",
    title: "Bulles fines",
    text: "Une pétillance légère qui chatouille sans piquer. Promis.",
    bg: "bg-lilac-soda/20",
  },
  {
    emoji: "🌿",
    title: "Peu sucré",
    text: "Moitié moins de sucre qu'un soda classique, tout autant de fun.",
    bg: "bg-mint/20",
  },
  {
    emoji: "✨",
    title: "Zéro ennui",
    text: "Des canettes à collectionner et des saveurs qui défient la gravité.",
    bg: "bg-sun/25",
  },
];

export default function Why() {
  return (
    <section className="bg-cream pb-16 sm:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mb-10 text-center">
          <h2 className="text-3xl text-ink sm:text-4xl">
            <span className="font-serifx italic">Pourquoi</span>{" "}
            <span className="font-display text-orange-soda drop-shadow-[2px_2px_0_rgba(27,42,181,1)]">
              FRUIZZ
            </span>{" "}
            <span className="font-serifx italic">?</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08}>
              <div
                className={`flex h-full flex-col items-center rounded-3xl border-2 border-ink/10 p-6 text-center transition hover:-translate-y-1 hover:border-ink ${r.bg}`}
              >
                <span className="mb-3 text-4xl">{r.emoji}</span>
                <h3 className="font-display text-lg text-ink">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-deep/75">
                  {r.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
