import { useEffect } from "react";

/**
 * Subtle 3D parallax: elements with [data-parallax] shift on the Z/Y axis
 * relative to their distance from the viewport centre.
 */
export function useParallax() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    if (!els.length) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const h = window.innerHeight;
      els.forEach((el) => {
        const depth = Number(el.dataset["parallax"]) || 1;
        const rect = el.getBoundingClientRect();
        const delta = (rect.top + rect.height / 2 - h / 2) / h; // -1..1
        const y = -delta * 14 * depth;
        const rx = delta * 1.6 * depth;
        const z = -Math.abs(delta) * 26 * depth;
        el.style.transform = `perspective(1200px) translate3d(0, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateX(${rx.toFixed(2)}deg)`;
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      els.forEach((el) => (el.style.transform = ""));
    };
  }, []);
}
