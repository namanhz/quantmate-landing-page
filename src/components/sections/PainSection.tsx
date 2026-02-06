"use client";

import { motion } from "motion/react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import FlipNumber from "@/components/animations/FlipNumber";
import SectionHeading from "@/components/ui/SectionHeading";
import { SECTION_IDS } from "@/lib/constants";
import { BarChart3, HelpCircle, Banknote } from "lucide-react";

const painPoints = [
  {
    number: "01",
    icon: HelpCircle,
    title: "Học vẹt, không hiểu bản chất",
    description:
      "Xem hàng chục video YouTube nhưng vẫn không hiểu tại sao phải dùng EFA trước CFA, hay khi nào dùng OLS thay vì PLS-SEM.",
    solution: "AI giải thích tường tận",
  },
  {
    number: "02",
    icon: BarChart3,
    title: "Dữ liệu chạy không ra kết quả",
    description:
      "Cronbach's Alpha < 0.6, p-value > 0.05, mô hình không hội tụ — nhưng không biết sửa ở đâu và tại sao.",
    solution: "Tự động gợi ý sửa lỗi",
  },
  {
    number: "03",
    icon: Banknote,
    title: "Thuê ngoài đắt, chất lượng không đảm bảo",
    description:
      "Chi 3-5 triệu VNĐ thuê chạy SPSS nhưng không hiểu kết quả, không trả lời được câu hỏi phản biện.",
    solution: "Tiết kiệm 85% chi phí",
  },
];

export default function PainSection() {
  return (
    <section
      id={SECTION_IDS.pain}
      className="relative py-20 md:py-32 section-padding"
    >
      <div className="max-w-6xl mx-auto">
        <FadeInWhenVisible>
          <SectionHeading
            title="Sinh viên đang gặp khó khăn gì?"
            subtitle="Nghiên cứu định lượng là phần khó nhất trong luận văn — nhưng không ai dạy bạn cách làm đúng."
          />
        </FadeInWhenVisible>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {/* Animated connector line (desktop only) */}
          <svg
            className="hidden md:block absolute top-12 left-0 w-full h-[2px] pointer-events-none z-0"
            aria-hidden="true"
          >
            <motion.line
              x1="16.5%"
              y1="1"
              x2="83.5%"
              y2="1"
              stroke="var(--accent-gold)"
              strokeWidth="2"
              strokeDasharray="8 6"
              initial={{ pathLength: 0, opacity: 0.3 }}
              whileInView={{ pathLength: 1, opacity: 0.3 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>

          {painPoints.map((point, i) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.number}
                initial={{
                  opacity: 0,
                  y: 30,
                  rotate: i === 0 ? -2 : i === 2 ? 2 : 0,
                  filter: "grayscale(0.4)",
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                  filter: "grayscale(0)",
                }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: i * 0.15,
                  duration: 0.7,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="relative bg-cream-light rounded-2xl p-6 md:p-8 border border-dark/5 hover:border-gold/20 transition-colors duration-500 group z-10"
              >
                {/* Animated icon */}
                <motion.div
                  className="absolute top-5 right-5 text-gold/15 group-hover:text-gold/25 transition-colors duration-500"
                  whileInView={{
                    rotate: [0, 5, -5, 0],
                  }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
                >
                  <Icon size={32} strokeWidth={1} />
                </motion.div>

                {/* Flip number */}
                <FlipNumber
                  number={point.number}
                  className="font-heading text-5xl md:text-6xl font-bold text-gold/20"
                />

                <h3 className="mt-2 text-lg md:text-xl font-semibold text-primary">
                  {point.title}
                </h3>
                <p className="mt-3 text-secondary leading-relaxed text-sm md:text-base">
                  {point.description}
                </p>

                {/* Solution badge - fades in */}
                <motion.div
                  className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/8 border border-gold/15"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.15, duration: 0.4 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span className="text-xs text-gold font-medium">
                    {point.solution}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
