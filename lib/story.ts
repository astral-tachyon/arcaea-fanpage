export type Chapter = {
  /** The path marker used in the game's story menu. */
  mark: string;
  title: string;
  who: string;
  /** A release year, or a word for chapters that are not out yet. */
  year: number | string;
  summary: string;
  scene?: { src: string; alt: string };
  /** YouTube id of the chapter's trailer on lowiro's channel. */
  trailer?: string;
  /** Not released yet: shown as a dashed placeholder. */
  upcoming?: boolean;
};

export type StoryArc = { id: string; title: string; note: string; chapters: Chapter[]; upcoming?: boolean };

const scene = (file: string, alt: string) => ({ src: `/art/scenes/${file}.webp`, alt });

// Summaries are deliberately light on spoilers.
export const mainStory: StoryArc[] = [
  {
    id: "act-1",
    title: "Act I",
    note: "The story of Hikari and Tairitsu, told from both sides until the two meet.",
    chapters: [
      {
        mark: "0",
        title: "Arcaea",
        who: "Hikari & Tairitsu",
        year: 2024,
        summary: "A free prologue. Two girls open their eyes in a white, ruined world where shards of glass hang in the air.",
        scene: scene("prologue", "Hikari asleep among golden flowers and drifting shards of glass"),
      },
      {
        mark: "1 · 2",
        title: "Eternal Core",
        who: "Hikari / Tairitsu",
        year: 2017,
        summary:
          "Each girl begins gathering the shards, called Arcaea, and finds that they hold memories. Hikari is drawn to the bright ones. Tairitsu can only find the dark.",
        scene: scene("eternal-core-hikari", "Hikari reaching toward floating glass under a bright sky"),
      },
      {
        mark: "2",
        title: "Vicious Labyrinth",
        who: "Tairitsu",
        year: 2017,
        summary: "Tairitsu resolves to collect every painful memory in the hope of ending them. The weight of that promise starts to tell.",
        scene: scene("vicious-labyrinth", "Tairitsu sitting among shards of cold blue glass"),
        trailer: "lQdNEsmbar8",
      },
      {
        mark: "1",
        title: "Luminous Sky",
        who: "Hikari",
        year: 2018,
        summary: "Hikari builds a sky out of nothing but happy memories and slowly loses herself inside it, until something has to give.",
        scene: scene("luminous-sky", "Hikari with a glass blade as the sky splinters around her"),
        trailer: "9csQByvTuvE",
      },
      {
        mark: "V",
        title: "Adverse Prelude",
        who: "Hikari & Tairitsu",
        year: 2019,
        summary: "The two finally cross paths. For a moment, each finds exactly what she was missing.",
        scene: scene("adverse-prelude", "Hikari and Tairitsu meeting among flowers and ruins"),
        trailer: "XaiqobGHmgw",
      },
      {
        mark: "VS",
        title: "Black Fate",
        who: "Hikari & Tairitsu",
        year: 2020,
        summary: "One memory turns a fragile friendship into a duel that neither of them wanted.",
        scene: scene("black-fate", "Hikari and Tairitsu facing each other across a shattering sky"),
        trailer: "TscajncWNPA",
      },
      {
        mark: "F",
        title: "Final Verdict",
        who: "Hikari & Tairitsu",
        year: 2022,
        summary: "The finale of Act I, and the reckoning for everything the two have done to each other.",
        scene: scene("final-verdict", "Tairitsu and Hikari reaching toward each other amid petals and blades"),
        trailer: "Mhg9neH3Ug0",
      },
      {
        mark: "E",
        title: "Silent Answer",
        who: "Hikari / Tairitsu",
        year: 2022,
        summary: "A quiet epilogue about what comes after.",
        scene: scene("silent-answer", "Hikari and Tairitsu standing together on a ridge under a pale sky"),
        trailer: "LIsxuJ6w2PA",
      },
    ],
  },
  {
    id: "act-2",
    title: "Act II: Catastrophe",
    note: "A new cast, bigger questions, and a story that is still being written.",
    chapters: [
      {
        mark: "15",
        title: "Lasting Eden",
        who: "Maya",
        year: 2023,
        summary: "The second act opens with a new lead. Maya's journey asks questions the first act never raised.",
        scene: scene("lasting-eden", "A lone figure kneeling in a dark hall scattered with red"),
      },
      {
        mark: "16",
        title: "Severed Eden",
        who: "Maya, Insight",
        year: 2023,
        summary: "Maya's path collides with a figure known as Insight, and the calm of the opening chapter does not survive it.",
        scene: scene("severed-eden", "A dark silhouette before a vast violet sphere"),
        trailer: "cwxmvzOPTxU",
      },
      {
        mark: "18",
        title: "Absolute Nihil",
        who: "Saya, Lethe",
        year: 2024,
        summary: "Saya's search for reason turns into something colder, and Lethe is drawn into it.",
        scene: scene("absolute-nihil-2", "Two figures clashing in a blur of green and gold"),
        trailer: "kmMZ9bBfP4U",
      },
      {
        mark: "20",
        title: "Lucent Historia",
        who: "Compassion",
        year: 2024,
        summary: "The focus moves to another new figure as Act II digs into the world's past.",
        trailer: "f7hssW8XEzE",
      },
      {
        mark: "23",
        title: "Liminal Eclipse",
        who: "Maya",
        year: 2025,
        summary: "Maya returns, and she is not who she was.",
        trailer: "G4bJMVrbYIM",
      },
      {
        mark: "New",
        title: "Divine Oblivion",
        who: "Main Story, Pack 4",
        year: 2026,
        summary: "The latest chapter of Act II.",
        trailer: "lpFOdkLgHi4",
      },
    ],
  },
  {
    id: "act-3",
    title: "Act III",
    note: "To Be Continued",
    upcoming: true,
    chapters: [
      {
        mark: "?",
        title: "Coming Soon",
        who: "To be continued",
        year: "TBA",
        summary: "The next act has not been revealed yet. Until then, there is plenty of Act II left to play.",
        upcoming: true,
      },
    ],
  },
];

