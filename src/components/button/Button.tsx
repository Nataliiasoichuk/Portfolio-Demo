import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline";
export type ButtonSize = "md" | "sm";

export type ButtonProps = {
  /** Look of the button. `primary` is the main action, `secondary` the second one, `outline` a small accent-outlined action such as Resume. */
  variant?: ButtonVariant;
  /** `md` for page actions, `sm` for compact places such as the header. */
  size?: ButtonSize;
  /** Show the → arrow after the label, pushed to the right edge. */
  arrow?: boolean;
  /** Turns the button off: no clicks, dimmed. */
  disabled?: boolean;
  /** When set, the button is a link to this address (internal links use Next.js routing). */
  href?: string;
  children: ReactNode;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children" | "disabled">;

const base =
  "inline-flex items-center justify-between gap-3 rounded-control font-body font-semibold " +
  "transition-colors outline-offset-4 focus-visible:outline-2 focus-visible:outline-accent " +
  "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-canvas hover:brightness-110",
  secondary: "border-2 border-ink text-ink hover:bg-ink/10",
  outline: "border-2 border-accent text-accent hover:bg-accent/10",
};

const sizes: Record<ButtonSize, string> = {
  md: "px-6 py-4 text-body",
  sm: "px-3 py-2 text-caption",
};

/**
 * Action button. Renders a `<button>`, or a link when `href` is given.
 */
export function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  disabled = false,
  href,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const classes = [base, variants[variant], sizes[size], className].filter(Boolean).join(" ");
  const content = (
    <>
      <span>{children}</span>
      {arrow ? <span aria-hidden>→</span> : null}
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  if (href && disabled) {
    return (
      <span role="link" aria-disabled="true" className={classes}>
        {content}
      </span>
    );
  }
  return (
    <button type="button" disabled={disabled} className={classes} {...rest}>
      {content}
    </button>
  );
}
