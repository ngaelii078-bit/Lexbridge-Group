"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { drawTwist, fullWidth, thinWidth } from "@/lib/lay";

gsap.registerPlugin(useGSAP);

// The volume argument as two ropes, edge to edge: a thin one, and one at full weight. Both turn
// while they are on screen. Clicking the heavy rope stops or starts them.
// No saving is shown, because the client has not supplied one.
export default function Volume() {
  const root = useRef<HTMLDivElement>(null);
  const one = useRef<HTMLCanvasElement>(null);
  const many = useRef<HTMLCanvasElement>(null);
  const running = useRef(true);
  const [on, setOn] = useState(true);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        running.current = false;
        setOn(false);
      }
      const css = getComputedStyle(document.documentElement);
      const v = (n: string) => css.getPropertyValue(n).trim();
      const ink = v("--navy");
      const shadow = v("--cast");
      const ropes = [
        { c: one.current!, slide: 0, speed: 16, width: thinWidth, body: v("--slate"), mark: v("--chalk"), seen: false },
        { c: many.current!, slide: 0, speed: 34, width: fullWidth, body: v("--orange"), mark: ink, seen: false },
      ];
      type R = (typeof ropes)[number];
      const paint = (r: R) => {
        const ctx = r.c.getContext("2d");
        if (ctx) drawTwist(ctx, r.c.clientWidth, r.c.clientHeight, r.slide, { width: r.width(r.c.clientWidth), body: r.body, mark: r.mark, ink, shadow });
      };
      const fit = (r: R) => {
        const d = Math.min(window.devicePixelRatio || 1, 2);
        r.c.width = r.c.clientWidth * d;
        r.c.height = r.c.clientHeight * d;
        r.c.getContext("2d")?.setTransform(d, 0, 0, d, 0, 0);
        paint(r);
      };
      const ro = new ResizeObserver(() => ropes.forEach(fit));
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        const r = ropes.find((x) => x.c === e.target);
        if (r) r.seen = e.isIntersecting;
      }));
      ropes.forEach((r) => {
        ro.observe(r.c);
        io.observe(r.c);
      });
      const tick = (_t: number, dt: number) => {
        if (!running.current) return;
        for (const r of ropes) {
          if (!r.seen) continue;
          r.slide += (r.speed * Math.min(dt, 50)) / 1000;
          paint(r);
        }
      };
      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
        ro.disconnect();
        io.disconnect();
      };
    },
    { scope: root },
  );

  const toggle = () => {
    running.current = !running.current;
    setOn(running.current);
  };

  return (
    <div className="volume" ref={root}>
      <figure>
        <canvas ref={one} className="lay-one" aria-hidden="true" />
        <figcaption className="wrap">
          <strong>On your own</strong>
          <span>A business spending R30&nbsp;000 a month with a courier is offered the pricing that R30&nbsp;000 a month earns.</span>
        </figcaption>
      </figure>
      <figure>
        <button type="button" className="turn" onClick={toggle} aria-label={on ? "Stop the ropes turning" : "Start the ropes turning"}>
          <canvas ref={many} className="lay-many" aria-hidden="true" />
        </button>
        <figcaption className="wrap">
          <strong>Through LexBridge</strong>
          <span>
            Our partners see a consolidated volume. That gives us influence over rates and service terms an individual
            company might struggle to secure, across courier, international freight and dedicated transport.
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
