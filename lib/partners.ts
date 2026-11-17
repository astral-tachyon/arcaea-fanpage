export type PartnerGroup = "leads" | "hikari" | "tairitsu" | "reunion" | "cast";

/** One piece of full-body artwork, at /art/partners/{id}{suffix}.webp. */
export type Look = { label: string; suffix: string };

export type Scene = { src: string; alt: string; caption: string };

export type Partner = {
  id: string;
  name: string;
  /** Short line under the name. */
  epithet: string;
  group: PartnerGroup;
  /** Whether the outfit is mostly light or dark. The profile backdrop is chosen to match. */
  tone: "light" | "dark";
  /** Menu background shown behind the artwork, on the card and in the profile. */
  scenery: string;
  /** Artwork the profile can switch between. The first is the default. */
  looks: Look[];
  bio: string[];
  facts: { label: string; value: string }[];
  scenes: Scene[];
};

const look = (label: string, suffix = ""): Look => ({ label, suffix });

const scene = (file: string, caption: string, alt: string): Scene => ({
  src: `/art/scenes/${file}.webp`,
  caption,
  alt,
});

export const groups: { id: PartnerGroup; title: string; blurb: string }[] = [
  { id: "leads", title: "The two", blurb: "The girls at the centre of it all." },
  { id: "hikari", title: "Hikari", blurb: "Who she becomes as the light closes in." },
  { id: "tairitsu", title: "Tairitsu", blurb: "Who she becomes as the dark piles up." },
  { id: "reunion", title: "Together", blurb: "Where both of their stories lead." },
  { id: "cast", title: "Along the way", blurb: "Others who woke in the same world, each with a tale of their own." },
];

