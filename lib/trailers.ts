export type Trailer = { id: string; title: string; kind: string; year: number };

/** All from lowiro's official YouTube channel (youtube.com/@lowiro). */
export const channelUrl = "https://www.youtube.com/@lowiro";

export const trailers: Trailer[] = [
  { id: "ZcF9JQ44_sw", title: "Arcaea: Reveal Trailer", kind: "Announcement", year: 2017 },
  { id: "qlXuaaNPfw4", title: "Arcaea: Gameplay Trailer", kind: "Gameplay", year: 2017 },
  { id: "GjPtUzFo4ME", title: "Arcaea for Nintendo Switch", kind: "Nintendo Switch", year: 2021 },
  { id: "TscajncWNPA", title: "Black Fate", kind: "Main Story", year: 2020 },
  { id: "Mhg9neH3Ug0", title: "Final Verdict", kind: "Main Story finale", year: 2022 },
  { id: "lpFOdkLgHi4", title: "Divine Oblivion", kind: "Main Story, Act II", year: 2026 },
];

/** Story chapters ask the trailers section to play a video through this window event. */
export const TRAILER_EVENT = "arcaea:play-trailer";

export type TrailerRequest = { id: string; title: string };
