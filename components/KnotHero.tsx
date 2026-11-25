"use client";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { drawKnot, type KnotColours } from "@/lib/knot";
import { steps } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function KnotHero() {
  const root = useRef<HTMLElement>(null);
  const art = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useGSAP(
    () => {
      const c = canvas.current!;
      const box = art.current!;
      const ctx = c.getContext("2d");
      if (!ctx) return;

      const css = getComputedStyle(document.documentElement);
      const v = (n: string) => css.getPropertyValue(n).trim();
      const colours: KnotColours = {
        navy: v("--slate"),
        orange: v("--orange"),
        ink: v("--navy"),
        lay: v("--chalk"),
        shadow: v("--cast"),
      };
      const items = Array.from(root.current!.querySelectorAll<HTMLLIElement>(".hero-steps li"));
      const state = { p: 0 };

      const draw = () => {
        const w = box.clientWidth;
        const h = box.clientHeight;
        const unit = Math.min(h / 5.3, w / 7);
        drawKnot(ctx, w, h, state.p, colours, { cx: w * (w > 900 ? 0.6 : 0.52), cy: h * 0.53, unit });
        const on = state.p < 0.08 ? 0 : state.p < 0.36 ? 1 : state.p < 0.64 ? 2 : 3;
        items.forEach((el, i) => el.classList.toggle("on", i <= on));
      };
      const size = () => {
        const d = Math.min(window.devicePixelRatio || 1, 2);
        c.width = box.clientWidth * d;
        c.height = box.clientHeight * d;
        ctx.setTransform(d, 0, 0, d, 0, 0);
        draw();
      };
      const ro = new ResizeObserver(size);
      ro.observe(box);

      gsap.matchMedia().add(
        {
          // Pin only where the whole hero fits. On short windows it scrubs past instead of cropping.
          full: "(prefers-reduced-motion: no-preference) and (min-width: 62rem) and (min-height: 43.75rem)",
          small: "(prefers-reduced-motion: no-preference) and (max-width: 61.99rem), (prefers-reduced-motion: no-preference) and (max-height: 43.74rem)",
          still: "(prefers-reduced-motion: reduce)",
        },
        (m) => {
          const { full, still } = m.conditions as Record<string, boolean>;
          if (still) {
            state.p = 1;
            draw();
            return;
          }
          gsap.to(state, {
            p: 1,
            ease: "none",
            onUpdate: draw,
            scrollTrigger: full
              ? {
                  trigger: root.current,
                  start: () => `top ${document.querySelector(".site-head")?.clientHeight ?? 0}`,
                  end: "+=170%",
                  pin: true,
                  scrub: 0.5,
                }
              : { trigger: box, start: "top 62%", end: "bottom 12%", scrub: 0.5 },
          });
        },
      );
      return () => ro.disconnect();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="hero-pin" aria-labelledby="hero-title">
      <div className="wrap hero-copy">
        <h1 id="hero-title">
          <span>One Relationship.</span> <span>Every Logistics Solution.</span>
        </h1>
        <div className="hero-sub">
          <p>
            We bring 18 years of industry relationships, negotiate on combined volume and manage your logistics
            providers, so you deal with one person who knows your business.
          </p>
          <div className="actions">
            <Link href="/start" className="btn btn-primary">Book a 15-minute strategy session</Link>
            <Link href="/strategic-value-assessment" className="btn btn-ghost">Request an assessment</Link>
          </div>
        </div>
      </div>
      <div
        className="hero-art"
        ref={art}
        role="img"
        aria-label="A gold rope threads a heavier navy rope and draws up into a sheet bend, the knot used to join two ropes of unequal size."
      >
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero/knot-tight.webp" alt="" width={1440} height={330} />
        </noscript>
        <canvas ref={canvas} aria-hidden="true" />
      </div>
      <div className="hero-steps">
        <div className="wrap">
          <ol aria-label="How LexBridge works with you">
            {steps.map((s) => (
              <li key={s.title}>
                <strong>{s.title}</strong>
                <span className="small">{s.body}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
