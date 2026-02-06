"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function PageLoadSequence() {
  const reducedMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(true);
  const [scrambledText, setScrambledText] = useState("");
  const targetText = "Quant Mate";
  const charset = "!<>-_\\/[]{}=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    if (reducedMotion) {
      // Use a microtask to avoid synchronous setState in effect
      queueMicrotask(() => setIsLoading(false));
      return;
    }

    const duration = 600;
    const startTime = Date.now();
    let frameId: number;

    function animate() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      let result = "";
      for (let i = 0; i < targetText.length; i++) {
        const charProgress = i / targetText.length;
        if (progress > charProgress + 0.1) {
          result += targetText[i];
        } else if (progress > charProgress - 0.2) {
          result += charset[Math.floor(Math.random() * charset.length)];
        } else {
          result += " ";
        }
      }
      setScrambledText(result);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setScrambledText(targetText);
        setTimeout(() => setIsLoading(false), 400);
      }
    }

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-cream"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.span
            className="font-heading text-4xl md:text-6xl text-primary tracking-tight"
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {scrambledText}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
