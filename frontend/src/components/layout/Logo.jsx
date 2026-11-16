import { Link } from "react-router-dom";
import site from "@/config/site";

export const Logo = ({ testId = "logo" }) => (
  <Link to="/process" data-testid={testId} className="flex items-center gap-3" aria-label={site.brandName}>
    <svg viewBox="0 0 48 48" className="h-10 w-10 md:h-12 md:w-12" aria-hidden="true">
      <rect width="48" height="48" className="fill-primary" />
      <path d="M12 33 L24 13 L36 33 Z" className="fill-ink" />
    </svg>
    <span className="flex flex-col gap-1 leading-none">
      <span className="font-display text-lg tracking-wide md:text-xl">{site.brandName}</span>
      <span className="text-[0.65rem] font-bold uppercase tracking-[0.32em] text-primary">{site.brandSub}</span>
    </span>
  </Link>
);
