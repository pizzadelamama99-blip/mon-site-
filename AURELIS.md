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
│       ├── Hero.tsx          # photo plein écran + parallaxe + ken burns
│       ├── Marquee.tsx       # bandeau défilant de réassurance
│       ├── Collections.tsx   # 3 collections, cartes éditoriales
│       ├── DiamondShowcase.tsx  # pièce d'exception + scène 3D
│       ├── SavoirFaire.tsx   # atelier, 4 étapes, image parallaxe
│       ├── Catalog.tsx       # 8 pièces, filtres par catégorie
│       ├── Editorial.tsx     # pleine largeur, « La main est un paysage »
│       ├── Press.tsx         # citations presse
│       ├── Appointment.tsx   # formulaire + 3 boutiques
│       ├── Cercle.tsx        # inscription + aura ShaderGradient
│       ├── Footer.tsx
│       ├── CoffretDrawer.tsx # tiroir latéral (sélection, quantités, total)
│       ├── ui.tsx            # boutons, filets, micro-libellés, Reveal
│       └── effects/
│           ├── DiamondScene.tsx   # solitaire 3D temps réel (R3F + drei)
│           ├── GoldLogo.tsx       # logotype en or liquide (shader)
│           ├── GoldAura.tsx       # fond ShaderGradient assombri
│           └── ShaderBoundary.tsx # filet de sécurité WebGL
└── components/               # ← site FRUIZZ (démo précédente)
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
