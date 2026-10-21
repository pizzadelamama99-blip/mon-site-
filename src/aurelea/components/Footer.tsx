import { useState } from "react";
import { BRAND, NAV } from "../config";
import { BOUTIQUES } from "../data";
import { Eyebrow, Field, LuxButton, Reveal } from "./ui";

/* ------------------------------------------------------------------ */
/* Rendez-vous                                                         */
/* ------------------------------------------------------------------ */
export function Appointment() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");

  return (
    <section id="rendez-vous" className="border-t border-white/8 bg-a-obsidian py-20 sm:py-24">
      <div className="mx-auto grid max-w-[1500px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>Sur rendez-vous</Eyebrow>
            <h2 className="mt-5 font-lux text-[clamp(2rem,4.2vw,3.2rem)] leading-[1.04] font-light text-a-ivory">
              Venez voir
              <br />
              <em className="italic text-a-champagne">la lumière de près.</em>
            </h2>
            <p className="mt-6 max-w-sm font-ui text-[11.5px] leading-[2] font-light text-a-ivory/50">
              Un rendez-vous d'une heure, seul avec une pièce et un
              sertisseur. Nous recevons au 16, rue de la Paix, du mardi au
              samedi.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-9 space-y-5 border-t border-white/10 pt-7">
              {BOUTIQUES.map((b) => (
                <li key={b.city} className="flex items-baseline justify-between gap-6">
                  <div>
                    <p className="font-lux text-lg font-light text-a-ivory">{b.city}</p>
                    <p className="font-ui text-[9px] tracking-[0.18em] text-a-ivory/40 uppercase">
                      {b.address}
                    </p>
                  </div>
                  <a
                    href={`tel:${b.tel.replace(/\s/g, "")}`}
                    className="shrink-0 font-ui text-[9px] text-a-ivory/50 transition-colors hover:text-a-champagne"
                  >
                    {b.tel}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal delay={0.06}>
            {sent ? (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center border border-a-champagne/30 bg-a-champagne/[0.04] p-10 text-center">
                <p className="font-lux text-3xl font-light text-a-ivory">Merci{name ? `, ${name}` : ""}.</p>
                <p className="mt-3 max-w-sm font-ui text-[11px] leading-relaxed text-a-ivory/55">
                  Votre demande est notée. Dans une vraie maison, vous
                  recevriez une confirmation par courriel sous 24 heures.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 font-ui text-[8.5px] tracking-[0.26em] text-a-champagne uppercase underline-offset-4 hover:underline"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
              >
                <Field label="Nom" name="nom" required value={name} onChange={setName} placeholder="Votre nom" />
                <Field label="Courriel" name="email" type="email" required placeholder="vous@exemple.fr" />
                <Field label="Date souhaitée" name="date" type="date" required />
                <Field label="Boutique" name="ville" placeholder="Paris, Genève ou Tokyo" />
                <Field
                  label="Votre projet"
                  name="projet"
                  as="textarea"
                  placeholder="Une pièce du catalogue, un sur-mesure, une pierre à sertir…"
                  className="sm:col-span-2"
                />
                <div className="sm:col-span-2">
                  <LuxButton type="submit" variant="solid">
                    Demander un rendez-vous
                  </LuxButton>
                  <p className="mt-4 font-ui text-[8px] tracking-[0.2em] text-a-ivory/30 uppercase">
                    Démonstration — aucune donnée n'est transmise
                  </p>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Lettre d'information                                                */
/* ------------------------------------------------------------------ */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section id="lettre" className="relative overflow-hidden border-y border-white/8 bg-a-velvet py-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(214,192,154,0.10),transparent_70%)]" />
      <div className="relative mx-auto max-w-2xl px-5 text-center sm:px-8">
        <Eyebrow className="justify-center">La lettre</Eyebrow>
        <h2 className="mt-5 font-lux text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.05] font-light text-a-ivory">
          Quatre lettres par an,
          <br />
          <em className="italic text-a-champagne">jamais une de plus.</em>
        </h2>

        {done ? (
          <p className="mt-7 font-ui text-[11px] tracking-[0.2em] text-a-champagne uppercase">
            Merci — inscription de démonstration enregistrée.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <label className="flex-1">
              <span className="sr-only">Votre courriel</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.fr"
                className="w-full border-b border-white/20 bg-transparent px-1 py-3 text-center font-ui text-[12px] text-a-ivory placeholder:text-a-ivory/25 focus:border-a-champagne focus:outline-none sm:text-left"
              />
            </label>
            <LuxButton type="submit" variant="outline" className="!px-6">
              S'inscrire
            </LuxButton>
          </form>
        )}
        <p className="mt-4 font-ui text-[8px] tracking-[0.2em] text-a-ivory/25 uppercase">
          Démonstration — aucune inscription réelle n'est enregistrée
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Pied de page                                                        */
/* ------------------------------------------------------------------ */
function DownloadSite() {
  const [state, setState] = useState<"idle" | "working" | "done">("idle");

  const run = async () => {
    setState("working");
    try {
      const res = await fetch("/aurelea-site.html", { cache: "no-store" });
      if (!res.ok) throw new Error("indisponible");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "aurelea-atelier.html";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      setState("done");
    } catch {
      setState("idle");
    }
  };

  return (
    <button
      type="button"
      onClick={run}
      className="font-ui text-[8px] tracking-[0.22em] text-a-ivory/25 uppercase transition-colors hover:text-a-champagne"
    >
      {state === "working" ? "Préparation…" : state === "done" ? "Téléchargement lancé" : "Télécharger la démonstration"}
    </button>
  );
}

export default function Footer() {
  return (
    <footer className="bg-a-obsidian">
      <div className="mx-auto max-w-[1500px] px-5 py-14 sm:px-8">
        <div className="grid gap-10 border-b border-white/8 pb-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-lux text-[26px] leading-none tracking-[0.4em] text-a-ivory">
              {BRAND.name}
            </p>
            <p className="mt-2 font-ui text-[7.5px] tracking-[0.5em] text-a-champagne uppercase">
              {BRAND.suffix}
            </p>
            <p className="mt-6 max-w-xs font-ui text-[10.5px] leading-[1.95] font-light text-a-ivory/45">
              {BRAND.tagline}. {BRAND.founded} — {BRAND.address}.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-ui text-[8.5px] tracking-[0.24em] text-a-ivory/45 uppercase">
              <span>Paris</span>
              <span aria-hidden>—</span>
              <span>Genève</span>
              <span aria-hidden>—</span>
              <span>Tokyo</span>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="font-ui text-[8px] tracking-[0.3em] text-a-ivory/30 uppercase">Maison</p>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((n) => (
                <li key={n.label}>
                  <a href={n.href} className="font-ui text-[10.5px] text-a-ivory/60 transition-colors hover:text-a-champagne">
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#rendez-vous" className="font-ui text-[10.5px] text-a-ivory/60 transition-colors hover:text-a-champagne">
                  Prendre rendez-vous
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="font-ui text-[8px] tracking-[0.3em] text-a-ivory/30 uppercase">Boutiques</p>
            <ul className="mt-4 space-y-3">
              {BOUTIQUES.map((b) => (
                <li key={b.city} className="flex justify-between gap-4 font-ui text-[10.5px] text-a-ivory/55">
                  <span>{b.city}</span>
                  <span className="text-a-ivory/35">{b.address}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-1">
              <a href={`mailto:${BRAND.email}`} className="block font-ui text-[10.5px] text-a-ivory/55 hover:text-a-champagne">
                {BRAND.email}
              </a>
              <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="block font-ui text-[10.5px] text-a-ivory/55 hover:text-a-champagne">
                {BRAND.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-ui text-[8px] tracking-[0.22em] text-a-ivory/25 uppercase">
            © {new Date().getFullYear()} {BRAND.fullName} — Démonstration, marque et pièces fictives
          </p>
          <div className="flex items-center gap-5">
            <span className="font-ui text-[8px] tracking-[0.22em] text-a-ivory/25 uppercase">
              Paiement non activé
            </span>
            <DownloadSite />
            <a
              href="#/fruizz"
              className="font-ui text-[8px] tracking-[0.22em] text-a-ivory/25 uppercase transition-colors hover:text-a-ivory/50"
            >
              Démo FRUIZZ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
