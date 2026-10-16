import { Link } from "react-router-dom";
import site from "@/config/site";
import { navLinks, getStartedHref, getStartedLabel } from "@/config/nav";
import { Logo } from "@/components/layout/Logo";
import { PrimaryButton } from "@/components/buttons";
import { FooterLegal } from "@/components/layout/FooterLegal";

const heading = "mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary";
const link = "text-sm opacity-80 transition-opacity hover:opacity-100";

export const Footer = () => (
  <footer data-testid="site-footer" className="bg-chrome text-chrome-foreground">
    <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[2fr_1fr_1fr]">
      <div>
        <Logo testId="footer-logo" />
        <p className="mt-4 max-w-sm text-sm opacity-70">
          {site.brandName} {site.brandSub} helps you find, finance and drive away in the right car.
        </p>
        <a href={site.phoneHref} data-testid="footer-phone-link" className="mt-6 block font-display text-3xl uppercase hover:text-primary">
          {site.phone}
        </a>
        <PrimaryButton to={getStartedHref} className="mt-6" data-testid="footer-get-started-btn">{getStartedLabel}</PrimaryButton>
      </div>
      <nav aria-label="Explore" data-testid="footer-explore">
        <h2 className={heading}>Explore</h2>
        <ul className="space-y-3">
          {navLinks.map((l) => (
            <li key={l.to}><Link to={l.to} className={link} data-testid={`footer-link-${l.to.slice(1)}`}>{l.label}</Link></li>
          ))}
          <li>
            <a href={site.prequalUrl} target="_blank" rel="noopener noreferrer" className={link} data-testid="footer-link-prequal">
              {site.prequalLabel}
            </a>
          </li>
        </ul>
      </nav>
      <nav aria-label="Follow" data-testid="footer-follow">
        <h2 className={heading}>Follow</h2>
        <ul className="space-y-3">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className={link} data-testid={`footer-social-${s.label.toLowerCase()}`}>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
    <FooterLegal />
  </footer>
);
