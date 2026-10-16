export const ClosingCTA = ({ heading, body, children, id }) => (
  <section id={id} data-testid="closing-cta" className="scroll-mt-28 border-t bg-secondary">
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <h2 data-testid="closing-cta-heading" className="font-display text-3xl uppercase sm:text-4xl">{heading}</h2>
      {body && <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">{body}</p>}
      {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
    </div>
  </section>
);
