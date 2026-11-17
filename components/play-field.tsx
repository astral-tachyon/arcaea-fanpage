"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * A non-interactive illustration of a chart in play, modelled on the look of the official gameplay
 * trailer: a white four-lane track in perspective, a judgement bar, a sky input line, and cyan and
 * magenta arcs. The chart below is original and lasts exactly 30 seconds, then repeats seamlessly.
 */

const LOOP = 30; // seconds
const BEAT = 0.5; // 120 BPM, so the loop is 60 beats
const APPROACH = 1.9; // seconds a note is on screen before it reaches the judgement bar
const FAR = 46; // distance (in lane widths) at which notes appear
const SKY = 1.25; // height of the sky input line
const HALF = 2; // the track is four lanes wide, centred on x = 0
const PAST = 0.45; // seconds a hit effect lingers

// Camera
const CAM_Y = 2.2;
const CAM_BACK = 3.2;
const PITCH = (22 * Math.PI) / 180;

type Ease = "s" | "si" | "so" | "b";
type Tap = { t: number; lane: number };
type Hold = { t: number; end: number; lane: number };
type SkyTap = { t: number; x: number; y: number };
type Arc = { t: number; end: number; x1: number; x2: number; y1: number; y2: number; color: 0 | 1; ease: Ease };

/* ---------- Chart (written in beats, converted to seconds) ---------- */

const b = (beat: number) => beat * BEAT;
const tap = (beat: number, ...lanes: number[]): Tap[] => lanes.map((lane) => ({ t: b(beat), lane }));
const hold = (from: number, to: number, lane: number): Hold => ({ t: b(from), end: b(to), lane });
const sky = (beat: number, x: number, y = 1): SkyTap => ({ t: b(beat), x, y });
const arc = (from: number, to: number, x1: number, x2: number, y1: number, y2: number, color: 0 | 1, ease: Ease = "b"): Arc => ({
  t: b(from),
  end: b(to),
  x1,
  x2,
  y1,
  y2,
  color,
  ease,
});

const taps: Tap[] = [
  // Opening: floor only
  ...tap(0, 0), ...tap(1, 1), ...tap(2, 2), ...tap(3, 3), ...tap(4, 2), ...tap(5, 1), ...tap(6, 0, 3), ...tap(7, 1, 2),
  ...tap(8.5, 2), ...tap(9, 3), ...tap(9.5, 2), ...tap(10, 3), ...tap(10.5, 2),
  ...tap(11.5, 1), ...tap(12, 0), ...tap(12.5, 1), ...tap(13, 0), ...tap(13.5, 1),
  // One arc at a time, with the free hand on the floor
  ...tap(15, 3), ...tap(16, 2), ...tap(17, 3), ...tap(19, 3), ...tap(20, 2), ...tap(21, 3),
  ...tap(23, 0), ...tap(24, 1), ...tap(25, 0), ...tap(27, 0), ...tap(28, 1), ...tap(29, 0),
  // Both arcs
  ...tap(35, 1, 2), ...tap(39, 1), ...tap(39.5, 2), ...tap(43, 1, 2),
  // Finale
  ...tap(46, 0, 3), ...tap(54, 0), ...tap(54.5, 1), ...tap(55, 2), ...tap(55.5, 3), ...tap(56, 0, 3), ...tap(58, 1, 2), ...tap(59, 3),
];

const holds: Hold[] = [hold(8, 11, 0), hold(11, 14, 3), hold(50, 53, 1), hold(50, 53, 2)];

const skyTaps: SkyTap[] = [
  sky(32, 0), sky(33, 0), sky(36, 0, 0.55), sky(37, 0, 0.55), sky(40, -1.7), sky(40, 1.7), sky(44, 0), sky(45, 0),
  sky(47, -1.5), sky(47.5, -0.75), sky(48, 0), sky(48.5, 0.75), sky(49, 1.5), sky(57, -1), sky(57, 1),
];

