"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { Button } from "../button/Button";

export type NavItem = {
  /** Text of the link. */
  label: string;
  /** Address the link leads to. */
  href: string;
  /** Marks the page the visitor is on: accent colour, underline, aria-current. */
  active?: boolean;
  /** The page is not ready: the item is not clickable and shows a note. */
  disabled?: boolean;
  /** Visible note next to a disabled item. Defaults to "soon". */
  disabledNote?: string;
};

export type NavProps = {
  /** Links of the menu, in order. */
  items: NavItem[];
  /** Label of the outlined action button after the links, for example "Resume (PDF) ↓". Needs `actionHref`. */
  actionLabel?: string;
  /** Address of the action button. */
  actionHref?: string;
  /** Start with the narrow-screen menu open (useful to look at it in Storybook). */
  defaultOpen?: boolean;
  className?: string;
};

const focus = "outline-offset-4 focus-visible:outline-2 focus-visible:outline-accent";
const linkBase = `font-body text-body font-medium ${focus}`;

function NavLink({ item, className = "", onNavigate }: { item: NavItem; className?: string; onNavigate?: () => void }) {
  if (item.disabled) {
    return (
      <span aria-disabled="true" className={`${linkBase} cursor-not-allowed text-ink-muted ${className}`}>
        {item.label} <span className="text-caption">{item.disabledNote ?? "soon"}</span>
      </span>
    );
  }
  const state = item.active ? "text-accent underline" : "text-ink hover:text-accent";
  return (
    <Link
      href={item.href}
      aria-current={item.active ? "page" : undefined}
      onClick={onNavigate}
      className={`${linkBase} ${state} ${className}`}
    >
      {item.label}
    </Link>
  );
}

/**
 * Main navigation. Links in a row on wide screens; on narrow screens they fold
 * into a burger menu. Escape closes the menu.
 */
export function Nav({ items, actionLabel, actionHref, defaultOpen = false, className = "" }: NavProps) {
  const [open, setOpen] = useState(defaultOpen);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav aria-label="Main" className={`relative flex items-center gap-6 ${className}`}>
      <ul className="hidden items-center gap-8 lg:flex">
        {items.map((item) => (
          <li key={item.href}>
            <NavLink item={item} />
          </li>
        ))}
      </ul>
      <span aria-hidden className="hidden h-4 w-px bg-line lg:block" />
      {actionLabel && actionHref ? (
        <Button variant="outline" size="sm" href={actionHref}>
          {actionLabel}
        </Button>
      ) : null}
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
        className={`relative flex h-4 w-6 flex-col justify-between after:absolute after:-inset-3 lg:hidden ${focus}`}
      >
        <span className="block w-full border-t-2 border-ink" />
        <span className="block w-full border-t-2 border-ink" />
        <span className="block w-full border-t-2 border-ink" />
      </button>
      {open ? (
        <ul
          id={menuId}
          className="absolute right-0 top-full z-10 mt-4 flex w-max flex-col gap-2 rounded-card border border-line bg-canvas p-2 lg:hidden"
        >
          {items.map((item) => (
            <li key={item.href}>
              <NavLink
                item={item}
                className="block rounded-control px-4 py-3 hover:bg-ink/10"
                onNavigate={() => setOpen(false)}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </nav>
  );
}
