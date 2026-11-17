// Converts the source art in "Design Assests/" into web-sized WebP files in public/art/.
// Run with: npm run images
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = "Design Assests";
const BG = path.join(ROOT, "Menu Backgrounds");
const CHARS = path.join(ROOT, "Characters");
const MISC = path.join(ROOT, "Miscellanous");
const OUT = path.join("public", "art");

async function save(pipeline, out) {
  await fs.mkdir(path.dirname(out), { recursive: true });
  await pipeline.toFile(out);
  const { size } = await fs.stat(out);
  console.log(`${path.relative(OUT, out).padEnd(44)} ${(size / 1024).toFixed(0)} KB`);
}

/* ---------- Backgrounds: [source file, output name, max width] ---------- */

const backgrounds = [
  ["Bg_select_light_webp.png", "hero-light", 1600],
  ["Bg_select_dark_webp.png", "hero-dark", 1600],
  ["Bg_colorless_webp.png", "cta-light", 1600],
  ["Bg_single_dark_webp.png", "cta-dark", 1600],
  ["Wbg3_webp.png", "feature", 1000],
  ["Wbg1_webp.png", "hikari", 1100],
  ["Wbg2_webp.png", "tairitsu", 1000],
  ["Wbg5_webp.png", "world-1", 720],
  ["Wbg6_webp.png", "world-2", 720],
  ["Wbg8_webp.png", "world-3", 720],
  ["Wbg7_webp.png", "world-4", 720],
  ["Wbg4_webp.png", "world-5", 720],
];

for (const [file, name, width] of backgrounds) {
  await save(
    sharp(path.join(BG, file)).resize({ width, withoutEnlargement: true }).webp({ quality: 80 }),
    path.join(OUT, `${name}.webp`),
  );
}

await save(
  sharp(path.join(BG, "Bg_select_light_webp.png")).resize(1200, 630, { fit: "cover" }).jpeg({ quality: 82 }),
  path.join(OUT, "og.jpg"),
);

/* ---------- Partners: id -> { folder, icon, art: [file, ...] } ---------- */
// The first art file is the default look; a second one (if any) is the alternate look.
// "legacy" is the original character design, saved as {id}-legacy.webp.

const partners = {
  hikari: { folder: "Hikari", icon: "Hikari_new_icon_webp.png", art: ["Hikari_new_fullbody_webp.png", "Hikari_awakened_fullbody_webp.png"], legacy: "Old_hikari_webp.png" },
  tairitsu: { folder: "Tairitsu", icon: "Tairitsu_new_icon_webp.png", art: ["Tairitsu_new_fullbody_webp.png", "Tairitsu_awakened_fullbody_webp.png"], legacy: "Old_tairitsu_webp.png" },
  "hikari-zero": { folder: "Hikari Zero", icon: "Hikari_(Zero)_icon_webp.png", art: ["Hikari_(Zero)_fullbody_webp.png"] },
  "hikari-fracture": { folder: "Hikari Fracture", icon: "44105AE9-70ED-437D-AE7B-81DF7C5CE5D8_webp.png", art: ["Hikari_(Fracture)_fullbody_webp.png"] },
  "hikari-fatalis": { folder: "Hikari Fatalis", icon: "Hikari_(Fatalis)_icon_webp.png", art: ["Hikari_(Fatalis)_fullbody_webp.png"] },
  "tairitsu-axium": { folder: "Tairitsu Axium", icon: "Partner_06_webp.png", art: ["Tairitsu_(Axium)_fullbody_webp.png"] },
  "tairitsu-grievous-lady": { folder: "Tairitsu Grievous Lady", icon: "Partner_07_webp.png", art: ["Tairitsu_(Grievous_Lady)_fullbody_webp.png"] },
  "tairitsu-tempest": { folder: "Tairitsu Tempest", icon: "Tairitsu_(Tempest)_icon_webp.png", art: ["Tairitsu_(Tempest)_fullbody_webp.png"] },
  reunion: { folder: "Reunion Hikari & Tairitsu", icon: "Hikari_&_Tairitsu_(Reunion)_icon_webp.png", art: ["Hikari_&_Tairitsu_(Reunion)_fullbody_webp.png"] },
  kou: { folder: "Kou", icon: "Partner_03_webp.png", art: ["Kou_fullbody_webp.png", "Kou_awakened_fullbody_webp.png"] },
  lethe: { folder: "Lethe", icon: "Partner_05_webp.png", art: ["Lethe_fullbody_webp.png", "Lethe_awakened_fullbody_webp.png"] },
  eto: { folder: "Eto", icon: "Partner_11_webp.png", art: ["Eto_fullbody_webp.png", "Eto_awakened_fullbody_webp.png"] },
  luna: { folder: "Luna", icon: "Partner_12_webp.png", art: ["Luna_fullbody_webp.png", "Luna_awakened_fullbody_webp.png"] },
  saya: { folder: "Saya", icon: "Saya_icon_webp.png", art: ["Saya_fullbody_webp.png", "Saya_awakened_fullbody_webp.png"] },
  ayu: { folder: "Ayu", icon: "Ayu_icon_webp.png", art: ["Ayu_fullbody_webp.png", "Ayu_awakened_fullbody_webp.png"] },
  kanae: { folder: "Kanae", icon: "Kanae_icon_webp.png", art: ["Kanae_fullbody_webp.png", "Kanae_awakened_fullbody_webp.png"] },
  shirahime: { folder: "Shirahime", icon: "Shirahime_icon_webp.png", art: ["Shirahime_fullbody_webp.png"] },
  lagrange: { folder: "Lagrange", icon: "Lagrange_icon_webp.png", art: ["Lagrange_fullbody_webp.png"] },
  "alice-tenniel": { folder: "Alice & Tenniel", icon: "Alice_&_Tenniel_icon_webp.png", art: ["Alice_&_Tenniel_fullbody_webp.png", "Alice_&_Tenniel_(Minuet)_fullbody_webp.png"] },
};

