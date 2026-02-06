"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  className?: string;
}

export default function Chip({ label, className }: Props) {
  return (
    <motion.span
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
      }}
      className={cn(
        "inline-block px-4 py-1.5 rounded-full text-sm font-medium",
        "bg-dark/5 text-secondary border border-dark/10",
        "hover:bg-dark/10 transition-colors duration-200",
        className
      )}
    >
      {label}
    </motion.span>
  );
}
