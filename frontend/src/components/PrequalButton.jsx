import { ExternalLink } from "lucide-react";
import site from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/buttons";
import { navLinkClass, mobileRowClass } from "@/components/layout/navStyles";

const variants = {
  primary: cn(buttonVariants.primary, "inline-flex items-center justify-center gap-2"),
  secondary: cn(buttonVariants.secondary, "inline-flex items-center justify-center gap-2"),
  nav: cn(navLinkClass(false), "inline-flex items-center gap-1.5"),
  mobile: cn(mobileRowClass(false), "flex w-full items-center justify-between"),
};

export const PrequalButton = ({ variant = "primary", className, ...props }) => (
  <a
    href={site.prequalUrl}
    target="_blank"
    rel="noopener noreferrer"
    title={site.prequalNote}
    data-testid={`prequal-button-${variant}`}
    className={cn(variants[variant], className)}
    {...props}
  >
    {site.prequalLabel}
    <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
  </a>
);
