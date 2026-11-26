import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  inverted?: boolean;
  variant?: "full" | "mark";
  size?: "sm" | "md" | "lg";
};

export function Logo({ className, inverted = false, variant = "full", size = "md" }: LogoProps) {
  const iconClass = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  } as const;

  return (
    <Link
      href="/"
      aria-label="Food24h home"
      className={cn("inline-flex shrink-0 items-center gap-2.5", className)}
    >
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        className={cn("shrink-0", iconClass[size])}
      >
        <rect x="1" y="1" width="46" height="46" rx="15" fill={inverted ? "#fff" : "#16834b"} />
        <path
          d="M16 19v-3.1a8 8 0 0 1 16 0V19M13 19h22l-1.6 19H14.6L13 19Z"
          fill="none"
          stroke={inverted ? "#16834b" : "#fff"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.8"
        />
        <path
          d="M23.7 31.3c-3.5-2.5-3.2-6.1 1-9.3 2.1 3.9 1.8 7.1-1 9.3Zm.4-1.1 3.6-4.1"
          fill="none"
          stroke="#f3b84b"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
      {variant === "full" && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-[1.25rem] font-extrabold tracking-[-0.06em]",
              inverted ? "text-white" : "text-[#18332a]",
              size === "lg" && "text-2xl",
              size === "sm" && "text-lg"
            )}
          >
            Food<span className={inverted ? "text-[#f3b84b]" : "text-primary"}>24h</span>
          </span>
          <span className={cn("mt-1 text-[8px] font-bold uppercase tracking-[0.18em]", inverted ? "text-white/65" : "text-muted")}>
            Fast · fresh · for you
          </span>
        </span>
      )}
    </Link>
  );
}
