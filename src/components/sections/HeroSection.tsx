"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import TextScramble from "@/components/animations/TextScramble";
import GradientOrbs from "@/components/animations/GradientOrbs";
import Button from "@/components/ui/Button";
import PillBadge from "@/components/ui/PillBadge";
import TerminalDemo from "@/components/ui/TerminalDemo";
import { SECTION_IDS } from "@/lib/constants";

const chips = [
  "Luận văn",
  "NCKH",
  "PLS-SEM",
  "OLS",
  "EFA/CFA",
  "Cronbach's Alpha",
  "SPSS",
  "SmartPLS",
  "AMOS",
];

const rotatingWords = ["nỗi\u00a0sợ", "gánh\u00a0nặng", "rào\u00a0cản", "bí\u00a0ẩn"];

export default function HeroSection() {
  const [scrambleDone, setScrambleDone] = useState(false);
  const [rotatingActive, setRotatingActive] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Delay before starting rotation after scramble completes
  useEffect(() => {
    if (!scrambleDone) return;
    const timer = setTimeout(() => setRotatingActive(true), 2500);
    return () => clearTimeout(timer);
  }, [scrambleDone]);

  // Word cycling
  useEffect(() => {
    if (!rotatingActive) return;
    const interval = setInterval(() => {
      setHasAnimated(true);
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [rotatingActive]);

  return (
    <section
      id={SECTION_IDS.hero}
      className="relative min-h-screen overflow-hidden"
    >
      <GradientOrbs />

      <div className="relative z-10 max-w-7xl mx-auto section-padding pt-28 pb-16 min-h-screen flex flex-col justify-center items-center text-center gap-6 md:gap-8">
        <FadeInWhenVisible>
          <PillBadge text="Early Access" className="mb-2" />
        </FadeInWhenVisible>

        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[1.08] tracking-tight text-primary">
          <TextScramble
            text={"Nghiên cứu khoa\u00a0học"}
            delay={400}
            duration={700}
          />
          <br />
          {!rotatingActive ? (
            <TextScramble
              text={"không còn là nỗi\u00a0sợ"}
              delay={900}
              duration={700}
              className="text-gold"
              onComplete={() => setScrambleDone(true)}
            />
          ) : (
            <motion.span
              className="text-gold inline-block relative"
              layout
              transition={{ layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
            >
              {"không còn là "}
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={rotatingWords[wordIndex]}
                  initial={
                    !hasAnimated
                      ? false
                      : { y: "0.3em", opacity: 0 }
                  }
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-0.3em", opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                  layout
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.span>
          )}
        </h1>

        <FadeInWhenVisible delay={0.6}>
          <p className="text-lg md:text-xl text-secondary max-w-3xl leading-relaxed">
            Trợ lý AI giúp sinh viên Việt Nam hiểu và thực hiện nghiên cứu định lượng,
            từ chọn phương pháp đến phân tích dữ liệu và giải thích chi tiết.
          </p>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.8}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button size="lg">Thử ngay miễn phí</Button>
            <Button variant="ghost" size="lg">
              Tìm hiểu thêm →
            </Button>
          </div>
        </FadeInWhenVisible>

        {/* Terminal — centered and prominent */}
        <FadeInWhenVisible delay={1.0}>
          <div className="w-full max-w-3xl mt-2">
            <TerminalDemo />
          </div>
        </FadeInWhenVisible>
      </div>

      {/* Floating chips at bottom */}
      <div className="relative z-10 max-w-5xl mx-auto section-padding pb-16">
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {chips.map((chip, i) => (
            <motion.span
              key={chip}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.8 + i * 0.06,
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              animate={{
                y: [0, -6, 0],
              }}
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-dark/5 text-secondary border border-dark/10 hover:bg-dark/10 transition-colors duration-200"
              style={{
                animationDuration: `${3 + (i % 4) * 0.7}s`,
              }}
            >
              {chip}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