export const sideStories: Chapter[] = [
  {
    mark: "3",
    title: "Absolute Reason",
    who: "Saya",
    year: 2019,
    summary: "Saya refuses to simply accept the world. She tests it, pokes at its rules, and goes looking for whoever wrote them.",
    scene: scene("absolute-reason", "Saya seated at a table in a dim, chandelier-lit room"),
    trailer: "NAKNcMPbC2I",
  },
  {
    mark: "4",
    title: "Crimson Solace",
    who: "Kou",
    year: 2019,
    summary: "Kou has been here a long time and has chosen to enjoy it. A bright, warm wander through the ruins.",
    scene: scene("crimson-solace-2", "Kou watching fireworks burst over the night sky"),
  },
  {
    mark: "5",
    title: "Ambivalent Vision",
    who: "Lethe",
    year: 2020,
    summary: "Lethe carries a scythe and a firm sense of purpose. Her story is about what happens when that certainty wavers.",
    scene: scene("ambivalent-vision-2", "Lethe seen from behind, facing tall rose-coloured pillars"),
  },
  {
    mark: "7",
    title: "Ephemeral Page",
    who: "Alice & Tenniel",
    year: 2020,
    summary: "A girl and her steadfast companion follow a tale that begins like a storybook and ends like a memory.",
    scene: scene("ephemeral-page-2", "Alice in a blue gown among snow-covered ruins"),
  },
  {
    mark: "9",
    title: "Esoteric Order",
    who: "Lagrange",
    year: 2021,
    summary: "Lagrange and her satellite companion Charon observe the world like scientists, and have pointed questions for whoever made it.",
    scene: scene("esoteric-order", "Lagrange floating through a dark hall of geometric glass"),
    trailer: "LnuwCjAbU0E",
  },
  {
    mark: "10",
    title: "Binary Enfold",
    who: "Eto & Luna",
    year: 2021,
    summary: "Twin sisters, one gentle and one merciless, and the bond that holds them together.",
    scene: scene("binary-enfold", "Eto and Luna standing together at a railing"),
  },
  {
    mark: "S",
    title: "Divided Heart",
    who: "Shirahime",
    year: 2021,
    summary: "Shirahime's own tale, with a visit from a familiar cheerful face.",
    scene: scene("divided-heart", "Kou and Shirahime side by side where a dark sky meets a pale one"),
  },
  {
    mark: "11",
    title: "Colorful Dream",
    who: "Ayu",
    year: 2022,
    summary: "Carefree Ayu and her two bats, Fans and Drem, in one of the game's lighter stories.",
    scene: scene("colorful-dream-2", "Ayu laughing, arms flung wide"),
  },
  {
    mark: "17",
    title: "Sunset Radiance",
    who: "Kanae",
    year: 2024,
    summary: "Kanae steps into the spotlight for a side story of her own.",
    scene: scene("sunset-radiance", "Kanae in profile against a soft blue sky, flowers in her braided hair"),
  },
  {
    mark: "21",
    title: "Extant Anima",
    who: "Nonoka",
    year: 2025,
    summary: "A recent side story that introduces Nonoka.",
    trailer: "LxHpSDZvqfU",
  },
  {
    mark: "?",
    title: "Coming Soon",
    who: "Unknown",
    year: "Beyond",
    summary: "Stay tuned for more side stories!",
    upcoming: true,
  },
];
