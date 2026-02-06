import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 cursor-pointer",
        variant === "primary" &&
          "bg-gold text-dark hover:bg-gold-hover shadow-lg hover:shadow-xl pulse-glow",
        variant === "secondary" &&
          "bg-dark text-on-dark hover:bg-dark-card border border-white/10",
        variant === "ghost" &&
          "text-primary hover:text-gold bg-transparent",
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-base",
        size === "lg" && "px-8 py-4 text-lg",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
