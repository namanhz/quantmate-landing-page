"use client";

import { motion } from "motion/react";

interface Props {
  number: string;
  className?: string;
}

export default function FlipNumber({ number, className }: Props) {
  return (
    <span className={className} style={{ perspective: "200px" }}>
      {number.split("").map((digit, i) => (
        <motion.span
          key={`${digit}-${i}`}
          className="inline-block"
          initial={{ rotateX: -90, opacity: 0 }}
          whileInView={{ rotateX: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: i * 0.12,
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ transformOrigin: "bottom center" }}
        >
          {digit}
        </motion.span>
      ))}
    </span>
  );
}
