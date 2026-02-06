"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const messages = [
  { role: "user" as const, text: "Khi nào dùng PLS-SEM thay vì CB-SEM?" },
  {
    role: "ai" as const,
    text: "PLS-SEM phù hợp khi:\n• Mẫu nhỏ (< 200)\n• Mô hình phức tạp, nhiều biến\n• Mục tiêu dự đoán\n\nCB-SEM phù hợp khi:\n• Mẫu lớn (> 200)\n• Cần kiểm định lý thuyết\n• Dữ liệu phân phối chuẩn\n\n📖 Hair et al., 2019",
  },
];

interface DisplayMessage {
  role: "user" | "ai";
  text: string;
}

export default function AIChatDemo({ isActive }: { isActive: boolean }) {
  const [displayed, setDisplayed] = useState<DisplayMessage[]>([]);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showThinking, setShowThinking] = useState(false);
  const [step, setStep] = useState(0);

  const typeText = useCallback((text: string, onDone: () => void) => {
    setIsTyping(true);
    setTypingText("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setTypingText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        onDone();
      }
    }, 15);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isActive) {
      setDisplayed([]);
      setStep(0);
      setTypingText("");
      setIsTyping(false);
      setShowThinking(false);
      return;
    }
    if (step >= messages.length) return;

    const msg = messages[step];

    if (msg.role === "user") {
      const timer = setTimeout(() => {
        setDisplayed((prev) => [...prev, { role: "user", text: "" }]);
        typeText(msg.text, () => {
          setDisplayed((prev) => {
            const u = [...prev];
            u[u.length - 1] = msg;
            return u;
          });
          setTypingText("");
          setStep((s) => s + 1);
        });
      }, 500);
      return () => clearTimeout(timer);
    }

    // AI: show thinking dots, then stream
    setShowThinking(true);
    const timer = setTimeout(() => {
      setShowThinking(false);
      setDisplayed((prev) => [...prev, { role: "ai", text: "" }]);
      typeText(msg.text, () => {
        setDisplayed((prev) => {
          const u = [...prev];
          u[u.length - 1] = msg;
          return u;
        });
        setTypingText("");
        setStep((s) => s + 1);
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [isActive, step, typeText]);

  return (
    <div className="terminal-card font-mono text-sm">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-white/30">AI Gia sư</span>
      </div>

      <div className="p-4 space-y-3 min-h-[300px]">
        <AnimatePresence mode="popLayout">
          {displayed.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex gap-2">
                <span
                  className={
                    msg.role === "user"
                      ? "text-green-400 shrink-0"
                      : "text-blue-400 shrink-0"
                  }
                >
                  {msg.role === "user" ? "$" : "AI"}
                </span>
                <span className="text-white/80 whitespace-pre-wrap leading-relaxed">
                  {i === displayed.length - 1 && isTyping && msg.text === ""
                    ? typingText
                    : msg.text}
                  {i === displayed.length - 1 && isTyping && (
                    <span className={`cursor-blink inline-block w-[2px] h-[1em] ml-[1px] align-middle ${msg.role === "user" ? "bg-green-400" : "bg-blue-400"}`} />
                  )}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {showThinking && (
          <div className="flex gap-2 items-center">
            <span className="text-blue-400 shrink-0">AI</span>
            <span className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400/70 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400/70 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400/70 animate-bounce" style={{ animationDelay: "300ms" }} />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
