// A straight rope across the full width, turning on its own axis. The lay is a helix seen
// side on, so moving it along reads as rotation.

export type LayColours = { slate: string; orange: string; ink: string; lay: string; shadow: string };
export type Twist = { width: number; body: string; mark: string; ink: string; shadow: string };

const STEPS = 14;

export function drawTwist(ctx: CanvasRenderingContext2D, w: number, h: number, slide: number, r: Twist) {
  const half = r.width / 2;
  const drop = Math.max(4, r.width * 0.16);
  const cy = (h - drop) / 2;
  const lean = r.width * 0.5;
  const pitch = Math.max(6, r.width * 0.24);
  const edge = Math.min(3, Math.max(1.6, r.width * 0.05));

  ctx.clearRect(0, 0, w, h);
  ctx.lineJoin = "round";
  ctx.lineCap = "butt";

  // Flat cast shadow, same light as the hero.
  ctx.fillStyle = r.shadow;
  ctx.fillRect(0, cy - half + drop, w, r.width);

  ctx.save();
  ctx.beginPath();
  ctx.rect(0, cy - half, w, r.width);
  ctx.fillStyle = r.body;
  ctx.fill();
  ctx.clip();
  ctx.strokeStyle = r.mark;
  ctx.lineWidth = Math.max(1.2, r.width * 0.036);
  ctx.beginPath();
  const offset = ((slide % pitch) + pitch) % pitch;
  for (let x = -lean - pitch + offset; x < w + pitch; x += pitch) {
    for (let j = 0; j <= STEPS; j++) {
      const a = (Math.PI * j) / STEPS;
      const px = x + (lean * j) / STEPS;
      const py = cy - half * Math.cos(a);
      if (j === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
  }
  ctx.stroke();
  ctx.restore();

  ctx.strokeStyle = r.ink;
  ctx.lineWidth = edge;
  for (const y of [cy - half, cy + half]) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
}

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
export const thinWidth = (w: number) => clamp(w * 0.0085, 10, 16);
export const fullWidth = (w: number) => clamp(w * 0.05, 46, 96);
