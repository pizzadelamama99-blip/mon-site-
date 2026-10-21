/**
 * Catalogue de démonstration.
 *
 * Toutes les pièces, pierres et prix sont fictifs : ce site est une
 * démonstration de maison de haute joaillerie, pas un catalogue réel.
 */

export type MetalId = "or-champagne" | "or-blanc" | "platine" | "or-rose";
export type StoneId = "diamant" | "rubis" | "emeraude" | "saphir" | "perle";
export type ShapeId = "marquise" | "ovale" | "ronde" | "emeraude" | "poire" | "baguette";
export type CategoryId = "Bagues" | "Fiançailles" | "Alliances" | "Colliers" | "Bracelets" | "Boucles";

export const METALS: Record<MetalId, { name: string; short: string; color: string; delta: number }> = {
  "or-champagne": { name: "Or champagne 18 ct", short: "Or champagne", color: "#d8b984", delta: 0 },
  "or-blanc": { name: "Or blanc 18 ct", short: "Or blanc", color: "#e9eaee", delta: 0 },
  "or-rose": { name: "Or rose 18 ct", short: "Or rose", color: "#e2b4a5", delta: 0 },
  platine: { name: "Platine 950", short: "Platine", color: "#dfe2e8", delta: 700 },
};

export const STONES: Record<StoneId, { name: string; color: string; accent: string }> = {
  diamant: { name: "Diamant", color: "#ffffff", accent: "#dfe9ff" },
  rubis: { name: "Rubis", color: "#a3102a", accent: "#ff2d4d" },
  emeraude: { name: "Émeraude", color: "#0f6b4a", accent: "#25c78d" },
  saphir: { name: "Saphir", color: "#1c2f6e", accent: "#4d7bff" },
  perle: { name: "Perle", color: "#f3ecdf", accent: "#fff8ea" },
};

export type Collection = {
  slug: string;
  name: string;
  line: string;
  text: string;
  image: string;
  focus?: string;
};

export const COLLECTIONS: Collection[] = [
  {
    slug: "solitaires",
    name: "Les Solitaires",
    line: "Une pierre, une ligne",
    text: "Le diamant seul, tenu par quatre griffes. Rien à retirer, rien à ajouter.",
    image: "/images/solitaire-marquise.jpg",
    focus: "50% 64%",
  },
  {
    slug: "fiancailles",
    name: "Les Fiançailles",
    line: "La promesse, en creux",
    text: "Des montures basses, pensées pour se porter chaque jour sans jamais s'user.",
    image: "/images/solitaire-ovale.jpg",
  },
  {
    slug: "rubis",
    name: "Les Rubis",
    line: "Le rouge de l'éternité",
    text: "Une pierre de caractère, révélée par l'éclat intemporel des diamants.",
    image: "/images/rubis-halo.jpg",
  },
  {
    slug: "diamants",
    name: "Les Diamants",
    line: "La lumière, taillée",
    text: "Des lignes de pierres choisies pour leur éclat, jamais pour leur nombre.",
    image: "/images/collier-riviere.jpg",
  },
  {
    slug: "alliances",
    name: "Les Alliances",
    line: "Deux gestes, un anneau",
    text: "Des joncs épais, brossés à la main, où chaque diamant est posé un à un.",
    image: "/images/alliance-baguettes.jpg",
  },
  {
    slug: "colliers",
    name: "Les Colliers",
    line: "Près du jour, près du soir",
    text: "Du fil d'or le plus discret à la rivière de diamants la plus affirmée.",
    image: "/images/collier-emeraude.jpg",
  },
  {
    slug: "bracelets",
    name: "Les Bracelets",
    line: "À portée de main",
    text: "Des maillons pleins, articulés à la lime, qui épousent le poignet.",
    image: "/images/bracelet-serpentine.jpg",
  },
  {
    slug: "sur-mesure",
    name: "Créations sur mesure",
    line: "Un dessin, une seule fois",
    text: "Nous dessinons à partir d'une pierre que vous aimez, ou que vous apportez.",
    image: "/images/atelier-sertissage.jpg",
  },
];