const arcs: Arc[] = [
  arc(14, 18, -1.6, 0.6, 1, 1, 0, "si"), arc(18, 22, 0.6, -1.6, 1, 0.45, 0, "so"),
  arc(22, 26, 1.6, -0.6, 1, 1, 1, "si"), arc(26, 30, -0.6, 1.6, 1, 0.45, 1, "so"),
  // Split, converge, cross, uncross
  arc(30, 34, -0.5, -1.8, 0.55, 1, 0), arc(30, 34, 0.5, 1.8, 0.55, 1, 1),
  arc(34, 38, -1.8, -0.35, 1, 1, 0), arc(34, 38, 1.8, 0.35, 1, 1, 1),
  arc(38, 42, -0.35, 1.2, 1, 0.6, 0), arc(38, 42, 0.35, -1.2, 1, 0.6, 1),
  arc(42, 46, 1.2, -1.1, 0.6, 1, 0), arc(42, 46, -1.2, 1.1, 0.6, 1, 1),
  // Two straight arcs held over a pair of long notes
  arc(50, 53, -1.6, -1.6, 1, 1, 0, "s"), arc(50, 53, 1.6, 1.6, 1, 1, 1, "s"),
];

/** Every moment that adds to the combo, sorted. Long notes and arcs tick once per beat. */
const hits: number[] = (() => {
  const out: number[] = [...taps.map((n) => n.t), ...skyTaps.map((n) => n.t)];
  for (const long of [...holds, ...arcs]) {
    for (let t = long.t; t < long.end - 1e-6; t += BEAT) out.push(t);
  }
  return out.sort((x, y) => x - y);
})();

