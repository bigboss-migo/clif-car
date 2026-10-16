import { NavLink } from "react-router-dom";
import { navLinks, getStartedHref, getStartedLabel } from "@/config/nav";
import { PrequalButton } from "@/components/PrequalButton";
import { PrimaryButton } from "@/components/buttons";

export const MobileMenu = ({ linkClass }) => (
  <nav id="mobile-menu" aria-label="Mobile" data-testid="mobile-menu" className="border-t border-white/10 lg:hidden">
    <ul className="mx-auto flex max-w-6xl flex-col px-6 py-4">
      {navLinks.map((l) => (
        <li key={l.to} className="border-b border-white/10">
          <NavLink to={l.to} className={(s) => `block py-4 ${linkClass(s)}`} data-testid={`mobile-nav-link-${l.to.slice(1)}`}>
            {l.label}
          </NavLink>
        </li>
      ))}
    </ul>
    <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 pb-6">
      <PrequalButton variant="mobile" />
      <PrimaryButton to={getStartedHref} className="w-full py-4" data-testid="mobile-menu-get-started-btn">
        {getStartedLabel}
      </PrimaryButton>
    </div>
  </nav>
);
