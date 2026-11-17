export const site = {
  name: "Arcaea",
  title: "Arcaea — Play the ground. Trace the sky.",
  description:
    "Arcaea is a 3D rhythm game for iOS, Android and Nintendo Switch. Tap notes on the ground, trace arcs through the sky, and uncover a story told in shards of glass.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  official: "https://arcaea.lowiro.com/en",
  // Placeholder: point this at the official merchandise store.
  merch: "https://arcaea.lowiro.com/en",
} as const;

export type Store = {
  id: "ios" | "android" | "switch";
  label: string;
  device: string;
  /** Alt text for the badge image. */
  cta: string;
  badge: string;
  href: string;
};

export const stores: Store[] = [
  {
    id: "ios",
    label: "App Store",
    device: "iPhone & iPad",
    cta: "Download Arcaea on the App Store",
    badge: "/art/badges/app-store.webp",
    href: "https://apps.apple.com/app/arcaea/id1205999125",
  },
  {
    id: "android",
    label: "Google Play",
    device: "Android",
    cta: "Get Arcaea on Google Play",
    badge: "/art/badges/google-play.webp",
    href: "https://play.google.com/store/apps/details?id=moe.low.arc",
  },
  {
    id: "switch",
    label: "Nintendo eShop",
    device: "Nintendo Switch",
    cta: "Get Arcaea on the Nintendo eShop",
    badge: "/art/badges/nintendo-eshop.webp",
    href: "https://www.nintendo.com/us/store/products/arcaea-switch/",
  },
];

/** Arcaea's official pages. */
export const socials = [
  { id: "x", name: "X", handle: "@arcaea_en", href: "https://x.com/arcaea_en" },
  { id: "facebook", name: "Facebook", handle: "facebook.com/arcaeagame", href: "https://www.facebook.com/arcaeagame" },
  { id: "discord", name: "Discord", handle: "discord.gg/arcaea", href: "https://discord.gg/arcaea" },
] as const;

export const nav = [
  { href: "#gameplay", label: "Gameplay" },
  { href: "#music", label: "Music" },
  { href: "#partners", label: "Partners" },
  { href: "#story", label: "Story" },
  { href: "#collabs", label: "Collabs" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#trailers", label: "Trailers" },
] as const;
