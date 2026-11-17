export const stats = [
  { value: 2017, from: 1990, suffix: "", label: "Playing since" },
  { value: 400, from: 0, suffix: "+", label: "Songs to master" },
  { value: 5, from: 0, suffix: "", label: "Difficulty tiers" },
  { value: 3, from: 0, suffix: "", label: "Platforms" },
] as const;

export const features = [
  {
    title: "Ground and sky",
    body: "Notes don't just fall on a flat track. Tap along four lanes on the floor while more notes float overhead, so your hands are always dancing on two levels.",
  },
  {
    title: "Arcs you can trace",
    body: "Blue and pink ribbons of light curve through the air. Catch one with a finger and follow it wherever it bends, crosses or dives.",
  },
  {
    title: "A story in fragments",
    body: "Two girls wake in a ruined world of white, with no memory of who they are. Every chart you clear reveals another shard of what happened.",
  },
  {
    title: "A world to wander",
    body: "Climb through World Mode one step at a time, picking up new songs, partners and surprises along the way.",
  },
  {
    title: "Gentle start, endless ceiling",
    body: "Begin on Past and work up through Present, Future and beyond. There's always a chart that fits tonight's mood, and one that scares you a little.",
  },
  {
    title: "Free to begin",
    body: "Download and play a generous set of songs at no cost, then grow your library with the packs you love most.",
  },
] as const;

export const worlds = [
  { src: "/art/world-1.webp", alt: "A pale castle rising from still blue water under a sky of drifting shards" },
  { src: "/art/world-2.webp", alt: "A violet planet crossed by fine orbital lines against deep space" },
  { src: "/art/world-3.webp", alt: "A rose-white spire surrounded by scattered petals and dark birds" },
  { src: "/art/world-4.webp", alt: "A dark glass sphere holding a silent, overgrown city" },
  { src: "/art/world-5.webp", alt: "A teal-lit stairway lined with flowers and lamps" },
] as const;

/** `bpm` is text because some charts change tempo and list a range. */
export type Song = { title: string; artist: string; bpm: string };