const fullBody = (buffer) =>
  sharp(buffer).resize(900, 900, { fit: "inside", withoutEnlargement: true }).webp({ quality: 84, alphaQuality: 90 });

for (const [id, p] of Object.entries(partners)) {
  const dir = path.join(CHARS, p.folder);
  if (p.legacy) {
    const legacy = await sharp(path.join(dir, "Full", p.legacy)).trim().toBuffer();
    await save(fullBody(legacy), path.join(OUT, "partners", `${id}-legacy.webp`));
  }
  await save(sharp(path.join(dir, "Icon", p.icon)).resize(160, 160).webp({ quality: 86 }), path.join(OUT, "partners", `${id}-icon.webp`));
  for (const [i, file] of p.art.entries()) {
    // Trim the transparent margin so every figure fills its frame the same way.
    const trimmed = await sharp(path.join(dir, "Full", file)).trim().toBuffer();
    const suffix = i === 0 ? "" : "-alt";
    await save(fullBody(trimmed), path.join(OUT, "partners", `${id}${suffix}.webp`));
    if (i === 0) {
      await save(
        sharp(trimmed).resize(460, 460, { fit: "inside" }).webp({ quality: 80, alphaQuality: 85 }),
        path.join(OUT, "partners", `${id}-thumb.webp`),
      );
    }
  }
}

/* ---------- Story scenes: [folder under Characters, source file, output name] ---------- */

const scenes = [
  ["Hikari/Scenes", "0-3_webp.png", "prologue"],
  ["Hikari/Scenes", "1-1_(Switch)_webp.png", "eternal-core-hikari"],
  ["Tairitsu/Scenes", "2-1_(switch)_webp.png", "eternal-core-tairitsu"],
  ["Hikari Zero/Scenes", "1-ZR_(Switch)_webp.png", "luminous-sky-zero"],
  ["Hikari Fracture/Scenes", "1-8_(Switch)_webp.png", "luminous-sky"],
  ["Hikari Fracture/Scenes", "Story_vs_arcahv_webp.png", "black-fate-hikari"],
  ["Tairitsu Axium/Scenes", "2-D_(switch)_webp.png", "vicious-labyrinth-axium"],
  ["Tairitsu Grievous Lady/Scenes", "2-8_(switch)_webp.png", "vicious-labyrinth"],
  ["Tairitsu Tempest/Scenes", "Story_vs_tempest_webp.png", "black-fate-tairitsu"],
  ["Shared Scenes", "Meetingcutscene_webp.png", "adverse-prelude"],
  ["Shared Scenes", "VS-5_(Switch)_webp.png", "black-fate"],
  ["Shared Scenes", "F-2cg_webp.png", "final-verdict"],
  ["Hikari Fatalis/Scenes", "Last1_epilogue_webp.png", "final-verdict-fatalis"],
  ["Reunion Hikari & Tairitsu/Scenes", "Last2_epilogue_webp.png", "silent-answer"],
  ["Reunion Hikari & Tairitsu/Scenes", "Lephon_epilogue_webp.png", "silent-answer-field"],
  ["Kou/Scenes", "4-1_(switch)_webp.png", "crimson-solace-1"],
  ["Kou/Scenes", "4-7_(switch)_webp.png", "crimson-solace-2"],
  ["Lethe/Scenes", "5-1_webp.png", "ambivalent-vision-1"],
  ["Lethe/Scenes", "5-6_webp.png", "ambivalent-vision-2"],
  ["Saya/Scenes", "3-1_(Switch)_webp.png", "absolute-reason"],
  ["Saya/Scenes", "Story_nihil_1A_cg_webp.png", "absolute-nihil-1"],
  ["Saya/Scenes", "Story_nihil_2_cg_webp.png", "absolute-nihil-2"],
  ["Shared Scenes", "10-5_webp.png", "binary-enfold"],
  ["Shared Scenes", "Memory_Forest_and_Singularity_webp.png", "eto-luna"],
  ["Ayu/Scenes", "11-2cg_jpg_webp.png", "colorful-dream-1"],
  ["Ayu/Scenes", "11-8-2_webp.png", "colorful-dream-2"],
  ["Maya/Scenes", "15-4_webp.png", "lasting-eden"],
  ["Insight Ascendant/Scenes", "16-7-1_webp.png", "severed-eden"],
  ["Lagrange/Scenes", "9-5_webp.png", "esoteric-order"],
  ["Alice & Tenniel/Scenes", "7-6_webp.png", "ephemeral-page-1"],
  ["Alice & Tenniel/Scenes", "Story_E-4_epilogue_cg_webp.png", "ephemeral-page-2"],
  ["Shirahime/Scenes", "99-6_webp.png", "divided-heart"],
  ["Kanae/Scenes", "17-6-2_webp.png", "sunset-radiance"],
  ["Shared Scenes", "HK5Ksv_WsAALumr_webp.png", "cast"],
];

