"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useMotionPreference } from "@/lib/hooks/useMotionPreference";

/** Decorative line field. No data or network relationships are represented. */
export function SignalField({
  paused = false,
  controls = false,
  className = "",
}: {
  paused?: boolean;
  controls?: boolean;
  className?: string;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [locallyPaused, setLocallyPaused] = useState(false);
  const { reduceMotion } = useMotionPreference();
  const stopped = paused || locallyPaused || reduceMotion;
  useEffect(() => {
    const node = canvas.current;
    const ctx = node?.getContext("2d");
    if (!node || !ctx) return;
    let width = 1,
      height = 1,
      frame = 0,
      last = 0,
      time = 0,
      visible = true;
    const pointer = { x: 0.5, y: 0.5, smoothX: 0.5, smoothY: 0.5 };
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      pointer.smoothX += (pointer.x - pointer.smoothX) * 0.025;
      pointer.smoothY += (pointer.y - pointer.smoothY) * 0.025;
      for (let line = 0; line < 29; line++) {
        const fraction = line / 28;
        ctx.beginPath();
        for (let point = 0; point <= 65; point++) {
          const x = (point / 65) * width;
          const wave = Math.sin(
            (point / 65) * 6.6 + time * 0.17 + fraction * 2.2,
          );
          const amplitude = height * (0.13 + fraction * 0.08);
          const y =
            height * 0.52 +
            (fraction - 0.5) * height * 0.44 +
            wave * amplitude +
            Math.sin((point / 65) * 3.2 - time * 0.09) * height * 0.1 +
            (pointer.smoothY - 0.5) * 40 * fraction;
          if (point === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle =
          line % 7 === 0
            ? "rgba(205,171,112,.28)"
            : `rgba(156,203,170,${0.045 + fraction * 0.085})`;
        ctx.lineWidth = line % 7 === 0 ? 0.85 : 0.55;
        ctx.stroke();
      }
      const scan =
        (((time * 0.028 + 0.22 + pointer.smoothX * 0.08) % 1.4) - 0.2) * width;
      const light = ctx.createLinearGradient(scan - 70, 0, scan + 70, 0);
      light.addColorStop(0, "rgba(171,222,188,0)");
      light.addColorStop(0.5, "rgba(171,222,188,.07)");
      light.addColorStop(1, "rgba(171,222,188,0)");
      ctx.fillStyle = light;
      ctx.fillRect(scan - 70, 0, 140, height);
    };
    const tick = (stamp: number) => {
      if (stamp - last > 32) {
        time += 0.033;
        last = stamp;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      cancelAnimationFrame(frame);
      if (!stopped && visible && !document.hidden)
        frame = requestAnimationFrame(tick);
      else draw();
    };
    const resize = () => {
      const bounds = node.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      node.width = width * dpr;
      node.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    const move = (e: PointerEvent) => {
      if (stopped || e.pointerType !== "mouse") return;
      const r = node.getBoundingClientRect();
      pointer.x = (e.clientX - r.left) / r.width;
      pointer.y = (e.clientY - r.top) / r.height;
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(node);
    const intersection = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      start();
    });
    intersection.observe(node);
    node.parentElement?.addEventListener("pointermove", move, {
      passive: true,
    });
    document.addEventListener("visibilitychange", start);
    resize();
    start();
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      node.parentElement?.removeEventListener("pointermove", move);
      document.removeEventListener("visibilitychange", start);
    };
  }, [stopped]);
  return (
    <>
      <canvas
        ref={canvas}
        className={`signal-field-canvas ${className}`}
        aria-hidden="true"
      />
      {controls && !reduceMotion && (
        <button
          type="button"
          className="ambient-control"
          aria-pressed={locallyPaused}
          onClick={() => setLocallyPaused((v) => !v)}
        >
          {locallyPaused ? <Play size={12} /> : <Pause size={12} />}
          {locallyPaused ? "Resume motion" : "Pause motion"}
        </button>
      )}
    </>
  );
}
