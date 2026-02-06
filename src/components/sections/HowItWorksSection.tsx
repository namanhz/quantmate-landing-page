"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "@/lib/gsap-config";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import SectionHeading from "@/components/ui/SectionHeading";
import { SECTION_IDS } from "@/lib/constants";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  UserPlus,
  FileText,
  Sparkles,
  Mail,
  Lock,
  Upload,
  Database,
  BarChart3,
  FileDown,
  CheckCircle,
  TrendingUp,
  Shield,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Đăng ký tài khoản",
    description:
      "Tạo tài khoản miễn phí trong 30 giây. Không cần thẻ tín dụng, không cần cài đặt phần mềm.",
    highlights: ["Miễn phí", "30 giây", "Không cần SPSS"],
  },
  {
    icon: FileText,
    title: "Mô tả nghiên cứu",
    description:
      "Cho Quant Mate biết đề tài, phương pháp, và dữ liệu của bạn. AI sẽ gợi ý quy trình phân tích phù hợp nhất.",
    highlights: ["CSV/Excel", "Tự động gợi ý", "AI phân tích"],
  },
  {
    icon: Sparkles,
    title: "Nhận kết quả & hiểu bài",
    description:
      "Nhận kết quả phân tích kèm giải thích chi tiết — đủ để bạn tự tin trình bày và bảo vệ luận văn.",
    highlights: ["Giải thích chi tiết", "Xuất PDF", "Sẵn sàng bảo vệ"],
  },
];

/* ---------- Rich Panel Demos ---------- */

