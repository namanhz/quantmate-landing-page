import { cn } from "@/lib/utils";

interface Props {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  dark = false,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      <h2
        className={cn(
          "font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight",
          dark ? "text-on-dark" : "text-primary"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg md:text-xl max-w-2xl",
            align === "center" && "mx-auto",
            dark ? "text-on-dark/70" : "text-secondary"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