export type Product = {
  slug: string;
  name: string;
  collection: string;
  category: CategoryId;
  stone: StoneId;
  shape: ShapeId;
  metal: MetalId;
  price: number;
  carat?: string;
  image: string;
  /** Cadrage de la photo (object-position), pour distinguer deux pièces
      qui partagent un même visuel de démonstration. */
  focus?: string;
  gallery?: string[];
  tagline: string;
  description: string;
  details: string[];
  sizes?: number[];
  metals: MetalId[];
  available: boolean;
  signature?: boolean;
};

const RING_SIZES = [48, 50, 52, 54, 56, 58];

export const PRODUCTS: Product[] = [
  {
    slug: "solitaire-eclat",
    name: "Solitaire Éclat",
    collection: "solitaires",
    category: "Bagues",
    stone: "diamant",
    shape: "marquise",
    metal: "or-champagne",
    price: 12400,
    carat: "Diamant marquise 1,25 ct",
    image: "/images/solitaire-marquise.jpg",
    tagline: "Marquise, or champagne",
    description:
      "Une marquise de 1,25 ct, montée sur un anneau d'or champagne brossé. Les griffes sont limées à la main pour disparaître sous la couronne : la pierre semble posée, immobile, au-dessus du doigt.",
    details: [
      "Centre : diamant taille marquise, 1,25 ct, D–E / VVS",
      "Monture : or champagne 18 ct, finition brossée",
      "Griffes : quatre, limées et polies à la main",
      "Largeur du jonc : 2,1 mm",
      "Référence : AE-SOL-001",
    ],
    sizes: RING_SIZES,
    metals: ["or-champagne", "or-blanc", "platine"],
    available: true,
    signature: true,
  },
  {
    slug: "solitaire-vestale",
    name: "Solitaire Vestale",
    collection: "solitaires",
    category: "Bagues",
    stone: "diamant",
    shape: "ovale",
    metal: "platine",
    price: 15800,
    carat: "Diamant ovale 1,50 ct",
    image: "/images/solitaire-ovale.jpg",
    focus: "50% 58%",
    tagline: "Ovale, platine",
    description:
      "L'ovale allonge la main et renvoie la lumière sur toute sa longueur. Un classique, desserré de la mode par un jonc de platine à peine plus large qu'un fil.",
    details: [
      "Centre : diamant taille ovale, 1,50 ct, E / VS1",
      "Monture : platine 950, poli miroir",
      "Sertissage : quatre griffes, pavé sur les épaules",
      "Largeur du jonc : 1,9 mm",
      "Référence : AE-SOL-002",
    ],
    sizes: RING_SIZES,
    metals: ["platine", "or-blanc", "or-champagne"],
    available: true,
  },
  {
    slug: "rubis-eternite",
    name: "Rubis Éternité",
    collection: "rubis",
    category: "Bagues",
    stone: "rubis",
    shape: "ovale",
    metal: "platine",
    price: 36800,
    carat: "Rubis ovale 4,18 ct",
    image: "/images/rubis-halo.jpg",
    tagline: "Halo de diamants, platine",
    description:
      "Un rubis ovale de 4,18 ct, cerclé d'un halo de vingt-deux brillants. Les griffes sont écartées aux quatre points cardinaux pour laisser la pierre respirer — et la lumière entrer.",
    details: [
      "Centre : rubis ovale non chauffé, 4,18 ct",
      "Halo : 22 diamants taille brillant, D–E / VVS",
      "Monture : platine 950, couronne ajourée",
      "Baguettes : 8 diamants calibrés sur les épaules",
      "Référence : AE-RUB-001",
    ],
    sizes: RING_SIZES,
    metals: ["platine", "or-blanc"],
    available: true,
    signature: true,
  },
  {
    slug: "rubis-nuit",
    name: "Rubis Nuit",
    collection: "rubis",
    category: "Bagues",
    stone: "rubis",
    shape: "poire",
    metal: "or-rose",
    price: 22600,
    carat: "Rubis poire 2,60 ct",
    image: "/images/rubis-halo.jpg",
    focus: "42% 46%",
    tagline: "Poire, or rose",
    description:
      "Une poire profondément colorée, posée de biais sur un jonc d'or rose. Le déséquilibre est calculé : la pierre penche de douze degrés, comme un bijou porté depuis toujours.",
    details: [
      "Centre : rubis taille poire, 2,60 ct",
      "Monture : or rose 18 ct",
      "Accent : deux diamants taille poire sur les épaules",
      "Référence : AE-RUB-002",
    ],
    sizes: RING_SIZES,
    metals: ["or-rose", "or-champagne", "platine"],
    available: true,
  },
  {
    slug: "alliance-eternite",
    name: "Alliance Éternité",
    collection: "alliances",
    category: "Alliances",
    stone: "diamant",
    shape: "baguette",
    metal: "or-blanc",
    price: 9600,
    carat: "Diamants taille émeraude",
    image: "/images/alliance-baguettes.jpg",
    tagline: "Baguettes, or blanc",
    description:
      "Une ronde de diamants taille émeraude, serti clos sur tout le tour. Chaque pierre est calibrée au dixième de millimètre pour que le filet de lumière reste continu.",
    details: [
      "Pierres : 14 diamants taille émeraude, D–E / VVS",
      "Monture : or blanc 18 ct, serti clos",
      "Largeur : 3,4 mm",
      "Référence : AE-ALL-001",
    ],
    sizes: RING_SIZES,
    metals: ["or-blanc", "or-champagne", "platine"],
    available: true,
  },
  {
    slug: "alliance-ruban",
    name: "Alliance Ruban",
    collection: "alliances",
    category: "Alliances",
    stone: "diamant",
    shape: "ronde",
    metal: "or-champagne",
    price: 3200,
    carat: "Or massif",
    image: "/images/alliance-baguettes.jpg",
    focus: "50% 58%",
    tagline: "Or champagne, uni",
    description:
      "Un ruban d'or champagne de 4 mm, brossé dans le sens de la longueur. Aucune pierre : la ligne seule, et la lumière rasante qui la traverse.",
    details: [
      "Monture : or champagne 18 ct massif",
      "Finition : brossée satinée, bords polis",
      "Largeur : 4 mm",
      "Référence : AE-ALL-002",
    ],
    sizes: RING_SIZES,
    metals: ["or-champagne", "or-rose", "or-blanc", "platine"],
    available: true,
  },
  {
    slug: "riviere-lumiere",
    name: "Rivière de Lumière",
    collection: "diamants",
    category: "Colliers",
    stone: "diamant",
    shape: "ronde",
    metal: "platine",
    price: 42500,
    carat: "54 diamants — 8,40 ct",
    image: "/images/collier-riviere.jpg",
    tagline: "Rivière, platine",
    description:
      "Cinquante-quatre brillants d'un calibre décroissant, serti à la main sur une chaîne de platine presque invisible. La rivière se porte au creux du cou, sans fermoir apparent.",
    details: [
      "Pierres : 54 diamants taille brillant, 8,40 ct au total",
      "Monture : platine 950",
      "Longueur : 42 cm réglable",
      "Référence : AE-COL-001",
    ],
    metals: ["platine", "or-blanc"],
    available: true,
    signature: true,
  },
  {
    slug: "emeraude-imperiale",
    name: "Émeraude Impériale",
    collection: "colliers",
    category: "Colliers",
    stone: "emeraude",
    shape: "emeraude",
    metal: "or-champagne",
    price: 28900,
    carat: "Émeraude 3,10 ct",
    image: "/images/collier-emeraude.jpg",
    tagline: "Émeraude, or champagne",
    description:
      "Une émeraude taille émeraude, tenue par quatre griffes fines sur une maille serpentine d'or champagne. La pierre se porte haute, comme un sceau.",
    details: [
      "Centre : émeraude taille émeraude, 3,10 ct",
      "Monture : or champagne 18 ct",
      "Chaîne : maille serpentine, 45 cm",
      "Référence : AE-COL-002",
    ],
    metals: ["or-champagne", "or-blanc"],
    available: true,
  },
  {
    slug: "pendentif-lune",
    name: "Pendentif Lune",
    collection: "colliers",
    category: "Colliers",
    stone: "diamant",
    shape: "ronde",
    metal: "or-blanc",
    price: 5300,
    carat: "Diamant rond 0,45 ct",
    image: "/images/collier-riviere.jpg",
    focus: "50% 62%",
    tagline: "Solitaire suspendu",
    description:
      "Un brillant unique suspendu à un fil d'or blanc. Le pendentif coulisse sur la chaîne : on le porte haut le jour, plus bas le soir.",
    details: [
      "Centre : diamant taille brillant, 0,45 ct, D / VS1",
      "Monture : or blanc 18 ct",
      "Chaîne : 40–45 cm, curseur coulissant",
      "Référence : AE-COL-003",
    ],
    metals: ["or-blanc", "or-champagne", "or-rose"],
    available: true,
  },
  {
    slug: "bracelet-serpentine",
    name: "Bracelet Serpentine",
    collection: "bracelets",
    category: "Bracelets",
    stone: "diamant",
    shape: "ronde",
    metal: "or-champagne",
    price: 14600,
    carat: "38 diamants — 1,90 ct",
    image: "/images/bracelet-serpentine.jpg",
    tagline: "Maille serpentine, or champagne",
    description:
      "Une maille articulée à la lime, souple comme un ruban, où trente-huit brillants sont posés en quinconce. Le bracelet se ferme d'un cran invisible.",
    details: [
      "Pierres : 38 diamants taille brillant, 1,90 ct au total",
      "Monture : or champagne 18 ct",
      "Fermoir : cran invisible, double sécurité",
      "Référence : AE-BRA-001",
    ],
    metals: ["or-champagne", "or-blanc"],
    available: true,
  },
  {
    slug: "bracelet-riviera",
    name: "Bracelet Riviera",
    collection: "bracelets",
    category: "Bracelets",
    stone: "diamant",
    shape: "emeraude",
    metal: "platine",
    price: 22000,
    carat: "22 diamants — 4,20 ct",
    image: "/images/bracelet-serpentine.jpg",
    focus: "50% 40%",
    tagline: "Baguettes, platine",
    description:
      "Vingt-deux diamants taille émeraude alignés sur un rail de platine. Le bracelet est lourd, volontairement : il doit rappeler sa présence au poignet.",
    details: [
      "Pierres : 22 diamants taille émeraude, 4,20 ct au total",
      "Monture : platine 950",
      "Fermoir : boîte, double cliquet",
      "Référence : AE-BRA-002",
    ],
    metals: ["platine", "or-blanc"],
    available: true,
  },
  {
    slug: "boucles-larme",
    name: "Boucles Larme",
    collection: "diamants",
    category: "Boucles",
    stone: "diamant",
    shape: "poire",
    metal: "or-blanc",
    price: 6400,
    carat: "2 × 0,55 ct",
    image: "/images/boucles-larme.jpg",
    tagline: "Poires, or blanc",
    description:
      "Deux poires suspendues à un fil d'or blanc, à peine plus longues que le lobe. Elles bougent avec le visage et renvoient la lumière en marchant.",
    details: [
      "Pierres : deux diamants taille poire, 0,55 ct chacun",
      "Monture : or blanc 18 ct",
      "Fermoir : tige et papillon sécurisé",
      "Référence : AE-BOU-001",
    ],
    metals: ["or-blanc", "or-champagne", "or-rose"],
    available: true,
  },
  {
    slug: "boucles-aube",
    name: "Boucles Aube",
    collection: "diamants",
    category: "Boucles",
    stone: "perle",
    shape: "ronde",
    metal: "or-champagne",
    price: 4900,
    carat: "Perles Akoya 8 mm",
    image: "/images/boucles-larme.jpg",
    focus: "52% 58%",
    tagline: "Perles, or champagne",
    description:
      "Deux perles Akoya de 8 mm, posées sur une ancre d'or champagne. La nacre garde la lumière du matin, sans reflet dur.",
    details: [
      "Perles : Akoya 8 mm, orient rose",
      "Monture : or champagne 18 ct",
      "Fermoir : tige et papillon",
      "Référence : AE-BOU-002",
    ],
    metals: ["or-champagne", "or-blanc"],
    available: false,
  },
  {
    slug: "bague-sillage",
    name: "Bague Sillage",
    collection: "fiancailles",
    category: "Fiançailles",
    stone: "diamant",
    shape: "ronde",
    metal: "or-blanc",
    price: 8200,
    carat: "Diamant rond 0,80 ct",
    image: "/images/solitaire-ovale.jpg",
    focus: "48% 62%",
    tagline: "Rond, or blanc",
    description:
      "Un brillant de 0,80 ct monté bas, à hauteur de doigt. La monture est creusée sous la pierre pour laisser passer la lumière et permettre de porter une alliance à côté.",
    details: [
      "Centre : diamant taille brillant, 0,80 ct, D–E / VS",
      "Monture : or blanc 18 ct, serti à quatre griffes",
      "Hauteur : 4,2 mm — pensé pour être porté avec une alliance",
      "Référence : AE-FIA-001",
    ],
    sizes: RING_SIZES,
    metals: ["or-blanc", "or-champagne", "platine", "or-rose"],
    available: true,
  },
  {
    slug: "bague-vestale-rose",
    name: "Bague Vestale",
    collection: "fiancailles",
    category: "Fiançailles",
    stone: "saphir",
    shape: "ovale",
    metal: "or-blanc",
    price: 11200,
    carat: "Saphir ovale 1,80 ct",
    image: "/images/rubis-halo.jpg",
    focus: "58% 58%",
    tagline: "Saphir, or blanc",
    description:
      "Un saphir ovale d'un bleu profond, entouré d'un halo de brillants. La pièce se porte seule : elle n'a pas besoin d'être accompagnée.",
    details: [
      "Centre : saphir taille ovale, 1,80 ct",
      "Halo : 18 diamants taille brillant",
      "Monture : or blanc 18 ct",
      "Référence : AE-FIA-002",
    ],
    sizes: RING_SIZES,
    metals: ["or-blanc", "platine"],
    available: true,
  },
];

