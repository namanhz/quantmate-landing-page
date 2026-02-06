"use client";

import { motion } from "motion/react";
import AuroraBackground from "@/components/animations/AuroraBackground";
import ScrollRevealText from "@/components/animations/ScrollRevealText";
import Button from "@/components/ui/Button";
import { SECTION_IDS } from "@/lib/constants";

const floatingQuotes = [
  "Dễ hiểu hơn cả thầy",
  "Tự tin bảo vệ luận văn",
  "Tiết kiệm 4 triệu",
  "Chạy xong trong 1 buổi chiều",
  "Hội đồng khen phân tích",
];

export default function CTASection() {
  return (
    <section
      id={SECTION_IDS.cta}
      className="relative bg-dark py-20 md:py-32 section-padding overflow-hidden"
    >
      <AuroraBackground />

      {/* Floating quote fragments */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {floatingQuotes.map((quote, i) => (
          <span
            key={i}
            className="absolute text-on-dark/[0.06] text-sm font-medium whitespace-nowrap"
            style={{
              left: `${10 + (i * 18) % 80}%`,
              bottom: `${-5 + i * 5}%`,
              animation: `float-up ${18 + i * 3}s ${i * 4}s linear infinite`,
            }}
          >
            {quote}
          </span>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-on-dark leading-tight">
          <ScrollRevealText
            text="Sẵn sàng làm chủ nghiên cứu của bạn?"
            highlightWords={["nghiên", "cứu", "bạn?"]}
            highlightClass="text-gold"
          />
        </h2>

        <motion.p
          className="mt-6 text-on-dark/60 text-lg max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Tham gia cùng hàng trăm sinh viên đã tự tin hoàn thành luận văn
          với Quant Mate.
        </motion.p>

        <motion.div
          className="mt-10 relative inline-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {/* Expanding ring pulses */}
          {[0, 1, 2].map((ring) => (
            <motion.div
              key={ring}
              className="absolute inset-0 rounded-full border-2 border-gold/20"
              animate={{
                scale: [1, 2.2],
                opacity: [0.3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: ring * 0.6,
                ease: "easeOut",
              }}
            />
          ))}

          <Button size="lg">Bắt đầu miễn phí</Button>
        </motion.div>

        <motion.p
          className="mt-4 text-sm text-on-dark/40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Không cần thẻ tín dụng &middot; Hủy bất cứ lúc nào
        </motion.p>
      </div>
    </section>
  );
}
