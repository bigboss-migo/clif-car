import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { navLinks, getStartedHref, getStartedLabel } from "@/config/nav";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { PrequalButton } from "@/components/PrequalButton";
import { PrimaryButton } from "@/components/buttons";

const linkClass = ({ isActive }) =>
  `text-sm font-semibold uppercase tracking-wide transition-colors hover:text-primary ${isActive ? "text-primary" : ""}`;

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { key } = useLocation();
  useEffect(() => setOpen(false), [key]);

  return (
    <header data-testid="site-header" className="sticky top-0 z-50">
      <AnnouncementBar />
      <div className="bg-chrome text-chrome-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <Logo testId="header-logo" />
          <nav aria-label="Primary" data-testid="desktop-nav" className="hidden items-center gap-6 lg:flex">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass} data-testid={`nav-link-${l.to.slice(1)}`}>
                {l.label}
              </NavLink>
            ))}
            <PrequalButton variant="nav" />
            <PrimaryButton to={getStartedHref} data-testid="header-get-started-btn">{getStartedLabel}</PrimaryButton>
          </nav>
          <button
            type="button"
            className="p-2 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            data-testid="mobile-menu-toggle"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {open && <MobileMenu linkClass={linkClass} />}
      </div>
    </header>
  );
};