export const CRAFT_STEPS = [
  {
    n: "01",
    title: "Sélection des pierres",
    text: "Chaque centre est choisi à la lumière du jour, face au nord, sur un papier blanc. Une pierre retenue sur dix.",
  },
  {
    n: "02",
    title: "Dessin et conception",
    text: "Le dessin se fait à la gouache, à l'échelle réelle. Rien ne part en fabrication sans avoir été porté sur papier plusieurs fois.",
  },
  {
    n: "03",
    title: "Travail du métal",
    text: "Le jonc est tiré, mis en forme, limé, puis brossé dans un seul sens. Trois passages, jamais plus.",
  },
  {
    n: "04",
    title: "Sertissage et finition",
    text: "Le sertisseur travaille sous binoculaire, au dixième de millimètre. La pièce est ensuite polie, contrôlée, puis signée.",
  },
] as const;

export const BOUTIQUES = [
  { city: "Paris", address: "16, rue de la Paix — 75002", tel: "+33 1 84 80 20 16" },
  { city: "Genève", address: "4, rue du Rhône — 1204", tel: "+41 22 310 20 16" },
  { city: "Tokyo", address: "Ginza 5-chōme, Chūō-ku", tel: "+81 3 5250 2016" },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

export const productPath = (slug: string) => `#/creation/${slug}`;

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const getCollection = (slug: string) => COLLECTIONS.find((c) => c.slug === slug);
export const productsOf = (collection: string) =>
  PRODUCTS.filter((p) => p.collection === collection);
