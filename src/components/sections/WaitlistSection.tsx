"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import ConfettiCelebration from "@/components/animations/ConfettiCelebration";
import MagneticButton from "@/components/ui/MagneticButton";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { SECTION_IDS } from "@/lib/constants";
import { useInView } from "@/hooks/useInView";
import { Mail, CheckCircle } from "lucide-react";

export default function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);
  const [count, setCount] = useState(500);
  const { ref: counterRef, inView } = useInView(0.5);

  // Live counter tick
  useEffect(() => {
    if (!inView || submitted) return;
    let ticks = 0;
    const maxTicks = 8;
    const interval = setInterval(() => {
      if (ticks >= maxTicks) {
        clearInterval(interval);
        return;
      }
      setCount((c) => c + 1);
      ticks++;
    }, 2500 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, [inView, submitted]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  }

  return (
    <section
      id={SECTION_IDS.waitlist}
      className="relative py-20 md:py-32 section-padding"
    >
      <div className="max-w-2xl mx-auto">
        <FadeInWhenVisible>
          <Card variant="dark" className="relative text-center p-8 md:p-12 overflow-hidden">
            <ConfettiCelebration active={submitted} />

            <h2 className="font-heading text-2xl md:text-4xl font-bold text-on-dark">
              Đăng ký trải nghiệm sớm
            </h2>
            <p className="mt-4 text-on-dark/60 max-w-md mx-auto">
              Nhập email để nhận lời mời sử dụng Quant Mate trước tất cả mọi
              người.
            </p>

            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                {/* Gradient border input */}
                <div className="flex-1 relative">
                  <div
                    className="absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-300"
                    style={{
                      opacity: focused ? 1 : 0,
                      background: `conic-gradient(from var(--border-angle, 0deg), var(--accent-gold), transparent 40%, var(--accent-gold))`,
                      animation: focused ? "rotate-border 3s linear infinite" : "none",
                    }}
                  />
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 z-10"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      placeholder="email@university.edu.vn"
                      className="relative w-full pl-10 pr-4 py-3 rounded-full bg-[#0D1117] border border-white/10 text-on-dark placeholder:text-white/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all text-sm"
                    />
                  </div>
                </div>
                <MagneticButton>
                  <Button type="submit" size="md">
                    Đăng ký
                  </Button>
                </MagneticButton>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="mt-8 flex items-center justify-center gap-2 text-green-400"
              >
                {/* Animated checkmark */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, 0] }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                >
                  <CheckCircle size={24} />
                </motion.div>
                <span>
                  Đã đăng ký thành công! Chúng tôi sẽ liên hệ sớm.
                </span>
              </motion.div>
            )}

            {/* Live counter */}
            <p ref={counterRef} className="mt-4 text-xs text-on-dark/40">
              Đã có{" "}
              <motion.span
                key={count}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="inline-block text-gold font-semibold"
              >
                {count}+
              </motion.span>{" "}
              sinh viên đăng ký. Miễn phí, không spam.
            </p>
          </Card>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
