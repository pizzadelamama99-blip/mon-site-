/**
 * Export autonome de la démonstration Auréléa.
 *
 * `vite build` produit déjà un fichier unique (CSS + JS intégrés).
 * On réécrit les chemins d'images en relatif, puis on dépose le résultat
 * dans `public/` pour que le bouton « Télécharger » fonctionne aussi en
 * développement.
 */
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const html = await readFile(resolve(root, "dist/index.html"), "utf8");

const standalone = html
  .replaceAll("/images/", "images/")
  .replaceAll('"/favicon.svg"', '"favicon.svg"')
  .replace("</head>", `    <meta name="aurelea-export" content="standalone" />\n  </head>`);

await writeFile(resolve(root, "public/aurelea-site.html"), standalone, "utf8");
console.log(`export autonome → public/aurelea-site.html (${Math.round(Buffer.byteLength(standalone) / 1024)} ko)`);