/** How many hits have landed by time `t` within one loop. */
function hitsBefore(t: number) {
  let lo = 0;
  let hi = hits.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (hits[mid] <= t) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

function comboAt(elapsed: number) {
  const loops = Math.floor(elapsed / LOOP);
  return loops * hits.length + hitsBefore(elapsed - loops * LOOP);
}

/* ---------- Drawing ---------- */

type Point = { x: number; y: number; s: number };
type Projector = (x: number, y: number, z: number) => Point;

function makeProjector(W: number, H: number): Projector {
  const focal = 0.815 * W;
  const centreY = 0.53 * H;
  const sin = Math.sin(PITCH);
  const cos = Math.cos(PITCH);
  return (x, y, z) => {
    const dy = y - CAM_Y;
    const dz = z + CAM_BACK;
    const depth = Math.max(0.05, -dy * sin + dz * cos);
    const s = focal / depth;
    return { x: W / 2 + x * s, y: centreY - (dy * cos + dz * sin) * s, s };
  };
}

/** Seconds until an event, wrapped so events just past the loop point stay continuous. */
const until = (eventTime: number, now: number) => ((((eventTime - now + PAST) % LOOP) + LOOP) % LOOP) - PAST;
const depthOf = (dt: number) => (dt / APPROACH) * FAR;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const farFade = (z: number) => clamp01((FAR - z) / 9);

function ease(kind: Ease, u: number) {
  if (kind === "si") return Math.sin((u * Math.PI) / 2);
  if (kind === "so") return 1 - Math.cos((u * Math.PI) / 2);
  if (kind === "b") return u * u * (3 - 2 * u);
  return u;
}

const ARC_COLORS = [
  { top: "#59dcec", side: "#1f9db9", glow: "89, 220, 236" },
  { top: "#dc7fee", side: "#9a3fb8", glow: "220, 127, 238" },
] as const;

function quad(ctx: CanvasRenderingContext2D, pts: Point[]) {
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
  ctx.closePath();
}

function drawFrame(ctx: CanvasRenderingContext2D, W: number, H: number, now: number, backdrop: HTMLImageElement | null, font: string) {
  const P = makeProjector(W, H);
  const lw = Math.max(1, W / 640);

  /* Backdrop */
  ctx.clearRect(0, 0, W, H);
  const wash = ctx.createLinearGradient(0, 0, 0, H);
  wash.addColorStop(0, "#efe6ff");
  wash.addColorStop(1, "#ffffff");
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, W, H);
  if (backdrop) {
    const scale = Math.max(W / backdrop.naturalWidth, H / backdrop.naturalHeight);
    const bw = backdrop.naturalWidth * scale;
    const bh = backdrop.naturalHeight * scale;
    ctx.globalAlpha = 0.55;
    ctx.drawImage(backdrop, (W - bw) / 2, (H - bh) / 2, bw, bh);
    ctx.globalAlpha = 1;
  }

  /* Neon grid on the ground either side of the track, sliding toward the viewer */
  ctx.lineWidth = lw;
  const slide = (now * (FAR / APPROACH) * 0.35) % 3;
  for (let k = 0; k < 15; k++) {
    const z = k * 3 - slide;
    ctx.strokeStyle = `rgba(205, 140, 235, ${0.5 * farFade(z + 8)})`;
    for (const side of [-1, 1]) {
      const a = P(side * (HALF + 0.9), 0, z);
      const c = P(side * 30, 0, z);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(c.x, c.y);
      ctx.stroke();
    }
  }
  ctx.strokeStyle = "rgba(205, 140, 235, 0.32)";
  for (let k = 0; k < 12; k++) {
    for (const side of [-1, 1]) {
      const x = side * (HALF + 0.9 + k * 2.4);
      const a = P(x, 0, -3);
      const c = P(x, 0, FAR);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(c.x, c.y);
      ctx.stroke();
    }
  }

  /* Track */
  const near = -2.7;
  quad(ctx, [P(-HALF, 0, near), P(HALF, 0, near), P(HALF, 0, FAR), P(-HALF, 0, FAR)]);
  const floor = ctx.createLinearGradient(0, 0, 0, H);
  floor.addColorStop(0, "rgba(255, 255, 255, 0.72)");
  floor.addColorStop(0.5, "rgba(255, 255, 255, 0.95)");
  floor.addColorStop(1, "#ffffff");
  ctx.fillStyle = floor;
  ctx.fill();
  for (let lane = 0; lane <= 4; lane++) {
    const x = lane - HALF;
    const a = P(x, 0, near);
    const c = P(x, 0, FAR);
    ctx.strokeStyle = lane === 0 || lane === 4 ? "rgba(74, 44, 120, 0.75)" : "rgba(74, 44, 120, 0.5)";
    ctx.lineWidth = lane === 0 || lane === 4 ? lw * 2 : lw * 1.2;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(c.x, c.y);
    ctx.stroke();
  }

  /* Shadows of arcs on the floor */
  for (const item of arcs) {
    const dEnd = until(item.end, now);
    const dStart = dEnd - (item.end - item.t);
    if (dStart > APPROACH) continue;
    strokeArc(ctx, P, item, dStart, dEnd, "floor", 0.3, () => "rgba(126, 112, 158, 0.3)", null);
  }

  /* Long notes */
  for (const note of holds) {
    const dEnd = until(note.end, now);
    const dStart = dEnd - (note.end - note.t);
    if (dStart > APPROACH || dEnd < 0) continue;
    const z1 = depthOf(Math.max(0, dStart));
    const z2 = Math.min(FAR, depthOf(dEnd));
    const x = note.lane - HALF;
    const active = dStart <= 0;
    quad(ctx, [P(x + 0.07, 0, z1), P(x + 0.93, 0, z1), P(x + 0.93, 0, z2), P(x + 0.07, 0, z2)]);
    ctx.fillStyle = active ? "rgba(178, 160, 226, 0.95)" : `rgba(196, 188, 220, ${0.9 * farFade(z1)})`;
    ctx.fill();
    if (active) glow(ctx, P(x + 0.5, 0, 0), 0.6, "255, 255, 255", 0.9);
  }

  /* Judgement bar */
  quad(ctx, [P(-HALF, 0, -0.09), P(HALF, 0, -0.09), P(HALF, 0, 0.09), P(-HALF, 0, 0.09)]);
  ctx.fillStyle = "#5a2a8a";
  ctx.fill();

  /* Floor notes */
  for (const note of taps) {
    const dt = until(note.t, now);
    if (dt > APPROACH) continue;
    const x = note.lane - HALF;
    if (dt >= 0) {
      const z = depthOf(dt);
      quad(ctx, [P(x + 0.05, 0, z - 0.3), P(x + 0.95, 0, z - 0.3), P(x + 0.95, 0, z + 0.3), P(x + 0.05, 0, z + 0.3)]);
      ctx.globalAlpha = farFade(z);
      ctx.fillStyle = "#c4ecff";
      ctx.fill();
      ctx.strokeStyle = "#4eb4e6";
      ctx.lineWidth = lw * 1.5;
      ctx.stroke();
      ctx.globalAlpha = 1;
    } else {
      hitEffect(ctx, P, x + 0.5, 0, -dt / PAST, font);
    }
  }

  /* Sky input line */
  const skyY = P(0, SKY, 0).y;
  ctx.strokeStyle = "rgba(226, 120, 205, 0.25)";
  ctx.lineWidth = lw * 6;
  ctx.beginPath();
  ctx.moveTo(0, skyY);
  ctx.lineTo(W, skyY);
  ctx.stroke();
  ctx.strokeStyle = "rgba(226, 120, 205, 0.95)";
  ctx.lineWidth = lw * 1.5;
  ctx.beginPath();
  ctx.moveTo(0, skyY);
  ctx.lineTo(W, skyY);
  ctx.stroke();

  /* Arcs, far ones first */
  const order = arcs
    .map((item) => {
      const dEnd = until(item.end, now);
      return { item, dEnd, dStart: dEnd - (item.end - item.t) };
    })
    .filter((entry) => entry.dStart <= APPROACH)
    .sort((p, q) => q.dStart - p.dStart);

  for (const { item, dStart, dEnd } of order) {
    const color = ARC_COLORS[item.color];
    strokeArc(ctx, P, item, dStart, dEnd, -0.17, 0.2, () => color.side, null);
    strokeArc(ctx, P, item, dStart, dEnd, 0, 0.2, () => color.top, "rgba(255, 255, 255, 0.55)");
    if (dStart <= 0 && dEnd >= 0) {
      const u = -dStart / (item.end - item.t);
      const x = item.x1 + (item.x2 - item.x1) * ease(item.ease, u);
      const y = (item.y1 + (item.y2 - item.y1) * u) * SKY;
      const head = P(x, y, 0);
      glow(ctx, head, 0.7, color.glow, 0.95);
      // The tip the player's finger follows
      const w = 0.17 * head.s;
      ctx.beginPath();
      ctx.moveTo(head.x - w, head.y);
      ctx.lineTo(head.x, head.y - w * 0.55);
      ctx.lineTo(head.x + w, head.y);
      ctx.lineTo(head.x, head.y + w * 0.9);
      ctx.closePath();
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.strokeStyle = color.side;
      ctx.lineWidth = lw * 1.5;
      ctx.stroke();
    }
  }

  /* Sky notes */
  for (const note of skyTaps) {
    const dt = until(note.t, now);
    if (dt > APPROACH) continue;
    if (dt < 0) {
      hitEffect(ctx, P, note.x, note.y * SKY, -dt / PAST, font);
      continue;
    }
    const z = depthOf(dt);
    const alpha = farFade(z);
    const shadow = P(note.x, 0, z);
    ctx.fillStyle = `rgba(90, 70, 130, ${0.28 * alpha})`;
    ctx.beginPath();
    ctx.ellipse(shadow.x, shadow.y, 0.34 * shadow.s, 0.09 * shadow.s, 0, 0, Math.PI * 2);
    ctx.fill();

    const c = P(note.x, note.y * SKY, z);
    const w = 0.34 * c.s;
    const h = 0.2 * c.s;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.moveTo(c.x - w, c.y);
    ctx.lineTo(c.x, c.y - h);
    ctx.lineTo(c.x + w, c.y);
    ctx.closePath();
    ctx.fillStyle = "#7a4fc4";
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(c.x - w, c.y);
    ctx.lineTo(c.x, c.y + h);
    ctx.lineTo(c.x + w, c.y);
    ctx.closePath();
    ctx.fillStyle = "#3f2378";
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
    ctx.lineWidth = lw;
    ctx.beginPath();
    ctx.moveTo(c.x - w, c.y);
    ctx.lineTo(c.x + w, c.y);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

/** Draws one arc as a ribbon made of short segments, so it can fade with distance. */
function strokeArc(
  ctx: CanvasRenderingContext2D,
  P: Projector,
  item: Arc,
  dStart: number,
  dEnd: number,
  /** Height offset from the arc's own path, or "floor" to flatten it onto the track as a shadow. */
  lift: number | "floor",
  halfWidth: number,
  fill: () => string,
  highlight: string | null,
) {
  const length = item.end - item.t;
  const from = clamp01(-dStart / length);
  const to = clamp01((APPROACH - dStart) / length);
  if (to <= from) return;
  const steps = 22;
  let prev: { p: Point; z: number } | null = null;
  for (let i = 0; i <= steps; i++) {
    const u = from + ((to - from) * i) / steps;
    const z = depthOf(dStart + length * u);
    const x = item.x1 + (item.x2 - item.x1) * ease(item.ease, u);
    const y = lift === "floor" ? 0 : (item.y1 + (item.y2 - item.y1) * u) * SKY + lift;
    const p = P(x, y, z);
    if (prev) {
      const w0 = halfWidth * prev.p.s;
      const w1 = halfWidth * p.s;
      ctx.globalAlpha = farFade(z);
      ctx.beginPath();
      ctx.moveTo(prev.p.x - w0, prev.p.y);
      ctx.lineTo(prev.p.x + w0, prev.p.y);
      ctx.lineTo(p.x + w1, p.y);
      ctx.lineTo(p.x - w1, p.y);
      ctx.closePath();
      ctx.fillStyle = fill();
      ctx.fill();
      if (highlight) {
        ctx.strokeStyle = highlight;
        ctx.lineWidth = Math.max(1, w1 * 0.18);
        ctx.beginPath();
        ctx.moveTo(prev.p.x, prev.p.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
    }
    prev = { p, z };
  }
  ctx.globalAlpha = 1;
}

function glow(ctx: CanvasRenderingContext2D, at: Point, radius: number, rgb: string, strength: number) {
  const r = radius * at.s;
  const gradient = ctx.createRadialGradient(at.x, at.y, 0, at.x, at.y, r);
  gradient.addColorStop(0, `rgba(255, 255, 255, ${strength})`);
  gradient.addColorStop(0.35, `rgba(${rgb}, ${strength * 0.55})`);
  gradient.addColorStop(1, `rgba(${rgb}, 0)`);
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(at.x, at.y, r, 0, Math.PI * 2);
  ctx.fill();
}

/** A ripple and a rising "PURE" where a note was hit. `progress` runs 0 to 1. */
function hitEffect(ctx: CanvasRenderingContext2D, P: Projector, x: number, y: number, progress: number, font: string) {
  const at = P(x, y, 0);
  const fade = 1 - progress;
  glow(ctx, at, 0.3 + progress * 0.3, "255, 255, 255", 0.85 * fade);
  ctx.strokeStyle = `rgba(255, 255, 255, ${fade})`;
  ctx.lineWidth = Math.max(1.5, at.s * 0.03);
  ctx.beginPath();
  const radius = (0.16 + progress * 0.34) * at.s;
  ctx.ellipse(at.x, at.y, radius, radius * (y === 0 ? 0.36 : 1), 0, 0, Math.PI * 2);
  ctx.stroke();

  const label = P(x, y + 0.3 + progress * 0.22, 0);
  ctx.font = `600 ${Math.round(label.s * 0.19)}px ${font}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = `rgba(42, 178, 170, ${fade})`;
  ctx.fillText("PURE", label.x, label.y);
}

/* ---------- Component ---------- */

export function PlayField() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const comboRef = useRef<HTMLSpanElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const gaugeRef = useRef<HTMLSpanElement>(null);
  const gaugeLabelRef = useRef<HTMLSpanElement>(null);
  const [playing, setPlaying] = useState(true);
  const playingRef = useRef(true);

  // Visitors who prefer reduced motion get a still frame until they press play.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    let W = 0;
    let H = 0;
    let frame = 0;
    let visible = false;
    let elapsed = 17.2; // a busy moment, so the still frame shows arcs and notes together
    let last = performance.now();
    let dirty = true;
    const font = getComputedStyle(wrap).fontFamily;

    const backdrop = new Image();
    let backdropReady: HTMLImageElement | null = null;
    backdrop.onload = () => {
      backdropReady = backdrop;
      dirty = true;
    };
    backdrop.src = "/art/hero-light.webp";

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.round(rect.width * dpr);
      H = Math.round(rect.height * dpr);
      canvas.width = W;
      canvas.height = H;
      dirty = true;
    };

    const tick = (time: number) => {
      const dt = Math.min(0.1, (time - last) / 1000);
      last = time;
      if (visible && playingRef.current) {
        elapsed += dt;
        dirty = true;
      }
      if (dirty && W > 0) {
        dirty = false;
        const now = elapsed % LOOP;
        drawFrame(ctx, W, H, now, backdropReady, font);

        const combo = comboAt(elapsed);
        if (comboRef.current) comboRef.current.textContent = String(combo);
        if (scoreRef.current) scoreRef.current.textContent = String((combo * 2483) % 10_000_000).padStart(8, "0");
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${now / LOOP})`;
        // The gauge fills with every hit and is full on the last one, then starts over with the loop.
        const rate = Math.round((hitsBefore(now) / hits.length) * 100);
        if (gaugeRef.current) gaugeRef.current.style.transform = `scaleY(${rate / 100})`;
        if (gaugeLabelRef.current) gaugeLabelRef.current.textContent = String(rate);
      }
      frame = requestAnimationFrame(tick);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);
    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      last = performance.now();
    });
    viewObserver.observe(wrap);
    resize();
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      viewObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="@container relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-white font-sans shadow-[0_50px_100px_-45px_rgb(43_18_89/0.7)] ring-1 ring-line sm:aspect-video md:rounded-[2rem]"
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Illustration of Arcaea in play: notes travel down a four-lane track toward a judgement bar while a cyan and a magenta arc curve through the air above it."
        className="absolute inset-0 size-full"
      />

      {/* Heads-up display, laid out like the game's. Decorative, so hidden from assistive tech. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none text-[#3d2466]">
        <div className="absolute left-0 top-0 flex h-[11cqw] w-[8cqw] flex-col items-center justify-center bg-[#5a2a8a]/85 text-white [clip-path:polygon(0_0,100%_0,100%_72%,60%_100%,0_100%)]">
          <span className="text-[1.25cqw] font-medium tracking-[0.2em]">PAUSE</span>
          <span className="mt-[0.4cqw] flex gap-[0.6cqw]">
            <span className="h-[2.4cqw] w-[0.7cqw] bg-white" />
            <span className="h-[2.4cqw] w-[0.7cqw] bg-white" />
          </span>
        </div>

        <div className="absolute left-[1.6cqw] top-[13cqw] flex h-[26cqw] w-[2.6cqw] flex-col items-center">
          <span className="relative block w-full flex-1 overflow-hidden bg-white/60 ring-1 ring-[#5a2a8a]/30">
            <span ref={gaugeRef} className="absolute inset-0 origin-bottom bg-gradient-to-t from-[#8a3fc4] to-[#c58bf0]" />
          </span>
          <span ref={gaugeLabelRef} className="mt-[0.5cqw] bg-[#5a2a8a] px-[0.6cqw] text-[1.4cqw] font-medium tabular-nums text-white">
            0
          </span>
        </div>

        <div className="absolute right-0 top-0 w-[30cqw] bg-white/55 backdrop-blur-[2px] [clip-path:polygon(0_0,100%_0,100%_100%,12%_100%,0_78%)]">
          <div className="bg-[#5a2a8a]/90 py-[1cqw] pl-[4cqw] pr-[2cqw] text-white">
            <span className="block text-[1.1cqw] font-medium tracking-[0.2em] opacity-80">SCORE</span>
            <span ref={scoreRef} className="block text-[3.6cqw] font-light leading-none tabular-nums">
              00000000
            </span>
          </div>
          <div className="py-[1cqw] pl-[5cqw] pr-[2cqw]">
            <span className="block text-[1cqw] font-medium tracking-[0.18em] opacity-70">TRACK PROGRESS</span>
            <span className="mt-[0.4cqw] block h-[0.5cqw] overflow-hidden bg-[#5a2a8a]/20">
              <span ref={progressRef} className="block size-full origin-left bg-[#5a2a8a]" />
            </span>
            <span className="mt-[0.9cqw] flex items-center gap-[1.2cqw]">
              <span className="grid size-[5.4cqw] shrink-0 place-items-center bg-gradient-to-br from-[#3b1d78] to-[#12082b]">
                <span className="size-[1.9cqw] rotate-45 border border-[#cdbdf7] bg-white/90" />
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block text-right text-[1.3cqw] font-semibold text-[#8a3fc4]">Future 8</span>
                <span className="block truncate text-[1.5cqw] font-medium">Demo Chart</span>
                <span className="block truncate text-[1.15cqw] opacity-70">30-second loop</span>
              </span>
            </span>
          </div>
        </div>

        <span
          ref={comboRef}
          className="absolute left-1/2 top-[57%] -translate-x-1/2 -translate-y-1/2 text-[9cqw] font-light leading-none tabular-nums text-[#6a4a96]/75"
        >
          0
        </span>
      </div>

      <button
        type="button"
        onClick={() => setPlaying((value) => !value)}
        className="absolute bottom-3 right-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1d0f3d]/80 px-4 text-xs font-medium text-white backdrop-blur-md transition-colors hover:bg-[#1d0f3d] focus-visible:outline-white md:bottom-5 md:right-5"
      >
        {playing ? <Pause aria-hidden="true" className="size-3.5 fill-current" /> : <Play aria-hidden="true" className="size-3.5 fill-current" />}
        {playing ? "Pause animation" : "Play animation"}
      </button>
    </div>
  );
}
