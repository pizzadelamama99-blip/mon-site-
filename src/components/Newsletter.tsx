import { useState } from "react";
import Reveal from "./Reveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-ink bg-fuchsia-soda p-8 text-center shadow-[8px_10px_0_rgba(27,42,181,0.9)] sm:p-12">
            <span className="pointer-events-none absolute -top-6 -left-6 text-7xl opacity-40">🫧</span>
            <span className="pointer-events-none absolute -right-4 -bottom-6 text-7xl opacity-40">🍓</span>
            <h2 className="text-3xl text-white sm:text-4xl">
              <span className="font-display drop-shadow-[2px_2px_0_rgba(27,42,181,1)]">
                Restez
              </span>{" "}
              <span className="font-serifx italic">dans la bulle.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-white/85 sm:text-base">
              Nouvelles saveurs, éditions collector et surprises en apesanteur,
              directement dans votre boîte mail.
            </p>
            {sent ? (
              <p className="mx-auto mt-6 max-w-md rounded-full bg-white/95 px-6 py-3.5 font-bold text-fuchsia-deep">
                Merci ! Vous flottez désormais avec nous ✦ (inscription fictive)
              </p>
            ) : (
              <form
                className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) setSent(true);
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.fr"
                  className="h-12 flex-1 rounded-full border-2 border-ink bg-white px-5 text-sm font-medium text-ink outline-none placeholder:text-ink/40 focus:border-sun"
                />
                <button
                  type="submit"
                  className="h-12 rounded-full bg-ink px-6 font-display text-lime-soda transition hover:-translate-y-0.5 hover:bg-ink-deep"
                >
                  Je m'abonne
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
