import { cn } from "@/lib/utils";

export const Eyebrow = ({ children, className, ...props }) => (
  <p className={cn("text-[0.7rem] font-bold uppercase tracking-[0.32em] text-primary", className)} {...props}>
    {children}
  </p>
);
