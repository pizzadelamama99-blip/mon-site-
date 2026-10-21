import { useCallback, useState } from "react";
import { motion } from "framer-motion";

/**
 * « Télécharger le site » — exporte la démonstration en un seul fichier HTML.
 *
 * Le build de production est déjà un fichier unique (vite-plugin-singlefile) :
 * CSS et JavaScript sont intégrés dans la page. On clone donc le document
 * vivant, on retire l'état de l'interface (tiroir ouvert, classes injectées
 * par les animations) et on propose le résultat en téléchargement.
 *
 * Les images ne sont pas encodées dans le HTML : elles sont récupérées puis
 * ajoutées à l'archive avec l'arborescence `images/…` attendue, ou, pour le
 * HTML seul, référencées en relatif.
 */

type Status = "idle" | "working" | "done" | "error";

const SITE_NAME = "aurelis-haute-joaillerie";

/** Prépare une copie propre du document (sans l'état courant de l'UI). */
function buildCleanClone() {
  const clone = document.documentElement.cloneNode(true) as HTMLElement;

  // 1. On retire les éléments d'interface dynamiques (tiroir, menu mobile).
  clone
    .querySelectorAll('[role="dialog"], [data-export-remove]')
    .forEach((el) => el.remove());

  // 2. On nettoie les classes injectées par framer-motion (styles inline
  //    d'animation) pour éviter des éléments figés en opacité 0.
  clone.querySelectorAll<HTMLElement>("[style]").forEach((el) => {
    const style = el.getAttribute("style") ?? "";
    if (/opacity|transform|translate|scale/.test(style)) {
      el.style.removeProperty("opacity");
      el.style.removeProperty("transform");
      el.style.removeProperty("translate");
      el.style.removeProperty("scale");
    }
  });

  // 3. On remet le défilement et le fond propres.
  clone.querySelectorAll<HTMLElement>("body, html").forEach((el) => {
    el.style.removeProperty("overflow");
  });

  // 4. Le script de l'application reste : le fichier est autonome et
  //    rejoue l'expérience (le HTML exporté est une vraie page vivante).
  return "<!doctype html>\n" + clone.outerHTML;
}

