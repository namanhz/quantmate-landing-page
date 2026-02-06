"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import TiltCard from "@/components/animations/TiltCard";
import SectionHeading from "@/components/ui/SectionHeading";
import AIChatDemo from "@/components/features/AIChatDemo";
import DataFlowDemo from "@/components/features/DataFlowDemo";
import ResultsDemo from "@/components/features/ResultsDemo";
import { useInView } from "@/hooks/useInView";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { MessageSquare, Workflow, BarChart3 } from "lucide-react";

const CYCLE_MS = 8000;

const features = [
  {
    icon: MessageSquare,
    title: "AI Gia sư",
    description:
      "Hỏi bất kỳ câu hỏi nào về nghiên cứu định lượng — Quant Mate giải thích dễ hiểu, kèm trích dẫn sách giáo khoa chuẩn.",
  },
  {
    icon: Workflow,
    title: "Quy trình tự động",
    description:
      "Từ chọn phương pháp phân tích đến xuất kết quả — tất cả được tự động hóa. Bạn chỉ cần tải dữ liệu lên.",
  },
  {
    icon: BarChart3,
    title: "Mô phỏng dữ liệu",
    description:
      "Xem trước mô hình nghiên cứu dưới dạng bảng kết quả chi tiết, với các chỉ số quan trọng và đánh giá tự động.",
  },
];

const tabHighlights = [
  ["200+ chủ đề", "Trích dẫn APA", "Giải thích từng bước"],
  ["3 bước duy nhất", "10+ phương pháp", "Xuất báo cáo tự động"],
  ["4 chỉ số chính", "So sánh ngưỡng chuẩn", "Đánh giá AI tự động"],
];

export default function FeaturesSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const pausedRef = useRef(false);
  const { ref: sectionRef, inView } = useInView(0.15);

  function handleTabClick(i: number) {
    setActiveTab(i);
    setProgressKey((k) => k + 1);
  }

  // Auto-cycle tabs — only starts when section is in viewport
  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => {
      if (!pausedRef.current) {
        setActiveTab((prev) => (prev + 1) % features.length);
      }
      setProgressKey((k) => k + 1);
    }, CYCLE_MS);
    return () => clearTimeout(timer);
  }, [progressKey, inView]);

  return (
    <section
      id={SECTION_IDS.features}
      className="relative py-20 md:py-32 section-padding"
    >
      <div
        ref={sectionRef}
        className="max-w-5xl mx-auto"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
      >
        <FadeInWhenVisible>
          <SectionHeading
            title="Quant Mate giúp bạn như thế nào?"
            subtitle="Ba công cụ mạnh mẽ, một nền tảng duy nhất."
          />
        </FadeInWhenVisible>

        {/* Horizontal compact tabs */}
        <FadeInWhenVisible delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              const isActive = i === activeTab;

              return (
                <button
                  key={feature.title}
                  onClick={() => handleTabClick(i)}
                  className={cn(
                    "relative flex items-center gap-2.5 px-5 py-3 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden",
                    isActive
                      ? "bg-cream-light border-gold/30 shadow-lg shadow-gold/5"
                      : "bg-transparent border-dark/8 hover:border-dark/15 hover:bg-cream-light/50"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300",
                      isActive
                        ? "bg-gold/15 text-gold"
                        : "bg-dark/5 text-secondary"
                    )}
                  >
                    <Icon size={16} strokeWidth={1.5} />
                  </div>
                  <span
                    className={cn(
                      "font-heading text-sm font-bold transition-colors duration-300",
                      isActive ? "text-primary" : "text-secondary"
                    )}
                  >
                    {feature.title}
                  </span>

                  {/* Progress bar at bottom */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold/10">
                      <div
                        key={progressKey}
                        className="h-full bg-gold/50 rounded-full"
                        style={{
                          animation: `tab-progress ${CYCLE_MS}ms linear forwards`,
                          transformOrigin: "left",
                        }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </FadeInWhenVisible>

        {/* Active tab description */}
        <div className="mb-8 min-h-[3rem] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="text-center text-secondary text-sm md:text-base max-w-xl mx-auto"
            >
              {features[activeTab].description}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Full-width demo area */}
        <FadeInWhenVisible delay={0.2}>
          <div className="max-w-4xl mx-auto">
            <TiltCard intensity={4}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  {activeTab === 0 && (
                    <AIChatDemo isActive={activeTab === 0} />
                  )}
                  {activeTab === 1 && (
                    <DataFlowDemo isActive={activeTab === 1} />
                  )}
                  {activeTab === 2 && (
                    <ResultsDemo isActive={activeTab === 2} />
                  )}
                </motion.div>
              </AnimatePresence>
            </TiltCard>

            {/* Contextual highlight pills */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, delay: 0.1 }}
                className="flex gap-3 mt-4"
              >
                {tabHighlights[activeTab].map((label, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06 }}
                    className="flex-1 text-center py-2.5 px-3 rounded-xl bg-dark/[0.03] border border-dark/[0.06]"
                  >
                    <span className="text-xs font-medium text-secondary">
                      {label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
