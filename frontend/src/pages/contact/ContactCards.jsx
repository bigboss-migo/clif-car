import { ArrowUpRight, Phone } from "lucide-react";
import site from "@/config/site";
import { Eyebrow } from "@/components/Eyebrow";
import { Section } from "@/components/Section";
import { PrequalButton } from "@/components/PrequalButton";

const Card = ({ testId, children }) => (
  <div data-testid={testId} className="flex flex-col border border-border bg-card p-6 md:p-8">{children}</div>
);

export const ContactCards = () => (
  <Section data-testid="contact-cards">
    <div className="grid gap-6 md:grid-cols-3">
      <Card testId="contact-card-phone">
        <Eyebrow>By phone</Eyebrow>
        <a href={site.phoneHref} data-testid="contact-phone-link" className="font-display mt-5 flex items-center gap-3 text-3xl transition-colors hover:text-primary">
          <Phone aria-hidden="true" className="h-6 w-6 text-primary" />
          {site.phone}
        </a>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Talk to someone on the team {site.hours}.
        </p>
      </Card>
      <Card testId="contact-card-online">
        <Eyebrow>Online</Eyebrow>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">Follow along, see recent deliveries and send us a message.</p>
        <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`contact-social-${s.label.toLowerCase()}`}
                className="inline-flex items-center gap-1 text-sm font-semibold transition-colors hover:text-primary"
              >
                {s.label}
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
            </li>
          ))}
        </ul>
      </Card>
      <Card testId="contact-card-prequal">
        <Eyebrow>Pre-qualify online</Eyebrow>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Want to see your options first? Start with our financing partner's secure application, then we'll take it from there.
        </p>
        <div className="mt-6">
          <PrequalButton variant="primary" />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{site.prequalNote}</p>
      </Card>
    </div>
  </Section>
);
