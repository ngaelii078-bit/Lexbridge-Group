"use client";

import { useEffect } from "react";

/** Opens a linked service while keeping the native disclosure usable without JavaScript. */
export default function OpenServiceFromHash() {
  useEffect(() => {
    let frame = 0;
    const openLinkedService = () => {
      let id: string;
      try {
        id = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      if (!id) return;
      const target = document.getElementById(id);
      if (!(target instanceof HTMLDetailsElement) || !target.closest(".plates")) return;
      target.open = true;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => target.scrollIntoView({ block: "start", behavior: "auto" }));
    };
    openLinkedService();
    window.addEventListener("hashchange", openLinkedService);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", openLinkedService);
    };
  }, []);

  return null;
}
