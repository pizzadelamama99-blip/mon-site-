export type Flavor = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  notes: string[];
  price: number;
  image: string;
  // Tailwind utility hooks
  bg: string;
  bgSoft: string;
  text: string;
  button: string;
};

export const flavors: Flavor[] = [
  {
    id: "mangue-dragon",
    name: "Mangue Dragon",
    tagline: "Solaire. Audacieuse. Électrique.",
    description:
      "Mangue mûre à point et fruit du dragon rose, pour une bulle tropicale qui ne redescend jamais.",
    notes: ["Mangue Alphonso", "Fruit du dragon", "Pointe de citron vert"],
    price: 2.9,
    image: "/images/can-dragon.png",
    bg: "bg-fuchsia-soda",
    bgSoft: "bg-fuchsia-soda/10",
    text: "text-fuchsia-deep",
    button: "bg-fuchsia-soda hover:bg-fuchsia-deep",
  },
  {
    id: "litchi-lilas",
    name: "Litchi Lilas",
    tagline: "Florale. Nacrée. Rêveuse.",
    description:
      "Litchi juteux et fleur de sureau, une gorgée vaporeuse comme un nuage couleur pastel.",
    notes: ["Litchi de Madagascar", "Fleur de sureau", "Zeste de rose"],
    price: 2.9,
    image: "/images/can-litchi.png",
    bg: "bg-lilac-soda",
    bgSoft: "bg-lilac-soda/15",
    text: "text-lilac-deep",
    button: "bg-lilac-deep hover:bg-ink",
  },
  {
    id: "peche-soleil",
    name: "Pêche Soleil",
    tagline: "Veloutée. Acidulée. Radieuse.",
    description:
      "Pêche blanche veloutée réveillée par le yuzu, la saveur d'un après-midi d'été qui flotte.",
    notes: ["Pêche blanche", "Yuzu du Japon", "Verveine fraîche"],
    price: 2.9,
    image: "/images/can-peche.png",
    bg: "bg-sun",
    bgSoft: "bg-sun/15",
    text: "text-orange-soda",
    button: "bg-orange-soda hover:bg-fuchsia-deep",
  },
];

export const testimonials = [
  {
    name: "Camille R.",
    flavor: "Mangue Dragon",
    quote:
      "On dirait que les fruits flottent vraiment dans la canette. Mon rituel de 16h, sans hésiter.",
    emoji: "🥭",
  },
  {
    name: "Idriss B.",
    flavor: "Litchi Lilas",
    quote:
      "Le litchi-sureau est irréel. C'est doux, pétillant, et la canette est trop belle pour la jeter.",
    emoji: "🪻",
  },
  {
    name: "Louise T.",
    flavor: "Pêche Soleil",
    quote:
      "Pêche + yuzu = combo parfait. Peu sucré mais plein de goût, exactement ce que je cherchais.",
    emoji: "🍑",
  },
];
