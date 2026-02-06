"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface Props {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightClass?: string;
}

export default function ScrollRevealText({
  text,
  className,
  highlightWords = [],
  highlightClass = "text-gold",
}: Props) {
  const words = text.split(" ");

  return (
    <span className={cn("inline", className)}>
      {words.map((word, i) => {
        const isHighlight = highlightWords.includes(word);
        return (
          <span key={i} className="inline-block mr-[0.3em]">
            <motion.span
              className={cn("inline-block", isHighlight && highlightClass)}
              initial={{ opacity: 0.15, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                delay: i * 0.06,
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
