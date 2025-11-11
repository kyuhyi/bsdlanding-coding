import { useEffect, useState } from "react";

export function useParallaxMouse(strength = 20) {
  const [t, setT] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = ((e.clientX - w / 2) / w) * strength;
      const y = ((e.clientY - h / 2) / h) * strength;
      setT({ x, y });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [strength]);
  return t;
}
