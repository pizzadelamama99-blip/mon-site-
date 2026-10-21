import Reveal from "./Reveal";

export default function Story() {
  return (
    <section id="histoire" className="bg-lime-pale py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative">
            <div className="overflow-hidden rounded-[2.5rem] border-4 border-ink shadow-[10px_12px_0_rgba(232,50,143,0.9)]">
              <img
                src="/images/story.jpg"
                alt="Nature morte surréaliste FRUIZZ"
                className="aspect-square w-full object-cover"
              />
            </div>
            <span className="absolute -top-4 -right-3 rotate-6 rounded-full bg-ink px-4 py-2.5 font-display text-sm text-lime-soda shadow-[3px_3px_0_rgba(255,201,60,1)]">
              Depuis 2024 *
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mb-3 text-xs font-bold tracking-[0.25em] text-fuchsia-soda uppercase">
            Notre histoire
          </p>
          <h2 className="text-4xl leading-tight text-ink sm:text-5xl">
            <span className="font-serifx italic">Née d'un rêve</span>
            <br />
            <span className="font-display text-fuchsia-soda drop-shadow-[3px_3px_0_rgba(27,42,181,1)]">
              un peu fou.
            </span>
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-deep/80 sm:text-lg">
            <p>
              Tout a commencé par une sieste sous un pêcher et un rêve étrange :
              des fruits qui flottaient dans un ciel vert citron, portés par des
              milliers de bulles.
            </p>
            <p>
              Au réveil, une évidence — les sodas étaient devenus trop sérieux.
              FRUIZZ est né pour remettre un peu de surréalisme dans nos
              gorgées : de vrais fruits, des bulles fines, des couleurs qui
              claquent et une seule règle, ne jamais s'ennuyer.
            </p>
          </div>
          <a
            href="#saveurs"
            className="mt-8 inline-block rounded-full border-2 border-ink bg-cream px-7 py-3.5 font-bold text-ink transition hover:-translate-y-1 hover:bg-ink hover:text-lime-soda"
          >
            Goûter le rêve
          </a>
          <p className="mt-4 text-xs text-ink-deep/50">
            * Marque et récit fictifs, créés pour cette démonstration.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
