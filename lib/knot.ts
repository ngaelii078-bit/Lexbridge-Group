// A true sheet bend: the orange rope comes up through the navy bight, round the back of
// both legs, and tucks under its own standing part. Every point carries a z so the
// over and under crossings are right at every stage of the scroll.

type P = readonly [number, number, number];

const NAVY_LOOSE: P[] = [
  [-16, -0.5, 0], [-6, -0.62, 0], [-3, -0.8, 0], [-1.2, -1.0, 0], [0.6, -1.0, 0], [1.75, -0.6, 0],
  [2.05, 0.1, 0], [1.6, 0.78, 0], [0.5, 1.04, 0], [-1.0, 0.98, 0], [-2.3, 1.2, 0], [-3.3, 1.75, 0],
];
const NAVY_TIGHT: P[] = [
  [-16, -0.4, 0], [-6, -0.4, 0], [-3, -0.42, 0], [-1.2, -0.48, 0], [0.35, -0.62, 0], [1.14, -0.48, 0],
  [1.4, 0, 0], [1.14, 0.48, 0], [0.35, 0.64, 0], [-1.0, 0.52, 0], [-1.95, 0.76, 0], [-2.7, 1.2, 0],
];
const ORANGE_LOOSE: P[] = [
  [16, 0.5, 0], [7, 0.35, 0], [4, 0.1, -0.2], [2.9, 0.05, -0.8], [2.05, 0.05, -1], [1.2, 0.08, 0.2],
  [0.35, 0.5, 1], [-0.12, 1.04, 1], [-0.5, 1.64, 0.6], [-1.1, 1.78, 0], [-1.58, 1.3, -0.8], [-1.64, 0.4, -1],
  [-1.62, -0.5, -1], [-1.52, -1.28, -0.8], [-1.05, -1.8, 0], [-0.45, -1.64, 0.6], [-0.08, -1.0, 1],
  [0.28, -0.15, 0.3], [0.58, 0.4, 0.2], [0.88, 1.04, 1], [1.15, 1.7, 0.8], [1.55, 2.15, 0.5],
];
const ORANGE_TIGHT: P[] = [
  [16, 0, 0], [7, 0, 0], [4, 0, -0.2], [2.4, 0, -0.8], [1.4, 0, -1], [0.75, 0.02, 0.05],
  [0.25, 0.32, 1], [-0.08, 0.64, 1], [-0.32, 1.04, 0.6], [-0.62, 1.12, 0], [-0.86, 0.84, -0.8], [-0.9, 0.3, -1],
  [-0.9, -0.3, -1], [-0.86, -0.84, -0.8], [-0.58, -1.12, 0], [-0.24, -1.02, 0.6], [0.02, -0.58, 1],
  [0.3, -0.1, 0.22], [0.5, 0.26, 0.15], [0.74, 0.68, 1], [0.98, 1.22, 0.8], [1.3, 1.75, 0.5],
];

const SUB = 14;
const RUN = 5;
const THREAD_START = 2.55 / (ORANGE_LOOSE.length - 1);

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (v: number) => v * v * (3 - 2 * v);

function blend(a: P[], b: P[], t: number): P[] {
  return a.map((p, i) => [
    p[0] + (b[i][0] - p[0]) * t,
    p[1] + (b[i][1] - p[1]) * t,
    p[2] + (b[i][2] - p[2]) * t,
  ]);
}

