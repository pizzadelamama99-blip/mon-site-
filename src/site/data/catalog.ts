export type Piece = {
  id: string;
  name: string;
  collection: string;
  category: "Bagues" | "Colliers" | "Boucles" | "Bracelets";
  material: string;
  stones: string;
  carat?: string;
  price: number;
  image: string;
  note: string;
  signature?: boolean;
  /** point focal du recadrage (object-position) */
  focus?: string;
};

export const pieces: Piece[] = [
  {
    id: "solitaire-aurea",
    name: "Solitaire Auréa",
    collection: "Éclat",
    category: "Bagues",
    material: "Or jaune 18 carats",
    stones: "Diamant taille brillant",
    carat: "1,52 ct",
    price: 14800,
    image: "/images/ring-solitaire.jpg",
    note: "Un diamant unique, choisi pour sa pureté, monté à la main sur quatre griffes effilées.",
    signature: true,
  },
  {
    id: "collier-emeraude",
    name: "Collier Émeraude Impériale",
    collection: "Jardin Secret",
    category: "Colliers",
    material: "Or jaune 18 carats",
    stones: "Émeraude cabochon & pavé de diamants",
    carat: "18,4 ct",
    price: 42500,
    image: "/images/necklace-emerald.jpg",
    note: "Une émeraude de Colombie, cerclée d'un pavé de diamants taillés à la main.",
    signature: true,
  },
  {
    id: "bracelet-serpentine",
    name: "Bracelet Serpentine",
    collection: "Métamorphoses",
    category: "Bracelets",
    material: "Or rose 18 carats",
    stones: "Pavé de 486 diamants",
    carat: "4,12 ct",
    price: 24800,
    image: "/images/bracelet.jpg",
    note: "Trois tours souples, une étreinte de lumière. Serti en continu, sans un visible.",
  },
  {
    id: "boucles-nuit",
    name: "Boucles Nuit d'Ivoire",
    collection: "Éclat",
    category: "Boucles",
    material: "Or blanc 18 carats",
    stones: "Diamants poire, 2 × 1,10 ct",
    carat: "2,20 ct",
    price: 11500,
    image: "/images/earrings.jpg",
    note: "Deux larmes de lumière qui accompagnent le mouvement du visage.",
  },
  {
    id: "bracelet-gourmette",
    name: "Bracelet Gourmette",
    collection: "Ligne Or",
    category: "Bracelets",
    material: "Or jaune 18 carats",
    stones: "Maillons sertis de diamants",
    carat: "1,86 ct",
    price: 8900,
    image: "/images/bracelet-noir.jpg",
    note: "Une gourmette redessinée : maillons pleins, sertis un à un, fermoir invisible.",
  },
  {
    id: "collier-larme",
    name: "Pendentif Larme de Lumière",
    collection: "Éclat",
    category: "Colliers",
    material: "Or jaune 18 carats",
    stones: "Diamant poire",
    carat: "0,94 ct",
    price: 6400,
    image: "/images/hero-necklace.jpg",
    note: "La discrétion d'une chaîne fine, la présence d'un diamant qui capte la lumière.",
  },
  {
    id: "bague-sillage",
    name: "Bague Sillage",
    collection: "Métamorphoses",
    category: "Bagues",
    material: "Or rose 18 carats",
    stones: "Diamants épars",
    carat: "0,68 ct",
    price: 4900,
    image: "/images/editorial-mains.jpg",
    focus: "88% 48%",
    note: "Trois anneaux à porter ensemble, comme une écriture sur la main.",
  },
  {
    id: "creoles-aurum",
    name: "Créoles Aurum",
    collection: "Ligne Or",
    category: "Boucles",
    material: "Or jaune 18 carats",
    stones: "Or massif poli",
    price: 2400,
    image: "/images/creoles-or.jpg",
    note: "L'évidence d'un anneau d'or, dessiné pour ne jamais quitter l'oreille.",
  },
  {
    id: "rubis-imperial",
    name: "Rubis Impérial",
    collection: "Jardin Secret",
    category: "Bagues" as const,
    material: "Platine 950",
    stones: "Rubis ovale non chauffé & diamants",
    carat: "4,18 ct",
    price: 36800,
    image: "/images/ruby-ring.jpg",
    focus: "50% 42%",
    note: "Un rubis de Birmanie cerclé de vingt-deux brillants, épaules de baguettes calibrées.",
    signature: true,
  },
  {
    id: "alliance-eternite",
    name: "Alliance Éternité",
    collection: "Éclat",
    category: "Bagues" as const,
    material: "Or blanc 18 carats",
    stones: "Diamants taille émeraude",
    carat: "5,60 ct",
    price: 28900,
    image: "/images/eternity-white.jpg",
    note: "Vingt-quatre diamants taille émeraude, sertis clos, sur tout le tour du jonc.",
  },
  {
    id: "pendantes-lumiere",
    name: "Pendantes Lumière",
    collection: "Éclat",
    category: "Boucles" as const,
    material: "Or blanc 18 carats",
    stones: "Diamants marquise en cascade",
    carat: "3,40 ct",
    price: 13400,
    image: "/images/portrait-earrings.jpg",
    focus: "46% 52%",
    note: "Une cascade de marquises qui accompagne chaque mouvement du visage.",
  },
  {
    id: "riviere-diamants",
    name: "Rivière de Diamants",
    collection: "Jardin Secret",
    category: "Colliers",
    material: "Or blanc 18 carats",
    stones: "42 diamants taille ancienne",
    carat: "12,8 ct",
    price: 68000,
    image: "/images/necklace-emerald.jpg",
    note: "Une pièce de haute joaillerie, montée sur commande en six mois d'atelier.",
    signature: true,
    },
];

