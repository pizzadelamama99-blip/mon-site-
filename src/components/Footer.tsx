export default function Footer() {
  return (
    <footer className="bg-ink-deep py-12 text-white/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-3xl text-lime-soda drop-shadow-[2px_2px_0_rgba(232,50,143,1)]">
              FRUIZZ
            </p>
            <p className="mt-2 max-w-xs text-sm text-white/60">
              La bulle qui fait flotter les fruits. Marque fictive créée pour
              cette démonstration.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm sm:gap-14">
            <div>
              <p className="mb-3 font-bold tracking-wider text-sun uppercase">
                Explorer
              </p>
              <ul className="space-y-2">
                <li><a href="#saveurs" className="transition hover:text-lime-soda">Les saveurs</a></li>
                <li><a href="#histoire" className="transition hover:text-lime-soda">Notre histoire</a></li>
                <li><a href="#boutique" className="transition hover:text-lime-soda">Boutique</a></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-bold tracking-wider text-sun uppercase">
                Suivre
              </p>
              <ul className="space-y-2">
                <li><a href="#top" className="transition hover:text-lime-soda">Instagram ↗</a></li>
                <li><a href="#top" className="transition hover:text-lime-soda">TikTok ↗</a></li>
                <li><a href="#top" className="transition hover:text-lime-soda">Spotify ↗</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© 2025 FRUIZZ — Site de démonstration, aucun achat réel possible.</p>
          <p>Fait avec des bulles et beaucoup d'amour ✦</p>
        </div>
      </div>
    </footer>
  );
}
