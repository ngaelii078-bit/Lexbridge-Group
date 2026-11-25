"use client";

import { useEffect, useRef } from "react";

export default function BackgroundVideo() {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const player = video.current;
    if (!player) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePlayback = () => {
      if (reducedMotion.matches || document.hidden) player.pause();
      else void player.play().catch(() => {});
    };
    updatePlayback();
    reducedMotion.addEventListener("change", updatePlayback);
    document.addEventListener("visibilitychange", updatePlayback);
    return () => {
      reducedMotion.removeEventListener("change", updatePlayback);
      document.removeEventListener("visibilitychange", updatePlayback);
      player.pause();
    };
  }, []);

  return (
    <video ref={video} className="home-background-video" muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1}>
      <source src="/hero/background-video.mp4" type="video/mp4" />
    </video>
  );
}
