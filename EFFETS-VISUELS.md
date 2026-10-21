# 4 effets visuels — ce qui a été installé sur le site FRUIZZ

Suivi du guide **« 4 repos GitHub effets visuels — liens et guide »** (SC-024).
Les quatre effets sont installés, branchés sur le site et visibles dans l'aperçu.

Projet : **React 19 + Vite 7 + Tailwind 4 + TypeScript** (prérequis : Node.js 18+ ✅).

---

## Ce qui a été installé

```bash
# 1. ShaderGradient
npm i @shadergradient/react @react-three/fiber three three-stdlib camera-controls

# 2. Liquid Logo (métal liquide)
npm i @paper-design/shaders-react

# 4. React Three Fiber + helpers drei
npm install three @react-three/fiber @react-three/drei
```

Poignées de réglage : tout est regroupé dans `src/components/effects/`.

```
src/
├── components/
│   ├── effects/
│   │   ├── ShaderBackground.tsx   # effet 1 — gradient 3D animé
│   │   ├── LiquidLogo.tsx         # effet 2 — logo en métal liquide
│   │   ├── LiquidGlass.tsx        # effet 3 — verre liquide (wrapper React)
│   │   └── CanScene.tsx           # effet 4 — scène 3D React Three Fiber
│   ├── EffectsLab.tsx             # section « Apesanteur 3D » qui met tout en scène
│   ├── Hero.tsx                   # effet 1 + bouton verre
│   └── Navbar.tsx                 # barre de nav en verre liquide
├── hooks/
│   └── useMediaQuery.ts           # mobile / prefers-reduced-motion
public/
└── logo.svg                       # wordmark utilisé comme masque du métal liquide
```

---

## 1 · ShaderGradient — gradient animé

- **Repo** : https://github.com/ruucm/shadergradient · **Démo** : https://www.shadergradient.co/customize
- **Où** : fond de la hero section (`src/components/Hero.tsx` → `ShaderBackground`).
- **Réglages** : `color1 / color2 / color3` = fuchsia `#e8328f`, lime `#ddf3a5`, sun `#ffc93c`.
  `type="waterPlane"`, `uSpeed={0.22}`, `uDensity={1.15}`, `uStrength={1.9}`, caméra `cDistance/cAzimuthAngle/cPolarAngle`.
- **Personnaliser à la souris** : ouvre [le customizer](https://www.shadergradient.co/customize), règle ton gradient, copie l'URL générée puis remplace les props par :

  ```jsx
  <ShaderGradient control="query" urlString="COLLE_TON_URL_ICI" />
  ```

- Deux voiles `bg-gradient-to-*` en lime par-dessus gardent le texte lisible et raccordent le fond à la charte.

## 2 · Liquid Logo — métal liquide

- **Démo sans coder** : https://liquid.paper.design · **Package** : https://github.com/paper-design/shaders
- **Où** : emblème de la section « Apesanteur 3D » (`EffectsLab`).
- ⚠️ **L'API a changé depuis le guide.** Le guide parle de `refraction / edge / liquify / patternScale`.
  La version installée (`@paper-design/shaders-react@0.0.82`) expose d'autres noms — correspondance appliquée :

  | Guide (ancienne API) | Version installée |
  | --- | --- |
  | `refraction` | `softness` + `contour` |
  | `edge` | `contour` |
  | `liquify` | `distortion` |
  | `speed` | `speed` |
  | `patternScale` | `repetition` |

  Props réellement passées : `repetition={2.1}`, `softness={0.55}`, `distortion={0.24}`,
  `contour={0.36}`, `angle={30}`, `speed={0.35}`, `fit="contain"`.
- **Image** : `public/logo.svg` (wordmark sur fond transparent — le SVG est traité en masque alpha).
  Remplace ce fichier par ton propre logo pour changer le rendu.

## 3 · Liquid Glass — verre façon Apple

- **Repo** : https://github.com/dashersw/liquid-glass-js · **Démo** : https://dashersw.github.io/liquid-glass-js/
- **Où** : barre de navigation (pilule en verre), bouton « Découvrir les saveurs » de la hero,
  carte « Verre liquide » de la section 3D.
- **Réglages** (identiques aux curseurs de la démo) : `blur` 1→15, `tintOpacity` 0→1,
  `edgeIntensity` 0→0.1, `variant` `card | pill | circle`.
- **Note d'intégration** : le repo d'origine est du **JS vanilla** (`container.js` + `button.js`,
  plus `html2canvas` pour capturer la page). Sur ce site, l'effet est **wrappé en composants React**
  (`LiquidGlass`, `LiquidGlassButton`, `LiquidGlassContainer`) avec le même vocabulaire de réglages.
  Raison : `html2canvas@1.4.1` ne sait pas lire les couleurs `oklch()` de Tailwind 4 et la capture
  pleine page casse la mise en page ; le wrapper CSS + `backdrop-filter` + réfraction SVG donne le
  même rendu sans dépendance externe ni capture d'écran.

## 4 · React Three Fiber — la 3D

- **Repo** : https://github.com/pmndrs/react-three-fiber · **Docs** : https://docs.pmnd.rs/react-three-fiber
- **Où** : section « Apesanteur 3D » (`CanScene`), trois canettes navigables à la souris.
- **Contenu** : canettes construites en primitives (`cylinderGeometry` + `torusGeometry` pour la
  languette), étiquettes générées dans un `<canvas>` 2D puis utilisées comme texture (`CanvasTexture`).
  `Float` fait flotter les canettes, `OrbitControls` (drei) permet de tourner la scène,
  `ContactShadows` pose l'ombre au sol.
- **Aller plus loin** : `@react-three/drei` est déjà installé (helpers caméra, ombres, chargement de
  modèles `.glb`).

---

## Perf & accessibilité (le « bon à savoir » du guide)

- Les effets WebGL sont **désactivés sur mobile** (`useIsMobile`) : la hero retombe sur un gradient
  CSS et la 3D sur l'image hero — comme conseillé, les effets restent sur une seule section.
- Si l'utilisateur a `prefers-reduced-motion: reduce`, les animations 3D et la rotation automatique
  sont coupées (`useReducedMotion`).
- La scène 3D vérifie la disponibilité de WebGL avant de monter le `<Canvas>` et affiche une image
  de secours sinon.
- Les quatre bibliothèques sont **open source MIT**, usage commercial inclus.

## Lancer en local

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # build de production (fichier unique, via vite-plugin-singlefile)
```
