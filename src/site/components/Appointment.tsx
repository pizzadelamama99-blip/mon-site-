import { useState } from "react";
import { boutiques } from "../data/catalog";
import { GoldButton, Micro, Reveal } from "./ui";

export default function Appointment() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    boutique: "Paris — 12, place Vendôme",
    date: "",
    message: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <section id="rendez-vous" className="relative overflow-hidden py-20 sm:py-28">
      <img
        src="/images/salon.jpg"
        alt="Salon de haute joaillerie, murs sombres et vitrines dorées"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-j-noir/82" />
      <div className="absolute inset-0 bg-gradient-to-r from-j-noir via-j-noir/70 to-j-noir/30" />

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          {/* Colonne texte + boutiques */}
          <div>
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-j-gold" />
                <Micro>Sur rendez-vous</Micro>
              </div>
              <h2 className="mt-6 max-w-lg font-luxe text-4xl leading-[1.06] font-light text-j-ivory sm:text-5xl lg:text-[3.5rem]">
                Venez voir
                <br />
                <span className="italic text-j-gold-light">la lumière de près.</span>
              </h2>
              <p className="mt-6 max-w-md font-jost text-[13px] leading-[1.95] font-light text-j-ivory/60">
                Un salon privé, un conseiller, et les pièces posées sur un
                plateau de velours. Comptez une heure — sans engagement.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-px bg-white/10 sm:grid-cols-3">
              {boutiques.map((b, i) => (
                <Reveal key={b.city} delay={0.08 * i}>
                  <div className="h-full bg-j-noir/70 p-5 backdrop-blur-sm">
                    <p className="font-luxe text-xl text-j-ivory">{b.city}</p>
                    <p className="mt-2 font-jost text-[10px] leading-relaxed font-light text-j-ivory/50">
                      {b.address}
                    </p>
                    <a
                      href={`tel:${b.tel.replace(/\s/g, "")}`}
                      className="mt-3 inline-block font-jost text-[9px] tracking-[0.2em] text-j-gold/80 transition-colors hover:text-j-gold"
                    >
                      {b.tel}
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Formulaire */}
          <Reveal delay={0.12}>
            <div className="border border-white/12 bg-j-noir/70 p-7 backdrop-blur-md sm:p-9">
              {sent ? (
                <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-j-gold/50">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#c8a24a" strokeWidth="1.2">
                      <path d="M3 10.5l4.5 4.5L17 5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h3 className="mt-6 font-luxe text-3xl font-light text-j-ivory">
                    Merci, {form.name.split(" ")[0] || "à vous"}.
                  </h3>
                  <p className="mt-3 max-w-xs font-jost text-[12px] leading-[1.9] font-light text-j-ivory/55">
                    Votre demande de rendez-vous à la boutique de{" "}
                    {form.boutique.split(" — ")[0]} nous est parvenue. Un
                    conseiller vous écrira sous 24 h ouvrées.
                  </p>
                  <p className="mt-6 font-jost text-[9px] tracking-[0.28em] text-j-gold/70 uppercase">
                    Démonstration — aucun envoi réel
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="flex flex-col gap-5"
                >
                  <p className="font-jost text-[9px] tracking-[0.34em] text-j-gold uppercase">
                    Demande de rendez-vous privé
                  </p>

                  <label className="block">
                    <span className="font-jost text-[8.5px] tracking-[0.26em] text-j-ivory/55 uppercase">
                      Nom complet
                    </span>
                    <input
                      required
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Élise Aurelis"
                      className="mt-2 w-full border-b border-white/15 bg-transparent pb-2.5 font-luxe text-lg text-j-ivory placeholder:text-j-ivory/20 focus:border-j-gold focus:outline-none"
                    />
                  </label>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="font-jost text-[8.5px] tracking-[0.26em] text-j-ivory/55 uppercase">
                        Courriel
                      </span>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                        placeholder="vous@maison.fr"
                        className="mt-2 w-full border-b border-white/15 bg-transparent pb-2.5 font-jost text-sm text-j-ivory placeholder:text-j-ivory/20 focus:border-j-gold focus:outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="font-jost text-[8.5px] tracking-[0.26em] text-j-ivory/55 uppercase">
                        Date souhaitée
                      </span>
                      <input
                        type="date"
                        value={form.date}
                        onChange={set("date")}
                        aria-label="Date souhaitée"
                        className="mt-2 w-full appearance-none border-b border-white/15 bg-transparent pb-2.5 font-jost text-[13px] text-j-ivory/80 [color-scheme:dark] focus:border-j-gold focus:outline-none"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="font-jost text-[8.5px] tracking-[0.26em] text-j-ivory/55 uppercase">
                      Boutique
                    </span>
                    <select
                      value={form.boutique}
                      onChange={set("boutique")}
                      className="mt-2 w-full border-b border-white/15 bg-j-noir pb-2.5 font-jost text-sm text-j-ivory/80 focus:border-j-gold focus:outline-none"
                    >
                      {boutiques.map((b) => (
                        <option key={b.city} value={`${b.city} — ${b.address}`}>
                          {b.city} — {b.address}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="font-jost text-[8.5px] tracking-[0.26em] text-j-ivory/55 uppercase">
                      Votre projet
                    </span>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={set("message")}
                      placeholder="Une bague de fiançailles, un collier de naissance, une pièce à transformer…"
                      className="mt-2 w-full resize-none border-b border-white/15 bg-transparent pb-2.5 font-jost text-sm leading-relaxed text-j-ivory placeholder:text-j-ivory/20 focus:border-j-gold focus:outline-none"
                    />
                  </label>

                  <div className="mt-2">
                    <GoldButton full type="submit">
                      Demander un rendez-vous
                    </GoldButton>
                  </div>
                  <p className="font-jost text-[9px] leading-relaxed text-j-ivory/40">
                    Vos informations restent confidentielles. Site de
                    démonstration : aucune donnée n'est transmise.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
