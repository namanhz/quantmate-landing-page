"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Upload, Cpu, BarChart3 } from "lucide-react";

const stages = [
  { icon: Upload, label: "Tải dữ liệu", sublabel: "CSV, Excel" },
  { icon: Cpu, label: "Xử lý", sublabel: "PLS-SEM" },
  { icon: BarChart3, label: "Kết quả", sublabel: "Báo cáo" },
];

export default function DataFlowDemo({ isActive }: { isActive: boolean }) {
  const [activeStage, setActiveStage] = useState(-1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isActive) {
      queueMicrotask(() => {
        setActiveStage(-1);
        setProgress(0);
      });
      return;
    }

    // Animate through stages
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setActiveStage(0), 400));
    timers.push(setTimeout(() => setActiveStage(1), 1400));
    timers.push(setTimeout(() => setActiveStage(2), 2800));

    // Progress bar
    let frame: number;
    let start: number;
    function animateProgress(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;
      setProgress(Math.min(elapsed / 3200, 1));
      if (elapsed < 3200) frame = requestAnimationFrame(animateProgress);
    }
    const pTimer = setTimeout(() => {
      frame = requestAnimationFrame(animateProgress);
    }, 400);
    timers.push(pTimer);

    return () => {
      timers.forEach(clearTimeout);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [isActive]);

  return (
    <div className="terminal-card">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-white/30">Quy trình phân tích</span>
      </div>

      <div className="p-6 min-h-[300px] flex flex-col justify-center">
        {/* Stages */}
        <div className="flex items-center justify-between gap-2">
          {stages.map((stage, i) => {
            const Icon = stage.icon;
            const isReached = i <= activeStage;
            const isCurrent = i === activeStage;

            return (
              <div key={i} className="flex items-center gap-2 flex-1">
                <div
                  className="flex flex-col items-center gap-2 flex-1 transition-transform duration-500"
                  style={{ transform: isCurrent ? "scale(1.1)" : "scale(1)" }}
                >
                  <div
                    className="w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-500"
                    style={{
                      borderColor: isReached
                        ? "rgba(212,168,83,0.6)"
                        : "rgba(255,255,255,0.1)",
                      backgroundColor: isReached
                        ? "rgba(212,168,83,0.1)"
                        : "rgba(255,255,255,0.02)",
                    }}
                  >
                    <Icon
                      size={22}
                      className={
                        isReached ? "text-gold" : "text-white/20"
                      }
                      strokeWidth={1.5}
                    />
                  </div>
                  <span
                    className={`text-xs font-medium transition-colors duration-500 ${
                      isReached ? "text-white/80" : "text-white/30"
                    }`}
                  >
                    {stage.label}
                  </span>
                  <span className="text-[10px] text-white/30">
                    {stage.sublabel}
                  </span>
                </div>

                {/* Connector arrow */}
                {i < stages.length - 1 && (
                  <div className="flex-shrink-0 px-1">
                    <motion.div
                      animate={{
                        opacity: i < activeStage ? 1 : 0.2,
                      }}
                      className="flex gap-0.5"
                    >
                      {[0, 1, 2].map((dot) => (
                        <motion.div
                          key={dot}
                          animate={{
                            backgroundColor:
                              i < activeStage
                                ? "rgba(212,168,83,0.7)"
                                : "rgba(255,255,255,0.15)",
                          }}
                          transition={{ delay: dot * 0.1 }}
                          className="w-1.5 h-1.5 rounded-full"
                        />
                      ))}
                    </motion.div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="mt-8">
          <div className="flex justify-between text-[10px] text-white/30 mb-1.5 font-mono">
            <span>Tiến trình</span>
            <span>{Math.round(progress * 100)}%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gold/70 rounded-full"
              style={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        {/* Status log — space always reserved */}
        <div className="mt-4 font-mono text-[11px] text-white/40 space-y-1">
          <p className={`transition-opacity duration-300 ${activeStage >= 0 ? "opacity-100" : "opacity-0"}`}>
            <span className="text-green-400">✓</span> Đã nhận file: data_survey.xlsx
          </p>
          <p className={`transition-opacity duration-300 ${activeStage >= 1 ? "opacity-100" : "opacity-0"}`}>
            <span className="text-yellow-300">⟳</span> Đang phân tích PLS-SEM...
          </p>
          <p className={`transition-opacity duration-300 ${activeStage >= 2 ? "opacity-100" : "opacity-0"}`}>
            <span className="text-green-400">✓</span> Hoàn tất — 4 chỉ số đạt chuẩn
          </p>
        </div>
      </div>
    </div>
  );
}
