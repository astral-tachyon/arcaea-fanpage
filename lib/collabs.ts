import assets from "@/lib/collab-assets.json";

export type CollabKind = "rhythm" | "other";

export type Collab = {
  id: string;
  name: string;
  /** Who makes it, where that is well known. */
  by?: string;
  /** Short description of what the other title is. */
  genre: string;
  kind: CollabKind;
  year: number;
  description: string;
  /** Songs added to Arcaea (mobile version). Null when the number is not confirmed. */
  songs: number | null;
  /** Anything worth saying about the songs beyond the count. */
  songsNote?: string;
  /** Titles of the songs in the mobile pack, from the fan wiki. Empty when not known yet. */
  songList: string[];
  partners: string[];
};

// Facts are for the mobile version, oldest first.
export const collabs: Collab[] = [
  {
    id: "dynamix",
    name: "Dynamix",
    by: "C4Cat",
    genre: "Mobile rhythm game",
    kind: "rhythm",
    year: 2017,
    description: "The first crossover, only months after launch. It brought a sound the game did not have yet.",
    songs: 5,
    songList: ["Moonlight of Sand Castle", "REconstruction", "Evoltex (poppi'n mix)", "Oracle", "αterlβus"],
    partners: ["Sapphire"],
  },
  {
    id: "stellights",
    name: "Stellights",
    genre: "Mobile rhythm game",
    kind: "rhythm",
    year: 2017,
    description: "A small two-song exchange. The pack was later retired and its songs moved into the Memory Archive.",
    songs: 2,
    songList: ["Surrender", "Yosakura Fubuki"],
    partners: ["Stella"],
  },
  {
    id: "lanota",
    name: "Lanota",
    by: "Noxy Games",
    genre: "Mobile rhythm game",
    kind: "rhythm",
    year: 2018,
    description: "Hikari travels with Lanota's Fisica, and the two games share an original song written for the occasion.",
    songs: 5,
    songsNote: "including the original “Quon”",
    songList: ["Dream goes on", "Journey", "Specta", "Quon", "cyanine"],
    partners: ["Hikari & Fisica"],
  },
  {
    id: "tone-sphere",
    name: "Tone Sphere",
    by: "sta",
    genre: "Mobile rhythm game",
    kind: "rhythm",
    year: 2018,
    description: "Trin leads Tairitsu through five of Tone Sphere's best-known tracks.",
    songs: 5,
    songList: ["Hikari", "Hall of Mirrors", "STAGER (ALL STAGE CLEAR)", "Linear Accelerator", "Tiferet"],
    partners: ["Tairitsu & Trin"],
  },
  {
    id: "groove-coaster",
    name: "Groove Coaster",
    by: "TAITO",
    genre: "Arcade and mobile rhythm game",
    kind: "rhythm",
    year: 2019,
    description: "A two-way trade: Groove Coaster songs came to Arcaea, and Arcaea originals went the other way.",
    songs: 6,
    songsNote: "five at launch, with “Got hive of Ra” added later",
    songList: ["MERLIN", "DX Choseinou Full Metal Shojo", "OMAKENO Stroke", "Scarlet Lance", "ouroboros -twin stroke of the end-", "Got hive of Ra"],
    partners: ["Hikari & Seine", "Yume"],
  },
  {
    id: "chunithm",
    name: "CHUNITHM",
    by: "SEGA",
    genre: "Arcade rhythm game",
    kind: "rhythm",
    year: 2019,
    description: "Three demanding songs from the arcades, with Tairitsu joined by the Chuni Penguin.",
    songs: 3,
    songList: ["Garakuta Doll Play", "Ikazuchi", "World Vanquisher"],
    partners: ["Tairitsu & Chuni Penguin"],
  },
  {
    id: "ongeki",
    name: "O.N.G.E.K.I.",
    by: "SEGA",
    genre: "Arcade rhythm game",
    kind: "rhythm",
    year: 2021,
    description: "Luna teams up with Mia for the first of three chapters.",
    songs: 4,
    songsNote: "with two later chapters",
    songList: ["Lazy Addiction", "Dazzle hop", "Viyella's Tears", "ω4"],
    partners: ["Luna & Mia"],
  },
  {
    id: "maimai",
    name: "maimai",
    by: "SEGA",
    genre: "Arcade rhythm game",
    kind: "rhythm",
    year: 2021,
    description: "Four well-loved songs from the washing-machine-shaped arcade cabinet, followed by two more chapters.",
    songs: 4,
    songsNote: "with two later chapters",
    songList: ["April showers", "7thSense", "Oshama Scramble!", "AMAZING MIGHTYYYY!!!!"],
    partners: [],
  },
  {
    id: "wacca",
    name: "WACCA",
    by: "Marvelous",
    genre: "Arcade rhythm game",
    kind: "rhythm",
    year: 2021,
    description: "Each game remixed one of the other's originals, and songs moved in both directions.",
    songs: 5,
    songList: ["Quon (DJ Noriken)", "with U", "Let you DIVE! (nitro rmx)", "Mazy Metroplex", "GENOCIDER"],
    partners: ["Saya & Elizabeth", "Lily"],
  },
  {
    id: "muse-dash",
    name: "Muse Dash",
    by: "PeroPeroGames",
    genre: "Rhythm action game",
    kind: "rhythm",
    year: 2021,
    description: "Marija drops in, and Muse Dash received Arcaea songs plus a title screen starring Tairitsu.",
    songs: 4,
    songsNote: "including the original “Haze of Autumn”",
    songList: ["Lights of Muse", "Final Step!", "Haze of Autumn", "Medusa"],
    partners: ["Marija"],
  },
  {
    id: "cytus-ii",
    name: "Cytus II",
    by: "Rayark",
    genre: "Mobile rhythm game",
    kind: "rhythm",
    year: 2023,
    description: "A long-requested meeting. Ilith is joined by Ivy for four Cytus II favourites and one new original.",
    songs: 5,
    songsNote: "including the original “Lucid Traveler”",
    songList: ["Bullet Waiting for Me (James Landino remix)", "Devillic Sphere", "Lucid Traveler", "CHAOS", "Used to be"],
    partners: ["Ilith & Ivy"],
  },
  {
    id: "rotaeno",
    name: "Rotaeno",
    by: "Dream Engine Games",
    genre: "Mobile rhythm game",
    kind: "rhythm",
    year: 2024,
    description: "The first crossover with its own story chapter, following Luna and Ilot.",
    songs: 5,
    songsNote: "one of them original",
    songList: ["Waltz for Lorelei", "Dual Doom Deathmatch", "Inverted World", "MVURBD", "Vulcānus"],
    partners: ["Luna & Ilot", "Eto & Hoppe"],
  },
  {
    id: "undertale",
    name: "UNDERTALE",
    by: "Toby Fox",
    genre: "Role-playing game",
    kind: "other",
    year: 2025,
    description:
      "The first step outside rhythm games: five songs from the much-loved RPG, charted for the sky. The pack is on sale for a limited time.",
    songs: 5,
    songList: ["Heartache", "Death By Glamour", "Your Best Nightmare", "Last Goodbye", "MEGALOVANIA"],
    partners: [],
  },
  {
    id: "djmax",
    name: "DJMAX",
    by: "NEOWIZ",
    genre: "Rhythm game series",
    kind: "rhythm",
    year: 2025,
    description: "Five classics from across the DJMAX series, with Hikari alongside El Clear.",
    songs: 5,
    songList: ["Ladymade Star", "U.A.D", "End of The Moonlight", "OBLIVION", "Nightmare"],
    partners: ["Hikari & El Clear"],
  },
  {
    id: "arknights",
    name: "Arknights",
    by: "Hypergryph",
    genre: "Strategy game",
    kind: "other",
    year: 2026,
    description: "The newest crossover, and the second with a game from outside the genre. Amiya arrives as an animated partner.",
    songs: null,
    songList: [],
    partners: ["Amiya"],
  },
];

/** Crossovers with music labels rather than games, mentioned in a footnote. */
export const labelCollabs = ["HARDCORE TANO*C", "MEGAREX", "Diverse System"];

/** Image paths for a collaboration, or null where no file has been added yet (see scripts/optimize-images.mjs). */
const { logos, art } = assets as { logos: string[]; art: string[] };

export const collabLogo = (id: string) => (logos.includes(id) ? `/art/collabs/logos/${id}.webp` : null);
export const collabArt = (id: string) => (art.includes(id) ? `/art/collabs/${id}.webp` : null);
