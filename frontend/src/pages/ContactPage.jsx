import site from "@/config/site";
import { Seo } from "@/components/Seo";
import { Highlight, PageHero } from "@/components/PageHero";
import { ContactCards } from "@/pages/contact/ContactCards";
import { LeadForm } from "@/pages/contact/LeadForm";

export default function ContactPage() {
  return (
    <div data-testid="contact-page">
      <Seo
        title="Contact"
        description={`Call ${site.brandName} or send your details to start finding, financing and delivering your next car.`}
      />
      <PageHero
        id="contact"
        image={site.heroImages.contact}
        eyebrow="Contact"
        title={<>Let's talk <Highlight>cars</Highlight></>}
        intro="Call the team directly, or send your details and we'll come to you."
      />
      <ContactCards />
      <section id="get-started" data-testid="get-started-section" className="border-b border-border bg-surface">
        <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
          <LeadForm />
        </div>
      </section>
    </div>
  );
}
