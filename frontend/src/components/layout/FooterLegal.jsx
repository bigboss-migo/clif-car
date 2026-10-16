import site from "@/config/site";

// Placeholder legal links: real legal pages/URLs must be supplied before launch.
const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Consumer Disclosures", href: "#" },
  { label: "Accessibility", href: "#" },
];

export const FooterLegal = () => (
  <div data-testid="footer-legal" className="mt-12 flex flex-col gap-4 border-t border-ink-foreground/10 pt-6 text-xs text-ink-muted md:flex-row md:items-start md:justify-between">
    <p data-testid="footer-copyright" className="max-w-2xl leading-relaxed">
      © 2026 {site.brandName}. All rights reserved. Auto brokerage services; financing provided by third-party lenders
      subject to credit approval.
    </p>
    <ul className="flex flex-wrap gap-x-5 gap-y-2">
      {legalLinks.map((l) => (
        <li key={l.label}>
          <a href={l.href} className="transition-colors hover:text-ink-foreground" data-testid={`legal-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}>
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