/** Récupère les images utilisées et renvoie { path, blob }. */
async function collectImages(extraPaths: string[] = []) {
  const urls = new Set<string>(["/favicon.svg", "/logo.svg"]);
  document.querySelectorAll<HTMLImageElement>("img[src]").forEach((img) => {
    const src = img.getAttribute("src") ?? "";
    if (src && !src.startsWith("data:") && !src.startsWith("http")) {
      urls.add(src);
    }
  });
  // Le bundle cite des visuels qui ne sont pas encore montés (sections
  // conditionnelles, fallbacks 3D) : on les ajoute à partir du HTML exporté.
  extraPaths.forEach((p) => {
    const clean = p.replace(/^\.?\//, "");
    if (clean) urls.add("/" + clean);
  });

  const files: { path: string; blob: Blob }[] = [];
  await Promise.all(
    [...urls].map(async (src) => {
      try {
        const res = await fetch(src);
        if (!res.ok) return;
        const blob = await res.blob();
        files.push({ path: src.replace(/^\//, ""), blob });
      } catch {
        /* une image manquante ne doit pas bloquer l'export */
      }
    }),
  );
  return files;
}

/** Zip minimal (méthode « store », sans compression) — aucune dépendance. */
function createZip(files: { path: string; blob: Blob }[], zipBlob: Blob) {
  const encoder = new TextEncoder();
  const entries: { name: Uint8Array; data: Uint8Array; crc: number }[] = [];

  const crcTable = (() => {
    const table = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      table[n] = c >>> 0;
    }
    return table;
  })();

  const crc32 = (bytes: Uint8Array) => {
    let c = 0xffffffff;
    for (let i = 0; i < bytes.length; i++) {
      c = crcTable[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
    }
    return (c ^ 0xffffffff) >>> 0;
  };

  return (async () => {
    const htmlBytes = new Uint8Array(await zipBlob.arrayBuffer());
    entries.push({ name: encoder.encode("index.html"), data: htmlBytes, crc: 0 });
    for (const f of files) {
      entries.push({
        name: encoder.encode(f.path),
        data: new Uint8Array(await f.blob.arrayBuffer()),
        crc: 0,
      });
    }
    entries.forEach((e) => {
      e.crc = crc32(e.data);
    });

    const chunks: Uint8Array[] = [];
    const central: Uint8Array[] = [];
    let offset = 0;

    const u16 = (v: number) => [v & 0xff, (v >> 8) & 0xff];
    const u32 = (v: number) => [
      v & 0xff,
      (v >>> 8) & 0xff,
      (v >>> 16) & 0xff,
      (v >>> 24) & 0xff,
    ];

    // Date/heure DOS fixe (2021-01-01), pour un export reproductible.
    const dosTime = u16(0);
    const dosDate = u16(0x5221);

    for (const e of entries) {
      const local = new Uint8Array([
        0x50, 0x4b, 0x03, 0x04,
        ...u16(20), ...u16(0x0800), ...u16(0), ...dosTime, ...dosDate,
        ...u32(e.crc), ...u32(e.data.length), ...u32(e.data.length),
        ...u16(e.name.length), ...u16(0),
        ...e.name,
      ]);
      chunks.push(local, e.data);
      central.push(
        new Uint8Array([
          0x50, 0x4b, 0x01, 0x02,
          ...u16(20), ...u16(20), ...u16(0x0800), ...u16(0), ...dosTime, ...dosDate,
          ...u32(e.crc), ...u32(e.data.length), ...u32(e.data.length),
          ...u16(e.name.length), ...u16(0), ...u16(0),
          ...u16(0), ...u16(0), ...u32(0),
          ...u32(offset),
          ...e.name,
        ]),
      );
      offset += local.length + e.data.length;
    }

    const centralSize = central.reduce((n, c) => n + c.length, 0);
    const end = new Uint8Array([
      0x50, 0x4b, 0x05, 0x06,
      ...u16(0), ...u16(0),
      ...u16(entries.length), ...u16(entries.length),
      ...u32(centralSize), ...u32(offset),
      ...u16(0),
    ]);

    const parts: BlobPart[] = [...chunks, ...central, end].map(
      (u) => u.slice().buffer as ArrayBuffer,
    );
    return new Blob(parts, { type: "application/zip" });
  })();
}

function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export default function DownloadSite({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [withAssets, setWithAssets] = useState(true);

  /** Récupère le build autonome (généré par `npm run build`). */
  const fetchStandalone = useCallback(async () => {
    try {
      const res = await fetch("/aurelis-site.html", { cache: "no-store" });
      if (!res.ok) return null;
      const text = await res.text();
      return text.includes("aurelis-export") ? text : null;
    } catch {
      return null;
    }
  }, []);

  const run = useCallback(async () => {
    setStatus("working");
    try {
      const html = (await fetchStandalone()) ?? buildCleanClone();
      const htmlBlob = new Blob([html], { type: "text/html;charset=utf-8" });

      if (!withAssets) {
        download(htmlBlob, `${SITE_NAME}.html`);
        setStatus("done");
        return;
      }

      const referenced = Array.from(
        html.matchAll(/images\/[A-Za-z0-9._-]+\.(?:jpe?g|png|webp|avif)/g),
        (m) => m[0],
      );
      const images = await collectImages(referenced);
      const zip = await createZip(images, htmlBlob);
      download(zip, `${SITE_NAME}.zip`);
      setStatus("done");
    } catch (err) {
      console.warn("[Aurelis] export impossible :", err);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  }, [withAssets, fetchStandalone]);

  const label =
    status === "working"
      ? "Préparation…"
      : status === "done"
        ? "Téléchargement lancé"
        : status === "error"
          ? "Réessayer"
          : "Télécharger le site";

  return (
    <div className={compact ? "" : "text-center"}>
      <button
        onClick={run}
        disabled={status === "working"}
        className={`group inline-flex items-center justify-center gap-3 border border-j-gold/60 px-7 py-3.5 font-jost text-[9.5px] tracking-[0.28em] uppercase transition-all duration-500 hover:border-j-gold hover:bg-j-gold hover:text-j-noir disabled:cursor-wait disabled:opacity-70 ${
          status === "done" ? "border-j-gold text-j-gold" : "text-j-ivory"
        }`}
      >
        {status === "working" ? (
          <motion.span
            aria-hidden
            className="h-3 w-3 rounded-full border border-current border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          />
        ) : (
          <svg
            width="13"
            height="13"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            aria-hidden
          >
            <path d="M8 1.5v8.5M4.5 6.5 8 10l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12.5v1.2a.8.8 0 0 0 .8.8h10.4a.8.8 0 0 0 .8-.8v-1.2" strokeLinecap="round" />
          </svg>
        )}
        {label}
      </button>

      {!compact && (
        <label className="mt-4 flex cursor-pointer items-center justify-center gap-2.5">
          <input
            type="checkbox"
            checked={withAssets}
            onChange={(e) => setWithAssets(e.target.checked)}
            className="h-3 w-3 appearance-none border border-j-ivory/30 checked:border-j-gold checked:bg-j-gold"
          />
          <span className="font-jost text-[9px] tracking-[0.18em] text-j-ivory/45 uppercase">
            Inclure les images (archive .zip)
          </span>
        </label>
      )}

      {!compact && (
        <p className="mx-auto mt-3 max-w-sm font-jost text-[9px] leading-relaxed text-j-ivory/30">
          Vous obtenez le site complet, prêt à ouvrir hors ligne : HTML, styles
          et scripts intégrés, plus le dossier d'images.
        </p>
      )}
    </div>
  );
}
