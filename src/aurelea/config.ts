/**
 * Identité de la maison — tout est centralisé ici.
 *
 * Changer `name` met à jour le site entier (header, footer, métadonnées,
 * panier, export). Aucun autre fichier ne doit contenir le nom en dur.
 */
export const BRAND = {
  name: "AURÉLÉA",
  suffix: "ATELIER",
  fullName: "Auréléa Atelier",
  tagline: "Haute joaillerie contemporaine — Paris",
  taglineShort: "Haute joaillerie · Paris",
  founded: "Maison fondée en 2016",
  email: "atelier@aurelea.example",
  phone: "+33 1 84 80 20 16",
  address: "16, rue de la Paix — 75002 Paris",
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Pinterest", href: "https://pinterest.com" },
  ],
  shipping: {
    freeAbove: 1500,
    standard: 25,
    label: "Livraison assurée",
  },
  /** Paiement non branché : le panier reste une démonstration assumée. */
  paymentEnabled: false,
} as const;

export const NAV = [
  { label: "Collections", href: "#collections" },
  { label: "Haute joaillerie", href: "#haute-joaillerie" },
  { label: "La Maison", href: "#/maison" },
  { label: "Catalogue", href: "#/catalogue" },
] as const;
