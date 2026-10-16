import { NavLink } from "react-router-dom";
import { navLinks, getStartedHref, getStartedLabel } from "@/config/nav";
import { mobileRowClass } from "@/components/layout/navStyles";
import { PrequalButton } from "@/components/PrequalButton";
import { PrimaryButton } from "@/components/buttons";

export const MobileMenu = ({ onNavigate }) => (
  <nav id="mobile-menu" aria-label="Mobile" data-testid="mobile-menu" className="border-t border-ink-foreground/10 lg:hidden">
    <ul className="mx-auto max-w-7xl px-5 pt-2">
      {navLinks.map((l) => (
        <li key={l.to}>
          <NavLink
            to={l.to}
            onClick={onNavigate}
            className={({ isActive }) => mobileRowClass(isActive)}
            data-testid={`mobile-nav-link-${l.to.slice(1)}`}
          >
            {l.label}
          </NavLink>
        </li>
      ))}
      <li>
        <PrequalButton variant="mobile" onClick={onNavigate} />
      </li>
    </ul>
    <div className="mx-auto max-w-7xl px-5 py-5">
      <PrimaryButton to={getStartedHref} onClick={onNavigate} className="w-full" data-testid="mobile-menu-get-started-btn">
        {getStartedLabel}
      </PrimaryButton>
    </div>
  </nav>
);
