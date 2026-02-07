"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

interface Props {
  value: number;
  max: number;
  label: string;
  suffix?: string;
  size?: number;
}

export default function AnimatedRingChart({
  value,
  max,
  label,
  suffix = "",
  size = 100,
}: Props) {
  const { ref, inView } = useInView(0.3);
  const [progress, setProgress] = useState(0);
  const [displayValue, setDisplayValue] = useState(0);

  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const fraction = value / max;

  useEffect(() => {
    if (!inView) return;

    const duration = 1500;
    const start = performance.now();

    function animate(now: number) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased * fraction);
      setDisplayValue(Math.round(eased * value * (value < 10 ? 10 : 1)) / (value < 10 ? 10 : 1));
      if (t < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [inView, value, max, fraction]);

  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(26,26,46,0.08)"
            strokeWidth={4}
          />
          {/* Fill */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--accent-gold)"
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />
        </svg>

        {/* Center value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading text-xl md:text-2xl font-bold text-gold">
            {value < 10 && value % 1 !== 0 ? displayValue.toFixed(1) : Math.round(displayValue)}
            {suffix}
          </span>
        </div>
      </div>
      <p className="text-sm text-secondary text-center">{label}</p>
    </div>
  );
}
