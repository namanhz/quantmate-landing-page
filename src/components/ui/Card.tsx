import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  variant?: "light" | "dark";
  className?: string;
  children: ReactNode;
}

export default function Card({ variant = "light", className, children }: Props) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 md:p-8",
        variant === "light" &&
          "bg-cream-light border border-dark/5 shadow-sm",
        variant === "dark" && "terminal-card text-on-dark",
        className
      )}
    >
      {children}
    </div>
  );
}
