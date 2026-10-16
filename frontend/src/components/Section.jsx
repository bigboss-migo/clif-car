import { cn } from "@/lib/utils";

export const Section = ({ id, className, children, ...props }) => (
  <section id={id} className={cn("border-b border-border", className)} {...props}>
    <div className="mx-auto max-w-7xl px-5 py-16 md:py-20">{children}</div>
  </section>
);
