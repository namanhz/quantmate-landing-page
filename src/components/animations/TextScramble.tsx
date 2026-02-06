"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Props {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  onComplete?: () => void;
}

const charset = "!<>-_\\/[]{}=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export default function TextScramble({
  text,
  delay = 0,
  duration = 800,
  className,
  onComplete,
}: Props) {
  const [display, setDisplay] = useState("");
  const [started, setStarted] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started || completedRef.current) return;

    const startTime = Date.now();
    let frameId: number;

    function animate() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      let result = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " " || text[i] === "\u00a0") {
          result += text[i];
          continue;
        }
        const charThreshold = i / text.length;
        if (progress > charThreshold + 0.15) {
          result += text[i];
        } else if (progress > charThreshold - 0.15) {
          result += charset[Math.floor(Math.random() * charset.length)];
        } else {
          result += " ";
        }
      }
      setDisplay(result);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setDisplay(text);
        completedRef.current = true;
        onComplete?.();
      }
    }

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [started, text, duration, onComplete]);

  if (!started) {
    return (
      <span className={cn("inline-block invisible", className)}>{text}</span>
    );
  }

  return <span className={cn("inline-block", className)}>{display}</span>;
}