// A hundred well-known tracks, chosen by hand rather than ranked by any play data. Artists and BPM follow the fan wiki.
export const songs: Song[] = [
  { title: "Fracture Ray", artist: "Sakuzyo", bpm: "200" },
  { title: "Grievous Lady", artist: "Team Grimoire vs Laur", bpm: "210" },
  { title: "Tempestissimo", artist: "t+pazolite", bpm: "231" },
  { title: "PRAGMATISM", artist: "Laur", bpm: "174" },
  { title: "Halcyon", artist: "xi", bpm: "191" },
  { title: "Axium Crisis", artist: "ak+q", bpm: "170" },
  { title: "Cyaegha", artist: "USAO", bpm: "200" },
  { title: "Aegleseeker", artist: "Silentroom vs Frums", bpm: "234" },
  { title: "Sheriruth", artist: "Team Grimoire", bpm: "185" },
  { title: "Sayonara Hatsukoi", artist: "REDSHiFT", bpm: "178" },
  { title: "Testify", artist: "void (Mournfinale) feat. 星熊南巫", bpm: "178" },
  { title: "World Ender", artist: "sasakure.UK × TJ.hangneil", bpm: "190–280" },
  { title: "Arcahv", artist: "Feryquitous", bpm: "191" },
  { title: "Ether Strike", artist: "Akira Complex", bpm: "156" },
  { title: "Red and Blue", artist: "Silentroom", bpm: "150" },
  { title: "Ringed Genesis", artist: "Edelritter", bpm: "160" },
  { title: "Singularity", artist: "ETIA.", bpm: "175" },
  { title: "Memory Forest", artist: "ETIA.", bpm: "178" },
  { title: "Lethaeus", artist: "Silentroom", bpm: "155" },
  { title: "Felis", artist: "M2U", bpm: "155" },
  { title: "GOODTEK (Arcaea Edit)", artist: "EBIMAYO", bpm: "190" },
  { title: "Dropdead", artist: "Frums", bpm: "50" },
  { title: "Heavensdoor", artist: "LeaF", bpm: "240" },
  { title: "Bookmaker (2D Version)", artist: "Kobaryo", bpm: "175" },
  { title: "Dandelion", artist: "Farhan", bpm: "169" },
  { title: "Rise", artist: "Combatplayer", bpm: "140" },
  { title: "Lumia", artist: "sky_delta", bpm: "180" },
  { title: "Ignotus", artist: "ak+q", bpm: "170" },
  { title: "Rabbit In The Black Room", artist: "Rabbit House", bpm: "270" },
  { title: "Infinity Heaven", artist: "HyuN", bpm: "160" },
  { title: "Arcana Eden", artist: "Team Grimoire vs Sakuzyo vs Laur", bpm: "211" },
  { title: "SAIKYO STRONGER", artist: "REDALiCE vs USAO", bpm: "205" },
  { title: "Antagonism", artist: "Yooh vs. siromaru", bpm: "160" },
  { title: "PRIMITIVE LIGHTS", artist: "TAG", bpm: "205" },
  { title: "Xterfusion", artist: "REDALiCE × t+pazolite", bpm: "128–256" },
  { title: "Vicious Heroism", artist: "Kobaryo", bpm: "256" },
  { title: "Altale", artist: "Sakuzyo", bpm: "83–90" },
  { title: "conflict", artist: "siromaru + cranky", bpm: "160" },
  { title: "MEGALOVANIA", artist: "Toby Fox", bpm: "240" },
  { title: "Pentiment", artist: "Nothing But Requiem with Museo", bpm: "200–222" },
  { title: "cry of viyella", artist: "Laur", bpm: "75–180" },
  { title: "Relentless", artist: "Akira Complex", bpm: "174" },
  { title: "Essence of Twilight", artist: "ak+q", bpm: "164" },
  { title: "Solitary Dream", artist: "ak+q feat. Sennzai", bpm: "162" },
  { title: "Iconoclast", artist: "Yamajet", bpm: "140" },
  { title: "SOUNDWiTCH", artist: "HATE", bpm: "170" },
  { title: "trappola bewitching", artist: "gmtn.", bpm: "190" },
  { title: "The Message", artist: "Jun Kuroda", bpm: "202" },
  { title: "Vindication", artist: "Laur", bpm: "174" },
  { title: "BLRINK", artist: "Sta", bpm: "115" },
  { title: "Equilibrium", artist: "Maozon", bpm: "180" },
  { title: "Lost Desire", artist: "Powerless feat. Sennzai", bpm: "170" },
  { title: "Dantalion", artist: "Team Grimoire", bpm: "186" },
  { title: "Defection", artist: "TeddyLoid feat. DELTA", bpm: "160" },
  { title: "Infinite Strife,", artist: "BlackYooh vs. siromaru", bpm: "198" },
  { title: "Paradise", artist: "Sound Souler", bpm: "126" },
  { title: "Flashback", artist: "ARForest", bpm: "195" },
  { title: "GLORY：ROAD", artist: "uma vs. モリモリあつし", bpm: "250" },
  { title: "Blossoms", artist: "T2Kazuya", bpm: "138" },
  { title: "Romance Wars", artist: "U-ske (feat. lueur)", bpm: "187" },
  { title: "Genesis", artist: "Iris", bpm: "132" },
  { title: "corps-sans-organes", artist: "cybermiso", bpm: "105" },
  { title: "Antithese", artist: "Blacklolita", bpm: "172" },
  { title: "Black Territory", artist: "DJ Myosuke", bpm: "200" },
  { title: "Corruption", artist: "3R2", bpm: "170" },
  { title: "Silent Rush", artist: "Soleily", bpm: "158" },
  { title: "Strongholds", artist: "Yooh", bpm: "105" },
  { title: "Alice à la mode", artist: "Masanori Akita", bpm: "80–134" },
  { title: "Eccentric Tale", artist: "Yamajet", bpm: "132" },
  { title: "Alice's Suitcase", artist: "Endorfin.", bpm: "190" },
  { title: "Jump", artist: "Rasmus Faber", bpm: "133" },
  { title: "Heart Jackin'", artist: "Yu_Asahina", bpm: "160" },
  { title: "Paper Witch", artist: "Yu-dachi", bpm: "130" },
  { title: "Crystal Gravity", artist: "Tanchiky vs. siromaru", bpm: "178" },
  { title: "Löschen", artist: "BlackY feat. Risa Yuzuki", bpm: "181" },
  { title: "Seclusion", artist: "Laur feat. Sennzai", bpm: "175" },
  { title: "Coastal Highway", artist: "Glitch Droids", bpm: "110" },
  { title: "Overwhelm", artist: "xi", bpm: "200" },
  { title: "Chelsea", artist: "7mai", bpm: "174" },
  { title: "Valhalla:0", artist: "Juggernaut.", bpm: "200" },
  { title: "Hotarubi no Yuki", artist: "Endorfin.", bpm: "159" },
  { title: "Blue Rose", artist: "Cosmograph", bpm: "250–295" },
  { title: "nέo κósmo", artist: "ak+q × Street", bpm: "190" },
  { title: "Lightning Screw", artist: "HiTECH NINJA", bpm: "190" },
  { title: "UNKNOWN LEVELS", artist: "Yuta Imai", bpm: "110–165" },
  { title: "DataErr0r", artist: "Cosmograph", bpm: "180" },
  { title: "Auxesia", artist: "ginkiha", bpm: "183" },
  { title: "Modelista", artist: "HiTECH NINJA", bpm: "165" },
  { title: "Be There", artist: "PSYQUI", bpm: "164" },
  { title: "Fallensquare", artist: "Silentroom", bpm: "99" },
  { title: "Phantasia", artist: "Yunosuke", bpm: "153" },
  { title: "Empire of Winter", artist: "Street", bpm: "175" },
  { title: "Libertas", artist: "Zekk", bpm: "160" },
  { title: "Dreadnought", artist: "Mastermind (xi+nora2r)", bpm: "96–384" },
  { title: "Mirzam", artist: "Aoi vs. siqlo", bpm: "201" },
  { title: "amygdata", artist: "nitro", bpm: "154" },
  { title: "BADTEK", artist: "EBIMAYO", bpm: "190" },
  { title: "Xeraphinite", artist: "BlackY", bpm: "146" },
  { title: "GIMME DA BLOOD", artist: "C-Show", bpm: "87–110" },
  { title: "Macrocosmic Modulation", artist: "JAKAZiD", bpm: "170" },
];

