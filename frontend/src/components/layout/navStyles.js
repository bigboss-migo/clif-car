import { cn } from "@/lib/utils";

export const navLinkClass = (isActive) =>
  cn(
    "text-xs font-semibold uppercase tracking-[0.16em] transition-colors",
    isActive ? "text-primary" : "text-ink-muted hover:text-ink-foreground",
  );

export const mobileRowClass = (isActive) =>
  cn(
    "block border-b border-ink-foreground/10 py-4 text-sm font-semibold uppercase tracking-[0.16em] transition-colors",
    isActive ? "text-primary" : "text-ink-foreground hover:text-primary",
  );
