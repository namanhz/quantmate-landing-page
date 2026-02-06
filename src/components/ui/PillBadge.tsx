import { cn } from "@/lib/utils";

interface Props {
  text: string;
  className?: string;
}

export default function PillBadge({ text, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase",
        "bg-gold/10 text-gold border border-gold/20",
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
      {text}
    </span>
  );
}
