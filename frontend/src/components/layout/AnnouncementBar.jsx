import site from "@/config/site";

export const AnnouncementBar = () => (
  <div data-testid="announcement-bar" className="hidden bg-primary text-primary-foreground md:block">
    <p className="mx-auto max-w-6xl px-6 py-2 text-center text-xs font-medium">
      Need assistance or have questions? Speak with someone from the team ·{" "}
      <a href={site.phoneHref} data-testid="announcement-phone-link" className="font-semibold underline underline-offset-2">
        {site.phone}
      </a>
    </p>
  </div>
);