for (const [folder, file, name] of scenes) {
  await save(
    sharp(path.join(CHARS, folder, file)).resize({ width: 1000, withoutEnlargement: true }).webp({ quality: 78 }),
    path.join(OUT, "scenes", `${name}.webp`),
  );
}

/* ---------- Hero key art ---------- */

await save(
  sharp(path.join(MISC, "background_top-hero.jpg")).resize({ width: 2000, withoutEnlargement: true }).webp({ quality: 80 }),
  path.join(OUT, "hero.webp"),
);

await save(
  sharp(path.join(MISC, "background_bottom-hero.jpg")).resize({ width: 2200, withoutEnlargement: true }).webp({ quality: 80 }),
  path.join(OUT, "hero-bottom.webp"),
);

/* ---------- Profile backdrops: menu backgrounds, split by brightness ---------- */

const backdrops = [
  // light
  ["Wbg1_webp.png", "light-city"],
  ["Scenery_bg_default_webp.png", "light-scenery"],
  ["Bg_colorless_webp.png", "light-shards"],
  ["Bg_select_byd_light_webp.png", "light-horizon"],
  ["Wbg8_webp.png", "light-spire"],
  ["Wbg0_webp.png", "light-sky"],
  ["Bg_single_light_webp.png", "light-rails"],
  ["Lucent_Historia_song_select_bg_webp.png", "light-cube"],
  ["Bg_select_light_webp.png", "light-lilac"],
  ["Full_bg_light_webp.png", "light-stairs"],
  ["World_map_9_webp.png", "light-spheres"],
  // dark
  ["Wbg2_webp.png", "dark-tower"],
  ["Bg_select_dark_webp.png", "dark-violet"],
  ["Bg_single_dark_webp.png", "dark-rails"],
  ["Act1bg_webp.png", "dark-cavern"],
  ["Act2bg_webp.png", "dusk-rift"],
  ["Bg_select_byd_dark_webp.png", "dark-ember"],
  ["Wbg6_webp.png", "dark-orbit"],
  ["Wbg4_webp.png", "dark-garden"],
  ["Wbg7_webp.png", "dark-sphere"],
  ["Wbg5_webp.png", "blue-castle"],
];

for (const [file, name] of backdrops) {
  await save(
    sharp(path.join(BG, file)).resize({ width: 1000, withoutEnlargement: true }).webp({ quality: 76 }),
    path.join(OUT, "bg", `${name}.webp`),
  );
}

/* ---------- Store badges: three pills of identical size ---------- */

const PILL = { width: 678, height: 168 };
const PAD = 40; // black margin added left and right so the rounded ends never clip the artwork
const badgeSheet = path.join(MISC, "1_grpEUqlOJE6Fysw7ErWIBQ.jpg");

