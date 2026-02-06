"use client";

import { motion } from "motion/react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedRingChart from "@/components/ui/AnimatedRingChart";
import GradientAvatar from "@/components/ui/GradientAvatar";
import Card from "@/components/ui/Card";
import { SECTION_IDS } from "@/lib/constants";
import { Star } from "lucide-react";

const stats = [
  { value: 500, max: 600, suffix: "+", label: "Sinh viên sử dụng" },
  { value: 3, max: 10, suffix: " phút", label: "Thời gian trung bình" },
  { value: 85, max: 100, suffix: "%", label: "Tiết kiệm chi phí" },
  { value: 4.8, max: 5, suffix: "/5", label: "Đánh giá trung bình" },
];

const testimonials = [
  {
    quote:
      "Quant Mate giải thích PLS-SEM dễ hiểu hơn cả thầy hướng dẫn. Mình chạy xong mô hình trong 1 buổi chiều thay vì 2 tuần như trước.",
    name: "Nguyễn Thanh Hà",
    university: "Đại học Kinh tế TP.HCM",
    rating: 5,
  },
  {
    quote:
      "Trước mình thuê chạy SPSS hết 4 triệu mà không hiểu kết quả. Giờ mình tự làm được và còn hiểu sâu hơn.",
    name: "Trần Minh Đức",
    university: "Đại học Ngoại thương",
    rating: 5,
  },
  {
    quote:
      "Phần giải thích từng bước của AI giúp mình trả lời phản biện tự tin hơn rất nhiều. Hội đồng còn khen phần phân tích.",
    name: "Lê Thị Mai Anh",
    university: "Đại học Quốc gia Hà Nội",
    rating: 5,
  },
];

// Double the testimonials for infinite scroll
const scrollTestimonials = [...testimonials, ...testimonials];

function StarRating({ rating, index }: { rating: number; index: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, j) => (
        <motion.div
          key={j}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + j * 0.08, type: "spring", stiffness: 400 }}
        >
          <Star size={16} className="text-gold fill-gold" />
        </motion.div>
      ))}
    </div>
  );
}

export default function SocialProofSection() {
  return (
    <section
      id={SECTION_IDS.socialProof}
      className="relative py-20 md:py-32 section-padding"
    >
      <div className="max-w-6xl mx-auto">
        <FadeInWhenVisible>
          <SectionHeading
            title="Được sinh viên tin dùng"
            subtitle="Hàng trăm sinh viên đã hoàn thành nghiên cứu nhanh hơn và tự tin hơn."
          />
        </FadeInWhenVisible>

        {/* Stats with ring charts */}
        <FadeInWhenVisible>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 md:mb-20">
            {stats.map((stat) => (
              <AnimatedRingChart
                key={stat.label}
                value={stat.value}
                max={stat.max}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </FadeInWhenVisible>

        {/* Infinite scroll testimonial carousel */}
        <div className="overflow-hidden -mx-6 px-6">
          <div
            className="flex gap-6 hover:[animation-play-state:paused]"
            style={{
              animation: "scroll-carousel 30s linear infinite",
              width: "max-content",
            }}
          >
            {scrollTestimonials.map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="w-[340px] md:w-[380px] shrink-0"
              >
                <Card className="h-full flex flex-col">
                  <StarRating rating={t.rating} index={i % testimonials.length} />

                  <p className="mt-4 text-secondary leading-relaxed flex-1 text-sm md:text-base">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="mt-4 pt-4 border-t border-dark/5 flex items-center gap-3">
                    <GradientAvatar
                      name={t.name}
                      size={36}
                      index={i % testimonials.length}
                    />
                    <div>
                      <p className="font-semibold text-primary text-sm">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted">{t.university}</p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
