import { Phone } from "lucide-react";
import site from "@/config/site";
import { getStartedHref, getStartedLabel } from "@/config/nav";
import { PrimaryButton } from "@/components/buttons";

export const MobileStickyBar = () => (
  <div data-testid="mobile-sticky-bar" className="fixed inset-x-0 bottom-0 z-40 flex gap-2 bg-chrome p-3 text-chrome-foreground md:hidden">
    <a
      href={site.phoneHref}
      aria-label={`Call ${site.phone}`}
      data-testid="mobile-sticky-phone-btn"
      className="inline-flex h-12 w-12 shrink-0 items-center justify-center border border-white/30"
    >
      <Phone className="h-5 w-5" />
    </a>
    <PrimaryButton to={getStartedHref} className="h-12 flex-1" data-testid="mobile-sticky-get-started-btn">
      {getStartedLabel}
    </PrimaryButton>
  </div>
);
