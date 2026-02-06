"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "motion/react";
import { useInView } from "@/hooks/useInView";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const conversation = [
  {
    role: "user" as const,
    text: "Cronbach's Alpha của mình ra 0.58, có vấn đề gì không?",
  },
  {
    role: "ai" as const,
    text: "Cronbach's Alpha = 0.58 nghĩa là thang đo của bạn chưa đạt độ tin cậy (cần ≥ 0.6 theo Nunnally, 1978). Bạn nên kiểm tra:\n\n1. Xóa biến có hệ số tương quan biến-tổng < 0.3\n2. Kiểm tra lại cách đặt câu hỏi ngược\n3. Tăng cỡ mẫu nếu < 100\n\nĐể mình phân tích dữ liệu cụ thể giúp bạn nhé?",
  },
];


function highlightAIText(text: string) {
  // Highlight numbers, keywords, and citations
  return text.split(/(\d+\.?\d*|Cronbach's Alpha|Nunnally, 1978|≥|<)/).map((part, i) => {
    if (/^\d+\.?\d*$/.test(part)) {
      return (
        <span key={i} className="text-yellow-300">
          {part}
        </span>
      );
    }
    if (part === "Cronbach's Alpha") {
      return (
        <span key={i} className="text-cyan-300">
          {part}
        </span>
      );
    }
    if (part === "Nunnally, 1978") {
      return (
        <span key={i} className="text-white/50 italic">
          {part}
        </span>
      );
    }
    if (part === "≥" || part === "<") {
      return (
        <span key={i} className="text-gold">
          {part}
        </span>
      );
    }
    return part;
  });
}

export default function TerminalDemo() {
  const { ref, inView } = useInView(0.3);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition();
  const reducedMotion = useReducedMotion();
  const [messages, setMessages] = useState<typeof conversation>([]);
  const [currentMsg, setCurrentMsg] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [thinkingDots, setThinkingDots] = useState(false);

  // 3D tilt calculation
  const getTilt = () => {
    if (reducedMotion || !containerRef.current) return { rotateX: 0, rotateY: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = ((mouse.x - centerX) / window.innerWidth) * 6;
    const rotateX = ((mouse.y - centerY) / window.innerHeight) * -4;
    return { rotateX, rotateY };
  };

  const tilt = getTilt();

  const typeMessage = useCallback((text: string, onComplete: () => void) => {
    setIsTyping(true);
    let i = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        onComplete();
      }
    }, 18);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!inView || currentMsg >= conversation.length) return;

    const msg = conversation[currentMsg];

    if (msg.role === "ai") {
      // Show thinking dots before AI response
      setThinkingDots(true);
      const thinkTimer = setTimeout(() => {
        setThinkingDots(false);
        setMessages((prev) => [...prev, { ...msg, text: "" }]);
        typeMessage(msg.text, () => {
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = msg;
            return updated;
          });
          setDisplayedText("");
          setCurrentMsg((prev) => prev + 1);
        });
      }, 1200);
      return () => clearTimeout(thinkTimer);
    }

    const delay = currentMsg === 0 ? 800 : 600;
    const timer = setTimeout(() => {
      typeMessage(msg.text, () => {
        setMessages((prev) => [...prev, msg]);
        setDisplayedText("");
        setCurrentMsg((prev) => prev + 1);
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [inView, currentMsg, typeMessage]);


  return (
    <div ref={containerRef} style={{ perspective: "1000px" }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="terminal-card w-full max-w-2xl mx-auto"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition: "transform 0.15s ease-out",
          boxShadow: "0 0 30px rgba(212,168,83,0.08), 0 20px 40px -8px rgba(0,0,0,0.4)",
        }}
      >
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-3 text-xs text-white/30 font-mono">
            Quant Mate AI
          </span>
          <span className="ml-auto text-[10px] text-white/20 font-mono">
            v1.0
          </span>
        </div>

        {/* Messages */}
        <div className="p-4 md:p-6 space-y-4 font-mono text-sm min-h-[280px]">
          {messages.map((msg, i) => (
            <div key={i}>
              {msg.role === "user" ? (
                <div className="flex gap-2">
                  <span className="text-green-400 shrink-0">$</span>
                  <span className="text-white/90">{msg.text}</span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <span className="text-blue-400 shrink-0">AI</span>
                  <span className="text-white/80 whitespace-pre-wrap leading-relaxed">
                    {i === messages.length - 1 && isTyping && messages[i].text === ""
                      ? highlightAIText(displayedText)
                      : highlightAIText(msg.text)}
                    {i === messages.length - 1 && isTyping && (
                      <span className="cursor-blink inline-block w-[2px] h-[1em] bg-blue-400 ml-[1px] align-middle" />
                    )}
                  </span>
                </div>
              )}
            </div>
          ))}

          {/* Thinking dots */}
          {thinkingDots && (
            <div className="flex gap-2 items-center">
              <span className="text-blue-400 shrink-0">AI</span>
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400/70 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400/70 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400/70 animate-bounce" style={{ animationDelay: "300ms" }} />
              </span>
            </div>
          )}

          {/* User typing indicator */}
          {isTyping && messages.length === 0 && (
            <div className="flex gap-2">
              <span className="text-green-400 shrink-0">$</span>
              <span className="text-white/90">
                {displayedText}
                <span className="cursor-blink inline-block w-[2px] h-[1em] bg-green-400 ml-[1px] align-middle" />
              </span>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
