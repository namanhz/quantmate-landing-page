"use client";

import { useMemo } from "react";
import { motion } from "motion/react";

const colors = ["#D4A853", "#F5F0E8", "#4ade80", "#60a5fa", "#c084fc"];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function ConfettiCelebration({ active }: { active: boolean }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 32 }, (_, i) => ({
        id: i,
        x: randomBetween(-120, 120),
        y: randomBetween(-180, -60),
        rotation: randomBetween(0, 720),
        color: colors[i % colors.length],
        size: randomBetween(4, 8),
        delay: randomBetween(0, 0.3),
        duration: randomBetween(0.8, 1.4),
      })),
    []
  );

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute left-1/2 top-1/2 rounded-sm"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
          animate={{
            x: p.x,
            y: p.y,
            rotate: p.rotation,
            opacity: [1, 1, 0],
            scale: [1, 1, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      ))}
    </div>
  );
}
