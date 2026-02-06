"use client";

import { motion } from "motion/react";

interface Props {
  name: string;
  size?: number;
  index?: number;
}

const gradients = [
  "from-amber-400 to-orange-500",
  "from-violet-400 to-purple-500",
  "from-cyan-400 to-blue-500",
  "from-emerald-400 to-teal-500",
  "from-rose-400 to-pink-500",
];

export default function GradientAvatar({ name, size = 40, index = 0 }: Props) {
  const initial = name.charAt(0).toUpperCase();
  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut" }}
      className={`bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center text-white font-semibold shrink-0`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initial}
    </motion.div>
  );
}