function SignupDemo() {
  return (
    <div className="terminal-card p-0 overflow-hidden w-full max-w-md">
      {/* Header */}
      <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-white/30 font-mono">Đăng ký</span>
      </div>

      <div className="p-5 space-y-3">
        {/* Social proof */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex -space-x-2">
            {["from-amber-400 to-orange-500", "from-violet-400 to-purple-500", "from-cyan-400 to-blue-500"].map((g, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                className={`w-7 h-7 rounded-full bg-gradient-to-br ${g} border-2 border-[#0D1117] flex items-center justify-center text-[9px] text-white font-bold`}
              >
                {["N", "T", "L"][i]}
              </motion.div>
            ))}
          </div>
          <span className="text-white/40 text-[11px]">500+ sinh viên đã tham gia</span>
        </div>

        {/* Form fields with fill animation */}
        <div className="space-y-2.5">
          <motion.div
            className="flex items-center gap-2 h-9 rounded-lg bg-white/5 border border-white/10 px-3"
            whileInView={{ borderColor: ["rgba(255,255,255,0.1)", "rgba(212,168,83,0.3)", "rgba(212,168,83,0.3)"] }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Mail size={14} className="text-white/25 shrink-0" />
            <motion.span
              className="text-white/60 text-xs font-mono"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "auto", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              nguyen.ha@ueh.edu.vn
            </motion.span>
          </motion.div>

          <motion.div
            className="flex items-center gap-2 h-9 rounded-lg bg-white/5 border border-white/10 px-3"
            whileInView={{ borderColor: ["rgba(255,255,255,0.1)", "rgba(212,168,83,0.3)", "rgba(212,168,83,0.3)"] }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <Lock size={14} className="text-white/25 shrink-0" />
            <motion.span
              className="text-white/60 text-xs font-mono"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "auto", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4, duration: 0.4 }}
            >
              ••••••••
            </motion.span>
          </motion.div>
        </div>

        {/* Submit button */}
        <motion.div
          className="h-9 rounded-lg bg-gold/20 border border-gold/30 flex items-center justify-center"
          initial={{ opacity: 0.5 }}
          whileInView={{ opacity: [0.5, 1], scale: [1, 1.02, 1] }}
          viewport={{ once: true }}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          <span className="text-gold text-xs font-semibold">Bắt đầu miễn phí →</span>
        </motion.div>

        {/* Success state */}
        <motion.div
          className="flex items-center gap-2 pt-1"
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 2.3, duration: 0.4 }}
        >
          <CheckCircle size={14} className="text-green-400" />
          <span className="text-green-400/80 text-[11px]">Tài khoản đã tạo thành công!</span>
        </motion.div>

        {/* Feature tags */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {["Không cần thẻ tín dụng", "Không cần SPSS", "Bắt đầu ngay"].map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 2.5 + i * 0.1 }}
              className="px-2 py-0.5 rounded-full bg-white/5 border border-white/8 text-[10px] text-white/40"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

function UploadDemo() {
  const files = [
    { name: "khao_sat_sv.xlsx", size: "2.4 MB", status: "done" },
    { name: "bien_quan_sat.csv", size: "856 KB", status: "done" },
  ];

  const methods = [
    { name: "PLS-SEM", match: 95, recommended: true },
    { name: "CB-SEM", match: 72, recommended: false },
    { name: "OLS Regression", match: 45, recommended: false },
  ];

  return (
    <div className="w-full max-w-md space-y-3">
      {/* File upload card */}
      <div className="terminal-card p-0 overflow-hidden">
        <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-white/30 font-mono">Tải dữ liệu</span>
        </div>

        <div className="p-4">
          {/* Drop zone */}
          <motion.div
            className="border-2 border-dashed border-white/10 rounded-xl p-4 mb-3 flex flex-col items-center gap-2"
            animate={{ borderColor: ["rgba(255,255,255,0.1)", "rgba(212,168,83,0.25)", "rgba(255,255,255,0.1)"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Upload size={20} className="text-gold/50" />
            <span className="text-white/30 text-[11px]">Kéo thả hoặc chọn file</span>
          </motion.div>

          {/* Uploaded files */}
          {files.map((file, i) => (
            <motion.div
              key={file.name}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.3, duration: 0.4 }}
              className="flex items-center gap-2 py-2 border-b border-white/5 last:border-0"
            >
              <Database size={14} className="text-gold/50 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-white/70 text-xs font-mono truncate">{file.name}</p>
                <p className="text-white/30 text-[10px]">{file.size}</p>
              </div>
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.3, type: "spring" }}
              >
                <CheckCircle size={14} className="text-green-400" />
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Method recommendation */}
      <div className="terminal-card p-0 overflow-hidden">
        <div className="px-4 py-2.5 border-b border-white/5">
          <span className="text-[11px] text-white/40 font-mono flex items-center gap-1.5">
            <Sparkles size={12} className="text-gold/60" />
            AI gợi ý phương pháp
          </span>
        </div>
        <div className="p-3 space-y-2">
          {methods.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2 + i * 0.2, duration: 0.3 }}
              className="flex items-center gap-2"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/70 font-mono">{m.name}</span>
                  {m.recommended && (
                    <span className="px-1.5 py-0.5 rounded bg-gold/15 text-gold text-[9px] font-medium">
                      Khuyến nghị
                    </span>
                  )}
                </div>
                <div className="mt-1 h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: m.recommended ? "rgba(212,168,83,0.6)" : "rgba(255,255,255,0.15)" }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${m.match}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.5 + i * 0.2, duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </div>
              <span className="text-[10px] text-white/40 font-mono w-8 text-right">{m.match}%</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultsDemo() {
  const metrics = [
    { label: "Cronbach's Alpha", value: "0.847", status: "pass", threshold: "≥ 0.6" },
    { label: "AVE", value: "0.612", status: "pass", threshold: "≥ 0.5" },
    { label: "SRMR", value: "0.043", status: "pass", threshold: "< 0.08" },
    { label: "R² (adj.)", value: "0.394", status: "info", threshold: "—" },
  ];

  const pathCoeffs = [
    { path: "QD → HL", beta: "0.342", sig: "***" },
    { path: "GT → HL", beta: "0.281", sig: "**" },
    { path: "TT → HL", beta: "0.156", sig: "*" },
  ];

  return (
    <div className="w-full max-w-md space-y-3">
      {/* Main results table */}
      <div className="terminal-card p-0 overflow-hidden">
        <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs text-white/30 font-mono">Kết quả phân tích</span>
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2 }}
            className="flex items-center gap-1 text-[10px] text-green-400/70"
          >
            <Shield size={10} /> Đạt chuẩn
          </motion.span>
        </div>

        <div className="p-4">
          <table className="w-full text-[11px] font-mono">
            <thead>
              <tr className="text-white/30 border-b border-white/8">
                <th className="text-left py-1.5 font-medium">Chỉ số</th>
                <th className="text-right py-1.5 font-medium">Giá trị</th>
                <th className="text-right py-1.5 font-medium">Ngưỡng</th>
                <th className="text-right py-1.5 font-medium w-8"></th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((m, i) => (
                <motion.tr
                  key={m.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.3 }}
                  className="border-b border-white/5"
                >
                  <td className="py-2 text-white/60">{m.label}</td>
                  <td className="py-2 text-right text-white/90 font-semibold">{m.value}</td>
                  <td className="py-2 text-right text-white/30">{m.threshold}</td>
                  <td className="py-2 text-right">
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.15, type: "spring" }}
                      className={m.status === "pass" ? "text-green-400" : "text-blue-400"}
                    >
                      {m.status === "pass" ? "✓" : "ℹ"}
                    </motion.span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Path coefficients + mini bar chart */}
      <div className="flex gap-3">
        <div className="terminal-card p-3 flex-1 overflow-hidden">
          <span className="text-[10px] text-white/30 font-mono flex items-center gap-1 mb-2">
            <TrendingUp size={10} /> Hệ số đường dẫn
          </span>
          {pathCoeffs.map((p, i) => (
            <motion.div
              key={p.path}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 + i * 0.15 }}
              className="flex justify-between items-center py-1 text-[10px] font-mono"
            >
              <span className="text-white/50">{p.path}</span>
              <span className="text-white/80">
                {p.beta} <span className="text-gold">{p.sig}</span>
              </span>
            </motion.div>
          ))}
        </div>

        {/* Mini bar chart */}
        <div className="terminal-card p-3 flex-1 overflow-hidden">
          <span className="text-[10px] text-white/30 font-mono flex items-center gap-1 mb-2">
            <BarChart3 size={10} /> R² Values
          </span>
          <div className="flex items-end gap-2 h-16">
            {[
              { label: "HL", value: 0.39 },
              { label: "QD", value: 0.28 },
              { label: "GT", value: 0.52 },
            ].map((bar, i) => (
              <div key={bar.label} className="flex flex-col items-center gap-1 flex-1">
                <motion.div
                  className="w-full bg-gold/40 rounded-t-sm"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${bar.value * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.3 + i * 0.15, duration: 0.6, ease: "easeOut" }}
                  style={{ maxHeight: "100%" }}
                />
                <span className="text-[9px] text-white/40">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export row */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.8, duration: 0.4 }}
        className="flex items-center justify-between px-3 py-2 rounded-lg bg-dark/40 border border-white/5"
      >
        <span className="text-[11px] text-white/40">Xuất kết quả</span>
        <div className="flex gap-2">
          {["PDF", "Word", "SPSS"].map((fmt) => (
            <span
              key={fmt}
              className="px-2 py-0.5 rounded bg-white/5 border border-white/8 text-[10px] text-white/50 font-mono"
            >
              <FileDown size={9} className="inline mr-0.5 -mt-0.5" />
              {fmt}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

const panelDemos = [SignupDemo, UploadDemo, ResultsDemo];

export default function HowItWorksSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reducedMotion = useReducedMotion();

  // CSS sticky + GSAP xPercent — no pin, no spacer, no jump
  useEffect(() => {
    if (!isDesktop || reducedMotion || !wrapperRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        x: () => -(trackRef.current!.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, [isDesktop, reducedMotion]);

  // Desktop: horizontal scroll via CSS sticky (no GSAP pin)
  if (isDesktop && !reducedMotion) {
    return (
      <div
        id={SECTION_IDS.howItWorks}
        ref={wrapperRef}
        style={{ height: `${steps.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Section title */}
          <div className="absolute top-10 md:top-14 left-0 right-0 z-10 text-center pointer-events-none section-padding">
            <span className="text-[11px] font-mono text-gold/60 uppercase tracking-[0.2em] block mb-3">
              Quy trình
            </span>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
              Bắt đầu chỉ trong 3 bước
            </h2>
          </div>

          <div
            ref={trackRef}
            className="flex h-full"
            style={{ width: `${steps.length * 100}vw` }}
          >
            {steps.map((step, i) => {
              const Icon = step.icon;
              const PanelDemo = panelDemos[i];
              return (
                <div
                  key={step.title}
                  className="w-screen h-screen flex items-center justify-center section-padding"
                >
                  <div className="max-w-6xl w-full mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                    {/* Left: Text content */}
                    <div className="flex-1 text-center lg:text-left relative">
                      {/* Decorative large number */}
                      <span
                        className="text-[120px] leading-none font-heading font-bold text-gold/[0.06] absolute -top-4 -left-4 select-none pointer-events-none"
                        aria-hidden="true"
                      >
                        0{i + 1}
                      </span>

                      {/* Step label */}
                      <span className="inline-flex items-center gap-2 text-xs font-mono text-gold/60 uppercase tracking-widest mb-4">
                        <span className="w-6 h-[1px] bg-gold/40" />
                        Bước {i + 1} / 3
                      </span>

                      {/* Icon */}
                      <div className="w-16 h-16 rounded-2xl bg-gold/10 border-2 border-gold/25 flex items-center justify-center mb-5">
                        <Icon size={28} className="text-gold" strokeWidth={1.5} />
                      </div>

                      <h3 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-4">
                        {step.title}
                      </h3>

                      <p className="text-secondary leading-relaxed text-lg max-w-md">
                        {step.description}
                      </p>

                      {/* Highlight pills */}
                      <div className="mt-6 flex flex-wrap gap-2">
                        {step.highlights.map((h) => (
                          <span
                            key={h}
                            className="px-3 py-1 rounded-full bg-gold/8 border border-gold/15 text-xs text-gold font-medium"
                          >
                            {h}
                          </span>
                        ))}
                      </div>

                      {/* Step progress dots */}
                      <div className="mt-8 flex items-center gap-3">
                        {steps.map((_, j) => (
                          <div
                            key={j}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              j === i
                                ? "w-8 bg-gold/60"
                                : j < i
                                ? "w-3 bg-gold/25"
                                : "w-3 bg-dark/10"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Right: Rich Demo */}
                    <div className="flex-1 flex justify-center">
                      <PanelDemo />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Mobile / reduced motion: vertical timeline with richer content
  return (
    <section
      id={SECTION_IDS.howItWorks}
      className="relative py-20 md:py-32 section-padding"
    >
      <div className="max-w-4xl mx-auto">
        <FadeInWhenVisible>
          <SectionHeading
            title="Bắt đầu chỉ trong 3 bước"
            subtitle="Đơn giản, nhanh chóng, hiệu quả."
          />
        </FadeInWhenVisible>

        <div className="relative">
          <div
            className="hidden md:block absolute left-8 top-0 w-[2px] h-full bg-gradient-to-b from-gold/30 via-gold/20 to-transparent"
            aria-hidden="true"
          />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <FadeInWhenVisible key={step.title} delay={i * 0.2}>
                  <div className="flex gap-6 md:gap-8 items-start">
                    <div className="shrink-0 w-16 h-16 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center relative z-10">
                      <Icon size={24} className="text-gold" strokeWidth={1.5} />
                    </div>
                    <div className="pt-2">
                      <span className="text-xs font-mono text-gold/60 uppercase tracking-wider">
                        Bước {i + 1}
                      </span>
                      <h3 className="text-xl md:text-2xl font-semibold text-primary mt-1">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-secondary leading-relaxed max-w-lg">
                        {step.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {step.highlights.map((h) => (
                          <span key={h} className="px-2 py-0.5 rounded-full bg-gold/8 border border-gold/15 text-[11px] text-gold font-medium">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeInWhenVisible>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
