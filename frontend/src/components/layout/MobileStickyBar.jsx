import { Phone } from "lucide-react";
import site from "@/config/site";
import { getStartedHref, getStartedLabel } from "@/config/nav";
import { PrimaryButton } from "@/components/buttons";

export const MobileStickyBar = () => (
  <div
    data-testid="mobile-sticky-bar"
    className="fixed inset-x-0 bottom-0 z-50 flex gap-3 border-t border-border bg-background/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-10px_30px_-12px_rgb(0_0_0/0.25)] backdrop-blur-md md:hidden"
  >
    <a
      href={site.phoneHref}
      aria-label={`Call ${site.phone}`}
      data-testid="mobile-sticky-phone-btn"
      className="inline-flex h-12 w-12 shrink-0 items-center justify-center border border-foreground text-foreground transition-colors hover:border-primary hover:text-primary"
    >
      <Phone className="h-5 w-5" />
    </a>
    <PrimaryButton to={getStartedHref} className="flex h-12 flex-1 items-center justify-center py-0" data-testid="mobile-sticky-get-started-btn">
      {getStartedLabel}
    </PrimaryButton>
  </div>
);