export const partners: Partner[] = [
  {
    id: "hikari",
    name: "Hikari",
    epithet: "The girl who follows the light",
    group: "leads",
    tone: "light",
    scenery: "/art/bg/light-city.webp",
    looks: [look("Default"), look("Awakened", "-alt"), look("Legacy", "-legacy")],
    bio: [
      "Hikari wakes in a world of white with no memory of who she is, and decides almost at once that she likes it here. The glass shards drifting around her hold happy memories, so she starts collecting them, mostly on a whim.",
      "She is impulsive, cheerful and a little careless. She has only ever seen the bright side of this world, and it has not yet occurred to her that there might be another.",
    ],
    facts: [
      { label: "Name", value: "“Light” in Japanese (光)" },
      { label: "Story", value: "Main Story, Act I" },
      { label: "Signature song", value: "PRAGMATISM" },
      { label: "Illustration", value: "Suzunashi; original design by cierra" },
    ],
    scenes: [
      scene("prologue", "Arcaea (prologue)", "Hikari asleep among golden flowers and drifting shards of glass"),
      scene("eternal-core-hikari", "Eternal Core", "Hikari reaching toward floating glass under a bright sky"),
    ],
  },
  {
    id: "tairitsu",
    name: "Tairitsu",
    epithet: "The girl who walks into the dark",
    group: "leads",
    tone: "dark",
    scenery: "/art/bg/dark-tower.webp",
    looks: [look("Default"), look("Awakened", "-alt"), look("Legacy", "-legacy")],
    bio: [
      "Tairitsu wakes in the same white world, but the shards that gather around her hold only painful memories. Where Hikari sees wonder, she sees a world that has lost something.",
      "She is guarded and serious, and she sets herself a task: gather the dark memories, all of them, in the hope that something better is left once they are gone.",
    ],
    facts: [
      { label: "Name", value: "“Conflict” in Japanese (対立)" },
      { label: "Story", value: "Main Story, Act I" },
      { label: "Signature song", value: "Sheriruth" },
      { label: "Illustration", value: "Suzunashi; original design by cierra" },
    ],
    scenes: [
      scene("eternal-core-tairitsu", "Eternal Core", "Tairitsu standing alone on a pale slope beneath a distant spire"),
      scene("adverse-prelude", "Adverse Prelude", "Hikari and Tairitsu meeting for the first time among flowers and ruins"),
    ],
  },
  {
    id: "hikari-zero",
    name: "Hikari (Zero)",
    epithet: "Lost in a sky of her own making",
    group: "hikari",
    tone: "light",
    scenery: "/art/bg/light-scenery.webp",
    looks: [look("Default")],
    bio: [
      "Too much light, and nothing to do with it. Surrounded by endless pleasant memories and no purpose, Hikari stops finding joy in any of them.",
      "Little by little she lets go of her curiosity, her will, and finally her sense of who she is.",
    ],
    facts: [
      { label: "Appears in", value: "Luminous Sky" },
      { label: "Signature song", value: "Ether Strike" },
    ],
    scenes: [scene("luminous-sky-zero", "Luminous Sky", "Hikari in a white dress, pale and distant among drifting flowers")],
  },
  {
    id: "hikari-fracture",
    name: "Hikari (Fracture)",
    epithet: "The one who broke free",
    group: "hikari",
    tone: "light",
    scenery: "/art/bg/light-shards.webp",
    looks: [look("Default")],
    bio: [
      "Having nearly lost her mind to the light, Hikari shatters the sky she built and comes back changed.",
      "She is more careful now, and far more curious. She wants to know what this world is, what happened to it, and what she is supposed to do in it.",
    ],
    facts: [
      { label: "Appears in", value: "Luminous Sky, Adverse Prelude, Black Fate, Final Verdict" },
      { label: "Signature song", value: "Fracture Ray" },
    ],
    scenes: [
      scene("luminous-sky", "Luminous Sky", "Hikari with a glass blade as the sky splinters into shards around her"),
      scene("black-fate-hikari", "Black Fate", "Hikari kneeling with her blade lowered, pale light behind her"),
    ],
  },
  {
    id: "hikari-fatalis",
    name: "Hikari (Fatalis)",
    epithet: "Fated, and no longer gentle",
    group: "hikari",
    tone: "light",
    scenery: "/art/bg/light-horizon.webp",
    looks: [look("Default")],
    bio: [
      "By the end of Act I, Hikari's impulsiveness has hardened into something sharper. She is still naive, but now she is ruthless with it, and thinks of little beyond her own survival.",
      "“Fatalis” is Latin for both “destined” and “deadly”.",
    ],
    facts: [{ label: "Appears in", value: "Final Verdict, Silent Answer" }],
    scenes: [scene("final-verdict-fatalis", "Final Verdict", "Hikari adrift in a dark space filled with broken glass")],
  },
  {
    id: "tairitsu-axium",
    name: "Tairitsu (Axium)",
    epithet: "Certain she can end it",
    group: "tairitsu",
    tone: "dark",
    scenery: "/art/bg/dark-violet.webp",
    looks: [look("Default")],
    bio: [
      "Tairitsu has grown confident. She smiles at each dark memory she finds, because every one she gathers is one fewer left in the world.",
      "She has made peace with not seeing anything bright for a long while. She believes the work will be worth it.",
    ],
    facts: [
      { label: "Appears in", value: "Vicious Labyrinth" },
      { label: "Signature song", value: "Axium Crisis" },
    ],
    scenes: [scene("vicious-labyrinth-axium", "Vicious Labyrinth", "Tairitsu holding flowers as shards of glass swirl around her")],
  },
  {
    id: "tairitsu-grievous-lady",
    name: "Tairitsu (Grievous Lady)",
    epithet: "What the labyrinth left behind",
    group: "tairitsu",
    tone: "dark",
    scenery: "/art/bg/dark-cavern.webp",
    looks: [look("Default")],
    bio: [
      "The labyrinth of memories breaks her. What walks out is an empty shell, with no hope left and no reason to keep going.",
      "She wanders without purpose, carrying a frustration that has nowhere to go.",
    ],
    facts: [
      { label: "Appears in", value: "Vicious Labyrinth, Adverse Prelude, Black Fate" },
      { label: "Signature song", value: "Grievous Lady" },
    ],
    scenes: [scene("vicious-labyrinth", "Vicious Labyrinth", "Tairitsu sitting among shards of cold blue glass")],
  },
  {
    id: "tairitsu-tempest",
    name: "Tairitsu (Tempest)",
    epithet: "The storm that answers",
    group: "tairitsu",
    tone: "dark",
    scenery: "/art/bg/dark-sphere.webp",
    looks: [look("Default")],
    bio: [
      "A single memory convinces Tairitsu that Hikari will be her undoing. Every attempt at friendship is now met with open hostility.",
      "This is Tairitsu at her most dangerous, and the reason Black Fate plays the way it does.",
    ],
    facts: [
      { label: "Appears in", value: "Black Fate, Final Verdict" },
      { label: "Signature song", value: "Tempestissimo" },
    ],
    scenes: [
      scene("black-fate-tairitsu", "Black Fate", "Tairitsu beneath her parasol amid dark glass and blue butterflies"),
      scene("black-fate", "Black Fate", "Hikari and Tairitsu facing each other across a shattering sky"),
    ],
  },
  {
    id: "reunion",
    name: "Hikari & Tairitsu (Reunion)",
    epithet: "After everything, together",
    group: "reunion",
    tone: "dark",
    scenery: "/art/bg/dusk-rift.webp",
    looks: [look("Default")],
    bio: [
      "In the epilogue the two finally stand side by side. Hikari has learned compassion and grown out of her old self-centred ways. Tairitsu has found optimism, and hope for what comes next.",
      "It is the quietest version of both of them, and the happiest.",
    ],
    facts: [{ label: "Appears in", value: "Silent Answer" }],
    scenes: [
      scene("silent-answer", "Silent Answer", "Hikari and Tairitsu standing together on a ridge under a pale sky"),
      scene("silent-answer-field", "Silent Answer", "Two small figures crossing a wide green field toward distant towers"),
    ],
  },
  {
    id: "kou",
    name: "Kou",
    epithet: "A cheery girl with a long history here",
    group: "cast",
    tone: "light",
    scenery: "/art/bg/light-spire.webp",
    looks: [look("Default"), look("Awakened", "-alt")],
    bio: [
      "Kou has been in the world of Arcaea longer than most, and she has decided to enjoy it. She plays among the ruins, makes her own fun, and rarely stops smiling.",
      "Her story is one of the warmest in the game. She also turns up in other characters' tales.",
    ],
    facts: [
      { label: "Name", value: "“Crimson” in Japanese (紅)" },
      { label: "Story", value: "Crimson Solace (Side Story)" },
      { label: "Signature song", value: "Nirv lucE" },
      { label: "Illustration", value: "cierra" },
    ],
    scenes: [
      scene("crimson-solace-1", "Crimson Solace", "Kou tumbling happily through the air among floating furniture"),
      scene("crimson-solace-2", "Crimson Solace", "Kou watching fireworks burst over the night sky"),
    ],
  },
  {
    id: "lethe",
    name: "Lethe",
    epithet: "Scythe in hand, sure of her purpose",
    group: "cast",
    tone: "dark",
    scenery: "/art/bg/dark-ember.webp",
    looks: [look("Default"), look("Awakened", "-alt")],
    bio: [
      "Lethe carries a scythe and a quiet conviction about what she is here to do. Her story follows what happens when that certainty begins to waver.",
      "She returns later in the Main Story, where her path crosses Saya's.",
    ],
    facts: [
      { label: "Name", value: "Greek for “oblivion” (λήθη)" },
      { label: "Story", value: "Ambivalent Vision (Side Story)" },
      { label: "Signature song", value: "Lethaeus" },
      { label: "Illustration", value: "softmode" },
    ],
    scenes: [
      scene("ambivalent-vision-1", "Ambivalent Vision", "Lethe gripping her scythe, horns framed by white ribbons"),
      scene("ambivalent-vision-2", "Ambivalent Vision", "Lethe seen from behind, facing tall rose-coloured pillars"),
    ],
  },
  {
    id: "eto",
    name: "Eto",
    epithet: "The gentle twin",
    group: "cast",
    tone: "light",
    scenery: "/art/bg/blue-castle.webp",
    looks: [look("Default"), look("Awakened", "-alt")],
    bio: [
      "Eto is warm and easy to like, and devoted to her twin sister Luna. The two of them share a single story about staying together in a world that keeps pulling things apart.",
    ],
    facts: [
      { label: "Name", value: "From French “étoile”, star" },
      { label: "Story", value: "Binary Enfold (Side Story)" },
      { label: "Signature song", value: "Memory Forest" },
      { label: "Illustration", value: "cierra" },
    ],
    scenes: [
      scene("binary-enfold", "Binary Enfold", "Eto and Luna standing together at a railing, looking out over grey water"),
      scene("eto-luna", "Memory Forest and Singularity", "Eto and Luna back to back, one in light and one in shadow"),
    ],
  },
  {
    id: "luna",
    name: "Luna",
    epithet: "The merciless twin",
    group: "cast",
    tone: "dark",
    scenery: "/art/bg/dark-orbit.webp",
    looks: [look("Default"), look("Awakened", "-alt")],
    bio: [
      "Luna is cold to almost everyone and dares you to beat her challenge. The one exception is her sister Eto, for whom she has nothing but affection.",
    ],
    facts: [
      { label: "Name", value: "Latin for “moon”" },
      { label: "Story", value: "Binary Enfold (Side Story)" },
      { label: "Signature song", value: "Singularity" },
      { label: "Illustration", value: "cierra" },
    ],
    scenes: [
      scene("binary-enfold", "Binary Enfold", "Eto and Luna standing together at a railing, looking out over grey water"),
      scene("eto-luna", "Memory Forest and Singularity", "Eto and Luna back to back, one in light and one in shadow"),
    ],
  },
  {
    id: "saya",
    name: "Saya",
    epithet: "She wants to know why",
    group: "cast",
    tone: "dark",
    scenery: "/art/bg/dark-garden.webp",
    looks: [look("Default"), look("Awakened", "-alt")],
    bio: [
      "Saya cannot leave a question alone. She wants to know how this world works and why, and she will happily break its rules to find out what the rules are.",
      "Her search continues into Act II, where the answers she finds take her somewhere much darker.",
    ],
    facts: [
      { label: "Story", value: "Absolute Reason (Side Story), Absolute Nihil (Main Story, Act II)" },
      { label: "Signature song", value: "Cyaegha" },
      { label: "Illustration", value: "cierra; awakened art by Suzunashi" },
    ],
    scenes: [
      scene("absolute-reason", "Absolute Reason", "Saya seated at a table in a dim, chandelier-lit room"),
      scene("absolute-nihil-1", "Absolute Nihil", "Saya standing in dark rain as glass falls around her"),
    ],
  },
  {
    id: "ayu",
    name: "Ayu",
    epithet: "Carefree, energetic, comfortable",
    group: "cast",
    tone: "light",
    scenery: "/art/bg/light-rails.webp",
    looks: [look("Default"), look("Awakened", "-alt")],
    bio: [
      "Ayu drifts through the world with two bat companions, Fans and Drem, and not a worry in sight. Her story is lighter than most, and a welcome breath between heavier chapters.",
    ],
    facts: [
      { label: "Name", value: "Written 彩夢: “colorful” and “dream”" },
      { label: "Story", value: "Colorful Dream" },
      { label: "Signature song", value: "Phantasia" },
      { label: "Illustration", value: "Sowiti" },
    ],
    scenes: [
      scene("colorful-dream-1", "Colorful Dream", "Ayu grinning with a sweet in her mouth, a small bat at her shoulder"),
      scene("colorful-dream-2", "Colorful Dream", "Ayu laughing, arms flung wide"),
    ],
  },
  {
    id: "kanae",
    name: "Kanae",
    epithet: "A wish meant to last",
    group: "cast",
    tone: "light",
    scenery: "/art/bg/light-sky.webp",
    looks: [look("Default"), look("Awakened", "-alt")],
    bio: [
      "Kanae steps into the spotlight in Sunset Radiance, a side story of her own. Ayu's two bats, Fans and Drem, turn up in it as well.",
      "She was designed around A Wandering Melody of Love, the grand prize winner of the 2019 Arcaea Song Contest.",
    ],
    facts: [
      { label: "Name", value: "Written 叶永: “to grant wishes” and “forever”" },
      { label: "Story", value: "Sunset Radiance (Side Story)" },
      { label: "Signature song", value: "A Wandering Melody of Love" },
      { label: "Illustration", value: "cierra; awakened art by Bison" },
    ],
    scenes: [scene("sunset-radiance", "Sunset Radiance", "Kanae in profile against a soft blue sky, flowers in her braided hair")],
  },
  {
    id: "shirahime",
    name: "Shirahime",
    epithet: "The white princess",
    group: "cast",
    tone: "light",
    scenery: "/art/bg/light-spheres.webp",
    looks: [look("Default")],
    bio: [
      "Shirahime, whose name means “white princess”, leads a side story of her own called Divided Heart. Kou drops in on it, and the two of them make an unlikely pair.",
    ],
    facts: [
      { label: "Name", value: "“White princess” in Japanese (白姫)" },
      { label: "Story", value: "Divided Heart (Side Story)" },
      { label: "Signature song", value: "Lightning Screw" },
      { label: "Illustration", value: "cierra" },
    ],
    scenes: [scene("divided-heart", "Divided Heart", "Kou and Shirahime side by side where a dark sky meets a pale one")],
  },
  {
    id: "lagrange",
    name: "Lagrange",
    epithet: "Calm, curious, unafraid to ask",
    group: "cast",
    tone: "light",
    scenery: "/art/bg/light-lilac.webp",
    looks: [look("Default")],
    bio: [
      "Lagrange studies the world like a scientist: watching, questioning, and using what she learns to ask better questions. Her satellite companion, Charon, goes everywhere with her.",
      "She was designed around Aegleseeker, the grand prize winner of the 2020 Arcaea Song Contest.",
    ],
    facts: [
      { label: "Name", value: "After the mathematician Joseph-Louis Lagrange" },
      { label: "Story", value: "Esoteric Order (Side Story)" },
      { label: "Signature song", value: "Aegleseeker" },
      { label: "Illustration", value: "cierra" },
    ],
    scenes: [scene("esoteric-order", "Esoteric Order", "Lagrange floating through a dark hall of geometric glass")],
  },
  {
    id: "alice-tenniel",
    name: "Alice & Tenniel",
    epithet: "A girl, her companion, and a story",
    group: "cast",
    tone: "light",
    scenery: "/art/bg/light-stairs.webp",
    looks: [look("Default"), look("Minuet", "-alt")],
    bio: [
      "Alice and Tenniel travel as a pair and are played as one partner. Their names nod to Alice's Adventures in Wonderland and its illustrator, Sir John Tenniel.",
      "Their tale starts like a storybook and ends somewhere far more personal.",
    ],
    facts: [
      { label: "Story", value: "Ephemeral Page (Side Story)" },
      { label: "Signature song", value: "Felis" },
      { label: "Illustration", value: "cierra" },
    ],
    scenes: [
      scene("ephemeral-page-1", "Ephemeral Page", "A girl with long fair hair at a bedside in a sunlit room"),
      scene("ephemeral-page-2", "Ephemeral Page", "Alice in a blue gown among snow-covered ruins"),
    ],
  },
];

/** Partners without a profile here, shown as a scrolling list of names. */
export const morePartners = ["Ilith", "Sapphire", "Shirabe", "Maya", "Stella", "Yuno", "Mir", "Vita", "Nami"];
