# Maison AURELIS — site de haute joaillerie

Démonstration de site **ultra premium** pour une maison de haute joaillerie
fictive (fondée en 1928, place Vendôme). Direction artistique : noir profond,
or champagne, ivoire, typographie Cormorant Garamond / Jost, photographie
éditoriale et effets temps réel discrets.

> Marque, pièces, prix, boutiques, presse et témoignages sont fictifs.
> Aucun paiement ni envoi de formulaire réel.

## Démarrage

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build production en fichier unique
npm run preview  # sert le build
```

## Deux démonstrations dans un seul build

| URL | Contenu |
| --- | --- |
| `/` | **Maison Aurelis** — haute joaillerie (par défaut) |
| `/#/fruizz` | **FRUIZZ** — concept soda, démo précédente (avec les 4 effets du guide) |

Routage par hash (`src/main.tsx`) : aucune règle de rewrite serveur n'est
nécessaire, le build fonctionne sur n'importe quel hébergement statique.

## Architecture

```
src/
├── main.tsx                  # routage hash : Aurelis ↔ FRUIZZ
├── site/                     # ← le site joaillerie
│   ├── App.tsx
│   ├── theme.css             # tokens « j- » : noir, or, ivoire + animations
│   ├── data/catalog.ts       # pièces, collections, atelier, presse, boutiques
│   ├── context/CoffretContext.tsx
│   └── components/
│       ├── Header.tsx        # bandeau service, nav, logotype, coffret
│       ├── Hero.tsx          # hero « BRILLIANCE » : typo fantôme, pièce, cartel
│       ├── Marquee.tsx       # bandeau défilant de réassurance
│       ├── Collections.tsx   # 3 collections, cartes éditoriales
│       ├── RubySignature.tsx # section #rubis : bague 3D pilotée au défilement
│       ├── Promises.tsx      # grille des 4 engagements (façon DE'ART)
│       ├── DiamondShowcase.tsx  # pièce d'exception + scène 3D
│       ├── SavoirFaire.tsx   # atelier, 4 étapes, image parallaxe
│       ├── Catalog.tsx       # 8 pièces, filtres par catégorie
│       ├── Editorial.tsx     # éditorial ivoire « velora / atelier »
│       ├── Press.tsx         # citations presse
│       ├── Appointment.tsx   # formulaire + 3 boutiques
│       ├── Cercle.tsx        # inscription + aura ShaderGradient + export du site
│       ├── DownloadSite.tsx  # bouton « Télécharger le site » (HTML ou ZIP)
│       ├── Footer.tsx
│       ├── CoffretDrawer.tsx # tiroir latéral (sélection, quantités, total)
│       ├── ui.tsx            # boutons, filets, micro-libellés, Reveal
│       └── effects/
│           ├── DiamondScene.tsx   # solitaire 3D temps réel (R3F + drei)
│           ├── RubyRingScene.tsx # bague rubis procédurale pilotée par le scroll
│           ├── GoldLogo.tsx       # logotype en or liquide (shader)
│           ├── GoldAura.tsx       # fond ShaderGradient assombri
│           └── ShaderBoundary.tsx # filet de sécurité WebGL
└── components/               # ← site FRUIZZ (démo précédente)

scripts/
└── export-standalone.mjs     # post-build : version autonome hors ligne
```

## Effets temps réel

Trois effets open source (MIT) déjà installés servent ici une intention
luxe plutôt que démonstrative :

1. **React Three Fiber + drei** — dans `DiamondShowcase`, un solitaire est
   modélisé en primitives : anneau (`torusGeometry`), panier, quatre griffes
   et un **diamant taillé à la main** (table, couronne, rondiste, pavillon,
   facettes plates) rendu avec `meshPhysicalMaterial` (transmission, IOR 2,42,
   iridescence). Environnement HDR généré à la volée par des `Lightformer`
   (aucun fichier externe), `Sparkles` pour les feux, `OrbitControls` pour
   tourner la pièce, `ContactShadows` au sol.
2. **LiquidMetal (Paper Shaders)** — le logotype AURELIS est dessiné dans un
   canvas puis utilisé comme masque du shader : l'or « coule » dans les lettres.
