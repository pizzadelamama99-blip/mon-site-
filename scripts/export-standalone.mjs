/**
 * Export « autonome » du site, pour le bouton « Télécharger le site ».
 *
 * `vite build` produit déjà un fichier unique (vite-plugin-singlefile) :
 * CSS et JavaScript sont intégrés dans `dist/index.html`. Il reste à rendre
 * les chemins relatifs pour que le fichier fonctionne depuis n'importe quel
 * dossier, puis à le déposer dans `public/` afin que le serveur de
 * développement le serve lui aussi.
 */
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const source = resolve(root, "dist/index.html");
const target = resolve(root, "public/aurelis-site.html");

const html = await readFile(source, "utf8");

const standalone = html
  // Les images passent de /images/… à images/… (relatif au fichier HTML).
  // (le bundle contient les chemins sous forme de chaînes : on les réécrit
  // toutes, y compris dans le JavaScript qui rend les <img> à l'exécution)
  .replaceAll("/images/", "images/")
  // Favicon et logo de la maison suivent le même chemin relatif.
  .replaceAll('"/logo.svg"', '"logo.svg"')
  .replaceAll('"/favicon.svg"', '"favicon.svg"')
  // Les ancres racine restent valides, on ne touche pas au reste.
  .replace(
    "</head>",
    `    <meta name="aurelis-export" content="standalone" />\n  </head>`,
  );

await writeFile(target, standalone, "utf8");

const kb = Math.round(Buffer.byteLength(standalone) / 1024);
console.log(`export autonome → public/aurelis-site.html (${kb} ko)`);
