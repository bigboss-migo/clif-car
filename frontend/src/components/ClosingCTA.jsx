import { getStartedHref } from "@/config/nav";
import { PrimaryButton } from "@/components/buttons";

export const ClosingCTA = ({ heading, body, children, id }) => (
  <section id={id} data-testid="closing-cta" className="stage-gradient border-t border-border">
    <div className="mx-auto max-w-3xl px-5 py-20 text-center md:py-24">
      <h2 data-testid="closing-cta-heading" className="text-4xl uppercase md:text-6xl">{heading}</h2>
      {body && <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">{body}</p>}
      <PrimaryButton to={getStartedHref} className="mt-8" data-testid="closing-cta-get-started-btn">
        Get Your Dream Car Now
      </PrimaryButton>
      {children && <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div>}
    </div>
  </section>
);
