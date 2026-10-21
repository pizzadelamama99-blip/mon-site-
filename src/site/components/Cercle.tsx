import { useState } from "react";
import GoldAura from "./effects/GoldAura";
import ShaderBoundary from "./effects/ShaderBoundary";
import DownloadSite from "./DownloadSite";
import { GoldButton, Micro, Reveal } from "./ui";

export default function Cercle() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="relative overflow-hidden bg-j-noir py-24 sm:py-32">
      <ShaderBoundary fallback={<div className="absolute inset-0 bg-j-noir" />}>
        <GoldAura />
      </ShaderBoundary>

      <div className="relative mx-auto max-w-3xl px-6 text-center sm:px-8">
        <Reveal>
          <Micro>Le cercle Aurelis</Micro>
          <h2 className="mt-7 font-luxe text-4xl leading-[1.08] font-light text-j-ivory sm:text-5xl lg:text-[3.6rem]">
            Être prévenu,
            <br />
            <span className="italic text-j-gold-light">avant les autres.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md font-jost text-[12.5px] leading-[1.95] font-light text-j-ivory/55">
            Les nouvelles pièces ne sont jamais annoncées publiquement. Elles
            sont présentées d'abord aux membres du Cercle, par invitation.
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-10">
          {done ? (
            <div className="mx-auto max-w-md border border-j-gold/35 bg-j-noir/40 px-8 py-7 backdrop-blur-sm">
              <p className="font-luxe text-2xl font-light text-j-ivory">
                Votre demande est enregistrée.
              </p>
              <p className="mt-2 font-jost text-[11px] leading-relaxed text-j-ivory/50">
                Un conseiller vous adressera une invitation personnelle.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setDone(true);
              }}
              className="mx-auto flex max-w-lg flex-col items-stretch gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse électronique"
                className="h-[52px] flex-1 border border-white/20 bg-j-noir/40 px-5 font-jost text-sm text-j-ivory placeholder:text-j-ivory/30 focus:border-j-gold focus:outline-none"
              />
              <GoldButton
                type="submit"
                className="!px-6 !py-4 !text-[10px] whitespace-nowrap"
              >
                Recevoir une invitation
              </GoldButton>
            </form>
          )}
        </Reveal>

        <p className="mt-6 font-jost text-[9px] tracking-[0.22em] text-j-ivory/40 uppercase">
          Deux envois par an · Désinscription immédiate
        </p>

        {/* Emporter la démonstration */}
        <div data-export-keep className="mt-16 border-t border-white/10 pt-10">
          <p className="font-jost text-[8.5px] tracking-[0.36em] text-j-gold uppercase">
            Emporter la démonstration
          </p>
          <p className="mx-auto mt-3 max-w-md font-jost text-[11.5px] leading-[1.9] font-light text-j-ivory/45">
            Récupérez ce site en un fichier : styles, animations et scripts
            intégrés. Les images sont ajoutées à l'archive.
          </p>
          <div className="mt-6">
            <DownloadSite />
          </div>
        </div>
      </div>
    </section>
  );
}
