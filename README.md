# FRUIZZ — site soda (démo)

Site vitrine de démonstration pour une marque fictive de sodas aux fruits,
construit avec **React 19 + Vite 7 + Tailwind 4**.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build production (fichier unique)
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
