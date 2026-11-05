import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-xl font-medium transition-all duration-300 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-gradient bg-[length:200%_auto] text-white shadow-glow hover:bg-right hover:shadow-[0_0_0_1px_rgba(139,92,246,0.5),0_0_60px_-6px_rgba(139,92,246,0.8)]",
  secondary: "border border-line bg-elevated/80 text-ink backdrop-blur hover:border-violet/50 hover:bg-elevated",
  outline: "border border-violet/40 text-ink hover:border-cyan/60 hover:bg-cyan/5 hover:text-white",
  ghost: "text-ink-muted hover:bg-white/5 hover:text-ink",
  danger: "border border-danger/40 bg-danger/10 text-danger hover:bg-danger/20",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

/** Sweeping light that crosses the primary button on hover. */
function Shine() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 group-hover:left-[150%]"
    />
  );
}

type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode; loading?: boolean };

export const Button = forwardRef<HTMLButtonElement, Common & ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ variant = "primary", size = "md", className, children, loading, disabled, ...rest }, ref) => (
    <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} disabled={disabled || loading} {...rest}>
      {variant === "primary" && <Shine />}
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </button>
  ),
);
Button.displayName = "Button";

export function ButtonLink({ variant = "primary", size = "md", className, children, ...rest }: Common & LinkProps) {
  return (
    <Link className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {variant === "primary" && <Shine />}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </Link>
  );
}
