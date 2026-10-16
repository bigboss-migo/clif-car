import site from "@/config/site";

// Placeholder legal links: real legal pages/URLs must be supplied before launch.
const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Consumer Disclosures", href: "#" },
  { label: "Accessibility", href: "#" },
];

export const FooterLegal = () => (
  <div data-testid="footer-legal" className="border-t border-white/10">
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 text-xs opacity-70 md:flex-row md:items-center md:justify-between">
      <p data-testid="footer-copyright">
        © 2026 {site.brandName}. All rights reserved. Auto brokerage services; financing provided by third-party lenders
        subject to credit approval.
      </p>
      <ul className="flex flex-wrap gap-4">
        {legalLinks.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="hover:underline" data-testid={`legal-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
