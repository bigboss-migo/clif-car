import { Link } from "react-router-dom";
import site from "@/config/site";
import { navLinks, getStartedHref, getStartedLabel } from "@/config/nav";
import { Logo } from "@/components/layout/Logo";
import { PrimaryButton } from "@/components/buttons";
import { FooterLegal } from "@/components/layout/FooterLegal";

const heading = "mb-5 text-[0.7rem] font-bold tracking-[0.32em] text-primary";
const link = "text-sm text-ink-muted transition-colors hover:text-ink-foreground";

const FooterColumn = ({ title, testId, children }) => (
  <nav aria-label={title} data-testid={testId}>
    <h2 className={heading}>{title}</h2>
    <ul className="space-y-3">{children}</ul>
  </nav>
);

export const Footer = () => (
  <footer data-testid="site-footer" className="border-t border-ink-foreground/10 bg-ink pb-[calc(72px+env(safe-area-inset-bottom))] text-ink-foreground md:pb-0">
    <div className="mx-auto max-w-7xl px-5 py-14">
      <div className="grid gap-10 lg:grid-cols-[1.5fr_0.8fr_0.8fr]">
        <div>
          <Logo testId="footer-logo" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
            {site.brandName} {site.brandSub} helps you find, finance and drive away in the right car.
          </p>
          <a href={site.phoneHref} data-testid="footer-phone-link" className="font-display mt-6 block text-3xl transition-colors hover:text-primary md:text-4xl">
            {site.phone}
          </a>
          <PrimaryButton to={getStartedHref} className="mt-6" data-testid="footer-get-started-btn">{getStartedLabel}</PrimaryButton>
        </div>
        <FooterColumn title="Explore" testId="footer-explore">
          {navLinks.map((l) => (
            <li key={l.to}><Link to={l.to} className={link} data-testid={`footer-link-${l.to.slice(1)}`}>{l.label}</Link></li>
          ))}
          <li>
            <a href={site.prequalUrl} target="_blank" rel="noopener noreferrer" className={link} data-testid="footer-link-prequal">
              {site.prequalLabel}
            </a>
          </li>
        </FooterColumn>
        <FooterColumn title="Follow" testId="footer-follow">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className={link} data-testid={`footer-social-${s.label.toLowerCase()}`}>
                {s.label}
              </a>
            </li>
          ))}
        </FooterColumn>
      </div>
      <FooterLegal />
    </div>
  </footer>
);
