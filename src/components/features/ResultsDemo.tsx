"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const results = [
  { metric: "Cronbach's Alpha", value: 0.847, status: "pass" as const },
  { metric: "AVE", value: 0.612, status: "pass" as const },
  { metric: "SRMR", value: 0.043, status: "pass" as const },
  { metric: "R² (adjusted)", value: 0.394, status: "info" as const },
];

function AnimatedNumber({ target, active }: { target: number; active: boolean }) {
  const [display, setDisplay] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!active) {
      queueMicrotask(() => setDisplay(0));
      return;
    }
    const duration = 1200;
    const start = Date.now();
    function animate() {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(target * eased);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    }
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [active, target]);

  return <>{display.toFixed(3)}</>;
}

export default function ResultsDemo({ isActive }: { isActive: boolean }) {
  const [visibleRows, setVisibleRows] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (!isActive) {
      queueMicrotask(() => {
        setVisibleRows(0);
        setShowSummary(false);
      });
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    results.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleRows(i + 1), 300 + i * 400)
      );
    });
    timers.push(
      setTimeout(() => setShowSummary(true), 300 + results.length * 400 + 300)
    );

    return () => timers.forEach(clearTimeout);
  }, [isActive]);

  return (
    <div className="terminal-card">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-white/30">Kết quả phân tích</span>
      </div>

      <div className="p-4 min-h-[300px]">
        <table className="w-full text-sm font-mono">
          <thead>
            <tr className="text-white/40 border-b border-white/10">
              <th className="text-left py-2 font-medium">Chỉ số</th>
              <th className="text-right py-2 font-medium">Giá trị</th>
              <th className="text-right py-2 font-medium">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {results.slice(0, visibleRows).map((row, i) => (
                <motion.tr
                  key={row.metric}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-b border-white/5"
                >
                  <td className="py-2.5 text-white/70">{row.metric}</td>
                  <td className="py-2.5 text-right text-white/90 font-semibold">
                    <AnimatedNumber target={row.value} active={i < visibleRows} />
                  </td>
                  <td className="py-2.5 text-right">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8, type: "spring" }}
                      className={
                        row.status === "pass"
                          ? "text-green-400"
                          : "text-blue-400"
                      }
                    >
                      {row.status === "pass" ? "✓ Đạt" : "ℹ Info"}
                    </motion.span>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {/* Summary line */}
        <AnimatePresence>
          {showSummary && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-green-400 text-sm font-mono font-medium">
                Mô hình đạt yêu cầu
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
