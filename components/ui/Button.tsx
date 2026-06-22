import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "onDark";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  // Primary is a near-black pill (orange lives in gradients, not buttons)
  primary: "bg-brand text-white hover:bg-brand-dark",
  secondary: "bg-surface border border-line text-ink hover:bg-canvas",
  ghost: "text-brand hover:bg-brand/5",
  onDark: "bg-white text-ink hover:bg-white/90",
};

const pad: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};
const padArrow: Record<Size, string> = {
  md: "pl-5 pr-1.5 py-1.5 text-sm",
  lg: "pl-6 pr-2 py-2 text-base",
};

const badge: Record<Variant, string> = {
  primary: "bg-white text-brand",
  secondary: "bg-ink text-white",
  ghost: "bg-brand text-white",
  onDark: "bg-ink text-white",
};
const badgeSize: Record<Size, string> = { md: "h-8 w-8", lg: "h-9 w-9" };

function content(variant: Variant, size: Size, arrow: boolean, children: React.ReactNode) {
  return (
    <>
      <span>{children}</span>
      {arrow && (
        <span
          className={cn(
            "grid place-items-center rounded-full transition-transform group-hover:translate-x-0.5",
            badge[variant],
            badgeSize[size],
          )}
        >
          <ArrowRight size={size === "lg" ? 18 : 16} />
        </span>
      )}
    </>
  );
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
  ...rest
}: CommonProps &
  ({ href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className">)) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], arrow ? padArrow[size] : pad[size], className)}
      {...rest}
    >
      {content(variant, size, arrow, children)}
    </Link>
  );
}

/** Plain anchor version for tel:/sms:/mailto: links. */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
}: CommonProps & { href: string }) {
  return (
    <a
      href={href}
      className={cn(base, variants[variant], arrow ? padArrow[size] : pad[size], className)}
    >
      {content(variant, size, arrow, children)}
    </a>
  );
}