3. **ShaderGradient** — une aura or/bordeaux très lente en fond du Cercle.

### La bague du Rubis Impérial (`#rubis`)

`effects/RubyRingScene.tsx` construit la pièce de la section signature, d'après
les photos fournies : rubis ovale facetté (couronne haute, pavillon profond),
halo de 22 brillants, griffes, baguettes d'épaule, jonc en platine.

Le modèle est **entièrement procédural** (aucun fichier 3D) : les gemmes sont
générées en géométrie non indexée pour obtenir des facettes nettes.

L'animation ne dépend pas du temps mais du **défilement** : `RubySignature`
suit `scrollYProgress` avec un ressort, publie la valeur dans une `ref`
(aucun re-render par image) et `useFrame` y lit la progression pour :

- faire pivoter la bague de trois-quarts gauche à trois-quarts droit,
- resserrer le cadrage au milieu du parcours,
- faire scintiller le halo (rotation lente),
- allumer le rubis (`emissiveIntensity` de 0,14 à 0,52).

Sans WebGL (ou si `prefers-reduced-motion`), un visuel photographique prend le
relais : la section reste lisible et le texte identique.

**Performances** : la scène 3D ne tourne que lorsqu'elle est visible
(`useInView`), elle est désactivée sur mobile et si l'utilisateur préfère
réduire les animations ; un `ShaderBoundary` remplace tout échec WebGL par une
image ou le logotype, jamais par une page blanche.

## Détails d'expérience

- **Coffret** (panier de démonstration) : ajout depuis le catalogue ou au
  survol des cartes, quantités, total, persistance de l'ouverture, fermeture
  par `Échap`, blocage du défilement derrière le tiroir.
- **Formulaires** : rendez-vous en boutique (nom, courriel, date, boutique,
  projet) et invitation au Cercle, avec écrans de confirmation.
- **Accessibilité** : lien d'évitement, focus visible doré, `aria-label` sur
  toutes les commandes icônes, `aria-modal` sur le tiroir, images toutes
  décrites, contrastes relevés sur les micro-libellés.
- **Mobile** : menu plein écran, hero recadré, grilles repensées, aucun
  débordement horizontal (vérifié à 360 px).
- **SEO / partage** : titre, description, Open Graph, favicon SVG.

## Télécharger le site

Le bouton **« Télécharger le site »** est présent deux fois : dans le bandeau
de service (version compacte) et sous le formulaire du Cercle (version
complète, avec l'option « inclure les images »).

| Format | Contenu |
| --- | --- |
| `aurelis-haute-joaillerie.html` | la page complète en un fichier (CSS + JS intégrés), images non incluses |
| `aurelis-haute-joaillerie.zip` | `index.html` + `images/…` + `favicon.svg` + `logo.svg`, prêt à ouvrir hors ligne |

Détails d'implémentation :

- `npm run build` produit `dist/index.html` (fichier unique via
  `vite-plugin-singlefile`) puis `scripts/export-standalone.mjs` en dérive
  `public/aurelis-site.html` : mêmes styles, mêmes scripts, chemins d'images
  rendus relatifs (`images/…`).
- Le bouton récupère ce fichier ; à défaut (serveur sans le fichier), il clone
  le document courant en nettoyant l'état de l'interface.
- Le ZIP est écrit **sans dépendance** (méthode « store ») : en-têtes locaux,
  répertoire central, CRC32 calculé en JavaScript, date DOS fixe pour un
  export reproductible.
- Les visuels sont collectés depuis le DOM **et** depuis les chemins cités par
  le bundle, pour inclure les images des sections pas encore montées.
- Les polices restent chargées depuis Google Fonts : hors ligne, le site
  s'affiche avec les polices de substitution (Times / Helvetica).

## Palette

| Rôle | Valeur |
| --- | --- |
| Noir de fond | `#070708` |
| Noir carte | `#0d0d10` |
| Ivoire | `#f4efe6` |
| Or | `#c8a24a` |
| Or clair | `#ebd6a3` |
| Or profond | `#87682c` |
| Bordeaux | `#3a1119` |
