"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Adds motion to the surrounding hero without owning or hiding its content. */
export default function FreightMotion() {
  const anchor = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const hero = anchor.current?.closest<HTMLElement>(".motion-hero");
    if (!hero) return;

    const scene = hero.querySelector<HTMLElement>("[data-freight-scene]");
    const glass = hero.querySelector<HTMLElement>("[data-freight-glass]");
    const copy = hero.querySelector<HTMLElement>("[data-freight-copy]");
    const media = gsap.matchMedia();

    media.add(
      {
        wide: "(min-width: 48rem) and (prefers-reduced-motion: no-preference)",
        small: "(max-width: 47.99rem) and (prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const wide = Boolean(context.conditions?.wide);
        const story = hero.parentElement ?? hero;
        const scroll = wide && window.matchMedia("(min-height: 42rem)").matches
          ? { trigger: story, start: "top top", end: "bottom bottom", scrub: 1 }
          : { trigger: hero, start: "top top", end: "bottom top", scrub: 1 };

        // Keep all content visible before hydration; the entrance only changes position.
        if (copy) gsap.from(copy, { y: 12, duration: 0.9, ease: "power2.out", clearProps: "transform" });
        if (glass) {
          gsap.from(glass, { y: 12, duration: 1, ease: "power2.out" });
          gsap.to(glass, { yPercent: wide ? -18 : -8, ease: "none", scrollTrigger: scroll });
        }
        if (scene) gsap.to(scene, { yPercent: wide ? 4 : 2, scale: 1.12, ease: "none", scrollTrigger: scroll });
      },
    );

    return () => media.revert();
  }, { scope: anchor });

  return <span ref={anchor} hidden aria-hidden="true" />;
}
