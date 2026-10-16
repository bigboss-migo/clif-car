import site from "@/config/site";
import { PlaceholderPage } from "@/components/PlaceholderPage";
import { ClosingCTA } from "@/components/ClosingCTA";
import { PrequalButton } from "@/components/PrequalButton";
import { SecondaryButton } from "@/components/buttons";

export default function ContactPage() {
  return (
    <PlaceholderPage
      id="contact"
      eyebrow="Contact"
      title="Contact"
      text="Contact page content coming soon."
      image={site.heroImages.contact}
    >
      <ClosingCTA id="get-started" heading="Get Started" body="Get started content coming soon.">
        <PrequalButton variant="primary" />
        <SecondaryButton href={site.phoneHref} data-testid="contact-call-btn">Call {site.phone}</SecondaryButton>
      </ClosingCTA>
    </PlaceholderPage>
  );
}