function spline(pts: P[]): P[] {
  const out: P[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    for (let k = 0; k < SUB; k++) {
      const t = k / SUB, t2 = t * t, t3 = t2 * t;
      const c = (n: 0 | 1 | 2) =>
        0.5 * (2 * p1[n] + (p2[n] - p0[n]) * t + (2 * p0[n] - 5 * p1[n] + 4 * p2[n] - p3[n]) * t2 + (3 * p1[n] - p0[n] - 3 * p2[n] + p3[n]) * t3);
      out.push([c(0), c(1), c(2)]);
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}

export type KnotColours = { navy: string; orange: string; ink: string; lay: string; shadow: string };

type Rope = { pts: { x: number; y: number; z: number; s: number }[]; width: number; body: string; mark: string; edge: string };

export function drawKnot(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  progress: number,
  colours: KnotColours,
  opts: { cx: number; cy: number; unit: number },
) {
  const thread = smooth(clamp(progress / 0.62));
  const tight = smooth(clamp((progress - 0.6) / 0.4));
  const { cx, cy, unit } = opts;

  const place = (src: P[], width: number, body: string, mark: string, edge: string): Rope => {
    let s = 0;
    const pts = src.map((p, i) => {
      const x = cx + p[0] * unit, y = cy - p[1] * unit;
      if (i) {
        const q = src[i - 1];
        s += Math.hypot(p[0] - q[0], p[1] - q[1]) * unit;
      }
      return { x, y, z: p[2], s };
    });
    return { pts, width, body, mark, edge };
  };

  const navyFull = spline(blend(NAVY_LOOSE, NAVY_TIGHT, tight));
  const orangeFull = spline(blend(ORANGE_LOOSE, ORANGE_TIGHT, tight));
  // Edge to edge: the standing ends always run past both sides, however wide and short the band is.
  navyFull[0] = [Math.min(navyFull[0][0], -cx / unit - 2), navyFull[0][1], navyFull[0][2]];
  orangeFull[0] = [Math.max(orangeFull[0][0], (w - cx) / unit + 2), orangeFull[0][1], orangeFull[0][2]];
  const navy = place(navyFull, unit * 0.72, colours.navy, colours.lay, colours.ink);
  const last = Math.round((THREAD_START + (1 - THREAD_START) * thread) * (orangeFull.length - 1));
  const orange = place(orangeFull.slice(0, Math.max(3, last + 1)), unit * 0.48, colours.orange, colours.ink, colours.ink);

  ctx.clearRect(0, 0, w, h);
  ctx.lineJoin = "round";

  // Raking daylight: one flat cast shadow, no blur.
  const drop = unit * 0.26;
  for (const r of [navy, orange]) {
    ctx.beginPath();
    r.pts.forEach((p, i) => (i ? ctx.lineTo(p.x + drop * 0.7, p.y + drop) : ctx.moveTo(p.x + drop * 0.7, p.y + drop)));
    ctx.strokeStyle = colours.shadow;
    ctx.lineWidth = r.width;
    ctx.lineCap = "butt";
    ctx.stroke();
  }

  type Run = { r: Rope; a: number; b: number; z: number };
  const runs: Run[] = [];
  for (const r of [navy, orange]) {
    for (let a = 0; a < r.pts.length - 1; a += RUN) {
      const b = Math.min(r.pts.length - 1, a + RUN);
      let z = 0;
      for (let i = a; i <= b; i++) z += r.pts[i].z;
      runs.push({ r, a, b, z: z / (b - a + 1) });
    }
  }
  runs.sort((m, n) => m.z - n.z);

  const edge = Math.max(1, unit * 0.035);

  const tip = (r: Rope) => {
    const e = r.pts[r.pts.length - 1], f = r.pts[Math.max(0, r.pts.length - 4)];
    const len = Math.hypot(e.x - f.x, e.y - f.y) || 1;
    return { e, tx: (e.x - f.x) / len, ty: (e.y - f.y) / len };
  };
  const reach = orange.width * 0.62;
  let tipZ = -Infinity, behind = false;
  for (let i = orange.pts.length - 1; i >= 0 && orange.pts[orange.pts.length - 1].s - orange.pts[i].s <= reach; i--) {
    tipZ = Math.max(tipZ, orange.pts[i].z);
    if (orange.pts[i].z < 0) behind = true;
  }
  if (behind) tipZ = Math.min(tipZ, -0.001);
  // Orange end is whipped: LexBridge arrives finished.
  const paintTip = () => {
    const { e, tx, ty } = tip(orange);
    ctx.lineCap = "butt";
    ctx.beginPath();
    ctx.moveTo(e.x - tx * reach, e.y - ty * reach);
    ctx.lineTo(e.x + tx * edge, e.y + ty * edge);
    ctx.lineWidth = orange.width + edge * 2;
    ctx.strokeStyle = colours.ink;
    ctx.stroke();
  };
  let tipDone = false;

  type Pt = { x: number; y: number };
  const normal = (r: Rope, i: number): Pt => {
    const p = r.pts[Math.max(0, i - 1)], q = r.pts[Math.min(r.pts.length - 1, i + 1)];
    const len = Math.hypot(q.x - p.x, q.y - p.y) || 1;
    return { x: -(q.y - p.y) / len, y: (q.x - p.x) / len };
  };
  const path = (pts: Pt[], move = true) => pts.forEach((p, i) => (i === 0 && move ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));

  for (const { r, a, b, z } of runs) {
    if (!tipDone && z > tipZ) {
      paintTip();
      tipDone = true;
    }
    const from = Math.max(0, a - 2), to = Math.min(r.pts.length - 1, b + 2), half = r.width / 2;
    const left: Pt[] = [], right: Pt[] = [];
    for (let i = from; i <= to; i++) {
      const n = normal(r, i), p = r.pts[i];
      left.push({ x: p.x + n.x * half, y: p.y + n.y * half });
      right.push({ x: p.x - n.x * half, y: p.y - n.y * half });
    }
    ctx.save();
    ctx.beginPath();
    path(left);
    path([...right].reverse(), false);
    ctx.closePath();
    ctx.fillStyle = r.body;
    ctx.fill();
    ctx.clip();

    // Lay of the rope. Neighbouring marks are included and clipped, so the lay never breaks at a seam.
    const pitch = r.width * 0.46, slant = r.width * 0.34;
    ctx.strokeStyle = r.mark;
    ctx.lineWidth = edge;
    ctx.beginPath();
    const i0 = Math.max(0, from - RUN), i1 = Math.min(r.pts.length - 1, to + RUN);
    for (let i = i0; i < i1; i++) {
      const p = r.pts[i], q = r.pts[i + 1], len = q.s - p.s;
      if (len <= 0) continue;
      const tx = (q.x - p.x) / len, ty = (q.y - p.y) / len, nx = -ty, ny = tx;
      for (let m = Math.ceil(p.s / pitch); m * pitch < q.s; m++) {
        const d = m * pitch - p.s, x = p.x + tx * d, y = p.y + ty * d;
        ctx.moveTo(x - nx * half - tx * slant, y - ny * half - ty * slant);
        ctx.bezierCurveTo(x - nx * half * 0.5 + tx * slant * 0.4, y - ny * half * 0.5 + ty * slant * 0.4, x + nx * half * 0.5 - tx * slant * 0.4, y + ny * half * 0.5 - ty * slant * 0.4, x + nx * half + tx * slant, y + ny * half + ty * slant);
      }
    }
    ctx.stroke();
    ctx.restore();

    ctx.strokeStyle = r.edge;
    ctx.lineWidth = edge * 1.3;
    for (const side of [left, right]) {
      ctx.beginPath();
      path(side);
      ctx.stroke();
    }
  }

  if (!tipDone) paintTip();

  // Navy end is left frayed on purpose. It is whipped only at the foot of the page.
  {
    const { e, tx, ty } = tip(navy), base = Math.atan2(ty, tx), u = navy.width;
    const lash = (angle: number, off: number, length: number, width: number, style: string, bend: number) => {
      const nx = -ty * off * u, ny = tx * off * u;
      const x0 = e.x + nx - tx * u * 0.1, y0 = e.y + ny - ty * u * 0.1;
      const mx = x0 + Math.cos(base + angle * 0.3) * length * 0.5, my = y0 + Math.sin(base + angle * 0.3) * length * 0.5;
      const ex = x0 + Math.cos(base + angle + bend) * length, ey = y0 + Math.sin(base + angle + bend) * length;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.quadraticCurveTo(mx, my, ex, ey);
      ctx.lineWidth = width;
      ctx.strokeStyle = style;
      ctx.stroke();
    };
    ctx.lineCap = "round";
    for (const [angle, off, length, bend] of [[-0.7, -0.36, 0.8, -0.2], [-0.32, -0.2, 1.05, 0.1], [0.12, 0.02, 1.15, -0.08], [0.4, 0.22, 0.95, 0.16], [0.8, 0.38, 0.75, 0.2]] as const)
      lash(angle, off, u * length, edge, colours.ink, bend);
    for (const [angle, off, length] of [[-0.42, -0.28, 0.72], [0.02, 0, 0.86], [0.46, 0.28, 0.7]] as const) {
      lash(angle, off, u * length, u * 0.27 + edge * 2, colours.ink, 0);
      lash(angle, off, u * length, u * 0.27, colours.navy, 0);
    }
    ctx.lineCap = "butt";
  }
}
