"use client";
import { useEffect, useRef } from "react";
export default function ScrollProgress() {
  const fill = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      const height = document.documentElement.scrollHeight - innerHeight;
      if (fill.current)
        fill.current.style.transform = `scaleX(${height > 0 ? scrollY / height : 0})`;
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => {
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
    };
  }, []);
  return <div ref={fill} aria-hidden="true" className="reading-progress" />;
}