export const collections = [
  {
    id: "eclat",
    name: "Éclat",
    subtitle: "La lumière, taillée",
    text: "Diamants blancs et montures invisibles. La collection fondatrice de la maison.",
    image: "/images/ring-solitaire.jpg",
    count: 24,
  },
  {
    id: "jardin-secret",
    name: "Jardin Secret",
    subtitle: "Pierres de couleur",
    text: "Émeraudes, saphirs et tourmalines, choisies une à une pour leur profondeur.",
    image: "/images/necklace-emerald.jpg",
    count: 18,
  },
  {
    id: "metamorphoses",
    name: "Métamorphoses",
    subtitle: "L'or, en mouvement",
    text: "Pièces souples, serties en continu, dessinées pour épouser le corps.",
    image: "/images/bracelet-noir.jpg",
    count: 12,
  },
];

export const stonesSpecs = [
  { label: "Poids", value: "3,04 ct" },
  { label: "Taille", value: "Brillant 57 facettes" },
  { label: "Couleur", value: "D — incolore" },
  { label: "Pureté", value: "VVS1" },
  { label: "Certificat", value: "GIA · 2486 1792" },
  { label: "Monture", value: "Platine 950" },
];

export const atelierSteps = [
  {
    n: "01",
    title: "La sélection",
    text: "Chaque pierre est choisie à Anvers, à la lumière du jour, par nos gemmologues. Une sur cent est retenue.",
  },
  {
    n: "02",
    title: "Le dessin",
    text: "Le motif est peint à la gouache, grandeur réelle, avant d'être transposé en cire.",
  },
  {
    n: "03",
    title: "Le sertissage",
    text: "À la pince, sous loupe binoculaire. Un diamant mal posé ne se rattrape pas — seuls trois artisans de la maison le font.",
  },
  {
    n: "04",
    title: "Le poli",
    text: "Quarante-huit heures de finition, à la main, pour que l'or reflète la lumière sans la trahir.",
  },
];

export const pressQuotes = [
  {
    quote:
      "Une maison qui cultive la discrétion avec une précision d'orfèvre. Le solitaire Auréa est déjà un classique.",
    source: "Revue de la Place",
    year: "2026",
  },
  {
    quote:
      "Rares sont les ateliers où l'on sent encore la main de l'artisan derrière chaque serti.",
    source: "Cahiers du Luxe",
    year: "2025",
  },
  {
    quote:
      "L'émeraude impériale d'Aurelis est l'une des pièces les plus remarquables vues cette année.",
    source: "L'Éclat",
    year: "2026",
  },
];

export const microCopy = [
  {
    title: "Pièces d'exception",
    text: "Une seule pièce par dessin. Les pierres sont sélectionnées à Anvers, à la lumière du jour.",
    image: "/images/ruby-ring.jpg",
    focus: "52% 45%",
  },
  {
    title: "Serti à la main",
    text: "Trois artisans, loupe binoculaire ×10, pince à sertir. Un geste qui ne pardonne pas l'approximation.",
    image: "/images/atelier.jpg",
  },
  {
    title: "Assortiment rare",
    text: "Bagues, colliers, pendantes et bracelets : chaque famille est dessinée comme un ensemble.",
    image: "/images/portrait-earrings.jpg",
    focus: "46% 45%",
  },
  {
    title: "Écrin signature",
    text: "Écrin en cuir pleine fleur, certificat gemmologique et entretien annuel à vie.",
    image: "/images/salon.jpg",
    focus: "50% 42%",
  },
];

export const boutiques = [
  { city: "Paris", address: "12, place Vendôme — 1er", tel: "+33 1 42 60 00 00" },
  { city: "Genève", address: "8, rue du Rhône", tel: "+41 22 310 00 00" },
  { city: "Tokyo", address: "Ginza 4-chōme, Chūō-ku", tel: "+81 3 5250 0000" },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
