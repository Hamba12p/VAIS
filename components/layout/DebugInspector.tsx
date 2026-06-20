'use client';

import { useEffect } from 'react';

export default function DebugInspector() {
  useEffect(() => {
    try {
      const imgs = Array.from(document.querySelectorAll('img'));
      console.group('DebugInspector: images');
      imgs.forEach((img) => {
        const el = img as HTMLImageElement;
        const cs = window.getComputedStyle(el);
        console.log({
          src: el.currentSrc || el.src,
          classes: el.className,
          transform: cs.transform,
          width: el.width,
          height: el.height,
          naturalWidth: el.naturalWidth,
          naturalHeight: el.naturalHeight,
        });
      });
      console.groupEnd();
      
      // Log top-level sections and their heights to find large gaps
      const main = document.querySelector('main');
      if (main) {
        const children = Array.from(main.children) as HTMLElement[];
        console.group('DebugInspector: main children sizes');
        children.forEach((c, i) => {
          const r = c.getBoundingClientRect();
          console.log({ index: i, tag: c.tagName, classes: c.className, height: Math.round(r.height), top: Math.round(r.top) });
        });
        console.groupEnd();
      }
    } catch (e) {
      // swallow
    }
  }, []);

  return null;
}
