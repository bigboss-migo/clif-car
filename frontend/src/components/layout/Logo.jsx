import { Link } from "react-router-dom";
import site from "@/config/site";

export const Logo = ({ testId = "logo" }) => (
  <Link to="/process" data-testid={testId} className="flex items-center gap-3" aria-label={site.brandName}>
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
      <rect width="32" height="32" className="fill-primary" />
      <path d="M8 22 L16 8 L24 22 Z" className="fill-chrome" />
    </svg>
    <span className="flex flex-col leading-none">
      <span className="font-display text-lg uppercase">{site.brandName}</span>
      <span className="text-[10px] font-semibold tracking-[0.3em] text-primary">{site.brandSub}</span>
    </span>
  </Link>
);
