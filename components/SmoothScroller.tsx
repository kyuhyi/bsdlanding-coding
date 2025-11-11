"use client";
import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroller({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.12, smoothWheel: true });
    let raf = (t: number) => {
      lenis.raf(t);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => (lenis as any).destroy?.();
  }, []);
  return <>{children}</>;
}
