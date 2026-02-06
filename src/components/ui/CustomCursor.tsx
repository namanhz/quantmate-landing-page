"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const isCoarse = useMediaQuery("(pointer: coarse)");
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const hovering = useRef(false);
  const visible = useRef(false);
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (reducedMotion || isCoarse) return;

    function onMouseMove(e: MouseEvent) {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (!visible.current && dotRef.current && ringRef.current) {
        visible.current = true;
        dotRef.current.style.opacity = "1";
        ringRef.current.style.opacity = "0.5";
      }
      // Inner dot follows instantly via transform
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    }

    // Ring follows with easing in rAF loop
    function tick() {
      const lerp = 0.15;
      ringPos.current.x += (pos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * lerp;
      if (ringRef.current) {
        const size = hovering.current ? 52 : 32;
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
      }
      rafId.current = requestAnimationFrame(tick);
    }

    function onEnter(e: Event) {
      const t = e.target as HTMLElement;
      if (t.matches?.("a, button, [role='button'], [data-cursor='grow'], input, textarea, select")) {
        hovering.current = true;
        if (dotRef.current) {
          dotRef.current.style.width = "8px";
          dotRef.current.style.height = "8px";
        }
      }
    }

    function onLeave(e: Event) {
      const t = e.target as HTMLElement;
      if (t.matches?.("a, button, [role='button'], [data-cursor='grow'], input, textarea, select")) {
        hovering.current = false;
        if (dotRef.current) {
          dotRef.current.style.width = "5px";
          dotRef.current.style.height = "5px";
        }
      }
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("pointerover", onEnter, true);
    document.addEventListener("pointerout", onLeave, true);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("pointerover", onEnter, true);
      document.removeEventListener("pointerout", onLeave, true);
      cancelAnimationFrame(rafId.current);
    };
  }, [reducedMotion, isCoarse]);

  if (reducedMotion || isCoarse) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-primary will-change-transform"
        style={{ width: 5, height: 5, opacity: 0, transition: "width 0.15s, height 0.15s" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border-[1.5px] border-primary/50 will-change-transform"
        style={{ width: 32, height: 32, opacity: 0, transition: "width 0.2s, height 0.2s, opacity 0.3s" }}
      />
    </>
  );
}
