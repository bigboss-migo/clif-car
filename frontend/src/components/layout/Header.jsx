import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { navLinks, getStartedHref, getStartedLabel } from "@/config/nav";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { navLinkClass } from "@/components/layout/navStyles";
import { PrequalButton } from "@/components/PrequalButton";
import { PrimaryButton } from "@/components/buttons";

// Publishes the bar height as --header-h so hash targets clear the sticky header.
const useHeaderHeight = (ref) => {
  useEffect(() => {
    const el = ref.current;
    const set = () => document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
};

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { key } = useLocation();
  const barRef = useRef(null);
  useHeaderHeight(barRef);
  useEffect(() => setOpen(false), [key]);

  return (
    <header
      data-testid="site-header"
      className="sticky top-0 z-50 border-b border-ink-foreground/10 bg-ink/95 text-ink-foreground backdrop-blur-md"
    >
      <div ref={barRef}>
        <AnnouncementBar />
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3">
          <Logo testId="header-logo" />
          <nav aria-label="Primary" data-testid="desktop-nav" className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => navLinkClass(isActive)} data-testid={`nav-link-${l.to.slice(1)}`}>
                {l.label}
              </NavLink>
            ))}
            <PrequalButton variant="nav" />
            <PrimaryButton to={getStartedHref} data-testid="header-get-started-btn">{getStartedLabel}</PrimaryButton>
          </nav>
          <button
            type="button"
            className="border border-ink-foreground/25 p-2 text-ink-foreground transition-colors hover:border-primary hover:text-primary lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            data-testid="mobile-menu-toggle"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && <MobileMenu onNavigate={() => setOpen(false)} />}
    </header>
  );
};
