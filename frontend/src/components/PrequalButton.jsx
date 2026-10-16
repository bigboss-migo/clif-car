import { ExternalLink } from "lucide-react";
import site from "@/config/site";

const variants = {
  primary: "bg-primary px-5 py-3 text-primary-foreground hover:bg-primary/85",
  secondary: "border-2 border-current px-5 py-3 hover:bg-foreground/10",
  nav: "border border-primary px-3 py-2 text-primary hover:bg-primary hover:text-primary-foreground",
  mobile: "w-full border border-primary px-5 py-4 text-primary hover:bg-primary hover:text-primary-foreground",
};

export const PrequalButton = ({ variant = "primary", className = "", ...props }) => (
  <a
    href={site.prequalUrl}
    target="_blank"
    rel="noopener noreferrer"
    title={site.prequalNote}
    data-testid={`prequal-button-${variant}`}
    className={`inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wide transition-colors ${variants[variant]} ${className}`}
    {...props}
  >
    {site.prequalLabel}
    <ExternalLink aria-hidden="true" className="h-4 w-4" />
  </a>
);