async function badgeFromSheet(top, height, crushGloss, name) {
  let crop = sharp(badgeSheet).extract({ left: 14, top, width: 824, height });
  // The App Store badge has a grey gloss; flatten it to black so it blends into the pill.
  crop = crushGloss ? crop.linear(2.4, -230) : crop.linear(1.1, -18);
  const body = await crop.extend({ left: PAD, right: PAD, background: "#000" }).toBuffer();
  await save(sharp(body).resize(PILL.width, PILL.height, { fit: "fill" }).webp({ quality: 92 }), path.join(OUT, "badges", `${name}.webp`));
}

await badgeFromSheet(14, 224, true, "app-store");
await badgeFromSheet(296, 216, false, "google-play");

const eshop = await sharp(path.join(MISC, "Nintendo_eShop_Switch_logo.svg.png")).trim().resize(440, 124, { fit: "inside" }).toBuffer();
await save(
  sharp({ create: { ...PILL, channels: 4, background: "#000" } }).composite([{ input: eshop, gravity: "centre" }]).webp({ quality: 92 }),
  path.join(OUT, "badges", "nintendo-eshop.webp"),
);

/* ---------- Logo and browser-tab icon ---------- */

// Crop the wide glow margins so the wordmark fills its box.
await save(
  sharp(path.join(MISC, "arcaea_logo.png")).extract({ left: 300, top: 10, width: 1380, height: 464 }).resize({ height: 232 }).webp({ quality: 90, alphaQuality: 95 }),
  path.join(OUT, "logo.webp"),
);

// Next.js serves app/icon.png and app/apple-icon.png as the site icons.
await fs.copyFile(path.join(MISC, "arcaea_icon.png"), path.join("app", "icon.png"));
await fs.copyFile(path.join(MISC, "arcaea_icon.png"), path.join("app", "apple-icon.png"));
console.log("app/icon.png, app/apple-icon.png");

/* ---------- Collaboration partners: [folder, file, output name] ---------- */

const collabArt = [
  ["Sapphire", "Sapphire_fullbody_webp.png", "dynamix"],
  ["Stella", "Stella_fullbody_webp.png", "stellights"],
  ["Hikari & Fisica", "Hikari_&_Fisica_fullbody_webp.png", "lanota"],
  ["Tairitsu & Chuni Penguin", "Tairitsu_&_Chuni_Penguin_fullbody_webp.png", "chunithm"],
  ["Llith", "Ilith_fullbody_webp.png", "cytus-ii"],
];

for (const [folder, file, name] of collabArt) {
  const trimmed = await sharp(path.join(CHARS, folder, "Full", file)).trim().toBuffer();
  await save(
    sharp(trimmed).resize(520, 520, { fit: "inside" }).webp({ quality: 82, alphaQuality: 88 }),
    path.join(OUT, "collabs", `${name}.webp`),
  );
}

/* ---------- Collaboration images you add yourself ---------- */
// Drop files into "Design Assests/Collaborations" named after the collab id in lib/collabs.ts:
//   {id}-logo.png   the other game's logo, shown on the timeline card and in the detail view
//   {id}.png        key art for the detail view (replaces the guest-partner art above)
// .png, .jpg, .jpeg and .webp all work. Then run: npm run images

const COLLABS = path.join(ROOT, "Collaborations");
await fs.mkdir(COLLABS, { recursive: true });
const supplied = (await fs.readdir(COLLABS)).filter((file) => /\.(png|jpe?g|webp)$/i.test(file));
const logos = [];

for (const file of supplied) {
  const base = file.replace(/\.[^.]+$/, "").toLowerCase();
  if (base.endsWith("-logo")) {
    const id = base.slice(0, -5);
    await save(
      sharp(path.join(COLLABS, file)).trim().resize(480, 240, { fit: "inside", withoutEnlargement: true }).webp({ quality: 90, alphaQuality: 95 }),
      path.join(OUT, "collabs", "logos", `${id}.webp`),
    );
    logos.push(id);
  } else {
    await save(
      sharp(path.join(COLLABS, file)).resize(900, 900, { fit: "inside", withoutEnlargement: true }).webp({ quality: 84, alphaQuality: 90 }),
      path.join(OUT, "collabs", `${base}.webp`),
    );
  }
}

// The site reads this list to know which collaborations have a logo or artwork.
const art = (await fs.readdir(path.join(OUT, "collabs"))).filter((file) => file.endsWith(".webp")).map((file) => file.slice(0, -5));
await fs.writeFile(path.join("lib", "collab-assets.json"), JSON.stringify({ logos: logos.sort(), art: art.sort() }, null, 2) + "\n");
console.log(`lib/collab-assets.json: ${logos.length} logos, ${art.length} artworks`);
