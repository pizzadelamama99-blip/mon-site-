# FRUIZZ × AURELIS — deux démonstrations

Un seul build, deux sites :

- **Maison AURELIS** (par défaut, `/`) — haute joaillerie, noir & or :
  hero éditorial, **bague rubis 3D animée au défilement**, section atelier
  ivoire, engagements, et **site téléchargeable** (HTML ou ZIP).
  Documentation : **[AURELIS.md](./AURELIS.md)**
- **FRUIZZ** (`/#/fruizz`) — concept soda, avec les 4 effets du guide DM.

Basé sur **React 19 + Vite 7 + Tailwind 4**.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build production (fichier unique) + export autonome
npm run preview  # sert le build
```

## Effets visuels

Le site intègre les **4 effets open source (MIT)** du guide DM :

| Effet | Repo | Où c'est utilisé |
| --- | --- | --- |
| ShaderGradient | [ruucm/shadergradient](https://github.com/ruucm/shadergradient) | fond animé de la hero |
| Liquid Logo | [paper-design/shaders](https://github.com/paper-design/shaders) | logo métal liquide (section 3D) |
| Liquid Glass | [dashersw/liquid-glass-js](https://github.com/dashersw/liquid-glass-js) | navbar, boutons, cartes |
| React Three Fiber | [pmndrs/react-three-fiber](https://github.com/pmndrs/react-three-fiber) | scène 3D des canettes |

Détail des installs, des réglages et des adaptations : **[EFFETS-VISUELS.md](./EFFETS-VISUELS.md)**.

## Structure

```
src/
├── components/        # sections du site
│   └── effects/       # composants d'effets réutilisables
├── context/           # panier
├── data/              # saveurs + témoignages
├── hooks/             # media queries / reduced motion
└── utils/
```

> Marque, produits, prix et témoignages fictifs — aucune commande réelle.