export type ReviewSource = "App Store" | "Google Play" | "Nintendo Switch";

// Short excerpts from public five-star store reviews. Reviewer names are intentionally left out.
// The Nintendo eShop does not publish player reviews, so there are none from Switch yet.
export const reviews: { quote: string; rating: number; source: ReviewSource }[] = [
  { quote: "Easily the best mobile game I've ever played.", rating: 5, source: "Google Play" },
  { quote: "…the most high quality and well rounded rhythm game I have ever played.", rating: 5, source: "App Store" },
  { quote: "The story is also one of the best I've seen from a rhythm game.", rating: 5, source: "Google Play" },
  { quote: "Been playing the game since 2018. Peak gameplay, peak storyline.", rating: 5, source: "App Store" },
  { quote: "Single best rhythm game I've ever played on mobile.", rating: 5, source: "Google Play" },
  { quote: "Fun gimmick that sets the game apart from others… good charts, good music.", rating: 5, source: "App Store" },
];

// Store-wide averages, read from the public listings on the date below.
export const ratingsCheckedOn = "16 November 2026";
export const ratings: { source: ReviewSource; score: number; detail: string }[] = [
  { source: "App Store", score: 4.8, detail: "24.8K ratings (US)" },
  { source: "Google Play", score: 4.7, detail: "5M+ downloads" },
];

export const faqs = [
  {
    q: "Is Arcaea free to play?",
    a: "On iOS and Android it's free to download and comes with a set of free songs. You can add more with song packs whenever you like. The Nintendo Switch edition is a one-time purchase with a large library included.",
  },
  {
    q: "Which devices can I play on?",
    a: "iPhone, iPad, Android phones and tablets, and Nintendo Switch. On Switch you can play with touch in handheld mode or with buttons.",
  },
  {
    q: "I've never played a rhythm game. Is this a good first one?",
    a: "Yes. Every song has several difficulty levels, and the easiest ones are made for learning the basics. Start slow, enjoy the music, and move up when you're ready.",
  },
  {
    q: "What makes it “3D”?",
    a: "Most rhythm games keep notes on a single flat track. Arcaea adds a second layer above it, with floating notes and curving arcs you trace through the air. It feels less like pressing buttons and more like conducting.",
  },
  {
    q: "Is there a story?",
    a: "There is. It follows two girls, Hikari and Tairitsu, in a world made of memories. You unlock it piece by piece as you play.",
  },
  {
    q: "Where can I find official merchandise?",
    a: "Soundtracks, art books and other goods are sold through lowiro's official channels. Use the merchandise link near the bottom of this page.",
  },
] as const;
