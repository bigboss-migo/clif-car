export const PlaceholderPage = ({ id, title, text }) => (
  <main data-testid={`${id}-page`} className="mx-auto max-w-5xl px-6 py-24">
    <h1 data-testid={`${id}-page-heading`} className="font-display text-4xl uppercase sm:text-5xl lg:text-6xl">
      {title}
    </h1>
    <p data-testid={`${id}-page-placeholder`} className="mt-4 text-sm text-muted-foreground sm:text-base">
      {text}
    </p>
  </main>
);
